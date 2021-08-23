import axios from 'axios';


var accesToken =   localStorage.getItem("token");
  


const axios_client = axios.create({
    baseURL: 'http://localhost:3001/',
    headers:{
		Authorization:`Bearer ${accesToken}`
	},

});


export default axios_client