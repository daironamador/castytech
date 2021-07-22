import axios from "axios";
import Papa from "papaparse";
import { INFORMATION } from "../app/constants";
export const obtenerArticulos = async () => {
  try {
    return axios.get(INFORMATION.sheet).then((response) => {
      return new Promise((resolve, reject) => {
        Papa.parse(response.data, {
          header: true,
          complete: (results) => {
            const products = results.data;
            return resolve(
              products.map((product) => {
                return {
                  ...product,
                  price: Number(product.price),
                  cantidad: 1,
                };
              })
            );
          },
          error: (error) => {
            return reject(error.message);
          },
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
};
