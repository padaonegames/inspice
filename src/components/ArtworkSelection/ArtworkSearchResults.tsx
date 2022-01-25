import React from 'react';
import styled from 'styled-components';
import { ArtworkData } from '../../services/artwork.model';
import ArtworkSelectionCard from './ArtworkSelectionCard';
import PageBar from '../Navigation/PageBar';

const ArtworkGrid = styled.div`
  position: relative;
  height: fit-content;
  width: 100%;
  max-width: 730px;
  display: flex;
  flex-wrap: wrap;
  align-self: top;

  @media (max-width: 768px) {
    justify-content: center;
  }

  @media (min-width: 768px) {
    justify-content: left;
    padding-left: 15px;
  }
`;

export interface ArtworkSearchResultsProps {
  /** List of artworks to be displayed by this component (content of current page) */
  artworks: ArtworkData[];
  /** List of artwork ids that the user has already selected */
  selectedArtworks: string[];
  /** currently displayed page */
  page?: number;
  /** Total number of indexed pages to be displayed */
  pageTotal?: number;
  /** Callback to the parent of this panel indicating that an artwork has been selected (Added to selection) */
  onArtworkSelected?: (artwork: ArtworkData) => void;
  /** Callback to the parent of this panel indicating that an artwork has been deselected (Removed from selection) */
  onArtworkDeselected?: (artworkId: string) => void;
  /**
   * Callback to the parent of this panel indicating that an artwork has been clicked from the panel.
   * Note that this is different from selection, as clicking on an artwork just means that the user wishes
   * to explore it (e.g. to get more information about it).
   */
  onArtworkClicked?: (artworkId: string) => void;
  /** Callback to the parent of this panel indicating that the user wishes to change the currently displayed page */
  onPageChange?: (page: number) => void;
};

/** Controlled component to display a list of artwork search results. All state management must be done within the parent component */
export const ArtworkSearchResults = (props: ArtworkSearchResultsProps) => {

  const {
    artworks,
    page,
    pageTotal,
    onPageChange,
    onArtworkDeselected,
    onArtworkSelected,
    onArtworkClicked,
    selectedArtworks,
  } = props;

  return (
    <ArtworkGrid>
      {artworks.map(im => (
        <ArtworkSelectionCard
          key={im.id}
          artworkData={im}
          selected={selectedArtworks.some(elem => elem === im.id)}
          onCardSelected={() => {
            if (onArtworkSelected)
              onArtworkSelected(im);
          }}
          onCardDeselected={() => {
            if (onArtworkDeselected)
              onArtworkDeselected(im.id);
          }}
          onCardClicked={() => {
            if (onArtworkClicked)
              onArtworkClicked(im.id);
          }}
        />
      ))}
      {page !== undefined && pageTotal !== undefined && (
        <PageBar
          currentPage={page}
          numberOfPages={pageTotal}
          onPageSelected={(page) => {
            if (onPageChange)
              onPageChange(page);
          }}
        />
      )}
    </ArtworkGrid>
  );
};

export default ArtworkSearchResults;