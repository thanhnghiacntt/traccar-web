import styled from 'styled-components';
import { string } from 'prop-types';

import CircleProgressBarBase from './CircleProgressBarBase';

const CircleProgressBar = styled(CircleProgressBarBase)`
  max-width: 10vh;
  vertical-align: middle;
  position: relative;
  .chart-text {
    fill: black;
    transform: translateY(0.25em);
  }

  .chart-number {
    font-size: 0.6em;
    line-height: 1;
    text-anchor: middle;
    transform: translateY(-0.25em);
  }

  .chart-label {
    font-size: 0.2em;
    text-transform: uppercase;
    text-anchor: middle;
    transform: translateY(0.7em);
  }

  .figure-key [class*='shape-'] {
    margin-right: 10px;
  }

  .figure-key-list {
    list-style: none;
    display: flex;
    justify-content: space-between;
  }

  .figure-key-list li {
    margin: 10px auto;
  }

  .shape-circle {
    display: inline-block;
    vertical-align: middle;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: ${(props) => props.strokeColor};
    text-transform: capitalize;
  }
`;

CircleProgressBar.propTypes = {
  textColor: string,
  strokeColor: string,
  maxSize: string,
};

CircleProgressBar.defaultProps = {
  textColor: 'black',
  strokeColor: 'red',
  maxSize: '10vh',
};

export default CircleProgressBar;
