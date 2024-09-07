import { MenuOutlined } from '@ant-design/icons';
import AnimatedLoader from '@client/components/presentational/AnimatedLoader/AnimatedLoader';
import { getFlightOffersAPI } from '@client/services/searchFlightService';
import { Row } from 'antd';
import { useEffect, useState } from 'react';
import FilterSidebar from '../FilterSideBar/FilterSidebar';
import FlightDetailCard from '../FlightDetailCard/FlightDetailCard';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { filterOffers } from '@client/utils/helper';
import './FlightDetail.scss';

const filterOfferData = (data, loaction) => {
  let tempArray = [];
  if (data?.length) {
    const searchParams = new URLSearchParams(loaction.search);
    const sortFilter = searchParams.get('sort_by');
    const stopFilter = searchParams.get('stops');
    return filterOffers(data, sortFilter, stopFilter);
  }
  return tempArray;
};

const FlightDetail = () => {
  const [offersArray, setOffersArray] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [after, setAfter] = useState('');
  const [before, setBefore] = useState('');
  const [collapsed, setCollapsed] = useState(
    window.innerWidth < 821 ? true : false,
  );
  const params = useParams();
  const history = useHistory();
  const location = useLocation();

  // @ts-ignore
  const { id } = params;
  const getOfers = async (after?: any, before?: any) => {
    try {
      setLoading(true);
      const { data } = await getFlightOffersAPI(id, after, before);
      setOffersArray(data);

      setLoading(false);
    } catch (e) {
      console.log('error', e);
      setLoading(false);
    }
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const after = searchParams.get('after') ?? undefined;
    const before = searchParams.get('before') ?? undefined;
    if (after || before) {
      getOfers(after, before);
    } else {
      getOfers(undefined, undefined);
    }
  }, [id, after, before]);
  const toggle = () => {
    setCollapsed((prevState) => !prevState);
  };
  function handleNextClick(after_index) {
    setAfter(after_index);
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete('before');
    searchParams.set('after', after_index);
    history.push({ search: searchParams.toString() });
  }

  function handlePreviousClick(before_index) {
    setBefore(before_index);
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete('after');
    searchParams.set('before', before_index);
    history.push({ search: searchParams.toString() });
  }

  return (
    <div className="main_page_width m-b-30 date-tabs overflow-unset">
      {loading ? (
        <Row justify="center">
          <AnimatedLoader />
        </Row>
      ) : (
        <>
          {window.innerWidth < 821 ? (
            <div onClick={toggle}>
              <MenuOutlined
                className="trigger"
                style={{ marginRight: '5px' }}
              />
            </div>
          ) : (
            <></>
          )}
          <div className="d-flex">
            <FilterSidebar
              data={offersArray?.offer?.data}
              collapsed={collapsed}
              setCollapsed={setCollapsed}
            />
            <div className="cards-section">
              {offersArray?.offer?.data?.length &&
              filterOfferData(offersArray?.offer?.data, location).length ? (
                filterOfferData(offersArray?.offer?.data, location).map(
                  (offer) => {
                    return <FlightDetailCard data={offer}></FlightDetailCard>;
                  },
                )
              ) : (
                <FlightDetailCard data={null}></FlightDetailCard>
              )}
              <div className="page-btns">
                {offersArray?.offer?.meta?.before && (
                  <span
                    className="page-navigate-btn previous-btn"
                    onClick={() =>
                      handlePreviousClick(offersArray?.offer?.meta?.before)
                    }
                  >
                    Previous
                  </span>
                )}
                {offersArray?.offer?.meta?.after && (
                  <span
                    className="page-navigate-btn next-btn"
                    onClick={() =>
                      handleNextClick(offersArray?.offer?.meta?.after)
                    }
                  >
                    Next
                  </span>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FlightDetail;
