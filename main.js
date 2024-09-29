// Variables
let btnForm = document.getElementById("btn-form");
let entryRegistration = document.getElementById("entry-registration");
let exitRegistration = document.getElementById("exit-registration");
let balance = document.querySelector("div.balance h2");
let total = 0;

balance.innerHTML = total;

// Events
btnForm.addEventListener("click", () => {
    let nameRegistration = document.getElementById("name-registration");
    let valueResgistration = document.getElementById("value-registration");
    let description = document.getElementById("description");
    let operationType = document.getElementById("operation-type");

    createRegistry(nameRegistration.value, valueResgistration.value, description.value, operationType.value);

    balance.innerHTML = total;

    nameRegistration.value = "";
    valueResgistration.value = "";
    description.value = "";
    
    console.log(nameRegistration, valueResgistration, description, operationType);
});

// Functions 
function createRegistry(name, value, description, type) {
    let divRegistry = document.createElement("div");
    let titleName = document.createElement("h3");
    let subtitleValue = document.createElement("h4");
    let descriptionRegistry = document.createElement("p");
    let btnDelete = document.createElement("button");

    divRegistry.id = name;
    divRegistry.className = type;
    divRegistry.className = "registration-box";
    titleName.innerHTML = name;
    subtitleValue.innerHTML = value;
    descriptionRegistry.innerHTML = description;
    btnDelete.innerHTML = "Deletar";

    btnDelete.addEventListener("click", () => {
        if(type == "entry") {
            total -= Number(value);
            balance.innerHTML = total;
        } else if(type == "exit") {
            total += Number(value);
            balance.innerHTML = total;
        }
        btnDelete.parentElement.remove();
    })

    divRegistry.appendChild(titleName);
    divRegistry.appendChild(subtitleValue);
    divRegistry.appendChild(descriptionRegistry);
    divRegistry.appendChild(btnDelete);

    if(type == "entry") {
        entryRegistration.appendChild(divRegistry);
        total += Number(value);
    } else if(type == "exit") {
        exitRegistration.appendChild(divRegistry);
        total -= Number(value)
    } else {
        console.log(Error("Erro ao Criar Registro"));
    }
}

