 import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LOGO from '../../assets/LOGO.png';
import { useSelector } from 'react-redux';
import ProfileDropdown from '../Auth/ProfileDropdown';
import { useTranslation } from 'react-i18next';
import Languageselector from '../language-selector';

const Navbar = () => {
  const { t } = useTranslation();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false); // Toggle state

  // Function to toggle the menu
  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='bg-white p-5 border-2'>
      <div className='w-10/12 mx-auto flex justify-between items-center'>
        <Link to="/">
          <img src={LOGO} loading='lazy' height={50} width={100} alt="Logo" />
        </Link>

        {/* Hamburger Menu Icon for small devices */}
        <button 
          className="block lg:hidden text-3xl"
          onClick={handleToggleMenu}
        >
          {isMenuOpen ? '✖' : '☰'} {/* Change icon based on menu state */}
        </button>

        {/* Desktop Menu */}
        <nav className='hidden lg:block ml-10'>
          <ul className='flex flex-row gap-x-20 font-roboto font-medium text-2xl'>
            <li><Link to="/">{t("Home")}</Link></li>
            {token === null 
              ? (<li><Link to="/about">{t("About")}</Link></li>)
              : (user && user.accountType !== "Vendor") 
              ? (<li><Link to="/allvendors">{t("Vendors")}</Link></li>)
              : (<li><Link to="/dashboard/all-products">{t("All Products")}</Link></li>)
            }

            {token === null 
              ? (<li><Link to="/about">{t("Contact")}</Link></li>)
              : (user && user.accountType !== "Vendor")
              ? (<li><Link to="/dashboard/add-product">{t("Add Product")}</Link></li>)
              : (<li><Link to="/allproducts">{t("Interested Products")}</Link></li>)
            }
          </ul>
        </nav>

        {/* Desktop Language Selector and Buttons */}
        <div className='hidden lg:flex gap-x-5'>
          <Languageselector />
          {token === null && (
            <>
              <Link to="/signup">
                <button className='border-2 border-[#28735A] text-[#28735A] text-2xl font-medium py-1 px-7 rounded-2xl font-inter hover:bg-[#28735A] hover:text-white hover:scale-110 transition-all duration-200'>
                  {t("Signup")}
                </button>
              </Link>
              <Link to="/login">
                <button className='bg-[#28735A] border-2 border-[#28735A] text-white font-medium text-2xl font-inter py-1 px-7 rounded-2xl hover:bg-[#fff] hover:text-[#28735A] hover:scale-110 transition-all duration-200'>
                  {t("Login")}
                </button>
              </Link>
            </>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='lg:hidden mt-4'>
          <nav>
            <ul className='flex flex-col gap-y-5 text-xl'>
              <li><Link to="/">{t("Home")}</Link></li>
              {token === null 
                ? (<li><Link to="/about">{t("About")}</Link></li>)
                : (user && user.accountType !== "Vendor")
                ? (<li><Link to="/allvendors">{t("Vendors")}</Link></li>)
                : (<li><Link to="/dashboard/all-products">{t("All Products")}</Link></li>)
              }
              {token === null 
                ? (<li><Link to="/about">{t("Contact")}</Link></li>)
                : (user && user.accountType !== "Vendor")
                ? (<li><Link to="/dashboard/add-product">{t("Add Product")}</Link></li>)
                : (<li><Link to="/allproducts">{t("Interested Products")}</Link></li>)
              }
              <li><Languageselector /></li>
              {token === null && (
                <>
                  <li>
                    <Link to="/signup">
                      <button className='border-2 border-[#28735A] text-[#28735A] text-xl font-medium py-1 px-7 rounded-2xl font-inter hover:bg-[#28735A] hover:text-white transition-all duration-200'>
                        {t("Signup")}
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/login">
                      <button className='bg-[#28735A] border-2 border-[#28735A] text-white text-xl font-medium py-1 px-7 rounded-2xl hover:bg-[#fff] hover:text-[#28735A] transition-all duration-200'>
                        {t("Login")}
                      </button>
                    </Link>
                  </li>
                </>
              )}
              {token !== null && (
                <li><ProfileDropdown /></li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
