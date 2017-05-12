import 'isomorphic-fetch';

export const SEARCH_ADDRESS_GOOGLE_SUCCESS = 'SEARCH_ADDRESS_GOOGLE_SUCCESS';
export const SEARCH_ADDRESS_GOOGLE_ERROR = 'SEARCH_ADDRESS_GOOGLE_ERROR';
export const USE_CURRENT_LOCATION_SUCCESS = 'USE_CURRENT_LOCATION_SUCCESS';
export const USE_CURRENT_LOCATION_ERROR = 'USE_CURRENT_LOCATION_ERROR';
export const GET_YOU_TUBE_PLAYLIST_SUCCESS = 'GET_YOU_TUBE_PLAYLIST_SUCCESS';
export const GET_YOU_TUBE_PLAYLIST_ERROR = 'GET_YOU_TUBE_PLAYLIST_ERROR';


// action creators
export const searchAddressGoogleSuccess = officialsData => ({
  type: SEARCH_ADDRESS_GOOGLE_SUCCESS,
  officialsData,
});

export const searchAddressGoogleError = address => ({
  type: SEARCH_ADDRESS_GOOGLE_ERROR,
  address,
});

export const getYouTubePlaylistSuccess = (playlist, office) => ({
  type: GET_YOU_TUBE_PLAYLIST_SUCCESS,
  playlist,
  office,
});

export const getYouTubePlaylistError = () => ({
  type: GET_YOU_TUBE_PLAYLIST_ERROR,
});
