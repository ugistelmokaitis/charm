import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import { PrismicLink, PrismicRichText } from '@prismicio/react';
import Image from 'next/image';
import { asText } from '@prismicio/helpers';
import Layout from '../../components/layout';
import { getPage, getPages } from '../../utils/prismic';
import type { BlogProps, BlogCategoryProps } from '../../types/blog';
import type { BlogpostProps } from '../../types/blogpost';
import type { SettingsProps } from '../../types/settings';
import Container from '../../components/container';

type IBlog = {
  data: BlogProps['data'];
  settings: SettingsProps;
  blogposts: BlogpostProps[];
  blogcategories: BlogCategoryProps[];
};

const Blog: FC<IBlog> = ({ data, settings, blogposts, blogcategories }) => (
  <Layout
    title={data.titleTag}
    description={data.metaDescription}
    settings={settings}
  >
    <div className="block bg-neutral-0 selection:bg-primary-50 selection:text-neutral-100 dark:bg-neutral-100">
      <Container>
        <div className="grid-starts-1 gap-16 pt-56 md:grid-cols-12 md:gap-8 lg:grid">
          <div className="col-span-4 mb-20 lg:mb-28">
            <PrismicRichText field={data.introTitle} />
          </div>
        </div>
        <div className="mb-20">
          {blogcategories.map((category) => (
            <a
              key={category.data.category}
              href={`/blog/tag/${category.uid}`}
              className="font-ABCWhyteEdu_Medium p-4 text-pSMSemiBold font-normal tracking-[0.02em] text-neutral-100 dark:text-neutral-0 md:text-pLGSemiBold"
            >
              {category.data.category}
            </a>
          ))}
        </div>
      </Container>
      <div>
        <Container>
          <div className="grid grid-cols-1 gap-y-12 gap-x-4 sm:grid-cols-2">
            {blogposts.map((blogpost, index) => (
              <div
                key={index}
                className="group rounded-lg p-4 hover:bg-neutral-0 hover:shadow-sm dark:hover:bg-neutral-80"
              >
                <div className="lg:pt-4">
                  <PrismicLink document={blogpost}>
                    <div className="overflow-hidden rounded-t-lg rounded-b-lg">
                      <Image
                        src={blogpost.data.blogImage.url ?? ''}
                        alt={blogpost.data.blogImage.alt ?? ''}
                        width={515}
                        height={242}
                        layout="responsive"
                        quality={100}
                        priority
                      />
                    </div>
                    <div className="mt-8">
                      <p>{blogpost.data.blogDate}</p>
                      <div className="font-ABCWhyteEdu_Medium text-pSMSemiBold font-bold tracking-[0.02em] text-neutral-100 dark:text-neutral-0 md:text-pLGSemiBold">
                        {asText(blogpost.data.blogTitle)}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center">
                      <p className="font-ABCWhyteEdu_Medium text-pMDRegular font-normal tracking-[0.02em] text-neutral-80 dark:text-neutral-15">
                        {blogpost.data.blogDescription}
                      </p>
                    </div>
                  </PrismicLink>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const { data } = (await getPage('blog')) as BlogProps;
  const blogposts = (await getPages('blog-post')) as BlogpostProps[];
  const settings = (await getPage('settings')) as SettingsProps;
  const blogcategories = await getPages('blog-category');

  return {
    props: {
      data,
      blogposts,
      settings,
      blogcategories,
    },
  };
};

export default Blog;
