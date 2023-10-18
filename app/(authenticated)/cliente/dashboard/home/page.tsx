"use client"
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    gapi: any;
  }
}

const GoogleOAuthComponent: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string>('');

  useEffect(() => {
    const handleSignIn = async () => {
      const CLIENT_ID = '779561139790-utu1eg2kcuv97c94tu6teb6tm6bsamc1.apps.googleusercontent.com';
      const SCOPES = 'https://www.googleapis.com/auth/drive.readonly'; // Defina os escopos apropriados

      const handleAuthResult = (authResult: any) => {
        if (authResult && !authResult.error) {
          setAccessToken(authResult.access_token);
        } else {
          console.error('Erro na autenticação');
        }
      };

      const initClient = () => {
        window.gapi.load('auth2', () => {
          const auth2 = window.gapi.auth2.getAuthInstance();
          if (!auth2) {
            window.gapi.auth2.init({
              client_id: CLIENT_ID,
              scope: SCOPES,
            }).then(() => {
              const authInstance = window.gapi.auth2.getAuthInstance();
              if (!authInstance.isSignedIn.get()) {
                authInstance.signIn().then(handleAuthResult);
              }
            });
          } else {
            const authInstance = window.gapi.auth2.getAuthInstance();
            if (!authInstance.isSignedIn.get()) {
              authInstance.signIn().then(handleAuthResult);
            }
          }
        });
      };

      if (window.gapi) {
        initClient();
      } else {
        console.error('Erro ao carregar o GAPI');
      }
    };

    const loadGapiScript = () => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = handleSignIn;
      document.body.appendChild(script);
    };

    loadGapiScript();
  }, []);

  return (
    <div>
      {accessToken ? (
        <p>Token de acesso: {accessToken}</p>
      ) : (
        <p>Autenticando...</p>
      )}
    </div>
  );
};

export default GoogleOAuthComponent;
