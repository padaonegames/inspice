import React from 'react';
import styled from 'styled-components';
import { ArtworkData } from '../../../services/artwork.model';
import ArtworkFailed from './ArtworkFailed';
import ArtworkFront from './ArtworkFront';
import ArtworkPopup from './ArtworkPopup';

const CardContainer = styled.div`
  flex: 0 0 auto; 
  margin: 5px;
  display: block;
  position: relative;
  width: 95%;
  height: 29vh;
  transform-style: preserve-3d;
  perspective: 1000px;
  background-color: black;
  border: 1px solid black;
`;

export type ArtworkCardStatus =
  | { status: 'wrong' }
  | { status: 'right', prizes: string[] };

export interface ArtworkCardProps {
  /** Piece of artwork to be guessed. Contains id, name, artist, description, date, 
   *  imageLoc, image, audio, notes and URL.  */
  artworkData: ArtworkData;
  /** Indicates whether the card has been guessed correctly or not. */
  status: ArtworkCardStatus;
  /** When flipped it is shown if the anwser was correct or not. */
  flipped: boolean;
  /** Callback to the parent component to notify that the user has selected the card. */
  onCardSelected?: () => void;
};

/**
 * The artwork card is being used to show the details of a single artwork. This card later can be used 
 * in the grids or other components. It consists of a background image which is the artwork itself, 
 * some information about the artwork which is available on hover and a checkbox to select or unselect 
 * the item. Various callbacks can be added to the selected option based on where this card is going to 
 * be used. Since this card is mainly being use in the “Find artwork game” it provides a “status” as a 
 * prop which indicates if it is the correct artwork or not and how much point it has when finding it as 
 * the prize.
 */
export const ArtworkCard: React.FC<ArtworkCardProps> = ({ artworkData, flipped, status, onCardSelected }) => {

  return (
    <CardContainer>
      <ArtworkFront
        onArtworkSelected={onCardSelected}
        artworkData={artworkData}
        flipped={!flipped}
      />
      {status.status === 'right' ?
        <ArtworkPopup
          flipped={flipped}
          prize={status.prizes}
          artworkData={artworkData}
        />
        :
        <ArtworkFailed
          image={artworkData.src}
          title={artworkData.title}
          flipped={flipped}
        />
      }
    </CardContainer>
  );
}

export default ArtworkCard;