import styled, { css } from "styled-components";
import { AddCircle } from '@styled-icons/fluentui-system-regular/AddCircle';
import { Title } from '@styled-icons/material/Title';

const Root = styled.div`
  display: flex;
  flex-direction: row;

  transition: all .3s cubic-bezier(0.4,0,0.2,1);
  justify-content: center;
  align-items: center;
  width: auto;
  padding: 0.5em;
  margin: 0.5em 0;

  border-radius: 8px;
  border: 1px solid #dadce0;
  background-color: ${props => props.theme.cardBackground};
`;

const actionIcon = css`
  height: 1.75em;
  width: 1.75em;
  padding: 0.1em;
  color: ${props => props.theme.textColor};
  cursor: pointer;
  margin: auto 0.15em;
  border-radius: 50%;
  color: #696d72;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const AddItemIcon = styled(AddCircle)`
  ${actionIcon}
`;

const AddTitleIcon = styled(Title)`
  ${actionIcon}
  margin: auto;
`;

export interface FormActionsFloatingCardProps {
  /** Callback to parent specifying that user wishes to add a new question at selected position */
  onAddNewQuestion?: () => void;
  /** Callback to parent specifying that user wishes to add a new title/description card at selected position */
  onAddNewTitleDescription?: () => void;
}

/**
 * Basic Card component to include general content without title or text
 */
export const FormActionsFloatingCard = (props: FormActionsFloatingCardProps): JSX.Element => {

  const {
    onAddNewTitleDescription,
    onAddNewQuestion
  } = props;

  return (
    <Root>
      <AddTitleIcon
        onClick={onAddNewTitleDescription}
        title='Add title and description here'
      />
      <AddItemIcon
        onClick={onAddNewQuestion}
        title='Add new question here'
      />
    </Root>
  );
};

export default FormActionsFloatingCard;