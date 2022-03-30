import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { NavigateNext } from '@styled-icons/material/NavigateNext';
import { NavigateBefore } from '@styled-icons/material/NavigateBefore';
import { Cross } from '@styled-icons/entypo/Cross';
import { Close } from '@styled-icons/evaicons-solid/Close';
import { ArtworkData } from "../../services/artwork.model";

const Root = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
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
  position: Static;
  width: 60vw;
  height: 75vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  overflow: auto;
  white-space: nowrap;
  text-overflow: ellipsis;
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
  height: 80px;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-self: center;
  justify-content: center;
`;

const ArtworkMiniature = styled.img`
  max-width: 100%;
  max-height: 100%;
  display: block;
`;

const ArtworkItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
  margin-bottom:5px;
  justify-content: space-between;
  border: 1px solid darkgray;
  overflow: visible;
  white-space: nowrap;
  text-overflow: ellipsis;
  -webkit-border-radius: 10px;
  border-radius: 10px;
  &:hover {
    background-color: lightgray;
    cursor: pointer;
  }
`;

const ArtworksContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 100%;
  padding-left: 2%;
  padding-top: 20px;
`;

const ArtworkColumnContainer = styled.div`
  margin: auto;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 80%;
  
`;

const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  padding-left: 10px;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
  align-self: flex-end;
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
const CloseIcon = styled(Close)`
  color: lightgray;
  cursor: pointer;
  height: 7.5vh;
  align-self: flex-end;
  margin-bottom: 1vh;
  transform: scale(0.9);
  transition: transform 0.5s ease;
  position: absolute;
  &:hover {
    transform: scale(1.1);
    transition: transform 0.5s ease;
    color: darkgray;
  }
`;

export interface SelectedArtworksPopupProps {
  /** Artworks that should be displayed by this Component. This is not intended 
   * to be a comprehensive list of all artworks returned from a big query, but 
   * rather a slice of a desired handpicked selection cards. */
  artworks: ArtworkData[];
  /** Callback with the id of an artwork as a parameter, which the user wants 
   * to remove from the list. */
  onArtworkRemoved: (artworkId: string) => void;
  /** Callback to the parent to close/open the popup. */
  setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * WIP
 * 
 * <img src="media://SelectedArtworksPopup.PNG" alt="SelectedArtworksPopup">
 */
export const SelectedArtworksPopup: React.FC<SelectedArtworksPopupProps> = ({ artworks, onArtworkRemoved, setPopupOpen }) => {

  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, []);

  return ReactDOM.createPortal(
    <Root>
      <PopupPanelContent>
        <CloseIcon onClick={() => setPopupOpen(false)} />
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
          {[0, 1, 2, 3].map(column =>
            <ArtworksContainer>
              {//artworks.slice((page + column) * 4, (page + 1 + column) * 4).map(elem => (
                artworks.slice(page + (column * 4), page + 4 + (column * 4)).map(elem => (
                  <ArtworkItemContainer key={elem.id}>
                    <RemoveArtworkIcon onClick={() => onArtworkRemoved(elem.id)} />
                    <ArtworkMiniatureContainer>
                      <ArtworkMiniature src={elem.src} />
                    </ArtworkMiniatureContainer>
                    <FieldsContainer>
                      <TitleText>{elem.title}</TitleText>
                      <AuthorText>{elem.author}</AuthorText>
                    </FieldsContainer>
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

export default SelectedArtworksPopup;