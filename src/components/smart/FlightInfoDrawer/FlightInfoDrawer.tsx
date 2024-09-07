import React, { useState } from 'react';
import { Typography, Divider, Drawer, List, Row, Timeline, Space } from 'antd';
const { Text } = Typography;
import './FlightInfoDrawer.scss';

interface FlightInfoDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  drawerData: any;
}

const FlightInfoDrawer = ({
  open,
  setOpen,
  drawerData,
}: FlightInfoDrawerProps) => {
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer
        placement="right"
        closable={true}
        onClose={onClose}
        open={open}
        // width={"500px"}
        style={{ height: '100%'}}
      >
        <h3 className="drawer-top-heading">Flight Details</h3>
        <h5> Friday, Mar 10</h5>
        <div>
          <Timeline
            className="info-timeline"
            mode={'left'}
            items={[
              {
                label: '03:14',
                color: 'green',
                children: (
                  <>
                    <p>{drawerData.segments[0].origin.city_name}</p>
                    <span>
                      {drawerData.segments[0].origin.name} (
                      {drawerData.segments[0].origin.iata_city_code})
                    </span>
                  </>
                ),
              },
              {
                label: '4h',
                color: 'gray',
                children: (
                  <>
                    <p>{drawerData.segments[0].aircraft.name}</p>
                    <span>Operated by Duffle Airways</span>
                  </>
                ),
              },
              {
                label: '05:15',
                color: 'green',
                children: (
                  <>
                    <p>{drawerData.segments[0].destination.city_name}</p>
                    <span>
                      {drawerData.segments[0].destination.name} (
                      {drawerData.segments[0].destination.iata_city_code})
                    </span>
                  </>
                ),
              },
            ]}
          />
        </div>

        {/* <Divider />
        <div style={{ marginLeft: '20px' }}>
          <Space direction="vertical">
            <Text>2h 30m transit in Doha</Text>
            <Text style={{ marginTop: 10 }}>
              Hamad International Airport (DOH)
            </Text>
            <Text type="secondary">Skytrax World’s Best Airport 2022</Text>
          </Space>
        </div> */}

        {/* <Divider />
        <h5> Friday, Mar 10</h5>
        <Row>
          <Timeline
            mode={'left'}
            items={[
              {
                label: '07:45',
                color: 'green',
                children: (
                  <>
                    <p>Doha</p>
                    <p>Hamad International Airport (DOH)</p>
                  </>
                ),
              },
              {
                label: '1h 15m',
                color: 'gray',
                children: (
                  <>
                    <p>QR1038 - Airbus A320</p>
                    <p>Operated by Qatar Airways</p>
                  </>
                ),
              },
              {
                label: '10:00',
                color: 'green',
                children: (
                  <>
                    <p>Sharjah</p>
                    <p>Sharjah International Airport (SHJ)</p>
                  </>
                ),
              },
            ]}
          />
        </Row> */}
      </Drawer>
    </>
  );
};

export default FlightInfoDrawer;
