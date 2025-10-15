import { useContext, useRef } from 'react';
import AnimationWrapper from "../common/page-animation"
import { Link } from "react-router-dom";
import InputBox from "../components/input.component";
import googleicon from "../assets/google.png"
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import { storeInSession } from '../common/session';
import { UserContext } from '../App';
import { Navigate } from 'react-router-dom';

const UserAuthForm = ({ type }) => {

    // const authForm = useRef(null); 
    let { userAuth: { access_token }, setUserAuth } = useContext(UserContext)
    // console.log(access_token);
    const userAuthThroughServer = (serverRoute, formData) => {

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
            .then(({ data }) => {
                //    console.log(data);
                storeInSession("user", JSON.stringify(data));
                // console.log(sessionStorage);
                setUserAuth(data);
            })
            .catch(({ response }) => {
                toast.error(response.data.error)
            })

    }
    const handleSubmit = (e) => {

        e.preventDefault();
        let serverRoute = (type == "sign-in") ? "/signin" : "/signup"

        let form = new FormData(formElement);
        let formData = {};

        for (let [key, value] of form.entries()) {
            formData[key] = value;
        }

        let { fullname, email, password } = formData;

        // console.log(formData);
        //validation
        if (fullname) {
            if (fullname.length < 3) {
                return toast.error("too short name")
            }
        }
        if (!email.length) {
            return toast.error("enter Email")
        }
        if (password.length < 6) {
            return toast.error("password too short");
        }
        userAuthThroughServer(serverRoute, formData)

    }

    return (
        access_token ? <Navigate to="/" />
            :
            <AnimationWrapper keyvalue={type}>
                <section className="h-cover flex items-center justify-center">

                    <Toaster />
                    <form id="formElement" className="w-[80%] max-w-[400px]">
                        <h1 className="text-4xl font-gelasio capitalize text-center mb-12">
                            {type == "sign-in" ? "Welcome Back" : "Join Us Today"}
                        </h1>
                        {
                            type != "sign-in" ?
                                <InputBox
                                    name="fullname"
                                    type="text"
                                    placeholder="Full Name"
                                    icon="fi-rr-user"
                                />
                                : ""
                        }
                        <InputBox
                            name="email"
                            type="email"
                            placeholder="Email"
                            icon="fi-rr-envelope"
                        />
                        <InputBox
                            name="password"
                            type="password"
                            placeholder="Password"
                            icon="fi-rr-key"
                        />
                        <button
                            className="btn-darkblock mx-auto mt-14"
                            type="submit"
                            onClick={handleSubmit}>
                            {type.replace("-", " ")}
                        </button>
                        <div className="relative w-full flex items-center gap-2 my-6 opacity-10 uppercase text-black font-bold">
                            <hr className="w-1/2 border-black" />
                            <p>or</p>
                            <hr className="w-1/2 border-black" />
                        </div>
                        {/* <button className="btn-dark flex gap-3 items-center justify-center block mx-auto">Continue with Google
                            <img src={googleicon} className="w-5" />
                        </button> */}

                        {
                            type == "sign-in" ?
                                <p className="mt-6 text-dark-grey text-xl text-center">Dont't have an account ?
                                    <Link to="/signup" className="underline text-black text-xl ml-1"> Sign Up
                                    </Link> </p>
                                : <p className="mt-5 text-dark-grey text-xl text-center mb-5">Already have an account ?
                                    <Link to="/signin" className="underline text-black text-xl ml-1"> Sign In
                                    </Link> </p>
                        }
                    </form>
                </section>
            </AnimationWrapper>

    )
}
export default UserAuthForm;