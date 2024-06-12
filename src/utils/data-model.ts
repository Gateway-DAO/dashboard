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
