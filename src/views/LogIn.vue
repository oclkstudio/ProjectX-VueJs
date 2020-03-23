<template>
  <v-container bg fill-height text-xs-center>
    <v-row justify="center" align="center">
      <v-col cols="12" md="8" class="d-none d-sm-flex">
        <v-img src="../assets/tt.png"></v-img>
      </v-col>
      <v-col cols="12" md="4">
        <v-form class="text-center">
          <h4 class="grey--text">
            <b>Conceptwave</b>
          </h4>
          <h6 class="grey--text mb-4">Sipariş Yönetim Sistemi</h6>
          <v-text-field
            name="Username"
            label="Kullanıcı Adı"
            prepend-inner-icon="mdi-account"
            clearable
            type="text"
            color="cyan darken-1"
            class="mt-2"
            hint="Kullanıcı ismini doğru yazınız"
          ></v-text-field>
          <v-text-field
            id="password"
            name="Password"
            label="Şifre"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            prepend-inner-icon="mdi-lock"
            color="cyan darken-1"
            :type="show ? 'text' : 'password'"
            class="mt-2"
            @click:append="show = !show"
          ></v-text-field>
          <a href="#" class="mt-2 grey--text">Şifremi Unuttum?</a>
          <v-btn
            class="text-capitalize mt-4"
            block
            rounded
            dark
            color="cyan darken-1"
            router
            :to="'/home'"
          >Giriş</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "LogIn",
  data() {
    return {
      show: false
    };
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>