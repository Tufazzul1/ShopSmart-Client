import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://shop-smart-server-kappa.vercel.app',
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;