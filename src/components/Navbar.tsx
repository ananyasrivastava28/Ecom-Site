import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useEffect } from "react";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
const Navbar = () => {
  const menu = useRef<HTMLInputElement | null>(null);
  const searchbar = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const toogleMenu = (): void => {
    if (menu.current) {
      menu.current.classList.toggle("hidden");
    }
  };
  const hideNavbar = (): void => {
    if (menu.current) {
      menu.current.classList.add("hidden");
    }
    if (searchbar.current) {
      searchbar.current.classList.add("hidden");
    }
  };
  useEffect(() => {
    router.events.on("routeChangeComplete", hideNavbar);
    return () => {
      router.events.off("routeChangeComplete", hideNavbar);
    };
  }, [router.events]);

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <span className="self-center text-xl font-bold whitespace-nowrap tracking-wider">
            Amazon
          </span>
        </Link>
        <div className="flex md:order-2">
          <button
            onClick={toogleMenu}
            data-collapse-toggle="navbar-search"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-search"
            aria-expanded="false"
          >
            <span className="sr-only">Open menu</span>
            <GiHamburgerMenu />
          </button>
        </div>
        <div
          ref={menu}
          className={`items-center transition-all  hidden justify-between w-full md:flex md:w-auto md:order-1 `}
          id="navbar-search"
        >
          <ul className="flex flex-col p-4 mt-4  rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:text-base md:font-bold md:border-0 md:bg-white">
            <li>
              <Link
                href="/"
                className={`block py-2 pl-3 pr-4 ${
                  router.pathname == "/"
                    ? "bg-yellow-600 text-white md:text-yellow-600"
                    : "text-gray-700 bg-white"
                } rounded md:bg-transparent md:p-0`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/category/jewelery"
                className={`block py-2 pl-3 pr-4 ${
                  router.query.category === "jewelery"
                    ? "bg-yellow-600 text-white md:text-yellow-600"
                    : "text-gray-700 bg-white"
                } rounded md:bg-transparent md:p-0`}
                aria-current="page"
              >
                Jewelery
              </Link>
            </li>
            <li>
              <Link
                href="/category/electronics"
                className={`block py-2 pl-3 pr-4 ${
                  router.query.category === "electronics"
                    ? " md:text-yellow-600 bg-yellow-600 text-white"
                    : "text-gray-700 bg-white"
                } rounded md:bg-transparent md:p-0`}
              >
                Electronics
              </Link>
            </li>
            <li>
              <Link
                href="/category/men's clothing"
                className={`block py-2 pl-3 pr-4 ${
                  router.query.category === "men's clothing"
                    ? " md:text-yellow-600 bg-yellow-600 text-white"
                    : "text-gray-700 bg-white "
                } rounded md:bg-transparent md:p-0`}
              >
                Men{"'"}s-clothing
              </Link>
            </li>
            <li>
              <Link
                href="/category/women's clothing"
                className={`block py-2 pl-3 pr-4 ${
                  router.query.category === "women's clothing"
                    ? " md:text-yellow-600 bg-yellow-600 text-white"
                    : "text-gray-700 bg-white "
                } rounded md:bg-transparent md:p-0`}
              >
                Women{"'"}s-clothing
              </Link>
            </li>
            <li>
              <Link
                href="/cart"
                className={`flex items-center gap-2  py-2 pl-3 pr-4 ${
                  router.pathname == "/cart"
                    ? " md:text-yellow-600 bg-yellow-600 text-white"
                    : "text-gray-700 bg-white "
                } rounded md:bg-transparent md:p-0`}
              >
                <span>Cart</span>
                <AiOutlineShoppingCart className="text-2xl font-extrabold" />
              </Link>
            </li>

            <li>
              <Link
                href="/wishlist"
                className={`flex items-center gap-2  py-2 pl-3 pr-4 ${
                  router.pathname == "/wishlist"
                    ? " md:text-yellow-600 bg-yellow-600 text-white"
                    : "text-gray-700 bg-white "
                } rounded md:bg-transparent md:p-0`}
              >
                <span>WishList</span>
                <AiOutlineHeart className="text-2xl font-extrabold" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
