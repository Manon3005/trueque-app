export function toBase64(data: Buffer | Uint8Array | null | undefined) {
  if (!data) return null;
  const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data);
  return buffer.toString("base64");
}