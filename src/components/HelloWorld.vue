<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <h4>проект есть на:</h4>
    <a href="https://github.com/makutaII/w40k-fb0"><h4> гитхаб (приват)</h4></a>
    <a href=""><h4> гитхаб (сайт). Нет</h4></a>
    <a href="    https://console.firebase.google.com/u/1/project/wh40k-s2/overview
"><h4>firebase console</h4></a>
        <a href="https://wh40000.web.app/"><h4>firebase</h4></a>
    <a href="https://wh40000.firebaseapp.com"><h4>firebase 2</h4></a>
   <a href="https://app.netlify.com/sites/wh40000/overview"><h4>netlify console</h4></a>
     <a href="https://wh40000.netlify.app/"><h4>netlify</h4></a>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
   
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
