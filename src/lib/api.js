import axios from "axios";

export const getGeneral = () => {
    return axios({
        method: "get",
        url: "http://api-tuws.stas-rg.com/api/data",
        params: { type: "general" },       // tambah query
        headers: { api_key: "tuws2526" }   // headers sebagai object
    })
        .then(res => res.data)
        .catch(err => {
            // log detail untuk debug
            console.error("ERR", err.message, err.response?.status, err.response?.data);
            throw err;
        });
};
