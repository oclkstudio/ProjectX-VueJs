<template>
  <v-expansion-panels v-model="panel" multiple focusable>
    <v-expansion-panel>
      <v-expansion-panel-header class="grey--text">
        Proje Detayları
        <v-spacer></v-spacer>
        <span v-if="project">
          <b>Proje Kodu:</b>
          {{project.projectCode}}
        </span>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-container>
          <v-row justify="space-around" align="center" v-if="project">
            <v-col cols="12" md="3">
              <v-text-field
                dense
                disabled
                placeholder="Hedeflenen Ürün Sayısı"
                class="caption font-weight-black"
              ></v-text-field>
              <v-text-field
                class="caption font-weight-black"
                dense
                disabled
                outlined
                :placeholder="project.numberOfAp.toString()"
              ></v-text-field>
              <v-text-field
                dense
                disabled
                placeholder="Faturalandırma Aşamasındaki Ürün Sayısı"
                class="caption font-weight-black"
              ></v-text-field>
              <v-text-field
                class="caption font-weight-black"
                dense
                disabled
                outlined
                :placeholder="project.numberOfApAtRfb.toString()"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                dense
                disabled
                placeholder="Faturalandırma Başlangıç Yüzdesi"
                class="caption font-weight-black"
              ></v-text-field>
              <v-text-field
                class="caption font-weight-black"
                dense
                disabled
                outlined
                :placeholder="(project.tresholdPercentage).toString()  + ' %'"
              ></v-text-field>
              <v-text-field
                dense
                disabled
                placeholder="Faturalandırma Başlangıç Sayısı"
                class="caption font-weight-black"
              ></v-text-field>
              <v-text-field
                class="caption font-weight-black"
                dense
                disabled
                outlined
                :placeholder="Math.round(project.numberOfAp * (project.tresholdPercentage/100)).toString()"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="text-center">
              <v-text-field
                dense
                disabled
                placeholder="Faturalandırma Aşamasındaki Ürün Yüzdesi"
                class="overline font-weight-black"
              ></v-text-field>
              <v-progress-linear
                :value="Math.round((project.numberOfApAtRfb * 100) / project.numberOfAp).toString()"
                height="50"
                reactive
                color="cyan darken-1"
                dark
                rounded
              >
                <strong>{{ Math.round((project.numberOfApAtRfb * 100) / project.numberOfAp).toString() }}%</strong>
              </v-progress-linear>
            </v-col>
          </v-row>
          <v-alert
            class="mt-6"
            dense
            border="left"
            text
            type="info"
            color="cyan darken-1"
            v-if="!project"
          >Proje Kodu Seçiniz</v-alert>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header class="grey--text">Manuel Faturalandırma Başlat</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-container>
          <v-row justify="start" v-if="project">
            <v-col cols="12" md="6">
              <v-text-field
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                label="Ürün ara"
                clearable
                dense
                solo
                color="cyan darken-1"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-data-table
            v-if="project"
            :headers="headers"
            :items="subscriptions"
            item-key="name"
            :search="search"
            class="elevation-1"
            :loading="loading"
            loading-text="Uygun abonelikler getiriliyor..."
          >
            <template v-slot:item.actions="{ item }">
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-icon small v-on="on" @click="edit(item)">mdi-pencil</v-icon>
                </template>
                <span>Düzenle</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon small v-on="on" class="ml-2" @click="deleteItem(item)">mdi-delete</v-icon>
                </template>
                <span>Sil</span>
              </v-tooltip>
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-icon small v-on="on" class="ml-2" @click="sendItem(item)">mdi-file-send</v-icon>
                </template>
                <span>Faturalandırmayı Başlat</span>
              </v-tooltip>
            </template>
          </v-data-table>
          <v-alert
            class="mt-6"
            dense
            border="left"
            text
            type="info"
            color="cyan darken-1"
            v-if="!project"
          >Proje Kodu Seçiniz</v-alert>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Swal from "sweetalert2";
export default {
  props: {
    project: Object
  },
  computed: {
    ...mapGetters("Mop", ["result"]),
    ...mapGetters("Rbs", ["subscriptions"]),
    loading() {
      if (this.subscriptions) {
        return false;
      }

      return true;
    }
  },
  data() {
    return {
      panel: [0],
      search: "",
      headers: [
        {
          text: "Abonelik Numarası",
          align: "start",
          value: "subscriptionId"
        },
        { text: "İşlemler", value: "actions", sortable: false }
      ]
    };
  },
  methods: {
    ...mapActions("Mop", ["getResult"]),
    ...mapActions("Rbs", ["resetSubscriptions", "getSubscriptionsByCode"]),
    sendItem(item) {
      Swal.fire({
        title: "Emin misiniz?",
        text: "Faturalandırma isteği gönderilecek!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Evet, gönder!",
        cancelButtonText: "Hayır"
      }).then(result => {
        if (result.value) {
          this.getResult(item);
          Swal.fire(
            "Gönderildi!",
            "Faturalandırma başladığında bilgilendirme yapılacaktır",
            "success"
          );
        }
      });
    },
    alertBilling(result) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: toast => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        }
      });
      if (result.result == "OK") {
        Toast.fire({
          icon: "success",
          title:
            "Abone [ " +
            this.findSubscription(result) +
            " ] için faturalandırma başlatıldı!"
        });
      } else {
        Toast.fire({
          icon: "error",
          title:
            "Abone [ " +
            this.findSubscription(result) +
            " ] için faturalandırma başlatılamadı!"
        });
      }
    },
    findSubscription(result) {
      return this.subscriptions.find(
        subscription => subscription.id === result.requestId
      ).subscriptionId;
    }
  },
  watch: {
    project() {
      if (this.project != null) {
        this.getSubscriptionsByCode(this.project.projectCode);
      }
    },
    result() {
      this.alertBilling(this.result);
    }
  }
};
</script>