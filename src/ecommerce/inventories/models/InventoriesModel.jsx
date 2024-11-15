import { getDetailRow } from "../helpers/Utils";

export function InventoriesModel() {
    let Inventories = {
        Serie: { type: String },
        Placa: { type: String },
        Observacion: { type: String, default: '' },
        inventarios_series_estatus_f: [{
            IdTipoEstatusOK: { type: String, required: true },
            Actual: { type: String, required: true },
            Observacion: { type: String, default: '' },
            detail_row: getDetailRow(),
        }],
        inventarios_series_estatus_v: [{
            IdTipoEstatusOK: { type: String, required: true },
            Actual: { type: String, required: true },
            Observacion: { type: String, default: '' },
            detail_row: getDetailRow(),
        }],
        inventarios_series_ubicacion: [{
            Ubicacion: { type: String, required: true },
            Actual: { type: String, required: true },
            detail_row: getDetailRow(),
        }],
        detail_row: getDetailRow(),
    };

    return Inventories;
};

