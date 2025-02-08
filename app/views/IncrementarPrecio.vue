<template>
    <Page class="page">
      <ActionBar title="Aumentar Precios">
        <NavigationButton 
          icon="res://ic_arrow_back" 
          @tap="goBack"
          ios.position="left"
          android.systemIcon="ic_menu_back"
        />
      </ActionBar>
  
      <ScrollView>
        <StackLayout>
          <TextField 
            v-model="porcentaje" 
            hint="Porcentaje a aumentar" 
            keyboardType="number" 
            :isEnabled="!isLoading"
            @blur="validatePorcentaje"
          />
          
          <Button 
            :text="isLoading ? 'Enviando...' : 'Enviar Tarea'"
            @tap="sendTask"
            :isEnabled="!isLoading"
            class="btn btn-primary"
          />
          
          <ActivityIndicator :busy="isLoading" width="50" height="50"/>
        </StackLayout>
      </ScrollView>
    </Page>
  </template>
  
  <script>
 import { articuloService } from '../services/articulosService'; // Asumiendo que tienes el servicio de artículos ya configurado
 import { firebase } from '@nativescript/firebase-core';
  
  export default {
    data() {
      return {
        porcentaje: "",
        isLoading: false
      };
    },
    methods: {
      // Validación para asegurarse de que el porcentaje sea un número positivo
      validatePorcentaje() {
        if (isNaN(this.porcentaje) || this.porcentaje <= 0) {
          alert("Por favor ingrese un porcentaje válido mayor que 0.");
          this.porcentaje = "";
        }
      },
  
      // Método para enviar la tarea al API de FastAPI
      async sendTask() {
        
        if (!this.porcentaje) {
          alert("El porcentaje es obligatorio.");
          return;
        }
  
        this.isLoading = true;
  
        try {
            const data = {
                    porcentaje: parseFloat(this.porcentaje),
                    tokenFirebase: this.$store.state.tokenFirebase
                };
            const response = await articuloService.aumentarPrecio(data);

            if (!response.success) {
                throw new Error(response.message);
            }

            //this.$navigateBack();

            alert({
                title: "Éxito",
                message: response.message,
                okButtonText: "Tarea enviada."
            }).then(() => {
                //this.$navigateBack();
              
            });

        } catch (error) {
          console.error("Error al enviar la tarea:", error);
          alert("Error al enviar la tarea");
        } finally {
          this.isLoading = false;
        }
      },
  
      // Método para volver a la página principal
      goBack() {
        this.$navigateBack();
      },
  
      // Escuchar la notificación cuando la tarea sea completada en FastAPI
      listenForNotifications() {
        // firebase.onMessageReceived((message) => {
        //   console.log("Notificación recibida:", message);
  
        //   alert({
        //     title: message.title || "Tarea completada",
        //     message: message.body || "La tarea de aumentar precios se ha completado.",
        //     okButtonText: "Aceptar",
        //   });
        // });
      }
    },
      mounted() {
        this.listenForNotifications();
      }
  };
  </script>
  
  <style scoped>

  </style>