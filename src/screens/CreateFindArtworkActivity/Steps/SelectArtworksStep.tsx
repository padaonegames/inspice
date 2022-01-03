import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchAndSelectManyArtworks from '../../../components/ArtworkSelection/SearchAndSelectManyArtworks';
import { StepComponentProps } from '../../../components/Navigation/Steps';
import { artworksService } from '../../../services';
import { ArtworkData } from '../../../services/artwork.model';
import { GetArtworksFilter } from '../../../services/queries';
import { useAsyncRequest } from '../../../services/useAsyncRequest';


const Root = styled.div`
  padding-top: 2.5vh;
  display: flex;
  flex-direction: row;
  width: 100%;
  align-self: center;
  justify-content: center;
`;

/**
 * <img src="media://SelectArtworksStep.PNG" alt="SelectArtworksStep">
 */
export const SelectArtworksStep = (props: StepComponentProps) => {

  //--------------------------------------------------
  //              PAGINATION AND FILTERS
  //--------------------------------------------------
  const page: number = props.getState('page', 1);
  const itemsPerPage: number = props.getState('itemsPerPage', 30);
  const appliedFilter: GetArtworksFilter = props.getState('appliedFilter', {});

  const handleApplyFilter = (field: string, filter: string) => {
    // only support specific types
    if ('date' !== field && 'author' !== field && 'info' !== field) return;

    // make a copy of current filter, add new filter and save result
    let newFilter: GetArtworksFilter = JSON.parse(JSON.stringify(appliedFilter));
    newFilter[field] = filter;
    props.setState('appliedFilter', newFilter, {});

    props.setState('page', 1, 1);
  };

  const handleRemoveFilter = (field: string, filter: string) => {
    // only support specific types
    if ('date' !== field && 'author' !== field && 'info' !== field) return;

    // make a copy of current filter, remove filter and save result
    let newFilter: GetArtworksFilter = JSON.parse(JSON.stringify(appliedFilter));
    newFilter[field] = undefined;
    delete newFilter[field];
    props.setState('appliedFilter', newFilter, {});

    props.setState('page', 1, 1);
  };

  const handleClearFilters = () => {
    props.setState('appliedFilter', {}, {});
    props.setState('page', 1, 1);
  };

  const handleApplyKeywordsFilter = (keywords: string) => {
    let newFilter: GetArtworksFilter = JSON.parse(JSON.stringify(appliedFilter));
    newFilter.titleKeywords = keywords;
    props.setState('appliedFilter', newFilter, {});
    props.setState('page', 1, 1);
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
  const [findArtworkStatus] = useAsyncRequest(fetchArtworksFromDataset, [page, itemsPerPage, appliedFilter]);
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
  const getPageData = (): { currentPage: number, pageTotal: number, itemsPerPage: number } | undefined => {
    if (findArtworkStatus.kind === 'success' && findArtworkStatus.result.kind === 'ok') {
      const count = findArtworkStatus.result.data.count; // total number of artworks
      return {
        currentPage: page,
        itemsPerPage: itemsPerPage,
        pageTotal: itemsPerPage <= 0 ? 1 : ~~(count / itemsPerPage) + 1
      };
    }
    else return undefined;
  };


  /**
   * Returns memoized version of displayed artworks from API. 
   */
  const getDisplayedArtworks = () => {
    if (findArtworkStatus.kind === 'success' && findArtworkStatus.result.kind === 'ok') {
      return findArtworkStatus.result.data.artworks; // result artworks
    }
    else return [];
  };


  /**
   * Returns a memoized version of unique filtering fields based on API call results (partial:
   * will return the results of all completed calls, even if there are still some running ones)
   */
  const getUniqueFilterFields = (): Map<string, { value: string; count: number; }[]> => {
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
  };

  //--------------------------------------------------
  //                  RENDERING
  //--------------------------------------------------
  return (
    <Root>
      <SearchAndSelectManyArtworks
        displayedArtworks={getDisplayedArtworks()}
        pageData={getPageData()}
        onPageChanged={(newPage) => props.setState<number>('page', newPage, 1)}
        selectedArtworks={props.getState<ArtworkData[]>('selectedArtworks', [])}
        onArtworkSelected={(artwork) => props.setState<ArtworkData[]>('selectedArtworks', prev => [...prev, artwork], [])}
        onArtworkDeselected={(artworkId) => props.setState<ArtworkData[]>('selectedArtworks', prev => prev.filter(e => e.id !== artworkId), [])}
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

export default SelectArtworksStep;