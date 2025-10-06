import React from "react";
import { BookOpen } from "lucide-react";
import { clsx } from "@/lib/utils";
import Image from "next/image";

interface Props {
  bookId?: string;
  title: string;
  include3D?: boolean;
}

export default function BookCover({ bookId, title, include3D = true }: Props) {
  return (
    <div
      className={clsx(
        "relative w-full max-w-md lg:max-w-lg",
        include3D && "perspective-1000"
      )}
    >
      {bookId ? (
        <div className="relative">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}/cover`}
            alt={title}
            className={clsx(
              "w-full h-auto rounded-lg shadow-2xl",
              include3D && "book-3d"
            )}
            width={384}
            height={576}
            style={{
              boxShadow:
                "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(0, 0, 0, 0.1)",
              height: "auto",
            }}
          />
          {include3D && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent 90%, rgba(0,0,0,0.2) 100%)",
                borderRadius: "0.5rem",
              }}
            />
          )}
        </div>
      ) : (
        <div className="w-full aspect-[2/3] bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg shadow-2xl flex items-center justify-center">
          <BookOpen className="w-24 h-24 md:w-32 md:h-32 text-gray-500" />
        </div>
      )}
    </div>
  );
}
