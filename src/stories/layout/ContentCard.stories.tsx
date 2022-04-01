import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';
import { MemoryRouter } from 'react-router-dom';
import { ContentCard } from '../../components/Layout/ContentCard';

export default {
  title: 'Layout/Content Card',
  component: ContentCard,
  decorators: [
    (Story) => {
      return (
        <MemoryRouter initialEntries={['/']}>
          {Story()}
        </MemoryRouter>
      );
    },
  ],
} as ComponentMeta<typeof ContentCard>;

const Template: ComponentStory<typeof ContentCard> = (args) => <ContentCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  cardTitle: 'Example Card' ,
  titleAlign: 'center',
  width: '50',
  maxWidth: '100',
  flexDirection: 'row'
}