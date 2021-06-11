import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { ArtworkData } from '../services/commonDefinitions';
import { NavigateNext } from '@styled-icons/material/NavigateNext';
import { NavigateBefore } from '@styled-icons/material/NavigateBefore';
import { Cross } from '@styled-icons/entypo/Cross';

const Root = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 3;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const PopupPanelContent = styled.div`
  width: 47.5%;
  height: 72.5%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const PopupTitlePanel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid lightgray;
  height: 12.5%;
`;

const PopupText = styled.h2`
  margin: auto;
  color: black;
  letter-spacing: +0.25px;
  font-size: 1em;
  font-weight: 1000;
  font-family: Raleway;
`;

const ArtworkMiniatureContainer = styled.div`
  height: 65px;
  width: 65px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ArtworkMiniature = styled.img`
  max-width: 100%;
  max-height: 100%;
  display: block;
`;

const ArtworkItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 70px;
  width: 100%;
  justify-content: space-between;
  &:hover {
    background-color: lightgray;
    cursor: pointer;
  }
`;

const ArtworksContainer = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40%;
  height: 100%;
  padding-left: 2%;
`;

const ArtworkColumnContainer = styled.div`
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 70%;
`;

const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  padding-left: 10px;
  justify-content: center;
`;

const AuthorText = styled.span`
  align-self: left;
  color: black;
  letter-spacing: +0.25px;
  font-size: 0.7em;
  font-weight: 550;
  font-family: Raleway;
`;

const TitleText = styled.span`
  align-self: left;
  color: #525252;
  letter-spacing: +0.25px;
  font-size: 0.6em;
  font-family: Raleway;
`;

const NavIconContainer = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RemoveArtworkIcon = styled(Cross)`
  cursor: pointer;
  height: 15px;
  width: 15px;
  align-self: center;
  justify-self: end;
  color: darkgray;
`;

interface NavIconProps {
  active: boolean;
};
const NavigateNextIcon = styled(NavigateNext) <NavIconProps>`
  color: ${props => props.active ? 'darkgray' : 'lightgray'};
  cursor: ${props => props.active ? 'pointer' : 'default'};
  height: 50px;
  align-self: center;
  transform: scale(0.9);
  transition: transform 0.5s ease;

  &:hover {
    transform: ${props => props.active ? 'scale(1.1)' : 'scale(0.9)'};
    transition: transform 0.5s ease;
  }
`;

const NavigateBeforeIcon = styled(NavigateBefore) <NavIconProps>`
  color: ${props => props.active ? 'darkgray' : 'lightgray'};
  cursor: ${props => props.active ? 'pointer' : 'default'};
  height: 50px;
  align-self: center;
  transform: scale(0.9);
  transition: transform 0.5s ease;

  &:hover {
    transform: ${props => props.active ? 'scale(1.1)' : 'scale(0.9)'};
    transition: transform 0.5s ease;
  }
`;


interface SelectedActivitiesPopupProps {
  isOpen: boolean;
  artworks: ArtworkData[];
  onArtworkRemoved: (artworkId: string) => void;
};

const SelectedActivitiesPopup: React.FC<SelectedActivitiesPopupProps> = ({ isOpen, artworks, onArtworkRemoved }) => {

  const [page, setPage] = useState<number>(3);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, []);

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <Root>
      <PopupPanelContent>
        <PopupTitlePanel>
          <PopupText>
            SELECTED ARTWORKS
        </PopupText>
        </PopupTitlePanel>
        <ArtworkColumnContainer>
          <NavIconContainer>
            <NavigateBeforeIcon
              active={page > 0}
              onClick={() => {
                if (page > 0) {
                  setPage(prev => prev - 1);
                }
              }}
            />
          </NavIconContainer>
          {[0, 1].map(column =>
            <ArtworksContainer>
              {artworks.slice((page + column) * 4, (page + 1 + column) * 4).map(elem => (
                <ArtworkItemContainer key={elem.id}>
                  <ArtworkMiniatureContainer>
                    <ArtworkMiniature src={elem.src} />
                  </ArtworkMiniatureContainer>
                  <FieldsContainer>
                    <TitleText>{elem.title}</TitleText>
                    <AuthorText>{elem.author}</AuthorText>
                  </FieldsContainer>
                  <RemoveArtworkIcon />
                </ArtworkItemContainer>
              ))}
            </ArtworksContainer>
          )}
          <NavIconContainer>
            <NavigateNextIcon
              active={(page + 1) * 8 < artworks.length}
              onClick={() => {
                if ((page + 1) * 8 < artworks.length) {
                  setPage(prev => prev + 1);
                }
              }}
            />
          </NavIconContainer>
        </ArtworkColumnContainer>
      </PopupPanelContent>
    </Root>,
    document.body);
};

export default SelectedActivitiesPopup;