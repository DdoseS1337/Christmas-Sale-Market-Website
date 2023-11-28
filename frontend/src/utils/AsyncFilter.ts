export const asyncFilter = async (arr: Array<any>, func: (value: any, index: number, array: any[]) => boolean | Promise<boolean>) => {
    const boolArr = await Promise.all(arr.map(func));
    return arr.filter((_, i) => boolArr[i]);
}