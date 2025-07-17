import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "context/AuthContext";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = useState("hidden");
  const router = useRouter();
  const { userRole, loading } = useContext(AuthContext); // updated context

  // Wait until role is loaded
  if (loading || !userRole) return null;

  const role = userRole.toLowerCase();

  const menuItems = {
    guest: [
      { href: "/auth/login", label: "Login", icon: "fas fa-fingerprint" },
    ],
    admin: [
      { href: "/admin/dashboard", label: "Dashboard", icon: "fas fa-tv" },
      { href: "/admin/incidents", label: "Alert", icon: "fas fa-exclamation-triangle" },
      { href: "/admin/settings", label: "Tickets", icon: "fas fa-ticket-alt" },
      { href: "/admin/firewall", label: "Firewall", icon: "fas fa-shield-alt" },
      { href: "/admin/block-ip", label: "Block IP", icon: "fas fa-ban" },
      { href: "/admin/approvals", label: "Approvals", icon: "fas fa-check-circle" },
      { href: "/admin/reports", label: "Reports", icon: "fas fa-file-alt" },
    ],
    user: [
      { href: "/admin/dashboard", label: "Dashboard", icon: "fas fa-exclamation-triangle" },
      { href: "/admin/settings", label: "Tickets", icon: "fas fa-ticket-alt" },
      { href: "/admin/approvals", label: "Approvals", icon: "fas fa-check-circle" }, 
    ],
    analyst: [
      { href: "/securityanalyst/dashboard", label: "Dashboard", icon: "fas fa-tv" },
      { href: "/securityanalyst/incident", label: "Alert", icon: "fas fa-exclamation-triangle" },
    ],
    hod: [
      { href: "/admin/approvals", label: "Approvals", icon: "fas fa-check-circle" },
      { href: "/admin/reports", label: "Reports", icon: "fas fa-file-alt" },
    ],
    cloudflare: [
      { href: "/admin/incidents", label: "Notifications", icon: "fas fa-exclamation-triangle" },
    ],
    firewall: [
      { href: "/admin/incidents", label: "Dashboard", icon: "fas fa-exclamation-triangle" },
    ],
  };

  const items = menuItems[role] || menuItems["guest"];

  return (
    <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
      <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
        {/* Toggler */}
        <button
          className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
          type="button"
          onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
        >
          <i className="fas fa-bars"></i>
        </button>
        {/* Brand */}
        <div className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
          TACTIC
        </div>

        {/* Collapse */}
        <div
          className={
            "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
            collapseShow
          }
        >
          {/* Collapse header */}
          <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
            <div className="flex flex-wrap">
              <div className="w-6/12">
                <Link
                  href="/"
                  className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                >
                  Threat Analysis System
                </Link>
              </div>
              <div className="w-6/12 flex justify-end">
                <button
                  type="button"
                  className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                  onClick={() => setCollapseShow("hidden")}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile search */}
          <form className="mt-6 mb-4 md:hidden">
            <div className="mb-3 pt-0">
              <input
                type="text"
                placeholder="Search"
                className="border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
              />
            </div>
          </form>

          <hr className="my-4 md:min-w-full" />

          <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            Navigation
          </h6>

          <ul className="md:flex-col md:min-w-full flex flex-col list-none">
            {items.map(({ href, label, icon }) => (
              <li className="items-center" key={href}>
                <Link
                  href={href}
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (router.pathname.indexOf(href) !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                >
                  <i
                    className={`${icon} mr-2 text-sm ${
                      router.pathname.indexOf(href) !== -1
                        ? "opacity-75"
                        : "text-blueGray-300"
                    }`}
                  ></i>{" "}
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <hr className="my-4 md:min-w-full" />

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("userRole");
              router.push("/auth/login");
            }}
            className="text-red-500 hover:text-red-700 text-xs uppercase font-bold px-4 py-2"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}