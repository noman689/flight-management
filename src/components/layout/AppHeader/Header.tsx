/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { UserOutlined, SearchOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Row, Col } from 'antd';
import type { MenuProps } from 'antd';
import { Dropdown, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Header.scss';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Explore',
  },
  {
    key: '2',
    label: 'Book',
  },
  {
    key: '3',
    label: 'Experience',
  },
  { key: '4', label: 'Privilege Club' },
];

const HeaderComponent: React.FC<any> = () => {
  const location = useLocation();
  const [showHeader, setShowHeader] = useState<Boolean>(true);
  // useEffect(() => {
  //   setShowHeader(location.pathname === '/');
  // }, [location.pathname]);
  return (
    <>
      {showHeader ? (
        <div className="bannerDiv parent">
          <div className="hideOnLargeScreen">
            <div className="dFlexEnd">
              <Dropdown
                menu={{
                  items,
                  selectable: true,
                  defaultSelectedKeys: ['1'],
                }}
              >
                <Typography.Link>
                  <Space>
                    <div className="menu">
                      <MenuOutlined />
                    </div>
                  </Space>
                </Typography.Link>
              </Dropdown>
              <span className="headerTexts">
                <UserOutlined /> login | Sign Up
              </span>
            </div>
            <div className="img-shadow">
              <span className="HeadingBanner">
                Discover Amazing
                <br /> Online Offers
              </span>
              <br />
              <span className="saveupto">Save Upto 20%</span>
              <div className="padding10">
                <Button className="btnBookNow">Book Now</Button>
              </div>
            </div>
          </div>
          <div className="navLinks hideOnSmallScreen main_page_width">
            <div className="header">
              <div className="d-flex">
                <img src="https://cssgradient.io/images/logo-55c31c59.svg" />
                <Link to={'/'}>
                  <span className="headerTexts">Explore</span>
                </Link>
                <span className="headerTexts">Book</span>
                <span className="headerTexts">Experience</span>
                <span className="headerTexts">Privilege Club</span>
              </div>
              <div className="d-flex">
                <span className="headerTexts">Help</span>
                <span className="headerTexts">
                  <SearchOutlined />
                </span>
                <span className="headerTexts">EN</span>
                <span className="headerTexts">
                  <UserOutlined /> login | Sign Up
                </span>
              </div>
            </div>
            <Row justify={'center'} className="bannerTextStyle">
              <Col xs={15} sm={15} md={15} lg={15}>
                <div className="img-shadow main_page_width">
                  <div className="banner-text">
                    <div className="HeadingBanner">
                      Discover Amazing
                      <br /> Online Offers
                    </div>
                    <span className="saveupto">Save Upto 20%</span>
                    <div className="padding10">
                      <Button className="btnBookNow">Book Now</Button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default HeaderComponent;
