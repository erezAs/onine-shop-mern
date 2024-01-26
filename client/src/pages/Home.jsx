import React from 'react'
//Import components
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Slider from '../components/Slider'
import Products from '../components/Products'
import Categories from '../components/Categories'
import NewsLetter from '../components/Newsletter'
import Footer from '../components/Footer'
const Home = () => {
    return (
        /* Home Parent component */
        <div>
            <Announcement />
            <Navbar />
            <Slider />
            <Categories/>
            <Products />
            <NewsLetter />
            <Footer />
            
        </div>
    )
}

export default Home