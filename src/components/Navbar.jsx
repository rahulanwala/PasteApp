import React from 'react'
import { NavLink } from 'react-router'

const Navbar = () => {
  return (
    <div className='flex flex-row gap-4 p-2 place-content-evenly bg-gray-600 fixed top-0 left-0 w-full mb-1000 z-50'>
      <NavLink to={"/"} className='pl-1 pr-1 font-semibold text-2xl'>
        Home
      </NavLink>
      <NavLink to={"/pastes"} className='pl-1 pr-1 font-semibold text-2xl'>
        Paste
      </NavLink>
    </div>
  )
}

export default Navbar
