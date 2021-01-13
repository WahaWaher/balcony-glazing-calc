import BalconyDesignItem from '@/components/BalconyDesignItem/BalconyDesignItem';
import styles from './BalconyDesign.module.scss';

function BalconyDesign(props) {
  const { items } = props;

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.title}>
          Конструкция <br /> балкона
        </div>
      </div>
      <div className={styles.right}>
        {Object.keys(items).map((key) => {
          const item = items[key];

          return (
            <BalconyDesignItem
              {...item}
              inputProps={{ checked: item.checked }}
              onChange={(e, value) => props.onChange(e, value)}
              key={key}
            />
          );
        })}
      </div>
    </div>
  );
}

export default BalconyDesign;
