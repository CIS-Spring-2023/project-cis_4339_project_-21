<script>
import { useLoggedInUserStore } from "@/store/loggedInUser";
import axios from 'axios'; 
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  setup() {
    const user = useLoggedInUserStore();

    return { user };
  },
  data() {
    return {
      services: [],
      newService: {
        name: '',
        description: '',
        active: true,
      },
      selectedService: null,
    };
  },
  computed: {
    activeServices() {
      return this.services.filter(service => service.active);
    },
    inactiveServices() {
      return this.services.filter(service => !service.active);
    }
  },
  async created() {
    try {
      const response = await axios.get(`${apiURL}/services`);
      this.services = response.data;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async createService() {
      try {
        const response = await axios.post(`${apiURL}/services`, this.newService);
        this.services.push(response.data);
        this.newService = {
          name: '',
          description: '',
          active: true,
        };
      } catch (error) {
        console.error(error);
      }
    },
    editService(service) {
      this.selectedService = Object.assign({}, service);
    },
    async updateService(service) {
      try {
        const response = await axios.put(`${apiURL}/services/updatename/${service._id}`, {
          name: service.name,
        });
        const response2 = await axios.put(`${apiURL}/services/updatedescription/${service._id}`, {
          description: service.description,
        });
        const index = this.services.findIndex((s) => s._id === service._id);
        this.services[index] = response2.data;
        this.selectedService = null;
      } catch (error) {
        console.error(error);
      }
    },
    async softDeleteService(service) {
      try {
        const response = await axios.put(`${apiURL}/services/deactivate/${service._id}`);
        const index = this.services.findIndex((s) => s._id === service._id);
        this.services[index] = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async activateService(service) {
      try {
        const response = await axios.put(`${apiURL}/services/activate/${service._id}`);
        const index = this.services.findIndex((s) => s._id === service._id);
        this.services[index] = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<template>
  <div>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Services</h1>
    </div>
    <!-- List of Services -->
    <div v-if="services.length > 0" class="text-center">
      <h2 class="text-2xl font-bold text-center">Active Services</h2>
      <table class="table-auto w-full mb-6">
          <thead>
            <tr>
              <th class="px-4 py-2">Service Name</th>
              <th class="px-4 py-2">Description</th>
              <th class="px-4 py-2" v-if="user.name === 'editor'">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(service, index) in activeServices" :key="index">
              <td class="border px-4 py-2">{{ service.name }}</td>
              <td class="border px-4 py-2">{{ service.description }}</td>
              <td class="border px-4 py-2" v-if="user.name === 'editor'">
                <button class="bg-red-700 text-white rounded" @click="editService(service)">Edit</button> &nbsp;
                <button class="bg-red-700 text-white rounded" @click="softDeleteService(service)">Soft Delete</button>
              </td>
            </tr>
          </tbody>
      </table>
      <h2 class="text-2xl font-bold text-center">Inactive Services</h2>
      <table class="table-auto w-full">
          <thead>
            <tr>
              <th class="px-4 py-2">Service Name</th>
              <th class="px-4 py-2">Description</th>
              <th class="px-4 py-2" v-if="user.name === 'editor'">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(service, index) in inactiveServices" :key="index">
              <td class="border px-4 py-2">{{ service.name }}</td>
              <td class="border px-4 py-2">{{ service.description }}</td>
              <td class="border px-4 py-2" v-if="user.name === 'editor'">
                <button class="bg-red-700 text-white rounded" @click="editService(service)">Edit</button> &nbsp;
                <button class="bg-red-700 text-white rounded" @click="activateService(service)">Activate</button>
              </td>
            </tr>
          </tbody>
      </table>
    </div>
    <div v-else>
      <h2 class="text-2xl font-bold text-center">No services found</h2>
    </div>


      <!-- Update Service -->
      <div v-if="selectedService" class = "text-center">
          <form @submit.prevent="updateService(selectedService)">
      <!-- grid container -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
          >
            <h2 class="text-2xl font-bold">Edit Service</h2>

            <!-- form field -->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">Edit Service Name</span>
                <input
                  type="text"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="selectedService.name"
                />
              </label>
            </div>
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">Edit Service Description</span>
                <input
                  type="text"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="selectedService.description"
                />
              </label>
            </div>
          </div> 
          <br>
          <button class="bg-red-700 text-white rounded" type="submit">Update</button>
          </form>
      </div>
      <br>


      <!-- Create A new Service-->
      <div v-if="user.name === 'editor'" class="text-center">
          <form @submit.prevent="createService">
          <!-- grid container -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
          >
            <h2 class="text-2xl font-bold">Create New Service</h2>

            <!-- form field -->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">Service Name</span>
                <input
                  type="text"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="newService.name"
                />
              </label>
            </div>
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">Service Description</span>
                <input
                  type="text"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="newService.description"
                />
              </label>
            </div>
          </div> 
          <br>
          <button class="bg-red-700 text-white rounded" type="submit">Create</button>
          </form>
          <br>
          <br>
          <br>
      </div>
  </div>
</template>