export const checkValidFileExtension = (file: File): boolean => {
  const allowedExtensions = ["jpg", "jpeg", "png", "gif"];

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

  const fileExtensionToCheck = fileExtension[1];

  let extensionIsValid = false;

  for (const extension of allowedExtensions) {
    if (extension === fileExtensionToCheck) {
      extensionIsValid = true;
      break;
    }
  }

  if (!extensionIsValid) {
    console.log(
      "No file of supported format provided. Received " + fileExtensionToCheck
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

export const checkValidFile = (file: File): boolean => {
  if (!checkValidFileExtension(file)) return false;
  if (!checkValidFileSize(file)) return false;
  return true;
};
