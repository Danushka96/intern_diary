<template>
  <div>
    <v-card class="mx-auto" max-width="344" :hover="true" :dark="true" :loading="false" outlined>
      <v-card-title>{{content.title}}</v-card-title>
      <v-card-text>
          <p>{{content.description}}</p>
          <v-chip v-for="(value,key) of content.type" :key="key">{{value}}</v-chip>
          </v-card-text>
      <v-card-actions>
        <v-btn color="blue" @click="editDialog=true" text>Edit</v-btn>
        <v-btn color="red" @click="deleteConfirm=true" text>Delete</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="editDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Task</span>
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
          <v-btn color="blue darken-1" text @click="editDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="editTask()" :disabled="!valid">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteConfirm" max-width="290">
      <v-card>
        <v-card-title class="headline">Are you sure?</v-card-title>

        <v-card-text>I sure hope you know what you are doing..</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="deleteConfirm = false">Cancel</v-btn>

          <v-btn color="red darken-1" text @click="deleteTask()">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    content: Object
  },
  beforeMount() {
    this.title = this.content.title;
    this.type = this.content.type;
    this.description = this.content.description;
  },
  data: () => ({
    valid: false,
    deleteConfirm: false,
    editDialog: false,
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
  methods: {
    editTask() {
      this.$emit("edit", {
        ".key": this.content[".key"],
        title: this.title,
        type: this.type,
        description: this.description
      });
      this.editDialog = false;
    },
    deleteTask(){
        this.$emit("delete", {
            ".key": this.content[".key"]
        })
    }
  }
};
</script>