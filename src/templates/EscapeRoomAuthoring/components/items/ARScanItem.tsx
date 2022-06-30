import { EditableItemProps, ArScanItemDefinition } from "../../../../services/escapeRoomActivity.model";
import { AbstractActivityItemFactory } from "../ActivityItemFactory";
import { PromptField } from "./PromptField";

import styled from "styled-components";
import {Download} from "@styled-icons/bootstrap/Download"
import { ScanObject } from "styled-icons/fluentui-system-filled";
import Dropzone from 'react-dropzone';
import { useState } from 'react';

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


interface ImagePreviewProps {
  src?: string;
}


const PreviewAR = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 3px;
  color: rgb(178, 178, 178);
`;

const CheckboxTitle = styled.div`
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


//Components for the button to download the QR
const DownloadButton = styled.div`

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

  background-color: rgb(75, 170, 100);

  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;

  &:hover {
    transition: border 0.25s;
    border: 3px solid rgb(200, 200, 200);
  }

`;
const DownloadIcon = styled(Download)`
  color: ${props => props.theme.textColor};
  height: 1.75em;
  width: auto;
`;



const ArCodeIcon = styled(ScanObject)`
  color: ${props => props.theme.textColor};
  height: 1.75em;
  width: auto;
  margin-right: 0.5em;
`;

const CheckboxList = styled.div`
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


const defaultImage = "https://cdn3.vectorstock.com/i/1000x1000/60/67/example-rubber-stamp-vector-12386067.jpg";

export interface EditableWaitingCodeItemContentProps extends EditableItemProps<ArScanItemDefinition> {
  /** text to display for the add new option label. */
  addNewOptionLabel?: string;
} // EditableWaitingCodeItemContentProps

export const EditableARScanItemContent = (props: EditableWaitingCodeItemContentProps): JSX.Element => {


  const {
    payload,
    addNewOptionLabel = 'Text to QR',
    onPayloadChanged
  } = props;

  const [imageToShow, setImageToShow] = useState<File | null>(null);
  const {
    imageSrc
  } = payload;

  const handleOnDrop = (files:any, rejectedFiles:any)=>{
    if (files[0] instanceof File){
     setImageToShow(files[0] as File); 
    }
  }


  return (
    <>
      <CheckboxList>
        <CheckboxTitle>
          <ArCodeIcon />
          Image to Scan
        </CheckboxTitle>    
        <img src= {imageToShow !==null ? window.URL.createObjectURL(imageToShow) : defaultImage} width={200} height ={200}></img>

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

      </CheckboxList>
    </>
  );
}; // EditableARScanItemContent

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