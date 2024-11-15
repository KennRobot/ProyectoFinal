import { Box, Tabs, Tab } from "@mui/material";
import React, { useState } from "react";

const InstitutesTabs = ["Institutos", "Negocios"];

const InstitutesNavTab = ({ currentRowInInstitutesTab, setCurrentTabInPrincipalTab }) => {
    const [currenTabIndex, setCurrentTabIndex] = useState(0);

    const handleChange = (e) => {
        console.log("Entro al handleChange", e.target.innerText.toUpperCase());

        // Actualizar el nombre de la pestaña seleccionada usando la función correcta
        setCurrentTabInPrincipalTab(e.target.innerText.toUpperCase());

        // Cambiar el índice de la pestaña actual según la pestaña seleccionada
        switch (e.target.innerText.toUpperCase()) {
            case "INSTITUTOS":
                setCurrentTabIndex(0);
                break;
            case "NEGOCIOS":
                setCurrentTabIndex(1);
                break;
        }
    };

    return (
        <Box sx={{ border: (theme) => `2px solid ${theme.palette.divider}`, mx: 1, padding: 0.5 }}>
            <Tabs
                value={currenTabIndex}
                variant="fullWidth"
                onChange={handleChange}
                aria-label="icon tabs example"
                textColor="primary"
            >
                {InstitutesTabs.map((tab) => (
                    <Tab key={tab} label={tab} disabled={currentRowInInstitutesTab === null} />
                ))}
            </Tabs>
        </Box>
    );
};

export default InstitutesNavTab;
