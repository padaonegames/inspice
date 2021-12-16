import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

// services
import { artworksService } from '../services';
import { useAsyncRequest } from '../services/useAsyncRequest';

// model
import { ArtworkData } from '../services/artwork.model';
import { GetArtworksFilter } from '../services/queries';

// components
import SearchAndSelectManyArtworks from '../components/ArtworkSelection/SearchAndSelectManyArtworks';


const Root = styled.div`
  padding-top: 2.5vh;
  display: flex;
  flex-direction: row;
  width: 100%;
  align-self: center;
  justify-content: center;
`;

export interface SelectArtworksStageProps {
  selectedArtworks: ArtworkData[];
  onArtworkSelected: (artwork: ArtworkData) => void;
  onArtworkDeselected: (artworkId: string) => void;
};

/**
 * <img src="media://SelectArtworksStage.PNG" alt="SelectArtworksStage">
 */
export const SelectArtworksStage: React.FC<SelectArtworksStageProps> = ({ onArtworkSelected, onArtworkDeselected, selectedArtworks }) => {

  //--------------------------------------------------
  //              PAGINATION AND FILTERS
  //--------------------------------------------------
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(30);
  const [appliedFilter, setAppliedFilter] = useState<GetArtworksFilter>({});

  const handleApplyFilter = (field: string, filter: string) => {
    // only support specific types
    if ('date' !== field && 'author' !== field && 'info' !== field) return;

    // make a copy of current filter, add new filter and save result
    let newFilter: GetArtworksFilter = JSON.parse(JSON.stringify(appliedFilter));
    newFilter[field] = filter;
    setAppliedFilter(newFilter);

    setPage(1);
  };

  const handleRemoveFilter = (field: string, filter: string) => {
    // only support specific types
    if ('date' !== field && 'author' !== field && 'info' !== field) return;

    // make a copy of current filter, remove filter and save result
    let newFilter: GetArtworksFilter = JSON.parse(JSON.stringify(appliedFilter));
    newFilter[field] = undefined;
    delete newFilter[field];
    setAppliedFilter(newFilter);

    setPage(1);
  };

  const handleClearFilters = () => {
    setAppliedFilter({});
    setPage(1);
  };

  const handleApplyKeywordsFilter = (keywords: string) => {
    let newFilter: GetArtworksFilter = JSON.parse(JSON.stringify(appliedFilter));
    newFilter.titleKeywords = keywords;
    setAppliedFilter(newFilter);
    setPage(1);
  };

  //--------------------------------------------------
  //            API CALLS AND REQUESTS
  //--------------------------------------------------
  const fetchArtworksFromDataset = async () => {
    return artworksService.fetchArtworks({ sortingField: 'title', pageNumber: page, pageSize: itemsPerPage, filter: appliedFilter });
  };

  const fetchUniqueFieldValuesFromDataset = async (field: 'date' | 'author' | 'info') => {
    return artworksService.fetchUniqueFieldValues(field);
  };

  // API Requests to fetch artworks and unique filtering fields
  const [findArtworkStatus] = useAsyncRequest(fetchArtworksFromDataset, [appliedFilter, page, itemsPerPage]);
  const [findUniqueAuthorsStatus] = useAsyncRequest(() => fetchUniqueFieldValuesFromDataset('author'), []);
  const [findUniqueDatesStatus] = useAsyncRequest(() => fetchUniqueFieldValuesFromDataset('date'), []);
  const [findUniqueInfoStatus] = useAsyncRequest(() => fetchUniqueFieldValuesFromDataset('info'), []);

  // Whether we are in a loading state (if API requests have not been completed yet)
  const [loading, setLoading] = useState<boolean>(true);

  // force loading state while API calls are still running
  useEffect(() => {
    if (
      findArtworkStatus.kind === 'success' &&
      findArtworkStatus.result.kind === 'ok' &&
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
  }, [findArtworkStatus, findUniqueAuthorsStatus, findUniqueDatesStatus, findUniqueInfoStatus]);

  //--------------------------------------------------
  //          RENDERING METHODS AND UTILS
  //--------------------------------------------------
  /**
   * Returns memoized version of computed page data.
   */
  const getPageData = useCallback((): { currentPage: number, pageTotal: number, itemsPerPage: number } | undefined => {
    if (findArtworkStatus.kind === 'success' && findArtworkStatus.result.kind === 'ok') {
      const count = findArtworkStatus.result.data.count; // total number of artworks
      return {
        currentPage: page,
        itemsPerPage: itemsPerPage,
        pageTotal: itemsPerPage <= 0 ? 1 : ~~(count / itemsPerPage) + 1
      };
    }
    else return undefined;
  }, [findArtworkStatus, page, itemsPerPage]);


  /**
   * Returns memoized version of displayed artworks from API. 
   */
  const getDisplayedArtworks = useCallback((): ArtworkData[] => {
    if (findArtworkStatus.kind === 'success' && findArtworkStatus.result.kind === 'ok') {
      return findArtworkStatus.result.data.artworks; // result artworks
    }
    else return [];
  }, [findArtworkStatus]);


  /**
   * Returns a memoized version of unique filtering fields based on API call results (partial:
   * will return the results of all completed calls, even if there are still some running ones)
   */
  const getUniqueFilterFields = useCallback((): Map<string, { value: string; count: number; }[]> => {
    let uniqueFilterFields = new Map<string, { value: string; count: number; }[]>();

    if (findUniqueAuthorsStatus.kind === 'success' && findUniqueAuthorsStatus.result.kind === 'ok') {
      uniqueFilterFields.set('author', findUniqueAuthorsStatus.result.data);
    }

    if (findUniqueDatesStatus.kind === 'success' && findUniqueDatesStatus.result.kind === 'ok') {
      uniqueFilterFields.set('date', findUniqueDatesStatus.result.data);
    }

    if (findUniqueInfoStatus.kind === 'success' && findUniqueInfoStatus.result.kind === 'ok') {
      uniqueFilterFields.set('info', findUniqueInfoStatus.result.data);
    }

    return uniqueFilterFields;
  }, [findUniqueAuthorsStatus, findUniqueDatesStatus, findUniqueInfoStatus]);

  //--------------------------------------------------
  //                  RENDERING
  //--------------------------------------------------

  return (
    <Root>
      <SearchAndSelectManyArtworks
        displayedArtworks={getDisplayedArtworks()}
        pageData={getPageData()}
        onPageChanged={setPage}
        selectedArtworks={selectedArtworks}
        onArtworkSelected={onArtworkSelected}
        onArtworkDeselected={onArtworkDeselected}
        appliedFilter={appliedFilter}
        onSearchPerformed={handleApplyKeywordsFilter}
        uniqueFilterFields={getUniqueFilterFields()}
        onFilterApplied={handleApplyFilter}
        onFilterRemoved={handleRemoveFilter}
        onClearFilters={handleClearFilters}
        loading={loading}
      />
    </Root >
  );
};

export default SelectArtworksStage;

/*
  const [lastArtwork, setLastArtwork] = useState<string>('');
  const getRecommendations = () => {
    if (lastArtwork) {
      return artworksService.fetchRecommendationsByEmotion(lastArtwork);
    }
    else {
      return Promise.reject();
    }
  };

  const [fetchAvailableArtworksStatus] = useAsyncRequest(fetchArtworksWithEmotionsIds, []);
  const [displayRecom, setDisplayRecom] = useState<number>(0);
    const [fetchByEmotionStatus] = useAsyncRequest(getRecommendations, [lastArtwork]);
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
*/