
import {createRouter, createWebHistory} from "vue-router";
import animalComponent from "../public/page/animal.component.vue";
import vaccineManagementComponent from "../pecuariopro/vaccines/pages/vaccine-management.component.vue";
import bovineManagementComponent from "../pecuariopro/admin-bovines/pages/bovine-management.component.vue";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/animal",    component: bovineManagementComponent, meta: { title: "Animal"}},
        { path: "/vaccine",  component: vaccineManagementComponent, meta: { title: "Vaccine" }},
    ]
});

export default router;