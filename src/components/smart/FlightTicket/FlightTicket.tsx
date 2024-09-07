import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Button } from 'antd';
// @ts-ignore
import planeImageBlack from '../../../assets/ticketBlack.svg';
import './FlightTicket.scss';
import { isEmpty } from 'ramda';
import moment from 'moment';
import Barcode from 'react-barcode';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import FlightTicketPdf from '../FlightTicketPdf/FlightTicketPdf';

const FlightTicket = () => {
  const flightDetails = {
    from: 'Lahore',
    to: 'Dubai',
    airline: 'Qatar',
    flightNumber: '12212',
    departureTerminal: 'Lahore',
    arrivalTerminal: 'Dubai',
    departureDate: '12 Aug Tues 2021',
    departureTime: '12:40',
    arrivalDate: '12 Aug Tues 2021',
    arrivalTime: '15:40',
    seatClass: 'Economy',
    seatNumber: '56',
  };
  // const [ticketsData, setTicketsData] = useState([]);

  // useEffect(() => {
  //   const offerInfoString = localStorage.getItem('offerInfo');
  //   const meta = JSON.parse(offerInfoString);
  //   if (!isEmpty(meta)) {
  //     const dataObj = meta.confirmationDetails.data.offer?.data;

  //     dataObj.passengers.map((value) => {
  //       setTicketsData((prev) => [
  //         ...prev,
  //         {
  //           passenger: value,
  //           airline: dataObj.owner,
  //           currency: dataObj.total_currency,
  //           amount: dataObj.total_amount,
  //           slice: meta.selectedSlice?.[0],
  //         },
  //       ]);
  //     });
  //   }
  // }, [window.location.href]);

  // const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  // const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  // const handleResize = () => {
  //   setScreenWidth(window.innerWidth);
  //   setScreenHeight(window.innerHeight);
  // };

  // useEffect(() => {
  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  return (
    <>
      {/* <PDFViewer>
        <FlightTicketPdf {...flightDetails} />
      </PDFViewer> */}
      <Button style={{ borderColor: '#701644' }}>
        <PDFDownloadLink
          document={<FlightTicketPdf {...flightDetails} />}
          fileName="e-ticket.pdf"
          style={{ textDecoration: 'none', color: '#701644' }}
        >
          {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
        </PDFDownloadLink>
      </Button>
    </>
    // <div style={{ width: '100%' }}>
    //   {ticketsData.length &&
    //     ticketsData.map((item, index) => {
    //       return (
    //         <React.Fragment key={index}>
    //           <Row className="main" justify={'center'}>
    //             <Col
    //               xs={24}
    //               sm={24}
    //               md={12}
    //               lg={screenWidth === 1024 ? 11 : 8}
    //               className="flexCenter borderTopLeftRadius smallscreen-borderrighttop dottedBorder"
    //             >
    //               <img
    //                 src={item.airline.logo_symbol_url}
    //                 className="planeImage"
    //               />

    //               <span className="fontSize1">{item.airline.name}</span>
    //             </Col>
    //             <Col
    //               xs={24}
    //               sm={24}
    //               md={9}
    //               lg={screenWidth === 1024 ? 7 : 4}
    //               className="flexCenter borderTopRightRadius hideOnSmallScreens"
    //             ></Col>
    //           </Row>

    //           <Row justify={'center'} className="RowHeight mt10">
    //             <Col
    //               xs={24}
    //               sm={24}
    //               md={12}
    //               lg={screenWidth === 1024 ? 11 : 8}
    //               className="displayCenter Row2BorderCol1Top"
    //             >
    //               <div>
    //                 <span className="font70">
    //                   {item.slice.origin.iata_city_code}
    //                 </span>
    //                 <img
    //                   src={planeImageBlack}
    //                   className="planeImageWidth mx-image"
    //                 />
    //                 <span className="font70">
    //                   {item.slice.destination.iata_city_code}
    //                 </span>
    //               </div>
    //             </Col>
    //             <Col
    //               xs={24}
    //               sm={24}
    //               md={9}
    //               lg={screenWidth === 1024 ? 7 : 4}
    //               className="Row2BorderCol2Top"
    //             >
    //               <Row
    //                 justify={'center'}
    //                 className="rotate hideOnSmallScreens"
    //                 align="bottom"
    //               >
    //                 <Col xs={24} sm={24} md={24} lg={8}>
    //                   <div className=" invertedDivmarginLeft10 fontSize20 margin768 fontSizeOn768">
    //                     <span className="headingColor">Passenger</span>
    //                     <br />
    //                     <span className="text-capitalize">
    //                       {item.passenger.given_name +
    //                         ' ' +
    //                         item.passenger.family_name}
    //                     </span>
    //                   </div>
    //                 </Col>
    //                 <Col xs={24} sm={24} md={24} lg={8}>
    //                   <div className=" invertedDivmarginLeft10 fontSize20 margin768 fontSizeOn768">
    //                     <span className="headingColor">Gate</span>
    //                     <br />
    //                     <span>23A</span>
    //                   </div>
    //                 </Col>
    //                 <Col xs={24} sm={24} md={24} lg={24}>
    //                   <div className=" invertedDivmarginLeft10 fontSize20 margin768 fontSizeOn768">
    //                     <span className="headingColor">Departure</span>
    //                     <br />
    //                     <span>
    //                       {moment(item.slice.segments[0].departing_at).format(
    //                         'HH:mm:ss YYYY-MM-DD',
    //                       )}
    //                     </span>
    //                   </div>
    //                 </Col>
    //               </Row>
    //             </Col>
    //           </Row>
    //           <Row justify={'center'} align={'bottom'}>
    //             <Col
    //               xs={24}
    //               sm={24}
    //               md={12}
    //               lg={screenWidth === 1024 ? 11 : 8}
    //               className="displayCenter Row2BorderCol1 smallScreen-borderRightBottom"
    //             >
    //               <div className="footer-div">
    //                 <Row dir="col" justify={'center'}>
    //                   <div className="divOverFlow2">
    //                     <Col xs={24} sm={24} md={24} lg={24}>
    //                       <Barcode
    //                         value={item}
    //                         displayValue={false}
    //                         width={1}
    //                         height={30}
    //                       />
    //                     </Col>
    //                   </div>
    //                   <Col xs={24} sm={24} md={24} lg={24}>
    //                     <div className="dFlex fontSize20 size768">
    //                       <div className=" marginLeft10">
    //                         <span className="headingColor">Passenger</span>
    //                         <br />
    //                         <span className="text-capitalize">
    //                           {item.passenger.given_name +
    //                             ' ' +
    //                             item.passenger.family_name}
    //                         </span>
    //                       </div>
    //                       <div className=" marginLeft10">
    //                         <span className="headingColor">Gate</span>
    //                         <br />
    //                         <span>23A</span>
    //                       </div>
    //                       <div className=" marginLeft10">
    //                         <span className="headingColor">Departure</span>
    //                         <br />
    //                         <span>
    //                           {moment(
    //                             item.slice.segments[0].departing_at,
    //                           ).format('HH:mm:ss YYYY-MM-DD')}
    //                         </span>
    //                       </div>
    //                     </div>
    //                   </Col>
    //                 </Row>
    //               </div>
    //             </Col>
    //             <Col
    //               xs={24}
    //               sm={24}
    //               md={9}
    //               lg={screenWidth === 1024 ? 7 : 4}
    //               className="Row2BorderCol2 hideOnSmallScreens"
    //             >
    //               <Row>
    //                 <Col
    //                   xs={24}
    //                   sm={24}
    //                   md={24}
    //                   lg={24}
    //                   style={{ textAlign: 'center', marginTop: '20px' }}
    //                 >
    //                   <div className="divOverFlow1">
    //                     <Barcode
    //                       value={item}
    //                       displayValue={false}
    //                       width={1}
    //                       height={30}
    //                     />
    //                   </div>
    //                 </Col>
    //               </Row>
    //             </Col>
    //           </Row>

    //         </React.Fragment>
    //       );
    //     })}
    // </div>
  );
};

export default FlightTicket;
