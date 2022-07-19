export const checkValidFileExtension = (file: File): boolean => {
  const allowedExtensions = ["jpg", "png", "gif"];

  // Check file extension using regex
  var re = /(?:\.([^.]+))?$/;
  const fileExtension = re.exec(file.name);

  if (fileExtension === null) {
    console.log("File has no file extension.");
    return false;
  }

  if (fileExtension.length < 1) {
    console.log("Failed to determine the file extension.");
    return false;
  }

  if (allowedExtensions.indexOf(fileExtension[1])) {
    console.log(
      "No file of supported format provided. Received " + fileExtension[1]
    );
    return false;
  }

  return true;
};

export const checkValidFileSize = (file: File): boolean => {
  // Size limitations

  const FILESIZE_LIMIT_MB = 5;

  const filesizeLimit = 1024 * 1024 * FILESIZE_LIMIT_MB; // 1MB
  if (file.size > filesizeLimit) {
    console.log(`File size is too big. Must be under ${filesizeLimit} bytes.`);
    return false;
  }

  return true;
};
