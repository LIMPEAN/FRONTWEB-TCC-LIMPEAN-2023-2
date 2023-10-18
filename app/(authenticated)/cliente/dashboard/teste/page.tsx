"use client"

import { Alert } from "flowbite-react";
import {  useState } from "react";

export default function Loading() {

  const [isOpen, setIsOpen] = useState(true)

  function createGoogleMapsLink(startAddress: string, destinationAddress: string, destination: string) {
    const baseUrl = 'https://www.google.com/maps/embed/v1/directions';
    const formattedStart = formatAddress(startAddress);
    const formattedDestination = formatAddress(destinationAddress);
    return `${baseUrl}?key=AIzaSyDuuWnEdVdrg62befHzKSm5uk-hSEjfock&origin=${formattedStart}&destination=${formattedDestination}`;
  }

  function formatAddress(address: string): string {
    return encodeURIComponent(address.replace(/\s/g, '+'));
  }

  const startAddress = "06655-450";
  const destinationAddress = "06655-300";
  const googleMapsLink = createGoogleMapsLink(startAddress, destinationAddress, "");

  setTimeout(() => {
    setIsOpen(false);
  },5000)

  return (
    <>

      {isOpen ? <Alert color="info">
        <span>
          <p>
            <span className="font-medium">
              Info alert!
            </span>
            Change a few things up and try submitting again.
          </p>
        </span>
      </Alert>: null
}

    </>
  )
}
