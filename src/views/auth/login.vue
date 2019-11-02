<template>
  <v-content>
    <v-container fluid>
      <v-row justify="center" align="center">
        <v-card dark width="600">
          <v-card-text class=text-center>
            <v-row justify="center" align="center" class="justify-center">
              <v-col cols="12" sm="6" class="justify-center">
                <v-btn dark color="red" width="300px" height="50px" @click="socialLogin('google')">
                  <v-icon right dark style="margin-right:20px">mdi-google</v-icon>Login with Google
                </v-btn>
                <v-btn
                  dark
                  color="blue"
                  width="300px"
                  style="margin-top:20px"
                  @click="socialLogin('facebook')"
                  height="50px"
                >
                  <v-icon right dark style="margin-right:20px">mdi-facebook</v-icon>Login with Facebook
                </v-btn>
                <v-btn
                  color="blue lighten-2"
                  width="300px"
                  dark
                  style="margin-top:20px"
                  height="50px"
                  @click="socialLogin('twitter')"
                >
                  <v-icon right dark style="margin-right:20px">mdi-twitter</v-icon>Login with Twitter
                </v-btn>
              </v-col>
              <v-col cols="12" sm="6">
                <h2 style="text-align:center">or Login Manually</h2>
                <v-form @submit.prevent="signIn" style="marign-top:20px" v-model="valid">
                  <v-text-field
                    v-model="email"
                    label="Email"
                    :rules="emailRules"
                    outlined
                    style="margin-top:20px"
                  ></v-text-field>
                  <v-text-field
                    type="password"
                    v-model="password"
                    label="Password"
                    outlined
                    :rules="passwordRules"
                  ></v-text-field>
                  <v-btn
                    dark
                    color="primary"
                    type="submit"
                    style="float:right"
                    :loading="loading"
                    @click="loading=true"
                    :disabled="!valid"
                  >Login</v-btn>
                </v-form>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackbar" bottom color="red" :vertical="true">{{error}}</v-snackbar>
  </v-content>
</template>

<script>
import firebase from "firebase";

export default {
  data: () => ({
    loading: false,
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    passwordRules: [v => !!v || "Password is required"],
    valid: false,
    error: "",
    snackbar: false
  }),
  methods: {
    signIn: function() {
      this.loading = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            this.$store.commit("login", user);
            this.$router.push("/");
            this.loading = false;
          },
          err => {
            // alert("Oops. " + err.message);
            this.error = err.message;
            this.snackbar = true;
            this.loading = false;
          }
        );
    },
    socialLogin: function(service) {
      this.loading = true;
      let provider = null;
      if (service === "google") {
        provider = new firebase.auth.GoogleAuthProvider();
      } else if (service === "facebook") {
        provider = new firebase.auth.FacebookAuthProvider();
      } else {
        provider = new firebase.auth.TwitterAuthProvider();
      }
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          this.$store.commit("login", result.user);
          this.$router.push("/");
          this.loading = false;
        })
        .catch(err => {
          alert("oops.. " + err.message);
        });
    }
  }
};
</script>