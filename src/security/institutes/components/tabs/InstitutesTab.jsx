import { Box } from "@mui/material";
import { useState } from "react";
import InstitutesTable from "../tables/InstitutesTable";

export default function InstitutesTab() {
    return (
      <Box>
  
            <h2>Tab con la tabla de la coleccion de Institutos</h2>
            {/* Renderiza la tabla de institutos */}
            <InstitutesTable />
  
      </Box>
  
    );  
  
  }