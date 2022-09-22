import styled from "styled-components";
import { SearchAndSelectManyArtworks } from "../../../../components/ArtworkSelection/index";
import { StepComponentProps } from "../../../../components/Navigation/Steps";
import { gamArtworksService } from "../../../../services";
import { ArtworkData } from "../../../../services/artwork.model";
import { GetArtworksFilter } from "../../../../services/queries";
import { useAsyncRequest } from "../../../../services/useAsyncRequest";
import { cloneDeep } from "lodash";

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
  const page: number = props.getState<number>("page", 1);
  const itemsPerPage: number = props.getState<number>("itemsPerPage", 30);
  const appliedFilter: GetArtworksFilter = props.getState<GetArtworksFilter>(
    "appliedFilter",
    {}
  );

  const handleApplyFilter = (field: string, filter: string) => {
    // only support specific types
    if ("date" !== field && "author" !== field && "info" !== field) return;

    // make a copy of current filter, add new filter and save result
    let newFilter: GetArtworksFilter = cloneDeep(appliedFilter);
    console.log(newFilter);
    newFilter[field] = filter;
    props.setState("appliedFilter", newFilter, {});

    props.setState("page", 1, 1);
  };

  const handleRemoveFilter = (field: string, filter: string) => {
    // only support specific types
    if ("date" !== field && "author" !== field && "info" !== field) return;

    // make a copy of current filter, remove filter and save result
    let newFilter: GetArtworksFilter = cloneDeep(appliedFilter);
    newFilter[field] = undefined;
    delete newFilter[field];
    props.setState("appliedFilter", newFilter, {});

    props.setState("page", 1, 1);
  };

  const handleClearFilters = () => {
    props.setState("appliedFilter", {}, {});
    props.setState("page", 1, 1);
  };

  const handleApplyKeywordsFilter = (keywords: string) => {
    let newFilter: GetArtworksFilter = cloneDeep(appliedFilter);
    newFilter.titleKeywords = keywords;
    props.setState("appliedFilter", newFilter, {});
    props.setState("page", 1, 1);
  };

  //--------------------------------------------------
  //            API CALLS AND REQUESTS
  //--------------------------------------------------
  const fetchArtworksFromDataset = async () => {
    return gamArtworksService.fetchArtworks({
      sortingField: "title",
      pageNumber: page,
      pageSize: itemsPerPage,
      filter: appliedFilter,
    });
  };

  const fetchUniqueFieldValuesFromDataset = async (
    field: "date" | "author" | "info"
  ) => {
    return gamArtworksService.fetchUniqueFieldValues(field);
  };

  const fetchStepData = async () => {
    return Promise.all([
      fetchArtworksFromDataset(),
      fetchUniqueFieldValuesFromDataset("date"),
      fetchUniqueFieldValuesFromDataset("author"),
      fetchUniqueFieldValuesFromDataset("info"),
    ]);
  };

  // API Requests to fetch artworks and unique filtering fields
  const [fetchDataStatus] = useAsyncRequest(fetchStepData, [
    page,
    itemsPerPage,
    appliedFilter,
  ]);

  // Whether we are in a loading state (if API requests have not been completed yet)
  const loading = !(
    fetchDataStatus.kind === "success" &&
    fetchDataStatus.result.every((elem) => elem.kind === "ok")
  );

  //--------------------------------------------------
  //          RENDERING METHODS AND UTILS
  //--------------------------------------------------
  /**
   * Returns computed page data.
   */
  const getPageData = ():
    | { currentPage: number; pageTotal: number; itemsPerPage: number }
    | undefined => {
    if (
      fetchDataStatus.kind === "success" &&
      fetchDataStatus.result[0].kind === "ok"
    ) {
      const count = fetchDataStatus.result[0].data.count; // total number of artworks
      return {
        currentPage: page,
        itemsPerPage: itemsPerPage,
        pageTotal: itemsPerPage <= 0 ? 1 : ~~(count / itemsPerPage) + 1,
      };
    } else return undefined;
  };

  /**
   * Returns memoized version of displayed artworks from API.
   */
  const getDisplayedArtworks = () => {
    if (
      fetchDataStatus.kind === "success" &&
      fetchDataStatus.result[0].kind === "ok"
    ) {
      return fetchDataStatus.result[0].data.artworks; // result artworks
    } else return [];
  };

  /**
   * Returns a memoized version of unique filtering fields based on API call results (partial:
   * will return the results of all completed calls, even if there are still some running ones)
   */
  const getUniqueFilterFields = (): Map<
    string,
    { value: string; count: number }[]
  > => {
    let uniqueFilterFields = new Map<
      string,
      { value: string; count: number }[]
    >();

    if (fetchDataStatus.kind === "success") {
      if (fetchDataStatus.result[1].kind === "ok") {
        uniqueFilterFields.set("date", fetchDataStatus.result[1].data);
      }

      if (fetchDataStatus.result[2].kind === "ok") {
        uniqueFilterFields.set("author", fetchDataStatus.result[2].data);
      }

      if (fetchDataStatus.result[3].kind === "ok") {
        uniqueFilterFields.set("info", fetchDataStatus.result[3].data);
      }
    }

    return uniqueFilterFields;
  };

  const handleArtworkSelected = (artwork: ArtworkData) => {
    props.setState<ArtworkData[]>(
      "selectedArtworks",
      (prev) => [...prev, artwork],
      []
    );
    props.setState<string[]>("artworks", (prev) => [...prev, artwork.id], []);
  };

  const handleArtworkDeselected = (artworkId: string) => {
    props.setState<ArtworkData[]>(
      "selectedArtworks",
      (prev) => prev.filter((e) => e.id !== artworkId),
      []
    );
    props.setState<string[]>(
      "artworks",
      (prev) => prev.filter((e) => e !== artworkId),
      []
    );
  };

  //--------------------------------------------------
  //                  RENDERING
  //--------------------------------------------------
  return (
    <Root>
      <SearchAndSelectManyArtworks
        displayedArtworks={getDisplayedArtworks()}
        pageData={getPageData()}
        onPageChanged={(newPage) => props.setState<number>("page", newPage, 1)}
        selectedArtworks={props.getState<ArtworkData[]>("selectedArtworks", [])}
        onArtworkSelected={handleArtworkSelected}
        onArtworkDeselected={handleArtworkDeselected}
        appliedFilter={appliedFilter}
        onSearchPerformed={handleApplyKeywordsFilter}
        uniqueFilterFields={getUniqueFilterFields()}
        onFilterApplied={handleApplyFilter}
        onFilterRemoved={handleRemoveFilter}
        onClearFilters={handleClearFilters}
        loading={loading}
      />
    </Root>
  );
};

export default SelectArtworksStep;
