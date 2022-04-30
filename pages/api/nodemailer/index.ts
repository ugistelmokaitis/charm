import nodemailer from 'nodemailer';
import formidable from 'formidable';
import type { NextApiHandler, NextApiRequest } from 'next';
import type { Attachment } from 'nodemailer/lib/mailer';

export type NodemailerResponse = {
  message: string;
};

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
    pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const formidablePromise = async (
  req: NextApiRequest,
  opts: object
): Promise<{
  files: formidable.Files;
  fields: formidable.Fields;
}> =>
  new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm(opts);

    form.parse(req, (error, fields, files) => {
      if (error) {
        return reject(error);
      }
      return resolve({ fields, files });
    });
  });

const getStringFromField = (field: string | string[]): string => {
  if (Array.isArray(field)) {
    return field[0];
  }

  return field;
};

const handler: NextApiHandler<NodemailerResponse> = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'This endpoint only accepts POST requests.',
    });
  }

  try {
    const { fields, files } = await formidablePromise(req, {});
    const fileArray = Object.values(files);

    const attachments: Attachment[] = [];

    fileArray.forEach((file) => {
      if (Array.isArray(file)) {
        file.forEach((innerFile) => {
          attachments.push({
            filename: innerFile.originalFilename ?? '',
            path: innerFile.filepath,
            contentType: innerFile.mimetype ?? '',
          });
        });
        return;
      }

      attachments.push({
        filename: file.originalFilename ?? '',
        path: file.filepath,
        contentType: file.mimetype ?? '',
      });
    });

    await transporter.sendMail({
      to: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
      from: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
      replyTo: getStringFromField(fields.email),
      subject: `Enquiry from (${getStringFromField(
        fields.name
      )}) website: (${getStringFromField(fields.website)})`,
      text: getStringFromField(fields.message),
      html: `

                <p><b>Name:</b> ${getStringFromField(fields.name)}</p>
                <p><b>Email:</b> ${getStringFromField(fields.email)}</p>
                <p><b>Website:</b> ${getStringFromField(fields.website)}</p>
                <p><b>Company:</b> ${getStringFromField(fields.company)}</p>
                <p><b>Message:</b> ${getStringFromField(fields.message).replace(
                  /(?:\r\n|\r|\n)/gu,
                  '<br>'
                )}</p>
            `,
      attachments,
    });

    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    const message = error instanceof Error ? error.message : (error as string);
    return res.status(500).json({ message });
  }
};

export default handler;
