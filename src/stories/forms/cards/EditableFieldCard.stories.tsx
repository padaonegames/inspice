import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';
import styled from 'styled-components';
import EditableFieldCard, { FieldMapping, fieldTypeIcon } from '../../../components/Forms/Cards/EditableFieldCard';
import { RadioCircleMarked } from "styled-icons/boxicons-regular";
import { ShortText } from "@styled-icons/material/ShortText";
import { TextLeft } from "@styled-icons/bootstrap/TextLeft";
import { CalendarEvent } from "@styled-icons/boxicons-regular/CalendarEvent";
import { Likert } from "@styled-icons/fluentui-system-regular/Likert";
import { ImageAdd } from "@styled-icons/boxicons-regular/ImageAdd";
import { CheckboxChecked } from "@styled-icons/fluentui-system-filled/CheckboxChecked";
import { LinearScale } from "@styled-icons/material-outlined/LinearScale";
import { Tags } from "@styled-icons/fa-solid/Tags";
import { MultistageFormFieldDefinition } from '../../../services/multistageFormActivity.model';
import { shortTextCardFactory } from '../../../components/Forms/Cards/ShortTextInputCard';
import { multipleChoiceCardFactory } from '../../../components/Forms/Cards/MultipleChoiceCard';
import { calendarInputCardFactory } from '../../../components/Forms/Cards/CalendarInputCard';

const MultipleChoiceIcon = styled(RadioCircleMarked)`
  ${fieldTypeIcon}
`;

const ShortTextIcon = styled(ShortText)`
  ${fieldTypeIcon}
`;

const LongTextIcon = styled(TextLeft)`
  ${fieldTypeIcon}
`;

const DateIcon = styled(CalendarEvent)`
  ${fieldTypeIcon}
`;

const LikertIcon = styled(Likert)`
  ${fieldTypeIcon}
`;

const ImageUploadIcon = styled(ImageAdd)`
  ${fieldTypeIcon}
`;

const CheckboxIcon = styled(CheckboxChecked)`
  ${fieldTypeIcon}
`;

const RangeIcon = styled(LinearScale)`
  ${fieldTypeIcon}
`;

const TagsIcon = styled(Tags)`
  ${fieldTypeIcon}
`;

export default {
  title: 'Forms/Cards/Editable Field Card',
  component: EditableFieldCard,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof EditableFieldCard>;

const Template: ComponentStory<typeof EditableFieldCard> = (args) => <EditableFieldCard {...args} />;

const fieldMappings: FieldMapping[] = [
  {
    fieldType: 'short-text',
    displayName: 'Short Text',
    iconComponent: <ShortTextIcon />,
    defaultFieldPayload: shortTextCardFactory.defaultFormDefinition,
    editingComponentProducer: shortTextCardFactory.formEditingComponent as any
  },
  {
    fieldType: 'calendar',
    displayName: 'Calendar',
    iconComponent: <DateIcon />,
    defaultFieldPayload: calendarInputCardFactory.defaultFormDefinition,
    editingComponentProducer: calendarInputCardFactory.formEditingComponent as any
  },
  {
    fieldType: 'multiple-choice',
    displayName: 'Multiple Choice',
    iconComponent: <MultipleChoiceIcon />,
    defaultFieldPayload: multipleChoiceCardFactory.defaultFormDefinition,
    editingComponentProducer: multipleChoiceCardFactory.formEditingComponent as any
  }
];

/*
fieldMappings.set('short-text', { component: <ShortTextIcon />, name: 'Short Text' });
fieldMappings.set('long-text', { component: <LongTextIcon />, name: 'Paragraph' });
fieldMappings.set('multiple-choice', { component: <MultipleChoiceIcon />, name: 'Multiple Choice' });
fieldMappings.set('likert-scale', { component: <LikertIcon />, name: 'Likert Scale' });
fieldMappings.set('checkbox', { component: <CheckboxIcon />, name: 'Checkbox' });
fieldMappings.set('image-upload', { component: <ImageUploadIcon />, name: 'Image Upload' });
fieldMappings.set('range', { component: <RangeIcon />, name: 'Numeric Range' });
fieldMappings.set('calendar', { component: <DateIcon />, name: 'Date' });
fieldMappings.set('tags', { component: <TagsIcon />, name: 'Tag Cloud' });
*/

export const Default = Template.bind({});
Default.args = {
  fieldMappings: fieldMappings
};

/*
export const ShortTextBasic = Template.bind({});
ShortTextBasic.args = {
  fieldDefinition: {
    type: 'short-text',
    promptText: 'Please enter your first and last names below.',
    placeholder: '',
    maxLength: 25
  }
};

export const MultipleChoiceBasic = Template.bind({});
MultipleChoiceBasic.args = {
  fieldDefinition: {
    type: 'multiple-choice',
    promptText: 'Which of the following do you think is more interesting? Please take into account different factors, such as product quality, price or availability, to name a few.',
    answers: ['I think nothing in this list is very interesting', 'I think I have run out of ideas']
  }
};

export const CheckBoxGroupBasic = Template.bind({});
CheckBoxGroupBasic.args = {
  fieldDefinition: {
    type: 'checkbox',
    promptText: 'Which types of input should the user be allowed to choose from?',
    fields: ['Images', 'Tags', 'Long Texts', 'Emojis']
  }
};

export const RequiredAlert = Template.bind({});
RequiredAlert.args = {
  fieldDefinition: {
    type: 'calendar',
    promptText: '',
    required: true,
  },
  requiredAlert: true,
  alertMessage: 'Please input a valid prompt.'
};*/