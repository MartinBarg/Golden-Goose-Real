// const express = require("express");
//const emailHelper = require("./helpers/emailHelper");


// const nodemailer = require("nodemailer");

// const userGmail = "martotester@gmail.com";
// const passAppGmail = "loyz pyig snlg wquz";

// // Set up Nodemailer transporter
// const transporter = nodemailer.createTransport({
// //   service: "gmail",
// //   auth: {
// //     user: userGmail,
// //     pass: passAppGmail,
// //   },
// // });

// // Define a route for sending emails
// // Set up email options
// const mailOptions = {
//   from: userGmail,
//   to: userGmail,
//   subject: `Gracias por tu hermoso gesto!`,
//   text: `Muchas gracias ${giverName} por tu regalo!! Me ayuda un monton a comprarme las zapas que quieroo.
  
//   Ahora que sos parte de este proyecto, vas a poder entrar cuando me las compre y ver fotos mias usandolas y disfrutando tu regalo.
  
//   En caso de que quieras modificar tu deseo, nombre, foto o contribucion al proyecto podes hacerlo buscandote en la sección de 'Givers', apretando el boton 'Edit' e ingresando tu codigo de modificacion: ${giverCode}.
  
//   Este mensaje fue enviado automaticamente, por lo que no te sientas en el compromiso de responderlo. Pero en caso de que lo hagas me voy a ocupar personalmente de leerlo (no te preocupes que no se lo muestro a la inteligencia artificial, va a ser nuestro secretito)`,
// };

// //     // Send email
// // transporter.sendMail(mailOptions, (error, info) => {
// //     if (error) {
// //       console.log(error);
// //     }
// //     console.log("Email sent: " + info.response);
//   });

//boton de regalo te lleva a mercado pago
var giftButton = document.querySelector('#gift-button');

giftButton.addEventListener('click',()=>{
    if(confirm('Aceptando este cartel te redirigire a mercado pago a que puedas transferir en pesos la cifra en dolares que regalas. Es a modo simbolico, pero me permitia jugar con metodos de pago en mi pagina.')){
        window.location.href = 'https://link.mercadopago.com.ar/martoslinksinmonto??back_url=https://sparkling-llama-acce6c.netlify.app/'
    }
});


//lenguages

var lenguageButton = document.querySelector('#lenguage-selector');
var lenguageMenu = document.querySelector('#lenguage-list');
var lenguageContainer = document.querySelector('#lenguage');

lenguageButton.addEventListener('click', (eve)=>{
    eve.stopPropagation();
    lenguageMenu.hidden = !lenguageMenu.hidden;
});

document.addEventListener('click', (ev)=>{
    if(!lenguageContainer.contains(ev.target)){
        lenguageMenu.hidden = true;
    }
});

var lengButtons = document.querySelectorAll('[data-lenguage]');
var textsToChange = document.querySelectorAll('[data-value]');

lengButtons.forEach((button)=>{
    button.addEventListener('click', ()=>{
        fetch(`../languages/${button.dataset.lenguage}.json`)
            .then(response => response.json())
            .then(data => {
                textsToChange.forEach((text)=>{
                    const section = text.dataset.section;   
                    const value = text.dataset.value;

                    text.innerHTML = data[section][value];
                })
            })
    })
});

//NEW GIVER
var givers = document.querySelector('#givers');

function newIndividualGiver(){
individualGiver = document.createElement('div');
individualGiver.classList.add('individual-giver');
givers.appendChild(individualGiver);

individualGiverName = document.createElement('h5');
individualGiver.appendChild(individualGiverName);
individualGiverName.textContent = document.querySelector('#name').value;

individualGiverWish = document.createElement('p');
individualGiver.appendChild(individualGiverWish);
individualGiverWish.textContent = document.querySelector('#wish').value;

individualGiverPhoto = document.createElement('img');
individualGiver.appendChild(individualGiverPhoto);

individualGiverAmount = Number(document.querySelector("#amount").value);

individualGiverEmail = document.querySelector("#email").value;

editGiver = document.createElement('button');
individualGiver.appendChild(editGiver);
editGiver.textContent = 'Edit Giver';
editGiver.classList.add('Edit');

deleteGiver = document.createElement('button');
individualGiver.appendChild(deleteGiver);
deleteGiver.textContent = 'Delete Giver';
deleteGiver.classList.add('Delete')

};

function orderDataToSend (){
    let lastGiver = giversArray[giversArray.length - 1]

    dataForEmail = {
        to: lastGiver.giverMail,
        subject: `${lastGiver.giverName}, gracias por tu hermoso gesto!`,
        text: `Muchas gracias por tu regalo!! Me ayuda un monton a comprarme las zapas que quieroo.
  
    Ahora que sos parte de este proyecto, vas a poder entrar cuando me las compre y ver fotos mias usandolas y disfrutando tu regalo.
          
    En caso de que quieras modificar tu deseo, nombre, foto o contribucion al proyecto, podes hacerlo buscandote en la sección de 'Givers', apretando el boton 'Edit' e ingresando tu codigo de modificacion: ${lastGiver.giverCode}.
          
    Este mensaje fue enviado automaticamente, por lo que no te sientas en el compromiso de responderlo. Pero en caso de que lo hagas me voy a ocupar personalmente de leerlo (no te preocupes que no se lo muestro a la inteligencia artificial, va a ser nuestro secretito)`
    };

    dataForAirtable = {
        "gName" : lastGiver.giverName,
        "gMail" : lastGiver.giverMail,
        "gAmount" : lastGiver.giverAmount,
        "gCode" : lastGiver.giverCode,
        "gWish" : lastGiver.giverWish
    }
}

