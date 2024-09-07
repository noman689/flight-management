import { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Row,
  Col,
  Popover,
  Radio,
  Slider,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './NewFlightSearchForm.scss';
import { useHistory } from 'react-router-dom';
import { searchFlightAPI } from '@client/services/searchFlightService';
import Spin from '@client/components/presentational/Spin';
// @ts-ignore
import { searchPlacesAPI } from '@client/services/searchPlacesServices';
import { getAllAirlinesAPI } from '@client/services/airlineServices';
import { SliderMarks } from 'antd/es/slider';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
// @ts-ignore
import planeTakeOffImage from '../../../assets/takeoff-the-plane.svg';
// @ts-ignore
import planeLandingImage from '../../../assets/plane-landing.svg';
interface FlightSearchFormProps {
  isStickyNav?: boolean;
  initialValues?: any;
}

const marks: SliderMarks = {
  0: '00:00',
  8: '08:00',
  16: '16:00',
  22.99: '23:59',
};

const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  return current && current < dayjs().endOf('day');
};

const NewFlightSearchForm = ({ initialValues }: FlightSearchFormProps) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [allAirlines, setAllAirlines] = useState([]);
  const [originCity, setOriginCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [departureCities, setDepartureCities] = useState([]);
  const [destinationCities, setDestinationCities] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [departureVisibility, setDepartureVisibility] = useState(false);
  const [returnVisibility, setReturnVisibility] = useState(false);
  const [ticketType, setTicketType] = useState('oneWay');
  const [hideFilter, setHideFilter] = useState(false);
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);
  const [rangeValues, setRangeValues] = useState({
    to_departure: [],
    from_departure: [],
    to_arrival: [],
    from_arrival: [],
  });
  const cabinClass = [
    { label: 'Economy', value: 'economy' },
    { label: 'Premium Economy', value: 'premium_economy' },
    { label: 'Business', value: 'business' },
    { label: 'First', value: 'first' },
    { label: 'Any', value: 'any' },
  ];

  const airlines = [
    { label: 'Fly Dubai', value: '1' },
    { label: 'Fly Emirates', value: '2' },
    { label: 'PIA', value: '3' },
    { label: 'Blue Airline', value: '4' },
    { label: 'Sky Ways', value: '5' },
    { label: 'Qatar Airways', value: '6' },
  ];


  const onFinish = async (values) => {
    const passengers = [
      ...[...new Array(adult)].map((item) => {
        return { type: 'adult' };
      }),
      ...[...new Array(children)].map((item) => {
        return { type: 'child' };
      }),
    ];

    const payload = {
      origin: values.origin,
      destination: values.destination,
      departure_date: values.departure_date?.toISOString(),
      return_date: values.return_date?.toISOString(),
      cabin_class: values.cabin_class,
      passengers: passengers,
      rangeValues: rangeValues,
      return_offer: ticketType == 'return' ? true : false,
    };
    try {
      setIsLoading(true);
      const { data } = await searchFlightAPI(payload);
      setIsLoading(false);
      history.push(`/flight-details/${data?.offer?.id}`);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  useEffect(() => {
    const setPassengersAbout = () => {
      if (initialValues) {
        const adultCount = initialValues.passengersData.filter(
          (item) => item.type == 'adult',
        );
        const childCount = initialValues.passengersData.filter(
          (item) => item.type == 'child',
        );
        setAdult(adultCount.length);
        setChildren(childCount.length);
        setTicketType(initialValues.isReturnFlight ? 'return' : 'oneWay');
      }
    };
    setPassengersAbout();
  }, []);

  // useEffect(() => {
  //   const getAllAirlines = async () => {
  //     try {
  //       const {data} = await getAllAirlinesAPI();
  //       setAllAirlines(data?.offer?.data)
  //     } catch (e) {
  //       console.log('e', e);
  //     }
  //   };
  //   getAllAirlines();
  // }, []);

  const handleStudentSearch = async (value, type) => {
    try {
      setIsSearching(true);
      const result = await searchPlacesAPI(value);
      type == 'origin'
        ? setDepartureCities(result?.data?.offer?.data)
        : setDestinationCities(result?.data?.offer?.data);
      setIsSearching(false);
    } catch (error) {
      setIsSearching(false);
    }
  };

  function handleCount(type: string, method: string) {
    if (method === 'add') {
      type === 'adult' ? setAdult(adult + 1) : setChildren(children + 1);
    } else {
      if (type === 'adult' && adult > 0) {
        setAdult(adult - 1);
      } else if (children > 0) {
        setChildren(children - 1);
      }
    }
  }

  const showRange = (value) => {
    if (value?.[0] > 0 && value?.[1] == 23) {
      return (
        <span>
          after <b>{Math.trunc(value[0])}:00</b>
        </span>
      );
    } else if (value?.[1] < 23 && value?.[0] == 0) {
      return (
        <span>
          before <b>{Math.trunc(value[1])}:00</b>
        </span>
      );
    } else if (value?.[0] > 0 && value?.[1] < 23) {
      return (
        <span>
          <b>{Math.trunc(value[0])}:00</b>-<b>{Math.trunc(value[1])}:00</b>
        </span>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <div className="flight-search-form">
        <div className="paddingLR">
          <Form
            onFinish={onFinish}
            form={form}
            layout="vertical"
            initialValues={{
              cabin_class: initialValues?.cabin_class ?? 'economy',
              origin: initialValues?.origin,
              destination: initialValues?.destination,
              departure_date: initialValues?.startDate
                ? dayjs(initialValues?.startDate)
                : null,
              return_date: initialValues?.endDate
                ? dayjs(initialValues?.endDate)
                : null,
            }}
          >
            <Row className="MainRow">
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="mar-b flex-item">
                  <label className="trip-label">Select Trip Type</label>
                  <Radio.Group
                    onChange={(e) => setTicketType(e.target.value)}
                    value={ticketType}
                    defaultValue={ticketType}
                  >
                    <Radio value="oneWay">
                      <span className="radioHeading">One Way</span>
                    </Radio>
                    <Radio value="return">
                      <span className="radioHeading">Return</span>
                    </Radio>
                    {/* <Radio value="multi-city">
                      <span className="radioHeading">Multi City</span>
                    </Radio> */}
                  </Radio.Group>
                </div>
              </Col>
              <Row gutter={[8, 0]} style={{ width: '100%' }}>
                <Col xs={24} sm={24} md={24} lg={12}>
                  <Form.Item
                    label="Origin"
                    name="origin"
                    rules={[
                      {
                        required: true,
                        message: 'Search Departure city',
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      showSearch
                      className="autoCompletegeneral"
                      style={{ width: '100%' }}
                      placeholder="Search Departure City"
                      notFoundContent={null}
                      // onChange={(value) => setOriginCity(value)}
                      onSearch={(value) => {
                        handleStudentSearch(value, 'origin');
                      }}
                      filterOption={false}
                      // value={originCity}
                      loading={isSearching}
                    >
                      {departureCities
                        ?.filter((res) => res.city_name !== null)
                        .map((item, index) => {
                          return (
                            <Select.Option value={item.iata_code} key={index}>
                              {`${item.city_name} (${item.name})`}
                            </Select.Option>
                          );
                        })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12}>
                  <Form.Item
                    label="Destination"
                    name="destination"
                    rules={[
                      {
                        required: true,
                        message: 'Search destination city',
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      showSearch
                      style={{ width: '100%' }}
                      placeholder="Search Arrival City"
                      optionFilterProp="children"
                      className="arrival-city"
                      notFoundContent={null}
                      onChange={(value) => setDestinationCity(value)}
                      onSearch={(value) => {
                        handleStudentSearch(value, 'destination');
                      }}
                      filterOption={false}
                      value={destinationCity}
                      loading={isSearching}
                    >
                      {destinationCities
                        ?.filter((res) => res.city_name !== null)
                        .map((item, index) => {
                          return (
                            <Select.Option value={item.iata_code} key={index}>
                              {`${item.city_name} (${item.name})`}
                            </Select.Option>
                          );
                        })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              {ticketType === 'return' ? (
                <>
                  <Col xs={24} sm={24} md={24} lg={12}>
                    <Form.Item
                      name="departure_date"
                      rules={[
                        {
                          required: true,
                          message: 'Select departure date',
                        },
                      ]}
                      label="Departure Date"
                      className="form-input"
                    >
                      <DatePicker
                        style={{ width: '99%', padding: '14px' }}
                        disabledDate={disabledDate}
                      />
                    </Form.Item>
                    <Popover
                      placement={`bottom`}
                      trigger="click"
                      open={departureVisibility}
                      content={
                        <div style={{ width: '280px' }}>
                          <div>
                            <div className="range-header">
                              <span>
                                <img
                                  className="planeLogo"
                                  src={planeTakeOffImage}
                                />
                                Take Off
                              </span>
                              <span>
                                {showRange(rangeValues.from_departure)}
                              </span>
                            </div>
                            <Slider
                              min={0}
                              max={23}
                              range={{ draggableTrack: true }}
                              defaultValue={[0, 23]}
                              marks={marks}
                              tooltip={{ open: false }}
                              onChange={(value) =>
                                setRangeValues({
                                  ...rangeValues,
                                  from_departure: value,
                                })
                              }
                            />
                          </div>
                          <br />
                          <div>
                            <div className="range-header">
                              <span>
                                <img
                                  className="planeLogo"
                                  src={planeLandingImage}
                                />
                                Landing
                              </span>
                              <span>{showRange(rangeValues.to_departure)}</span>
                            </div>
                            <Slider
                              min={0}
                              max={23}
                              range={{ draggableTrack: true }}
                              defaultValue={[0, 23]}
                              marks={marks}
                              tooltip={{ open: false }}
                              onChange={(value) =>
                                setRangeValues({
                                  ...rangeValues,
                                  to_departure: value,
                                })
                              }
                            />
                          </div>
                          <div className="dflexFlexEnd">
                            <Button
                              className="btnConfirm"
                              onClick={() => setDepartureVisibility(false)}
                            >
                              Confirm
                            </Button>
                          </div>
                        </div>
                      }
                    >
                      <div
                        className="containerBtn"
                        onClick={() =>
                          setDepartureVisibility(!departureVisibility)
                        }
                      >
                        <span className="btnAnyTime">At any time</span>
                        <span style={{ color: '#985eaf' }}>
                          <DownOutlined />
                        </span>
                      </div>
                    </Popover>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12}>
                    <Form.Item
                      label="Return Date"
                      name="return_date"
                      className="form-input popover-anyTime"
                      rules={[
                        {
                          required: true,
                          message: 'Select Return date',
                        },
                      ]}
                    >
                      <DatePicker
                        style={{ width: '99%', padding: '14px' }}
                        disabledDate={disabledDate}
                      />
                    </Form.Item>
                    <Popover
                      placement={`bottom`}
                      trigger="click"
                      open={returnVisibility}
                      content={
                        <div style={{ width: '300px' }}>
                          <div>
                            <div className="range-header">
                              <span>
                                <img
                                  className="planeLogo"
                                  src={planeTakeOffImage}
                                />
                                Take Off
                              </span>
                              <span>{showRange(rangeValues.from_arrival)}</span>
                            </div>
                            <Slider
                              min={0}
                              max={23}
                              range={{ draggableTrack: true }}
                              defaultValue={[0, 23]}
                              marks={marks}
                              tooltip={{ open: false }}
                              onChange={(value) =>
                                setRangeValues({
                                  ...rangeValues,
                                  from_arrival: value,
                                })
                              }
                            />
                          </div>
                          <br />
                          <div>
                            <div className="range-header">
                              <span>
                                <img
                                  className="planeLogo"
                                  src={planeLandingImage}
                                />
                                Landing
                              </span>
                              <span>{showRange(rangeValues.to_arrival)}</span>
                            </div>
                            <Slider
                              min={0}
                              max={23}
                              range={{ draggableTrack: true }}
                              defaultValue={[0, 23]}
                              marks={marks}
                              tooltip={{ open: false }}
                              onChange={(value) =>
                                setRangeValues({
                                  ...rangeValues,
                                  to_arrival: value,
                                })
                              }
                            />
                          </div>
                          <div className="dflexFlexEnd">
                            <Button
                              className="btnConfirm"
                              onClick={() => setReturnVisibility(false)}
                            >
                              Confirm
                            </Button>
                          </div>
                        </div>
                      }
                    >
                      <div className="containerBtn">
                        <span
                          className="btnAnyTime"
                          onClick={() => setReturnVisibility(!returnVisibility)}
                        >
                          At any time
                        </span>
                        <span style={{ color: '#985eaf' }}>
                          <DownOutlined />
                        </span>
                      </div>
                    </Popover>
                  </Col>
                </>
              ) : (
                <Col xs={24} sm={24} md={24} lg={24}>
                  <Form.Item
                    name="departure_date"
                    rules={[
                      {
                        required: true,
                        message: 'Select departure date',
                      },
                    ]}
                    label="Departure Date"
                    className="form-input"
                  >
                    <DatePicker
                      style={{ width: '99%', padding: '14px' }}
                      disabledDate={disabledDate}
                    />
                  </Form.Item>
                  <Col xs={24} sm={24} md={14} lg={14}>
                    <Popover
                      open={departureVisibility}
                      placement={`bottom`}
                      trigger="click"
                      content={
                        <div style={{ width: '300px' }}>
                          <div>
                            <div className="range-header">
                              <span>
                                <img
                                  className="planeLogo"
                                  src={planeTakeOffImage}
                                />
                                Take Off
                              </span>
                              <span>
                                {showRange(rangeValues.from_departure)}
                              </span>
                            </div>
                            <Slider
                              min={0}
                              max={23}
                              range={{ draggableTrack: true }}
                              defaultValue={[0, 23]}
                              marks={marks}
                              tooltip={{ open: false }}
                              onChange={(value) =>
                                setRangeValues({
                                  ...rangeValues,
                                  from_departure: value,
                                })
                              }
                            />
                          </div>
                          <br />
                          <div>
                            <div className="range-header">
                              <span>
                                <img
                                  className="planeLogo"
                                  src={planeLandingImage}
                                />
                                Landing
                              </span>
                              <span>{showRange(rangeValues.to_departure)}</span>
                            </div>
                            <Slider
                              min={0}
                              max={23}
                              range={{ draggableTrack: true }}
                              defaultValue={[0, 23]}
                              marks={marks}
                              tooltip={{ open: false }}
                              onChange={(value) =>
                                setRangeValues({
                                  ...rangeValues,
                                  to_departure: value,
                                })
                              }
                            />
                          </div>
                          <div className="dflexFlexEnd">
                            <Button
                              className="btnConfirm"
                              onClick={() => setDepartureVisibility(false)}
                            >
                              Confirm
                            </Button>
                          </div>
                        </div>
                      }
                    ></Popover>
                    <div className="containerBtn">
                      <span
                        className="btnAnyTime"
                        onClick={() =>
                          setDepartureVisibility(!departureVisibility)
                        }
                      >
                        At any time
                      </span>
                      <span style={{ color: '#985eaf' }}>
                        <DownOutlined />
                      </span>
                    </div>
                  </Col>
                </Col>
              )}
              <Col xs={24} sm={24} md={24} lg={12}>
                <Form.Item
                  name="passengers-count"
                  rules={[
                    {
                      required: false,
                      message: 'Please Enter passengers & class',
                    },
                  ]}
                >
                  <Popover
                    placement={`bottom`}
                    trigger="click"
                    content={
                      <>
                        <div className="agePopover">
                          <div className="ageTitle">
                            <span className="fontSize20">Adults</span>
                            <span className="">18+</span>
                          </div>
                          <Row align={'middle'}>
                            <Button
                              onClick={() => handleCount('adult', 'subtract')}
                              style={{ background: '#701644', opacity: '0.7' }}
                            >
                              <span className="ageIcon">-</span>
                            </Button>

                            <div style={{ minWidth: '20px' }}>
                              <span style={{ marginInline: '10px' }}>
                                {adult}
                              </span>
                            </div>
                            <Button
                              onClick={() => handleCount('adult', 'add')}
                              style={{ background: '#701644' }}
                            >
                              <span className="ageIcon">+</span>
                            </Button>
                          </Row>
                        </div>

                        <div className="agePopover">
                          <div className="ageTitle">
                            <div style={{ minWidth: '20px' }}>
                              <span className="fontSize20">Children</span>
                            </div>
                            <span className="">0--17</span>
                          </div>
                          <Row align={'middle'}>
                            <Button
                              onClick={() =>
                                handleCount('children', 'subtract')
                              }
                              style={{ background: '#701644', opacity: '0.7' }}
                            >
                              <span className="ageIcon">-</span>
                            </Button>

                            <span style={{ marginInline: '10px' }}>
                              {children}
                            </span>
                            <Button
                              onClick={() => handleCount('children', 'add')}
                              style={{ background: '#701644' }}
                            >
                              <span className="ageIcon">+</span>
                            </Button>
                          </Row>
                        </div>
                      </>
                    }
                    onOpenChange={handleOpenChange}
                  >
                    <Form.Item label="Passanger">
                      <Input
                        name="passenger"
                        key="passenger-count"
                        readOnly={true}
                        value={` Adult: ${adult} And  Children :${children}  `}
                        style={{
                          borderRadius: '8px',
                          width: '99%',
                          padding: '14px',
                        }}
                        placeholder="Enter passengers & class"
                        className="form-input"
                        onClick={() => {
                          setOpen(!open);
                        }}
                      />
                    </Form.Item>
                  </Popover>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12}>
                <Form.Item
                  label="Class"
                  name="cabin_class"
                  rules={[
                    {
                      required: true,
                      message: 'Select Class Type',
                    },
                  ]}
                >
                  <Select
                    className="autoCompletegeneral"
                    style={{ width: '100%' }}
                    placeholder="Select Class Type"
                  >
                    {cabinClass?.map((item, index) => {
                      return (
                        <Select.Option value={item.value} key={index}>
                          {item.label}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              {/* <Col xs={24} sm={24} md={24} lg={24} className="dflexFlexEnd">
                <span
                  className="fontSize padding-right10 advance-link"
                  onClick={() => {
                    setHideFilter(!hideFilter);
                  }}
                >
                  Advance options
                </span>
              </Col> */}

              {/* {hideFilter && (
                <Col xs={24} sm={24} md={24} lg={24} className="Airline">
                  <Select
                    mode="multiple"
                    placeholder="Select Airline Companies"
                    onChange={handleChange}
                    value={selectedValues}
                  >
                    {allAirlines?.slice(0,15)?.map((item, index) => {
                      return (
                        <Select.Option value={item.value} key={index}>
                          {item.label}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Col>
              )} */}

              <Col xs={24} sm={24} md={24} lg={24} className="centerBtn">
                <Button
                  type="default"
                  htmlType="submit"
                  className="form-button btnSearchFlight"
                >
                  {isLoading ? (
                    <Spin />
                  ) : (
                    <span className="showFlightBtn">
                      <span style={{ fontSize: '20px' }}>Show Flights</span>
                      <img
                        className="flighiconsize"
                        src="https://www.svgrepo.com/show/346908/flight-takeoff.svg"
                      />
                    </span>
                  )}
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
};

export default NewFlightSearchForm;
