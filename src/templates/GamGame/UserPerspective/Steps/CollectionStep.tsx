import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ArtworkColumnElement from '../../../../components/ArtworkSelection/ArtworkColumnElement';
import StepTitleCard from '../../../../components/Forms/Cards/StepTitleCard';
import SearchBar from '../../../../components/Forms/SearchBar';
import { ArtworksContext } from '../Screen';
import lineBackground from './../../../../components/line-header-point.png';

const VerticalSeparator = styled.div`
  width: 85%;
  max-width: 960px;
  height: 1px;
  background: url(${lineBackground}) repeat-x 0 center;
  margin-bottom: 10px;
  margin-top: 15px;
  align-self: center;
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  justify-content: center;
  align-items: center;
  margin-bottom: 65px;
`;

const ArtworkGrid = styled.div`
  position: relative;
  height: fit-content;
  width: 100%;
  max-width: 730px;
  display: flex;
  flex-wrap: wrap;
  align-self: top;

  @media (max-width: 768px) {
    justify-content: center;
    padding-top: 15px;
    padding-bottom: 25px;
  }

  @media (min-width: 768px) {
    justify-content: left;
    padding-left: 15px;
  }
`;

export const CollectionStep = (): JSX.Element => {

  const navigate = useNavigate();
  const { artworks } = useContext(ArtworksContext);

  return (
    <Root>
      <StepTitleCard
        stepTitle='Explore the Collection'
        stepDescription={`Here you can find the works included in this activity. Click on any of them to access its information page or interact with its stories.`}
      >
        <VerticalSeparator />
        <SearchBar />
        <ArtworkGrid>
          {artworks.map(elem => (
            <ArtworkColumnElement
              artworkData={elem}
              key={elem.id}
              onCardClicked={() => {
                navigate(`${elem.id}`);
              }}
            />
          ))}
        </ArtworkGrid>
      </StepTitleCard>
    </Root>
  );
}

export default CollectionStep;