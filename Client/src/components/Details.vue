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
            defaultImage : "/default_image.jpg",
            forecast: []
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

            //Will fetch the weather of the event for 7 days
            let getWeather = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${this.details.location_coordinates.lat}&longitude=${this.details.location_coordinates.lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Europe/Paris&forecast_days=7`)
            const codes = {
                0: "Ciel clair ☀️",
                1: "Principalement clair 🌤️",
                2: "Partiellement nuageux ⛅",
                3: "Couvert ☁️",
                45: "Brouillard 🌫️",
                48: "Brouillard givrant 🌫️❄️",
                51: "Bruine légère 🌦️",
                61: "Pluie faible 🌧️",
                63: "Pluie modérée 🌧️",
                65: "Pluie forte ⛈️",
                71: "Neige légère 🌨️",
                95: "Orage ⛈️"
            }

            //Will display the value of the code instead of the code
            this.forecast = getWeather.data.daily.time.map((date, i) => ({
                date,
                weather: codes[getWeather.data.daily.weathercode[i]] || "Inconnu",
                min: getWeather.data.daily.temperature_2m_min[i],
                max: getWeather.data.daily.temperature_2m_max[i]
            }))
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
        <p>Description longue: <span v-html="details.longdescription_fr"></span></p>
        <div v-if="forecast.length">
        <h3>Prévison météorologique de 7 jours</h3>
            <ul>
                <li v-for="day in forecast" :key="day.date">
                <strong>{{ day.date }}</strong> :
                {{ day.weather }} — {{ day.min }}°C / {{ day.max }}°C
                </li>
            </ul>
        </div>
    </div>
    <div v-else>
        <p>Loading ...</p>
    </div>
</template>