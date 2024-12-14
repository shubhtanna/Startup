import React, { useState, useEffect } from 'react';
import { CgProfile } from 'react-icons/cg';
import { RiAwardFill, RiLogoutCircleRLine } from 'react-icons/ri';
import { IoIosSettings } from 'react-icons/io';
import { FaBookmark, FaPlus } from 'react-icons/fa';
import { FaHeartCirclePlus } from 'react-icons/fa6';

// Sidebar links for users
export const sidebarLinks = [
  {
    id: 1,
    name: 'My Profile',
    path: '/dashboard/my-profile',
    icon: <CgProfile />,
  },
  {
    id: 2,
    name: 'Redeem award',
    path: '/dashboard/redeem-award',
    icon: <RiAwardFill />,
  },
  {
    id: 3,
    name: 'Settings',
    path: '/dashboard/settings',
    icon: <IoIosSettings />,
  },
  {
    id: 4,
    name: 'Logout',
    icon: <RiLogoutCircleRLine />,
  },
];

// Links specific to individual users
export const individualLinks = [
  {
    id: 1,
    name: 'My Products',
    path: '/dashboard/my-products',
    icon: <FaBookmark />,
  },
  {
    id: 2,
    name: 'Add product',
    path: '/dashboard/add-product',
    icon: <FaPlus />,
  },
  {
    id: 3,
    name: 'Interested products',
    path: '/dashboard/interested-products',
    icon: <FaHeartCirclePlus />,
  },
];

// Links specific to vendors
export const vendorLinks = [
  {
    id: 1,
    name: 'All Products',
    path: '/dashboard/all-products',
    icon: <FaBookmark />,
  },
  {
    id: 2,
    name: 'Interested products',
    path: '/dashboard/intrested-shopkeeper-products',
    icon: <FaHeartCirclePlus />,
  },
];

const Sidebar = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  // Check screen size on initial load and window resize
  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 768); // Set condition for small screens (<768px)
  };

  useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize); // Add event listener to handle window resize
    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup on unmount
    };
  }, []);

  return (
    <div className={`bg-gray-800 text-white ${isSmallScreen ? 'w-16' : 'w-64'} transition-all duration-300 h-full`}>
      <div className="mt-10">
        {/* Check if sidebarLinks array exists and map through it */}
        {sidebarLinks && sidebarLinks.length > 0 && (
          <ul className="space-y-4">
            {sidebarLinks.map((link) => (
              <li key={link.id} className="flex items-center space-x-4 pl-4 py-2 hover:bg-gray-700">
                <span className="text-2xl">{link.icon}</span>
                {!isSmallScreen && <span className="text-lg">{link.name}</span>} {/* Show name only on larger screens */}
              </li>
            ))}
          </ul>
        )}

        {/* Check if individualLinks array exists and map through it */}
        {individualLinks && individualLinks.length > 0 && (
          <ul className="space-y-4 mt-10">
            {individualLinks.map((link) => (
              <li key={link.id} className="flex items-center space-x-4 pl-4 py-2 hover:bg-gray-700">
                <span className="text-2xl">{link.icon}</span>
                {!isSmallScreen && <span className="text-lg">{link.name}</span>} {/* Show name only on larger screens */}
              </li>
            ))}
          </ul>
        )}

        {/* Check if vendorLinks array exists and map through it */}
        {vendorLinks && vendorLinks.length > 0 && (
          <ul className="space-y-4 mt-10">
            {vendorLinks.map((link) => (
              <li key={link.id} className="flex items-center space-x-4 pl-4 py-2 hover:bg-gray-700">
                <span className="text-2xl">{link.icon}</span>
                {!isSmallScreen && <span className="text-lg">{link.name}</span>} {/* Show name only on larger screens */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
