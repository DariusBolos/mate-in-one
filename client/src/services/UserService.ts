import axios from "axios";
import { User } from "../types/User";
import { toast } from "sonner";

const userUrl = `${import.meta.env.VITE_API_URL}/user`;
const appUrl = import.meta.env.VITE_APP_URL;

async function saveUser(user: User) {
  await axios
    .post(userUrl, user)
    .then((response) => {
      toast.success(response.data);
      setTimeout(() => window.location.replace(`${appUrl}/login`), 1500);
    })
    .catch((error) => toast.error(error.response.data));
}

async function getUser(email: string, password: string) {
  await axios
    .get(userUrl, { params: { email, password } })
    .then((response) => {
      toast.success(response.data);
      setTimeout(() => window.location.replace(`${appUrl}/dashboard`), 1500);
    })
    .catch((error) => toast.error(error.response.data));
}

export { saveUser, getUser };
