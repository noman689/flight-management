import Sider from 'antd/es/layout/Sider';
import React, { useEffect, useState } from 'react';
// @ts-ignore
import transitionIcon from '../../../assets/trans-img.png';
// @ts-ignore
import planeIcon from '../../../assets/ticketBlack.svg';

import './FilterSideBar.scss';
import moment from 'moment';
import { Modal, Radio, Space } from 'antd';
import { useLocation, useHistory } from 'react-router-dom';
import NewFlightSearchForm from '../NewFlightSearchForm/NewFlightSearchForm';
import { EditOutlined } from '@ant-design/icons';

const FilterSidebar = ({ data = [], collapsed, setCollapsed }) => {
  const history = useHistory();
  const location = useLocation();
  const [showEditModal,setShowEditModal]=useState(false)

  const [flightInfo, setFlightInfo] = useState({
    origin: '',
    destination: '',
    passengerCount: 0,
    cabinClass: '',
    isReturnFlight: false,
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sortByParam = searchParams.get('sort_by') || 'least-expensive';
    const stopsParam = searchParams.get('stops') || 'two-stops';

    if (!searchParams.has('sort_by') || !searchParams.has('stops')) {
      searchParams.set('sort_by', sortByParam);
      searchParams.set('stops', stopsParam);
      history.push({ search: searchParams.toString() });
    }
  }, [location.search, history]);

  function handleSortByChange(e) {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('sort_by', e.target.value);
    history.push({ search: searchParams.toString() });
  }

  function handleStopsChange(e) {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('stops', e.target.value);
    history.push({ search: searchParams.toString() });
  }

  const getFlightInfo = () => {
    let startDate;
    let endDate;
    if (data[0]) {
      const origin = data[0].slices[0].segments[0].origin.iata_city_code;
      const destination =
        data[0].slices[0].segments[data[0].slices[0].segments.length - 1]
          .destination.iata_city_code;
      const passengerCount = data[0].slices[0].segments[0].passengers.length;
      const passengersData = data[0].passengers;
      const cabinClass =
        data[0].slices[0].segments[0].passengers[0].cabin_class;
      const isReturnFlight = data[0].slices.length > 1;
      if (isReturnFlight) {
        startDate = data[0].slices[0].segments[0].departing_at;
        endDate =
          data[0].slices[data[0].slices.length - 1].segments[
            data[0].slices[0].segments.length - 1
          ]?.arriving_at;
      } else {
        startDate = data[0].slices[0].segments[0].departing_at;
        endDate =
          data[0].slices[0].segments[data[0].slices[0].segments.length - 1]
            ?.arriving_at;
      }
      return {
        origin,
        destination,
        passengerCount,
        cabinClass,
        isReturnFlight,
        startDate,
        endDate,
        passengersData,
      };
    }
  };

  useEffect(() => {
    const result = getFlightInfo();
    setFlightInfo(result);
  }, [data]);

  return (
    <>
      <Modal
        open={showEditModal}
        onCancel={() => setShowEditModal(false)}
        footer={null}
        closable={false}
        width={'70%'}
      >
        <NewFlightSearchForm initialValues={flightInfo} />
      </Modal>
      {!collapsed ? (
        <div
          className="sideBarOverlay"
          onClick={() => setCollapsed((prevState) => !prevState)}
        />
      ) : (
        ''
      )}
      {!collapsed ? (
        <Sider
          width={240}
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            overflowY: 'auto',
            marginTop: '71px',
            zIndex: 20,
          }}
          className="filter-sidebar"
        >
          <div className="about-info">
            <div className='edit-search-text' onClick={() => setShowEditModal(true)}><EditOutlined/> Edit Search</div>
            <div className="flight-info">
              <span>{flightInfo?.origin}</span>
              <span>
                {flightInfo?.isReturnFlight ? (
                  <img src={transitionIcon} width={40} />
                ) : (
                  <img src={planeIcon} width={40} />
                )}
              </span>
              <span>{flightInfo?.destination}</span>
            </div>
            <div className="date-section">
              <span>
                {moment(flightInfo?.startDate).format('MMM Do YY')} -{' '}
                {moment(flightInfo?.endDate).format('MMM Do YY')}
              </span>
            </div>
            <div className="other-info-section">
              <span className="child-section">
                {flightInfo?.cabinClass.toUpperCase()}
              </span>
              <span className="child-section">
                Passengers {flightInfo?.passengerCount}
              </span>
            </div>
            <div className="sort-section">
              <span className="sort-heading">Sort by</span>
              <Radio.Group
                onChange={
                  (e) => {
                    handleSortByChange(e);
                  }
                  // setSortBy(e.target.value)
                }
                defaultValue={'least-expensive'}
                // value={sortBy}
              >
                <Space direction="vertical">
                  <Radio value={'least-expensive'}>Least expensive</Radio>
                  <Radio value={'most-expensive'}>Most Expensive</Radio>
                  {/* <Radio value={'shortest-duration'}>Shortest duration</Radio>
                  <Radio value={'longest-duration'}>Longest duration</Radio> */}
                </Space>
              </Radio.Group>
            </div>
            <div className="sort-section">
              <span className="sort-heading">Stops</span>
              <Radio.Group
                onChange={(e) => handleStopsChange(e)}
                defaultValue={'two-stops'}
              >
                <Space direction="vertical">
                  <Radio value={'direct'}>Direct only</Radio>
                  <Radio value={'one-stop'}>1 stop at most</Radio>
                  <Radio value={'two-stops'}>2 stops at most</Radio>
                </Space>
              </Radio.Group>
            </div>
          </div>
        </Sider>
      ) : (
        <></>
      )}
    </>
  );
};

export default FilterSidebar;
