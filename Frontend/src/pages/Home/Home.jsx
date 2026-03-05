import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import CakeFilter from '../../components/CakeFilter/CakeFilter'
import SubNavbar from '../../components/SubNavbar/SubNavbar'
import Products from '../../components/Product/Products'
import CustomCakeBanner from '../../components/CustomCakeBanner/CustomCakeBanner'
import CelebrationSection from '../../components/CelebrationSection/CelebrationSection'
import TrendingCakes from '../../components/TrendingCakes/TrendingCakes'
import Collections from '../../components/Collections/Collections'
import Features from '../../components/Features/Features'
import Testimonials from '../../components/Testimonials/Testimonials'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  return (
    <div>
        <Navbar />
        <SubNavbar  />
        <Hero />
        <CakeFilter />
        <TrendingCakes />
        <Products />
        <Collections />
        <CelebrationSection />
        <CustomCakeBanner />
        <Features />
        <Testimonials />
        <Footer />
    </div>
  )
}

export default Home