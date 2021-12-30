let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById('ul-el')
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
let leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    renderLeads(myLeads)
}

function renderLeads(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        //listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
        //ALTERNATIVELY:
        //const li = document.createElement("li")
        //li.textContent = myLeads[i]
        //ulEl.append(li)
    }
    ulEl.innerHTML = listItems
}

//const tabs = [{url: "https://www.linkedin.com/in/per-harald-borgen/"}


tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        //console.log(tabs)
        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
         let activeTab = tabs[0].url
         myLeads.push(activeTab)
         localStorage.setItem("myLeads", JSON.stringify(myLeads) )
         renderLeads(myLeads)
        //let activeTabId = activeTab.id // or do whatever you need
    })

})

deleteBtn.addEventListener("click", function() {
    //get current tab url
    localStorage.clear()
    myLeads = []
    renderLeads(myLeads)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    renderLeads(myLeads)
})

