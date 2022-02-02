import styled from "styled-components";

export const Root = styled.div`
  display: flex;

  @media (max-width: 768px) {
    width: 100%;
    align-self: center;
    flex-direction: column;
  }

  @media (min-width: 768px) {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    padding: 16px;
    width: 85%;
    max-width: 1200px;
    align-items: left;
    margin-bottom: 15px;
    padding: 0;
    flex-direction: row;
  }
`;

export const ArtworkDescription = styled.p`
  font-weight: 400;
  line-height: 1.5;
  transition: color 0.5s ease;
  margin: auto 0 auto 0;
  word-wrap: break-word;
  padding-right: 15px;
`;

export const ArtworkTitle = styled.p`
  font-size: 1.25em;
  font-weight: 500;
  font-style: italic;
  letter-spacing: +0.5px;
  margin-bottom: 5px;
  word-wrap: break-word;
`;

export const ArtworkAuthor = styled.p`
  font-weight: 700;
  font-style: bold;
  letter-spacing: +0.5px;
  margin-bottom: 5px;
`;

export const ArtworkDate = styled.p`
  letter-spacing: +0.5px;
  margin-bottom: 5px;
`;

export const ArtworkNotes = styled.p`
  font-size: 0.9em;
  font-weight: 400;
  font-style: italic;
`;

export const InputArea = styled.textarea`
  font-size: 0.9em;
  font-weight: 200;
  font-family: ${props => props.theme.contentFont};
  line-height: 135%;
  width: 100%;
  height: 6em;
  margin-top: 10px;
  color: ${props => props.theme.textColor};
  border: none;
  border-bottom: 2px solid #dadce0;
  outline: none;
  padding: 2px 0;
  background-color: transparent;
  resize: none;

  &:focus {
    border-bottom: 3px solid #c44c49;
  }
`;