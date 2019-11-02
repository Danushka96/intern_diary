<template>
  <v-card class="mx-auto" max-width="344" :hover="true" :dark="true" :loading="false" outlined>
    <v-card-title>{{content.title}}</v-card-title>
    <v-card-text>{{content.description}}</v-card-text>
    <v-card-actions>
      <v-btn color="blue" text>Edit</v-btn>
      <v-btn color="red" text>Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
    props: {
        content: Object
    }
};
</script>