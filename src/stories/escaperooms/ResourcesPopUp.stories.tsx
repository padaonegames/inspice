import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';
import { ResourcesPopUpComponent, ResourceDefinition } from '../../templates/EscapeRoomAuthoring/components/ResourcesPopUp';


export default {
  title: 'Escape Rooms/Resources Pop Up',
  component: ResourcesPopUpComponent,
  decorators: [
    (Story) => {
      return (
          Story()
      );
    },
  ],
} as ComponentMeta<typeof ResourcesPopUpComponent>;

const Template: ComponentStory<typeof ResourcesPopUpComponent> = (args) => <ResourcesPopUpComponent {...args} />;

export const Default = Template.bind({});
Default.args = {
  resourceList: []
};

export const Alternative = Template.bind({});
Alternative.args = {

  resourceList: [
    {name: "bebe",src: "https://cdn.memegenerator.es/descargar/398347"},
    {name: "YouKnowIt",src: "https://assets.entrepreneur.com/content/3x2/2000/20180703190744-rollsafe-meme.jpeg?crop=1:1"},
    {name: "Marvel",src: "https://imagenes.elpais.com/resizer/iksHj8K729zx_amR6S2K1sB79YI=/1960x1470/arc-anglerfish-eu-central-1-prod-prisa.s3.amazonaws.com/public/B6H277FBSRW2AUY6T5WYT5WCBQ.jpg"},
    {name: "bebe",src: "https://cdn.memegenerator.es/descargar/398347"},
    {name: "YouKnowIt",src: "https://assets.entrepreneur.com/content/3x2/2000/20180703190744-rollsafe-meme.jpeg?crop=1:1"},
    {name: "Marvel",src: "https://imagenes.elpais.com/resizer/iksHj8K729zx_amR6S2K1sB79YI=/1960x1470/arc-anglerfish-eu-central-1-prod-prisa.s3.amazonaws.com/public/B6H277FBSRW2AUY6T5WYT5WCBQ.jpg"},
    {name: "bebe",src: "https://cdn.memegenerator.es/descargar/398347"},
    {name: "YouKnowIt",src: "https://assets.entrepreneur.com/content/3x2/2000/20180703190744-rollsafe-meme.jpeg?crop=1:1"},
    {name: "bebe",src: "https://cdn.memegenerator.es/descargar/398347"},
    {name: "YouKnowIt",src: "https://assets.entrepreneur.com/content/3x2/2000/20180703190744-rollsafe-meme.jpeg?crop=1:1"},
    {name: "bebe",src: "https://cdn.memegenerator.es/descargar/398347"},
    {name: "YouKnowIt",src: "https://assets.entrepreneur.com/content/3x2/2000/20180703190744-rollsafe-meme.jpeg?crop=1:1"},
    {name: "Marvel",src: "https://imagenes.elpais.com/resizer/iksHj8K729zx_amR6S2K1sB79YI=/1960x1470/arc-anglerfish-eu-central-1-prod-prisa.s3.amazonaws.com/public/B6H277FBSRW2AUY6T5WYT5WCBQ.jpg"}
  ]};