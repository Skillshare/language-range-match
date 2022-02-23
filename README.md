# language-range-match

Filtering and lookup for language ranges matched against tags according to rfc4647

A typescript version/slight re-imagining of https://github.com/wooorm/bcp-47-match.

Huge thanks to https://github.com/wooorm for conceptual help and test cases.

## Usage

```
  console.log(basicFilter(['de-de', 'de-CH-1996', 'en-GB', 'en'], ['fr-FR', 'de-CH', 'en']));
  // [
  //   { matchedRange: 'de-CH', matchingTag: 'de-CH-1996' },
  //   { matchedRange: 'en', matchingTag: 'en-GB' },
  //   { matchedRange: 'en', matchingTag: 'en' }
  // ]

  console.log(extendedFilter(['de-DE-1996', 'de-de', 'en-GB', 'en'], ['*-1996', 'en-*']));
  // [
  //   { matchedRange: '*-1996', matchingTag: 'de-DE-1996' },
  //   { matchedRange: 'en-*', matchingTag: 'en-GB' },
  //   { matchedRange: 'en-*', matchingTag: 'en' }
  // ]

  console.log(basicLookup(['en-GB', 'en', 'zh-Hans', 'zh-Hant', 'zh'], ['zh-Hant-CN-x-private1-private2']));
  // {
  //   matchedRange: 'zh-Hant-CN-x-private1-private2',
  //   matchingTag: 'zh-Hant'
  // }
```
