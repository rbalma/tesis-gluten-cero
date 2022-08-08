const User = require("../models/user");
const path = require("path");


const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');

const configuracionMulter = {
    // 1 Mb
    limits: { fileSize : 1000001 },
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads/avatar');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if ( file.mimetype === 'image/jpeg' ||  file.mimetype ==='image/png' ) {
            cb(null, true);
        } else {
            cb(new Error('La extension de la imagen no es válida. (Extensiones permitidas: .png y .jpg'))
        }
    },
}

// pasar la configuración y el campo
const upload = multer(configuracionMulter).single('avatar');

// Sube un archivo 
const subirArchivo = (req, res, next) => {
  upload(req, res, function(error) {
      if(error) {
          if(error instanceof multer.MulterError){
              if(error.code === 'LIMIT_FILE_SIZE') {
                  res.status(404).send({mensaje: 'La imagen es muy grande. Límite de 1 MB'});
              } else {
                res.status(404).send({mensaje: error.message})
              }
          } else if(error.hasOwnProperty('message')) {
            res.status(404).send({message: error.message})
          } 
      }
      return next();
  })
}


const register = async(req, res, next) => {
  const { name, lastname, email, password } = req.body;

  try {
    const newUser = {
      name,
      lastname,
      email: email.toLowerCase(),
      dicebear: `https://avatars.dicebear.com/api/bottts/${lastname}.svg?background=%23fbf9f9`,
      password
    }

    const user = await User.create( newUser );

    return res.status(201).json({ ok: true, user });

  } catch (error) {
    //return res.status(500).json({ ok: false, message: error.message });
    next(error);
  }

}


function getUserById(req, res) {
  const params = req.params;

  User.findById({_id: params.id}, (err, userData) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!userData) {
        res.status(404).send({ message: "No se ha encontrado ningun usuario." });
      } else {
        let user = userData;
        res.status(200).send({ user });
    }
  }});
}


const getUsers = async(req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page,
    limit: parseInt(limit),
  };
  try {
    const users = await User.paginate({}, options);
    res.json({ ok: true, users });
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Error" + error });
  }
}


const getUsersActive = async (req, res) => {
  const { page = 1, limit = 5, active } = req.query;
  
  const options = {
    page,
    limit: parseInt(limit),
  };

  try {
    const users = await User.paginate({ active }, options);
    res.json({
      ok: true,
      users,
    });
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Error" + error });
  }
};


function uploadAvatar(req, res) {
  const params = req.params;
  let imagenAnteriorPath = '';
  User.findById({ _id: params.id }, (err, userData) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!userData) {
        res.status(404).send({ message: "No se ha encontrado ningun usuario." });
      } else {
        let user = userData;

          if(userData.avatar){
          imagenAnteriorPath = __dirname + `/../uploads/avatar/${userData.avatar}`;
          }

        if (req.file) {
            user.avatar = req.file.filename;
            user.avatarUrl = `/api/v1/get-avatar/${req.file.filename}`
            User.findByIdAndUpdate(
              { _id: params.id },
              user,
              (err, userResult) => {
                if (err) {
                  res.status(500).send({ message: "Error del servidor." });
                } else {
                  if (!userResult) {
                    res
                      .status(404)
                      .send({ message: "No se ha encontrado ningun usuario." });
                  } else {
                        res.status(200).send({ avatarName: user.avatar });
                    
                if(imagenAnteriorPath){  
                     //Eliminar archivo con filesystem
                    fs.unlink(imagenAnteriorPath, (err) => {
                       if (err) {
                         console.log("El avatar no se pudo eliminar del File System.")
                       } 
                    })
                  }

                  }
                }
              }
        );
      }
    }}
  });
}


function getAvatar(req, res) {
  const avatarName = req.params.avatarName;
  const filePath = "./uploads/avatar/" + avatarName;

  fs.exists(filePath, exists => {
    if (!exists) {
      res.status(404).send({ message: "El avatar que buscas no existe." });
    } else {
      res.sendFile(path.resolve(filePath));
    }
  });
}


async function updateUser(req, res) {
  let userData = req.body;
  userData.email = req.body.email.toLowerCase();
  const params = req.params;

  if (userData.password) {
    await bcrypt.hash(userData.password, null, null, (err, hash) => {
      if (err) {
        res.status(500).send({ message: "Error al encriptar la contraseña." });
      } else {
        userData.password = hash;
      }
    });
  }
  
  User.findByIdAndUpdate({ _id: params.id }, userData, (err, userUpdate) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!userUpdate) {
        res
          .status(404)
          .send({ message: "No se ha encontrado ningun usuario." });
      } else {
        res.status(200).send({ message: "Usuario actualizado correctamente." });
      }
    }
  });
}

