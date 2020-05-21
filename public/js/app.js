console.log('Javascript for client side')

const weatherForm = document.querySelector('form');
//to grab the input value
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading Message';
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {

            if(data.error){
                messageOne.textContent = data.error;
            }

            else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }    
        })
        
    })
})