import React from 'react';
import { Card, Row, Col, Divider } from 'antd';
import './PassengerDetailsPage.scss';
import moment from 'moment';
// @ts-ignore
import planeIcon from '../../../assets/ticketBlack.svg';
import { getDuration } from '@client/utils/helper';
interface FlightSummaryProps {
  summaryData: any;
  fare: string;
}

const FlightSummary: React.FC<FlightSummaryProps> = ({ summaryData, fare }) => {
  return (
    <Card title="Your Trip Summary" className="main-card">
      {summaryData?.data?.slices?.length &&
        summaryData.data.slices.map((slice) => {
          return (
            slice?.segments?.length &&
            slice?.segments?.map((item, index) => {
              return (
                <Col>
                  {index == 0 && (
                    <Row justify="space-between">
                      <div className="about-flight-heading">
                        {slice.segments[0].origin.iata_city_code}{' '}
                        <img src={planeIcon} width={15} />{' '}
                        {
                          slice.segments[slice.segments.length - 1].destination
                            .iata_city_code
                        }
                      </div>
                    </Row>
                  )}
                  <Row justify="space-between">
                    <div>{moment(item?.departing_at).format('DD-MM-YYYY')}</div>
                    <div>{moment(item?.arriving_at).format('DD-MM-YYYY')}</div>
                  </Row>
                  <Row justify="space-between" className="red-head">
                    <div>{moment(item?.departing_at).format('hh:mm A')}</div>
                    <div>{moment(item?.arriving_at).format('hh:mm A')}</div>
                  </Row>
                  <Row className="indicators">
                    <div>
                      {getDuration(item?.departing_at, item?.arriving_at)}
                    </div>
                    <span className="pathway">
                      <span className="point" />
                    </span>
                  </Row>
                  <Row justify="space-between">
                    <div>{item?.origin?.city_name}</div>
                    <div>{item?.destination?.city_name}</div>
                  </Row>
                </Col>
              );
            })
          );
        })}
      <Divider />
      <Row justify="space-between">
        <div>Total Trip Price:</div>
        <div className="card-bottom-title red-head">£{fare}</div>
      </Row>
    </Card>
  );
};

export default FlightSummary;
