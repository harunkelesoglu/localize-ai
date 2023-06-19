# celsus-ai/localize

**celsus-ai/localize** is a localization library for applications that require localization. It integrates with Git hooks and performs necessary configurations to provide translations in the target language based on the key-value relationships in the selected base language. The library utilizes the OpenAI API to perform the translations.

## Installation

Install the library using npm:

```
npm install --save-dev @celsus-ai/localize
```

## Usage

To use the **celsus-ai/localize** library, follow these steps:

1. You should follow the directory structure below. languageCode.json file should be structured in a valid JSON format, where keys represent the source language strings, and values represent the translations in the respective language

```
locales/
  ├── en.json
  ├── tr.json
  ├── es.json
  └── fr.json
  └── ....
```

2. The library requires a configuration file (`localize-ai.config.js`) in the root directory of your project. Here's an example of the configuration file:

```javascript
module.exports = {
    localesDir: "./locales",  
    baseLanguage: "en",    // Replace it with any ISO 639-1 codes of your choice.
    targetLanguages: ['fr', 'es', 'de','tr'],
    apiKey: "YOUR_OPENAI_API_KEY"
}
```

3. Add a new script to run localize pre-commit:

```json
{
    "scripts": {
        "localize":"node -r @celsus-ai/localize"
    }
}
```

Make sure to replace `'YOUR_OPENAI_API_KEY'` with your actual OpenAI API key.

## License

This library is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

## Contributing

Contributions are welcome! Please follow the [contribution guidelines](CONTRIBUTING.md) when making contributions to this project.

## Acknowledgements

This library is built upon various open-source packages and technologies. We would like to express our gratitude to the developers and contributors of those projects.

## Contact

If you have any questions or feedback, feel free to contact us at [harunkelesoglu_@hotmail.com](mailto:harunkelesoglu_@hotmail.com).

Enjoy using **celsus-ai/localize** and simplify your localization workflow with AI-powered translations!