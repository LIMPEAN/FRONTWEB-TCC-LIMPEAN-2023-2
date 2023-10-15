"use client"

export default function Loading() {

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

  return (
    <>
      <iframe
        width="600"
        height="450"
        className="border-0 rounded-lg w-96 h-48 brightness-90"
        loading="lazy"
        allowFullScreen
        src={googleMapsLink}
      ></iframe>
    </>
  )
}
