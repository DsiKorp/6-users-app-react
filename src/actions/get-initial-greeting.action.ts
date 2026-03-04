import { usersApi } from "../api/usersApi";

export const getGreetingAction = async () => {
    try {
        const { data } = await usersApi.get<string>("/hello");

        console.log(data);
        return data;
    } catch (error) {
        //console.error(error);
        return "Usa tus credenciales de acceso para ingresar a la aplicacion";
    }

}