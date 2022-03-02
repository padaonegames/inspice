import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '../../components/Layout/Header';

export default {
  title: 'Layout/Header',
  component: Header,
  decorators: [
    (Story) => {
      return (
        <MemoryRouter initialEntries={['/']}>
          {Story()}
        </MemoryRouter>
      );
    },
  ],
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});

Default.args = {
  activityTitle: 'Sample Activity'
};