const server = 'http://localhost:5000/api';


export const noticeGetImage = ( name ) => {
  return `${server}/get-image/${name}`;
}