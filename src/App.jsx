import './App.css'
import Welcome from './pages/Welcome/Welcome';
import {Game} from './pages/Game/Game';
import {Rules} from './pages/Rules/Rules';


import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";


export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/game" element={<Game />} />
                <Route path="/rules" element={<Rules />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App
