const optional = (key: string): string | undefined => process.env[key];

const required = (key: string): string => {
  const value = optional(key);
  if (!value) {
    throw new Error(`Missing environment variable ${key}`);
  }
  return value;
};

export class Config {
  static readonly apiUrl = required("REACT_APP_API_URL");

  static readonly baseUrl = required("REACT_APP_BASE_URL");

  static readonly googleClientId = optional("REACT_APP_GOOGLE_CLIENT_ID");
}
