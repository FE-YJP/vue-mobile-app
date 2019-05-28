import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'Index',
      redirect:"/home",
      component: ()=>import('./views/Home/index.vue'),
      children:[
        {
          path:"/home",
          name:"Home",
          component: ()=>import('./views/Home/Home.vue'),
        }
      ]
    },
  ]
})
