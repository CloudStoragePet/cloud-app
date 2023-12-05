interface ITokens {
    access_token: string;
    refresh_token: string;
}

interface IUserInfo {
    sub: string;
    preferred_username: string;
    email: string;
    given_name: string;
    family_name: string;

    [key: string]: any;
}

const AUTH_SERVER_URL = process.env.REACT_APP_AUTH_SERVER_URL;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const REACT_APP_GRANT_TYPE = process.env.REACT_APP_GRANT_TYPE;
const REACT_APP_BASIC_AUTH_HEADER = process.env.REACT_APP_BASIC_AUTH_HEADER;

class AuthService {
    private async fetchTokens(code: string): Promise<ITokens> {
        const response = await fetch(`${AUTH_SERVER_URL}/oauth2/token?grant_type=${REACT_APP_GRANT_TYPE}&code=${code}&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}`, {
            method: "POST",
            headers: {
                'Content-type': 'application/url-form-encoded',
                "Authorization": `Basic ${REACT_APP_BASIC_AUTH_HEADER}`
            }
        });

        if (!response.ok) {
            const error = await response.text();
            console.error("Error during fetching tokens:", error);
            throw new Error(`Error during fetching tokens: ${error}`);
        }

        return response.json();
    }

    private async getTokenInfo(): Promise<any> {
        let accessToken = localStorage.getItem("access_token");
        const response = await fetch(`${AUTH_SERVER_URL}/oauth2/token-info/token=${accessToken}`, {
            method: "POST",
            headers: {
                'Content-type': 'application/url-form-encoded',
                "Authorization": `Basic ${REACT_APP_BASIC_AUTH_HEADER}`
            }
        });
        return response.json();
    }

    private async revokeToken(token: string | null) {
        await fetch(`${AUTH_SERVER_URL}/oauth2/revoke?token=${token}`, {
            method: "POST",
            headers: {
                'Content-type': 'application/url-form-encoded',
                "Authorization": `Basic ${REACT_APP_BASIC_AUTH_HEADER}`
            }
        });
    }

    async getUserInfo(accessToken: string): Promise<IUserInfo> {
        const response = await fetch(`${AUTH_SERVER_URL}/test`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        var res = response.json();
        return res;
    }

    login(): void {
        const scope = "read.scope write.scope";
        const responseType = "code";
        window.location.href = `${AUTH_SERVER_URL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${responseType}&scope=${scope}`;
    }

    async handleAuthentication(code: string): Promise<void> {
        try {
            let tokens = await this.fetchTokens(code);

            localStorage.setItem("access_token", tokens.access_token);
            localStorage.setItem("refresh_token", tokens.refresh_token);

            // Uncomment these lines to fetch and store user info
            // const userInfo = await this.getUserInfo(access_token);
            // localStorage.setItem("user_info", JSON.stringify(userInfo));
        } catch (error) {
            console.error("Error during fetching tokens:", error);
            throw error;
        }
    }

    isAuthenticated(): boolean {
        const accessToken = localStorage.getItem("access_token");

        if (accessToken) {
            return true;
        }

        return false;
    }

    getAccessToken(): string | null {
        return localStorage.getItem("access_token");
    }

    getUserInfoFromStorage(): IUserInfo | null {
        const userInfo = localStorage.getItem("user_info");
        if (userInfo) {
            return JSON.parse(userInfo);
        }
        return null;
    }

    async logout(): Promise<void> {
        const refreshToken = localStorage.getItem("refresh_token");
        await this.revokeToken(refreshToken);
        const accessToken = localStorage.getItem("access_token");
        await this.revokeToken(accessToken);

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user_info");

    }

}

export default new AuthService();