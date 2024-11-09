document.addEventListener('DOMContentLoaded', () => {
  const loadingDiv = document.getElementById('id_loading');
  const infoDiv = document.getElementById('id_info_div');

  const fetchCountryData = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,population,borders,flags,languages,cioc');
      const countries = await response.json();

      // Extracting the country name from the URL parameters
      const params = new URLSearchParams(window.location.search);
      const countryName = params.get('name'); // Get the country name from URL

      // Find the country matching the name from the URL
      const country = countries.find(c => c.name.common === countryName);

      if (!country) {
        throw new Error('Country not found');
      }

      // Populate the country details
      document.getElementById('id_img').src = country.flags.png; // Using PNG format for the flag
      document.getElementById('id_h1').textContent = country.name.common; // Access the common name
      document.getElementById('id_capital').textContent = country.capital ? country.capital[0] : 'N/A'; // Handle missing capital
      document.getElementById('id_population').textContent = country.population.toLocaleString(); // Format population with commas

      // Handle borders
      const bordersElement = document.getElementById('id_borders');
      if (Array.isArray(country.borders) && country.borders.length > 0) {
        const links = country.borders.map(border => {
          // Find the border country by its code (cioc)
          const borderCountry = countries.find(c => c.cioc === border);
          return borderCountry ? `<a href="Single.html?name=${borderCountry.name.common}" target="_blank" rel="noopener noreferrer">${borderCountry.name.common}</a>` : '';
        });
        bordersElement.innerHTML = links.join(', ');
      } else {
        bordersElement.textContent = 'None';
      }

      // Handle languages
      const languagesElement = document.getElementById('id_language');
      if (country.languages && Object.keys(country.languages).length > 0) {
        languagesElement.textContent = Object.values(country.languages).join(', ');
      } else {
        languagesElement.textContent = 'N/A';
      }

      // Set Google Maps link
      document.getElementById('id_map_link').href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(country.name.common)}`;

      // Hide loading and show country info
      loadingDiv.style.display = 'none';
      infoDiv.style.display = 'block';
    } 
    catch (error) {
      console.error('Error fetching country data:', error);
      loadingDiv.innerHTML = '<p class="text-danger">Error loading data</p>'; // Show error message
      infoDiv.style.display = 'none'; // Hide info if there's an error
    }
  };

  // Call the function to fetch data
  fetchCountryData();

  // Back button functionality
  document.getElementById('back_btn').addEventListener('click', () => {
    window.location.href = 'country.html'; // Redirect to your main country list page
  });
});