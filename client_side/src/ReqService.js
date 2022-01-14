import axios from "axios";

const url = "http://localhost:5000/api/list/";
const urlNotes = "http://localhost:5000/api/notes/";

class ReqService {
  //list actions start//

  //get List
  static async getList() {
    const res = await axios.get(url);
    const data = await res.data;
    return data;
  }

  //create List
  static async createList(listName) {
    return axios.post(url, {
      name: listName,
    });
  }

  //delete list
  static async deleteList(listId) {
    const res = await axios.delete(`${url}${listId}/delete-list`);
    const data = await res.data;
    return data;
  }

  //update active list
  static async updateActiveList(listId) {
    return axios.put(`${url}${listId}/update-active-list`);
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
    return axios.patch(`${url}${listId}/delete-item`, { itemId });
  }

  //delete all items
  static deleteAllItems(listId) {
    return axios.patch(`${url}${listId}/delete-items`);
  }

  //update items arr
  static updateItems(listId, items) {
    return axios.patch(`${url}${listId}/update-items`, { items });
  }

  //item actions end//

  //notes actions start//
  static async getNotes() {
    const res = await axios.get(urlNotes);
    const data = await res.data;
    return data;
  }

  static createNote(title, details, bgColor, txtColor) {
    return axios.post(urlNotes, {
      title,
      details,
      bgColor,
      txtColor,
    });
  }

  static udpateNote(id, title, details, bgColor, txtColor) {
    return axios.put(`${urlNotes}${id}`, {
      title,
      details,
      bgColor,
      txtColor,
    });
  }

  static deleteNote(noteId) {
    return axios.delete(`${urlNotes}${noteId}/delete`);
  }
}

export default ReqService;
