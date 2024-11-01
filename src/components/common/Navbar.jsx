// //  import React, { useState } from 'react';
// // import { Link, useLocation } from 'react-router-dom';
// // import LOGO from '../../assets/LOGO.png';
// // import { useSelector } from 'react-redux';
// // import ProfileDropdown from '../Auth/ProfileDropdown';
// // import { useTranslation } from 'react-i18next';
// // import Languageselector from '../language-selector';

// // const Navbar = () => {
// //   const { t } = useTranslation();
// //   const { token } = useSelector((state) => state.auth);
// //   const { user } = useSelector((state) => state.profile);
// //   const location = useLocation();

// //   const [isMenuOpen, setIsMenuOpen] = useState(false); // Toggle state

// //   // Function to toggle the menu
// //   const handleToggleMenu = () => {
// //     setIsMenuOpen(!isMenuOpen);
// //   };

// //   return (
// //     <div className='bg-white p-5 border-2'>
// //       <div className='w-10/12 mx-auto flex justify-between items-center'>
// //         <Link to="/">
// //           <img src={LOGO} loading='lazy' height={50} width={100} alt="Logo" />
// //         </Link>

// //         {/* Hamburger Menu Icon for small devices */}
// //         <button 
// //           className="block lg:hidden text-3xl"
// //           onClick={handleToggleMenu}
// //         >
// //           {isMenuOpen ? '✖' : '☰'} {/* Change icon based on menu state */}
// //         </button>

// //         {/* Desktop Menu */}
// //         <nav className='hidden lg:block ml-10'>
// //           <ul className='flex flex-row gap-x-20 font-roboto font-medium text-2xl'>
// //             <li><Link to="/">{t("Home")}</Link></li>
// //             {token === null 
// //               ? (<li><Link to="/about">{t("About")}</Link></li>)
// //               : (user && user.accountType !== "Vendor") 
// //               ? (<li><Link to="/allvendors">{t("Vendors")}</Link></li>)
// //               : (<li><Link to="/dashboard/all-products">{t("All Products")}</Link></li>)
// //             }

// //             {token === null 
// //               ? (<li><Link to="/about">{t("Contact")}</Link></li>)
// //               : (user && user.accountType !== "Vendor")
// //               ? (<li><Link to="/dashboard/add-product">{t("Add Product")}</Link></li>)
// //               : (<li><Link to="/allproducts">{t("Interested Products")}</Link></li>)
// //             }
// //           </ul>
// //         </nav>

// //         {/* Desktop Language Selector and Buttons */}
// //         <div className='hidden lg:flex gap-x-5'>
// //           <Languageselector />
// //           {token === null && (
// //             <>
// //               <Link to="/signup">
// //                 <button className='border-2 border-[#28735A] text-[#28735A] text-2xl font-medium py-1 px-7 rounded-2xl font-inter hover:bg-[#28735A] hover:text-white hover:scale-110 transition-all duration-200'>
// //                   {t("Signup")}
// //                 </button>
// //               </Link>
// //               <Link to="/login">
// //                 <button className='bg-[#28735A] border-2 border-[#28735A] text-white font-medium text-2xl font-inter py-1 px-7 rounded-2xl hover:bg-[#fff] hover:text-[#28735A] hover:scale-110 transition-all duration-200'>
// //                   {t("Login")}
// //                 </button>
// //               </Link>
// //             </>
// //           )}
// //           {token !== null && <ProfileDropdown />}
// //         </div>
// //       </div>

// //       {/* Mobile Menu */}
// //       {isMenuOpen && (
// //         <div className='lg:hidden mt-4'>
// //           <nav>
// //             <ul className='flex flex-col gap-y-5 text-xl'>
// //               <li><Link to="/">{t("Home")}</Link></li>
// //               {token === null 
// //                 ? (<li><Link to="/about">{t("About")}</Link></li>)
// //                 : (user && user.accountType !== "Vendor")
// //                 ? (<li><Link to="/allvendors">{t("Vendors")}</Link></li>)
// //                 : (<li><Link to="/dashboard/all-products">{t("All Products")}</Link></li>)
// //               }
// //               {token === null 
// //                 ? (<li><Link to="/about">{t("Contact")}</Link></li>)
// //                 : (user && user.accountType !== "Vendor")
// //                 ? (<li><Link to="/dashboard/add-product">{t("Add Product")}</Link></li>)
// //                 : (<li><Link to="/allproducts">{t("Interested Products")}</Link></li>)
// //               }
// //               <li><Languageselector /></li>
// //               {token === null && (
// //                 <>
// //                   <li>
// //                     <Link to="/signup">
// //                       <button className='border-2 border-[#28735A] text-[#28735A] text-xl font-medium py-1 px-7 rounded-2xl font-inter hover:bg-[#28735A] hover:text-white transition-all duration-200'>
// //                         {t("Signup")}
// //                       </button>
// //                     </Link>
// //                   </li>
// //                   <li>
// //                     <Link to="/login">
// //                       <button className='bg-[#28735A] border-2 border-[#28735A] text-white text-xl font-medium py-1 px-7 rounded-2xl hover:bg-[#fff] hover:text-[#28735A] transition-all duration-200'>
// //                         {t("Login")}
// //                       </button>
// //                     </Link>
// //                   </li>
// //                 </>
// //               )}
// //               {token !== null && (
// //                 <li><ProfileDropdown /></li>
// //               )}
// //             </ul>
// //           </nav>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Navbar;


