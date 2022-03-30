import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import FilterPopup from './FilterPopup';

interface RootProps {
  bottomBorder: boolean;
};

const Root = styled.div<RootProps>`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 100%;
  ${props => props.bottomBorder && 'border-bottom: 1px solid lightgray;'}
`;

interface FieldHeaderProps {
  bottomBorder: boolean;
};

const FieldHeader = styled.h2<FieldHeaderProps>`
  text-transform: uppercase;
  margin-bottom: 10px;
  font-size: 18px;
  width: 100%;
  padding: 17px 0;
  text-align: left !important;
  align-self: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${props => props.bottomBorder && 'border-bottom: 1px solid lightgray;'}
  border-top: 1px solid lightgray;
  cursor: pointer;
`;

const FieldText = styled.span`
  align-self: center;
  color: ${props => props.theme.textColor};
  letter-spacing: +0.5px;
  font-size: 0.75em;
  font-weight: 1000;
  font-family: Raleway;
`;

const OptionContainer = styled.div`
  width: 100%;
  height: 30px;
  padding-right: 1.5%;
  align-self: center;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  text-decoration-color: ${props => props.theme.fadedContentColor};
  &:hover {
    text-decoration: underline;
    text-decoration-color: ${props => props.theme.fadedContentColor};
  }
`;

const OptionText = styled.span`
  align-self: center;
  color: #9d9d9d;
  letter-spacing: +0.5px;
  font-size: 0.85em;
  font-weight: 1000;
  font-family: Raleway;
`;
const OptionSeeAll = styled.span`
  padding-top: 3%;
  padding-bottom: 4%;
  color: #9d9d9d;
  letter-spacing: +1.5px;
  font-size: 0.75em;
  font-weight: 700;
  font-family: Raleway;
  :hover{
    cursor: pointer;
  }
`;

const ExpandIcon = styled.span`
  align-self: center;
  color: darkgray;
  letter-spacing: +0.5px;
  font-size: 1em;
  font-weight: 700;
  font-family: Raleway;
`;

export interface FilterFieldProps {
  /** Display name of the filter category. */
  filterField: string;
  /** Array of filter options for the given category. */
  filterOptions: string[];
  /** Array of numbers that are used in order as ids for the filters. */
  filterCounts: number[];
  /** Whether to render a bottom border (this is useful when displaying a sequence of filter categories). */
  bottomBorder?: boolean;
  /** Maximum number of options to be shown to the user before expanding the list */
  maxOptionsShown?: number;
  /** Callback to the parent component specifying that a specific filter has been selected within this category */
  onFilterSelected: (filter: string) => void;
};

/**
 * Component to display a list of filters that can be applied to a search.
 * Initially displays up to `maxOptionsShown` filter options, with the possibility to
 * show a complete list of options with navigation and search functionalities by clicking
 * on *See All*.
 */
export const FilterField: React.FC<FilterFieldProps> = ({
  filterField,
  filterOptions,
  filterCounts,
  bottomBorder = true,
  maxOptionsShown = filterOptions.length,
  onFilterSelected,
}) => {

  const [opened, setOpened] = useState<boolean>(false);
  const [filterPopupOpen, setFilterPopupOpen] = useState<boolean>(false);

  useEffect(() => {

    const noScroll = () => {
      window.scrollTo(0, 0);
    };

    if (filterPopupOpen) {
      window.addEventListener("scroll", noScroll);
      document.body.style.overflow = 'hidden';
    }
    else {
      window.removeEventListener("scroll", noScroll);
      document.body.style.overflow = 'visible';
    }

    return () => window.removeEventListener("scroll", noScroll);

  }, [filterPopupOpen]);

  return (
    <Root bottomBorder={bottomBorder} key={filterField}>
      <FieldHeader
        onClick={() => setOpened(prev => !prev)}
        bottomBorder={opened}
      >
        <FieldText>
          {filterField}
        </FieldText>
        <ExpandIcon>
          {opened ? '-' : '+'}
        </ExpandIcon>
      </FieldHeader>
      {opened &&
        filterOptions.sort().slice(0, 5).map((elem, i) =>
          <OptionContainer key={elem} onClick={() => onFilterSelected(elem)}>
            <OptionText>
              {elem} ({filterCounts.length > i && filterCounts[i]})
            </OptionText>
          </OptionContainer>
        )}
      {opened &&
        <OptionSeeAll
          onClick={() => setFilterPopupOpen(true)}>
          SEE ALL ▶
        </OptionSeeAll>}
      {filterPopupOpen &&
        <FilterPopup
          filterField={filterField}
          filterOptions={filterOptions}
          filterCounts={filterCounts}
          onFilterSelected={onFilterSelected}
          setFilterPopupOpen={setFilterPopupOpen}
        />
      }
    </Root>
  );
};

export default FilterField;