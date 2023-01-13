import { useState } from "react";
import {
  CheckboxList,
  CheckboxOption,
} from "../../../../components/Forms/Cards/cardStyles";
import FormCard from "../../../../components/Forms/Cards/FormCard";
import EditableCheckBoxInput from "../../../../components/Forms/EditableCheckBoxInput";
import { DiaryPageSlot } from "../../../../services/escapeRoomActivity.model";
import { ResourcesPopUp } from "../ResourcesPopUp";

export interface DiaryPageSideCardProps {
  /** this card's title */
  title?: string;
  /** text to display when rendering the button to add a new text slot */
  addNewTextSlotLabel?: string;
  /** text to display when rendering the button to add a new sprite slot */
  addNewSpriteSlotLabel?: string;
  /** this diary's slots in the form of images or text */
  slots: DiaryPageSlot[];
  /** callback to parent specifying that user wishes to make a change to this diary side */
  onDiarySideChanged?: (slots: DiaryPageSlot[]) => void;
  /** whether the contents of this card can be edited */
  editMode?: boolean;
} // DiaryPageSideCardProps

export const DiaryPageSideCard = (
  props: DiaryPageSideCardProps
): JSX.Element => {
  const {
    title = "",
    addNewSpriteSlotLabel,
    addNewTextSlotLabel,
    slots,
    onDiarySideChanged,
    editMode,
  } = props;

  const [showResourcesPopUp, setShowResourcesPopUp] = useState<boolean>(false);

  const handleAddTextSlot = () => {
    if (!onDiarySideChanged) return;
    onDiarySideChanged([...slots, { type: "text", text: "" }]);
  }; // handleAddTextSlot

  const handleAddImageSlot = (imageSrc: string) => {
    if (!onDiarySideChanged) return;
    onDiarySideChanged([...slots, { type: "sprite", spriteSrc: imageSrc }]);
    setShowResourcesPopUp(false);
  }; // handleAddImageSlot

  const handleEditSlot = (index: number, value: DiaryPageSlot) => {
    if (!onDiarySideChanged) return;
    onDiarySideChanged([
      ...slots.slice(0, index),
      value,
      ...slots.slice(index + 1),
    ]);
  }; // handleEditSlot

  const handleRemoveSlot = (index: number) => {
    if (!onDiarySideChanged) return;
    onDiarySideChanged(slots.filter((_, i) => i !== index));
  }; // handleRemoveSlot

  return (
    <>
      {/* Pop up component to enable image selection from the escape room resources */}
      {showResourcesPopUp && (
        <ResourcesPopUp
          onClosePopUp={() => setShowResourcesPopUp(false)}
          onResourceSelected={handleAddImageSlot}
          popUpTitle="Select an image to add to this page:"
        />
      )}
      <FormCard
        promptText={title}
        required
        //requiredAlert={requiredAlert}
        //alertMessage={alertMessage}
      >
        <CheckboxList>
          {slots.map((elem, i) => (
            <CheckboxOption key={`checkBoxAnswer${i}`}>
              <EditableCheckBoxInput
                boxContent={{
                  type: "none",
                }}
                key={`editableCheckBoxInput${i}`}
                labelText={elem.type === "text" ? elem.text : "Image:"}
                style={elem.type === "text" ? "radio" : "checkbox"}
                boxSize="1.25em"
                inputType={
                  !editMode ? "none" : elem.type === "text" ? "text" : "click"
                }
                imageSrc={elem.type === "sprite" ? elem.spriteSrc : undefined}
                onObjectRemoved={() => handleRemoveSlot(i)}
                onLabelTextChanged={(value) =>
                  handleEditSlot(i, { type: "text", text: value })
                }
              />
            </CheckboxOption>
          ))}
          {editMode && (
            <CheckboxOption key="checkBoxAnswerAddNew">
              <EditableCheckBoxInput
                boxContent={{ type: "none" }}
                key="editableCheckBoxInputAddNewText"
                labelText=""
                labelTextPlaceholder={addNewTextSlotLabel}
                onInputTextClicked={handleAddTextSlot}
                style="radio"
                boxSize="1.25em"
                inputType="click"
              />
              <EditableCheckBoxInput
                boxContent={{ type: "none" }}
                key="editableCheckBoxInputAddNewSprite"
                labelText=""
                labelTextPlaceholder={addNewSpriteSlotLabel}
                onInputTextClicked={() => setShowResourcesPopUp(true)}
                style="checkbox"
                boxSize="1.25em"
                inputType="click"
              />
            </CheckboxOption>
          )}
        </CheckboxList>
      </FormCard>
    </>
  );
}; // DiaryPageSideCard
