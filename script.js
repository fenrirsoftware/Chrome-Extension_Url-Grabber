let myLeads = [];
const inputBtn = document.getElementById('input-btn');
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById('ul-el');
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

function render(leads) {
    let listItems = "";
    for (var i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a href='${leads[i]}' target='_blank'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems;
}

inputBtn.addEventListener("click", function() {
    if (inputEl.value !== "" && inputEl.value.startsWith("https://www.turkhackteam.org/uye/")) {
        myLeads.push(inputEl.value);
        inputEl.value = "";
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    }
})

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({}, function(allTabs) {
        for (let i = 0; i < allTabs.length; i++) {
            if (allTabs[i].url.startsWith("https://www.turkhackteam.org/uye/")) {
                myLeads.push(allTabs[i].url);
            }
        }
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    })
})
