import styled, { css } from "styled-components";
import {
  ConsumableFieldProps,
  NumberFieldDefinition,
  NumberResponseDefinition,
} from "../../../services/multistageFormActivity.model";
import { Root, InputText } from "./cardStyles";
import { EditableFieldProps } from "./EditableFieldCard";
import { ChevronLeft } from "@styled-icons/boxicons-regular/ChevronLeft";
import { ChevronRight } from "@styled-icons/boxicons-regular/ChevronRight";
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
  margin-bottom: -0.5em;
`;

interface selectResponseIconProps {
  disabled?: boolean;
}
const selectResponseIcon = css<selectResponseIconProps>`
  color: ${(props) => props.theme.textColor};
  height: 2em;
  width: 2em;
  padding: 0.3em;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 50%;

  ${(props) => props.disabled && `opacity: 0.4;`}
  ${(props) =>
    !props.disabled &&
    `
    cursor: pointer;
    &:hover {
      background-color: ${props.theme.hoverAreaColor};
    }
  `}
`;

const PreviousResponseIcon = styled(ChevronLeft)`
  ${selectResponseIcon}
`;

const NextResponseIcon = styled(ChevronRight)`
  ${selectResponseIcon}
`;

/** Controlled card component to support input for shorter texts. */
export const NumberInputCard = (props: NumberInputCardProps): JSX.Element => {
  const {
    onEnterPress,
    width = 0.25,
    fieldPayload,
    response,
    onResponseChanged,
    disabled = false,
    ...formProps
  } = props;

  const { isFloat, maxLength, placeholder, units, minValue, maxValue } =
    fieldPayload;
  const { number } = response;

  const handleChangeValue = (value: number) => {
    if (onResponseChanged && !disabled) {
      onResponseChanged({ number: number + value });
    }
  }; // handleChangeValue

  return (
    <FormCard {...formProps}>
      <NumberWithUnitsLine>
        <PreviousResponseIcon
          disabled={disabled || (minValue !== undefined && number <= minValue)}
          onClick={() => handleChangeValue(-1)}
          title="Previous Response"
        />
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
        <NextResponseIcon
          disabled={disabled || (maxValue !== undefined && number >= maxValue)}
          onClick={() => handleChangeValue(1)}
          title="Next Response"
        />
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
