import React, { useState } from "react";
import {
  CharacterDefinition,
  defaultEscapeRoomActivityDefinition,
  DiaryPageDefinition,
  EscapeRoomActivityDefinition,
} from "../../../src/services/escapeRoomActivity.model";

/**
 * This component provides access to a wrapping context containing information
 * related to the current state of the Escape Room activity definition, as well
 * as a series of utility functions that are useful when interacting with this
 * data from the children components.
 */
interface IEscapeRoomActivityContext {
  //-----------------------------------------------------------------------------
  //                          ESCAPE ROOM GLOBAL DATA
  //-----------------------------------------------------------------------------
  /** Data object for the state of the current activity definition */
  escapeRoomData: EscapeRoomActivityDefinition;
  /** Helper method to modify current activity definition from useContext hook */
  setEscapeRoomData: (newData: EscapeRoomActivityDefinition) => void;

  //-----------------------------------------------------------------------------
  //                                 CHARACTERS
  //-----------------------------------------------------------------------------
  /** List of characters that can be used within the adventure */
  availableCharacters: CharacterDefinition[];
  /**
   * Adds given character to list of available characters, assuming that no other
   * character with the same name already exists within the activity.
   */
  addCharacter: (characterDef: CharacterDefinition) => void;
  /**
   * Removes a character with given index from list of available characters, assuming
   * that index is valid.
   */
  removeCharacter: (characterIndex: number) => void;

  //-----------------------------------------------------------------------------
  //                                   DIARY
  //-----------------------------------------------------------------------------
  /** List of diary pages that can be used within the adventure */
  availableDiaryPages: DiaryPageDefinition[];
} // IEscapeRoomContext

const EscapeRoomActivityContext =
  React.createContext<IEscapeRoomActivityContext>({
    //-----------------------------------------------------------------------------
    //                          ESCAPE ROOM GLOBAL DATA
    //-----------------------------------------------------------------------------
    escapeRoomData: defaultEscapeRoomActivityDefinition,
    setEscapeRoomData: (_) => {},
    //-----------------------------------------------------------------------------
    //                                 CHARACTERS
    //-----------------------------------------------------------------------------
    availableCharacters: [],
    addCharacter: (_) => {},
    removeCharacter: (_) => {},
    //-----------------------------------------------------------------------------
    //                                    DIARY
    //-----------------------------------------------------------------------------
    availableDiaryPages: [],
  }); // EscapeRoomActivityContext

interface EscapeRoomContextProviderProps {
  /** Activity Definition that this context will be managing and providing */
  escapeRoomActivityDefinition: EscapeRoomActivityDefinition;
  /** React dispatcher to modify the state of the activity from this context provider */
  setEscapeRoomActivityDefinition: React.Dispatch<
    React.SetStateAction<EscapeRoomActivityDefinition>
  >;
  children?: React.ReactNode;
} // EscapeRoomContextProviderProps

/**
 * Wrapper over an EscapeRoomActivity provider to provide helper methods and state management for
 * escape room definition management operations from childen.
 */
// Wrapper that provides the means to access and modify the state of the current escape room that is being modified
const EscapeRoomContextProvider = (
  props: EscapeRoomContextProviderProps
): JSX.Element => {
  const {
    escapeRoomActivityDefinition,
    setEscapeRoomActivityDefinition,
    children,
  } = props;

  const characterInUse = (characterName: string) => {
    for (let i = 0; i < escapeRoomActivityDefinition.stages.length; i++) {}
  }; // characterInUse

  const addCharacter = (characterDef: CharacterDefinition) => {
    if (
      escapeRoomActivityDefinition.characters.some(
        (character) => character.name === characterDef.name
      )
    )
      return;
    setEscapeRoomActivityDefinition((prev) => ({
      ...prev,
      characters: [...prev.characters, characterDef],
    }));
  }; // addCharacter

  const removeCharacter = (characterIndex: number) => {
    setEscapeRoomActivityDefinition((prev) => ({
      ...prev,
      characters: prev.characters.filter((_, i) => i !== characterIndex),
    }));
  }; // removeCharacter

  return (
    <EscapeRoomActivityContext.Provider
      value={{
        //-----------------------------------------------------------------------------
        //                          ESCAPE ROOM GLOBAL DATA
        //-----------------------------------------------------------------------------
        escapeRoomData: escapeRoomActivityDefinition,
        setEscapeRoomData: setEscapeRoomActivityDefinition,
        //-----------------------------------------------------------------------------
        //                                 CHARACTERS
        //-----------------------------------------------------------------------------
        availableCharacters: escapeRoomActivityDefinition.characters,
        addCharacter: addCharacter,
        removeCharacter: removeCharacter,
        //-----------------------------------------------------------------------------
        //                                   DIARY
        //-----------------------------------------------------------------------------
        availableDiaryPages: escapeRoomActivityDefinition.diaryPages,
      }}
    >
      {children}
    </EscapeRoomActivityContext.Provider>
  );
}; // EscapeRoomContextProvider

export { EscapeRoomContextProvider, EscapeRoomActivityContext };
