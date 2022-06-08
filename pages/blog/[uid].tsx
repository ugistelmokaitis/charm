import type { GetStaticPaths, GetStaticProps } from 'next';
import type { FC } from 'react';
import { Fragment } from 'react';
import type { SliceZoneProps, SliceZoneComponents } from '@prismicio/react';
import { PrismicLink, SliceZone } from '@prismicio/react';
import Image from 'next/image';
import { format, parse } from 'date-fns';
import { asText } from '@prismicio/helpers';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'react-share';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import { getPage, getPages } from '../../utils/prismic';
import { components } from '../../slices';
import type { SettingsProps } from '../../types/settings';
import type { BlogpostProps } from '../../types/blogpost';
import { siteUrl } from '../../next-sitemap';
import BlogButton from '../../components/blogButton';
import TwitterSvgIcon from '../../public/icons/twitter.svg';
import FacebookSvgIcon from '../../public/icons/facebook.svg';
import LinkedInSvgIcon from '../../public/icons/linkedin.svg';
import CopyLinkSvgIcon from '../../public/icons/copylink.svg';
import Divider from '../../components/divider';

type IBlogpost = {
  uid: string;
  settings: SettingsProps;
  data: BlogpostProps['data'];
  blogposts: BlogpostProps[];
  slices2: SliceZoneProps['slices'];
};

