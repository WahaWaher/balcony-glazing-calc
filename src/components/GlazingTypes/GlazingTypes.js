import { useState } from 'react';
import GlazingTypesItem from '@/components/GlazingTypesItem/GlazingTypesItem';
import styles from './GlazingTypes.module.scss';

function GlazingTypes(props) {
  const { items, onChange } = props;
  const [, setCurGlazingType] = useState(
    Object.keys(items).find((key) => items[key].checked === true)
  );

  return (
    <div className={styles.container}>
      {Object.keys(items).map((key) => {
        const { title, color, features, value, checked } = items[key];

        return (
          <GlazingTypesItem
            key={key}
            className={styles.item}
            title={title}
            color={color}
            features={features}
            inputProps={{
              defaultChecked: checked,
              defaultValue: value,
              onChange: (e) => {
                setCurGlazingType(e.target.value);
                onChange(e.target.value);
              },
            }}
          />
        );
      })}
    </div>
  );
}

export default GlazingTypes;
