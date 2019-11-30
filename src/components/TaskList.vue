<template>
  <div>
    <v-row>
      <v-col cols="12" sm="12">
        <v-card>
          <v-tabs background-color="deep-purple accent-4" center-active dark v-model="tab">
            <v-tab href="#tab-1">All Tasks</v-tab>
            <v-tab href="#tab-2" @click="selected=0">Completed</v-tab>
            <v-tab href="#tab-3" @click="selected=1">Progress</v-tab>
            <v-tab href="#tab-4" @click="selected=2">Assigned</v-tab>
          </v-tabs>
        </v-card>
        <v-tabs-items v-model="tab">
          <v-tab-item value="tab-1">
            <v-card class="mx-auto" tile dark>
              <v-list rounded>
                <v-subheader>TASKS</v-subheader>
                <v-list-item-group v-model="item" color="primary">
                  <task-content @delete="deleteTask" v-for="(value,key) of getSelectedDateTasks"
                                @update="editTask" :key="key" :content="value"></task-content>
                  <v-list-item>
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
          </v-tab-item>
          <v-tab-item value="tab-2">
            <v-card class="mx-auto" tile dark>
              <v-list rounded>
                <v-subheader>TASKS</v-subheader>
                <v-list-item-group v-model="item" color="primary">
                  <task-content @delete="deleteTask" v-for="(value,key) of getTaskList"
                                @update="editTask" :key="key" :content="value"></task-content>
                  <v-list-item>
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
          </v-tab-item>
          <v-tab-item value="tab-3">
            <v-card class="mx-auto" tile dark>
              <v-list rounded>
                <v-subheader>TASKS</v-subheader>
                <v-list-item-group v-model="item" color="primary">
                  <task-content @delete="deleteTask" v-for="(value,key) of getTaskList"
                                @update="editTask" :key="key" :content="value"></task-content>
                  <v-list-item>
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
          </v-tab-item>
          <v-tab-item value="tab-4">
            <v-card class="mx-auto" tile dark>
              <v-list rounded>
                <v-subheader>TASKS</v-subheader>
                <v-list-item-group v-model="item" color="primary">
                  <task-content @delete="deleteTask" v-for="(value,key) of getTaskList"
                                @update="editTask" :key="key" :content="value"></task-content>
                  <v-list-item>
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
          </v-tab-item>
        </v-tabs-items>

      </v-col>
      <v-col cols="12" sm="6" v-if="getSelectedDateTasks.length === 0">
         <p> No any tasks</p>
      </v-col>
    </v-row>
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
    tab: 'tab-1',
    taskList: [],
    selected: 0,
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
    deleteTask(task) {
      this.$firestore.taskList.doc(task[".key"]).delete();
    },
    editTask(task) {
      let key = task[".key"];
      let cdate = task["date"];
      let description = task["description"];
      this.$firestore.taskList.doc(key).update({
        state: task.state
      });
      if(task.state===1){
        task.date = this.getNextDate(cdate);
        task.state = -1;
        task.description = description;
        this.$firestore.taskList.add(task);
      }
    },
    getNextDate(cdate){
      let currentData = cdate.split("-");
      let dataFormat = new Date(parseInt(currentData[0]), parseInt(currentData[1]), parseInt(currentData[2]));
      let nextDate = new Date(+dataFormat);
      let date = nextDate.getDate()+1;
      nextDate.setDate(date);
      return nextDate.getFullYear()+"-"+nextDate.getMonth()+"-"+nextDate.getDate();
    }
  },
  computed: {
    currentDate() {
      return this.$store.state.currentDate;
    },
    getSelectedDateTasks() {
      return this.taskList.filter(task => task.date === this.currentDate);
    },
    getTaskList(){
      return this.taskList.filter(task => task.date === this.currentDate).filter(item => item.state === this.selected);
    }
  }
};
</script>