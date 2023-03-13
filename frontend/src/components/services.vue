  <script>
export default {
  data() {
    return {
      services: [
        { id: 1, name: 'Family Support', description: 'Belongs to instance 1', active: true },
        { id: 2, name: 'Adult Education', description: 'Belongs to instance 1', active: true },
        { id: 3, name: 'Youth Services Program', description: 'Belongs to instance 1', active: true },
        { id: 3, name: 'Early Childhood Education', description: 'Belongs to instance 1', active: true },
        { id: 4, name: 'Health and Wellness Services', description: 'Belong to instance 2', active: true },
        { id: 5, name: 'Career Services', description: 'Belong to instance 2', active: false },
        { id: 6, name: 'Cultural and Artistic Services', description: 'Belong to instance 2', active: false },
      ],
      newService: {
        name: '',
        description: '',
        active: true,
      },
      selectedService: null,
    };
  },
  methods: {
    createService() {
      const newId = this.services[this.services.length - 1].id + 1;
      this.newService.id = newId;
      this.services.push(this.newService);
      this.newService = {
        name: '',
        description: '',
        active: true,
      };
    },
    editService(service) {
      this.selectedService = Object.assign({}, service);
    },
    updateService(service) {
      const index = this.services.findIndex((s) => s.id === service.id);
      this.services[index] = service;
      this.selectedService = null;
    },
    softDeleteService(service) {
      const index = this.services.findIndex((s) => s.id === service.id);
      this.services[index].active = false;
    },
    activateService(service) {
      const index = this.services.findIndex((s) => s.id === service.id);
      this.services[index].active = true;
    },
  },
};
</script>


<template>
    <div>
        <div>
            <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Services</h1>
            <br>
        </div>
        <!-- List of Services -->
        <h2 class="text-2xl font-bold text-center">Current Services</h2>
        <div v-if="services.length > 0" class="text-center">
            <ul>
                <li v-for="(service, index) in services" :key="index" class="service-item">
                    <div v-if="services[index].active" class="service-name" >
                        {{ service.name }} &nbsp;&nbsp;&nbsp;
                        {{ service.description }} &nbsp;&nbsp;&nbsp;
                        <button class="bg-red-700 text-white rounded" @click="editService(service)">Edit</button>
                        &nbsp;
                        <button class="bg-red-700 text-white rounded" @click="softDeleteService(service)">Deactivate</button>
                    </div>
                    <br>
                </li>
            </ul>
            <ul>
                <h2 class="text-2xl font-bold text-center">Unactive Services</h2>
                <li v-for="(service, index) in services" :key="index" class="service-item">
                    <div v-if="!services[index].active" class="service-name" >
                        {{ service.name }} &nbsp;&nbsp;&nbsp;
                        {{ service.description }} &nbsp;&nbsp;&nbsp;
                        <button class="bg-red-700 text-white rounded" @click="editService(service)">Edit</button>
                        &nbsp;
                        <button class="bg-red-700 text-white rounded" @click="activateService(service)">Activate</button>
                    </div>
                    <br>
                </li>

            </ul>
        </div>

        <div v-else>
            <h2 class="text-2xl font-bold text-center">No services found</h2>
        </div>
        <br>
        <br>
        <br>


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
        <div class="text-center">
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