const Blogpost: FC<IBlogpost> = ({ data, settings, blogposts, uid }) => {
  const BlogPublishDate: unknown = format(
    parse(data.blogDate, 'yyyy-MM-dd', new Date()),
    'MMMM dd, yyyy'
  );

  const router = useRouter();
  const shareUrl = new URL(router.asPath, siteUrl as string | undefined).href;
  const copyToClipboard = () => {
    const el = document.createElement('textarea');
    el.value = shareUrl;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  const randomBlogPosts = blogposts
    .filter((post) => post.uid !== uid)
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);

  return (
    <Layout
      title={data.titleTag}
      description={data.metaDescription}
      settings={settings}
    >
      <div className="bg-neutral-0 selection:bg-primary-50 selection:text-neutral-100 dark:bg-neutral-100 lg:flex">
        <div className="mx-auto max-w-screen-containerlg items-center justify-between gap-8 px-4 md:px-5">
          <div className="bg-neutral-0 text-center selection:bg-primary-50 selection:text-neutral-100 dark:bg-neutral-100 lg:flex">
            <div className="grid-starts-1 text-white-100 gap-16 pt-56 md:grid-cols-12 md:gap-8 lg:grid">
              <div className="col-span-12">
                <h1 className="font-ABCWhyteEdu_Heavy text-4xl font-bold tracking-[0.02em] text-neutral-100 dark:text-neutral-0 sm:text-3xl">
                  {asText(data.blogTitle)}
                </h1>

                <div className="mt-8 flex justify-center">
                  {data.author.map(
                    ({ image, name, role, instagramUsername }, index) => (
                      <Fragment key={index}>
                        <div className="relative flex">
                          <PrismicLink
                            href={`https://www.instagram.com/${instagramUsername}`}
                          >
                            <div className="rounded-full bg-gradient-to-tr from-[#facc15] to-[#c026d3] p-[2px] transition">
                              <div className="flex self-start rounded-full bg-neutral-0 p-[2px]">
                                <Image
                                  src={image.url ?? ''}
                                  alt={image.alt ?? ''}
                                  width={45}
                                  height={45}
                                  layout="fixed"
                                  quality={100}
                                  priority
                                />
                              </div>
                            </div>
                          </PrismicLink>
                          <div className="block pl-4 text-left">
                            <p className="font-codeRegular font-FiraCode_Regular text-[16px] text-neutral-100 dark:text-neutral-0">
                              {name}
                            </p>
                            <p className="font-codeRegular font-FiraCode_Regular text-[16px] text-neutral-50 dark:text-neutral-30">
                              {role}
                            </p>
                          </div>
                        </div>
                      </Fragment>
                    )
                  )}
                </div>
                <div className="mt-6 flex justify-center">
                  <p className="font-codeRegular font-FiraCode_Regular text-[16px] text-neutral-50 dark:text-neutral-30">
                    {BlogPublishDate as string}
                  </p>
                </div>
              </div>
              <div className="col-span-12 mt-[2.875rem]">
                <Image
                  src={data.blogImage.url ?? ''}
                  alt={data.blogImage.alt ?? ''}
                  width={500}
                  height={250}
                  layout="responsive"
                  quality={100}
                  priority
                />
              </div>
              <div className="col-span-8 col-start-3">
                <div className="mt-[2.875rem] flex text-left lg:mt-10">
                  <p className="font-ABCWhyteEdu_Medium text-pMDRegular font-normal tracking-[0.02em] text-neutral-80 dark:text-neutral-15">
                    {data.blogDescription}
                  </p>
                </div>
              </div>
              <SliceZone
                slices={data.slices2}
                components={components as unknown as SliceZoneComponents}
              />
            </div>
          </div>
          <div className="mt-20 mb-16 lg:mt-28 lg:mb-16">
            <Divider />
          </div>
          <div className="grid-starts-1 text-white-100 gap-16 md:grid-cols-12 md:gap-8 lg:grid">
            <div className="col-span-12">
              <p className="mb-4">Share this article:</p>
              <BlogButton
                onClick={copyToClipboard}
                LeftIcon={CopyLinkSvgIcon}
                text="Copy link"
              />
              <div className="mt-4 flex items-center justify-center">
                <TwitterShareButton url={shareUrl}>
                  <BlogButton LeftIcon={TwitterSvgIcon} />
                </TwitterShareButton>
                <div>
                  <FacebookShareButton url={shareUrl}>
                    <BlogButton LeftIcon={FacebookSvgIcon} />
                  </FacebookShareButton>
                </div>
                <LinkedinShareButton url={shareUrl}>
                  <BlogButton LeftIcon={LinkedInSvgIcon} />
                </LinkedinShareButton>
              </div>
            </div>
          </div>
          <div className="mt-16 mb-16 lg:mt-16 lg:mb-16">
            <Divider />
          </div>
          <div className="grid grid-cols-1 gap-y-12 gap-x-4 sm:grid-cols-2">
            {randomBlogPosts.map((post) => (
              <div
                key={asText(post.data.blogTitle)}
                className="group rounded-lg p-4 hover:bg-neutral-0 hover:shadow-sm dark:hover:bg-neutral-80"
              >
                <div className="lg:pt-4">
                  <PrismicLink document={post}>
                    <div className="overflow-hidden rounded-t-lg rounded-b-lg">
                      <Image
                        src={post.data.blogImage.url ?? ''}
                        alt={post.data.blogImage.alt ?? ''}
                        width={515}
                        height={242}
                        layout="responsive"
                        quality={100}
                        priority
                      />
                    </div>
                    <div className="mt-8">
                      <div className="font-ABCWhyteEdu_Medium text-pSMSemiBold md:text-pLGSemiBold font-bold tracking-[0.02em] text-neutral-100 dark:text-neutral-0">
                        {asText(post.data.blogTitle)}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center">
                      <p className="font-ABCWhyteEdu_Medium text-pMDRegular font-normal tracking-[0.02em] text-neutral-80 dark:text-neutral-15">
                        {post.data.blogDescription}
                      </p>
                    </div>
                  </PrismicLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const blogposts = await getPages('blog-post');
  const { uid, data } = await getPage(params?.uid as string, 'blog-post');
  const settings = (await getPage('settings')) as SettingsProps;

  return {
    props: {
      uid,
      data,
      settings,
      blogposts,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blogposts = (await getPages('blog-post')) as BlogpostProps[];

  const paths = blogposts.map((post: { uid: string }) => ({
    params: {
      uid: post.uid,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default Blogpost;
