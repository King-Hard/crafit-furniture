import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "./ui/field";
import { Input } from "./ui/input";
import Link from "next/link";

export default function AuthForm() {
  return (
    <Card className="shadow-sm overflow-hidden">
      <CardContent className="p-6 md:p-8">
        <form className="space-y-8">
          <div className="text-center space-y-1">
            <h1 className="text-4xl font-extrabold tracking-[0.2em] font-sans uppercase">
              Crafit
            </h1>
            <div className="h-px w-12 bg-muted-foreground mx-auto"/>
            <p className="text-[12px] uppercase tracking-widest text-muted-foreground font-medium">
              Toper Furniture
            </p>
          </div>

          <header className="space-y-1">
            <h2 className="text-2xl font-semibold">Welcome back!</h2>
            <p className="text-muted-foreground">
              Log in to manage your orders or explore new collections.
            </p>
          </header>

          <FieldGroup>
            <Field>
              <Button 
                variant="outline" 
                type="button"
                className="h-12 gap-3"
              >
                <FcGoogle/>
                <span className="font-medium">Continue with Google</span>
              </Button>
            </Field>

            <FieldSeparator className="py-1 text-muted-foreground text-[10px] uppercase font-medium">
              Or use email
            </FieldSeparator>

            <Field>
              <FieldLabel htmlFor="email" className="text-[12px] font-medium uppercase tracking-wide">
                Email Address
              </FieldLabel>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="name@example.com"
                required
                className="h-12"
              />
            </Field>

            <Field>
              <Button 
                type="submit" 
                className="h-12"
              >
                Continue
              </Button>
            </Field>

            <Field className="text-center">
              <Link href="" className="text-xs font-medium text-muted-foreground hover:text-Linkrimary underline underline-offset-4 transition-colors">
                Privacy Policy & Terms
              </Link>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}