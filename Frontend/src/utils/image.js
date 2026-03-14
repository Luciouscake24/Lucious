export const optimizeImage = (url) => {
  if (!url) return "";

  return url.replace(
    "/upload/",
    "/upload/w_400,f_auto,q_auto/"
  );
};