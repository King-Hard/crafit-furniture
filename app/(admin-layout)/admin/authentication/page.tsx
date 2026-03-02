import AdminAuth from "@/components/auth-compo/admin-auth";

export default function AdminAuthentication() {
  return (
    <div className="bg-gradient-to-br from-muted to-background min-h-svh flex items-center justify-center">
      <div className="w-full max-w-md">
        <AdminAuth/>
      </div>
    </div>
  );
}
