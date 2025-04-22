<template>
    <div class="container py-4">
        <h1 class="mb-4">Rockets List</h1>

        <div v-if="rocketStore.loading">Loading rockets...</div>
        <div v-else-if="rocketStore.error">
            <p>{{ rocketStore.error }}</p>
            <button class="btn btn-danger" @click="rocketStore.fetchRockets">Retry</button>
        </div>
        <div v-else>
            <div class="row">
                <div class="col-md-4 mb-3" v-for="rocket in rocketStore.rockets" :key="rocket.id">
                    <RocketCard :rocket="rocket" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useRocketStore } from '@/stores/rocketStore'
    import { onMounted } from 'vue'
    import RocketCard from '@/components/RocketCard.vue'

    const rocketStore = useRocketStore()

    onMounted(() => {
        rocketStore.fetchRockets()
    })
</script>