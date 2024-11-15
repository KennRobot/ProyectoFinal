// FIC: genera subdocumento detail_row
// Si no se envían los parámetros, asigna valores por defecto
export const getDetailRow = (activo = "S", borrado = "N", usuarioReg = "SYSTEM") => {
    return {
        Activo: activo,
        Borrado: borrado,
        detail_row_reg: [getDetailRowReg(usuarioReg)],
    };
};

// FIC: genera subdocumento array detail_row_reg
// Si no se envía el parámetro, asigna el valor por defecto
export const getDetailRowReg = (usuarioReg = "SYSTEM") => {
    return {
        FechaReg: Date.now(),
        UsuarioReg: usuarioReg,
    };
};

