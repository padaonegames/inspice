import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import PointsPanel from '../../templates/FindArtwork/components/PointsPanel';

export default {
  title: 'Find Artwork/Points Panel',
  component: PointsPanel,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof PointsPanel>;

const Template: ComponentStory<typeof PointsPanel> = (args) => <PointsPanel {...args} />;

export const panel = Template.bind({});
panel.args = {
  points: 15

};

