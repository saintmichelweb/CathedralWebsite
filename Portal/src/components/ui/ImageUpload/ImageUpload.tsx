import React, { useState } from "react";
interface ImageUploaderProps {
  parentSetSelectedImage: (file: File) => void;
}

export const ImageUploader = (props: ImageUploaderProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      props.parentSetSelectedImage(file);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(file);
        props.parentSetSelectedImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {selectedImage && (
        <img src={URL.createObjectURL(selectedImage)} alt="Selected Image" />
      )}
    </div>
  );
};
