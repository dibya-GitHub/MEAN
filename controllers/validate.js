exports.escapeInput = function (text) {
  let s = "" + text;
  const matchHtmlRegExp = /["'&<>`]/;
  const match = matchHtmlRegExp.exec(s);
  if (!match) {
    return s;
  }
  s = s.replace(/&#/g, "##AMPHASH##");
  s = s.replace(/&/g, "&#38;");
  s = s.replace(/\'/g, "&#39;");
  s = s.replace(/\"/g, "&#34;");
  s = s.replace(/</g, "&#60;");
  s = s.replace(/>/g, "&#62;");
  s = s.replace(/\`/g, "&#96;");
  s = s.replace(/##AMPHASH##/g, "&#");
  return s;
};

exports.checkEmail = function (email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

exports.checkPasswordLength = function (password) {
  if (password.length < 8) {
    return false;
  } else {
    return true;
  }
};

exports.checkString = function (text) {
  if (typeof text === "string") {
    return true;
  } else {
    return false;
  }
};

exports.checkNum = function (num) {
  if (typeof num === "number") {
    return true;
  } else {
    return false;
  }
};
