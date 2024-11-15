require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conexión exitosa a MongoDB');
}).catch((err) => {
  console.error('Error de conexión a MongoDB:', err);
});

const inventorySchema = new mongoose.Schema({
  IdInstitutoOK: String,
  IdProdServOK: String,
  IdPresentaOK: String,
  negocios: [{
    IdNegocioOK: String,
    almacenes: [{
      IdAlmacenOK: String,
      Principal: String,
      CantidadActual: Number,
      CantidadDisponible: Number,
      CantidadApartada: Number,
      CantidadTransito: Number,
      CantidadMerma: Number,
      StockMaximo: Number,
      StockMinimo: Number,
    }],
  }],
  series: [{
    Serie: String,
    Placa: String,
    Observacion: String,
    estatus_fisico: [{
      IdTipoEstatusOK: String,
      Actual: String,
      Observacion: String,
      detail_row: {
        Activo: String,
        Borrado: String,
        detail_row_reg: [{
          FechaReg: Date,
          UsuarioReg: String,
        }],
      },
    }],
    estatus_venta: [{
      IdTipoEstatusOK: String,
      Actual: String,
      Observacion: String,
      detail_row: {
        Activo: String,
        Borrado: String,
        detail_row_reg: [{
          FechaReg: Date,
          UsuarioReg: String,
        }],
      },
    }],
  }],
}, { collection: 'Inventories' });

const Inventory = mongoose.model('Inventory', inventorySchema);

app.get('/api/v1/inventories', async (req, res) => {
  try {
    const inventarios = await Inventory.find();
    res.status(200).json({ success: true, data: inventarios });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/v1/inventories', async (req, res) => {
  try {
    console.log("Datos recibidos en el servidor:", req.body);
    const nuevoInventario = new Inventory(req.body);
    await nuevoInventario.save();
    res.status(201).json({ success: true, data: nuevoInventario });
  } catch (error) {
    console.error("Error al guardar el inventario:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/v1/inventories/:id', async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID del inventario desde los parámetros de la URL
    const updatedInventory = req.body; // Los datos actualizados del inventario

    // Actualizar el inventario en la base de datos
    const inventory = await Inventory.findByIdAndUpdate(id, updatedInventory, { new: true });

    // Si no se encuentra el inventario
    if (!inventory) {
      return res.status(404).json({ success: false, message: "Inventario no encontrado" });
    }

    // Devolver el inventario actualizado
    res.status(200).json({ success: true, data: inventory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});



app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
