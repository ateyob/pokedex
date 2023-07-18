'use client'

import Link from "next/link";
import { useState } from "react";
import useLoginModal from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";
import getCurrentUser from "../actions/getCurrentUser";
import { signOut } from "next-auth/react";

interface NavbarProps{
  currentUser?: any;
}

const Navbar:React.FC<NavbarProps> =  ({currentUser}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();



  return (
    <nav className="flex justify-between items-center py-6 px-6 bg-gradient-to-r from-gray-700 to-gray-900 sticky top-0 z-10">
      <div>
        <Link href="/">
          <h2 className="text-2xl text-white font-bold">PokemonFinder</h2>
        </Link>
      </div>

      <div className="sm:hidden relative">
        <button
          className="text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 6.707l-5.146-5.147-1.414 1.414L10.586 8 5.44 13.146l1.414 1.414L12 9.414l5.146 5.146 1.414-1.414L13.414 8l5.147-5.146-1.414-1.414L12 6.586z"
                fill="white"
              />
            ) : (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 5h16v2H4V5zm0 7h16v2H4v-2zm0 7h16v2H4v-2z"
                fill="white"
              />
            )}
          </svg>
        </button>

        {isMenuOpen && (
          <div className="absolute top-12 right-0 w-40 bg-white text-black shadow-lg">
            <ul>

              { currentUser ? 
                <>
                  <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                      {currentUser.name}
                  </li>
                  <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                    <Link href="/favorites">My Favorites</Link>
                  </li>
                  <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                    <a onClick={() => signOut()} className="text-black cursor-pointer">Log Out</a>
                  </li>
                </>
              :
              <li onClick={loginModal.onOpen} className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                <a  className="text-black cursor-pointer">Login</a>
              </li>
            }
            </ul>
          </div>
        )}
      </div>

      <div className="hidden sm:flex gap-8">
        {
          currentUser ? (
              <>
                  <a className="text-white font-bold italic">{currentUser.name}</a>
                  <div className="text-white cursor-pointer">
                    <Link href='/favorites'>
                      My Favorites
                    </Link>
                  </div>
                  <a onClick={() => signOut()} className="text-white cursor-pointer">Log Out</a>
              </>
          ):(
            <>
              <a onClick={loginModal.onOpen} className="text-white cursor-pointer">Login</a>
            </>

          )
        }
      </div>
    </nav>
  );
};

export default Navbar;
