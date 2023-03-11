const fetchProducts = async (computador) => {
  if (!computador || computador !== 'computador') { throw new Error('You must provide an url'); }
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${computador}`;
  const resp = await fetch(url);
  const data = await resp.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
