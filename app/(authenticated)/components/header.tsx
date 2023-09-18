"use client"
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className="h-16 p-6 justify-between items-center w-full bg-blue-700">
        <div className="flex items-center">
          <Image
            src="/assets/logo-branca.svg"
            alt="Logo"
            width={100}
            height={100}
          />
          <button
            className="text-white"
            onClick={toggleMenu}
            aria-label="Abrir Menu"
          >
            {/* Ícone do menu aqui */}
          </button>
        </div>
        <div
          className={`${menuOpen
              ? 'translate-x-0 w-full h-screen flex flex-col gap-4 justify-center items-center bg-blue-700'
              : 'translate-x-full w-0 hidden'
            } text-white font-thin transition-transform duration-300 lg:w-auto`}
        >
          {/* Conteúdo do menu aqui */}
        </div>
        {/* Links de navegação aqui */}
      </header>
      {/* Outro conteúdo da página */}
    </>
  );
}
