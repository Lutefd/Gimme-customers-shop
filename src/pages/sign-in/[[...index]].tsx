import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />;
    </div>
  );
}
