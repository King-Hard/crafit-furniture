import AuthForm from "@/components/auth-form";

export default function Authentication(){
  return(
    <div className="bg-muted min-h-svh flex items-center justify-center">
      <div className="w-full max-w-md">
        <AuthForm />
      </div>
    </div>
  );
}