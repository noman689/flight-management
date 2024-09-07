import Flicking from '@egjs/react-flicking';
import { useRef } from 'react';
// @ts-ignore
import LEFT_ARROW from '../../../assets/left-arrow.svg';
// @ts-ignore
import RIGHT_ARROW from '../../../assets/right-arrow.svg';
import './Flicker.scss';

interface FLICKERPROPS {
  children?: any;
  showNagivation?: Boolean;
  showHeading?: Boolean;
  defaultIndex?: number;
}

const HorizontalFliker = ({
  children,
  showNagivation = false,
  showHeading = false,
  defaultIndex = 0,
}: FLICKERPROPS) => {
  const flickinfRef: any = useRef();

  const onClickLeft = () => {
    flickinfRef.current.prev();
  };

  const onClickRight = () => {
    flickinfRef.current.next();
  };

  return (
    <div className="main-wrapper">
      {showHeading && (
        <div className="heading">
          <h2>Explore Cities with us</h2>
        </div>
      )}
      {showNagivation && (
        <div onClick={onClickLeft} className="left-arrow">
          <img src={LEFT_ARROW} alt="LEFT_ARROW" />
        </div>
      )}
      <div>
        <Flicking
          viewportTag="div"
          defaultIndex={defaultIndex}
          align="prev"
          circular={true}
          horizontal={true}
          ref={flickinfRef}
          useFindDOMNode={true}
        >
          {children}
        </Flicking>
      </div>
      {showNagivation && (
        <div onClick={onClickRight} className="right-arrow">
          <img src={RIGHT_ARROW} alt="RIGHT_ARROW" className="img-fluid" />
        </div>
      )}
    </div>
  );
};

export default HorizontalFliker;
