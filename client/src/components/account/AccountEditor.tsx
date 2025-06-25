import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useLoginInfo } from "@/hooks/LoggedInUserHooks";
import { ChangeEvent, useState } from "react";
import { deleteUser, updateUser } from "@/services/UserService";
import { User } from "@/types/User";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Avatar } from "@/types/Avatar";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

export default function AccountEditor() {
  const { loggedInUser, setLoggedInUser, setIsLoggedIn } = useLoginInfo();
  const [newEmail, setNewEmail] = useState(loggedInUser?.email);
  const [newUsername, setNewUsername] = useState(loggedInUser?.username);
  const [newPassword, setNewPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");
  const [newAvatar, setNewAvatar] = useState<Avatar | undefined>(undefined);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedInUser(null);
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleUpdateUser = (updates: Partial<User>) => {
    const userId = loggedInUser?._id!;

    updateUser(userId, updates)
      .then((updatedUser) => {
        if (updatedUser) {
          setLoggedInUser(updatedUser);
          toast.success("Account was updated successfully.");
          return;
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const checkValidPasswords = () =>
    newPassword && newPassword === retypedPassword;

  const handleUpdatePassword = (updates: Partial<User>) => {
    if (!checkValidPasswords()) {
      toast.error("The two passwords don't match.");
      return;
    }

    handleUpdateUser(updates);
    logout();
  };

  const handleFileUploadChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e) {
      return;
    }

    const uploadedFile = e.target.files![0];
    const newAvatar: Avatar = { type: "", name: "", url: "" };

    newAvatar.type = uploadedFile.type;
    newAvatar.name = uploadedFile.name;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      newAvatar.url = reader.result;

      setNewAvatar(newAvatar);
    });

    reader.readAsDataURL(uploadedFile);
  };

  const handleDeleteUser = () => {
    const userId = loggedInUser?._id!;

    deleteUser(userId)
      .then(() => {
        logout();
        toast.success("Account was deleted successfully.");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <>
      <div className="flex justify-center mt-30">
        <div className="w-full max-w-sm flex flex-col gap-6">
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="avatar">Avatar</TabsTrigger>
              <TabsTrigger value="delete">Delete Account</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Make changes to your account here. Click save when
                    you&apos;re done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="tabs-email">Email</Label>
                    <Input
                      id="tabs-email"
                      defaultValue={loggedInUser?.email}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="tabs-username">Username</Label>
                    <Input
                      id="tabs-username"
                      defaultValue={loggedInUser?.username}
                      onChange={(e) => setNewUsername(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="cursor-pointer"
                    onClick={() =>
                      handleUpdateUser({
                        email: newEmail,
                        username: newUsername,
                      })
                    }
                  >
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password here. After saving, you&apos;ll be
                    logged out.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="tabs-new">New password</Label>
                    <Input
                      id="tabs-new"
                      type="password"
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="tabs-retype">Retype Password</Label>
                    <Input
                      id="tabs-retype"
                      type="password"
                      onChange={(e) => setRetypedPassword(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="cursor-pointer"
                    onClick={() =>
                      handleUpdatePassword({ password: newPassword })
                    }
                  >
                    Save Password
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="avatar">
              <Card>
                <CardHeader>
                  <CardTitle>Avatar</CardTitle>
                  <CardDescription>
                    Change your avatar here. Upload a new picture and save the
                    changes.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="tabs-avatar">Select Avatar</Label>
                    <Input
                      className="cursor-pointer"
                      id="tabs-avatar"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUploadChangeEvent(e)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="cursor-pointer"
                    onClick={() =>
                      handleUpdateUser({
                        avatar: newAvatar,
                      })
                    }
                  >
                    Save Avatar
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="delete">
              <Card>
                <CardHeader>
                  <CardTitle>Delete account</CardTitle>
                  <CardDescription>
                    Delete your account by pressing the button below. Note: This
                    change cannot be undone.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="cursor-pointer">Delete Account</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="cursor-pointer"
                          onClick={handleDeleteUser}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
