<template>
  <v-content>
    <v-container>
      <v-row justify="center" align="center">
        <v-card dark width="600">
          <v-card-text>
            <v-row justify="center" align="center">
              <v-col cols="12" sm="6">
                <v-btn dark color="red" width="300px" height="50px" @click="socialLogin('google')">
                  <v-icon right dark style="margin-right:20px">mdi-google</v-icon>Register with Google
                </v-btn>
                <v-btn
                  dark
                  color="blue"
                  width="300px"
                  style="margin-top:20px"
                  height="50px"
                  @click="socialLogin('facebook')"
                >
                  <v-icon right dark style="margin-right:20px">mdi-facebook</v-icon>Register with Facebook
                </v-btn>
                <v-btn
                  color="blue lighten-2"
                  width="300px"
                  dark
                  style="margin-top:20px"
                  height="50px"
                  @click="socialLogin('twitter')"
                >
                  <v-icon right dark style="margin-right:20px">mdi-twitter</v-icon>Register with Twitter
                </v-btn>
              </v-col>
              <v-col cols="12" sm="6">
                <h2 style="text-align:center">or Signup Manually</h2>
                <v-form style="marign-top:20px" @submit.prevent="signup" v-model="valid">
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="Email"
                    outlined
                    style="margin-top:20px"
                  ></v-text-field>
                  <v-text-field
                    type="password"
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    type="password"
                    v-model="confirmpassword"
                    :error-messages="passwordMatchError()"
                    label="Confirm Password"
                    outlined
                  ></v-text-field>
                  <v-btn
                    dark
                    color="green"
                    type="submit"
                    style="float:right"
                    :loading="loading"
                    @click="loading=true"
                    :disabled="!valid"
                  >Signup</v-btn>
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
    valid: false,
    loading: false,
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    confirmpassword: "",
    passwordRules: [
      v => !!v || "Password is required",
      v =>
        (v && v.length >= 6) || "Password must include at least 6 characters",
      v =>
        /^(?=.*\d)(?=.*[0-9]).{6,20}$/.test(v) ||
        "Password must include at one number",
      v =>
        /^(?=.*\d)(?=.*[A-Za-z]).{6,20}$/.test(v) ||
        "Password must include at one letter"
    ],
    error: "",
    snackbar: false
  }),
  methods: {
    passwordMatchError() {
      return this.password === this.confirmpassword
        ? ""
        : "Passwords must match";
    },
    signup() {
      console.log("hi");
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            console.log("hi hi");
            this.$store.commit("login", user);
            this.$router.replace("/login");
            this.loading = false;
          },
          err => {
            // alert("Oops. " + err.message);
            this.loading = false;
            this.snackbar = true;
            this.error = err.message;
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