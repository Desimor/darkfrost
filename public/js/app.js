var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue'
    }
});

var currentlyWidget = new Vue({
    el: '#currently',
    data: {
        time: 100000,
        summary: 'Partly Cloudy',
        icon: 'partly-cloudy',
        apparentTemperature: 67.3,
        precipProbability: 0.30,
        humidity: 0.61,
        location: 'Gainesville, Fl',
        latitude: 29.1,
        longitude: -81.4
    },
    methods: {
        iconUrl: function(iconString){
            return `/images/${iconString}.png`;
        },
        updateWeather: function(){
            var url = `/weather/${this.latitude},${this.longitude}`;
             axios.get(url)
                .then(function(response){
                var data = response.data.currently;
                currentlyWidget.time = data.time;
                currentlyWidget.summary = data.summary;
                currentlyWidget.icon = data.icon;
                currentlyWidget.apparentTemperature = data.apparentTemperature;
                currentlyWidget.precipProbability = data.precipProbability;
                currentlyWidget.humidity = data.humidity;
            })
            .catch(function(err){
                console.log(err);
            });
        }
    },
    created: function(){
        axios.get('/weather/29.1,-81.4')
            .then(function(response){
                var data = response.data.currently;
                currentlyWidget.time = data.time;
                currentlyWidget.summary = data.summary;
                currentlyWidget.icon = data.icon;
                currentlyWidget.apparentTemperature = data.apparentTemperature;
                currentlyWidget.precipProbability = data.precipProbability;
                currentlyWidget.humidity = data.humidity;
            })
            .catch(function(err){
                console.log(err);
            });
    }
});

var dailyWidget = new Vue({
    el: '#daily',
    data: {
        summary: 'Partly Cloudy',
        icon: 'partly-cloudy'
    },
    methods: {
        iconUrl: function(iconString){
            return `/images/${iconString}.png`;
        }
    },
    created: function(){
        axios.get('/weather/29.1,-81.4')
            .then(function(response){
                var data = response.data.daily;
                dailyWidget.summary = data.summary;
                dailyWidget.icon = data.icon;
            })
            .catch(function(err){
                console.log(err);
            });
    }
});