import React, { useState, useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Search } from '@styled-icons/boxicons-regular/Search';

const Background = styled.div`
background-color:rgba(0, 0, 0, 0.5);
width: 100%;
height:100%;
position: fixed;
top:0;
left:0;
z-index:4;
`
const Root = styled.div`
  width: 70vw;
  height: 70vh;
  margin-top: 15vh;
  margin-left: 15vw;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  background-color: rgb(255, 253, 253);
  z-index:5;
`;

const TitleText = styled.h2`
margin-top:1rem;
  align-self: center;
  color: #3f3c2d;
  letter-spacing: +0.5px;
  font-family: Raleway;
`;

const SearchArea = styled.div`
  background-color: #f3f3f3;
  border-style: solid;
  border-color: #cccccc;
  border-width: 1px 0px 1px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 64px;
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
const OptionArea = styled.div`
  width: 100%;
  height: 75%;
  align-self: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top:1rem;
  padding: 1rem;
  overflow-y:scroll;
`;

const OptionContainer = styled.div`
  width: 33%;
  height: 6vh;
  padding-left: 3.5%;
  padding-right: 1.5%;
  align-self: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const OptionText = styled.span`
  align-self: left;
  color: #000000;
  letter-spacing: +0.6px;
  font-size: 0.7em;
  font-weight: 1000;
  font-family: Raleway;
`;

interface FilterPopupProps {
    filterField: string;
    filterOptions: string[];
    filterCounts: number[];
    onFilterSelected: (filter: string) => void;
    setFilterPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FilterPopup: React.FC<FilterPopupProps> = ({
    filterField,
    filterOptions,
    filterCounts,
    onFilterSelected,
    setFilterPopupOpen,
}) => {
    return ReactDOM.createPortal(
        <>
            <Background onClick={() => setFilterPopupOpen(false)} />
            <Root>
                <TitleText>
                    {filterField}
                </TitleText>
                <SearchArea>
                    <SearchBar
                        placeholder="Search by value..."
                    // onChange={(e) => setSearchText(e.target.value)}
                    // onKeyPress={(event) => {
                    //   if (event.key === 'Enter') {
                    //     handleApplyKeywordsFilter(searchText);
                    //   }
                    //  }}
                    />
                    <SearchButton>
                        <SearchIcon />
                    </SearchButton>
                </SearchArea>
                <OptionArea>
                    {
                        filterOptions.sort().map((elem, i) =>
                            <OptionContainer key={elem} onClick={() => onFilterSelected(elem)}>
                                <OptionText>
                                    {elem.length > 50 ? elem.slice(0, 50).concat(' ...') : elem} ({filterCounts.length > i && filterCounts[i]})
                                </OptionText>
                            </OptionContainer>
                        )}
                </OptionArea>
            </Root>
        </>
        , document.body);
};

export default FilterPopup;