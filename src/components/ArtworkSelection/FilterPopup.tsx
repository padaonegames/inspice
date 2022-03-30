import React, { useState } from "react";
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';
import { ChevronBackCircle } from '@styled-icons/ionicons-sharp/ChevronBackCircle';
import { ChevronForwardCircle } from '@styled-icons/ionicons-sharp/ChevronForwardCircle';
import { Close } from '@styled-icons/evaicons-solid/Close';
import { ArrowBack } from '@styled-icons/evaicons-solid/ArrowBack';
import MediaQuery from "react-responsive";
import SearchBar from "../Forms/SearchBar";

const Background = styled.div`
  @media (max-width: 768px) {
    background-color: ${props => props.theme.cardBackground};
  }

  @media (min-width: 768px) {
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
  }
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`;

const Root = styled.div`

  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    overflow: scroll;
    margin-top: 65px;
    left: 0;
    top: 0;
  }

  @media (min-width: 768px) {
    background-color: ${props => props.theme.cardBackground};
    max-width: 740px;
    width: 80%;
    top: 200px;
    left: 50%;
    transform: translate(-50%, 0%);
    justify-content: center;
  }

  z-index: 11;
`;

const CloseIcon = styled(Close)`
  color: lightgray;
  cursor: pointer;
  top: 1.35em;
  right: 0.65em;
  height: 35px;
  align-self: flex-end;
  position: absolute;
  &:hover {
    color: darkgray;
  }
`;

const BackIcon = styled(ArrowBack)`
  color: ${props => props.theme.textColor};
  cursor: pointer;
  top: 25px;
  left: 20px;
  height: 30px;
  align-self: flex-start;
  position: absolute;
`;

const TitleText = styled.h1`
  color: ${props => props.theme.textColor};
  letter-spacing: +0.5px;
  font-family: Raleway;
  text-transform: uppercase;
  padding: 1.35em 0 0.65em 0;
  width: 90%;
  align-self: center;
  text-align: center;

  font-size: 1.35em;
`;

const SearchContainer = styled.div`
  background-color: #F3F3F3;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

interface OptionAreaProps {
  oneColumn: boolean;
};

const OptionArea = styled.div<OptionAreaProps>`
  width: ${props => props.oneColumn ? '95%' : '600px'};
  height: ${props => props.oneColumn ? 'auto' : '320px'};
  align-self: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0.5em 2em 2em 2em;
  padding: 2em;
  overflow-y: hidden;
  border-bottom: 1px solid #dcdcdc;
`;

interface OptionContainerProps {
  oneColumn: boolean;
};

const OptionContainer = styled.ul<OptionContainerProps>`
  width: ${props => props.oneColumn ? '85%' : '40%'};
  height: 100%;
  margin-left:  ${props => props.oneColumn ? '0' : '20px'};
  margin-right: 0;
  text-align:  ${props => props.oneColumn ? 'center' : 'left'};
  position: relative;
  left:  ${props => props.oneColumn ? '0' : '8%'};
  align-self: center;
  overflow: hidden;
`;

const OptionText = styled.li`
  align-self: left;
  color: ${props => props.theme.textColor};
  letter-spacing: +0.6px;
  font-size: 0.8em;
  font-weight: 500;
  font-family: Raleway;
  cursor: pointer;
  line-height: 1.65em;
  list-style: none;
  &:hover {
    text-decoration: underline;
  }
`;

const NavigationStyle = css`
  padding: 0;
  cursor: pointer;
  height: 40px;
  width: 40px;
  margin: auto;
  opacity: 0.4;
  transition: opacity 0.4s;
  display: block;
  color: ${props => props.theme.textColor};
  &:hover {
    opacity: 0.6;
  }
`;

const NavBack = styled(ChevronBackCircle)`
  ${NavigationStyle}
`;

const NavForward = styled(ChevronForwardCircle)`
  ${NavigationStyle}
`;

const NavContainer = styled.div`
  height: 100%;
  width: 7.5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export interface FilterPopupProps {
  /** Display name of the filter category. */
  filterField: string;
  /** Array of filter options for the given category. */
  filterOptions: string[];
  /** Array of numbers that are used in order as ids for the filters. */
  filterCounts: number[];
  /** Callback to the parent component specifying that a specific filter has been selected within this category. */
  onFilterSelected?: (filter: string) => void;
  /** Callback to the parent component specifying whether we want to close this component. */
  setFilterPopupOpen?: (opened: boolean) => void;
};

/**
 * Popup component to explore a list of filtering options that can be applied to a given filtering field
 */
export const FilterPopup = (props: FilterPopupProps) => {

  const {
    filterField,
    filterOptions,
    filterCounts,
    onFilterSelected,
    setFilterPopupOpen,
  } = props;

  const [filters, setFilters] = useState<string[]>(filterOptions);
  const [counts, setCounts] = useState<number[]>(filterCounts);
  const [page, setPage] = useState<number>(0);

  const handleSearch = (keywords: string) => {
    setFilters([]);
    setCounts([]);
    var keys: string[] = keywords.split(' ');
    var txt: string = keywords;
    keys.forEach((key) => {
      txt = txt.concat("|").concat(key);
    })
    var regTxt = new RegExp(txt, "i");
    filterOptions.forEach((filter, index) => {
      if ((filter.match(regTxt))) {
        setFilters(prev => prev.concat([filterOptions[index]]));
        setCounts(prev => prev.concat([filterCounts[index]]));
      }
    })
  };

  const sortedFilters = filters.sort();

  return ReactDOM.createPortal(
    <>
      <Background onClick={() => {
        if (setFilterPopupOpen)
          setFilterPopupOpen(false)
      }} />
      <Root>
        <TitleText>
          {filterField}
        </TitleText>

        <MediaQuery maxWidth={768}>
          <BackIcon onClick={() => {
            if (setFilterPopupOpen)
              setFilterPopupOpen(false)
          }} />
        </MediaQuery>

        <MediaQuery minWidth={768}>
          <CloseIcon onClick={() => {
            if (setFilterPopupOpen)
              setFilterPopupOpen(false)
          }} />
        </MediaQuery>

        <SearchContainer>
          <SearchBar
            placeholder="Search by value..."
            onSearchPerformed={handleSearch}
          />
        </SearchContainer>

        <OptionArea oneColumn>
          <NavContainer>
            <NavBack onClick={() => {
              if (page > 0)
                setPage(prev => prev - 1);
            }} />
          </NavContainer>
          <OptionContainer oneColumn>
            {
              (filters.length === 0 &&
                <OptionText>No Record Found</OptionText>
              )
            }
            {sortedFilters.slice(page * 22, (page + 1) * 22).map((elem, i) => (
              <OptionText>
                {elem.length > 50 ? elem.slice(0, 50).concat(' ...') : elem} ({counts.length > i && counts[i]})
              </OptionText>
            ))}
          </OptionContainer>

          <NavContainer>
            <NavForward onClick={() => {
              if ((page + 1) * 22 < sortedFilters.length)
                setPage(prev => prev + 1);
            }} />
          </NavContainer>
        </OptionArea>
      </Root>
    </>
    , document.body);
};

export default FilterPopup;