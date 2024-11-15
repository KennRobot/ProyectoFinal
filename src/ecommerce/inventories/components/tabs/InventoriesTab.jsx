import { Box } from "@mui/material";
import InventoriesTable from "../tables/InventoriesTable";

const InventoriesTab = ({ inventories, loading }) => {
    return (
        <Box>
            <InventoriesTable inventories={inventories} loading={loading} />
        </Box>
    );
};

export default InventoriesTab;
