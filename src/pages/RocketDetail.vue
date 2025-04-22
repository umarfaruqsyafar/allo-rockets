<!-- src/pages/RocketDetail.vue -->
<template>
    <div class="container py-4">
        <router-link to="/rockets" class="btn btn-outline-secondary mb-3">← Back</router-link>

        <div v-if="loading">Loading...</div>

        <div v-else-if="error">
            <p>{{ error }}</p>
            <button class="btn btn-danger" @click="fetchRocket">Retry</button>
        </div>

        <div v-else-if="rocket">
            <div class="card mb-4">
                <img :src="rocket.flickr_images?.[0]" class="card-img-top" :alt="rocket.name" />
                <div class="card-body">
                    <h2>{{ rocket.name }}</h2>
                    <p>{{ rocket.description }}</p>
                    <ul class="list-group mt-3">
                        <li class="list-group-item">
                            <strong>Cost per Launch:</strong> ${{ rocket.cost_per_launch.toLocaleString() }}
                        </li>
                        <li class="list-group-item">
                            <strong>Country:</strong> {{ rocket.country }}
                        </li>
                        <li class="list-group-item">
                            <strong>First Flight:</strong> {{ rocket.first_flight }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'
    import { useRoute } from 'vue-router'

    const route = useRoute()
    const rocket = ref(null)
    const loading = ref(false)
    const error = ref(null)

    const fetchRocket = async () => {
        loading.value = true
        error.value = null
        try {
            const res = await axios.get(`https://api.spacexdata.com/v4/rockets/${route.params.id}`)
            rocket.value = res.data
        } catch (err) {
            error.value = 'Failed to load rocket details. Please try again.'
        } finally {
            loading.value = false
        }
    }

    onMounted(fetchRocket)
</script>