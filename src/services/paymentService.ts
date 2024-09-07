import { SERVER_URL } from '@client/config';
import axios from 'axios';

export const paymentIntentAPI = async (payload) => {
  return await axios({
    method: 'POST',
    url: `${SERVER_URL}/api/paymentIntent`,
    data: payload,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${window.location.origin}/`,
      'Access-Control-Allow-Headers':
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization',
    },
  });
};

export const confirmPaymentAPI = async (id) => {
  return await axios({
    method: 'GET',
    url: `${SERVER_URL}/api/confirm-payment/${id}`,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${window.location.origin}/`,
      'Access-Control-Allow-Headers':
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization',
    },
  });
};
