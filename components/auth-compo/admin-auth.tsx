import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import Link from "next/link";

export default function AdminAuth() {
  return (
    <Card className="shadow-sm overflow-hidden">
      <CardContent className="p-6 md:p-8">
        <form className="space-y-6">
          <div className="text-center">
            <Link href="/" className="inline-block">
              <h1 className="text-4xl font-extrabold tracking-[0.2em] font-sans uppercase py-1">
                Craftit
              </h1>
              <div className="h-px w-12 bg-muted-foreground mx-auto" />
              <p className="text-[12px] uppercase tracking-widest text-muted-foreground font-medium py-1">
                Toper Furniture
              </p>
            </Link>
          </div>

          <header className="space-y-1">
            <h2 className="text-2xl font-semibold">Admin Portal</h2>
            <p className="text-muted-foreground">
              Log in to access the Craftit dashboard and manage your workshop operations.
            </p>
          </header>

          <FieldGroup>
            <Field>
              <FieldLabel
                htmlFor="email"
                className="text-[12px] font-bold uppercase tracking-wide"
              >
                Email Address
              </FieldLabel>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="admin@example.com"
                required
                className="h-12 placeholder:text-base"
              />
            </Field>

            <Field>
              <FieldLabel
                htmlFor="password"
                className="text-[12px] font-bold uppercase tracking-wide"
              >
                Password
              </FieldLabel>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                required
                className="h-12 placeholder:text-base"
              />
            </Field>

            <Field>
              <Link href="/loading">
                <Button type="submit" className="w-full h-12 text-base">Continue</Button>
              </Link>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
