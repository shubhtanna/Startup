import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LOGO from '../../assets/LOGO.png'
import { useSelector } from 'react-redux'
import ProfileDropdown from '../Auth/ProfileDropdown'

const Navbar = () => {

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const location = useLocation();

  const [loading,setLoading] = useState(false);
  return (
    <div className=' bg-[#fff] p-5 border-2 '>

      <div className=' w-10/12 mx-auto flex justify-between items-center '>

        <Link to="/">
          <img src={LOGO} loading='lazy' height={43} width={43}/>
        </Link>

        <nav className='ml-10'>
          <ul className='flex flex-row gap-x-20 font-roboto font-medium text-2xl'>

            <li><Link to="/">Home</Link></li>

            {token === null ? (<li><Link to="/about">About</Link></li>) : (user && user.accountType !== "Vendor") ? (<li><Link to="/allvendors">Vendors</Link></li>) : (<li><Link to="/dashboard/all-products">All Products</Link></li>)}

            {/* <li><Link to="/about">About</Link></li> */}

            {/* <li><Link to="/contact">Contact</Link></li> */}

            {token === null ? (<li><Link to="/about">Contact</Link></li>) : (user && user.accountType !== "Vendor") ? (<li><Link to="/dashboard/add-product">Add Product</Link></li>) : (<li><Link to="/allproducts">Interested Products</Link></li>)}
          </ul>
        </nav>

        <div className='flex gap-x-5'>
          {/* {
            user && user.accountType != "Vendor" && (
              <Link to="/dashboard/my-products" className='relative'>
                hmmmmmm
              </Link>
            )
          } */}
          {
            token === null && (
              <Link to="/signup">
                <button className=' border-2 border-[#28735A] text-[#28735A] text-2xl font-medium py-1 px-7 rounded-2xl font-inter hover:bg-[#28735A] hover:text-white hover:scale-110 transition-all duration-200'>Signup</button>
              </Link>
            )
          }
{
            token === null && (
              <Link to="/login">
                <button className='bg-[#28735A] border-2 border-[#28735A] text-white font-medium text-2xl font-inter py-1 px-7 rounded-2xl hover:bg-[#fff] hover:text-[#28735A] hover:scale-110 transition-all duration-200'>Login</button>
              </Link>
            )
          }
          {token !== null && <ProfileDropdown/>}
        </div>
      </div>
    </div>
  )
}

export default Navbar
