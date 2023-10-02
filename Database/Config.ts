import { connect } from "mongoose";

const dbConection = async () => {
  try {
    await connect(process.env["MONGODB_CNN"] || "");
    console.log(`Base de datos conectada...`);
  } catch (error) {
    console.log(error);
    throw new Error(`Error al conectarse a la base de datos`);
  }
};
export { dbConection };
