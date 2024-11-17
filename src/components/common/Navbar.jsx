import React, { useState, useEffect } from 'react';
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
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Load saved theme from local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white dark:bg-gray-900 p-5 border-b dark:border-gray-700">
      <div className="container mx-auto flex items-center justify-between ">
        <Link to="/">
          <img src={LOGO} loading="lazy" height={50} width={100} alt="Logo" />
        </Link>
        <nav className="hidden lg:flex gap-x-8 items-center">
        <ul className="flex flex-col md:flex-row gap-y-4 md:gap-x-8 font-medium text-base md:text-lg text-gray-700 dark:text-gray-300 md:mr-[170px] mr-4">
            {/* Conditionally render "Home" link */}
            {!token || user?.accountType !== "admin" ? (
              <li><Link to="/">{t("Home")}</Link></li>
            ) : null}

            {/* Conditionally render links based on account type */}
            {token === null ? (
              <li><Link to="/about">{t("About")}</Link></li>
            ) : user?.accountType !== "Vendor" && user?.accountType !== "admin" ? (
              <li><Link to="/allvendors">{t("Vendors")}</Link></li>
            ) : user?.accountType === "admin" ? null : (
              <li><Link to="/dashboard/all-products">{t("All Products")}</Link></li>
            )}

            {token === null ? (
              <li><Link to="/contact">{t("Contact")}</Link></li>
            ) : user?.accountType !== "Vendor" && user?.accountType !== "admin" ? (
              <li><Link to="/dashboard/add-product">{t("Add Product")}</Link></li>
            ) : user?.accountType === "admin" ? null : (
              <li><Link to="/allproducts">{t("Interested Products")}</Link></li>
            )}

            {/* Conditionally render the "Feedback" link */}
            {token && user?.accountType !== "admin" && (
              <li><Link to="/raise-ticket">{t("Feedback")}</Link></li>
            )}
          </ul>

          <Languageselector />
          <button
            onClick={toggleDarkMode}
            className="ml-4 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {darkMode ? t("Light Mode") : t("Dark Mode")}
          </button>

          {/* Profile dropdown or login/signup buttons based on token */}
          {token ? <ProfileDropdown /> : (
            <>
              <Link to="/signup">
                <button className="px-4 py-2 border-2 border-green-700 text-green-700 rounded-lg hover:bg-green-700 hover:text-white transition duration-200">
                  {t("Signup")}
                </button>
              </Link>
              <Link to="/login">
                <button className="ml-2 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 transition duration-200">
                  {t("Login")}
                </button>
              </Link>
            </>
          )}
        </nav>
        {/* Hamburger Menu Icon for Mobile */}
        <button className="lg:hidden text-3xl" onClick={handleToggleMenu}>
          {isMenuOpen ? '✖' : '☰'}
        </button>
      </div>
      {isMenuOpen && (
        <nav className="lg:hidden bg-gray-100 dark:bg-gray-800 p-4 mt-2 rounded-lg shadow-lg">
          <ul className="flex flex-col gap-y-4 text-lg text-gray-700 dark:text-gray-300">
            {/* Conditionally render "Home" link */}
            {(!token || user?.accountType !== "admin") && (
              <li><Link to="/" onClick={handleToggleMenu}>{t("Home")}</Link></li>
            )}

            {/* Conditionally render links based on account type */}
            {token === null ? (
              <li><Link to="/about" onClick={handleToggleMenu}>{t("About")}</Link></li>
            ) : user?.accountType !== "Vendor" && user?.accountType !== "admin" ? (
              <li><Link to="/allvendors" onClick={handleToggleMenu}>{t("Vendors")}</Link></li>
            ) : user?.accountType === "admin" ? null : (
              <li><Link to="/dashboard/all-products" onClick={handleToggleMenu}>{t("All Products")}</Link></li>
            )}

            {token === null ? (
              <li><Link to="/contact" onClick={handleToggleMenu}>{t("Contact")}</Link></li>
            ) : user?.accountType !== "Vendor" && user?.accountType !== "admin" ? (
              <li><Link to="/dashboard/add-product" onClick={handleToggleMenu}>{t("Add Product")}</Link></li>
            ) : user?.accountType === "admin" ? null : (
              <li><Link to="/allproducts" onClick={handleToggleMenu}>{t("Interested Products")}</Link></li>
            )}

            {/* Conditionally render the "Feedback" link */}
            {token && user?.accountType !== "admin" && (
              <li><Link to="/raise-ticket" onClick={handleToggleMenu}>{t("Feedback")}</Link></li>
            )}
            <div className={{ color: darkMode ? 'white' : 'black' }}>
              <Languageselector />
            </div>
            <button
              onClick={toggleDarkMode}
              className="mt-2 px-4 py-2 w-full rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              {darkMode ? t("Light Mode") : t("Dark Mode")}
            </button>

            {/* Profile dropdown or login/signup buttons based on token */}
            {!token ? (
              <>
                <Link to="/signup">
                  <button className="mt-2 w-full px-4 py-2 border-2 border-green-700 text-green-700 rounded-lg hover:bg-green-700 hover:text-white transition duration-200">
                    {t("Signup")}
                  </button>
                </Link>
                <Link to="/login">
                  <button className="mt-2 w-full px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 transition duration-200">
                    {t("Login")}
                  </button>
                </Link>
              </>
            ) : (
              <ProfileDropdown />
            )}
          </ul>
        </nav>
      )}

    </header>
  );
};

export default Navbar;
