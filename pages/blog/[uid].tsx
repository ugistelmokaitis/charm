import type { GetStaticPaths, GetStaticProps } from 'next';
import type { FC } from 'react';
import { Fragment } from 'react';
import type { SliceZoneProps, SliceZoneComponents } from '@prismicio/react';
import { PrismicRichText, PrismicLink, SliceZone } from '@prismicio/react';
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
import Container from '../../components/container';
import type { BlogProps } from '../../types/blog';

type IBlogpost = {
  uid: string;
  settings: SettingsProps;
  data: BlogpostProps['data'];
  blogposts: BlogpostProps[];
  slices2: SliceZoneProps['slices'];
  blogpage: BlogProps;
};

const Blogpost: FC<IBlogpost> = ({
  data,
  settings,
  blogposts,
  uid,
  blogpage,
}) => {
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);
  const blogCategoryCapitalized = capitalize(data.blogCateogry.uid ?? '');

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
      image={data.coverImage}
    >
      <div className="overflow-hidden bg-neutral-0 dark:bg-neutral-100">
        <Container>
          <div className="gap-8 pt-[8.5rem] sm:gap-12 md:grid-cols-12 lg:grid lg:pt-44">
            <div className="col-span-12 flex items-center justify-center md:text-center">
              <PrismicRichText field={data.blogTitle} />
            </div>
            <div className="col-span-10 col-start-2 mt-12 flex justify-start md:justify-center lg:mt-0">
              {data.author.map(({ image, name, instagramUsername }, index) => (
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
                    <div className="block pl-4 md:text-left">
                      <p className="font-codeRegular font-FiraCode_Regular text-[16px] text-neutral-100 dark:text-neutral-0">
                        {name}
                      </p>
                      <p className="font-codeRegular font-FiraCode_Regular text-[16px] text-neutral-50 dark:text-neutral-30">
                        {data.country}
                      </p>
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
            <div className="col-span-12 flex justify-start md:justify-center">
              <div className="block items-center sm:gap-8 md:mt-1 lmd:flex lmd:items-baseline">
                <div className="1xs:flex 1xs:items-baseline 1xs:gap-8 sm:items-baseline sm:gap-8">
                  <div className="mt-12 flex items-center lg:mt-0">
                    <p className="ABCWhyteEdu-Medium pr-2 font-medium text-neutral-100 dark:text-neutral-0">
                      Date:
                    </p>
                    <p className="ABCWhyteEdu-Medium font-[350] text-neutral-65 dark:text-neutral-15">
                      {format(
                        parse(data.blogDate, 'yyyy-MM-dd', new Date()),
                        'MMMM dd, yyyy'
                      )}
                    </p>
                  </div>
                  <div className="items-center 1xs:flex">
                    <div className="flex items-baseline">
                      <p className="ABCWhyteEdu-Medium mt-4 pr-2 font-medium text-neutral-100 dark:text-neutral-0">
                        Category:
                      </p>

                      <div className="rounded-[2.25rem] bg-primary-25 px-4 py-1 dark:bg-neutral-65 dark:text-neutral-15">
                        <p className="ABCWhyteEdu-Medium  text-[14px] font-[350] leading-[20px] text-neutral-65 dark:bg-neutral-65 dark:text-neutral-0">
                          {blogCategoryCapitalized}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-10 col-start-2 mt-8 sm:mt-28 lg:mt-16">
              <Image
                src={data.blogImage.url ?? ''}
                alt={data.blogImage.alt ?? ''}
                width={1036}
                height={648}
                layout="responsive"
                quality={100}
              />
            </div>
            <SliceZone
              slices={data.slices2}
              components={components as unknown as SliceZoneComponents}
            />
          </div>
          <div className="mt-20 mb-16 lg:mt-28 lg:mb-16">
            <Divider />
          </div>
        </Container>
      </div>
      <Container>
        <div className="grid-starts-1 text-white-100 gap-16 md:grid-cols-12 md:gap-8 lg:grid">
          <div className="col-span-12 flex flex-wrap justify-end">
            <div className="mx-auto block items-center gap-8 sm:mx-0 sm:flex">
              <p className="ABCWhyteEdu-Medium mb-6 font-[350] text-neutral-100 dark:text-neutral-0 sm:mb-0">
                Share this article:
              </p>
              <div className="block gap-4 sm:flex sm:items-center sm:justify-center">
                <div className="mb-4 sm:mb-0">
                  <BlogButton
                    onClick={copyToClipboard}
                    LeftIcon={CopyLinkSvgIcon}
                    text="Copy link"
                  />
                </div>
                <div className="flex gap-4">
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
          </div>
        </div>

        <div className="mb-12 mt-20 text-center sm:mt-28">
          <PrismicRichText field={blogpage.data.casestudyTitle} />
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
                      width={470}
                      height={293}
                      layout="responsive"
                      quality={100}
                      priority
                    />
                  </div>
                  <div className="mt-8 flex">
                    <p className="font-FiraCode-SemiBold text-[1rem] font-semibold text-primary-100 dark:text-blue-100">
                      {format(
                        parse(post.data.blogDate, 'yyyy-MM-dd', new Date()),
                        'MMMM dd, yyyy'
                      )}
                      <span className="pl-3 pr-3">|</span>
                    </p>
                    <p className="font-FiraCode-SemiBold text-[1rem] font-semibold text-primary-100 dark:text-blue-100">
                      {post.data.blogCateogry.uid}
                    </p>
                  </div>
                  <div>
                    <h2 className="ABCWhyteEdu-Medium mt-4 text-pm2 font-medium text-neutral-100 dark:text-neutral-0 sm:text-pm1">
                      {asText(post.data.blogTitle)}
                    </h2>
                  </div>
                  <div className="mt-4 flex items-center">
                    <p className="ABCWhyteEdu-Book text-pm3  font-[350] text-neutral-65 dark:text-neutral-15 sm:text-pm2">
                      {post.data.blogDescription}
                    </p>
                  </div>
                </PrismicLink>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const blogpage = (await getPage('blog')) as BlogProps;
  const blogposts = await getPages('blog-post');
  const { uid, data } = await getPage(params?.uid as string, 'blog-post');
  const settings = (await getPage('settings')) as SettingsProps;

  return {
    props: {
      uid,
      data,
      settings,
      blogposts,
      blogpage,
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
