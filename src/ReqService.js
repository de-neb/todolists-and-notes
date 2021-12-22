import axios from "axios";

const url = "http://localhost:5000/api/list/";

class ReqService {
  //list actions start//
  static async getList() {
    const res = await axios.get(url);
    const data = await res.data;
    return data;
  }

  //list actions end//

  //item actions start//
  //get item
  static async getItems(listId) {
    const res = await axios.get(`${url}${listId}`);
    const data = await res.data;
    return data;
  }

  //add item
  static addItem(listId, itemTitle) {
    return axios.post(`${url}${listId}`, {
      itemTitle,
    });
  }

  //delete item
  static deleteItem(listId, itemId) {
    return axios.delete(`${url}${listId}/deleteId`, { data: { itemId } });
  }

  //item actions end//
}

export default ReqService;
