import {createContext, useState, useContext} from 'react';

const GameContext = createContext();

export function GameProvider({ children }) {
    const [players, setPlayers] = useState([]);

    const value = {
        players,
        setPlayers,
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
}

export const useGame = () => {
    return useContext(GameContext);
}