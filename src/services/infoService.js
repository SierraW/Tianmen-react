import axios from "axios"

export function getNews() {
    return new Promise((resolve, reject) => {
        axios.get("http://tianmengroup.com/server/socket/home/getNews.php")
            .then(({ data }) => {
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
            .then(({ data }) => {
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
            .then(({ data }) => {
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
            .then(({ data }) => {
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
            .then(({ data }) => {
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
            .then(({ data }) => {
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

export function createNewCompany(em_company, timestamp, user, name) {
    return new Promise(async (resolve, reject) => {
        var success = true;
        var docId = "";
        var dbId = -1;

        await em_company
            .add({
                name: name,
                login: user.user_login,
                time: timestamp()
            })
            .then(docRef => {
                docId = docRef.id;
            })
            .catch(() => {
                success = false;
            });

        if (!success) {
            reject("Fail at: add new company. (1)");
        }

        await axios.post("http://tianmengroup.com/server/socket/user/addCompany.php", {
            session: user.user_session,
            fs_key: docId,
            name
        })
            .then(({ data }) => {
                dbId = data.inserted_id;
            })
            .catch(() => {
                success = false;
            });

        if (!success) {
            reject("Fail at: add new company. (2)");
        }

        await em_company
            .doc(docId)
            .update({
                id: dbId
            })
            .then(() => {
                resolve(dbId);
            })
            .catch(() => {
                reject("Fail at: add new company. (3)");
            });
    })
}