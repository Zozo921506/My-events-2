<script setup>
//All imports needed here
import { GoogleLogin } from 'vue3-google-login';
import { ref } from 'vue';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

//Will be updated when a user log in with google
const loggedUser = ref(null);

//Will get an answer from google
const callback = async (response) => {
  console.log(response);
  if (response?.credential)
  {
    const decode = jwtDecode(response.credential);

    //Will try send the data in the backend
    try
    {
      const res = await axios.post('http://localhost:8000/login', {
        name: decode.name,
        email: decode.email,
        image: decode.picture
      })

      //Will update the data if they are a message
      if (res.data.message)
      {
        loggedUser.value = res.data.user;
        console.log(loggedUser);
      }
      else
      {
        console.log('An error occur');
      }
    }
    catch(e)
    {
      console.error(e);
    }
  }
  else
  {
    console.log("Something went wrong");
  }
}
</script>

<template>
  <main>
    <h1 id="main_title"><RouterLink to="/">My events 2</RouterLink></h1>
    <div v-if="!loggedUser">
      <GoogleLogin :callback="callback"/>
    </div>
    <div v-else><p>Connecté en tant que {{ loggedUser.name }}</p></div>
    <RouterView/>
  </main>
</template>