import { useState } from "react";
import styled, { css } from "styled-components";
import { ThreeDotsVertical } from "styled-icons/bootstrap";
import { Nature } from "@styled-icons/material-rounded/Nature";
import { MncnArtifact } from "../../../services/mncnArtifact.model";
import { Open } from "@styled-icons/fluentui-system-filled/Open";
import { Edit } from '@styled-icons/boxicons-regular/Edit';
import { Delete } from '@styled-icons/fluentui-system-regular/Delete';

const ArtifactCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.5rem 0px;
  width: calc(100% - 1rem);
  margin: 0.6em;
  min-width: 290px;
  max-width: 18rem;
  border-radius: 0.35rem 0.25rem;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 0.5rem 0px;
  }
`;

export const EmptyCard = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: calc(100% - 1rem);
  margin: 0.6em;
  min-width: 290px;
  max-width: 18rem;
`;

const ArtifactCardImage = styled.img`
  cursor: pointer;
  max-height: 12.5em;
  width: 100%;
  object-fit: cover;
`;

const ArtifactImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.35rem 0.25rem 0 0;
  overflow: hidden;
  background-color: ${props => props.theme.artworkDisplayBackground};

  width: 100%;
  height: 12.5em;
  align-self: center;
  margin: 0 auto;
  position: relative;
  cursor: pointer;
`;

const ArtifactCardContent = styled.div`
  height: 100%;
  flex: 1 1 0%;
  display: flex;
  flex-direction: row;
  -moz-box-pack: justify;
  justify-content: space-between;
  padding: 0.5rem 0.5rem 1rem;
  min-height: 4.5rem;
  background-color: ${props => props.theme.cardBackground};
  border-radius: 0 0 0.25rem 0.25rem;

  margin: 0px;
  padding: 0px;
  border: 0px none;
  font: inherit;

  backfrop-filter: brightness(300%);
`;

const ArtifactTypeIcon = styled(Nature)`
  margin: auto 0.65rem;
  color: ${props => props.theme.textColor};
  display: inline-block;
  height: 2.25rem;
  width: 2.25rem;
`;

const ArtifactTextContainer = styled.div`
  display: flex;
  margin: auto;
  min-width: 0px;
  width: 100%;
  flex-direction: column;
  max-height: 4.5rem;
`;

const ArtifactTitle = styled.a`
  overflow: hidden;
  line-height: 1rem;
  font-weight: 700;
  color: ${props => props.theme.textColor};
  font-family: ${props => props.theme.clickableTextFont};
  width: 100%;
  text-overflow: ellipsis;
  align-self: flex-start;
  font-size: 0.9rem;
  text-decoration: none;
  letter-spacing: 0.75px;
  margin-bottom: 0.1rem;
`;

const ArtifactAuthor = styled.a`
  display: flex;
  -moz-box-align: center;
  align-items: center;
  color: ${props => props.theme.textColor};
  font-family: ${props => props.theme.clickableTextFont};
  overflow: hidden;
  text-decoration: none;
  font-weight: normal;
  font-size: 0.75em;
`;

const ArtifactOptionsIcon = styled(ThreeDotsVertical)`
  color: ${props => props.theme.textColor};
  height: 100%;
  width: 100%;
  margin: auto;
  cursor: pointer;
  &:hover {
    transform: scale(1.25);
  }
`;

const ArtifactOptionsContainer = styled.div`
  align-self: flex-end;
  height: 1.75em;
  width: 1.75em;
  margin: auto 10px;
  position: relative;
`;

const ArtifactTypeSpan = styled.span`
  font-family: ${props => props.theme.clickableTextFont};
  font-size: 0.625em;
  font-weight: bold;
  position: absolute;
  top: 0px;
  left: 0px;
  padding: 0.25rem 0.75rem;
  display: flex;
  -moz-box-align: center;
  align-items: center;
  color: ${props => props.theme.textColor};
  background-color: ${props => props.theme.cardBackground};
  border-radius: 0 0 0.25rem 0;
  box-shadow: rgba(37, 7, 107, 0.35) 0px 2px 4px 0px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  background-color: ${props => props.theme.cardBackground};
  min-width: 160px;
  box-shadow: rgba(37, 7, 107, 0.35) 0px 2px 4px 0px;
  z-index: 25;
  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;
`;

interface DropdownMenuItemProps {
  disabled?: boolean;
}
const DropdownMenuItem = styled.a<DropdownMenuItemProps>`
  color: ${props => props.theme.textColor};
  padding: 12px 16px;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  font-family: ${props => props.theme.contentFont};
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  ${props => props.disabled && 'opacity: 0.5;'}

  &:hover {
    ${props => !props.disabled && 'background-color: darkgray;'}
  }
`;

const menuItemIcon = css`
  color: ${props => props.theme.textColor};
  height: 20px;
  width: 20px;
  margin-right: 10px;
`;

const OpenArtifactIcon = styled(Open)`
  ${menuItemIcon}
`;

const EditArtifactIcon = styled(Edit)`
  ${menuItemIcon}
`;

const DeleteArtifactIcon = styled(Delete)`
  ${menuItemIcon}
`;

const DateSpan = styled.span`
  margin: 0.5rem;
  position: absolute;
  right: 0.2rem;
  bottom: 0px;

  font-family: ${props => props.theme.clickableTextFont};
  font-size: 0.625em;
  font-weight: bold;
  padding: 0.25rem 0.75rem;
  display: flex;
  -moz-box-align: center;
  align-items: center;
  color: white;
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 0.25rem;
`;

export interface ArtifactCardProps {
  artifactData: MncnArtifact;
  onOpenClicked?: () => void;
  onEditClicked?: () => void;
  onDeleteClicked?: () => void;
}

export const ArtifactCard = (props: ArtifactCardProps): JSX.Element => {

  const {
    artifactData,
    onOpenClicked,
    onEditClicked,
    onDeleteClicked
  } = props;

  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <ArtifactCardContainer>
      <ArtifactImageContainer onClick={onOpenClicked}>
        <ArtifactCardImage src={artifactData.image ?? 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'} />
        <ArtifactTypeSpan>
          Pieza
        </ArtifactTypeSpan>
      </ArtifactImageContainer>
      <ArtifactCardContent>
        <ArtifactTypeIcon />
        <ArtifactTextContainer>
          <ArtifactTitle>{artifactData.title}</ArtifactTitle>
          <ArtifactAuthor>Museo Nacional de Ciencias Naturales</ArtifactAuthor>
        </ArtifactTextContainer>
        <ArtifactOptionsContainer>
          <ArtifactOptionsIcon onClick={() => setOpenMenu(prev => !prev)} />
          {openMenu && (
            <DropdownMenu>
              <DropdownMenuItem onClick={onOpenClicked}>
                <OpenArtifactIcon />
                Abrir
              </DropdownMenuItem>
              <DropdownMenuItem
                title='Esta opción no se encuentra disponible para este artefacto'
                disabled
                onClick={onEditClicked}
              >
                <EditArtifactIcon />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                title='Esta opción no se encuentra disponible para este artefacto'
                disabled
                onClick={onDeleteClicked}
              >
                <DeleteArtifactIcon />
                Borrar
              </DropdownMenuItem>
            </DropdownMenu>
          )}
        </ArtifactOptionsContainer>
      </ArtifactCardContent>
    </ArtifactCardContainer>
  );
};

export default ArtifactCard;