import axios from "axios";
import { pick } from "lodash/object";

/* export async function getCourses() {
  const response = await axios.get("/api/courses");
  return response.data;
}

export async function getCourseById(id) {
  const response = await axios.get(`/api/courses/${id}`);
  return response.data;
}

export async function createCourse(course) {
  const response = await axios.post("/api/courses/createcourse", course);
  return response.data;
}

export async function updateCourse(id, course) {
  const data = pick(course, [
    "title",
    "fee",
    "language",
    "maxStudent",
    "description"
  ]);
  const response = await axios.put(`/api/courses/${id}`, data);
  return response.data;
}

export async function deleteCourse(id) {
  const response = await axios.delete(`/api/courses/${id}`);
  return response.data;
} */
export function getCourses() {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/courses")
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

export function getCourseById(id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/courses/${id}`)
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

export function createCourse(course) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/courses/createcourse", course)
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

export function updateCourse(id, course) {
  const data = pick(course, [
    "title",
    "fee",
    "language",
    "maxStudent",
    "description"
  ]);
  return new Promise((resolve, reject) => {
    axios
      .put(`/api/courses/${id}`, data)
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

export function deleteCourse(id) {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/api/courses/${id}`)
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
