import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';
import { MemoryRouter } from 'react-router-dom';
import { CreateMultistageFormActivityScreenComponent } from '../../templates/MultistageForm/CreateActivity/Screen';

export default {
  title: 'Pages/Multistage Form Creation',
  component: CreateMultistageFormActivityScreenComponent,
  decorators: [
    (Story) => {
      return (
        <MemoryRouter initialEntries={['/']}>
          {Story()}
        </MemoryRouter>
      );
    },
  ],
} as ComponentMeta<typeof CreateMultistageFormActivityScreenComponent>;

const Template: ComponentStory<typeof CreateMultistageFormActivityScreenComponent> = (_) => <CreateMultistageFormActivityScreenComponent />;

export const Default = Template.bind({});
Default.args = {
};