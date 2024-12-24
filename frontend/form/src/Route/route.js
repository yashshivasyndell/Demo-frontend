import Addwords from '../components/Addwords';
import AdminPanel from '../components/AdminPanel';
import Dashboard from '../components/Dashboard';
import Gallary from '../components/Gallary';
import Home from '../components/Home';
import Loader from '../components/Loader';
import Profile from '../components/Profile';
import { UserLogin } from '../components/UserLogin';
import Usertable from '../components/Usertable';

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
  },
  {
    path: '/profile',
    component: Profile,
    authRequired: true,
  },
  {
    path: '/table',
    component: Usertable,
    authRequired: true,
  },
  {
    path: '/adminpanel',
    component: AdminPanel,
    authRequired: true,
  },
  {
    path: '/addword',
    component: Addwords,
    authRequired: true,
  },
  {
    path: '/loader',
    component: Loader,
    authRequired: true,
  },
  {
    path: '/login',
    component: UserLogin,
    authRequired: true,
  }
  
];

export default routes;
