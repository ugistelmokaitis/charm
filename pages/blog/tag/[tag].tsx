import type { GetStaticPaths, GetStaticProps } from 'next';
import type { FC } from 'react';
import { PrismicLink, PrismicRichText } from '@prismicio/react';
import Image from 'next/image';
import { asText } from '@prismicio/helpers';
import { useRouter } from 'next/router';
import { format, parse } from 'date-fns';
import Layout from '../../../components/layout';
import { getPage, getPages } from '../../../utils/prismic';
import type { BlogProps, BlogCategoryProps } from '../../../types/blog';
import type { BlogpostProps } from '../../../types/blogpost';
import type { SettingsProps } from '../../../types/settings';
import Container from '../../../components/container';

type IBlog = {
  data: BlogProps['data'];
  settings: SettingsProps;
  blogposts: BlogpostProps[];
  blogcategories: BlogCategoryProps[];
};

const Blog: FC<IBlog> = ({ data, settings, blogposts, blogcategories }) => {
  const router = useRouter();

  const capitalizeFirstLetter = (string: string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  return (
    <Layout
      title={`${capitalizeFirstLetter(router.query.tag as string)} | Blog Page`}
      description={`${capitalizeFirstLetter(
        router.query.tag as string
      )} | Read my most recent blog articles on how to make your website better. I have something for everyone, from coding advice to methods for improving website performance.`}
      settings={settings}
    >
      <div className="block bg-neutral-0 selection:bg-primary-50 selection:text-neutral-100 dark:bg-neutral-100">
        <Container>
          <div className="grid-starts-1 gap-5 pt-[8.5rem] md:grid-cols-12 lg:pt-44">
            <div className="col-span-4 mb-20 lg:mb-28">
              <PrismicRichText field={data.introTitle} />
            </div>
          </div>
          <div className="grid grid-cols-2 pb-12 sm:flex sm:grid-cols-none">
            <PrismicLink
              href="/blog"
              className="ABCWhyteEdu-Medium ABCWhyteEdu-Medium rounded-md py-[0.75rem] px-[0.75rem] text-pm3 font-normal text-neutral-50 hover:bg-primary-25 dark:text-neutral-30 dark:hover:bg-neutral-80 sm:text-pm2"
            >
              All Topics
            </PrismicLink>
            {blogcategories.map((category) => (
              <a
                key={category.data.category}
                href={`/blog/tag/${category.uid}`}
                className={`${`ABCWhyteEdu-Medium ABCWhyteEdu-Medium rounded-md py-[0.75rem] px-[0.75rem] text-pm3 font-normal text-neutral-50 hover:bg-primary-25 dark:text-neutral-30 dark:hover:bg-neutral-80 sm:text-pm2`} ${
                  category.uid === router.query.tag
                    ? 'font-medium  text-[#111827] dark:text-[#FFFFFF]'
                    : ''
                }`}
              >
                {category.data.category}
              </a>
            ))}
          </div>
        </Container>
        <div>
          <Container>
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-y-12 sm:gap-x-4 ">
              {blogposts.map((blogpost, index) => (
                <div
                  key={index}
                  className="group rounded-lg p-4 hover:bg-neutral-0 hover:shadow-sm dark:hover:bg-neutral-80"
                >
                  <PrismicLink document={blogpost}>
                    <div className="overflow-hidden rounded-t-lg rounded-b-lg">
                      <Image
                        src={blogpost.data.blogImage.url ?? ''}
                        alt={blogpost.data.blogImage.alt ?? ''}
                        width={576}
                        height={360}
                        layout="responsive"
                        quality={100}
                        priority
                      />
                    </div>
                    <div className="mt-8 flex">
                      <p className="font-FiraCode-SemiBold text-[1rem] font-semibold text-primary-100 dark:text-blue-100">
                        {format(
                          parse(
                            blogpost.data.blogDate,
                            'yyyy-MM-dd',
                            new Date()
                          ),
                          'MMMM dd, yyyy'
                        )}
                        <span className="pr-[0.0625rem] pl-[0.0625rem] sm:pr-1 sm:pl-1 md:pr-3 md:pl-3">
                          |
                        </span>
                      </p>
                      <p className="font-FiraCode-SemiBold text-[1rem] font-semibold text-primary-100 dark:text-blue-100">
                        {blogpost.data.blogCateogry.uid}
                      </p>
                    </div>
                    <div>
                      <h2 className="ABCWhyteEdu-Medium mt-4 text-pm2 font-medium text-neutral-100 dark:text-neutral-0 sm:text-pm1">
                        {asText(blogpost.data.blogTitle)}
                      </h2>
                    </div>
                    <div className="mt-2 flex items-center">
                      <p className="ABCWhyteEdu-Book text-pm3  font-[350] text-neutral-65 dark:text-neutral-15 sm:text-pm2">
                        {blogpost.data.blogDescription}
                      </p>
                    </div>
                  </PrismicLink>
                </div>
              ))}
            </div>
          </Container>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = (await getPage('blog')) as BlogProps;
  const blogposts = (await getPages('blog-post')) as BlogpostProps[];
  const settings = (await getPage('settings')) as SettingsProps;
  const blogcategories = await getPages('blog-category');

  return {
    props: {
      data,
      settings,
      blogcategories,
      blogposts: blogposts.filter(
        (blogpost) => blogpost.data.blogCateogry.uid === params?.tag
      ),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blogcategories = await getPages('blog-category');
  const paths = blogcategories.map(({ uid }) => ({
    params: {
      tag: uid,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default Blog;
