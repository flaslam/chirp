import styled from "@emotion/styled";

const blue = "#1d9bf0";
const grey = "#e7e7e8";

export const StandardButton = styled.button`
  color: #ffffff;
  padding: 0.6rem 1.2rem;
  margin: 0.4rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 25px;
  background-color: #1d9bf0;
  border: 0;
  transition: 0.25s;
  outline: none;
  &:hover {
    cursor: pointer;
    background-color: #1a8cd8;
    transition: 0.25s;
  }
  &:focus {
    background-color: #1a8cd8;
  }
  &:disabled {
    background-color: #8ecdf7;
  }
`;

export const BlueButton = styled(StandardButton)`
  border-radius: 25px;
  background-color: ${blue};
  border: 0;
`;

export const BlueLargeButton = styled(BlueButton)`
  color: #ffffff;
  width: 16rem;
  padding: 1rem;
  border-radius: 25px;
  background-color: #1d9bf0;
  border: 0;
`;

export const WhiteButton = styled(StandardButton)`
  background-color: white;
  color: black;
  border: 1px solid #dee2e5;
  outline: 1px;
  &:hover {
    background-color: ${grey};
  }
  &:focus {
    background-color: ${grey};
  }
`;
