import "../styles/Auth.css";

import googleimg from "../styles/google.png"

import { auth, provider } from "../firebase-config.js"
import { signInWithPopup } from "firebase/auth";

import Cookies from "universal-cookie";

const cookies = new Cookies()

export const Auth = ({setIsAuth}) => {
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            cookies.set("auth-token", result.user.refreshToken)
            setIsAuth(true)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="auth">
            <p> Sign In With Google To Continue  </p>
            <button onClick={signInWithGoogle}> Sign In With Google  <img src="https://cdn.iconscout.com/icon/free/png-256/free-google-1772223-1507807.png" /> </button>
        </div>
    )
}