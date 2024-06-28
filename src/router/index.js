
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
import VeterinariansManagementComponent from "../pecuariopro/veterinarians/pages/veterinarian-management.component.vue";
import inventoryComponent from "../pecuariopro/inventory/components/inventory.component.vue";
import homeComponent from "../public/pages/home.component.vue";
import bovineTotal from "../pecuariopro/admin-bovines/pages/bovine-total.vue";
import StatisticsComponent from "../pecuariopro/Stadistics/Statistics.component.vue";
import veterinarianViewComponent from "../pecuariopro/veterinarians/pages/veterinarian-view.component.vue";
import veterinarianManagementComponent from "../pecuariopro/veterinarians/pages/veterinarian-management.component.vue";
import SignUpComponent from "../iam/pages/sign-up.component.vue";
import SignInComponent from "../iam/pages/sign-in.component.vue";
import {authenticationGuard} from "../iam/services/authentication.guard.js";

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
        { path: "/", component: homeComponent, meta: { title: "home"} },

        // Path to view staff
        { path: "/staff-view", component: staffViewComponent, meta: { title: "Staff View" } },

        // Path to manage staff
        { path: "/staff-manage", component: staffManagementComponent, meta: { title: "Staff Manage" } },

        { path: "/veterinarian-view", component: veterinarianViewComponent, meta: { title: "Veterinarian View" } },

        // Path to manage staff
        { path: "/veterinarian-manage", component: veterinarianManagementComponent, meta: { title: "Veterinarian Manage" } },

        // Path to handle unmatched URLs, using notFoundComponent
        { path: "/:catchAll(.*)", component: notFoundComponent, meta: { title: "Not Found" } },

        // Path to sign-in and sign-up
        { path: '/sign-in', name: 'sign-in',    component: SignInComponent,meta: { title: 'Sign In' } },
        { path: '/sign-up', name: 'sign-up',    component: SignUpComponent,meta: { title: 'Sign Up' } },
    ]
});

router.beforeEach((to, from, next) => {
    let baseTitle = 'PecuarioPro';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    // Call the authentication guard
    authenticationGuard(to, from, next);
});

export default router;