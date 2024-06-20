import axios from 'axios';
import Cookies from "universal-cookie"

const cookies = new Cookies()

const Axios = axios.create({
    baseURL: 'http://127.0.0.1:8000/server',
});

// Setup Axios
// axios.defaults.withCredentials = true
// axios.defaults.credentials = "same-origin"

// Configuración de headers para manejar multipart/form-data
Axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

// Configuración del nombre del cookie y header para el token CSRF
Axios.defaults.xsrfCookieName = 'csrftoken';
Axios.defaults.xsrfHeaderName = 'X-CSRFToken';
Axios.defaults.headers.common['X-CSRFToken'] = cookies.get('csrftoken');


export default Axios;
