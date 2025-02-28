let isLogin = localStorage.getItem('isLogin');



if (isLogin === 'true') {
    window.location.href = './Pages/Admin/Admin.html';
}






//Log In Window
const logInScreen = document.createElement('div');
logInScreen.id = 'logInScreen';

document.body.appendChild(logInScreen);


const logInDiv = document.createElement('div');
logInDiv.id = 'logInDiv';


logInScreen.appendChild(logInDiv);


const logInTitle = document.createElement('h1');
logInTitle.id = 'logInTitle';
logInTitle.innerHTML = 'Log In';
logInDiv.appendChild(logInTitle);


const formDiv = document.createElement('div');
formDiv.id = 'formDiv';
logInDiv.appendChild(formDiv);


const logInForm = document.createElement('form');
logInForm.id = 'logInForm';


formDiv.appendChild(logInForm);


const usernameTitleDiv = document.createElement('div');
formDiv.appendChild(usernameTitleDiv);


const usernameTitle = document.createElement('label');
usernameTitle.className = 'loginFormText';
usernameTitle.innerHTML = 'Username';
usernameTitleDiv.appendChild(usernameTitle);


const usernameInputDiv = document.createElement('div');
formDiv.appendChild(usernameInputDiv);

const usernameInput = document.createElement('input');
usernameInput.className = 'loginFormInput';
usernameInput.type = 'text';
usernameInputDiv.appendChild(usernameInput);


const passwordTitleDiv = document.createElement('div');
formDiv.appendChild(passwordTitleDiv);


const passwordTitle = document.createElement('label');
passwordTitle.className = 'loginFormText';
passwordTitle.innerHTML = 'Password';
passwordTitleDiv.appendChild(passwordTitle);


const passwordInputDiv = document.createElement('div');
formDiv.appendChild(passwordInputDiv);


const passwordInput = document.createElement('input');
passwordInput.className = 'loginFormInput';
passwordInput.type = 'password';
passwordInputDiv.appendChild(passwordInput);













//Log In Button
const logInButton = document.createElement('button');
logInButton.id = 'logInButton';
logInButton.innerHTML = 'Log In';
logInButton.addEventListener('click', () => {
    const localStorageUsers = JSON.parse(localStorage.getItem('users'));
    const username = usernameInput.value;
    const password = passwordInput.value;

    if (localStorageUsers && localStorageUsers.find(user => user.username === username && user.password === password)) {
        isLogin = true;
        window.location.href = './Pages/Admin/Admin.html';
        localStorage.setItem('isLogin', true);
    } else {
        const errorPopup = document.createElement('div');
        errorPopup.id = 'errorPopup';
        errorPopup.innerText = 'Incorrect username or password';
        document.body.appendChild(errorPopup);

        setTimeout(() => {
            errorPopup.remove();
        }, 3000);

    }
});








//Enter Key Down
document.addEventListener('keydown', (event) => {

    if (event.key === 'Enter' && document.activeElement.tagName === 'INPUT') {
        logInButton.click();
    }

})


logInDiv.appendChild(logInButton);







//Not Singed Up?
const notSingedUpDiv = document.createElement('div');
notSingedUpDiv.id = 'notSingedUpDiv';
logInDiv.appendChild(notSingedUpDiv);


const notSingedUpText = document.createElement('p');
notSingedUpText.id = 'notSingedUpText';
notSingedUpText.innerHTML = 'Not signed up yet?';
notSingedUpDiv.appendChild(notSingedUpText);








//Sign Up Button
const signUpButtonLink = document.createElement('a');
signUpButtonLink.href = './Pages/SignUp/signUp.html';
notSingedUpDiv.appendChild(signUpButtonLink);


const signUpButton = document.createElement('button');
signUpButton.id = 'signUpButton';
signUpButton.innerHTML = 'Sign Up';

signUpButtonLink.appendChild(signUpButton);
