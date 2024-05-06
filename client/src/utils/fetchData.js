const server = import.meta.env.VITE_API_URL;


export const noticeGetImage = ( name ) => {
  return `${server}/notice-image/${name}`;
}

export const categoryGetImage = ( name ) => {
  return `${server}/image/category/${name}`;
}

export const userGetAvatar = ( name ) => {
  return `${server}/user-avatar/${name}`;
}
