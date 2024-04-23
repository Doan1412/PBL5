import { Avatar, Card, CardHeader } from "@nextui-org/react";
import React from "react";

export default function CommentForm() {
  return (
    <div>
      <div className="flex gap-2">
        <div>
          <Avatar
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            size="sm"
          />
        </div>
        <div>
          <Card className="dark:bg-[#3a3b3c] bg-[#f0f2f5]">
            <CardHeader className="justify-between">
              <div className="flex">
                <div className="flex flex-col items-start justify-center">
                  <h4 className="text-sm font-semibold leading-none text-default-600">
                    Zoey Lang{" "}
                    <span className="ml-2 text-sm text-gray-500">
                      @zoeylang
                    </span>
                  </h4>
                  <p className="text-base">Make beautiful</p>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
