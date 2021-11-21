<template>
<el-container >
<el-header>
    <nav_menu/>
</el-header>

<el-main>
<router-view/>
</el-main>

</el-container>
</template>

<script>
// @ is an alias to /src

import nav_menu from "../components/nav.vue";
import axios from "axios";
import Cookies from "js-cookie";
import { ElMessageBox } from "element-plus";
const url = location.origin + "/auth/";
export default {
  name: "Main",
  components: {
    nav_menu,
  },
  data() {
    return {
      user: "",
    };
  },
  setup() {
    const notLogin = () => {
      ElMessageBox.alert("您还没有登录", "提示");
    };

    return {
      notLogin,
    };
  },
  beforeCreate() {
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
        if (response.data.error == 0) {
          this.user = response.data.user;
        } else {
          this.$router.replace("/");
        }
      })
      .catch(() => {
        this.$router.replace("/");
        this.notLogin();
      });
  },
  methods: {},
};
</script>


<style scoped>

html,
body {
  width: 100%;
  margin: 0;
  padding: 0;
   top: 0;
  left: 0;
  right: 0;
}
</style>