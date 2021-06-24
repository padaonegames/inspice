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

interface ShowFiltersProps {
  filterName: string[];
  onFilterDelete: (filterName: string) => void;
  onClear: () => void;
};

const ShowFilters: React.FC<ShowFiltersProps> = ({ filterName, onFilterDelete, onClear }) => {

  return (
    <Root>
      {filterName.map((im, i) => (
        <FilterGrid key={i}>
          <FiltersName>
            {im}
          </FiltersName>
          <FiltersClose
            onClick={() => onFilterDelete(im)}>
            ×
          </FiltersClose>
        </FilterGrid>
      ))}
      {filterName.length > 0 &&
        <CloseAll onClick={onClear}>
          Clear all
        </CloseAll>
      }
    </Root>
  )
}

export default ShowFilters
