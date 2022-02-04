import VueRouter from "vue-router";

import Live from "../components/Live"


export default new VueRouter({
    routes: [
        { path: "/entry", component: Live }
    ]
})