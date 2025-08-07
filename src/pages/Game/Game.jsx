import { useState, useEffect } from 'react'
import {supabase} from '../../api/supabase'
import {useGame} from '../../context/GameContext'

import './Game.scss'


// Component for the countdown overlay
function CountdownOverlay({ countdown }) {
    return (
        <div className="countdown-screen">
            <div className="countdown-number">
                {countdown === 0 ? 'Go!' : countdown}
            </div>
        </div>
    );
}

// Component for the logo
function GameLogo() {
    return (
        <h1 className="game-logo">
            <span className="first">NAME</span>
            <span className="second">THAT</span>
            <span className="third">THING!</span>
        </h1>
    );
}

// Component for the category tile
function CategoryTile({ category }) {
    return (
        <div className="category-tile">
            <img src={category.icon_url} alt={category.name} />
            <span>{category.name}</span>
        </div>
    );
}

// Component for the letter tile
function LetterTile({ letter }) {
    return (
        <div className="letter-tile">
            {letter}
        </div>
    );
}

// Component for the game content
function GameContent({ round, selectedCat, letter, onShuffle, onNextRound, players, selectedPlayerId, onPlayerSelect, onAddPoint }) {
    return (
        <>
            <h2 className="round-number">Round {round}</h2>

            <div className="round-info">
                <LetterTile letter={letter} />
            </div>

            <div className="category-section">
                <CategoryTile category={selectedCat} />
            </div>

            <button className="shuffle-btn" onClick={onShuffle}>
                Shuffle
            </button>

            <WinnerSelector
                players={players}
                selectedPlayerId={selectedPlayerId}
                onPlayerSelect={onPlayerSelect}
            />

            <button
                className="top-up-btn"
                onClick={onAddPoint}
                disabled={!selectedPlayerId}
            >
                TOP UP
            </button>

            <ScoreTable players={players} />

            <button className="next-round-btn" onClick={onNextRound}>
                Next Round
            </button>
        </>
    );
}
// Component for winner selection dropdown
function WinnerSelector({ players, selectedPlayerId, onPlayerSelect }) {
    return (
        <div className="winner-selector">
            <label>Points goes to...</label>
            <select
                value={selectedPlayerId || ''}
                onChange={(e) => onPlayerSelect(e.target.value)}
                className="player-dropdown"
            >
                <option value="">Select player</option>
                {players.map(player => (
                    <option key={player.id} value={player.id}>
                        {player.emoji} {player.name || `Player ${player.id}`}
                    </option>
                ))}
            </select>
        </div>
    );
}

// Component for the score table
function ScoreTable({ players }) {
    // Sort players by score (highest first)
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

    return (
        <div className="score-table">
            <div className="score-list">
                {sortedPlayers.map(player => (
                    <div key={player.id} className="score-row">
                        <span className="player-info">
                            {player.emoji} {player.name || `Player ${player.id}`}
                        </span>
                        <span className="player-score">{player.score}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}




// Main Game component
export function Game() {
    const { players, setPlayers } = useGame();
    const [categories, setCategories] = useState(null)
    const [selectedCat, setSelectedCat] = useState(null)
    const [letter, setLetter] = useState(null)
    const [round, setRound] = useState(1)
    const [showCountdown, setShowCountdown] = useState(false)
    const [countdown, setCountdown] = useState(3)
    const [selectedPlayerId, setSelectedPlayerId] = useState(() =>
        players && players.length > 0 ? players[0].id : null
    );

    useEffect(() => {
        getCategories()
    }, [])

    const shuffle = (catList) => {
        const randomCat = catList[Math.floor(Math.random() * catList.length)]
        setSelectedCat(randomCat)

        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)]
        setLetter(randomLetter)
    }

    const getCategories = async () => {
        const { data, error } = await supabase.from('categories').select()
        if (error) {
            console.error(error)
            return
        }
        setCategories(data)
        shuffle(data)
    }

    const handleNextRound = () => {
        setShowCountdown(true)
        setCountdown(3)

        let counter = 3
        const interval = setInterval(() => {
            counter--
            setCountdown(counter)

            if (counter === 0) {
                clearInterval(interval)
                setTimeout(() => {
                    shuffle(categories)
                    setRound(round + 1)
                    setShowCountdown(false)
                }, 1000)
            }
        }, 1000)
    }

    const handleAddPoint = () => {
        if (selectedPlayerId) {
            const updatedPlayers = players.map(player =>
                player.id === parseInt(selectedPlayerId)
                    ? { ...player, score: player.score + 1 }
                    : player
            );
            setPlayers(updatedPlayers);
            setSelectedPlayerId(null);
        }
    };

    return (
        <div className="game-page">
            {showCountdown && <CountdownOverlay countdown={countdown} />}

            <GameLogo />

            {selectedCat && letter ? (
                <GameContent
                    round={round}
                    selectedCat={selectedCat}
                    letter={letter}
                    onShuffle={() => shuffle(categories)}
                    onNextRound={handleNextRound}
                    players={players}
                    selectedPlayerId={selectedPlayerId}
                    onPlayerSelect={setSelectedPlayerId}
                    onAddPoint={handleAddPoint}
                />
            ) : (
                <p>Get ready...</p>
            )}
        </div>
    )
}