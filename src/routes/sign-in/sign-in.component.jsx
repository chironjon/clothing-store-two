import { signinwithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signinwithGooglePopup();
    createUserDocumentFromAuth(user);
  }

  return (
    <div className="">
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>
        Sign in with google popup
      </button>
    </div>
  )
}

export default SignIn;