<template>
<header>
	<div v-if="this.loggedIn !== null">User: {{this.userInfo?.username}}</div>
    <nav class = "links" style="--items: 5;">
        <a v-on:click = "this.$router.push('/')" href="#" id="home_header">Home</a>
        <a v-on:click = "this.$router.push('/movies')" href="#" id="movie_header">Movies</a>
        <a v-on:click = "this.$router.push('/songs')" href="#" id="song_header">Songs</a>
        <a v-on:click = "this.$router.push('/books')" href="#" id="book_header">Books</a>
		<a v-if="this.loggedIn === null" v-on:click = "this.$router.push('/login')" href="#" id="login_header">Login</a>
        <a v-if="this.loggedIn !== null" v-on:click = "logout()" href="#" id="logout_header">Logout</a>
        <span class="line"></span>
    </nav>
</header>    
</template>

<script>
 export default{
     name:'Header',
     methods:{
         logout(){
			console.log(localStorage.getItem('token'))
            localStorage.clear();
            this.$router.push({name: 'Home'})
         }
     },
	 data () {
		return { loggedIn: JSON.parse(localStorage.getItem('token')), userInfo: JSON.parse(localStorage.getItem('user-info')) }
	 }
 }
</script>

<style>


code {
	background: #fff1;
	font-family: 'Inconsolata', monospace;
	padding: .2em .4em;
	justify-content: space-evenly;
}

#footer {
	background-color: #246c;
	background-image: linear-gradient(to bottom, transparent, #0009);
	border-top: 1px solid #fff3;
	box-shadow: inset 0 1px 0 #fff3, 0 0 32px #000;
	overflow: hidden;
	padding: 8px;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 9001;
}
#footer a {
	color: #85c6f6;
	padding: 1em 0;
	text-decoration: none;
}
#footer ul {
	display: flex;
	list-style: none;
	justify-content: center;
	font-size: 2em;
	font-weight: 300;
}
#footer ul li {
	padding: 0 .5em;
}


.links {
	background-color: #123;
	background-image: linear-gradient(to bottom, #0003, transparent);
	border-bottom: 1px solid #0003;
	box-shadow: 0 0 32px #0003;
	font-size: 25px;
	font-weight: 300;
}
.links > a {
	color: #9ab;
	padding: .75em;
	text-align: center;
	text-decoration: none;
	transition: all .5s;
}
.links > a:hover {
	background: #ffffff06;
	color: rgb(172, 26, 87);
}
.links > .line {
	background: rgb(172, 26, 87);
	height: 1px;
	pointer-events: none;
}

/* The Magic */
#header {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
}
.links {
	display: grid;
	grid-template-columns: repeat(var(--items), 1fr);
	position: relative;
}
.links > .line {
	opacity: 0;
	transition: all .5s;
	position: absolute;
	bottom: 0;
	left: var(--left, calc(100% / var(--items) * (var(--index) - 1)));
	width: var(--width, calc(100% / var(--items)));
	--index: 0;
}
.links > a:hover ~ .line {
	opacity: 1;
}

.links > a:nth-of-type(1):hover ~ .line { --index: 1; }
.links > a:nth-of-type(2):hover ~ .line { --index: 2; }
.links > a:nth-of-type(3):hover ~ .line { --index: 3; }
.links > a:nth-of-type(4):hover ~ .line { --index: 4; }
.links > a:nth-of-type(5):hover ~ .line { --index: 5; }
.links > a:nth-of-type(6):hover ~ .line { --index: 6; }
.links > a:nth-of-type(7):hover ~ .line { --index: 7; }
.links > a:nth-of-type(8):hover ~ .line { --index: 8; }
.links > a:nth-of-type(9):hover ~ .line { --index: 9; }
.links > a:nth-of-type(10):hover ~ .line { --index: 10; }
.links > a:last-of-type:hover ~ .line { --index: var(--items); }
</style>
