import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      appearance={{
        elements: {
          formButtonPrimary:
            "bg-primary hover:bg-rose-400 transition duration-300 delay-150",
          headerTitle:
            "font-bold text-primary",
        },
      }}
    />
  );
}
