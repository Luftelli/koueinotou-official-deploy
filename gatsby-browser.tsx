import 'react-chrono/dist/style.css';
import './src/styles/global.css';
import { restoreMotionPaused } from './src/utility/motion';

export const onClientEntry = restoreMotionPaused;
