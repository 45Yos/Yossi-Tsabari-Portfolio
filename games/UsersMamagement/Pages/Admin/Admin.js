
// Get All Users From Local Storage
const localStorageUsers = JSON.parse(localStorage.getItem('users'));
const userTable = document.getElementById('userTable');
const container = document.getElementById('container');
const deleteSelectedButton = document.getElementById('deleteSelected');




// Log Out Button
const logOutButton = document.getElementById('logOutButton');
logOutButton.addEventListener('click', () => {
    window.location.href = '../../UsersMamagement.html';
    localStorage.setItem('isLogin', false);
});








// Sort Users By ID
function sortId() {
    localStorageUsers.sort((a, b) => a.id - b.id);
}
sortId();


// Check All Checkboxes
const allCheckboxes = document.querySelectorAll('.userCheckbox');
let checked = 0;


// Create Table For Each User
localStorageUsers.forEach(user => {
    const row = document.createElement('tr');

    const fields = [
        "id", "username", "password", "email", "phone", "address",
        "city", "country", "birthDay", "petName",
        "nameOfFather", "oldLastNameOfMother"
    ];

    const elements = {};

    fields.forEach(field => {
        elements[field] = document.createElement('td');
        elements[field].textContent = user[field];
        row.appendChild(elements[field]);

    });








    // Create Edit, Save, Delete Buttons
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'userCheckbox';


    checkbox.addEventListener('change', () => {
        const selectedCheckboxes = document.querySelectorAll('.userCheckbox:checked');

        if (selectedCheckboxes.length > 0) {
            deleteSelectedButton.style.display = 'inline-block';
        } else {
            deleteSelectedButton.style.display = 'none';
        }
    });






    // Edit Button
    const editButton = document.createElement('button');
    editButton.id = 'editButton';
    editButton.textContent = 'Edit';

    const saveButton = document.createElement('button');
    saveButton.id = 'saveButton';
    saveButton.textContent = 'Save';
    saveButton.style.display = 'none';

    let isEditing = false;
    let editclick = 0;

    editButton.addEventListener('click', () => {

        isEditing = true;
        editclick++;



        fields.forEach(field => {

            let count = 0;
            count++;
            if (isEditing) {

                if (field === 'id') {
                    return;
                } else {




                    const input = document.createElement('input');
                    input.type = 'text';
                    input.style.width = '80%';

                    const oldValue = elements[field].textContent;

                    input.value = elements[field].textContent;

                    elements[field].addEventListener('click', () => {


                        if (!elements[field].children[0]) {

                            elements[field].textContent = '';
                            elements[field].appendChild(input);

                            if (input.value === '') {
                                input.value = oldValue;
                            }

                            editclick++;
                            console.log(editclick);


                        }

                    })

                }
            }

        });

        editclick = 0;
        console.log(editclick);


        editButton.style.display = 'none';
        saveButton.style.display = 'inline-block';

    });




    saveButton.addEventListener('click', () => {


        function updateUser(element) {


            if (element.children.length > 0 && element.children[0].tagName === 'INPUT') {
                element.textContent = element.children[0].value;
            }

        }


        Object.values(elements).forEach(updateUser);


        const user = {
            id: elements.id.textContent,
            username: elements.username.textContent,
            password: elements.password.textContent,
            email: elements.email.textContent,
            phone: elements.phone.textContent,
            address: elements.address.textContent,
            city: elements.city.textContent,
            country: elements.country.textContent,
            birthDay: elements.birthDay.textContent,
            petName: elements.petName.textContent,
            nameOfFather: elements.nameOfFather.textContent,
            oldLastNameOfMother: elements.oldLastNameOfMother.textContent
        }


        console.log("User ID:", user.id);
        console.log("Local Storage Users:", localStorageUsers);









        const indexOfUser = localStorageUsers.findIndex(u => String(u.id) === String(user.id));
        console.log("User Index:", indexOfUser);


        if (indexOfUser !== -1) {
            localStorageUsers[indexOfUser] = user;
        } else {
            alert('User Not Found');
            return;
        }

        console.log("Updated Local Storage Users:", localStorageUsers);


        localStorage.setItem('users', JSON.stringify(localStorageUsers));

        editButton.style.display = 'inline-block';
        saveButton.style.display = 'none';


        console.log(localStorageUsers);


        isEditing = false;

    });



    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-delete';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        row.remove();
        localStorageUsers.splice(localStorageUsers.indexOf(user), 1);
        localStorage.setItem('users', JSON.stringify(localStorageUsers));
    });

    const tdEdit = document.createElement('td');
    tdEdit.id = 'tdEdit';
    tdEdit.appendChild(editButton);
    tdEdit.appendChild(saveButton);

    const tdDelete = document.createElement('td');
    tdDelete.id = 'tdDelete';
    tdDelete.appendChild(deleteButton);
    tdDelete.appendChild(checkbox);


    row.appendChild(tdEdit);
    row.appendChild(tdDelete);
    userTable.appendChild(row);
});









