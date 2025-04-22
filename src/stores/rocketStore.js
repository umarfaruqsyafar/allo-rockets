// src/store/rocketStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useRocketStore = defineStore('rocketStore', {
    state: () => ({
        rockets: [],
        rocket: null,
        countries: [],
        firstFlights: [],
        loading: false,
        error: null,
    }),
    actions: {
        async fetchRockets() {
            this.loading = true
            this.error = null
            try {
                const response = await axios.get('https://api.spacexdata.com/v4/rockets')
                this.rockets = response.data
                this.updateGroups()
            } catch (err) {
                this.error = 'Failed to fetch rockets. Please try again.'
            } finally {
                this.loading = false
            }
        },

        async getRocketById(idRocket) {
            if (this.rockets.length === 0) {
                await this.fetchRockets()
            }

            const foundRocket = this.rockets.find(rocket => rocket.id === idRocket)
            if (foundRocket) {
                this.rocket = foundRocket
            } else {
                this.error = 'Rocket not found.'
            }
        },

        addRocket(newRocket) {
            const newId = Date.now().toString()
            const newEntry = { ...newRocket, id: newId }
        
            this.rockets.push(newEntry)
            this.updateGroups() // biar country & flight year langsung ke-update
        },

        updateGroups() {
            this.countries = Object.keys(this.groupedByCountry)
            this.firstFlights = Object.keys(this.groupedByFirstFlightYear)
        },

    },

    getters: {
        groupedByCountry: (state) => {
            return state.rockets.reduce((acc, rocket) => {
                const country = rocket.country
                if (!acc[country]) acc[country] = []
                acc[country].push(rocket)
                return acc
            }, {})
        },

        groupedByFirstFlightYear: (state) => {
            return state.rockets.reduce((acc, rocket) => {
                const year = new Date(rocket.first_flight).getFullYear()
                if (!acc[year]) acc[year] = []
                acc[year].push(rocket)
                return acc
            }, {})
        },
    },
})
