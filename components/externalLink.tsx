import type { LinkProps } from '@prismicio/react';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { useAsync, useMountEffect } from '@react-hookz/web';
import type { ScreenshotResponse } from '../pages/api/screenshot';
import Placeholder from './placeholder';

const excludedLinks = [
  'twitter.com',
  'instagram.com',
  'linkedin.com',
  'spotify.com',
  'ugistelmokaitis.com',
  'discord.com',
];

const ExternalLinkComponent: FC<LinkProps> = ({ children, href, ...props }) => {
  const isExcluded = excludedLinks.some((excluded) => href.includes(excluded));
  const [screenshot, { execute }] = useAsync(async () => {
    const response = await fetch('/api/screenshot', {
      method: 'POST',
      body: JSON.stringify({
        url: href,
      }),
    });

    const data = (await response.json()) as ScreenshotResponse;

    return data;
  });

  useMountEffect(async () => {
    if (!isExcluded) {
      await execute();
    }
  });

  return (
    <span className="group relative inline-block">
      {!isExcluded && !screenshot.error && !screenshot.result?.error && (
        <span className="bg-neutral pointer-events-none absolute left-0 bottom-full ml-[50%] flex h-[205px] w-[318px] -translate-x-2/4 -translate-y-0 rounded-lg border border-neutral-15 p-2 opacity-0 shadow-lg transition-all group-hover:-translate-y-2 group-hover:opacity-100 dark:border-neutral-50 dark:bg-neutral-80">
          {screenshot.result?.image ? (
            <Image
              src={`data:image/png;base64,${screenshot.result.image}`}
              width={300}
              height={187}
              alt=""
            />
          ) : (
            <Placeholder className="h-full w-full rounded-md" />
          )}
        </span>
      )}
      <Link href={href}>
        <a
          {...props}
          target="_blank"
          rel="noopener noreferrer"
          className="text-md inline font-normal text-neutral-100 transition-colors hover:text-neutral-100 dark:text-neutral-0 dark:hover:text-neutral-0"
          {...props}
        >
          {children}
        </a>
      </Link>
    </span>
  );
};

export default ExternalLinkComponent;
