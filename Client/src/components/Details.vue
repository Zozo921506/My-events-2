<script>
//import axios
import axios from 'axios';

//This function will get the events from the api
export default
{
    name: "getDetails",

    //Will return the data when function mounted will be finish and will set a default image if no image from the event
    data()
    {
        return {
            details: null,
            defaultImage : "/default_image.jpg"
        };
    },

    //Will try to fetch the API and will set events or catch an eventually error 
    async mounted()
    {
        const slug = this.$route.params.slug //Getting the slug in the url
        try 
        {
            let response = await axios.get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda/records?select=*&where=slug%20%3D%20%22${slug}%22`);
            this.details = response.data.results[0] //Take the first elem of the array do be able to display it
            console.log(this.details);
        }
        catch(e)
        {
            console.error(e);
        }
    }
}
</script>

<template>
    <div v-if="details">
        <h2>{{ details.title_fr }}</h2>
        <img :src="details.thumbnail || defaultImage" :alt="details.title_fr"></img>
        <p>Description: {{ details.description_fr }}</p>
        <p>Description longue: {{ details.longdescription_fr }}</p>
    </div>
    <div v-else>
        <p>Loading ...</p>
    </div>
</template>