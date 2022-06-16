import { EditableItemProps } from "../../../services/escapeRoomActivity.model";

export interface AbstractActivityItemFactory<DefinitionType> {
  editingComponent: (editingProps: EditableItemProps<DefinitionType>) => JSX.Element;
  defaultDefinition: DefinitionType;
}