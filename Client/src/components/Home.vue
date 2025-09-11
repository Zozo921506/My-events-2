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
            defaultImage : "/default_image.jpg",
            search: ""
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
    },

    //Will filter the events by location_address when typping in the search bar
    computed: {
        filterEvents()
        {
            return this.events.filter(event => {
                return event.location_address.toLowerCase().includes(this.search.toLowerCase());
            });
        }
    }
}

</script>

<template>
    <div v-if="events">
        <br></br>
        <input type="text" placeholder="Rechercher des évènements" v-model="search"></input>
        <div v-if="filterEvents.length === 0">
            <p>Aucun résultat à votre recherche</p>
        </div>
        <div v-for="event in filterEvents" v-bind:key="event.uid">
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