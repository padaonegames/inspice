import { EditablePuzzleProps } from "../../../services/escapeRoomActivity.model";

export interface AbstractPuzzleFactory<DefinitionType> {
  puzzleEditingComponent: (editingPuzzleProps: EditablePuzzleProps<DefinitionType>) => JSX.Element;
  defaultPuzzleDefinition: DefinitionType;
}