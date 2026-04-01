export type User = {
  id: string;
  name: {
    first: string;
    last: string;
  };
  picture: {
    large: string;
    thumbnail: string;
  };
  location: {
    city: string;
    state: string;
  };
  email: string;
  phone: string;
  registered: {
    date: string;
  };
  login: {
    uuid: string;
  };
};
