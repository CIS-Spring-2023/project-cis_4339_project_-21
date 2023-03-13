<template>
    <div class="flex flex-col">
        <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
        Welcome, Please Login!
        </h1>
        <br>
        <br>
            <div class="text-center">
                <br>
                <form @submit.prevent="store.login(username, password)" novalidate="true">


                    <div>
                        <label  class="font-bold text-2xl text-red-700 tracking-widest text-center mt-10" for="username">Username: </label>
                        <input class ="rounded" type="text" id="username" v-model="username">
                    </div>

                    <br>
                    <div>
                        <label class="font-bold text-2xl text-red-700 tracking-widest text-center mt-10" for="password">Password: </label>
                        <input class ="rounded" type="password" id="password" v-model="password">
                    </div>
                    <br>
                    <div>
                        <button class="font-bold bg-red-700 text-white rounded" type="submit">
                            Login
                        </button>
                    </div>
                </form>
            </div>
    </div>
  </template>
  
  <script>
  // Got this overall template from student management app from in class examples 
  import { useLoggedInUserStore } from "@/store/loggedInUser";
  
  export default {
    data: () => {
      return {
        username: "",
        password: "",
      };
    },
    setup() {
      const store = useLoggedInUserStore()
      return {
        // you can return the whole store instance to use it in the template
        store,
      }
    }
  };
  </script>

<style scoped>
</style>