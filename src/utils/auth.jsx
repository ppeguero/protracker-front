export const getUserInfoFromToken = () => {
    const token = localStorage.getItem('token');
  
    if (token) {
      // Parse the token (assuming it's a JWT)
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
  
      // Extract user information from the token payload
      const userInfo = {
        id_usuario: tokenPayload.id_usuario,
        nombre: tokenPayload.nombre,
        correo: tokenPayload.correo,
        id_rol_id: tokenPayload.id_rol_id,
        nombre_rol: tokenPayload.nombre_rol,
      };
  
      return userInfo;
    }
  
    return null;
  };
  