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
        getDate: function(seconds){
            var date = new Date(seconds * 1000);
            var month = date.getMonth();
            var year = date.getFullYear();
            var day = date.getDate();
            var hour = date.getHours();
            var minutes = date.getMinutes();
            return `${month}/${day}/${year} ${hour}:${minutes}`
        },
        getWeather: function(lat, lon){
            var url = `/weather/${lat},${lon}`;
             axios.get(url)
                .then(function(res){
                var data = res.data.currently;
                currentlyWidget.time = data.time;
                console.log("Here");
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
        updateWeather: function(location){
            var address = `/location/${this.location}`;
            axios.get(address)
                .then(function(res){
                    var lat = res.data.results[0].geometry.location.lat;
                    var lon = res.data.results[0].geometry.location.lng;
                    console.log(lat, lon);
                    this.getWeather(lat, lon);
                }.bind(this))
                .catch(function(err){
                    console.log(err);
                });
            // this.getWeather(this.lat, this.lon);
            
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
        icon: 'partly-cloudy',
        week: []
    },
    methods: {
        getDailyIcon: function(iconString){
            return `/images/${iconString}.png`;
        },
        getDate: function(seconds){
            var date = new Date(seconds * 1000);
            var month = date.getMonth();
            var day = date.getDate();
            var hour = date.getHours();
            var minutes = date.getMinutes();
            return `${month}/${day}, ${hour}:${minutes}`
        },
        getDailyWeather: function(lat, lon){
            var url = `/weather/${lat},${lon}`;
            axios.get(url)
                .then(function(res){
                    var day = res.data.daily;
                    this.summary = day.summary;
                    this.icon = day.icon;
                    this.week = day.data;
                }.bind(this))
                .catch(function(err){
                    console.log(err);
                });
        }
    },
    created: function(){
        this.getDailyWeather(29.1, -81.4);
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
            var hour = date.getHours();
            var minutes = date.getMinutes();
            return `${month}/${day}/${year} ${hour}:${minutes}`
        },
        getHourlyWeather: function(lat, lon){
            var url = `/weather/${lat},${lon}`;
            axios.get(url)
                .then(function(res){
                    var hourlyData = res.data.hourly;
                    this.summary = hourlyData.summary;
                    this.icon = hourlyData.icon;
                    this.hours = hourlyData.data;
                }.bind(this))
                .catch(function(err){
                    console.log(err);
                });
        }
    },
    created: function(){
        this.getHourlyWeather(29.1, -81.4);
    }
});