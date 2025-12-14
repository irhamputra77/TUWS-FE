import axios from "axios";

export const api = axios.create({
    baseURL: "http://dev-api-tuws.stas-rg.com",
    timeout: 10000,
});


api.interceptors.request.use((config) => {
    config.headers["X-API-KEY"] = "tuws2526";
    return config;
});

export const getGeneral = (callback) =>
    api
        .get("/api/data", {
            params: {
                type: "general",
            },
        })
        .then((res) => {
            console.log(res);
            callback(res.data);
        })
        .catch((err) => {
            console.log(err);
        });

export const getHourly = (callback) => api.get("/api/data", {
    params: {
        type: "hourly",
        limit: 12,
    }
}).then(
    (res) => {
        callback(res.data);
    }).catch((err) => {
        console.log(err);
    });

export const getDetails = (callback) => api.get("api/data", {
    params: {
        type: "details"
    }
}).then((res) => {
    callback(res.data.data);
}).catch((err) => {
    console.log(err);
});

export const getHistory = (callback, page = 1) => api.get("api/history", {
    params: {
        data_source: "ecowitt",
        page,
    }
})
    .then((res) => {
        callback(res.data)
    }).catch((err) => {
        console.log(err);
    });

export const getGraph = (callback, typeData) => api.get("api/graph", {
    params: {
        range: "weekly",
        datatype: typeData,
    }
})
    .then((res) => {
        callback(res.data)
    }).catch((err) => {
        console.log(err);
    });