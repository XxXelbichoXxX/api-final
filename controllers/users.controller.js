const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.registerUser = async (req, res) => {
  try {
    const { userName, email, password, wShift, photo } = req.body;
    const exisingUser = await User.findOne({ userName });
    if (exisingUser) {
      return res.status(400).json({
        message: "El usuario ya existe",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      wShift,
      photo,
    });
    await newUser.save();
    return res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    res.status(500).json({  message: "Error al registrar el usuario", error });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      message: "Usuarios encontrados",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al consultar usuarios",
      data: error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { userName, password, wShift } = req.body;
    await User.findOne({ userName })
      .then(async (user) => {
        if (!user) {
          return res.status(404).json({
            error: "Credenciales invalidas",
          });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(400).json({
            error: "Contraseña incorrecta",
          });
        }
        const token = jwt.sign({ userName: user.userName }, "secreto", {
          expiresIn: "8h",
        });

        let formatUser = {
          _id: user._id,
          userName: user.userName,
          wShift: user.wShift,
        };
        return res.status(200).json({
          user: formatUser,
          token: token,
          action: "login",
        });
      })
      .catch((err) => {
        return res.status(404).json({
          action: "login",
          error: error,
        });
      });
  } catch (error) {
    return res.status(404).json({
      error: "Error al iniciar sesion",
    });
  }
};

exports.getUserInfo = async (req, res) => {
  const userName = req.params.userName;
  try {
    const user = await User.findOne({ userName }, { userName: 1, photo: 1, role: 1 });

    if (user) {
      const { userName, photo, role } = user;
      return res.status(200).json({ userName, photo, role });
    } else {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener información del usuario', error });
  }
};

exports.updateUser = async (req, res) => {
  const userName=req.params.userName;
  const newData = req.body;
  try{
      const updateUser= await User.findOneAndUpdate({userName: userName}, newData, {new: true});
      return res.status(201).json({
          message : "Actualizando empleado encontrado por ID: "+userName,
          data: updateUser
      })
  }catch (error) {
      return res.status(404).json({
          message : "Error al editar empleado",
          data: error
      })
  }
}

exports.deleteUser = async (req, res) => {
    const userName = req.params.userName;
    try {
        const deletedUser = await User.findOneAndDelete({ userName: userName });

        if (!deletedUser) {
            return res.status(404).json({
                message: "Usuario no encontrado",
                data: null,
            });
        }

        return res.status(200).json({
            message: "Usuario eliminado por nombre de usuario: " + userName,
            data: deletedUser,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al eliminar el usuario",
            data: error,
        });
    }
};
