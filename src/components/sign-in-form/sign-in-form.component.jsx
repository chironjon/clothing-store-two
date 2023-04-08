import { useState } from "react";
import { signInwithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: ''
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const signInWithGoogle = async () => {
    const { user } = await signInwithGooglePopup();
    await createUserDocumentFromAuth(user);
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password);
      console.log(response)
      resetFormFields();
    } catch(error) {
      if (error.code === 'auth/wrong-password') {
        alert('incorrect password for email');
      }
      console.log(error)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({...formFields, [name]: value})
  }

  return (
    <div className="sign-in-container">
      <h2>Already have an account</h2>
      <span>Sign in with Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput 
          label="Email" 
          type="email" 
          required 
          onChange={handleChange} 
          name="email" 
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="signin-button-container">
          <Button buttonType='' type="submit">Sign In</Button>
          <Button buttonType='google' type='button' onClick={signInWithGoogle}>Sign in with Google</Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm;