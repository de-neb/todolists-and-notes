import axios from "axios";

const baseUrlList = (uid) => `api/todolists/user/${uid}/`;
const baseUrlNotes = (uid) => `api/notes/user/${uid}/`;
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
    const res = await axios.post(baseUrlList(uid), {
      name: listName,
    });
    const data = res.data;
    return data;
  }

  //delete list
  static async deleteList(uid, listId, prevListId) {
    const res = await axios.delete(`${baseUrlList(uid)}list/${listId}`, {
      data: { prevListId },
    });
    const data = await res.data;
    return data;
  }

  //update active list
  static async updateActiveList(uid, listId) {
    return axios.put(`${baseUrlList(uid)}list/${listId}`);
  }

  //list actions end//

  //item actions start//
  //get item
  static async getItems(uid, listId) {
    const res = await axios.get(`${baseUrlList(uid)}list/${listId}`);
    const data = await res.data;
    return data;
  }

  //add item
  static async addItem(uid, listId, itemTitle) {
    const res = await axios.post(`${baseUrlList(uid)}list/${listId}`, {
      itemTitle,
    });
    const data = await res.data;
    return data;
  }

  //delete item
  static async deleteItem(uid, listId, itemId) {
    const res = await axios.patch(
      `${baseUrlList(uid)}list/${listId}/delete-item`,
      {
        itemId,
      }
    );
    const data = await res.data;
    return data;
  }

  //delete all items
  static async deleteAllItems(uid, listId) {
    const res = await axios.patch(
      `${baseUrlList(uid)}list/${listId}/delete-items`
    );
    const data = await res.data;
    return data;
  }

  //update items arr
  static async updateItems(uid, listId, items) {
    const res = axios.patch(`${baseUrlList(uid)}list/${listId}/update-items`, {
      items,
    });
    const data = await res.data;
    return data;
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
