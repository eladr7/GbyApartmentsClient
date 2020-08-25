let accessToken = "";

const setCookie = (name, value, days) => {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export const setAccessToken = (resData) => {
  accessToken = resData.accessToken;
  setCookie('jid', resData.jid, 31);
};

export const getAccessToken = () => {
  return accessToken;
};
