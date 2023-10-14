'use client'

import Image from "next/image";
import Link from "next/link";


export function Rodape() {

  // const [menuOpen, setMenuOpen] = useState(false);

  // const toggleMenu = () => {
  //   setMenuOpen(!menuOpen);
  // };

  // const closeMenu = () => {
  //   setMenuOpen(false);
  // };

  return (
    <>
      <footer className=" p-6 bg-white">
        <div className="items-center justify-items-center grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-3 bg-white">
          <Image
            className="h-8"
            src="/assets/logo.svg"
            alt="Logo"
            width={140}
            height={140}
          />
          <div className="flex gap-10">
            <Link
              href="#home"
              className="border-b-2 hover:border-black border-transparent"
              // onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              href="#beneficios"
              className="border-b-2 hover:border-black border-transparent"
              // onClick={closeMenu}
            >
              Benefícios
            </Link>
            <Link
              href="#mercado"
              className="border-b-2 hover:border-black border-transparent"
              // onClick={closeMenu}
            >
              Mercado
            </Link>
          </div>
          <div className="flex gap-10">
            <Link
              href="#"
              className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-600 bg-white hover:bg-blue-700"
              // onClick={closeMenu}
            >
              <Image
                className=""
                src="/assets/facebook.svg"
                alt="Logo"
                width={32}
                height={24}
              />
            </Link>
            <Link
              href="#"
              className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-600 bg-white hover:bg-blue-700"
              // onClick={closeMenu}
            >
              <Image
                className=""
                src="/assets/twitter.svg"
                alt="Logo"
                width={32}
                height={24}
              />
            </Link>
            <Link
              href="#"
              className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-600 bg-white hover:bg-blue-700"
              // onClick={closeMenu}
            >
              <Image
                className=""
                src="/assets/linkedin.svg"
                alt="Logo"
                width={32}
                height={24}
              />
            </Link>
          </div>
        </div>
      </footer>

    </>
  )
}