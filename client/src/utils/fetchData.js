const server = import.meta.env.VITE_API_URL;


export const noticeGetImage = ( name ) => {
  return `${server}/notice-image/${name}`;
}

export const categoryGetImage = ( name ) => {
  return `${server}/image/category/${name}`;
}

export const userGetAvatar = ( avatar ) => {
  if (!avatar) return '';
  return avatar.startsWith('http') ? avatar : `${server}/user-avatar/${avatar}`;
}
