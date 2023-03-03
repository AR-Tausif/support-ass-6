const dataLoad = async (dataLimit)=>{
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    const res = await fetch(url);
    const data = await res.json();
    displayData(data, dataLimit)
}

const displayData = (data, dataLimit) =>{
    const cardContainer = document.getElementById('card-container');
    console.log(data);
    let toolsInfo = data.data.tools;
    // functionality added for load more button
    const showAll = document.getElementById("show-all");
      if(dataLimit && toolsInfo.length > 10){
          toolsInfo = toolsInfo.slice(0, 6);
  
          showAll.classList.remove('d-none')
      }else{
          showAll.classList.add('d-none')
      }

    // Display data with foreach loop
    toolsInfo.forEach(tool => {
        const dataFeature = tool.features;
        const newDiv = document.createElement('div');
        newDiv.classList.add('col');
        newDiv.innerHTML = `
            <div class="card h-100">
                <img src="${tool.image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${tool.name}</h5>
                  <ol class="card-text">
                    ${dataFeature.map((item) => {
                        return `<li>${item}</li>`;
                    })}
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

                       <button onclick="dataModalShow(${tool})">
                       <i class="fa-sharp fa-solid fa-arrow-right bg-light text-danger p-2 rounded rounded-circle bgmuted" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></button>

                </div>
            </div>
        `


        cardContainer.appendChild(newDiv);
    });
    loadingSpinner(false)
}

document.getElementById('show-more-btn').addEventListener('click', function(){
    dataLoad();
    loadingSpinner(true)
})


const loadingSpinner  = isLoad =>{
const spinnerSection = document.getElementById("spinner");
if(isLoad){
    spinnerSection.classList.remove('d-none')
}else{
    spinnerSection.classList.add('d-none')
}
}

const dataModalShow = data =>{
  // const modalTitle = document.getElementById('exampleModalLabel');
  // modalTitle.textContent = data.name;
  console.log(data);
}

dataLoad(6)