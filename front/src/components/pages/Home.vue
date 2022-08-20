<template>
    <div>
      <Header/>
      <div class="home">
        <img src="https://bgr.com/wp-content/uploads/2020/08/disney-plus.jpg?quality=82&strip=all&w=1440&h=810&crop=1"/>
        <hr class="line">
        <div class="description">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane.</div>
        <hr class="line">
      </div>
       <section class="entities" >
      <EntityCard style="padding: 15px 15px"
      v-for="entity in entities"
      :key="entity._id"
      :entity="entity"/>
      </section>
      <Footer/>
    </div>
</template>

<script>
import { fetchAllEnt, getAllEntitiesIntoOne, setSelected } from '../scripts/data'
import Header from './Header.vue'; 
import Footer from './Footer.vue';
import EntityCard from '../cards/EntityCard.vue'

export default {
     name: 'Home',
     async created() {
        await getAllEntitiesIntoOne()
        this.entities = JSON.parse(localStorage.getItem('all_entities'))
        setSelected('home_header')
     },
     components: {
       Header,
       Footer,
       EntityCard
     },
     data () {
      return { entities: JSON.parse(localStorage.getItem('all_entities'))}
     }
  } 
</script>

<style scoped>
 .entities {
     padding: 15px 30px;
     display: flex;
     flex-wrap: wrap;
     justify-content: space-evenly;
 }
  .home h2 {
    color: rgb(255, 127, 127);
  }
</style>
