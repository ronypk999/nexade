import { createBrowserRouter } from "react-router-dom";
import ContextProvider from "../provider/ContextProvider";
import axios from "axios";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { Dao } from "../page/Dao";
import { Admin } from "../page/Admin";
import { Error } from "../page/Error";

export const router = createBrowserRouter([
  {
    path: "/project/nexade",
    element: (
      <I18nextProvider i18n={i18n}>
        <ContextProvider>
        <Dao></Dao>
        </ContextProvider>
      </I18nextProvider>
    ),
    loader: async () => {
      try {
        const check = localStorage.getItem("addressArray");
        let address = null;
        if (check) {
          address = JSON.parse(check);
        }

        const data = await axios.post(
          `${import.meta.env.VITE_API_URL}/api.php`,
          JSON.stringify({
            info: 1,
            address: address,
          })
        );
        return data;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
  }, { 
    path: "/project/nexade/admin-panel", 
    element: <Admin></Admin>,

  }, { 
    path: "*", 
    element: <Error></Error>,

  }
]);