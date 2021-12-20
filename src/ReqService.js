import axios from "axios";

const url = "http://localhost:5000/api/list/";

class ReqService {
  static async getList() {
    const res = await axios.get(url);
    const data = await res.data;
    return data;
  }
}

export default ReqService;
