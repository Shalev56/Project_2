export const declareEvents = (doApi, createCountriesList) => {
  const searchBtn = document.querySelector("#search_btn");
  const idInput = document.querySelector("#id_input");
  const idSelect = document.querySelector("#id_select");


  // Event listener for dropdown selection change
  idSelect.addEventListener("change", () => {
    createCountriesList();
  });

  // Event listener for pressing Enter key in the input
  idInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      doApi(idInput.value);
    }
  });

  // Event listener for search button click
  searchBtn.addEventListener("click", () => {
    doApi(idInput.value);
  });
};
