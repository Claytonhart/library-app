export function parseCategories(arr) {
  let categories = [];
  debugger;
  arr.forEach(string => {
    debugger;
    let tempCategories = string.split(' / ');
    for (let category of tempCategories) {
      debugger;
      if (categories.indexOf(category) === -1) {
        categories.push(category);
      }
    }
  });

  return categories;
}
