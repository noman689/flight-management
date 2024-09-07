/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import './HeaderFlightDetails.scss';
import { useHistory } from 'react-router-dom';

import { Divider } from 'antd';
// @ts-ignore
import back from '../../../assets/backbutton.svg';
// @ts-ignore
import swap from '../../../assets/swap2.svg';
// @ts-ignore
import eventLogo from '../../../assets/event.svg';
// @ts-ignore
import persons from '../../../assets/persons.svg';
// @ts-ignore
import search from '../../../assets/search.svg';
// @ts-ignore
import avatar from '../../../assets/avatar.svg';
const HeaderFlightDetails: React.FC<any> = () => {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };
  return (
    <>
      <div className="mainDiv headerTextSize">
        <div>
          <img onClick={handleGoBack} className="backButtonSize" src={back} />
          <img
            className="logoSize hideOn768"
            src="https://cssgradient.io/images/logo-55c31c59.svg"
          />
        </div>
        <div className="innerDiv borderInnerDiv">
          <div>
            <span>ABV</span>
            <img className="width45" src={swap} />
            <span>KHI</span>
          </div>
          <Divider
            className="hideOn1024 hideOn768 hideRange1350toMac"
            type="vertical"
          />
          <div className="hideOn1024 hideOn768 hideRange1350toMac">
            <img className="width45" src={eventLogo} />
            <span>Wed, 15 Mar-Thu, 16 Mar</span>
          </div>
          <Divider
            className="hideOn1024 hideOn768 hideRange1350toMac"
            type="vertical"
          />
          <div className="hideOn1024 hideOn768 hideRange1350toMac">
            <img className="width45" src={persons} />
            <span>1 Passenger</span>
          </div>
          <Divider className=" hideOn768 " type="vertical" />
          <div>
            <img className="width45 hideOn768 " src={search} />
            <span className="stylesOn768">Modify Search</span>
          </div>
        </div>

        <div>
          <img className="avatarImage" src={avatar} />
          <span className="login loginText hideOn768 hide1025to1320">
            Log in to pay Avios
          </span>
        </div>
      </div>
    </>
  );
};

export default HeaderFlightDetails;
