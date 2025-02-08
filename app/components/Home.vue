<template>
    <Page class="page">
      <ActionBar title="Gestión de Productos">
        <NavigationButton 
        text="Cerrar sesión" 
        @tap="logout" 
        android.systemIcon="ic_lock_power_off"
        ios.position="right"
        class="logout-button"
      />
      </ActionBar>
      <StackLayout>
      <Button text="Lista de Articulos" @tap="$navigateTo(productoList)"  />
        <Button text="Crear Producto" @tap="$navigateTo(productoCreate)" />
        <Button text="Asignar Ingredientes" @tap="$navigateTo(AssignProducts)" />
        <Button text="Enviar Tarea" @tap="$navigateTo(enviarTarea)" />

        <!-- Spinner de carga -->
      <ActivityIndicator 
        :busy="isLoading" 
        width="50" 
        height="50" 
        class="activity-indicator"
      />
      </StackLayout>

    </Page>
  </template>

<script>
    import ProductoList from '~/views/ProductoList';
    import ProductoCreate from '~/views/ProductoCreate';
    import Login from '../views/Login';
    import IncrementarPrecio from '../views/IncrementarPrecio.vue';
    import { firebase } from '@nativescript/firebase-core';
    export default {
            data() {
        return {
          detailPage: Login,
          productoList: ProductoList,
          productoCreate: ProductoCreate,
          enviarTarea: IncrementarPrecio,
          listOption: [
            { id: 1, text: "Artículos" },
            { id: 2, text: "Análisis de Costos" }
          ]
        }
      },
      methods: {
        // Maneja el evento al tocar un elemento de la lista
        onItemTap(event) {
          this.isLoading = true;
          
          const tappedItem = this.listOption[event.index]; // Obtiene el elemento seleccionado
          console.log("Elemento seleccionado:", tappedItem);
          if (tappedItem.id == 1){
            this.$navigateTo(Articulo);
          }
          else if (tappedItem.id == 2){
            this.$navigateTo(AnalisisCostos);
          }
        },
        logout() {
          confirm({
            title: "Cerrar sesión",
            message: "¿Estás seguro que deseas salir?",
            okButtonText: "Sí",
            cancelButtonText: "No"
          }).then(result => {
            if(result) {
              // 1. Limpiar datos de usuario
                // 2. Redirigir al login y limpiar historial de navegación
                this.$navigateTo(Login, {
                  clearHistory: true // Evita que el usuario pueda volver atrás
                })
            }
          })
        },mounted() {
          firebase().onMessageReceived((message) => {
            console.log("Notificación recibida en primer plano:", message);
          });
        }
      }
    }
</script>

<style scoped lang="scss">
    @import '@nativescript/theme/scss/variables/blue';

    // Custom styles
    .fas {
        @include colorize($color: accent);
    }

    .info {
        font-size: 20;
        horizontal-align: center;
        vertical-align: center;
    }
    .logout-button {
      color: #ff4444; /* Color rojo para destacar */
      margin-right: 10;
    }
.loading-overlay {
  background-color: rgba(0,0,0,0.3);
  vertical-align: center;
  horizontal-align: center;
  width: 100%;
  height: 100%;
}
</style>
