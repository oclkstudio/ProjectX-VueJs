<template>
  <div>
    <v-app-bar absolute color="cyan darken-1" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Conceptwave</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell-plus</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-center">Müşteri Temsilcisi</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" link router :to="item.route">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      items: [
        { title: "Ana Sayfa", icon: "mdi-home", route: "/home" },
        {
          title: "Proje Yönetimi",
          icon: "mdi-folder-key-network",
          route: "/project-management"
        },
        {
          title: "Hakkında",
          icon: "mdi-alert-circle-check-outline",
          route: "/about"
        },
        {
          title: "Çıkış",
          icon: "mdi-account-arrow-left",
          route: "/"
        }
      ]
    };
  }
};
</script>