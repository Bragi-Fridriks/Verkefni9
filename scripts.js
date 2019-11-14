const API_URL = 'https://apis.is/company?name=';

/**
 * Leit að fyrirtækjum á Íslandi gegnum apis.is
 */
const program = (() => {
  let companies = [];

  function init(companies) {

  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  program.init(companies);
});
