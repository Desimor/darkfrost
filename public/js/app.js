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
        location: 'Gainesville, Fl'
    }
});