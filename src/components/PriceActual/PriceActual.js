import formatPrice from '@/utils/formatPrice';
import styles from './PriceActual.module.scss';

function PriceActual(props) {
  const { number, component, ...rest } = props;

  return (
    <div
      {...{
        className: styles.container,
        ...rest,
      }}
    >
      {component ? component : formatPrice(number)} руб.
    </div>
  );
}

export default PriceActual;
