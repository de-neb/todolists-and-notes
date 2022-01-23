import axios from "axios";

const baseUrlList = (uid) => `api/${uid}/todolists/`;
const baseUrlNotes = (uid) => `api/${uid}/notes/`;
const server = "api/users/";

class ReqService {
  //user actions start//
  static loginPost(username, password) {
    return axios.post(`${server}login`, { username, password });
  }

  static signupPost(username, password) {
    return axios.post(`${server}signup`, { username, password });
  }

  static logoutPost() {
    return axios.post(`${server}logout`);
  }
  //user actions end//

  //list actions start//

  //get List
  static async getList(uid) {
    const res = await axios.get(baseUrlList(uid));
    const data = await res.data;
    return data;
  }

  //create List
  static async createList(uid, listName) {
    return axios.post(baseUrlList(uid), {
      name: listName,
    });
  }

  //delete list
  static async deleteList(uid, listId, prevListId) {
    const res = await axios.delete(`${baseUrlList(uid)}${listId}/delete-list`, {
      data: { prevListId },
    });
    const data = await res.data;
    return data;
  }

  //update active list
  static async updateActiveList(uid, listId) {
    return axios.put(`${baseUrlList(uid)}${listId}/update-active-list`);
  }

  //list actions end//

  //item actions start//
  //get item
  static async getItems(uid, listId) {
    const res = await axios.get(`${baseUrlList(uid)}${listId}`);
    const data = await res.data;
    return data;
  }

  //add item
  static addItem(uid, listId, itemTitle) {
    return axios.post(`${baseUrlList(uid)}${listId}`, {
      itemTitle,
    });
  }

  //delete item
  static deleteItem(uid, listId, itemId) {
    return axios.patch(`${baseUrlList(uid)}${listId}/delete-item`, { itemId });
  }

  //delete all items
  static deleteAllItems(uid, listId) {
    return axios.patch(`${baseUrlList(uid)}${listId}/delete-items`);
  }

  //update items arr
  static updateItems(uid, listId, items) {
    return axios.patch(`${baseUrlList(uid)}${listId}/update-items`, { items });
  }

  //item actions end//

  //notes actions start//
  static async getNotes(uid) {
    const res = await axios.get(baseUrlNotes(uid));
    const data = await res.data;
    return data;
  }

  static createNote(uid, title, details, bgColor, txtColor) {
    return axios.post(baseUrlNotes(uid), {
      title,
      details,
      bgColor,
      txtColor,
    });
  }

  static udpateNote(uid, id, title, details, bgColor, txtColor) {
    return axios.put(`${baseUrlNotes(uid)}${id}`, {
      title,
      details,
      bgColor,
      txtColor,
    });
  }

  static deleteNote(uid, noteId) {
    return axios.delete(`${baseUrlNotes(uid)}${noteId}/delete`);
  }
}

export default ReqService;
