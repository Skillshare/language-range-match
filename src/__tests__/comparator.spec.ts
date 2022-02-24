import { buildCascadeForRange } from '../comparator';

describe('Comparator', () => {
    describe('Cascading range', () => {
        it('Builds cascading range from subTags', () => {
            expect(buildCascadeForRange('zh-Hant-CN-x-y-private1-private2')).toEqual([
                'zh-Hant-CN-x-y-private1-private2',
                'zh-Hant-CN-x-y-private1',
                'zh-Hant-CN',
                'zh-Hant',
                'zh',
            ]);
        });
    });
});
