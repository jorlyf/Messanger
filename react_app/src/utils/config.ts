const production: IConfig = {
    apiUrl: ""
}
const development: IConfig = {
    apiUrl: "https://localhost:7115"
}

interface IConfig {
    apiUrl: string;
}

export const config: IConfig = process.env.NODE_ENV === "production"
    ? production : development;