const apiUrl = 'https://restcountries.com/v3.1/all?fields=name,capital,population,borders,flags,cioc';

const allowedCountries = ["Israel", "United States", "France", "United Kingdom", "Thailand"];

async function fetchCountries() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const countries = await response.json();
        return countries; 
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

function filterAllowedCountries(countries) {
    return countries.filter(country => allowedCountries.includes(country.name.common));
}

function displayCountries(countriesToDisplay) {

    const row1 = document.getElementById('id_row1');
    row1.innerHTML = '';  

    if (countriesToDisplay.length === 0) {
        row1.innerHTML = '<p class="text-center">Country not found</p>';
        return;
    }

        const col1 = document.createElement('div');
        col1.innerHTML =`<h2>Home
        <a href="Single.html?name=Israel" class="btn btn-success" rel="noopener noreferrer">Israel</a>
        <a href="Single.html?name=United States" class="btn btn-secondary" rel="noopener noreferrer">United States</a>
        <a href="Single.html?name=France" class="btn btn-primary" rel="noopener noreferrer">France</a>
        <a href="Single.html?name=United Kingdom" class="btn btn-danger" rel="noopener noreferrer">United Kingdom</a>
        <a href="Single.html?name=Thailand" class="btn btn-info" rel="noopener noreferrer">Thailand</a>
        </h2>
            `;
        row1.appendChild(col1);



    const row = document.getElementById('id_row3');
    row.innerHTML = '';  

    if (countriesToDisplay.length === 0) {
        row.innerHTML = '<p class="text-center">Country not found</p>';
        return;
    }

    countriesToDisplay.forEach(country => {
        const col = document.createElement('div');
        col.className = 'col-md-4 p-2';
        col.innerHTML = `
            <article class="border border-light text-white p-2 shadow overflow-hidden"> 
                <h2>${country.name.common}</h2>
                <a href="Single.html?name=${country.name.common}" rel="noopener noreferrer">
                    <h2><img id="id_img" src="${country.flags.png}" height="180px" width="240px" alt="${country.name.common} flag"/></h2>
                </a>
            </article>
        `;
        row.appendChild(col);
    });
}

async function setupSearch(countries) {
    const searchInput = document.getElementById('id_input');
    const searchButton = document.getElementById('search_btn');

    searchButton.addEventListener('click', () => {
        const searchValue = searchInput.value.trim().toLowerCase();

        if (searchValue) {
            const filteredCountries = countries.filter(country => 
                country.name.common.toLowerCase().startsWith(searchValue)
            );
            displayCountries(filteredCountries);
        } else {
            displayCountries(countries); 
        }
    });
}

async function init() {
    const countries = await fetchCountries();

    const allowedCountriesList = filterAllowedCountries(countries);
    displayCountries(allowedCountriesList);

    setupSearch(countries);
}


init();
