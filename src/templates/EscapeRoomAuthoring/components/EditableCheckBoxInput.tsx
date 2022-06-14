import styled from 'styled-components';
import { Cross } from '@styled-icons/entypo/Cross';

/* Create a custom checkbox */
interface CheckMarkProps {
  size?: string;
  type: 'radio' | 'checkbox';
};

const CheckMark = styled.span<CheckMarkProps>`
  height: ${props => props.size ?? '1.5em'};
  width: ${props => props.size ?? '1.5em'};
  background-color: #eee;
  margin-right: 1em;

  ${props => props.type === 'radio' && 'border-radius: 50%;'}
`;

const RemoveOptionIcon = styled(Cross)`
  height: 1.5em;
  width: 1.5em;
  padding: 0.1em;
  cursor: pointer;
  margin: auto;
  border-radius: 50%;
  color: white;
`;

export const InputText = styled.input`
  font-size: 0.9em;
  font-weight: 200;
  font-family: ${props => props.theme.contentFont};
  line-height: 135%;
  width: 85%;
  margin-top: 0.2em;
  color: white;
  border: none;
  border-bottom: 2px solid transparent;
  outline: none;
  padding: 2px 0;
  background-color: transparent;
  transition: all 0s;

  &::placeholder {
    opacity: 0.775; /*Change the opacity between 0 and 1*/
  }
`;

/* The container */
interface ContainerProps {
  enabled?: boolean;
}
const Container = styled.div<ContainerProps>`
  width: 100%;
  height: auto;
  padding: 0 0.5em;
  margin-bottom: 0.35em;

  font-size: 1em;
  font-weight: normal;
  letter-spacing: +0.5px;
  font-family: Raleway;
  color: ${props => props.theme.textColor};

  display: flex;
  flex-direction: row;
  align-items: center;

  &:hover ${InputText} {
    border-bottom: 2px solid white;
  }

  ${RemoveOptionIcon} {
    &:hover {
      color: black;
      background-color: white;
    }
  }

  ${InputText} {
    ${props => props.enabled && `
    &:focus {
      transition: border-bottom 0.25s;
      border-bottom: 3px solid white;
    }`}
  }
`;

export interface EditableCheckBoxInputProps {
  /** Text that will be displayed next to the checkbox */
  labelText: string;
  /** size of the checkbox */
  boxSize?: string;
  /** Whether to display checkbox as a radio button or a square */
  style?: 'radio' | 'checkbox';
  /** whether this input should be enabled */
  enabled?: boolean;
  /** callback to parent specifying that label Text has been modified by the user */
  onLabelTextChanged?: (value: string) => void;
  /** callback to parent specifying that user wishes to delete this option */
  onObjectRemoved?: () => void;
  /** Placeholder to show if labelText is an empty string */
  labelTextPlaceholder?: string;
};

export const EditableCheckBoxInput = (props: EditableCheckBoxInputProps): JSX.Element => {

  const {
    boxSize = '25px',
    style = 'checkbox',
    enabled = true,
    labelText,
    onLabelTextChanged,
    onObjectRemoved,
    labelTextPlaceholder = 'Write an answer...'
  } = props;

  return (
    <Container enabled={enabled}>
      <CheckMark
        type={style}
        size={boxSize}
      />
      <InputText
        readOnly={!enabled}
        placeholder={labelTextPlaceholder}
        maxLength={500}
        value={labelText}
        onChange={event => {
          if (onLabelTextChanged) onLabelTextChanged(event.target.value);
        }}
      />
      {enabled && <RemoveOptionIcon onClick={onObjectRemoved}/>}
    </Container>
  );
};

export default EditableCheckBoxInput;