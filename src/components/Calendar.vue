<template>
  <v-row justify="center">
    <v-date-picker
      v-model="picker"
      :show-current="true"
      :full-width="true"
      style="margin-right:20px;margin-left: 20px;"
      @change="changeDate()"
    ></v-date-picker>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    picker: ""
  }),
  beforeMount(){
      this.picker = this.formatDate()
      this.changeDate()
  },
  methods: {
    formatDate() {
      var d = new Date(),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
        
      return [year, month, day].join("-");
    },
    changeDate(){
        this.$store.commit("setCurrentDate", this.picker);
    }
  }
};
</script>

<style>
</style>