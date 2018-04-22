export function formatListing(values) {
  let formData = new FormData();

  for (const key in values) {
    if (key === 'product_image') {
      formData.append(key, values[key][0]);
    } else {
      formData.append(key, values[key]);
    }
  }
  return formData;
}
