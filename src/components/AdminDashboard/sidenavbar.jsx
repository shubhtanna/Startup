import React, { useState} from "react";
import { useSelector } from 'react-redux';
import {
  FaHome,
  FaUsers,
  FaAddressBook,
  FaRegCalendarAlt,
  FaChartBar,
  FaChartPie as FaPieChart,
  FaChartLine,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { BsFillTicketFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import UserInformations from "./AdminComponents/Data/UserInformations";
import ManageAdmin from "./AdminComponents/Data/ManageAdmin";
import RaiseTickets from "./AdminComponents/Pages/RaiseTickets";
import Calendar from "./AdminComponents/Pages/Calendar";
import GeographyChart from "./AdminComponents/Charts/GeographyChart";
import LineChart from "./AdminComponents/Charts/LineChart";
import BarChart from "./AdminComponents/Charts/BarChart";
import PieChart from "./AdminComponents/Charts/PieChart";
import Dashboard from "./Dashboard";


const Sidenavbar = () => {
  const [active, setActive] = useState("Dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useSelector((state) => state.profile)
  const {t} = useTranslation();


  const navSections = [
    {
      section: t("Data"),
      items: [
        { name: t("User Informations"), icon: <FaAddressBook />, component: <div><UserInformations/></div> },
        { name: t("Manage Admin"), icon: <FaUsers />, component: <div><ManageAdmin/></div> },
      ],
    },
    {
      section: t("Pages"),
      items: [
        { name: t("Raise Tickets"), icon: <BsFillTicketFill />, component: <div><RaiseTickets/></div> },
        { name: t("Calendar"), icon: <FaRegCalendarAlt />, component: <div><Calendar/></div> },
      ],
    },
    {
      section: t("Charts"),
      items: [
        { name: t("Geography Chart"), icon: <FaMapMarkedAlt />, component: <div><GeographyChart/></div> },
        { name: t("Line Chart"), icon: <FaChartLine />, component: <div><LineChart/></div> },
        { name: t("Bar Chart"), icon: <FaChartBar />, component: <div><BarChart/></div> },
        { name: t("Pie Chart"), icon: <FaPieChart />, component: <div><PieChart/></div> },
      ],
    },
  ];

  return (
    <div className="flex h-screen md:flex-row flex-col">
      {/* Sidebar for Desktop */}
      <nav
        className={`hidden md:flex flex-col bg-gray-800 text-white transition-all duration-300 p-4 space-y-2 overflow-y-auto`}
      >
        {/* Admin Info */}
        <div className="flex items-center space-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.image}`}
            className="w-10 h-10 rounded-full"
          />
            <div>
              <h3 className="font-bold">{user?.firstName + " " + user?.lastName}</h3>
              <p className="text-sm text-gray-400">{t("E-Waste Trade Admin")}</p>
            </div>
        </div>
        <hr className="my-4 border-gray-300" />

        {/* Dashboard Link */}
        <button
          onClick={() => setActive("Dashboard")}
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "space-x-4"
          } p-2 rounded-md ${
            active === "Dashboard"
              ? "bg-gray-600"
              : "hover:bg-gray-700 text-gray-400"
          }`}
        >
          <FaHome />
          {!isCollapsed && <span>{t("Dashboard")}</span>}
        </button>

        {/* Navigation Sections */}
        {navSections.map((section, idx) => (
          <div key={idx} className="mt-4">
            {!isCollapsed && <h4 className="text-gray-400 uppercase text-sm mb-2">{section.section}</h4>}
            {section.items.map((item) => (
              <button
                key={item.name}
                onClick={() => setActive(item.name)}
                className={`flex items-center ${
                  isCollapsed ? "justify-center" : "space-x-4"
                } p-2 rounded-md ${
                  active === item.name
                    ? "bg-gray-600"
                    : "hover:bg-gray-700 text-gray-400"
                }`}
              >
                {item.icon}
                {!isCollapsed && <span>{item.name}</span>}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* Bottom Navbar for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 flex items-center justify-around bg-gray-800 text-white p-2 z-10">
        {[{ name: "Dashboard", icon: <FaHome /> }].concat(
          navSections.flatMap((section) => section.items)
        ).map((item) => (
          <button
            key={item.name}
            onClick={() => setActive(item.name)}
            className={`flex flex-col items-center space-y-1 ${
              active === item.name ? "text-blue-400" : "hover:text-blue-200"
            }`}
          >
            {item.icon}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4 bg-gray-100 overflow-y-auto">
        {navSections
          .flatMap((section) => section.items)
          .concat([{ name: "Dashboard", component: <div><Dashboard/></div> }])
          .find((item) => item.name === active)?.component}
      </main>
    </div>
  );
};

export default Sidenavbar;