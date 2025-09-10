<script>
//import axios
import axios from 'axios';

//This function will get the events from the api
export default {
    name: "getEvents",

    //Will return the data when function mounted will be finish and will set a default image if no image from an event
    data() {
        return {
            events:undefined,
            defaultImage : "/default_image.jpg"
        };
    },

    //Will try to fetch the API and will set events or catch an eventually error 
    async mounted()
    {
        try 
        {
            let response = await axios.get("https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda/records?limit=20");
            this.events = await response.data.results;
            console.log(this.events);
        }
        catch(e)
        {
            console.error(e);
        }
    }
}

</script>

<template>
    <div v-if="events">
        <h1>My events 2</h1>
        <br></br>
        <div v-for="event in events" v-bind:key="event.uid">
            <div>
                <router-link :to="event.slug">
                    <p>{{ event.title_fr }}</p>
                    <img :src="event.image || defaultImage"  :alt="event.title_fr"></img>
                </router-link>
            </div>
        </div>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>