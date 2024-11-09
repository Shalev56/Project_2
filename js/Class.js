export default class CountryClass {
  constructor(parentSelector, country) {
    this.parent = parentSelector;
    this.flag = country.flags.png; // Use PNG format for the flag
    this.name = country.name.common; // Common name of the country
    this.fullName = country.name.official; // Official name of the country
    this.capital = country.capital ? country.capital[0] : "N/A"; // Capital
    this.population = country.population.toLocaleString(); // Format population with commas
    this.borders = country.borders || []; // Array of border countries
    this.languages = Object.values(country.languages || {}).join(); // Languages spoken
  }
  
  render() {
    const div = document.createElement("div");
    div.className = "col-md-4 p-2";
    document.querySelector(this.parent).append(div);

    const borderLinks = this.borders.map(border => 
      `<a href="Single.html?name=${encodeURIComponent(border)}" class="text-light">${border}</a>`
    ).join();

    div.innerHTML = `
      <article class="p-2 shadow overflow-hidden h-100 article">
        <img src="${this.flag}" alt="${this.name}" class="w-25 float-end ms-2">
        <h2>${this.name} (${this.fullName})</h2>
        <div><strong>Capital:</strong> <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.capital)}" target="_blank">${this.capital}</a></div>
        <div><strong>Population:</strong> ${this.population}</div>
        <div><strong>Languages:</strong> ${this.languages || 'N/A'}</div>
        <div><strong>Borders:</strong> ${borderLinks || 'None'}</div>
        <div><strong>Map:</strong> <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.name)}" target="_blank" class="btn btn-info">View on Google Maps</a></div>
        <a href="Single.html?name=${encodeURIComponent(this.name)}" class="btn btn-warning">More info</a>
      </article>
    `;
  }
}