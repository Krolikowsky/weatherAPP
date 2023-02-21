let searchCityName = `Poznań`

const searchInput = document.querySelector(".topBar__input")
const searchIcon = document.querySelector(".topBar__searchIcon")

const mainCityName = document.querySelector(".mainInformation__city")
const mainTemperature = document.querySelector(".mainInformation__mainTemperature")
const mainDescriptionWeather = document.querySelector(".mainInformation__descriptionWeather")
const refreshHour = document.querySelector(".mainInformation__spanHour")

const minimumTemperatureParagraph = document.querySelector(".mainInformation__minimumTemperature")
const windParagraph = document.querySelector(".mainInformation__windParagraph")
const visibilityParagraph = document.querySelector(".mainInformation__visibilityParagraph")
const pressureParagraph = document.querySelector(".mainInformation__pressureParagraph")
const humidityParagraph = document.querySelector(".mainInformation__humidityParagraph")
const maximumTemperatureParagraph = document.querySelector(".mainInformation__maximumParagraph")
const dailySlider = document.querySelector(".daysSection__slider")

window.addEventListener('DOMContentLoaded', () => connectAPI())

searchIcon.addEventListener("click", () => {
    searchCityName = searchInput.value
    connectAPI()
})

const downloadMainInformation = (response) => {
    let temperature = response.list[0].main.temp
    let minTemperature = response.list[0].main.temp_min
    let maxTemperature = response.list[0].main.temp_max

    mainDescriptionWeather.textContent = response.list[0].weather[0].main
    mainTemperature.textContent = response.list[0].main.temp.toFixed(1)
    maximumTemperatureParagraph.textContent = `Temperatura minimalna ${response.list[0].main.temp_max.toFixed(1)}°`
    minimumTemperatureParagraph.textContent = `Temperatura minimalna ${response.list[0].main.temp_min.toFixed(1)}°`
    visibilityParagraph.textContent = `Widoczność ${(response.list[0].visibility / 1000)}km`
    pressureParagraph.textContent = `Ciśnienie ${response.list[0].main.pressure}hPa`
    humidityParagraph.textContent = `Wilgotność ${response.list[0].main.humidity}%`
    windParagraph.textContent = `Wiatr ${response.list[0].wind.speed} km/h`
}

const downloadDailyWeather = (response) => {
    for (let i = 0; i < 30; i++) {
        let currentDate = response.list[i].dt_txt
        let currentHour = currentDate.slice(-8, -3)

        if(currentHour == "12:00") {
            let currentDate = response.list[i].dt_txt
            let currentDay = currentDate.slice(5, 10).replace("-", ".")

            const dayStatisticsBox = document.createElement("div")
            dayStatisticsBox.innerHTML = 
            `<p class="daysSection__dayParagraph">${currentDay}</p>
            <img class="daysSection__icon" src="/image/${response.list[i].weather[0].main}.png">
            <div class="daysSection__temperatureBox">
                <p class="daysSection__dayTemperature">${response.list[i].main.temp_max.toFixed(0)}°</p>
                <p class="daysSection__nightTemperature">${response.list[i].main.temp_min.toFixed(0)}°</p>
            </div>
            <p class="paragraph">${response.list[i].weather[0].main}</p>`

            dayStatisticsBox.classList.add("hoursSection__slide")
            dailySlider.appendChild(dayStatisticsBox)
        } 
    }
}

const downloadCityName = (response) => {
    mainCityName.textContent = response.city.name
}

const timeUpdate = () => {
    let currentTime = new Date()
    refreshHour.textContent = `${currentTime.getHours()}:${currentTime.getMinutes()}`
}

const connectAPI = () => {
    const API_KEY = `d531ef0a02c5a713565a1b96de1fa8df`
    const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCityName}&appid=${API_KEY}&units=metric`

    fetch(API_URL)
        .then(response => response.json())
        .then((response) => {
            downloadCityName(response)
            downloadMainInformation(response)
            downloadDailyWeather(response)
        })

    timeUpdate()
}