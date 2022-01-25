import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';
import { LoadingOverlay } from '../../components/Layout/LoadingOverlay';

export default {
  title: 'Layout/Loading Overlay',
  component: LoadingOverlay,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof LoadingOverlay>;

const Template: ComponentStory<typeof LoadingOverlay> = (args) => <LoadingOverlay {...args} />;

export const Default = Template.bind({});

Default.args = {
  message: 'Content loading'
};