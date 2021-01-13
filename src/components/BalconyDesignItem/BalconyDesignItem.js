import { useContext } from 'react';
import MainDataContext from '@/contexts/MainDataContext';
import styles from './BalconyDesignItem.module.scss';

function BalconyDesignItem(props) {
  const { img, title: value, inputProps } = props;
  const {
    data: { glazing },
  } = useContext(MainDataContext);
  const curGlazingType = Object.values(glazing).find((x) => x.checked).value;

  return (
    <div className={styles.item}>
      <label className={styles.label}>
        <div className={styles.cover}>
          <img src={img.thumb[curGlazingType]} alt="img" />
        </div>
        <span className={styles.checkbox}>
          <input
            className={styles.cheeckboxTrue}
            onChange={(e) => props.onChange(e, value)}
            {...{
              type: 'radio',
              name: 'design',
              value,
              ...inputProps,
            }}
          />
          <span className={styles.cheeckboxFake}></span>
        </span>
        <div className={styles.title}>{value}</div>
      </label>
    </div>
  );
}

export default BalconyDesignItem;
