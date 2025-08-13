import React from 'react'
import NavBar from '../Components/NavBar.jsx'
import Hero from '../Components/Hero.jsx'
import Contributors from '../Components/contributors.jsx'
import SearchBar from '../Components/SearchBar.jsx'

const HomePage = () => {
  return (
    <>
        <NavBar />
        <Hero />
        <SearchBar />
        <Contributors />
    </>
  )
}

export default HomePage
