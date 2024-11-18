'use client';

import { ClerkLoaded, SignedIn, SignIn, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import useBasketStore from "@/store/store";
import { MdSportsVolleyball } from "react-icons/md";

function Header() {
  const { user } = useUser();
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey();
      console.log(response);
    } catch (err) {
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  return (
    <header className="fixed top-0 right-0 z-50 mx-auto mt-4 max-w-6xl 
                      bg-white rounded-2xl 
                      -translate-x-1/4 left-1/3
                      border border-black/10 
                      shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08)]
                      transition-all duration-300">
      <div className="flex w-full flex-wrap justify-between items-center px-5 py-2">
        {/* Logo section */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-extrabold tracking-tight 
                    hover:opacity-80 transition-all duration-200"
        >
          <MdSportsVolleyball className="text-emerald-500 text-3xl" />
          <span className="font-bold bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent text-2xl">
            FitSport
          </span>
        </Link>

        {/* Search bar with adjusted width */}
        <Form
          action="/search"
          className="w-full sm:w-56 md:w-72 sm:mx-4 mt-2 sm:mt-0"
        >
          <input
            type="text"
            name="query"
            placeholder="Search for products..."
            className="w-full px-3 py-1.5 text-sm rounded-lg border border-gray-200 
                      focus:outline-none focus:ring-1 focus:ring-gray-200 
                      focus:border-gray-200 transition-shadow duration-200"
          />
        </Form>

        <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
          <Link
            href="/basket"
            className="
              flex-1 relative flex justify-center sm:justify-start
              sm:flex-none items-center space-x-2 bg-emerald-500
              text-white hover:bg-emerald-600
              font-bold py-1.5 px-3 rounded-xl
              text-sm
            "
          >
            <TrolleyIcon className="w-5 h-5" />

            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {itemCount}
            </span>

            <span>Basket</span>
          </Link>

          {/* User area */}
          <ClerkLoaded>
            <SignedIn>
              <Link
                href="/orders"
                className="
                  flex-1 relative flex justify-center sm:justify-start
              sm:flex-none items-center space-x-2 bg-emerald-500
              text-white hover:bg-emerald-600
              font-bold py-1.5 px-3 rounded-xl
              text-sm
                "
              >
                <PackageIcon className="w-5 h-5" />
                <span>Orders</span>
              </Link>
            </SignedIn>

            {user ? (
              <div className="flex items-center space-x-2">
                <UserButton />
                <div className="hidden sm:block text-xs">
                  <p className="text-gray-400">Welcome Back</p>
                  <p className="font-bold">{user.fullName}!</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal" />
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
}

export default Header;
