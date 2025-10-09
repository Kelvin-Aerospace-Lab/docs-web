import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';


// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Kelvin Aerospace Lab Docs',
  tagline: 'Documentation for Kelvin Aerospace Lab',
  favicon: 'img/logo.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.kelvinaero.org/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Kelvin-Aerospace-Lab', // Usually your GitHub org/user name.
  projectName: 'KALDOC', // Usually your repo name.

  onBrokenLinks: 'ignore',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          // Automatically create sidebar from the folder structure
          sidebarCollapsible: true,
          sidebarCollapsed: true,
          // Enable custom ordering with frontmatter
          numberPrefixParser: false, // Disable auto-numbering
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/Kelvin-Aerospace-Lab/docs-web',
          // Auto-generate document IDs from filenames
          id: 'default',
          // Custom sidebar items generator to respect frontmatter order
          sidebarItemsGenerator: async ({
            defaultSidebarItemsGenerator,
            numberPrefixParser: _,
            ...args
          }) => {
            const sidebarItems = await defaultSidebarItemsGenerator({
              ...args,
              numberPrefixParser: (filename: string) => {
                // Extract potential number prefix
                const match = filename.match(/^(\d+)[-_]?/);
                return {
                  filename,
                  numberPrefix: match ? Number(match[1]) : undefined,
                };
              },
            });
            
            // Sort items based on frontmatter's sidebar_position or number prefix
            const sortItems = (items) => {
              return [...items].sort((a, b) => {
                const aPos = a.customProps?.sidebar_position || a.customProps?.position || 0;
                const bPos = b.customProps?.sidebar_position || b.customProps?.position || 0;
                return aPos - bPos;
              });
            };

            return sortItems(sidebarItems);
          },
        },
        blog: false, // Disable the blog feature
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  
  // Add plugins configuration
  plugins: [
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 85,
        max: 1030,
        min: 640,
        steps: 3,
        disableInDev: false,
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/klvdoc.png',
    metadata: [
      { property: 'og:title', content: 'Kelvin Aerospace Lab Doc' },
      { name: 'og:image', content: '/img/klvdoc.png' },
      { name: 'twitter:image', content: '/img/klvdoc.png' },
      { property: 'og:description', content: 'Documentation Platform for Kelvin Aerospace Lab' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Kelvin Aerospace Lab Documentation' },
      { name: 'twitter:description', content: 'Documentation Platform for Kelvin Aerospace Lab' },
      { name: 'description', content: 'Documentation Platform for Kelvin Aerospace Lab' },
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Kelvin Aerospace Lab Docs',
      logo: {
        alt: 'Kelvin Aerospace Lab Logo',
        src: 'img/logo.png',
        href: '/',
        target: '_self',
      },
      items: [
        {
          href: 'https://www.kelvinaero.org',
          label: 'Official Website',
          position: 'left',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        {
          type: 'html',
          position: 'right',
          value: '<a href="https://github.com/Kelvin-Aerospace-Lab" target="_blank" rel="noopener noreferrer" class="navbar__item navbar__link" aria-label="GitHub repository"><svg style="width: 24px; height: 24px;" viewBox="0 0 24 24"><path fill="currentColor" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" /></svg></a>',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `© ${new Date().getFullYear()} Kelvin Aerospace Lab. All rights reserved.`,
      links: [],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
