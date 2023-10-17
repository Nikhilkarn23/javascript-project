class tableRow {
    constructor(startDate, endDate, monthYear, dateExclued, numberDays, leadCount, expectedDrr, lastUpdated) {
        this.startDate = startDate
        this.endDate = endDate
        this.monthYear = monthYear
        this.dateExclued = dateExclued
        this.numberDays = numberDays
        this.leadCount = leadCount
        this.expectedDrr = expectedDrr
        this.lastUpdated = lastUpdated
    }
}
// let table = document.getElementById("data")


let dataRow = new Array
function monthDiff(dateFrom, dateTo) {
    return dateTo.getMonth() - dateFrom.getMonth() +
        (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
}

function getYearDiff(date1, date2) {
    return Math.abs(date2.getFullYear() - date1.getFullYear());
}

function addNewRow() {
    let startValue = document.querySelector('#start-date')
    let startDate = new Date()
    startValue.addEventListener("input", event => {
        startDate = new Date(event.target.value);
    });
    let endDate = new Date(document.getElementById("end-date"))
    let dateExcluded = document.getElementById("date-excluded")
    let expectedDrrInput = document.getElementById("Expected-drr")
    let lastUpdated = document.getElementById("last-upadted")
    let leadCount = document.getElementById("lead-number")

    var diffInTime = endDate.getTime() - startDate.getTime()
    let diffInDays = diffInTime / (1000 * 3600 * 24)
    let month = monthDiff(startDate, endDate)
    let year = getYearDiff(startDate, endDate)
    let expectedDrr = leadCount / diffInDays
    let newRow = new tableRow(convertDate(startDate), convertDate(endDate), month, convertDate(dateExcluded), diffInDays, leadCount, expectedDrr, Date.now())
    dataRow.push(newRow)
    renderNewRow(dataRow.slice(-1))
}

function renderNewRow(lastElement) {

    let table = document.getElementById('data').getElementsByTagName('tbody')[0]
    lastElement.forEach(i => {
        let row = table.insertRow()
        // table.insertRow(row)
        let action = document.createElement("td")
        let id = document.createElement("td")
        id.innerHTML = dataRow.length
        action.innerHTML = 'N/A'
        row.appendChild(action)
        row.appendChild(id)
        for (key in i) {
            let cell = document.createElement("td")
            cell.innerHTML = i[key]
            row.appendChild(cell)
        }
        // table.appendChild(row)

    })


}

function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
}

