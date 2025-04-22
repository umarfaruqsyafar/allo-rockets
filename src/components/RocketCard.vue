<template>
    <div class="card h-100 text-bg-dark rounded-3 border-light border-opacity-25">
        <img class="rounded-top-4" v-if="rocket.flickr_images?.length" :src="rocket.flickr_images[0]"
            :alt="rocket.name" />
        <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ rocket.name }}</h5>
            <p class="card-text flex-grow-1">
                {{ truncateText(rocket.description) || "No description available" }}
            </p>
            <router-link :to="`/rockets/${rocket.id}`" class="btn btn-dark mt-3">
                View Details
            </router-link>
        </div>
    </div>
</template>

<script setup>
    defineProps({
        rocket: Object
    })

    const truncateText = (text) => {
        if (!text) return ''
        return text.length > 100 ? text.slice(0, 100) + '...' : text
    }
</script>