import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import DisplayTextCard from '../../../components/Forms/Cards/DisplayTextCard';

export default {
  title: 'Forms/Cards/Display Text Card',
  component: DisplayTextCard,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof DisplayTextCard>;

const Template: ComponentStory<typeof DisplayTextCard> = (args) => <DisplayTextCard {...args} />;

export const EmptyText = Template.bind({});
EmptyText.args = {
  promptText: 'Empty content',
  text:''
};

export const MediumText = Template.bind({});
MediumText.args = {
  promptText: 'Preview of a medium size text',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur pellentesque lectus, sed maximus odio ullamcorper vitae. Nullam tempus consectetur consequat. Sed sit amet pharetra leo. Phasellus faucibus iaculis accumsan. Etiam imperdiet at mauris eget consectetur. Cras fermentum ultricies mi ac ultrices. Nunc feugiat justo ut felis convallis, eget mattis nibh porta. Mauris turpis tellus, ultricies sed lacus ut, tempor aliquam nisl. Aliquam enim libero, lacinia quis tortor sit amet, semper ultrices lectus. Sed porta risus ut est tempus, ornare elementum dui consectetur.'
};
