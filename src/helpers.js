export function getParam(key) {
  let url = window.location.href;
  url = new URL(url);
  let value = url.searchParams.get(key);

  return value;
}

export function getPriceRate(rate) {
  let price = 0;

  if (8 < rate && rate <= 10) {
    price = 21250
  } else if (6 < rate && rate <= 8) {
    price = 16350
  } else if (3 < rate && rate <= 6) {
    price = 8250
  } else if (1 < rate && rate <= 3) {
    price = 3500
  }

  return price;
}

export function slugify(string) {
  let slug = "";
  let stringLower = string.toLowerCase();
  slug = stringLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e');
  slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a');
  slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o');
  slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u');
  slug = slug.replace(/đ/gi, 'd');
  slug = slug.replace(/\s*$/g, '');
  slug = slug.replace(/\s+/g, '-');

  return slug;
}