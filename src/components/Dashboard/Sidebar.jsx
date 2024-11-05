import React, { useEffect, useState } from 'react';
import { individualLinks, sidebarLinks, vendorLinks } from '../../Data/dashboardLink';
import SidebarLink from './SidebarLink';
import IndividualSidebarLinks from './IndividualSidebarLinks';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { ACCOUNT_TYPE } from '../../utils/constant';

const Sidebar = () => {
  const { user } = useSelector((state) => state.profile);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Update screen size on load and resize
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Mobile screen width is typically less than 768px
    };
    handleResize(); // Run once on component mount
    window.addEventListener('resize', handleResize); // Listen for window resizing
    return () => window.removeEventListener('resize', handleResize); // Cleanup listener on component unmount
  }, []);

  return (
    <>
      {/* Sidebar for medium and large screens */}
      {!isSmallScreen ? (
        <div className='h-screen bg-[#292D2A] min-w-[250px] text-white flex flex-col gap-5 pt-10'>
          <div className='flex flex-col gap-5'>
            {sidebarLinks.map((link, index) => (
              <SidebarLink link={link} iconName={link.icon} key={index} />
            ))}
          </div>
          <hr className='text-[#fff] w-[90%] mx-auto mb-12 mt-16' />
          {user?.accountType === ACCOUNT_TYPE.INDIVIDUAL && (
            <div className='flex flex-col gap-8'>
              {individualLinks.map((link) => (
                <IndividualSidebarLinks link={link} iconName={link.icon} key={link.id} />
              ))}
            </div>
          )}
          {user?.accountType === ACCOUNT_TYPE.VENDOR && (
            <div className='flex flex-col gap-8'>
              {vendorLinks.map((link) => (
                <IndividualSidebarLinks link={link} iconName={link.icon} key={link.id} />
              ))}
            </div>
          )}
        </div>
      ) : (
        // Bottom navbar for small screens
        <div className='fixed bottom-0 left-0 right-0 bg-[#292D2A] text-white flex justify-around py-2'>
          {sidebarLinks.map((link, index) => (
            <Link to={link.path} key={index} className='flex flex-col items-center'>
              <span className='text-2xl'>{link.icon}</span>
            </Link>
          ))}
          {user?.accountType === ACCOUNT_TYPE.INDIVIDUAL && (
            individualLinks.map((link) => (
              <Link to={link.path} key={link.id} className='flex flex-col items-center'>
                <span className='text-2xl'>{link.icon}</span>
              </Link>
            ))
          )}
          {user?.accountType === ACCOUNT_TYPE.VENDOR && (
            vendorLinks.map((link) => (
              <Link to={link.path} key={link.id} className='flex flex-col items-center'>
                <span className='text-2xl'>{link.icon}</span>
              </Link>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default Sidebar;
