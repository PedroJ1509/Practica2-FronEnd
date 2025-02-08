<template>
    <Page>
      <ActionBar title="Gestión de Productos" />
      <StackLayout>
        <Image src="~/img/logo.jpg" id="img-logo"  width="200" height="auto" horizontalAlignment="center" verticalAlignment="middle" />

        <TextField 
          v-model="username" 
          hint="Usuario" 
          :isEnabled="!isLoading"
        />
        <TextField 
          v-model="password" 
          hint="Contraseña" 
          secure="true"
          :isEnabled="!isLoading"
        />
        <!-- Botón con estado de carga -->
      <Button 
        :text="isLoading ? 'Cargando...' : 'Iniciar sesión'" 
        @tap="VerificarUsuario" 
        :isEnabled="!isLoading"
        class="btn btn-primary"
      />
      <!-- Spinner de carga -->
      <ActivityIndicator 
        :busy="isLoading" 
        width="50" 
        height="50" 
        class="activity-indicator"
      />
      </StackLayout>
      <GridLayout v-if="isLoading" class="loading-overlay">
        <ActivityIndicator busy="true" width="50" height="50"/>
      </GridLayout>
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
.loading-overlay {
  background-color: rgba(0,0,0,0.3);
  vertical-align: center;
  horizontal-align: center;
  width: 100%;
  height: 100%;
}
</style>
  <script>
  import { _loginService } from "@/services/authService";
  import Home  from '../components/Home'
  
  export default {
    data() {
        return {
        detailPage: Home,
        username: "",
        password: "",
        isLoading: false // Nuevo estado para controlar el loading
        }
    },
    methods: {
        async VerificarUsuario() {
        if (!this.username || !this.password) {
            alert('Por favor, ingresa tu usuario y contraseña.');
            return;
        }
        this.isLoading = true; // Activa el spinner

        try {
          const result = await _loginService.login(this.username, this.password);
          
          if (result) {
   
            this.$navigateTo(Home);
          } else {
            alert("Credenciales incorrectas");
            this.isLoading = false;
          }
        } catch (error) {
          alert("Error en el login: " + error.message);
        } finally {
          this.isLoading = false; // Desactiva el spinner siempre
        }
      }
    },
  };
  </script>
  <style scoped>
  .activity-indicator {
    margin-top: 20;
    color: #007bff; /* Color del spinner */
  }
  </style>