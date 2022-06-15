import type { FC } from 'react';
import type React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {
  tomorrowNight,
  a11yLight,
} from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import TypescriptLogo from '../public/icons/typescriptlogo.svg';

type IBrowseWindow = {
  child1: React.ReactNode;
  child2: React.ReactNode;
};

const BrowserWindow: FC<IBrowseWindow> = ({ child1, child2 }) => (
  <>
    <div className="hidden dark:flex">
      <div className="container dark:drop-shadow-[0px_-10px_200px_rgba(119,197,227,0.50)]">
        <div className="mt-8 gap-5 md:grid-cols-12 lg:grid">
          <div className="my-12 lg:col-span-10 lg:col-start-2">
            <div className="mx-auto">
              <div className="flex h-11 w-full items-center justify-start space-x-1.5 rounded-t-lg border-[1px] border-neutral-80 bg-[#0B0B0B]/80 px-5">
                <div className="-mb-[1.7px] -ml-2 border-t-[1px] border-yellow-100/60">
                  <div className="item flex h-[2.6563rem] items-center justify-center border-r border-neutral-65/90 pr-[0.375rem]">
                    <TypescriptLogo className="h-4 w-4 text-neutral-50" />
                    <span className="font-codeRegular pl-2 font-FiraCode-Regular text-[0.875rem] leading-[1.25rem]  text-neutral-30">
                      {child1}
                    </span>
                    <div className="ml-2 mr-2 h-[0.4063rem] w-[0.4063rem] rounded-full border-neutral-0 bg-neutral-30" />
                  </div>
                </div>
              </div>
              <SyntaxHighlighter
                wrapLongLines
                wrapLines
                showLineNumbers
                style={tomorrowNight}
                language="typescript"
                className="rounded-b-lg border-[0.0625rem] border-neutral-80/60"
                customStyle={{
                  paddingTop: '3rem',
                  paddingBottom: '3rem',
                  paddingLeft: '1rem',
                  paddingRight: '3rem',
                }}
              >
                {child2 as string}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div className="flex dark:hidden">
        <div className="container drop-shadow-[0px_-10px_200px_rgba(17,24,39,0.25)]">
          <div className="grid-starts-1 mt-8 grid-cols-12 gap-5 lg:grid">
            <div className="col-span-10 col-start-2 my-12">
              <div className="mx-auto">
                <div className="flex h-11 w-full items-center justify-start space-x-1.5 rounded-t-lg border-[1px] border-neutral-15 bg-primary-50 px-5">
                  <div className="-mb-[1.7px] -ml-2 border-t-[1px] border-primary-75">
                    <div className="flex h-[2.6563rem] items-center justify-center border-r border-neutral-30/30 pr-[0.375rem]">
                      <TypescriptLogo className="h-4 w-4 text-neutral-65" />
                      <span className="font-codeRegular  pl-2 font-FiraCode-Regular text-[0.875rem] leading-[1.25rem] text-neutral-65">
                        {child1}
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
                  style={a11yLight}
                  className="rounded-b-lg border-[0.0625rem] border-neutral-15/60"
                  customStyle={{
                    paddingTop: '3rem',
                    paddingBottom: '3rem',
                    paddingLeft: '1rem',
                    paddingRight: '3rem',
                  }}
                >
                  {child2 as string}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default BrowserWindow;
