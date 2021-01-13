import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import RangeWrapper from '@/components/RangeWrapper/RangeWrapper';
import BalconyDesign from '@/components/BalconyDesign/BalconyDesign';
import GlazingTypes from '@/components/GlazingTypes/GlazingTypes';
import MiscBoxes from '@/components/MiscBoxes/MiscBoxes';
import PriceOld from '@/components/PriceOld/PriceOld';
import PriceActual from '@/components/PriceActual/PriceActual';
import Button from '@/components/Button/Button';
import Image from '@/components/Image/Image';
import DiscountLabel from '@/components/DiscountLabel/DiscountLabel';
import Alert from '@/components/Alert/Alert';
import CountUp from 'react-countup';

import MainDataContext from '@/contexts/MainDataContext';

import simplifyData from '@/utils/simplifyData';
import easeInOutQuint from '@/utils/easeInOutQuint';
import calcTotalWithDiscount from '@/utils/calcTotalWithDiscount';

import styles from './App.module.scss';

function App(props) {
  const { data: initialData, calculate } = props.config;
  const [data, setData] = useState(initialData);
  const [total, setTotal] = useState(calculate.call(null, data, simplifyData));
  const { design, dimensions, glazing, misc, discount, order, notes } = data;
  const [shouldSmoothCounting, setShouldSmoothCounting] = useState(true);
  const curDesignFullSrc = Object.values(design).find((x) => x.checked).img
    .full[Object.values(glazing).find((x) => x.checked).value];

  const BottomPart = () => (
    <div className={styles.bottom}>
      {/* Main Warnings */}
      <div className={styles.mainNotes}>
        {notes.map(({ type, text, ...rest }, key) => (
          <div className={styles.mainNotesItem} key={key}>
            <Alert type={type} {...rest}>
              {text}
            </Alert>
          </div>
        ))}
      </div>
    </div>
  );

  useEffect(() => {
    setTotal(calculate.call(null, data, simplifyData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  // eslint-disable-next-line

  return (
    <MainDataContext.Provider value={{ data }}>
      <CSSTransition in={true} timeout={250} classNames="app-anim" appear>
        <div className={styles.container}>
          <div className={styles.main}>
            <div className={styles.top}>
              {/* Top panel */}
              <BalconyDesign
                items={design}
                onChange={(e, value) => {
                  Object.keys(design).map((key) => {
                    return setData((prevData) => ({
                      ...prevData,
                      design: {
                        ...prevData.design,
                        [key]: {
                          ...prevData.design[key],
                          checked: key === value ? true : false,
                        },
                      },
                    }));
                  });
                }}
              />
            </div>
            <div className={styles.center}>
              {/* Center panel */}
              <div className={styles.dimensionsContainer}>
                {/* Height Slider*/}
                <div className={styles.heightContainer}>
                  <RangeWrapper
                    direction="to top"
                    tipPosition={
                      useMediaQuery({ query: '(max-width: 768px)' })
                        ? 'bottom'
                        : 'left'
                    }
                    values={[dimensions.height.value]}
                    min={dimensions.height.min}
                    max={dimensions.height.max}
                    onChange={([height]) => {
                      setShouldSmoothCounting(false);
                      setData({
                        ...data,
                        dimensions: {
                          ...dimensions,
                          height: {
                            ...dimensions.height,
                            value: height,
                          },
                        },
                      });
                    }}
                  />
                </div>
                <div style={{ flexGrow: 1 }}>
                  {/* Full Image */}
                  <div className={styles.constructImg}>
                    <SwitchTransition mode="out-in" appear>
                      <CSSTransition
                        key={curDesignFullSrc}
                        classNames="fade"
                        addEndListener={(node, done) => {
                          node.addEventListener('transitionend', done, false);
                        }}
                      >
                        <Image src={curDesignFullSrc} alt="cover" />
                      </CSSTransition>
                    </SwitchTransition>
                  </div>
                  {/* Width Slider*/}
                  <div className={styles.widthContainer}>
                    <RangeWrapper
                      direction="to right"
                      min={dimensions.width.min}
                      max={dimensions.width.max}
                      values={[dimensions.width.value]}
                      onChange={([width]) => {
                        setShouldSmoothCounting(false);
                        setData({
                          ...data,
                          dimensions: {
                            ...dimensions,
                            width: {
                              ...dimensions.width,
                              value: width,
                            },
                          },
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {useMediaQuery({ query: '(min-width: 992px)' }) && <BottomPart />}
          </div>
          <div className={styles.aside}>
            {/* Glazing Types Box */}
            <div className={styles.GlazingTypesBox}>
              <GlazingTypes
                items={glazing}
                onChange={(x) => {
                  setShouldSmoothCounting(true);
                  Object.keys(glazing).map((key) => {
                    return setData((prevData) => ({
                      ...prevData,
                      glazing: {
                        ...prevData.glazing,
                        [key]: {
                          ...prevData.glazing[key],
                          checked: key === x ? true : false,
                        },
                      },
                    }));
                  });
                }}
              />
            </div>
            {/* Misc Box */}
            <div className={styles.miscBox}>
              <MiscBoxes
                items={Object.keys(misc).map((name) => {
                  const { text, checked } = misc[name];

                  return {
                    name,
                    text,
                    checked,
                    value: name,
                  };
                })}
                onChange={(all, checked) => {
                  setShouldSmoothCounting(true);
                  setData((prevData) => ({
                    ...prevData,
                    misc: all,
                  }));
                }}
              />
            </div>
            {/* Price Box */}
            <div className={styles.priceBox}>
              <div className={styles.priceBoxLeft}>
                {discount ? (
                  <PriceOld
                    number={Math.round(total)}
                    style={{ marginBottom: 10 }}
                  />
                ) : (
                  ''
                )}
                {shouldSmoothCounting ? (
                  <PriceActual
                    component={
                      <CountUp
                        end={Math.round(calcTotalWithDiscount(total, discount))}
                        separator=" "
                        duration={0.85}
                        easingFn={easeInOutQuint}
                      />
                    }
                  />
                ) : (
                  <PriceActual
                    number={Math.round(calcTotalWithDiscount(total, discount))}
                  />
                )}
              </div>
              {discount ? (
                <div className={styles.priceBoxRight}>
                  <DiscountLabel title="Скидка" percent={discount} />
                </div>
              ) : (
                ''
              )}
            </div>
            {/* Order Button */}
            {order && (
              <Button
                {...{
                  style: { width: 215 },
                  ...order,
                }}
                onClick={function (e) {
                  if (order.onClick) {
                    order.onClick.call(this, e, data, simplifyData);
                  }
                }}
              >
                {order.text}
              </Button>
            )}
            {useMediaQuery({ query: '(max-width: 991px)' }) && (
              <div style={{ marginTop: 35 }}>
                <BottomPart />
              </div>
            )}
          </div>
        </div>
      </CSSTransition>
    </MainDataContext.Provider>
  );
}

export default App;
