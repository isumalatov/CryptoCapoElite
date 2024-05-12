"use client";

import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { logout } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { getname, getadmin } from "@/app/actions/auth";
import { userName, userAdmin } from "@/app/lib/definitions";
import { useEffect, useState } from "react";

export default function DropdownProfile({
  align,
}: {
  align?: "left" | "right";
}) {
  const router = useRouter();

  const signout = async () => {
    await logout();
    router.push("/signin");
  };

  const [name, setName] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const { success, message } = await getname();
        if (success) {
          const { name } = message as userName;
          setName(name);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const { success, message } = await getadmin();
        if (success) {
          const { admin } = message as userAdmin;
          setIsAdmin(admin);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  return (
    <Menu as="div" className="relative inline-flex">
      <Menu.Button className="inline-flex justify-center items-center group">
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200">
            {name}
          </span>
          <svg
            className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </Menu.Button>
      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-[11rem] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${
          align === "right" ? "right-0" : "left-0"
        }`}
        enter="transition ease-out duration-200 transform"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200 dark:border-slate-700">
          <div className="font-medium text-slate-800 dark:text-slate-100">
            {name}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 italic">
            {isAdmin ? "Administrador" : "Usuario"}
          </div>
        </div>
        <Menu.Items as="ul" className="focus:outline-none">
          <Menu.Item as="li">
            {({ active }) => (
              <Link
                className={`font-medium text-sm flex items-center py-1 px-3 ${
                  active
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-indigo-500"
                }`}
                href="/settings/account"
              >
                Settings
              </Link>
            )}
          </Menu.Item>
          <Menu.Item as="li">
            {({ active }) => (
              <button
                className={`font-medium text-sm flex items-center py-1 px-3 ${
                  active
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-indigo-500"
                }`}
                onClick={signout}
              >
                Sign Out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
