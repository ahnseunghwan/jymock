import { Card } from 'antd';
import styled from 'styled-components';

const Root = styled(Card)`
  &&& {
    cursor: pointer;
  }
`;

const CardMeta = styled(Card.Meta)``;

export { Root, CardMeta };
