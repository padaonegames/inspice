import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';
import { ActivityCreationOverviewPanel } from '../../components/Navigation/ActivityCreationOverviewPanel';

export default {
  title: 'Navigation/Activity Creation Overview Panel',
  component: ActivityCreationOverviewPanel,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof ActivityCreationOverviewPanel>;

const Template: ComponentStory<typeof ActivityCreationOverviewPanel> = (args) => <ActivityCreationOverviewPanel {...args} />;

export const Default = Template.bind({});

Default.args = {
  stages: [
    { name: 'Basic Information'.toUpperCase(), completed: true },
    { name: 'Stage Settings'.toUpperCase(), completed: false },
    { name: 'Artwork Selection'.toUpperCase(), completed: false }
  ],
  finaItemCaption: 'Submit Activity'.toUpperCase(),
};