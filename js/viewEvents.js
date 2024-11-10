export const declareEvents = (doApi, createCountriesList) => {
  const searchBtn = document.querySelector("#search_btn");
  const idInput = document.querySelector("#id_input");
  const idSelect = document.querySelector("#id_select");


  idSelect.addEventListener("change", () => {
    createCountriesList();
  });

  idInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      doApi(idInput.value);
    }
  });

  searchBtn.addEventListener("click", () => {
    doApi(idInput.value);
  });
};
