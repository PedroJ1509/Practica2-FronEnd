
const API_URL = "http://10.0.2.2/gestion_cobros/public";

export const analisisCostosService = {
    async getAll() {
        try {
          const response = await fetch(`${API_URL}/analisiscostos`);
          console.log('Estado de la respuesta:', response.status);
          
          if (!response.ok) {
              console.log('Error: La respuesta no es correcta');
              return null;
          }
  
          const data = await response.json();
  
          if (data) {
            return data;
          } else {
              return null;
          }
        }
        catch (error) {
            console.error('Error en la solicitud:', error.message);
            return null;
        }
    }
}