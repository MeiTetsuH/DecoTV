/* eslint-disable @typescript-eslint/no-explicit-any */

import { AdminConfig } from './admin.types';
import { MemoryStorage } from './memory.db';
import {
  Favorite,
  IStorage,
  PlayRecord,
  SkipConfig,
  SkipPreset,
} from './types';
import { UpstashRedisStorage } from './upstash.db';

// storage type 常量: 'localstorage' | 'upstash'，默认 'localstorage'
const STORAGE_TYPE =
  (process.env.NEXT_PUBLIC_STORAGE_TYPE as
    | 'localstorage'
    | 'upstash'
    | undefined) || 'localstorage';

// 创建存储实例
function createStorage(): IStorage {
  try {
    switch (STORAGE_TYPE) {
      case 'upstash':
        return new UpstashRedisStorage();
      case 'localstorage':
      default:
        // 本地模式使用内存存储，让后端也能存储和读取配置
        return new MemoryStorage();
    }
  } catch (e) {
    // 构建阶段可能缺少运行时环境变量（如 KV_REST_API_URL），降级为内存存储
    // eslint-disable-next-line no-console
    console.warn(
      `[db] Failed to initialize ${STORAGE_TYPE} storage, falling back to MemoryStorage:`,
      e instanceof Error ? e.message : e,
    );
    return new MemoryStorage();
  }
}

// 延迟初始化存储实例，避免在 Next.js 构建阶段因缺少运行时环境变量而报错
function getStorage(): IStorage {
  const globalKey = Symbol.for('__DECOTV_STORAGE_INSTANCE__');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let instance: IStorage | undefined = (globalThis as any)[globalKey];
  if (!instance) {
    instance = createStorage();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any)[globalKey] = instance;
  }
  return instance;
}

// 工具函数：生成存储key
export function generateStorageKey(source: string, id: string): string {
  return `${source}+${id}`;
}

// 导出便捷方法
export class DbManager {
  // 延迟获取 storage，避免在模块加载时就初始化数据库连接
  private get storage(): IStorage {
    return getStorage();
  }

  // 播放记录相关方法
  async getPlayRecord(
    userName: string,
    source: string,
    id: string,
  ): Promise<PlayRecord | null> {
    const key = generateStorageKey(source, id);
    return this.storage.getPlayRecord(userName, key);
  }

  async savePlayRecord(
    userName: string,
    source: string,
    id: string,
    record: PlayRecord,
  ): Promise<void> {
    const key = generateStorageKey(source, id);
    await this.storage.setPlayRecord(userName, key, record);
  }

  async getPlayRecordByKey(
    userName: string,
    key: string,
  ): Promise<PlayRecord | null> {
    return this.storage.getPlayRecord(userName, key);
  }

  async savePlayRecordByKey(
    userName: string,
    key: string,
    record: PlayRecord,
  ): Promise<void> {
    await this.storage.setPlayRecord(userName, key, record);
  }

  async getAllPlayRecords(userName: string): Promise<{
    [key: string]: PlayRecord;
  }> {
    return this.storage.getAllPlayRecords(userName);
  }

  async deletePlayRecord(
    userName: string,
    source: string,
    id: string,
  ): Promise<void> {
    const key = generateStorageKey(source, id);
    await this.storage.deletePlayRecord(userName, key);
  }

  async deletePlayRecordByKey(userName: string, key: string): Promise<void> {
    await this.storage.deletePlayRecord(userName, key);
  }

  // 收藏相关方法
  async getFavorite(
    userName: string,
    source: string,
    id: string,
  ): Promise<Favorite | null> {
    const key = generateStorageKey(source, id);
    return this.storage.getFavorite(userName, key);
  }

  async saveFavorite(
    userName: string,
    source: string,
    id: string,
    favorite: Favorite,
  ): Promise<void> {
    const key = generateStorageKey(source, id);
    await this.storage.setFavorite(userName, key, favorite);
  }

  async getAllFavorites(
    userName: string,
  ): Promise<{ [key: string]: Favorite }> {
    return this.storage.getAllFavorites(userName);
  }

