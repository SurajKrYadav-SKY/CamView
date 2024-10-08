import { createContext } from "react";
import { rows } from "./../assets/dummy_data";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const contextValue = {
    rows,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
