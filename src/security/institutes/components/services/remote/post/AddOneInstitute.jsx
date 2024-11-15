import axios from "axios";

export function AddOneInstitute(institute) {
    
    console.log("<<EJECUTA>> API <<AddOneInstitute>> Requiere:", institute)
    return new Promise((resolve, reject) => {
      //FIC: URL = http://localhost:8080/api/pwa/institutes
      //axios.get("http://localhost:8080/api/pwa/institute")
      axios.post(import.meta.env.VITE_REST_API_SECURITY_ECOMMERCE + 'api/v1/institutes', institute)
        .then((response) => {
          console.log("<<RESPONSE>> AddOneInstitute", institute)
          const data = response.data;
          //console.log("<<RESPONSE>> DATA:", data);
          if (!data.success) {  
            console.error("<<ERROR>> <<NO>> se ejecuto la API <<AddOneInstitute>> de forma correcta", data);
            reject(data); 
          } else if (data.success) {
             resolve(data);
          }
        })
        .catch((error) => {
          console.error("<<ERROR>> en API <<AddOneInstitute>>", error);
          reject(error); 
        });     
    });
 }