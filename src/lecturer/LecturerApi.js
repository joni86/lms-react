import axios from "axios";
import { pick } from "lodash/object";

/* export async function getLecturers() {
  const response = await axios.get("/api/lecturers");
  return response.data;
} 

export async function getLecturerById(id) {
  const response = await axios.get(`/api/lecturers/${id}`);
  return response.data;
}

export async function createLecturer(lecturer) {
  const response = await axios.post("/api/lecturers/createlecturer", lecturer);
  return response.data;
}

export async function updateLecturer(id, lecturer) {
  const data = pick(lecturer, ["name", "staffNumber", "email", "bibliography"]);
  const response = await axios.put(`/api/lecturers/${id}`, data);
  return response.data;
}

export async function deleteLecturer(id) {
  const response = await axios.delete(`/api/lecturers/${id}`);
  return response.data;
}
*/

export function getLecturers() {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/lecturers")
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.data);
        } else {
          reject(response.response);
        }
      })
      .catch(reject);
  });
}

export function getLecturerById(id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/lecturers/${id}`)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.data);
        } else {
          reject(response.response);
        }
      })
      .catch(reject);
  });
}

export function createLecturer(lecturer) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/lecturers/createlecturer", lecturer)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.data);
        } else {
          reject(response.response);
        }
      })
      .catch(reject);
  });
}

export function updateLecturer(id, lecturer) {
  const data = pick(lecturer, ["name", "staffNumber", "email", "bibliography"]);
  return new Promise((resolve, reject) => {
    axios
      .put(`/api/lecturers/${id}`, data)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.data);
        } else {
          reject(response.response);
        }
      })
      .catch(reject);
  });
}

export function deleteLecturer(id) {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/api/lecturers/${id}`)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.data);
        } else {
          reject(response.response);
        }
      })
      .catch(reject);
  });
}
