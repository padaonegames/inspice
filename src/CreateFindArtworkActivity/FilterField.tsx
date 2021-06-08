import React, { useState } from 'react';
import styled from 'styled-components';

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
  color: #6c6c6c;
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
  cursor: pointer;
`;

const OptionText = styled.span`
  align-self: center;
  color: #9d9d9d;
  letter-spacing: +0.5px;
  font-size: 0.6em;
  font-weight: 1000;
  font-family: Raleway;
  &:hover {
    text-decoration: underline;
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
  bottomBorder?: boolean;
};

const FilterField: React.FC<FilterFieldProps> = ({
  filterField,
  filterOptions,
  bottomBorder = true,
}) => {

  const [opened, setOpened] = useState<boolean>(false);

  return (
    <Root bottomBorder={bottomBorder}>
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
        filterOptions.map(elem =>
          <OptionContainer>
            <OptionText>
              {elem}
            </OptionText>
          </OptionContainer>
        )}
    </Root>
  );
};

export default FilterField;