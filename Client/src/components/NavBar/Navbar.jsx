import { Link, Outlet } from 'react-router-dom';

export default function Navbar(){
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    )
}