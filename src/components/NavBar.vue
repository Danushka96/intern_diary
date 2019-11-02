<template>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Internship</span>
        <span class="font-weight-light">Diary</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div>
      <router-link to="/login">
        <v-btn text>
          <span class="mr-2">Login</span>
        </v-btn>
      </router-link>
      <router-link to="/signup">
        <v-btn text>
          <span class="mr-2">Register</span>
        </v-btn>
      </router-link>
    </div>
    <div>
      <v-btn @click="logout()" text>
        <span class="mr-2">Logout</span>
      </v-btn>
    </div>
    </v-app-bar>
</template>

<script>
export default {
    
}
</script>