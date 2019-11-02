<template>
  <v-container class="grey lighten-5">
    <h1>Daily Task Reporter</h1>
    <v-row style="margin-top:20px">
      <v-col cols="12" sm="6">
        <Calendar></Calendar>
      </v-col>
      <v-col cols="12" sm="6">
        <TaskList></TaskList>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Calendar from '@/components/Calendar.vue'
import TaskList from '@/components/TaskList.vue'

export default {
  name: "home",
  components: {
    // HelloWorld
    Calendar,
    TaskList
  }
};
</script>

<style scoped>
  h1{
    text-align: center;
  }
</style>