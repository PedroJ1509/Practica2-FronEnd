<template>
    <Page>
      <StackLayout>
        <Image src="~/img/logo.jpg" id="img-logo"  width="200" height="auto" horizontalAlignment="center" verticalAlignment="middle" />

        <TextField v-model="username" hint="Usuario" />
        <TextField v-model="password" hint="Contraseña" secure="true" />
        <Button text="Iniciar sesión" @tap="VerificarUsuario" />
      </StackLayout>
    </Page>
</template>
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
#img-logo {
  margin-bottom: 100px;
  display: inline-block;
}
</style>
  <script>
  import { _loginService } from "@/services/authService";
  import { Home } from '~/components/Home'
  
  export default {
    data() {
        return {
        detailPage: Home,
        username: "",
        password: "",
        }
    },
    methods: {
        async VerificarUsuario() {
        if (!this.username || !this.password) {
            alert('Por favor, ingresa tu usuario y contraseña.');
            return;
        }
        const result = await _loginService.login(this.username, this.password);
        console.log(result);
        if (result != null){
            this.$navigateTo(this.detailPage);
        }
        else {
            alert('Usuario o Contraseña incorrecta, favor verificar.')
        }
      }
    },
  };
  </script>