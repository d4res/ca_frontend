import { ElMessageBox } from "element-plus";

const msSuccess = (msg) => {
    ElMessageBox.alert(msg, "提示", {
        confirmButtonText: "OK",
    });
};

const msFail = (msg) => {
    ElMessageBox.alert(msg, "错误", {
        confirmButtonText: "OK",
    });
};

export default {
    msSuccess,
    msFail
}