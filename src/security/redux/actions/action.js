import axios from 'axios';


import axios from 'axios';
export async function getInstitutesAll() {
    let result = await axios.get(`${import.meta.env.VITE_REST_API_SECURITY_ECOMMERCE}/institutos`);
	console.log('<<AXIOS-INSTITUTOS>>: ', result.data);
	return result.data;
}