import React from 'react';
import { string, number, bool } from 'prop-types';

const INITIAL_OFFSET = -35;
const circleConfig = {
  viewBox: '0 0 39 39',
  x: '19',
  y: '19',
  radio: '15.91549430918954',
};
const CircleProgressBarBase = ({
  className,
  strokeColor,
  strokeWidth,
  innerText,
  legendText,
  percentage,
  trailStrokeWidth,
  trailStrokeColor,
  trailSpaced,
  // speed,
}) => {
  // const [progressBar, setProgressBar] = useState(0);
  // const pace = percentage / speed;
  // const updatePercentage = () => {
  //   setTimeout(() => {
  //     setProgressBar(progressBar + 1);
  //   }, pace);
  // };

  // useEffect(() => {
  //   if (percentage > 0) updatePercentage();
  // }, [percentage]);

  // useEffect(() => {
  //   if (progressBar < percentage) updatePercentage();
  // }, [progressBar]);
  // setProgressBar(percentage);
  const speedUnit = innerText;
  return (
    <div className={className}>
      <svg viewBox={circleConfig.viewBox}>
        <circle
          className="donut-ring"
          cx={circleConfig.x}
          cy={circleConfig.y}
          r={circleConfig.radio}
          fill="transparent"
          stroke={trailStrokeColor}
          strokeWidth={trailStrokeWidth}
          strokeDasharray={trailSpaced ? 1 : 0}
        />

        <circle
          className="donut-segment"
          cx={circleConfig.x}
          cy={circleConfig.y}
          r={circleConfig.radio}
          fill="transparent"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${percentage} ${150 - percentage}`}
          strokeDashoffset={INITIAL_OFFSET}
        />

        <g className="chart-text">
          <text x="50%" y="50%" className="chart-number">
            {percentage}
          </text>
          <text x="50%" y="50%" className="chart-label">
            {speedUnit}
          </text>
        </g>
      </svg>
      {legendText && (
        <figcaption className="figure-key">
          <ul
            className="figure-key-list"
            aria-hidden="true"
            role="presentation"
          >
            <li>
              <span className="shape-circle" />
              <span>{legendText}</span>
            </li>
          </ul>
        </figcaption>
      )}
    </div>
  );
};

CircleProgressBarBase.propTypes = {
  className: string.isRequired,
  strokeColor: string,
  strokeWidth: number,
  innerText: string,
  legendText: string,
  percentage: number,
  trailStrokeWidth: number,
  trailStrokeColor: string,
  trailSpaced: bool,
  // speed: number,
};

CircleProgressBarBase.defaultProps = {
  strokeColor: 'black',
  strokeWidth: 1,
  innerText: 'km/h',
  legendText: '',
  percentage: 0,
  trailStrokeWidth: 1,
  trailStrokeColor: '#d2d3d4',
  trailSpaced: true,
  // speed: 211,
};

export default CircleProgressBarBase;
