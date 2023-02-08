let cityName = "Poznań"
const searchInput = document.querySelector(".searchBar__input")
const searchButton = document.querySelector(".searchBar__searchIcon")
const paragraphCityName = document.querySelector(".mainInformation__city")
const shortDescription = document.querySelector(".mainInformation__weather")
const mainTemperature = document.querySelector(".mainInformation__temperature")
const pressureParagraph = document.querySelector(".pressureParagraph")
const windParagraph = document.querySelector(".windParagraph")
const humidityParagraph = document.querySelector(".humidityParagraph")
const visibilityParagraph = document.querySelector(".visibilityParagraph")
const iconGeolocation = document.querySelector(".searchBar__icon")


searchButton.addEventListener("click", () => {
    cityName = searchInput.value
    connectAPI()
    updateDate()
})

iconGeolocation.addEventListener("click", () => {
})

const connectAPI = () => {
    const API_KEY = `d531ef0a02c5a713565a1b96de1fa8df`
    const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`

    fetch(API_URL)
        .then(response => response.json())
        .then((response) => {
            let temperature = response.list[0].main.temp
            let visibility = response.list[0].visibility
            paragraphCityName.textContent = response.city.name
            shortDescription.textContent = response.list[0].weather[0].main
            pressureParagraph.textContent = response.list[0].main.pressure + " hPa"
            windParagraph.textContent = response.list[0].wind.speed + " km/h"
            humidityParagraph.textContent = response.list[0].main.humidity + " %"
            visibilityParagraph.textContent = visibility / 100 + " %"
            mainTemperature.textContent = temperature.toFixed(1)
        })
}

const updateDate = () => {
    const currentTimeParagraph = document.querySelector(".mainInformation__time")
    const currentDateParagraph = document.querySelector(".currentDate")
    let currentTime = new Date()
    currentTimeParagraph.textContent = `Updated on  ${currentTime.getHours()}:${currentTime.getMinutes()}`
    currentDateParagraph.textContent = `${currentTime.getDate()}.${currentTime.getMonth()}.${currentTime.getFullYear()}`
}

connectAPI()
updateDate()