/** تعریف ماژول قابل ثبت در پلتفرم */
export interface ModuleManifest {
  code: string;
  version: string;
  displayName: string;
  displayNameFa: string;
  dependsOn: string[];
  events: { published: string[]; consumed: string[] };
  permissions: string[];
  ui: {
    routes: {
      path: string;
      component: string;
      menuLabelFa: string;
      icon: string;
    }[];
    menuItems: {
      path: string;
      labelFa: string;
      icon: string;
      order: number;
    }[];
  };
  cacheInvalidationPatterns: string[];
  alertRules: {
    code: string;
    eventType: string;
    severity: string;
    templateKey: string;
  }[];
  notificationTemplates: string[];
  lifecycle: {
    onActivate?: (tenantId: string) => Promise<void>;
    onUpgrade?: (tenantId: string, fromVersion: string, toVersion: string) => Promise<void>;
    onDeactivate?: (tenantId: string) => Promise<void>;
  };
}
