import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound'
import Home from '../views/Home'
import Dashboard from '../views/Dashboard'
import Management from '../views/Management'
import Accounting from '../views/Accounting'
import Expenses from '../views/Expenses'
import Calendar from '../views/Calendar'
import JobEntryModal from '../components/modals/JobEntryModal'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'Not Found',
    component: NotFound
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import ('../components/user/Register')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: 'add-job-entry',
        component: JobEntryModal,
        props: false,
        name: 'addJobEntry'
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/management',
    name: 'Management',
    component: Management,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/accounting',
    name: 'Accounting',
    component: Accounting,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/expenses',
    name: 'Expenses',
    component: Expenses,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar,
    children: [
      {
        path: 'edit-job-entry/:id',
        component: JobEntryModal,
        props: true,
        name: 'editJobEntry'
      }
    ],
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (getCookie('authToken') == '') {
      console.log('cookie', getCookie('authToken'))
      next({
        path: '/',
        params: { nextUrl: to.fullPath}
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export default router