  async deleteFavorite(
    userName: string,
    source: string,
    id: string,
  ): Promise<void> {
    const key = generateStorageKey(source, id);
    await this.storage.deleteFavorite(userName, key);
  }

  async isFavorited(
    userName: string,
    source: string,
    id: string,
  ): Promise<boolean> {
    const favorite = await this.getFavorite(userName, source, id);
    return favorite !== null;
  }

  // ---------- 用户相关 ----------
  async registerUser(userName: string, password: string): Promise<void> {
    await this.storage.registerUser(userName, password);
  }

  async verifyUser(userName: string, password: string): Promise<boolean> {
    return this.storage.verifyUser(userName, password);
  }

  // 检查用户是否已存在
  async checkUserExist(userName: string): Promise<boolean> {
    return this.storage.checkUserExist(userName);
  }

  async changePassword(userName: string, newPassword: string): Promise<void> {
    await this.storage.changePassword(userName, newPassword);
  }

  async deleteUser(userName: string): Promise<void> {
    await this.storage.deleteUser(userName);
  }

  // ---------- 搜索历史 ----------
  async getSearchHistory(userName: string): Promise<string[]> {
    return this.storage.getSearchHistory(userName);
  }

  async addSearchHistory(userName: string, keyword: string): Promise<void> {
    await this.storage.addSearchHistory(userName, keyword);
  }

  async deleteSearchHistory(userName: string, keyword?: string): Promise<void> {
    await this.storage.deleteSearchHistory(userName, keyword);
  }

  // 获取全部用户名
  async getAllUsers(): Promise<string[]> {
    if (typeof (this.storage as any).getAllUsers === 'function') {
      return (this.storage as any).getAllUsers();
    }
    return [];
  }

  // ---------- 管理员配置 ----------
  async getAdminConfig(): Promise<AdminConfig | null> {
    if (
      this.storage &&
      typeof (this.storage as any).getAdminConfig === 'function'
    ) {
      return (this.storage as any).getAdminConfig();
    }
    return null;
  }

  async saveAdminConfig(config: AdminConfig): Promise<void> {
    if (
      this.storage &&
      typeof (this.storage as any).setAdminConfig === 'function'
    ) {
      await (this.storage as any).setAdminConfig(config);
    }
  }

  // ---------- 跳过片头片尾配置 ----------
  async getSkipConfig(
    userName: string,
    source: string,
    id: string,
  ): Promise<SkipConfig | null> {
    if (typeof (this.storage as any).getSkipConfig === 'function') {
      return (this.storage as any).getSkipConfig(userName, source, id);
    }
    return null;
  }

  async setSkipConfig(
    userName: string,
    source: string,
    id: string,
    config: SkipConfig,
  ): Promise<void> {
    if (typeof (this.storage as any).setSkipConfig === 'function') {
      await (this.storage as any).setSkipConfig(userName, source, id, config);
    }
  }

  async deleteSkipConfig(
    userName: string,
    source: string,
    id: string,
  ): Promise<void> {
    if (typeof (this.storage as any).deleteSkipConfig === 'function') {
      await (this.storage as any).deleteSkipConfig(userName, source, id);
    }
  }

  async getAllSkipConfigs(
    userName: string,
  ): Promise<{ [key: string]: SkipConfig }> {
    if (typeof (this.storage as any).getAllSkipConfigs === 'function') {
      return (this.storage as any).getAllSkipConfigs(userName);
    }
    return {};
  }

  async getSkipPresets(userName: string): Promise<SkipPreset[]> {
    if (typeof (this.storage as any).getSkipPresets === 'function') {
      return (this.storage as any).getSkipPresets(userName);
    }
    return [];
  }

  async setSkipPresets(userName: string, presets: SkipPreset[]): Promise<void> {
    if (typeof (this.storage as any).setSkipPresets === 'function') {
      await (this.storage as any).setSkipPresets(userName, presets);
    }
  }

  // ---------- 数据清理 ----------
  async clearAllData(): Promise<void> {
    if (typeof (this.storage as any).clearAllData === 'function') {
      await (this.storage as any).clearAllData();
    } else {
      throw new Error('存储类型不支持清空数据操作');
    }
  }
}

// 导出默认实例
export const db = new DbManager();
