import styled from "styled-components";

export const NavbarContainer = styled.nav`
  background-color: #2a2a2a;
  width: 95%;
  height: 80px;
  border-radius: 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  position: fixed;
  top: 20px;
  left: 50%;
  z-index: 9999;
  transform: translate(-50%);

  @media screen and (max-width: 850px) {
    z-index: 99;
  }
`;

