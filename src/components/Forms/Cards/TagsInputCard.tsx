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
  promptText: string;
  onChange?: (value: string[]) => void;
  maxTags?: number;
  minTags?: number;
  value?: string[];
  required?: boolean;
  /* True if user tried to submit the form without filling a required field */
  requiredAlert?: boolean;
}

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
              <RemoveTagIcon onClick={() => handleRemoveTag(i)}/>
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