import { useState } from 'react';
import { EditableItemProps, ArScanItemDefinition } from "../../../../services/escapeRoomActivity.model";
import { AbstractActivityItemFactory } from "../ActivityItemFactory";
import {ResourceDefinition, ResourcesPopUpComponent} from "../ResourcesPopUp"
import Dropzone from 'react-dropzone';

import styled from "styled-components";
import { ScanObject } from "styled-icons/fluentui-system-filled";

const ArCodeIcon = styled(ScanObject)`
  color: ${props => props.theme.textColor};
  height: 1.75em;
  width: auto;
  margin-right: 0.5em;
`;


const Root = styled.div`
  margin-top: 5px;
  display: flex;
  background-color: transparent;
  flex-direction: column;
  align-items: center;

  border-bottom: 2px solid #dadce0;
  padding: 0.75em;

  background-color:  #dbdbdb;

  border-radius: 1.25rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
`;


const ItemTitle = styled.div`
  font-size: 1em;
  font-weight: 500;
  font-family: ${props => props.theme.contentFont};
  line-height: 135%;
  margin-top: 0.25em;
  margin-bottom: 0.25em;
  padding: 0.75em 1.25em;
  border-top: none;
  color: black;
  line-height: 135%;
  width: fit-content;
  text-align: center;
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
`;


const defaultImage = "https://cdn3.vectorstock.com/i/1000x1000/60/67/example-rubber-stamp-vector-12386067.jpg";

export const EditableARScanItemContent = (props: EditableItemProps<ArScanItemDefinition>): JSX.Element => {


  const {
    payload,
    onPayloadChanged
  } = props;
  const {
    imageSrc
  } = payload;

  const [imageToShow, setImageToShow] = useState<File | null>(null);
  const [imageSource, setImageSourece] = useState<string>("https://cdn3.vectorstock.com/i/1000x1000/60/67/example-rubber-stamp-vector-12386067.jpg")
  //State to control wether the pop up should be displayed or not
  const [showResourcesPopUp, setShowResourcesPopUp] = useState<boolean>(false);


  const handleOnDrop = (files:any, rejectedFiles:any)=>{
    if (files[0] instanceof File){
     setImageToShow(files[0] as File); 
    }
  } //handleOnDrop

  const handleShowPopUp = (show:boolean)=>{
    setShowResourcesPopUp(show);
  } //handleShowPopUp

  const handleResourceSelected = (index:number)=>{
    setImageSourece(resources[index].src);
    setShowResourcesPopUp(prev=>!prev)
  } //handleResourceSelected

  const resources: ResourceDefinition[]=[
    {name: "Baby",src: "https://cdn.memegenerator.es/descargar/398347"},
    {name: "YouKnowIt",src: "https://assets.entrepreneur.com/content/3x2/2000/20180703190744-rollsafe-meme.jpeg?crop=1:1"},
    {name: "Oh!",src: "https://imagenes.elpais.com/resizer/iksHj8K729zx_amR6S2K1sB79YI=/1960x1470/arc-anglerfish-eu-central-1-prod-prisa.s3.amazonaws.com/public/B6H277FBSRW2AUY6T5WYT5WCBQ.jpg"},
    {name: "Serius Face",src: "https://www.eltiempo.com/files/article_content/files/crop/uploads/2021/02/24/6036fbb0babdd.r_1614232657048.172-0-2049-1408.jpeg"},
    {name: "Troll Face",src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa9F7chZRSC97n3EEsBFQlGSjZeH_7cyBWvIDc_FZJnTEIPkpOt4cNBKDK5UI1gDnoihs&usqp=CAU"},
    {name: "Cuentame más",src: "https://ep01.epimg.net/verne/imagenes/2016/08/30/articulo/1472539721_878111_1472541204_sumario_normal.jpg"},
    {name: "Oh You",src: "https://i.kym-cdn.com/photos/images/newsfeed/001/089/228/f2d.jpg"},
    {name: "Squidward Face",src: "https://cdn.wallpapersafari.com/33/48/Dm90k3.jpg"},
    {name: "SpongeBob Face",src: "https://community.custom-cursor.com/uploads/default/original/2X/1/1bf4f93af5045fefcec6a28f5cd26858a8478abc.jpeg"},
    {name: "SpongeBob Face",src: "https://community.custom-cursor.com/uploads/default/original/2X/1/1bf4f93af5045fefcec6a28f5cd26858a8478abc.jpeg"},
    {name: "Oh You",src: "https://i.kym-cdn.com/photos/images/newsfeed/001/089/228/f2d.jpg"},
    {name: "Cuentame más",src: "https://ep01.epimg.net/verne/imagenes/2016/08/30/articulo/1472539721_878111_1472541204_sumario_normal.jpg"},
    {name: "Troll Face",src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa9F7chZRSC97n3EEsBFQlGSjZeH_7cyBWvIDc_FZJnTEIPkpOt4cNBKDK5UI1gDnoihs&usqp=CAU"},
  ]

  return (
    <>
    {/* Pop up component to enable image selection from the escape room resources */}
    {showResourcesPopUp && 
    <ResourcesPopUpComponent resourceList={resources} onClosePopUp={()=>{handleShowPopUp(false)}} 
     onResourceSelected={(value)=>{handleResourceSelected(value)}} popUpTitle={"Select an image to scan"}/>}
      
      <Root>
        {/* Title of the component */}
        <ItemTitle>
          <ArCodeIcon onMouseDown={()=>{handleShowPopUp(!showResourcesPopUp)}} />
          Image to Scan
        </ItemTitle>    

        {/* Preview of the image that is going to be scanned */}
        <img src= {imageSource} width={200} height ={200}></img>

        {/* Sample drop zone */}
        <Dropzone onDrop={handleOnDrop} multiple= {false}>
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()} >
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
      </Root>
    </>
  );
}; // EditableARScanItemContent



const PreviewTitle = styled.div`
  margin-bottom: 0rem;
  color: rgb(110, 110, 110);
  text-align: center;
  font-size: 0.75rem;
  line-height: 1.33;
  letter-spacing: 0.2px;
  max-height: 1.5rem;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const PreviewAR = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 3px;
  color: rgb(178, 178, 178);
`;


export const ARScanItemStageSlide = (props: ArScanItemDefinition): JSX.Element => {

  const {
    imageSrc
  } = props;

  return (
    <>
      <PreviewTitle>{imageSrc=== ""? "Empty Image" : imageSrc}</PreviewTitle>
      <PreviewAR>  
        <img src= {defaultImage} width={50} height ={50}></img>
      </PreviewAR>
    </>
  );
}; // ARScanItemStageSlide

export const arScanItemFactory: AbstractActivityItemFactory<ArScanItemDefinition> = {
  editingComponent: (editingProps) => (
    <EditableARScanItemContent
      {...editingProps}
    />
  ),
  defaultDefinition: {
    imageSrc: '',
  }
}; // ARScanItemFactory


export default EditableARScanItemContent;