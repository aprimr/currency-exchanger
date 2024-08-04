let dropdowns = document.querySelectorAll(".select-list select");
const from = document.querySelector(".from select");
const to = document.querySelector(".to select");
let button = document.querySelector("form button");

for(let i=0 ; i<dropdowns.length ; i++){
    for(let code in countryList){
        let selected;
        if(i == 0){
            selected = code == "USD" ? "selected" : "";
        }
        else if(i == 1){
            selected = code == "NPR" ? "selected" : "";
        }
        let option = `<option value="${code}" ${selected}>${code}</option>`;
        dropdowns[i].insertAdjacentHTML("beforeend",option);
    }
    dropdowns[i].addEventListener('change' , e=> {
        loadFlag(e.target);
    })
}

function loadFlag(element){
    for(code in countryList){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector('img');
            imgTag.src = `https://flagsapi.com/${countryList[code]}/flat/64.png`
        }
    }

}

window.addEventListener('load' , e=>{
    getExchangeRate();
});

button.addEventListener('click' , e=>{
    e.preventDefault();
    getExchangeRate();
});

const exchangeIcon = document.querySelector(".arrow i");
exchangeIcon.addEventListener("click", ()=>{
    let temp = from.value;
    from.value =to.value;
    to.value = temp;
    loadFlag(from);
    loadFlag(to);
    getExchangeRate();
})

function getExchangeRate(){
    let amount = document.querySelector('form input');
    let amountVal = amount.value;
    const exchangeRateText = document.querySelector(".msg");

    if(amountVal == "" || amountVal=="0"){
        amount.value="1";
        amountVal=1;
    }

    exchangeRateText.innerText = "Getting data...";
    let url= `https://v6.exchangerate-api.com/v6/c9207baa28f95620a3071656/latest/${from.value}`;
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRates = result.conversion_rates[to.value];
        let totalExchangeRate = (exchangeRates * amountVal).toFixed(2);
        exchangeRateText.innerHTML = `${amountVal} ${from.value}<i class="fa-solid fa-arrow-right-long"></i> ${totalExchangeRate} ${to.value}`;
    });
}
