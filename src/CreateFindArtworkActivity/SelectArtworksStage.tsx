import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { api } from '../services';
import { GetArtworksFilter } from '../services/queries';
import { useAsyncRequest } from '../services/useAsyncRequest';
import RecomendationCard from './RecomendationCard';
import FilterField from './FilterField';
import { NavigateNext } from '@styled-icons/material/NavigateNext';
import { NavigateBefore } from '@styled-icons/material/NavigateBefore';
import ShowFilters from './ShowFilters'
import SelectedActivitiesPopup from './SelectedActivitiesPopup';
import LoadingOverlay from '../components/LoadingOverlay';
import ArtworkSearchResults from './ArtworkSearchResults';
import { Library } from '@styled-icons/fluentui-system-filled/Library';
import { Search } from '@styled-icons/boxicons-regular/Search';
import { ArtworkData } from '../services/commonDefinitions';

const Root = styled.div`
  padding-top: 2.5vh;
  display: flex;
  flex-direction: column;
  width: 100%;
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

const TitleText = styled.h2`
  align-self: center;
  color: #3f3c2d;
  letter-spacing: +0.5px;
  font-family: Raleway;
`;

const ResultsUpperPanel = styled.div`
  background-color: #F3F3F3;
  width: 95%;
  max-width: 960px;
  min-width: 770px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  height: 10vh;
  margin-left: auto;
  margin-right: auto;
  padding-left: 24px;
  padding-right: 24px;
`;

const ResultsLowerPanel = styled.div`
  width: 95%;
  max-width: 960px;
  display: flex;
  flex-direction: row;
  height: auto;
  align-self: center;
`;

const ResultsFiltersAndArtworks = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  max-width: 730px;
`;

const FilterPanel = styled.div`
  width: 25%;
  max-width: 240px;
  min-width: 195px;
`;

const RecomendationGrid = styled.div`
  height: 380px;
  width: 95%;
  max-width: 960px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: transparent;
  align-self: center;
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
  height: 35px;
  width: 35px;
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
  height: 35px;
  width: 35px;
  align-self: center;
  transform: scale(0.9);
  transition: transform 0.5s ease;

  &:hover {
    transform: ${props => props.active ? 'scale(1.1)' : 'scale(0.9)'};
    transition: transform 0.5s ease;
  }
`;

const DisplayPanel = styled.div`
  position: relative;
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ShoppingCartContainer = styled.div`
  height: 38px;
  width: 38px;
  background-color: white;
  border-style: solid;
  border-color: #cccccc;
  border-width: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ShoppingCartIcon = styled(Library)`
  color: #c2c3c7;
  cursor: pointer;
  height: 25px;
  width: 25px;

  &:hover {
    color: #383d48;
  }
`;

const SearchArea = styled.div`
  background-color: #f3f3f3;
  border-style: solid;
  border-color: #cccccc;
  border-width: 1px 0px 1px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 64px;
  margin-bottom: 20px;
`;

const SearchBar = styled.input`
  font-size: 0.9em;
  letter-spacing: +1px;
  font-family: Raleway;
  color: black;
  resize: none;
  text-align: left;
  padding-left: 10px;
  display: table-cell;
  width: 540px;
  height: 34px;
`;

const SearchButton = styled.div`
  margin-left: -1px;
  width: 39px;
  height: 39px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c44c49;
  &:hover{
    cursor:pointer;
  }
`;

const SearchIcon = styled(Search)`
  width: 25px;
  height: 25px;
  color: white;
`;

interface SelectArtworksStageProps {
  selectedArtworks: ArtworkData[];
  onArtworkSelected: (artwork: ArtworkData) => void;
  onArtworkDeselected: (artworkId: string) => void;
};

