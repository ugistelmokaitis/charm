import { createClient } from '@prismicio/client';
import type { FetchLike } from '@prismicio/client';
import type {
  PrismicDocumentWithUID,
  FilledLinkToWebField,
  FilledLinkToDocumentField,
  LinkField,
} from '@prismicio/types';
import type { LinkResolverFunction } from '@prismicio/helpers';

export const linkResolver: LinkResolverFunction = (document) => {
  if (!document.uid) {
    return '/';
  }

  const routes: Record<string, string> = {
    home: '/',
    casestudy: `/work/${document.uid}`,
    'blog-post': `/blog/${document.uid}`,
  };

  return routes[document.type] || `/${document.uid}`;
};

export const docResolver = (link: LinkField): string => {
  if (link.link_type === 'Document') {
    return linkResolver(link as FilledLinkToDocumentField);
  }

  if (link.link_type === 'Any') {
    return '';
  }

  return (link as FilledLinkToWebField).url;
};

export const client = createClient(
  process.env.NEXT_PUBLIC_PRISMIC_ENDPOINT ?? 'loading',
  {
    fetch: fetch as FetchLike,
    accessToken: process.env.NEXT_PUBLIC_PRISMIC_ACCESS_TOKEN,
  }
);

export const getPage = async (
  uid: string,
  type?: string
): Promise<PrismicDocumentWithUID> => {
  const page = await client.getByUID(type ?? uid, uid);

  return page as unknown as PrismicDocumentWithUID;
};

export const getPages = async (
  type: string
): Promise<PrismicDocumentWithUID[]> => {
  const pages = await client.getAllByType(type);

  return pages as unknown as PrismicDocumentWithUID[];
};
