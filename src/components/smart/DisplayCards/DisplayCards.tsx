import { Card, Col, Row } from 'antd';
import React from 'react';
import './DisplayCards.scss';
const { Meta } = Card;

const DisplayCards: React.FC = () => (
  <div>
    <div className="content">
      <h3 className="planing-start">Start planning your next trip</h3>
      <h5 className="planning-desc">
        Thinking of travelling somewhere soon? Here are some options to help you
        get started.
      </h5>
    </div>
    <Row
      className="test3"
      justify={'center'}
      style={{ display: 'flex', gap: 20 }}
    >
      <div>
        <Col xs={24} sm={24} md={14} lg={11}>
          <div className="img1">
            <Card
              hoverable
              cover={
                <img
                  alt="card image"
                  className="test"
                  style={{ objectFit: 'cover', height: 360, width: 400 }}
                  src="https://www.qatarairways.com/content/dam/images/renditions/horizontal-2/campaigns/global/mobile/h2-mobile-europe-ar.jpg"
                />
              }
            >
              <h4 className="styled-text">Discover Amazing Online Offers</h4>
              <a href="#" style={{ textDecoration: 'none' }}>
                <Meta title="Book Now" />
              </a>
            </Card>
          </div>
        </Col>
      </div>
      <div>
        <Col xs={24} sm={24} md={14} lg={7}>
          <div className="img2">
            <Card
              hoverable
              cover={
                <img
                  alt="card image"
                  className="test"
                  style={{ objectFit: 'cover', height: 360, width: 260 }}
                  src="https://www.qatarairways.com/content/dam/images/renditions/square/brand/qsuite/s-qsuite-ife-dine.jpg"
                />
              }
            >
              <h4 className="styled-text">Elevate Your Experience</h4>
              <a href="#" style={{ textDecoration: 'none' }}>
                <Meta title=" Purchase add-ons" />
              </a>
            </Card>
          </div>
        </Col>
      </div>
      <div>
        <Col xs={24} sm={24} md={14} lg={6}>
          <div className="test2">
            <div>
              <Row>
                <div style={{ maxWidth: 400, height: 200 }}>
                  <Card
                    hoverable
                    cover={
                      <img
                        className="test"
                        alt="card image"
                        style={{ objectFit: 'cover', height: 141, width: 220 }}
                        src="https://www.qatarairways.com/content/dam/images/renditions/horizontal-3/brand/aircraft/a350/h3-a350-1000-doha2.jpg"
                      />
                    }
                  >
                    <h4 className="styled-text">Travel Requirments</h4>

                    <a href="#" style={{ textDecoration: 'none' }}>
                      <Meta title="Find Out More" />
                    </a>
                  </Card>
                </div>
              </Row>
            </div>
            <div>
              <Row>
                <div style={{ maxWidth: 400, height: 200 }}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt="card image"
                        className="test"
                        style={{
                          objectFit: 'cover',
                          height: 141,
                          width: 220,
                        }}
                        src="https://www.qatarairways.com/content/dam/images/renditions/horizontal-3/miscellaneous/map/h3-destination-discovery-map-laptop.jpg"
                      />
                    }
                  >
                    <h4 className="styled-text">Explore our destinations</h4>
                    <a href="#" style={{ textDecoration: 'none' }}>
                      <Meta title="Find Flights and Fares" />
                    </a>
                  </Card>
                </div>
              </Row>
            </div>
          </div>
        </Col>
      </div>
    </Row>
  </div>
);

export default DisplayCards;
