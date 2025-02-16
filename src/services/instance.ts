import ky from 'ky';

// const prefixUrl = `${process.env.API_URL ? process.env.API_URL : 'http://46.202.190.180/backend/api'}/`;
const prefixUrl = `http://46.202.190.180/backend/api/`;
export const prefixImageUrl= `http://46.202.190.180/backend/`
export const instance = ky.extend({
  prefixUrl,
  headers: {
    Accept: 'application/json',
  },
});
