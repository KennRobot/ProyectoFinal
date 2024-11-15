import { InventoriesModel } from "../models/InventoriesModel";
import {getDetailRow} from "./Utils"

// FIC: obtiene los valores capturados en la ventana modal
// enviados desde el evento onSubmit de Formik 
export const InventoriesValues = (values) => {
    let Inventory = InventoriesModel(); // Cambié el nombre del modelo a InventoryModel
    Inventory.Serie = values.Serie;
    Inventory.Placa = values.Placa;
    Inventory.Observacion = values.Observacion;
    Inventory.inventarios_series_estatus_f = values.inventarios_series_estatus_f;
    Inventory.inventarios_series_estatus_v = values.inventarios_series_estatus_v;
    Inventory.inventarios_series_ubicacion = values.inventarios_series_ubicacion;
    Inventory.detail_row = getDetailRow(); // Agregado para definir el campo detail_row con valores predeterminados

    return Inventory;
};
