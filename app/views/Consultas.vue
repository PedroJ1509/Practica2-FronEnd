<template>
    <Page>
      <ListView :items="data">
        <v-template>
          <Label :text="`Nombre: ${item.nombre}, Edad: ${item.edad}`" />
        </v-template>
      </ListView>
    </Page>
  </template>
  
  <script>
  import { fetchData } from "@/services/dataService";
  
  export default {
    data() {
      return {
        data: [],
      };
    },
    async mounted() {
      this.data = await fetchData();
    },
  };
  </script>