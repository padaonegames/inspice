import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import TagsInputCard from '../../../components/Forms/Cards/TagsInputCard';

export default {
  title: 'Forms/Cards/Tags Input Card',
  component: TagsInputCard,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof TagsInputCard>;

const Template: ComponentStory<typeof TagsInputCard> = (args) => <TagsInputCard {...args} />;

export const Empty = Template.bind({});
Empty.args = {
  promptText: 'Add tags to help other users find this activity:',
  value: []
};

export const SeveralCards = Template.bind({});
SeveralCards.args = {
  promptText: 'Add tags to help other users find this activity:',
  value: ['Family Friendly', 'Nature', 'Rocks', 'Birds']
};