import './Welcome.scss'
import {useNavigate} from 'react-router-dom'

export default function Welcome() {
    const navigate = useNavigate();

    return (
        <div className="welcome">
            <div className="welcome__bg"/>

            <div className="welcome__content">
                <h1 className="welcome__logo">
                    <span className="first">NAME</span>
                    <span className="second">THAT</span>
                    <span className="third">THING!</span>
                </h1>

                <div className="welcome__art_container">
                    <img src="/art_mobile.png" alt="welcomeArt" className="welcome__art"/>
                </div>

                <button className="welcome__button" onClick={() => navigate('/rules')}>
                    Play!
                </button>
            </div>
        </div>

    );
}