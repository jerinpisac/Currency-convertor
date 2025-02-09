const API_KEY = "0d73b4340ae7afcd476cfde3c1c94fc2";
let input = document.querySelector("input");
let button = document.querySelector("button");
let fromselect = document.querySelector(".from");
let toselect = document.querySelector(".to");
let img1 = document.querySelector(".fromdrop img");
let img2 = document.querySelector(".todrop img");


for(country in countryList)
{
    let option = document.createElement("option");
    option.innerText = country;
    option.value = country;
    fromselect.append(option);
    if(country === "EUR")
    {
        img1.src = `https://flagsapi.com/${countryList[country]}/shiny/64.png`;
        option.selected = "selected";
    }
}

for(country in countryList)
{
    let option = document.createElement("option");
    option.innerText = country;
    option.value = country;
    toselect.append(option);
    if(country === "USD")
    {
        img2.src = `https://flagsapi.com/${countryList[country]}/shiny/64.png`;
        option.selected = "selected";
    }
}

fromselect.addEventListener("change", () => {
    let from = countryList[`${fromselect.value}`];
    img1.src = `https://flagsapi.com/${from}/shiny/64.png`;
})

toselect.addEventListener("change", () => {
    let to = countryList[`${toselect.value}`];
    img2.src = `https://flagsapi.com/${to}/shiny/64.png`;
})

button.addEventListener("click", async () => {
    let amount = input.value;
    if(amount <= 0){
        alert("You can't enter a number less than or equal to 0");
        input.value = 1;
        return;
    }
    let from = fromselect.value.toLowerCase();
    let to = toselect.value.toLowerCase();
    let response = await fetch(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`
    );
    let data = response.json();
    data.then((res) => {
        let rate = res[`${from}`];
        let finalrate = rate[`${to}`];
        let finalVal = amount * finalrate;
        alert(`${amount} ${from.toUpperCase()} = ${finalVal} ${to.toUpperCase()}`);
    })
})
