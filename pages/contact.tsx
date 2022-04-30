import type { GetStaticProps } from 'next';
import type { FC, FormEventHandler } from 'react';
import { useState } from 'react';
import { PrismicRichText } from '@prismicio/react';
import toast from 'react-hot-toast';
import Image from 'next/image';
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
      toast.custom(
        (type) => (
          <div
            className={`${
              type.visible ? 'animate-enter' : 'animate-leave'
            }  border:bg-neutral-30 flex w-full max-w-sm rounded-[1rem] border-[0.03125rem] bg-neutral-100 shadow-lg `}
          >
            <div className=" flex-1 rounded-[1rem] p-4 dark:bg-neutral-65 ">
              <div className="flex items-start">
                <div>
                  <Image
                    src={data.botProfileImage.url ?? ''}
                    alt={data.botProfileImage.alt ?? ''}
                    width={24}
                    height={24}
                    layout="fixed"
                    quality={100}
                  />
                </div>

                <div className="ml-3 flex-1">
                  <p className="font-ABCWhyteEdu_Regular text-[14px] font-normal text-neutral-0">
                    Typing Error
                  </p>
                  <p className="mt-1 font-ABCWhyteEdu_Regular text-[16px] font-normal text-neutral-15">
                    Hey {capitalize(name.split(' ')[0])}, Please enter a valid
                    website 🚫
                  </p>
                </div>
              </div>
            </div>
            <div className="flex" />
          </div>
        ),
        {
          duration: 4000,
        }
      );

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

      toast.custom(
        (type) => (
          <div
            className={`${
              type.visible ? 'animate-enter' : 'animate-leave'
            }  border:bg-neutral-30 flex w-full max-w-sm rounded-[1rem] border-[0.03125rem] bg-neutral-100 shadow-lg `}
          >
            <div className=" flex-1 rounded-[1rem] p-4 dark:bg-neutral-65 ">
              <div className="flex items-start">
                <div className="">
                  <div>
                    <Image
                      src={data.profileImage.url ?? ''}
                      alt={data.profileImage.alt ?? ''}
                      width={24}
                      height={24}
                      layout="fixed"
                      quality={100}
                    />
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <p className="font-ABCWhyteEdu_Regular text-[14px] font-normal text-neutral-0">
                    {data.profileFullName}
                  </p>
                  <p className="mt-1 font-ABCWhyteEdu_Regular text-[16px] font-normal text-neutral-15">
                    Hi {capitalize(name.split(' ')[0])}, thank you for getting
                    in contact with me! ✨
                  </p>
                </div>
              </div>
            </div>
            <div className="flex" />
          </div>
        ),
        {
          duration: 4000,
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
      <div className="flex bg-neutral-0 selection:bg-primary-50 selection:text-neutral-100 dark:bg-neutral-100">
        <Container>
          <div className="grid-starts-1 grid grid-cols-12 gap-16">
            <div className="col-span-4 col-start-1 pt-32">
              <PrismicRichText field={data.introTitle} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-16 pt-32 text-neutral-65 dark:text-neutral-30 md:grid-cols-12 md:gap-8">
            <div className="col-span-7">
              <form onSubmit={sendEmail}>
                <div className="group relative z-0 mb-6 w-full pb-12">
                  <input
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                    type="name"
                    name="name"
                    id="name"
                    className="font-codeRegular peer block w-full appearance-none  border-0 border-b-2 bg-transparent py-2.5 px-0 font-FiraCode_Regular text-codeMDRegular text-neutral-100 focus:outline-none focus:ring-0 dark:text-neutral-30"
                    placeholder=" "
                    required
                    autoComplete="on"
                    maxLength={50}
                  />
                  <label
                    htmlFor="name"
                    className="absolute top-1 -z-10 flex origin-[0] -translate-y-6 scale-75 transform  text-neutral-65 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary-100 dark:text-neutral-30 dark:peer-focus:text-blue-100"
                  >
                    What&apos;s your full name? *
                  </label>
                </div>

                <div className="group relative z-0 mb-6 w-full pb-12">
                  <input
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    type="email"
                    name="email"
                    id="email"
                    className="font-codeRegular peer block w-full appearance-none  border-0 border-b-2 bg-transparent py-2.5 px-0 font-FiraCode_Regular text-codeMDRegular text-neutral-100 focus:outline-none focus:ring-0 dark:text-neutral-30"
                    placeholder=" "
                    required
                    autoComplete="on"
                    maxLength={50}
                  />
                  <label
                    htmlFor="email"
                    className="absolute top-1 -z-10 flex origin-[0] -translate-y-6 scale-75 transform text-neutral-65 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary-100 dark:text-neutral-30 dark:peer-focus:text-blue-100"
                  >
                    Your fancy email *
                  </label>
                </div>

                <div className="group relative z-0 mb-6 w-full pb-12">
                  <input
                    value={company}
                    onChange={({ target }) => setCompany(target.value)}
                    type="company"
                    name="company"
                    id="company"
                    className="font-codeRegular peer block w-full appearance-none  border-0 border-b-2 bg-transparent py-2.5 px-0 font-FiraCode_Regular text-codeMDRegular text-neutral-100 focus:outline-none focus:ring-0 dark:text-neutral-30"
                    placeholder=" "
                    autoComplete="on"
                    maxLength={50}
                  />
                  <label
                    htmlFor="company"
                    className="absolute top-1 -z-10 flex origin-[0] -translate-y-6 scale-75 transform text-neutral-65 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary-100 dark:text-neutral-30 dark:peer-focus:text-blue-100"
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
                    className="font-codeRegular peer block w-full appearance-none  border-0 border-b-2 bg-transparent py-2.5 px-0 font-FiraCode_Regular text-codeMDRegular text-neutral-100 focus:outline-none focus:ring-0 dark:text-neutral-30"
                    placeholder=" "
                    required
                    autoComplete="on"
                    maxLength={50}
                  />
                  <label
                    htmlFor="website"
                    className="absolute top-1 -z-10 flex origin-[0] -translate-y-6 scale-75 transform text-neutral-65 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary-100 dark:text-neutral-30 dark:peer-focus:text-blue-100"
                  >
                    Website *
                  </label>
                </div>

                <div className="col-span-1 mb-20 pt-28 md:col-span-8 md:text-left xl:col-span-7">
                  <PrismicRichText field={data.sharedIdeaTitle} />
                  <div className="pt-4 font-ABCWhyteEdu_Regular text-pLGRegular font-normal tracking-[0.02em] text-neutral-65 dark:text-neutral-30">
                    {data.sharedIdeaSubtitle}
                  </div>
                </div>
                <div className="pt-group relative z-0 mb-6 w-full">
                  <input
                    value={message}
                    onChange={({ target }) => setMessage(target.value)}
                    type="message"
                    name="message"
                    id="message"
                    className="font-codeRegular peer block w-full appearance-none  border-0 border-b-2 bg-transparent py-2.5 px-0 font-FiraCode_Regular text-codeMDRegular text-neutral-100 focus:outline-none focus:ring-0 dark:text-neutral-30"
                    placeholder=" "
                    required
                    autoComplete="off"
                    maxLength={4999}
                  />
                  <label
                    htmlFor="message"
                    className="absolute top-1 -z-10 flex origin-[0] -translate-y-6 scale-75 transform text-neutral-65 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary-100 dark:text-neutral-30 dark:peer-focus:text-blue-100"
                  >
                    Write a Message *
                  </label>
                </div>
                <div className="mb-4 flex pt-6 pb-28">
                  <label
                    className="flex text-neutral-100 hover:animate-pulse hover:text-neutral-100 dark:text-neutral-30 dark:hover:animate-pulse dark:hover:text-neutral-15"
                    htmlFor="files"
                  >
                    <div className="pr-2">
                      <IconAddFile />
                    </div>
                    <div className="font-ABCWhyteEdu_Medium text-pSMSemiBold font-semibold tracking-[0.02em] text-neutral-100 hover:animate-pulse hover:text-neutral-100 dark:text-neutral-30  dark:hover:animate-pulse dark:hover:text-neutral-15">
                      {files.length
                        ? files.map((file) => file.name).join(', ')
                        : 'Add attachment'}
                    </div>
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
                  className="flex items-center justify-center rounded bg-primary-100 py-[0.7188rem] px-[1.8175rem] text-neutral-0 outline-none outline-[0.0625rem] active:outline-[0.125rem] active:outline-primary-50 disabled:bg-primary-25 disabled:text-neutral-30 disabled:hover:outline-none"
                  type="submit"
                >
                  <div className="">{loading ? 'Message Sent' : 'Submit'}</div>
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
