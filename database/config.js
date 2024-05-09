const { default: mongoose } = require("mongoose");


const dbConnection = async () => {

  try {

    await mongoose.connect(process.env.DB_CNN_STRING + "chat_user");

    console.log("DB Online");

  } catch (error) {
    console.error(error);
    throw new Error("Error en la base de datos");

  }

};

module.exports = {
  dbConnection,
};