import { basicFilter, basicLookup, extendedFilter } from ".."

describe("Range Matchers", () => {
    describe("Basic Filter", () => {
        it.each`
            supportedTags                       | acceptedRanges        | matchedTags
            ${['de-de']}                        | ${['*']}              | ${['de-de']}
            ${['de-DE']}                        | ${['*']}              | ${['de-DE']}
            ${['de-DE-1996']}                   | ${['*']}              | ${['de-DE-1996']}
            ${['de-Deva']}                      | ${['*']}              | ${['de-Deva']}
            ${['de-Latn-DE']}                   | ${['*']}              | ${['de-Latn-DE']}
            ${['de']}                           | ${['de']}             | ${['de']}
            ${['DE']}                           | ${['de']}             | ${['DE']}
            ${['de']}                           | ${['de']}             | ${['de']}
            ${['de-DE']}                        | ${['de']}             | ${['de-DE']}
            ${['DE-DE']}                        | ${['de']}             | ${['DE-DE']}
            ${['de-de']}                        | ${['de-de']}          | ${['de-de']}
            ${['de-DE']}                        | ${['de-de']}          | ${['de-DE']}
            ${['de-de']}                        | ${['de-DE']}          | ${['de-de']}
            ${['de-DE-1996']}                   | ${['de-de']}          | ${['de-DE-1996']}
            ${['de-Deva']}                      | ${['de-de']}          | ${[]}
            ${['de-Latn-DE']}                   | ${['de-de']}          | ${[]}
            ${['en']}                           | ${['de-de']}          | ${[]}
            ${['en']}                           | ${['de']}             | ${[]}
            ${['de-CH-1996']}                   | ${['de-CH']}          | ${['de-CH-1996']}
            ${['nb']}                           | ${['no']}             | ${[]}
            ${['zh-Hans']}                      | ${['zh-CN']}          | ${[]}
            ${['de-de', 'de', 'en-GB', 'en']}   | ${['de']}             | ${['de-de', 'de']}
            ${['de-de', 'de', 'en-GB', 'en']}   | ${['en']}             | ${['en-GB', 'en']}
            ${['de-de', 'de', 'en-GB', 'en']}   | ${['de', 'en']}       | ${['de-de', 'de', 'en-GB', 'en']}
            ${['de-de', 'de', 'en-GB', 'en']}   | ${['en', 'de']}       | ${['en-GB', 'en', 'de-de', 'de']}
            ${['de-de', 'de', 'en-GB', 'en']}   | ${['en-gb', 'de-de']} | ${['en-GB', 'de-de']}
            ${['de-de', 'de', 'en-GB', 'en']}   | ${['de-de', 'de']}    | ${['de-de', 'de']}
        `("Selects matching tags from ranges", ({supportedTags, acceptedRanges, matchedTags}) => {
            expect(basicFilter(supportedTags, acceptedRanges)).toEqual(matchedTags);
        })
    })

    describe("Extended filter", () => {
        it.each`
            supportedTags                                                               | acceptedRanges        | matchedTags
            ${['de-de']}                                                                | ${['*']}              | ${['de-de']}
            ${['de-DE']}                                                                | ${['*']}              | ${['de-DE']}
            ${['de-Latn-DE']}                                                           | ${['*']}              | ${['de-Latn-DE']}
            ${['de-Latf-DE']}                                                           | ${['*']}              | ${['de-Latf-DE']}
            ${['de-DE-x-goethe']}                                                       | ${['*']}              | ${['de-DE-x-goethe']}
            ${['de-Latn-DE-1996']}                                                      | ${['*']}              | ${['de-Latn-DE-1996']}
            ${['de-Deva-DE']}                                                           | ${['*']}              | ${['de-Deva-DE']}
            ${['de']}                                                                   | ${['*']}              | ${['de']}
            ${['de-x-DE']}                                                              | ${['*']}              | ${['de-x-DE']}
            ${['de-Deva']}                                                              | ${['*']}              | ${['de-Deva']}
            ${['de-DE']}                                                                | ${['de-DE']}          | ${['de-DE']}
            ${['de-de']}                                                                | ${['de-DE']}          | ${['de-de']}
            ${['de-Latn-DE']}                                                           | ${['de-DE']}          | ${['de-Latn-DE']}
            ${['de-Latf-DE']}                                                           | ${['de-DE']}          | ${['de-Latf-DE']}
            ${['de-DE-x-goethe']}                                                       | ${['de-DE']}          | ${['de-DE-x-goethe']}
            ${['de-Latn-DE-1996']}                                                      | ${['de-DE']}          | ${['de-Latn-DE-1996']}
            ${['de-Deva-DE']}                                                           | ${['de-DE']}          | ${['de-Deva-DE']}
            ${['de']}                                                                   | ${['de-DE']}          | ${[]}
            ${['de-x-DE']}                                                              | ${['de-DE']}          | ${[]}
            ${['de-Deva']}                                                              | ${['de-DE']}          | ${[]}
            ${['en']}                                                                   | ${['de-de']}          | ${[]}
            ${['en']}                                                                   | ${['de']}             | ${[]}
            ${['de-CH-1996']}                                                           | ${['de-CH']}          | ${['de-CH-1996']}
            ${['nb']}                                                                   | ${['no']}             | ${[]}
            ${['zh-Hans']}                                                              | ${['zh-CN']}          | ${[]}
            ${['de-DE']}                                                                | ${['de-*-DE']}        | ${['de-DE']}
            ${['de-de']}                                                                | ${['de-*-DE']}        | ${['de-de']}
            ${['de-Latn-DE']}                                                           | ${['de-*-DE']}        | ${['de-Latn-DE']}
            ${['de-Latf-DE']}                                                           | ${['de-*-DE']}        | ${['de-Latf-DE']}
            ${['de-DE-x-goethe']}                                                       | ${['de-*-DE']}        | ${['de-DE-x-goethe']}
            ${['de-Latn-DE-1996']}                                                      | ${['de-*-DE']}        | ${['de-Latn-DE-1996']}
            ${['de-Deva-DE']}                                                           | ${['de-*-DE']}        | ${['de-Deva-DE']}
            ${['de']}                                                                   | ${['de-*-DE']}        | ${[]}
            ${['de-x-DE']}                                                              | ${['de-*-DE']}        | ${[]}
            ${['de-Deva']}                                                              | ${['de-*-DE']}        | ${[]}
            ${['de-de', 'de', 'en-GB', 'en']}                                           | ${['de']}             | ${['de-de', 'de']}
            ${['de-de', 'de', 'en-GB', 'en']}                                           | ${['en']}             | ${['en-GB', 'en']}
            ${['de-de', 'de', 'en-GB', 'en']}                                           | ${['de', 'en']}       | ${['de-de', 'de', 'en-GB', 'en']}
            ${['de-de', 'de', 'en-GB', 'en']}                                           | ${['en', 'de']}       | ${['en-GB', 'en', 'de-de', 'de']}
            ${['de-de', 'de', 'en-GB', 'en']}                                           | ${['en-gb', 'de-de']} | ${['en-GB', 'de-de']}
            ${['de-de', 'de', 'en-GB', 'en']}                                           | ${['de-de', 'de']}    | ${['de-de', 'de']}
            ${['de', 'de-de', 'de-DE-x-goethe', 'de-Deva', 'de-Deva-DE', 'de-x-DE']}    | ${['de-*-DE']}        | ${['de-de', 'de-DE-x-goethe', 'de-Deva-DE']}
        `("Selects matching tags from ranges", ({supportedTags, acceptedRanges, matchedTags}) => {
            expect(extendedFilter(supportedTags, acceptedRanges)).toEqual(matchedTags);
        });
    })

    describe("Basic Lookup", () => {
        //[['de-CH', 'fr-CH', 'it-CH'], '*-CH', 'de-CH'] 
        //Not included since this is restricted to basic ranges.
        it.each`
            supportedTags                                           | acceptedRanges        | matchedTag
            ${['de-de']}                                            | ${undefined}                          | ${undefined}
            ${['de-de']}                                            | ${['*']}                              | ${undefined}
            ${['de-DE']}                                            | ${['*']}                              | ${undefined}
            ${['en-GB']}                                            | ${['de-CH']}                          | ${undefined}
            ${['en-GB', 'de-CH-1996']}                              | ${['de-CH']}                          | ${undefined}
            ${['en-GB', 'de-CH']}                                   | ${['de-CH']}                          | ${'de-CH'}
            ${['en-GB','de']}                                       | ${['de-CH']}                          | ${'de'}
            ${['en-GB', 'en', 'ja-JP', 'ja']}                       | ${['fr-FR', 'zh-Hant']}               | ${undefined}
            ${['en-GB', 'en', 'zh-Hans', 'zh-Hant', 'zh']}          | ${['fr-FR', 'zh-Hant']}               | ${'zh-Hant'}
            ${['en-GB', 'en', 'zh-Hans', 'zh-Hant', 'zh', 'fr']}    | ${['fr-FR', 'zh-Hant']}               |  ${'fr'}
            ${['en-GB', 'en', 'zh-Hans', 'zh-Hant', 'zh', 'fr']}    | ${['zh-Hant', 'fr-FR']}               | ${'zh-Hant'}
            ${['en-GB', 'en', 'zh-Hans', 'zh-Hant', 'zh']}          | ${['zh-Hant-CN-x-private1-private2']} | ${'zh-Hant'}
        `("Selects correct lookup tag", ({supportedTags, acceptedRanges, matchedTag}) => {
            expect(basicLookup(supportedTags, acceptedRanges)).toEqual(matchedTag);
        });
    });
});