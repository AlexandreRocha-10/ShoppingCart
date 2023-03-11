/* eslint-disable max-len */
// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições!

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

const items = document.querySelector('.items');
const cart = document.querySelector('.cart__items');
const emptyBtn = document.querySelector('.empty-cart');
let storaged = [];

const fetchItem = async (id) => {
  if (!id || id === undefined) throw new Error('You must provide an url');
  const url = `https://api.mercadolibre.com/items/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}

const fetchProducts = async (computador) => {
  if (!computador || computador !== 'computador') { throw new Error('You must provide an url'); }
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${computador}`;
  const resp = await fetch(url);
  const data = await resp.json();
  console.log(data);
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

const getSavedCartItems = () => JSON.parse(localStorage.getItem('cartItems'));

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}

const saveCartItems = (e) => {
  localStorage.setItem('cartItems', JSON.stringify(e));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section
    .appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
// const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */

const storageProducts = () => {
  const storeditems = document.querySelectorAll('.cart__item');
  storeditems.forEach((item) => {
    storaged.push(item.innerText);
  });
  saveCartItems(storaged);
  storaged = [];
};

const calculateItemsPrices = () => {
  let sum = 0;
  const storeditems = document.querySelectorAll('.cart__item');
  storeditems.forEach((item) => {
    sum += Number(item.id);
  });
  sum = Math.floor(sum * 100) / 100;
  const totalPrice = document.querySelector('.total-price');
  totalPrice.innerText = `Subtotal: $${sum}`;
};

const cartItemClickListener = (e) => {
  e.target.remove();
  storageProducts();
  calculateItemsPrices();
};

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.id = `${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const createProductList = async () => {
  const response = await fetchProducts('computador');
  const { results } = response;
  results.forEach((product) => {
    items.appendChild(createProductItemElement(product));
  });
};

const selectItem = async () => {
  items.addEventListener('click', async (e) => {
    const item = e.target.parentNode.firstChild.innerText;
    cart.appendChild(createCartItemElement(await fetchItem(item)));
    storageProducts();
    calculateItemsPrices();
  });
};

const clearList = () => {
  emptyBtn.addEventListener('click', () => {
    cart.innerHTML = '';
    storageProducts();
    calculateItemsPrices();
  });
};

const storageCart = () => {
  const storedCart = getSavedCartItems();
  storedCart.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'cart__item';
    li.innerText = item;
    cart.appendChild(li);
    li.addEventListener('click', cartItemClickListener);
  });
};

const loadingPage = () => {
  const loading = document.querySelector('.loading');
  setTimeout(() => {
    loading.remove();
  }, createProductList);
};

window.onload = () => {
  loadingPage();
  createProductList();
  selectItem();
  clearList();
  calculateItemsPrices();
  if (getSavedCartItems()) {
    storageCart();
  }
};
