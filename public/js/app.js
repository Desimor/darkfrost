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
        getWeather: function(lat, lon){
            var url = `/weather/${lat},${lon}`;
             axios.get(url)
                .then(function(res){
                var data = res.data.currently;
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
        },
        updateWeather: function(){
            this.getWeather(this.latitude, this.longitude);
        }
    },
    created: function(){
        this.getWeather(29.1, -81.4);
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
            .then(function(res){
                var data = res.data.daily;
                dailyWidget.summary = data.summary;
                dailyWidget.icon = data.icon;
            })
            .catch(function(err){
                console.log(err);
            });
    }
});

var hourlyWidget = new Vue({
    el: "#hourly",
    data: {
        summary: "It's gonna rain!",
        icon: 'clear-night',
        hours: []
    },
    methods: {
        getHourlyIcon: function(iconString){
            return `/images/${iconString}.png`;
        },
        getDate: function(seconds){
            var date = new Date(seconds * 1000);
            var month = date.getMonth();
            var year = date.getFullYear();
            var day = date.getDate();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            return `${month}/${day}/${year} ${hour}"${minutes}`
        },
        getMainIcon: function(){
            return `/images/${this.icon}.png`;
        },
        getHourlyWeather: function(lat, lon){
            var url = `/weather/${lat},${lon}`;
            axios.get(url)
                .then(function(res){
                    var hourlyData = res.data.hourly;
                    this.summary = hourlyData.summary;
                    this.icon = hourlyData.icon;
                    this.hours = hourlyData.data;
                })
                .catch(function(err){
                    console.log(err);
                }.bind(this));
        }
    },
    created: function(){
        this.getHourlyWeather(29.1, -81.4);
    }
});