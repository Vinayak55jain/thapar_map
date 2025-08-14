import React from 'react'
import NavBar from '../Components/NavBar.jsx'
import Hero from '../Components/Hero.jsx'
import Contributors from '../Components/contributors.jsx'
import SearchBar from '../Components/SearchBar.jsx'
import backgroundImage from '../assets/bg.png'

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-6rem)] bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: `url(${backgroundImage})` }}>
          <Hero />
          <SearchBar />
          <Contributors />
      </div>
    </div>
  )
}

export default HomePage
