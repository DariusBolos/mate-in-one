import axios from "axios";
import { User } from "../types/User";
import { toast } from "sonner";

const userUrl = "http://localhost:3000/user";

async function saveUser(user: User) {
  await axios
    .post(userUrl, user)
    .then((response) => {
      toast.success(response.data);
      setTimeout(
        () => window.location.replace("http://localhost:5173/login"),
        1500
      );
    })
    .catch((error) => toast.error(error.response.data));
}

async function getUser(email: string, password: string) {
  await axios
    .get(userUrl, { params: { email, password } })
    .then((response) => {
      toast.success(response.data);
      setTimeout(
        () => window.location.replace("http://localhost:5173/dashboard"),
        1500
      );
    })
    .catch((error) => toast.error(error.response.data));
}

export { saveUser, getUser };
