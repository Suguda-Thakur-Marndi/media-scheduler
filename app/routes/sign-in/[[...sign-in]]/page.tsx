import { SignIn } from "@clerk/nextjs"

const SignInPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
        <SignIn path="/routes/sign-in" signUpUrl="/routes/sign-up" forceRedirectUrl="/routes/dashboard/schedule" />
    </div>
  )
}

export default SignInPage