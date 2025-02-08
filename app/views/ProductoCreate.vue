<template>
    <Page class="page">
      <ActionBar title="Nuevo Producto">
        <NavigationButton 
          icon="res://ic_arrow_back" 
          @tap="goBack"
          ios.position="left"
          android.systemIcon="ic_menu_back"
        />
      </ActionBar>
  
      <ScrollView>
        <StackLayout>
          <TextField v-model="articulo_Id" hint="ID del producto" :isEnabled="!isLoading"/>
          <TextField v-model="articulo_CD" hint="Código del producto" :isEnabled="!isLoading"/>
          <TextField v-model="articulo_Desc" hint="Descripción" :isEnabled="!isLoading"/>
          <TextField v-model="costo" hint="Precio" :isEnabled="!isLoading"/>
          
          <Button 
            :text="isLoading ? 'Guardando...' : 'Guardar Producto'" 
            @tap="saveProduct" 
            :isEnabled="!isLoading"
            class="btn btn-primary"
          />
          
          <ActivityIndicator :busy="isLoading" width="50" height="50"/>
        </StackLayout>
      </ScrollView>
    </Page>
  </template>
  
  <script>
  import { articuloService } from '../services/articulosService';

export default {
    data() {
        return {
        articulo_Id: "",
        articulo_CD: "",
        articulo_Desc: "",
        costo: "",
        isLoading: false
        };
    },
    methods: {
     async saveProduct() {
        if (!this.articulo_Id || !this.articulo_CD) {
            alert("Los campos ID y Código son obligatorios");
            return;
        }
        this.isLoading = true;
        
        try {
                const productData = {
                    Articulo_ID: parseInt(this.articulo_Id),
                    Articulo_CD: this.articulo_CD,
                    Articulo_Desc: this.articulo_Desc,
                    Costo: this.costo
                };

                const response = await articuloService.create(productData);

                if (!response.success) {
                    throw new Error(response.message);
                }

                alert({
                    title: "Éxito",
                    message: response.message,
                    okButtonText: "Aceptar"
                }).then(() => this.$navigateBack());

            } catch (error) {
                let errorMessage = "Error general";
  
                if (error.response) {
                    errorMessage = `Error ${error.response.statusCode}: ${error.content}`;
                } else if (error.message) {
                    errorMessage = error.message;
                }

                alert({
                    title: "Error",
                    message: errorMessage,
                    okButtonText: "Aceptar"
                });
            } finally {
                this.isLoading = false;
            }
        },
        goBack() {
        this.$navigateBack();
        }
    }
    };
  </script>