import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import FilterField from '../../../components/ArtworkSelection/FilterField';

export default {
  title: 'Artworks/Selection/Filter Field',
  component: FilterField,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof FilterField>;


const Template: ComponentStory<typeof FilterField> = (args) => <FilterField {...args} />;

export const Default = Template.bind({});
Default.args = {
  filterField: 'Date',
  filterOptions: ['1975', '1985', '1986', '1987', '1988', '2000'],
  filterCounts: [5, 10, 55, 27, 26, 2],
  bottomBorder: true,
  maxOptionsShown: 5,
};