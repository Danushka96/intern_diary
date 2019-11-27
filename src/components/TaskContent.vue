<template>
    <div>
        <v-list-item>
            <v-speed-dial right top v-model="fab" direction="right">
                <template v-slot:activator>
                    <v-btn color="blue darken-2" dark fab style="margin-left: 10px; margin-bottom: 35px !important;" v-model="fab" x-small  class="my-2" >
                        <v-icon v-if="fab">mdi-close</v-icon>
                        <v-icon v-else>{{getTaskIcon()}}</v-icon>
                    </v-btn>
                </template>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn color="green" dark fab small v-on="on" @click="updateTask(0)">
                      <v-icon>mdi-check</v-icon>
                  </v-btn>
                </template>
                <span>Completed</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn color="indigo" dark fab small v-on="on" @click="updateTask(1)">
                      <v-icon>mdi-progress-check</v-icon>
                  </v-btn>
                </template>
                <span>In Progress</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn color="orange" dark fab small v-on="on" @click="updateTask(2)">
                      <v-icon>mdi-progress-alert</v-icon>
                  </v-btn>
                </template>
                <span>Assigned</span>
              </v-tooltip>
            </v-speed-dial>
            <v-list-item-content>
                {{content.description}}
            </v-list-item-content>
            <v-btn @click="deleteConfirm=true" color="red" dark fab small text>
                <v-icon dark>mdi-delete</v-icon>
            </v-btn>
        </v-list-item>
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
            fab: '',
            deleteConfirm: false
        }),
        methods: {
            deleteTask() {
                this.$emit("delete", {
                    ".key": this.content[".key"]
                });
              this.deleteConfirm = false
            },
            updateTask(state){
                this.$emit("update", {
                    ".key": this.content[".key"],
                    "state": state
                })
            },
            getTaskIcon(){
                if(this.content.state===0){
                    return "mdi-check"
                }else if(this.content.state===1){
                    return "mdi-progress-check"
                }else if (this.content.state===2){
                    return "mdi-progress-alert"
                }else{
                    return "mdi-pencil"
                }
            }
        }
    };
</script>