function parseCorsOrigins(): string[] {
  const raw =
    process.env.CORS_ORIGINS ??
    process.env.FRONTEND_URL ??
    'http://localhost:3000';

  return raw
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export function getCorsConfig() {
  const origins = parseCorsOrigins();

  return {
    origin: origins.length === 1 ? origins[0] : origins,
    credentials: true,
  };
}
