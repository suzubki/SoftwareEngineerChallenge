"use client";

import type { AxiosProgressEvent } from "axios";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UploadIcon } from "@radix-ui/react-icons";
// import { uploadImageToCloudinary } from "@/lib/api";
import { useDropzone } from "react-dropzone";

import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import RadialProgress from "./progress";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

interface ImageUploadProps {
  onUploadComplete?: (url: string) => void;
}

/**
 * @description ImageUpload from https://github.com/kushagrasarathe/image-upload-shadcn
 * @param param0
 * @returns
 */
export const ImageUpload: React.FC<ImageUploadProps> = ({
  onUploadComplete,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
    if (progressEvent.total) {
      const percentage = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total,
      );
      setProgress(percentage);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const image = event.target.files[0] ?? null;
      setSelectedImage(image);
      if (image) handleImageUpload(image);
    }
  };

  const removeSelectedImage = () => {
    setLoading(false);
    setSelectedImage(null);
  };

  const handleImageUpload = async (image: File) => {
    if (!image) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", uploadPreset!);
    formData.append("api_key", apiKey!);

    setLoading(false);

    if (onUploadComplete) {
      onUploadComplete(URL.createObjectURL(image));
    }

    // try {
    //   const res = await uploadImageToCloudinary(formData, onUploadProgress);
    //   if (res.status === 200) {
    //     setLoading(false);
    //     setUploadedImagePath(res.data.url);
    //     if (onUploadComplete) {
    //       onUploadComplete(res.data.url);
    //     }
    //   }
    // } catch (error) {
    //   setLoading(false);
    //   console.error("Error uploading image:", error);
    // }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const image = acceptedFiles[0] ?? null;
      setSelectedImage(image);
      if (image) handleImageUpload(image);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: true,
  });

  return (
    <div className="h-full space-y-3">
      <div {...getRootProps()} className="h-full">
        <Label
          htmlFor="dropzone-file"
          className="relative flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-background p-6 hover:bg-accent dark:border-border dark:bg-background dark:hover:bg-accent"
        >
          {loading && (
            <div className="max-w-md text-center">
              <RadialProgress progress={progress} />
              <p className="text-sm font-semibold">Uploading Picture</p>
              <p className="text-xs text-muted-foreground">
                Do not refresh or perform any other action while the picture is
                being uploaded
              </p>
            </div>
          )}

          {!loading && !selectedImage && (
            <div className="text-center">
              <div className="mx-auto max-w-min rounded-md border p-2">
                <UploadIcon className="size-4" />
              </div>

              <p className="mt-2 text-sm text-foreground">
                <span className="font-semibold">Drag an image</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Select a image or drag here to upload directly
              </p>
            </div>
          )}

          {selectedImage && !loading && (
            <div className="space-y-2 text-center">
              <Image
                width={1000}
                height={1000}
                src={URL.createObjectURL(selectedImage)}
                className="max-h-16 w-full object-contain opacity-70"
                alt="uploaded image"
              />
              <div className="space-y-1">
                <p className="text-sm font-semibold">Image Uploaded</p>
                <p className="text-xs text-muted-foreground">
                  Click here to upload another image
                </p>
              </div>
            </div>
          )}
        </Label>

        <Input
          {...getInputProps()}
          id="dropzone-file"
          accept="image/png, image/jpeg"
          type="file"
          className="hidden"
          disabled={loading || selectedImage !== null}
          onChange={handleImageChange}
        />
      </div>

      {!!selectedImage && (
        <div className="flex items-center justify-between">
          <Link
            href={URL.createObjectURL(selectedImage)}
            className="text-xs text-muted-foreground hover:underline"
          >
            Click here to see uploaded image :D
          </Link>

          <Button
            onClick={removeSelectedImage}
            type="button"
            variant="secondary"
          >
            {selectedImage ? "Remove" : "Close"}
          </Button>
        </div>
      )}
    </div>
  );
};
