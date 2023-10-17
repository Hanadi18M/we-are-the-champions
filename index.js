import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL:"https://weare-3f771-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

const inputField = document.getElementById("input-field")
const publishButton = document.getElementById("publish-button")
const endorsementsUl = document.getElementById("endorsements")


publishButton.addEventListener("click", function(){
    let inputValue = inputField.value

    push(endorsementsInDB, inputValue)

    clearInputField()
})

onValue(endorsementsInDB, function(snapshot){

    let itemsArray = Object.values(snapshot.val())

    clearEndorsementsUl()

    for ( let i = 0; i < itemsArray.length; i++){
        append(itemsArray[i])
    }
    
})

function clearEndorsementsUl(){
    endorsementsUl.innerHTML = ""
}

function clearInputField(){
    inputField.value = ""
}

function append(itemValue){
    let li = document.createElement("li")

    li.textContent = itemValue
    
    endorsementsUl.append(li)
}

