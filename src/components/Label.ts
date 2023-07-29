import styled from "styled-components";

const Label = styled.p`
  all: unset;
  color: ${({ theme }) => theme.colors.cyan.darkGrayish};
  font-size: 16px;
  margin-bottom: 6px;
`;

export default Label;