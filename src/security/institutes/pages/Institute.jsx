import React, { useState, useEffect } from "react";
import InstitutesNavTab from "../components/tabs/InstitutesNavTab";
import InstitutesTab from "../components/tabs/InstitutesTab";
import BusinessTab from "../components/tabs/BusinessTab";
import { getAllInstitutes } from "../../institutes/components/services/remote/get/GetAllInstitutes"; // Asumiendo que esta función obtiene todos los institutos
import AddInstituteModal from "../components/modals/AddInstituteModal";

const Institutes = () => {
    // Estado para controlar el índice de la fila seleccionada en la pestaña de Institutos
    const [currentRowInInstitutesTab, setCurrentRowInInstitutesTab] = useState(0);
    
    // Estado para controlar la pestaña principal seleccionada ("INSTITUTOS" o "NEGOCIOS")
    const [currentTabInPrincipalTab, setCurrentTabInPrincipalTab] = useState("INSTITUTOS");
    
    // Estado para almacenar los institutos
    const [institutes, setInstitutes] = useState([]);
    
    // Estado para controlar la visibilidad del modal de agregar instituto
    const [AddInstituteShowModal, setAddInstituteShowModal] = useState(false);

    // Función para obtener los institutos
    const fetchInstitutes = async () => {
        try {
            const data = await getAllInstitutes(); // Llamada a la función de servicio
            setInstitutes(data);
        } catch (error) {
            console.error("Error al obtener los institutos:", error);
        }
    };

    // Efecto que se ejecuta al cargar el componente para obtener los institutos
    useEffect(() => {
        fetchInstitutes();
    }, []);

    // Función para manejar el evento después de agregar un instituto
    const handleInstituteAdded = () => {
        fetchInstitutes(); // Actualizar la lista de institutos
        setAddInstituteShowModal(false); // Cerrar el modal
    };

    return (
        <div>
            <InstitutesNavTab
                currentRowInInstitutesTab={currentRowInInstitutesTab}
                setCurrentTabInPrincipalTab={setCurrentTabInPrincipalTab} 
            />
            
            {currentTabInPrincipalTab === "INSTITUTOS" && (
                <InstitutesTab institutes={institutes} /> // Pasar los institutos al componente de la tabla
            )}

            {currentTabInPrincipalTab === "NEGOCIOS" && (
                <BusinessTab />
            )}

            {/* Modal para agregar un nuevo instituto */}
            <AddInstituteModal 
                AddInstituteShowModal={AddInstituteShowModal}
                setAddInstituteShowModal={setAddInstituteShowModal}
                onInstituteAdded={handleInstituteAdded} // Pasamos la función para actualizar la lista
            />
        </div>
    );
};

export default Institutes;
