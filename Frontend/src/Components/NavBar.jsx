import InstagramIcon from '../assets/Instagram.svg'
import GitHubIcon from '../assets/GitHub.svg'
import logo from '../assets/logo.svg'

function NavBar() {
    return (
        <header className='bg-[#009bd5]/20 sticky top-0 z-10 shadow-md'>
            <nav className="flex items-center justify-between h-28 max-w-7xl mx-auto px-6">
                <a href="#"><img src={logo} alt="ACM Thapar Logo" className="h-[102px] w-auto" /></a>
                <div className="flex items-center gap-4 h-14 w-32">
                    <a href="#"><img src={InstagramIcon} alt="Instagram" className="h-full" /></a>
                    <a href="#"><img src={GitHubIcon} alt="GitHub" className="h-full" /></a>
                </div>
            </nav>
        </header>
    )
}

export default NavBar
