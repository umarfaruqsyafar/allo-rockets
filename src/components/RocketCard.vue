<template>
    <div class="card h-100">
        <img :src="rocket.flickr_images[0]" class="card-img-top" alt="rocket image" />
        <div class="card-body">
            <h5 class="card-title">{{ rocket.name }}</h5>
            <p class="card-text">{{ rocket.description.slice(0, 100) }}...</p>
            <router-link :to="`/rockets/${rocket.id}`" class="btn btn-primary btn-sm">
                View Details
            </router-link>
        </div>
    </div>
</template>

<script setup>
    defineProps({
        rocket: Object
    })
</script>