require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('1.1 Verifique se fetchProducts é uma função.', () => {
    const actual = typeof fetchProducts;
    const expected = 'function';
    expect(actual).toEqual(expected);
  });

  it('1.2 Verifique se fetchProducts com o argumento computador é chamada', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('1.3 Verifique se a função fetchProducts foi chamada com o endpoint correto', async () => {
    await fetchProducts('computador');
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  it('1.4 Verifique se o retorno da função fetchProducts com o argumento computador é uma estrutura de dados igual ao objeto computadorSearch.', async () => {
    const response = await fetchProducts('computador');
    expect(response).toEqual(computadorSearch);
  });

  it('1.5 Verifique se ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url.', () => {
    const expected = 'You must provide an url';
    expect(fetchProducts()).rejects.toThrow(expected);
  });
});