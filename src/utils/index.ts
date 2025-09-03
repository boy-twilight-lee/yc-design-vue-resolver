//检查一个组件名是否应该被排除
export function isExclude(name: string, exclude?: string | RegExp | (string | RegExp)[]): boolean {
  if (!exclude) return false;
  if (typeof exclude === 'string') return name === exclude;
  if (exclude instanceof RegExp) return exclude.test(name);
  if (Array.isArray(exclude)) {
    for (const item of exclude) {
      if (isExclude(name, item)) return true;
    }
  }
  return false;
}
