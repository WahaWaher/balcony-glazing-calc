import styles from './Button.module.scss';

function Button(props) {
  const { children, ...rest } = props;

  return (
    <button
      {...{
        className: styles.container,
        ...rest,
      }}
    >
      {children}
    </button>
  );
}

export default Button;
