import axios from "axios"

export default axios.create({
    baseURL: "http://localhost:8080" // 本地测试
    // baseURL: "http://110.42.134.163" //线上打包构建
})