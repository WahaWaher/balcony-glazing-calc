import styles from './Alert.module.scss';

const types = {
  warning: {
    color: '#fb6a00',
    icon: '!',
  },
  info: {
    color: '#0087f2',
    icon: 'i',
  },
};

function Alert(props) {
  const { type, text, children, ...rest } = props;
  const { color, icon } = types[type];

  return (
    <div
      {...{
        className: styles.container,
        ...rest,
      }}
    >
      <div className={styles.iconContainer}>
        <div
          className={styles.icon}
          style={{
            color,
            borderColor: color,
          }}
        >
          {icon}
        </div>
      </div>
      <div className={styles.text}>{children}</div>
    </div>
  );
}

export default Alert;
