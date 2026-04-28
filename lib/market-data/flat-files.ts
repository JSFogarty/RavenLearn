export type FlatFilesConfig = {
  accessKeyId: string;
  secretAccessKey: string;
  endpoint: string;
  bucket: string;
};

export function getFlatFilesConfig(): FlatFilesConfig | undefined {
  const accessKeyId = process.env.MASSIVE_FLATFILES_ACCESS_KEY_ID;
  const secretAccessKey = process.env.MASSIVE_FLATFILES_SECRET_ACCESS_KEY;
  const endpoint = process.env.MASSIVE_FLATFILES_ENDPOINT;
  const bucket = process.env.MASSIVE_FLATFILES_BUCKET;

  if (!accessKeyId || !secretAccessKey || !endpoint || !bucket) {
    return undefined;
  }

  return {
    accessKeyId,
    secretAccessKey,
    endpoint,
    bucket,
  };
}

export function getStocksDayAggregatesPrefix(year: number, month: number) {
  return `us_stocks_sip/day_aggs_v1/${year}/${String(month).padStart(2, "0")}/`;
}
