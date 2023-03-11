const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('3.1 Verifique se ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado', async () => {
    await saveCartItems('MLB1615760527');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('3.2 Verifique se ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro a chave cartItems e o segundo sendo o valor passado como argumento para saveCartItems.', async () => {
    await saveCartItems('MLB1615760527');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', 'MLB1615760527');
  });
});
