import styled from "styled-components";
import {
  EditableFieldProps,
  HighlightTextFieldDefinition,
  Highlighter,
} from "../../../services/multistageFormActivity.model";
import { EditableText, InputText, Root } from "./cardStyles";
import FormCard from "./FormCard";
import { AbstractFormFactory } from "./FormFactory";
import { Highlight } from "@styled-icons/boxicons-regular/Highlight";
import { useState } from "react";

import { Add } from "@styled-icons/fluentui-system-filled/Add";
import { Minus } from "@styled-icons/evaicons-solid/Minus";
import { HighlightOff } from "styled-icons/material";

interface ButtonProps {
  avaliable: boolean;
}

const AddScaleIcon = styled(Add)<ButtonProps>`
  height: 1.75em;
  width: 1.75em;

  cursor: pointer;
  border-radius: 5px;
  border: 1px solid #dadce0;
  background-color: #f8f9fa;
  opacity: ${(props) => (props.avaliable ? "1" : "0.3")};
  &:hover {
    background-color: rgba(230, 230, 230, 1);
  }
`;

const DecreaseScaleIcon = styled(Minus)<ButtonProps>`
  height: 1.75em;
  width: 1.75em;
  cursor: pointer;

  border-radius: 5px;
  border: 1px solid #dadce0;
  background-color: #f8f9fa;
  opacity: ${(props) => (props.avaliable ? "1" : "0.3")};
  &:hover {
    background-color: rgba(230, 230, 230, 1);
  }
`;

const HighlighterIcon = styled(Highlight)`
  height: 90%;
  width: 90%;
  color: white;
`;

const NumHighlightersIcon = styled(Highlight)`
  height: 90%;
  color: black;
`;

const availableColors = [
  "#e21b3c",
  "#1368ce",
  "#d89e00",
  "#26890c",
  "#0aa3a3",
  "#864cbf",
];

export const TextPreview = styled.div`
  font-size: 0.95em;
  font-weight: 200;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  width: 100%;
  margin-top: 10px;
  color: ${(props) => props.theme.textColor};

  border: 2px solid #dadce0;
  border-radius: 0.5rem;
  padding: 5px 10px 5px 10px;
`;

export interface HighlightTextCardProps extends HighlightTextFieldDefinition {
  /** Prompt for the user to fill in this field */
  promptText?: string;
  /** Whether this field should always be filled in by the user */
  required?: boolean;
  /** whether to modify the appearance of this card to reflect that the user tried to submit the form without entering a value for this field */
  requiredAlert?: boolean;
} // MultipleChoiceCardProps

export const HighLightTextCard = (
  props: HighlightTextCardProps
): JSX.Element => {
  const { promptText = "", requiredAlert, required, text } = props;

  const [highlightColors, setHighlightColors] = useState<string[]>(
    new Array(text.length).fill("#ffffff")
  );

  const [selectedText, setSelectedText] = useState<string>(text);
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<Highlighter>({
    tag: "default",
    color: "#dddddd",
  });

  const handleSelectionMade = (value: Selection | null) => {
    if (value === null) return;
    value.getRangeAt(0).startOffset;

    setStart(value.getRangeAt(0).startOffset);
    setEnd(value.getRangeAt(0).endOffset);

    setSelectedText(
      "Start: " +
        value.getRangeAt(0).startOffset.toString() +
        " End: " +
        value.getRangeAt(0).endOffset
    );
  };

  const currentCharacter = (index: number, color: string) => {
    return (
      <mark
        style={{
          color: "black",
          backgroundColor: index >= start && index <= end ? "#ff0000" : color,
        }}
      >
        {text[index]}
      </mark>
    );
  };

  return (
    <FormCard
      promptText={promptText}
      required={required}
      requiredAlert={requiredAlert}
    >
      <TextPreview
        onMouseUp={() => {
          handleSelectionMade(window.getSelection());
        }}
      >
        {highlightColors.map((question, qInd) => (
          <>{currentCharacter(qInd, question)}</>
        ))}
      </TextPreview>

      {/* Preview of selected text */}
      <TextPreview>{selectedText}</TextPreview>
    </FormCard>
  );
}; // DisplayImageCard

export const HighlightersConfig = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 0.5rem;
  border: 1px solid #c44c49;
  background-color: rgba(240, 240, 240, 1);

  margin-bottom: 1rem;
`;

const HighlightersConfigTitle = styled.div`
  font-size: 1.75rem;
  font-weight: 200;
  color: #ffffff;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 115%;

  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #c44c49;
`;

export const HighlighterContainer = styled.div`
  width: 75%;
  height: 3rem;
  margin-top: 10px;
  margin: 1rem;
  color: ${(props) => props.theme.textColor};
  border: 2px solid #dadce0;
  border-radius: 0.5rem;
  background-color: white;

  display: flex;
  flex-direction: row;
  justify-content: start;
`;

interface HighlighterColorProps {
  color: string;
}

export const HighlighterColor = styled.div<HighlighterColorProps>`
  width: 20%;
  height: 100%;
  color: ${(props) => props.theme.textColor};
  border: 2px solid #000000;
  border-radius: 0.5rem;
  padding: 5px 10px 5px 10px;

  background-color: ${(props) => props.color};

  display: flex;
  flex-direction: row;
  justify-content: start;
  margin-right: 1rem;
