import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null

  constructor(private storage: Storage) {
    this.init(storage)
  }

  async init(storage: Storage): Promise<void> {
    this._storage = await storage.create()
  }

  public set(key: string, value: any): void {
    this._storage?.set(key, value)
  }

  public async get(key: string): Promise<any> {
    return this._storage?.get(key)
  }

  public clear(): void {
    this._storage?.clear()
  }
}
