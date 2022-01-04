import React, { useState } from 'react';
import styled from 'styled-components';

// model
import { ArtworkData } from '../../services/artwork.model';
import { GetArtworksFilter } from '../../services/queries';

// components
import ContentCard from "../Layout/ContentCard";
import SearchBar from '../Forms/SearchBar';
import FilterPanel from './FilterPanel';
import ShowFilters from './ShowFilters';
import ArtworkSearchResults from './ArtworkSearchResults';
import LoadingOverlay from '../Layout/LoadingOverlay';
import SelectedArtworksPopup from './SelectedArtworksPopup';

// icon imports
import { Library } from '@styled-icons/fluentui-system-filled/Library';

const VerticalSeparator = styled.div`
  width: 100%;
  height: 2.5vh;
`;

const ResultsUpperPanel = styled.div`
  background-color: #F3F3F3;
  width: 95%;
  max-width: 960px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  height: 65px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 24px;
  padding-right: 24px;
`;

const ResultsLowerPanel = styled.div`
  width: 95%;
  max-width: 960px;
  display: flex;
  height: auto;
  align-self: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }

  @media (min-width: 768px) {
    flex-direction: row;
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

const DisplayPanel = styled.div`
  position: relative;
  width: 100%;
  max-width: 1024px;
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

const ResultsFiltersAndArtworks = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  max-width: 730px;
`;

export interface SearchAndSelectManyArtworksProps {
  /**
   * Artworks that should be displayed by this Component. This is not intended to be
   * a comprehensive list of all artworks returned from a big query, but rather a slice
   * of a query's results, or the result of a paginated query.
   */
  displayedArtworks: ArtworkData[];
  /**
   * Currently displayed page and total number of pages considered, as well as number of items per page.
   * This allows the consumer of this component to specify the state of the current query and provide 
   * some visual feedback to the end-user on page location and navegation.
   */
  pageData?: { currentPage: number, pageTotal: number, itemsPerPage: number };
  /**
   * Callback to notify parent component of the action of a user clicking on a change page button.
   * If pageData is not provided, this will never be called as the end-user will have no way of 
   * performing said action.
   */
  onPageChanged?: (pageNumber: number) => void;
  /**
   * Artworks that should appear as selected within this panel. Note that it is necessary 
   * to provide a complete list of enriched artworks and not just a list of ids, as this 
   * component does not keep an internal state to store artworks that are not currently displayed
   * in displayedArtworks.
   */
  selectedArtworks: ArtworkData[];
  /**
   * Callback to the parent of this panel indicating that an artwork has been selected within the
   * panel. This applies only to artworks that are currently displayed (from displayedArtworks), 
   * which is why this callback limits itself to providing the id of the artwork as only parameter.
   */
  onArtworkSelected?: (artwork: ArtworkData) => void;
  /**
   * Callback to the parent of this panel indicating that an artwork has been deselected from the
   * panel. This applies to both deselecting from currently displayed artworks and from panel of 
   * currently selected artworks (that is, it reflects changes to both displayed and selected Artworks).
   */
  onArtworkDeselected?: (artworkId: string) => void;
  /**
   * Callback to the parent of this panel indicating that an artwork has been clicked from the panel.
   * Note that this is different from selection, as clicking on an artwork just means that the user wishes
   * to explore it (e.g. to get more information about it).
   */
  onArtworkClicked?: (artworkId: string) => void;
  /**
   * Filter applied in this search, if any. This is used to render a list of filters on top of 
   * the current search display and allow users to see which filters have been applied until now
   * and remove them if needed. Trying to remove a filter will trigger the onFilterRemoved callback,
   * if provided.
   */
  appliedFilter?: GetArtworksFilter;
  /**
   * callback to the parent of this panel indicating that the user has performed a search action, with
   * the text introduced in the searchbox when requesting the search. Searchbox text IS stateful, and will 
   * be kept in the internal state of the component.
   */
  onSearchPerformed?: (searchText: string) => void;
  /**
   * dictionary containing all different, unique filter fields that the user might access, as well
   * as the different values that each of those filters considers. E.g. "Date" -> ["1997", "1998", ...].
   * Each of the entries provided here will be used to generate a filtering subpanel with up to maxOptionsShown
   * entries each.
   */
  uniqueFilterFields?: Map<string, { value: string; count: number }[]>;
  /**
   * Callback to notify parent component of the selection of a filter within the filter panel.
   * Receives two arguments as parameters, namely field and filter, to denote the name of 
   * the field for which a filter was selected (e.g. 'Date') and the value of the filter applied
   * (e.g. '1997'), respectively.
   */
  onFilterApplied?: (field: string, filter: string) => void;
  /**
   * Callback to notify parent component of the deselection of a filter within this component.
   * Receives two arguments as parameters, namely field and filter, to denote the name of 
   * the field for which a filter was deselected (e.g. 'Date') and the value of the filter removed
   * (e.g. '1997'), respectively.
   */
  onFilterRemoved?: (field: string, filter: string) => void;
  /**
   * Callback to notify parent component of the deselection of all filters within this component.
   */
  onClearFilters?: () => void;
  /**
   * Can be used to render a loading overlay on top of this component. Useful while fetching the
   * required artworks from the API. If not specified, it will be treated as false.
   */
  loading?: boolean;
};

/**
 * Component to display a collection of artworks and allow for basic selection, filtering, 
 * search and navigation functionalities.
 * 
 * <img src="media://SearchAndSelectManyArtworks.PNG" alt="SearchAndSelectManyArtworks">
 * 
 * @author Pablo Gutiérrez, 2021
 */
export const SearchAndSelectManyArtworks: React.FC<SearchAndSelectManyArtworksProps> = ({
  displayedArtworks,
  pageData,
  onPageChanged,
  selectedArtworks,
  onArtworkSelected,
  onArtworkDeselected,
  onArtworkClicked,
  appliedFilter,
  onSearchPerformed,
  uniqueFilterFields,
  onFilterApplied,
  onFilterRemoved,
  onClearFilters,
  loading = false,
}) => {

  const [selectedArtworksOpen, setSelectedArtworksOpen] = useState<boolean>(false);

  if (loading) {
    return <LoadingOverlay message='Loading' />
  }
  return (
    <ContentCard
      cardTitle='Select Artworks'
      titleAlign='center'
      width='95%'
    >
      <SearchBar
        onSearchPerformed={onSearchPerformed}
      />
      {displayedArtworks && (
        <DisplayPanel>
          <ResultsUpperPanel>
            {pageData && (
              <ResultsWrapper>
                <Results>
                  Showing results{" "} 
                  {(pageData.currentPage - 1) * pageData.itemsPerPage + 1}
                  -
                  {(pageData.currentPage - 1) * pageData.itemsPerPage + displayedArtworks.length}
                </Results>
              </ResultsWrapper>
            )}
            <ShoppingCartContainer>
              <ShoppingCartIcon
                onClick={() => setSelectedArtworksOpen(true)}
              />
            </ShoppingCartContainer>
          </ResultsUpperPanel>

          <VerticalSeparator />

          <ResultsLowerPanel>
            {uniqueFilterFields && (
              <FilterPanel
                onFilterApplied={onFilterApplied}
                uniqueFilterFields={uniqueFilterFields}
                maxOptionsShown={10}
              />
            )}

            <ResultsFiltersAndArtworks>
              <ShowFilters
                onFilterDelete={onFilterRemoved}
                onClear={onClearFilters}
                filters={
                  Object.keys(appliedFilter ?? {})
                    .filter(elem => elem !== 'ids')
                    .map(key => ({
                      field: key,
                      filter: appliedFilter?.[key as keyof GetArtworksFilter] as string
                    }))
                }
              />
              <ArtworkSearchResults
                artworks={displayedArtworks}
                onArtworkDeselected={onArtworkDeselected}
                onArtworkSelected={onArtworkSelected}
                onArtworkClicked={onArtworkClicked}
                selectedArtworks={selectedArtworks.map(elem => elem.id)}
                page={pageData?.currentPage}
                pageTotal={pageData?.itemsPerPage ? ~~(displayedArtworks.length / pageData?.itemsPerPage) + 1 : undefined}
                onPageChange={onPageChanged}
              />
            </ResultsFiltersAndArtworks>

          </ResultsLowerPanel>
        </DisplayPanel>
      )}

      <VerticalSeparator />

      {selectedArtworksOpen && selectedArtworks &&
        <SelectedArtworksPopup
          artworks={selectedArtworks}
          onArtworkRemoved={(id) => {
            if (onArtworkDeselected)
              onArtworkDeselected(id);
          }}
          setPopupOpen={setSelectedArtworksOpen}
        />
      }
    </ContentCard>
  );
};

export default SearchAndSelectManyArtworks;