import { Link } from 'react-router-dom'
import './404.scss'


export function NotFound() {
    return (
        <div className="notfound">
            <div className="notfound__content">
                <img src="/src/assets/img/art_img_duck.PNG" alt="Lost duck" className="notfound__duck" />
                <h1 className="notfound__title">404</h1>
                <p className="notfound__text">This Duck got lost...<br/>and so did you.</p>
                <Link to="/" className="notfound__button">Back to safety 💦</Link>
            </div>
        </div>
    )
}
