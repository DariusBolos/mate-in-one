import { PhotoIcon } from '@heroicons/react/24/solid';
import logo from '../../assets/logo.png';
import PasswordInput from '../shared/passwordInput/PasswordInput';
import { ChangeEvent, FormEvent, useRef, useState} from 'react';
import { User } from '../../types/User';
import { saveUser } from '../../services/UserService';
import { Avatar } from '../../types/Avatar';

export default function RegisterForm() {

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  
  const [uploadedAvatar, setUploadedAvatar] = useState<Avatar>({type: "", name: "", url: ""});
  const [fileUploadText, setFileUploadText] = useState("or drag and drop");
  const [paragraphHiddenText, setParagraphHiddenText] = useState("");

  const handleFormSubmitEvent = (e: FormEvent<HTMLFormElement>) => {
    if(!e) {
      return ;
    }

    e.preventDefault();

    const newUser: User = {
      _id: null,
      username: usernameRef.current?.value!,
      email: emailRef.current?.value!,
      password: passwordRef.current?.value!,
      createdDate: new Date(),
      avatar: uploadedAvatar
    }

    saveUser(newUser);
  }

  const handleFileUploadChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    if(!e) {
      return ;
    }

    const uploadedFile = e.target.files![0];
    const newAvatar: Avatar = {type: "", name: "", url: ""};

    newAvatar.type = uploadedFile.type;
    newAvatar.name = uploadedFile.name;

    setParagraphHiddenText("hidden");
    setFileUploadText(uploadedFile.name);

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      newAvatar.url = reader.result; 

      setUploadedAvatar(newAvatar);
    })

    reader.readAsDataURL(uploadedFile);
  }

  return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="logo"
              src={logo}
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
              Create a new Account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="/register" 
              method="POST" 
              className="space-y-6" 
              onSubmit={handleFormSubmitEvent}>
            <div>
                <label htmlFor="username" className="block text-sm/6 font-medium text-white">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="username"
                    required                
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    ref={usernameRef}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-white">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    ref={emailRef}
                  />
                </div>
              </div>
              <PasswordInput inputReference={passwordRef}/>            
              <div className="col-span-full">
              <label htmlFor="avatar" className="block text-sm/6 font-medium text-white">
                Avatar
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-white" />
                  <div className="mt-4 flex text-sm/6 text-white">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                    >
                      <span className={paragraphHiddenText}>Upload a file</span>
                      <input id="file-upload" 
                            name="file-upload" 
                            type="file" 
                            className="sr-only"
                            accept='image/*'
                            onChange={handleFileUploadChangeEvent}
                            required/>
                    </label>
                    <p className={`pl-1 ` + {paragraphHiddenText}}>{fileUploadText}</p>
                  </div>
                  <p className={`text-xs/5 text-white ` + paragraphHiddenText}>PNG, JPG, GIF up to 10MB</p>
                  </div>
              </div>
            </div>        
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white cursor-pointer shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
  