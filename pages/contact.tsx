import type { GetStaticProps } from 'next';
import type { FC, FormEventHandler } from 'react';
import { useState } from 'react';
import { PrismicRichText } from '@prismicio/react';
import toast from 'react-hot-toast';
import Layout from '../components/layout';
import { getPage } from '../utils/prismic';
import type { ContactProps } from '../types/contact';
import type { SettingsProps } from '../types/settings';
import Container from '../components/container';
import IconAddFile from '../public/icons/iconAddFile.svg';
import type { NodemailerResponse } from './api/nodemailer';

type IContact = {
  data: ContactProps['data'];
  settings: SettingsProps;
};

const emailRegex =
  // eslint-disable-next-line prefer-named-capture-group
  /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/giu;

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const Contact: FC<IContact> = ({ settings, data }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const sendEmail: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (website && !website.match(emailRegex)) {
      toast('Please enter a valid website.', {
        icon: '🚫',
      });

      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append('name', name);
    formData.append('email', email);
    formData.append('company', company);
    formData.append('website', website);
    formData.append('message', message);

    files.map((file, index) => formData.append(`file${index}`, file));

    try {
      const response = await fetch('/api/nodemailer', {
        method: 'post',
        body: formData,
      });

      const dataNode = (await response.json()) as NodemailerResponse;

      if (response.status !== 200) {
        throw new Error(dataNode.message);
      }

      toast.success(
        `Message sent successfully! We will get in touch with you ASAP! Have a great day ${capitalize(
          name
        )}`,
        {
          duration: 9000,
        }
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : (error as string);
      toast.error(errorMessage);
    }
  };

  const addFiles = (newFiles: FileList | null) => {
    if (newFiles) {
      setFiles(Array.from(newFiles));
    }
  };

  return (
    <Layout title="" description="" settings={settings}>
      <div className="flex bg-neutral-0 selection:bg-primary-50 selection:text-neutral-100 lg:grid-cols-12">
        <Container>
          <div className="grid grid-cols-1 gap-16 pb-28 pt-32 text-white-100 md:grid-cols-12 md:gap-8">
            <div className="col-span-1 md:col-span-7 md:text-left xl:col-span-7">
              <PrismicRichText field={data.introTitle} />
            </div>
          </div>
        </Container>

        <Container>
          <div className="grid grid-cols-1 gap-16 pb-28 pt-32 text-white-100 md:grid-cols-12 md:gap-8">
            <div className="col-span-6">
              <form onSubmit={sendEmail}>
                <div className="group relative z-0 mb-6 w-full">
                  <input
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                    type="name"
                    name="name"
                    id="name"
                    className="text-sm border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600 text-lightestGrey-100 peer block w-full appearance-none border-0 border-b-2 bg-transparent py-2.5 px-0 focus:outline-none focus:ring-0"
                    placeholder=" "
                    required
                    autoComplete="on"
                    maxLength={50}
                  />
                  <label
                    htmlFor="name"
                    className=" text-sm dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 text-lightGrey-100 absolute top-3 -z-10 flex origin-[0] -translate-y-6 scale-75 transform duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75"
                  >
                    Your full name<div className="pl-2 text-purple-100">*</div>
                  </label>
                </div>

                <div className="group relative z-0 mb-6 w-full">
                  <input
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    type="email"
                    name="email"
                    id="email"
                    className="text-sm text-gray-900 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600 peer block w-full appearance-none border-0 border-b-2 bg-transparent py-2.5 px-0 focus:outline-none focus:ring-0"
                    placeholder=" "
                    required
                    autoComplete="on"
                    maxLength={50}
                  />
                  <label
                    htmlFor="email"
                    className="text-sm dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 text-lightGrey-100 absolute top-3 -z-10 flex origin-[0] -translate-y-6 scale-75 transform duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75"
                  >
                    Your fancy email{' '}
                    <div className="pl-2 text-purple-100">*</div>
                  </label>
                </div>

                <div className="group relative z-0 mb-6 w-full">
                  <input
                    value={company}
                    onChange={({ target }) => setCompany(target.value)}
                    type="company"
                    name="company"
                    id="company"
                    className="text-sm border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600 text-lightestGrey-100 peer block w-full appearance-none border-0 border-b-2 bg-transparent py-2.5 px-0 focus:outline-none focus:ring-0"
                    placeholder=" "
                    autoComplete="on"
                    maxLength={50}
                  />
                  <label
                    htmlFor="company"
                    className="text-sm dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 text-lightGrey-100 absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75"
                  >
                    Company
                  </label>
                </div>

                <div className="group relative z-0 mb-6 w-full">
                  <input
                    value={website}
                    onChange={({ target }) => setWebsite(target.value)}
                    type="website"
                    name="website"
                    id="website"
                    className="text-sm border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600 text-lightestGrey-100 peer block w-full appearance-none border-0 border-b-2 bg-transparent py-2.5 px-0 focus:outline-none focus:ring-0"
                    placeholder=" "
                    required
                    autoComplete="on"
                    maxLength={50}
                  />
                  <label
                    htmlFor="website"
                    className="text-sm dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 text-lightGrey-100 absolute top-3 -z-10 flex origin-[0] -translate-y-6 scale-75 transform duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75"
                  >
                    Website <div className="pl-2 text-purple-100">*</div>
                  </label>
                </div>
                <div className="col-span-1 mb-8 text-white-100 md:col-span-7 md:text-left xl:col-span-7">
                  <PrismicRichText field={data.sharedIdeaTitle} />
                  <PrismicRichText field={data.sharedIdeaSubtitle} />
                </div>
                <div className="group relative z-0 mb-6 w-full">
                  <input
                    value={message}
                    onChange={({ target }) => setMessage(target.value)}
                    type="message"
                    name="message"
                    id="message"
                    className="text-sm border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600 text-lightestGrey-100 peer block w-full appearance-none border-0 border-b-2 bg-transparent py-2.5 px-0 focus:outline-none focus:ring-0"
                    placeholder=" "
                    required
                    autoComplete="off"
                    maxLength={5000}
                  />
                  <label
                    htmlFor="message"
                    className="text-sm dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 text-lightGrey-100 absolute top-3 -z-10 flex origin-[0] -translate-y-6 scale-75 transform duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75"
                  >
                    Write a Message{' '}
                    <div className="pl-2 text-purple-100">*</div>
                  </label>
                </div>
                <div className="mb-4">
                  <label className="flex" htmlFor="files">
                    <IconAddFile />
                    <p className="font-charmSemiBold text-lightGrey-100 pl-4 text-pSMSemiBold font-semibold  tracking-[0.02em]">
                      {files.length
                        ? files.map((file) => file.name).join(', ')
                        : 'Add attachment'}
                    </p>
                  </label>
                  <input
                    className="hidden"
                    onChange={({ target }) => addFiles(target.files)}
                    id="files"
                    name="files"
                    type="file"
                    multiple
                  />
                </div>

                <div />
                <button
                  disabled={loading || !name || !email || !website || !message}
                  className="outline-mediumGrey-100 hover:bg-darkGrey-100 disabled:bg-darkestGrey-100 disabled:text-mediumGrey-100 disabled:outline-mediumGrey-100 flex rounded-[0.25rem] pr-[1.6875rem] pl-[1.6875rem] pt-[0.8125rem] pb-[0.8125rem] outline  outline-[0.0625rem] focus:bg-opacity-0 focus:outline-purple-100"
                  type="submit"
                >
                  <div className="font-headline text-psb font-medium">
                    {loading ? '✔️ Message Sent' : 'Submit'}
                  </div>
                </button>
              </form>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = (await getPage('contact')) as ContactProps;
  const settings = (await getPage('settings')) as SettingsProps;

  return {
    props: {
      data,
      settings,
    },
  };
};

export default Contact;
