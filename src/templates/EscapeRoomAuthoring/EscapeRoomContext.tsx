import React, { useState } from 'react';
import { InProgressEscapeRoomActivityDefinition,defaultEscapeRoomActivityDefinition } from '../../../src/services/escapeRoomActivity.model';


//Structure of the context that is going to be provided to the children of the app that represent the multiple editors avaliable
interface EscapeRoomContextInterface {
  escapeRoomData: InProgressEscapeRoomActivityDefinition ;
  setEscapeRoomData: (newData: InProgressEscapeRoomActivityDefinition ) => void;
}
const EscapeRoomContext = React.createContext<EscapeRoomContextInterface>({
  escapeRoomData: defaultEscapeRoomActivityDefinition,
  setEscapeRoomData: (_) => { },
});


//Wrapper that provides the means to access and modify the state of the current escape room that is being modified
const EscapeRoomContextProvider: React.FC = ({ children }) => {
  const [escapeRoomDataContext, setEscapeRoomDataContext] = useState<InProgressEscapeRoomActivityDefinition>(defaultEscapeRoomActivityDefinition);

  const setData = (data: InProgressEscapeRoomActivityDefinition ) => {
    setEscapeRoomDataContext(data)
  };

  return (
    <EscapeRoomContext.Provider value={{escapeRoomData: escapeRoomDataContext,setEscapeRoomData: setData,}}>
      {children}
    </EscapeRoomContext.Provider>
  );
};

export { EscapeRoomContextProvider , EscapeRoomContext };