import { createRouter, createWebHistory } from 'vue-router'
// import routes from './routes.json'

// const globImport = import.meta.glob('../modules/*.vue')

// const components = {}

// for(const path in globImport) {
//     const name = path.replace(/.*\/|View.*/gi, '')
//     console.log(path)
//     components[name] = globImport[path]
// }

// console.log(components)

// for(const i in routes) {
//     const route = routes[i]
//     routes[i]['component'] = components[route.name]
// }


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'HomeView',
            component: () => import('../modules/HomeView.vue')
        },
        {
            path: '/flashcards',
            name: 'Flashcards',
            component: () => import('../modules/flashcards/FlashCards.vue')
        },
        {
            path: '/woordle',
            name: 'Woordle',
            component: () => import('../modules/woordle/Woordle.vue')
        }
    ]
})


export { router }