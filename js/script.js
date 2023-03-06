
const dataLoad = async (dataLimit) => {
  const url = 'https://openapi.programming-hero.com/api/ai/tools'
  const res = await fetch(url)
  const data = await res.json()
  displayData(data.data.tools, dataLimit)
}
const sortByDate = () =>{
  const url = 'https://openapi.programming-hero.com/api/ai/tools'

  fetch(url)
  .then(res => res.json())
  .then(data => {
    data.data.tools.sort((a,b) => new Date(a.published_in) - new Date(b.published_in));

    displayData(data?.data?.tools)
    document.getElementById('show-all').classList.add('d-none')

  })
}
 
const displayData = (data, dataLimit) => {
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerText = '';
  // console.log(data)
  let toolsInfo = data;
  // functionality added for load more button
  const showAll = document.getElementById('show-all')
  if (dataLimit && toolsInfo.length > 10) {
    toolsInfo = toolsInfo.slice(0, 6)
 
    showAll.classList.remove('d-none')
  } else {
    showAll.classList.add('d-none')
  }
 
  // Display data with foreach loop
  toolsInfo.forEach((tool) => {
    const dataFeature = tool.features
    const newDiv = document.createElement('div')
    newDiv.classList.add('col')
    newDiv.innerHTML = `
            <div class="card h-100">
                <img src="${tool.image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">Features</h5>
                  <ol class="card-text">
                    ${dataFeature.map(a=> (`<li>${a}</li>`)).join("")}
                  </ol>
 
                </div>
                <hr class="hr-mix mx-auto">
                <div class="d-flex justify-content-between align-items-center px-4">
                    <div class="">
                        <h3 class="">${tool.name}</h3>
                        <div class=" fs-5 py-4">
                            <i class="fa-regular fa-calendar-days"></i>
                        <span class="fw-bold px-2">${tool.published_in}</span>
                        </div>
                      </div>
 
                       <button class="cta-button border-danger  rounded-pill" >
                       <i class="fa-sharp fa-solid fa-arrow-right bg-light text-danger p-2 rounded rounded-circle bgmuted" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></button>
 
                </div>
            </div>
        `
 
    const btn = newDiv.querySelector('.cta-button')
    btn.onclick = () => dataModalShow(tool.id, tool.features)
 
    cardContainer.appendChild(newDiv)
  })
  loadingSpinner(false)
}
 
document.getElementById('show-more-btn').addEventListener('click', function () {
  dataLoad()
  loadingSpinner(true)
})
 
const loadingSpinner = (isLoad) => {
  const spinnerSection = document.getElementById('spinner')
  if (isLoad) {
    spinnerSection.classList.remove('d-none')
  } else {
    spinnerSection.classList.add('d-none')
  }
}
const dataIdFetch = async (id) =>{
  const idUrl = `https://openapi.programming-hero.com/api/ai/tool/${id}`
  const res = await fetch(idUrl);
  const data = await res.json();
  dataModalShowDetails(data)
};
 
const dataModalShow = (data, feature) => {
  dataIdFetch(data)
  //   // Modal Features
const modalFeatueDetails = document.getElementById('modal-feature-details');
modalFeatueDetails.innerHTML = `
  ${feature.map(a=> (`<li>${a}</li>`)).join("")}
`;  
}

  const dataModalShowDetails = details =>{
    // Modal Title
  const modalTitle = document.getElementById('modal-body-desc');
  modalTitle.innerHTML = `
  <p>${details.data.description}</p>
  `;

  // Modal Pricing
  const modalPriceBasic = document.getElementById('price-basic')
  modalPriceBasic.innerHTML = `
            <p>${details.data.pricing[0].price} </br> ${details.data.pricing[0].plan}</p>
  `;
  const modalPricePro = document.getElementById('price-pro');
  modalPricePro.innerHTML = `
  <p>${details.data.pricing[1].price ? details.data.pricing[1].price : 'Free Cost'} </br> ${details.data.pricing[1].plan ? details.data.pricing[1].plan : 'Free Cost'}</p>
`;
  const modalPriceEnterprise = document.getElementById('price-enterprise')
  modalPriceEnterprise.innerHTML = `
  <p>${details.data.pricing[2].price} </br> ${details.data.pricing[2].plan}</p>
`;

  // Modal Integretions
  const integrations = details.data.integrations
  const modalIntegrations = document.getElementById('integrations');
  modalIntegrations.innerHTML = `
  ${integrations.map(a=> (`<li>${a?a:'no data'}</li>`)).join("")}
`;

    // MODAL IMAGE SECTION ADD HERE]
    const modalImageAccuracy = document.getElementById('modal-accuracy');
    modalImageAccuracy.innerText = `${details.data.accuracy.score * 100 ===0 ?  "" :details.data.accuracy.score * 100 + "% Accuracy" }`
    const modalDetailsImage = document.getElementById('modal-detail-image');
    modalDetailsImage.setAttribute('src', `${details.data.image_link[0]}`)
console.log(details.data.input_output_examples[0].input);
    const modalImageHeading = document.getElementById('modal-image-title');
    modalImageHeading.innerText = `${details.data.input_output_examples[0].input}`
    const modalImageDesc = document.getElementById('modal-image-desc');
    modalImageDesc.innerText = `${details.data.input_output_examples[0].output}`
    console.log(details.data);
  }
 
dataLoad(6)