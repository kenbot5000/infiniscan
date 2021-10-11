const prefix = '/api';

export default function ({ $axios }) {
  $axios.onRequest((config) => {
    if (config.url.startsWith(prefix)) {
      config.url = config.url.replace(prefix, '');
    }

    return config;
  });

  $axios.setHeader('Content-Type', 'application/json');
};
