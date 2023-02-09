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
const dayStatistics = document.querySelector(".dayInformationSection")

searchButton.addEventListener("click", () => {
    cityName = searchInput.value
    connectAPI()
    updateDate()
})

const connectAPI = () => {
    const API_KEY = `d531ef0a02c5a713565a1b96de1fa8df`
    const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`

    const todayStatisticsRow = document.querySelector(".todayStatistics__bottomBox")

    todayStatisticsRow.innerHTML = ""
    dayStatistics.innerHTML = ""

    fetch(API_URL)
        .then(response => response.json())
        .then((response) => {
            let temperature = response.list[0].main.temp
            let visibility = response.list[0].visibility
            let currentWeather = response.list[0].weather[0].id
            paragraphCityName.textContent = response.city.name
            shortDescription.textContent = response.list[0].weather[0].main
            pressureParagraph.textContent = response.list[0].main.pressure + " hPa"
            windParagraph.textContent = response.list[0].wind.speed + " km/h"
            humidityParagraph.textContent = response.list[0].main.humidity + " %"
            visibilityParagraph.textContent = visibility / 100 + " %"
            mainTemperature.textContent = temperature.toFixed(1)

            if(currentWeather > 800) {
                document.body.style.backgroundImage = `url("/image/cloudsBackground.jpg")`
            } else if(currentWeather == 800) {
                document.body.style.backgroundImage = `url("/image/clearBackground.jpg")`
            } else if(currentWeather >= 700 && currentWeather < 800) {
                document.body.style.backgroundImage = `url("/image/mistBackground.jpg")`
            } else if(currentWeather == 781) {
                document.body.style.backgroundImage = `url("/image/tornadoBackground.jpg")`
            } else if(currentWeather == 711) {
                document.body.style.backgroundImage = `url("/image/smokeBackground.jpg")`
            } else if(currentWeather >= 600 && currentWeather < 700) {
                document.body.style.backgroundImage = `url("/image/snowBackground.jpg")`
            } else if(currentWeather >= 500 && currentWeather < 600) {
                document.body.style.backgroundImage = `url("/image/rainBackground.jpg")`
            } else if(currentWeather >= 300 && currentWeather < 400) {
                document.body.style.backgroundImage = `url("/image/drizzleBackground.jpg")`
            } else if(currentWeather >= 200 && currentWeather < 300) {
                document.body.style.backgroundImage = `url("/image/thunderstormBackground.jpg")`
            }

            let currentTime = new Date()
            let currentDay = currentTime.getDate()
            let currentMonth = currentTime.getMonth()

            if(currentDay < 10) {
                currentDay = `0${currentDay}`
            }

            if(currentMonth < 10) {
                currentMonth = `0${currentMonth + 1}`
            }

            for (let i = 0; i < 8; i++) {
                let todayList = response.list[i].dt_txt
                let todayListTest = `${currentMonth}-${currentDay}`
              
                if(todayList.includes(todayListTest) === true) {
                    let currentDate = response.list[i].dt_txt
                    let currentHour = currentDate.slice(-8, -3)
                    let currentWeather = response.list[i].weather[0].id
                    let currentTemperature = response.list[i].main.temp

                    let todayStatisticsBox = document.createElement("div")
                    todayStatisticsBox.classList.add("todayStatistics__weatherBox")

                    let dateParagraph = document.createElement("p")
                    dateParagraph.classList.add("paragraph")
                    dateParagraph.textContent = currentHour

                    let iconWeather = document.createElement("img")
                    if(currentWeather > 800) {
                        iconWeather.setAttribute("src", "/image/clouds.png")
                    } else if(currentWeather == 800) {
                        iconWeather.setAttribute("src", "/image/clear.png")
                    } else if(currentWeather >= 700 && currentWeather < 800) {
                        iconWeather.setAttribute("src", "/image/mist.png")
                    } else if(currentWeather == 781) {
                        iconWeather.setAttribute("src", "/image/tornado.png")
                    } else if(currentWeather == 711) {
                        iconWeather.setAttribute("src", "/image/smoke.png")
                    } else if(currentWeather >= 600 && currentWeather < 700) {
                        iconWeather.setAttribute("src", "/image/snow.png")
                    } else if(currentWeather >= 500 && currentWeather < 600) {
                        iconWeather.setAttribute("src", "/image/rain.png")
                    } else if(currentWeather >= 300 && currentWeather < 400) {
                        iconWeather.setAttribute("src", "/image/dizzle.png")
                    } else if(currentWeather >= 200 && currentWeather < 300) {
                        iconWeather.setAttribute("src", "/image/thunderstorm.png")
                    }
                    iconWeather.style.width = "35px"
                    iconWeather.style.height = "30px"

                    let temperatureInformation = document.createElement("p")
                    temperatureInformation.classList.add("paragraph")
                    currentTemperature = currentTemperature.toFixed(1)
                    temperatureInformation.textContent = currentTemperature + "°C"

                    todayStatisticsRow.appendChild(todayStatisticsBox)
                    todayStatisticsBox.appendChild(dateParagraph)
                    todayStatisticsBox.appendChild(iconWeather)
                    todayStatisticsBox.appendChild(temperatureInformation)
                }
            }

            for (let i = 0; i < 30; i++) {
                let currentDate = response.list[i].dt_txt
                let currentHour = currentDate.slice(-8, -3)
        
                if(currentHour == "12:00") {
                    let currentDate = response.list[i].dt_txt
                    let currentDay = currentDate.slice(0, 10)
                    console.log(response.list[0].main.temp)
                    console.log(response.list)

                    const dayStatisticsBox = document.createElement("div")
                    dayStatisticsBox.innerHTML = 
                    `<div class="dayStatistics">
                    <div class="dayStatistics__top">
                        <div class="dayStatistics__cityWeather">
                            <h2 class="headingTwo">${response.city.name}</h2>
                            <img class="dayStatistics__icon" src="/image/${response.list[0].weather[0].main}.png">
                        </div>
                        <p class="paragraph currentDate">${currentDay}</p>
                        </div>
                    <div class="dayStatistics__bottom">
                        <div class="dayStatistics__left">
                            <p class="paragraph dayStatistics__temperature">${response.list[i].main.temp}°C</p>
                            <p class="paragraph">${response.list[0].weather[0].main}</p>
                        </div>
                    <div class="dayStatistics__right">
                        <p class="paragraph">Pressure: ${response.list[i].main.pressure} hPa</p>
                        <p class="paragraph">Wind: ${response.list[i].wind.speed} km/h</p>
                        <p class="paragraph">Humidity: ${response.list[i].main.humidity} %</p>
                    </div>
                    </div>
                    </div>`

                    dayStatistics.appendChild(dayStatisticsBox)
                }
            }
        }) 
}


const updateDate = () => {
    const currentTimeParagraph = document.querySelector(".mainInformation__time")
    const currentDateParagraph = document.querySelector(".currentDate")
    let currentTime = new Date()
    currentTimeParagraph.textContent = `Updated on  ${currentTime.getHours()}:${currentTime.getMinutes()}`
    currentDateParagraph.textContent = `${currentTime.getDate()}.${currentTime.getMonth()}.${currentTime.getFullYear()}`
}

iconGeolocation.addEventListener("click", () => {
    let geoNavigator = navigator.geolocation

    if(geoNavigator) {
      geoNavigator.getCurrentPosition(function(location) {
        let geoLatitude = location.coords.latitude
        let geoLongitude = location.coords.longitude

        const API_KEY = `d531ef0a02c5a713565a1b96de1fa8df`
        const API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${geoLatitude}&lon=${geoLongitude}&appid=${API_KEY}&units=metric`
  
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
        })
    }
})

connectAPI()
updateDate()