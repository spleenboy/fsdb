export interface Lock {
  path: string;
  key: string;
  enabled: Date | false;
  expires: number;
  enable: () => Promise<boolean>;
  disable: () => Promise<boolean>;
}
