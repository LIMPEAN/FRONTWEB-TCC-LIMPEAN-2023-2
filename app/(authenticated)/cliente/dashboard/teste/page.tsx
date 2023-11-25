"use client"

import { Html5QrcodeScanner } from "html5-qrcode"
import { useEffect, useState } from "react"

export default function ScannerScreen() {
  const [scanResult, setScanResult] = useState<any | null>(null)

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    }, false)


    const success = (result: any) => {
      scanner.clear()
      setScanResult(result)
    }
    const error = (err: any) => {
      console.warn(err)
    }
    scanner.render(success, error)

  }, [])


  return (
    <>
      <span>teste</span>
      {scanResult ? scanResult : <div id="reader"></div>}
    </>
  );
};

