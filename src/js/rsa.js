import jsencrypt from 'jsencrypt';
import g from '../components/Global.vue';

function encrypt(pt) {
    const rsa_encryptor = new jsencrypt();
    rsa_encryptor.setPublicKey(g.rsa_pub);
    const ct = rsa_encryptor.encrypt(pt);
    return ct;
}

export default {
    encrypt
}