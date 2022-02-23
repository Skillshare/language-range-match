import { basicFilter, basicLookup, extendedFilter, extendedLookup } from '..';

describe('Range Matchers', () => {
    describe('Basic Filter', () => {
        it.each`
            supportedTags                     | acceptedRanges        | matchedTags
            ${['de-de']}                      | ${['*']}              | ${[{ matchedRange: '*', matchingTag: 'de-de' }]}
            ${['de-DE']}                      | ${['*']}              | ${[{ matchedRange: '*', matchingTag: 'de-DE' }]}
            ${['de-DE-1996']}                 | ${['*']}              | ${[{ matchedRange: '*', matchingTag: 'de-DE-1996' }]}
            ${['de-Deva']}                    | ${['*']}              | ${[{ matchedRange: '*', matchingTag: 'de-Deva' }]}
            ${['de-Latn-DE']}                 | ${['*']}              | ${[{ matchedRange: '*', matchingTag: 'de-Latn-DE' }]}
            ${['de']}                         | ${['de']}             | ${[{ matchedRange: 'de', matchingTag: 'de' }]}
            ${['DE']}                         | ${['de']}             | ${[{ matchedRange: 'de', matchingTag: 'DE' }]}
            ${['de-DE']}                      | ${['de']}             | ${[{ matchedRange: 'de', matchingTag: 'de-DE' }]}
            ${['DE-DE']}                      | ${['de']}             | ${[{ matchedRange: 'de', matchingTag: 'DE-DE' }]}
            ${['de-de']}                      | ${['de-de']}          | ${[{ matchedRange: 'de-de', matchingTag: 'de-de' }]}
            ${['de-DE']}                      | ${['de-de']}          | ${[{ matchedRange: 'de-de', matchingTag: 'de-DE' }]}
            ${['de-de']}                      | ${['de-DE']}          | ${[{ matchedRange: 'de-DE', matchingTag: 'de-de' }]}
            ${['de-DE-1996']}                 | ${['de-de']}          | ${[{ matchedRange: 'de-de', matchingTag: 'de-DE-1996' }]}
            ${['de-Deva']}                    | ${['de-de']}          | ${[]}
            ${['de-Latn-DE']}                 | ${['de-de']}          | ${[]}
            ${['en']}                         | ${['de-de']}          | ${[]}
            ${['en']}                         | ${['de']}             | ${[]}
            ${['de-CH-1996']}                 | ${['de-CH']}          | ${[{ matchedRange: 'de-CH', matchingTag: 'de-CH-1996' }]}
            ${['nb']}                         | ${['no']}             | ${[]}
            ${['zh-Hans']}                    | ${['zh-CN']}          | ${[]}
            ${['de-de', 'de', 'en-GB', 'en']} | ${['de']}             | ${[{ matchedRange: 'de', matchingTag: 'de-de' }, { matchedRange: 'de', matchingTag: 'de' }]}
            ${['de-de', 'de', 'en-GB', 'en']} | ${['en']}             | ${[{ matchedRange: 'en', matchingTag: 'en-GB' }, { matchedRange: 'en', matchingTag: 'en' }]}
            ${['de-de', 'de', 'en-GB', 'en']} | ${['de', 'en']}       | ${[{ matchedRange: 'de', matchingTag: 'de-de' }, { matchedRange: 'de', matchingTag: 'de' }, { matchedRange: 'en', matchingTag: 'en-GB' }, { matchedRange: 'en', matchingTag: 'en' }]}
            ${['de-de', 'de', 'en-GB', 'en']} | ${['en', 'de']}       | ${[{ matchedRange: 'en', matchingTag: 'en-GB' }, { matchedRange: 'en', matchingTag: 'en' }, { matchedRange: 'de', matchingTag: 'de-de' }, { matchedRange: 'de', matchingTag: 'de' }]}
            ${['de-de', 'de', 'en-GB', 'en']} | ${['en-gb', 'de-de']} | ${[{ matchedRange: 'en-gb', matchingTag: 'en-GB' }, { matchedRange: 'de-de', matchingTag: 'de-de' }]}
            ${['de-de', 'de', 'en-GB', 'en']} | ${['de-de', 'de']}    | ${[{ matchedRange: 'de-de', matchingTag: 'de-de' }, { matchedRange: 'de', matchingTag: 'de-de' }, { matchedRange: 'de', matchingTag: 'de' }]}
        `('Selects matching tags from ranges', ({ supportedTags, acceptedRanges, matchedTags }) => {
            expect(basicFilter(supportedTags, acceptedRanges)).toEqual(matchedTags);
        });
    });

    describe('Extended filter', () => {
        it.each`
            supportedTags                                                            | acceptedRanges        | matchedTags
            ${['de-de']}                                                             | ${['*']}              | ${[{ matchedRange: '*', matchingTag: 'de-de' }]}
            ${['de-DE']}                                                             | ${['*']}              | ${[{ matchedRange: '*', matchingTag: 'de-DE' }]}
            ${['de-Latn-DE']}                                                        | ${['*']}              | ${[{ matchedRange: '*', matchingTag: 'de-Latn-DE' }]}
            ${['de-Latf-DE']}                                                        | ${['*']}              | ${[{ matchedRange: '*', matchingTag: 'de-Latf-DE' }]}
            ${['de-DE-x-goethe']}                                                    | ${['*']}              | ${[{ matchedRange: '*', matchingTag: 'de-DE-x-goethe' }]}
            ${['de-Latn-DE-1996']}                                                   | ${['*']}              | ${[{ matchedRange: '*', matchingTag: 'de-Latn-DE-1996' }]}
            ${['de-Deva-DE']}                                                        | ${['*']}              | ${[{ matchedRange: '*', matchingTag: 'de-Deva-DE' }]}
            ${['de']}                                                                | ${['*']}              | ${[{ matchedRange: '*', matchingTag: 'de' }]}
            ${['de-x-DE']}                                                           | ${['*']}              | ${[{ matchedRange: '*', matchingTag: 'de-x-DE' }]}
            ${['de-Deva']}                                                           | ${['*']}              | ${[{ matchedRange: '*', matchingTag: 'de-Deva' }]}
            ${['de-DE']}                                                             | ${['de-DE']}          | ${[{ matchedRange: 'de-DE', matchingTag: 'de-DE' }]}
            ${['de-de']}                                                             | ${['de-DE']}          | ${[{ matchedRange: 'de-DE', matchingTag: 'de-de' }]}
            ${['de-Latn-DE']}                                                        | ${['de-DE']}          | ${[{ matchedRange: 'de-DE', matchingTag: 'de-Latn-DE' }]}
            ${['de-Latf-DE']}                                                        | ${['de-DE']}          | ${[{ matchedRange: 'de-DE', matchingTag: 'de-Latf-DE' }]}
            ${['de-DE-x-goethe']}                                                    | ${['de-DE']}          | ${[{ matchedRange: 'de-DE', matchingTag: 'de-DE-x-goethe' }]}
            ${['de-Latn-DE-1996']}                                                   | ${['de-DE']}          | ${[{ matchedRange: 'de-DE', matchingTag: 'de-Latn-DE-1996' }]}
            ${['de-Deva-DE']}                                                        | ${['de-DE']}          | ${[{ matchedRange: 'de-DE', matchingTag: 'de-Deva-DE' }]}
            ${['de']}                                                                | ${['de-DE']}          | ${[]}
            ${['de-x-DE']}                                                           | ${['de-DE']}          | ${[]}
            ${['de-Deva']}                                                           | ${['de-DE']}          | ${[]}
            ${['en']}                                                                | ${['de-de']}          | ${[]}
            ${['en']}                                                                | ${['de']}             | ${[]}
            ${['de-CH-1996']}                                                        | ${['de-CH']}          | ${[{ matchedRange: 'de-CH', matchingTag: 'de-CH-1996' }]}
            ${['nb']}                                                                | ${['no']}             | ${[]}
            ${['zh-Hans']}                                                           | ${['zh-CN']}          | ${[]}
            ${['de-DE']}                                                             | ${['de-*-DE']}        | ${[{ matchedRange: 'de-*-DE', matchingTag: 'de-DE' }]}
            ${['de-de']}                                                             | ${['de-*-DE']}        | ${[{ matchedRange: 'de-*-DE', matchingTag: 'de-de' }]}
            ${['de-Latn-DE']}                                                        | ${['de-*-DE']}        | ${[{ matchedRange: 'de-*-DE', matchingTag: 'de-Latn-DE' }]}
            ${['de-Latf-DE']}                                                        | ${['de-*-DE']}        | ${[{ matchedRange: 'de-*-DE', matchingTag: 'de-Latf-DE' }]}
            ${['de-DE-x-goethe']}                                                    | ${['de-*-DE']}        | ${[{ matchedRange: 'de-*-DE', matchingTag: 'de-DE-x-goethe' }]}
            ${['de-Latn-DE-1996']}                                                   | ${['de-*-DE']}        | ${[{ matchedRange: 'de-*-DE', matchingTag: 'de-Latn-DE-1996' }]}
            ${['de-Deva-DE']}                                                        | ${['de-*-DE']}        | ${[{ matchedRange: 'de-*-DE', matchingTag: 'de-Deva-DE' }]}
            ${['de']}                                                                | ${['de-*-DE']}        | ${[]}
            ${['de-x-DE']}                                                           | ${['de-*-DE']}        | ${[]}
            ${['de-Deva']}                                                           | ${['de-*-DE']}        | ${[]}
            ${['de-de', 'de', 'en-GB', 'en']}                                        | ${['de']}             | ${[{ matchedRange: 'de', matchingTag: 'de-de' }, { matchedRange: 'de', matchingTag: 'de' }]}
            ${['de-de', 'de', 'en-GB', 'en']}                                        | ${['en']}             | ${[{ matchedRange: 'en', matchingTag: 'en-GB' }, { matchedRange: 'en', matchingTag: 'en' }]}
            ${['de-de', 'de', 'en-GB', 'en']}                                        | ${['de', 'en']}       | ${[{ matchedRange: 'de', matchingTag: 'de-de' }, { matchedRange: 'de', matchingTag: 'de' }, { matchedRange: 'en', matchingTag: 'en-GB' }, { matchedRange: 'en', matchingTag: 'en' }]}
            ${['de-de', 'de', 'en-GB', 'en']}                                        | ${['en', 'de']}       | ${[{ matchedRange: 'en', matchingTag: 'en-GB' }, { matchedRange: 'en', matchingTag: 'en' }, { matchedRange: 'de', matchingTag: 'de-de' }, { matchedRange: 'de', matchingTag: 'de' }]}
            ${['de-de', 'de', 'en-GB', 'en']}                                        | ${['en-gb', 'de-de']} | ${[{ matchedRange: 'en-gb', matchingTag: 'en-GB' }, { matchedRange: 'de-de', matchingTag: 'de-de' }]}
            ${['de-de', 'de', 'en-GB', 'en']}                                        | ${['de-de', 'de']}    | ${[{ matchedRange: 'de-de', matchingTag: 'de-de' }, { matchedRange: 'de', matchingTag: 'de-de' }, { matchedRange: 'de', matchingTag: 'de' }]}
            ${['de', 'de-de', 'de-DE-x-goethe', 'de-Deva', 'de-Deva-DE', 'de-x-DE']} | ${['de-*-DE']}        | ${[{ matchedRange: 'de-*-DE', matchingTag: 'de-de' }, { matchedRange: 'de-*-DE', matchingTag: 'de-DE-x-goethe' }, { matchedRange: 'de-*-DE', matchingTag: 'de-Deva-DE' }]}
        `('Selects matching tags from ranges', ({ supportedTags, acceptedRanges, matchedTags }) => {
            expect(extendedFilter(supportedTags, acceptedRanges)).toEqual(matchedTags);
        });
    });

    describe('Basic Lookup', () => {
        it.each`
            supportedTags                                        | acceptedRanges                        | matchedTag
            ${['de-de']}                                         | ${undefined}                          | ${undefined}
            ${['de-de']}                                         | ${['*']}                              | ${undefined}
            ${['de-DE']}                                         | ${['*']}                              | ${undefined}
            ${['en-GB']}                                         | ${['de-CH']}                          | ${undefined}
            ${['en-GB', 'de-CH-1996']}                           | ${['de-CH']}                          | ${undefined}
            ${['en-GB', 'de-CH']}                                | ${['de-CH']}                          | ${{ matchedRange: 'de-CH', matchingTag: 'de-CH' }}
            ${['en-GB', 'de']}                                   | ${['de-CH']}                          | ${{ matchedRange: 'de-CH', matchingTag: 'de' }}
            ${['en-GB', 'en', 'ja-JP', 'ja']}                    | ${['fr-FR', 'zh-Hant']}               | ${undefined}
            ${['en-GB', 'en', 'zh-Hans', 'zh-Hant', 'zh']}       | ${['fr-FR', 'zh-Hant']}               | ${{ matchedRange: 'zh-Hant', matchingTag: 'zh-Hant' }}
            ${['en-GB', 'en', 'zh-Hans', 'zh-Hant', 'zh', 'fr']} | ${['fr-FR', 'zh-Hant']}               | ${{ matchedRange: 'fr-FR', matchingTag: 'fr' }}
            ${['en-GB', 'en', 'zh-Hans', 'zh-Hant', 'zh', 'fr']} | ${['zh-Hant', 'fr-FR']}               | ${{ matchedRange: 'zh-Hant', matchingTag: 'zh-Hant' }}
            ${['en-GB', 'en', 'zh-Hans', 'zh-Hant', 'zh']}       | ${['zh-Hant-CN-x-private1-private2']} | ${{ matchedRange: 'zh-Hant-CN-x-private1-private2', matchingTag: 'zh-Hant' }}
        `('Selects correct lookup tag', ({ supportedTags, acceptedRanges, matchedTag }) => {
            expect(basicLookup(supportedTags, acceptedRanges)).toEqual(matchedTag);
        });
    });
    describe('Extended Lookup', () => {
        it.each`
            supportedTags                                        | acceptedRanges                        | matchedTag
            ${['de-de']}                                         | ${undefined}                          | ${undefined}
            ${['de-de']}                                         | ${['*']}                              | ${undefined}
            ${['de-DE']}                                         | ${['*']}                              | ${undefined}
            ${['de']}                                            | ${['*', 'de']}                        | ${{ matchedRange: 'de', matchingTag: 'de' }}
            ${['en-GB']}                                         | ${['de-CH']}                          | ${undefined}
            ${['en-GB', 'de-CH-1996']}                           | ${['de-CH']}                          | ${undefined}
            ${['en-GB', 'de-CH']}                                | ${['de-CH']}                          | ${{ matchedRange: 'de-CH', matchingTag: 'de-CH' }}
            ${['en-GB', 'de']}                                   | ${['de-CH']}                          | ${{ matchedRange: 'de-CH', matchingTag: 'de' }}
            ${['en-GB', 'en', 'ja-JP', 'ja']}                    | ${['fr-FR', 'zh-Hant']}               | ${undefined}
            ${['en-GB', 'en', 'zh-Hans', 'zh-Hant', 'zh']}       | ${['fr-FR', 'zh-Hant']}               | ${{ matchedRange: 'zh-Hant', matchingTag: 'zh-Hant' }}
            ${['en-GB', 'en', 'zh-Hans', 'zh-Hant', 'zh', 'fr']} | ${['fr-FR', 'zh-Hant']}               | ${{ matchedRange: 'fr-FR', matchingTag: 'fr' }}
            ${['en-GB', 'en', 'zh-Hans', 'zh-Hant', 'zh', 'fr']} | ${['zh-Hant', 'fr-FR']}               | ${{ matchedRange: 'zh-Hant', matchingTag: 'zh-Hant' }}
            ${['en-GB', 'en', 'zh-Hans', 'zh-Hant', 'zh']}       | ${['zh-Hant-CN-x-private1-private2']} | ${{ matchedRange: 'zh-Hant-CN-x-private1-private2', matchingTag: 'zh-Hant' }}
            ${['de-ON', 'de-EX', 'de-CH', 'fr-CH', 'it-CH']}     | ${['*-CH']}                           | ${{ matchedRange: '*-CH', matchingTag: 'de-CH' }}
            ${['de-CH-1991-after', 'de-CH-before-1991']}         | ${['de-*-1991']}                      | ${{ matchedRange: 'de-*-1991', matchingTag: 'de-CH-before-1991' }}
            ${['en-AB-CD-1991', 'de-CH-1991']}                   | ${['de-*-1991']}                      | ${{ matchedRange: 'de-*-1991', matchingTag: 'de-CH-1991' }}
            ${['en-CH-1991', 'de-CH']}                           | ${['de-*-1991']}                      | ${{ matchedRange: 'de-*-1991', matchingTag: 'de-CH' }}
            ${['de-CH-1991-after', 'en-GB']}                     | ${['de-*-1991', '*-GB']}              | ${{ matchedRange: '*-GB', matchingTag: 'en-GB' }}
        `('Selects correct lookup tag', ({ supportedTags, acceptedRanges, matchedTag }) => {
            expect(extendedLookup(supportedTags, acceptedRanges)).toEqual(matchedTag);
        });
    });
});

/*

            */
