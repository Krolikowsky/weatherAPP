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

