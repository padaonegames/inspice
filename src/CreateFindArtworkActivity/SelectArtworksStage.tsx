import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { api } from '../services';
import { GetArtworksFilter } from '../services/queries';
import { useAsyncRequest } from '../services/useAsyncRequest';
import ArtworkSelectionCard from './ArtworkSelectionCard';
import RecomendationCard from './RecomendationCard';
import FilterField from './FilterField';
import NumberIcon from '../components/NumberIcon'
import { NavigateNext } from '@styled-icons/material/NavigateNext';
import { NavigateBefore } from '@styled-icons/material/NavigateBefore';
import { ArrowRight } from '@styled-icons/bootstrap/ArrowRight';
import PageBar from './PageBar';

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

const PromptTitlePanel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 10vh;
  align-self: center;
  justify-content: center;
`;

const PromptText = styled.h2`
  align-self: center;
  color: #525252;
  letter-spacing: +0.5px;
  font-size: 1.25em;
  font-weight: 1000;
  font-family: Raleway;
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
  height: fit-content;
  width: 75%;
  padding-left: 2.5%;
  display: flex;
  flex-wrap: wrap;
  align-self: top;
  justify-content: left;
`;

const RecomendationGrid = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: transparent;
`;
const PageNumberGrid = styled.div`
  height: auto;
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #F3F3F3;
  justify-content: center;
  align-self: center;
  vertical-align: middle;
  padding-bottom: 10px;
  padding-top: 10px;
  font-size: 20px; 
  margin-left :5px;
 font-family: Verdana, Geneva, san-serif; 
 text-transform: capitalize;
 justify-content: center;
 vertical-align: middle;
 &:hover {
  cursor: default;
  }
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
interface NavIconProps {
  active: boolean;
};
const NavigateNextIcon = styled(NavigateNext) <NavIconProps>`
  color: ${props => props.active ? 'darkgray' : 'lightgray'};
  cursor: ${props => props.active ? 'pointer' : 'default'};
  height: 7.5vh;
  align-self: center;
  margin-bottom: 1vh;
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
  height: 7.5vh;
  align-self: center;
  margin-bottom: 1vh;
  transform: scale(0.9);
  transition: transform 0.5s ease;

  &:hover {
    transform: ${props => props.active ? 'scale(1.1)' : 'scale(0.9)'};
    transition: transform 0.5s ease;
  }
