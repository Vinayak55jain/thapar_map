import InstagramIcon from '../assets/Instagram.svg'
import GitHubIcon from '../assets/GitHub.svg'
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'

function NavBar() {
    return (
        <header className='bg-[#009bd5]/20 sticky top-0 z-10 shadow-md'>
            <nav className="flex items-center justify-between h-20 sm:h-28 max-w-7xl mx-auto px-6">
                <Link href="/"><img src={logo} alt="ACM Thapar Logo" className="h-[70px] sm:h-[102px] w-auto" /></Link>
                <div className="flex items-center gap-4 h-10 sm:h-14 w-32">
                    <a href="#"><img src={InstagramIcon} alt="Instagram" className="h-full" /></a>
                    <a href="#"><img src={GitHubIcon} alt="GitHub" className="h-full" /></a>
                </div>
            </nav>
        </header>
    )
}

export default NavBar
