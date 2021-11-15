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
  min-width: 580px;
  padding-left: 15px;
  display: flex;
  flex-wrap: wrap;
  align-self: top;
  justify-content: left;
`;

interface ArtworkSearchResultsProps {
  artworks: ArtworkData[];
  selectedArtworks: string[];
  page?: number;
  pageTotal?: number;
  onArtworkSelected?: (artwork: ArtworkData) => void;
  onArtworkDeselected?: (artworkId: string) => void;
  onPageChange?: (page: number) => void;
};

const ArtworkSearchResults: React.FC<ArtworkSearchResultsProps> = ({
  artworks,
  page,
  pageTotal,
  onPageChange,
  onArtworkDeselected,
  onArtworkSelected,
  selectedArtworks,
}) => {

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