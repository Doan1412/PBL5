"use client";
import { Input } from "@nextui-org/react";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  id: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

export default function MessageInput({
  id,
  required,
  register,
}: MessageInputProps) {
  return (
    <input
      id={id}
      type="text"
      autoComplete={id}
      {...register(id, { required })}
      placeholder="Write a message"
      className="
        text-black
        font-light
        py-2
        px-4
        bg-neutral-100
        w-full
        rounded-full
        focus:outline-none
      "
    />
  );
}
