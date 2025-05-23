/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import imageCompression from 'browser-image-compression';

export const compressImage = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 1,              // Max size in MB
    maxWidthOrHeight: 1280,    // Resize the image
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // log the size of the compressed image.
    return compressedFile;
  } catch (error) {
    console.error('Image compression error:', error);
    throw error;
  }
};

export function formatTheDate(date: string | Date | number, format?: string){
  const formatDate = format ? format : "DD/MM/YYYY HH:mm:ss";
  return moment(date).format(formatDate);
}

export const capitalize = (str: string) => {
  return str.toUpperCase()
}

export const convertToTitleCase = (input: string): string => {
  const words = input.toLowerCase().split('_')
  const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  return capitalizedWords.join(' ')
}

export const formatAmount = (value: number | string | null) => {
  if (value && value !== 0 && value !== "-") {
    if (value as number < 0) {
      return (
        "-" +
        Number(
          value
            .toString()
            .replace(/[^0-9,]/g, "")
            .replace(/,+/g, "")
        ).toLocaleString()
      );
    } else {
      return Number(
        value
          .toString()
          .replace(/[^0-9,]/g, "")
          .replace(/,+/g, "")
      ).toLocaleString();
    }
  } else return 0;
};

export const removeComma = (str: string) => {
  return str.replace(/,/g, '')
}

export function convertDateToTimeStamp(date: string | Date, format: string) {
  const formatDate = format ? format : "YYYY-MM-DD";
  return moment(date, formatDate).unix();
}





