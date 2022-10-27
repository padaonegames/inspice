import {
  ConsumableFieldProps,
} from "../../../services/multistageFormActivity.model";
import { EditableFieldProps } from "./EditableFieldCard";

export interface AbstractFormFactory<Payload, Response> {
  consumptionComponentProducer: (
    consumptionFormProps: ConsumableFieldProps<Payload, Response>
  ) => JSX.Element;
  editingComponentProducer: (
    editingFormProps: EditableFieldProps<Payload>
  ) => JSX.Element;
  defaultFormDefinition: Payload;
  defaultFormResponse: Response;
}
