import styled, { css } from "styled-components";
import { QrCode } from "@styled-icons/fluentui-system-regular/QrCode";
import { ImageAdd } from "@styled-icons/fluentui-system-regular/ImageAdd";

const SelectorArea = styled.div`
  width: 20rem;
  min-height: 14rem;
  margin: 1em 0;
  color: ${props => props.theme.textColor};
  border: none;
  padding: 0.65em;
  background-color: #f8f9fa;
  align-self: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;

  &:focus {
    box-shadow: #c44c49 0px -4px 0px 0px inset;
  }
`;

const SelectorTitle = styled.div`
  text-align: center;
  font-size: 0.9em;
  font-weight: 200;
  font-family: ${props => props.theme.contentFont};
  line-height: 135%;
`;

const OptionsRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const OptionsContainer = styled.div`
  height: 5rem;
  width: 5rem;
  border-radius: 100%;

  border-radius: 0.25rem;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  &:focus {
    box-shadow: #c44c49 0px -4px 0px 0px inset;
  }
`;

const optionStyle = css`
  color: ${props => props.theme.textColor};
  height: 3.5rem;
  width: 3.5rem;
`;

const QrIcon = styled(QrCode)`
  ${optionStyle}
`;

const ImageIcon = styled(ImageAdd)`
  ${optionStyle}
`;

export const PuzzleEntryPointEditor = (): JSX.Element => {

  return (
    <>
      <SelectorArea>
        <SelectorTitle>Select an entrypoint:</SelectorTitle>
        <OptionsRow>
          <OptionsContainer title="QR Code Scan">
            <QrIcon />
          </OptionsContainer>
          <OptionsContainer title="Image Recognition">
            <ImageIcon />
          </OptionsContainer>
        </OptionsRow>
      </SelectorArea>
    </>
  );
}; // PuzzleEntryPointEditor