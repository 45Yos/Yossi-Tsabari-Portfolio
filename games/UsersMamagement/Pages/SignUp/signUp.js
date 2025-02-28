const formDiv = document.getElementById('formDiv');
const username = document.getElementById('username');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const address = document.getElementById('address');
const birthDay = document.getElementById('birthDay');
const city = document.getElementById('city');
const country = document.getElementById('country');
const petName = document.getElementById('petName');
const nameOfFather = document.getElementById('nameOfFather');
const oldLastNameOfMother = document.getElementById('oldLastNameOfMother');
const localStorageUsers = JSON.parse(localStorage.getItem('users')) || [];





const usernameText = document.createElement('p');
usernameText.id = 'text';
username.insertAdjacentElement('afterend', usernameText);


let setTime;
username.addEventListener('input', () => {

    const usernameValue = username.value;
    const usernameRegex = /^[a-zA-Z0-9]{3,}$/;


    clearTimeout(setTime);


    if (usernameRegex.test(usernameValue)) {

        usernameText.style.color = 'green';
        usernameText.innerHTML = 'Username is valid!';

        setTime = setTimeout(() => {
            usernameText.innerHTML = '';
        }, 2000);



    } else {

        usernameText.style.color = 'red';
        usernameText.innerHTML = 'Username must be at least 3 English characters long and can only contain letters and numbers!';
    }



    if (localStorageUsers.find(user => user.username === usernameValue)) {

        clearTimeout(setTime);
        usernameText.style.color = 'red';
        usernameText.innerHTML = 'Username already exists!';
    }



});











const passwordText = document.createElement('p');
passwordText.id = 'text';
password.insertAdjacentElement('afterend', passwordText);


password.addEventListener('input', () => {

    const passwordValue = password.value;
    const passwordRegex = /^.{8,}$/;



    if (passwordRegex.test(passwordValue)) {
        passwordText.style.color = 'green';
        passwordText.innerHTML = 'Password is valid!';

        setTimeout(() => {
            passwordText.innerHTML = '';
        }, 2000);
    } else {
        passwordText.style.color = 'red';
        passwordText.innerHTML = 'Password must be at least 8 characters long!';
    }
});





const textConfirm = document.createElement('p');
textConfirm.id = 'textConfirm';
confirmPassword.insertAdjacentElement('afterend', textConfirm);



confirmPassword.addEventListener('input', () => {


    if (password.value !== confirmPassword.value) {
        textConfirm.style.color = 'red';
        textConfirm.innerHTML = 'Passwords do not match!';
    } else {
        textConfirm.style.color = 'green';
        textConfirm.innerHTML = 'Passwords match!';

        setTimeout(() => {
            textConfirm.innerHTML = '';
        }, 2000);
    }
});







const emailText = document.createElement('p');
emailText.id = 'text';
email.insertAdjacentElement('afterend', emailText);


email.addEventListener('input', () => {


    const emailValue = email.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    if (emailRegex.test(emailValue)) {
        emailText.style.color = 'green';
        emailText.innerHTML = 'Email is valid!';
    } else {
        emailText.style.color = 'red';
        emailText.innerHTML = 'Email is not valid!';
    }

    if (localStorageUsers.find(user => user.email === email.value)) {

        emailText.style.color = 'red';
        emailText.innerHTML = 'Email already exists!';
    }
});







const phoneText = document.createElement('p');
phoneText.id = 'text';
phone.insertAdjacentElement('afterend', phoneText);



phone.addEventListener('input', () => {

    const phoneValue = phone.value;
    const phoneRegex = /^05[0-9]{8}$/;





    if (phoneRegex.test(phoneValue)) {
        phoneText.style.color = 'green';
        phoneText.innerHTML = 'Phone number is valid!';


    } else {
        phoneText.style.color = 'red';
        phoneText.innerHTML = 'Phone number must be 10 digits!';
    }



    if (localStorageUsers.find(user => user.phone === phoneValue)) {

        phoneText.style.color = 'red';
        phoneText.innerHTML = 'Phone number already exists!';
    }


});








