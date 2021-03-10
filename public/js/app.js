console.log("to check git");
const weather = document.querySelector('form');
const search = document.querySelector('input');
const para1 = document.getElementById("para1");
const para2 = document.getElementById("para2");
const img = document.getElementById("img");

weather.addEventListener('submit', (event) => {
    event.preventDefault();
    const area = search.value;
    para1.textContent = "Loading...";
    para2.textContent = "";
    fetch('http://localhost:3000/weather?address=' +area).then((response) => {
        response.json().then((data) => {
            if (data.Error) {
                para1.textContent = data.Error;
            } else {
                para1.textContent = `Data for ${data.address} is :`;
                para2 .textContent = data.Data;
                img.src = data.img
            }

        })
    })
})