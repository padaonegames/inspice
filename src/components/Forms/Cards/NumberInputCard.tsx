import styled from "styled-components";
import {
  ConsumableFieldProps,
  NumberFieldDefinition,
  NumberResponseDefinition,
} from "../../../services/multistageFormActivity.model";
import { Root, InputText } from "./cardStyles";
import { EditableFieldProps } from "./EditableFieldCard";
import FormCard from "./FormCard";

export interface NumberInputCardProps
  extends ConsumableFieldProps<
    NumberFieldDefinition,
    NumberResponseDefinition
  > {
  /** Proportion of container width to be used for input. 50% (0.5) by default */
  width?: number;
  /** Callback to the parent when the "Enter" key is pressed while the component is focused. */
  onEnterPress?: () => void;
  disabled?: boolean;
} // NumberInputCardProps

const NumberWithUnitsLine = styled.div`
  display: flex;
  flex-diretcion: row;
  font-family: ${(props) => props.theme.contentFont};
  font-size: ${(props) => props.theme.contentFontSize};
  color: ${(props) => props.theme.textColor};
  align-items: center;
`;

const UnitsText = styled.div`
  margin-left: 0.6em;
  margin-bottom: -0.35em;
`;

/** Controlled card component to support input for shorter texts. */
export const NumberInputCard = (props: NumberInputCardProps): JSX.Element => {
  const {
    promptText = "",
    required = false,
    requiredAlert = false,
    onEnterPress,
    width = 0.25,
    alertMessage,
    fieldPayload,
    response,
    onResponseChanged,
    disabled = false,
    ...htmlProps
  } = props;

  const { isFloat, maxLength, placeholder, units } = fieldPayload;
  const { number } = response;

  return (
    <FormCard
      {...htmlProps}
      promptText={promptText}
      required={required}
      requiredAlert={requiredAlert}
      alertMessage={alertMessage}
    >
      <NumberWithUnitsLine>
        <InputText
          disabled={disabled}
          textWidth={width}
          type="number"
          max={1000}
          placeholder={placeholder?.toString()}
          maxLength={maxLength}
          value={number}
          onChange={(event) => {
            if (onResponseChanged && !disabled) {
              onResponseChanged({ number: parseFloat(event.target.value) });
            }
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter" && onEnterPress && !disabled) {
              onEnterPress();
            }
          }}
        />
        <UnitsText>{units}</UnitsText>
      </NumberWithUnitsLine>
    </FormCard>
  );
}; // NumberInputCard

export interface EditableNumberContentProps
  extends EditableFieldProps<NumberFieldDefinition> {} // EditableNumberContentProps

export const EditableNumberContent = (
  _: EditableNumberContentProps
): JSX.Element => {
  return (
    <Root>
      <InputText
        disabled
        width="95%"
        placeholder="Numeric Answer"
        value={""}
        type="number"
      />
    </Root>
  );
}; // EditableNumberContent

export default NumberInputCard;
