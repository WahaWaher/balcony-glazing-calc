import { useState } from 'react';
import CheckBox from '@/components/CheckBox/CheckBox';
import styles from './MiscBoxes.module.scss';

function MiscBoxes(props) {
  const { items: initialItems, onChange, ...rest } = props;
  const [items, setItems] = useState(initialItems);

  return (
    <div
      {...{
        className: styles.container,
        ...rest,
      }}
    >
      {items.map((item, key) => {
        const { text, checked, value } = item;

        return (
          <div className={styles.item} key={key}>
            <CheckBox
              text={text}
              inputProps={{
                defaultValue: value,
                defaultChecked: checked,
                onChange: (e) => {
                  const { value, checked } = e.target;
                  const newItems = items.map((x) => {
                    if (x.value === value) x.checked = checked;

                    return x;
                  });
                  const checkedItems = newItems.filter((x) => x.checked);

                  setItems(newItems);
                  onChange.call(null, newItems, checkedItems);
                },
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default MiscBoxes;
