import { API_TOKEN, SERVER_URL } from '@client/config';
import axios from 'axios';

export const searchFlightAPI = async (payload) => {
  return await axios({
    method: 'POST',
    url: `${SERVER_URL}/api/search`,
    data: payload,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${window.location.origin}/`,
      'Access-Control-Allow-Headers':
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization',
    },
  });
};

export const getFlightOffersAPI = async (id, after, before) => {
  return await axios({
    method: 'GET',
    url: `${SERVER_URL}/api/getOffers/${id}?after=${after}&before=${before}`,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${window.location.origin}/`,
      'Access-Control-Allow-Headers':
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization',
    },
  });
};

export const getSelectedOfferDetailsAPI = async (id) => {
  return await axios({
    method: 'GET',
    url: `${SERVER_URL}/api/getSingleOffer/${id}`,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${window.location.origin}/`,
      'Access-Control-Allow-Headers':
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization',
    },
  });
};

export const getSeatPlanAPI = async (id) => {
  return await axios({
    method: 'GET',
    url: `${SERVER_URL}/api/getSeatPlan/${id}`,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${window.location.origin}/`,
      'Access-Control-Allow-Headers':
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization',
    },
  });
};
