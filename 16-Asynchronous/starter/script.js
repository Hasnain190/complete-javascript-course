'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(async function (position) {
        const { latitude, longitude } = position.coords
        const data = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`)
            .catch(err => console.error(err));

        const location = await data.json()



        const { country, state, city } = location.address


        console.log({ country, state, city })

    }, function () {
        alert("you did not allowed your location")
    })

}
