import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import NewActivityPopup from '../../templates/TemplateDashboard/components/NewActivityPopup';

export default {
  title: 'Template Dashboard/New Activity Pop Up',
  component: NewActivityPopup,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof NewActivityPopup>;


const Template: ComponentStory<typeof NewActivityPopup> = (args) => <NewActivityPopup {...args} />;

export const popup = Template.bind({});
popup.args = {
};

