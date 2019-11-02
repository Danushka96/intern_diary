<template>
   <v-row justify="center">
    <v-date-picker v-model="picker" :show-current="true" :full-width="true" style="margin-right:20px;"></v-date-picker>
  </v-row>
</template>

<script>
export default {
    data: () => ({
        picker: "2019-11-02"
    })
}
</script>

<style>

</style>