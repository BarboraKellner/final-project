import './Win.scss'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../../context/GameContext'

export function Win() {
    const { players } = useGame()
    const navigate = useNavigate()

    const winner = players.find(player => player.score >= 10)

    const handlePlayAgain = () => {
        navigate('/')
    }

    return (
        <div className="win">
            <div className="win__content">
                <h1 className="win__logo">
                    <span className="first">NAME</span>
                    <span className="second">THAT</span>
                    <span className="third">THING!</span>
                </h1>

                <p className="win__congrats">CONGRATULATIONS!</p>

                <div className="win__firework_large">
                    <img src="/firework_large.png" alt="firework large"/>
                </div>


                {winner && (
                    <div className="win__winner-text">
                        <p className="win__winner-name">{winner.name}</p>
                        <span className="win__winner-message">is the winner!</span>
                    </div>

                )}

                <div className="win__firework_small">
                    <img src="/firework_small.png" alt="firework small"/>
                </div>

                <button className="win__button" onClick={handlePlayAgain}>
                    Play Again!
                </button>

            </div>
        </div>
    )
}
