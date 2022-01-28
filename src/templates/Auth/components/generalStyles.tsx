import styled from "styled-components";

export const VerticalSeparator = styled.div`
  height: 1em;
`;

export const ActionsContainer = styled.div`
  width: 100%;
  padding: 0 0.5em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonAction = styled.div`
  padding: 0.5em 1em;
  background-color: #c44c49;
  border-radius: 5px;
  margin: 0.6%;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #cc0000;
    -moz-box-shadow: 0px 0.15rem 0.15rem 0px rgba(0, 0, 0, 0.25);
    -webkit-box-shadow: 0px 0.15rem 0.15rem 0px rgba(0, 0, 0, 0.25);
    box-shadow: 0px 0.15rem 0.15rem 0px rgba(0, 0, 0, 0.25);
  }
`;

export const ButtonActionText = styled.span`
  font-size: 0.95em;
  font-weight: 200;
  font-family: ${props => props.theme.contentFont};
  line-height: 135%;
  color: white;

  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
  line-height: 1.1;
`;

export const TextActionSpan = styled.span`
  font-size: 0.95em;
  font-weight: 500;
  font-family: ${props => props.theme.contentFont};
  line-height: 135%;
  color: #c44c49;
  cursor: pointer;

  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.1;

  padding: 0.5em;
  border-radius: 5px;

  &:hover {
    color: #cc0000;
    background-color: #fffafa;
  }
`;

export const StepDescription = styled.div`
  font-size: 0.95em;
  font-weight: 200;
  font-family: ${props => props.theme.contentFont};
  line-height: 135%;
  width: 100%;
  color: ${props => props.theme.textColor};
  padding: 0.5em 0.5em 0 0.5em;
`;