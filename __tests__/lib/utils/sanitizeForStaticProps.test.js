import { sanitizeForStaticProps } from '@/lib/utils'

describe('sanitizeForStaticProps', () => {
  test('把 undefined 转成 null，并去掉对象里的 undefined 字段', () => {
    expect(sanitizeForStaticProps(undefined)).toBe(null)
    expect(
      sanitizeForStaticProps({
        notice: undefined,
        categoryOptions: [{ name: 'a', color: undefined, count: 1 }],
        ok: 'yes'
      })
    ).toEqual({
      categoryOptions: [{ name: 'a', count: 1 }],
      ok: 'yes'
    })
  })
})
