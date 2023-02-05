function getLocalToken() {
    return localStorage.getItem('Token');
}
function clearLocalToken() {

    localStorage.removeItem('Token');
}
function setLocalToken(token: string) {
    localStorage.setItem("Token", token);
}

export {
    getLocalToken,
    clearLocalToken,
    setLocalToken,
}