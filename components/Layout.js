import styled from 'styled-components';

const Layout = props => {
  return (
    <LayoutWrapper>
      <LayoutBody>{props.children}</LayoutBody>
    </LayoutWrapper>
  );
};

export default Layout;

const LayoutWrapper = styled.div`
  overflow-x: hidden;
  position: relative;
  background: rgb(255, 118, 130);

  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const LayoutBody = styled.div`
  margin: 0 auto;

  width: 1200px;
  height: 1000px;

  @media all and (max-width: 1200px) {
    width: 100vw;
    height: 100vh;
    min-width: 320px;
    min-height: 480px;
  }
`;