// Para activar o desactivar el usuario
function activateUser(req, res) {
  const { id } = req.params;
  const { active } = req.body;

  User.findByIdAndUpdate(id, { active }, (err, userStored) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!userStored) {
        res.status(404).send({ message: "No se ha encontrado el usuario." });
      } else {
        if (active === true) {
          res.status(200).send({ message: "Usuario activado correctamente." });
        } else {
          res
            .status(200)
            .send({ message: "Usuario desactivado correctamente." });
        }
      }
    }
  });
}

// Borrar un usuario
function deleteUser(req, res) {
  const { id } = req.params;

  User.findByIdAndRemove(id, (err, userDeleted) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!userDeleted) {
        res.status(404).send({ message: "Usuario no encontrado." });
      } else {
        const imagenAnteriorPath = __dirname + `/../uploads/avatar/${userDeleted.avatar}`;
        //Eliminar archivo con filesystem
        fs.unlink(imagenAnteriorPath, (err) => {
          if (err) {
            res.status(404).send({
              message: "El avatar no se pudo eliminar del File System."
            });
          } else {
            res.status(200).send({
              message: "El usuario ha sido eliminado correctamente."
            });
          }
        })
      }
    }
  });
}

// Registrar un usuario en el panel Admin
function signUpAdmin(req, res) {
  const user = new User();

  const { name, lastname, email, role, password } = req.body;
  user.name = name;
  user.lastname = lastname;
  user.email = email.toLowerCase();
  user.role = role;
  user.active = true;
  user.avatarUrl = '';
  user.avatar = '';
  user.dicebear = `https://avatars.dicebear.com/api/bottts/${lastname}.svg?background=%23003`;

  if (!password) {
    res.status(500).send({ message: "La contraseña es obligatoria. " });
  } else {
    bcrypt.hash(password, null, null, (err, hash) => {
      if (err) {
        res.status(500).send({ message: "Error al encriptar la contraseña." });
      } else {
        user.password = hash;

        user.save((err, userStored) => {
          if (err) {
            res.status(500).send({ message: "El usuario ya existe." });
          } else {
            if (!userStored) {
              res
                .status(500)
                .send({ message: "Error al crear el nuevo usuario." });
            } else {
              // res.status(200).send({ user: userStored });
              res
                .status(200)
                .send({ message: "Usuario creado correctamente." });
            }
          }
        });
      }
    });
  }
}


const addFavRecipe = async (req, res) => {
  const {idRecipe} = req.params;

  try {
    const user = req.user.id;
    const userDB = await User.findByIdAndUpdate(user, { $push: { favRecipes: idRecipe } }, {new: true});

    res.json({
      ok: true,
      user: userDB
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Hable con el administrador",
    });
  }
};

const deleteFavRecipe = async(req, res) => {
  const { idRecipe } = req.params;
  const id = req.user.id;
  try {
      await User.findByIdAndUpdate(id, { $pull: {favRecipes: idRecipe } } );
      res.json({ ok: true });
  } catch (error) {
      console.log(error);
     res.status(500).json({
          ok: false,
          message: 'Hable con el administrador'
      });
  }

}

//Recetas favoritas con información para completar la tabla del perfil
const getFavRecipeByUser= async(req, res) => {
  const { idUser } = req.params;
  const user = await User.findById(idUser, 'name lastname').populate({
    path : 'favRecipes',
    select: 'title category image'
  });
  res.json({
      ok: true,
      user
  });
}

//Recetas favoritas de un usuario
const getFavRecipes= async(req, res) => {
  const { idUser } = req.params;
  const user = await User.findById(idUser, 'favRecipes');
  res.json({
      ok: true,
      fav: user.favRecipes
  });
}



module.exports = {
    register,
    getUserById,
    getUsers,
    getUsersActive,
    subirArchivo,
    uploadAvatar,
    getAvatar,
    updateUser,
    activateUser,
    deleteUser,
    signUpAdmin,
    addFavRecipe,
    deleteFavRecipe,
    getFavRecipeByUser,
    getFavRecipes
};

