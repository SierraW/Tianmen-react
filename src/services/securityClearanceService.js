import axios from "axios";
import CryptoJS from "crypto-js";

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
// dec2hex :: Integer -> String
// i.e. 0-255 -> '00'-'ff'
function dec2hex(dec) {
    return dec < 10
        ? '0' + String(dec)
        : dec.toString(16)
}

// generateId :: Integer -> String
function generateId(len) {
    var arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
}

export function userSec(user) {
    const session = user.user_session;
    const uid = user.id;
    const login = user.user_login;
    const token = generateId(17);
    return new Promise((resolve, reject) => {
        axios.post("http://tianmengroup.com/server/socket/home/checkRole.php", { session, token })
        .then(({data}) => {
            if (data.data.md5 === CryptoJS.SHA256(`${uid}${data.data.role_id}${token}${login}${data.data.com_id}`).toString()) {
                const { com_id, role_id } = data.data;
                resolve({ com_id, role_id });
            } else {
                reject("expired");
            }
        })
        .catch(() => {
            reject("network error");
        })
    })
}