<template>
  <div>
    <v-row>
      <v-col cols="12" sm="6" v-for="(value,key) of getSelectedDateTasks" :key="key">
        <TaskContent :content="value" @delete="deleteTask" @edit="editTask"></TaskContent>
      </v-col>
      <v-col cols="12" sm="6" v-if="getSelectedDateTasks.length === 0">
         <p> No any tasks</p>
      </v-col>
    </v-row>
    <v-btn color="green" right bottom fixed fab large dark @click="dialog=true">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add New Task</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field label="Title*" :rules="titleRules" v-model="title" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-autocomplete
                    :items="['Completed', 'Todo', 'Failed']"
                    v-model="type"
                    :rules="typeRules"
                    label="Type"
                    multiple
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="Description*"
                    v-model="description"
                    :rules="descriptionRules"
                    required
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="saveTask()" :disabled="!valid">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import TaskContent from "@/components/TaskContent.vue";
import { db } from "../config/firebase";
import firebase from "firebase";

export default {
  components: {
    TaskContent
  },
  data: () => ({
    valid: false,
    taskList: [],
    dialog: false,
    title: "",
    titleRules: [
      v => !!v || "Title is required",
      v => (v && v.length > 3) || "Title must be greater than 3 characters"
    ],
    type: "",
    typeRules: [v => !!v || "Type is required"],
    description: "",
    descriptionRules: [
      v => !!v || "Description is required",
      v =>
        (v && v.length > 3) || "Description must be greater than 5 characters"
    ]
  }),
  firestore() {
    return {
      taskList: db.collection(firebase.auth().currentUser.uid)
    };
  },
  methods: {
    saveTask() {
      this.$firestore.taskList.add({
        title: this.title,
        type: this.type,
        description: this.description,
        date: this.currentDate
      });
      this.dialog = false;
      this.$refs.form.reset();
    },
    deleteTask(task) {
      this.$firestore.taskList.doc(task[".key"]).delete();
    },
    editTask(task) {
      this.$firestore.taskList.doc(task[".key"]).update({
        title: task.title,
        type: task.type,
        description: task.description
      });
    }
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