import Vue from 'nativescript-vue'
import Vuex from "vuex";
import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-messaging'; 

import { _loginService } from "./services/authService";
import { articuloService } from './services/articulosService';
import { analisisCostosService } from './services/analisisCostosService';


import Login from './views/Login';
import Home from './components/Home';

import numeral from 'numeral';
import store from "./store/product-store";

Vue.component('Home', Home);
Vue.use(Vuex);

Vue.config.silent = false;


firebase()
  .initializeApp()
  .then(() => {
    console.log('Firebase inicializado');
    setupFCM(store);
    new Vue({
      store,
      render: (h) => h('frame', [h(Login)])
    }).$start();
  })
  .catch(error => console.error('Error inicializando Firebase:', error));

  async function setupFCM(store) {
    // Solicita permiso para notificaciones (iOS)
    await firebase().messaging().requestPermission();
    
    // Obtén el token FCM
    const token = await firebase().messaging().getToken();
    
    if (token) {
      store.commit("SET_TOKENFIREBASE", token); // Guardamos el token en Vuex correctamente
      console.log("Token guardado:", token);
    } else {
      console.log("No se recibió un token FCM");
    }
    
    // Escucha nuevos tokens (por si se actualiza)
    firebase().messaging().onToken(token => {
      console.log('Nuevo token:', token);
    });
    // Escucha las notificaciones recibidas en primer plano
    firebase().onMessageReceived((message) => {
      console.log("Notificación recibida en primer plano:", message);

      showNotification(message);
    });
  }
  function showNotification(message) {
    // Aquí puedes mostrar una notificación personalizada
    // Este es un ejemplo de cómo podrías usar la API nativa de Android
    const builder = new android.app.Notification.Builder(
      app.android.context
    )
      .setContentTitle(message.title || "Título de la notificación")
      .setContentText(message.body || "Cuerpo de la notificación")
      .setSmallIcon(android.R.drawable.ic_dialog_info);
  
    const notification = builder.build();
    const notificationManager = app.android.context.getSystemService(
      android.content.Context.NOTIFICATION_SERVICE
    );
    notificationManager.notify(0, notification);
  }

    const Master = {
      template: `
        <Page>
            <ActionBar>
                <Label text="Elegir Opción"/>
            </ActionBar>
            <GridLayout>
    
                <ListView for="item in listOption" @itemTap="onItemTap" >
                    <v-template>
                        <!-- Shows the list item label in the default color and style. -->
                        <Label :text="item.text"  class="list-item" />
                    </v-template>
                  </ListView>
                <Button class="botones" text="Iniciar sesión" @tap="$navigateTo(detailPage)" />
          </GridLayout>
          
     
        </Page>
        <script>
          export default {
            created() {
              // Escucha notificaciones en primer plano
              firebase().messaging().onMessage((message) => {
                console.log('Notificación recibida en primer plano:', message);
                this.mostrarNotificacion(message);
              });

              // Escucha clics en notificaciones (app en segundo plano/cerrada)
              firebase().messaging().onNotificationTap((message) => {
                console.log('Notificación clickeada:', message);
                // Navega a una ruta específica si es necesario
              });
            },
            methods: {
              mostrarNotificacion(message) {
                // Usa un plugin de notificaciones o Alert
                alert({
                  title: message.title,
                  message: message.body,
                  okButtonText: "OK"
                });
              }
            }
          }
        </script>
      `,
    
      data() {
        return {
          detailPage: Login,
          articuloPage: Articulo,
          listOption: [
            { id: 1, text: "Artículos" },
            { id: 2, text: "Análisis de Costos" }
          ]
        }
      },
      methods: {
        // Maneja el evento al tocar un elemento de la lista
        onItemTap(event) {
          const tappedItem = this.listOption[event.index]; // Obtiene el elemento seleccionado
          console.log("Elemento seleccionado:", tappedItem);
          if (tappedItem.id == 1){
            this.$navigateTo(Articulo);
          }
          else if (tappedItem.id == 2){
            this.$navigateTo(AnalisisCostos);
          }
        },
      },
    };
    
    const Articulo = {
      template: `
        <Page>
              <ActionBar>
                    <Label text="Artículos - "/>
                    <Button class="fuente-grande" text="Artículos --> Ir a Home" @tap="$navigateTo(homePage)" />
                </ActionBar>
              <SearchBar hint="Search hint" :text="searchPhrase" />
            <GridLayout>
                <ListView for="item in listArticulos" @itemTap="onItemTap2" >
                    <v-template>
                        <!-- Shows the list item label in the default color and style. -->
                        <Label :text="item.text"  class="list-item" />
                    </v-template>
                  </ListView>
                
          </GridLayout>
          
        </Page>
      `,
    
      data() {
        return {
          homePage: Master,
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
        async BuscarArticulos() {
    console.log('Buscando Articulos');
          const result = await articuloService.getAll();
          console.log(result);
          if (result != null){
            
            for (let i = 0; i < result.length; i++) {
          
              let articulo = {
                id: result[i].Articulo_ID,
                text: result[i].Articulo_Desc
              }
    
              this.listArticulos.push(articulo);
            }
          }
          else {
            alert('Usuario o Contraseña incorrecta, favor verificar.')
          }
    
        }
      },
      mounted() {
        this.BuscarArticulos();  // Llama al método para cargar los artículos cuando el componente se monte
      }
    };
    
    
    const AnalisisCostos = {
      template: `
        <Page>
              <ActionBar>
                    <Label text="Artículos - "/>
                    <Button class="fuente-grande" text="Analisis de Costos --> Ir a Home" @tap="$navigateTo(homePage)" />
                </ActionBar>
              <SearchBar hint="Search hint" :text="searchPhrase" />
            <GridLayout>
                <ListView for="item in listAnalisisCostos" @itemTap="onItemTap2" >
                    <v-template>
                        <!-- Shows the list item label in the default color and style. -->
                        <Label :text="item.text"  class="list-item" />
                    </v-template>
                  </ListView>
                
          </GridLayout>
          
        </Page>
      `,
    
      data() {
        return {
          homePage: Master,
          searchPhrase: "",
          listAnalisisCostos: []
        }
      },
      methods: {
        // Maneja el evento al tocar un elemento de la lista
        onItemTap2(event) {
          const tappedItem = this.listArticulos[event.index]; // Obtiene el elemento seleccionado
          console.log("Elemento seleccionado:", tappedItem);
          
        },
        async BuscarArticulos() {
    
          const result = await analisisCostosService.getAll();
          console.log(result);
          if (result != null){
            
            for (let i = 0; i < result.length; i++) {
          
              let articulo = {
                id: result[i].ArticuloAnalisisCosto_ID,
                text: result[i].articulo.Articulo_Desc + ' -> ' + this.formatearConNumeral(result[i].TotalCosto)
              }
    
              this.listAnalisisCostos.push(articulo);
            }
          }
          else {
            alert('Usuario o Contraseña incorrecta, favor verificar.')
          }
    
        },
        formatearConNumeral(numero) {
          return numeral(numero).format('$0,0.00'); // Ejemplo: $1,234,567.89
        },
      },
      mounted() {
        this.BuscarArticulos();  // Llama al método para cargar los artículos cuando el componente se monte
      }
    };
    
    const ArticuloIngredientes = {
      template: `
        <Page>
              <ActionBar>
                    <Button class="fuente-grande" text="Ingredientes --> Ir a Artículos" @tap="$navigateTo(articuloPage)" />
                </ActionBar>
              <SearchBar hint="Search hint" :text="searchPhrase" />
            <GridLayout>
                <ListView for="item in listArticulos" @itemTap="onItemTap2" >
                    <v-template>
                        <!-- Shows the list item label in the default color and style. -->
                        <Label :text="item.text"  class="list-item" />
                    </v-template>
                  </ListView>
                
          </GridLayout>
          
        </Page>
      `,
    
      data() {
        return {
          articuloPage: Articulo,
          searchPhrase: "",
          listIngredientes: []
        }
      },
      methods: {
        // Maneja el evento al tocar un elemento de la lista
        onItemTap2(event) {
          const tappedItem = this.listArticulos[event.index]; // Obtiene el elemento seleccionado
          console.log("Elemento seleccionado:", tappedItem);
          
        },
        async BuscarArticulos() {
    console.log('Buscando Articulos');
          const result = await articuloService.getAll();
          console.log(result);
          if (result != null){
            
            for (let i = 0; i < result.length; i++) {
          
              let articulo = {
                id: result[i].Articulo_ID,
                text: result[i].Articulo_Desc
              }
    
              this.listIngredientes.push(articulo);
            }
          }
          else {
            alert('Usuario o Contraseña incorrecta, favor verificar.')
          }
    
        }
      },
      mounted() {
        this.BuscarArticulos();  // Llama al método para cargar los artículos cuando el componente se monte
      }
    };
    
    // const Login = {
    //   template: `
    //     <Page>
    //       <ActionBar>
    //             <Label text="JaMPe Software"/>
    //         </ActionBar>
    //       <StackLayout>
    //       <ActivityIndicator busy="cargando" />
    //         <Image src="~/img/logo.jpg" id="img-logo"  width="200" height="auto" horizontalAlignment="center" verticalAlignment="middle" />
    
    //         <TextField v-model="username" hint="Usuario" />
    //         <TextField v-model="password" hint="Contraseña" secure="true" />
    //         <Button class="botones" text="Iniciar sesión" @tap="VerificarUsuario" />
    //       </StackLayout>
    //     </Page>
    
    //     <style scoped lang="scss">
            
    //     </style>
    
    //   `,
    //   methods: {
    //     async VerificarUsuario() {
    //       this.cargando= true;
    //       if (!this.username || !this.password) {
    //         cargando= false;
    //         alert('Por favor, ingresa tu usuario y contraseña.');
    //         return;
    //       }
    //       const result = await _loginService.login(this.username, this.password);
    //       this.cargando= false;
    //       if (result != null){
    //         this.$navigateTo(Master);
    //       }
    //       else {
    //         alert('Usuario o Contraseña incorrecta, favor verificar.')
    //       }
    //     }
    //   },
    //   data() {
    //     return {
    //       detailPage: Master,
    //       username: "",
    //       password: "",
    //       cargando: false,
    //     }
    //   }
    // };
    
    

 