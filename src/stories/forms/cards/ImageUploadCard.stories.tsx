import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import ImageUploadCard from '../../../components/Forms/Cards/ImageUploadCard';

export default {
  title: 'Forms/Cards/Image Upload Card',
  component: ImageUploadCard,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof ImageUploadCard>;

const Template: ComponentStory<typeof ImageUploadCard> = (args) => <ImageUploadCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  promptText: 'Upload a thumbnail image:',
  required: false
};