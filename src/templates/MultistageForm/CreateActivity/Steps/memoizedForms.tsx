import React from "react";
import { EditableCalendarContent } from "../../../../components/Forms/Cards/CalendarInputCard";
import { EditableCheckBoxGroupCardContent } from "../../../../components/Forms/Cards/CheckBoxGroupInputCard";
import { EditableDisplayImageCardContent } from "../../../../components/Forms/Cards/DisplayImageCard";
import { EditableDisplayTextCardContent } from "../../../../components/Forms/Cards/DisplayTextCard";
import { EditableDisplayVideoCardContent } from "../../../../components/Forms/Cards/DisplayVideoCard";
import { EditableHighLightTextCardContent } from "../../../../components/Forms/Cards/HighLightTextCard";
import { EditableLongTextContent } from "../../../../components/Forms/Cards/LongTextInputCard";
import { EditableMultipleChoiceCardContent } from "../../../../components/Forms/Cards/MultipleChoiceCard";
import { EditableShortTextContent } from "../../../../components/Forms/Cards/ShortTextInputCard";

export const EditableCheckBoxGroupCardContentMemo = React.memo(
  EditableCheckBoxGroupCardContent
);
export const EditableShortTextContentMemo = React.memo(
  EditableShortTextContent
);
export const EditableLongTextContentMemo = React.memo(EditableLongTextContent);
export const EditableMultipleChoiceCardContentMemo = React.memo(
  EditableMultipleChoiceCardContent
);
export const EditableCalendarContentMemo = React.memo(EditableCalendarContent);
export const EditableDisplayImageCardContentMemo = React.memo(
  EditableDisplayImageCardContent
);
export const EditableDisplayVideoCardContentMemo = React.memo(
  EditableDisplayVideoCardContent
);
export const EditableDisplayTextCardContentMemo = React.memo(
  EditableDisplayTextCardContent
);
export const EditableHighLightTextCardContentMemo = React.memo(
  EditableHighLightTextCardContent
);
