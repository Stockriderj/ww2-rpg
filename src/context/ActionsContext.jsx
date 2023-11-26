import {createContext, useContext, useState} from "react";

const ActionsContext = createContext();

function ActionsProvider({children}) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <ActionsContext.Provider
      value={{
        isVisible,
        setIsVisible,
      }}
    >
      {children}
    </ActionsContext.Provider>
  );
}

function useActions() {
  const context = useContext(ActionsContext);
  if (context === undefined)
    throw new Error("the context is in the wrong place. what r u doing???????");
  return context;
}

export {ActionsProvider, ActionsContext, useActions};
