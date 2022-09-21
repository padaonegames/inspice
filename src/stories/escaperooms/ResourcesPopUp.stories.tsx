import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';
import React from 'react';
import { ResourcesPopUpComponent } from './../../templates/EscapeRoomAuthoring/components/ResourcesPopUp';

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

export const SelectMode = Template.bind({});
SelectMode.args = {
  popUpTitle: "Select Resource Mode",
  resourceList: [
    { name: "Baby", src: "https://cdn.memegenerator.es/descargar/398347" },
    { name: "YouKnowIt", src: "https://assets.entrepreneur.com/content/3x2/2000/20180703190744-rollsafe-meme.jpeg?crop=1:1" },
    { name: "Oh!", src: "https://imagenes.elpais.com/resizer/iksHj8K729zx_amR6S2K1sB79YI=/1960x1470/arc-anglerfish-eu-central-1-prod-prisa.s3.amazonaws.com/public/B6H277FBSRW2AUY6T5WYT5WCBQ.jpg" },
    { name: "Serius Face", src: "https://www.eltiempo.com/files/article_content/files/crop/uploads/2021/02/24/6036fbb0babdd.r_1614232657048.172-0-2049-1408.jpeg" },
    { name: "Troll Face", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa9F7chZRSC97n3EEsBFQlGSjZeH_7cyBWvIDc_FZJnTEIPkpOt4cNBKDK5UI1gDnoihs&usqp=CAU" },
    { name: "Cuentame más", src: "https://ep01.epimg.net/verne/imagenes/2016/08/30/articulo/1472539721_878111_1472541204_sumario_normal.jpg" },
    { name: "Oh You", src: "https://i.kym-cdn.com/photos/images/newsfeed/001/089/228/f2d.jpg" },
    { name: "Squidward Face", src: "https://cdn.wallpapersafari.com/33/48/Dm90k3.jpg" },
    { name: "SpongeBob Face", src: "https://community.custom-cursor.com/uploads/default/original/2X/1/1bf4f93af5045fefcec6a28f5cd26858a8478abc.jpeg" },
    { name: "SpongeBob Face", src: "https://community.custom-cursor.com/uploads/default/original/2X/1/1bf4f93af5045fefcec6a28f5cd26858a8478abc.jpeg" },
    { name: "Oh You", src: "https://i.kym-cdn.com/photos/images/newsfeed/001/089/228/f2d.jpg" },
    { name: "Cuentame más", src: "https://ep01.epimg.net/verne/imagenes/2016/08/30/articulo/1472539721_878111_1472541204_sumario_normal.jpg" },
    { name: "Troll Face", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa9F7chZRSC97n3EEsBFQlGSjZeH_7cyBWvIDc_FZJnTEIPkpOt4cNBKDK5UI1gDnoihs&usqp=CAU" },
  ]
};

export const ManageMode = Template.bind({});
ManageMode.args = {
  popUpTitle: "Manage Resources Mode",
  popUpMode: 'manage-resources',
  resourceList: [
    { name: "Baby", src: "https://cdn.memegenerator.es/descargar/398347" },
    { name: "YouKnowIt", src: "https://assets.entrepreneur.com/content/3x2/2000/20180703190744-rollsafe-meme.jpeg?crop=1:1" },
    { name: "Oh!", src: "https://imagenes.elpais.com/resizer/iksHj8K729zx_amR6S2K1sB79YI=/1960x1470/arc-anglerfish-eu-central-1-prod-prisa.s3.amazonaws.com/public/B6H277FBSRW2AUY6T5WYT5WCBQ.jpg" },
    { name: "Serius Face", src: "https://www.eltiempo.com/files/article_content/files/crop/uploads/2021/02/24/6036fbb0babdd.r_1614232657048.172-0-2049-1408.jpeg" },
    { name: "Troll Face", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa9F7chZRSC97n3EEsBFQlGSjZeH_7cyBWvIDc_FZJnTEIPkpOt4cNBKDK5UI1gDnoihs&usqp=CAU" },
    { name: "Cuentame más", src: "https://ep01.epimg.net/verne/imagenes/2016/08/30/articulo/1472539721_878111_1472541204_sumario_normal.jpg" },
    { name: "Oh You", src: "https://i.kym-cdn.com/photos/images/newsfeed/001/089/228/f2d.jpg" },
    { name: "Squidward Face", src: "https://cdn.wallpapersafari.com/33/48/Dm90k3.jpg" },
    { name: "SpongeBob Face", src: "https://community.custom-cursor.com/uploads/default/original/2X/1/1bf4f93af5045fefcec6a28f5cd26858a8478abc.jpeg" },
    { name: "SpongeBob Face", src: "https://community.custom-cursor.com/uploads/default/original/2X/1/1bf4f93af5045fefcec6a28f5cd26858a8478abc.jpeg" },
    { name: "Oh You", src: "https://i.kym-cdn.com/photos/images/newsfeed/001/089/228/f2d.jpg" },
    { name: "Cuentame más", src: "https://ep01.epimg.net/verne/imagenes/2016/08/30/articulo/1472539721_878111_1472541204_sumario_normal.jpg" },
    { name: "Troll Face", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa9F7chZRSC97n3EEsBFQlGSjZeH_7cyBWvIDc_FZJnTEIPkpOt4cNBKDK5UI1gDnoihs&usqp=CAU" },
  ]
};