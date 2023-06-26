export class Sorter {
    static asc(obj: Record<string, string>): Record<string, string> {
        const sortedObj: Record<string, string> = {};

        Object.keys(obj)
        .sort((prev:string,curr: string): number => prev.localeCompare(curr))
        .forEach((key: string) => sortedObj[key] = obj[key]);

        return sortedObj;
    }
    static desc(obj: Record<string, string>): Record <string, string> {
        const sortedObj: Record<string, string> = {};

        Object.keys(obj)
        .sort((prev:string,curr: string): number => curr.localeCompare(prev))
        .forEach((key: string) => sortedObj[key] = obj[key]);

        return sortedObj;
    }
}