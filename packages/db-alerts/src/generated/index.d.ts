
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model RetentionPolicy
 * 
 */
export type RetentionPolicy = $Result.DefaultSelection<Prisma.$RetentionPolicyPayload>
/**
 * Model Alert
 * 
 */
export type Alert = $Result.DefaultSelection<Prisma.$AlertPayload>
/**
 * Model AlertRule
 * 
 */
export type AlertRule = $Result.DefaultSelection<Prisma.$AlertRulePayload>
/**
 * Model UserNotificationPreference
 * 
 */
export type UserNotificationPreference = $Result.DefaultSelection<Prisma.$UserNotificationPreferencePayload>
/**
 * Model NotificationTemplate
 * 
 */
export type NotificationTemplate = $Result.DefaultSelection<Prisma.$NotificationTemplatePayload>
/**
 * Model NotificationLog
 * 
 */
export type NotificationLog = $Result.DefaultSelection<Prisma.$NotificationLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const RetentionAction: {
  Archive: 'Archive',
  Anonymize: 'Anonymize',
  Delete: 'Delete'
};

export type RetentionAction = (typeof RetentionAction)[keyof typeof RetentionAction]


export const AlertSeverity: {
  info: 'info',
  warning: 'warning',
  critical: 'critical'
};

export type AlertSeverity = (typeof AlertSeverity)[keyof typeof AlertSeverity]


export const NotificationStatus: {
  Queued: 'Queued',
  Sent: 'Sent',
  Delivered: 'Delivered',
  Failed: 'Failed',
  Bounced: 'Bounced'
};

export type NotificationStatus = (typeof NotificationStatus)[keyof typeof NotificationStatus]


export const NotificationChannel: {
  InApp: 'InApp',
  Email: 'Email',
  SMS: 'SMS',
  WebPush: 'WebPush'
};

export type NotificationChannel = (typeof NotificationChannel)[keyof typeof NotificationChannel]

}

export type RetentionAction = $Enums.RetentionAction

export const RetentionAction: typeof $Enums.RetentionAction

export type AlertSeverity = $Enums.AlertSeverity

export const AlertSeverity: typeof $Enums.AlertSeverity

export type NotificationStatus = $Enums.NotificationStatus

export const NotificationStatus: typeof $Enums.NotificationStatus

export type NotificationChannel = $Enums.NotificationChannel

