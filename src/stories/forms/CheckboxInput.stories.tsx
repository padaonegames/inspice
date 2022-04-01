import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';
import { MemoryRouter } from 'react-router-dom';
import { CheckBoxInput } from '../../components/Forms/CheckBoxInput';

export default {
  title: 'Forms/Checkbox Input',
  component: CheckBoxInput,
  decorators: [
    (Story) => {
      return (
        <MemoryRouter initialEntries={['/']}>
          {Story()}
        </MemoryRouter>
      );
    },
  ],
} as ComponentMeta<typeof CheckBoxInput>;

const Template: ComponentStory<typeof CheckBoxInput> = (args) => <CheckBoxInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  checked: true,
  labelText: 'Audio',
  style: 'radio',
  enabled: true
}