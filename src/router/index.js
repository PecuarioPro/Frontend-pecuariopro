
import {createRouter, createWebHistory} from "vue-router";
import animalComponent from "../public/pages/animal.component.vue";
import vaccineManagementComponent from "../pecuariopro/vaccines/pages/vaccine-management.component.vue";
import bovineManagementComponent from "../pecuariopro/admin-bovines/pages/bovine-management.component.vue";
import campaignManagementComponent from "../pecuariopro/admin-campaign/pages/campaign-management.component.vue";
import campaignDetailsComponent from "../pecuariopro/admin-campaign/components/campaign-details.component.vue";
import batchDetailsComponent from "../pecuariopro/admin-batches/components/batch-details.component.vue";
import notFoundComponent from "../public/pages/not-found.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/animal",    component: bovineManagementComponent, meta: { title: "Animal"}},
        { path: "/vaccine",  component: vaccineManagementComponent, meta: { title: "Vaccine" }},
        { path: "/campaign", component: campaignManagementComponent, meta: { title: "Campaign" },
        children: [
        ]
        },
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

        // Route to handle unmatched URLs, using notFoundComponent
        { path: "/:catchAll(.*)", component: notFoundComponent, meta: { title: "Not Found" } }
    ]
});

export default router;