// import React, { useState,useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import LOGO from '../../assets/LOGO.png';
// import { useSelector } from 'react-redux';
// import ProfileDropdown from '../Auth/ProfileDropdown';
// import { useTranslation } from 'react-i18next';
// import Languageselector from '../language-selector';

// const Navbar = () => {
//   const { t } = useTranslation();
//   const { token } = useSelector((state) => state.auth);
//   const { user } = useSelector((state) => state.profile);
//   const [darkMode, setDarkMode] = useState(false);
//   const location = useLocation();

//   const [isMenuOpen, setIsMenuOpen] = useState(false); // Toggle state

//   // Function to toggle the menu
//   const handleToggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//     if (!darkMode) {
//       document.documentElement.classList.add('dark');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//       localStorage.setItem('theme', 'light');
//     }
//   }

//   useEffect(()=>{
//     const savedTheme = localStorage.getItem('theme');
//     if(savedTheme === 'dark'){
//       setDarkMode(true);
//       document.documentElement.classList.add('dark');
//     }
//   },[]);

//   return (
//     <div className='bg-white p-5 border-2'>
//       <div className='w-10/12 mx-auto flex justify-between items-center'>
//         <Link to="/">
//           <img src={LOGO} loading='lazy' height={50} width={100} alt="Logo" />
//         </Link>

//         {/* Hamburger Menu Icon for small devices */}
//         <button 
//           className="block lg:hidden text-3xl"
//           onClick={handleToggleMenu}
//         >
//           {isMenuOpen ? '✖' : '☰'} {/* Change icon based on menu state */}
//         </button>

//         {/* Desktop Menu */}
//         <nav className='hidden lg:block ml-10'>
//           <ul className='flex flex-row gap-x-10 font-roboto font-medium text-xl'>
//             <li><Link to="/">{t("Home")}</Link></li>
//             {token === null 
//               ? (<li><Link to="/about">{t("About")}</Link></li>)
//               : (user && user.accountType !== "Vendor") 
//               ? (<li><Link to="/allvendors">{t("Vendors")}</Link></li>)
//               : (<li><Link to="/dashboard/all-products">{t("All Products")}</Link></li>)
//             }

//             {token === null 
//               ? (<li><Link to="/contact">{t("Contact")}</Link></li>)
//               : (user && user.accountType !== "Vendor")
//               ? (<li><Link to="/dashboard/add-product">{t("Add Product")}</Link></li>)
//               : (<li><Link to="/allproducts">{t("Interested Products")}</Link></li>)
//             }

//             {/* Conditionally render Feedback link if user is logged in */}
//             {token && (
//               <li><Link to="/raise-ticket">{t("Feedback")}</Link></li>
//             )}
//           </ul>
//         </nav>

//         {/* Desktop Language Selector and Buttons */}
//         <div className='hidden lg:flex gap-x-5'>
//           <Languageselector />
//           {token === null && (
//             <>
//               <Link to="/signup">
//                 <button className='border-2 border-[#28735A] text-[#28735A] text-xl font-medium py-1 px-5 rounded-2xl font-inter hover:bg-[#28735A] hover:text-white hover:scale-110 transition-all duration-200'>
//                   {t("Signup")}
//                 </button>
//               </Link>
//               <Link to="/login">
//                 <button className='bg-[#28735A] border-2 border-[#28735A] text-white font-medium text-xl font-inter py-1 px-5 rounded-2xl hover:bg-[#fff] hover:text-[#28735A] hover:scale-110 transition-all duration-200'>
//                   {t("Login")}
//                 </button>
//               </Link>
//             </>
//           )}
//           {token !== null && <ProfileDropdown />}
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className='lg:hidden mt-4'>
//           <nav>
//             <ul className='flex flex-col gap-y-5 text-xl'>
//               <li><Link to="/">{t("Home")}</Link></li>
//               {token === null 
//                 ? (<li><Link to="/about">{t("About")}</Link></li>)
//                 : (user && user.accountType !== "Vendor")
//                 ? (<li><Link to="/allvendors">{t("Vendors")}</Link></li>)
//                 : (<li><Link to="/dashboard/all-products">{t("All Products")}</Link></li>)
//               }

