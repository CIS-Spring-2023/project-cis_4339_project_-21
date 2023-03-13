// This whole page was copied and pasted from the student management app from class
// to make use of its functionality 

import { defineStore } from 'pinia'

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
        const response = await apiLogin(username, password);
        this.$patch({ // pinia path function in documentation  
          isLoggedIn: response.isAllowed,
          name: response.name,
        })
        this.$router.push("/");
      } catch(error) {
        console.log(error)
      }
    },
    logout() {
      this.patch({
        name: "",
        isLoggedIn: false
      });

      // we could do other stuff like redirecting the user
    }
  }
});

//simulate a login - we will later use our backend to handle authentication
function apiLogin(u, p) {
  if (u === "viewer" && p === "v") return Promise.resolve({ isAllowed: true, name: "Viewer" }); // Login for a viewer
  if (u === "editor" && p === "e") return Promise.resolve({ isAllowed: true, name: "Editor" }); // Login for an Editor 
  if (p === "ed") return Promise.resolve({ isAllowed: false });
  return Promise.reject(new Error("invalid credentials"));
}

