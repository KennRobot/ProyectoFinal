import React, { useState } from "react";
import {
    Dialog, DialogContent, DialogTitle, Typography, TextField,
    DialogActions, Alert, Box, Checkbox, FormControlLabel
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
// Helpers
import { InventoriesValues } from "../../helpers/InventoriesValues";
// Services
import { AddOneInventory } from "../services/remote/post/AddOneInventories";

const AddInventoryModal = ({ showAddModal, setShowAddModal, onInventoryAdded, fetchData }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            IdInstitutoOK: "",
            IdProdServOK: "",
            IdPresentaOK: "",
            IdNegocioOK: "",
            IdAlmacenOK: "",
            CantidadActual: 0,
            CantidadDisponible: 0,
            CantidadApartada: 0,
            StockMaximo: 0,
            StockMinimo: 0,
            Activo: false,
            Borrado: false,
        },
        validationSchema: Yup.object({
            IdInstitutoOK: Yup.string().required("Campo requerido"),
            IdProdServOK: Yup.string().required("Campo requerido"),
            IdPresentaOK: Yup.string().required("Campo requerido"),
            IdNegocioOK: Yup.string().required("Campo requerido"),
            IdAlmacenOK: Yup.string().required("Campo requerido"),
            CantidadActual: Yup.number().required("Campo requerido").min(0),
            CantidadDisponible: Yup.number().required("Campo requerido").min(0),
            CantidadApartada: Yup.number().required("Campo requerido").min(0),
            StockMaximo: Yup.number().required("Campo requerido").min(0),
            StockMinimo: Yup.number().required("Campo requerido").min(0),
        }),
        onSubmit: async (values) => {
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);
            setLoading(true);
        
            try {
                const inventory = {
                    ...values,
                    Activo: values.Activo ? 'S' : 'N',
                    Borrado: values.Borrado ? 'S' : 'N',
                };
        
                console.log("Enviando inventario:", inventory);
        
                // Enviamos la solicitud a la API
                const response = await AddOneInventory(inventory);
                console.log("Respuesta completa de la API:", response);  // Revisa la respuesta completa
        
                // Verificamos si la respuesta es exitosa
                if (response && ![200, 201].includes(response.status)) {
                    throw new Error(response.data?.message || "Error al crear inventario");
                }
        
                // Mensaje de éxito si todo salió bien
                setMensajeExitoAlert("Inventario creado y guardado correctamente");
        
                // Llamadas a las funciones para actualizar la UI
                console.log("Llamando a onInventoryAdded");
                onInventoryAdded && onInventoryAdded();
                console.log("Llamando a fetchData");
                fetchData();
        
                // Cerramos el modal de agregar inventario
                setShowAddModal(false);
            } catch (e) {
                console.error("Error al crear inventario:", e);
                setMensajeErrorAlert(e.message || "No se pudo crear el inventario");
            } finally {
                // Asegúrate de que el estado de 'Loading' se actualice
                setLoading(false);
                console.log("Estado de loading después del submit:", Loading);
            }
        },
        
        
    });

    const commonTextFieldProps = {
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        fullWidth: true,
        margin: "dense",
        disabled: !!mensajeExitoAlert,
    };

    return (
        <Dialog open={showAddModal} onClose={() => setShowAddModal(false)} fullWidth>
            <form onSubmit={formik.handleSubmit}>
            <DialogTitle>
  <Typography variant="h6" component="div">
    <strong>Agregar Nuevo Inventario</strong>
  </Typography>
</DialogTitle>

                <DialogContent sx={{ display: 'flex', flexDirection: 'column' }} dividers>
                    <TextField id="IdInstitutoOK" label="ID Instituto*" {...commonTextFieldProps}
                        value={formik.values.IdInstitutoOK}
                        error={formik.touched.IdInstitutoOK && Boolean(formik.errors.IdInstitutoOK)}
                        helperText={formik.touched.IdInstitutoOK && formik.errors.IdInstitutoOK}
                    />
                    <TextField id="IdProdServOK" label="ID Producto/Servicio*" {...commonTextFieldProps}
                        value={formik.values.IdProdServOK}
                        error={formik.touched.IdProdServOK && Boolean(formik.errors.IdProdServOK)}
                        helperText={formik.touched.IdProdServOK && formik.errors.IdProdServOK}
                    />
                    <TextField id="IdPresentaOK" label="ID Presentación*" {...commonTextFieldProps}
                        value={formik.values.IdPresentaOK}
                        error={formik.touched.IdPresentaOK && Boolean(formik.errors.IdPresentaOK)}
                        helperText={formik.touched.IdPresentaOK && formik.errors.IdPresentaOK}
                    />
                    <TextField id="IdNegocioOK" label="ID Negocio*" {...commonTextFieldProps}
                        value={formik.values.IdNegocioOK}
                        error={formik.touched.IdNegocioOK && Boolean(formik.errors.IdNegocioOK)}
                        helperText={formik.touched.IdNegocioOK && formik.errors.IdNegocioOK}
                    />
                    <TextField id="IdAlmacenOK" label="ID Almacén*" {...commonTextFieldProps}
                        value={formik.values.IdAlmacenOK}
                        error={formik.touched.IdAlmacenOK && Boolean(formik.errors.IdAlmacenOK)}
                        helperText={formik.touched.IdAlmacenOK && formik.errors.IdAlmacenOK}
                    />
                    <TextField id="CantidadActual" label="Cantidad Actual*" type="number" {...commonTextFieldProps}
                        value={formik.values.CantidadActual}
                        error={formik.touched.CantidadActual && Boolean(formik.errors.CantidadActual)}
                        helperText={formik.touched.CantidadActual && formik.errors.CantidadActual}
                    />
                    <TextField id="CantidadDisponible" label="Cantidad Disponible*" type="number" {...commonTextFieldProps}
                        value={formik.values.CantidadDisponible}
                        error={formik.touched.CantidadDisponible && Boolean(formik.errors.CantidadDisponible)}
                        helperText={formik.touched.CantidadDisponible && formik.errors.CantidadDisponible}
                    />
                    <TextField id="CantidadApartada" label="Cantidad Apartada*" type="number" {...commonTextFieldProps}
                        value={formik.values.CantidadApartada}
                        error={formik.touched.CantidadApartada && Boolean(formik.errors.CantidadApartada)}
                        helperText={formik.touched.CantidadApartada && formik.errors.CantidadApartada}
                    />
                    <TextField id="StockMaximo" label="Stock Máximo*" type="number" {...commonTextFieldProps}
                        value={formik.values.StockMaximo}
                        error={formik.touched.StockMaximo && Boolean(formik.errors.StockMaximo)}
                        helperText={formik.touched.StockMaximo && formik.errors.StockMaximo}
                    />
                    <TextField id="StockMinimo" label="Stock Mínimo*" type="number" {...commonTextFieldProps}
                        value={formik.values.StockMinimo}
                        error={formik.touched.StockMinimo && Boolean(formik.errors.StockMinimo)}
                        helperText={formik.touched.StockMinimo && formik.errors.StockMinimo}
                    />
                    <FormControlLabel control={<Checkbox id="Activo" checked={formik.values.Activo} onChange={formik.handleChange} />}
                        label="Activo" />
                    <FormControlLabel control={<Checkbox id="Borrado" checked={formik.values.Borrado} onChange={formik.handleChange} />}
                        label="Borrado" />
                </DialogContent>
                <DialogActions>
                    <Box m="auto">
                        {mensajeErrorAlert && <Alert severity="error"><b>¡ERROR!</b> {mensajeErrorAlert}</Alert>}
                        {mensajeExitoAlert && <Alert severity="success"><b>¡ÉXITO!</b> {mensajeExitoAlert}</Alert>}
                    </Box>
                    <LoadingButton color="secondary" startIcon={<CloseIcon />} variant="outlined" onClick={() => setShowAddModal(false)}>CERRAR</LoadingButton>
                    <LoadingButton color="primary" startIcon={<SaveIcon />} variant="contained" type="submit" disabled={!!mensajeExitoAlert} loading={Loading}>GUARDAR</LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddInventoryModal;

