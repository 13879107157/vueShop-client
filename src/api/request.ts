// import axios from "axios";
import axios from "axios";
import { useRouter } from 'vue-router'
import { getLocalToken, setLocalToken, clearLocalToken } from '@/utils/setToken'
axios.defaults.baseURL = 'http://127.0.0.1:5173/api/private/v1/' //测试地址，按需更改
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
axios.defaults.withCredentials = true;
import { ElMessage, ElMessageBox } from 'element-plus';
axios.defaults.timeout = 15000;

declare module "axios" {
    interface AxiosResponse<T = any> {
        errorinfo: null;
        meta: {
            status: number
            msg: string
        }
        // 这里追加你的参数
    }
    export function create(config?: AxiosRequestConfig): AxiosInstance;
}

axios.interceptors.request.use(
    config => {
        // let token = getToken()
        let token: string | null = getLocalToken()
        if (token !== null && token !== '') config.headers['Authorization'] = token;
        return config;
    },
    error => {
        console.log("请求出错，错误信息如下：");
        console.log(error);
        Promise.reject(error);
    });


// 响应拦截
axios.interceptors.response.use(
    response => {
        // console.log(response);
        const result = response.data
        const res = result.data
        try {
            setLocalToken(res.token)
        } catch (error) {
            console.log('存储失败');
        }
        const meta = result.meta
        showCodeMsg(meta.status, meta.msg)
        return { ...res, ...meta }
    },
    //response.status为错误类的处理
    error => {
        console.log("请求出错->", error);
        // console.log();
        showMsg('error', -1, error.message)
        return error
    }
);


// 消息提示
function showMsg(type: any, code: number, msg: string) {
    ElMessage({
        type: type,
        // showClose: true,
        dangerouslyUseHTMLString: true,
        message: `<strong>${code}<i>${msg}</i></strong>`,
    })
}

function showCodeMsg(code: number, msg: string) {
    console.log(code, msg);
    if (code == 200 || code == 201 || code == 204) {
        showMsg('success', code, msg)
    } else if (code == 400 && msg == '无效token') {
        showMsg('warning', code, msg)
        process401()
    } else if ((code == 401 || code == 403 || code == 404 || code == 422 || code == 500)) {
        showMsg('error', code, msg)
    } else {
        showMsg('info', -1, '其他异常错误！')
    }
}

function process401() {
    ElMessageBox.confirm('无效/过期的服务器访问，请重新登录。', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        useRouter().push({ path: '/login', replace: true })
        // logout().then(() => {
        //     location.reload()// 重实例化router
        // })
    })
}

export default axios