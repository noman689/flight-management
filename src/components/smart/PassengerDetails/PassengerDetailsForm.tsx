import { ExclamationCircleOutlined } from '@ant-design/icons';
import { timeOutFunc } from '@client/utils/helper';
import { Form, Input, Button, Collapse, Row, Col, Radio, Tooltip } from 'antd';
import { FC, useState } from 'react';
import './PassengerDetailsForm.scss';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const { Panel } = Collapse;

interface PassengerFormProps {
  passengerData: any;
  setSeatComponentData: any;
  setIsFormValidated: any;
}

const PassengerDetailsForm: FC<PassengerFormProps> = ({
  passengerData = [],
  setSeatComponentData,
  setIsFormValidated,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const [passengersFormData, setPassengersFormData] = useState({});
  const [showTooltip, setShowToolTip] = useState({
    seat: false,
    pay: false,
  });

  const [contactInfo, setContactInfo] = useState({
    email: JSON.parse(localStorage.getItem('user'))?.email,
    phone_number: '',
  });
  const verify = () => {
    let temp = passengersFormData;
    let isVerifeid = true;
    let isError = false;
    const formItems = Object.keys(passengersFormData);
    if (formItems.length < passengerData?.length) {
      isVerifeid = false;
    } else {
      for (let i = 0; i < formItems.length; i++) {
        const selectedItem = passengersFormData[formItems[i]];
        const selectedItemKeys = Object.keys(selectedItem);
        if (
          selectedItemKeys.includes('status')
            ? selectedItemKeys.length < 6
            : selectedItemKeys.length < 5
        ) {
          temp = {
            ...temp,
            [formItems[i]]: {
              ...temp[formItems[i]],
              ['status']: 'error',
            },
          };
          timeOutFunc();
        } else {
          for (let j = 0; j < selectedItemKeys.length; j++) {
            if (!selectedItem[selectedItemKeys[j]]?.length) {
              isError = true;
            }
          }
          if (isError) {
            temp = {
              ...temp,
              [formItems[i]]: {
                ...temp[formItems[i]],
                ['status']: 'error',
              },
            };
          } else {
            temp = {
              ...temp,
              [formItems[i]]: {
                ...temp[formItems[i]],
                ['status']: 'success',
              },
            };
          }
        }
      }
      setPassengersFormData({
        ...temp,
      });
    }
    return isVerifeid && !isError;
  };

  const parsedPassengerData = () => {
    let tempArray = [];
    let seatPlanArray = [];
    let dataArray: any = Object.values(passengersFormData);
    for (let i = 0; i < dataArray.length; i++) {
      tempArray.push({
        ...dataArray[i],
        id: passengerData[i]?.id,
        email: contactInfo.email,
        phone_number: contactInfo.phone_number,
      });
      seatPlanArray.push({
        name: `${dataArray[i].given_name} ${dataArray[i].family_name}`,
        id: passengerData[i]?.id,
      });
    }
    return {
      passengerInfo: tempArray,
      seatPlanArray,
    };
  };

  const handleClick = (btnTag) => {
    const result = verify();
    if (btnTag == 'seat') {
      setShowToolTip({
        ...showTooltip,
        [btnTag]:
          !result ||
          !contactInfo.email?.length ||
          !contactInfo.phone_number?.length,
      });
    } else {
      setShowToolTip({
        ...showTooltip,
        [btnTag]:
          !result ||
          !contactInfo.email?.length ||
          !contactInfo.phone_number?.length,
      });
    }
    if (
      result &&
      contactInfo.email?.length &&
      contactInfo.phone_number?.length
    ) {
      const paersedData = parsedPassengerData();
      setSeatComponentData(paersedData);
      setIsFormValidated(true);
    }
  };

  const handleDataChange = (key, value, index) => {
    setPassengersFormData({
      ...passengersFormData,
      [index]: {
        ...passengersFormData[index],
        [key]: value,
      },
    });
  };

  const passengerForms =
    passengerData?.length &&
    passengerData?.map((item, index) => {
      return (
        <Panel
          header={
            <div className="header-panel">
              <span>{item.type.toUpperCase()}</span>
              {passengersFormData?.[index]?.status == 'error' ? (
                <span className="error-message">
                  Kindly fill in all fields <ExclamationCircleOutlined />
                </span>
              ) : (
                <></>
              )}
            </div>
          }
          key={(index + 1).toString()}
          className="active-form"
        >
          <Form>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Row>
                  <h5>Title</h5>
                </Row>
                <div style={{ marginBottom: '15px' }}>
                  <Form.Item
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: 'Please select passenger title!',
                      },
                    ]}
                  >
                    <Radio.Group
                      onChange={(e) =>
                        handleDataChange('title', e.target.value, index)
                      }
                    >
                      <Row className="radio-group">
                        <div className="radio-box">
                          <Radio value={'mr'}>Mr</Radio>
                        </div>
                        <div className="radio-box">
                          <Radio value={'mrs'}>Mrs</Radio>
                        </div>
                        <div className="radio-box">
                          <Radio value={'ms'}>Ms</Radio>
                        </div>
                      </Row>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item
                  name="given_name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input passenger first name!',
                    },
                  ]}
                >
                  <Input
                    placeholder="First Name / Middle Name"
                    onChange={(e) =>
                      handleDataChange('given_name', e.target.value, index)
                    }
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item
                  name="family_name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input passenger last name!',
                    },
                  ]}
                >
                  <Input
                    placeholder="Last Name"
                    onChange={(e) =>
                      handleDataChange('family_name', e.target.value, index)
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginBottom: '10px' }}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item
                  name="born_on"
                  rules={[
                    {
                      required: true,
                      message: 'Please input passenger date of birth!',
                    },
                  ]}
                >
                  <Input
                    placeholder="DD/MM/YYYY"
                    type="date"
                    onChange={(e) =>
                      handleDataChange('born_on', e.target.value, index)
                    }
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <div>
                  <Form.Item
                    name="gender"
                    rules={[
                      {
                        required: true,
                        message: 'Please select passenger gender',
                      },
                    ]}
                  >
                    <Radio.Group
                      onChange={(e) =>
                        handleDataChange('gender', e.target.value, index)
                      }
                    >
                      <Row className="radio-group">
                        <div className="radio-box">
                          <Radio value={'m'}>Male</Radio>
                        </div>
                        <div className="radio-box">
                          <Radio value={'f'}>Female</Radio>
                        </div>
                      </Row>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </Form>
        </Panel>
      );
    });

  return (
    <>
      {showTooltip.pay || showTooltip.seat ? (
        <div
          className="toltip-overlay"
          onClick={() =>
            setShowToolTip({
              pay: false,
              seat: false,
            })
          }
        ></div>
      ) : (
        <></>
      )}
      <div className="passenger-details-form">
        <span className="personal-info">Personal Information</span>
        <div className="panels-section">
          <Collapse bordered={false} defaultActiveKey={'1'}>
            {passengerForms}
          </Collapse>
        </div>
        <span className="personal-info contact-form-heading">
          Contact Information
        </span>
        <div className="panels-section contact-form">
          <Input
            placeholder="Enter passenger Email"
            type="email"
            value={contactInfo.email}
            onChange={(e) =>
              setContactInfo({
                ...contactInfo,
                email: e.target.value,
              })
            }
          />

          <div className="phone-input-container">
            <PhoneInput
              placeholder="Enter phone number"
              defaultCountry="GB"
              international
              value={contactInfo.phone_number}
              onChange={(e) =>
                setContactInfo({
                  ...contactInfo,
                  phone_number: e,
                })
              }
            />
          </div>
        </div>
        <div className="btns-section">
          <Tooltip
            placement="topLeft"
            title={'Kindly Fill the Form Data to continue'}
            open={showTooltip.seat}
          >
            <Button
              type="primary"
              className={'form-submit-button'}
              onClick={() => handleClick('seat')}
            >
              Save Changes
            </Button>
          </Tooltip>
        </div>
      </div>
    </>
  );
};
export default PassengerDetailsForm;
