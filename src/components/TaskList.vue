<template>
  <div>
    <v-row>
      <v-col cols="12" sm="6">
       <TaskContent></TaskContent>
      </v-col>
      <v-col cols="12" sm="6">
       <TaskContent></TaskContent>
      </v-col>
      <v-col cols="12" sm="6">
       <TaskContent></TaskContent>
      </v-col>
    </v-row>
    <v-btn color="green" right bottom fixed fab large dark @click="dialog=true">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import TaskContent from '@/components/TaskContent.vue'

export default {
    components: {
        TaskContent
    }
};
</script>