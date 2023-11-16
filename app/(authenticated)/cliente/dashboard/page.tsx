"use client"

import { FC, useState } from 'react';
import QrReader from 'react-qr-reader';

const QRCodeReader: FC = () => {
  const [result, setResult] = useState<string | null>(null);

  const handleScan = (data: string | null) => {
    if (data) {
      setResult(data);
    }
  };

  const handleError = (error: any) => {
    console.error(error);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl mb-6">QR Code Reader</h1>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        className="w-full"
      />
      {result && <p className="mt-4">Resultado: {result}</p>}
    </div>
  );
};

export default QRCodeReader;
