<template>
  <div class="card">
    <div class="face face1">
      <div class="content">
        <span class="stars"></span>
        <h2 class="java">{{review.username}}</h2>
        <p class="java">{{review.comment}}</p>
      </div>
    </div>
    <div class="face face2">
      <h2>{{review.rating}} ⭐</h2>
    </div>
  </div>
</template>

<script>

export default {
    name: 'review',
    props: ['review']
}
</script>

<style scoped>
.card {
      position: relative;
      width: 300px;
      height: 400px;
      margin: 0 auto;
      background: #000;
      border-radius: 15px;
      box-shadow: 0 15px 60px rgba(0, 0, 0, 0.5);
}
      .face {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

        .face1 {
          box-sizing: border-box;
          padding: 20px;
        }

          h2 {
            margin: 0;
            padding: 0;
          }


          .java {
            background-color: #880808;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        

        .face2 {
          transition: 0.5s;
        }

          h2 {
            margin: 0;
            padding: 0;
            font-size: 10em;
            color: #fff;
            transition: 0.5s;
            text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            z-index: 10;
          }


    .card:hover .face.face2 {
      height: 60px;
    }

      h2 {
        font-size: 2em;
      }
    

    .card:nth-child(1) .face.face2 {
      background-image: url('https://cdn.wallpapersafari.com/94/76/PHsOXh.jpg');
      background-size: 100%;
      border-radius: 15px;
      border-radius: 15px;
    }

    .card:nth-child(n) .face.face2 {
      background-image: url('https://cdn.wallpapersafari.com/94/76/PHsOXh.jpg');
      background-size: 100%;
      border-radius: 15px;
    }

    .card:nth-child(3) .face.face2 {
      background-image: url('https://cdn.wallpapersafari.com/94/76/PHsOXh.jpg');
      background-size: 100%;
      border-radius: 15px;
    }
</style>
