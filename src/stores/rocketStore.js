// src/store/rocketStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useRocketStore = defineStore('rocketStore', {
    state: () => ({
        rockets: [],
        loading: false,
        error: null,
    }),
    actions: {
        async fetchRockets() {
            this.loading = true
            this.error = null
            try {
                const res = await axios.get('https://api.spacexdata.com/v4/rockets')
                this.rockets = res.data
            } catch (err) {
                this.error = 'Failed to fetch rockets. Please try again.'
            } finally {
                this.loading = false
            }
        },
    },
})
