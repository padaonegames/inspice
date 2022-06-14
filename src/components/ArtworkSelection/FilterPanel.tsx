import { useState } from 'react';
import ReactDOM from 'react-dom';
import MediaQuery from 'react-responsive';
import styled from 'styled-components';
import FilterField from './FilterField';
import { ArrowBack } from '@styled-icons/evaicons-solid/ArrowBack';

const FilterPanelDiv = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    max-width: 690px;
    align-self: center;
  }

  @media (min-width: 768px) {
    width: 22.5%;
    max-width: 256px;
  }
`;

const FilterPanelButton = styled.div`
  width: 100%;
  height: 40px;
  background-color: ${props => props.theme.textColor};
  color: ${props => props.theme.cardBackground};
  text-transform: uppercase;
  justify-content: center;
  display: flex;
  display-direction: column;
  align-items: center;
  font-size: 14px;
  font-weight: 500px;
  cursor: pointer;
  box-shadow: rgba(0,0,0,0.3) 1px 1px 3px;
  font-family: ${props => props.theme.clickableTextFont};
  margin: 0 8px 20px 0;
`;

export interface FilterPanelProps {
  /**
   * Dictionary containing all different, unique filter fields that the user might access, as well
   * as the different values that each of those filters considers. E.g. "Date" -> ["1997", "1998", ...].
   * Each of the entries provided here will be used to generate a filtering subpanel with up to maxOptionsShown
   * entries each.
   */
  uniqueFilterFields: Map<string, { value: string; count: number }[]>;
  /**
   * Maximum number of entries to display for each filter field. Additional
   * entries may be inspected by using the see all button at the bottom of 
   * each field's subpanel.
   */
  maxOptionsShown: number;
  /**
   * Callback to notidy parent component of the selection of a filter within the panel.
   * Receives two arguments as parameters, namely field and filter, to denote the name of 
   * the field for which a filter was selected (e.g. 'Date') and the value of the filter applied
   * (e.g. '1997'), respectively.
   */
  onFilterApplied?: (field: string, filter: string) => void;
};

/**
 * <img src="media://FilterPanel.PNG" alt="FilterPanel">
 */
export const FilterPanel = (props: FilterPanelProps): JSX.Element => {

  const {
    uniqueFilterFields,
    maxOptionsShown,
    onFilterApplied,
  } = props;

  const getMapKeys = () => {
    return Array.from(uniqueFilterFields.keys());
  };

  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <FilterPanelDiv>
      <MediaQuery maxWidth={768}>
        <FilterPanelButton onClick={() => setExpanded(prev => !prev)}>
          Filter Results
        </FilterPanelButton>
        {expanded && <FilterPanelExpandedMobile {...props} onExitPanel={() => setExpanded(false)} />}
      </MediaQuery>
      <MediaQuery minWidth={768}>
        {getMapKeys().map(key =>
          <FilterField
            key={key}
            filterField={key.toUpperCase()}
            filterOptions={uniqueFilterFields.get(key)?.map(elem => elem.value) ?? []}
            filterCounts={uniqueFilterFields.get(key)?.map(elem => elem.count) ?? []}
            bottomBorder={false}
            maxOptionsShown={maxOptionsShown}
            onFilterSelected={(filter: string) => {
              if (onFilterApplied)
                onFilterApplied(key, filter);
            }}
          />
        )}
      </MediaQuery>
    </FilterPanelDiv>
  );
};

const Background = styled.div`
  background-color: ${props => props.theme.cardBackground};
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
`;

const Root = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  left: 0;
  top: 65px;
  z-index: 5;
  overflow: scroll;
`;

const FilterResultsTitle = styled.h1`
  color: ${props => props.theme.textColor};
  letter-spacing: +0.5px;
  font-family: Raleway;
  text-transform: uppercase;
  padding: 0 0 1em 0;
  width: 90%;
  align-self: center;
  text-align: center;

  font-size: 1.35em;
`;

const BackIcon = styled(ArrowBack)`
  color: ${props => props.theme.textColor};
  cursor: pointer;
  top: 25px;
  height: 30px;
  align-self: flex-start;
  position: absolute;
`;

interface FilterPanelExpandedMobileProps extends FilterPanelProps {
  onExitPanel?: () => void;
};

const FilterPanelExpandedMobile = (props: FilterPanelExpandedMobileProps): JSX.Element => {

  const {
    uniqueFilterFields,
    maxOptionsShown,
    onFilterApplied,
  } = props;

  const getMapKeys = () => {
    return Array.from(uniqueFilterFields.keys());
  };

  return ReactDOM.createPortal(
    <>
      <Background />
      <Root >
        <BackIcon onClick={() => {
          if (props.onExitPanel)
            props.onExitPanel();
        }} />
        <FilterResultsTitle>
          Filter Results
        </FilterResultsTitle>
        {getMapKeys().map((key, i) =>
          <FilterField
            key={key}
            filterField={key.toUpperCase()}
            filterOptions={uniqueFilterFields.get(key)?.map(elem => elem.value) ?? []}
            filterCounts={uniqueFilterFields.get(key)?.map(elem => elem.count) ?? []}
            bottomBorder={i === getMapKeys().length - 1}
            maxOptionsShown={maxOptionsShown}
            onFilterSelected={(filter: string) => {
              if (onFilterApplied) {
                onFilterApplied(key, filter);
                if (props.onExitPanel)
                  props.onExitPanel();
              }
            }}
          />
        )}
      </Root>
    </>,
    document.body);
}

export default FilterPanel;