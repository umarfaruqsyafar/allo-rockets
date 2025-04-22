<!-- src/pages/RocketDetail.vue -->
<template>
    <main class="content">
        <div class="container col-md-8 py-3 px-3">
            <router-link to="/rockets" class="btn btn-secondary btn-sm ps-2">
                <ArrowLeft size="15" style="margin-top: -4px;" class="me-2" />Back
            </router-link>

            <div v-if="rocketStore.loading">
                <h1 class="mb-4 bungee-spice-regular text-center title mt-2 mt-sm-2">LOADING...</h1>
            </div>

            <div v-else-if="rocketStore.error">

                <h1 class="mb-4 bungee-spice-regular text-center title mt-2 mt-sm-2">ERROR</h1>
                <p class="text-danger text-center">{{ rocketStore.error }}</p>
                <div class="text-center">
                    <button class="btn btn-danger" @click="reloadPage()">
                        <RotateCcw size="17" style="margin-top: -4px;" class="me-2" />Retry
                    </button>
                </div>
            </div>

            <div v-else-if="dataRocket">
                <h1 class="mb-4 bungee-spice-regular text-center title mt-2 mt-sm-2">{{ dataRocket.name }}</h1>
                <div class=" mb-4">
                    <img :src="dataRocket.flickr_images?.[0]" style="height: 500px; object-fit: cover;"
                        class="card-img-top rounded-3 mb-4" :alt="dataRocket.name" />
                    <div class="card-body text-white">
                        <div class="px-1">
                            <p>Rocket's Description :</p>
                            <p>{{ dataRocket.description }}</p>
                        </div>

                        <div class="row g-3">
                            <div class="col-md-4">
                                <button class="btn btn-dark w-100">
                                    <span style="font-size: 15px;">Cost per Launch</span> <br>
                                    <b>${{ dataRocket.cost_per_launch.toLocaleString() }}</b>
                                </button>
                            </div>
                            <div class="col-md-4">
                                <button class="btn btn-dark w-100">
                                    <span style="font-size: 15px;">Country</span> <br>
                                    <b>{{ dataRocket.country }}</b>
                                </button>
                            </div>
                            <div class="col-md-4">
                                <button class="btn btn-dark w-100">
                                    <span style="font-size: 15px;">First Flight</span> <br>
                                    <b>{{ dataRocket.first_flight }}</b>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    </main>
</template>

<script setup>
    import { RotateCcw, ArrowLeft } from "lucide-vue-next";
    import Footer from '@/components/Footer.vue'
    import { ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import { useRocketStore } from "@/stores/rocketStore.js"

    const rocketStore = useRocketStore()
    const dataRocket = ref(null)

    const route = useRoute()

    const reloadPage = () => {
        location.reload();
    }

    onMounted(async () => {
        await rocketStore.getRocketById(route.params.id)
        dataRocket.value = rocketStore.rocket

    })

</script>