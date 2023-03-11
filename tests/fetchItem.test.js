require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('2.1 Verifique se fetchItem é uma função.', () => {
    const actual = typeof fetchItem;
    const expected = 'function';
    expect(actual).toBe(expected);
  });

  it('2.2 Verifique se fetchItem com o argumento MLB1615760527 é chamada', async () => {
    await fetchItem('MLB1615760527');
    expect(global.fetch).toHaveBeenCalled();
  });
  
  it('2.3 Verifique se a função fetchItem foi chamada com o endpoint correto', async () => {
    await fetchItem('MLB1615760527');
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(global.fetch).toHaveBeenCalledWith(endpoint);
  });

  it('2.4 Verifique se o retorno da função fetchItem com o argumento MLB1615760527 é uma estrutura de dados igual ao objeto item.', async () => {
    const response = await fetchItem('MLB1615760527');
    expect(response).toBe(item);
  });

  it('2.5 Verifique se ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url.', () => {
    const expected = 'You must provide an url';
    expect(fetchItem()).rejects.toThrow(expected);
  });
});
