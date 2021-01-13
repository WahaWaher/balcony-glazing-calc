import ProgressLine from '@/components/ProgressLine/ProgressLine';
import CheckIcon from '@/icons/CheckIcon';
import classNames from 'classnames';
import styles from './GlazingTypesItem.module.scss';

function GlazingTypesItem(props) {
  const { title, color, features, className, inputProps, ...other } = props;
  const { checked, value, onChange } = inputProps;
  const containerAttrs = {
    className: classNames(styles.container, className),
    ...other,
  };

  return (
    <label {...containerAttrs}>
      <input
        {...{
          className: styles.realInput,
          type: 'radio',
          name: 'glazing-type',
          defaultChecked: checked,
          defaultValue: value,
          onChange: (e) => onChange.bind(this, e),
          ...inputProps,
        }}
      />

      <div className={classNames(styles.wrapper, styles[color])}>
        {/* Title */}
        <div className={styles.title}>{title}</div>

        {/* FakeInput */}
        <div className={classNames(styles.fakeInput)}>
          <CheckIcon />
        </div>

        {/* Features */}
        <div className={styles.features}>
          {Object.keys(features).map((key) => {
            const { title, value } = features[key];

            return (
              <div className={styles.featuresItem} key={key}>
                <div className={styles.featuresItemTitle}>{title}</div>
                <div className={styles.featuresItemProgress}>
                  <ProgressLine value={value} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </label>
  );
}

export default GlazingTypesItem;
