let searchCityName = `Poznań`

const searchInput = document.querySelector(".topBar__input")
const searchIcon = document.querySelector(".topBar__iconSearch")
const errorInformation = document.querySelector(".paragraphRed")

const mainCityName = document.querySelector(".mainInformation__city")
const mainTemperature = document.querySelector(".weatherNow__temperatureParagraph")
const mainDescriptionWeather = document.querySelector(".weatherNow__Description")
const refreshHour = document.querySelector(".mainInformation__spanHour")
const feltTemperature = document.querySelector(".weatherNow__feltTemperature")
const weatherNowIconBox = document.querySelector(".weatherNow__iconBox")

const windParagraph = document.querySelector(".weatherNowBox__windParagraph")
const pressureParagraph = document.querySelector(".weatherNowBox__pressureParagraph")
const humidityParagraph = document.querySelector(".weatherNowBox__humidityParagraph")

const dailySlider = document.querySelector(".dailyWeather")
const hourlySlider = document.querySelector(".todayWeather__slider")
const weatherForecast = document.querySelector(".weatherForecast__description")

const sunriseParagraph = document.querySelector(".moreInformation__sunrise")
const sunsetParagraph = document.querySelector(".moreInformation__sunset")

searchIcon.addEventListener("click", () => {
    searchCityName = searchInput.value
    connectAPI()
})

window.addEventListener('DOMContentLoaded', () => connectAPI())

const connectAPI = () => {
    const API_KEY = `d531ef0a02c5a713565a1b96de1fa8df`
    const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCityName}&appid=${API_KEY}&units=metric`

    hourlySlider.innerHTML = ""
    dailySlider.innerHTML = ""

    fetch(API_URL)
        .then(response => response.json())
        .then((response) => {
            downloadCityName(response)
            downloadMainInformation(response)
            downloadHourlyWeather(response)
            downloadDailyWeather(response)
            downloadSunrise(response)
            downloadSunset(response)
            errorInformation.classList.remove("displayBlock")
            searchInput.style.borderBottom = "1px solid #D8D8D8"
            console.log(response)
        })
        .catch((error) => {
            errorInformation.classList.add("displayBlock")
            searchInput.style.borderBottom = "1px solid #FF0000"
            errorInformation.textContent = `The city name is incorrect: ${searchCityName}`
        })

    timeUpdate()
}