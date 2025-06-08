// instance.ts
import { storage } from '@/App';
import { AuthProvider } from '@/hooks/AuthContext/AuthContext';
import ky from 'ky';
import _ from 'lodash';
// const prefixUrl = `${process.env.API_URL ? process.env.API_URL : 'http://46.202.190.180/backend/api'}/`;
const prefixUrl = `http://46.202.190.180/backend/api/`;
export const prefixImageUrl = `http://46.202.190.180/backend/`;

export const instance = ky.extend({
  prefixUrl,
  headers: {
    Accept: 'application/json',
  },
});

const getAuthToken = () => {
  const token = storage.getString('@auth_token'); 
  return token;
};

// Create ky instance with hooks (interceptors)
export const authorizedInstance = ky.create({
  prefixUrl,
  hooks: {
    // Request interceptor equivalent
    beforeRequest: [
      (request) => {
        const token = getAuthToken(); // Don't call useAuth() here

        // Set Content-Type if not multipart/form-data
        if (!request.headers.get('Content-Type')?.includes('multipart/form-data')) {
          request.headers.set('Content-Type', 'application/json');
        }

        // Inject token
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }

        // Handle refresh token endpoint
        if (request.url.includes('refresh-token')) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }

        // Set language header
        request.headers.set('Accept', 'application/json');
        console.log({ 
          url: request.url, 
          headers: Object.fromEntries(request.headers.entries()) 
        });
      }
    ],

    // Response error interceptor equivalent
    beforeError: [
      async (error) => {
        const { response } = error;
        const token = getAuthToken(); // Don't call useAuth() here
        
        console.log({ errorInterceptor: JSON.stringify(error) });

        if (response?.status === 401 && !_.isEmpty(token)) {
          console.log("gena hena", error);

          // Handle logout - you might need to adjust this based on your auth setup
          AuthProvider.prototype.operations.signOut();
          // store.dispatch(clearScanBeltData()); // Make sure to import store if needed
          // storage.clearAll(); // Make sure to import storage if needed
          // storage.delete('access_token'); // Clear token from storage
          storage.clearAll(); // Clear token from storage
        }

        // Re-throw the error to maintain error flow
        return error;
      }
    ],

    // Success response interceptor
    afterResponse: [
      async (request, options, response) => {
        return response;
      }
    ]
  }
});

// Usage examples:
// GET request
// const getData = async () => {
//   try {
//     const data = await httpClient.get('api/data').json();
//     return data;
//   } catch (error) {
//     console.error('Request failed:', error);
//     throw error;
//   }
// };

// // POST request
// const postData = async (payload: any) => {
//   try {
//     const data = await httpClient.post('api/data', { json: payload }).json();
//     return data;
//   } catch (error) {
//     console.error('Request failed:', error);
//     throw error;
//   }
// };

// // Multipart form data (file upload)
// const uploadFile = async (formData: FormData) => {
//   try {
//     const data = await httpClient.post('api/upload', { body: formData }).json();
//     return data;
//   } catch (error) {
//     console.error('Upload failed:', error);
//     throw error;
//   }
// };
