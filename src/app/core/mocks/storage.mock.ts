import {of} from 'rxjs';

export class StorageMock {

    public get(key: string): Promise<any> {
        return of(1).toPromise();
    }

    public set(key: string, value: any): Promise<any> {
        return of(null).toPromise();
    }

    public clear(): Promise<void> {
        return of(null).toPromise();
    }
}
