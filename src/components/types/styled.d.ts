import {Theme} from '../themes/defaultTheme';
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
