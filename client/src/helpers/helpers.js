
/**
 * @description provide pathname as parameter and get path array splitted by slash
 * @param {*} pathname 
 * @returns path array
 */
export const pathToBreadcrumbURL = (pathname) => {
  const pathArray = pathname.split("/");
  return pathArray;
};
