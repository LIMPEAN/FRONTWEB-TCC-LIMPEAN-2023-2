// types/html5-qrcode-scanner.d.ts

declare module 'html5-qrcode-scanner' {
  class Html5QrcodeScanner {
    constructor(elementId: string, config: Html5QrcodeScannerConfig, verbose?: boolean);

    // Adicione aqui outras declarações de métodos e propriedades conforme necessário.
  }

  interface Html5QrcodeScannerConfig {
    qrbox?: {
      width: number;
      height: number;
    };
    fps?: number;
    // Adicione aqui outras configurações conforme necessário.
  }

  // Adicione aqui outras declarações de tipos conforme necessário.

  export = Html5QrcodeScanner;
}
