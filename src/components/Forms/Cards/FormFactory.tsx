import { EditableFieldProps } from "../../../services/multistageFormActivity.model";

export interface AbstractFormFactory<DefinitionType> {
  userFormComponent: <UserComponentProps extends DefinitionType>(useFormPayload: UserComponentProps) => JSX.Element;
  formEditingComponent: (editingFormProps: EditableFieldProps<DefinitionType>) => JSX.Element;
  defaultFormDefinition: DefinitionType;
}