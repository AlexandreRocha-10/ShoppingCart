const saveCartItems = (e) => {
  localStorage.setItem('cartItems', JSON.stringify(e));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
