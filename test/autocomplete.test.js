const waitFor = (selector) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (document.querySelector(selector)) {
        clearInterval(interval);
        clearTimeout(timeout);
        resolve();

      }
    }, 30);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      reject();
    }, 6000)
  })
}

beforeEach(() => {
  document.querySelector('#target').innerHTML = '';
  createAutoComplete({
    root: document.querySelector('#target'),
    //fake data
    fetchData() {
      return [
        { Title: 'Avengers'},
        { Title: 'Not Avengers' },
        { Title: 'Some other movie' }
      ]
    },
    renderOption(movie) {
      return movie.Title;
    }
  });
})

it('Dropdown starts closed', () => {


  const dropDown = document.querySelector('.dropdown');
  
  expect(dropDown.className).not.to.include('is-active');

});



it('After searching, dropdown opens up', async () => {
  const input = document.querySelector('input');
  input.value = 'avengers';
  input.dispatchEvent(new Event('input'));
  
  await waitFor('.dropdown-item');
  
  const dropDown = document.querySelector('.dropdown');

  expect(dropDown.className).to.include('is-active');

});

it('After searching, displays some results', async () => {
  const input = document.querySelector('input');
  input.value = 'avengers';
  input.dispatchEvent(new Event('input'));
  
  await waitFor('.dropdown-item');

  const items = document.querySelectorAll('.dropdown-item');
  expect(items).to.have.lengthOf(3);
});