import styled from 'styled-components';

const Root = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px #111 solid;
  border-radius: 13px;
  cursor: pointer;
`;

const CheckedRoot = styled.div`
  width: 26px;
  height: 26px;
  background: #111;
  border-radius: 13px;
  cursor: pointer;
`;

export { Root, CheckedRoot };
