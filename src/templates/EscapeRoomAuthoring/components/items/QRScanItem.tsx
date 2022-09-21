import {
  EditableItemProps,
  QrScanItemDefinition,
} from "../../../../services/escapeRoomActivity.model";
import { AbstractActivityItemFactory } from "../ActivityItemFactory";
import { PromptField } from "./PromptField";
import { QRCodeCanvas } from "qrcode.react";

import styled from "styled-components";
import { QrCode } from "@styled-icons/material/QrCode";
import { Download } from "@styled-icons/bootstrap/Download";

const DownloadIcon = styled(Download)`
  color: white;
  height: 1.75em;
  width: auto;
  margin-right: 0.5rem;
`;

const QrCodeIcon = styled(QrCode)`
  color: ${(props) => props.theme.textColor};
  height: 1.75em;
  width: auto;
  margin-right: 0.5em;
`;

const ItemTitle = styled.div`
  font-size: 1em;
  font-weight: 500;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;

  margin-top: 0.25em;
  margin-bottom: 0.5em;
  padding: 0.5em 1em;
  border-top: none;
  color: black;
  line-height: 135%;
  width: fit-content;
  text-align: center;

  display: flex;
  align-items: center;

  background-color: rgb(240, 240, 240);
  border-bottom: 2px solid rgb(15, 90, 188);
`;

//Components for the button to download the QR
const DownloadButton = styled.div`
  font-size: 1em;
  font-weight: 500;
  color: white;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  margin-top: 0.25em;
  margin-bottom: 0.25em;
  padding: 0.75em 1.25em;

  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  justify-content: center;

  border-radius: 0.25rem;
  background-color: rgb(19, 104, 206);
  border: 2px solid rgb(15, 90, 188);
  cursor: pointer;

  color: white;
  &:hover {
    background-color: rgb(49, 134, 236);
  }
`;

const Root = styled.div`
  margin-top: 5px;
  display: flex;
  background-color: transparent;
  flex-direction: column;
  align-items: center;
  padding: 0.75em;
`;

export const EditableQRScanItemContent = (
  props: EditableItemProps<QrScanItemDefinition>
): JSX.Element => {
  const { payload, onPayloadChanged } = props;

  const { encodedText } = payload;

  const handleEditcode = (value: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      encodedText: value,
    });
  }; // handleEditcode

  const downloadQR = () => {
    if (encodedText === "") return;

    const canvas = document.getElementById("qr-generator");
    if (!canvas) return;

    const canvasElement = canvas as HTMLCanvasElement;
    const pngUrl = canvasElement
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = encodedText + ".png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }; //downloadQR

  return (
    <>
      <Root>
        {/* Title of the item */}
        <ItemTitle>
          <QrCodeIcon />
          QR to scan
        </ItemTitle>

        {/* Preview of the QR and promptfield to edit its code */}
        <QRCodeCanvas
          id="qr-generator"
          value={payload.encodedText}
          size={200}
          fgColor="black"
          bgColor="white"
          level="H"
          includeMargin={true}
        />
        <PromptField
          promptText={payload.encodedText}
          promptPlaceholder="Value to create a new QR"
          onPromptChange={handleEditcode}
        />

        {/* Button that lets the user download the QR that has specified */}
        {encodedText === "" ? (
          <></>
        ) : (
          <>
            <DownloadButton onClick={downloadQR}>
              <DownloadIcon />
              Download QR
            </DownloadButton>
          </>
        )}
      </Root>
    </>
  );
}; // EditableQRScanItemContent

const PreviewTitle = styled.div`
  width: 100%;
  height: 20%;
  color: black;
  text-align: center;
  text-overflow: ellipsis;
  font-size: 0.75rem;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 1.33;
  letter-spacing: 0.2px;
  white-space: nowrap;
  overflow: hidden;
`;

const PreviewQR = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 3px;
  color: rgb(178, 178, 178);
`;

export const QRScanItemStageSlide = (
  props: QrScanItemDefinition
): JSX.Element => {
  const { encodedText } = props;

  return (
    <>
      <PreviewTitle>
        {encodedText === "" ? "Empty QR" : encodedText}
      </PreviewTitle>

      <PreviewQR>
        <QRCodeCanvas
          value={encodedText}
          size={50}
          fgColor="black"
          bgColor="white"
          level="H"
        />
      </PreviewQR>
    </>
  );
}; // QRScanItemStageSlide

export const qrScanItemFactory: AbstractActivityItemFactory<QrScanItemDefinition> =
  {
    editingComponent: (editingProps) => (
      <EditableQRScanItemContent {...editingProps} />
    ),
    defaultDefinition: {
      encodedText: "",
    },
  }; // QRScanItemFactory

export default EditableQRScanItemContent;
