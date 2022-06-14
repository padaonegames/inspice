import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';
import { count } from 'console';

import ShowFilters from '../../../components/ArtworkSelection/ShowFilters';

export default {
  title: 'Artworks/Selection/ShowFilters',
  component: ShowFilters,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof ShowFilters>;

const map = new Map<string, { value: string; count: number }[]>();

map.set('Date', [{ value: '1997', count: 6 }, { value: '1825', count: 13 }, { value: '1691', count: 3 }]);
map.set('Style', [{ value: 'Baroque', count: 4 }, { value: 'Bauhaus', count: 9 }, { value: 'Abstract Expressionism', count: 2 }]);

const Template: ComponentStory<typeof ShowFilters> = (args) => <ShowFilters {...args} />;

export const Default = Template.bind({});
Default.args = {
  filters: [{ field: 'A', filter: 'Date' }, { field: 'B', filter: 'Author' }, { field: 'C', filter: 'Style' }]
};