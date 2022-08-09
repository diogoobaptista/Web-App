
export async function apiCall(url: RequestInfo, options = {}, json = true) {
    const result = await fetch(url, options);
    if (result.ok) {
        return json ? result.json() : result;
    }
}

export function setCookie(name: string, token: string) {
    document.cookie = name + "=" + token + ";SameSite=Lax; Path=/;";
}

export function getCookie(name: string): any {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

export function setUsername(username: string) {
    sessionStorage.setItem("username", username);
}

export function getUsername() {
    return sessionStorage.getItem('username')
}

export function logged() {
    return sessionStorage.getItem('logged') === 'true'
}


export function removeCookie(name: string) {
    document.cookie = name + '=; Max-Age=-99999999;';
}
