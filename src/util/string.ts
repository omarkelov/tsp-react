export const unify = (str: string | undefined) => str?.trim().replace(/\s\s+/g, ' ').toLowerCase();
