import React, { useState } from 'react';
import styled from 'styled-components';

// icon imports
import { Search } from '@styled-icons/boxicons-regular/Search';

const SearchArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 64px;
  margin-bottom: 20px;
`;

const SearchBarInput = styled.input`
  font-size: 0.9em;
  letter-spacing: +1px;
  font-family: Raleway;
  font-weight: 500;
  color: black;
  resize: none;
  text-align: left;
  padding-left: 10px;
  display: table-cell;
  border: 1px solid #e5e5e5;
  width: 600px;
  height: 39px;
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

export interface SearchBarProps {
  /**
   * callback to the parent of this panel indicating that the user has performed a search action, with
   * the text introduced in the searchbox when requesting the search. Searchbox text IS stateful, and will 
   * be kept in the internal state of the component.
   */
   onSearchPerformed?: (searchText: string) => void;
};

/**
 * <img src="media://SearchBar.PNG" alt="SearchBar">
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  onSearchPerformed
}) => {

  const [searchText, setSearchText] = useState<string>('');
  
  return (
    <SearchArea>
      <SearchBarInput
        placeholder="Search by title..."
        onChange={(e) => setSearchText(e.target.value)}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            onSearchPerformed?.(searchText);
          }
        }}
      />
      <SearchButton onClick={() => onSearchPerformed?.(searchText)}>
        <SearchIcon />
      </SearchButton>
    </SearchArea>
  );
};

export default SearchBar;