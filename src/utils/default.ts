export const onClickLogout = () => {
  let result = window.confirm('정말로 로그아웃 하시겠습니까?');
  if (result) {
    localStorage.clear();
    window.location.reload();
  }
};
