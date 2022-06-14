import React, { useState } from 'react';
import styled from 'styled-components';

// icon imports
import { Search } from '@styled-icons/boxicons-regular/Search';

const SearchArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 95%;
  max-width: 750px;
  height: auto;
  align-self: center;
`;

const SearchBarInput = styled.input`
  font-size: 14px;
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
  height: 2.75em;
  width: 80%;
`;

const SearchButton = styled.div`
  height: 2.4em;
  width: 15%;
  padding: 0.25em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c44c49;
  border-radius: 0 0.5em 0.5em 0;
  &:hover{
    cursor:pointer;
  }
`;

const SearchIcon = styled(Search)`
  width: 1.5em;
  height: 1.5em;
  color: white;
  margin: auto;
`;

export interface SearchBarProps {
  /**
   * Callback to the parent of this panel indicating that the user has performed a search action, with
   * the text introduced in the searchbox when requesting the search. Searchbox text is stateful, and will 
   * be kept in the internal state of the component.
   */
  onSearchPerformed?: (searchText: string) => void;
  /** Text to display when the value is empty or undefined */
  placeholder?: string;
};

/**
 * <img src="media://SearchBar.PNG" alt="SearchBar">
 */
export const SearchBar = (props: SearchBarProps): JSX.Element => {

  const {
    onSearchPerformed,
    placeholder = "Search by title..."
  } = props;

  const [searchText, setSearchText] = useState<string>('');

  return (
    <SearchArea>
      <SearchBarInput
        placeholder={placeholder}
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