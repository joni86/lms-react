export function getApiUrl() {
  // return API_URL || process.env.API_URL;
  // https://lms1210.azurewebsites.net
  // https://lms-syd2018.azurewebsites.net
  // http://localhost:51907
  return API_URL || process.env.API_URL;
}

export function redirect(path) {
  const hostUrl = HOST_URL || process.env.HOST_URL;
  window.location.href = `${hostUrl}#${path}`;
}

export function getValidationErrors(err) {
  const validationErrors = err.inner.reduce((x, y) => {
    x[y.path] = y.message;
    return x;
  }, {});
  return validationErrors;
}
