import axios from 'axios';

//save or update user to database
export const saveorUpdateUser = async (userData)=>{
    const {data}= await axios.post(`${import.meta.env.VITE_API_URL}/users`,userData)

return data;
}