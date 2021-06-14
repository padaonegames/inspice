import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { api } from '../services';
import { GetArtworksFilter } from '../services/queries';
import { useAsyncRequest } from '../services/useAsyncRequest';
import ArtworkSelectionCard from './ArtworkSelectionCard';
import RecomendationCard from './RecomendationCard';
import { Close } from '@styled-icons/evaicons-solid/Close';



const Root = styled.div`
 align-self: left;
 align-items: center;
 display: block;
 flex-wrap: wrap;
 flex-direction: row;
 background-color: transparent;
`;

const FilterGrid = styled.div`
 align-self: left;
 display: flex;
 flex-wrap: wrap;
 flex-direction:row;
 background-color: transparent;
`;

const FiltersClose = styled.div`
 background-color: #9e9e9e;
 width: auto;
  height: auto;
  margin: 5px;
  margin-left:0;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  padding-left:10px;
  padding-right:10px;
transition: transform 0.5s ease;
  &:hover{
transition: transform 0.5s ease;
    background-color: #cacaca;
    cursor: pointer;
  }
`;

const FiltersName = styled.div`
 background-color: #F3F3F3;
  width: fit-content;
  height: auto;
  margin: 5px;
  margin-right:0;
  text-align: left;
  line-height: 40px;
  font-size: 20px;
  max-height: 40px;
  padding-left:5px;
  padding-right:5px;
  &:hover{
    cursor: default;
  }
`;

const CloseAll = styled.button`
font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  background-color: #F3F3F3;
 width: auto;
  height: auto;
  margin: 5px;
  padding-left:5px;
  padding-right:5px;
  text-align: center;
  line-height: 40px;
  font-size: 15px;
transition: transform 0.5s ease;
  &:hover{
transition: transform 0.5s ease;
    background-color: #cacaca;
    cursor: pointer;
  }
`;

interface ShowFiltersProps {
  filterName: string[];
  onFilterDelete: (filter: string) => void;
  onClear?: () => void;

};
const ShowFilters: React.FC<ShowFiltersProps> = ({ filterName, onFilterDelete, onClear }) => {

  return (
    <Root>
      {filterName.map((im, i) => (
        <FilterGrid>
          <FiltersName>
            {im}
          </FiltersName>
          <FiltersClose
            onClick={() => onFilterDelete(im)}>
            ×
          </FiltersClose>
        </FilterGrid>
      ))}
      <CloseAll onClick={onClear}>{filterName.length > 0 ? 'Remove All Filters' : ''}
      </CloseAll>

    </Root>
  )
}

export default ShowFilters
