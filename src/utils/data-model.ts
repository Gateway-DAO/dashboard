export const claimToArray = (claim: any, schema: any) => {
  if (!claim) return [];
  return Object.keys(claim).map((key) => {
    const property = key;
    const value = claim[key]?.toString?.() ?? `${claim[key]}`;
    const {
      title: label,
      type,
      description,
      ...metadata
    } = schema.properties[key];
    return { property, label, type, value, description, metadata };
  });
};

export type ClaimArray = ReturnType<typeof claimToArray>;

export function getClaimObject(
  schemaProperties: Record<string, any>,
  claim: Record<string, any>
): Record<string, any> {
  const newClaim: Record<string, any> = {};
  if (Object.entries(claim).length === 0) return newClaim;

  for (const [key, value] of Object.entries(claim)) {
    const schemaProperty = schemaProperties[key];
    const label = schemaProperty?.title ?? key;
    newClaim[label] = value;
  }

  return newClaim;
}
