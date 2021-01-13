import classNames from 'classnames';
import styles from './GlazingItem.module.scss';

function GlazingItem(props) {
  const { title, features, color, inputProps } = props.data;

  return (
    <label
      className={classNames({
        [styles.item]: true,
        [styles.item_primary]: color === 'primary',
        [styles.item_accent]: color === 'accent',
      })}
      style={{ marginBottom: '24px' }}
    >
      <input
        className={styles.checkboxTrue}
        {...{ type: 'radio', ...inputProps }}
      />
      <div className={styles.itemWrapper}>
        <div className={styles.itemHeader}>
          <div className={styles.title}>{title}</div>
          <div className={styles.checkbox}></div>
        </div>

        <div className={styles.features}>
          {features.map((feature, i) => (
            <div className={styles.progressItem} key={i}>
              <div className={styles.progressTitle}>{feature.title}</div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressLine}
                  style={{ width: feature.value + '%' }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </label>
  );
}

export default GlazingItem;
