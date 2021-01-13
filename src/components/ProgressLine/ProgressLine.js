import styles from './ProgressLine.module.scss';

function ProgressLine(props) {
  const { value } = props;

  return (
    <div className={styles.container}>
      <div className={styles.line}>
        <div className={styles.value} style={{ width: value + '%' }}></div>
      </div>
    </div>
  );
}

export default ProgressLine;
