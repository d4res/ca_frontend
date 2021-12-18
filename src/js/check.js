import axios from 'axios';
import msg from './msg';
import Cookies from 'js-cookie';


const check = ()=>{
    const url = location.origin + '/auth/'
    axios
        .post(
        url + "check",
        {},
        {
            headers: {
            "X-CSRF-TOKEN": Cookies.get("X-CSRF-TOKEN"),
            },
            withCredentials: true,
        }
        )
        .then((response) => {
        if (response.data.error != 0) {
            this.$router.replace("/");
        }
        })
        .catch(() => {
            this.$router.replace("/");
            msg.msFail("您还没有登录");
        });
}


export default {
    check
}