const signUpButton = document.getElementById('signUpButton');
signUpButton.addEventListener('click', () => {

    const warnning = document.createElement('div');
    warnning.id = 'warnning';
    if (password.value !== confirmPassword.value) {

        warnning.innerHTML = 'Passwords do not match! <br> Please try again.';
        document.body.appendChild(warnning);
        signUpButton.disabled = true;
        signUpButton.style.opacity = '0.3';

        setTimeout(() => {
            warnning.remove();
            signUpButton.disabled = false;
            signUpButton.style.opacity = '1';
        }, 3000);


    } else if (username.value.length < 3) {

        warnning.innerHTML = 'Username is not valid! <br> Please try again.';
        document.body.appendChild(warnning);
        signUpButton.disabled = true;
        signUpButton.style.opacity = '0.3';

        setTimeout(() => {
            warnning.remove();
            signUpButton.disabled = false;
            signUpButton.style.opacity = '1';
        }, 3000);



    } else if (password.value.length < 8) {

        warnning.innerHTML = 'Password is not valid! <br> Please try again.';
        document.body.appendChild(warnning);
        signUpButton.disabled = true;
        signUpButton.style.opacity = '0.3';

        setTimeout(() => {
            warnning.remove();
            signUpButton.disabled = false;
            signUpButton.style.opacity = '1';
        }, 3000);



    } else if (password.value !== confirmPassword.value) {

        warnning.innerHTML = 'Passwords do not match! <br> Please try again.';
        document.body.appendChild(warnning);
        signUpButton.disabled = true;
        signUpButton.style.opacity = '0.3';

        setTimeout(() => {
            warnning.remove();
            signUpButton.disabled = false;
            signUpButton.style.opacity = '1';
        }, 3000);

    } else if (email.value.includes('@') === false || email.value.includes('.') === false || emailText.innerHTML !== 'Email is valid!') {
        warnning.innerHTML = 'Email is not valid! <br> Please try again.';
        document.body.appendChild(warnning);
        signUpButton.disabled = true;
        signUpButton.style.opacity = '0.3';

        setTimeout(() => {
            warnning.remove();
            signUpButton.disabled = false;
            signUpButton.style.opacity = '1';
        }, 3000);
    } else if (localStorageUsers.find(user => user.username === username.value || user.email === email.value || user.phone === phone.value)) {

        warnning.innerHTML = 'This user already exists! <br> Please try again or Log in.';
        document.body.appendChild(warnning);
        signUpButton.disabled = true;
        signUpButton.style.opacity = '0.3';


        setTimeout(() => {
            warnning.remove();
            signUpButton.disabled = false;
            signUpButton.style.opacity = '1';
        }, 3000);



    } else if (phone.value.length !== 10 || phoneText.innerHTML !== 'Phone number is valid!') {

        warnning.innerHTML = 'Phone number is not valid! <br> Please try again.';
        document.body.appendChild(warnning);
        signUpButton.disabled = true;
        signUpButton.style.opacity = '0.3';

        setTimeout(() => {
            warnning.remove();
            signUpButton.disabled = false;
            signUpButton.style.opacity = '1';
        }, 3000);


    } else {



        const user = {
            id: localStorageUsers.length + 1,
            username: username.value,
            password: password.value,
            email: email.value,
            phone: phone.value,
            address: address.value,
            birthDay: birthDay.value,
            city: city.value,
            country: country.value,
            petName: petName.value,
            nameOfFather: nameOfFather.value,
            oldLastNameOfMother: oldLastNameOfMother.value
        }


        localStorageUsers.push(user);
        localStorage.setItem('users', JSON.stringify(localStorageUsers));
        const allInputs = document.querySelectorAll('input');
        allInputs.forEach(input => {
            input.value = '';
        });
        const signedSuccessfully = document.createElement('div');
        signedSuccessfully.id = 'signedSuccessfully';
        signedSuccessfully.innerHTML = 'You Have Signed Up Successfully';
        document.body.appendChild(signedSuccessfully);
        setTimeout(() => {
            signedSuccessfully.remove();
        }, 3000);




    }
});


