import React from 'react';
import { Layout, Row, Col } from 'antd';
import './Footer.scss';
// @ts-ignore
import WavyFooter from '../../../assets/wavyFooter.png';

const { Footer } = Layout;

const MyFooter: React.FC = () => {
  return (
    <div>
      <Row>
        <img src={WavyFooter} alt="svg" className="wavyFooter" />
      </Row>
      <Footer className="footer">
        <Row className="footer-top">
          <Col span={6}>
            <h3>Travel With Us</h3>
            <ul className="footer-links">
              <li>
                <a href="#">Plan Your Trip</a>
              </li>
              <li>
                <a href="#">Travel Information</a>
              </li>
              <li>
                <a href="#">Our Destinations</a>
              </li>
              <li>
                <a href="#">Book Your Trip</a>
              </li>
            </ul>
          </Col>
          <Col span={6}>
            <h3>Our Company</h3>
            <ul className="footer-links">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Corporate Information</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Press Room</a>
              </li>
            </ul>
          </Col>
          <Col span={6}>
            <h3>Customer Service</h3>
            <ul className="footer-links">
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Help &amp; Support</a>
              </li>
              <li>
                <a href="#">Feedback</a>
              </li>
              <li>
                <a href="#">Frequently Asked Questions</a>
              </li>
            </ul>
          </Col>
          <Col span={6}>
            <h3>Customer Service</h3>
            <ul className="footer-links">
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Help &amp; Support</a>
              </li>
              <li>
                <a href="#">Feedback</a>
              </li>
              <li>
                <a href="#">Frequently Asked Questions</a>
              </li>
            </ul>
          </Col>
        </Row>
        <div className="footer-bottom">
          <div className="footer-logo">
            <img
              src="https://cssgradient.io/images/logo-55c31c59.svg"
              alt="My Logo"
            />
          </div>
          <div className="footer-info">
            <p>© 2023 My Website. All rights reserved.</p>
            <p>Privacy Policy | Terms and Conditions</p>
          </div>
        </div>
      </Footer>
    </div>
  );
};

export default MyFooter;
