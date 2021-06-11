import React from 'react';
import styled from 'styled-components';
import { ArtworkData } from '../services/commonDefinitions';
import ArtworkSelectionCard from './ArtworkSelectionCard';
import PageBar from './PageBar';

const ArtworkGrid = styled.div`
  position: relative;
  height: fit-content;
  width: 75%;
  margin-left: 1%;
  padding-left: 1.5%;
  display: flex;
  flex-wrap: wrap;
  align-self: top;
  justify-content: left;
`;

interface ArtworkSearchResultsProps {
  artworks: ArtworkData[];
  selectedArtworks: string[];
  page: number;
  pageTotal: number;
  onArtworkSelected: (artworkId: string) => void;
  onArtworkDeselected: (artworkId: string) => void;
  onPageChange: (page: number) => void;
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
          onCardSelected={() => onArtworkSelected(im.id)}
          onCardDeselected={() => onArtworkDeselected(im.id)}
        />
      ))}
      <PageBar
        currentPage={page}
        numberOfPages={pageTotal}
        onPageSelected={onPageChange}
      />
    </ArtworkGrid>
  );
};

export default ArtworkSearchResults;