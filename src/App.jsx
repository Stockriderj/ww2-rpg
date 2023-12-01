import React, {useEffect} from "react";
import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import toast from "react-hot-toast";

// Components
import HUD from "./game-ui/HUD";
import Actions from "./game-ui/Actions";

// Game scripts
import {usePlayer} from "./context/PlayerContext";
import preloadSounds from "./game-scripts/preload-sounds";
import {ActionsProvider} from "./context/ActionsContext";
import Battle from "./game-ui/Battle";

preloadSounds();

const Container = styled.main`
  margin-top: 9.5rem;
  padding-left: 50px;
  width: 100%;
  height: 80vh;
`;

function App() {
  const {enemy, dispatch} = usePlayer();

  useEffect(() => {
    const tick = setInterval(() => dispatch({type: "tick"}), 1000);

    return () => clearInterval(tick);
  }, []);

  return (
    <>
      <GlobalStyles />

      <div>
        <HUD />
        <ActionsProvider>
          <Actions />
        </ActionsProvider>
        <Container>
          {enemy && <Battle />}

          <p style={{position: "absolute", bottom: 0}}>
            <span>&copy; 2023 stockriderj &lt;3</span>{" "}
            <a
              href="https://github.com/Stockriderj/ww2-rpg/wiki/Gameplay"
              target="_blank"
            >
              How to play
            </a>
          </p>
        </Container>
      </div>
    </>
  );
}

export default App;
