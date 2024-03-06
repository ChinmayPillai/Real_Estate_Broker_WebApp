import { Link, Outlet } from 'react-router-dom';

export default function Navbar(){
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="property">Property</Link>
                    </li>
                    <li>
                        <Link to="portfolio">Portfolio</Link>
                    </li>
                    <li>
                        <Link to="wishlist">Wishlist</Link>
                    </li>
                    <li>
                        <Link to="funds">Funds</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    )
}