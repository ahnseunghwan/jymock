import axios from 'axios';

type CommonAxiosProps = {
  url: string;
  method: 'GET' | 'POST' | 'PATCH' | 'PUT';
  params?: any;
};

export const commonAxios = ({ url, method, params }: CommonAxiosProps) => {
  return axios({
    url: `https://jy-academy.herokuapp.com/api/${url}`,
    method,
    params,
  });
};
