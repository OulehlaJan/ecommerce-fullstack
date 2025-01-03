import DefaultImage from "../assets/defaultImage/defaultImage.png";

export const getItemImageUrl = (item) => {
  const defaultImageUrl = DefaultImage;

  return (
    item?.attributes?.image?.data?.attributes?.formats?.medium?.url ||
    defaultImageUrl
  );
};
