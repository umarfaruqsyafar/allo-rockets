<template>
    <main class="content">
        <div class="container py-4 px-3">
            <h1 class="mb-4 bungee-spice-regular text-center title mt-3 mt-sm-4">Rocket List</h1>

            <div class="row g-4 justify-content-between mb-4">
                <div class="col">
                    <div class="d-flex g-2">
                        <button class="btn btn-secondary me-2" data-bs-toggle="dropdown" aria-expanded="false">
                            <SlidersHorizontal size="15" style="margin-top: -4px;" />
                            <span class="d-md-inline d-none ps-1">
                                Filter
                            </span>
                        </button>
                        <ul class="dropdown-menu">
                            <li @click="clearFilter"><a class="dropdown-item" href="#">Clear Filter</a></li>
                            <li data-bs-toggle="modal" data-bs-target="#countries"><a class="dropdown-item"
                                    href="#">Countries</a></li>
                            <li data-bs-toggle="modal" data-bs-target="#firsFlights"><a class="dropdown-item"
                                    href="#">First Flights</a></li>
                        </ul>

                        <button data-bs-toggle="modal" data-bs-target="#create" class="btn btn-primary px-2">
                            <Plus size="19" style="margin-top: -5px;" />
                            <span class="d-md-inline d-none ps-1">
                                Rocket
                            </span>
                        </button>
                    </div>
                </div>
                <div class="col-md-4 col-8">
                    <div class="input-neon d-flex align-items-center p-0 py-1 rounded-3"
                        :class="{ 'focused': isFocused }">
                        <Search size="20" class="mx-2 ms-3" />
                        <input type="text" class="rounded-3" v-model="searchQuery" placeholder="Search by name..."
                            @focus="isFocused = true" @blur="isFocused = false" />
                    </div>


                </div>
            </div>
            <div v-if="selectedCountry !== '' || selectedFlight !== ''" class="text-white">
                <p>Filter by : {{ selectedCountry }} {{ selectedFlight }}</p>
            </div>

            <!-- Cards List -->
            <div>
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

                <!-- Rocket Cards -->
                <div v-else>
                    <div class="row g-4">
                        <div class="col-sm-12 col-md-6 col-xl-4" v-for="rocket in filteredRockets" :key="rocket.id">
                            <RocketCard :rocket="rocket" />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

        </div>
    </main>


    <!-- Modal create -->
    <div class="modal fade" id="create" aria-labelledby="createLabel">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content rounded-4 bg-dark text-white">
                <div class="modal-body">
                    <!-- Add Rocket Form -->
                    <div>
                        <h4>Add New Rocket</h4>
                        <form @submit.prevent="addRocket">
                            <div class="mb-3">
                                <label for="name" class="form-label">Rocket Name</label>
                                <input type="text" id="name" class="form-control" v-model="newRocket.name" required />
                            </div>
                            <div class="mb-3">
                                <label for="description" class="form-label">Rocket Description</label>
                                <textarea id="description" class="form-control" v-model="newRocket.description"
                                    required></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="country" class="form-label">Country</label>
                                <input type="text" id="country" class="form-control" v-model="newRocket.country"
                                    required />
                            </div>
                            <div class="mb-3">
                                <label for="cost_per_launch" class="form-label">Cost Per Launch</label>
                                <input type="text" id="cost_per_launch" class="form-control"
                                    v-model="newRocket.cost_per_launch" required />
                            </div>
                            <div class="mb-3">
                                <label for="first_flight" class="form-label">First Flight</label>
                                <input type="date" id="first_flight" class="form-control"
                                    v-model="newRocket.first_flight" required />
                            </div>

                            <!-- Image Upload -->
                            <div class="mb-3">
                                <label for="image" class="form-label">Rocket Image</label>
                                <input type="file" id="image" class="form-control" required
                                    @change="handleImageUpload" />
                                <div v-if="newRocket.flickr_images[0]" class="mt-3">
                                    <!-- Image Preview -->
                                    <img :src="newRocket.flickr_images[0]" alt="Rocket Preview"
                                        class="img-fluid w-100 rounded-3" style="object-fit: cover;" />
                                </div>
                            </div>

                            <div class="d-flex g-2">
                                <button type="button" data-bs-dismiss="modal"
                                    class="btn btn-secondary w-50 me-2">Close</button>
                                <button type="submit" :data-bs-dismiss="checkNewRocket() ? 'modal' : null"
                                    class="btn btn-primary w-50 ms-2">Add Rocket</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Countries -->
    <div class="modal fade" id="countries" aria-labelledby="countriesLabel">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content rounded-4 bg-dark">
                <div class="modal-body">
                    <div v-for="country in rocketStore.countries">
                        <button data-bs-dismiss="modal" @click="setCountry(country)"
                            class="btn btn-outline-light w-100 my-2 rounded-5 py-2">{{
                                country }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal First Flag -->
    <div class="modal fade" id="firsFlights" aria-labelledby="firsFlightsLabel">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content rounded-4 bg-dark">
                <div class="modal-body">
                    <div v-for="flight in rocketStore.firstFlights">
                        <button data-bs-dismiss="modal" @click="setFlight(flight)"
                            class="btn btn-outline-light w-100 my-2 rounded-5 py-2">{{ flight }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>
<script setup>
    import { Plus, Search, SlidersHorizontal, RotateCcw } from "lucide-vue-next";
    import { ref, onMounted, computed } from 'vue'
    import { useRocketStore } from "@/stores/rocketStore.js"
    import RocketCard from '@/components/RocketCard.vue'
    import Footer from '@/components/Footer.vue'

    const isFocused = ref(false)
    const rocketStore = useRocketStore()
    const dataRockets = ref([])

    const searchQuery = ref('')
    const selectedCountry = ref('');
    const selectedFlight = ref('');
    const filteredRockets = computed(() => {
        return dataRockets.value.filter(rocket => {
            const matchesName = rocket.name.toLowerCase().includes(searchQuery.value.toLowerCase());
            const matchesCountry = selectedCountry.value === '' || rocket.country === selectedCountry.value;
            const rocketYear = rocket.first_flight ? rocket.first_flight.substring(0, 4) : '';
            const matchesFlight = selectedFlight.value === '' || rocketYear === selectedFlight.value;
            return matchesName && matchesCountry && matchesFlight;
        });
    });

    const setCountry = (country) => {
        selectedCountry.value = country
    }
    const setFlight = (flight) => {
        selectedFlight.value = flight
    }
    const clearFilter = () => {
        selectedCountry.value = ''
        selectedFlight.value = ''
    }

    const newRocket = ref({
        name: '',
        description: '',
        country: '',
        cost_per_launch: '',
        first_flight: '',
        flickr_images: []
    })

    const checkNewRocket = () => {
        return Object.values(newRocket.value).every(val => val !== '' && val !== null && val !== undefined);
    };

    const addRocket = async () => {
        rocketStore.addRocket(newRocket.value)
        newRocket.value = { name: '', description: '', country: '', cost_per_launch: '', first_flight: '', flickr_images: [] }
    }

    onMounted(async () => {
        await rocketStore.fetchRockets()
        dataRockets.value = rocketStore.rockets
    })

    // Handle image upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                newRocket.value.flickr_images[0] = reader.result
            }
            reader.readAsDataURL(file)
        }
    }

    const reloadPage = () => {
        location.reload();
    }

</script>