function addUser() {


    const fields = [
        { name: 'username', type: 'text', placeholder: 'Enter Username' },
        { name: 'password', type: 'password', placeholder: 'Enter Password' },
        { name: 'email', type: 'email', placeholder: 'Enter Email' },
        { name: 'phone', type: 'tel', placeholder: 'Enter Phone Number' },
        { name: 'address', type: 'text', placeholder: 'Enter Address' },
        { name: 'city', type: 'text', placeholder: 'Enter City' },
        { name: 'country', type: 'text', placeholder: 'Enter Country' },
        { name: 'birthday', type: 'date', placeholder: 'Enter Birth Date' },
        { name: 'petName', type: 'text', placeholder: 'Enter Pet Name' },
        { name: 'nameOfFather', type: 'text', placeholder: 'Enter Father Name' },
        { name: 'oldLastNameOfMother', type: 'text', placeholder: 'Enter Mother\'s Last Name' }
    ];


    const row = document.createElement('tr');
    row.id = 'row';
    userTable.appendChild(row);


    const id = document.createElement('td');
    let newId = localStorageUsers.length + 1;
    while (localStorageUsers.some(user => user.id === newId)) {
        newId++;
    }
    id.textContent = newId;
    row.appendChild(id);





    fields.forEach(field => {
        const td = document.createElement('td');
        const input = document.createElement('input');
        input.type = field.type;
        input.className = 'loginFormInput';
        input.name = field.name;
        td.appendChild(input);
        row.appendChild(td);
    });




    const tdSave = document.createElement('td');

    const saveButton = document.createElement('button');
    saveButton.id = 'saveButton';
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', () => {

        const username = row.children[1].children[0].value;
        const password = row.children[2].children[0].value;
        const email = row.children[3].children[0].value;
        const phone = row.children[4].children[0].value;
        const address = row.children[5].children[0].value;
        const city = row.children[6].children[0].value;
        const country = row.children[7].children[0].value;
        const birthDay = row.children[8].children[0].value;
        const petName = row.children[9].children[0].value;
        const nameOfFather = row.children[10].children[0].value;
        const oldLastNameOfMother = row.children[11].children[0].value;

        const user = {
            id: newId,
            username: username,
            password: password,
            email: email,
            phone: phone,
            address: address,
            city: city,
            country: country,
            birthDay: birthDay,
            petName: petName,
            nameOfFather: nameOfFather,
            oldLastNameOfMother: oldLastNameOfMother
        }

        localStorageUsers.push(user);

        localStorage.setItem('users', JSON.stringify(localStorageUsers));


        row.remove();
        const signedSuccessfully = document.createElement('div');
        signedSuccessfully.id = 'signedSuccessfully';
        signedSuccessfully.innerHTML = 'You Have Signed Up User Successfully';
        document.body.appendChild(signedSuccessfully);
        setTimeout(() => {
            signedSuccessfully.remove();
            window.location.reload();
        }, 3000);


    });


    tdSave.appendChild(saveButton);

    row.appendChild(tdSave);


}














function deleteUser(btn) {
    btn.parentElement.parentElement.remove();
}

function toggleSelectAll() {
    let checkboxes = document.querySelectorAll(".userCheckbox");
    let selectAll = document.getElementById("selectAll").checked;
    checkboxes.forEach(cb => cb.checked = selectAll);
    deleteSelectedButton.style.display = selectAll ? "inline-block" : "none";
}

function deleteSelected() {
    let checkboxes = document.querySelectorAll(".userCheckbox:checked");

    checkboxes.forEach(cb => {
        const element = localStorageUsers.find(user => user.username === cb.parentElement.parentElement.children[1].textContent);

        cb.parentElement.parentElement.remove();

        localStorageUsers.splice(localStorageUsers.indexOf(element), 1);
        localStorage.setItem('users', JSON.stringify(localStorageUsers));


        deleteSelectedButton.style.display = "none";


    });
}