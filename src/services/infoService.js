import axios from "axios"

export function getNews() {
    return new Promise((resolve, reject) => {
        axios.get("http://tianmengroup.com/server/socket/home/getNews.php")
        .then(({data}) => {
            if (data.success === "success") {
                resolve(data.data);
            } else {
                throw new Error(data.message);
            }
        })
        .catch(err => {
            reject(err);
        })
    })
}

export function getNaughtys() {
    return new Promise((resolve, reject) => {
        axios.get("http://tianmengroup.com/server/socket/home/getNotifications.php")
        .then(({data}) => {
            if (data.success === "success") {
                resolve(data.data);
            } else {
                throw new Error(data.message);
            }
        })
        .catch(err => {
            reject(err);
        })
    })
}