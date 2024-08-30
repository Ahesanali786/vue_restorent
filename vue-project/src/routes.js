import Home from './components/Home.vue'
 import SignUp from './components/SignUp.vue'
 import Login from './components/Login.vue'
 import Add from './components/Add.vue'
 import Update from './components/Update.vue'
 import {createWebHistory,createRouter} from 'vue-router'
 import About from './components/About.vue'
// import SignUp from './components/SignUp.vue'


const routes=[{
    name:'Home',
    component:Home,
    path:'/Home',

},
     {
        name:'SignUp',
        component:SignUp,
        path:'/'
     },
     {
        name:'Login',
        component:Login,
        path:'/login'
      },
     {
        name:'Add',
        component:Add,
        path:'/add'
     },
     {
        name:'Update',
        component:Update,
        path:'/Update/:id'
     },
     {
     name:'About',
     component:About,
     path:'/About'
     }
]
const router=createRouter({
    history:createWebHistory(),
    routes
    })

    export default router;
