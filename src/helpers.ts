import { NavigationState, PartialState, Route } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { CDN_URL } from './api/endpoints.ts';
import moment from 'moment';

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

export const formatCommentDate = (date: string | Date) => {
  const now = moment();
  const commentTime = moment(date);

  if (now.isSame(commentTime, 'day')) {
    // Today → show hour only (e.g. "10:45 AM")
    return commentTime.format('h:mm A');
  } else {
    // Previous → show "Oct 3, 10:00 AM"
    return commentTime.format('MMM D, h:mm A');
  }
};
