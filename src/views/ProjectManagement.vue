<template>
  <div>
    <Header style="margin-bottom: 100px"></Header>
    <v-container>
      <v-card elevation="1">
        <v-card-subtitle>Proje Yönetimi</v-card-subtitle>
      </v-card>
      <v-row class="mt-6">
        <v-col cols="12" md="4">
          <v-autocomplete
            ref="projectCode"
            item-text="projectCode"
            prepend-inner-icon="mdi-database-search"
            :items="codes"
            label="Country"
            placeholder="Proje Kodunu Seçiniz"
            required
            solo
            clearable
            v-model="selected"
            color="cyan darken-1"
          ></v-autocomplete>
        </v-col>
      </v-row>
      <ProjectDetails class="mb-12" :project="findProject"></ProjectDetails>
    </v-container>
  </div>
</template>

<script>
import Header from "../components/Header";
import ProjectDetails from "../components/ProjectDetails";
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("Codes", ["codes"]),
    findProject() {
      return this.codes.find(project => project.projectCode === this.selected);
    }
  },
  components: {
    Header,
    ProjectDetails
  },
  data() {
    return {
      selected: null
    };
  },
  methods: {
    ...mapActions("Codes", ["getCodes"])
  },
  created() {
    this.getCodes();
  }
};
</script>