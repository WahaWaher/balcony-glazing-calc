import ReactDOM from 'react-dom';
import App from '@/components/App';
import '@/index.scss';

window.BalconyGlazingCalc = function (el, config = {}) {
  return ReactDOM.render(<App config={config} />, el);
};
