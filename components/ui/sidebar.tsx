"use client";

import { useEffect, useRef, useState } from "react";
import { useAppProvider } from "@/app/app-provider";
import { useSelectedLayoutSegments } from "next/navigation";
import { Transition } from "@headlessui/react";
import { getBreakpoint } from "../utils/utils";
import SidebarLinkGroup from "./sidebar-link-group";
import SidebarLink from "./sidebar-link";
import Logo from "./logo";
import { userisadmin } from "@/app/actions/auth";
import { toast } from "react-toastify";
import { isAdministrator } from "@/app/lib/definitions";

export default function Sidebar() {
  const sidebar = useRef<HTMLDivElement>(null);
  const { sidebarOpen, setSidebarOpen } = useAppProvider();
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(false);
  const segments = useSelectedLayoutSegments();
  const [breakpoint, setBreakpoint] = useState<string | undefined>(
    getBreakpoint()
  );
  const expandOnly =
    !sidebarExpanded && (breakpoint === "lg" || breakpoint === "xl");

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!sidebar.current) return;
      if (!sidebarOpen || sidebar.current.contains(target as Node)) return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const handleBreakpoint = () => {
    setBreakpoint(getBreakpoint());
  };

  useEffect(() => {
    window.addEventListener("resize", handleBreakpoint);
    return () => {
      window.removeEventListener("resize", handleBreakpoint);
    };
  }, [breakpoint]);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { success, message } = await userisadmin();
      if (!success && message === "Error al cargar datos del usuario") {
        toast.error("Error al cargar datos del usuario");
      }
      if (success) {
        const { admin } = message as isAdministrator;
        setIsAdmin(admin);
      }
    }
    fetchData();
  }, []);

  return (
    <div className={`min-w-fit ${sidebarExpanded ? "sidebar-expanded" : ""}`}>
      {/* Sidebar backdrop (mobile only) */}
      <Transition
        className="fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto"
        show={sidebarOpen}
        enter="transition-opacity ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-out duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        aria-hidden="true"
      />

      {/* Sidebar */}
      <Transition
        show={sidebarOpen}
        unmount={false}
        as="div"
        id="sidebar"
        ref={sidebar}
        className="flex lg:!flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <Logo />
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Apartados
              </span>
            </h3>
            <ul className="mt-3">
              {/* Admin */}
              {isAdmin && (
                <SidebarLinkGroup open={segments.includes("admin")}>
                  {(handleClick, open) => {
                    return (
                      <>
                        <a
                          href="#0"
                          className={`block text-slate-200 truncate transition duration-150 ${
                            segments.includes("admin")
                              ? "hover:text-slate-200"
                              : "hover:text-white"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            expandOnly
                              ? setSidebarExpanded(true)
                              : handleClick();
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <svg
                                className="shrink-0 h-6 w-6"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  className={`fill-current ${
                                    segments.includes("admin")
                                      ? "text-indigo-600"
                                      : "text-slate-700"
                                  }`}
                                  d="M4.418 19.612A9.092 9.092 0 0 1 2.59 17.03L.475 19.14c-.848.85-.536 2.395.743 3.673a4.413 4.413 0 0 0 1.677 1.082c.253.086.519.131.787.135.45.011.886-.16 1.208-.474L7 21.44a8.962 8.962 0 0 1-2.582-1.828Z"
                                />
                                <path
                                  className={`fill-current ${
                                    segments.includes("admin")
                                      ? "text-indigo-500"
                                      : "text-slate-600"
                                  }`}
                                  d="M10.034 13.997a11.011 11.011 0 0 1-2.551-3.862L4.595 13.02a2.513 2.513 0 0 0-.4 2.645 6.668 6.668 0 0 0 1.64 2.532 5.525 5.525 0 0 0 3.643 1.824 2.1 2.1 0 0 0 1.534-.587l2.883-2.882a11.156 11.156 0 0 1-3.861-2.556Z"
                                />
                                <path
                                  className={`fill-current ${
                                    segments.includes("admin")
                                      ? "text-indigo-300"
                                      : "text-slate-400"
                                  }`}
                                  d="M21.554 2.471A8.958 8.958 0 0 0 18.167.276a3.105 3.105 0 0 0-3.295.467L9.715 5.888c-1.41 1.408-.665 4.275 1.733 6.668a8.958 8.958 0 0 0 3.387 2.196c.459.157.94.24 1.425.246a2.559 2.559 0 0 0 1.87-.715l5.156-5.146c1.415-1.406.666-4.273-1.732-6.666Zm.318 5.257c-.148.147-.594.2-1.256-.018A7.037 7.037 0 0 1 18.016 6c-1.73-1.728-2.104-3.475-1.73-3.845a.671.671 0 0 1 .465-.129c.27.008.536.057.79.146a7.07 7.07 0 0 1 2.6 1.711c1.73 1.73 2.105 3.472 1.73 3.846Z"
                                />
                              </svg>
                              <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Admin
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="flex shrink-0 ml-2">
                              <svg
                                className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                  open && "rotate-180"
                                }`}
                                viewBox="0 0 12 12"
                              >
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                            <li className="mb-1 last:mb-0">
                              <SidebarLink href="/admin/presale">
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Preventas
                                </span>
                              </SidebarLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <SidebarLink href="/admin/users">
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Usuarios
                                </span>
                              </SidebarLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <SidebarLink href="/admin/help">
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Ayuda
                                </span>
                              </SidebarLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <SidebarLink href="/admin/notices">
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Noticias
                                </span>
                              </SidebarLink>
                            </li>
                          </ul>
                        </div>
                      </>
                    );
                  }}
                </SidebarLinkGroup>
              )}
              {/* Preventas */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  segments.includes("dashboard") && "bg-slate-900"
                }`}
              >
                <SidebarLink href="/dashboard">
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current ${
                          segments.includes("dashboard")
                            ? "text-indigo-500"
                            : "text-slate-600"
                        }`}
                        d="M20 7a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 0120 7zM4 23a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 014 23z"
                      />
                      <path
                        className={`fill-current ${
                          segments.includes("dashboard")
                            ? "text-indigo-300"
                            : "text-slate-400"
                        }`}
                        d="M17 23a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 010-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1zM7 13a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 112 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z"
                      />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Preventas
                    </span>
                  </div>
                </SidebarLink>
              </li>
              {/* Mis Inversiones */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  segments.includes("investments") && "bg-slate-900"
                }`}
              >
                <SidebarLink href="/investments">
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current ${
                          segments.includes("investments")
                            ? "text-indigo-300"
                            : "text-slate-400"
                        }`}
                        d="M13 6.068a6.035 6.035 0 0 1 4.932 4.933H24c-.486-5.846-5.154-10.515-11-11v6.067Z"
                      />
                      <path
                        className={`fill-current ${
                          segments.includes("investments")
                            ? "text-indigo-500"
                            : "text-slate-700"
                        }`}
                        d="M18.007 13c-.474 2.833-2.919 5-5.864 5a5.888 5.888 0 0 1-3.694-1.304L4 20.731C6.131 22.752 8.992 24 12.143 24c6.232 0 11.35-4.851 11.857-11h-5.993Z"
                      />
                      <path
                        className={`fill-current ${
                          segments.includes("investments")
                            ? "text-indigo-600"
                            : "text-slate-600"
                        }`}
                        d="M6.939 15.007A5.861 5.861 0 0 1 6 11.829c0-2.937 2.167-5.376 5-5.85V0C4.85.507 0 5.614 0 11.83c0 2.695.922 5.174 2.456 7.17l4.483-3.993Z"
                      />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Mis Inversiones
                    </span>
                  </div>
                </SidebarLink>
              </li>
              {/* Referidos */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  segments.includes("referrals") && "bg-slate-900"
                }`}
              >
                <SidebarLink href="/referrals">
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current ${
                          segments.includes("referrals")
                            ? "text-indigo-500"
                            : "text-slate-600"
                        }`}
                        d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
                      />
                      <path
                        className={`fill-current ${
                          segments.includes("referrals")
                            ? "text-indigo-300"
                            : "text-slate-400"
                        }`}
                        d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
                      />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Referidos
                    </span>
                  </div>
                </SidebarLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </Transition>
    </div>
  );
}
