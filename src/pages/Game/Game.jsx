import { useState, useEffect } from 'react'
import {supabase} from '../../api/supabase'
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
function GameContent({ round, selectedCat, letter, onShuffle, onNextRound }) {
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

            <button className="next-round-btn" onClick={onNextRound}>
                Next Round
            </button>
        </>
    );
}

// Main Game component
export function Game() {
    const [categories, setCategories] = useState(null)
    const [selectedCat, setSelectedCat] = useState(null)
    const [letter, setLetter] = useState(null)
    const [round, setRound] = useState(1)
    const [showCountdown, setShowCountdown] = useState(false)
    const [countdown, setCountdown] = useState(3)

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
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}