import axios from "axios";

export default class Dashboard {

    static checkResponse(response) {

       // console.log(response);
    }

    static getHeaders() {

        let host = "http://localhost";
        const port = 3001;

        return {
            url: `${host}:${port}`
        }
    }

    // === Login ===

    static async login(login, password) {
        const headers = this.getHeaders();
        const response = await axios.get(`${headers.url}/users?login=${login.toLowerCase()}`);
        this.checkResponse(response);
        if (response.data.lenght === 0) {
            throw new Error("login oder password ist falsch");
        }

        const pwd = atob(response.data[0].password)
        if (password !== pwd) {
            throw new Error("login oder password ist falsch");
        }
        
        return{
            login: response.data[0].login,
            id: response.data[0].id
        }

    }

    // === Colors ===
    static async getColors() {
        const headers = this.getHeaders();
        const response = await axios.get(`${headers.url}/colors`);
        this.checkResponse(response);
        return response.data;
    }

    // === Folders ===
    static async getFolders4User(userId=null) {
        const headers = this.getHeaders();
        let path = `${headers.url}/lists`;
        if (userId) {
            path = path + `?userId=${userId}`;
        }
        const response = await axios.get(path);
        this.checkResponse(response);
        return response.data;
    }

    static async getFolders(id=null) {
        const headers = this.getHeaders();
        let path = `${headers.url}/lists`;
        if (id) {
            path = path + `?id=${id}`
        }
        const response = await axios.get(path);
        this.checkResponse(response);
        return response.data;
    }

    static async createFolder(params) {
        const headers = this.getHeaders();
        const response = await axios.post(`${headers.url}/lists`, {
            name: params.name,
            colorId: params.colorId,
            seqnr: params.seqnr,
            userId: params.userId
        });
        this.checkResponse(response);
        return response.data;
    }

    static async deleteFolder(id) {
        const headers = this.getHeaders();
        const response = await axios.delete(`${headers.url}/lists/${id}`);
        this.checkResponse(response);
        return response.data;
    }

    static async updateFolder(id, params) {
        const headers = this.getHeaders();
        const response = await axios.patch(`${headers.url}/lists/${id}`, params);
        this.checkResponse(response);
        return response.data;
    }

    // === Tasks ===

    static async getTasks(id=null) {
        const headers = this.getHeaders();
        let path = `${headers.url}/tasks`;
        if (id) {
            path = path + `?id=${id}`;
        }
        const response = await axios.get(path);
        this.checkResponse(response);
        return response.data;
    }

    static async createTask(params){
        const headers = this.getHeaders();
        const response = await axios.post(`${headers.url}/tasks`, {
            text: params.text,
            completed: params.completed,
            listId: params.listId,
            seqnr: params.seqnr
        });
        this.checkResponse(response);
        return response.data;
    }

    static async deleteTask(id){
        const headers = this.getHeaders();
        const response = await axios.delete(`${headers.url}/tasks/${id}`);
        this.checkResponse(response);
        return response.data;
    }

    static async updateTask(id, params){
        const headers = this.getHeaders();
        const response = await axios.patch(`${headers.url}/tasks/${id}`, params);
        this.checkResponse(response);
        return response.data;
    }
}