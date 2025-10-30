import Link from "next/link";
import React from "react";

import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import FormItem from "@/shared/FormItem";
import Input from "@/shared/Input/Input";

const PageSignUp = () => {
  return (
    <div className="mt-8 h-max rounded-2xl bg-card p-12 shadow-2xl w-full max-w-lg">
      <h2 className="mb-10 text-center text-4xl font-semibold text-card-foreground">
        Create your account
      </h2>
      <div className="mx-auto max-w-md">
        <div className="space-y-4">
          <form className="grid gap-1">
            <FormItem helperText="">
              <Input
                type="Email"
                rounded="rounded-lg"
                sizeClass="h-10 px-4 py-2"
                placeholder="Your email"
              />
            </FormItem>
            <FormItem helperText="">
              <Input
                type="text"
                rounded="rounded-lg"
                sizeClass="h-10 px-4 py-2"
                placeholder="Your username"
              />
            </FormItem>
            <FormItem helperText="">
              <Input
                type="password"
                rounded="rounded-lg"
                sizeClass="h-10 px-4 py-2"
                placeholder="Your password"
              />
            </FormItem>
            <ButtonPrimary type="submit" className="mt-2 rounded-lg">
              Sign Up
            </ButtonPrimary>
          </form>
          <span className="block w-full text-center text-md font-semibold text-muted-foreground">
            Already have an account? {` `}
            <Link
              href="/login"
              className="text-primary hover:underline hover:underline-offset-2"
            >
              Log in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
