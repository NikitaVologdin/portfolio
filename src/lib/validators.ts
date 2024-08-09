function nameValidator(value: string) {
  return value.trim().length >= 2;
  // return true;
}

function imageUploadValidator(value: [File]) {
  // if (typeof value === "undefined") {
  //   return false;
  // }
  // if (Array.isArray(value) && value.length > 0) {
  //   const indexOfExtension = value[0].name.lastIndexOf(".");
  //   const extension = value[0].name.split("").slice(indexOfExtension).join("");
  //   const validatorResult = extension === ".svg";
  //   return validatorResult;
  // } else {
  //   return false;
  // }
  return true;
}

function colorValidator(value: string) {
  return value.trim().length === 7 && value[0] === "#";
}

function descriptionValidator(value: string) {
  return value.trim().length > 20;
}

function gitHubLinkValidator(link: string) {
  return /^https:\/\/github.com\//gi.test(link.trim());
}
function linkValidator(link: string) {
  return /^https:\//gi.test(link.trim());
}

function dateValidator(value: any) {
  return true;
}

function fileValidator(value: any) {
  return true;
}

export {
  nameValidator,
  imageUploadValidator,
  colorValidator,
  descriptionValidator,
  dateValidator,
  gitHubLinkValidator,
  linkValidator,
  fileValidator,
};
