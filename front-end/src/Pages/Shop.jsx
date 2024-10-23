import React from 'react'
import Hero from '../Components/hero/Hero'
import Popular from '../Components/popular/Popular'
import Offers from '../Components/offers/Offers'
import NewCollection from '../Components/NewCollection/NewCollection'
import NewsLetter from '../Components/NewsLetter/NewsLetter'

function Shop() {
    return (
        <>
            <Hero />
            <Popular />
            <Offers />
            <NewCollection />
            <NewsLetter />
        </>
    )
}

export default Shop;