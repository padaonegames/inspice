import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';
import { PageBar } from '../../components/Navigation/PageBar';

export default {
  title: 'Navigation/Page Bar',
  component: PageBar,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof PageBar>;

const Template: ComponentStory<typeof PageBar> = (args) => <PageBar {...args} />;

export const Default = Template.bind({});

Default.args = {
  currentPage: 1,
  numberOfPages: 5,
};