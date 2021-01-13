import CheckIcon from '@/icons/CheckIcon';
import styles from './CheckBox.module.scss';

function CheckBox(props) {
  const { text, inputProps } = props;

  return (
    <label className={styles.label}>
      <input
        {...{
          className: styles.realInput,
          type: 'checkbox',
          ...inputProps,
        }}
      />
      <div className={styles.wrapper}>
        <span className={styles.fakeInput}>
          <CheckIcon />
        </span>
        {text && <span className={styles.text}>{text}</span>}
      </div>
    </label>
  );
}

export default CheckBox;