function sendMailMain (){
    fetch('https://golden-goose-real.onrender.com/send-email',{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataForEmail) //Convierte dataForEmail a JSON
    })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Error:' + error))
};

function sendAirtableMain (){
    fetch('https://golden-goose-real.onrender.com/new-airtable-record',{
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        }, 
        body: JSON.stringify(dataForAirtable) 
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error:' + error))
};

function getAirtableData (){
    fetch('https://golden-goose-real.onrender.com/get-airtable-records',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        giversArray = data.givers;
        shoeProgressAbsolute = 0;

        giversArray.forEach(g =>{
            newIndividualGiver();
            individualGiverName.textContent = g.giverName;
            individualGiverWish.textContent = g.giverWish;
           // individualGiverPhoto.src = g.giverPhoto;
           shoeProgressAbsolute += g.giverAmount;
});
    shoeProgressRelative = (shoeProgressAbsolute/shoeCost)*100;
    document.querySelector('#progressBar').value = shoeProgressRelative;
    document.querySelector("#h6Progress").innerHTML = `Llevamos un progreso del ${Math.round(shoeProgressRelative,2)}%`;
    
    })
    .catch(error => console.error("Error fetching Airtable Data:", error))
};

giversArray = [];
getAirtableData ();


//shoe progress
//Total de la zapatilla
shoeCost = 875

//CARGO PROGRESO DE LA ZAPATILLA

shoeProgressAbsolute = 0;
giversArray.forEach((give) => shoeProgressAbsolute += give.giverAmount);


//if (localStorage.getItem('shoeProgressAbsolute') === null){
//    shoeProgressAbsolute = 0
//} else{
//    shoeProgressAbsolute = Number(localStorage.getItem('shoeProgressAbsolute'))
//}

shoeProgressRelative = 0;
shoeProgressRelative = (shoeProgressAbsolute/shoeCost)*100;

//if (localStorage.getItem('shoeProgressRelative') === null){
//   shoeProgressRelative = 0;
//    document.querySelector('#progressBar').value = shoeProgressRelative
//} else{
//    shoeProgressRelative = Number(localStorage.getItem('shoeProgressRelative'));
//    document.querySelector('#progressBar').value = shoeProgressRelative
//}

//mostrar los datos a llenar al clickear new giver
document.querySelector('#new-giver').addEventListener('click', (s)=>{
    if(s.target == document.querySelector('#new-giver')){document.querySelector('#giver-form').hidden = false}
})


//mostrar en pantalla los givers que existen en el local storage
//if(getAirtableData() === null){
//    giversArray = []
//} else {
//    giversArray = JSON.parse(localStorage.getItem('giversArray'));
//    giversArray.forEach(g =>{
//        newIndividualGiver();
//        individualGiverName.textContent = g.giverName;
//        individualGiverWish.textContent = g.giverWish;
//        individualGiverPhoto.src = g.giverPhoto;
//    })
//};



//el giver apreta enviar en el formulario de new giver
document.querySelector('#submit-giver').addEventListener('click', ()=>{
    
    //genero todos los elementos para mostrar
    newIndividualGiver();

    //genero numero random
    randomCode = Math.floor(Math.random()*1000000).toString().padStart(6, '0');



    var fileInput = document.querySelector('#photo');

    //si cargó foto
    if(fileInput.files.length > 0){

    //guardo la foto como URL y no como archivo
    var reader = new FileReader();
    var file = fileInput.files[0];

    if(file){
        reader.readAsDataURL(file);
        individualGiverPhoto.alt = "Fotito muy linda que subiste, pero la compu no cargo"
    }

    //le pongo el onload para que solo ocurra una vez que el reader haya leido por completo la imagen
    reader.onload = function(){

        //guardo la URL permanente en el src que corresponde
        individualGiverPhoto.src = reader.result;

        //empujo un nuevo elemento al array de elementos
        giversArray.push({
            giverName: individualGiverName.textContent,
            giverWish: individualGiverWish.textContent,
            giverPhoto: individualGiverPhoto.src,
            giverAmount: individualGiverAmount,
            giverCode: randomCode,
            giverMail: individualGiverEmail
        })
    
       // localStorage.setItem('giversArray', JSON.stringify(giversArray));

        orderDataToSend ();
        sendMailMain ();
        sendAirtableMain ();
        getAirtableData ();
    }
} else {
    
    //empujo un nuevo elemento al array de elementos
    giversArray.push({
        giverName: individualGiverName.textContent,
        giverWish: individualGiverWish.textContent,
        giverPhoto: null,
        giverAmount: individualGiverAmount,
        giverCode: randomCode,
        giverMail: individualGiverEmail
    });

    //localStorage.setItem('giversArray', JSON.stringify(giversArray));

    orderDataToSend ();
    sendMailMain ();
    sendAirtableMain ();
    getAirtableData ();
}

//    shoeProgressAbsolute += individualGiverAmount;
//    localStorage.setItem('shoeProgressAbsolute', shoeProgressAbsolute);

//    shoeProgressRelative = (shoeProgressAbsolute/shoeCost)*100;
//    localStorage.setItem('shoeProgressRelative', shoeProgressRelative);

    document.querySelector('#progressBar').value = shoeProgressRelative;
    document.querySelector("#h6Progress").innerHTML = `Llevamos un progreso del ${Math.round(shoeProgressRelative,2)}%`;
    
});

//EDIT OR DELETE GIVER

document.querySelectorAll('.Edit').forEach((butt)=> {
    butt.addEventListener('click', (butto) => {
        console.log(giverCode)
        userCodePrompt = prompt('Insterte su código de modificaciones');
        if (userCodePrompt == giversArray.giverCode){
            console.log('poner opcion para un set item')
        } else {
            alert('Código erroneo')
        }
    })
})


