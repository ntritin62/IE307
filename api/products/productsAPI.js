import axios from 'axios';
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

function extractBrandName(productName) {
  const words = productName.split(' ');

  return words[0];
}

export const getProductById = async (id) => {
  const productId = id;

  try {
    const response = await axios.get(`${apiUrl}/api/v1/laptops/${productId}`);

    const brand = extractBrandName(response.data.laptop.name);

    const response_2 = await axios.get(`${apiUrl}/api/v1/laptops`);

    return {
      laptop: response.data.laptop,
      similarItems: response_2.data.laptops
        .filter((product) => product.name.startsWith(brand))
        .filter((product) => product.name !== response.data.laptop.name)
        .slice(0, 5),
    };
  } catch (err) {
    console.log(err);
  }
};
