import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { RiDashboardLine, RiLogoutCircleRLine } from "react-icons/ri";
import { logout } from '../../Services/Operation/authAPI';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { useTranslation } from 'react-i18next';

const ProfileDropdown = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false));

  if (!user) return null;

  const toggleDropdown = () => setOpen((prev) => !prev);

  const handleLogout = () => {
    dispatch(logout(navigate));
    setOpen(false);
  };

  return (
    <button className="relative cursor-pointer" onClick={toggleDropdown}>
      <div className="flex items-center gap-x-1">
        <img
          src={user.image}
          alt={`profile-${user.firstName}`}
          className="w-[30px] rounded-full object-cover"
        />
        {user.accountType !== 'admin' && <AiOutlineCaretDown />}
      </div>

      {open && (
        <div
          ref={ref}
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[18px] right-0 z-[1000] rounded-md bg-[#FEFDED] divide-y divide-gray-200"
        >
          {user.accountType !== 'admin' && (
            <Link
              to="/dashboard/my-profile"
              className="flex items-center gap-x-1 py-2 px-3 text-base"
              onClick={toggleDropdown}
            >
              <RiDashboardLine />
              {t("Dashboard")}
            </Link>
          )}
          <div
            onClick={handleLogout}
            className="flex items-center gap-x-1 py-2 px-3 text-base cursor-pointer"
          >
            <RiLogoutCircleRLine />
            {t("Logout")}
          </div>
        </div>
      )}
    </button>
  );
};

export default ProfileDropdown;
