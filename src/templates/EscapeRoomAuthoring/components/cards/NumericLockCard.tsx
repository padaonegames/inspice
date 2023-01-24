import styled, { css } from "styled-components";
import { UpArrow } from "@styled-icons/boxicons-solid/UpArrow";
import { DownArrow } from "@styled-icons/boxicons-solid/DownArrow";
import { DotsTwoVertical } from "@styled-icons/entypo/DotsTwoVertical";
import { ConsumableFieldProps } from "../../../../services/multistageFormActivity.model";
import FormCard from "../../../../components/Forms/Cards/FormCard";

const iconStyle = css`
  color: ${(props) => props.theme.textColor};
  height: 2em;
  width: 2em;
  padding: 0.4em;
  cursor: pointer;
  border-radius: 50%;
  &:hover {
    background-color: ${(props) => props.theme.hoverAreaColor};
  }
`;

const UpArrowIcon = styled(UpArrow)`
  ${iconStyle}
`;

const DownArrowIcon = styled(DownArrow)`
  ${iconStyle}
`;

const DotsTwoVerticalIcon = styled(DotsTwoVertical)`
  color: ${(props) => props.theme.textColor};
  height: 2em;
  width: 2em;
`;

const PasswordEditorDigits = styled.div`
  position: relative;
  width: 100%;
  min-width: 22em;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 1em;
`;

const DigitEditor = styled.div`
  position: relative;
  width: 4.5em;
  height: 7em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 0.35rem;
  border: 1px solid #dfe1e5;
  margin: 0.25em 0;
`;

const Digit = styled.span`
  font-family: ${(props) => props.theme.contentFont};
  color: ${(props) => props.theme.textColor};
  font-weight: 400;
  font-size: 3.75em;
  line-height: 1.5;
  transition: color 0.5s ease;
  word-wrap: break-word;
`;

const LockSlot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 0.3em;
  margin-right: 0.3em;
`;

export interface NumericLockCardDefinition {
  hoursEnabled?: boolean;
} // NumericLockCardResponseDefinition

export interface NumericLockCardResponseDefinition {
  password: number[];
} // NumericLockCardResponseDefinition

export interface NumericLockCardProps
  extends ConsumableFieldProps<
    NumericLockCardDefinition,
    NumericLockCardResponseDefinition
  > {
  disabled?: boolean;
} // NumericLockCardProps

export const NumericLockCard = (props: NumericLockCardProps): JSX.Element => {
  const {
    response,
    fieldPayload,
    onResponseChanged,
    disabled = false,
    ...formProps
  } = props;

  const { hoursEnabled } = fieldPayload;
  const { password } = response;

  const handleEditDigit = (index: number, value: number) => {
    if (!onResponseChanged) return;
    onResponseChanged({
      password: [
        ...password.slice(0, index),
        value,
        ...password.slice(index + 1),
      ],
    });
  }; // handleEditDigit

  const generateLockSlot = (index: number, digit: number) => {
    return (
      <LockSlot>
        <UpArrowIcon
          onMouseDown={() => {
            handleEditDigit(index, (digit + 1) % 10);
          }}
        />
        <DigitEditor>
          <Digit>{digit}</Digit>
        </DigitEditor>
        <DownArrowIcon
          onMouseDown={() => {
            handleEditDigit(index, digit - 1 < 0 ? 9 : digit - 1);
          }}
        />
      </LockSlot>
    );
  }; // generateLockSlot

  return (
    <FormCard {...formProps}>
      {/* Container of the password digits */}
      <PasswordEditorDigits>
        {/* Digits that specify hours */}
        {password.flatMap((digit, i) =>
          i === password.length / 2 && hoursEnabled
            ? [<DotsTwoVerticalIcon />, generateLockSlot(i, digit)]
            : [generateLockSlot(i, digit)]
        )}
      </PasswordEditorDigits>
    </FormCard>
  );
}; // NumericLockCard
