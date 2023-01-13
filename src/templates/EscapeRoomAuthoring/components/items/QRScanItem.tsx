import {
  EditableItemProps,
  QrScanItemDefinition,
} from "../../../../services/escapeRoomActivity.model";
import { AbstractActivityItemFactory } from "../ActivityItemFactory";
import { QRCodeCanvas } from "qrcode.react";

import styled, { css } from "styled-components";
import { ArrowDownload } from "@styled-icons/fluentui-system-filled/ArrowDownload";
import ShortTextInputCard from "../../../../components/Forms/Cards/ShortTextInputCard";
import FormCard from "../../../../components/Forms/Cards/FormCard";
import { Root } from "./generalItemsStyles";
import LongTextInputCard from "../../../../components/Forms/Cards/LongTextInputCard";

export const fieldTypeIcon = css`
  color: ${(props) => props.theme.textColor};
  height: 1.75em;
  width: 1.75em;
  margin-right: 0.75em;
`;

const DownloadQrIcon = styled(ArrowDownload)`
  ${fieldTypeIcon}
  cursor: pointer;
  color: white;
`;

const DownloadQrButton = styled.button`
  font-family: ${(props) => props.theme.contentFont};
  font-size: 0.8em;
  cursor: pointer;
  background-color: hsl(10, 80%, 80%);
  border-radius: 50px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.5rem 0px;
  height: 3em;
  padding: 0 1em;
  color: white;
  width: fit-content;
  margin-top: 0.75em;
`;

const QrCanvasContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const isQrScanItemValid = (item: QrScanItemDefinition): boolean => {
  return item.encodedText.length > 0;
}; // isQrScanItemValid

export const EditableQRScanItemContent = (
  props: EditableItemProps<QrScanItemDefinition>
): JSX.Element => {
  const { payload, onPayloadChanged } = props;
  const { encodedText, codeHint } = payload;

  const handleEditcode = (value: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      encodedText: value,
    });
  }; // handleEditcode

  const handleCodeHintChanged = (hint: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      codeHint: hint,
    });
  }; // handleCodeHintChanged

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
  }; // downloadQR

  const qrPreviewAlertMessage =
    payload.encodedText.length === 0
      ? "Please enter a QR value in order to generate a preview"
      : undefined;
  return (
    <Root>
      {/* Title of the item */}
      <ShortTextInputCard
        promptText="Text to recognize in QR:"
        required
        requiredAlert={payload.encodedText.length === 0}
        fieldPayload={{ placeholder: "Value to encode in QR" }}
        response={{ text: payload.encodedText }}
        onResponseChanged={(value) => handleEditcode(value.text)}
      />

      {/* Preview of the QR and promptfield to edit its code */}
      <FormCard
        promptText="QR Preview:"
        alertMessage={qrPreviewAlertMessage}
        requiredAlert={!!qrPreviewAlertMessage}
      >
        {!qrPreviewAlertMessage && (
          <QrCanvasContainer>
            <QRCodeCanvas
              id="qr-generator"
              value={payload.encodedText}
              size={200}
              fgColor="black"
              bgColor="white"
              level="H"
              includeMargin={true}
            />

            {/* Button that lets the user download the QR that has specified */}
            {encodedText.length > 0 && (
              <DownloadQrButton onClick={downloadQR}>
                <DownloadQrIcon />
                Download QR
              </DownloadQrButton>
            )}
          </QrCanvasContainer>
        )}
      </FormCard>
      <LongTextInputCard
        promptText="Hint to help the player find the trackable:"
        fieldPayload={{
          placeholder: "Short description of what the player should look for.",
        }}
        response={{ text: codeHint }}
        onResponseChanged={(res) => handleCodeHintChanged(res.text)}
      />
    </Root>
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

interface PreviewQRProps {
  invalid?: boolean;
}
const PreviewQR = styled.div<PreviewQRProps>`
  width: 100%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 3px;
  color: rgb(178, 178, 178);
  ${(props) => props.invalid && "opacity: 0.5;"}
`;

export const QRScanItemStageSlide = (
  props: QrScanItemDefinition
): JSX.Element => {
  const { encodedText } = props;

  return (
    <>
      <PreviewTitle>
        {encodedText.length === 0 ? "Invalid QR" : encodedText}
      </PreviewTitle>

      <PreviewQR invalid={encodedText.length === 0}>
        <QRCodeCanvas
          value={encodedText}
          size={50}
          fgColor="black"
          bgColor="white"
          level="H"
          includeMargin
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
      codeHint: "",
    },
  }; // QRScanItemFactory

export default EditableQRScanItemContent;
