import React from 'react'
import './Header.scss'
import TheKnotLogo from './The-Knot.png'

export const Header = () => (
  <div className='header'>
    <img
      alt='TheKnot.com Logo'
      className='knot-logo'
      src={TheKnotLogo} />
    <ul className='links'>
      <li className='link-tab'>Local Vendors</li>
      <li className='link-tab'>Ideas + Etiquette</li>
      <li className='link-tab'>Real Weddings</li>
      <li className='link-tab'>Dresses + Jewelry</li>
      <li className='link-tab'>Registry</li>
      <li className='link-tab'>Shop</li>
    </ul>
  </div>
)

export default Header
