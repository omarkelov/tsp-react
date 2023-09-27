import { useDocumentTitle } from 'usehooks-ts';



export const useAppTitle = (title: string) => useDocumentTitle(`${title} | Translate Subs Player`);
