import styled from 'styled-components';
import NumberIcon from '../NumberIcon'

export const Root = styled.div`
  min-width: 250px;
  display: flex;
  flex-direction: row;

  padding: 16px 16px 24px 16px;
  background-color: ${props => props.theme.cardBackground};
  border: 1px solid #dadce0;
  border-radius: 8px;
  word-wrap: break-word;

  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 95%;
    align-self: center;
    margin: 1%;
  }

  @media (min-width: 768px) {
    width: 770px;
    margin: 0.5%;
  }
`;

export interface PageBarProps {
  /** Currently displayed/ selected page. */
  currentPage: number;
  /** Total number of pages to take into account */
  numberOfPages: number;
  /** Callback used to notify parent component of a page number being selected */
  onPageSelected: (page: number) => void;
};

/** Component to navigate between indexed pages (usually query results) */
export const PageBar = (props: PageBarProps) => {

  const {
    currentPage,
    numberOfPages,
    onPageSelected
  } = props;

  const testArray: number[] = Array.from(Array(numberOfPages).keys());

  return (
    <Root>
      <NumberIcon
        UsingNumber={"first"}
        Selected={false}
        onClick={() => onPageSelected(1)}
      />
      <NumberIcon
        UsingNumber={"←"}
        Selected={false}
        onClick={() => {
          /*  if (4 < currentPage) {
                onPageSelected(currentPage - 4);
            }
            else */
          if (1 < currentPage) {
            onPageSelected(currentPage - 1);
          }
        }}
      />
      &nbsp;&nbsp;&nbsp;&nbsp;
      {testArray.slice(currentPage - 1, currentPage + 3).map((im, i) => (
        <NumberIcon
          key={i}
          Selected={im === currentPage - 1}
          onClick={() => onPageSelected(im + 1)}
          UsingNumber={im + 1}
        />
      ))}
      &nbsp;&nbsp;&nbsp;&nbsp;
      <NumberIcon
        UsingNumber={"→"}
        Selected={false}
        onClick={() => {
          /*  if (currentPage + 4 < numberOfPages) {
                onPageSelected(currentPage + 4);
            }
            else*/
          if (currentPage + 1 < numberOfPages) {
            onPageSelected(currentPage + 1);
          }
        }}
      />
      <NumberIcon
        UsingNumber={"last (" + numberOfPages.toString() + ")"}
        Selected={false}
        onClick={() => onPageSelected(numberOfPages)}
      />
    </Root>
  )
};

export default PageBar;
