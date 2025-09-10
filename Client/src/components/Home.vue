<script>
//import axios
import axios from 'axios';

//This function will get the events from the api
export default {
    name: "getEvents",

    //Will return the data when fynction mounted will be finish
    data() {
        return {events:undefined};
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
    <div>
        <h1>My events 2</h1>
        <br></br>
        <div v-for="event in events" v-bind:key="event.uid">
            <div>
                <p>{{ event.title_fr }}</p>
                <img :src="event.image"  :alt="event.title_fr"></img>
            </div>
        </div>
    </div>
</template>