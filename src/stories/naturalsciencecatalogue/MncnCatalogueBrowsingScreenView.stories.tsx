import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import {MncnCatalogueBrowsingScreenView} from '../../templates/NaturalScienceCatalogue/BrowseCatalogue/Screen';
import { MncnArtifact } from '../../services/mncnArtifact.model';
import * as SampleArtifact from '../assets/iberomesornis_image.jpg';
import { MemoryRouter } from 'react-router-dom';



export default {
  title: 'Natural Science Catalogue/Mncn Catalogue Browsing Screen View',
  component: MncnCatalogueBrowsingScreenView,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <MemoryRouter initialEntries={['/']}>
          {Story()}
        </MemoryRouter>      
        </div>

    ),
  ],
} as ComponentMeta<typeof MncnCatalogueBrowsingScreenView>;

const artifact: MncnArtifact = {
  title: 'Iberomesornis',
  description: 'Iberomesornis es un ave prehistórica cuyos fósiles fueron encontrados en el yacimiento de "Las Hoyas" (Cuenca).',
  image: SampleArtifact.default,
  _id: 'IDArtifact'
}
const artifacts: MncnArtifact[] = [artifact, artifact];


const Template: ComponentStory<typeof MncnCatalogueBrowsingScreenView> = (args) => <MncnCatalogueBrowsingScreenView {...args} />;

export const list = Template.bind({});
list.args = {
  artifacts: artifacts
};

