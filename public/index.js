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
        var Deaths = [];
        for (var i = data.cases_time_series.length - 40; i < data.cases_time_series.length; i++) {
            dates.push(data.cases_time_series[i].date);
            cases.push(data.cases_time_series[i].totalconfirmed);
            recovered.push(data.cases_time_series[i].totalrecovered);
            Deaths.push(data.cases_time_series[i].deaths);
        }
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {

                labels: dates,
                datasets: [{
                    label: 'Total cases',
                    data: cases,
                    backgroundColor: 'rgba(255, 99, 132, 1)',
                    fill: false,
                    borderWidth: 0
                },
                {
                    label: 'Recovered cases',
                    data: recovered,
                    backgroundColor: 'rgba(0, 99, 132, 1)',
                    fill: false,
                    borderWidth: 0
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
                            fontSize: 14
                        }
                    }]


                }
            }
        });

    });