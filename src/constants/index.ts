export enum LanguageCodes {
  "Afrikaans" = "af",
  "Albanian" = "sq",
  "Amharic" = "am",
  "Arabic" = "ar",
  "Armenian" = "hy",
  "Azerbaijani" = "az",
  "Basque" = "eu",
  "Belarusian" = "be",
  "Bengali" = "bn",
  "Bosnian" = "bs",
  "Bulgarian" = "bg",
  "Catalan" = "ca",
  "Cebuano" = "ceb",
  "Chichewa" = "ny",
  "Chinese (Simplified)" = "zh-cn",
  "Chinese (Traditional)" = "zh-tw",
  "Corsican" = "co",
  "Croatian" = "hr",
  "Czech" = "cs",
  "Danish" = "da",
  "Dutch" = "nl",
  "English" = "en",
  "Esperanto" = "eo",
  "Estonian" = "et",
  "Filipino" = "tl",
  "Finnish" = "fi",
  "French" = "fr",
  "Frisian" = "fy",
  "Galician" = "gl",
  "Georgian" = "ka",
  "German" = "de",
  "Greek" = "el",
  "Gujarati" = "gu",
  "Haitian Creole" = "ht",
  "Hausa" = "ha",
  "Hawaiian" = "haw",
  "Hebrew" = "iw",
  "Hindi" = "hi",
  "Hmong" = "hmn",
  "Hungarian" = "hu",
  "Icelandic" = "is",
  "Igbo" = "ig",
  "Indonesian" = "id",
  "Irish" = "ga",
  "Italian" = "it",
  "Japanese" = "ja",
  "Javanese" = "jv",
  "Kannada" = "kn",
  "Kazakh" = "kk",
  "Khmer" = "km",
  "Kinyarwanda" = "rw",
  "Korean" = "ko",
  "Kurdish (Kurmanji)" = "ku",
  "Kyrgyz" = "ky",
  "Lao" = "lo",
  "Latin" = "la",
  "Latvian" = "lv",
  "Lithuanian" = "lt",
  "Luxembourgish" = "lb",
  "Macedonian" = "mk",
  "Malagasy" = "mg",
  "Malay" = "ms",
  "Malayalam" = "ml",
  "Maltese" = "mt",
  "Maori" = "mi",
  "Marathi" = "mr",
  "Mongolian" = "mn",
  "Myanmar (Burmese)" = "my",
  "Nepali" = "ne",
  "Norwegian" = "no",
  "Odia (Oriya)" = "or",
  "Pashto" = "ps",
  "Persian" = "fa",
  "Polish" = "pl",
  "Portuguese" = "pt",
  "Punjabi" = "pa",
  "Romanian" = "ro",
  "Russian" = "ru",
  "Samoan" = "sm",
  "Scots Gaelic" = "gd",
  "Serbian" = "sr",
  "Sesotho" = "st",
  "Shona" = "sn",
  "Sindhi" = "sd",
  "Sinhala" = "si",
  "Slovak" = "sk",
  "Slovenian" = "sl",
  "Somali" = "so",
  "Spanish" = "es",
  "Sundanese" = "su",
  "Swahili" = "sw",
  "Swedish" = "sv",
  "Tajik" = "tg",
  "Tamil" = "ta",
  "Tatar" = "tt",
  "Telugu" = "te",
  "Thai" = "th",
  "Turkish" = "tr",
  "Turkmen" = "tk",
  "Ukrainian" = "uk",
  "Urdu" = "ur",
  "Uyghur" = "ug",
  "Uzbek" = "uz",
  "Vietnamese" = "vi",
  "Welsh" = "cy",
  "Xhosa" = "xh",
  "Yiddish" = "yi",
  "Yoruba" = "yo",
  "Zulu" = "zu"
};


export enum Platform {
  github = "github",
  bitbucket = "bitbucket"
};

export const RegexPatterns = {
  bitbucket: /bitbucket\.org\/([^\/]+)\/([^\/]+)\.git/,
  github: /github\.com\/([^\/]+)\/([^\/]+)\.git/
};

export const Commit = {
  title: "\"chore: [Localize AI] Translation Update\"",
  description: "\"[Localize AI] Translations completed\""
};

export const GithubAPI = {
  baseUrl: 'https://api.github.com/repos/',
  token: process.env.GH_TOKEN || process.env.GITHUB_TOKEN
};

export const BitbucketAPI = {
  baseUrl: 'https://api.bitbucket.org/2.0/repositories/',
  token: process.env.BITBUCKET_TOKEN
};

export const ConfigConstants = {
  configPath: './localize-ai.config.js',
  packageJsonPath: './package.json',
  localesDir: './locales',
  projectDir: './',
  openAIKey: process.env.OPENAI_API_KEY || 'your-api-key',
  email: 'localize@celsus-ai.com',
  username:"celsus-ai/localize"
}

export enum SortBy  {
  'asceding' = 'asc',
  'desceding' = 'desc'
}