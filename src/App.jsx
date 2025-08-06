import './App.css'
import Welcome from './pages/Welcome/Welcome';
import {Game} from './pages/Game/Game';
import {Rules} from './pages/Rules/Rules';
import {GameProvider} from './context/GameContext';


import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";


export function App() {
    return (
        <GameProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/game" element={<Game />} />
                    <Route path="/rules" element={<Rules />} />
                </Routes>
            </BrowserRouter>
        </GameProvider>
    );
}

export default App
