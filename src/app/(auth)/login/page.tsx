"use client";
import Link from "next/link";
import React from "react";

import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import FormItem from "@/shared/FormItem";
import Input from "@/shared/Input/Input";

const PageLogin = () => {
  return (
    <div className="mt-16 h-max rounded-2xl bg-card p-10 shadow-2xl w-full max-w-md">
      <h2 className="mb-10 text-center text-4xl font-semibold text-card-foreground">
        Welcome back!
      </h2>
      <div className="mx-auto">
        <div className="space-y-4">
          <form className="grid gap-2">
            <FormItem>
              <Input
                type="text"
                rounded="rounded-xl"
                sizeClass="h-10 px-4 py-2"
                placeholder="Your username"
              />
            </FormItem>
            <FormItem>
              <Input
                type="password"
                rounded="rounded-xl"
                sizeClass="h-10 px-4 py-2"
                placeholder="Your password"
              />
            </FormItem>
            <ButtonPrimary className="mt-2 rounded-xl" type="submit">
              Sign in
            </ButtonPrimary>
          </form>
          <span className="block text-center text-md font-semibold text-muted-foreground">
            Don&apos;t have an account? {` `}
            <Link
              href="/signup"
              className="text-primary hover:underline hover:underline-offset-2"
            >
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
