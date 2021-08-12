<template>
  <div id="nav">
    <div class="main-title">
      <h1>Products Dashboard</h1>
    </div>
    <div class="navbar-links">
      <router-link to="/">Edit Products</router-link>
    </div>
  </div>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  text-align: left;
  background-color: #e6e6e6;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #2c3e50;
}

.main-title {
  padding: 10px;
}
.navbar-links {
  background-color: #cfcfcf;
  padding: 10px;
}
</style>