export const NotificationChannel: typeof $Enums.NotificationChannel

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more RetentionPolicies
 * const retentionPolicies = await prisma.retentionPolicy.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more RetentionPolicies
   * const retentionPolicies = await prisma.retentionPolicy.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.retentionPolicy`: Exposes CRUD operations for the **RetentionPolicy** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RetentionPolicies
    * const retentionPolicies = await prisma.retentionPolicy.findMany()
    * ```
    */
  get retentionPolicy(): Prisma.RetentionPolicyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.alert`: Exposes CRUD operations for the **Alert** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Alerts
    * const alerts = await prisma.alert.findMany()
    * ```
    */
  get alert(): Prisma.AlertDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.alertRule`: Exposes CRUD operations for the **AlertRule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AlertRules
    * const alertRules = await prisma.alertRule.findMany()
    * ```
    */
  get alertRule(): Prisma.AlertRuleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userNotificationPreference`: Exposes CRUD operations for the **UserNotificationPreference** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserNotificationPreferences
    * const userNotificationPreferences = await prisma.userNotificationPreference.findMany()
    * ```
    */
  get userNotificationPreference(): Prisma.UserNotificationPreferenceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notificationTemplate`: Exposes CRUD operations for the **NotificationTemplate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NotificationTemplates
    * const notificationTemplates = await prisma.notificationTemplate.findMany()
    * ```
    */
  get notificationTemplate(): Prisma.NotificationTemplateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notificationLog`: Exposes CRUD operations for the **NotificationLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NotificationLogs
    * const notificationLogs = await prisma.notificationLog.findMany()
    * ```
    */
  get notificationLog(): Prisma.NotificationLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    RetentionPolicy: 'RetentionPolicy',
    Alert: 'Alert',
    AlertRule: 'AlertRule',
    UserNotificationPreference: 'UserNotificationPreference',
    NotificationTemplate: 'NotificationTemplate',
    NotificationLog: 'NotificationLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "retentionPolicy" | "alert" | "alertRule" | "userNotificationPreference" | "notificationTemplate" | "notificationLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      RetentionPolicy: {
        payload: Prisma.$RetentionPolicyPayload<ExtArgs>
        fields: Prisma.RetentionPolicyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RetentionPolicyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetentionPolicyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RetentionPolicyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetentionPolicyPayload>
          }
          findFirst: {
            args: Prisma.RetentionPolicyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetentionPolicyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RetentionPolicyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetentionPolicyPayload>
          }
          findMany: {
            args: Prisma.RetentionPolicyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetentionPolicyPayload>[]
          }
          create: {
            args: Prisma.RetentionPolicyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetentionPolicyPayload>
          }
          createMany: {
            args: Prisma.RetentionPolicyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RetentionPolicyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetentionPolicyPayload>[]
          }
          delete: {
            args: Prisma.RetentionPolicyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetentionPolicyPayload>
          }
          update: {
            args: Prisma.RetentionPolicyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetentionPolicyPayload>
          }
          deleteMany: {
            args: Prisma.RetentionPolicyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RetentionPolicyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RetentionPolicyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetentionPolicyPayload>[]
          }
          upsert: {
            args: Prisma.RetentionPolicyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RetentionPolicyPayload>
          }
          aggregate: {
            args: Prisma.RetentionPolicyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRetentionPolicy>
          }
          groupBy: {
            args: Prisma.RetentionPolicyGroupByArgs<ExtArgs>
            result: $Utils.Optional<RetentionPolicyGroupByOutputType>[]
          }
          count: {
            args: Prisma.RetentionPolicyCountArgs<ExtArgs>
            result: $Utils.Optional<RetentionPolicyCountAggregateOutputType> | number
          }
        }
      }
      Alert: {
        payload: Prisma.$AlertPayload<ExtArgs>
        fields: Prisma.AlertFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AlertFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AlertFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          findFirst: {
            args: Prisma.AlertFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AlertFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          findMany: {
            args: Prisma.AlertFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>[]
          }
          create: {
            args: Prisma.AlertCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          createMany: {
            args: Prisma.AlertCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AlertCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>[]
          }
          delete: {
            args: Prisma.AlertDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          update: {
            args: Prisma.AlertUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          deleteMany: {
            args: Prisma.AlertDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AlertUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AlertUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>[]
          }
          upsert: {
            args: Prisma.AlertUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          aggregate: {
            args: Prisma.AlertAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAlert>
          }
          groupBy: {
            args: Prisma.AlertGroupByArgs<ExtArgs>
            result: $Utils.Optional<AlertGroupByOutputType>[]
          }
          count: {
            args: Prisma.AlertCountArgs<ExtArgs>
            result: $Utils.Optional<AlertCountAggregateOutputType> | number
          }
        }
      }
      AlertRule: {
        payload: Prisma.$AlertRulePayload<ExtArgs>
        fields: Prisma.AlertRuleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AlertRuleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertRulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AlertRuleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertRulePayload>
          }
          findFirst: {
            args: Prisma.AlertRuleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertRulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AlertRuleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertRulePayload>
          }
          findMany: {
            args: Prisma.AlertRuleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertRulePayload>[]
          }
          create: {
            args: Prisma.AlertRuleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertRulePayload>
          }
          createMany: {
            args: Prisma.AlertRuleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AlertRuleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertRulePayload>[]
          }
          delete: {
            args: Prisma.AlertRuleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertRulePayload>
          }
          update: {
            args: Prisma.AlertRuleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertRulePayload>
          }
          deleteMany: {
            args: Prisma.AlertRuleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AlertRuleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AlertRuleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertRulePayload>[]
          }
          upsert: {
            args: Prisma.AlertRuleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertRulePayload>
          }
          aggregate: {
            args: Prisma.AlertRuleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAlertRule>
          }
          groupBy: {
            args: Prisma.AlertRuleGroupByArgs<ExtArgs>
            result: $Utils.Optional<AlertRuleGroupByOutputType>[]
          }
          count: {
            args: Prisma.AlertRuleCountArgs<ExtArgs>
            result: $Utils.Optional<AlertRuleCountAggregateOutputType> | number
          }
        }
      }
      UserNotificationPreference: {
        payload: Prisma.$UserNotificationPreferencePayload<ExtArgs>
        fields: Prisma.UserNotificationPreferenceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserNotificationPreferenceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserNotificationPreferencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserNotificationPreferenceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserNotificationPreferencePayload>
          }
          findFirst: {
            args: Prisma.UserNotificationPreferenceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserNotificationPreferencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserNotificationPreferenceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserNotificationPreferencePayload>
          }
          findMany: {
            args: Prisma.UserNotificationPreferenceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserNotificationPreferencePayload>[]
          }
          create: {
            args: Prisma.UserNotificationPreferenceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserNotificationPreferencePayload>
          }
          createMany: {
            args: Prisma.UserNotificationPreferenceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserNotificationPreferenceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserNotificationPreferencePayload>[]
          }
          delete: {
            args: Prisma.UserNotificationPreferenceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserNotificationPreferencePayload>
          }
          update: {
            args: Prisma.UserNotificationPreferenceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserNotificationPreferencePayload>
          }
          deleteMany: {
            args: Prisma.UserNotificationPreferenceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserNotificationPreferenceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserNotificationPreferenceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserNotificationPreferencePayload>[]
          }
          upsert: {
            args: Prisma.UserNotificationPreferenceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserNotificationPreferencePayload>
          }
          aggregate: {
            args: Prisma.UserNotificationPreferenceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserNotificationPreference>
          }
          groupBy: {
            args: Prisma.UserNotificationPreferenceGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserNotificationPreferenceGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserNotificationPreferenceCountArgs<ExtArgs>
            result: $Utils.Optional<UserNotificationPreferenceCountAggregateOutputType> | number
          }
        }
      }
      NotificationTemplate: {
        payload: Prisma.$NotificationTemplatePayload<ExtArgs>
        fields: Prisma.NotificationTemplateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationTemplateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationTemplatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationTemplateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationTemplatePayload>
          }
          findFirst: {
            args: Prisma.NotificationTemplateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationTemplatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationTemplateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationTemplatePayload>
          }
          findMany: {
            args: Prisma.NotificationTemplateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationTemplatePayload>[]
          }
          create: {
            args: Prisma.NotificationTemplateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationTemplatePayload>
          }
          createMany: {
            args: Prisma.NotificationTemplateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationTemplateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationTemplatePayload>[]
          }
          delete: {
            args: Prisma.NotificationTemplateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationTemplatePayload>
          }
          update: {
            args: Prisma.NotificationTemplateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationTemplatePayload>
          }
          deleteMany: {
            args: Prisma.NotificationTemplateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationTemplateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationTemplateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationTemplatePayload>[]
          }
          upsert: {
            args: Prisma.NotificationTemplateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationTemplatePayload>
          }
          aggregate: {
            args: Prisma.NotificationTemplateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotificationTemplate>
          }
          groupBy: {
            args: Prisma.NotificationTemplateGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationTemplateGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationTemplateCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationTemplateCountAggregateOutputType> | number
          }
        }
      }
      NotificationLog: {
        payload: Prisma.$NotificationLogPayload<ExtArgs>
        fields: Prisma.NotificationLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>
          }
          findFirst: {
            args: Prisma.NotificationLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>
          }
          findMany: {
            args: Prisma.NotificationLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>[]
          }
          create: {
            args: Prisma.NotificationLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>
          }
          createMany: {
            args: Prisma.NotificationLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>[]
          }
          delete: {
            args: Prisma.NotificationLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>
          }
          update: {
            args: Prisma.NotificationLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>
          }
          deleteMany: {
            args: Prisma.NotificationLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>[]
          }
          upsert: {
            args: Prisma.NotificationLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>
          }
          aggregate: {
            args: Prisma.NotificationLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotificationLog>
          }
          groupBy: {
            args: Prisma.NotificationLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationLogCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    retentionPolicy?: RetentionPolicyOmit
    alert?: AlertOmit
    alertRule?: AlertRuleOmit
    userNotificationPreference?: UserNotificationPreferenceOmit
    notificationTemplate?: NotificationTemplateOmit
    notificationLog?: NotificationLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model RetentionPolicy
   */

  export type AggregateRetentionPolicy = {
    _count: RetentionPolicyCountAggregateOutputType | null
    _avg: RetentionPolicyAvgAggregateOutputType | null
    _sum: RetentionPolicySumAggregateOutputType | null
    _min: RetentionPolicyMinAggregateOutputType | null
    _max: RetentionPolicyMaxAggregateOutputType | null
  }

  export type RetentionPolicyAvgAggregateOutputType = {
    retentionDays: number | null
  }

  export type RetentionPolicySumAggregateOutputType = {
    retentionDays: number | null
  }

  export type RetentionPolicyMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    entityType: string | null
    retentionDays: number | null
    action: $Enums.RetentionAction | null
    isActive: boolean | null
  }

  export type RetentionPolicyMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    entityType: string | null
    retentionDays: number | null
    action: $Enums.RetentionAction | null
    isActive: boolean | null
  }

  export type RetentionPolicyCountAggregateOutputType = {
    id: number
    tenantId: number
    entityType: number
    retentionDays: number
    action: number
    isActive: number
    _all: number
  }


  export type RetentionPolicyAvgAggregateInputType = {
    retentionDays?: true
  }

  export type RetentionPolicySumAggregateInputType = {
    retentionDays?: true
  }

  export type RetentionPolicyMinAggregateInputType = {
    id?: true
    tenantId?: true
    entityType?: true
    retentionDays?: true
    action?: true
    isActive?: true
  }

  export type RetentionPolicyMaxAggregateInputType = {
    id?: true
    tenantId?: true
    entityType?: true
    retentionDays?: true
    action?: true
    isActive?: true
  }

  export type RetentionPolicyCountAggregateInputType = {
    id?: true
    tenantId?: true
    entityType?: true
    retentionDays?: true
    action?: true
    isActive?: true
    _all?: true
  }

  export type RetentionPolicyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RetentionPolicy to aggregate.
     */
    where?: RetentionPolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RetentionPolicies to fetch.
     */
    orderBy?: RetentionPolicyOrderByWithRelationInput | RetentionPolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RetentionPolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RetentionPolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RetentionPolicies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RetentionPolicies
    **/
    _count?: true | RetentionPolicyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RetentionPolicyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RetentionPolicySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RetentionPolicyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RetentionPolicyMaxAggregateInputType
  }

  export type GetRetentionPolicyAggregateType<T extends RetentionPolicyAggregateArgs> = {
        [P in keyof T & keyof AggregateRetentionPolicy]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRetentionPolicy[P]>
      : GetScalarType<T[P], AggregateRetentionPolicy[P]>
  }




  export type RetentionPolicyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RetentionPolicyWhereInput
    orderBy?: RetentionPolicyOrderByWithAggregationInput | RetentionPolicyOrderByWithAggregationInput[]
    by: RetentionPolicyScalarFieldEnum[] | RetentionPolicyScalarFieldEnum
    having?: RetentionPolicyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RetentionPolicyCountAggregateInputType | true
    _avg?: RetentionPolicyAvgAggregateInputType
    _sum?: RetentionPolicySumAggregateInputType
    _min?: RetentionPolicyMinAggregateInputType
    _max?: RetentionPolicyMaxAggregateInputType
  }

  export type RetentionPolicyGroupByOutputType = {
    id: string
    tenantId: string
    entityType: string
    retentionDays: number
    action: $Enums.RetentionAction
    isActive: boolean
    _count: RetentionPolicyCountAggregateOutputType | null
    _avg: RetentionPolicyAvgAggregateOutputType | null
    _sum: RetentionPolicySumAggregateOutputType | null
    _min: RetentionPolicyMinAggregateOutputType | null
    _max: RetentionPolicyMaxAggregateOutputType | null
  }

  type GetRetentionPolicyGroupByPayload<T extends RetentionPolicyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RetentionPolicyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RetentionPolicyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RetentionPolicyGroupByOutputType[P]>
            : GetScalarType<T[P], RetentionPolicyGroupByOutputType[P]>
        }
      >
    >


  export type RetentionPolicySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    entityType?: boolean
    retentionDays?: boolean
    action?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["retentionPolicy"]>

  export type RetentionPolicySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    entityType?: boolean
    retentionDays?: boolean
    action?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["retentionPolicy"]>

  export type RetentionPolicySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    entityType?: boolean
    retentionDays?: boolean
    action?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["retentionPolicy"]>

  export type RetentionPolicySelectScalar = {
    id?: boolean
    tenantId?: boolean
    entityType?: boolean
    retentionDays?: boolean
    action?: boolean
    isActive?: boolean
  }

  export type RetentionPolicyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "entityType" | "retentionDays" | "action" | "isActive", ExtArgs["result"]["retentionPolicy"]>

  export type $RetentionPolicyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RetentionPolicy"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      entityType: string
      retentionDays: number
      action: $Enums.RetentionAction
      isActive: boolean
    }, ExtArgs["result"]["retentionPolicy"]>
    composites: {}
  }

  type RetentionPolicyGetPayload<S extends boolean | null | undefined | RetentionPolicyDefaultArgs> = $Result.GetResult<Prisma.$RetentionPolicyPayload, S>

  type RetentionPolicyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RetentionPolicyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RetentionPolicyCountAggregateInputType | true
    }

  export interface RetentionPolicyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RetentionPolicy'], meta: { name: 'RetentionPolicy' } }
    /**
     * Find zero or one RetentionPolicy that matches the filter.
     * @param {RetentionPolicyFindUniqueArgs} args - Arguments to find a RetentionPolicy
     * @example
     * // Get one RetentionPolicy
     * const retentionPolicy = await prisma.retentionPolicy.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RetentionPolicyFindUniqueArgs>(args: SelectSubset<T, RetentionPolicyFindUniqueArgs<ExtArgs>>): Prisma__RetentionPolicyClient<$Result.GetResult<Prisma.$RetentionPolicyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RetentionPolicy that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RetentionPolicyFindUniqueOrThrowArgs} args - Arguments to find a RetentionPolicy
     * @example
     * // Get one RetentionPolicy
     * const retentionPolicy = await prisma.retentionPolicy.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RetentionPolicyFindUniqueOrThrowArgs>(args: SelectSubset<T, RetentionPolicyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RetentionPolicyClient<$Result.GetResult<Prisma.$RetentionPolicyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RetentionPolicy that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetentionPolicyFindFirstArgs} args - Arguments to find a RetentionPolicy
     * @example
     * // Get one RetentionPolicy
     * const retentionPolicy = await prisma.retentionPolicy.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RetentionPolicyFindFirstArgs>(args?: SelectSubset<T, RetentionPolicyFindFirstArgs<ExtArgs>>): Prisma__RetentionPolicyClient<$Result.GetResult<Prisma.$RetentionPolicyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RetentionPolicy that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetentionPolicyFindFirstOrThrowArgs} args - Arguments to find a RetentionPolicy
     * @example
     * // Get one RetentionPolicy
     * const retentionPolicy = await prisma.retentionPolicy.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RetentionPolicyFindFirstOrThrowArgs>(args?: SelectSubset<T, RetentionPolicyFindFirstOrThrowArgs<ExtArgs>>): Prisma__RetentionPolicyClient<$Result.GetResult<Prisma.$RetentionPolicyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RetentionPolicies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetentionPolicyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RetentionPolicies
     * const retentionPolicies = await prisma.retentionPolicy.findMany()
     * 
     * // Get first 10 RetentionPolicies
     * const retentionPolicies = await prisma.retentionPolicy.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const retentionPolicyWithIdOnly = await prisma.retentionPolicy.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RetentionPolicyFindManyArgs>(args?: SelectSubset<T, RetentionPolicyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RetentionPolicyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RetentionPolicy.
     * @param {RetentionPolicyCreateArgs} args - Arguments to create a RetentionPolicy.
     * @example
     * // Create one RetentionPolicy
     * const RetentionPolicy = await prisma.retentionPolicy.create({
     *   data: {
     *     // ... data to create a RetentionPolicy
     *   }
     * })
     * 
     */
    create<T extends RetentionPolicyCreateArgs>(args: SelectSubset<T, RetentionPolicyCreateArgs<ExtArgs>>): Prisma__RetentionPolicyClient<$Result.GetResult<Prisma.$RetentionPolicyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RetentionPolicies.
     * @param {RetentionPolicyCreateManyArgs} args - Arguments to create many RetentionPolicies.
     * @example
     * // Create many RetentionPolicies
     * const retentionPolicy = await prisma.retentionPolicy.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RetentionPolicyCreateManyArgs>(args?: SelectSubset<T, RetentionPolicyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RetentionPolicies and returns the data saved in the database.
     * @param {RetentionPolicyCreateManyAndReturnArgs} args - Arguments to create many RetentionPolicies.
     * @example
     * // Create many RetentionPolicies
     * const retentionPolicy = await prisma.retentionPolicy.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RetentionPolicies and only return the `id`
     * const retentionPolicyWithIdOnly = await prisma.retentionPolicy.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RetentionPolicyCreateManyAndReturnArgs>(args?: SelectSubset<T, RetentionPolicyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RetentionPolicyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RetentionPolicy.
     * @param {RetentionPolicyDeleteArgs} args - Arguments to delete one RetentionPolicy.
     * @example
     * // Delete one RetentionPolicy
     * const RetentionPolicy = await prisma.retentionPolicy.delete({
     *   where: {
     *     // ... filter to delete one RetentionPolicy
     *   }
     * })
     * 
     */
    delete<T extends RetentionPolicyDeleteArgs>(args: SelectSubset<T, RetentionPolicyDeleteArgs<ExtArgs>>): Prisma__RetentionPolicyClient<$Result.GetResult<Prisma.$RetentionPolicyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RetentionPolicy.
     * @param {RetentionPolicyUpdateArgs} args - Arguments to update one RetentionPolicy.
     * @example
     * // Update one RetentionPolicy
     * const retentionPolicy = await prisma.retentionPolicy.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RetentionPolicyUpdateArgs>(args: SelectSubset<T, RetentionPolicyUpdateArgs<ExtArgs>>): Prisma__RetentionPolicyClient<$Result.GetResult<Prisma.$RetentionPolicyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RetentionPolicies.
     * @param {RetentionPolicyDeleteManyArgs} args - Arguments to filter RetentionPolicies to delete.
     * @example
     * // Delete a few RetentionPolicies
     * const { count } = await prisma.retentionPolicy.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RetentionPolicyDeleteManyArgs>(args?: SelectSubset<T, RetentionPolicyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RetentionPolicies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetentionPolicyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RetentionPolicies
     * const retentionPolicy = await prisma.retentionPolicy.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RetentionPolicyUpdateManyArgs>(args: SelectSubset<T, RetentionPolicyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RetentionPolicies and returns the data updated in the database.
     * @param {RetentionPolicyUpdateManyAndReturnArgs} args - Arguments to update many RetentionPolicies.
     * @example
     * // Update many RetentionPolicies
     * const retentionPolicy = await prisma.retentionPolicy.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RetentionPolicies and only return the `id`
     * const retentionPolicyWithIdOnly = await prisma.retentionPolicy.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RetentionPolicyUpdateManyAndReturnArgs>(args: SelectSubset<T, RetentionPolicyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RetentionPolicyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RetentionPolicy.
     * @param {RetentionPolicyUpsertArgs} args - Arguments to update or create a RetentionPolicy.
     * @example
     * // Update or create a RetentionPolicy
     * const retentionPolicy = await prisma.retentionPolicy.upsert({
     *   create: {
     *     // ... data to create a RetentionPolicy
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RetentionPolicy we want to update
     *   }
     * })
     */
    upsert<T extends RetentionPolicyUpsertArgs>(args: SelectSubset<T, RetentionPolicyUpsertArgs<ExtArgs>>): Prisma__RetentionPolicyClient<$Result.GetResult<Prisma.$RetentionPolicyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RetentionPolicies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetentionPolicyCountArgs} args - Arguments to filter RetentionPolicies to count.
     * @example
     * // Count the number of RetentionPolicies
     * const count = await prisma.retentionPolicy.count({
     *   where: {
     *     // ... the filter for the RetentionPolicies we want to count
     *   }
     * })
    **/
    count<T extends RetentionPolicyCountArgs>(
      args?: Subset<T, RetentionPolicyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RetentionPolicyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RetentionPolicy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetentionPolicyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RetentionPolicyAggregateArgs>(args: Subset<T, RetentionPolicyAggregateArgs>): Prisma.PrismaPromise<GetRetentionPolicyAggregateType<T>>

    /**
     * Group by RetentionPolicy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RetentionPolicyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RetentionPolicyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RetentionPolicyGroupByArgs['orderBy'] }
        : { orderBy?: RetentionPolicyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RetentionPolicyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRetentionPolicyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RetentionPolicy model
   */
  readonly fields: RetentionPolicyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RetentionPolicy.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RetentionPolicyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RetentionPolicy model
   */
  interface RetentionPolicyFieldRefs {
    readonly id: FieldRef<"RetentionPolicy", 'String'>
    readonly tenantId: FieldRef<"RetentionPolicy", 'String'>
    readonly entityType: FieldRef<"RetentionPolicy", 'String'>
    readonly retentionDays: FieldRef<"RetentionPolicy", 'Int'>
    readonly action: FieldRef<"RetentionPolicy", 'RetentionAction'>
    readonly isActive: FieldRef<"RetentionPolicy", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * RetentionPolicy findUnique
   */
  export type RetentionPolicyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RetentionPolicy
     */
    select?: RetentionPolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RetentionPolicy
     */
    omit?: RetentionPolicyOmit<ExtArgs> | null
    /**
     * Filter, which RetentionPolicy to fetch.
     */
    where: RetentionPolicyWhereUniqueInput
  }

  /**
   * RetentionPolicy findUniqueOrThrow
   */
  export type RetentionPolicyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RetentionPolicy
     */
    select?: RetentionPolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RetentionPolicy
     */
    omit?: RetentionPolicyOmit<ExtArgs> | null
    /**
     * Filter, which RetentionPolicy to fetch.
     */
    where: RetentionPolicyWhereUniqueInput
  }

  /**
   * RetentionPolicy findFirst
   */
  export type RetentionPolicyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RetentionPolicy
     */
    select?: RetentionPolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RetentionPolicy
     */
    omit?: RetentionPolicyOmit<ExtArgs> | null
    /**
     * Filter, which RetentionPolicy to fetch.
     */
    where?: RetentionPolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RetentionPolicies to fetch.
     */
    orderBy?: RetentionPolicyOrderByWithRelationInput | RetentionPolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RetentionPolicies.
     */
    cursor?: RetentionPolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RetentionPolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RetentionPolicies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RetentionPolicies.
     */
    distinct?: RetentionPolicyScalarFieldEnum | RetentionPolicyScalarFieldEnum[]
  }

  /**
   * RetentionPolicy findFirstOrThrow
   */
  export type RetentionPolicyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RetentionPolicy
     */
    select?: RetentionPolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RetentionPolicy
     */
    omit?: RetentionPolicyOmit<ExtArgs> | null
    /**
     * Filter, which RetentionPolicy to fetch.
     */
    where?: RetentionPolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RetentionPolicies to fetch.
     */
    orderBy?: RetentionPolicyOrderByWithRelationInput | RetentionPolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RetentionPolicies.
     */
    cursor?: RetentionPolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RetentionPolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RetentionPolicies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RetentionPolicies.
     */
    distinct?: RetentionPolicyScalarFieldEnum | RetentionPolicyScalarFieldEnum[]
  }

  /**
   * RetentionPolicy findMany
   */
  export type RetentionPolicyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RetentionPolicy
     */
    select?: RetentionPolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RetentionPolicy
     */
    omit?: RetentionPolicyOmit<ExtArgs> | null
    /**
     * Filter, which RetentionPolicies to fetch.
     */
    where?: RetentionPolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RetentionPolicies to fetch.
     */
    orderBy?: RetentionPolicyOrderByWithRelationInput | RetentionPolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RetentionPolicies.
     */
    cursor?: RetentionPolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RetentionPolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RetentionPolicies.
     */
    skip?: number
    distinct?: RetentionPolicyScalarFieldEnum | RetentionPolicyScalarFieldEnum[]
  }

  /**
   * RetentionPolicy create
   */
  export type RetentionPolicyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RetentionPolicy
     */
    select?: RetentionPolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RetentionPolicy
     */
    omit?: RetentionPolicyOmit<ExtArgs> | null
    /**
     * The data needed to create a RetentionPolicy.
     */
    data: XOR<RetentionPolicyCreateInput, RetentionPolicyUncheckedCreateInput>
  }

  /**
   * RetentionPolicy createMany
   */
  export type RetentionPolicyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RetentionPolicies.
     */
    data: RetentionPolicyCreateManyInput | RetentionPolicyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RetentionPolicy createManyAndReturn
   */
  export type RetentionPolicyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RetentionPolicy
     */
    select?: RetentionPolicySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RetentionPolicy
     */
    omit?: RetentionPolicyOmit<ExtArgs> | null
    /**
     * The data used to create many RetentionPolicies.
     */
    data: RetentionPolicyCreateManyInput | RetentionPolicyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RetentionPolicy update
   */
  export type RetentionPolicyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RetentionPolicy
     */
    select?: RetentionPolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RetentionPolicy
     */
    omit?: RetentionPolicyOmit<ExtArgs> | null
    /**
     * The data needed to update a RetentionPolicy.
     */
    data: XOR<RetentionPolicyUpdateInput, RetentionPolicyUncheckedUpdateInput>
    /**
     * Choose, which RetentionPolicy to update.
     */
    where: RetentionPolicyWhereUniqueInput
  }

  /**
   * RetentionPolicy updateMany
   */
  export type RetentionPolicyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RetentionPolicies.
     */
    data: XOR<RetentionPolicyUpdateManyMutationInput, RetentionPolicyUncheckedUpdateManyInput>
    /**
     * Filter which RetentionPolicies to update
     */
    where?: RetentionPolicyWhereInput
    /**
     * Limit how many RetentionPolicies to update.
     */
    limit?: number
  }

  /**
   * RetentionPolicy updateManyAndReturn
   */
  export type RetentionPolicyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RetentionPolicy
     */
    select?: RetentionPolicySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RetentionPolicy
     */
    omit?: RetentionPolicyOmit<ExtArgs> | null
    /**
     * The data used to update RetentionPolicies.
     */
    data: XOR<RetentionPolicyUpdateManyMutationInput, RetentionPolicyUncheckedUpdateManyInput>
    /**
     * Filter which RetentionPolicies to update
     */
    where?: RetentionPolicyWhereInput
    /**
     * Limit how many RetentionPolicies to update.
     */
    limit?: number
  }

  /**
   * RetentionPolicy upsert
   */
  export type RetentionPolicyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RetentionPolicy
     */
    select?: RetentionPolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RetentionPolicy
     */
    omit?: RetentionPolicyOmit<ExtArgs> | null
    /**
     * The filter to search for the RetentionPolicy to update in case it exists.
     */
    where: RetentionPolicyWhereUniqueInput
    /**
     * In case the RetentionPolicy found by the `where` argument doesn't exist, create a new RetentionPolicy with this data.
     */
    create: XOR<RetentionPolicyCreateInput, RetentionPolicyUncheckedCreateInput>
    /**
     * In case the RetentionPolicy was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RetentionPolicyUpdateInput, RetentionPolicyUncheckedUpdateInput>
  }

  /**
   * RetentionPolicy delete
   */
  export type RetentionPolicyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RetentionPolicy
     */
    select?: RetentionPolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RetentionPolicy
     */
    omit?: RetentionPolicyOmit<ExtArgs> | null
    /**
     * Filter which RetentionPolicy to delete.
     */
    where: RetentionPolicyWhereUniqueInput
  }

  /**
   * RetentionPolicy deleteMany
   */
  export type RetentionPolicyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RetentionPolicies to delete
     */
    where?: RetentionPolicyWhereInput
    /**
     * Limit how many RetentionPolicies to delete.
     */
    limit?: number
  }

  /**
   * RetentionPolicy without action
   */
  export type RetentionPolicyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RetentionPolicy
     */
    select?: RetentionPolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RetentionPolicy
     */
    omit?: RetentionPolicyOmit<ExtArgs> | null
  }


  /**
   * Model Alert
   */

  export type AggregateAlert = {
    _count: AlertCountAggregateOutputType | null
    _min: AlertMinAggregateOutputType | null
    _max: AlertMaxAggregateOutputType | null
  }

  export type AlertMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    userId: string | null
    roleScope: string | null
    moduleCode: string | null
    category: string | null
    severity: $Enums.AlertSeverity | null
    titleFa: string | null
    bodyFa: string | null
    actionUrl: string | null
    sourceEntityType: string | null
    sourceEntityId: string | null
    deduplicationKey: string | null
    seenAt: Date | null
    acknowledgedAt: Date | null
    dismissedAt: Date | null
    snoozedUntil: Date | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type AlertMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    userId: string | null
    roleScope: string | null
    moduleCode: string | null
    category: string | null
    severity: $Enums.AlertSeverity | null
    titleFa: string | null
    bodyFa: string | null
    actionUrl: string | null
    sourceEntityType: string | null
    sourceEntityId: string | null
    deduplicationKey: string | null
    seenAt: Date | null
    acknowledgedAt: Date | null
    dismissedAt: Date | null
    snoozedUntil: Date | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type AlertCountAggregateOutputType = {
    id: number
    tenantId: number
    userId: number
    roleScope: number
    moduleCode: number
    category: number
    severity: number
    titleFa: number
    bodyFa: number
    actionUrl: number
    sourceEntityType: number
    sourceEntityId: number
    deduplicationKey: number
    seenAt: number
    acknowledgedAt: number
    dismissedAt: number
    snoozedUntil: number
    expiresAt: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type AlertMinAggregateInputType = {
    id?: true
    tenantId?: true
    userId?: true
    roleScope?: true
    moduleCode?: true
    category?: true
    severity?: true
    titleFa?: true
    bodyFa?: true
    actionUrl?: true
    sourceEntityType?: true
    sourceEntityId?: true
    deduplicationKey?: true
    seenAt?: true
    acknowledgedAt?: true
    dismissedAt?: true
    snoozedUntil?: true
    expiresAt?: true
    createdAt?: true
  }

  export type AlertMaxAggregateInputType = {
    id?: true
    tenantId?: true
    userId?: true
    roleScope?: true
    moduleCode?: true
    category?: true
    severity?: true
    titleFa?: true
    bodyFa?: true
    actionUrl?: true
    sourceEntityType?: true
    sourceEntityId?: true
    deduplicationKey?: true
    seenAt?: true
    acknowledgedAt?: true
    dismissedAt?: true
    snoozedUntil?: true
    expiresAt?: true
    createdAt?: true
  }

  export type AlertCountAggregateInputType = {
    id?: true
    tenantId?: true
    userId?: true
    roleScope?: true
    moduleCode?: true
    category?: true
    severity?: true
    titleFa?: true
    bodyFa?: true
    actionUrl?: true
    sourceEntityType?: true
    sourceEntityId?: true
    deduplicationKey?: true
    seenAt?: true
    acknowledgedAt?: true
    dismissedAt?: true
    snoozedUntil?: true
    expiresAt?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type AlertAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Alert to aggregate.
     */
    where?: AlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     */
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Alerts
    **/
    _count?: true | AlertCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AlertMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AlertMaxAggregateInputType
  }

  export type GetAlertAggregateType<T extends AlertAggregateArgs> = {
        [P in keyof T & keyof AggregateAlert]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlert[P]>
      : GetScalarType<T[P], AggregateAlert[P]>
  }




  export type AlertGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlertWhereInput
    orderBy?: AlertOrderByWithAggregationInput | AlertOrderByWithAggregationInput[]
    by: AlertScalarFieldEnum[] | AlertScalarFieldEnum
    having?: AlertScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AlertCountAggregateInputType | true
    _min?: AlertMinAggregateInputType
    _max?: AlertMaxAggregateInputType
  }

  export type AlertGroupByOutputType = {
    id: string
    tenantId: string
    userId: string | null
    roleScope: string | null
    moduleCode: string
    category: string
    severity: $Enums.AlertSeverity
    titleFa: string
    bodyFa: string
    actionUrl: string | null
    sourceEntityType: string | null
    sourceEntityId: string | null
    deduplicationKey: string
    seenAt: Date | null
    acknowledgedAt: Date | null
    dismissedAt: Date | null
    snoozedUntil: Date | null
    expiresAt: Date | null
    metadata: JsonValue
    createdAt: Date
    _count: AlertCountAggregateOutputType | null
    _min: AlertMinAggregateOutputType | null
    _max: AlertMaxAggregateOutputType | null
  }

  type GetAlertGroupByPayload<T extends AlertGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AlertGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AlertGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AlertGroupByOutputType[P]>
            : GetScalarType<T[P], AlertGroupByOutputType[P]>
        }
      >
    >


  export type AlertSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    userId?: boolean
    roleScope?: boolean
    moduleCode?: boolean
    category?: boolean
    severity?: boolean
    titleFa?: boolean
    bodyFa?: boolean
    actionUrl?: boolean
    sourceEntityType?: boolean
    sourceEntityId?: boolean
    deduplicationKey?: boolean
    seenAt?: boolean
    acknowledgedAt?: boolean
    dismissedAt?: boolean
    snoozedUntil?: boolean
    expiresAt?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["alert"]>

  export type AlertSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    userId?: boolean
    roleScope?: boolean
    moduleCode?: boolean
    category?: boolean
    severity?: boolean
    titleFa?: boolean
    bodyFa?: boolean
    actionUrl?: boolean
    sourceEntityType?: boolean
    sourceEntityId?: boolean
    deduplicationKey?: boolean
    seenAt?: boolean
    acknowledgedAt?: boolean
    dismissedAt?: boolean
    snoozedUntil?: boolean
    expiresAt?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["alert"]>

  export type AlertSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    userId?: boolean
    roleScope?: boolean
    moduleCode?: boolean
    category?: boolean
    severity?: boolean
    titleFa?: boolean
    bodyFa?: boolean
    actionUrl?: boolean
    sourceEntityType?: boolean
    sourceEntityId?: boolean
    deduplicationKey?: boolean
    seenAt?: boolean
    acknowledgedAt?: boolean
    dismissedAt?: boolean
    snoozedUntil?: boolean
    expiresAt?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["alert"]>

  export type AlertSelectScalar = {
    id?: boolean
    tenantId?: boolean
    userId?: boolean
    roleScope?: boolean
    moduleCode?: boolean
    category?: boolean
    severity?: boolean
    titleFa?: boolean
    bodyFa?: boolean
    actionUrl?: boolean
    sourceEntityType?: boolean
    sourceEntityId?: boolean
    deduplicationKey?: boolean
    seenAt?: boolean
    acknowledgedAt?: boolean
    dismissedAt?: boolean
    snoozedUntil?: boolean
    expiresAt?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type AlertOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "userId" | "roleScope" | "moduleCode" | "category" | "severity" | "titleFa" | "bodyFa" | "actionUrl" | "sourceEntityType" | "sourceEntityId" | "deduplicationKey" | "seenAt" | "acknowledgedAt" | "dismissedAt" | "snoozedUntil" | "expiresAt" | "metadata" | "createdAt", ExtArgs["result"]["alert"]>

  export type $AlertPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Alert"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      userId: string | null
      roleScope: string | null
      moduleCode: string
      category: string
      severity: $Enums.AlertSeverity
      titleFa: string
      bodyFa: string
      actionUrl: string | null
      sourceEntityType: string | null
      sourceEntityId: string | null
      deduplicationKey: string
      seenAt: Date | null
      acknowledgedAt: Date | null
      dismissedAt: Date | null
      snoozedUntil: Date | null
      expiresAt: Date | null
      metadata: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["alert"]>
    composites: {}
  }

  type AlertGetPayload<S extends boolean | null | undefined | AlertDefaultArgs> = $Result.GetResult<Prisma.$AlertPayload, S>

  type AlertCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AlertFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AlertCountAggregateInputType | true
    }

  export interface AlertDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Alert'], meta: { name: 'Alert' } }
    /**
     * Find zero or one Alert that matches the filter.
     * @param {AlertFindUniqueArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AlertFindUniqueArgs>(args: SelectSubset<T, AlertFindUniqueArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Alert that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AlertFindUniqueOrThrowArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AlertFindUniqueOrThrowArgs>(args: SelectSubset<T, AlertFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Alert that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertFindFirstArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AlertFindFirstArgs>(args?: SelectSubset<T, AlertFindFirstArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Alert that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertFindFirstOrThrowArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AlertFindFirstOrThrowArgs>(args?: SelectSubset<T, AlertFindFirstOrThrowArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Alerts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Alerts
     * const alerts = await prisma.alert.findMany()
     * 
     * // Get first 10 Alerts
     * const alerts = await prisma.alert.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const alertWithIdOnly = await prisma.alert.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AlertFindManyArgs>(args?: SelectSubset<T, AlertFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Alert.
     * @param {AlertCreateArgs} args - Arguments to create a Alert.
     * @example
     * // Create one Alert
     * const Alert = await prisma.alert.create({
     *   data: {
     *     // ... data to create a Alert
     *   }
     * })
     * 
     */
    create<T extends AlertCreateArgs>(args: SelectSubset<T, AlertCreateArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Alerts.
     * @param {AlertCreateManyArgs} args - Arguments to create many Alerts.
     * @example
     * // Create many Alerts
     * const alert = await prisma.alert.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AlertCreateManyArgs>(args?: SelectSubset<T, AlertCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Alerts and returns the data saved in the database.
     * @param {AlertCreateManyAndReturnArgs} args - Arguments to create many Alerts.
     * @example
     * // Create many Alerts
     * const alert = await prisma.alert.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Alerts and only return the `id`
     * const alertWithIdOnly = await prisma.alert.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AlertCreateManyAndReturnArgs>(args?: SelectSubset<T, AlertCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Alert.
     * @param {AlertDeleteArgs} args - Arguments to delete one Alert.
     * @example
     * // Delete one Alert
     * const Alert = await prisma.alert.delete({
     *   where: {
     *     // ... filter to delete one Alert
     *   }
     * })
     * 
     */
    delete<T extends AlertDeleteArgs>(args: SelectSubset<T, AlertDeleteArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Alert.
     * @param {AlertUpdateArgs} args - Arguments to update one Alert.
     * @example
     * // Update one Alert
     * const alert = await prisma.alert.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AlertUpdateArgs>(args: SelectSubset<T, AlertUpdateArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Alerts.
     * @param {AlertDeleteManyArgs} args - Arguments to filter Alerts to delete.
     * @example
     * // Delete a few Alerts
     * const { count } = await prisma.alert.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AlertDeleteManyArgs>(args?: SelectSubset<T, AlertDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Alerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Alerts
     * const alert = await prisma.alert.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AlertUpdateManyArgs>(args: SelectSubset<T, AlertUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Alerts and returns the data updated in the database.
     * @param {AlertUpdateManyAndReturnArgs} args - Arguments to update many Alerts.
     * @example
     * // Update many Alerts
     * const alert = await prisma.alert.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Alerts and only return the `id`
     * const alertWithIdOnly = await prisma.alert.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AlertUpdateManyAndReturnArgs>(args: SelectSubset<T, AlertUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Alert.
     * @param {AlertUpsertArgs} args - Arguments to update or create a Alert.
     * @example
     * // Update or create a Alert
     * const alert = await prisma.alert.upsert({
     *   create: {
     *     // ... data to create a Alert
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Alert we want to update
     *   }
     * })
     */
    upsert<T extends AlertUpsertArgs>(args: SelectSubset<T, AlertUpsertArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Alerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertCountArgs} args - Arguments to filter Alerts to count.
     * @example
     * // Count the number of Alerts
     * const count = await prisma.alert.count({
     *   where: {
     *     // ... the filter for the Alerts we want to count
     *   }
     * })
    **/
    count<T extends AlertCountArgs>(
      args?: Subset<T, AlertCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AlertCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Alert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AlertAggregateArgs>(args: Subset<T, AlertAggregateArgs>): Prisma.PrismaPromise<GetAlertAggregateType<T>>

    /**
     * Group by Alert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AlertGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AlertGroupByArgs['orderBy'] }
        : { orderBy?: AlertGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AlertGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlertGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Alert model
   */
  readonly fields: AlertFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Alert.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AlertClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Alert model
   */
  interface AlertFieldRefs {
    readonly id: FieldRef<"Alert", 'String'>
    readonly tenantId: FieldRef<"Alert", 'String'>
    readonly userId: FieldRef<"Alert", 'String'>
    readonly roleScope: FieldRef<"Alert", 'String'>
    readonly moduleCode: FieldRef<"Alert", 'String'>
    readonly category: FieldRef<"Alert", 'String'>
    readonly severity: FieldRef<"Alert", 'AlertSeverity'>
    readonly titleFa: FieldRef<"Alert", 'String'>
    readonly bodyFa: FieldRef<"Alert", 'String'>
    readonly actionUrl: FieldRef<"Alert", 'String'>
    readonly sourceEntityType: FieldRef<"Alert", 'String'>
    readonly sourceEntityId: FieldRef<"Alert", 'String'>
    readonly deduplicationKey: FieldRef<"Alert", 'String'>
    readonly seenAt: FieldRef<"Alert", 'DateTime'>
    readonly acknowledgedAt: FieldRef<"Alert", 'DateTime'>
    readonly dismissedAt: FieldRef<"Alert", 'DateTime'>
    readonly snoozedUntil: FieldRef<"Alert", 'DateTime'>
    readonly expiresAt: FieldRef<"Alert", 'DateTime'>
    readonly metadata: FieldRef<"Alert", 'Json'>
    readonly createdAt: FieldRef<"Alert", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Alert findUnique
   */
  export type AlertFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Filter, which Alert to fetch.
     */
    where: AlertWhereUniqueInput
  }

  /**
   * Alert findUniqueOrThrow
   */
  export type AlertFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Filter, which Alert to fetch.
     */
    where: AlertWhereUniqueInput
  }

  /**
   * Alert findFirst
   */
  export type AlertFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Filter, which Alert to fetch.
     */
    where?: AlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     */
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Alerts.
     */
    cursor?: AlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Alerts.
     */
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[]
  }

  /**
   * Alert findFirstOrThrow
   */
  export type AlertFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Filter, which Alert to fetch.
     */
    where?: AlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     */
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Alerts.
     */
    cursor?: AlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Alerts.
     */
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[]
  }

  /**
   * Alert findMany
   */
  export type AlertFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Filter, which Alerts to fetch.
     */
    where?: AlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     */
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Alerts.
     */
    cursor?: AlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     */
    skip?: number
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[]
  }

  /**
   * Alert create
   */
  export type AlertCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * The data needed to create a Alert.
     */
    data: XOR<AlertCreateInput, AlertUncheckedCreateInput>
  }

  /**
   * Alert createMany
   */
  export type AlertCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Alerts.
     */
    data: AlertCreateManyInput | AlertCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Alert createManyAndReturn
   */
  export type AlertCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * The data used to create many Alerts.
     */
    data: AlertCreateManyInput | AlertCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Alert update
   */
  export type AlertUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * The data needed to update a Alert.
     */
    data: XOR<AlertUpdateInput, AlertUncheckedUpdateInput>
    /**
     * Choose, which Alert to update.
     */
    where: AlertWhereUniqueInput
  }

  /**
   * Alert updateMany
   */
  export type AlertUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Alerts.
     */
    data: XOR<AlertUpdateManyMutationInput, AlertUncheckedUpdateManyInput>
    /**
     * Filter which Alerts to update
     */
    where?: AlertWhereInput
    /**
     * Limit how many Alerts to update.
     */
    limit?: number
  }

  /**
   * Alert updateManyAndReturn
   */
  export type AlertUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * The data used to update Alerts.
     */
    data: XOR<AlertUpdateManyMutationInput, AlertUncheckedUpdateManyInput>
    /**
     * Filter which Alerts to update
     */
    where?: AlertWhereInput
    /**
     * Limit how many Alerts to update.
     */
    limit?: number
  }

  /**
   * Alert upsert
   */
  export type AlertUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * The filter to search for the Alert to update in case it exists.
     */
    where: AlertWhereUniqueInput
    /**
     * In case the Alert found by the `where` argument doesn't exist, create a new Alert with this data.
     */
    create: XOR<AlertCreateInput, AlertUncheckedCreateInput>
    /**
     * In case the Alert was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AlertUpdateInput, AlertUncheckedUpdateInput>
  }

  /**
   * Alert delete
   */
  export type AlertDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Filter which Alert to delete.
     */
    where: AlertWhereUniqueInput
  }

  /**
   * Alert deleteMany
   */
  export type AlertDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Alerts to delete
     */
    where?: AlertWhereInput
    /**
     * Limit how many Alerts to delete.
     */
    limit?: number
  }

  /**
   * Alert without action
   */
  export type AlertDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
  }


  /**
   * Model AlertRule
   */

  export type AggregateAlertRule = {
    _count: AlertRuleCountAggregateOutputType | null
    _avg: AlertRuleAvgAggregateOutputType | null
    _sum: AlertRuleSumAggregateOutputType | null
    _min: AlertRuleMinAggregateOutputType | null
    _max: AlertRuleMaxAggregateOutputType | null
  }

  export type AlertRuleAvgAggregateOutputType = {
    deduplicationWindowSec: number | null
  }

  export type AlertRuleSumAggregateOutputType = {
    deduplicationWindowSec: number | null
  }

  export type AlertRuleMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    moduleCode: string | null
    eventType: string | null
    severity: $Enums.AlertSeverity | null
    templateKey: string | null
    deduplicationWindowSec: number | null
    isActive: boolean | null
  }

  export type AlertRuleMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    moduleCode: string | null
    eventType: string | null
    severity: $Enums.AlertSeverity | null
    templateKey: string | null
    deduplicationWindowSec: number | null
    isActive: boolean | null
  }

  export type AlertRuleCountAggregateOutputType = {
    id: number
    tenantId: number
    moduleCode: number
    eventType: number
    condition: number
    severity: number
    templateKey: number
    recipients: number
    deduplicationWindowSec: number
    channels: number
    isActive: number
    _all: number
  }


  export type AlertRuleAvgAggregateInputType = {
    deduplicationWindowSec?: true
  }

  export type AlertRuleSumAggregateInputType = {
    deduplicationWindowSec?: true
  }

  export type AlertRuleMinAggregateInputType = {
    id?: true
    tenantId?: true
    moduleCode?: true
    eventType?: true
    severity?: true
    templateKey?: true
    deduplicationWindowSec?: true
    isActive?: true
  }

  export type AlertRuleMaxAggregateInputType = {
    id?: true
    tenantId?: true
    moduleCode?: true
    eventType?: true
    severity?: true
    templateKey?: true
    deduplicationWindowSec?: true
    isActive?: true
  }

  export type AlertRuleCountAggregateInputType = {
    id?: true
    tenantId?: true
    moduleCode?: true
    eventType?: true
    condition?: true
    severity?: true
    templateKey?: true
    recipients?: true
    deduplicationWindowSec?: true
    channels?: true
    isActive?: true
    _all?: true
  }

  export type AlertRuleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AlertRule to aggregate.
     */
    where?: AlertRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlertRules to fetch.
     */
    orderBy?: AlertRuleOrderByWithRelationInput | AlertRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AlertRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlertRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlertRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AlertRules
    **/
    _count?: true | AlertRuleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AlertRuleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AlertRuleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AlertRuleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AlertRuleMaxAggregateInputType
  }

  export type GetAlertRuleAggregateType<T extends AlertRuleAggregateArgs> = {
        [P in keyof T & keyof AggregateAlertRule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlertRule[P]>
      : GetScalarType<T[P], AggregateAlertRule[P]>
  }




  export type AlertRuleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlertRuleWhereInput
    orderBy?: AlertRuleOrderByWithAggregationInput | AlertRuleOrderByWithAggregationInput[]
    by: AlertRuleScalarFieldEnum[] | AlertRuleScalarFieldEnum
    having?: AlertRuleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AlertRuleCountAggregateInputType | true
    _avg?: AlertRuleAvgAggregateInputType
    _sum?: AlertRuleSumAggregateInputType
    _min?: AlertRuleMinAggregateInputType
    _max?: AlertRuleMaxAggregateInputType
  }

  export type AlertRuleGroupByOutputType = {
    id: string
    tenantId: string
    moduleCode: string
    eventType: string
    condition: JsonValue
    severity: $Enums.AlertSeverity
    templateKey: string
    recipients: JsonValue
    deduplicationWindowSec: number
    channels: JsonValue
    isActive: boolean
    _count: AlertRuleCountAggregateOutputType | null
    _avg: AlertRuleAvgAggregateOutputType | null
    _sum: AlertRuleSumAggregateOutputType | null
    _min: AlertRuleMinAggregateOutputType | null
    _max: AlertRuleMaxAggregateOutputType | null
  }

  type GetAlertRuleGroupByPayload<T extends AlertRuleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AlertRuleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AlertRuleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AlertRuleGroupByOutputType[P]>
            : GetScalarType<T[P], AlertRuleGroupByOutputType[P]>
        }
      >
    >


  export type AlertRuleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    moduleCode?: boolean
    eventType?: boolean
    condition?: boolean
    severity?: boolean
    templateKey?: boolean
    recipients?: boolean
    deduplicationWindowSec?: boolean
    channels?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["alertRule"]>

  export type AlertRuleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    moduleCode?: boolean
    eventType?: boolean
    condition?: boolean
    severity?: boolean
    templateKey?: boolean
    recipients?: boolean
    deduplicationWindowSec?: boolean
    channels?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["alertRule"]>

  export type AlertRuleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    moduleCode?: boolean
    eventType?: boolean
    condition?: boolean
    severity?: boolean
    templateKey?: boolean
    recipients?: boolean
    deduplicationWindowSec?: boolean
    channels?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["alertRule"]>

  export type AlertRuleSelectScalar = {
    id?: boolean
    tenantId?: boolean
    moduleCode?: boolean
    eventType?: boolean
    condition?: boolean
    severity?: boolean
    templateKey?: boolean
    recipients?: boolean
    deduplicationWindowSec?: boolean
    channels?: boolean
    isActive?: boolean
  }

  export type AlertRuleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "moduleCode" | "eventType" | "condition" | "severity" | "templateKey" | "recipients" | "deduplicationWindowSec" | "channels" | "isActive", ExtArgs["result"]["alertRule"]>

  export type $AlertRulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AlertRule"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      moduleCode: string
      eventType: string
      condition: Prisma.JsonValue
      severity: $Enums.AlertSeverity
      templateKey: string
      recipients: Prisma.JsonValue
      deduplicationWindowSec: number
      channels: Prisma.JsonValue
      isActive: boolean
    }, ExtArgs["result"]["alertRule"]>
    composites: {}
  }

  type AlertRuleGetPayload<S extends boolean | null | undefined | AlertRuleDefaultArgs> = $Result.GetResult<Prisma.$AlertRulePayload, S>

  type AlertRuleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AlertRuleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AlertRuleCountAggregateInputType | true
    }

  export interface AlertRuleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AlertRule'], meta: { name: 'AlertRule' } }
    /**
     * Find zero or one AlertRule that matches the filter.
     * @param {AlertRuleFindUniqueArgs} args - Arguments to find a AlertRule
     * @example
     * // Get one AlertRule
     * const alertRule = await prisma.alertRule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AlertRuleFindUniqueArgs>(args: SelectSubset<T, AlertRuleFindUniqueArgs<ExtArgs>>): Prisma__AlertRuleClient<$Result.GetResult<Prisma.$AlertRulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AlertRule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AlertRuleFindUniqueOrThrowArgs} args - Arguments to find a AlertRule
     * @example
     * // Get one AlertRule
     * const alertRule = await prisma.alertRule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AlertRuleFindUniqueOrThrowArgs>(args: SelectSubset<T, AlertRuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AlertRuleClient<$Result.GetResult<Prisma.$AlertRulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AlertRule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertRuleFindFirstArgs} args - Arguments to find a AlertRule
     * @example
     * // Get one AlertRule
     * const alertRule = await prisma.alertRule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AlertRuleFindFirstArgs>(args?: SelectSubset<T, AlertRuleFindFirstArgs<ExtArgs>>): Prisma__AlertRuleClient<$Result.GetResult<Prisma.$AlertRulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AlertRule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertRuleFindFirstOrThrowArgs} args - Arguments to find a AlertRule
     * @example
     * // Get one AlertRule
     * const alertRule = await prisma.alertRule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AlertRuleFindFirstOrThrowArgs>(args?: SelectSubset<T, AlertRuleFindFirstOrThrowArgs<ExtArgs>>): Prisma__AlertRuleClient<$Result.GetResult<Prisma.$AlertRulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AlertRules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertRuleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AlertRules
     * const alertRules = await prisma.alertRule.findMany()
     * 
     * // Get first 10 AlertRules
     * const alertRules = await prisma.alertRule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const alertRuleWithIdOnly = await prisma.alertRule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AlertRuleFindManyArgs>(args?: SelectSubset<T, AlertRuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AlertRule.
     * @param {AlertRuleCreateArgs} args - Arguments to create a AlertRule.
     * @example
     * // Create one AlertRule
     * const AlertRule = await prisma.alertRule.create({
     *   data: {
     *     // ... data to create a AlertRule
     *   }
     * })
     * 
     */
    create<T extends AlertRuleCreateArgs>(args: SelectSubset<T, AlertRuleCreateArgs<ExtArgs>>): Prisma__AlertRuleClient<$Result.GetResult<Prisma.$AlertRulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AlertRules.
     * @param {AlertRuleCreateManyArgs} args - Arguments to create many AlertRules.
     * @example
     * // Create many AlertRules
     * const alertRule = await prisma.alertRule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AlertRuleCreateManyArgs>(args?: SelectSubset<T, AlertRuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AlertRules and returns the data saved in the database.
     * @param {AlertRuleCreateManyAndReturnArgs} args - Arguments to create many AlertRules.
     * @example
     * // Create many AlertRules
     * const alertRule = await prisma.alertRule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AlertRules and only return the `id`
     * const alertRuleWithIdOnly = await prisma.alertRule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AlertRuleCreateManyAndReturnArgs>(args?: SelectSubset<T, AlertRuleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertRulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AlertRule.
     * @param {AlertRuleDeleteArgs} args - Arguments to delete one AlertRule.
     * @example
     * // Delete one AlertRule
     * const AlertRule = await prisma.alertRule.delete({
     *   where: {
     *     // ... filter to delete one AlertRule
     *   }
     * })
     * 
     */
    delete<T extends AlertRuleDeleteArgs>(args: SelectSubset<T, AlertRuleDeleteArgs<ExtArgs>>): Prisma__AlertRuleClient<$Result.GetResult<Prisma.$AlertRulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AlertRule.
     * @param {AlertRuleUpdateArgs} args - Arguments to update one AlertRule.
     * @example
     * // Update one AlertRule
     * const alertRule = await prisma.alertRule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AlertRuleUpdateArgs>(args: SelectSubset<T, AlertRuleUpdateArgs<ExtArgs>>): Prisma__AlertRuleClient<$Result.GetResult<Prisma.$AlertRulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AlertRules.
     * @param {AlertRuleDeleteManyArgs} args - Arguments to filter AlertRules to delete.
     * @example
     * // Delete a few AlertRules
     * const { count } = await prisma.alertRule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AlertRuleDeleteManyArgs>(args?: SelectSubset<T, AlertRuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AlertRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertRuleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AlertRules
     * const alertRule = await prisma.alertRule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AlertRuleUpdateManyArgs>(args: SelectSubset<T, AlertRuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AlertRules and returns the data updated in the database.
     * @param {AlertRuleUpdateManyAndReturnArgs} args - Arguments to update many AlertRules.
     * @example
     * // Update many AlertRules
     * const alertRule = await prisma.alertRule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AlertRules and only return the `id`
     * const alertRuleWithIdOnly = await prisma.alertRule.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AlertRuleUpdateManyAndReturnArgs>(args: SelectSubset<T, AlertRuleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertRulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AlertRule.
     * @param {AlertRuleUpsertArgs} args - Arguments to update or create a AlertRule.
     * @example
     * // Update or create a AlertRule
     * const alertRule = await prisma.alertRule.upsert({
     *   create: {
     *     // ... data to create a AlertRule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AlertRule we want to update
     *   }
     * })
     */
    upsert<T extends AlertRuleUpsertArgs>(args: SelectSubset<T, AlertRuleUpsertArgs<ExtArgs>>): Prisma__AlertRuleClient<$Result.GetResult<Prisma.$AlertRulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AlertRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertRuleCountArgs} args - Arguments to filter AlertRules to count.
     * @example
     * // Count the number of AlertRules
     * const count = await prisma.alertRule.count({
     *   where: {
     *     // ... the filter for the AlertRules we want to count
     *   }
     * })
    **/
    count<T extends AlertRuleCountArgs>(
      args?: Subset<T, AlertRuleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AlertRuleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AlertRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertRuleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AlertRuleAggregateArgs>(args: Subset<T, AlertRuleAggregateArgs>): Prisma.PrismaPromise<GetAlertRuleAggregateType<T>>

    /**
     * Group by AlertRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertRuleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AlertRuleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AlertRuleGroupByArgs['orderBy'] }
        : { orderBy?: AlertRuleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AlertRuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlertRuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AlertRule model
   */
  readonly fields: AlertRuleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AlertRule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AlertRuleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AlertRule model
   */
  interface AlertRuleFieldRefs {
    readonly id: FieldRef<"AlertRule", 'String'>
    readonly tenantId: FieldRef<"AlertRule", 'String'>
    readonly moduleCode: FieldRef<"AlertRule", 'String'>
    readonly eventType: FieldRef<"AlertRule", 'String'>
    readonly condition: FieldRef<"AlertRule", 'Json'>
    readonly severity: FieldRef<"AlertRule", 'AlertSeverity'>
    readonly templateKey: FieldRef<"AlertRule", 'String'>
    readonly recipients: FieldRef<"AlertRule", 'Json'>
    readonly deduplicationWindowSec: FieldRef<"AlertRule", 'Int'>
    readonly channels: FieldRef<"AlertRule", 'Json'>
    readonly isActive: FieldRef<"AlertRule", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * AlertRule findUnique
   */
  export type AlertRuleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRule
     */
    select?: AlertRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertRule
     */
    omit?: AlertRuleOmit<ExtArgs> | null
    /**
     * Filter, which AlertRule to fetch.
     */
    where: AlertRuleWhereUniqueInput
  }

  /**
   * AlertRule findUniqueOrThrow
   */
  export type AlertRuleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRule
     */
    select?: AlertRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertRule
     */
    omit?: AlertRuleOmit<ExtArgs> | null
    /**
     * Filter, which AlertRule to fetch.
     */
    where: AlertRuleWhereUniqueInput
  }

  /**
   * AlertRule findFirst
   */
  export type AlertRuleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRule
     */
    select?: AlertRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertRule
     */
    omit?: AlertRuleOmit<ExtArgs> | null
    /**
     * Filter, which AlertRule to fetch.
     */
    where?: AlertRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlertRules to fetch.
     */
    orderBy?: AlertRuleOrderByWithRelationInput | AlertRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AlertRules.
     */
    cursor?: AlertRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlertRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlertRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AlertRules.
     */
    distinct?: AlertRuleScalarFieldEnum | AlertRuleScalarFieldEnum[]
  }

  /**
   * AlertRule findFirstOrThrow
   */
  export type AlertRuleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRule
     */
    select?: AlertRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertRule
     */
    omit?: AlertRuleOmit<ExtArgs> | null
    /**
     * Filter, which AlertRule to fetch.
     */
    where?: AlertRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlertRules to fetch.
     */
    orderBy?: AlertRuleOrderByWithRelationInput | AlertRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AlertRules.
     */
    cursor?: AlertRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlertRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlertRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AlertRules.
     */
    distinct?: AlertRuleScalarFieldEnum | AlertRuleScalarFieldEnum[]
  }

  /**
   * AlertRule findMany
   */
  export type AlertRuleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRule
     */
    select?: AlertRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertRule
     */
    omit?: AlertRuleOmit<ExtArgs> | null
    /**
     * Filter, which AlertRules to fetch.
     */
    where?: AlertRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlertRules to fetch.
     */
    orderBy?: AlertRuleOrderByWithRelationInput | AlertRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AlertRules.
     */
    cursor?: AlertRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlertRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlertRules.
     */
    skip?: number
    distinct?: AlertRuleScalarFieldEnum | AlertRuleScalarFieldEnum[]
  }

  /**
   * AlertRule create
   */
  export type AlertRuleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRule
     */
    select?: AlertRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertRule
     */
    omit?: AlertRuleOmit<ExtArgs> | null
    /**
     * The data needed to create a AlertRule.
     */
    data: XOR<AlertRuleCreateInput, AlertRuleUncheckedCreateInput>
  }

  /**
   * AlertRule createMany
   */
  export type AlertRuleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AlertRules.
     */
    data: AlertRuleCreateManyInput | AlertRuleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AlertRule createManyAndReturn
   */
  export type AlertRuleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRule
     */
    select?: AlertRuleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AlertRule
     */
    omit?: AlertRuleOmit<ExtArgs> | null
    /**
     * The data used to create many AlertRules.
     */
    data: AlertRuleCreateManyInput | AlertRuleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AlertRule update
   */
  export type AlertRuleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRule
     */
    select?: AlertRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertRule
     */
    omit?: AlertRuleOmit<ExtArgs> | null
    /**
     * The data needed to update a AlertRule.
     */
    data: XOR<AlertRuleUpdateInput, AlertRuleUncheckedUpdateInput>
    /**
     * Choose, which AlertRule to update.
     */
    where: AlertRuleWhereUniqueInput
  }

  /**
   * AlertRule updateMany
   */
  export type AlertRuleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AlertRules.
     */
    data: XOR<AlertRuleUpdateManyMutationInput, AlertRuleUncheckedUpdateManyInput>
    /**
     * Filter which AlertRules to update
     */
    where?: AlertRuleWhereInput
    /**
     * Limit how many AlertRules to update.
     */
    limit?: number
  }

  /**
   * AlertRule updateManyAndReturn
   */
  export type AlertRuleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRule
     */
    select?: AlertRuleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AlertRule
     */
    omit?: AlertRuleOmit<ExtArgs> | null
    /**
     * The data used to update AlertRules.
     */
    data: XOR<AlertRuleUpdateManyMutationInput, AlertRuleUncheckedUpdateManyInput>
    /**
     * Filter which AlertRules to update
     */
    where?: AlertRuleWhereInput
    /**
     * Limit how many AlertRules to update.
     */
    limit?: number
  }

  /**
   * AlertRule upsert
   */
  export type AlertRuleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRule
     */
    select?: AlertRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertRule
     */
    omit?: AlertRuleOmit<ExtArgs> | null
    /**
     * The filter to search for the AlertRule to update in case it exists.
     */
    where: AlertRuleWhereUniqueInput
    /**
     * In case the AlertRule found by the `where` argument doesn't exist, create a new AlertRule with this data.
     */
    create: XOR<AlertRuleCreateInput, AlertRuleUncheckedCreateInput>
    /**
     * In case the AlertRule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AlertRuleUpdateInput, AlertRuleUncheckedUpdateInput>
  }

  /**
   * AlertRule delete
   */
  export type AlertRuleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRule
     */
    select?: AlertRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertRule
     */
    omit?: AlertRuleOmit<ExtArgs> | null
    /**
     * Filter which AlertRule to delete.
     */
    where: AlertRuleWhereUniqueInput
  }

  /**
   * AlertRule deleteMany
   */
  export type AlertRuleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AlertRules to delete
     */
    where?: AlertRuleWhereInput
    /**
     * Limit how many AlertRules to delete.
     */
    limit?: number
  }

  /**
   * AlertRule without action
   */
  export type AlertRuleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRule
     */
    select?: AlertRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertRule
     */
    omit?: AlertRuleOmit<ExtArgs> | null
  }


  /**
   * Model UserNotificationPreference
   */

  export type AggregateUserNotificationPreference = {
    _count: UserNotificationPreferenceCountAggregateOutputType | null
    _min: UserNotificationPreferenceMinAggregateOutputType | null
    _max: UserNotificationPreferenceMaxAggregateOutputType | null
  }

  export type UserNotificationPreferenceMinAggregateOutputType = {
    id: string | null
    userId: string | null
    tenantId: string | null
  }

  export type UserNotificationPreferenceMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    tenantId: string | null
  }

  export type UserNotificationPreferenceCountAggregateOutputType = {
    id: number
    userId: number
    tenantId: number
    channels: number
    categoryPrefs: number
    quietHours: number
    _all: number
  }


  export type UserNotificationPreferenceMinAggregateInputType = {
    id?: true
    userId?: true
    tenantId?: true
  }

  export type UserNotificationPreferenceMaxAggregateInputType = {
    id?: true
    userId?: true
    tenantId?: true
  }

  export type UserNotificationPreferenceCountAggregateInputType = {
    id?: true
    userId?: true
    tenantId?: true
    channels?: true
    categoryPrefs?: true
    quietHours?: true
    _all?: true
  }

  export type UserNotificationPreferenceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserNotificationPreference to aggregate.
     */
    where?: UserNotificationPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserNotificationPreferences to fetch.
     */
    orderBy?: UserNotificationPreferenceOrderByWithRelationInput | UserNotificationPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserNotificationPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserNotificationPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserNotificationPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserNotificationPreferences
    **/
    _count?: true | UserNotificationPreferenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserNotificationPreferenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserNotificationPreferenceMaxAggregateInputType
  }

  export type GetUserNotificationPreferenceAggregateType<T extends UserNotificationPreferenceAggregateArgs> = {
        [P in keyof T & keyof AggregateUserNotificationPreference]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserNotificationPreference[P]>
      : GetScalarType<T[P], AggregateUserNotificationPreference[P]>
  }




  export type UserNotificationPreferenceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserNotificationPreferenceWhereInput
    orderBy?: UserNotificationPreferenceOrderByWithAggregationInput | UserNotificationPreferenceOrderByWithAggregationInput[]
    by: UserNotificationPreferenceScalarFieldEnum[] | UserNotificationPreferenceScalarFieldEnum
    having?: UserNotificationPreferenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserNotificationPreferenceCountAggregateInputType | true
    _min?: UserNotificationPreferenceMinAggregateInputType
    _max?: UserNotificationPreferenceMaxAggregateInputType
  }

  export type UserNotificationPreferenceGroupByOutputType = {
    id: string
    userId: string
    tenantId: string
    channels: JsonValue
    categoryPrefs: JsonValue
    quietHours: JsonValue | null
    _count: UserNotificationPreferenceCountAggregateOutputType | null
    _min: UserNotificationPreferenceMinAggregateOutputType | null
    _max: UserNotificationPreferenceMaxAggregateOutputType | null
  }

  type GetUserNotificationPreferenceGroupByPayload<T extends UserNotificationPreferenceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserNotificationPreferenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserNotificationPreferenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserNotificationPreferenceGroupByOutputType[P]>
            : GetScalarType<T[P], UserNotificationPreferenceGroupByOutputType[P]>
        }
      >
    >


  export type UserNotificationPreferenceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tenantId?: boolean
    channels?: boolean
    categoryPrefs?: boolean
    quietHours?: boolean
  }, ExtArgs["result"]["userNotificationPreference"]>

  export type UserNotificationPreferenceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tenantId?: boolean
    channels?: boolean
    categoryPrefs?: boolean
    quietHours?: boolean
  }, ExtArgs["result"]["userNotificationPreference"]>

  export type UserNotificationPreferenceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tenantId?: boolean
    channels?: boolean
    categoryPrefs?: boolean
    quietHours?: boolean
  }, ExtArgs["result"]["userNotificationPreference"]>

  export type UserNotificationPreferenceSelectScalar = {
    id?: boolean
    userId?: boolean
    tenantId?: boolean
    channels?: boolean
    categoryPrefs?: boolean
    quietHours?: boolean
  }

  export type UserNotificationPreferenceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "tenantId" | "channels" | "categoryPrefs" | "quietHours", ExtArgs["result"]["userNotificationPreference"]>

  export type $UserNotificationPreferencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserNotificationPreference"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      tenantId: string
      channels: Prisma.JsonValue
      categoryPrefs: Prisma.JsonValue
      quietHours: Prisma.JsonValue | null
    }, ExtArgs["result"]["userNotificationPreference"]>
    composites: {}
  }

  type UserNotificationPreferenceGetPayload<S extends boolean | null | undefined | UserNotificationPreferenceDefaultArgs> = $Result.GetResult<Prisma.$UserNotificationPreferencePayload, S>

  type UserNotificationPreferenceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserNotificationPreferenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserNotificationPreferenceCountAggregateInputType | true
    }

  export interface UserNotificationPreferenceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserNotificationPreference'], meta: { name: 'UserNotificationPreference' } }
    /**
     * Find zero or one UserNotificationPreference that matches the filter.
     * @param {UserNotificationPreferenceFindUniqueArgs} args - Arguments to find a UserNotificationPreference
     * @example
     * // Get one UserNotificationPreference
     * const userNotificationPreference = await prisma.userNotificationPreference.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserNotificationPreferenceFindUniqueArgs>(args: SelectSubset<T, UserNotificationPreferenceFindUniqueArgs<ExtArgs>>): Prisma__UserNotificationPreferenceClient<$Result.GetResult<Prisma.$UserNotificationPreferencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserNotificationPreference that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserNotificationPreferenceFindUniqueOrThrowArgs} args - Arguments to find a UserNotificationPreference
     * @example
     * // Get one UserNotificationPreference
     * const userNotificationPreference = await prisma.userNotificationPreference.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserNotificationPreferenceFindUniqueOrThrowArgs>(args: SelectSubset<T, UserNotificationPreferenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserNotificationPreferenceClient<$Result.GetResult<Prisma.$UserNotificationPreferencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserNotificationPreference that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserNotificationPreferenceFindFirstArgs} args - Arguments to find a UserNotificationPreference
     * @example
     * // Get one UserNotificationPreference
     * const userNotificationPreference = await prisma.userNotificationPreference.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserNotificationPreferenceFindFirstArgs>(args?: SelectSubset<T, UserNotificationPreferenceFindFirstArgs<ExtArgs>>): Prisma__UserNotificationPreferenceClient<$Result.GetResult<Prisma.$UserNotificationPreferencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserNotificationPreference that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserNotificationPreferenceFindFirstOrThrowArgs} args - Arguments to find a UserNotificationPreference
     * @example
     * // Get one UserNotificationPreference
     * const userNotificationPreference = await prisma.userNotificationPreference.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserNotificationPreferenceFindFirstOrThrowArgs>(args?: SelectSubset<T, UserNotificationPreferenceFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserNotificationPreferenceClient<$Result.GetResult<Prisma.$UserNotificationPreferencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserNotificationPreferences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserNotificationPreferenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserNotificationPreferences
     * const userNotificationPreferences = await prisma.userNotificationPreference.findMany()
     * 
     * // Get first 10 UserNotificationPreferences
     * const userNotificationPreferences = await prisma.userNotificationPreference.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userNotificationPreferenceWithIdOnly = await prisma.userNotificationPreference.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserNotificationPreferenceFindManyArgs>(args?: SelectSubset<T, UserNotificationPreferenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserNotificationPreferencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserNotificationPreference.
     * @param {UserNotificationPreferenceCreateArgs} args - Arguments to create a UserNotificationPreference.
     * @example
     * // Create one UserNotificationPreference
     * const UserNotificationPreference = await prisma.userNotificationPreference.create({
     *   data: {
     *     // ... data to create a UserNotificationPreference
     *   }
     * })
     * 
     */
    create<T extends UserNotificationPreferenceCreateArgs>(args: SelectSubset<T, UserNotificationPreferenceCreateArgs<ExtArgs>>): Prisma__UserNotificationPreferenceClient<$Result.GetResult<Prisma.$UserNotificationPreferencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserNotificationPreferences.
     * @param {UserNotificationPreferenceCreateManyArgs} args - Arguments to create many UserNotificationPreferences.
     * @example
     * // Create many UserNotificationPreferences
     * const userNotificationPreference = await prisma.userNotificationPreference.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserNotificationPreferenceCreateManyArgs>(args?: SelectSubset<T, UserNotificationPreferenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserNotificationPreferences and returns the data saved in the database.
     * @param {UserNotificationPreferenceCreateManyAndReturnArgs} args - Arguments to create many UserNotificationPreferences.
     * @example
     * // Create many UserNotificationPreferences
     * const userNotificationPreference = await prisma.userNotificationPreference.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserNotificationPreferences and only return the `id`
     * const userNotificationPreferenceWithIdOnly = await prisma.userNotificationPreference.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserNotificationPreferenceCreateManyAndReturnArgs>(args?: SelectSubset<T, UserNotificationPreferenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserNotificationPreferencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserNotificationPreference.
     * @param {UserNotificationPreferenceDeleteArgs} args - Arguments to delete one UserNotificationPreference.
     * @example
     * // Delete one UserNotificationPreference
     * const UserNotificationPreference = await prisma.userNotificationPreference.delete({
     *   where: {
     *     // ... filter to delete one UserNotificationPreference
     *   }
     * })
     * 
     */
    delete<T extends UserNotificationPreferenceDeleteArgs>(args: SelectSubset<T, UserNotificationPreferenceDeleteArgs<ExtArgs>>): Prisma__UserNotificationPreferenceClient<$Result.GetResult<Prisma.$UserNotificationPreferencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserNotificationPreference.
     * @param {UserNotificationPreferenceUpdateArgs} args - Arguments to update one UserNotificationPreference.
     * @example
     * // Update one UserNotificationPreference
     * const userNotificationPreference = await prisma.userNotificationPreference.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserNotificationPreferenceUpdateArgs>(args: SelectSubset<T, UserNotificationPreferenceUpdateArgs<ExtArgs>>): Prisma__UserNotificationPreferenceClient<$Result.GetResult<Prisma.$UserNotificationPreferencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserNotificationPreferences.
     * @param {UserNotificationPreferenceDeleteManyArgs} args - Arguments to filter UserNotificationPreferences to delete.
     * @example
     * // Delete a few UserNotificationPreferences
     * const { count } = await prisma.userNotificationPreference.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserNotificationPreferenceDeleteManyArgs>(args?: SelectSubset<T, UserNotificationPreferenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserNotificationPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserNotificationPreferenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserNotificationPreferences
     * const userNotificationPreference = await prisma.userNotificationPreference.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserNotificationPreferenceUpdateManyArgs>(args: SelectSubset<T, UserNotificationPreferenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserNotificationPreferences and returns the data updated in the database.
     * @param {UserNotificationPreferenceUpdateManyAndReturnArgs} args - Arguments to update many UserNotificationPreferences.
     * @example
     * // Update many UserNotificationPreferences
     * const userNotificationPreference = await prisma.userNotificationPreference.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserNotificationPreferences and only return the `id`
     * const userNotificationPreferenceWithIdOnly = await prisma.userNotificationPreference.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserNotificationPreferenceUpdateManyAndReturnArgs>(args: SelectSubset<T, UserNotificationPreferenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserNotificationPreferencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserNotificationPreference.
     * @param {UserNotificationPreferenceUpsertArgs} args - Arguments to update or create a UserNotificationPreference.
     * @example
     * // Update or create a UserNotificationPreference
     * const userNotificationPreference = await prisma.userNotificationPreference.upsert({
     *   create: {
     *     // ... data to create a UserNotificationPreference
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserNotificationPreference we want to update
     *   }
     * })
     */
    upsert<T extends UserNotificationPreferenceUpsertArgs>(args: SelectSubset<T, UserNotificationPreferenceUpsertArgs<ExtArgs>>): Prisma__UserNotificationPreferenceClient<$Result.GetResult<Prisma.$UserNotificationPreferencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserNotificationPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserNotificationPreferenceCountArgs} args - Arguments to filter UserNotificationPreferences to count.
     * @example
     * // Count the number of UserNotificationPreferences
     * const count = await prisma.userNotificationPreference.count({
     *   where: {
     *     // ... the filter for the UserNotificationPreferences we want to count
     *   }
     * })
    **/
    count<T extends UserNotificationPreferenceCountArgs>(
      args?: Subset<T, UserNotificationPreferenceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserNotificationPreferenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserNotificationPreference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserNotificationPreferenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserNotificationPreferenceAggregateArgs>(args: Subset<T, UserNotificationPreferenceAggregateArgs>): Prisma.PrismaPromise<GetUserNotificationPreferenceAggregateType<T>>

    /**
     * Group by UserNotificationPreference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserNotificationPreferenceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserNotificationPreferenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserNotificationPreferenceGroupByArgs['orderBy'] }
        : { orderBy?: UserNotificationPreferenceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserNotificationPreferenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserNotificationPreferenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserNotificationPreference model
   */
  readonly fields: UserNotificationPreferenceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserNotificationPreference.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserNotificationPreferenceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserNotificationPreference model
   */
  interface UserNotificationPreferenceFieldRefs {
    readonly id: FieldRef<"UserNotificationPreference", 'String'>
    readonly userId: FieldRef<"UserNotificationPreference", 'String'>
    readonly tenantId: FieldRef<"UserNotificationPreference", 'String'>
    readonly channels: FieldRef<"UserNotificationPreference", 'Json'>
    readonly categoryPrefs: FieldRef<"UserNotificationPreference", 'Json'>
    readonly quietHours: FieldRef<"UserNotificationPreference", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * UserNotificationPreference findUnique
   */
  export type UserNotificationPreferenceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserNotificationPreference
     */
    select?: UserNotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserNotificationPreference
     */
    omit?: UserNotificationPreferenceOmit<ExtArgs> | null
    /**
     * Filter, which UserNotificationPreference to fetch.
     */
    where: UserNotificationPreferenceWhereUniqueInput
  }

  /**
   * UserNotificationPreference findUniqueOrThrow
   */
  export type UserNotificationPreferenceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserNotificationPreference
     */
    select?: UserNotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserNotificationPreference
     */
    omit?: UserNotificationPreferenceOmit<ExtArgs> | null
    /**
     * Filter, which UserNotificationPreference to fetch.
     */
    where: UserNotificationPreferenceWhereUniqueInput
  }

  /**
   * UserNotificationPreference findFirst
   */
  export type UserNotificationPreferenceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserNotificationPreference
     */
    select?: UserNotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserNotificationPreference
     */
    omit?: UserNotificationPreferenceOmit<ExtArgs> | null
    /**
     * Filter, which UserNotificationPreference to fetch.
     */
    where?: UserNotificationPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserNotificationPreferences to fetch.
     */
    orderBy?: UserNotificationPreferenceOrderByWithRelationInput | UserNotificationPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserNotificationPreferences.
     */
    cursor?: UserNotificationPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserNotificationPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserNotificationPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserNotificationPreferences.
     */
    distinct?: UserNotificationPreferenceScalarFieldEnum | UserNotificationPreferenceScalarFieldEnum[]
  }

  /**
   * UserNotificationPreference findFirstOrThrow
   */
  export type UserNotificationPreferenceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserNotificationPreference
     */
    select?: UserNotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserNotificationPreference
     */
    omit?: UserNotificationPreferenceOmit<ExtArgs> | null
    /**
     * Filter, which UserNotificationPreference to fetch.
     */
    where?: UserNotificationPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserNotificationPreferences to fetch.
     */
    orderBy?: UserNotificationPreferenceOrderByWithRelationInput | UserNotificationPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserNotificationPreferences.
     */
    cursor?: UserNotificationPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserNotificationPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserNotificationPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserNotificationPreferences.
     */
    distinct?: UserNotificationPreferenceScalarFieldEnum | UserNotificationPreferenceScalarFieldEnum[]
  }

  /**
   * UserNotificationPreference findMany
   */
  export type UserNotificationPreferenceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserNotificationPreference
     */
    select?: UserNotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserNotificationPreference
     */
    omit?: UserNotificationPreferenceOmit<ExtArgs> | null
    /**
     * Filter, which UserNotificationPreferences to fetch.
     */
    where?: UserNotificationPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserNotificationPreferences to fetch.
     */
    orderBy?: UserNotificationPreferenceOrderByWithRelationInput | UserNotificationPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserNotificationPreferences.
     */
    cursor?: UserNotificationPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserNotificationPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserNotificationPreferences.
     */
    skip?: number
    distinct?: UserNotificationPreferenceScalarFieldEnum | UserNotificationPreferenceScalarFieldEnum[]
  }

  /**
   * UserNotificationPreference create
   */
  export type UserNotificationPreferenceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserNotificationPreference
     */
    select?: UserNotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserNotificationPreference
     */
    omit?: UserNotificationPreferenceOmit<ExtArgs> | null
    /**
     * The data needed to create a UserNotificationPreference.
     */
    data: XOR<UserNotificationPreferenceCreateInput, UserNotificationPreferenceUncheckedCreateInput>
  }

  /**
   * UserNotificationPreference createMany
   */
  export type UserNotificationPreferenceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserNotificationPreferences.
     */
    data: UserNotificationPreferenceCreateManyInput | UserNotificationPreferenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserNotificationPreference createManyAndReturn
   */
  export type UserNotificationPreferenceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserNotificationPreference
     */
    select?: UserNotificationPreferenceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserNotificationPreference
     */
    omit?: UserNotificationPreferenceOmit<ExtArgs> | null
    /**
     * The data used to create many UserNotificationPreferences.
     */
    data: UserNotificationPreferenceCreateManyInput | UserNotificationPreferenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserNotificationPreference update
   */
  export type UserNotificationPreferenceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserNotificationPreference
     */
    select?: UserNotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserNotificationPreference
     */
    omit?: UserNotificationPreferenceOmit<ExtArgs> | null
    /**
     * The data needed to update a UserNotificationPreference.
     */
    data: XOR<UserNotificationPreferenceUpdateInput, UserNotificationPreferenceUncheckedUpdateInput>
    /**
     * Choose, which UserNotificationPreference to update.
     */
    where: UserNotificationPreferenceWhereUniqueInput
  }

  /**
   * UserNotificationPreference updateMany
   */
  export type UserNotificationPreferenceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserNotificationPreferences.
     */
    data: XOR<UserNotificationPreferenceUpdateManyMutationInput, UserNotificationPreferenceUncheckedUpdateManyInput>
    /**
     * Filter which UserNotificationPreferences to update
     */
    where?: UserNotificationPreferenceWhereInput
    /**
     * Limit how many UserNotificationPreferences to update.
     */
    limit?: number
  }

  /**
   * UserNotificationPreference updateManyAndReturn
   */
  export type UserNotificationPreferenceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserNotificationPreference
     */
    select?: UserNotificationPreferenceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserNotificationPreference
     */
    omit?: UserNotificationPreferenceOmit<ExtArgs> | null
    /**
     * The data used to update UserNotificationPreferences.
     */
    data: XOR<UserNotificationPreferenceUpdateManyMutationInput, UserNotificationPreferenceUncheckedUpdateManyInput>
    /**
     * Filter which UserNotificationPreferences to update
     */
    where?: UserNotificationPreferenceWhereInput
    /**
     * Limit how many UserNotificationPreferences to update.
     */
    limit?: number
  }

  /**
   * UserNotificationPreference upsert
   */
  export type UserNotificationPreferenceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserNotificationPreference
     */
    select?: UserNotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserNotificationPreference
     */
    omit?: UserNotificationPreferenceOmit<ExtArgs> | null
    /**
     * The filter to search for the UserNotificationPreference to update in case it exists.
     */
    where: UserNotificationPreferenceWhereUniqueInput
    /**
     * In case the UserNotificationPreference found by the `where` argument doesn't exist, create a new UserNotificationPreference with this data.
     */
    create: XOR<UserNotificationPreferenceCreateInput, UserNotificationPreferenceUncheckedCreateInput>
    /**
     * In case the UserNotificationPreference was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserNotificationPreferenceUpdateInput, UserNotificationPreferenceUncheckedUpdateInput>
  }

  /**
   * UserNotificationPreference delete
   */
  export type UserNotificationPreferenceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserNotificationPreference
     */
    select?: UserNotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserNotificationPreference
     */
    omit?: UserNotificationPreferenceOmit<ExtArgs> | null
    /**
     * Filter which UserNotificationPreference to delete.
     */
    where: UserNotificationPreferenceWhereUniqueInput
  }

  /**
   * UserNotificationPreference deleteMany
   */
  export type UserNotificationPreferenceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserNotificationPreferences to delete
     */
    where?: UserNotificationPreferenceWhereInput
    /**
     * Limit how many UserNotificationPreferences to delete.
     */
    limit?: number
  }

  /**
   * UserNotificationPreference without action
   */
  export type UserNotificationPreferenceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserNotificationPreference
     */
    select?: UserNotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserNotificationPreference
     */
    omit?: UserNotificationPreferenceOmit<ExtArgs> | null
  }


  /**
   * Model NotificationTemplate
   */

  export type AggregateNotificationTemplate = {
    _count: NotificationTemplateCountAggregateOutputType | null
    _avg: NotificationTemplateAvgAggregateOutputType | null
    _sum: NotificationTemplateSumAggregateOutputType | null
    _min: NotificationTemplateMinAggregateOutputType | null
    _max: NotificationTemplateMaxAggregateOutputType | null
  }

  export type NotificationTemplateAvgAggregateOutputType = {
    version: number | null
  }

  export type NotificationTemplateSumAggregateOutputType = {
    version: number | null
  }

  export type NotificationTemplateMinAggregateOutputType = {
    id: string | null
    key: string | null
    locale: string | null
    channel: $Enums.NotificationChannel | null
    subject: string | null
    bodyHtml: string | null
    bodyText: string | null
    version: number | null
    isActive: boolean | null
  }

  export type NotificationTemplateMaxAggregateOutputType = {
    id: string | null
    key: string | null
    locale: string | null
    channel: $Enums.NotificationChannel | null
    subject: string | null
    bodyHtml: string | null
    bodyText: string | null
    version: number | null
    isActive: boolean | null
  }

  export type NotificationTemplateCountAggregateOutputType = {
    id: number
    key: number
    locale: number
    channel: number
    subject: number
    bodyHtml: number
    bodyText: number
    variables: number
    version: number
    isActive: number
    _all: number
  }


  export type NotificationTemplateAvgAggregateInputType = {
    version?: true
  }

  export type NotificationTemplateSumAggregateInputType = {
    version?: true
  }

  export type NotificationTemplateMinAggregateInputType = {
    id?: true
    key?: true
    locale?: true
    channel?: true
    subject?: true
    bodyHtml?: true
    bodyText?: true
    version?: true
    isActive?: true
  }

  export type NotificationTemplateMaxAggregateInputType = {
    id?: true
    key?: true
    locale?: true
    channel?: true
    subject?: true
    bodyHtml?: true
    bodyText?: true
    version?: true
    isActive?: true
  }

  export type NotificationTemplateCountAggregateInputType = {
    id?: true
    key?: true
    locale?: true
    channel?: true
    subject?: true
    bodyHtml?: true
    bodyText?: true
    variables?: true
    version?: true
    isActive?: true
    _all?: true
  }

  export type NotificationTemplateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationTemplate to aggregate.
     */
    where?: NotificationTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationTemplates to fetch.
     */
    orderBy?: NotificationTemplateOrderByWithRelationInput | NotificationTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NotificationTemplates
    **/
    _count?: true | NotificationTemplateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotificationTemplateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotificationTemplateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationTemplateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationTemplateMaxAggregateInputType
  }

  export type GetNotificationTemplateAggregateType<T extends NotificationTemplateAggregateArgs> = {
        [P in keyof T & keyof AggregateNotificationTemplate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotificationTemplate[P]>
      : GetScalarType<T[P], AggregateNotificationTemplate[P]>
  }




  export type NotificationTemplateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationTemplateWhereInput
    orderBy?: NotificationTemplateOrderByWithAggregationInput | NotificationTemplateOrderByWithAggregationInput[]
    by: NotificationTemplateScalarFieldEnum[] | NotificationTemplateScalarFieldEnum
    having?: NotificationTemplateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationTemplateCountAggregateInputType | true
    _avg?: NotificationTemplateAvgAggregateInputType
    _sum?: NotificationTemplateSumAggregateInputType
    _min?: NotificationTemplateMinAggregateInputType
    _max?: NotificationTemplateMaxAggregateInputType
  }

  export type NotificationTemplateGroupByOutputType = {
    id: string
    key: string
    locale: string
    channel: $Enums.NotificationChannel
    subject: string | null
    bodyHtml: string
    bodyText: string
    variables: JsonValue
    version: number
    isActive: boolean
    _count: NotificationTemplateCountAggregateOutputType | null
    _avg: NotificationTemplateAvgAggregateOutputType | null
    _sum: NotificationTemplateSumAggregateOutputType | null
    _min: NotificationTemplateMinAggregateOutputType | null
    _max: NotificationTemplateMaxAggregateOutputType | null
  }

  type GetNotificationTemplateGroupByPayload<T extends NotificationTemplateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationTemplateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationTemplateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationTemplateGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationTemplateGroupByOutputType[P]>
        }
      >
    >


  export type NotificationTemplateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    locale?: boolean
    channel?: boolean
    subject?: boolean
    bodyHtml?: boolean
    bodyText?: boolean
    variables?: boolean
    version?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["notificationTemplate"]>

  export type NotificationTemplateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    locale?: boolean
    channel?: boolean
    subject?: boolean
    bodyHtml?: boolean
    bodyText?: boolean
    variables?: boolean
    version?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["notificationTemplate"]>

  export type NotificationTemplateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    locale?: boolean
    channel?: boolean
    subject?: boolean
    bodyHtml?: boolean
    bodyText?: boolean
    variables?: boolean
    version?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["notificationTemplate"]>

  export type NotificationTemplateSelectScalar = {
    id?: boolean
    key?: boolean
    locale?: boolean
    channel?: boolean
    subject?: boolean
    bodyHtml?: boolean
    bodyText?: boolean
    variables?: boolean
    version?: boolean
    isActive?: boolean
  }

  export type NotificationTemplateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "key" | "locale" | "channel" | "subject" | "bodyHtml" | "bodyText" | "variables" | "version" | "isActive", ExtArgs["result"]["notificationTemplate"]>

  export type $NotificationTemplatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NotificationTemplate"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: string
      locale: string
      channel: $Enums.NotificationChannel
      subject: string | null
      bodyHtml: string
      bodyText: string
      variables: Prisma.JsonValue
      version: number
      isActive: boolean
    }, ExtArgs["result"]["notificationTemplate"]>
    composites: {}
  }

  type NotificationTemplateGetPayload<S extends boolean | null | undefined | NotificationTemplateDefaultArgs> = $Result.GetResult<Prisma.$NotificationTemplatePayload, S>

  type NotificationTemplateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationTemplateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationTemplateCountAggregateInputType | true
    }

  export interface NotificationTemplateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NotificationTemplate'], meta: { name: 'NotificationTemplate' } }
    /**
     * Find zero or one NotificationTemplate that matches the filter.
     * @param {NotificationTemplateFindUniqueArgs} args - Arguments to find a NotificationTemplate
     * @example
     * // Get one NotificationTemplate
     * const notificationTemplate = await prisma.notificationTemplate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationTemplateFindUniqueArgs>(args: SelectSubset<T, NotificationTemplateFindUniqueArgs<ExtArgs>>): Prisma__NotificationTemplateClient<$Result.GetResult<Prisma.$NotificationTemplatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NotificationTemplate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationTemplateFindUniqueOrThrowArgs} args - Arguments to find a NotificationTemplate
     * @example
     * // Get one NotificationTemplate
     * const notificationTemplate = await prisma.notificationTemplate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationTemplateFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationTemplateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationTemplateClient<$Result.GetResult<Prisma.$NotificationTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NotificationTemplate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationTemplateFindFirstArgs} args - Arguments to find a NotificationTemplate
     * @example
     * // Get one NotificationTemplate
     * const notificationTemplate = await prisma.notificationTemplate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationTemplateFindFirstArgs>(args?: SelectSubset<T, NotificationTemplateFindFirstArgs<ExtArgs>>): Prisma__NotificationTemplateClient<$Result.GetResult<Prisma.$NotificationTemplatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NotificationTemplate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationTemplateFindFirstOrThrowArgs} args - Arguments to find a NotificationTemplate
     * @example
     * // Get one NotificationTemplate
     * const notificationTemplate = await prisma.notificationTemplate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationTemplateFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationTemplateFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationTemplateClient<$Result.GetResult<Prisma.$NotificationTemplatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NotificationTemplates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationTemplateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NotificationTemplates
     * const notificationTemplates = await prisma.notificationTemplate.findMany()
     * 
     * // Get first 10 NotificationTemplates
     * const notificationTemplates = await prisma.notificationTemplate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationTemplateWithIdOnly = await prisma.notificationTemplate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationTemplateFindManyArgs>(args?: SelectSubset<T, NotificationTemplateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationTemplatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NotificationTemplate.
     * @param {NotificationTemplateCreateArgs} args - Arguments to create a NotificationTemplate.
     * @example
     * // Create one NotificationTemplate
     * const NotificationTemplate = await prisma.notificationTemplate.create({
     *   data: {
     *     // ... data to create a NotificationTemplate
     *   }
     * })
     * 
     */
    create<T extends NotificationTemplateCreateArgs>(args: SelectSubset<T, NotificationTemplateCreateArgs<ExtArgs>>): Prisma__NotificationTemplateClient<$Result.GetResult<Prisma.$NotificationTemplatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NotificationTemplates.
     * @param {NotificationTemplateCreateManyArgs} args - Arguments to create many NotificationTemplates.
     * @example
     * // Create many NotificationTemplates
     * const notificationTemplate = await prisma.notificationTemplate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationTemplateCreateManyArgs>(args?: SelectSubset<T, NotificationTemplateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NotificationTemplates and returns the data saved in the database.
     * @param {NotificationTemplateCreateManyAndReturnArgs} args - Arguments to create many NotificationTemplates.
     * @example
     * // Create many NotificationTemplates
     * const notificationTemplate = await prisma.notificationTemplate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NotificationTemplates and only return the `id`
     * const notificationTemplateWithIdOnly = await prisma.notificationTemplate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationTemplateCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationTemplateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationTemplatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NotificationTemplate.
     * @param {NotificationTemplateDeleteArgs} args - Arguments to delete one NotificationTemplate.
     * @example
     * // Delete one NotificationTemplate
     * const NotificationTemplate = await prisma.notificationTemplate.delete({
     *   where: {
     *     // ... filter to delete one NotificationTemplate
     *   }
     * })
     * 
     */
    delete<T extends NotificationTemplateDeleteArgs>(args: SelectSubset<T, NotificationTemplateDeleteArgs<ExtArgs>>): Prisma__NotificationTemplateClient<$Result.GetResult<Prisma.$NotificationTemplatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NotificationTemplate.
     * @param {NotificationTemplateUpdateArgs} args - Arguments to update one NotificationTemplate.
     * @example
     * // Update one NotificationTemplate
     * const notificationTemplate = await prisma.notificationTemplate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationTemplateUpdateArgs>(args: SelectSubset<T, NotificationTemplateUpdateArgs<ExtArgs>>): Prisma__NotificationTemplateClient<$Result.GetResult<Prisma.$NotificationTemplatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NotificationTemplates.
     * @param {NotificationTemplateDeleteManyArgs} args - Arguments to filter NotificationTemplates to delete.
     * @example
     * // Delete a few NotificationTemplates
     * const { count } = await prisma.notificationTemplate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationTemplateDeleteManyArgs>(args?: SelectSubset<T, NotificationTemplateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificationTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationTemplateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NotificationTemplates
     * const notificationTemplate = await prisma.notificationTemplate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationTemplateUpdateManyArgs>(args: SelectSubset<T, NotificationTemplateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificationTemplates and returns the data updated in the database.
     * @param {NotificationTemplateUpdateManyAndReturnArgs} args - Arguments to update many NotificationTemplates.
     * @example
     * // Update many NotificationTemplates
     * const notificationTemplate = await prisma.notificationTemplate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NotificationTemplates and only return the `id`
     * const notificationTemplateWithIdOnly = await prisma.notificationTemplate.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationTemplateUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationTemplateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationTemplatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NotificationTemplate.
     * @param {NotificationTemplateUpsertArgs} args - Arguments to update or create a NotificationTemplate.
     * @example
     * // Update or create a NotificationTemplate
     * const notificationTemplate = await prisma.notificationTemplate.upsert({
     *   create: {
     *     // ... data to create a NotificationTemplate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NotificationTemplate we want to update
     *   }
     * })
     */
    upsert<T extends NotificationTemplateUpsertArgs>(args: SelectSubset<T, NotificationTemplateUpsertArgs<ExtArgs>>): Prisma__NotificationTemplateClient<$Result.GetResult<Prisma.$NotificationTemplatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NotificationTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationTemplateCountArgs} args - Arguments to filter NotificationTemplates to count.
     * @example
     * // Count the number of NotificationTemplates
     * const count = await prisma.notificationTemplate.count({
     *   where: {
     *     // ... the filter for the NotificationTemplates we want to count
     *   }
     * })
    **/
    count<T extends NotificationTemplateCountArgs>(
      args?: Subset<T, NotificationTemplateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationTemplateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NotificationTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationTemplateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationTemplateAggregateArgs>(args: Subset<T, NotificationTemplateAggregateArgs>): Prisma.PrismaPromise<GetNotificationTemplateAggregateType<T>>

    /**
     * Group by NotificationTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationTemplateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationTemplateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationTemplateGroupByArgs['orderBy'] }
        : { orderBy?: NotificationTemplateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationTemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NotificationTemplate model
   */
  readonly fields: NotificationTemplateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NotificationTemplate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationTemplateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NotificationTemplate model
   */
  interface NotificationTemplateFieldRefs {
    readonly id: FieldRef<"NotificationTemplate", 'String'>
    readonly key: FieldRef<"NotificationTemplate", 'String'>
    readonly locale: FieldRef<"NotificationTemplate", 'String'>
    readonly channel: FieldRef<"NotificationTemplate", 'NotificationChannel'>
    readonly subject: FieldRef<"NotificationTemplate", 'String'>
    readonly bodyHtml: FieldRef<"NotificationTemplate", 'String'>
    readonly bodyText: FieldRef<"NotificationTemplate", 'String'>
    readonly variables: FieldRef<"NotificationTemplate", 'Json'>
    readonly version: FieldRef<"NotificationTemplate", 'Int'>
    readonly isActive: FieldRef<"NotificationTemplate", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * NotificationTemplate findUnique
   */
  export type NotificationTemplateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTemplate
     */
    select?: NotificationTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationTemplate
     */
    omit?: NotificationTemplateOmit<ExtArgs> | null
    /**
     * Filter, which NotificationTemplate to fetch.
     */
    where: NotificationTemplateWhereUniqueInput
  }

  /**
   * NotificationTemplate findUniqueOrThrow
   */
  export type NotificationTemplateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTemplate
     */
    select?: NotificationTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationTemplate
     */
    omit?: NotificationTemplateOmit<ExtArgs> | null
    /**
     * Filter, which NotificationTemplate to fetch.
     */
    where: NotificationTemplateWhereUniqueInput
  }

  /**
   * NotificationTemplate findFirst
   */
  export type NotificationTemplateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTemplate
     */
    select?: NotificationTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationTemplate
     */
    omit?: NotificationTemplateOmit<ExtArgs> | null
    /**
     * Filter, which NotificationTemplate to fetch.
     */
    where?: NotificationTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationTemplates to fetch.
     */
    orderBy?: NotificationTemplateOrderByWithRelationInput | NotificationTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationTemplates.
     */
    cursor?: NotificationTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationTemplates.
     */
    distinct?: NotificationTemplateScalarFieldEnum | NotificationTemplateScalarFieldEnum[]
  }

  /**
   * NotificationTemplate findFirstOrThrow
   */
  export type NotificationTemplateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTemplate
     */
    select?: NotificationTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationTemplate
     */
    omit?: NotificationTemplateOmit<ExtArgs> | null
    /**
     * Filter, which NotificationTemplate to fetch.
     */
    where?: NotificationTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationTemplates to fetch.
     */
    orderBy?: NotificationTemplateOrderByWithRelationInput | NotificationTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationTemplates.
     */
    cursor?: NotificationTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationTemplates.
     */
    distinct?: NotificationTemplateScalarFieldEnum | NotificationTemplateScalarFieldEnum[]
  }

  /**
   * NotificationTemplate findMany
   */
  export type NotificationTemplateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTemplate
     */
    select?: NotificationTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationTemplate
     */
    omit?: NotificationTemplateOmit<ExtArgs> | null
    /**
     * Filter, which NotificationTemplates to fetch.
     */
    where?: NotificationTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationTemplates to fetch.
     */
    orderBy?: NotificationTemplateOrderByWithRelationInput | NotificationTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NotificationTemplates.
     */
    cursor?: NotificationTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationTemplates.
     */
    skip?: number
    distinct?: NotificationTemplateScalarFieldEnum | NotificationTemplateScalarFieldEnum[]
  }

  /**
   * NotificationTemplate create
   */
  export type NotificationTemplateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTemplate
     */
    select?: NotificationTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationTemplate
     */
    omit?: NotificationTemplateOmit<ExtArgs> | null
    /**
     * The data needed to create a NotificationTemplate.
     */
    data: XOR<NotificationTemplateCreateInput, NotificationTemplateUncheckedCreateInput>
  }

  /**
   * NotificationTemplate createMany
   */
  export type NotificationTemplateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NotificationTemplates.
     */
    data: NotificationTemplateCreateManyInput | NotificationTemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NotificationTemplate createManyAndReturn
   */
  export type NotificationTemplateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTemplate
     */
    select?: NotificationTemplateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationTemplate
     */
    omit?: NotificationTemplateOmit<ExtArgs> | null
    /**
     * The data used to create many NotificationTemplates.
     */
    data: NotificationTemplateCreateManyInput | NotificationTemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NotificationTemplate update
   */
  export type NotificationTemplateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTemplate
     */
    select?: NotificationTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationTemplate
     */
    omit?: NotificationTemplateOmit<ExtArgs> | null
    /**
     * The data needed to update a NotificationTemplate.
     */
    data: XOR<NotificationTemplateUpdateInput, NotificationTemplateUncheckedUpdateInput>
    /**
     * Choose, which NotificationTemplate to update.
     */
    where: NotificationTemplateWhereUniqueInput
  }

  /**
   * NotificationTemplate updateMany
   */
  export type NotificationTemplateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NotificationTemplates.
     */
    data: XOR<NotificationTemplateUpdateManyMutationInput, NotificationTemplateUncheckedUpdateManyInput>
    /**
     * Filter which NotificationTemplates to update
     */
    where?: NotificationTemplateWhereInput
    /**
     * Limit how many NotificationTemplates to update.
     */
    limit?: number
  }

  /**
   * NotificationTemplate updateManyAndReturn
   */
  export type NotificationTemplateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTemplate
     */
    select?: NotificationTemplateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationTemplate
     */
    omit?: NotificationTemplateOmit<ExtArgs> | null
    /**
     * The data used to update NotificationTemplates.
     */
    data: XOR<NotificationTemplateUpdateManyMutationInput, NotificationTemplateUncheckedUpdateManyInput>
    /**
     * Filter which NotificationTemplates to update
     */
    where?: NotificationTemplateWhereInput
    /**
     * Limit how many NotificationTemplates to update.
     */
    limit?: number
  }

  /**
   * NotificationTemplate upsert
   */
  export type NotificationTemplateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTemplate
     */
    select?: NotificationTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationTemplate
     */
    omit?: NotificationTemplateOmit<ExtArgs> | null
    /**
     * The filter to search for the NotificationTemplate to update in case it exists.
     */
    where: NotificationTemplateWhereUniqueInput
    /**
     * In case the NotificationTemplate found by the `where` argument doesn't exist, create a new NotificationTemplate with this data.
     */
    create: XOR<NotificationTemplateCreateInput, NotificationTemplateUncheckedCreateInput>
    /**
     * In case the NotificationTemplate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationTemplateUpdateInput, NotificationTemplateUncheckedUpdateInput>
  }

  /**
   * NotificationTemplate delete
   */
  export type NotificationTemplateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTemplate
     */
    select?: NotificationTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationTemplate
     */
    omit?: NotificationTemplateOmit<ExtArgs> | null
    /**
     * Filter which NotificationTemplate to delete.
     */
    where: NotificationTemplateWhereUniqueInput
  }

  /**
   * NotificationTemplate deleteMany
   */
  export type NotificationTemplateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationTemplates to delete
     */
    where?: NotificationTemplateWhereInput
    /**
     * Limit how many NotificationTemplates to delete.
     */
    limit?: number
  }

  /**
   * NotificationTemplate without action
   */
  export type NotificationTemplateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTemplate
     */
    select?: NotificationTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationTemplate
     */
    omit?: NotificationTemplateOmit<ExtArgs> | null
  }


  /**
   * Model NotificationLog
   */

  export type AggregateNotificationLog = {
    _count: NotificationLogCountAggregateOutputType | null
    _min: NotificationLogMinAggregateOutputType | null
    _max: NotificationLogMaxAggregateOutputType | null
  }

  export type NotificationLogMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    userId: string | null
    role: string | null
    templateKey: string | null
    channel: $Enums.NotificationChannel | null
    recipient: string | null
    status: $Enums.NotificationStatus | null
    providerMessageId: string | null
    errorMessage: string | null
    idempotencyKey: string | null
    correlationId: string | null
    sentAt: Date | null
    deliveredAt: Date | null
    createdAt: Date | null
  }

  export type NotificationLogMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    userId: string | null
    role: string | null
    templateKey: string | null
    channel: $Enums.NotificationChannel | null
    recipient: string | null
    status: $Enums.NotificationStatus | null
    providerMessageId: string | null
    errorMessage: string | null
    idempotencyKey: string | null
    correlationId: string | null
    sentAt: Date | null
    deliveredAt: Date | null
    createdAt: Date | null
  }

  export type NotificationLogCountAggregateOutputType = {
    id: number
    tenantId: number
    userId: number
    role: number
    templateKey: number
    channel: number
    recipient: number
    status: number
    providerMessageId: number
    errorMessage: number
    idempotencyKey: number
    correlationId: number
    sentAt: number
    deliveredAt: number
    createdAt: number
    _all: number
  }


  export type NotificationLogMinAggregateInputType = {
    id?: true
    tenantId?: true
    userId?: true
    role?: true
    templateKey?: true
    channel?: true
    recipient?: true
    status?: true
    providerMessageId?: true
    errorMessage?: true
    idempotencyKey?: true
    correlationId?: true
    sentAt?: true
    deliveredAt?: true
    createdAt?: true
  }

  export type NotificationLogMaxAggregateInputType = {
    id?: true
    tenantId?: true
    userId?: true
    role?: true
    templateKey?: true
    channel?: true
    recipient?: true
    status?: true
    providerMessageId?: true
    errorMessage?: true
    idempotencyKey?: true
    correlationId?: true
    sentAt?: true
    deliveredAt?: true
    createdAt?: true
  }

  export type NotificationLogCountAggregateInputType = {
    id?: true
    tenantId?: true
    userId?: true
    role?: true
    templateKey?: true
    channel?: true
    recipient?: true
    status?: true
    providerMessageId?: true
    errorMessage?: true
    idempotencyKey?: true
    correlationId?: true
    sentAt?: true
    deliveredAt?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationLog to aggregate.
     */
    where?: NotificationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationLogs to fetch.
     */
    orderBy?: NotificationLogOrderByWithRelationInput | NotificationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NotificationLogs
    **/
    _count?: true | NotificationLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationLogMaxAggregateInputType
  }

  export type GetNotificationLogAggregateType<T extends NotificationLogAggregateArgs> = {
        [P in keyof T & keyof AggregateNotificationLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotificationLog[P]>
      : GetScalarType<T[P], AggregateNotificationLog[P]>
  }




  export type NotificationLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationLogWhereInput
    orderBy?: NotificationLogOrderByWithAggregationInput | NotificationLogOrderByWithAggregationInput[]
    by: NotificationLogScalarFieldEnum[] | NotificationLogScalarFieldEnum
    having?: NotificationLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationLogCountAggregateInputType | true
    _min?: NotificationLogMinAggregateInputType
    _max?: NotificationLogMaxAggregateInputType
  }

  export type NotificationLogGroupByOutputType = {
    id: string
    tenantId: string
    userId: string | null
    role: string | null
    templateKey: string
    channel: $Enums.NotificationChannel
    recipient: string
    status: $Enums.NotificationStatus
    providerMessageId: string | null
    errorMessage: string | null
    idempotencyKey: string
    correlationId: string
    sentAt: Date | null
    deliveredAt: Date | null
    createdAt: Date
    _count: NotificationLogCountAggregateOutputType | null
    _min: NotificationLogMinAggregateOutputType | null
    _max: NotificationLogMaxAggregateOutputType | null
  }

  type GetNotificationLogGroupByPayload<T extends NotificationLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationLogGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationLogGroupByOutputType[P]>
        }
      >
    >


  export type NotificationLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    userId?: boolean
    role?: boolean
    templateKey?: boolean
    channel?: boolean
    recipient?: boolean
    status?: boolean
    providerMessageId?: boolean
    errorMessage?: boolean
    idempotencyKey?: boolean
    correlationId?: boolean
    sentAt?: boolean
    deliveredAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["notificationLog"]>

  export type NotificationLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    userId?: boolean
    role?: boolean
    templateKey?: boolean
    channel?: boolean
    recipient?: boolean
    status?: boolean
    providerMessageId?: boolean
    errorMessage?: boolean
    idempotencyKey?: boolean
    correlationId?: boolean
    sentAt?: boolean
    deliveredAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["notificationLog"]>

  export type NotificationLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    userId?: boolean
    role?: boolean
    templateKey?: boolean
    channel?: boolean
    recipient?: boolean
    status?: boolean
    providerMessageId?: boolean
    errorMessage?: boolean
    idempotencyKey?: boolean
    correlationId?: boolean
    sentAt?: boolean
    deliveredAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["notificationLog"]>

  export type NotificationLogSelectScalar = {
    id?: boolean
    tenantId?: boolean
    userId?: boolean
    role?: boolean
    templateKey?: boolean
    channel?: boolean
    recipient?: boolean
    status?: boolean
    providerMessageId?: boolean
    errorMessage?: boolean
    idempotencyKey?: boolean
    correlationId?: boolean
    sentAt?: boolean
    deliveredAt?: boolean
    createdAt?: boolean
  }

  export type NotificationLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "userId" | "role" | "templateKey" | "channel" | "recipient" | "status" | "providerMessageId" | "errorMessage" | "idempotencyKey" | "correlationId" | "sentAt" | "deliveredAt" | "createdAt", ExtArgs["result"]["notificationLog"]>

  export type $NotificationLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NotificationLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      userId: string | null
      role: string | null
      templateKey: string
      channel: $Enums.NotificationChannel
      recipient: string
      status: $Enums.NotificationStatus
      providerMessageId: string | null
      errorMessage: string | null
      idempotencyKey: string
      correlationId: string
      sentAt: Date | null
      deliveredAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["notificationLog"]>
    composites: {}
  }

  type NotificationLogGetPayload<S extends boolean | null | undefined | NotificationLogDefaultArgs> = $Result.GetResult<Prisma.$NotificationLogPayload, S>

  type NotificationLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationLogCountAggregateInputType | true
    }

  export interface NotificationLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NotificationLog'], meta: { name: 'NotificationLog' } }
    /**
     * Find zero or one NotificationLog that matches the filter.
     * @param {NotificationLogFindUniqueArgs} args - Arguments to find a NotificationLog
     * @example
     * // Get one NotificationLog
     * const notificationLog = await prisma.notificationLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationLogFindUniqueArgs>(args: SelectSubset<T, NotificationLogFindUniqueArgs<ExtArgs>>): Prisma__NotificationLogClient<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NotificationLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationLogFindUniqueOrThrowArgs} args - Arguments to find a NotificationLog
     * @example
     * // Get one NotificationLog
     * const notificationLog = await prisma.notificationLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationLogFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationLogClient<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NotificationLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationLogFindFirstArgs} args - Arguments to find a NotificationLog
     * @example
     * // Get one NotificationLog
     * const notificationLog = await prisma.notificationLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationLogFindFirstArgs>(args?: SelectSubset<T, NotificationLogFindFirstArgs<ExtArgs>>): Prisma__NotificationLogClient<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NotificationLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationLogFindFirstOrThrowArgs} args - Arguments to find a NotificationLog
     * @example
     * // Get one NotificationLog
     * const notificationLog = await prisma.notificationLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationLogFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationLogClient<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NotificationLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NotificationLogs
     * const notificationLogs = await prisma.notificationLog.findMany()
     * 
     * // Get first 10 NotificationLogs
     * const notificationLogs = await prisma.notificationLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationLogWithIdOnly = await prisma.notificationLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationLogFindManyArgs>(args?: SelectSubset<T, NotificationLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NotificationLog.
     * @param {NotificationLogCreateArgs} args - Arguments to create a NotificationLog.
     * @example
     * // Create one NotificationLog
     * const NotificationLog = await prisma.notificationLog.create({
     *   data: {
     *     // ... data to create a NotificationLog
     *   }
     * })
     * 
     */
    create<T extends NotificationLogCreateArgs>(args: SelectSubset<T, NotificationLogCreateArgs<ExtArgs>>): Prisma__NotificationLogClient<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NotificationLogs.
     * @param {NotificationLogCreateManyArgs} args - Arguments to create many NotificationLogs.
     * @example
     * // Create many NotificationLogs
     * const notificationLog = await prisma.notificationLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationLogCreateManyArgs>(args?: SelectSubset<T, NotificationLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NotificationLogs and returns the data saved in the database.
     * @param {NotificationLogCreateManyAndReturnArgs} args - Arguments to create many NotificationLogs.
     * @example
     * // Create many NotificationLogs
     * const notificationLog = await prisma.notificationLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NotificationLogs and only return the `id`
     * const notificationLogWithIdOnly = await prisma.notificationLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationLogCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NotificationLog.
     * @param {NotificationLogDeleteArgs} args - Arguments to delete one NotificationLog.
     * @example
     * // Delete one NotificationLog
     * const NotificationLog = await prisma.notificationLog.delete({
     *   where: {
     *     // ... filter to delete one NotificationLog
     *   }
     * })
     * 
     */
    delete<T extends NotificationLogDeleteArgs>(args: SelectSubset<T, NotificationLogDeleteArgs<ExtArgs>>): Prisma__NotificationLogClient<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NotificationLog.
     * @param {NotificationLogUpdateArgs} args - Arguments to update one NotificationLog.
     * @example
     * // Update one NotificationLog
     * const notificationLog = await prisma.notificationLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationLogUpdateArgs>(args: SelectSubset<T, NotificationLogUpdateArgs<ExtArgs>>): Prisma__NotificationLogClient<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NotificationLogs.
     * @param {NotificationLogDeleteManyArgs} args - Arguments to filter NotificationLogs to delete.
     * @example
     * // Delete a few NotificationLogs
     * const { count } = await prisma.notificationLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationLogDeleteManyArgs>(args?: SelectSubset<T, NotificationLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificationLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NotificationLogs
     * const notificationLog = await prisma.notificationLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationLogUpdateManyArgs>(args: SelectSubset<T, NotificationLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificationLogs and returns the data updated in the database.
     * @param {NotificationLogUpdateManyAndReturnArgs} args - Arguments to update many NotificationLogs.
     * @example
     * // Update many NotificationLogs
     * const notificationLog = await prisma.notificationLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NotificationLogs and only return the `id`
     * const notificationLogWithIdOnly = await prisma.notificationLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationLogUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NotificationLog.
     * @param {NotificationLogUpsertArgs} args - Arguments to update or create a NotificationLog.
     * @example
     * // Update or create a NotificationLog
     * const notificationLog = await prisma.notificationLog.upsert({
     *   create: {
     *     // ... data to create a NotificationLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NotificationLog we want to update
     *   }
     * })
     */
    upsert<T extends NotificationLogUpsertArgs>(args: SelectSubset<T, NotificationLogUpsertArgs<ExtArgs>>): Prisma__NotificationLogClient<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NotificationLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationLogCountArgs} args - Arguments to filter NotificationLogs to count.
     * @example
     * // Count the number of NotificationLogs
     * const count = await prisma.notificationLog.count({
     *   where: {
     *     // ... the filter for the NotificationLogs we want to count
     *   }
     * })
    **/
    count<T extends NotificationLogCountArgs>(
      args?: Subset<T, NotificationLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NotificationLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationLogAggregateArgs>(args: Subset<T, NotificationLogAggregateArgs>): Prisma.PrismaPromise<GetNotificationLogAggregateType<T>>

    /**
     * Group by NotificationLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationLogGroupByArgs['orderBy'] }
        : { orderBy?: NotificationLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NotificationLog model
   */
  readonly fields: NotificationLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NotificationLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NotificationLog model
   */
  interface NotificationLogFieldRefs {
    readonly id: FieldRef<"NotificationLog", 'String'>
    readonly tenantId: FieldRef<"NotificationLog", 'String'>
    readonly userId: FieldRef<"NotificationLog", 'String'>
    readonly role: FieldRef<"NotificationLog", 'String'>
    readonly templateKey: FieldRef<"NotificationLog", 'String'>
    readonly channel: FieldRef<"NotificationLog", 'NotificationChannel'>
    readonly recipient: FieldRef<"NotificationLog", 'String'>
    readonly status: FieldRef<"NotificationLog", 'NotificationStatus'>
    readonly providerMessageId: FieldRef<"NotificationLog", 'String'>
    readonly errorMessage: FieldRef<"NotificationLog", 'String'>
    readonly idempotencyKey: FieldRef<"NotificationLog", 'String'>
    readonly correlationId: FieldRef<"NotificationLog", 'String'>
    readonly sentAt: FieldRef<"NotificationLog", 'DateTime'>
    readonly deliveredAt: FieldRef<"NotificationLog", 'DateTime'>
    readonly createdAt: FieldRef<"NotificationLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NotificationLog findUnique
   */
  export type NotificationLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * Filter, which NotificationLog to fetch.
     */
    where: NotificationLogWhereUniqueInput
  }

  /**
   * NotificationLog findUniqueOrThrow
   */
  export type NotificationLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * Filter, which NotificationLog to fetch.
     */
    where: NotificationLogWhereUniqueInput
  }

  /**
   * NotificationLog findFirst
   */
  export type NotificationLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * Filter, which NotificationLog to fetch.
     */
    where?: NotificationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationLogs to fetch.
     */
    orderBy?: NotificationLogOrderByWithRelationInput | NotificationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationLogs.
     */
    cursor?: NotificationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationLogs.
     */
    distinct?: NotificationLogScalarFieldEnum | NotificationLogScalarFieldEnum[]
  }

  /**
   * NotificationLog findFirstOrThrow
   */
  export type NotificationLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * Filter, which NotificationLog to fetch.
     */
    where?: NotificationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationLogs to fetch.
     */
    orderBy?: NotificationLogOrderByWithRelationInput | NotificationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationLogs.
     */
    cursor?: NotificationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationLogs.
     */
    distinct?: NotificationLogScalarFieldEnum | NotificationLogScalarFieldEnum[]
  }

  /**
   * NotificationLog findMany
   */
  export type NotificationLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * Filter, which NotificationLogs to fetch.
     */
    where?: NotificationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationLogs to fetch.
     */
    orderBy?: NotificationLogOrderByWithRelationInput | NotificationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NotificationLogs.
     */
    cursor?: NotificationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationLogs.
     */
    skip?: number
    distinct?: NotificationLogScalarFieldEnum | NotificationLogScalarFieldEnum[]
  }

  /**
   * NotificationLog create
   */
  export type NotificationLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * The data needed to create a NotificationLog.
     */
    data: XOR<NotificationLogCreateInput, NotificationLogUncheckedCreateInput>
  }

  /**
   * NotificationLog createMany
   */
  export type NotificationLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NotificationLogs.
     */
    data: NotificationLogCreateManyInput | NotificationLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NotificationLog createManyAndReturn
   */
  export type NotificationLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * The data used to create many NotificationLogs.
     */
    data: NotificationLogCreateManyInput | NotificationLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NotificationLog update
   */
  export type NotificationLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * The data needed to update a NotificationLog.
     */
    data: XOR<NotificationLogUpdateInput, NotificationLogUncheckedUpdateInput>
    /**
     * Choose, which NotificationLog to update.
     */
    where: NotificationLogWhereUniqueInput
  }

  /**
   * NotificationLog updateMany
   */
  export type NotificationLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NotificationLogs.
     */
    data: XOR<NotificationLogUpdateManyMutationInput, NotificationLogUncheckedUpdateManyInput>
    /**
     * Filter which NotificationLogs to update
     */
    where?: NotificationLogWhereInput
    /**
     * Limit how many NotificationLogs to update.
     */
    limit?: number
  }

  /**
   * NotificationLog updateManyAndReturn
   */
  export type NotificationLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * The data used to update NotificationLogs.
     */
    data: XOR<NotificationLogUpdateManyMutationInput, NotificationLogUncheckedUpdateManyInput>
    /**
     * Filter which NotificationLogs to update
     */
    where?: NotificationLogWhereInput
    /**
     * Limit how many NotificationLogs to update.
     */
    limit?: number
  }

  /**
   * NotificationLog upsert
   */
  export type NotificationLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * The filter to search for the NotificationLog to update in case it exists.
     */
    where: NotificationLogWhereUniqueInput
    /**
     * In case the NotificationLog found by the `where` argument doesn't exist, create a new NotificationLog with this data.
     */
    create: XOR<NotificationLogCreateInput, NotificationLogUncheckedCreateInput>
    /**
     * In case the NotificationLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationLogUpdateInput, NotificationLogUncheckedUpdateInput>
  }

  /**
   * NotificationLog delete
   */
  export type NotificationLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * Filter which NotificationLog to delete.
     */
    where: NotificationLogWhereUniqueInput
  }

  /**
   * NotificationLog deleteMany
   */
  export type NotificationLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationLogs to delete
     */
    where?: NotificationLogWhereInput
    /**
     * Limit how many NotificationLogs to delete.
     */
    limit?: number
  }

  /**
   * NotificationLog without action
   */
  export type NotificationLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const RetentionPolicyScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    entityType: 'entityType',
    retentionDays: 'retentionDays',
    action: 'action',
    isActive: 'isActive'
  };

  export type RetentionPolicyScalarFieldEnum = (typeof RetentionPolicyScalarFieldEnum)[keyof typeof RetentionPolicyScalarFieldEnum]


  export const AlertScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    userId: 'userId',
    roleScope: 'roleScope',
    moduleCode: 'moduleCode',
    category: 'category',
    severity: 'severity',
    titleFa: 'titleFa',
    bodyFa: 'bodyFa',
    actionUrl: 'actionUrl',
    sourceEntityType: 'sourceEntityType',
    sourceEntityId: 'sourceEntityId',
    deduplicationKey: 'deduplicationKey',
    seenAt: 'seenAt',
    acknowledgedAt: 'acknowledgedAt',
    dismissedAt: 'dismissedAt',
    snoozedUntil: 'snoozedUntil',
    expiresAt: 'expiresAt',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type AlertScalarFieldEnum = (typeof AlertScalarFieldEnum)[keyof typeof AlertScalarFieldEnum]


  export const AlertRuleScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    moduleCode: 'moduleCode',
    eventType: 'eventType',
    condition: 'condition',
    severity: 'severity',
    templateKey: 'templateKey',
    recipients: 'recipients',
    deduplicationWindowSec: 'deduplicationWindowSec',
    channels: 'channels',
    isActive: 'isActive'
  };

  export type AlertRuleScalarFieldEnum = (typeof AlertRuleScalarFieldEnum)[keyof typeof AlertRuleScalarFieldEnum]


  export const UserNotificationPreferenceScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    tenantId: 'tenantId',
    channels: 'channels',
    categoryPrefs: 'categoryPrefs',
    quietHours: 'quietHours'
  };

  export type UserNotificationPreferenceScalarFieldEnum = (typeof UserNotificationPreferenceScalarFieldEnum)[keyof typeof UserNotificationPreferenceScalarFieldEnum]


  export const NotificationTemplateScalarFieldEnum: {
    id: 'id',
    key: 'key',
    locale: 'locale',
    channel: 'channel',
    subject: 'subject',
    bodyHtml: 'bodyHtml',
    bodyText: 'bodyText',
    variables: 'variables',
    version: 'version',
    isActive: 'isActive'
  };

  export type NotificationTemplateScalarFieldEnum = (typeof NotificationTemplateScalarFieldEnum)[keyof typeof NotificationTemplateScalarFieldEnum]


  export const NotificationLogScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    userId: 'userId',
    role: 'role',
    templateKey: 'templateKey',
    channel: 'channel',
    recipient: 'recipient',
    status: 'status',
    providerMessageId: 'providerMessageId',
    errorMessage: 'errorMessage',
    idempotencyKey: 'idempotencyKey',
    correlationId: 'correlationId',
    sentAt: 'sentAt',
    deliveredAt: 'deliveredAt',
    createdAt: 'createdAt'
  };

  export type NotificationLogScalarFieldEnum = (typeof NotificationLogScalarFieldEnum)[keyof typeof NotificationLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'RetentionAction'
   */
  export type EnumRetentionActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RetentionAction'>
    


  /**
   * Reference to a field of type 'RetentionAction[]'
   */
  export type ListEnumRetentionActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RetentionAction[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'AlertSeverity'
   */
  export type EnumAlertSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AlertSeverity'>
    


  /**
   * Reference to a field of type 'AlertSeverity[]'
   */
  export type ListEnumAlertSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AlertSeverity[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'NotificationChannel'
   */
  export type EnumNotificationChannelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationChannel'>
    


  /**
   * Reference to a field of type 'NotificationChannel[]'
   */
  export type ListEnumNotificationChannelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationChannel[]'>
    


  /**
   * Reference to a field of type 'NotificationStatus'
   */
  export type EnumNotificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationStatus'>
    


  /**
   * Reference to a field of type 'NotificationStatus[]'
   */
  export type ListEnumNotificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type RetentionPolicyWhereInput = {
    AND?: RetentionPolicyWhereInput | RetentionPolicyWhereInput[]
    OR?: RetentionPolicyWhereInput[]
    NOT?: RetentionPolicyWhereInput | RetentionPolicyWhereInput[]
    id?: StringFilter<"RetentionPolicy"> | string
    tenantId?: StringFilter<"RetentionPolicy"> | string
    entityType?: StringFilter<"RetentionPolicy"> | string
    retentionDays?: IntFilter<"RetentionPolicy"> | number
    action?: EnumRetentionActionFilter<"RetentionPolicy"> | $Enums.RetentionAction
    isActive?: BoolFilter<"RetentionPolicy"> | boolean
  }

  export type RetentionPolicyOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    entityType?: SortOrder
    retentionDays?: SortOrder
    action?: SortOrder
    isActive?: SortOrder
  }

  export type RetentionPolicyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_entityType?: RetentionPolicyTenantIdEntityTypeCompoundUniqueInput
    AND?: RetentionPolicyWhereInput | RetentionPolicyWhereInput[]
    OR?: RetentionPolicyWhereInput[]
    NOT?: RetentionPolicyWhereInput | RetentionPolicyWhereInput[]
    tenantId?: StringFilter<"RetentionPolicy"> | string
    entityType?: StringFilter<"RetentionPolicy"> | string
    retentionDays?: IntFilter<"RetentionPolicy"> | number
    action?: EnumRetentionActionFilter<"RetentionPolicy"> | $Enums.RetentionAction
    isActive?: BoolFilter<"RetentionPolicy"> | boolean
  }, "id" | "tenantId_entityType">

  export type RetentionPolicyOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    entityType?: SortOrder
    retentionDays?: SortOrder
    action?: SortOrder
    isActive?: SortOrder
    _count?: RetentionPolicyCountOrderByAggregateInput
    _avg?: RetentionPolicyAvgOrderByAggregateInput
    _max?: RetentionPolicyMaxOrderByAggregateInput
    _min?: RetentionPolicyMinOrderByAggregateInput
    _sum?: RetentionPolicySumOrderByAggregateInput
  }

  export type RetentionPolicyScalarWhereWithAggregatesInput = {
    AND?: RetentionPolicyScalarWhereWithAggregatesInput | RetentionPolicyScalarWhereWithAggregatesInput[]
    OR?: RetentionPolicyScalarWhereWithAggregatesInput[]
    NOT?: RetentionPolicyScalarWhereWithAggregatesInput | RetentionPolicyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RetentionPolicy"> | string
    tenantId?: StringWithAggregatesFilter<"RetentionPolicy"> | string
    entityType?: StringWithAggregatesFilter<"RetentionPolicy"> | string
    retentionDays?: IntWithAggregatesFilter<"RetentionPolicy"> | number
    action?: EnumRetentionActionWithAggregatesFilter<"RetentionPolicy"> | $Enums.RetentionAction
    isActive?: BoolWithAggregatesFilter<"RetentionPolicy"> | boolean
  }

  export type AlertWhereInput = {
    AND?: AlertWhereInput | AlertWhereInput[]
    OR?: AlertWhereInput[]
    NOT?: AlertWhereInput | AlertWhereInput[]
    id?: StringFilter<"Alert"> | string
    tenantId?: StringFilter<"Alert"> | string
    userId?: StringNullableFilter<"Alert"> | string | null
    roleScope?: StringNullableFilter<"Alert"> | string | null
    moduleCode?: StringFilter<"Alert"> | string
    category?: StringFilter<"Alert"> | string
    severity?: EnumAlertSeverityFilter<"Alert"> | $Enums.AlertSeverity
    titleFa?: StringFilter<"Alert"> | string
    bodyFa?: StringFilter<"Alert"> | string
    actionUrl?: StringNullableFilter<"Alert"> | string | null
    sourceEntityType?: StringNullableFilter<"Alert"> | string | null
    sourceEntityId?: StringNullableFilter<"Alert"> | string | null
    deduplicationKey?: StringFilter<"Alert"> | string
    seenAt?: DateTimeNullableFilter<"Alert"> | Date | string | null
    acknowledgedAt?: DateTimeNullableFilter<"Alert"> | Date | string | null
    dismissedAt?: DateTimeNullableFilter<"Alert"> | Date | string | null
    snoozedUntil?: DateTimeNullableFilter<"Alert"> | Date | string | null
    expiresAt?: DateTimeNullableFilter<"Alert"> | Date | string | null
    metadata?: JsonFilter<"Alert">
    createdAt?: DateTimeFilter<"Alert"> | Date | string
  }

  export type AlertOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrderInput | SortOrder
    roleScope?: SortOrderInput | SortOrder
    moduleCode?: SortOrder
    category?: SortOrder
    severity?: SortOrder
    titleFa?: SortOrder
    bodyFa?: SortOrder
    actionUrl?: SortOrderInput | SortOrder
    sourceEntityType?: SortOrderInput | SortOrder
    sourceEntityId?: SortOrderInput | SortOrder
    deduplicationKey?: SortOrder
    seenAt?: SortOrderInput | SortOrder
    acknowledgedAt?: SortOrderInput | SortOrder
    dismissedAt?: SortOrderInput | SortOrder
    snoozedUntil?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type AlertWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AlertWhereInput | AlertWhereInput[]
    OR?: AlertWhereInput[]
    NOT?: AlertWhereInput | AlertWhereInput[]
    tenantId?: StringFilter<"Alert"> | string
    userId?: StringNullableFilter<"Alert"> | string | null
    roleScope?: StringNullableFilter<"Alert"> | string | null
    moduleCode?: StringFilter<"Alert"> | string
    category?: StringFilter<"Alert"> | string
    severity?: EnumAlertSeverityFilter<"Alert"> | $Enums.AlertSeverity
    titleFa?: StringFilter<"Alert"> | string
    bodyFa?: StringFilter<"Alert"> | string
    actionUrl?: StringNullableFilter<"Alert"> | string | null
    sourceEntityType?: StringNullableFilter<"Alert"> | string | null
    sourceEntityId?: StringNullableFilter<"Alert"> | string | null
    deduplicationKey?: StringFilter<"Alert"> | string
    seenAt?: DateTimeNullableFilter<"Alert"> | Date | string | null
    acknowledgedAt?: DateTimeNullableFilter<"Alert"> | Date | string | null
    dismissedAt?: DateTimeNullableFilter<"Alert"> | Date | string | null
    snoozedUntil?: DateTimeNullableFilter<"Alert"> | Date | string | null
    expiresAt?: DateTimeNullableFilter<"Alert"> | Date | string | null
    metadata?: JsonFilter<"Alert">
    createdAt?: DateTimeFilter<"Alert"> | Date | string
  }, "id">

  export type AlertOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrderInput | SortOrder
    roleScope?: SortOrderInput | SortOrder
    moduleCode?: SortOrder
    category?: SortOrder
    severity?: SortOrder
    titleFa?: SortOrder
    bodyFa?: SortOrder
    actionUrl?: SortOrderInput | SortOrder
    sourceEntityType?: SortOrderInput | SortOrder
    sourceEntityId?: SortOrderInput | SortOrder
    deduplicationKey?: SortOrder
    seenAt?: SortOrderInput | SortOrder
    acknowledgedAt?: SortOrderInput | SortOrder
    dismissedAt?: SortOrderInput | SortOrder
    snoozedUntil?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    _count?: AlertCountOrderByAggregateInput
    _max?: AlertMaxOrderByAggregateInput
    _min?: AlertMinOrderByAggregateInput
  }

  export type AlertScalarWhereWithAggregatesInput = {
    AND?: AlertScalarWhereWithAggregatesInput | AlertScalarWhereWithAggregatesInput[]
    OR?: AlertScalarWhereWithAggregatesInput[]
    NOT?: AlertScalarWhereWithAggregatesInput | AlertScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Alert"> | string
    tenantId?: StringWithAggregatesFilter<"Alert"> | string
    userId?: StringNullableWithAggregatesFilter<"Alert"> | string | null
    roleScope?: StringNullableWithAggregatesFilter<"Alert"> | string | null
    moduleCode?: StringWithAggregatesFilter<"Alert"> | string
    category?: StringWithAggregatesFilter<"Alert"> | string
    severity?: EnumAlertSeverityWithAggregatesFilter<"Alert"> | $Enums.AlertSeverity
    titleFa?: StringWithAggregatesFilter<"Alert"> | string
    bodyFa?: StringWithAggregatesFilter<"Alert"> | string
    actionUrl?: StringNullableWithAggregatesFilter<"Alert"> | string | null
    sourceEntityType?: StringNullableWithAggregatesFilter<"Alert"> | string | null
    sourceEntityId?: StringNullableWithAggregatesFilter<"Alert"> | string | null
    deduplicationKey?: StringWithAggregatesFilter<"Alert"> | string
    seenAt?: DateTimeNullableWithAggregatesFilter<"Alert"> | Date | string | null
    acknowledgedAt?: DateTimeNullableWithAggregatesFilter<"Alert"> | Date | string | null
    dismissedAt?: DateTimeNullableWithAggregatesFilter<"Alert"> | Date | string | null
    snoozedUntil?: DateTimeNullableWithAggregatesFilter<"Alert"> | Date | string | null
    expiresAt?: DateTimeNullableWithAggregatesFilter<"Alert"> | Date | string | null
    metadata?: JsonWithAggregatesFilter<"Alert">
    createdAt?: DateTimeWithAggregatesFilter<"Alert"> | Date | string
  }

  export type AlertRuleWhereInput = {
    AND?: AlertRuleWhereInput | AlertRuleWhereInput[]
    OR?: AlertRuleWhereInput[]
    NOT?: AlertRuleWhereInput | AlertRuleWhereInput[]
    id?: StringFilter<"AlertRule"> | string
    tenantId?: StringFilter<"AlertRule"> | string
    moduleCode?: StringFilter<"AlertRule"> | string
    eventType?: StringFilter<"AlertRule"> | string
    condition?: JsonFilter<"AlertRule">
    severity?: EnumAlertSeverityFilter<"AlertRule"> | $Enums.AlertSeverity
    templateKey?: StringFilter<"AlertRule"> | string
    recipients?: JsonFilter<"AlertRule">
    deduplicationWindowSec?: IntFilter<"AlertRule"> | number
    channels?: JsonFilter<"AlertRule">
    isActive?: BoolFilter<"AlertRule"> | boolean
  }

  export type AlertRuleOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    moduleCode?: SortOrder
    eventType?: SortOrder
    condition?: SortOrder
    severity?: SortOrder
    templateKey?: SortOrder
    recipients?: SortOrder
    deduplicationWindowSec?: SortOrder
    channels?: SortOrder
    isActive?: SortOrder
  }

  export type AlertRuleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AlertRuleWhereInput | AlertRuleWhereInput[]
    OR?: AlertRuleWhereInput[]
    NOT?: AlertRuleWhereInput | AlertRuleWhereInput[]
    tenantId?: StringFilter<"AlertRule"> | string
    moduleCode?: StringFilter<"AlertRule"> | string
    eventType?: StringFilter<"AlertRule"> | string
    condition?: JsonFilter<"AlertRule">
    severity?: EnumAlertSeverityFilter<"AlertRule"> | $Enums.AlertSeverity
    templateKey?: StringFilter<"AlertRule"> | string
    recipients?: JsonFilter<"AlertRule">
    deduplicationWindowSec?: IntFilter<"AlertRule"> | number
    channels?: JsonFilter<"AlertRule">
    isActive?: BoolFilter<"AlertRule"> | boolean
  }, "id">

  export type AlertRuleOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    moduleCode?: SortOrder
    eventType?: SortOrder
    condition?: SortOrder
    severity?: SortOrder
    templateKey?: SortOrder
    recipients?: SortOrder
    deduplicationWindowSec?: SortOrder
    channels?: SortOrder
    isActive?: SortOrder
    _count?: AlertRuleCountOrderByAggregateInput
    _avg?: AlertRuleAvgOrderByAggregateInput
    _max?: AlertRuleMaxOrderByAggregateInput
    _min?: AlertRuleMinOrderByAggregateInput
    _sum?: AlertRuleSumOrderByAggregateInput
  }

  export type AlertRuleScalarWhereWithAggregatesInput = {
    AND?: AlertRuleScalarWhereWithAggregatesInput | AlertRuleScalarWhereWithAggregatesInput[]
    OR?: AlertRuleScalarWhereWithAggregatesInput[]
    NOT?: AlertRuleScalarWhereWithAggregatesInput | AlertRuleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AlertRule"> | string
    tenantId?: StringWithAggregatesFilter<"AlertRule"> | string
    moduleCode?: StringWithAggregatesFilter<"AlertRule"> | string
    eventType?: StringWithAggregatesFilter<"AlertRule"> | string
    condition?: JsonWithAggregatesFilter<"AlertRule">
    severity?: EnumAlertSeverityWithAggregatesFilter<"AlertRule"> | $Enums.AlertSeverity
    templateKey?: StringWithAggregatesFilter<"AlertRule"> | string
    recipients?: JsonWithAggregatesFilter<"AlertRule">
    deduplicationWindowSec?: IntWithAggregatesFilter<"AlertRule"> | number
    channels?: JsonWithAggregatesFilter<"AlertRule">
    isActive?: BoolWithAggregatesFilter<"AlertRule"> | boolean
  }

  export type UserNotificationPreferenceWhereInput = {
    AND?: UserNotificationPreferenceWhereInput | UserNotificationPreferenceWhereInput[]
    OR?: UserNotificationPreferenceWhereInput[]
    NOT?: UserNotificationPreferenceWhereInput | UserNotificationPreferenceWhereInput[]
    id?: StringFilter<"UserNotificationPreference"> | string
    userId?: StringFilter<"UserNotificationPreference"> | string
    tenantId?: StringFilter<"UserNotificationPreference"> | string
    channels?: JsonFilter<"UserNotificationPreference">
    categoryPrefs?: JsonFilter<"UserNotificationPreference">
    quietHours?: JsonNullableFilter<"UserNotificationPreference">
  }

  export type UserNotificationPreferenceOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    tenantId?: SortOrder
    channels?: SortOrder
    categoryPrefs?: SortOrder
    quietHours?: SortOrderInput | SortOrder
  }

  export type UserNotificationPreferenceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_userId?: UserNotificationPreferenceTenantIdUserIdCompoundUniqueInput
    AND?: UserNotificationPreferenceWhereInput | UserNotificationPreferenceWhereInput[]
    OR?: UserNotificationPreferenceWhereInput[]
    NOT?: UserNotificationPreferenceWhereInput | UserNotificationPreferenceWhereInput[]
    userId?: StringFilter<"UserNotificationPreference"> | string
    tenantId?: StringFilter<"UserNotificationPreference"> | string
    channels?: JsonFilter<"UserNotificationPreference">
    categoryPrefs?: JsonFilter<"UserNotificationPreference">
    quietHours?: JsonNullableFilter<"UserNotificationPreference">
  }, "id" | "tenantId_userId">

  export type UserNotificationPreferenceOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    tenantId?: SortOrder
    channels?: SortOrder
    categoryPrefs?: SortOrder
    quietHours?: SortOrderInput | SortOrder
    _count?: UserNotificationPreferenceCountOrderByAggregateInput
    _max?: UserNotificationPreferenceMaxOrderByAggregateInput
    _min?: UserNotificationPreferenceMinOrderByAggregateInput
  }

  export type UserNotificationPreferenceScalarWhereWithAggregatesInput = {
    AND?: UserNotificationPreferenceScalarWhereWithAggregatesInput | UserNotificationPreferenceScalarWhereWithAggregatesInput[]
    OR?: UserNotificationPreferenceScalarWhereWithAggregatesInput[]
    NOT?: UserNotificationPreferenceScalarWhereWithAggregatesInput | UserNotificationPreferenceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserNotificationPreference"> | string
    userId?: StringWithAggregatesFilter<"UserNotificationPreference"> | string
    tenantId?: StringWithAggregatesFilter<"UserNotificationPreference"> | string
    channels?: JsonWithAggregatesFilter<"UserNotificationPreference">
    categoryPrefs?: JsonWithAggregatesFilter<"UserNotificationPreference">
    quietHours?: JsonNullableWithAggregatesFilter<"UserNotificationPreference">
  }

  export type NotificationTemplateWhereInput = {
    AND?: NotificationTemplateWhereInput | NotificationTemplateWhereInput[]
    OR?: NotificationTemplateWhereInput[]
    NOT?: NotificationTemplateWhereInput | NotificationTemplateWhereInput[]
    id?: StringFilter<"NotificationTemplate"> | string
    key?: StringFilter<"NotificationTemplate"> | string
    locale?: StringFilter<"NotificationTemplate"> | string
    channel?: EnumNotificationChannelFilter<"NotificationTemplate"> | $Enums.NotificationChannel
    subject?: StringNullableFilter<"NotificationTemplate"> | string | null
    bodyHtml?: StringFilter<"NotificationTemplate"> | string
    bodyText?: StringFilter<"NotificationTemplate"> | string
    variables?: JsonFilter<"NotificationTemplate">
    version?: IntFilter<"NotificationTemplate"> | number
    isActive?: BoolFilter<"NotificationTemplate"> | boolean
  }

  export type NotificationTemplateOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    locale?: SortOrder
    channel?: SortOrder
    subject?: SortOrderInput | SortOrder
    bodyHtml?: SortOrder
    bodyText?: SortOrder
    variables?: SortOrder
    version?: SortOrder
    isActive?: SortOrder
  }

  export type NotificationTemplateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key_locale_channel_version?: NotificationTemplateKeyLocaleChannelVersionCompoundUniqueInput
    AND?: NotificationTemplateWhereInput | NotificationTemplateWhereInput[]
    OR?: NotificationTemplateWhereInput[]
    NOT?: NotificationTemplateWhereInput | NotificationTemplateWhereInput[]
    key?: StringFilter<"NotificationTemplate"> | string
    locale?: StringFilter<"NotificationTemplate"> | string
    channel?: EnumNotificationChannelFilter<"NotificationTemplate"> | $Enums.NotificationChannel
    subject?: StringNullableFilter<"NotificationTemplate"> | string | null
    bodyHtml?: StringFilter<"NotificationTemplate"> | string
    bodyText?: StringFilter<"NotificationTemplate"> | string
    variables?: JsonFilter<"NotificationTemplate">
    version?: IntFilter<"NotificationTemplate"> | number
    isActive?: BoolFilter<"NotificationTemplate"> | boolean
  }, "id" | "key_locale_channel_version">

  export type NotificationTemplateOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    locale?: SortOrder
    channel?: SortOrder
    subject?: SortOrderInput | SortOrder
    bodyHtml?: SortOrder
    bodyText?: SortOrder
    variables?: SortOrder
    version?: SortOrder
    isActive?: SortOrder
    _count?: NotificationTemplateCountOrderByAggregateInput
    _avg?: NotificationTemplateAvgOrderByAggregateInput
    _max?: NotificationTemplateMaxOrderByAggregateInput
    _min?: NotificationTemplateMinOrderByAggregateInput
    _sum?: NotificationTemplateSumOrderByAggregateInput
  }

  export type NotificationTemplateScalarWhereWithAggregatesInput = {
    AND?: NotificationTemplateScalarWhereWithAggregatesInput | NotificationTemplateScalarWhereWithAggregatesInput[]
    OR?: NotificationTemplateScalarWhereWithAggregatesInput[]
    NOT?: NotificationTemplateScalarWhereWithAggregatesInput | NotificationTemplateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NotificationTemplate"> | string
    key?: StringWithAggregatesFilter<"NotificationTemplate"> | string
    locale?: StringWithAggregatesFilter<"NotificationTemplate"> | string
    channel?: EnumNotificationChannelWithAggregatesFilter<"NotificationTemplate"> | $Enums.NotificationChannel
    subject?: StringNullableWithAggregatesFilter<"NotificationTemplate"> | string | null
    bodyHtml?: StringWithAggregatesFilter<"NotificationTemplate"> | string
    bodyText?: StringWithAggregatesFilter<"NotificationTemplate"> | string
    variables?: JsonWithAggregatesFilter<"NotificationTemplate">
    version?: IntWithAggregatesFilter<"NotificationTemplate"> | number
    isActive?: BoolWithAggregatesFilter<"NotificationTemplate"> | boolean
  }

  export type NotificationLogWhereInput = {
    AND?: NotificationLogWhereInput | NotificationLogWhereInput[]
    OR?: NotificationLogWhereInput[]
    NOT?: NotificationLogWhereInput | NotificationLogWhereInput[]
    id?: StringFilter<"NotificationLog"> | string
    tenantId?: StringFilter<"NotificationLog"> | string
    userId?: StringNullableFilter<"NotificationLog"> | string | null
    role?: StringNullableFilter<"NotificationLog"> | string | null
    templateKey?: StringFilter<"NotificationLog"> | string
    channel?: EnumNotificationChannelFilter<"NotificationLog"> | $Enums.NotificationChannel
    recipient?: StringFilter<"NotificationLog"> | string
    status?: EnumNotificationStatusFilter<"NotificationLog"> | $Enums.NotificationStatus
    providerMessageId?: StringNullableFilter<"NotificationLog"> | string | null
    errorMessage?: StringNullableFilter<"NotificationLog"> | string | null
    idempotencyKey?: StringFilter<"NotificationLog"> | string
    correlationId?: StringFilter<"NotificationLog"> | string
    sentAt?: DateTimeNullableFilter<"NotificationLog"> | Date | string | null
    deliveredAt?: DateTimeNullableFilter<"NotificationLog"> | Date | string | null
    createdAt?: DateTimeFilter<"NotificationLog"> | Date | string
  }

  export type NotificationLogOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrderInput | SortOrder
    role?: SortOrderInput | SortOrder
    templateKey?: SortOrder
    channel?: SortOrder
    recipient?: SortOrder
    status?: SortOrder
    providerMessageId?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    idempotencyKey?: SortOrder
    correlationId?: SortOrder
    sentAt?: SortOrderInput | SortOrder
    deliveredAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type NotificationLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationLogWhereInput | NotificationLogWhereInput[]
    OR?: NotificationLogWhereInput[]
    NOT?: NotificationLogWhereInput | NotificationLogWhereInput[]
    tenantId?: StringFilter<"NotificationLog"> | string
    userId?: StringNullableFilter<"NotificationLog"> | string | null
    role?: StringNullableFilter<"NotificationLog"> | string | null
    templateKey?: StringFilter<"NotificationLog"> | string
    channel?: EnumNotificationChannelFilter<"NotificationLog"> | $Enums.NotificationChannel
    recipient?: StringFilter<"NotificationLog"> | string
    status?: EnumNotificationStatusFilter<"NotificationLog"> | $Enums.NotificationStatus
    providerMessageId?: StringNullableFilter<"NotificationLog"> | string | null
    errorMessage?: StringNullableFilter<"NotificationLog"> | string | null
    idempotencyKey?: StringFilter<"NotificationLog"> | string
    correlationId?: StringFilter<"NotificationLog"> | string
    sentAt?: DateTimeNullableFilter<"NotificationLog"> | Date | string | null
    deliveredAt?: DateTimeNullableFilter<"NotificationLog"> | Date | string | null
    createdAt?: DateTimeFilter<"NotificationLog"> | Date | string
  }, "id">

  export type NotificationLogOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrderInput | SortOrder
    role?: SortOrderInput | SortOrder
    templateKey?: SortOrder
    channel?: SortOrder
    recipient?: SortOrder
    status?: SortOrder
    providerMessageId?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    idempotencyKey?: SortOrder
    correlationId?: SortOrder
    sentAt?: SortOrderInput | SortOrder
    deliveredAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: NotificationLogCountOrderByAggregateInput
    _max?: NotificationLogMaxOrderByAggregateInput
    _min?: NotificationLogMinOrderByAggregateInput
  }

  export type NotificationLogScalarWhereWithAggregatesInput = {
    AND?: NotificationLogScalarWhereWithAggregatesInput | NotificationLogScalarWhereWithAggregatesInput[]
    OR?: NotificationLogScalarWhereWithAggregatesInput[]
    NOT?: NotificationLogScalarWhereWithAggregatesInput | NotificationLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NotificationLog"> | string
    tenantId?: StringWithAggregatesFilter<"NotificationLog"> | string
    userId?: StringNullableWithAggregatesFilter<"NotificationLog"> | string | null
    role?: StringNullableWithAggregatesFilter<"NotificationLog"> | string | null
    templateKey?: StringWithAggregatesFilter<"NotificationLog"> | string
    channel?: EnumNotificationChannelWithAggregatesFilter<"NotificationLog"> | $Enums.NotificationChannel
    recipient?: StringWithAggregatesFilter<"NotificationLog"> | string
    status?: EnumNotificationStatusWithAggregatesFilter<"NotificationLog"> | $Enums.NotificationStatus
    providerMessageId?: StringNullableWithAggregatesFilter<"NotificationLog"> | string | null
    errorMessage?: StringNullableWithAggregatesFilter<"NotificationLog"> | string | null
    idempotencyKey?: StringWithAggregatesFilter<"NotificationLog"> | string
    correlationId?: StringWithAggregatesFilter<"NotificationLog"> | string
    sentAt?: DateTimeNullableWithAggregatesFilter<"NotificationLog"> | Date | string | null
    deliveredAt?: DateTimeNullableWithAggregatesFilter<"NotificationLog"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"NotificationLog"> | Date | string
  }

  export type RetentionPolicyCreateInput = {
    id?: string
    tenantId: string
    entityType: string
    retentionDays: number
    action: $Enums.RetentionAction
    isActive?: boolean
  }

  export type RetentionPolicyUncheckedCreateInput = {
    id?: string
    tenantId: string
    entityType: string
    retentionDays: number
    action: $Enums.RetentionAction
    isActive?: boolean
  }

  export type RetentionPolicyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    retentionDays?: IntFieldUpdateOperationsInput | number
    action?: EnumRetentionActionFieldUpdateOperationsInput | $Enums.RetentionAction
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RetentionPolicyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    retentionDays?: IntFieldUpdateOperationsInput | number
    action?: EnumRetentionActionFieldUpdateOperationsInput | $Enums.RetentionAction
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RetentionPolicyCreateManyInput = {
    id?: string
    tenantId: string
    entityType: string
    retentionDays: number
    action: $Enums.RetentionAction
    isActive?: boolean
  }

  export type RetentionPolicyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    retentionDays?: IntFieldUpdateOperationsInput | number
    action?: EnumRetentionActionFieldUpdateOperationsInput | $Enums.RetentionAction
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RetentionPolicyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    retentionDays?: IntFieldUpdateOperationsInput | number
    action?: EnumRetentionActionFieldUpdateOperationsInput | $Enums.RetentionAction
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AlertCreateInput = {
    id?: string
    tenantId: string
    userId?: string | null
    roleScope?: string | null
    moduleCode: string
    category: string
    severity: $Enums.AlertSeverity
    titleFa: string
    bodyFa: string
    actionUrl?: string | null
    sourceEntityType?: string | null
    sourceEntityId?: string | null
    deduplicationKey: string
    seenAt?: Date | string | null
    acknowledgedAt?: Date | string | null
    dismissedAt?: Date | string | null
    snoozedUntil?: Date | string | null
    expiresAt?: Date | string | null
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AlertUncheckedCreateInput = {
    id?: string
    tenantId: string
    userId?: string | null
    roleScope?: string | null
    moduleCode: string
    category: string
    severity: $Enums.AlertSeverity
    titleFa: string
    bodyFa: string
    actionUrl?: string | null
    sourceEntityType?: string | null
    sourceEntityId?: string | null
    deduplicationKey: string
    seenAt?: Date | string | null
    acknowledgedAt?: Date | string | null
    dismissedAt?: Date | string | null
    snoozedUntil?: Date | string | null
    expiresAt?: Date | string | null
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AlertUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    roleScope?: NullableStringFieldUpdateOperationsInput | string | null
    moduleCode?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    severity?: EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity
    titleFa?: StringFieldUpdateOperationsInput | string
    bodyFa?: StringFieldUpdateOperationsInput | string
    actionUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sourceEntityType?: NullableStringFieldUpdateOperationsInput | string | null
    sourceEntityId?: NullableStringFieldUpdateOperationsInput | string | null
    deduplicationKey?: StringFieldUpdateOperationsInput | string
    seenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acknowledgedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dismissedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    snoozedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    roleScope?: NullableStringFieldUpdateOperationsInput | string | null
    moduleCode?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    severity?: EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity
    titleFa?: StringFieldUpdateOperationsInput | string
    bodyFa?: StringFieldUpdateOperationsInput | string
    actionUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sourceEntityType?: NullableStringFieldUpdateOperationsInput | string | null
    sourceEntityId?: NullableStringFieldUpdateOperationsInput | string | null
    deduplicationKey?: StringFieldUpdateOperationsInput | string
    seenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acknowledgedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dismissedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    snoozedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertCreateManyInput = {
    id?: string
    tenantId: string
    userId?: string | null
    roleScope?: string | null
    moduleCode: string
    category: string
    severity: $Enums.AlertSeverity
    titleFa: string
    bodyFa: string
    actionUrl?: string | null
    sourceEntityType?: string | null
    sourceEntityId?: string | null
    deduplicationKey: string
    seenAt?: Date | string | null
    acknowledgedAt?: Date | string | null
    dismissedAt?: Date | string | null
    snoozedUntil?: Date | string | null
    expiresAt?: Date | string | null
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AlertUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    roleScope?: NullableStringFieldUpdateOperationsInput | string | null
    moduleCode?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    severity?: EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity
    titleFa?: StringFieldUpdateOperationsInput | string
    bodyFa?: StringFieldUpdateOperationsInput | string
    actionUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sourceEntityType?: NullableStringFieldUpdateOperationsInput | string | null
    sourceEntityId?: NullableStringFieldUpdateOperationsInput | string | null
    deduplicationKey?: StringFieldUpdateOperationsInput | string
    seenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acknowledgedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dismissedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    snoozedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    roleScope?: NullableStringFieldUpdateOperationsInput | string | null
    moduleCode?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    severity?: EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity
    titleFa?: StringFieldUpdateOperationsInput | string
    bodyFa?: StringFieldUpdateOperationsInput | string
    actionUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sourceEntityType?: NullableStringFieldUpdateOperationsInput | string | null
    sourceEntityId?: NullableStringFieldUpdateOperationsInput | string | null
    deduplicationKey?: StringFieldUpdateOperationsInput | string
    seenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acknowledgedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dismissedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    snoozedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertRuleCreateInput = {
    id?: string
    tenantId: string
    moduleCode: string
    eventType: string
    condition: JsonNullValueInput | InputJsonValue
    severity: $Enums.AlertSeverity
    templateKey: string
    recipients: JsonNullValueInput | InputJsonValue
    deduplicationWindowSec: number
    channels: JsonNullValueInput | InputJsonValue
    isActive?: boolean
  }

  export type AlertRuleUncheckedCreateInput = {
    id?: string
    tenantId: string
    moduleCode: string
    eventType: string
    condition: JsonNullValueInput | InputJsonValue
    severity: $Enums.AlertSeverity
    templateKey: string
    recipients: JsonNullValueInput | InputJsonValue
    deduplicationWindowSec: number
    channels: JsonNullValueInput | InputJsonValue
    isActive?: boolean
  }

  export type AlertRuleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    moduleCode?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    condition?: JsonNullValueInput | InputJsonValue
    severity?: EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity
    templateKey?: StringFieldUpdateOperationsInput | string
    recipients?: JsonNullValueInput | InputJsonValue
    deduplicationWindowSec?: IntFieldUpdateOperationsInput | number
    channels?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AlertRuleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    moduleCode?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    condition?: JsonNullValueInput | InputJsonValue
    severity?: EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity
    templateKey?: StringFieldUpdateOperationsInput | string
    recipients?: JsonNullValueInput | InputJsonValue
    deduplicationWindowSec?: IntFieldUpdateOperationsInput | number
    channels?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AlertRuleCreateManyInput = {
    id?: string
    tenantId: string
    moduleCode: string
    eventType: string
    condition: JsonNullValueInput | InputJsonValue
    severity: $Enums.AlertSeverity
    templateKey: string
    recipients: JsonNullValueInput | InputJsonValue
    deduplicationWindowSec: number
    channels: JsonNullValueInput | InputJsonValue
    isActive?: boolean
  }

  export type AlertRuleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    moduleCode?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    condition?: JsonNullValueInput | InputJsonValue
    severity?: EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity
    templateKey?: StringFieldUpdateOperationsInput | string
    recipients?: JsonNullValueInput | InputJsonValue
    deduplicationWindowSec?: IntFieldUpdateOperationsInput | number
    channels?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AlertRuleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    moduleCode?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    condition?: JsonNullValueInput | InputJsonValue
    severity?: EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity
    templateKey?: StringFieldUpdateOperationsInput | string
    recipients?: JsonNullValueInput | InputJsonValue
    deduplicationWindowSec?: IntFieldUpdateOperationsInput | number
    channels?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserNotificationPreferenceCreateInput = {
    id?: string
    userId: string
    tenantId: string
    channels: JsonNullValueInput | InputJsonValue
    categoryPrefs: JsonNullValueInput | InputJsonValue
    quietHours?: NullableJsonNullValueInput | InputJsonValue
  }

  export type UserNotificationPreferenceUncheckedCreateInput = {
    id?: string
    userId: string
    tenantId: string
    channels: JsonNullValueInput | InputJsonValue
    categoryPrefs: JsonNullValueInput | InputJsonValue
    quietHours?: NullableJsonNullValueInput | InputJsonValue
  }

  export type UserNotificationPreferenceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    channels?: JsonNullValueInput | InputJsonValue
    categoryPrefs?: JsonNullValueInput | InputJsonValue
    quietHours?: NullableJsonNullValueInput | InputJsonValue
  }

  export type UserNotificationPreferenceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    channels?: JsonNullValueInput | InputJsonValue
    categoryPrefs?: JsonNullValueInput | InputJsonValue
    quietHours?: NullableJsonNullValueInput | InputJsonValue
  }

  export type UserNotificationPreferenceCreateManyInput = {
    id?: string
    userId: string
    tenantId: string
    channels: JsonNullValueInput | InputJsonValue
    categoryPrefs: JsonNullValueInput | InputJsonValue
    quietHours?: NullableJsonNullValueInput | InputJsonValue
  }

  export type UserNotificationPreferenceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    channels?: JsonNullValueInput | InputJsonValue
    categoryPrefs?: JsonNullValueInput | InputJsonValue
    quietHours?: NullableJsonNullValueInput | InputJsonValue
  }

  export type UserNotificationPreferenceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    channels?: JsonNullValueInput | InputJsonValue
    categoryPrefs?: JsonNullValueInput | InputJsonValue
    quietHours?: NullableJsonNullValueInput | InputJsonValue
  }

  export type NotificationTemplateCreateInput = {
    id?: string
    key: string
    locale?: string
    channel: $Enums.NotificationChannel
    subject?: string | null
    bodyHtml: string
    bodyText: string
    variables: JsonNullValueInput | InputJsonValue
    version?: number
    isActive?: boolean
  }

  export type NotificationTemplateUncheckedCreateInput = {
    id?: string
    key: string
    locale?: string
    channel: $Enums.NotificationChannel
    subject?: string | null
    bodyHtml: string
    bodyText: string
    variables: JsonNullValueInput | InputJsonValue
    version?: number
    isActive?: boolean
  }

  export type NotificationTemplateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    bodyHtml?: StringFieldUpdateOperationsInput | string
    bodyText?: StringFieldUpdateOperationsInput | string
    variables?: JsonNullValueInput | InputJsonValue
    version?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type NotificationTemplateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    bodyHtml?: StringFieldUpdateOperationsInput | string
    bodyText?: StringFieldUpdateOperationsInput | string
    variables?: JsonNullValueInput | InputJsonValue
    version?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type NotificationTemplateCreateManyInput = {
    id?: string
    key: string
    locale?: string
    channel: $Enums.NotificationChannel
    subject?: string | null
    bodyHtml: string
    bodyText: string
    variables: JsonNullValueInput | InputJsonValue
    version?: number
    isActive?: boolean
  }

  export type NotificationTemplateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    bodyHtml?: StringFieldUpdateOperationsInput | string
    bodyText?: StringFieldUpdateOperationsInput | string
    variables?: JsonNullValueInput | InputJsonValue
    version?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type NotificationTemplateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    bodyHtml?: StringFieldUpdateOperationsInput | string
    bodyText?: StringFieldUpdateOperationsInput | string
    variables?: JsonNullValueInput | InputJsonValue
    version?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type NotificationLogCreateInput = {
    id?: string
    tenantId: string
    userId?: string | null
    role?: string | null
    templateKey: string
    channel: $Enums.NotificationChannel
    recipient: string
    status: $Enums.NotificationStatus
    providerMessageId?: string | null
    errorMessage?: string | null
    idempotencyKey: string
    correlationId: string
    sentAt?: Date | string | null
    deliveredAt?: Date | string | null
    createdAt?: Date | string
  }

  export type NotificationLogUncheckedCreateInput = {
    id?: string
    tenantId: string
    userId?: string | null
    role?: string | null
    templateKey: string
    channel: $Enums.NotificationChannel
    recipient: string
    status: $Enums.NotificationStatus
    providerMessageId?: string | null
    errorMessage?: string | null
    idempotencyKey: string
    correlationId: string
    sentAt?: Date | string | null
    deliveredAt?: Date | string | null
    createdAt?: Date | string
  }

  export type NotificationLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    templateKey?: StringFieldUpdateOperationsInput | string
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    recipient?: StringFieldUpdateOperationsInput | string
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    providerMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    correlationId?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    templateKey?: StringFieldUpdateOperationsInput | string
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    recipient?: StringFieldUpdateOperationsInput | string
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    providerMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    correlationId?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationLogCreateManyInput = {
    id?: string
    tenantId: string
    userId?: string | null
    role?: string | null
    templateKey: string
    channel: $Enums.NotificationChannel
    recipient: string
    status: $Enums.NotificationStatus
    providerMessageId?: string | null
    errorMessage?: string | null
    idempotencyKey: string
    correlationId: string
    sentAt?: Date | string | null
    deliveredAt?: Date | string | null
    createdAt?: Date | string
  }

  export type NotificationLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    templateKey?: StringFieldUpdateOperationsInput | string
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    recipient?: StringFieldUpdateOperationsInput | string
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    providerMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    correlationId?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    templateKey?: StringFieldUpdateOperationsInput | string
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    recipient?: StringFieldUpdateOperationsInput | string
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    providerMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    correlationId?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumRetentionActionFilter<$PrismaModel = never> = {
    equals?: $Enums.RetentionAction | EnumRetentionActionFieldRefInput<$PrismaModel>
    in?: $Enums.RetentionAction[] | ListEnumRetentionActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.RetentionAction[] | ListEnumRetentionActionFieldRefInput<$PrismaModel>
    not?: NestedEnumRetentionActionFilter<$PrismaModel> | $Enums.RetentionAction
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type RetentionPolicyTenantIdEntityTypeCompoundUniqueInput = {
    tenantId: string
    entityType: string
  }

  export type RetentionPolicyCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    entityType?: SortOrder
    retentionDays?: SortOrder
    action?: SortOrder
    isActive?: SortOrder
  }

  export type RetentionPolicyAvgOrderByAggregateInput = {
    retentionDays?: SortOrder
  }

  export type RetentionPolicyMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    entityType?: SortOrder
    retentionDays?: SortOrder
    action?: SortOrder
    isActive?: SortOrder
  }

  export type RetentionPolicyMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    entityType?: SortOrder
    retentionDays?: SortOrder
    action?: SortOrder
    isActive?: SortOrder
  }

  export type RetentionPolicySumOrderByAggregateInput = {
    retentionDays?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumRetentionActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RetentionAction | EnumRetentionActionFieldRefInput<$PrismaModel>
    in?: $Enums.RetentionAction[] | ListEnumRetentionActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.RetentionAction[] | ListEnumRetentionActionFieldRefInput<$PrismaModel>
    not?: NestedEnumRetentionActionWithAggregatesFilter<$PrismaModel> | $Enums.RetentionAction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRetentionActionFilter<$PrismaModel>
    _max?: NestedEnumRetentionActionFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumAlertSeverityFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertSeverity | EnumAlertSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.AlertSeverity[] | ListEnumAlertSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.AlertSeverity[] | ListEnumAlertSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumAlertSeverityFilter<$PrismaModel> | $Enums.AlertSeverity
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AlertCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrder
    roleScope?: SortOrder
    moduleCode?: SortOrder
    category?: SortOrder
    severity?: SortOrder
    titleFa?: SortOrder
    bodyFa?: SortOrder
    actionUrl?: SortOrder
    sourceEntityType?: SortOrder
    sourceEntityId?: SortOrder
    deduplicationKey?: SortOrder
    seenAt?: SortOrder
    acknowledgedAt?: SortOrder
    dismissedAt?: SortOrder
    snoozedUntil?: SortOrder
    expiresAt?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type AlertMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrder
    roleScope?: SortOrder
    moduleCode?: SortOrder
    category?: SortOrder
    severity?: SortOrder
    titleFa?: SortOrder
    bodyFa?: SortOrder
    actionUrl?: SortOrder
    sourceEntityType?: SortOrder
    sourceEntityId?: SortOrder
    deduplicationKey?: SortOrder
    seenAt?: SortOrder
    acknowledgedAt?: SortOrder
    dismissedAt?: SortOrder
    snoozedUntil?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type AlertMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrder
    roleScope?: SortOrder
    moduleCode?: SortOrder
    category?: SortOrder
    severity?: SortOrder
    titleFa?: SortOrder
    bodyFa?: SortOrder
    actionUrl?: SortOrder
    sourceEntityType?: SortOrder
    sourceEntityId?: SortOrder
    deduplicationKey?: SortOrder
    seenAt?: SortOrder
    acknowledgedAt?: SortOrder
    dismissedAt?: SortOrder
    snoozedUntil?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumAlertSeverityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertSeverity | EnumAlertSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.AlertSeverity[] | ListEnumAlertSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.AlertSeverity[] | ListEnumAlertSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumAlertSeverityWithAggregatesFilter<$PrismaModel> | $Enums.AlertSeverity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAlertSeverityFilter<$PrismaModel>
    _max?: NestedEnumAlertSeverityFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type AlertRuleCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    moduleCode?: SortOrder
    eventType?: SortOrder
    condition?: SortOrder
    severity?: SortOrder
    templateKey?: SortOrder
    recipients?: SortOrder
    deduplicationWindowSec?: SortOrder
    channels?: SortOrder
    isActive?: SortOrder
  }

  export type AlertRuleAvgOrderByAggregateInput = {
    deduplicationWindowSec?: SortOrder
  }

  export type AlertRuleMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    moduleCode?: SortOrder
    eventType?: SortOrder
    severity?: SortOrder
    templateKey?: SortOrder
    deduplicationWindowSec?: SortOrder
    isActive?: SortOrder
  }

  export type AlertRuleMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    moduleCode?: SortOrder
    eventType?: SortOrder
    severity?: SortOrder
    templateKey?: SortOrder
    deduplicationWindowSec?: SortOrder
    isActive?: SortOrder
  }

  export type AlertRuleSumOrderByAggregateInput = {
    deduplicationWindowSec?: SortOrder
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserNotificationPreferenceTenantIdUserIdCompoundUniqueInput = {
    tenantId: string
    userId: string
  }

  export type UserNotificationPreferenceCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tenantId?: SortOrder
    channels?: SortOrder
    categoryPrefs?: SortOrder
    quietHours?: SortOrder
  }

  export type UserNotificationPreferenceMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tenantId?: SortOrder
  }

  export type UserNotificationPreferenceMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tenantId?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumNotificationChannelFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationChannel | EnumNotificationChannelFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationChannel[] | ListEnumNotificationChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationChannel[] | ListEnumNotificationChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationChannelFilter<$PrismaModel> | $Enums.NotificationChannel
  }

  export type NotificationTemplateKeyLocaleChannelVersionCompoundUniqueInput = {
    key: string
    locale: string
    channel: $Enums.NotificationChannel
    version: number
  }

  export type NotificationTemplateCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    locale?: SortOrder
    channel?: SortOrder
    subject?: SortOrder
    bodyHtml?: SortOrder
    bodyText?: SortOrder
    variables?: SortOrder
    version?: SortOrder
    isActive?: SortOrder
  }

  export type NotificationTemplateAvgOrderByAggregateInput = {
    version?: SortOrder
  }

  export type NotificationTemplateMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    locale?: SortOrder
    channel?: SortOrder
    subject?: SortOrder
    bodyHtml?: SortOrder
    bodyText?: SortOrder
    version?: SortOrder
    isActive?: SortOrder
  }

  export type NotificationTemplateMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    locale?: SortOrder
    channel?: SortOrder
    subject?: SortOrder
    bodyHtml?: SortOrder
    bodyText?: SortOrder
    version?: SortOrder
    isActive?: SortOrder
  }

  export type NotificationTemplateSumOrderByAggregateInput = {
    version?: SortOrder
  }

  export type EnumNotificationChannelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationChannel | EnumNotificationChannelFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationChannel[] | ListEnumNotificationChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationChannel[] | ListEnumNotificationChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationChannelWithAggregatesFilter<$PrismaModel> | $Enums.NotificationChannel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationChannelFilter<$PrismaModel>
    _max?: NestedEnumNotificationChannelFilter<$PrismaModel>
  }

  export type EnumNotificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationStatus | EnumNotificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationStatusFilter<$PrismaModel> | $Enums.NotificationStatus
  }

  export type NotificationLogCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    templateKey?: SortOrder
    channel?: SortOrder
    recipient?: SortOrder
    status?: SortOrder
    providerMessageId?: SortOrder
    errorMessage?: SortOrder
    idempotencyKey?: SortOrder
    correlationId?: SortOrder
    sentAt?: SortOrder
    deliveredAt?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationLogMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    templateKey?: SortOrder
    channel?: SortOrder
    recipient?: SortOrder
    status?: SortOrder
    providerMessageId?: SortOrder
    errorMessage?: SortOrder
    idempotencyKey?: SortOrder
    correlationId?: SortOrder
    sentAt?: SortOrder
    deliveredAt?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationLogMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    templateKey?: SortOrder
    channel?: SortOrder
    recipient?: SortOrder
    status?: SortOrder
    providerMessageId?: SortOrder
    errorMessage?: SortOrder
    idempotencyKey?: SortOrder
    correlationId?: SortOrder
    sentAt?: SortOrder
    deliveredAt?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumNotificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationStatus | EnumNotificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.NotificationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationStatusFilter<$PrismaModel>
    _max?: NestedEnumNotificationStatusFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumRetentionActionFieldUpdateOperationsInput = {
    set?: $Enums.RetentionAction
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumAlertSeverityFieldUpdateOperationsInput = {
    set?: $Enums.AlertSeverity
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EnumNotificationChannelFieldUpdateOperationsInput = {
    set?: $Enums.NotificationChannel
  }

  export type EnumNotificationStatusFieldUpdateOperationsInput = {
    set?: $Enums.NotificationStatus
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumRetentionActionFilter<$PrismaModel = never> = {
    equals?: $Enums.RetentionAction | EnumRetentionActionFieldRefInput<$PrismaModel>
    in?: $Enums.RetentionAction[] | ListEnumRetentionActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.RetentionAction[] | ListEnumRetentionActionFieldRefInput<$PrismaModel>
    not?: NestedEnumRetentionActionFilter<$PrismaModel> | $Enums.RetentionAction
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumRetentionActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RetentionAction | EnumRetentionActionFieldRefInput<$PrismaModel>
    in?: $Enums.RetentionAction[] | ListEnumRetentionActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.RetentionAction[] | ListEnumRetentionActionFieldRefInput<$PrismaModel>
    not?: NestedEnumRetentionActionWithAggregatesFilter<$PrismaModel> | $Enums.RetentionAction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRetentionActionFilter<$PrismaModel>
    _max?: NestedEnumRetentionActionFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumAlertSeverityFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertSeverity | EnumAlertSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.AlertSeverity[] | ListEnumAlertSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.AlertSeverity[] | ListEnumAlertSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumAlertSeverityFilter<$PrismaModel> | $Enums.AlertSeverity
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumAlertSeverityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertSeverity | EnumAlertSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.AlertSeverity[] | ListEnumAlertSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.AlertSeverity[] | ListEnumAlertSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumAlertSeverityWithAggregatesFilter<$PrismaModel> | $Enums.AlertSeverity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAlertSeverityFilter<$PrismaModel>
    _max?: NestedEnumAlertSeverityFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumNotificationChannelFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationChannel | EnumNotificationChannelFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationChannel[] | ListEnumNotificationChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationChannel[] | ListEnumNotificationChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationChannelFilter<$PrismaModel> | $Enums.NotificationChannel
  }

  export type NestedEnumNotificationChannelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationChannel | EnumNotificationChannelFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationChannel[] | ListEnumNotificationChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationChannel[] | ListEnumNotificationChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationChannelWithAggregatesFilter<$PrismaModel> | $Enums.NotificationChannel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationChannelFilter<$PrismaModel>
    _max?: NestedEnumNotificationChannelFilter<$PrismaModel>
  }

  export type NestedEnumNotificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationStatus | EnumNotificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationStatusFilter<$PrismaModel> | $Enums.NotificationStatus
  }

  export type NestedEnumNotificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationStatus | EnumNotificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.NotificationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationStatusFilter<$PrismaModel>
    _max?: NestedEnumNotificationStatusFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}