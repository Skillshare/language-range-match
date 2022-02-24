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

  console.log(extendedLookup(['en-CH-1991', 'de-CH'], ['de-*-1991']));
  // {
  //   matchedRange: 'de-*-1991',
  //   matchingTag: 'de-CH'
  // }
```

## Caveats

-   Any ranges not matching the regexp for the corresponding range type will be ignored. Keep in mind basic ranges are
    valid extended ranges but extended ranges are not always valid basic ranges.
    -   Basic range RegExp: `/^(\*|([a-zA-Z]{1,8}(-[a-zA-Z0-9]{1,8})\*))$/`
    -   Extended range RegExp: `/^([a-zA-Z]{1,8}|\*)(-([a-zA-Z0-9]{1,8}|\*))*$/`
-   The RFC does not provide explicit requirements for lookup on extended ranges. Our implementation makes the following
    decisions:
    -   The full wildcard tag is invalid and skipped.
    -   Wildcards as subtags are valid. Wildcards in all positions **except the last subtag** may encompass multiple
        subtags. Wildcards in the last position may encompass one subtag.
    -   Wildcards in the first subtag are valid, but will never be considered in isolation as we strip subtags off the
        range.
        -   For example, the range `*-GB` would match the tag `en-GB` but not `en`.
