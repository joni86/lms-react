import axios from "axios";

export function logout() {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/account/logout")
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.data);
        } else {
          reject(response.response.data);
        }
      })
      .catch(reject);
  });
}
