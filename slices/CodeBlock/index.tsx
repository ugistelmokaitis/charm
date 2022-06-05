import type { FC } from 'react';
import type { SliceComponentProps } from '@prismicio/react';
import type { KeyTextField, ImageField } from '@prismicio/types';
import { asText } from '@prismicio/helpers';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { hybrid, xcode } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import Image from 'next/image';

const CodeBlock: FC<
  SliceComponentProps<{
    slice_type: 'codeblock';
    primary: {
      language: KeyTextField;
      icon: ImageField;
      content: string | string[];
    };
  }>
> = ({ slice }) => (
  <div className="col-span-12 col-start-1">
    <div className="text-left">
      <div className="hidden dark:flex">
        <div className="container">
          <div className="grid-starts-1 mt-[2.875rem] gap-16 md:grid-cols-12 lg:mt-10 lg:grid">
            <div className="col-span-10 col-start-2 my-12">
              <div className="mx-auto">
                <div className="flex h-11 w-full items-center justify-start space-x-1.5 rounded-t-lg border-[1px] border-neutral-80 bg-[#0B0B0B]/80 px-5">
                  <div className="-mb-[1.7px] -ml-2 border-t-[1px] border-yellow-100/60">
                    <div className="item flex h-[2.6563rem] items-center justify-center border-r border-neutral-65/90 pr-[0.375rem]">
                      <Image
                        src={slice.primary.icon.url ?? ''}
                        alt={slice.primary.icon.url ?? ''}
                        width={16}
                        height={16}
                        layout="fixed"
                        quality={100}
                        className="dark:brightness-0 dark:invert-[0.70]"
                      />
                      <span className="font-codeRegular pl-2 font-FiraCode-Regular text-[0.875rem] leading-[1.25rem]  text-neutral-30">
                        {slice.primary.language}
                      </span>
                      <div className="ml-2 mr-2 h-[0.4063rem] w-[0.4063rem] rounded-full border-neutral-0 bg-neutral-30" />
                    </div>
                  </div>
                </div>
                <SyntaxHighlighter
                  wrapLongLines
                  wrapLines
                  showLineNumbers
                  style={hybrid}
                  language="typescript"
                  className="rounded-b-lg border-[0.0625rem] border-neutral-80/60"
                  customStyle={{
                    paddingTop: '2rem',
                    paddingBottom: '2rem',
                    paddingLeft: '2rem',
                    paddingRight: '2rem',
                  }}
                >
                  {slice.primary.content}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex dark:hidden">
          <div className="container">
            <div className="grid-starts-1 mt-[2.875rem] grid-cols-12 gap-16 lg:mt-10 lg:grid">
              <div className="col-span-10 col-start-2 my-12">
                <div className="mx-auto">
                  <div className="flex h-11 w-full items-center justify-start space-x-1.5 rounded-t-lg border-[1px] border-neutral-15 bg-primary-50 px-5">
                    <div className="-mb-[1.7px] -ml-2 border-t-[1px] border-primary-75">
                      <div className="pr-[0.375rem]r flex h-[2.6563rem] items-center justify-center border-r border-neutral-30/30">
                        <Image
                          src={slice.primary.icon.url ?? ''}
                          alt={slice.primary.icon.url ?? ''}
                          width={16}
                          height={16}
                          layout="fixed"
                          quality={100}
                          className="dark:brightness-0 dark:invert-[1]"
                        />
                        <span className="font-codeRegular  pl-2 font-FiraCode-Regular text-[0.875rem] leading-[1.25rem] text-neutral-65">
                          {slice.primary.language}
                        </span>
                        <div className="ml-2 mr-2 h-[0.4063rem] w-[0.4063rem] rounded-full border-neutral-0 bg-neutral-50" />
                      </div>
                    </div>
                  </div>
                  <SyntaxHighlighter
                    wrapLongLines
                    wrapLines
                    language="typescript"
                    showLineNumbers
                    style={xcode}
                    className="rounded-b-lg border-[0.0625rem] border-neutral-15/60"
                    customStyle={{
                      paddingTop: '2rem',
                      paddingBottom: '2rem',
                      paddingLeft: '2rem',
                      paddingRight: '2rem',
                    }}
                  >
                    {slice.primary.content}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CodeBlock;
