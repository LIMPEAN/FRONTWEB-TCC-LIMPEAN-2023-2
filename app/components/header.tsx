"use client"

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className="flex p-6 justify-between items-center fixed w-full bg-blue-600">
        <Image
          className=""
          src="/assets/logo-branca.svg"
          alt="Logo"
          width={100}
          height={100}
        />
        <button
          className="lg:hidden text-white"
          onClick={toggleMenu}
          aria-label="Abrir Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
        <div
          className={`${
            menuOpen
              ? "fixed top-0 left-0 w-full h-screen flex flex-col gap-4 justify-center items-center bg-blue-600"
              : "hidden"
          } lg:hidden text-white font-thin`}
        >
          <Image
            className="absolute top-6 left-6"
            src="/assets/logo-branca.svg"
            alt="Logo"
            width={100}
            height={100}
          />
          <button
            className="absolute top-6 right-6 text-white"
            onClick={closeMenu}
            aria-label="Fechar Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="flex flex-col gap-4 items-center">
            <Link
              href="#home"
              className="border-b-2 hover:border-white border-transparent"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              href="#beneficios"
              className="border-b-2 hover:border-white border-transparent"
              onClick={closeMenu}
            >
              Benefícios
            </Link>
            <Link
              href="#mercado"
              className="border-b-2 hover:border-white border-transparent"
              onClick={closeMenu}
            >
              Mercado
            </Link>
            <Link
              href="#valores"
              className="border-b-2 hover:border-white border-transparent"
              onClick={closeMenu}
            >
              Valores
            </Link>
          </div>

          <a
            className="flex gap-2 bg-white text-blue-600 font-medium px-4 py-1 rounded-full hover:bg-white/90"
            href="/login"
            onClick={closeMenu}
          >
            Entrar
            <Image
              className=""
              src="/assets/login-icon.svg"
              alt="Login"
              width={16}
              height={16}
            />
          </a>
        </div>
        <div className="lg:flex hidden gap-4 text-white">
          <Link
            href="#home"
            className="border-b-2 hover:border-white border-transparent"
          >
            Home
          </Link>
          <Link
            href="#beneficios"
            className="border-b-2 hover:border-white border-transparent"
          >
            Benefícios
          </Link>
          <Link
            href="#mercado"
            className="border-b-2 hover:border-white border-transparent"
          >
            Mercado
          </Link>
          <Link
            href="#valores"
            className="border-b-2 hover:border-white border-transparent"
          >
            Valores
          </Link>
        </div>
        <a
          className="lg:flex hidden gap-2 bg-white text-blue-600 font-medium px-4 py-1 rounded-full hover:bg-white/90"
          href="/login"
        >
          Entrar
          <Image
            className=""
            src="/assets/login-icon.svg"
            alt="Login"
            width={16}
            height={16}
          />
        </a>
      </header>
      <div className=""></div>
    </>
  );
}
