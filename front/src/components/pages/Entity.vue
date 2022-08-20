<template>
<div class="main">
    <Header/>
    <div class="pek">
        <div class="image" :style = "{ 'background': 'url(' + entity.imageUrl + ')', 'background-repeat': 'no-repeat', 'background-size': 'cover'}"></div>
        <h1 class="title">{{entity.title}}</h1>
        <h3 class="title">by</h3>
        <h2 class="title">{{entity.director || entity.author || entity.artist}}</h2>
        <hr class="line">
    </div>
    <div class="description">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane.</div>
    <hr class="line">
    <div class="information">
        <h2>Release Date: {{entity.releaseDate}}</h2>
        <h2 v-if="this.entityType === 'MOVIE' || this.entityType === 'SONG'">Duration: {{this.getDuration()}}</h2>
        <h2 v-if="this.entityType === 'BOOK'">Type: {{entity.type}}</h2>
        <h2 v-if="this.entityType === 'MOVIE'">Cast:  {{entity.cast}}</h2>
        <h2>Rating: {{entity.rating.toFixed(1)}} ⭐</h2>
        <h2>Reviews: {{entity.reviewCount}}</h2>
        <h2>Likes: {{entity.likeCount}}</h2>
        
    </div>
    <div class="likes">
      <div class="buttonContainer">
              <button v-on:click="this.likeEntity()">Like 💖</button>
      </div>
  <div class="reviewForm">
      <div class="row">
         <div class="col-25">
           <label for="subject">Review: </label>
         </div>
      <div class="col-75">
        <textarea id="subject" name="subject" placeholder="Write something.." style="height:200px"></textarea>
      </div>
      <div class="row">
      <input type="submit" value="Submit" v-on:click="this.reviewEntity()">
      <div>
    <label for='number-dd'><b>Rating: </b></label>
    <select id='number-dd' name='number' style="width:50px">
        <option value=1>1</option>
        <option value=2>2</option>
        <option value=3>3</option>
        <option value=4>4</option>
        <option value=5>5</option>
        <option value=6>6</option>
        <option value=7>7</option>
        <option value=8>8</option>
        <option value=9>9</option>
        <option value=10>10</option>
    </select>
</div>
    </div>
    </div>
      </div>
    </div>
    <section class="reviews">
        <ReviewCard style="padding: 15px 15px" v-for="review in reviews"
        :key="review._id"
        :review="review"/>
    </section>
</div> 
</template>


<script>
import Header from './Header.vue';
import ReviewCard from '../cards/ReviewCard.vue'
import { calculateDuration, fetchAllEnt, fetchReviews, likeEntities, reviewEntities, reviewEntity } from '../scripts/data.js'

export default {
   name: 'entity',
   async created() {
      const entityData = localStorage.getItem('entityData').split(':')
      await fetchAllEnt(entityData[0], entityData[1])
      this.entity = JSON.parse(localStorage.getItem('entity'))
      this.entityType = entityData[0]
      await fetchReviews(this.entity._id)
      this.reviews = JSON.parse(localStorage.getItem(`reviews`))
   },
   components: {
    Header,
    ReviewCard
   },
   methods: {
     getDuration() {  
        return calculateDuration(this.entity, localStorage.getItem('entityData').split(':')[0])
     },
     async likeEntity() {
        this.entity = await likeEntities(localStorage.getItem('entityData').split(':')[0], this.entity._id, JSON.parse(localStorage.getItem('token')))
        return this.entity;
     },
     async reviewEntity() {
        const rating = Number(document.getElementById('number-dd').value);
        const comment = document.getElementById('subject').value
        this.entity = await reviewEntities(this.entity._id, localStorage.getItem('entityData').split(':')[0], rating, comment,JSON.parse(localStorage.getItem('token')))
        await fetchReviews(this.entity._id)
        return this.entity;
     }
   },
   watch: {
      async entity(){
        await fetchReviews(this.entity._id)
        this.reviews = JSON.parse(localStorage.getItem('reviews'))
      }
   },
   data () {
    return { entity: JSON.parse(localStorage.getItem('entity')), entityType: localStorage.getItem('entityData').split(':')[0], reviews: JSON.parse(localStorage.getItem('reviews')) }
   }
}

</script>

<style>

.buttonContainer {
  padding: 15px 15px;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 10px;
}

.reviews {
     padding: 15px 30px;
     display: flex;
    justify-content: space-evenly;
     flex-wrap: wrap;
 }

 .likes {
  padding: 15px 30px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
 }

.title {
    color: rgb(255,7,110);
    font-weight: 300;
    font-style: oblique;
    font: bold;
}

.line {
    width:100%;
    text-align:left;
    padding: 0px 10px;
    margin-left:0;
    color: rgb(200,7,110)
}

.main {
    overflow: hidden;
}

.description {
    font-weight: 300;
    padding: 15px;
    margin: 15px;
    font-size: 22px;
    text-align: left;
}

.pek {
    display: grid;
    overflow-x: hidden;
    overflow-y: hidden;
}

.image {
    padding: 10px 10px;
    width: 100%;
    height: 600px;
}

.information {
    display: grid;
    border-style: dotted;
    justify-content: space-evenly;
    text-align: center;
    font-weight: 200;
}

button {
  background-color: rgb(200,7,110); /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  width: 140px;
}

input[type=text], select, textarea, input[type = "t"]{
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}

/* Style the label to display next to the inputs */
label {
  padding: 12px 12px 12px 0;
  display: inline-block;
  color: rgb(200,7,110);
  font-size: 30px;
}

/* Style the submit button */
input[type=submit] {
  background-color: rgb(255,7,110);
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  font-size: 20px;
  cursor: pointer;
  float: right;
}

/* Style the container */
.reviewForm {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

/* Floating column for labels: 25% width */
.col-25 {
  float: left;
  width: 25%;
  margin-top: 6px;
}

/* Floating column for inputs: 75% width */
.col-75 {
  float: left;
  width: 75%;
  margin-top: 6px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .col-25, .col-75, input[type=submit] {
    width: 100%;
    margin-top: 0;
  }
}
</style>
