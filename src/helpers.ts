import { NavigationState, PartialState, Route } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { CDN_URL } from './api/endpoints.ts';

export function getLeafRouteName(
  route: Route<string> & {
    state?: NavigationState | PartialState<NavigationState>;
  },
) {
  let r: any = route;
  while (r?.state && typeof r.state.index === 'number' && r.state.routes) {
    r = r.state.routes[r.state.index];
  }
  return r?.name ?? route.name;
}

export const windowWidth = Dimensions.get('window').width;

export const cdnImage = (photoKey: string) =>
  `${CDN_URL}/${photoKey.replace('photos/', '')}`;
