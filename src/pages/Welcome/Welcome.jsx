export default function Welcome() {
    return (
        <div className="welcome">
            <h1 className="welcome__title">
                <span>NAME</span>
                <span className="highlight">THAT</span>
                <span>THING!</span>
            </h1>

            <div className="welcome__illustration">
                {/* Insert your SVG / image here */}
            </div>

            <button className="welcome__button">Play!</button>
        </div>
    );
}