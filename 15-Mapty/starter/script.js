'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


class Workouts {

    date = new Date()
    id = (Date.now() + "").slice(-10)
    // click = 0
    constructor(duration, coords, distance) {
        this.duration = duration
        this.distance = distance;
        this.coords = coords; // an array of coordinated [lat,lng]
        // this.click
    }
    _setDescription() {
        // prettier-ignore
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`


    }
}

class Running extends Workouts {
    type = "running"
    constructor(duration, coords, distance, cadence) {
        super(duration, coords, distance)
        this.cadence = cadence
        this.calcPace()
        this._setDescription()
    }

    calcPace() {
        this.pace = this.duration / this.distance

        return this.pace
    }
}
class Cycling extends Workouts {
    type = "cycling"
    constructor(duration, coords, distance, elevationGain) {
        super(duration, coords, distance)
        this.elevationGain = elevationGain
        this.calcSpeed()

        this._setDescription()

    }
    calcSpeed() {
        this.speed = this.distance / (this.duration / 60)

        return this.speed
    }
}
// const run1 = new Running(5.2, [39, -12], 24, 170)
// const cycle1 = new Cycling(95, [39, -12], 27, 530)

class App {

    #map;
    #mapZoom = 13;
    #mapEvent;
    #workouts = [];

    constructor() {


        this._getPosition();

        // get localStorage data

        this._getLocalStorage()

        form.addEventListener("submit", this._newWorkOut.bind(this))

        inputType.addEventListener("change", this._toggleElevationField)

        containerWorkouts.addEventListener("click", this._moveToPopup.bind(this))

    }

    _getPosition() {

        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this)
                , function () {
                    alert("Could not get your current location")
                })
        }

    }
    _loadMap(position) {

        const { longitude } = position.coords
        const { latitude } = position.coords

        const coords = [latitude, longitude]
        this.#map = L.map('map').setView(coords, this.#mapZoom);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);



        this.#map.on("click", this._showForm.bind(this))

        this.#workouts?.forEach(workout => {

            this._renderWorkoutMarker(workout)

        }
        )


    }

    _showForm(mapE) {


        this.#mapEvent = mapE

        form.classList.remove("hidden")
        inputDistance.focus()

    }

    _hideForm() {
        // clearing out all inputs
        inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value = ''

        form.classList.add("hidden")
    }
    _toggleElevationField() {


        inputElevation.closest(".form__row").classList.toggle("form__row--hidden")
        inputCadence.closest(".form__row").classList.toggle("form__row--hidden")
    }


    _newWorkOut(e) {


        const isValidInput = (...inputs) => inputs.every(inp => Number.isFinite(inp))

        const isPositiveValue = (...inputs) => inputs.every(inp => inp > 0)


        e.preventDefault()

        //  Get data from the form

        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        const { lat, lng } = this.#mapEvent.latlng
        let workout;


        // if workout running, create workout object
        if (type === "running") {
            const cadence = +inputCadence.value;
            // Check if data is valid
            // creating a guard clause
            if (!isValidInput(distance, duration, cadence) || !isValidInput(distance, duration, cadence)) {
                return alert("Please enter a valid value")
            }

            workout = new Running(duration, [lat, lng], distance, cadence)

        }

        // if workout cycling , create cycling object
        if (type === "cycling") {
            const elevation = +inputElevation.value
            if (!isValidInput(distance, duration, elevation) || !isValidInput(distance, duration)) {
                return alert("Please enter a valid value")
            }

            workout = new Cycling(duration, [lat, lng], distance, elevation)



        }


        // Add new object to workout array
        this.#workouts = []
        this.#workouts.push(workout)

        // render workout or list
        this._renderWorkout(workout)



        // clearing out values
        this._hideForm()
        this._renderWorkoutMarker(workout);

        //  Remember workout on map as marker
        this._setLocalStorage()


    }
    _renderWorkoutMarker(workout) {
        L.marker(workout.coords)
            .addTo(this.#map)
            .bindPopup(
                L.popup({
                    maxWidth: 250,
                    minWidth: 100,
                    autoClose: false,
                    closeOnClick: false,
                    className: `${workout.type}-popup`
                })
            )
            .setPopupContent(workout.type === 'running' ? "🏃‍♂️" : "🚴‍♀️" + workout.description)
            .openPopup();
    }

    _renderWorkout(workout) {
        let html = `

        <li class="workout workout--${workout.type}" data-id="${workout.id}">
            <h2 class="workout__title">${workout.description}</h2>
            <div class="workout__details">
            <span class="workout__icon">${workout.type === 'running' ? "🏃‍♂️" : "🚴‍♀️"
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
            </div >
    <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
    </div>
    `

        if (workout.type == "running") {
            html += `
            <div class="workout__details">
               <span class="workout__icon">⚡️</span>
               <span class="workout__value">${workout.pace.toFixed(1)}</span>
               <span class="workout__unit">min/km</span>
             </div>
             <div class="workout__details">
               <span class="workout__icon">🦶🏼</span>
               <span class="workout__value">${workout.cadence.toFixed(1)}</span>
               <span class="workout__unit">spm</span>
             </div>
          
           </li >
        
        
        
        `
        }

        if (workout.type === "cycling") {
            html +=
                `
               <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>
            
            `
        }
        const parser = new DOMParser
        const dom = parser.parseFromString(html, "text/html")
        dom.body.style.height = "auto"
        form.insertAdjacentElement("afterend", dom.body)


    }

    _moveToPopup(e) {
        const workoutEl = e.target.closest(".workout")

        if (!workoutEl) return;
        const workout = this.#workouts?.find(workout => workout.id === workoutEl.dataset.id)
        console.dir(workout)

        this.#map.setView(workout.coords, this.#mapZoom, {
            animate: true,
            pan: {
                duration: 1
            }
        })



    }
    _setLocalStorage() {


        localStorage.setItem("workouts", JSON.stringify(this.#workouts))


    }
    _getLocalStorage() {
        this.#workouts = JSON.parse(localStorage?.getItem("workouts"))
        if (!this.#workouts) return;
        this.#workouts?.forEach(workout => {
            this._renderWorkout(workout)



        }
        )

        console.log(this)
    }
    _reset() {
        localStorage.removeItem("workouts")
        location.reload()
    }

}

const app = new App()


