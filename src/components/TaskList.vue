<template>
  <div>
    <v-row>
      <v-col cols="12" sm="12">
        <v-card class="mx-auto" tile dark>
          <v-list rounded>
            <v-subheader>TASKS</v-subheader>
            <v-list-item-group v-model="item" color="primary">
              <v-list-item v-for="(value,key) of getSelectedDateTasks" :key="key">
                <v-list-item-icon>
                  <v-icon>mdi-flag</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  {{value.description}}
                </v-list-item-content>
                <v-btn color="red" @click="deleteConf(value)" text fab dark small>
                  <v-icon dark>mdi-delete</v-icon>
                </v-btn>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-flag</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                <v-textarea
                        name="input-1-1"
                        label="Task Description"
                        hint="Press Enter to save the Task"
                        autofocus
                        rows="3"
                        v-model="description"
                        @keyup.enter.native="saveTask()"
                ></v-textarea>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" v-if="getSelectedDateTasks.length === 0">
         <p> No any tasks</p>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Are you sure?</v-card-title>

        <v-card-text>I sure hope you know what you are doing..</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">Cancel</v-btn>

          <v-btn color="red darken-1" text @click="deleteTask()">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import TaskContent from "@/components/TaskContent.vue";
import { db } from "../config/firebase";
import firebase from "firebase";

export default {
  components: {
    // TaskContent
  },
  data: () => ({
    taskList: [],
    selected: '',
    dialog: false,
    description: "",
    descriptionRules: [
      v => !!v || "Description is required",
      v =>
        (v && v.length > 3) || "Description must be greater than 5 characters"
    ],
    item: '',
  }),
  firestore() {
    return {
      taskList: db.collection(firebase.auth().currentUser.uid)
    };
  },
  methods: {
    saveTask() {
      this.$firestore.taskList.add({
        description: this.description,
        date: this.currentDate
      });
      this.description = ""
    },
    deleteTask() {
      this.$firestore.taskList.doc(this.selected[".key"]).delete();
      this.dialog = false;
    },
    deleteConf(value){
      this.dialog = true;
      this.selected = value;
    },
  },
  computed: {
    currentDate() {
      return this.$store.state.currentDate;
    },
    getSelectedDateTasks() {
      return this.taskList.filter(task => task.date === this.currentDate);
    }
  }
};
</script>