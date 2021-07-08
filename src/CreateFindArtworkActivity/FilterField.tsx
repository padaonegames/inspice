import React, { useState } from 'react';
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

const FieldHeader = styled.div<FieldHeaderProps>`
  width: 100%;
  height: 5vh;
  padding-left: 3.5%;
  padding-right: 1.5%;
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
  color: #525252;
  letter-spacing: +0.5px;
  font-size: 0.75em;
  font-weight: 1000;
  font-family: Raleway;
`;

const OptionContainer = styled.div`
  width: 100%;
  height: 4vh;
  padding-left: 3.5%;
  padding-right: 1.5%;
  align-self: center;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const OptionText = styled.span`
  align-self: center;
  color: #9d9d9d;
  letter-spacing: +0.5px;
  font-size: 0.6em;
  font-weight: 1000;
  font-family: Raleway;
`;
const OptionSeeAll = styled.span`
  padding: 3% ;
  color: #6b6b6b;
  letter-spacing: +1.5px;
  font-size: 0.8em;
  font-weight: 1000;
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

interface FilterFieldProps {
  filterField: string;
  filterOptions: string[];
  filterCounts: number[];
  bottomBorder?: boolean;
  maxOptionsShown?: number;
  onFilterSelected: (filter: string) => void;
  // TODO: show button
};

const FilterField: React.FC<FilterFieldProps> = ({
  filterField,
  filterOptions,
  filterCounts,
  bottomBorder = true,
  maxOptionsShown = filterOptions.length,
  onFilterSelected,
}) => {

  const [opened, setOpened] = useState<boolean>(false);
  const [FilterPopupOpen, setFilterPopupOpen] = useState<boolean>(false);

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
      {opened && <OptionSeeAll
        onClick={() => setFilterPopupOpen(true)}>
        SEE ALL ▶</OptionSeeAll>}
      {FilterPopupOpen &&
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