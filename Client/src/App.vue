<script setup>
//All imports needed here
import { GoogleLogin } from 'vue3-google-login';
import { ref } from 'vue';
import { jwtDecode } from 'jwt-decode';

//Will be updated when a user log in with google
const loggedUser = ref(null);

//Will get an answer from google
const callback = (response) => {
  console.log(response);
  if (response?.credential)
  {
    const decode = jwtDecode(response.credential);
    loggedUser.value = {
      name: decode.name,
      email: decode.email,
      image: decode.picture
    }
    console.log(loggedUser);
  }
  else
  {
    console.log("Something went wrong");
  }
}
</script>

<template>
  <main>
    <h1>My events 2</h1>
    <div v-if="!loggedUser">
      <GoogleLogin :callback="callback"/>
    </div>
    <div v-else><p>Connecté en tant que {{ loggedUser.name }}</p></div>
    <RouterView/>
  </main>
</template>