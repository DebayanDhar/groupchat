import React, { createContext, useContext, useReducer } from  "react";

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children}) => (//Higher order component
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);//allows us to pull the information