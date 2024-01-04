const Product = require('../models/product.model');
exports.getProducts = async (req, res) => {
    try {
      const products = await Product.find();
      return res.status(200).json({
        message: "Productos encontrados encontrados",
        data: products,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error al consultar usuarios",
        data: error,
      });
    }
  };
  exports.getProductsById = async (req, res) => {
    const productId=req.params.productId;
    try{
        const product = await Product.findOne({id: productId});
        return res.status(200).json({
            message : "Producto encontrado por ID: "+productId,
            data : product
        })
    }catch (error) {
        return res.status(404).json({
            message : "Error al consultar producto",
            data: error
        })
    }
}


exports.newProduct = async (req, res) => {
    try{
        const {id, saucerer_name, category, description, price} = req.body;
        const newProduct = new Product({id, saucerer_name, category, description, price});
        await newProduct.save();
        return res.status(200).json({
            message : "Producto registrado",
            data: newProduct
        })
    }catch (error) {
        return res.status(404).json({
            message : "Error al registrar la producto",
            data: error
        })
    }
}

exports.updateProduct = async (req, res) => {
    const productId=req.params.productId;
    newData = req.body;
    try{
        const updateProduct= await Product.findOneAndUpdate({id: productId}, newData, {new: true});
        return res.status(201).json({
            message : "Actualizando Producto encontrado por ID: "+productId,
            data: updateProduct
        })
    }catch (error) {
        return res.status(404).json({
            message : "Error al editar producto",
            data: error
        })
    }
}
exports.deleteProduct = async (req, res) => {
    const productId=req.params.productId;
    try{
        await Product.findOneAndDelete({id: productId});
        return res.status(201).json({
            message : "Producto eliminada encontrada por ID: "+productId
        })
    }catch (error) {
        return res.status(404).json({
            message : "Error al eliminar producto",
            data: error
        })
    }
}

