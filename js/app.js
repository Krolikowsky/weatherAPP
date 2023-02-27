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

const downloadSunrise = (response) => {
    let sunrise = response.city.sunrise
    let sunriseTime = new Date(sunrise * 1000)
    sunriseParagraph.textContent = sunriseTime.toLocaleTimeString().slice(0, 5)
}

const downloadSunset = (response) => {
    let sunset = response.city.sunset
    let sunsetTime = new Date(sunset * 1000)
    sunsetParagraph.textContent = sunsetTime.toLocaleTimeString().slice(0, 5)
}

const downloadMainInformation = (response) => {
    mainDescriptionWeather.textContent = response.list[0].weather[0].main
    mainTemperature.textContent = `${response.list[0].main.temp.toFixed(1)}°C`
    pressureParagraph.textContent = `${response.list[0].main.pressure}hPa`
    humidityParagraph.textContent = `${response.list[0].main.humidity}%`
    windParagraph.textContent = `${response.list[0].wind.speed.toFixed(1)}km/h`
    feltTemperature.textContent = `Felt ${response.list[0].main.feels_like.toFixed(1)}°C`
    weatherNowIconBox.innerHTML = `<img class="weatherNow__icon" src="/image/${response.list[0].weather[0].id}.svg"/>`
    weatherForecast.textContent = `The best weather description for today is this: ${response.list[0].weather[0].description}.`
}

const downloadHourlyWeather = (response) => {
    let currentTime = new Date()
    let currentDay = currentTime.getDate()
    let currentMonth = currentTime.getMonth()

    if(currentDay < 10) {
        currentDay = `0${currentDay}`
    }

    if(currentMonth < 10) {
        currentMonth = `0${currentMonth + 1}`
    }

    for(let i = 0; i < 8; i++) {
        let todayList = response.list[i].dt_txt
        let todayListDate = `${currentMonth}-${currentDay}`

        if(todayList.includes(todayListDate)) {
            let currentDate = response.list[i].dt_txt

            const hourlyStatisticsBox = document.createElement("div")
            hourlyStatisticsBox.innerHTML = 
            `<p class="paragraphStrong todayWeather__paragraphStrong">${currentDate.slice(-8, -3)}</p>
            <img class="todayWeather__icon" src="/image/${response.list[i].weather[0].id}.svg" alt="">
            <p class="paragraphBlue todayWeather__paragraphBlue">${response.list[i].main.temp.toFixed(0)}°C</p>`

            hourlyStatisticsBox.classList.add("todayWeather__slide")
            hourlySlider.appendChild(hourlyStatisticsBox)
        }
    }
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
            `<p style="width: 35%; text-align: left" class="paragraphStrong">${currentDay}</p>
            <div style="width: 40%" class="dailyWeather__iconCenter">
                <img class="dailyWeather__icon" src="/image/${response.list[i].weather[0].id}.svg" alt="">
                <p class="paragraphGray">${response.list[i].weather[0].main}</p>
            </div>
            <p style="width: 20%; text-align: right" class="paragraphBlue">${response.list[i].main.temp_max.toFixed(0)}/${response.list[i].main.temp_min.toFixed(0)}°C</p>`

            dayStatisticsBox.classList.add("dailyWeather__row")
            dailySlider.appendChild(dayStatisticsBox)
        } 
    }
}

const downloadCityName = (response) => {
    mainCityName.textContent = response.city.name
}

const timeUpdate = () => {
    let currentTime = new Date()
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const day = currentTime.getDay()
    const month = currentTime.getMonth()
    refreshHour.textContent = `${days[day]}, ${currentTime.getDate()} ${months[month]} ${currentTime.getHours()}:${currentTime.getMinutes()}`
}

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