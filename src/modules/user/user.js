import axios from "services/Api"

export const getUserByUserId = (user, onSuccess) => {
    axios
      .get("/api/v1/users/", {
        headers: { 
            Authorization: `Bearer ${UserService.getToken()}` 
        },
        params: {
          userId: user.id,
        },        
      })
      .then(
        (res) => onSuccess(res.data),
        (err) => onSuccess({ id: 0, perfil: "user", email: user.id })
      );
  };