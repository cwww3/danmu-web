import VueRouter from "vue-router";
import Setting from "../components/Setting"
import Room from "../components/Room"


export default new VueRouter({
    routes: [
        { path: '/watch', component: Room },
        { path: "/setting", component: Setting }
    ]
})