const SelectArtworksStage: React.FC<SelectArtworksStageProps> = ({ onArtworkSelected, onArtworkDeselected, selectedArtworks }) => {

  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(6);
  const [appliedFilter, setAppliedFilter] = useState<GetArtworksFilter>({});
  const [lastArtwork, setLastArtwork] = useState<string>('');

  const fetchArtworksFromDataset = async () => {
    if (fetchAvailableArtworksStatus.kind === 'success' && fetchAvailableArtworksStatus.result.kind === 'ok') {
      return api.fetchArtworks({ sortingField: 'title', pageNumber: page, pageSize: itemsPerPage, filter: appliedFilter });
    }
    else return Promise.reject();
  };

  const fetchArtworksWithEmotionsIds = async () => {
    return api.fetchAvailableArtworksWithEmotions();
  };

  const fetchUniqueFieldValuesFromDataset = async (field: 'date' | 'author' | 'info') => {
    if (fetchAvailableArtworksStatus.kind === 'success' && fetchAvailableArtworksStatus.result.kind === 'ok') {
      return api.fetchUniqueFieldValues(field, fetchAvailableArtworksStatus.result.data);
    }
    else return Promise.reject();
  };

  const handleApplyFilter = (field: 'date' | 'author' | 'info', filter: string) => {
    let newFilter: GetArtworksFilter = JSON.parse(JSON.stringify(appliedFilter));
    newFilter[field] = filter;
    setAppliedFilter(newFilter);
  };

  const handleRemoveFilter = (filterName: string) => {
    const entries = Object.entries(appliedFilter);
    const entryToRemove = entries.find((elem) => elem[1] === filterName);

    if (entryToRemove) {
      let newFilter: GetArtworksFilter = appliedFilter;
      delete newFilter[entryToRemove[0] as keyof GetArtworksFilter];
      setAppliedFilter(JSON.parse(JSON.stringify(newFilter)));
    }
  };

  const handleClearFilters = () => {
    if (fetchAvailableArtworksStatus.kind === 'success' && fetchAvailableArtworksStatus.result.kind === 'ok') {
      setAppliedFilter({ ids: fetchAvailableArtworksStatus.result.data });
    }
    else {
      setAppliedFilter({});
    }
  };

  const handleApplyKeywordsFilter = (keywords: string) => {
    let newFilter: GetArtworksFilter = JSON.parse(JSON.stringify(appliedFilter));
    newFilter.titleKeywords = keywords;
    setAppliedFilter(newFilter);
  };

  const handleArtworkSelected = (artwork: ArtworkData) => {
    setLastArtwork(artwork.id);
    onArtworkSelected(artwork);
  };

  const getRecommendations = () => {
    console.log('last artwork: ' + lastArtwork);
    if (lastArtwork) {
      return api.fetchRecommendationsByEmotion(lastArtwork);
    }
    else {
      return Promise.reject();
    }
  }

  const [fetchAvailableArtworksStatus] = useAsyncRequest(fetchArtworksWithEmotionsIds, []);
  const [findArtworkStatus] = useAsyncRequest(fetchArtworksFromDataset, [fetchAvailableArtworksStatus, appliedFilter, page, itemsPerPage]);
  const [findUniqueAuthorsStatus] = useAsyncRequest(() => fetchUniqueFieldValuesFromDataset('author'), [fetchAvailableArtworksStatus]);
  const [findUniqueDatesStatus] = useAsyncRequest(() => fetchUniqueFieldValuesFromDataset('date'), [fetchAvailableArtworksStatus]);
  const [findUniqueInfoStatus] = useAsyncRequest(() => fetchUniqueFieldValuesFromDataset('info'), [fetchAvailableArtworksStatus]);
  const [fetchByEmotionStatus] = useAsyncRequest(getRecommendations, [lastArtwork]);

  const [selectedArtworksOpen, setSelectedArtworksOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [displayRecom, setDisplayRecom] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    if (
      fetchAvailableArtworksStatus.kind === 'success' &&
      fetchAvailableArtworksStatus.result.kind === 'ok' &&
      findArtworkStatus.kind === 'success' &&
      findArtworkStatus.result.kind === 'ok' &&
      findUniqueAuthorsStatus.kind === 'success' &&
      findUniqueAuthorsStatus.result.kind === 'ok' &&
      findUniqueDatesStatus.kind === 'success' &&
      findUniqueDatesStatus.result.kind === 'ok' &&
      findUniqueInfoStatus.kind === 'success' &&
      findUniqueInfoStatus.result.kind === 'ok') {
      setLoading(false);
    }
    else {
      setLoading(true);
    }
  }, [fetchAvailableArtworksStatus, findArtworkStatus, findUniqueAuthorsStatus, findUniqueDatesStatus, findUniqueInfoStatus]);

  useEffect(() => {
    if (fetchAvailableArtworksStatus.kind === 'success' && fetchAvailableArtworksStatus.result.kind === 'ok') {
      const ids = fetchAvailableArtworksStatus.result.data;
      setAppliedFilter(prev => ({ ...prev, ids }));
    }
  }, [fetchAvailableArtworksStatus]);

  return (
    <Root>
      <PromptTitlePanel>
        <TitleText>
          Select Artworks
        </TitleText>
      </PromptTitlePanel>
      <SearchArea>
        <SearchBar
          placeholder="Search by title..."
          onChange={(e) => setSearchText(e.target.value)}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              handleApplyKeywordsFilter(searchText);
            }
          }}
        />
        <SearchButton onClick={() => handleApplyKeywordsFilter(searchText)}>
          <SearchIcon />
        </SearchButton>
      </SearchArea>
      {(findArtworkStatus.kind === 'success' && findArtworkStatus.result.kind === 'ok') && (
        <DisplayPanel>
          <ResultsUpperPanel>
            <ResultsWrapper>
              <Results>
                Showing results {(page - 1) * itemsPerPage + 1}-{(page - 1) * itemsPerPage + findArtworkStatus.result.data.artworks.length}
              </Results>
            </ResultsWrapper>
            <ShoppingCartContainer>
              <ShoppingCartIcon
                onClick={() => setSelectedArtworksOpen(true)}
              />
            </ShoppingCartContainer>
          </ResultsUpperPanel>
          <VerticalSeparator />

          <ResultsLowerPanel>

            <FilterPanel>
              {(findUniqueDatesStatus.kind === 'success' && findUniqueDatesStatus.result.kind === 'ok') && (
                <FilterField
                  filterField='DATE'
                  filterOptions={findUniqueDatesStatus.result.data.map(elem => elem.value)}
                  filterCounts={findUniqueDatesStatus.result.data.map(elem => elem.count)}
                  bottomBorder={false}
                  maxOptionsShown={10}
                  onFilterSelected={(filter: string) => handleApplyFilter('date', filter)}
                />
              )}
              {(findUniqueAuthorsStatus.kind === 'success' && findUniqueAuthorsStatus.result.kind === 'ok') && (
                <FilterField
                  filterField='AUTHOR'
                  filterOptions={findUniqueAuthorsStatus.result.data.map(elem => elem.value)}
                  filterCounts={findUniqueAuthorsStatus.result.data.map(elem => elem.count)}
                  bottomBorder={false}
                  maxOptionsShown={10}
                  onFilterSelected={(filter: string) => handleApplyFilter('author', filter)}
                />
              )}
              {(findUniqueInfoStatus.kind === 'success' && findUniqueInfoStatus.result.kind === 'ok') && (
                <FilterField
                  filterField='MATERIAL'
                  filterOptions={findUniqueInfoStatus.result.data.map(elem => elem.value)}
                  filterCounts={findUniqueInfoStatus.result.data.map(elem => elem.count)}
                  bottomBorder={true}
                  maxOptionsShown={10}
                  onFilterSelected={(filter: string) => handleApplyFilter('info', filter)}
                />
              )}
            </FilterPanel>

            <ResultsFiltersAndArtworks>
              <ShowFilters
                onFilterDelete={handleRemoveFilter} //this should change with the delete function
                onClear={handleClearFilters}
                filterName={Object.keys(appliedFilter).filter(elem => elem !== 'ids').map(elem => appliedFilter[elem as keyof GetArtworksFilter] as string)}
              />
              <ArtworkSearchResults
                artworks={findArtworkStatus.result.data.artworks}
                onArtworkDeselected={onArtworkDeselected}
                onArtworkSelected={handleArtworkSelected}
                selectedArtworks={selectedArtworks.map(elem => elem.id)}
                page={page}
                pageTotal={~~(findArtworkStatus.result.data.count / itemsPerPage) + 1}
                onPageChange={setPage}
              />
            </ResultsFiltersAndArtworks>

          </ResultsLowerPanel>
          {loading && <LoadingOverlay />}
        </DisplayPanel>
      ) || 'Loading...'}
      <VerticalSeparator />

      {(fetchByEmotionStatus.kind === 'success' && fetchByEmotionStatus.result.kind === 'ok') && (
        <>
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
            {fetchByEmotionStatus.result.data.artworks.slice(displayRecom, displayRecom + 3).map((im, i) => (
              <RecomendationCard
                key={im.id}
                artworkData={im}
                selected={selectedArtworks.some(elem => elem.id === im.id)}
                onCardSelected={() => handleArtworkSelected(im)}
                onCardDeselected={() => onArtworkDeselected(im.id)}
              />
            ))
            }
            <NavigateNextIcon
              active={displayRecom + 3 < fetchByEmotionStatus.result.data.artworks.length}
              onClick={() => {
                if ((fetchByEmotionStatus.kind === 'success' && fetchByEmotionStatus.result.kind === 'ok') &&
                  displayRecom + 3 < fetchByEmotionStatus.result.data.artworks.length) {
                  setDisplayRecom(prev => prev + 1);
                }
              }}
            />
          </RecomendationGrid>
        </>
      )}
      {selectedArtworksOpen && (findArtworkStatus.kind === 'success' && findArtworkStatus.result.kind === 'ok') &&
        <SelectedActivitiesPopup
          artworks={selectedArtworks}
          onArtworkRemoved={(id) => onArtworkDeselected(id)}
          setPopupOpen={setSelectedArtworksOpen}
        />
      }
    </Root>
  );
};

export default SelectArtworksStage;