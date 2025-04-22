<template>
    <div class="container py-4">
        <h1 class="mb-4">Rocket List</h1>

        <!-- Filter Input -->
        <div class="mb-4">
            <input type="text" class="form-control" v-model="searchQuery" placeholder="Search rockets by name..." />
        </div>

        <div v-if="loading" class="text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <div v-else-if="error" class="text-center">
            <p class="text-danger">{{ error }}</p>
            <button class="btn btn-danger" @click="fetchRockets">Retry</button>
        </div>

        <div v-else>
            <div class="row g-4">
                <div class="col-sm-12 col-md-6 col-xl-4" v-for="rocket in filteredRockets" :key="rocket.id">
                    <div class="card h-100 shadow-sm">
                        <img v-if="rocket.flickr_images?.length" :src="rocket.flickr_images[0]" class="card-img-top"
                            :alt="rocket.name" style="object-fit: cover; height: 200px;" />
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">{{ rocket.name }}</h5>
                            <p class="card-text flex-grow-1">
                                {{ rocket.description.slice(0, 100) }}...
                            </p>
                            <router-link :to="`/rockets/${rocket.id}`" class="btn btn-primary mt-3">
                                View Details
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, computed } from 'vue'
    import axios from 'axios'

    const rockets = ref([])
    const loading = ref(false)
    const error = ref(null)
    const searchQuery = ref('')

    const fetchRockets = async () => {
        loading.value = true
        error.value = null
        try {
            const res = await axios.get('https://api.spacexdata.com/v4/rockets')
            rockets.value = res.data
        } catch (err) {
            error.value = 'Failed to load rockets. Please try again.'
        } finally {
            loading.value = false
        }
    }

    const filteredRockets = computed(() => {
        return rockets.value.filter(rocket =>
            rocket.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
    })

    onMounted(fetchRockets)
</script>