const BASE_URL = "http://10.0.2.2/gestion_cobros/public"; // Cambia esto a la URL de tu backend

export const _loginService = {
    async login(username, password) {
        try {
          const response = await fetch(`${BASE_URL}/usuario/${username}`);
          console.log('Estado de la respuesta:', response.status);
          
          if (!response.ok) {
              console.log('Error: La respuesta no es correcta');
              return null;
          }
  
          const data = await response.json();
  
          if (data) {
              if (data.Usuario_Pass === password) {
                  console.log("Contraseña correcta");
                  return data;
              } else {
                  console.log("Contraseña incorrecta");
                  return null;
              }
          } else {
              return null;
          }
        }
        catch (error) {
            console.error('Error en la solicitud:', error.message);
            return null;
        }
    },
    loadToken() {
        const token = localStorage.getItem("authToken");
        if (token) {
        this.token = token;
        }
    },
    saveToken(token) {
        this.token = token;
        localStorage.setItem("authToken", token); // Cambia esto si usas otro almacenamiento en NativeScript
    }
  };

 
// class AuthService {
//   constructor() {
//     this.token = null;
//   }

//   /**
//    * Guarda el token en almacenamiento local
//    * @param {string} token
//    */
//   saveToken(token) {
//     this.token = token;
//     localStorage.setItem("authToken", token); // Cambia esto si usas otro almacenamiento en NativeScript
//   }

//   /**
//    * Carga el token desde almacenamiento local
//    */
//   loadToken() {
//     const token = localStorage.getItem("authToken");
//     if (token) {
//       this.token = token;
//     }
//   }

//   /**
//    * Elimina el token (cerrar sesión)
//    */
//   clearToken() {
//     this.token = null;
//     localStorage.removeItem("authToken");
//   }

//   /**
//    * Realiza el inicio de sesión
//    * @param {string} email
//    * @param {string} password
//    * @returns {Promise<object>} Respuesta del servidor
//    */
//   async login(user, pass) {
//     console.log(user);
//         // fetch(`${BASE_URL}/usuario/user`)
//         // .then(response => response.json())
//         // .then(data => {
//         //     console.log(data);
            
//         //     debugger;
//         //     const { token } =data;
//         //     this.saveToken(token);
//         //     return response.data;
//         // })
//         // .catch(error => {
//         //     console.error('Error en la solicitud:', error);
//         // });
//   }

//   /**
//    * Registra un nuevo usuario
//    * @param {object} userData
//    * @returns {Promise<object>} Respuesta del servidor
//    */
//   async register(userData) {
//     fetch(`${BASE_URL}/usuario/user`)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
            
//             debugger;
//             const { token } =data;
//             this.saveToken(token);
//             return response.data;
//         })
//         .catch(error => {
//             console.error('Error en la solicitud:', error);
//         });

//     // try {
//     //   const response = await axios.post(`${BASE_URL}/register`, userData);
//     //   return response.data;
//     // } catch (error) {
//     //   throw error.response?.data || { message: "Error de conexión" };
//     // }
//   }

//   /**
//    * Obtiene información del usuario autenticado
//    * @returns {Promise<object>} Datos del usuario
//    */
//   async getUserProfile() {
//     // try {
//     //   const response = await axios.get(`${BASE_URL}/profile`, {
//     //     headers: { Authorization: `Bearer ${this.token}` },
//     //   });
//     //   return response.data;
//     // } catch (error) {
//     //   throw error.response?.data || { message: "Error de conexión" };
//     // }
//   }

//   /**
//    * Verifica si el usuario está autenticado
//    * @returns {boolean} true si el usuario está autenticado, false de lo contrario
//    */
//   isAuthenticated() {
//     return !!this.token;
//   }
// }

// export default new AuthService();