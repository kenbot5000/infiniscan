const prefix = '/api';

export default function ({ $axios }) {
  $axios.onRequest((config) => {
    if (config.url.startsWith(prefix)) {
      config.url = config.url.replace(prefix, process.env.API_URL);
    }

    return config;
  });
};
