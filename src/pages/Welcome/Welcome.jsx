import './Welcome.scss'

export default function Welcome() {
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
                    <img src="/src/assets/img/art_mobile.PNG" alt="welcomeArt" className="welcome__art"/>
                </div>

                <button className="welcome__button">Play!</button>
            </div>
        </div>

    );
}