export type LOCATION = {
  id: string;
  location: {
    latitude: number;
    longitude: number;
  };
  displayName: {
    languageCode: string;
    text: string;
  };
  formattedAddress: string;
};

export type FILTER_LOCATION = LOCATION & { distance: number };
