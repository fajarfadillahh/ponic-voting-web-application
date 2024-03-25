import axios from "axios";

async function fetcher(url, method, data = null, token = null) {
  const options = {
    url: `https://api.ponic.site/api/v1${url}`,
    method,
  };

  if (data) {
    Object.assign(options, { data });
  }

  if (token) {
    Object.assign(options, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return axios(options);
}

export default fetcher;
