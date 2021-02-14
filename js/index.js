const ctx = document.getElementById('myChart').getContext('2d');
const GLOBAL_TEMPERATURE = 14;

fetchData()
    .then(parseData)
    .then(getLabelsAndData)
    .then(({ years, GTerms, NTerms, STerms }) => drawChart(years, GTerms, NTerms, STerms));

function fetchData() {
    return fetch("./ZonAnn.csv").then(resp => resp.text())
};

function parseData(data) {
    return Papa.parse(data, { header: true }).data;
};

function getLabelsAndData(data) {
    return data.reduce((acc, entry) => {
        acc.years.push(entry.Year);
        acc.GTerms.push(Number(entry.Glob) + GLOBAL_TEMPERATURE);
        acc.NTerms.push(Number(entry.NHem) + GLOBAL_TEMPERATURE);
        acc.STerms.push(Number(entry.SHem) + GLOBAL_TEMPERATURE);
        return acc
    }, { years: [], GTerms: [], NTerms: [], STerms: [] } )
};

function drawChart(labels, GTerms, NTerms, STerms) {
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                label: 'глобальная среднегодовая температура',
                data: GTerms,
                // backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 5
                },
                {
                label: 'среднегодовая температура северного полушария',
                data: NTerms,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
                },
                {
                label: 'среднегодовая температура южного полушария',
                data: STerms,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
                },
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        callback(value) {
                            return value + "°"
                        }
                    }
                }]
            }
        }
    })
}