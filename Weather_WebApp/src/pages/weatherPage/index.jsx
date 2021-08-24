import React, { useEffect, useState, useMemo } from "react";
import styles from "./styles.less";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ServerIP } from "@src/utils/request.js";

import { connect } from "react-redux";
import * as actions from "./store/action";
import refresh from "@assets/weatherPage/refresh.png";
import leftArrow from "@assets/weatherPage/leftArrow.png";
import rightArrow from "@assets/weatherPage/rightArrow.png";

function Index(props, { slider }) {
  var time = null;
  const [current, setCurrent] = useState(0);
  const [weatherAllData, setweatherAllData] = useState([]);

  const { cityData, weatherByIdData } = props;
  useEffect(() => {
    props.get_FindAllCityRequest();
  }, []);
  useMemo(() => {
    setweatherAllData(cityData);
  }, [cityData]);
  useMemo(() => {
    time = setTimeout(function () {
      props.get_WeatherByIdRequest({ id: current + 1 });
    }, 1000);
    return () => {
      clearTimeout(time);
      time = null;
    };
  }, [current]);
  useMemo(() => {
    let newdata = weatherAllData;
    newdata.forEach((element) => {
      if (element.id == weatherByIdData.id) {
        element.currentData = weatherByIdData.WeatherModel;
      }
    });
    setweatherAllData(newdata);
  }, [weatherByIdData]);

  /*轮播右移动方法 */
  function next() {
    slider.slickNext();
  }
  /*轮播右移动方法 */
  function previous() {
    slider.slickPrev();
  }
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrent(next),
  };
  return (
    <>
      <div className={styles.weather_main}>
        {cityData.length == 0 ? (
          <div className={styles.no_data}>暂无数据......请启动服务端</div>
        ) : (
          <>
            <div className={styles.shift}>
              <img src={leftArrow} alt="左移按钮" onClick={previous} />
            </div>
            <div className={styles.centre_body}>
              <Slider ref={(c) => (slider = c)} {...settings}>
                {weatherAllData.map((item, index) => {
                  const { currentData } = item;
                  return (
                    <div
                      key={item.key || index}
                      className={styles.centre_body_box}
                    >
                      <div className={styles.city_name}>{item.cityName}</div>
                      {JSON.stringify(item.currentData) == "{}" ? (
                        <img src={refresh} alt="正在加载......" />
                      ) : (
                        <div className={styles.weather_box}>
                          <div className={styles.weather_icon}>
                            <img
                              src={ServerIP + currentData.weatherIcon}
                              alt="天气状态图标"
                            />
                          </div>
                          <div>{currentData.currentTemperature}</div>
                          <div className={styles.weatherRange}>
                            <span>{currentData.minimumTemperature}</span>
                            <span>{currentData.maximumTemperature}</span>
                          </div>
                          <div className={styles.weather_state}>
                            {currentData.weather}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </Slider>
            </div>
            <div className={styles.shift}>
              <img src={rightArrow} alt="左移按钮" onClick={next} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  cityData: state.weatherData.cityData,
  weatherByIdData: state.weatherData.weatherByIdData,
});
const mapDispatchToProps = (dispatch) => ({
  get_FindAllCityRequest() {
    dispatch(actions.getFindAllCityRequest());
  },
  get_WeatherByIdRequest(params) {
    dispatch(actions.getWeatherByIdRequest(params));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Index);
