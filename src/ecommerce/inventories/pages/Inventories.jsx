import React, { useState, useEffect } from "react";
import InventoriesTab from "../components/tabs/InventoriesTab";
import { getAllInventories } from "../components/services/remote/get/GetAllInventories";
import AddInventoryModal from "../components/modals/AddInventoriesModal";
import axios from 'axios';


const Inventories = () => {
    const [inventories, setInventories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);

    // Función para obtener los inventarios
    const fetchInventories = async () => {
        try {
            const data = await getAllInventories();
            setInventories(data);
            setLoading(false);
        } catch (error) {
            console.error("Error al obtener los inventarios:", error);
        }
    };

    // Efecto para cargar los inventarios al inicio
    useEffect(() => {
        fetchInventories();
    }, []);

    // Función para manejar la adición de inventarios
    const handleInventoryAdded = () => {
        fetchInventories();
        setShowAddModal(false);
    };

    return (
        <div>
            <h2>Inventarios</h2>
            <InventoriesTab inventories={inventories} loading={loading} />

            {/* Modal para agregar inventario */}
            <AddInventoryModal
                showAddModal={showAddModal}
                setShowAddModal={setShowAddModal}
                onInventoryAdded={handleInventoryAdded}
            />
        </div>
    );
};

export default Inventories;
