import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineCaretDown } from 'react-icons/ai'
import { RiDashboardLine } from "react-icons/ri";
import { logout } from '../../Services/Operation/authAPI';
import { RiLogoutCircleRLine } from "react-icons/ri";

const ProfileDropdown = () => {

  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);

  const [open, setOpen] = useState(false);
  return (
    <button className=' relative cursor-pointer' onClick={() => setOpen(true)}>

      <div className='flex items-center gap-x-1'>
        <img src={user?.image}
          alt={`profile-${user?.firstName}`}
          className=' aspect-square w-[30px] rounded-full object-cover' />
        <AiOutlineCaretDown />
      </div>
      {
        open && (
          <div onClick={(e) => e.stopPropagation()}
            className='absolute top-[18px] right-0 z-[1000] divide-y-[1px] overflow-hidden rounded-md bg-[#FEFDED]' ref={ref}>
            <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
              <div className='flex w-full items-center gap-x-1 py-[10px] px-[12px] text-base'>
                <RiDashboardLine />
                Dashboard
              </div>
            </Link>

            <div onClick={() => {
              dispatch(logout(navigate))
              setOpen(false)
            }}
            className='flex w-full items-center gap-x-1 py-[10px] px-[12px] text-base'>
              <RiLogoutCircleRLine/>
              Logout
            </div>
          </div>
        )
      }
    </button>
  )
}

export default ProfileDropdown