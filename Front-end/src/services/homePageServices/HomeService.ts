import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const getBanner = `${apiUrl}/homePage/bannerImages`;
const getNoticeAndNews = `${apiUrl}/homePage/topParishNewsAndNotices`;
const welcomeMsg = `${apiUrl}/homePage/welcomeMessage`;
const massTimes = `${apiUrl}/homePage/massTimes`;
const recentEvent = `${apiUrl}/homePage/recentEvents`;

export const fetchBanner = async () => {
    try {
        const response = await axios.get(getBanner);
        return response.data; 
    } catch (error) {
        console.error("Error fetching banner data", error);
        throw error;
    }
};

export const fetcNoticeAndNews = async () =>{
    try{
        const response = await axios.get(getNoticeAndNews);
        return response.data;
    }catch(error){
        console.error("Error fetching Notice and News data", error);
        throw error;
    }
} 

export const fetchWelcomeMsg = async () =>{
    try{
        const response = await axios.get(welcomeMsg);
        return response.data;
    }catch(error){
        console.error("Error fetching Welcome Message",error);
        throw error;
    }
}


export const fetchMassTime = async ()=>{
    try{
        const response = await axios.get(massTimes);
        return response.data;
    }catch(error){
        console.error("Error fetching Mass time",error);
        throw error;
    }
}

export const fetchRecentEvents = async ()=>{
    try {
        const response = await axios.get(recentEvent);
        return response.data;
    } catch (error) {
        console.error("Error fetching Recent Event ",error);
        throw error;
    }
}