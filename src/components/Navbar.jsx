import React from 'react'

const Navbar = () => {
  return (
<nav className='flex justify-between bg-slate-700 text-white py-2'>
  <div className='logo'>
    <span className='font-bold text-xl mx-8'>iTask</span>
  </div>
  <ul className='flex gap-8 mx-9'>
    <li> <a className='cursor-pointer hover:text-orange-400 hover:font-bold transition-all duration-500' href="">Home</a></li>
    <li> <a className='cursor-pointer hover:text-orange-400 hover:font-bold transition-all duration-500' href="">Your Tasks</a></li>
  </ul>
</nav>
  )
}

export default Navbar 