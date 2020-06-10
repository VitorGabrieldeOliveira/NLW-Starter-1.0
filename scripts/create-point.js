// Entity Data
function populateUFs() {
  const ufSelect = document.querySelector('select[name=uf]');

  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
    .then(response => response.json())
    .then(states => {
      for(const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}

populateUFs();

function getCities(event) {
  const citySelect = document.querySelector('select[name=city]');
  const stateInput = document.querySelector('input[name=state]');

  const ufValue = event.target.value;
  
  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios?orderBy=nome`;
  
  citySelect.innerHTML = '<option value="">Selecione a Cidade</option>';
  
  if (ufValue === 'empty') {
    citySelect.disabled = true;
    return;
  } 

  fetch(url)
    .then(response => response.json())
    .then(cities => {      
      for(const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      }

      citySelect.disabled = false;
    });
}

document
  .querySelector('select[name=uf]')
  .addEventListener('change', getCities);


// Collect Items
const itemsToCollect = document.querySelectorAll('.items-grid li');

for(const item of itemsToCollect) {
  item.addEventListener('click', handleSelectedItem);
}

const collectedItems = document.querySelector('input[name=items]');

let selectedItems = [];

function handleSelectedItem(event) {
  const itemLi = event.target;
  
  // Add or remove a class with javascript
  itemLi.classList.toggle('selected');

  const itemId = itemLi.dataset.id;

  const alreadySelected = selectedItems.findIndex(item => item === itemId);

  if (alreadySelected !== -1) {
    selectedItems.splice(alreadySelected, 1);
  } else {
    selectedItems.push(itemId);
  }

  collectedItems.value = selectedItems;
}