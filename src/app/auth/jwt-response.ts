export interface JwtResponse {
    accessToken: string;
    type: string;
    username: string;
    name: string;
    authorities: string[];
}
