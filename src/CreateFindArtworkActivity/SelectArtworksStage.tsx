import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { sampleArtworks } from '../artworks/artworkData';
import { api } from '../services';
import { useAsyncRequest } from '../services/useAsyncRequest';
import ArtworkSelectionCard from './ArtworkSelectionCard';
import FilterField from './FilterField';

const Root = styled.div`
  padding-top: 2.5vh;
  display: flex;
  flex-direction: column;
  width: 72.5%;
  align-self: center;
`;

const VerticalSeparator = styled.div`
  width: 100%;
  height: 2.5vh;
`;

const ResultsUpperPanel = styled.div`
  background-color: #F3F3F3;
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 10vh;
  padding-left: 3.5%;
  align-self: center;
`;

const ResultsLowerPanel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: auto;
  align-self: center;
`;

const FilterPanel = styled.div`
  width: 25%;
`;

const ArtworkGrid = styled.div`
  height: auto;
  width: 75%;
  padding-left: 2.5%;
  display: flex;
  flex-wrap: wrap;
  align-self: center;
  justify-content: space-between;
`;

const ResultsWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-self: left;
  justify-content: center;
  text-align: center;
`;

const Results = styled.span`
  color: black;
  font-size: 1.35em;
  font-weight: 500;
  letter-spacing: +1px;
  font-family: 'EB Garamond';
`;

const SelectArtworksStage: React.FC = () => {

  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(21);

  const fetchArtworksFromDataset = async () => {
    return api.fetchArtworks({ sortingField: 'id', pageNumber: page, pageSize: itemsPerPage });
  };

  const [findArtworkStatus, triggerRequest] = useAsyncRequest(fetchArtworksFromDataset, []);

  useEffect(() => {
    console.log(findArtworkStatus);
  }, [findArtworkStatus]);

  if (findArtworkStatus.kind === 'success') {
    if (findArtworkStatus.result.kind === 'ok') {

      return (
        <Root>
          <ResultsUpperPanel>
            <ResultsWrapper>
              <Results>
                Showing results {(page - 1) * itemsPerPage + 1}-{(page - 1) * itemsPerPage + findArtworkStatus.result.data.length}
              </Results>
            </ResultsWrapper>
          </ResultsUpperPanel>
          <VerticalSeparator />
          <ResultsLowerPanel>
            <FilterPanel>
              <FilterField
                filterField='ESCUELA'
                filterOptions={['Española (1)', 'Inglesa (20)', 'Francesa (1)', 'Rusa (3)']}
                bottomBorder={false}
              />
              <FilterField
                filterField='ÉPOCA'
                filterOptions={['Siglo II', 'Siglo XVI', 'Siglo XIX', 'Siglo XX']}
                bottomBorder={false}
              />
              <FilterField
                filterField='SOPORTE'
                filterOptions={['Papel (20)', 'Lienzo (2)', 'Tabla (3)']}
                bottomBorder={true}
              />
            </FilterPanel>
            <ArtworkGrid>
              {findArtworkStatus.result.data.map((im, i) => (
                <ArtworkSelectionCard
                  key={im.id}
                  artworkData={im}
                  selected={false}
                  onCardSelected={() => { }}
                />
              ))}
            </ArtworkGrid>
          </ResultsLowerPanel>
        </Root>
      );
    }
  }

  return <p>Loading...</p>
};

export default SelectArtworksStage;