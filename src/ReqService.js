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
    return axios.delete(`${url}${listId}/delete-item`, { data: { itemId } });
  }

  //update items arr
  static updateItems(listId, items) {
    return axios.put(`${url}${listId}/update-items`, { items });
  }

  //item actions end//
}

export default ReqService;
