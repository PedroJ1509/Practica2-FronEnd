
const API_URL = "http://10.0.2.2/gestion_cobros/public";
const FastAPI_URL = "http://10.0.2.2:5000/";

export const articuloService = {
    async getAll() {
        try {
        //   const response = await fetch(`${API_URL}/articulo`);
        const response = await fetch(`${FastAPI_URL}articulosFB/`);
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
    },
    async create(articulo) {
        try {
            const requests = [
                fetch(`${FastAPI_URL}articulosFB/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(articulo),
                }),
                fetch(`${API_URL}/articulo`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(articulo),
                })
            ];

            const [fastApiResponse, lumenResponse] = await Promise.all(requests);

            if (!fastApiResponse.ok || !lumenResponse.ok) {
                throw new Error("Error en una de las APIs");
            }

            return { success: true, message: "Registro guardado en ambas APIs" };
        } catch (error) {
            return { success: false, message: error.message };
        }
    },
    async aumentarPrecio(data) {
        try {

            const response = await fetch(`${FastAPI_URL}incrementarPrecio`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              });
            
              if (!response.ok) {
                throw new Error("Error en una de las APIs");
              } 

            return { success: true, message: "Tarea enviada." };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
    
}