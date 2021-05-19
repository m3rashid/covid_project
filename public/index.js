    jQuery(document).ready(function($) {
        AOS.init();
        $('.counter').counterUp({
            delay: 10,
            time: 1000
        });
    });
    $.getJSON("https://api.covid19india.org/data.json", function(data) {
        var dates = [];
        var cases = [];
        var recovered = [];
        for (var i = data.cases_time_series.length - 50; i < data.cases_time_series.length; i++) {
            dates.push(data.cases_time_series[i].date);
            cases.push(data.cases_time_series[i].totalconfirmed);
            recovered.push(data.cases_time_series[i].totalrecovered)
        }
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dates,
                datasets: [{
                        label: '# total cases',
                        data: cases,
                        fill: false,
                        borderWidth: 1
                    }]
                    // , {
                    //     label: '# Recoveries',
                    //     data: recovered,
                    //     fill: false,
                    //     backgroundColor: 'rgba(255, 99, 132, 1)',
                    //     borderColor: 'rgba(255, 99, 132, 0.9)'

                // }]
            },
            options: {
                responsive: true, // other properties ....
                maintainAspectRatio: false,
                plugins: {

                    legend: {
                        labels: {
                            // This more specific font property overrides the global property
                            font: {
                                size: 10
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false
                    },
                    xAxes: [{
                        ticks: {
                            fontSize: 16
                        }
                    }]


                }
            }
        });

    });