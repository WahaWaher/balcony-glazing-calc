import styles from './DiscountLabel.module.scss';

function DiscountLabel(props) {
  const { title, percent } = props;

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.number}>{percent}%</div>
    </div>
  );
}

export default DiscountLabel;
