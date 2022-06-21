import { useEffect, useRef } from "react";
import styled from "styled-components";

const Root = styled.div`
  width: 100%;
  display: flex;
  -moz-box-align: center;
  align-items: center;
  flex: 0 0 auto;
`;

interface InputAreaProps {
  width?: string;
  height?: string;
  dimBackground?: boolean;
}
export const InputArea = styled.textarea<InputAreaProps>`
  font-size: 0.9em;
  font-weight: 200;
  font-family: ${props => props.theme.contentFont};
  line-height: 135%;
  width: ${props => props.width ?? '100%'};
  height: ${props => props.height ?? '6em'};
  margin-top: 10px;
  color: ${props => props.theme.textColor};
  border: none;
  outline: none;
  padding: 0.65em;
  background-color: ${props => props.dimBackground ? '#f8f9fa' : 'transparent'};
  resize: none;
  overflow-y: hidden;

  text-align: center;

  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;

  &:focus {
    box-shadow: #c44c49 0px -4px 0px 0px inset;
  }
`;

export interface PromptFieldProps {
  /** Text to render within prompt */
  promptText: string;
  /** Placeholder text to display while no text has been provided */
  promptPlaceholder?: string;
  /** callback to notify parent of text changing within the input area */
  onPromptChange?: (value: string) => void;
} // PromptFieldProps

export const PromptField = (props: PromptFieldProps): JSX.Element => {

  const {
    promptText,
    promptPlaceholder = 'Start typing your prompt',
    onPromptChange
  } = props;

  // reference to the actual DOM element for the prompt area to allow for dynamic resizing
  const promptAreaRef = useRef<HTMLTextAreaElement>(null);

  /**
   * useEffect hook to maintain a consistent height for the
   * HTMLTextAreaElement used to display the promptText.
   * Essentialy, this listens for changes in promptText and
   * modifies container's height dynamically to fit the entire text 
   * without having to scroll.
   */
  useEffect(() => {
    if (promptAreaRef.current == null) return;

    promptAreaRef.current.style.height = '0px';
    const scrollHeight = promptAreaRef.current.scrollHeight;
    promptAreaRef.current.style.height = scrollHeight + 'px';
  }, [promptText, promptAreaRef.current]); // useEffect

  /**
   * Manage a change in the prompt text for this field
   * @param value New prompt text
   */
  const handlePromptTextChanged = (value: string) => {
    if (onPromptChange) {
      onPromptChange(value);
    }
  }; // handlePromptTextChanged

  return (
    <Root>
      <InputArea
        dimBackground
        width='100%'
        height='3em'
        ref={promptAreaRef}
        placeholder={promptPlaceholder}
        maxLength={500}
        value={promptText}
        onChange={event => handlePromptTextChanged(event.target.value)}
      />
    </Root>
  );
}; // PromptField