import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export function Navbar() {
  const user = useUser();
  return (
    <nav className="bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <a href="https://flowbite.com/" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-2xl font-semibold text-white">
            Gim<span className="text-[hsl(280,100%,70%)]">me</span> Shop
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="ml-3 inline-flex items-center rounded-lg p-2 text-sm  text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Abrir o menu principal</span>
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex flex-col items-center justify-center rounded-lg border border-gray-700 bg-gray-800 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0  md:bg-gray-900 md:p-0">
            <li>
              <Link
                href="/"
                className="block rounded bg-blue-700 py-2 pl-3 pr-4 text-white  md:bg-transparent md:p-0  md:text-blue-500"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            {!user.isSignedIn && (
              <li>
                <SignInButton>
                  <span className="block cursor-pointer rounded py-2 pl-3 pr-4 text-white hover:bg-gray-700 hover:text-white md:border-0 md:p-0 md:hover:bg-transparent  md:hover:text-blue-500">
                    Login
                  </span>
                </SignInButton>
              </li>
            )}
            {user.isSignedIn && (
              <li>
                <Link
                  href="/list-an-order"
                  className="block  rounded py-2 pl-3 pr-4 text-white hover:bg-gray-700 hover:text-white md:border-0 md:p-0 md:hover:bg-transparent  md:hover:text-blue-500"
                >
                  Comprar
                </Link>
              </li>
            )}
            <li>
              <UserButton />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
