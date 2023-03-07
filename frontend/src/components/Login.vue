<template>
    <div class="flex flex-col">
        <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
            Welcome, Please Login!
        </h1>
        <br>
        <br>
            <div class="text-center">
                <br>
                <form @submit.prevent="login">

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
                        <br>
                        <br>
                        <button class="font-bold bg-gray-700 text-white rounded" type="submit">
                            Register
                        </button>
                    </div>

                </form>
            </div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data(){
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            login: function(){
                console.log("User:" + this.username);
                console.log("Pass:" + this.password);
            }
        }
    }
</script>

<style scoped>

</style>