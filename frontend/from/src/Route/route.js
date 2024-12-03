
import Dashboard from '../components/Dashboard';
import Gallary from '../components/Gallary';
import Home from '../components/Home';

const routes = [
  {
    path: '/home',
    component: Home,
    exact: true,
    authRequired: true,
  },
  {
    path: '/dashboard',
    component: Dashboard,
    authRequired: true,
  },
  {
    path: '/gallary',
    component: Gallary,
    authRequired: true,
  }
];

export default routes;
