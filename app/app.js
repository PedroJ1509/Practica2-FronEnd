import Vue from 'nativescript-vue'

import { _loginService } from "./services/authService";



const Master = {
  template: `
    <Page>
        
        <ActionBar>
            <Label text="Opciones"/>
        </ActionBar>
        <ListView for="item in listOption" @itemTap="onItemTap">
                <v-template>
                    <!-- Shows the list item label in the default color and style. -->
                    <Label :text="item.text"  class="list-item" />
                </v-template>
              </ListView>

            <StackLayout>
              <Label text="Artículos" />
              <Label text="Proveedor" />
              <Label text="Análisis de Costos" />
            </StackLayout>

        <Button text="Iniciar sesión" @tap="$navigateTo(detailPage)" />
    </Page>
  `,

  data() {
    return {
      detailPage: Login,
      listOption: [
        { id: 1, text: "Opción 1" },
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
      alert(`Seleccionaste: ${tappedItem.text}`);
    },
  },
};

const Login = {
  template: `
    <Page>
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
    //     if (result.success) {
    //       this.$navigateTo("/home");
    //     } else {
    //       alert(result.message);
    //     }
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
