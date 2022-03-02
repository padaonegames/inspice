import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';
import { StageButtonPanel } from '../../components/Navigation/StageButtonPanel';

export default {
  title: 'Navigation/Stage Button Panel',
  component: StageButtonPanel,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof StageButtonPanel>;

const Template: ComponentStory<typeof StageButtonPanel> = (args) => <StageButtonPanel {...args} />;

export const Edit = Template.bind({});
Edit.args = {
  enabled: true,
  panelText: 'EDIT',
  panelIconType: 'edit'
};

export const Add = Template.bind({});
Add.args = {
  enabled: true,
  panelText: 'ADD',
  panelIconType: 'add'
};

export const Cancel = Template.bind({});
Cancel.args = {
  enabled: true,
  panelText: 'CANCEL',
  panelIconType: 'cancel'
};

export const Disabled = Template.bind({});
Disabled.args = {
  enabled: false,
  panelText: 'EDIT',
  panelIconType: 'edit'
};