//               {token === null 
//                 ? (<li><Link to="/contact">{t("Contact")}</Link></li>)
//                 : (user && user.accountType !== "Vendor")
//                 ? (<li><Link to="/dashboard/add-product">{t("Add Product")}</Link></li>)
//                 : (<li><Link to="/allproducts">{t("Interested Products")}</Link></li>)
//               }

//               {/* Feedback link for mobile, shown only when logged in */}
//               {token && (
//                 <li><Link to="/raise-ticket">{t("Feedback")}</Link></li>
//               )}
              
//               <li><Languageselector /></li>
//               {token === null && (
//                 <>
//                   <li>
//                     <Link to="/signup">
//                       <button className='border-2 border-[#28735A] text-[#28735A] text-xl font-medium py-1 px-5 rounded-2xl font-inter hover:bg-[#28735A] hover:text-white transition-all duration-200'>
//                         {t("Signup")}
//                       </button>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="/login">
//                       <button className='bg-[#28735A] border-2 border-[#28735A] text-white text-xl font-medium py-1 px-5 rounded-2xl hover:bg-[#fff] hover:text-[#28735A] transition-all duration-200'>
//                         {t("Login")}
//                       </button>
//                     </Link>
//                   </li>
//                   <button onClick={toggleDarkMode} className='bg-[#28735A] border-2 border-[#28735A] text-white text-xl font-medium py-1 px-5 rounded-2xl hover:bg-[#fff] hover:text-[#28735A] transition-all duration-200'>
//                       {darkMode ? 'Light Mode' : 'Dark Mode'}
//                     </button>
//                 </>
//               )}
//               {token !== null && (
//                 <li><ProfileDropdown /></li>
//               )}
//             </ul>
//           </nav>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;


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
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/">
          <img src={LOGO} loading="lazy" height={50} width={100} alt="Logo" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-x-8 items-center">
          <ul className="flex gap-x-8 font-medium text-lg text-gray-700 dark:text-gray-300">
            <li><Link to="/">{t("Home")}</Link></li>
            {token === null ? (
              <li><Link to="/about">{t("About")}</Link></li>
            ) : user?.accountType !== "Vendor" ? (
              <li><Link to="/allvendors">{t("Vendors")}</Link></li>
            ) : (
              <li><Link to="/dashboard/all-products">{t("All Products")}</Link></li>
            )}
            {token === null ? (
              <li><Link to="/contact">{t("Contact")}</Link></li>
            ) : user?.accountType !== "Vendor" ? (
              <li><Link to="/dashboard/add-product">{t("Add Product")}</Link></li>
            ) : (
              <li><Link to="/allproducts">{t("Interested Products")}</Link></li>
            )}
            {token && <li><Link to="/raise-ticket">{t("Feedback")}</Link></li>}
          </ul>
          <Languageselector />
          <button
            onClick={toggleDarkMode}
            className="ml-4 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {darkMode ? t("Light Mode") : t("Dark Mode")}
          </button>
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

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="lg:hidden bg-gray-100 dark:bg-gray-800 p-4 mt-2 rounded-lg shadow-lg">
          <ul className="flex flex-col gap-y-4 text-lg text-gray-700 dark:text-gray-300">
            <li><Link to="/" onClick={handleToggleMenu}>{t("Home")}</Link></li>
            {token === null ? (
              <li><Link to="/about" onClick={handleToggleMenu}>{t("About")}</Link></li>
            ) : user?.accountType !== "Vendor" ? (
              <li><Link to="/allvendors" onClick={handleToggleMenu}>{t("Vendors")}</Link></li>
            ) : (
              <li><Link to="/dashboard/all-products" onClick={handleToggleMenu}>{t("All Products")}</Link></li>
            )}
            {token === null ? (
              <li><Link to="/contact" onClick={handleToggleMenu}>{t("Contact")}</Link></li>
            ) : user?.accountType !== "Vendor" ? (
              <li><Link to="/dashboard/add-product" onClick={handleToggleMenu}>{t("Add Product")}</Link></li>
            ) : (
              <li><Link to="/allproducts" onClick={handleToggleMenu}>{t("Interested Products")}</Link></li>
            )}
            {token && (
              <li><Link to="/raise-ticket" onClick={handleToggleMenu}>{t("Feedback")}</Link></li>
            )}
            <Languageselector />
            <button
              onClick={toggleDarkMode}
              className="mt-2 px-4 py-2 w-full rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              {darkMode ? t("Light Mode") : t("Dark Mode")}
            </button>
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
