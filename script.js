const form = document.getElementById('weather-form');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const in_place = document.getElementById('input_city').value;

    const error = document.getElementById('error-messages');

    if(in_place === "") {
        alert("Please enter a city name.");
        return;
    }

    //Get weather data

    error.innerText = 'Loading...'

    document.getElementById('search_btn').hidden = true;


    fetch(`https://api.weatherapi.com/v1/current.json?key=${configs.api_key}&q=${in_place}&aqi=yes`)
    .then(response => {
        if (!response.ok) {
            error.innerText = 'Error fetching weather data.';
            document.getElementById('search_btn').hidden = false;
            document.getElementById('weather-form').reset();
            error.style.color = 'red';
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(res => {

        error.style.color = 'green';
        error.innerText = 'Data fetched successfully!'

        // Display the weather data on the page
        
        const place = document.getElementById('out_place');
        const region = document.getElementById('out_region');
        const country = document.getElementById('out_country');
        const local_time = document.getElementById('out_local_time');
        const temp = document.getElementById('out_temp');
        const condition = document.getElementById('out_condition');
        const humidity = document.getElementById('out_humidity');
        const wind_speed = document.getElementById('out_wind_speed');
        const last_updated = document.getElementById('out_last_updated');
        const tz_id = document.getElementById('out_tz_id');
        const img = document.getElementById('out_icon');


        place.innerText = res.location.name;
        region.innerText = res.location.region;
        country.innerText = res.location.country;
        local_time.innerText = res.location.localtime;
        temp.innerText = `${res.current.temp_c}°C`;
        condition.innerText = res.current.condition.text;
        humidity.innerText = `${res.current.humidity}%`;
        wind_speed.innerText = `${res.current.wind_kph} km/h`;
        last_updated.innerText = res.current.last_updated;
        tz_id.innerText = res.location.tz_id;
        img.src = res.current.condition.icon;


        document.getElementById('weather-statistics').style.display = 'block';
        document.getElementById('search_btn').hidden = false;

        console.log(res);
    })
    .catch(error => {
        console.log(error)
        error.style.color = 'red';
        error.innerText = 'Error fetching weather data. Please try again later.';
    })
})