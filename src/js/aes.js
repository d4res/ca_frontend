import CryptoJS from 'crypto-js';

function b64parse(b64data) {
    return CryptoJS.enc.Base64.parse(b64data);
}

function b64stringify(words) {
    return CryptoJS.enc.Base64.stringify(words);
}

function encrypt(key, iv, pt) {

    var encrypted = CryptoJS.AES.encrypt(pt, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });

    var b64_ct = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);

    return b64_ct;
}

function decrypt(key, iv, ct) {

    var decrypted = CryptoJS.AES.decrypt(ct, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
}

function init_key() {
    var salt = CryptoJS.lib.WordArray.random(128 / 8);
    var key = CryptoJS.PBKDF2("Secret Passphrase", salt, {
        keySize: 256 / 32
    });
    return key;
}

function init_iv() {
    var iv = CryptoJS.lib.WordArray.random(128 / 8);
    return iv;
}



export default {
    init_key,
    init_iv,
    encrypt,
    b64parse,
    b64stringify,
    decrypt
}