import { FC, Fragment, useEffect } from "react";
import { Unity, useUnityContext } from 'react-unity-webgl';
import { useInitData } from '@vkruglikov/react-telegram-web-app';
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

  return (
    <>
      <div id="gameContainer" style={{ width: '100vw', height: '100vh' }}>
        <Fragment>
        {!isLoaded && (
          <p style={{ color: 'white', fontSize: 30, fontWeight: 'bold'}}>Starting Jets... {Math.round(loadingProgression * 100)}%</p>
        )}
          <Unity
          devicePixelRatio={2}
            id="unity-canvas"
            unityProvider={unityProvider}
            style={{ width: '100%', height: '100%', visibility: isLoaded ? 'visible' : 'hidden'}}
          />
        </Fragment>
      </div>
    </>
  );
};