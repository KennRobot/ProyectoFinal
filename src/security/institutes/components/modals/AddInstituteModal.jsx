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
import { InstituteValues } from "../../helpers/InstituteValues";
// Services
import { AddOneInstitute } from "../services/remote/post/AddOneInstitute";

const AddInstituteModal = ({ AddInstituteShowModal, setAddInstituteShowModal, onInstituteAdded, fetchData }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            IdInstitutoOK: "",
            IdInstitutoBK: "",
            DesInstituto: "",
            Matriz: false,
            IdTipoGiroOK: "",
            IdInstitutoSupOK: ""
        },
        validationSchema: Yup.object({
            IdInstitutoOK: Yup.string().required("Campo requerido"),
            IdInstitutoBK: Yup.string().required("Campo requerido"),
            DesInstituto: Yup.string().required("Campo requerido"),
            Matriz: Yup.bool().required("Campo requerido"),
            IdTipoGiroOK: Yup.string()
                .required("Campo requerido")
                .matches(/^[a-zA-Z0-9-]+$/, 'Solo se permiten caracteres alfanuméricos y el simbolo "-"'),
            IdInstitutoSupOK: Yup.string(),
        }),
        onSubmit: async (values) => {
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);
            setLoading(true);
            try {
                const Institute = InstituteValues({
                    ...values,
                    Matriz: values.Matriz ? 'S' : 'N'
                });
                await AddOneInstitute(Institute); // Agregar el nuevo instituto
                setMensajeExitoAlert("Instituto fue creado y guardado Correctamente");

                // Notificar al componente padre que se agregó un instituto
                if (onInstituteAdded) {
                    onInstituteAdded(); // Llamar la función para actualizar la lista
                }
                fetchData();
            } catch (e) {
                setMensajeErrorAlert("No se pudo crear el Instituto");
            }
            setLoading(false);
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
        <Dialog open={AddInstituteShowModal} onClose={() => setAddInstituteShowModal(false)} fullWidth>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    <Typography component="h6">
                        <strong>Agregar Nuevo Instituto</strong>
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column' }} dividers>
                    <TextField id="IdInstitutoOK" label="IdInstitutoOK*" value={formik.values.IdInstitutoOK} {...commonTextFieldProps}
                        error={formik.touched.IdInstitutoOK && Boolean(formik.errors.IdInstitutoOK)}
                        helperText={formik.touched.IdInstitutoOK && formik.errors.IdInstitutoOK}
                    />
                    <TextField id="IdInstitutoBK" label="IdInstitutoBK*" value={formik.values.IdInstitutoBK} {...commonTextFieldProps}
                        error={formik.touched.IdInstitutoBK && Boolean(formik.errors.IdInstitutoBK)}
                        helperText={formik.touched.IdInstitutoBK && formik.errors.IdInstitutoBK}
                    />
                    <TextField id="DesInstituto" label="DesInstituto*" value={formik.values.DesInstituto} {...commonTextFieldProps}
                        error={formik.touched.DesInstituto && Boolean(formik.errors.DesInstituto)}
                        helperText={formik.touched.DesInstituto && formik.errors.DesInstituto}
                    />
                    <FormControlLabel control={<Checkbox id="Matriz" checked={formik.values.Matriz} onChange={formik.handleChange} name="Matriz" color="primary" />}
                        label="Matriz*" />
                    <TextField id="IdTipoGiroOK" label="IdTipoGiroOK*" value={formik.values.IdTipoGiroOK} {...commonTextFieldProps}
                        error={formik.touched.IdTipoGiroOK && Boolean(formik.errors.IdTipoGiroOK)}
                        helperText={formik.touched.IdTipoGiroOK && formik.errors.IdTipoGiroOK}
                    />
                    <TextField id="IdInstitutoSupOK" label="IdInstitutoSupOK" value={formik.values.IdInstitutoSupOK} {...commonTextFieldProps}
                        error={formik.touched.IdInstitutoSupOK && Boolean(formik.errors.IdInstitutoSupOK)}
                        helperText={formik.touched.IdInstitutoSupOK && formik.errors.IdInstitutoSupOK}
                    />
                </DialogContent>
                <DialogActions sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box m="auto">
                        {mensajeErrorAlert && <Alert severity="error"><b>¡ERROR!</b> ─ {mensajeErrorAlert}</Alert>}
                        {mensajeExitoAlert && <Alert severity="success"><b>¡ÉXITO!</b> ─ {mensajeExitoAlert}</Alert>}
                    </Box>
                    <LoadingButton color="secondary" startIcon={<CloseIcon />} variant="outlined" onClick={() => setAddInstituteShowModal(false)}>CERRAR</LoadingButton>
                    <LoadingButton color="primary" startIcon={<SaveIcon />} variant="contained" type="submit" disabled={!!mensajeExitoAlert} loading={Loading}>GUARDAR</LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddInstituteModal;
