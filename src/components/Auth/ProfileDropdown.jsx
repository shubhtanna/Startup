import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineCaretDown } from "react-icons/ai";
import { RiDashboardLine, RiLogoutCircleRLine } from "react-icons/ri";
import { logout } from "../../Services/Operation/authAPI";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

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
    // Show confirmation dialog
    const confirmLogout = window.confirm(t("Are you sure you want to logout?"));
    if (confirmLogout) {
      // If confirmed, dispatch the logout action
      dispatch(logout(navigate));
      setOpen(false);

      // Show a success toast notification
      toast.success(t("Logged out successfully!"));
    } else {
      // If canceled, just close the dropdown
      setOpen(false);
    }
  };

  return (
    <button className="relative cursor-pointer" onClick={toggleDropdown}>
      <div className="flex items-center gap-x-1 relative">
        <div className="relative">
          <img
            src={user.image}
            alt={`profile-${user.firstName}`}
            className="w-[30px] h-[30px] rounded-full object-cover"
          />
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
          </span>
        </div>
        {user.accountType !== "admin" && <AiOutlineCaretDown />}
      </div>

      {open && (
        <div
          ref={ref}
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[18px] right-0 z-[1000] rounded-md bg-[#FEFDED] divide-y divide-gray-200"
        >
          {user.accountType !== "admin" && (
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
