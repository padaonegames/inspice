import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import DisplayVideoCard from '../../../components/Forms/Cards/DisplayVideoCard';

export default {
  title: 'Forms/Cards/Display Video Card',
  component: DisplayVideoCard,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof DisplayVideoCard>;

const Template: ComponentStory<typeof DisplayVideoCard> = (args) => <DisplayVideoCard {...args} />;

export const EmptyVideo = Template.bind({});
EmptyVideo.args = {
  promptText: 'Video player with no content to display',
  src: ''
};

export const ExampleVideo = Template.bind({});
ExampleVideo.args = {
  promptText: 'Video player with a sample video',
  src: 'https://www.youtube.com/watch?v=K4TOrB7at0Y'
};