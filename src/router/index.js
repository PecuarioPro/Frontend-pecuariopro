
import {createRouter, createWebHistory} from "vue-router";
import vaccineManagementComponent from "../pecuariopro/vaccines/pages/vaccine-management.component.vue";
import bovineManagementComponent from "../pecuariopro/admin-bovines/pages/bovine-management.component.vue";
import campaignManagementComponent from "../pecuariopro/admin-campaign/pages/campaign-management.component.vue";
import campaignDetailsComponent from "../pecuariopro/admin-campaign/components/campaign-details.component.vue";
import batchDetailsComponent from "../pecuariopro/admin-batches/components/batch-details.component.vue";
import notFoundComponent from "../public/pages/not-found.component.vue";
import staffManagementComponent from "../pecuariopro/staff/pages/staff-management.component.vue";
import statisticsVaccineComponent from "../pecuariopro/vaccines/pages/statistics-vaccine.component.vue";
import staffViewComponent from "../pecuariopro/staff/pages/staff-view.component.vue";
import VeterinariansManagementComponent from "../pecuariopro/veterinarians/pages/veterinarians-management.component.vue";
import inventoryComponent from "../pecuariopro/inventory/components/inventory.component.vue";
import homeComponent from "../public/pages/home.component.vue";
import bovineTotal from "../pecuariopro/admin-bovines/pages/bovine-total.vue";
import StatisticsComponent from "../pecuariopro/Stadistics/Statistics.component.vue";
import loginUserComponent from "../pecuariopro/Users/components/login-user.component.vue";
import registerUserComponent from "../pecuariopro/Users/components/register-user.component.vue";
import settingsComponent from "../pecuariopro/Users/components/Settings.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/animal",    component: bovineManagementComponent, meta: { title: "Animal"}},
        { path: "/animalTotal",    component: bovineTotal, meta: { title: "Total"}},
        { path: "/statisticsBovine", component: StatisticsComponent, meta: { title: "Statistics Bovine"} },
        { path: "/statistics",  component: statisticsVaccineComponent, meta: { title: "Statistics" }},
        { path: "/vaccine",  component: vaccineManagementComponent, meta: { title: "Vaccine" }},
        { path: "/campaign", component: campaignManagementComponent, meta: { title: "Campaign" }},
        { path: "/inventory", component: inventoryComponent, meta: { title: "Inventory" }},
        { path: "/home", component: homeComponent, meta: { title: "Home"} },
        { path: "/login", component: loginUserComponent, meta: {title: "Login"}},
        { path: "/register", component: registerUserComponent, meta: {title: "Register"}},
        { path: "/veterinarians", component: VeterinariansManagementComponent,meta: { title: "Veterinarian"} },
        { path: "/settings", component: settingsComponent,meta: {title: "Settings"} },
        {
            path: "/campaigns/:campaignId",
            component: campaignDetailsComponent,
            name: "campaignDetails",
            props: true,
            meta: { title: "Campaign details" }
        },
        {
            path: "/campaigns/:campaignId/batches/:batchId",
            component: batchDetailsComponent,
            name: "batchDetails",
            props: true,
            meta: { title: "Batch Details" }
        },

        // Root path
        { path: "/", component: loginUserComponent, meta: { title: "login"} },

        // Path to view staff
        { path: "/staff-view", component: staffViewComponent, meta: { title: "Staff View" } },

        // Path to manage staff
        { path: "/staff-manage", component: staffManagementComponent, meta: { title: "Staff Manage" } },

        // Path to handle unmatched URLs, using notFoundComponent
        { path: "/:catchAll(.*)", component: notFoundComponent, meta: { title: "Not Found" } },
    ]
});

export default router;