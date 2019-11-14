const API_URL = 'https://apis.is/company?name=';

/**
 * Leit að fyrirtækjum á Íslandi gegnum apis.is
 */
const program = (() => {
  let companies = [];

  function displayCompany(comList){
    if(comList.length === 0){
      displayError('Ekkert fyrirtæki fannst fyrir leitarstreng');
      return;
    }

    companies.forEach((result) =>{
      const resultElement = document.createElement('div');
      const listElement = document.createElement('dl');
      const nameTerm = document.createElement('dt');
      const nameDefition = document.createElement('dd');
      const snTerm = document.createElement('dt');
      const snDefinition = document.createElement('dd');

      resultElement.classList.add('company');

      nameTerm.innerHTML = 'Nafn';
      nameDefition.innerHTML = result.name;
      listElement.appendChild(nameTerm);
      listElement.appendChild(nameDefition);

      snTerm.innerHTML = 'Kennitala';
      snDefinition.innerHTML = result.sn;
      listElement.appendChild(snTerm);
      listElement.appendChild(snDefinition);

      if (result.active) {
        resultElement.classList.add('company--active');
        const addressTerm = document.createElement('dt');
        const addressDefinition = document.createElement('dd');
        addressTerm.innerHTML = 'Heimilsfang';
        addressDefinition.innerHTML = result.address;
        listElement.appendChild(addressTerm);
        listElement.appendChild(addressDefinition);
      } else resultElement.classList.add('company--inactive');

      resultElement.appendChild(listElement);
      results.appendChild(resultElement);
    });
  }

  function displayError(error) {
    const container = document.querySelector('.results');
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(document.createTextNode(error));
  }

  function load(){
    const loade = document.createElement('div');
    const m = document.createElement('img');
    loade.setAttribute('class', 'loading');
    m.setAttribute('src', 'loading.gif');
    loade.appendChild(m);

    const t = document.createElement('p');
    t.appendChild(document.createTextNode('Leita að fyrirtækjum...'));
    loade.appendChild(t);
    const container = document.querySelector('.results');
    container.appendChild(loade);
  }

  function fetchData(com){
    fetch(`${API_URL}${com}`)
      .then(
        load()
      )
      .then((response) => {
          return response.json();
      })
      .then((data) => {

        const container = companies.querySelector('.results');
        container.removeChild(container.firstChild);
        displayCompany(data.results);
      })
      .catch((error) => {
        displayError('Lén verður að vera strengur');
      })
  }

  function onSubmit(e){
    e.preventDefault();
    const input = e.target.querySelector('input');
    const container = companies.querySelector('.results');
    while (container.firstChild){
      container.removeChild(container.firstChild);
    }
    fetchData(input.value);
  }

  function init(_companies) {
    companies = _companies;

    const form = companies.querySelector('form');
    form.addEventListener('submit', onSubmit);
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', function () {
  const companies = documet.querySelector('.companies');
  program.init(companies);
});