<template>
    <Page>
        <ActionBar>
            <Label text="Home"/>
        </ActionBar>

        <GridLayout>
            <ListView for="item in listOfItems" @itemTap="onItemTap">
            <v-template>
                <!-- Shows the list item label in the default color and style. -->
                <Label :text="item.text" />
            </v-template>
            </ListView>
        </GridLayout>
        <Button text="Iniciar sesión" @tap="IrAIniciarSesion" />
    </Page>
</template>



<script>
  import { Login } from '@/views/Login'

  export default {
    data() {
        return {
            loginPage: Login, 
        }
    },
    methods: {
        IrAIniciarSesion() {
             this.$navigateTo(this.loginPage);
            //alert('si');
      }
    }
  };
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
</style>
