'use client'
import '../globals.css'
import { Navbar } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';

export function Header() {

  return (
    <>
      <Navbar className='fixed w-full bg-white shadow-sm rounded-b-lg' fluid>
        <Navbar.Brand as={Link} href="#">
          <Image width={300} height={300} src="/assets/logo.svg" className="mr-3  h-9 w-32" alt="logo limpean" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="#">Home</Navbar.Link>
          <Navbar.Link href="#beneficios">Beneficios</Navbar.Link>
          <Navbar.Link href="#mercado">Mercado</Navbar.Link>
          <Navbar.Link href="#valores">Valores</Navbar.Link>
          <Navbar.Link href="/login">Login</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
