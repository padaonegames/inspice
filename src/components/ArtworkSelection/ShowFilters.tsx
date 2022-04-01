import React from 'react';
import styled from 'styled-components';


const Root = styled.div`
  width: 100%;
  max-width: 730px;
  align-items: center;
  align-self: center;
  flex-wrap: wrap;
  padding-left: 15px;
  flex-direction: row;
  background-color: transparent;
`;

const FilterGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction:row;
  background-color: transparent;
`;

const FiltersClose = styled.div`
  color: white;
  background-color: #636363;
  width: auto;
  height: auto;
  margin: 5px;
  margin-left:0;
  text-align: center;
  line-height: 40px;
  font-size: 1.5em;
  font-weight: 700;
  padding-left:10px;
  padding-right:10px;
  cursor: pointer;
`;

const FiltersName = styled.div`
  color: white;
  display: flex;
  align-items: center;
  font-family: 'EB Garamond';
  font-size: 1em;
  background-color: #7f7f7f;
  width: fit-content;
  height: auto;
  margin: 5px;
  margin-right: 0;
  text-align: left;
  line-height: 30px;
  max-height: 40px;
  padding-left:5px;
  padding-right:5px;
  cursor: default;
`;

const CloseAll = styled.button`
  color: #ac2a23;
  font-family: 'EB Garamond';
  font-size: 1em;
  width: auto;
  height: auto;
  margin: 5px;
  padding-left:5px;
  padding-right:5px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  border: 1px solid #e0e0e0;
`;

export interface ShowFiltersProps {
  /**
   * Currently applied filters. Each entry must contain the name of the field
   * over which the corresponding filter is applied, and the value of the filter
   * itself. Fields will not be displayed, but they are needed to notify the parent component
   * about the removal of a given filter.
   */
  filters: { field: string, filter: string }[];
  /**
   * Callback to notify parent component of the deselection of a filter within this component.
   * Receives two arguments as parameters, namely field and filter, to denote the name of 
   * the field for which a filter was deselected (e.g. 'Date') and the value of the filter removed
   * (e.g. '1997'), respectively.
   */
  onFilterDelete?: (field: string, filter: string) => void;
  /**
   * Callback to notify parent component of the deselection of all filters within this component.
   */
  onClear?: () => void;
};

/**
 * Component to display an array of applied filters for a given artwork search.
 * Provides an option to remove any given filter from the array, as well as a button
 * to clear all filters simultaneously.
 * 
 * <img src="media://ShowFilters.PNG" alt="ShowFilters">
 */
export const ShowFilters: React.FC<ShowFiltersProps> = ({
  filters,
  onFilterDelete,
  onClear
}) => {

  return (
    <Root>
      {filters.map((elem) => (
        <FilterGrid key={`${elem.field}-${elem.filter}`}>
          <FiltersName>
            {elem.filter}
          </FiltersName>
          <FiltersClose
            onClick={() => {
              if (onFilterDelete)
                onFilterDelete(elem.field, elem.filter)
            }}>
            ×
          </FiltersClose>
        </FilterGrid>
      ))}
      {filters.length > 0 &&
        <CloseAll onClick={onClear}>
          Clear all
        </CloseAll>
      }
    </Root>
  )
}

export default ShowFilters
