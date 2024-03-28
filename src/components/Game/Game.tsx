import { FC, useEffect } from "react";
import { Unity, useUnityContext } from 'react-unity-webgl';
import { useInitData, useWebApp } from '@vkruglikov/react-telegram-web-app';
import './Game.css';

export const Game: FC = () => {
  const { unityProvider, sendMessage, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl: "Build/PaperPlaneGame.loader.js",
    dataUrl: "Build/PaperPlaneGame.data",
    frameworkUrl: "Build/PaperPlaneGame.framework.js",
    codeUrl: "Build/PaperPlaneGame.wasm",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "$PLANE",
    productName: "Paper $PLANE Game",
    productVersion: "0.4",
  });

  const [initDataUnsafe] = useInitData();

  const WebApp = useWebApp();

  const setupWebApp = () => {
    WebApp.ready();
    WebApp.expand();

    WebApp.onEvent('themeChanged', function() {
        document.documentElement.className = WebApp.colorScheme;
        document.body.setAttribute('style', '--bg-color:' + WebApp.backgroundColor);
    });

    WebApp.MainButton.setParams({
        text: 'Join Paper $PLANE'
    });

    WebApp.MainButton.onClick(function () {
        WebApp.openTelegramLink('https://t.me/paperplane_ton');
    });

    WebApp.MainButton.show();
  }

  const importUsername = () => {
    var user = initDataUnsafe?.user;
    var username = "Guest"
    if (user) {
      if (user.username && user.username.length > 0) {
        username = user.username;
      } else if (user.first_name && user.first_name.length > 0) {
        username = user.first_name;
      }
    }
    sendMessage('Menu Manager', 'ReceiveTelegramUsername', username);
    console.log(username);
  }

  useEffect(() => {
    if (isLoaded) {
      importUsername();
    }
  }, [isLoaded]);

  useEffect(() => {
    setupWebApp();
  }, []);

  return (
    <div id="gameContainer" style={{ width: '100vw', height: '100vh' }}>
      {!isLoaded && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          margin: 0,
          height: '80%',
          width: '100%',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <p style={{
            color: 'white',
            fontSize: 30,
            fontWeight: 'bold',
            letterSpacing: 1.4,
          }}>
            <i>Paper $PLANE Game</i>
          </p>
          <img src="./assets/loading.gif" alt="" style={{
            borderRadius: 10,
            marginBottom: 30,
            marginTop: 30,
          }}/>
          <p style={{
            color: 'white',
            fontSize: 30,
            fontWeight: 'bold',
            letterSpacing: 1.4,
          }}>
            <i>Starting Jets . . . {(loadingProgression * 100).toFixed()}%</i>
          </p>
          <div style={{
            width: '100%',
            height: 10,
            backgroundColor: 'black',
            position: 'relative',
          }}>
            <div style={{
              width: `${loadingProgression * 100}%`,
              height: 10,
              borderRadius: 5,
              backgroundColor: 'white',
              position: 'absolute',
            }} />
          </div>
        </div>
      )}
      <Unity
        devicePixelRatio={2}
        id="unity-canvas"
        unityProvider={unityProvider}
        style={{
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
};