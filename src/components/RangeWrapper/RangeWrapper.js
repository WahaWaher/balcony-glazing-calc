import { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';
import classNames from 'classnames';
import styles from './RangeWrapper.module.scss';

const isVert = (str) => str === 'to top' || str === 'to bottom';

function RangeWrapper(props) {
  const values = props.values;
  const [direction] = useState(props.direction || 'to right');
  const { tipPosition } = props;

  return (
    <Range
      renderTrack={({ props, children }) => {
        return (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            className={styles.rangeTrack}
            style={props.style}
          >
            <div
              ref={props.ref}
              style={{
                width: isVert(direction) ? '3px' : '100%',
                height: isVert(direction) ? '100%' : '3px',
                background: getTrackBackground({
                  values,
                  colors: ['#d4d4d4', '#d4d4d4'],
                  min: 1000,
                  max: 1800,
                }),
              }}
            >
              <div
                className={classNames({
                  [styles.rangeBefore]: !isVert(direction),
                  [styles.rangeBeforeVertical]: isVert(direction),
                })}
              />
              {children}
              <div
                className={classNames({
                  [styles.rangeAfter]: !isVert(direction),
                  [styles.rangeAfterVertical]: isVert(direction),
                })}
              />
            </div>
          </div>
        );
      }}
      renderThumb={({ props, isDragged }) => (
        <div {...props} className={styles.rangeThumb} style={props.style}>
          <div
            className={classNames({
              [styles.rangeTip]: true,
              [styles.rangeTipVertical]: tipPosition === 'left',
              [styles.rangeTipGorizontal]: tipPosition === 'bottom',
            })}
          >
            {values}
          </div>
        </div>
      )}
      {...props}
    />
  );
}

RangeWrapper.defaultProps = {
  tipPosition: 'bottom',
  min: 1000,
  max: 1800,
  step: 1,
};

export default RangeWrapper;
