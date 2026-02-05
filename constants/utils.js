import { StatusBar } from 'react-native';

const base = '100px';

export const StatusHeight = StatusBar.currentHeight;
export const HeaderHeight = (base * 3.5 + (StatusHeight || 0));
// export const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812);