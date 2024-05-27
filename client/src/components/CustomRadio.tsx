import React from "react";
import { Checkbox, Link, User, Chip, cn, Radio } from "@nextui-org/react";

interface CheckProps {
  title: string;
  statusColor:
    | "success"
    | "danger"
    | "default"
    | "primary"
    | "secondary"
    | "warning"
    | undefined;
  onChange?: () => void;
}

export const CustomRadio = ({ title, statusColor, onChange }: CheckProps) => {
  return (
    <Radio
      onChange={onChange}
      aria-label={title}
      classNames={{
        base: cn(
          "inline-flex max-w-md w-full bg-content1 m-0",
          "hover:bg-content2 items-center justify-start",
          "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary"
        ),
        label: "w-full",
      }}
      value={title}
    >
      <div className="w-full flex justify-between gap-2">
        <div className="flex flex-col items-end gap-1">
          <Chip color={statusColor} size="sm" variant="flat">
            {title}
          </Chip>
        </div>
      </div>
    </Radio>
  );
};
