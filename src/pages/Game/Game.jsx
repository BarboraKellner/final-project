import { useState, useEffect } from 'react'
import {supabase} from '../../api/supabase'
import './Game.scss'

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

        console.log('Selected category:', randomCat.name)
        console.log('Selected letter:', randomLetter)
    }

    const getCategories = async () => {
        const { data, error } = await supabase.from('categories').select()

        if (error) {
            console.error(error)
            return
        }

        console.log('Fetched categories:', data)
        setCategories(data)
        shuffle(data)



    }



    return (
        <div className="game-page">
            {showCountdown && (
                <div className="countdown-screen">
                    <div className="countdown-number">
                        {countdown === 0 ? 'Go!' : countdown}
                    </div>
                </div>
            )}

            <div className="game-logo">
                <h1>NAME</h1>
                <h1>THAT THING!</h1>
            </div>

            {selectedCat && letter ? (
                <>
                <h2 className="round-number">Round {round}</h2>

                    <div className="round-info">
                        <div className="category-tile">
                            <img src={selectedCat.icon_url} alt={selectedCat.name} />
                            <span>{selectedCat.name}</span>
                        </div>

                        <div className="letter-tile">
                            {letter}
                        </div>
                    </div>

                    <button
                        className="shuffle-btn"
                        onClick={() => shuffle(categories)}
                    >
                        Shuffle
                    </button>

                    <button
                        className="next-round-btn"
                        onClick={() => {
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
                                    }, 1000) // <-- this makes GO! stay visible for 1s
                                }
                            }, 1000)
                        }}
                    >
                        Next Round
                    </button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )

}