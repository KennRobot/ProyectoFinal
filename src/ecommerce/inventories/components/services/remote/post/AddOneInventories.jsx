import axios from "axios";

export const AddOneInventory = async (inventory) => {
    try {
        const response = await axios.post("http://localhost:3000/api/v1/inventories", inventory);
        return response;
    } catch (error) {
        console.error("Error en AddOneInventory:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Error al realizar la solicitud");
    }
};

