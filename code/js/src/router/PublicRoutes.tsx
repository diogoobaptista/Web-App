import { IRoutes } from './IRoutes';
import Login from '../pages/login';
const publicRoutes: IRoutes[] = [
    {
        path: '/',
        component: Login,
        exact: true,
    }
];
export default publicRoutes;