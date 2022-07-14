import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import DisplayImageCard from '../../../components/Forms/Cards/DisplayImageCard';

export default {
  title: 'Forms/Cards/Display Image Card',
  component: DisplayImageCard,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof DisplayImageCard>;

const Template: ComponentStory<typeof DisplayImageCard> = (args) => <DisplayImageCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  promptText: 'No image source given',
  src: ''
};

export const SampleImage = Template.bind({});
SampleImage.args = {
  promptText: 'Preview of an image given its url',
  src: 'https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg'
};

