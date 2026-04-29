const requiredServerEnv = ["MASSIVE_API_KEY", "OPENAI_API_KEY"] as const;
const optionalServerEnv = [
  "MASSIVE_API_BASE_URL",
  "OPENAI_MODEL",
  "MASSIVE_FLATFILES_ACCESS_KEY_ID",
  "MASSIVE_FLATFILES_SECRET_ACCESS_KEY",
  "MASSIVE_FLATFILES_ENDPOINT",
  "MASSIVE_FLATFILES_BUCKET",
] as const;

export type ServerEnvKey = (typeof requiredServerEnv)[number];
export type OptionalServerEnvKey = (typeof optionalServerEnv)[number];

export function getMissingServerEnv() {
  return requiredServerEnv.filter((key) => !process.env[key]);
}

export function getConfiguredFlatFilesEnv() {
  return optionalServerEnv.filter((key) => Boolean(process.env[key]));
}

export function assertServerEnv() {
  const missing = getMissingServerEnv();

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
}
