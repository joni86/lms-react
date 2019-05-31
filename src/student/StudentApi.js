import axios from "axios";
import { pick } from "lodash/object";

export function getStudents(pageNumber = 1) {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/students?pageNumber=${pageNumber}`)
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

export function getStudentById(id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/students/${id}`)
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

export function createStudent(student) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/students/createstudent", student)
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

export function updateStudent(id, student) {
  const data = pick(student, [
    "firstName",
    "lastName",
    "gender",
    "dateOfBirth",
    "email",
    "credit"
  ]);
  return new Promise((resolve, reject) => {
    axios
      .put(`/api/students/${id}`, data)
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

export function deleteStudent(id) {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/api/students/${id}`)
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
