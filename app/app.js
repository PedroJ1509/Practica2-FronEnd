import Vue from 'nativescript-vue'

import { _loginService } from "./services/authService";
import { articuloService } from './services/articulosService';


Vue.config.silent = false;

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
  `,

  data() {
    return {
      detailPage: Login,
      articuloPage: Articulo,
      listOption: [
        { id: 1, text: "Artículos" },
        { id: 2, text: "Opción 2" },
        { id: 3, text: "Opción 3" },
      ]
    }
  },
  methods: {
    // Maneja el evento al tocar un elemento de la lista
    onItemTap(event) {
      const tappedItem = this.listOption[event.index]; // Obtiene el elemento seleccionado
      console.log("Elemento seleccionado:", tappedItem);
      if (tappedItem.id == 1){
        console.log("Ir a Articulos");
        this.$navigateTo(Articulo);
      }
    },
  },
};

const Articulo = {
  template: `
    <Page>
          <ActionBar>
                <Label text="Artículos"/>
            </ActionBar>
          <SearchBar hint="Search hint" :text="searchPhrase" />
        <GridLayout>
            <ListView for="item in listArticulos" @itemTap="onItemTap2" >
                <v-template>
                    <!-- Shows the list item label in the default color and style. -->
                    <Label :text="item.text"  class="list-item" />
                </v-template>
              </ListView>
            <Button class="botones" text="Ir a Home" @tap="$navigateTo(homePage)" />
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
   // this.BuscarArticulos();  // Llama al método para cargar los artículos cuando el componente se monte
  }
};

const Login = {
  template: `
    <Page>
      <ActionBar>
            <Label text="JaMPe Software"/>
        </ActionBar>
      <StackLayout>
      <ActivityIndicator busy="cargando" />
        <Image src="~/img/logo.jpg" id="img-logo"  width="200" height="auto" horizontalAlignment="center" verticalAlignment="middle" />

        <TextField v-model="username" hint="Usuario" />
        <TextField v-model="password" hint="Contraseña" secure="true" />
        <Button class="botones" text="Iniciar sesión" @tap="VerificarUsuario" />
      </StackLayout>
    </Page>

    <style scoped lang="scss">
        
    </style>

  `,
  methods: {
    async VerificarUsuario() {
      this.cargando= true;
      if (!this.username || !this.password) {
        cargando= false;
        alert('Por favor, ingresa tu usuario y contraseña.');
        return;
      }
      const result = await _loginService.login(this.username, this.password);
      this.cargando= false;
      if (result != null){
        this.$navigateTo(Master);
      }
      else {
        alert('Usuario o Contraseña incorrecta, favor verificar.')
      }
    }
  },
  data() {
    return {
      detailPage: Master,
      username: "",
      password: "",
      cargando: false,
    }
  }
};



new Vue({
  render: (h) => h('frame', [h(Login)])
}).$start()
