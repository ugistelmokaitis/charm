
<div>
<h1 align="center">
  <em>Personal Website</em>
</h1>

<p align="center">
  This is personal website hosted <a href="https://ugistelmokaitis.com/" target="_blank">here</a> built with <a href="https://nextjs.org/" target="_blank">Next.js</a>, <a href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a> and hosted with <a href="https://www.vercel.com/" target="_blank">Vercel</a>.
</p>

## 🛠 Installation & Set Up

1. Clone this repository

   ```sh
   git clone https://github.com/ugistelmokaitis/charm.git
   ```

2. Change directories

   ```sh
   cd charm
   ```

3. Install dependencies

   ```sh
   yarn install
   ```

4. Create a .env.local and following the example input some environment variables so that can run normally.

   ```txt
   NEXT_PUBLIC_SITE_URL=    
   NEXT_PUBLIC_PRISMIC_ENDPOINT=""    
   NEXT_PUBLIC_PRISMIC_ACCESS_TOKEN=""    
   NEXT_PUBLIC_EMAIL_PASSWORD=""      
   NEXT_PUBLIC_EMAIL_ADDRESS=""       
   TWITTER_BEARER_TOKEN=""        
   ```
   
   
## 🔐 Verify Prismic

1. Verify acc in terminal
 
   ```sh
   prismic login
   ```
 2. <i>See Customization Prismic section</i>
 

## 🏗️ Building and Running for Production

1. Generate a full static production build

   ```sh
   yarn run dev
   ```

2. Preview the site as it will appear once deployed

   ```sh
   yarn dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.
  
 3. Access Prismic Slicemachine

   ```sh
   yarn run slicemachine
   ```
  Open [http://localhost:9999](http://localhost:9999) with your browser to see the result. 
  
  More details <a href="https://prismic.io/docs/core-concepts/slice-machine" target="_blank">What is prismic slice machine?</a>

## ✍️ Customization Prismic

1. Settings -  Header, Footer & Theme customization.
2. About - pages/about
3. Blog - pages/blog
4. Home - pages/index.tsx
5. Gear - pages/gear
6. Extensions - pages/extensions
7. Contact - pages/contact
8. Pirvacy - pages/privacy
9. Terms - pages/terms
10. Server error - pages/500.tsx
11. NotFound - pages/404.tsx

<i>! Create blog posts on prismic - green button on right hand side "Create New"</i>

## 📝 Files to customize

- `public/manifest.json` - specify basic metadata about your extension such as the name...

- `public/*` - replace all png files which contains my logo with your own logo.

- `fonts` - ensure you have the license for the fonts I use for this website. The font I use <a href="https://abcdinamo.com" target="_blank">find here</a>.

- `components/layout.tsx` - update: <b>name</b>, <b>username</b>, <b>type:</b> to your personal information .

- `pages/_app.tsx` - update meta information <b>content</b> section.

- `public/` - store assets such as images and favicons.

- `components/externalLink.tsx` - change link to your own website link.

- `tailwind.config.js` and `styles/*` - contain the tailwind stylesheet which can be modified to change the overall look and feel of the site if needed.

- `pages` - pages to route to. Read the [Next.js documentation](https://nextjs.org/docs) for more information.

- `next.config.js` - configuration related to Next.js. You need to adapt the Content Security Policy if you want to load scripts, images etc. from other domains.

- `utils/gtag.ts` - add your own google tag  
   ```sh
  export const GA_TRACKING_ID = ".....";
   ```

## 📚 Tech Stack

| Tool           | Link                                                      |
| -------------- | --------------------------------------------------------- |
| Framework      | [Next.js](https://nextjs.org/)                            |
| CMS            | [Prismic](https://prismic.io/)                            | 
| Deployment     | [Vercel](https://vercel.com)                              |
| CSS Framework  | [Tailwindcss](https://tailwindcss.com/)                   |
| Favicon        | [realfavicongenerator](https://realfavicongenerator.net/) |


## 🚀 Deploy

**Vercel**  
The easiest way to deploy the template is to use the [Vercel Platform](https://vercel.com) from the creators of Next.js. Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/ugistelmokaitis/charm)

<i>! Also ensure that <b>Environment Variables</b> are appropriately copied and saved from <i>.env.local</i> file to vercel before deploying.</i>
  

## ✌️ Protecting Copyright of designer work

Note that most of website icons belongs to © Copyright 2022-2099 <a href="https://twitter.com/bonniehong_" target="_blank">Bonnie Hong</a> 

</div>
