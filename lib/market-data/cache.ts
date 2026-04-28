type CacheEntry<T> = {
  expiresAt: number;
  value: T;
};

const cache = new Map<string, CacheEntry<unknown>>();

export function getCached<T>(key: string): T | undefined {
  const entry = cache.get(key);

  if (!entry) {
    return undefined;
  }

  if (entry.expiresAt < Date.now()) {
    cache.delete(key);
    return undefined;
  }

  return entry.value as T;
}

export function setCached<T>(key: string, value: T, ttlMs: number) {
  cache.set(key, {
    expiresAt: Date.now() + ttlMs,
    value,
  });
}
