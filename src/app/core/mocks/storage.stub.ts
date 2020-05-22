export class StorageStub {

    public get(key: string): Promise<any> {
        return new Promise(() => {});
    }
}
