import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';
import { MemoryRouter } from 'react-router-dom';
import { CreateEscapeRoomScreenComponent } from '../../templates/EscapeRoomAuthoring/Screen';

export default {
  title: 'Pages/Escape Room Creation',
  component: CreateEscapeRoomScreenComponent,
  decorators: [
    (Story) => {
      return (
        <MemoryRouter initialEntries={['/']}>
          {Story()}
        </MemoryRouter>
      );
    },
  ],
} as ComponentMeta<typeof CreateEscapeRoomScreenComponent>;

const Template: ComponentStory<typeof CreateEscapeRoomScreenComponent> = (_) => <CreateEscapeRoomScreenComponent />;

export const Default = Template.bind({});
Default.args = {
};