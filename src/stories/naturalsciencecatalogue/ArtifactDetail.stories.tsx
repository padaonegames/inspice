import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import ArtifactDetail from '../../templates/NaturalScienceCatalogue/components/ArtifactDetail';
import {MncnArtifact} from '../../services/mncnArtifact.model';
import * as SampleArtifact from '../assets/iberomesornis_image.jpg';
import { MemoryRouter } from 'react-router-dom';


export default {
  title: 'Natural Science Catalogue/Artifact Detail',
  component: ArtifactDetail,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <MemoryRouter initialEntries={['/']}>
          {Story()}
        </MemoryRouter>
      </div>
      
    ),
  ],
} as ComponentMeta<typeof ArtifactDetail>;

const detail:MncnArtifact={
  title: 'Iberomesornis',
  description: 'Iberomesornis es un ave prehistórica cuyos fósiles fueron encontrados en el yacimiento de "Las Hoyas" (Cuenca).',
  image: SampleArtifact.default,
  _id: '14'
}

const Template: ComponentStory<typeof ArtifactDetail> = (args) => <ArtifactDetail {...args} />;

export const details = Template.bind({});
details.args = {
  artifactData: detail
};

