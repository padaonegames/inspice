import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import ArtifactCard from '../../templates/NaturalScienceCatalogue/components/ArtifactCard';
import {MncnArtifact} from '../../services/mncnArtifact.model';
import * as SampleArtifact from '../assets/iberomesornis_image.jpg';


export default {
  title: 'Natural Science Catalogue/Artifact Card',
  component: ArtifactCard,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
                {Story()}
      </div>
      
    ),
  ],
} as ComponentMeta<typeof ArtifactCard>;

const artifact:MncnArtifact={
  title: 'Iberomesornis',
  description: 'Iberomesornis es un ave prehistórica cuyos fósiles fueron encontrados en el yacimiento de "Las Hoyas" (Cuenca).',
  image: SampleArtifact.default,
  _id: 'IDArtifact'
}

const Template: ComponentStory<typeof ArtifactCard> = (args) => <ArtifactCard {...args} />;

export const card = Template.bind({});
card.args = {
  artifactData: artifact
};

