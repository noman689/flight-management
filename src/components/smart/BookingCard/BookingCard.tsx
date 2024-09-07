import React, { useState, useEffect } from 'react';
import { Card, Tabs } from 'antd';
import {
  GitlabFilled,
  BookOutlined,
  BranchesOutlined,
  PushpinOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import './BookingCard.scss';
import FlightSearchForm from '../FlightSearchForm/FlightSearchForm';
import NewFlightSearchForm from '../NewFlightSearchForm/NewFlightSearchForm';
import Breadcrumbs from '../BreadCrums';

const SearchFlightCard = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // useEffect(() => {
  //   function handleResize() {
  //     setScreenSize({
  //       width: window.innerWidth,
  //       height: window.innerHeight,
  //     });
  //   }

  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  const item = [
    {
      label: (
        <span>
          <BookOutlined />
          Book
        </span>
      ),
      key: 'book',
      children: <NewFlightSearchForm />,
    },
    {
      label: (
        <span>
          <BranchesOutlined />
          My Trip
        </span>
      ),
      key: 'trip',
      children: <span className="textColor">Comming Soon..!</span>,
    },
    {
      label: (
        <span>
          <PushpinOutlined />
          Check In
        </span>
      ),
      key: 'checkIn',
      children: <span className="textColor">Comming Soon..!</span>,
    },
    {
      label: (
        <span>
          <NotificationOutlined />
          Flight Status
        </span>
      ),
      key: 'flightStatus',
      children: <span className="textColor">Comming Soon..!</span>,
    },
  ];

  return (
    <Card className="card-wrapper mainPageCard">
      <Tabs
        type="card"
        defaultActiveKey="book"
        items={item}
        className="tab-container"
        tabPosition="top"
      />
    </Card>
  );
};

export default SearchFlightCard;
