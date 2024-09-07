import { SERVER_URL } from '@client/config';
import axios from 'axios';

export const createOrderAPI = async (payload) => {
  return await axios({
    method: 'POST',
    url: `${SERVER_URL}/api/create-order`,
    data: payload,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${window.location.origin}/`,
      'Access-Control-Allow-Headers':
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization',
    },
  });
};
