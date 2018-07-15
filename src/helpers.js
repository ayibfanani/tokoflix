import axios from 'axios';

const api_key = '5f65b6881e1a97de7270224a4edf09d1';

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

export function apiEndpoint(api, params = null) {
  params = params !== null
    ? Object.keys(params).map(key => key + '=' + params[key]).join('&') : '';

  return `https://api.themoviedb.org/3/${api}?language=en-US&api_key=${api_key}&${params}`;
}

export function getImage(path) {
  return `https://image.tmdb.org/t/p/w500/${path}`;
}

export function getGenres(vm) {
  let endpoint = `https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=${api_key}`;

  axios.get(endpoint).then(({ data }) => {
    vm.setState({
      genres: data.genres
    })
  }).catch(({ response }) => {
    console.log(response)
  });
}

export function purchase(vm, movie_id) {
  let endpoint = apiEndpoint(`movie/${movie_id}`);;
  let balance_amount = parseInt(vm.props.balance.amount)

  axios.get(endpoint).then(({ data }) => {
    let price_amount = parseInt(getPriceRate(data.vote_average));

    if (balance_amount < price_amount) {
      console.log('Your balance not enough to purchase this movie!')
    } else {
      vm.props.actions.purchase(data.id);
      vm.props.actions.setBalance(balance_amount - price_amount);
      vm.props.actions.setNotif({ type: 'success', response: `Successfully purchased: ${data.title}!` });
    }
  }).catch(({ response }) => {
    console.log(response)
  })
}