`;

export const AddHighlighterButton = styled.div`
  position: relative;
  font-size: 0.8em;
  font-family: ${(props) => props.theme.contentFont};
  width: 40%;
  height: 3rem;
  margin-top: 10px;
  margin: 1rem;
  color: ${(props) => props.theme.textColor};
  border: 2px solid #dadce0;
  border-radius: 0.5rem;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

////////////////////GRID
interface GridProps {
  elements: number;
  elementsPerRow: number;
}
const HighlightersGrid = styled.div<GridProps>`
  display: inline-grid;
  grid-template-columns: repeat(
    min(${(props) => props.elementsPerRow}, ${(props) => props.elements}),
    ${(props) => {
      return props.elements < props.elementsPerRow
        ? 100 / props.elements
        : 100 / props.elementsPerRow;
    }}%
  );
  width: 100%;
  height: 100%;
`;

////////////////////Resources
const GridHighligterContainer = styled.div`
  place-self: center;
  position: relative;
  width: 100%;
  height: 100%;
`;

const NumHighlightersConfig = styled.div`
  display: flex;
  justify-content: center;
  width: 95%;
  align-items: center;
  align-self: center;
  border-bottom: 2px solid #d4d4d4;
  padding-top: 0.6em;
  height: 50px;
`;

export interface EditableHighLightTextCardContentProps
  extends EditableFieldProps<HighlightTextFieldDefinition> {
  /** text to display for the add new option label. */
  addNewOptionLabel?: string;
} // EditableMultipleChoiceCardContentProps

export const EditableHighLightTextCardContent = (
  props: EditableHighLightTextCardContentProps
): JSX.Element => {
  const { fieldPayload, onPayloadChanged } = props;

  const { text, highlighters } = fieldPayload;

  const handleEditText = (value: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...fieldPayload,
      text: value,
    });
  }; // handleEditOption

  const handleEditHighlighterTag = (value: string, index: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...fieldPayload,
      highlighters: [
        ...fieldPayload.highlighters.slice(0, index),
        { ...fieldPayload.highlighters[index], tag: value },
        ...fieldPayload.highlighters.slice(index + 1),
      ],
    });
  }; // handleEditOption

  const handleAddHighlighter = () => {
    if (!onPayloadChanged || highlighters.length >= availableColors.length)
      return;
    onPayloadChanged({
      ...fieldPayload,
      highlighters: [
        ...fieldPayload.highlighters,
        {
          tag: "New Highlighter",
          color:
            availableColors[
              fieldPayload.highlighters.length % availableColors.length
            ],
        },
      ],
    });
  };

  const handleDeleteHighlighter = () => {
    if (!onPayloadChanged || highlighters.length <= 0) return;
    onPayloadChanged({
      ...fieldPayload,
      highlighters: [
        ...fieldPayload.highlighters.slice(
          0,
          fieldPayload.highlighters.length - 1
        ),
      ],
    });
  };

  return (
    <>
      <Root>
        {/* Highlighters configuration */}
        <HighlightersConfig>
          <HighlightersConfigTitle>Highligters</HighlightersConfigTitle>
          {/* Buttons to add and decrease the number of highlighters avaliable */}
          <NumHighlightersConfig>
            <DecreaseScaleIcon
              onMouseDown={handleDeleteHighlighter}
              avaliable={HighlightOff.length > 0}
            />
            <NumHighlightersIcon />
            <AddScaleIcon
              onMouseDown={handleAddHighlighter}
              avaliable={HighlightOff.length < availableColors.length - 1}
            />
          </NumHighlightersConfig>

          {/* Grid with the avaliable highlighters */}
          <HighlightersGrid elements={highlighters.length} elementsPerRow={2}>
            {highlighters.map((currentHighlighter, highlighterIndex) => (
              <GridHighligterContainer>
                <HighlighterContainer>
                  <HighlighterColor color={currentHighlighter.color}>
                    <HighlighterIcon />
                  </HighlighterColor>
                  {/* Input to specify the highlighters tag */}
                  <InputText
                    key={`Highlighter${highlighterIndex.toString()}`}
                    textWidth={0.6}
                    type={"text"}
                    placeholder={"placeholder"}
                    maxLength={25}
                    value={currentHighlighter.tag}
                    onChange={(event) => {
                      handleEditHighlighterTag(
                        event.target.value,
                        highlighterIndex
                      );
                    }}
                  />
                </HighlighterContainer>
              </GridHighligterContainer>
            ))}
          </HighlightersGrid>
        </HighlightersConfig>

        {/* Text that is going to be highlighted by the user */}
        <EditableText
          placeholder={"Lorem ipsum dolor sit amet..."}
          value={text}
          onChange={(event) => {
            handleEditText(event.target.value);
          }}
        />
      </Root>
    </>
  );
}; // EditableDisplayImageCardContent

export const displayTextCardFactory: AbstractFormFactory<HighlightTextFieldDefinition> =
  {
    userFormComponent: (useFormPayload) => (
      <HighLightTextCard {...useFormPayload} />
    ),
    formEditingComponent: (editingFormProps) => (
      <EditableHighLightTextCardContent {...editingFormProps} />
    ),
    defaultFormDefinition: {
      highlighters: [],
      text: "",
    },
  }; // DisplayImageCardFactory

export default HighLightTextCard;
