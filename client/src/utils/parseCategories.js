export function parseCategories(arr) {
  let categories = [];

  arr.forEach(string => {
    let tempCategories = string.split(' / ');
    for (let category of tempCategories) {
      if (categories.indexOf(category) === -1) {
        categories.push(category);
      }
    }
  });

  return categories;
}
