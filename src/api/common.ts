import axios from 'axios';

type CommonAxiosProps = {
  url: string;
  method: 'GET' | 'POST' | 'PATCH' | 'PUT';
  params?: any;
  data?: any;
};

export const commonAxios = ({
  url,
  method,
  params,
  data,
}: CommonAxiosProps) => {
  return axios({
    url: `http://api.parkahnedu.com/api/${url}`,
    method,
    params,
    data,
  });
};
