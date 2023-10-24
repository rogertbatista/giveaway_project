const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

let futureDate = new Date(2024, 0, 31, 23, 59, 0);

const year = futureDate.getFullYear();
const month = months[futureDate.getMonth()];
const day = futureDate.getDate();
const hour = futureDate.getHours();
const minute = futureDate.getMinutes();
const weekday = weekdays[futureDate.getDay()];

giveaway.textContent = `Giveaway ends on ${weekday}, ${day} ${month} ${year}, ${hour}:${minute}`

// get the remaining time

const futureTime = futureDate.getTime();

const getRemainingTime = () => {
    const today = new Date().getTime();
    const remainingTime = futureTime - today;

    // 1s = 1000ms
    // 1min = 60s
    // 1hr = 60min
    // 1d = 24hrs

    // converting into ms

    const oneDay = 24*60*60*1000;
    const oneHour = 60*60*1000;
    const oneMinute = 60*1000;

    // calculating each element

    let days = Math.floor(remainingTime / oneDay);
    let hours = Math.floor((remainingTime % oneDay) / oneHour) ;
    let minutes = Math.floor((remainingTime % oneHour) / oneMinute);
    let seconds = Math.floor((remainingTime % oneMinute) / 1000);

    const values = [days,hours,minutes,seconds];

    const format = (item) => {
        if(item < 10){
            return item = `0${item}`;
        }
        else{
            return item;
        }
    }

    items.forEach(function(item,index){
        item.innerHTML = format(values[index]);
    });

    if(remainingTime < 0){
        clearInterval(countdown);
        deadline.innerHTML = `<h4 class="expired">Sorry, the giveaway has expired!</h4>`
    }
}

let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();