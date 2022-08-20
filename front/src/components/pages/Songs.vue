<template>
  <main id="Movie">
    <Header/>
    <div class="search-box">
    <input v-model="filterTextSongs" type="text" class="input-search" placeholder="Search.....">
    </div>
    <section class="songs" >
      <EntityCard style="padding: 15px 15px"
      v-for="entity in songs"
      :key="entity._id"
      :entity="entity"/>
    </section>
  </main>
</template>


<script>
import Header from './Header.vue'
import {fetchAllEnt, filterEntities, setSelected} from '../scripts/data.js'
import EntityCard from '../cards/EntityCard.vue'

export default{
    name: 'Songs',
    async created(){
      await fetchAllEnt('SONG');
      this.songs = JSON.parse(localStorage.getItem('song'))
      setSelected('song_header')
    },
    components: {
      Header, 
      EntityCard
    },
    watch: {
      async filterTextSongs() {
        await filterEntities('SONG', this.filterTextSongs);
        this.songs = JSON.parse(localStorage.getItem('song'));
      }
    },
    data () {
      return { songs: JSON.parse(localStorage.getItem('song')), filterTextSongs: ''};
    }
}
</script>

<style scoped>
 .songs {
     padding: 15px 30px;
     display: flex;
     flex-wrap: wrap;
     justify-content: space-evenly;
 }
 .search-box{
  width: fit-content;
  height: fit-content;
  padding: 15px 150px;
}
.input-search{
  height: 50px;
  width: 150px;
  border-style: none;
  text-align: center;
  padding: 10px;
  font-size: 18px;
  letter-spacing: 2px;
  outline: none;
  border-radius: 30px;
  transition: all .5s ease-in-out;
  background-color: #880808;
  padding-right: 40px;
  color:#fff;
}
.input-search::placeholder{
  color:white;
  font-size: 18px;
  letter-spacing: 1px;
  font-weight: 300;
}
.btn-search{
  width: 50px;
  height: 50px;
  border-style: none;
  font-size: 20px;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  right: 0px;
  color:#ffffff ;
  background-color:transparent;
  pointer-events: painted;  
}
.btn-search:focus ~ .input-search{
  width: 300px;
  border-radius: 0px;
  background-color: transparent;
  border-bottom:1px solid rgba(255,255,255,.5);
  transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
}
.input-search:focus{
  width: 300px;
  border-radius: 0px;
  background-color: transparent;
  border-bottom:1px solid rgba(255,255,255,.5);
  transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
}
</style>

