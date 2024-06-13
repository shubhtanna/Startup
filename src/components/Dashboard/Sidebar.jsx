import React from 'react'
import { individualLinks, sidebarLinks, vendorLinks } from '../../Data/dashboardLink'
import SidebarLink from './SidebarLink'
import IndividualSidebarLinks from './IndividualSidebarLinks'
import { useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from '../../utils/constant'

const Sidebar = () => {

    const { user } = useSelector((state) => state.profile);

    return (

        <div className='h-screen bg-[#292D2A] min-w-[calc(100vh-30rem)] text-white flex flex-col  gap-5 pt-10 '>

            <div className='flex flex-col gap-5'>
                {
                    sidebarLinks.map((link, index) => (
                        <SidebarLink link={link} iconName={link.icon} key={index} />
                    ))
                }
            </div>

            <hr className='text-[#fff] w-[90%] mx-auto mb-12 mt-16' />

            {user?.accountType === ACCOUNT_TYPE.INDIVIDUAL && (
                <div className='flex flex-col gap-8'>
                    {
                        individualLinks.map((link) => (
                            <IndividualSidebarLinks link={link} iconName={link.icon} key={link.id} />
                        ))
                    }
                </div>
            )}

            {
                user?.accountType === ACCOUNT_TYPE.VENDOR && (
                    <div className='flex flex-col gap-8'>
                        {
                            vendorLinks.map((link) => (
                                <IndividualSidebarLinks link={link} iconName={link.icon} key={link.id} />
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Sidebar
