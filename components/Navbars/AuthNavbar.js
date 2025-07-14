import React, { useState, useContext, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PagesDropdown from "components/Dropdowns/PagesDropdown.js";
import { AuthContext } from "context/AuthContext";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { userRole, setUserRole } = useContext(AuthContext);
  const router = useRouter();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("userRole");
      setUserRole("guest");
      router.push("/auth/login");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              href="/"
              className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            >
              Notus NextJS
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-blueGray-700 fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto">
              <li className="flex items-center">
                <a
                  className="lg:text-blueGray-700 lg:hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/overview/notus?ref=nnjs-auth-navbar"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="lg:text-blueGray-500 text-blueGray-400 far fa-file-alt text-lg leading-lg mr-2" />{" "}
                  Docs
                </a>
              </li>
            </ul>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto items-center">
              <li className="relative mr-4">
                {/* Notification Icon */}
                <button
                  className="text-blueGray-700 p-1 focus:outline-none"
                  aria-label="Notifications"
                >
                  <i className="fas fa-bell text-xl"></i>
                </button>
              </li>
              <li className="relative" ref={dropdownRef}>
                {/* User Picture */}
                <button
                  className="block rounded-full overflow-hidden border-2 border-blueGray-600 focus:outline-none focus:border-blueGray-500"
                  onClick={toggleDropdown}
                  aria-label="User menu"
                >
                  <img
                    className="w-8 h-8 object-cover"
                    src="/img/team-1-800x800.jpg"
                    alt="User avatar"
                  />
                </button>
                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
