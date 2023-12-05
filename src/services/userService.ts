import AuthService from "./authService";

const REACT_APP_CLIENT_URL = process.env.REACT_APP_CLIENT_URL;

export async function fetchUserData(): Promise<any> {
    if (!AuthService.isAuthenticated()) {
        throw new Error("User not authenticated");
    }

    const url = `${REACT_APP_CLIENT_URL}/api/user`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AuthService.getAccessToken()}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user data");
    }

    return await response.json();
}