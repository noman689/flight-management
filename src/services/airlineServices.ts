import { SERVER_URL } from '@client/config';
import axios from 'axios';

export const getAllAirlinesAPI = async () => {
  return await axios({
    method: 'GET',
    url: `${SERVER_URL}/api/getAirlines`,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${window.location.origin}/`,
      'Access-Control-Allow-Headers':
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization',
    },
  });
};
