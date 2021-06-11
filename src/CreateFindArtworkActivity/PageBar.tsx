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
import { ArrowRight } from '@styled-icons/bootstrap/ArrowRight'

const Root = styled.div`
  padding-top: 2.5vh;
  display: flex;
  flex-direction: column;
  width: 72.5%;
  align-self: center;
`;

const PageNumberGrid = styled.div`
  height: auto;
  width: 100vh;
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
interface PageBarProps {
    currentPage: number;
    numberOfPages: number;
    onPageSelected: (page: number) => void;

};
const PageBar: React.FC<PageBarProps> = ({ currentPage, numberOfPages, onPageSelected }) => {
    const testArray: number[] = Array.from(Array(numberOfPages).keys());

    return (
        <PageNumberGrid>
            <NumberIcon
                UsingNumber={"first"}
                Selected={false}
                onClick={() => onPageSelected(1)}
            />
            <NumberIcon
                UsingNumber={"←"}
                Selected={false}
                onClick={() => {
                  /*  if (4 < currentPage) {
                        onPageSelected(currentPage - 4);
                    }
                    else */ if (1 < currentPage) {
                        onPageSelected(currentPage - 1);
                    }
                }}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            {testArray.slice(currentPage - 1, currentPage + 3).map((im, i) => (
                <NumberIcon
                    Selected={im === currentPage - 1}
                    onClick={() => onPageSelected(im + 1)}
                    UsingNumber={im + 1}
                />
            ))}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <NumberIcon
                UsingNumber={"→"}
                Selected={false}
                onClick={() => {
                  /*  if (currentPage + 4 < numberOfPages) {
                        onPageSelected(currentPage + 4);
                    }
                    else*/ if (currentPage + 1 < numberOfPages) {
                        onPageSelected(currentPage + 1);
                    }
                }}
            />
            <NumberIcon
                UsingNumber={"last (" + numberOfPages.toString() + ")"}
                Selected={false}
                onClick={() => onPageSelected(numberOfPages)}
            />
        </PageNumberGrid>
    )
}

export default PageBar
