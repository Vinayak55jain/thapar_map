import React from 'react'
import NavBar from '../Components/NavBar.jsx'
import Hero from '../Components/Hero.jsx'
import Contributors from '../Components/contributors.jsx'
import SearchBar from '../Components/SearchBar.jsx'
import backgroundImage from '../assets/bg.png'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" 
    style={{ backgroundImage: `url(${backgroundImage})` }}>
      <NavBar />
      <Hero />
      <SearchBar />
      <Contributors />
    </div>
  )
}

export default HomePage
