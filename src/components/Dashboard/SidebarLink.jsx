import React from 'react'
import { NavLink } from 'react-router-dom'
import { matchPath, useLocation } from 'react-router-dom';

const SidebarLink = ({ link, iconName }) => {

    const location = useLocation();


    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }


    return (
        <div>
            {
               
                    <NavLink to={link.path} className={`font-medium font-roboto text-[20px] mx-auto transition-all duration-200 ${matchRoute(`${link.path}`) ? "text-[#F19A3E]" : "text-white"}`}>
                        <div className='flex items-center px-5 gap-x-2'>
                            {iconName}
                            <span>{link.name}</span>
                        </div>
                    </NavLink>
                
            }
        </div>
    )
}

export default SidebarLink
