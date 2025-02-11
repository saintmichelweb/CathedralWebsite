import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const getHistoryOfTheCathedral = `${apiUrl}/aboutPage/parish-history`;
const getParishCouncil = `${apiUrl}/aboutPage/parishCommitteeCouncil`;
const getCommission = `${apiUrl}/services/commissions`;
const getPriest = `${apiUrl}/aboutPage/priests`;
const getChoirs = `${apiUrl}/services/Choirs`


export const fetchHistoryOfTheCathedral = async () =>{
    try {
        const response = await axios.get(getHistoryOfTheCathedral);
        return response.data;
    } catch (error) {
        console.error("Error feching History of the Cathedral data ",error);
        throw error;
    }
}


export const fetchParishCouncil = async ()=>{
    try {
       const response = await axios.get(getParishCouncil);
       return response.data; 
    } catch (error) {
        console.error("Error fetching Parish Council Committee ");
        throw error
    }
}

export const fetchCommision  = async ()=>{
    try {
        const response = await axios.get(getCommission);
        return response.data;
    } catch (error) {
        console.error("Error feching Commision data ",error);
        throw error;
    }
}

export const fetchPriest = async () =>{
    try {
        const response = await axios.get(getPriest);
        return response.data;
    } catch (error) {
        console.error("Error fetching Priest data",error);
        throw error;
    }
}

export const fetchChoir = async () =>{
    try {
        const response = await axios.get(getChoirs);
        return response.data;
    } catch (error) {
        console.error("Error fetching Choirs data",error);
        throw error;
    }
}