import DefaultImage from "../assets/defaultImage/defaultImage.png";

export const getItemImageUrl = (item) => {
  const defaultImageUrl = { DefaultImage };

  if (item?.attributes?.image?.data?.attributes?.formats?.medium?.url) {
    return `https://stylish-one-7f1f35e5b636.herokuapp.com${item.attributes.image.data.attributes.formats.medium.url}`;
  }

  return defaultImageUrl;
};
