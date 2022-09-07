import styled from "@emotion/styled";

const blue = "#1d9bf0";
const grey = "#e7e7e8";

export const StandardButton = styled.button`
  color: #ffffff;
  padding: 0.3rem 1rem;
  margin: 0.4rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 25px;
  background-color: #1d9bf0;
  border: 0;
  transition: 0.25s;
  outline: none;
  &:hover {
    cursor: pointer;
    background-color: #1a8cd8 !important;
    transition: 0.25s;
  }
  &:focus {
    background-color: #1a8cd8 !important;
  }
  &:disabled {
    background-color: #8ecdf7 !important;
  }
`;

export const BlueButton = styled(StandardButton)`
  border-radius: 25px;
  background-color: ${blue} !important;
  border: 0;
`;

export const BlueLargeButton = styled(BlueButton)`
  color: #ffffff;
  // color: #000000;
  width: 100%;
  max-width: 14rem;
  // max-width: 100%;
  padding: 1rem;
  border-radius: 25px;
  background-color: #1d9bf0 !important;
  border: 0;
`;

export const WhiteButton = styled(StandardButton)`
  background-color: white;
  color: black;
  border: 1px solid #dee2e5;
  outline: 1px;
  &:hover {
    background-color: ${grey} !important;
  }
  &:focus {
    background-color: ${grey} !important;
  }
`;

export const BlackButton = styled(WhiteButton)`
  color: white;
  background-color: black !important;

  &:hover {
    background-color: #272c30 !important;
  }
`;
