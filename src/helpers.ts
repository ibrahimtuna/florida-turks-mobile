import { NavigationState, PartialState, Route } from '@react-navigation/native';
import { Dimensions } from 'react-native';

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
