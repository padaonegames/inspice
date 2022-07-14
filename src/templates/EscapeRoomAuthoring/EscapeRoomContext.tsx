import React, { useState } from 'react';
import { defaultEscapeRoomActivityDefinition, EscapeRoomActivityDefinition } from '../../../src/services/escapeRoomActivity.model';


// Structure of the context that is going to be provided to the children of the app that represent the multiple editors avaliable
interface EscapeRoomContextInterface {
  escapeRoomData: EscapeRoomActivityDefinition;
  setEscapeRoomData: (newData: EscapeRoomActivityDefinition) => void;
}
const EscapeRoomContext = React.createContext<EscapeRoomContextInterface>({
  escapeRoomData: defaultEscapeRoomActivityDefinition,
  setEscapeRoomData: (_) => { },
});


// Wrapper that provides the means to access and modify the state of the current escape room that is being modified
const EscapeRoomContextProvider: React.FC = ({ children }) => {  
  const [escapeRoomDataContext, setEscapeRoomDataContext] = useState<EscapeRoomActivityDefinition>(defaultEscapeRoomActivityDefinition);

  const setData = (data: EscapeRoomActivityDefinition) => {
    setEscapeRoomDataContext(data);
  };

  return (
    <EscapeRoomContext.Provider value={{ escapeRoomData: escapeRoomDataContext, setEscapeRoomData: setData, }}>
      {children}
    </EscapeRoomContext.Provider>
  );
};

export { EscapeRoomContextProvider, EscapeRoomContext };