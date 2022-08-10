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
    url: `https://jy-academy.herokuapp.com/api/${url}`,
    method,
    params,
    data,
  });
};