`;

interface SelectArtworksStageProps {
  selectedArtworks: string[];
  onArtworkSelected: (artworkId: string) => void;
  onArtworkDeselected: (artworkId: string) => void;
};

const SelectArtworksStage: React.FC<SelectArtworksStageProps> = ({ onArtworkSelected, onArtworkDeselected, selectedArtworks }) => {

  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(30);
  const [appliedFilter, setAppliedFilter] = useState<GetArtworksFilter>({});
  const [lastArtwork, setLastArtwork] = useState<string>('');
  const [selectedPage, setSelectedPage] = useState<number>(1);

  const fetchArtworksFromDataset = async () => {
    return api.fetchArtworks({ sortingField: 'title', pageNumber: page, pageSize: itemsPerPage, filter: appliedFilter });
  };

  const fetchUniqueFieldValuesFromDataset = async (field: 'date' | 'author' | 'info') => {
    return api.fetchUniqueFieldValues(field);
  };

  const handleApplyFilter = (field: 'date' | 'author' | 'info', filter: string) => {
    let newFilter: any = {};
    newFilter[field] = filter;
    setAppliedFilter(newFilter);
  };

  const getRecommendations = () => {
    return api.fetchRecommendationsByEmotion(lastArtwork);
  }

  const [findArtworkStatus] = useAsyncRequest(fetchArtworksFromDataset, [appliedFilter, page, itemsPerPage], true);
  const [findUniqueAuthorsStatus] = useAsyncRequest(() => fetchUniqueFieldValuesFromDataset('author'), []);
  const [findUniqueDatesStatus] = useAsyncRequest(() => fetchUniqueFieldValuesFromDataset('date'), []);
  const [findUniqueInfoStatus] = useAsyncRequest(() => fetchUniqueFieldValuesFromDataset('info'), []);
  const [displayRecom, setDisplayRecom] = useState<number>(0);
  const [fetchByEmotionStatus] = useAsyncRequest(getRecommendations, [lastArtwork]);

  const testArray: number[] = Array.from(Array(50).keys());


  useEffect(() => {
    console.log(fetchByEmotionStatus);
  }, [fetchByEmotionStatus]);


  if (findArtworkStatus.kind === 'success' &&
    findArtworkStatus.result.kind === 'ok' &&
    findUniqueAuthorsStatus.kind === 'success' &&
    findUniqueAuthorsStatus.result.kind === 'ok' &&
    findUniqueDatesStatus.kind === 'success' &&
    findUniqueDatesStatus.result.kind === 'ok' &&
    findUniqueInfoStatus.kind === 'success' &&
    findUniqueInfoStatus.result.kind === 'ok') {
    return (
      <Root>
        <PromptTitlePanel>
          <PromptText>
            SELECT ARTWORKS
          </PromptText>
        </PromptTitlePanel>
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
              filterField='DATE'
              filterOptions={findUniqueDatesStatus.result.data.map(elem => elem.value)}
              filterCounts={findUniqueDatesStatus.result.data.map(elem => elem.count)}
              bottomBorder={false}
              maxOptionsShown={8}
              onFilterSelected={(filter: string) => handleApplyFilter('date', filter)}
            />
            <FilterField
              filterField='AUTHOR'
              filterOptions={findUniqueAuthorsStatus.result.data.map(elem => elem.value)}
              filterCounts={findUniqueAuthorsStatus.result.data.map(elem => elem.count)}
              bottomBorder={false}
              maxOptionsShown={8}
              onFilterSelected={(filter: string) => handleApplyFilter('author', filter)}
            />
            <FilterField
              filterField='MATERIAL'
              filterOptions={findUniqueInfoStatus.result.data.map(elem => elem.value)}
              filterCounts={findUniqueInfoStatus.result.data.map(elem => elem.count)}
              bottomBorder={true}
              maxOptionsShown={8}
              onFilterSelected={(filter: string) => handleApplyFilter('info', filter)}
            />
          </FilterPanel>
          <ArtworkGrid>
            {findArtworkStatus.result.data.map((im, i) => (
              <ArtworkSelectionCard
                key={im.id}
                artworkData={im}
                selected={selectedArtworks.some(elem => elem === im.id)}
                onCardSelected={() => {
                  onArtworkSelected(im.id);
                  setLastArtwork(im.id); // just for testing
                }}
                onCardDeselected={() => onArtworkDeselected(im.id)}
              />
            ))}
          </ArtworkGrid>
        </ResultsLowerPanel>
        <VerticalSeparator />

        <ResultsUpperPanel>
          <ResultsWrapper>
            <Results>
              Artworks triggering similar or opposite emotions:
            </Results>
          </ResultsWrapper>
        </ResultsUpperPanel>
        <RecomendationGrid>
          <NavigateBeforeIcon
            active={displayRecom > 0}
            onClick={() => {
              if (displayRecom > 0) {
                setDisplayRecom(prev => prev - 1);
              }
            }}
          />
          {findArtworkStatus.result.data.slice(displayRecom, displayRecom + 5).map((im, i) => (
            <RecomendationCard
              key={im.id}
              artworkData={im}
              selected={selectedArtworks.some(elem => elem === im.id)}
              onCardSelected={() => {
                onArtworkSelected(im.id);
                setLastArtwork(im.id); // just for testing
              }}
              onCardDeselected={() => onArtworkDeselected(im.id)}
            />
          ))}
          <NavigateNextIcon
            active={displayRecom + 6 < findArtworkStatus.result.data.length}
            onClick={() => {
              if (displayRecom + 6 < 20) { //for now it is just showing 20 items max. for test
                setDisplayRecom(prev => prev + 1);
              }
            }}
          />
        </RecomendationGrid>
        <PageBar
          currentPage={page}
          numberOfPages={9}
          onPageSelected={setPage}
        />
      </Root>
    );
  }

  return <p>Loading...</p>
};

export default SelectArtworksStage;