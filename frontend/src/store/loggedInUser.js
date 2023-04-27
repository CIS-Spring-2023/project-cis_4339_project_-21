// This whole page was copied and pasted from the student management app from class
// to make use of its functionality 

import { defineStore } from 'pinia'
import axios from 'axios'


//defining a store
export const useLoggedInUserStore = defineStore({
  // id is only required for devtools with the Pinia store
  id: 'loggedInUser',
  //central part of the store
  state: () => {
    return {
      name: "",
      isLoggedIn: false,
    }
  },
  // equivalent to methods in components, perfect to define business logic
  actions: {
    async login(username, password) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_ROOT_API}/users/login`, {
          username,
          password
        });

        if (response.data && response.data.user) {
          this.$patch({
            isLoggedIn: true,
            name: response.data.user.role,
          })
          this.$router.push("/");
        } else {
          console.log("Login failed");
        }
      } catch(error) {
        console.log(error)
      }
    },
    logout() {
      try {
        this.$patch({
          name: "",
          isLoggedIn: false
        })
        this.$router.push("/");
      } catch(error) {
        console.log(error)
      }
      // we could do other stuff like redirecting the user
    }
  }
});

