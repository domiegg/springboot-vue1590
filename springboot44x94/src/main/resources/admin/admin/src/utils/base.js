const base = {
    get() {
        return {
            url : "http://localhost:8080/springboot44x94/",
            name: "springboot44x94",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/springboot44x94/front/dist/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "儿童性教育网站"
        } 
    }
}
export default base
