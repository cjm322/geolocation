const Geolocation = async (options={ address: null }) => {
  if (options.address) {
    const axios = require('axios');
    const { address } = options;
    const GEOCODE_API_TOKEN = process.env.GEOCODE_API_TOKEN;
    const url = `https://geocode.xyz/?locate=${address}&json=1&auth=${GEOCODE_API_TOKEN}`;

    axios.interceptors.response.use(response => {
      if(response.data)
        return response.data;
      else
        return response
    });

    try {
      const { latt, longt } = await axios.get(url);
      return({ latt, longt });
    } catch(e) {
      throw new Error(e.message);
    }
  } else {
    throw new Error('You must provide an address as input');
  }
}

module.exports = Geolocation
