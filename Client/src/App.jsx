import {Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import Navbar from './components/NavBar/Navbar'

function App() {
    return (
        <Routes>
            <Route path='/' element={<Navbar />}>
                <Route index element={<Home />} />
            </Route>
        </Routes>
    )
}

export default App
