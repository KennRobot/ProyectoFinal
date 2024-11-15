import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Stack, Tooltip, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllInventories } from "../services/remote/get/GetAllInventories";
import AddInventoryModal from "../modals/AddInventoriesModal";

const InventoriesColumns = [
  {
    accessorKey: "_id",
    header: "ID",
    size: 150,
  },
  {
    accessorKey: "IdInstitutoOK",
    header: "ID Instituto",
    size: 150,
  },
  {
    accessorKey: "IdProdServOK",
    header: "ID Producto/Servicio",
    size: 150,
  },
  {
    accessorKey: "IdPresentaOK",
    header: "ID Presentación",
    size: 150,
  },
  {
    accessorKey: "negocios",
    header: "Negocios",
    Cell: ({ row }) => row.original.negocios?.length > 0 ? "Sí" : "No",
    size: 100,
  },
  {
    accessorKey: "series",
    header: "Series",
    Cell: ({ row }) => row.original.series?.length > 0 ? "Sí" : "No",
    size: 100,
  },
];

const InventoriesTable = () => {
  const [loadingTable, setLoadingTable] = useState(true);
  const [inventoriesData, setInventoriesData] = useState([]);
  const [addInventoryShowModal, setAddInventoryShowModal] = useState(false);

  const fetchData = async () => {
    try {
      const allInventoriesData = await getAllInventories();
      const validatedData = allInventoriesData.map((item) => ({
        _id: item._id || "No disponible",
        IdInstitutoOK: item.IdInstitutoOK || "No disponible",
        IdProdServOK: item.IdProdServOK || "No disponible",
        IdPresentaOK: item.IdPresentaOK || "No disponible",
        negocios: item.negocios || [],
        series: item.series || [],
      }));

      setInventoriesData(validatedData);
      setLoadingTable(false);
    } catch (error) {
      console.error("Error al obtener los inventarios:", error);
      setLoadingTable(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      <MaterialReactTable
        columns={InventoriesColumns}
        data={inventoriesData}
        state={{ isLoading: loadingTable }}
        initialState={{ density: "compact", showGlobalFilter: true }}
        renderTopToolbarCustomActions={() => (
          <Stack direction="row" sx={{ m: 1 }}>
            <Tooltip title="Agregar">
              <IconButton onClick={() => setAddInventoryShowModal(true)}>
                <AddCircleIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar">
              <IconButton>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Detalles">
              <IconButton>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      />

      {/* Modal para agregar inventario */}
      <AddInventoryModal
        showAddModal={addInventoryShowModal}
        setShowAddModal={setAddInventoryShowModal}
        fetchData={fetchData}
      />
    </Box>
  );
};

export default InventoriesTable;
