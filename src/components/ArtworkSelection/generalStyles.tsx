import styled from "styled-components";

export const CardImage = styled.img`
  background-color: ${props => props.theme.artworkDisplayBackground};
  max-height: 18rem;
  min-height: 290px;
  width: 100%;
  min-width: 290px;
  max-width: 18rem;
  object-fit: contain;
  border-radius: 0.35rem 0.25rem;

  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.5rem 0px;
`;

export const CardImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    align-self: center;
    margin: 10px auto;
  }

  @media (min-width: 768px) {
    width: 32%;
    max-width: 240px;
    margin: 0.5%;
  }
`;

interface CardGridCollageProps {
  imageSrcs: string[];
}
export const CardGridCollage = styled.div<CardGridCollageProps>`
  background-color: ${props => props.theme.artworkDisplayBackground};
  padding: 1em;
  background-image: ${props => props.imageSrcs.map((elem, i) => i === 0 ? `url(${elem})` : `, url(${elem})`)};
  background-repeat: ${props => props.imageSrcs.map((_, i) => i === 0 ? 'no-repeat' : ', no-repeat')};
  // background-attachment: ${props => props.imageSrcs.map((_, i) => i === 0 ? 'fixed' : ', fixed')};
  background-position: ${props => props.imageSrcs.map((_, i) => i === 0 ? `50% ${18 / props.imageSrcs.length * i}rem` : `, 50% ${18 / props.imageSrcs.length * i}rem`)};
  background-size: ${props => props.imageSrcs.map((_, i) => i === 0 ? `auto ${100 / props.imageSrcs.length}%` : `, auto ${100 / props.imageSrcs.length}%`)};
  max-height: 18rem;
  min-height: 290px;
  width: 100%;
  min-width: 290px;
  max-width: 18rem;
  border-radius: 0.35rem 0.25rem;

  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.5rem 0px;
`;

export const CardContainer = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.35rem 0.25rem;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 95%;
    align-self: center;
    margin: 3%;
  }

  @media (min-width: 768px) {
    width: 32%;
    min-width: 290px;
    max-width: 18rem;
    margin: 0.5%;
  }

  &:hover ${CardImage} {
    box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 0.5rem 0px;
  }
`;

export const CardCaption = styled.figcaption`
  margin-top: 10px;
  text-align: center;
`;

export const CardDescriptionList = styled.dl`
`;

export const CardTitle = styled.dt`
  font-style: italic;
  overflow-wrap: break-word;
  font-size: 1.25em;
  color: ${props => props.theme.textColor};
  font-weight: normal;
  line-height: 120%;
`;

export const CardInfo = styled.dd`
  font-size: 1.05em;
  color: #9d9d9d;
  font-weight: normal;
  overflow-wrap: break-word;
  margin-top: 0.3em;
`;

export const CardAuthor = styled.dd`
  font-size: 0.9em;
  font-family: 'Gotham SSm A', 'Gotham SSm B';
  color: #9d9d9d;
  font-weight: normal;
  text-transform: uppercase;
  overflow-wrap: break-word;
  margin-top: 0.3em;
`;