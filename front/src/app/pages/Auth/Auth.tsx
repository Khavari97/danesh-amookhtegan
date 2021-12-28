import SignIn from './SignIn/SignIn'
import SignUp from "./SignUp/VerifyEmail";
import SetUserPassword from "./SignUp/SetPassword";
import SetUserProfile from "./SignUp/SetProfile";
import ForgetPassword from "./ForgetPassword/VerifyEmail";
import ResetPassword from "./ForgetPassword/ResetPassword";

const Auth = {
    SignIn,
    SignUp,
    ResetPassword,
    ForgetPassword,
    SetUserPassword,
    SetUserProfile
}

export default Auth;