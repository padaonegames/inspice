import { useEffect, useRef, useState } from "react";
import {
  Root,
  CardPanel,
  PromptText,
  RequiredAsterisk,
  RequiredQuestionSpan,
  RequiredAlertIcon,
  TagsContainer,
  TagText,
  TagWrapper,
  RemoveTagIcon,
  NewTagButton,
  NewTagIcon,
  NewTagText,
  EditableTagText
} from "./cardStyles";

export interface TagsInputCardProps {
  /** Main text rendered on top of the component as a prompt for the user, indicating what they must do with the tags manager */
  promptText: string;
  /** callback to use whenever a card has been created or removed. `value` provides a complete list of tags in use */
  onChange?: (value: string[]) => void;
  /** maximum number of tags to allow for */
  maxTags?: number;
  /** minimum number of tags to allow for */
  minTags?: number;
  /** current value of the input field. Needs to be changed after onChange events to be kept in sync with internal state */
  value?: string[];
  /** whether this field is considered required within the overall form (used to display an asterisk) */
  required?: boolean;
  /** whether to modify the appearance of this card to reflect that the user tried to submit the form without entering a value for this field */
  requiredAlert?: boolean;
}

/** Controlled card component to edit and manage a set of user generated tags */
export const TagsInputCard = (props: TagsInputCardProps): JSX.Element => {

  const {
    promptText,
    maxTags,
    minTags,
    value = [],
    requiredAlert,
    required,
    onChange,
  } = props;

  const [newTagOpen, setNewTagOpen] = useState<boolean>(false);
  const [newTagText, setNewTagText] = useState<string>('');

  const [newTagRef, setNewTagRef] = useState<HTMLInputElement | null>(null);
  const [tagError, setTagError] = useState<boolean>(false);

  const handleAddNewTag = () => {
    if (!newTagOpen || tagError) return;

    if (onChange && newTagText.length > 0) {
      onChange([...value, newTagText]);
    }
    setNewTagOpen(false);
    setNewTagText('');
  };

  const handleAddTagButtonClick = () => {
    if (newTagOpen) return;

    setNewTagOpen(true);
    setNewTagText('');
  };

  const handleRemoveTag = (i: number) => {
    if (onChange) {
      onChange(value.filter((_, ind) => i !== ind));
    }
  };

  useEffect(() => {
    if (newTagRef)
      newTagRef.focus();
  }, [newTagRef]);

  useEffect(() => {
    if (!newTagOpen) return;
    setTagError(value.some(elem => elem === newTagText));
  }, [newTagText])

  return (
    <Root>
      <CardPanel requiredAlert={requiredAlert}>
        <PromptText>
          {promptText}{required && <RequiredAsterisk> *</RequiredAsterisk>}
        </PromptText>
        <TagsContainer>
          {value.map((tag, i) => (
            <TagWrapper key={tag}>
              <TagText>{tag}</TagText>
              <RemoveTagIcon onClick={() => handleRemoveTag(i)} />
            </TagWrapper>
          ))}
          {newTagOpen && (
            <TagWrapper error={tagError}>
              <EditableTagText
                ref={prev => setNewTagRef(prev)}
                placeholder='Type your new tag...'
                value={newTagText}
                onChange={(event) => setNewTagText(event.target.value || '')}
                onBlur={handleAddNewTag}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    handleAddNewTag();
                  }
                }}
              />
            </TagWrapper>
          )}
          {!newTagOpen && (
            <NewTagButton onClick={handleAddTagButtonClick}>
              <NewTagIcon />
              <NewTagText>New tag</NewTagText>
            </NewTagButton>
          )}
        </TagsContainer>
        {!tagError && requiredAlert && (
          <RequiredQuestionSpan>
            <RequiredAlertIcon /> This question is required.
          </RequiredQuestionSpan>
        )}
        {tagError && (
          <RequiredQuestionSpan>
            <RequiredAlertIcon /> Tag already exists.
          </RequiredQuestionSpan>
        )}
      </CardPanel>
    </Root>
  );
};

export default TagsInputCard;