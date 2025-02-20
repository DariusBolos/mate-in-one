import axios from 'axios';
import {User} from '../types/User';

const userUrl = "http://localhost:3000/user";

async function saveUser(user: User){
    await axios.post(userUrl, user)
    .then(response => {
        console.log(response);
        window.location.href = "http://localhost:5173/login";
    })
    .catch(error => console.log(error));
}

async function getUser(email: String, password: String){
    await axios.get(userUrl, { params: {email, password} })
    .then(response => {
        console.log(response);
        window.location.href = "http://localhost:5173/dashboard";
    })
    .catch(error => {
        console.log(error);
        alert("Invalid credentials");
    });
}

export { saveUser, getUser };
