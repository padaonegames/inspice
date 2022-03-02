import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import FilterPopup from '../../../components/ArtworkSelection/FilterPopup';

export default {
  title: 'Artworks/Selection/Filter Popup',
  component: FilterPopup,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof FilterPopup>;


const Template: ComponentStory<typeof FilterPopup> = (args) => <FilterPopup {...args} />;

export const Default = Template.bind({});
Default.args = {
  filterField: 'Date',
  filterOptions: ['1975', '1985', '1986', '1987', '1988', '2000'],
  filterCounts: [5, 10, 55, 27, 26, 2],
};