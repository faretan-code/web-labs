export class Storage<T> {
  constructor(private key: string) {}

  load(): T[] {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  save(data: T[]): void {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  clear(): void {
    localStorage.removeItem(this.key);
  }
}
