<template>
    <Page>
                <ActionBar title="Productos">
                  <NavigationButton
                    icon="res://ic_arrow_back" 
                    @tap="goBack"
                    ios.position="left"
                    android.systemIcon="ic_menu_back"
                  />
                </ActionBar>
                <ListView for="item in listArticulos" @itemTap="onItemTap2">
                <v-template>
                  <StackLayout class="item">
                    <Label :text="item.text"  class="list-item" />
                  </StackLayout>
                </v-template>
              </ListView>
             
        </Page>
  </template>
  
  <script>


  import { articuloService } from '../services/articulosService';
  import Home from '../components/Home';
  import store from '../store/product-store';
  export default {
    data() {
        return {
          homePage: Home,
          searchPhrase: "",
          listArticulos: []
        }
      },
      methods: {
        // Maneja el evento al tocar un elemento de la lista
        onItemTap2(event) {
          const tappedItem = this.listArticulos[event.index]; // Obtiene el elemento seleccionado
          console.log("Elemento seleccionado:", tappedItem);
          
        },
        irAHome() {
          this.$navigateTo(Home);
        },
        async BuscarArticulos() {
       
          const result = await articuloService.getAll();
          
          if (result != null){
            
            for (let i = 0; i < result.length; i++) {
          
              let articulo = {
                id: result[i].Articulo_ID,
                text: `(${result[i].Articulo_CD})-${result[i].Articulo_Desc} / Precio: ${result[i].Costo}`
              }
    
              this.listArticulos.push(articulo);
            }
          }
         
          
        },
        goBack() {
          this.$navigateBack() // Regresa a la página anterior
        }
      },
      mounted() {

        this.BuscarArticulos();  // Llama al método para cargar los artículos cuando el componente se monte
      },
  };
  </script>
  <style scoped>
   .activity-indicator {
    margin-top: 20;
    color: #007bff; /* Color del spinner */
  }
    NavigationButton {
      color: #007bff; 
      margin-left: 10;
    }
    </style>