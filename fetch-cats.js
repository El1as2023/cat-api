
let catArray = new Array();

function start(){
    const btnGetCatInfo = document.getElementById('btn_get_cat_info');
    btnGetCatInfo.onclick = handleButtonClick;
    loadCats();
}

function loadCats(){
    const catList = document.getElementById('cat_list');

    let newOption;

    fetch('https://api.thecatapi.com/v1/breeds?api_key=live_6whZ7le96nBcub3ZtRMo7UcPJTMtPKmGUg7UBjyU7S1zrClpyIrpMR0JXmR29jDp')
    .then((response) => response.json())
    .then((data) => {
        data.forEach((cat) => {
            newOption = document.createElement('option');
            newOption.value = cat.name;
            newOption.text = cat.name;

            catList.appendChild(newOption);
            catArray.push(cat);
        });
    })
}

function handleButtonClick(){
    const catList = document.getElementById('cat_list');

    const index = catList.selectedIndex;

    const outputSpan = document.getElementById('output');

    const cat = catArray[index];

    const indexOfLastSlash = cat.wikipedia_url.lastIndexOf('/');

    let wikiSearchTerm = cat.wikipedia_url.slice(indexOfLastSlash + 1);


    let output = `<h2>${cat.name}</h2>`;
    output += `<img src ='${cat.image.url}'><br>`;
    output += `<h3>Description</h3><p>${cat.description}</p>`
    output += `<br>Click to learn about <a href='${cat.wikipedia_url}'>${cat.name}</a>`;

    outputSpan.innerHTML = output;

    showTotalPageViews(wikiSearchTerm, outputSpan);

}

function showTotalPageViews(searchTerm, outputSpan){

    let totalPageViews = 0;
    fetch(`https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/${searchTerm}/daily/20220901/20221001`)
    .then((response)=> response.json())
    .then((data) => {
        const dataArray = data.items;

        dataArray.forEach((dayData)=>{
            totalPageViews += parseInt(dayData.views);
        });

        outputSpan.innerHTML += '<br>Total page views 9/1/22 - 10/1/22: &nbsp;&nbsp;'
        + totalPageViews +'<br>';

    });
}

window.onload = start;