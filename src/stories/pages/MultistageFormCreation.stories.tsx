import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';
import { MemoryRouter } from 'react-router-dom';
import CreateMultistageFormActivityScreen from '../../templates/MultistageForm/CreateActivity/Screen';

export default {
  title: 'Pages/Multistage Form Creation',
  component: CreateMultistageFormActivityScreen,
  decorators: [
    (Story) => {
      return (
        <MemoryRouter initialEntries={['/']}>
          {Story()}
        </MemoryRouter>
      );
    },
  ],
} as ComponentMeta<typeof CreateMultistageFormActivityScreen>;

const Template: ComponentStory<typeof CreateMultistageFormActivityScreen> = (_) => <CreateMultistageFormActivityScreen />;

export const Default = Template.bind({});
Default.args = {
};