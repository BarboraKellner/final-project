import './Rules.scss'
import { useState } from 'react'

function PlayerForm({ player, onNameChange, onEmojiChange, emojiOptions }) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    return (
        <div className="rules__player-row">
            <button
                className="rules__player-emoji"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
                {player.emoji}
            </button>

            {showEmojiPicker && (
                <div className="rules__emoji-picker">
                    {emojiOptions.map(emoji => (
                        <button
                            key={emoji}
                            onClick={() => {
                                onEmojiChange(player.id, emoji);
                                setShowEmojiPicker(false);
                            }}
                        >
                            {emoji}
                        </button>
                    ))}
                </div>
            )}

            <input
                type="text"
                className="rules__player-input"
                placeholder={`Player ${player.id}`}
                value={player.name}
                onChange={(e) => onNameChange(player.id, e.target.value)}
            />
        </div>
    );
}

export function Rules() {
    const emojiOptions = [
        '🐶', '🐱', '🐭', '🐹', '🐰',
        '🦊', '🐻', '🐼', '🐨', '🐯',
        '🦁', '🐸', '🐵', '🐧', '🦄'
    ];

    const [players, setPlayers] = useState([
        { id: 1, name: '', emoji: '🐶' }
    ]);

    const handleNameChange = (id, name) => {
        setPlayers(players.map(p =>
            p.id === id ? { ...p, name } : p
        ));
    };

    const handleEmojiChange = (id, emoji) => {
        setPlayers(players.map(p =>
            p.id === id ? { ...p, emoji } : p
        ));
    };

    const addPlayer = () => {
        if (players.length < 10) {
            const newPlayer = {
                id: players.length + 1,
                name: '',
                emoji: emojiOptions[players.length] // Pick next emoji
            };
            setPlayers([...players, newPlayer]);
        }
    };


    return (
        <div className="rules">
            <div className="rules__content">
                <h1 className="rules__logo">
                    <span className="first">NAME</span>
                    <span className="second">THAT</span>
                    <span className="third">THING!</span>
                </h1>

                <div className="rules__text">
                    <p>• The first to shout an answer wins the round!</p>
                    <p>• That player gets 1 point.</p>
                    <p>• First to 10 points wins the game!</p>
                </div>

                <h2 className="rules__subtitle">Pick emoji and enter names:</h2>

                <div className="rules__players">
                    {players.map(player => (
                        <PlayerForm
                            key={player.id}
                            player={player}
                            onNameChange={handleNameChange}
                            onEmojiChange={handleEmojiChange}
                            emojiOptions={emojiOptions}
                        />
                    ))}

                    {players.length < 10 && (
                        <button className="rules__add-btn" onClick={addPlayer}>
                            ➕
                        </button>
                    )}
                </div>

                <button className="rules__start-btn">
                    Start
                </button>
            </div>
        </div>
    );
}