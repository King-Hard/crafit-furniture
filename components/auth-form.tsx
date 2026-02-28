import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Icon } from "@iconify/react";

export default function AuthForm() {
  return (
    <Card className="shadow-sm overflow-hidden">
      <CardContent className="p-6 md:p-8">
        <form className="space-y-6">
          <div className="text-center">
            <Link href="/" className="inline-block">
              <h1 className="text-4xl font-extrabold tracking-[0.2em] font-sans uppercase py-1">
                Crafit
              </h1>
                <div className="h-px w-12 bg-muted-foreground mx-auto"/>
              <p className="text-[12px] uppercase tracking-widest text-muted-foreground font-medium py-1">
                Toper Furniture
              </p>
            </Link>
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
                <Icon icon="logos:google-icon" />
                <span className="text-base">Continue with Google</span>
              </Button>
            </Field>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-[12px] uppercase">
                <span className="bg-card px-2 text-muted-foreground font-medium">
                  or
                </span>
              </div>
            </div>

            <Field>
              <FieldLabel htmlFor="email" className="text-[12px] font-bold uppercase tracking-wide">
                Email Address
              </FieldLabel>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="name@example.com"
                required
                className="h-12 placeholder:text-base"
              />
            </Field>

            <Field>
              <Button 
                type="submit" 
                className="h-12 text-base"
              >
                Continue
              </Button>
            </Field>

            <Field className="text-center">
            
                <Link href="" className="underline underline-offset-4 text-xs font-medium text-muted-foreground">
                  Privacy Policy & Terms
                </Link>
              
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}