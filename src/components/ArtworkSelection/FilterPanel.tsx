import React from 'react';
import styled from 'styled-components';
import FilterField from '../../CreateFindArtworkActivity/FilterField';

const FilterPanelDiv = styled.div`
  width: 25%;
  max-width: 240px;
  min-width: 195px;
`;

export interface FilterPanelProps {
  /**
   * dictionary containing all different, unique filter fields that the user might access, as well
   * as the different values that each of those filters considers. E.g. "Date" -> ["1997", "1998", ...].
   * Each of the entries provided here will be used to generate a filtering subpanel with up to maxOptionsShown
   * entries each.
   */
  uniqueFilterFields: Map<string, { value: string; count: number }[]>;
  /**
   * Maximum number of entries to display for each filter field. Additional
   * entries may be inspected by using the see all button at the bottom of 
   * each field's subpanel.
   */
  maxOptionsShown: number;
  /**
   * Callback to notidy parent component of the selection of a filter within the panel.
   * Receives two arguments as parameters, namely field and filter, to denote the name of 
   * the field for which a filter was selected (e.g. 'Date') and the value of the filter applied
   * (e.g. '1997'), respectively.
   */
  onFilterApplied?: (field: string, filter: string) => void;
};

export const FilterPanel: React.FC<FilterPanelProps> = ({
  uniqueFilterFields,
  maxOptionsShown,
  onFilterApplied,
}) => {

  const getMapKeys = () => {
    return Array.from(uniqueFilterFields.keys());
  };

  return (
    <FilterPanelDiv>
      {getMapKeys().map(key =>
        <FilterField
          key={key}
          filterField={key.toUpperCase()}
          filterOptions={uniqueFilterFields.get(key)?.map(elem => elem.value) ?? []}
          filterCounts={uniqueFilterFields.get(key)?.map(elem => elem.count) ?? []}
          bottomBorder={false}
          maxOptionsShown={maxOptionsShown}
          onFilterSelected={(filter: string) => {
            if (onFilterApplied)
              onFilterApplied(key, filter);
          }}
        />
      )}
    </FilterPanelDiv>
  );
};

export default FilterPanel;