const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  // step-1 declare the parent div to append to in a variable
  const phoneContainer = document.getElementById("phone-container");

  //   clear phone container cards before adding new cards
  phoneContainer.textContent = " ";

  //   display show all button if there are more than 12 phones
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 9 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  //  display only first 9 phones if not show all
  if (!isShowAll) {
    phones = phones.slice(0, 9);
  }

  phones.forEach((phone) => {
    // step-2 create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
    // step-3 set inner html
    phoneCard.innerHTML = `
    <figure> <img src="${phone.image}" alt="Shoes"/> </figure>
    <div class="card-body flex flex-col items-center">
        <h2 class="card-title">${phone.phone_name}</h2>
        <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
        </div>
    </div>
    `;
    // step-4 appendChild to parent div
    phoneContainer.appendChild(phoneCard);
  });
  //   hide loading spinner
  toggleLoadingSpinner(false);
};

// handle search button
const handleSearch = (isShowAll) => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
  toggleLoadingSpinner(true);
};

// handle loading spinner
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// handle show all
const handleShowAll = () => {
  handleSearch(true);
};

// handle show detail
const handleShowDetail = async (id) => {
  //   load single phone data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
  console.log(phone);
};

const showPhoneDetails = (phone) => {
  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `
  <h3 class="font-bold text-3xl">${phone?.name}</h3>
  <img src="${phone?.image}" alt="">
  <div>
  <p><span class="font-bold">Brand: </span>${phone?.brand}</p>
  <p><span class="font-bold">Storage: </span>${phone?.mainFeatures?.storage}</p>
  <p><span class="font-bold">Display Size: </span>${
    phone?.mainFeatures?.displaySize
  }</p>
  <p><span class="font-bold">Chipset: </span>${phone?.mainFeatures?.chipSet}</p>
  <p><span class="font-bold">Memory: </span>${phone?.mainFeatures?.memory}</p>
  <p><span class="font-bold">GPS: </span>${
    phone?.others?.GPS ? phone.others.GPS : "No GPS Available"
  }</p>
  <p><span class="font-bold">Release Date: </span>${phone?.releaseDate}</p>
  </div>
  `;
  // show the modal
  show_details_modal.showModal();
};
