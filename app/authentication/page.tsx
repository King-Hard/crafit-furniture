import AuthForm from "@/components/auth-form";

export default function Authentication(){
  return(
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <AuthForm />
      </div>
    </div>
  );
}