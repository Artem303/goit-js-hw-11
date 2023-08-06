import axios from 'axios';

export class PixabayAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '38606630-60b5de12fba7ddb52266a30c0';
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async getImages() {
    const searchParams = new URLSearchParams({
      q: this.searchQuery,
      key: this.#API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: 40,
    });

    const url = `${this.#BASE_URL}?${searchParams}`;
    try {
      const response = await axios.get(url);
      this.incrementPage();
      return response.data;
    } catch (e) {
      console.warn(`${e}`);
    }
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.query;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
