import { SignUp } from "@clerk/nextjs"

const SignUpPage = () => {
  return (
  <div className="min-h-screen flex items-center justify-center">
      <SignUp path="/routes/sign-up" signInUrl="/routes/sign-in" forceRedirectUrl="/routes/dashboard/schedule" />
    </div>
  )
}

export default SignUpPage