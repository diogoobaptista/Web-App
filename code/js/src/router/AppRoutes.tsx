import { IRoutes } from './IRoutes';
import Home from '../pages/home';
import Projects from '../pages/projects';
import Project from '../pages/project';
import Issue from '../pages/issue';
const appRoutes: IRoutes[] = [
  {
    path: '/home',
    component: Home,
    exact: true,
  },
  {
    path: '/projects',
    component: Projects,
    exact: true,
  },
  {
    path: '/project/:id',
    component: Project,
    exact: true,
  },
  {
    path: '/project/:id/issue/:issueId',
    component: Issue,
    exact: true,
  }
];
export default appRoutes;