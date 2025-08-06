import './App.css'
import Welcome from './pages/Welcome/Welcome';
import {Game} from './pages/Game/Game.jsx'

import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Outlet,
} from "react-router-dom";


export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/game" element={<Game />} />
                {/* other routes if needed */}
            </Routes>
        </BrowserRouter>
    );
}

export default App
