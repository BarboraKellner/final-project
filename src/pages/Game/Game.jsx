import { useState, useEffect } from 'react'
import {supabase} from '../../api/supabase'
import './Game.sass'

export function Game() {
    const [categories, setCategories] = useState(null)
    const [selectedCat, setSelectedCat] = useState(null)
    const [letter, setLetter] = useState(null)

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
        <div>
            <h1>Game Page</h1>

            {selectedCat && letter ? (
                <div className="round-info">
                    <div className="category-tile">
                        <img src={selectedCat.icon_url} alt={selectedCat.name} />
                        <span>{selectedCat.name}</span>
                    </div>

                    <div className="letter-tile">
                        {letter}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}