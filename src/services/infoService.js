import axios from "axios"

export function getNews() {
    return new Promise((resolve, reject) => {
        axios.get("http://tianmengroup.com/server/socket/home/getNews.php")
        .then(({data}) => {
            if (data.success === "success") {
                resolve(data.data);
            } else {
                reject(data.message);
            }
        })
        .catch(err => {
            reject(err);
        })
    })
}

export function addNews(session, newsObj) {
    return new Promise((resolve, reject) => {
        axios.post("http://tianmengroup.com/server/socket/home/addNews.php", {
            session,
            ...newsObj
        })
        .then(({data}) => {
            if (data.success === "success") {
                resolve(data.data)
            } else {
                reject(data.message);
            }
        })
        .catch(err => {
            reject(err);
        })
    })
}

export function deleteNews(session, id) {
    return new Promise((resolve, reject) => {
        axios.post("http://tianmengroup.com/server/socket/home/deleteNews.php", {
            session,
            id
        })
        .then(({data}) => {
            if (data.success === "success") {
                resolve(data.data)
            } else {
                throw new Error(data.message)
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
                reject(data.message);
            }
        })
        .catch(err => {
            reject(err);
        })
    })
}

export function addNaughtys(session, naughtyObj) {
    return new Promise((resolve, reject) => {
        axios.post("http://tianmengroup.com/server/socket/home/addNotifications.php", {
            session,
            ...naughtyObj
        })
        .then(({data}) => {
            if (data.success === "success") {
                resolve(data.data)
            } else {
                reject(data.message);
            }
        })
        .catch(err => {
            reject(err);
        })
    })
}

export function deleteNaughtys(session, id) {
    return new Promise((resolve, reject) => {
        axios.post("http://tianmengroup.com/server/socket/home/deleteNotifications.php", {
            session,
            id
        })
        .then(({data}) => {
            if (data.success === "success") {
                resolve(data.data)
            } else {
                reject(data.message);
            }
        })
        .catch(err => {
            reject(err);
        })
    })
}

export function getAllTitle() {
    return [
        {
            value: 5,
            text: "Developer"
        },
        {
            value: 6,
            text: "Project Manager"
        },
        {
            value: 7,
            text: "UI Designer"
        },
        {
            value: 8,
            text: "Account Manager"
        },
        {
            value: 9,
            text: "User"
        }
    ];
}