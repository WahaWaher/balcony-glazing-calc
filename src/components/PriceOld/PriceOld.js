import formatPrice from '@/utils/formatPrice';
import styles from './PriceOld.module.scss';

function PriceOld(props) {
  const { number, ...rest } = props;

  return (
    <div
      {...{
        className: styles.container,
        ...rest,
      }}
    >
      {formatPrice(number)} руб.
    </div>
  );
}

export default PriceOld;
