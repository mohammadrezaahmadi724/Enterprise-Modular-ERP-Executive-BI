
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
 * Model ProjectionFinancialSummary
 * 
 */
export type ProjectionFinancialSummary = $Result.DefaultSelection<Prisma.$ProjectionFinancialSummaryPayload>
/**
 * Model ProjectionSalesSummary
 * 
 */
export type ProjectionSalesSummary = $Result.DefaultSelection<Prisma.$ProjectionSalesSummaryPayload>
/**
 * Model MetricSnapshot
 * 
 */
export type MetricSnapshot = $Result.DefaultSelection<Prisma.$MetricSnapshotPayload>
/**
 * Model RiskRule
 * 
 */
export type RiskRule = $Result.DefaultSelection<Prisma.$RiskRulePayload>
/**
 * Model TenantRiskRule
 * 
 */
export type TenantRiskRule = $Result.DefaultSelection<Prisma.$TenantRiskRulePayload>
/**
 * Model RiskFinding
 * 
 */
export type RiskFinding = $Result.DefaultSelection<Prisma.$RiskFindingPayload>
/**
 * Model TenantKpiConfig
 * 
 */
export type TenantKpiConfig = $Result.DefaultSelection<Prisma.$TenantKpiConfigPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const RiskAlgorithm: {
  Threshold: 'Threshold',
  ZScore: 'ZScore',
  MovingAvgDeviation: 'MovingAvgDeviation',
  HHI: 'HHI'
};

export type RiskAlgorithm = (typeof RiskAlgorithm)[keyof typeof RiskAlgorithm]


export const FindingSeverity: {
  critical: 'critical',
  warning: 'warning',
  stable: 'stable'
};

export type FindingSeverity = (typeof FindingSeverity)[keyof typeof FindingSeverity]


export const FindingTrend: {
  up: 'up',
  down: 'down',
  flat: 'flat'
};

export type FindingTrend = (typeof FindingTrend)[keyof typeof FindingTrend]

}

export type RiskAlgorithm = $Enums.RiskAlgorithm

export const RiskAlgorithm: typeof $Enums.RiskAlgorithm

export type FindingSeverity = $Enums.FindingSeverity

export const FindingSeverity: typeof $Enums.FindingSeverity

export type FindingTrend = $Enums.FindingTrend

export const FindingTrend: typeof $Enums.FindingTrend

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more ProjectionFinancialSummaries
 * const projectionFinancialSummaries = await prisma.projectionFinancialSummary.findMany()
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
   * // Fetch zero or more ProjectionFinancialSummaries
   * const projectionFinancialSummaries = await prisma.projectionFinancialSummary.findMany()
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
   * `prisma.projectionFinancialSummary`: Exposes CRUD operations for the **ProjectionFinancialSummary** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectionFinancialSummaries
    * const projectionFinancialSummaries = await prisma.projectionFinancialSummary.findMany()
    * ```
    */
  get projectionFinancialSummary(): Prisma.ProjectionFinancialSummaryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projectionSalesSummary`: Exposes CRUD operations for the **ProjectionSalesSummary** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectionSalesSummaries
    * const projectionSalesSummaries = await prisma.projectionSalesSummary.findMany()
    * ```
    */
  get projectionSalesSummary(): Prisma.ProjectionSalesSummaryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.metricSnapshot`: Exposes CRUD operations for the **MetricSnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MetricSnapshots
    * const metricSnapshots = await prisma.metricSnapshot.findMany()
    * ```
    */
  get metricSnapshot(): Prisma.MetricSnapshotDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.riskRule`: Exposes CRUD operations for the **RiskRule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RiskRules
    * const riskRules = await prisma.riskRule.findMany()
    * ```
    */
  get riskRule(): Prisma.RiskRuleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tenantRiskRule`: Exposes CRUD operations for the **TenantRiskRule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TenantRiskRules
    * const tenantRiskRules = await prisma.tenantRiskRule.findMany()
    * ```
    */
  get tenantRiskRule(): Prisma.TenantRiskRuleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.riskFinding`: Exposes CRUD operations for the **RiskFinding** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RiskFindings
    * const riskFindings = await prisma.riskFinding.findMany()
    * ```
    */
  get riskFinding(): Prisma.RiskFindingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tenantKpiConfig`: Exposes CRUD operations for the **TenantKpiConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TenantKpiConfigs
    * const tenantKpiConfigs = await prisma.tenantKpiConfig.findMany()
    * ```
    */
  get tenantKpiConfig(): Prisma.TenantKpiConfigDelegate<ExtArgs, ClientOptions>;
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
    ProjectionFinancialSummary: 'ProjectionFinancialSummary',
    ProjectionSalesSummary: 'ProjectionSalesSummary',
    MetricSnapshot: 'MetricSnapshot',
    RiskRule: 'RiskRule',
    TenantRiskRule: 'TenantRiskRule',
    RiskFinding: 'RiskFinding',
    TenantKpiConfig: 'TenantKpiConfig'
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
      modelProps: "projectionFinancialSummary" | "projectionSalesSummary" | "metricSnapshot" | "riskRule" | "tenantRiskRule" | "riskFinding" | "tenantKpiConfig"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      ProjectionFinancialSummary: {
        payload: Prisma.$ProjectionFinancialSummaryPayload<ExtArgs>
        fields: Prisma.ProjectionFinancialSummaryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectionFinancialSummaryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectionFinancialSummaryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectionFinancialSummaryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectionFinancialSummaryPayload>
          }
          findFirst: {
            args: Prisma.ProjectionFinancialSummaryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectionFinancialSummaryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectionFinancialSummaryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectionFinancialSummaryPayload>
          }
          findMany: {
            args: Prisma.ProjectionFinancialSummaryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectionFinancialSummaryPayload>[]
          }
          create: {
            args: Prisma.ProjectionFinancialSummaryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectionFinancialSummaryPayload>
          }
          createMany: {
            args: Prisma.ProjectionFinancialSummaryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectionFinancialSummaryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectionFinancialSummaryPayload>[]
          }
          delete: {
            args: Prisma.ProjectionFinancialSummaryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectionFinancialSummaryPayload>
          }
          update: {
            args: Prisma.ProjectionFinancialSummaryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectionFinancialSummaryPayload>
          }
          deleteMany: {
            args: Prisma.ProjectionFinancialSummaryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectionFinancialSummaryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectionFinancialSummaryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectionFinancialSummaryPayload>[]
          }
          upsert: {
            args: Prisma.ProjectionFinancialSummaryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectionFinancialSummaryPayload>
          }
          aggregate: {
            args: Prisma.ProjectionFinancialSummaryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectionFinancialSummary>
          }
          groupBy: {
            args: Prisma.ProjectionFinancialSummaryGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectionFinancialSummaryGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectionFinancialSummaryCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectionFinancialSummaryCountAggregateOutputType> | number
          }
        }
      }
      ProjectionSalesSummary: {
        payload: Prisma.$ProjectionSalesSummaryPayload<ExtArgs>
        fields: Prisma.ProjectionSalesSummaryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectionSalesSummaryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectionSalesSummaryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectionSalesSummaryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectionSalesSummaryPayload>
          }
          findFirst: {
            args: Prisma.ProjectionSalesSummaryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectionSalesSummaryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectionSalesSummaryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectionSalesSummaryPayload>
          }
          findMany: {
            args: Prisma.ProjectionSalesSummaryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectionSalesSummaryPayload>[]
          }
          create: {
            args: Prisma.ProjectionSalesSummaryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectionSalesSummaryPayload>
          }
          createMany: {
            args: Prisma.ProjectionSalesSummaryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectionSalesSummaryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectionSalesSummaryPayload>[]
          }
          delete: {
            args: Prisma.ProjectionSalesSummaryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectionSalesSummaryPayload>
          }
          update: {
            args: Prisma.ProjectionSalesSummaryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectionSalesSummaryPayload>
          }
          deleteMany: {
            args: Prisma.ProjectionSalesSummaryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectionSalesSummaryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectionSalesSummaryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectionSalesSummaryPayload>[]
          }
          upsert: {
            args: Prisma.ProjectionSalesSummaryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectionSalesSummaryPayload>
          }
          aggregate: {
            args: Prisma.ProjectionSalesSummaryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectionSalesSummary>
          }
          groupBy: {
            args: Prisma.ProjectionSalesSummaryGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectionSalesSummaryGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectionSalesSummaryCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectionSalesSummaryCountAggregateOutputType> | number
          }
        }
      }
      MetricSnapshot: {
        payload: Prisma.$MetricSnapshotPayload<ExtArgs>
        fields: Prisma.MetricSnapshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MetricSnapshotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricSnapshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MetricSnapshotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricSnapshotPayload>
          }
          findFirst: {
            args: Prisma.MetricSnapshotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricSnapshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MetricSnapshotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricSnapshotPayload>
          }
          findMany: {
            args: Prisma.MetricSnapshotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricSnapshotPayload>[]
          }
          create: {
            args: Prisma.MetricSnapshotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricSnapshotPayload>
          }
          createMany: {
            args: Prisma.MetricSnapshotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MetricSnapshotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricSnapshotPayload>[]
          }
          delete: {
            args: Prisma.MetricSnapshotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricSnapshotPayload>
          }
          update: {
            args: Prisma.MetricSnapshotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricSnapshotPayload>
          }
          deleteMany: {
            args: Prisma.MetricSnapshotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MetricSnapshotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MetricSnapshotUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricSnapshotPayload>[]
          }
          upsert: {
            args: Prisma.MetricSnapshotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricSnapshotPayload>
          }
          aggregate: {
            args: Prisma.MetricSnapshotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMetricSnapshot>
          }
          groupBy: {
            args: Prisma.MetricSnapshotGroupByArgs<ExtArgs>
            result: $Utils.Optional<MetricSnapshotGroupByOutputType>[]
          }
          count: {
            args: Prisma.MetricSnapshotCountArgs<ExtArgs>
            result: $Utils.Optional<MetricSnapshotCountAggregateOutputType> | number
          }
        }
      }
      RiskRule: {
        payload: Prisma.$RiskRulePayload<ExtArgs>
        fields: Prisma.RiskRuleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RiskRuleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskRulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RiskRuleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskRulePayload>
          }
          findFirst: {
            args: Prisma.RiskRuleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskRulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RiskRuleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskRulePayload>
          }
          findMany: {
            args: Prisma.RiskRuleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskRulePayload>[]
          }
          create: {
            args: Prisma.RiskRuleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskRulePayload>
          }
          createMany: {
            args: Prisma.RiskRuleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RiskRuleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskRulePayload>[]
          }
          delete: {
            args: Prisma.RiskRuleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskRulePayload>
          }
          update: {
            args: Prisma.RiskRuleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskRulePayload>
          }
          deleteMany: {
            args: Prisma.RiskRuleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RiskRuleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RiskRuleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskRulePayload>[]
          }
          upsert: {
            args: Prisma.RiskRuleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskRulePayload>
          }
          aggregate: {
            args: Prisma.RiskRuleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRiskRule>
          }
          groupBy: {
            args: Prisma.RiskRuleGroupByArgs<ExtArgs>
            result: $Utils.Optional<RiskRuleGroupByOutputType>[]
          }
          count: {
            args: Prisma.RiskRuleCountArgs<ExtArgs>
            result: $Utils.Optional<RiskRuleCountAggregateOutputType> | number
          }
        }
      }
      TenantRiskRule: {
        payload: Prisma.$TenantRiskRulePayload<ExtArgs>
        fields: Prisma.TenantRiskRuleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TenantRiskRuleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantRiskRulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TenantRiskRuleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantRiskRulePayload>
          }
          findFirst: {
            args: Prisma.TenantRiskRuleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantRiskRulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TenantRiskRuleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantRiskRulePayload>
          }
          findMany: {
            args: Prisma.TenantRiskRuleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantRiskRulePayload>[]
          }
          create: {
            args: Prisma.TenantRiskRuleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantRiskRulePayload>
          }
          createMany: {
            args: Prisma.TenantRiskRuleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TenantRiskRuleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantRiskRulePayload>[]
          }
          delete: {
            args: Prisma.TenantRiskRuleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantRiskRulePayload>
          }
          update: {
            args: Prisma.TenantRiskRuleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantRiskRulePayload>
          }
          deleteMany: {
            args: Prisma.TenantRiskRuleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TenantRiskRuleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TenantRiskRuleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantRiskRulePayload>[]
          }
          upsert: {
            args: Prisma.TenantRiskRuleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantRiskRulePayload>
          }
          aggregate: {
            args: Prisma.TenantRiskRuleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTenantRiskRule>
          }
          groupBy: {
            args: Prisma.TenantRiskRuleGroupByArgs<ExtArgs>
            result: $Utils.Optional<TenantRiskRuleGroupByOutputType>[]
          }
          count: {
            args: Prisma.TenantRiskRuleCountArgs<ExtArgs>
            result: $Utils.Optional<TenantRiskRuleCountAggregateOutputType> | number
          }
        }
      }
      RiskFinding: {
        payload: Prisma.$RiskFindingPayload<ExtArgs>
        fields: Prisma.RiskFindingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RiskFindingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskFindingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RiskFindingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskFindingPayload>
          }
          findFirst: {
            args: Prisma.RiskFindingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskFindingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RiskFindingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskFindingPayload>
          }
          findMany: {
            args: Prisma.RiskFindingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskFindingPayload>[]
          }
          create: {
            args: Prisma.RiskFindingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskFindingPayload>
          }
          createMany: {
            args: Prisma.RiskFindingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RiskFindingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskFindingPayload>[]
          }
          delete: {
            args: Prisma.RiskFindingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskFindingPayload>
          }
          update: {
            args: Prisma.RiskFindingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskFindingPayload>
          }
          deleteMany: {
            args: Prisma.RiskFindingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RiskFindingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RiskFindingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskFindingPayload>[]
          }
          upsert: {
            args: Prisma.RiskFindingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskFindingPayload>
          }
          aggregate: {
            args: Prisma.RiskFindingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRiskFinding>
          }
          groupBy: {
            args: Prisma.RiskFindingGroupByArgs<ExtArgs>
            result: $Utils.Optional<RiskFindingGroupByOutputType>[]
          }
          count: {
            args: Prisma.RiskFindingCountArgs<ExtArgs>
            result: $Utils.Optional<RiskFindingCountAggregateOutputType> | number
          }
        }
      }
      TenantKpiConfig: {
        payload: Prisma.$TenantKpiConfigPayload<ExtArgs>
        fields: Prisma.TenantKpiConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TenantKpiConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantKpiConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TenantKpiConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantKpiConfigPayload>
          }
          findFirst: {
            args: Prisma.TenantKpiConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantKpiConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TenantKpiConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantKpiConfigPayload>
          }
          findMany: {
            args: Prisma.TenantKpiConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantKpiConfigPayload>[]
          }
          create: {
            args: Prisma.TenantKpiConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantKpiConfigPayload>
          }
          createMany: {
            args: Prisma.TenantKpiConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TenantKpiConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantKpiConfigPayload>[]
          }
          delete: {
            args: Prisma.TenantKpiConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantKpiConfigPayload>
          }
          update: {
            args: Prisma.TenantKpiConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantKpiConfigPayload>
          }
          deleteMany: {
            args: Prisma.TenantKpiConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TenantKpiConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TenantKpiConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantKpiConfigPayload>[]
          }
          upsert: {
            args: Prisma.TenantKpiConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantKpiConfigPayload>
          }
          aggregate: {
            args: Prisma.TenantKpiConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTenantKpiConfig>
          }
          groupBy: {
            args: Prisma.TenantKpiConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<TenantKpiConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.TenantKpiConfigCountArgs<ExtArgs>
            result: $Utils.Optional<TenantKpiConfigCountAggregateOutputType> | number
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
    projectionFinancialSummary?: ProjectionFinancialSummaryOmit
    projectionSalesSummary?: ProjectionSalesSummaryOmit
    metricSnapshot?: MetricSnapshotOmit
    riskRule?: RiskRuleOmit
    tenantRiskRule?: TenantRiskRuleOmit
    riskFinding?: RiskFindingOmit
    tenantKpiConfig?: TenantKpiConfigOmit
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
   * Count Type RiskRuleCountOutputType
   */

  export type RiskRuleCountOutputType = {
    tenantRules: number
    findings: number
  }

  export type RiskRuleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenantRules?: boolean | RiskRuleCountOutputTypeCountTenantRulesArgs
    findings?: boolean | RiskRuleCountOutputTypeCountFindingsArgs
  }

  // Custom InputTypes
  /**
   * RiskRuleCountOutputType without action
   */
  export type RiskRuleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskRuleCountOutputType
     */
    select?: RiskRuleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RiskRuleCountOutputType without action
   */
  export type RiskRuleCountOutputTypeCountTenantRulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantRiskRuleWhereInput
  }

  /**
   * RiskRuleCountOutputType without action
   */
  export type RiskRuleCountOutputTypeCountFindingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RiskFindingWhereInput
  }


  /**
   * Models
   */

  /**
   * Model ProjectionFinancialSummary
   */

  export type AggregateProjectionFinancialSummary = {
    _count: ProjectionFinancialSummaryCountAggregateOutputType | null
    _avg: ProjectionFinancialSummaryAvgAggregateOutputType | null
    _sum: ProjectionFinancialSummarySumAggregateOutputType | null
    _min: ProjectionFinancialSummaryMinAggregateOutputType | null
    _max: ProjectionFinancialSummaryMaxAggregateOutputType | null
  }

  export type ProjectionFinancialSummaryAvgAggregateOutputType = {
    totalDebit: number | null
    totalCredit: number | null
    balance: number | null
    lastProcessedVersion: number | null
  }

  export type ProjectionFinancialSummarySumAggregateOutputType = {
    totalDebit: bigint | null
    totalCredit: bigint | null
    balance: bigint | null
    lastProcessedVersion: number | null
  }

  export type ProjectionFinancialSummaryMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    accountId: string | null
    periodStart: Date | null
    periodEnd: Date | null
    totalDebit: bigint | null
    totalCredit: bigint | null
    balance: bigint | null
    lastProcessedEventId: string | null
    lastProcessedVersion: number | null
    updatedAt: Date | null
  }

  export type ProjectionFinancialSummaryMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    accountId: string | null
    periodStart: Date | null
    periodEnd: Date | null
    totalDebit: bigint | null
    totalCredit: bigint | null
    balance: bigint | null
    lastProcessedEventId: string | null
    lastProcessedVersion: number | null
    updatedAt: Date | null
  }

  export type ProjectionFinancialSummaryCountAggregateOutputType = {
    id: number
    tenantId: number
    accountId: number
    periodStart: number
    periodEnd: number
    totalDebit: number
    totalCredit: number
    balance: number
    lastProcessedEventId: number
    lastProcessedVersion: number
    updatedAt: number
    _all: number
  }


  export type ProjectionFinancialSummaryAvgAggregateInputType = {
    totalDebit?: true
    totalCredit?: true
    balance?: true
    lastProcessedVersion?: true
  }

  export type ProjectionFinancialSummarySumAggregateInputType = {
    totalDebit?: true
    totalCredit?: true
    balance?: true
    lastProcessedVersion?: true
  }

  export type ProjectionFinancialSummaryMinAggregateInputType = {
    id?: true
    tenantId?: true
    accountId?: true
    periodStart?: true
    periodEnd?: true
    totalDebit?: true
    totalCredit?: true
    balance?: true
    lastProcessedEventId?: true
    lastProcessedVersion?: true
    updatedAt?: true
  }

  export type ProjectionFinancialSummaryMaxAggregateInputType = {
    id?: true
    tenantId?: true
    accountId?: true
    periodStart?: true
    periodEnd?: true
    totalDebit?: true
    totalCredit?: true
    balance?: true
    lastProcessedEventId?: true
    lastProcessedVersion?: true
    updatedAt?: true
  }

  export type ProjectionFinancialSummaryCountAggregateInputType = {
    id?: true
    tenantId?: true
    accountId?: true
    periodStart?: true
    periodEnd?: true
    totalDebit?: true
    totalCredit?: true
    balance?: true
    lastProcessedEventId?: true
    lastProcessedVersion?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectionFinancialSummaryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectionFinancialSummary to aggregate.
     */
    where?: ProjectionFinancialSummaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectionFinancialSummaries to fetch.
     */
    orderBy?: ProjectionFinancialSummaryOrderByWithRelationInput | ProjectionFinancialSummaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectionFinancialSummaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectionFinancialSummaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectionFinancialSummaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectionFinancialSummaries
    **/
    _count?: true | ProjectionFinancialSummaryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectionFinancialSummaryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectionFinancialSummarySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectionFinancialSummaryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectionFinancialSummaryMaxAggregateInputType
  }

  export type GetProjectionFinancialSummaryAggregateType<T extends ProjectionFinancialSummaryAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectionFinancialSummary]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectionFinancialSummary[P]>
      : GetScalarType<T[P], AggregateProjectionFinancialSummary[P]>
  }




  export type ProjectionFinancialSummaryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectionFinancialSummaryWhereInput
    orderBy?: ProjectionFinancialSummaryOrderByWithAggregationInput | ProjectionFinancialSummaryOrderByWithAggregationInput[]
    by: ProjectionFinancialSummaryScalarFieldEnum[] | ProjectionFinancialSummaryScalarFieldEnum
    having?: ProjectionFinancialSummaryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectionFinancialSummaryCountAggregateInputType | true
    _avg?: ProjectionFinancialSummaryAvgAggregateInputType
    _sum?: ProjectionFinancialSummarySumAggregateInputType
    _min?: ProjectionFinancialSummaryMinAggregateInputType
    _max?: ProjectionFinancialSummaryMaxAggregateInputType
  }

  export type ProjectionFinancialSummaryGroupByOutputType = {
    id: string
    tenantId: string
    accountId: string
    periodStart: Date
    periodEnd: Date
    totalDebit: bigint
    totalCredit: bigint
    balance: bigint
    lastProcessedEventId: string
    lastProcessedVersion: number
    updatedAt: Date
    _count: ProjectionFinancialSummaryCountAggregateOutputType | null
    _avg: ProjectionFinancialSummaryAvgAggregateOutputType | null
    _sum: ProjectionFinancialSummarySumAggregateOutputType | null
    _min: ProjectionFinancialSummaryMinAggregateOutputType | null
    _max: ProjectionFinancialSummaryMaxAggregateOutputType | null
  }

  type GetProjectionFinancialSummaryGroupByPayload<T extends ProjectionFinancialSummaryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectionFinancialSummaryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectionFinancialSummaryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectionFinancialSummaryGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectionFinancialSummaryGroupByOutputType[P]>
        }
      >
    >


  export type ProjectionFinancialSummarySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    accountId?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    totalDebit?: boolean
    totalCredit?: boolean
    balance?: boolean
    lastProcessedEventId?: boolean
    lastProcessedVersion?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["projectionFinancialSummary"]>

  export type ProjectionFinancialSummarySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    accountId?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    totalDebit?: boolean
    totalCredit?: boolean
    balance?: boolean
    lastProcessedEventId?: boolean
    lastProcessedVersion?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["projectionFinancialSummary"]>

  export type ProjectionFinancialSummarySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    accountId?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    totalDebit?: boolean
    totalCredit?: boolean
    balance?: boolean
    lastProcessedEventId?: boolean
    lastProcessedVersion?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["projectionFinancialSummary"]>

  export type ProjectionFinancialSummarySelectScalar = {
    id?: boolean
    tenantId?: boolean
    accountId?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    totalDebit?: boolean
    totalCredit?: boolean
    balance?: boolean
    lastProcessedEventId?: boolean
    lastProcessedVersion?: boolean
    updatedAt?: boolean
  }

  export type ProjectionFinancialSummaryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "accountId" | "periodStart" | "periodEnd" | "totalDebit" | "totalCredit" | "balance" | "lastProcessedEventId" | "lastProcessedVersion" | "updatedAt", ExtArgs["result"]["projectionFinancialSummary"]>

  export type $ProjectionFinancialSummaryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectionFinancialSummary"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      accountId: string
      periodStart: Date
      periodEnd: Date
      totalDebit: bigint
      totalCredit: bigint
      balance: bigint
      lastProcessedEventId: string
      lastProcessedVersion: number
      updatedAt: Date
    }, ExtArgs["result"]["projectionFinancialSummary"]>
    composites: {}
  }

  type ProjectionFinancialSummaryGetPayload<S extends boolean | null | undefined | ProjectionFinancialSummaryDefaultArgs> = $Result.GetResult<Prisma.$ProjectionFinancialSummaryPayload, S>

  type ProjectionFinancialSummaryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectionFinancialSummaryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectionFinancialSummaryCountAggregateInputType | true
    }

  export interface ProjectionFinancialSummaryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectionFinancialSummary'], meta: { name: 'ProjectionFinancialSummary' } }
    /**
     * Find zero or one ProjectionFinancialSummary that matches the filter.
     * @param {ProjectionFinancialSummaryFindUniqueArgs} args - Arguments to find a ProjectionFinancialSummary
     * @example
     * // Get one ProjectionFinancialSummary
     * const projectionFinancialSummary = await prisma.projectionFinancialSummary.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectionFinancialSummaryFindUniqueArgs>(args: SelectSubset<T, ProjectionFinancialSummaryFindUniqueArgs<ExtArgs>>): Prisma__ProjectionFinancialSummaryClient<$Result.GetResult<Prisma.$ProjectionFinancialSummaryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProjectionFinancialSummary that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectionFinancialSummaryFindUniqueOrThrowArgs} args - Arguments to find a ProjectionFinancialSummary
     * @example
     * // Get one ProjectionFinancialSummary
     * const projectionFinancialSummary = await prisma.projectionFinancialSummary.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectionFinancialSummaryFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectionFinancialSummaryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectionFinancialSummaryClient<$Result.GetResult<Prisma.$ProjectionFinancialSummaryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectionFinancialSummary that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectionFinancialSummaryFindFirstArgs} args - Arguments to find a ProjectionFinancialSummary
     * @example
     * // Get one ProjectionFinancialSummary
     * const projectionFinancialSummary = await prisma.projectionFinancialSummary.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectionFinancialSummaryFindFirstArgs>(args?: SelectSubset<T, ProjectionFinancialSummaryFindFirstArgs<ExtArgs>>): Prisma__ProjectionFinancialSummaryClient<$Result.GetResult<Prisma.$ProjectionFinancialSummaryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectionFinancialSummary that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectionFinancialSummaryFindFirstOrThrowArgs} args - Arguments to find a ProjectionFinancialSummary
     * @example
     * // Get one ProjectionFinancialSummary
     * const projectionFinancialSummary = await prisma.projectionFinancialSummary.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectionFinancialSummaryFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectionFinancialSummaryFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectionFinancialSummaryClient<$Result.GetResult<Prisma.$ProjectionFinancialSummaryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProjectionFinancialSummaries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectionFinancialSummaryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectionFinancialSummaries
     * const projectionFinancialSummaries = await prisma.projectionFinancialSummary.findMany()
     * 
     * // Get first 10 ProjectionFinancialSummaries
     * const projectionFinancialSummaries = await prisma.projectionFinancialSummary.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectionFinancialSummaryWithIdOnly = await prisma.projectionFinancialSummary.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectionFinancialSummaryFindManyArgs>(args?: SelectSubset<T, ProjectionFinancialSummaryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectionFinancialSummaryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProjectionFinancialSummary.
     * @param {ProjectionFinancialSummaryCreateArgs} args - Arguments to create a ProjectionFinancialSummary.
     * @example
     * // Create one ProjectionFinancialSummary
     * const ProjectionFinancialSummary = await prisma.projectionFinancialSummary.create({
     *   data: {
     *     // ... data to create a ProjectionFinancialSummary
     *   }
     * })
     * 
     */
    create<T extends ProjectionFinancialSummaryCreateArgs>(args: SelectSubset<T, ProjectionFinancialSummaryCreateArgs<ExtArgs>>): Prisma__ProjectionFinancialSummaryClient<$Result.GetResult<Prisma.$ProjectionFinancialSummaryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProjectionFinancialSummaries.
     * @param {ProjectionFinancialSummaryCreateManyArgs} args - Arguments to create many ProjectionFinancialSummaries.
     * @example
     * // Create many ProjectionFinancialSummaries
     * const projectionFinancialSummary = await prisma.projectionFinancialSummary.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectionFinancialSummaryCreateManyArgs>(args?: SelectSubset<T, ProjectionFinancialSummaryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProjectionFinancialSummaries and returns the data saved in the database.
     * @param {ProjectionFinancialSummaryCreateManyAndReturnArgs} args - Arguments to create many ProjectionFinancialSummaries.
     * @example
     * // Create many ProjectionFinancialSummaries
     * const projectionFinancialSummary = await prisma.projectionFinancialSummary.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProjectionFinancialSummaries and only return the `id`
     * const projectionFinancialSummaryWithIdOnly = await prisma.projectionFinancialSummary.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectionFinancialSummaryCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectionFinancialSummaryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectionFinancialSummaryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProjectionFinancialSummary.
     * @param {ProjectionFinancialSummaryDeleteArgs} args - Arguments to delete one ProjectionFinancialSummary.
     * @example
     * // Delete one ProjectionFinancialSummary
     * const ProjectionFinancialSummary = await prisma.projectionFinancialSummary.delete({
     *   where: {
     *     // ... filter to delete one ProjectionFinancialSummary
     *   }
     * })
     * 
     */
    delete<T extends ProjectionFinancialSummaryDeleteArgs>(args: SelectSubset<T, ProjectionFinancialSummaryDeleteArgs<ExtArgs>>): Prisma__ProjectionFinancialSummaryClient<$Result.GetResult<Prisma.$ProjectionFinancialSummaryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProjectionFinancialSummary.
     * @param {ProjectionFinancialSummaryUpdateArgs} args - Arguments to update one ProjectionFinancialSummary.
     * @example
     * // Update one ProjectionFinancialSummary
     * const projectionFinancialSummary = await prisma.projectionFinancialSummary.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectionFinancialSummaryUpdateArgs>(args: SelectSubset<T, ProjectionFinancialSummaryUpdateArgs<ExtArgs>>): Prisma__ProjectionFinancialSummaryClient<$Result.GetResult<Prisma.$ProjectionFinancialSummaryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProjectionFinancialSummaries.
     * @param {ProjectionFinancialSummaryDeleteManyArgs} args - Arguments to filter ProjectionFinancialSummaries to delete.
     * @example
     * // Delete a few ProjectionFinancialSummaries
     * const { count } = await prisma.projectionFinancialSummary.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectionFinancialSummaryDeleteManyArgs>(args?: SelectSubset<T, ProjectionFinancialSummaryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectionFinancialSummaries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectionFinancialSummaryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectionFinancialSummaries
     * const projectionFinancialSummary = await prisma.projectionFinancialSummary.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectionFinancialSummaryUpdateManyArgs>(args: SelectSubset<T, ProjectionFinancialSummaryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectionFinancialSummaries and returns the data updated in the database.
     * @param {ProjectionFinancialSummaryUpdateManyAndReturnArgs} args - Arguments to update many ProjectionFinancialSummaries.
     * @example
     * // Update many ProjectionFinancialSummaries
     * const projectionFinancialSummary = await prisma.projectionFinancialSummary.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProjectionFinancialSummaries and only return the `id`
     * const projectionFinancialSummaryWithIdOnly = await prisma.projectionFinancialSummary.updateManyAndReturn({
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
    updateManyAndReturn<T extends ProjectionFinancialSummaryUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectionFinancialSummaryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectionFinancialSummaryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProjectionFinancialSummary.
     * @param {ProjectionFinancialSummaryUpsertArgs} args - Arguments to update or create a ProjectionFinancialSummary.
     * @example
     * // Update or create a ProjectionFinancialSummary
     * const projectionFinancialSummary = await prisma.projectionFinancialSummary.upsert({
     *   create: {
     *     // ... data to create a ProjectionFinancialSummary
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectionFinancialSummary we want to update
     *   }
     * })
     */
    upsert<T extends ProjectionFinancialSummaryUpsertArgs>(args: SelectSubset<T, ProjectionFinancialSummaryUpsertArgs<ExtArgs>>): Prisma__ProjectionFinancialSummaryClient<$Result.GetResult<Prisma.$ProjectionFinancialSummaryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProjectionFinancialSummaries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectionFinancialSummaryCountArgs} args - Arguments to filter ProjectionFinancialSummaries to count.
     * @example
     * // Count the number of ProjectionFinancialSummaries
     * const count = await prisma.projectionFinancialSummary.count({
     *   where: {
     *     // ... the filter for the ProjectionFinancialSummaries we want to count
     *   }
     * })
    **/
    count<T extends ProjectionFinancialSummaryCountArgs>(
      args?: Subset<T, ProjectionFinancialSummaryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectionFinancialSummaryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectionFinancialSummary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectionFinancialSummaryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProjectionFinancialSummaryAggregateArgs>(args: Subset<T, ProjectionFinancialSummaryAggregateArgs>): Prisma.PrismaPromise<GetProjectionFinancialSummaryAggregateType<T>>

    /**
     * Group by ProjectionFinancialSummary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectionFinancialSummaryGroupByArgs} args - Group by arguments.
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
      T extends ProjectionFinancialSummaryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectionFinancialSummaryGroupByArgs['orderBy'] }
        : { orderBy?: ProjectionFinancialSummaryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProjectionFinancialSummaryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectionFinancialSummaryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectionFinancialSummary model
   */
  readonly fields: ProjectionFinancialSummaryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectionFinancialSummary.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectionFinancialSummaryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ProjectionFinancialSummary model
   */
  interface ProjectionFinancialSummaryFieldRefs {
    readonly id: FieldRef<"ProjectionFinancialSummary", 'String'>
    readonly tenantId: FieldRef<"ProjectionFinancialSummary", 'String'>
    readonly accountId: FieldRef<"ProjectionFinancialSummary", 'String'>
    readonly periodStart: FieldRef<"ProjectionFinancialSummary", 'DateTime'>
    readonly periodEnd: FieldRef<"ProjectionFinancialSummary", 'DateTime'>
    readonly totalDebit: FieldRef<"ProjectionFinancialSummary", 'BigInt'>
    readonly totalCredit: FieldRef<"ProjectionFinancialSummary", 'BigInt'>
    readonly balance: FieldRef<"ProjectionFinancialSummary", 'BigInt'>
    readonly lastProcessedEventId: FieldRef<"ProjectionFinancialSummary", 'String'>
    readonly lastProcessedVersion: FieldRef<"ProjectionFinancialSummary", 'Int'>
    readonly updatedAt: FieldRef<"ProjectionFinancialSummary", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProjectionFinancialSummary findUnique
   */
  export type ProjectionFinancialSummaryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectionFinancialSummary
     */
    select?: ProjectionFinancialSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectionFinancialSummary
     */
    omit?: ProjectionFinancialSummaryOmit<ExtArgs> | null
    /**
     * Filter, which ProjectionFinancialSummary to fetch.
     */
    where: ProjectionFinancialSummaryWhereUniqueInput
  }

  /**
   * ProjectionFinancialSummary findUniqueOrThrow
   */
  export type ProjectionFinancialSummaryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectionFinancialSummary
     */
    select?: ProjectionFinancialSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectionFinancialSummary
     */
    omit?: ProjectionFinancialSummaryOmit<ExtArgs> | null
    /**
     * Filter, which ProjectionFinancialSummary to fetch.
     */
    where: ProjectionFinancialSummaryWhereUniqueInput
  }

  /**
   * ProjectionFinancialSummary findFirst
   */
  export type ProjectionFinancialSummaryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectionFinancialSummary
     */
    select?: ProjectionFinancialSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectionFinancialSummary
     */
    omit?: ProjectionFinancialSummaryOmit<ExtArgs> | null
    /**
     * Filter, which ProjectionFinancialSummary to fetch.
     */
    where?: ProjectionFinancialSummaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectionFinancialSummaries to fetch.
     */
    orderBy?: ProjectionFinancialSummaryOrderByWithRelationInput | ProjectionFinancialSummaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectionFinancialSummaries.
     */
    cursor?: ProjectionFinancialSummaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectionFinancialSummaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectionFinancialSummaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectionFinancialSummaries.
     */
    distinct?: ProjectionFinancialSummaryScalarFieldEnum | ProjectionFinancialSummaryScalarFieldEnum[]
  }

  /**
   * ProjectionFinancialSummary findFirstOrThrow
   */
  export type ProjectionFinancialSummaryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectionFinancialSummary
     */
    select?: ProjectionFinancialSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectionFinancialSummary
     */
    omit?: ProjectionFinancialSummaryOmit<ExtArgs> | null
    /**
     * Filter, which ProjectionFinancialSummary to fetch.
     */
    where?: ProjectionFinancialSummaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectionFinancialSummaries to fetch.
     */
    orderBy?: ProjectionFinancialSummaryOrderByWithRelationInput | ProjectionFinancialSummaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectionFinancialSummaries.
     */
    cursor?: ProjectionFinancialSummaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectionFinancialSummaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectionFinancialSummaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectionFinancialSummaries.
     */
    distinct?: ProjectionFinancialSummaryScalarFieldEnum | ProjectionFinancialSummaryScalarFieldEnum[]
  }

  /**
   * ProjectionFinancialSummary findMany
   */
  export type ProjectionFinancialSummaryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectionFinancialSummary
     */
    select?: ProjectionFinancialSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectionFinancialSummary
     */
    omit?: ProjectionFinancialSummaryOmit<ExtArgs> | null
    /**
     * Filter, which ProjectionFinancialSummaries to fetch.
     */
    where?: ProjectionFinancialSummaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectionFinancialSummaries to fetch.
     */
    orderBy?: ProjectionFinancialSummaryOrderByWithRelationInput | ProjectionFinancialSummaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectionFinancialSummaries.
     */
    cursor?: ProjectionFinancialSummaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectionFinancialSummaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectionFinancialSummaries.
     */
    skip?: number
    distinct?: ProjectionFinancialSummaryScalarFieldEnum | ProjectionFinancialSummaryScalarFieldEnum[]
  }

  /**
   * ProjectionFinancialSummary create
   */
  export type ProjectionFinancialSummaryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectionFinancialSummary
     */
    select?: ProjectionFinancialSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectionFinancialSummary
     */
    omit?: ProjectionFinancialSummaryOmit<ExtArgs> | null
    /**
     * The data needed to create a ProjectionFinancialSummary.
     */
    data: XOR<ProjectionFinancialSummaryCreateInput, ProjectionFinancialSummaryUncheckedCreateInput>
  }

  /**
   * ProjectionFinancialSummary createMany
   */
  export type ProjectionFinancialSummaryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectionFinancialSummaries.
     */
    data: ProjectionFinancialSummaryCreateManyInput | ProjectionFinancialSummaryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProjectionFinancialSummary createManyAndReturn
   */
  export type ProjectionFinancialSummaryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectionFinancialSummary
     */
    select?: ProjectionFinancialSummarySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectionFinancialSummary
     */
    omit?: ProjectionFinancialSummaryOmit<ExtArgs> | null
    /**
     * The data used to create many ProjectionFinancialSummaries.
     */
    data: ProjectionFinancialSummaryCreateManyInput | ProjectionFinancialSummaryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProjectionFinancialSummary update
   */
  export type ProjectionFinancialSummaryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectionFinancialSummary
     */
    select?: ProjectionFinancialSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectionFinancialSummary
     */
    omit?: ProjectionFinancialSummaryOmit<ExtArgs> | null
    /**
     * The data needed to update a ProjectionFinancialSummary.
     */
    data: XOR<ProjectionFinancialSummaryUpdateInput, ProjectionFinancialSummaryUncheckedUpdateInput>
    /**
     * Choose, which ProjectionFinancialSummary to update.
     */
    where: ProjectionFinancialSummaryWhereUniqueInput
  }

  /**
   * ProjectionFinancialSummary updateMany
   */
  export type ProjectionFinancialSummaryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectionFinancialSummaries.
     */
    data: XOR<ProjectionFinancialSummaryUpdateManyMutationInput, ProjectionFinancialSummaryUncheckedUpdateManyInput>
    /**
     * Filter which ProjectionFinancialSummaries to update
     */
    where?: ProjectionFinancialSummaryWhereInput
    /**
     * Limit how many ProjectionFinancialSummaries to update.
     */
    limit?: number
  }

  /**
   * ProjectionFinancialSummary updateManyAndReturn
   */
  export type ProjectionFinancialSummaryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectionFinancialSummary
     */
    select?: ProjectionFinancialSummarySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectionFinancialSummary
     */
    omit?: ProjectionFinancialSummaryOmit<ExtArgs> | null
    /**
     * The data used to update ProjectionFinancialSummaries.
     */
    data: XOR<ProjectionFinancialSummaryUpdateManyMutationInput, ProjectionFinancialSummaryUncheckedUpdateManyInput>
    /**
     * Filter which ProjectionFinancialSummaries to update
     */
    where?: ProjectionFinancialSummaryWhereInput
    /**
     * Limit how many ProjectionFinancialSummaries to update.
     */
    limit?: number
  }

  /**
   * ProjectionFinancialSummary upsert
   */
  export type ProjectionFinancialSummaryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectionFinancialSummary
     */
    select?: ProjectionFinancialSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectionFinancialSummary
     */
    omit?: ProjectionFinancialSummaryOmit<ExtArgs> | null
    /**
     * The filter to search for the ProjectionFinancialSummary to update in case it exists.
     */
    where: ProjectionFinancialSummaryWhereUniqueInput
    /**
     * In case the ProjectionFinancialSummary found by the `where` argument doesn't exist, create a new ProjectionFinancialSummary with this data.
     */
    create: XOR<ProjectionFinancialSummaryCreateInput, ProjectionFinancialSummaryUncheckedCreateInput>
    /**
     * In case the ProjectionFinancialSummary was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectionFinancialSummaryUpdateInput, ProjectionFinancialSummaryUncheckedUpdateInput>
  }

  /**
   * ProjectionFinancialSummary delete
   */
  export type ProjectionFinancialSummaryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectionFinancialSummary
     */
    select?: ProjectionFinancialSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectionFinancialSummary
     */
    omit?: ProjectionFinancialSummaryOmit<ExtArgs> | null
    /**
     * Filter which ProjectionFinancialSummary to delete.
     */
    where: ProjectionFinancialSummaryWhereUniqueInput
  }

  /**
   * ProjectionFinancialSummary deleteMany
   */
  export type ProjectionFinancialSummaryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectionFinancialSummaries to delete
     */
    where?: ProjectionFinancialSummaryWhereInput
    /**
     * Limit how many ProjectionFinancialSummaries to delete.
     */
    limit?: number
  }

  /**
   * ProjectionFinancialSummary without action
   */
  export type ProjectionFinancialSummaryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectionFinancialSummary
     */
    select?: ProjectionFinancialSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectionFinancialSummary
     */
    omit?: ProjectionFinancialSummaryOmit<ExtArgs> | null
  }


  /**
   * Model ProjectionSalesSummary
   */

  export type AggregateProjectionSalesSummary = {
    _count: ProjectionSalesSummaryCountAggregateOutputType | null
    _avg: ProjectionSalesSummaryAvgAggregateOutputType | null
    _sum: ProjectionSalesSummarySumAggregateOutputType | null
    _min: ProjectionSalesSummaryMinAggregateOutputType | null
    _max: ProjectionSalesSummaryMaxAggregateOutputType | null
  }

  export type ProjectionSalesSummaryAvgAggregateOutputType = {
    totalOrders: number | null
    totalRevenue: Decimal | null
    totalRefunds: Decimal | null
    lastProcessedVersion: number | null
  }

  export type ProjectionSalesSummarySumAggregateOutputType = {
    totalOrders: number | null
    totalRevenue: Decimal | null
    totalRefunds: Decimal | null
    lastProcessedVersion: number | null
  }

  export type ProjectionSalesSummaryMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    periodDate: Date | null
    totalOrders: number | null
    totalRevenue: Decimal | null
    totalRefunds: Decimal | null
    lastProcessedEventId: string | null
    lastProcessedVersion: number | null
    updatedAt: Date | null
  }

  export type ProjectionSalesSummaryMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    periodDate: Date | null
    totalOrders: number | null
    totalRevenue: Decimal | null
    totalRefunds: Decimal | null
    lastProcessedEventId: string | null
    lastProcessedVersion: number | null
    updatedAt: Date | null
  }

  export type ProjectionSalesSummaryCountAggregateOutputType = {
    id: number
    tenantId: number
    periodDate: number
    totalOrders: number
    totalRevenue: number
    totalRefunds: number
    lastProcessedEventId: number
    lastProcessedVersion: number
    updatedAt: number
    _all: number
  }


  export type ProjectionSalesSummaryAvgAggregateInputType = {
    totalOrders?: true
    totalRevenue?: true
    totalRefunds?: true
    lastProcessedVersion?: true
  }

  export type ProjectionSalesSummarySumAggregateInputType = {
    totalOrders?: true
    totalRevenue?: true
    totalRefunds?: true
    lastProcessedVersion?: true
  }

  export type ProjectionSalesSummaryMinAggregateInputType = {
    id?: true
    tenantId?: true
    periodDate?: true
    totalOrders?: true
    totalRevenue?: true
    totalRefunds?: true
    lastProcessedEventId?: true
    lastProcessedVersion?: true
    updatedAt?: true
  }

  export type ProjectionSalesSummaryMaxAggregateInputType = {
    id?: true
    tenantId?: true
    periodDate?: true
    totalOrders?: true
    totalRevenue?: true
    totalRefunds?: true
    lastProcessedEventId?: true
    lastProcessedVersion?: true
    updatedAt?: true
  }

  export type ProjectionSalesSummaryCountAggregateInputType = {
    id?: true
    tenantId?: true
    periodDate?: true
    totalOrders?: true
    totalRevenue?: true
    totalRefunds?: true
    lastProcessedEventId?: true
    lastProcessedVersion?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectionSalesSummaryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectionSalesSummary to aggregate.
     */
    where?: ProjectionSalesSummaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectionSalesSummaries to fetch.
     */
    orderBy?: ProjectionSalesSummaryOrderByWithRelationInput | ProjectionSalesSummaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectionSalesSummaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectionSalesSummaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectionSalesSummaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectionSalesSummaries
    **/
    _count?: true | ProjectionSalesSummaryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectionSalesSummaryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectionSalesSummarySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectionSalesSummaryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectionSalesSummaryMaxAggregateInputType
  }

  export type GetProjectionSalesSummaryAggregateType<T extends ProjectionSalesSummaryAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectionSalesSummary]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectionSalesSummary[P]>
      : GetScalarType<T[P], AggregateProjectionSalesSummary[P]>
  }




  export type ProjectionSalesSummaryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectionSalesSummaryWhereInput
    orderBy?: ProjectionSalesSummaryOrderByWithAggregationInput | ProjectionSalesSummaryOrderByWithAggregationInput[]
    by: ProjectionSalesSummaryScalarFieldEnum[] | ProjectionSalesSummaryScalarFieldEnum
    having?: ProjectionSalesSummaryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectionSalesSummaryCountAggregateInputType | true
    _avg?: ProjectionSalesSummaryAvgAggregateInputType
    _sum?: ProjectionSalesSummarySumAggregateInputType
    _min?: ProjectionSalesSummaryMinAggregateInputType
    _max?: ProjectionSalesSummaryMaxAggregateInputType
  }

  export type ProjectionSalesSummaryGroupByOutputType = {
    id: string
    tenantId: string
    periodDate: Date
    totalOrders: number
    totalRevenue: Decimal
    totalRefunds: Decimal
    lastProcessedEventId: string
    lastProcessedVersion: number
    updatedAt: Date
    _count: ProjectionSalesSummaryCountAggregateOutputType | null
    _avg: ProjectionSalesSummaryAvgAggregateOutputType | null
    _sum: ProjectionSalesSummarySumAggregateOutputType | null
    _min: ProjectionSalesSummaryMinAggregateOutputType | null
    _max: ProjectionSalesSummaryMaxAggregateOutputType | null
  }

  type GetProjectionSalesSummaryGroupByPayload<T extends ProjectionSalesSummaryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectionSalesSummaryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectionSalesSummaryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectionSalesSummaryGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectionSalesSummaryGroupByOutputType[P]>
        }
      >
    >


  export type ProjectionSalesSummarySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    periodDate?: boolean
    totalOrders?: boolean
    totalRevenue?: boolean
    totalRefunds?: boolean
    lastProcessedEventId?: boolean
    lastProcessedVersion?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["projectionSalesSummary"]>

  export type ProjectionSalesSummarySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    periodDate?: boolean
    totalOrders?: boolean
    totalRevenue?: boolean
    totalRefunds?: boolean
    lastProcessedEventId?: boolean
    lastProcessedVersion?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["projectionSalesSummary"]>

  export type ProjectionSalesSummarySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    periodDate?: boolean
    totalOrders?: boolean
    totalRevenue?: boolean
    totalRefunds?: boolean
    lastProcessedEventId?: boolean
    lastProcessedVersion?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["projectionSalesSummary"]>

  export type ProjectionSalesSummarySelectScalar = {
    id?: boolean
    tenantId?: boolean
    periodDate?: boolean
    totalOrders?: boolean
    totalRevenue?: boolean
    totalRefunds?: boolean
    lastProcessedEventId?: boolean
    lastProcessedVersion?: boolean
    updatedAt?: boolean
  }

  export type ProjectionSalesSummaryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "periodDate" | "totalOrders" | "totalRevenue" | "totalRefunds" | "lastProcessedEventId" | "lastProcessedVersion" | "updatedAt", ExtArgs["result"]["projectionSalesSummary"]>

  export type $ProjectionSalesSummaryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectionSalesSummary"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      periodDate: Date
      totalOrders: number
      totalRevenue: Prisma.Decimal
      totalRefunds: Prisma.Decimal
      lastProcessedEventId: string
      lastProcessedVersion: number
      updatedAt: Date
    }, ExtArgs["result"]["projectionSalesSummary"]>
    composites: {}
  }

  type ProjectionSalesSummaryGetPayload<S extends boolean | null | undefined | ProjectionSalesSummaryDefaultArgs> = $Result.GetResult<Prisma.$ProjectionSalesSummaryPayload, S>

  type ProjectionSalesSummaryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectionSalesSummaryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectionSalesSummaryCountAggregateInputType | true
    }

  export interface ProjectionSalesSummaryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectionSalesSummary'], meta: { name: 'ProjectionSalesSummary' } }
    /**
     * Find zero or one ProjectionSalesSummary that matches the filter.
     * @param {ProjectionSalesSummaryFindUniqueArgs} args - Arguments to find a ProjectionSalesSummary
     * @example
     * // Get one ProjectionSalesSummary
     * const projectionSalesSummary = await prisma.projectionSalesSummary.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectionSalesSummaryFindUniqueArgs>(args: SelectSubset<T, ProjectionSalesSummaryFindUniqueArgs<ExtArgs>>): Prisma__ProjectionSalesSummaryClient<$Result.GetResult<Prisma.$ProjectionSalesSummaryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProjectionSalesSummary that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectionSalesSummaryFindUniqueOrThrowArgs} args - Arguments to find a ProjectionSalesSummary
     * @example
     * // Get one ProjectionSalesSummary
     * const projectionSalesSummary = await prisma.projectionSalesSummary.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectionSalesSummaryFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectionSalesSummaryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectionSalesSummaryClient<$Result.GetResult<Prisma.$ProjectionSalesSummaryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectionSalesSummary that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectionSalesSummaryFindFirstArgs} args - Arguments to find a ProjectionSalesSummary
     * @example
     * // Get one ProjectionSalesSummary
     * const projectionSalesSummary = await prisma.projectionSalesSummary.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectionSalesSummaryFindFirstArgs>(args?: SelectSubset<T, ProjectionSalesSummaryFindFirstArgs<ExtArgs>>): Prisma__ProjectionSalesSummaryClient<$Result.GetResult<Prisma.$ProjectionSalesSummaryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectionSalesSummary that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectionSalesSummaryFindFirstOrThrowArgs} args - Arguments to find a ProjectionSalesSummary
     * @example
     * // Get one ProjectionSalesSummary
     * const projectionSalesSummary = await prisma.projectionSalesSummary.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectionSalesSummaryFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectionSalesSummaryFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectionSalesSummaryClient<$Result.GetResult<Prisma.$ProjectionSalesSummaryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProjectionSalesSummaries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectionSalesSummaryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectionSalesSummaries
     * const projectionSalesSummaries = await prisma.projectionSalesSummary.findMany()
     * 
     * // Get first 10 ProjectionSalesSummaries
     * const projectionSalesSummaries = await prisma.projectionSalesSummary.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectionSalesSummaryWithIdOnly = await prisma.projectionSalesSummary.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectionSalesSummaryFindManyArgs>(args?: SelectSubset<T, ProjectionSalesSummaryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectionSalesSummaryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProjectionSalesSummary.
     * @param {ProjectionSalesSummaryCreateArgs} args - Arguments to create a ProjectionSalesSummary.
     * @example
     * // Create one ProjectionSalesSummary
     * const ProjectionSalesSummary = await prisma.projectionSalesSummary.create({
     *   data: {
     *     // ... data to create a ProjectionSalesSummary
     *   }
     * })
     * 
     */
    create<T extends ProjectionSalesSummaryCreateArgs>(args: SelectSubset<T, ProjectionSalesSummaryCreateArgs<ExtArgs>>): Prisma__ProjectionSalesSummaryClient<$Result.GetResult<Prisma.$ProjectionSalesSummaryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProjectionSalesSummaries.
     * @param {ProjectionSalesSummaryCreateManyArgs} args - Arguments to create many ProjectionSalesSummaries.
     * @example
     * // Create many ProjectionSalesSummaries
     * const projectionSalesSummary = await prisma.projectionSalesSummary.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectionSalesSummaryCreateManyArgs>(args?: SelectSubset<T, ProjectionSalesSummaryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProjectionSalesSummaries and returns the data saved in the database.
     * @param {ProjectionSalesSummaryCreateManyAndReturnArgs} args - Arguments to create many ProjectionSalesSummaries.
     * @example
     * // Create many ProjectionSalesSummaries
     * const projectionSalesSummary = await prisma.projectionSalesSummary.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProjectionSalesSummaries and only return the `id`
     * const projectionSalesSummaryWithIdOnly = await prisma.projectionSalesSummary.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectionSalesSummaryCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectionSalesSummaryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectionSalesSummaryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProjectionSalesSummary.
     * @param {ProjectionSalesSummaryDeleteArgs} args - Arguments to delete one ProjectionSalesSummary.
     * @example
     * // Delete one ProjectionSalesSummary
     * const ProjectionSalesSummary = await prisma.projectionSalesSummary.delete({
     *   where: {
     *     // ... filter to delete one ProjectionSalesSummary
     *   }
     * })
     * 
     */
    delete<T extends ProjectionSalesSummaryDeleteArgs>(args: SelectSubset<T, ProjectionSalesSummaryDeleteArgs<ExtArgs>>): Prisma__ProjectionSalesSummaryClient<$Result.GetResult<Prisma.$ProjectionSalesSummaryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProjectionSalesSummary.
     * @param {ProjectionSalesSummaryUpdateArgs} args - Arguments to update one ProjectionSalesSummary.
     * @example
     * // Update one ProjectionSalesSummary
     * const projectionSalesSummary = await prisma.projectionSalesSummary.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectionSalesSummaryUpdateArgs>(args: SelectSubset<T, ProjectionSalesSummaryUpdateArgs<ExtArgs>>): Prisma__ProjectionSalesSummaryClient<$Result.GetResult<Prisma.$ProjectionSalesSummaryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProjectionSalesSummaries.
     * @param {ProjectionSalesSummaryDeleteManyArgs} args - Arguments to filter ProjectionSalesSummaries to delete.
     * @example
     * // Delete a few ProjectionSalesSummaries
     * const { count } = await prisma.projectionSalesSummary.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectionSalesSummaryDeleteManyArgs>(args?: SelectSubset<T, ProjectionSalesSummaryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectionSalesSummaries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectionSalesSummaryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectionSalesSummaries
     * const projectionSalesSummary = await prisma.projectionSalesSummary.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectionSalesSummaryUpdateManyArgs>(args: SelectSubset<T, ProjectionSalesSummaryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectionSalesSummaries and returns the data updated in the database.
     * @param {ProjectionSalesSummaryUpdateManyAndReturnArgs} args - Arguments to update many ProjectionSalesSummaries.
     * @example
     * // Update many ProjectionSalesSummaries
     * const projectionSalesSummary = await prisma.projectionSalesSummary.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProjectionSalesSummaries and only return the `id`
     * const projectionSalesSummaryWithIdOnly = await prisma.projectionSalesSummary.updateManyAndReturn({
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
    updateManyAndReturn<T extends ProjectionSalesSummaryUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectionSalesSummaryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectionSalesSummaryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProjectionSalesSummary.
     * @param {ProjectionSalesSummaryUpsertArgs} args - Arguments to update or create a ProjectionSalesSummary.
     * @example
     * // Update or create a ProjectionSalesSummary
     * const projectionSalesSummary = await prisma.projectionSalesSummary.upsert({
     *   create: {
     *     // ... data to create a ProjectionSalesSummary
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectionSalesSummary we want to update
     *   }
     * })
     */
    upsert<T extends ProjectionSalesSummaryUpsertArgs>(args: SelectSubset<T, ProjectionSalesSummaryUpsertArgs<ExtArgs>>): Prisma__ProjectionSalesSummaryClient<$Result.GetResult<Prisma.$ProjectionSalesSummaryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProjectionSalesSummaries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectionSalesSummaryCountArgs} args - Arguments to filter ProjectionSalesSummaries to count.
     * @example
     * // Count the number of ProjectionSalesSummaries
     * const count = await prisma.projectionSalesSummary.count({
     *   where: {
     *     // ... the filter for the ProjectionSalesSummaries we want to count
     *   }
     * })
    **/
    count<T extends ProjectionSalesSummaryCountArgs>(
      args?: Subset<T, ProjectionSalesSummaryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectionSalesSummaryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectionSalesSummary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectionSalesSummaryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProjectionSalesSummaryAggregateArgs>(args: Subset<T, ProjectionSalesSummaryAggregateArgs>): Prisma.PrismaPromise<GetProjectionSalesSummaryAggregateType<T>>

    /**
     * Group by ProjectionSalesSummary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectionSalesSummaryGroupByArgs} args - Group by arguments.
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
      T extends ProjectionSalesSummaryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectionSalesSummaryGroupByArgs['orderBy'] }
        : { orderBy?: ProjectionSalesSummaryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProjectionSalesSummaryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectionSalesSummaryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectionSalesSummary model
   */
  readonly fields: ProjectionSalesSummaryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectionSalesSummary.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectionSalesSummaryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ProjectionSalesSummary model
   */
  interface ProjectionSalesSummaryFieldRefs {
    readonly id: FieldRef<"ProjectionSalesSummary", 'String'>
    readonly tenantId: FieldRef<"ProjectionSalesSummary", 'String'>
    readonly periodDate: FieldRef<"ProjectionSalesSummary", 'DateTime'>
    readonly totalOrders: FieldRef<"ProjectionSalesSummary", 'Int'>
    readonly totalRevenue: FieldRef<"ProjectionSalesSummary", 'Decimal'>
    readonly totalRefunds: FieldRef<"ProjectionSalesSummary", 'Decimal'>
    readonly lastProcessedEventId: FieldRef<"ProjectionSalesSummary", 'String'>
    readonly lastProcessedVersion: FieldRef<"ProjectionSalesSummary", 'Int'>
    readonly updatedAt: FieldRef<"ProjectionSalesSummary", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProjectionSalesSummary findUnique
   */
  export type ProjectionSalesSummaryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectionSalesSummary
     */
    select?: ProjectionSalesSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectionSalesSummary
     */
    omit?: ProjectionSalesSummaryOmit<ExtArgs> | null
    /**
     * Filter, which ProjectionSalesSummary to fetch.
     */
    where: ProjectionSalesSummaryWhereUniqueInput
  }

  /**
   * ProjectionSalesSummary findUniqueOrThrow
   */
  export type ProjectionSalesSummaryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectionSalesSummary
     */
    select?: ProjectionSalesSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectionSalesSummary
     */
    omit?: ProjectionSalesSummaryOmit<ExtArgs> | null
    /**
     * Filter, which ProjectionSalesSummary to fetch.
     */
    where: ProjectionSalesSummaryWhereUniqueInput
  }

  /**
   * ProjectionSalesSummary findFirst
   */
  export type ProjectionSalesSummaryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectionSalesSummary
     */
    select?: ProjectionSalesSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectionSalesSummary
     */
    omit?: ProjectionSalesSummaryOmit<ExtArgs> | null
    /**
     * Filter, which ProjectionSalesSummary to fetch.
     */
    where?: ProjectionSalesSummaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectionSalesSummaries to fetch.
     */
    orderBy?: ProjectionSalesSummaryOrderByWithRelationInput | ProjectionSalesSummaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectionSalesSummaries.
     */
    cursor?: ProjectionSalesSummaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectionSalesSummaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectionSalesSummaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectionSalesSummaries.
     */
    distinct?: ProjectionSalesSummaryScalarFieldEnum | ProjectionSalesSummaryScalarFieldEnum[]
  }

  /**
   * ProjectionSalesSummary findFirstOrThrow
   */
  export type ProjectionSalesSummaryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectionSalesSummary
     */
    select?: ProjectionSalesSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectionSalesSummary
     */
    omit?: ProjectionSalesSummaryOmit<ExtArgs> | null
    /**
     * Filter, which ProjectionSalesSummary to fetch.
     */
    where?: ProjectionSalesSummaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectionSalesSummaries to fetch.
     */
    orderBy?: ProjectionSalesSummaryOrderByWithRelationInput | ProjectionSalesSummaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectionSalesSummaries.
     */
    cursor?: ProjectionSalesSummaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectionSalesSummaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectionSalesSummaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectionSalesSummaries.
     */
    distinct?: ProjectionSalesSummaryScalarFieldEnum | ProjectionSalesSummaryScalarFieldEnum[]
  }

  /**
   * ProjectionSalesSummary findMany
   */
  export type ProjectionSalesSummaryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectionSalesSummary
     */
    select?: ProjectionSalesSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectionSalesSummary
     */
    omit?: ProjectionSalesSummaryOmit<ExtArgs> | null
    /**
     * Filter, which ProjectionSalesSummaries to fetch.
     */
    where?: ProjectionSalesSummaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectionSalesSummaries to fetch.
     */
    orderBy?: ProjectionSalesSummaryOrderByWithRelationInput | ProjectionSalesSummaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectionSalesSummaries.
     */
    cursor?: ProjectionSalesSummaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectionSalesSummaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectionSalesSummaries.
     */
    skip?: number
    distinct?: ProjectionSalesSummaryScalarFieldEnum | ProjectionSalesSummaryScalarFieldEnum[]
  }

  /**
   * ProjectionSalesSummary create
   */
  export type ProjectionSalesSummaryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectionSalesSummary
     */
    select?: ProjectionSalesSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectionSalesSummary
     */
    omit?: ProjectionSalesSummaryOmit<ExtArgs> | null
    /**
     * The data needed to create a ProjectionSalesSummary.
     */
    data: XOR<ProjectionSalesSummaryCreateInput, ProjectionSalesSummaryUncheckedCreateInput>
  }

  /**
   * ProjectionSalesSummary createMany
   */
  export type ProjectionSalesSummaryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectionSalesSummaries.
     */
    data: ProjectionSalesSummaryCreateManyInput | ProjectionSalesSummaryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProjectionSalesSummary createManyAndReturn
   */
  export type ProjectionSalesSummaryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectionSalesSummary
     */
    select?: ProjectionSalesSummarySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectionSalesSummary
     */
    omit?: ProjectionSalesSummaryOmit<ExtArgs> | null
    /**
     * The data used to create many ProjectionSalesSummaries.
     */
    data: ProjectionSalesSummaryCreateManyInput | ProjectionSalesSummaryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProjectionSalesSummary update
   */
  export type ProjectionSalesSummaryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectionSalesSummary
     */
    select?: ProjectionSalesSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectionSalesSummary
     */
    omit?: ProjectionSalesSummaryOmit<ExtArgs> | null
    /**
     * The data needed to update a ProjectionSalesSummary.
     */
    data: XOR<ProjectionSalesSummaryUpdateInput, ProjectionSalesSummaryUncheckedUpdateInput>
    /**
     * Choose, which ProjectionSalesSummary to update.
     */
    where: ProjectionSalesSummaryWhereUniqueInput
  }

  /**
   * ProjectionSalesSummary updateMany
   */
  export type ProjectionSalesSummaryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectionSalesSummaries.
     */
    data: XOR<ProjectionSalesSummaryUpdateManyMutationInput, ProjectionSalesSummaryUncheckedUpdateManyInput>
    /**
     * Filter which ProjectionSalesSummaries to update
     */
    where?: ProjectionSalesSummaryWhereInput
    /**
     * Limit how many ProjectionSalesSummaries to update.
     */
    limit?: number
  }

  /**
   * ProjectionSalesSummary updateManyAndReturn
   */
  export type ProjectionSalesSummaryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectionSalesSummary
     */
    select?: ProjectionSalesSummarySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectionSalesSummary
     */
    omit?: ProjectionSalesSummaryOmit<ExtArgs> | null
    /**
     * The data used to update ProjectionSalesSummaries.
     */
    data: XOR<ProjectionSalesSummaryUpdateManyMutationInput, ProjectionSalesSummaryUncheckedUpdateManyInput>
    /**
     * Filter which ProjectionSalesSummaries to update
     */
    where?: ProjectionSalesSummaryWhereInput
    /**
     * Limit how many ProjectionSalesSummaries to update.
     */
    limit?: number
  }

  /**
   * ProjectionSalesSummary upsert
   */
  export type ProjectionSalesSummaryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectionSalesSummary
     */
    select?: ProjectionSalesSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectionSalesSummary
     */
    omit?: ProjectionSalesSummaryOmit<ExtArgs> | null
    /**
     * The filter to search for the ProjectionSalesSummary to update in case it exists.
     */
    where: ProjectionSalesSummaryWhereUniqueInput
    /**
     * In case the ProjectionSalesSummary found by the `where` argument doesn't exist, create a new ProjectionSalesSummary with this data.
     */
    create: XOR<ProjectionSalesSummaryCreateInput, ProjectionSalesSummaryUncheckedCreateInput>
    /**
     * In case the ProjectionSalesSummary was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectionSalesSummaryUpdateInput, ProjectionSalesSummaryUncheckedUpdateInput>
  }

  /**
   * ProjectionSalesSummary delete
   */
  export type ProjectionSalesSummaryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectionSalesSummary
     */
    select?: ProjectionSalesSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectionSalesSummary
     */
    omit?: ProjectionSalesSummaryOmit<ExtArgs> | null
    /**
     * Filter which ProjectionSalesSummary to delete.
     */
    where: ProjectionSalesSummaryWhereUniqueInput
  }

  /**
   * ProjectionSalesSummary deleteMany
   */
  export type ProjectionSalesSummaryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectionSalesSummaries to delete
     */
    where?: ProjectionSalesSummaryWhereInput
    /**
     * Limit how many ProjectionSalesSummaries to delete.
     */
    limit?: number
  }

  /**
   * ProjectionSalesSummary without action
   */
  export type ProjectionSalesSummaryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectionSalesSummary
     */
    select?: ProjectionSalesSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectionSalesSummary
     */
    omit?: ProjectionSalesSummaryOmit<ExtArgs> | null
  }


  /**
   * Model MetricSnapshot
   */

  export type AggregateMetricSnapshot = {
    _count: MetricSnapshotCountAggregateOutputType | null
    _avg: MetricSnapshotAvgAggregateOutputType | null
    _sum: MetricSnapshotSumAggregateOutputType | null
    _min: MetricSnapshotMinAggregateOutputType | null
    _max: MetricSnapshotMaxAggregateOutputType | null
  }

  export type MetricSnapshotAvgAggregateOutputType = {
    value: Decimal | null
  }

  export type MetricSnapshotSumAggregateOutputType = {
    value: Decimal | null
  }

  export type MetricSnapshotMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    metricCode: string | null
    snapshotDate: Date | null
    value: Decimal | null
  }

  export type MetricSnapshotMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    metricCode: string | null
    snapshotDate: Date | null
    value: Decimal | null
  }

  export type MetricSnapshotCountAggregateOutputType = {
    id: number
    tenantId: number
    metricCode: number
    snapshotDate: number
    value: number
    metadata: number
    _all: number
  }


  export type MetricSnapshotAvgAggregateInputType = {
    value?: true
  }

  export type MetricSnapshotSumAggregateInputType = {
    value?: true
  }

  export type MetricSnapshotMinAggregateInputType = {
    id?: true
    tenantId?: true
    metricCode?: true
    snapshotDate?: true
    value?: true
  }

  export type MetricSnapshotMaxAggregateInputType = {
    id?: true
    tenantId?: true
    metricCode?: true
    snapshotDate?: true
    value?: true
  }

  export type MetricSnapshotCountAggregateInputType = {
    id?: true
    tenantId?: true
    metricCode?: true
    snapshotDate?: true
    value?: true
    metadata?: true
    _all?: true
  }

  export type MetricSnapshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MetricSnapshot to aggregate.
     */
    where?: MetricSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetricSnapshots to fetch.
     */
    orderBy?: MetricSnapshotOrderByWithRelationInput | MetricSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MetricSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetricSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetricSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MetricSnapshots
    **/
    _count?: true | MetricSnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MetricSnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MetricSnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MetricSnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MetricSnapshotMaxAggregateInputType
  }

  export type GetMetricSnapshotAggregateType<T extends MetricSnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregateMetricSnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMetricSnapshot[P]>
      : GetScalarType<T[P], AggregateMetricSnapshot[P]>
  }




  export type MetricSnapshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MetricSnapshotWhereInput
    orderBy?: MetricSnapshotOrderByWithAggregationInput | MetricSnapshotOrderByWithAggregationInput[]
    by: MetricSnapshotScalarFieldEnum[] | MetricSnapshotScalarFieldEnum
    having?: MetricSnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MetricSnapshotCountAggregateInputType | true
    _avg?: MetricSnapshotAvgAggregateInputType
    _sum?: MetricSnapshotSumAggregateInputType
    _min?: MetricSnapshotMinAggregateInputType
    _max?: MetricSnapshotMaxAggregateInputType
  }

  export type MetricSnapshotGroupByOutputType = {
    id: string
    tenantId: string
    metricCode: string
    snapshotDate: Date
    value: Decimal
    metadata: JsonValue | null
    _count: MetricSnapshotCountAggregateOutputType | null
    _avg: MetricSnapshotAvgAggregateOutputType | null
    _sum: MetricSnapshotSumAggregateOutputType | null
    _min: MetricSnapshotMinAggregateOutputType | null
    _max: MetricSnapshotMaxAggregateOutputType | null
  }

  type GetMetricSnapshotGroupByPayload<T extends MetricSnapshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MetricSnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MetricSnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MetricSnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], MetricSnapshotGroupByOutputType[P]>
        }
      >
    >


  export type MetricSnapshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    metricCode?: boolean
    snapshotDate?: boolean
    value?: boolean
    metadata?: boolean
  }, ExtArgs["result"]["metricSnapshot"]>

  export type MetricSnapshotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    metricCode?: boolean
    snapshotDate?: boolean
    value?: boolean
    metadata?: boolean
  }, ExtArgs["result"]["metricSnapshot"]>

  export type MetricSnapshotSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    metricCode?: boolean
    snapshotDate?: boolean
    value?: boolean
    metadata?: boolean
  }, ExtArgs["result"]["metricSnapshot"]>

  export type MetricSnapshotSelectScalar = {
    id?: boolean
    tenantId?: boolean
    metricCode?: boolean
    snapshotDate?: boolean
    value?: boolean
    metadata?: boolean
  }

  export type MetricSnapshotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "metricCode" | "snapshotDate" | "value" | "metadata", ExtArgs["result"]["metricSnapshot"]>

  export type $MetricSnapshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MetricSnapshot"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      metricCode: string
      snapshotDate: Date
      value: Prisma.Decimal
      metadata: Prisma.JsonValue | null
    }, ExtArgs["result"]["metricSnapshot"]>
    composites: {}
  }

  type MetricSnapshotGetPayload<S extends boolean | null | undefined | MetricSnapshotDefaultArgs> = $Result.GetResult<Prisma.$MetricSnapshotPayload, S>

  type MetricSnapshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MetricSnapshotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MetricSnapshotCountAggregateInputType | true
    }

  export interface MetricSnapshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MetricSnapshot'], meta: { name: 'MetricSnapshot' } }
    /**
     * Find zero or one MetricSnapshot that matches the filter.
     * @param {MetricSnapshotFindUniqueArgs} args - Arguments to find a MetricSnapshot
     * @example
     * // Get one MetricSnapshot
     * const metricSnapshot = await prisma.metricSnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MetricSnapshotFindUniqueArgs>(args: SelectSubset<T, MetricSnapshotFindUniqueArgs<ExtArgs>>): Prisma__MetricSnapshotClient<$Result.GetResult<Prisma.$MetricSnapshotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MetricSnapshot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MetricSnapshotFindUniqueOrThrowArgs} args - Arguments to find a MetricSnapshot
     * @example
     * // Get one MetricSnapshot
     * const metricSnapshot = await prisma.metricSnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MetricSnapshotFindUniqueOrThrowArgs>(args: SelectSubset<T, MetricSnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MetricSnapshotClient<$Result.GetResult<Prisma.$MetricSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MetricSnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetricSnapshotFindFirstArgs} args - Arguments to find a MetricSnapshot
     * @example
     * // Get one MetricSnapshot
     * const metricSnapshot = await prisma.metricSnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MetricSnapshotFindFirstArgs>(args?: SelectSubset<T, MetricSnapshotFindFirstArgs<ExtArgs>>): Prisma__MetricSnapshotClient<$Result.GetResult<Prisma.$MetricSnapshotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MetricSnapshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetricSnapshotFindFirstOrThrowArgs} args - Arguments to find a MetricSnapshot
     * @example
     * // Get one MetricSnapshot
     * const metricSnapshot = await prisma.metricSnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MetricSnapshotFindFirstOrThrowArgs>(args?: SelectSubset<T, MetricSnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma__MetricSnapshotClient<$Result.GetResult<Prisma.$MetricSnapshotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MetricSnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetricSnapshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MetricSnapshots
     * const metricSnapshots = await prisma.metricSnapshot.findMany()
     * 
     * // Get first 10 MetricSnapshots
     * const metricSnapshots = await prisma.metricSnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const metricSnapshotWithIdOnly = await prisma.metricSnapshot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MetricSnapshotFindManyArgs>(args?: SelectSubset<T, MetricSnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetricSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MetricSnapshot.
     * @param {MetricSnapshotCreateArgs} args - Arguments to create a MetricSnapshot.
     * @example
     * // Create one MetricSnapshot
     * const MetricSnapshot = await prisma.metricSnapshot.create({
     *   data: {
     *     // ... data to create a MetricSnapshot
     *   }
     * })
     * 
     */
    create<T extends MetricSnapshotCreateArgs>(args: SelectSubset<T, MetricSnapshotCreateArgs<ExtArgs>>): Prisma__MetricSnapshotClient<$Result.GetResult<Prisma.$MetricSnapshotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MetricSnapshots.
     * @param {MetricSnapshotCreateManyArgs} args - Arguments to create many MetricSnapshots.
     * @example
     * // Create many MetricSnapshots
     * const metricSnapshot = await prisma.metricSnapshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MetricSnapshotCreateManyArgs>(args?: SelectSubset<T, MetricSnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MetricSnapshots and returns the data saved in the database.
     * @param {MetricSnapshotCreateManyAndReturnArgs} args - Arguments to create many MetricSnapshots.
     * @example
     * // Create many MetricSnapshots
     * const metricSnapshot = await prisma.metricSnapshot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MetricSnapshots and only return the `id`
     * const metricSnapshotWithIdOnly = await prisma.metricSnapshot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MetricSnapshotCreateManyAndReturnArgs>(args?: SelectSubset<T, MetricSnapshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetricSnapshotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MetricSnapshot.
     * @param {MetricSnapshotDeleteArgs} args - Arguments to delete one MetricSnapshot.
     * @example
     * // Delete one MetricSnapshot
     * const MetricSnapshot = await prisma.metricSnapshot.delete({
     *   where: {
     *     // ... filter to delete one MetricSnapshot
     *   }
     * })
     * 
     */
    delete<T extends MetricSnapshotDeleteArgs>(args: SelectSubset<T, MetricSnapshotDeleteArgs<ExtArgs>>): Prisma__MetricSnapshotClient<$Result.GetResult<Prisma.$MetricSnapshotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MetricSnapshot.
     * @param {MetricSnapshotUpdateArgs} args - Arguments to update one MetricSnapshot.
     * @example
     * // Update one MetricSnapshot
     * const metricSnapshot = await prisma.metricSnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MetricSnapshotUpdateArgs>(args: SelectSubset<T, MetricSnapshotUpdateArgs<ExtArgs>>): Prisma__MetricSnapshotClient<$Result.GetResult<Prisma.$MetricSnapshotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MetricSnapshots.
     * @param {MetricSnapshotDeleteManyArgs} args - Arguments to filter MetricSnapshots to delete.
     * @example
     * // Delete a few MetricSnapshots
     * const { count } = await prisma.metricSnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MetricSnapshotDeleteManyArgs>(args?: SelectSubset<T, MetricSnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MetricSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetricSnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MetricSnapshots
     * const metricSnapshot = await prisma.metricSnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MetricSnapshotUpdateManyArgs>(args: SelectSubset<T, MetricSnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MetricSnapshots and returns the data updated in the database.
     * @param {MetricSnapshotUpdateManyAndReturnArgs} args - Arguments to update many MetricSnapshots.
     * @example
     * // Update many MetricSnapshots
     * const metricSnapshot = await prisma.metricSnapshot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MetricSnapshots and only return the `id`
     * const metricSnapshotWithIdOnly = await prisma.metricSnapshot.updateManyAndReturn({
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
    updateManyAndReturn<T extends MetricSnapshotUpdateManyAndReturnArgs>(args: SelectSubset<T, MetricSnapshotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetricSnapshotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MetricSnapshot.
     * @param {MetricSnapshotUpsertArgs} args - Arguments to update or create a MetricSnapshot.
     * @example
     * // Update or create a MetricSnapshot
     * const metricSnapshot = await prisma.metricSnapshot.upsert({
     *   create: {
     *     // ... data to create a MetricSnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MetricSnapshot we want to update
     *   }
     * })
     */
    upsert<T extends MetricSnapshotUpsertArgs>(args: SelectSubset<T, MetricSnapshotUpsertArgs<ExtArgs>>): Prisma__MetricSnapshotClient<$Result.GetResult<Prisma.$MetricSnapshotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MetricSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetricSnapshotCountArgs} args - Arguments to filter MetricSnapshots to count.
     * @example
     * // Count the number of MetricSnapshots
     * const count = await prisma.metricSnapshot.count({
     *   where: {
     *     // ... the filter for the MetricSnapshots we want to count
     *   }
     * })
    **/
    count<T extends MetricSnapshotCountArgs>(
      args?: Subset<T, MetricSnapshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MetricSnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MetricSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetricSnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MetricSnapshotAggregateArgs>(args: Subset<T, MetricSnapshotAggregateArgs>): Prisma.PrismaPromise<GetMetricSnapshotAggregateType<T>>

    /**
     * Group by MetricSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetricSnapshotGroupByArgs} args - Group by arguments.
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
      T extends MetricSnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MetricSnapshotGroupByArgs['orderBy'] }
        : { orderBy?: MetricSnapshotGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MetricSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMetricSnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MetricSnapshot model
   */
  readonly fields: MetricSnapshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MetricSnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MetricSnapshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the MetricSnapshot model
   */
  interface MetricSnapshotFieldRefs {
    readonly id: FieldRef<"MetricSnapshot", 'String'>
    readonly tenantId: FieldRef<"MetricSnapshot", 'String'>
    readonly metricCode: FieldRef<"MetricSnapshot", 'String'>
    readonly snapshotDate: FieldRef<"MetricSnapshot", 'DateTime'>
    readonly value: FieldRef<"MetricSnapshot", 'Decimal'>
    readonly metadata: FieldRef<"MetricSnapshot", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * MetricSnapshot findUnique
   */
  export type MetricSnapshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSnapshot
     */
    select?: MetricSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetricSnapshot
     */
    omit?: MetricSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which MetricSnapshot to fetch.
     */
    where: MetricSnapshotWhereUniqueInput
  }

  /**
   * MetricSnapshot findUniqueOrThrow
   */
  export type MetricSnapshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSnapshot
     */
    select?: MetricSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetricSnapshot
     */
    omit?: MetricSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which MetricSnapshot to fetch.
     */
    where: MetricSnapshotWhereUniqueInput
  }

  /**
   * MetricSnapshot findFirst
   */
  export type MetricSnapshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSnapshot
     */
    select?: MetricSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetricSnapshot
     */
    omit?: MetricSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which MetricSnapshot to fetch.
     */
    where?: MetricSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetricSnapshots to fetch.
     */
    orderBy?: MetricSnapshotOrderByWithRelationInput | MetricSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MetricSnapshots.
     */
    cursor?: MetricSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetricSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetricSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MetricSnapshots.
     */
    distinct?: MetricSnapshotScalarFieldEnum | MetricSnapshotScalarFieldEnum[]
  }

  /**
   * MetricSnapshot findFirstOrThrow
   */
  export type MetricSnapshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSnapshot
     */
    select?: MetricSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetricSnapshot
     */
    omit?: MetricSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which MetricSnapshot to fetch.
     */
    where?: MetricSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetricSnapshots to fetch.
     */
    orderBy?: MetricSnapshotOrderByWithRelationInput | MetricSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MetricSnapshots.
     */
    cursor?: MetricSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetricSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetricSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MetricSnapshots.
     */
    distinct?: MetricSnapshotScalarFieldEnum | MetricSnapshotScalarFieldEnum[]
  }

  /**
   * MetricSnapshot findMany
   */
  export type MetricSnapshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSnapshot
     */
    select?: MetricSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetricSnapshot
     */
    omit?: MetricSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which MetricSnapshots to fetch.
     */
    where?: MetricSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetricSnapshots to fetch.
     */
    orderBy?: MetricSnapshotOrderByWithRelationInput | MetricSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MetricSnapshots.
     */
    cursor?: MetricSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetricSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetricSnapshots.
     */
    skip?: number
    distinct?: MetricSnapshotScalarFieldEnum | MetricSnapshotScalarFieldEnum[]
  }

  /**
   * MetricSnapshot create
   */
  export type MetricSnapshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSnapshot
     */
    select?: MetricSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetricSnapshot
     */
    omit?: MetricSnapshotOmit<ExtArgs> | null
    /**
     * The data needed to create a MetricSnapshot.
     */
    data: XOR<MetricSnapshotCreateInput, MetricSnapshotUncheckedCreateInput>
  }

  /**
   * MetricSnapshot createMany
   */
  export type MetricSnapshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MetricSnapshots.
     */
    data: MetricSnapshotCreateManyInput | MetricSnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MetricSnapshot createManyAndReturn
   */
  export type MetricSnapshotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSnapshot
     */
    select?: MetricSnapshotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MetricSnapshot
     */
    omit?: MetricSnapshotOmit<ExtArgs> | null
    /**
     * The data used to create many MetricSnapshots.
     */
    data: MetricSnapshotCreateManyInput | MetricSnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MetricSnapshot update
   */
  export type MetricSnapshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSnapshot
     */
    select?: MetricSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetricSnapshot
     */
    omit?: MetricSnapshotOmit<ExtArgs> | null
    /**
     * The data needed to update a MetricSnapshot.
     */
    data: XOR<MetricSnapshotUpdateInput, MetricSnapshotUncheckedUpdateInput>
    /**
     * Choose, which MetricSnapshot to update.
     */
    where: MetricSnapshotWhereUniqueInput
  }

  /**
   * MetricSnapshot updateMany
   */
  export type MetricSnapshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MetricSnapshots.
     */
    data: XOR<MetricSnapshotUpdateManyMutationInput, MetricSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which MetricSnapshots to update
     */
    where?: MetricSnapshotWhereInput
    /**
     * Limit how many MetricSnapshots to update.
     */
    limit?: number
  }

  /**
   * MetricSnapshot updateManyAndReturn
   */
  export type MetricSnapshotUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSnapshot
     */
    select?: MetricSnapshotSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MetricSnapshot
     */
    omit?: MetricSnapshotOmit<ExtArgs> | null
    /**
     * The data used to update MetricSnapshots.
     */
    data: XOR<MetricSnapshotUpdateManyMutationInput, MetricSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which MetricSnapshots to update
     */
    where?: MetricSnapshotWhereInput
    /**
     * Limit how many MetricSnapshots to update.
     */
    limit?: number
  }

  /**
   * MetricSnapshot upsert
   */
  export type MetricSnapshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSnapshot
     */
    select?: MetricSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetricSnapshot
     */
    omit?: MetricSnapshotOmit<ExtArgs> | null
    /**
     * The filter to search for the MetricSnapshot to update in case it exists.
     */
    where: MetricSnapshotWhereUniqueInput
    /**
     * In case the MetricSnapshot found by the `where` argument doesn't exist, create a new MetricSnapshot with this data.
     */
    create: XOR<MetricSnapshotCreateInput, MetricSnapshotUncheckedCreateInput>
    /**
     * In case the MetricSnapshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MetricSnapshotUpdateInput, MetricSnapshotUncheckedUpdateInput>
  }

  /**
   * MetricSnapshot delete
   */
  export type MetricSnapshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSnapshot
     */
    select?: MetricSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetricSnapshot
     */
    omit?: MetricSnapshotOmit<ExtArgs> | null
    /**
     * Filter which MetricSnapshot to delete.
     */
    where: MetricSnapshotWhereUniqueInput
  }

  /**
   * MetricSnapshot deleteMany
   */
  export type MetricSnapshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MetricSnapshots to delete
     */
    where?: MetricSnapshotWhereInput
    /**
     * Limit how many MetricSnapshots to delete.
     */
    limit?: number
  }

  /**
   * MetricSnapshot without action
   */
  export type MetricSnapshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSnapshot
     */
    select?: MetricSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetricSnapshot
     */
    omit?: MetricSnapshotOmit<ExtArgs> | null
  }


  /**
   * Model RiskRule
   */

  export type AggregateRiskRule = {
    _count: RiskRuleCountAggregateOutputType | null
    _min: RiskRuleMinAggregateOutputType | null
    _max: RiskRuleMaxAggregateOutputType | null
  }

  export type RiskRuleMinAggregateOutputType = {
    id: string | null
    code: string | null
    nameFa: string | null
    algorithm: $Enums.RiskAlgorithm | null
    severity: $Enums.FindingSeverity | null
    moduleCode: string | null
    isActive: boolean | null
  }

  export type RiskRuleMaxAggregateOutputType = {
    id: string | null
    code: string | null
    nameFa: string | null
    algorithm: $Enums.RiskAlgorithm | null
    severity: $Enums.FindingSeverity | null
    moduleCode: string | null
    isActive: boolean | null
  }

  export type RiskRuleCountAggregateOutputType = {
    id: number
    code: number
    nameFa: number
    algorithm: number
    config: number
    severity: number
    moduleCode: number
    isActive: number
    _all: number
  }


  export type RiskRuleMinAggregateInputType = {
    id?: true
    code?: true
    nameFa?: true
    algorithm?: true
    severity?: true
    moduleCode?: true
    isActive?: true
  }

  export type RiskRuleMaxAggregateInputType = {
    id?: true
    code?: true
    nameFa?: true
    algorithm?: true
    severity?: true
    moduleCode?: true
    isActive?: true
  }

  export type RiskRuleCountAggregateInputType = {
    id?: true
    code?: true
    nameFa?: true
    algorithm?: true
    config?: true
    severity?: true
    moduleCode?: true
    isActive?: true
    _all?: true
  }

  export type RiskRuleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RiskRule to aggregate.
     */
    where?: RiskRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiskRules to fetch.
     */
    orderBy?: RiskRuleOrderByWithRelationInput | RiskRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RiskRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiskRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiskRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RiskRules
    **/
    _count?: true | RiskRuleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RiskRuleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RiskRuleMaxAggregateInputType
  }

  export type GetRiskRuleAggregateType<T extends RiskRuleAggregateArgs> = {
        [P in keyof T & keyof AggregateRiskRule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRiskRule[P]>
      : GetScalarType<T[P], AggregateRiskRule[P]>
  }




  export type RiskRuleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RiskRuleWhereInput
    orderBy?: RiskRuleOrderByWithAggregationInput | RiskRuleOrderByWithAggregationInput[]
    by: RiskRuleScalarFieldEnum[] | RiskRuleScalarFieldEnum
    having?: RiskRuleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RiskRuleCountAggregateInputType | true
    _min?: RiskRuleMinAggregateInputType
    _max?: RiskRuleMaxAggregateInputType
  }

  export type RiskRuleGroupByOutputType = {
    id: string
    code: string
    nameFa: string
    algorithm: $Enums.RiskAlgorithm
    config: JsonValue
    severity: $Enums.FindingSeverity
    moduleCode: string
    isActive: boolean
    _count: RiskRuleCountAggregateOutputType | null
    _min: RiskRuleMinAggregateOutputType | null
    _max: RiskRuleMaxAggregateOutputType | null
  }

  type GetRiskRuleGroupByPayload<T extends RiskRuleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RiskRuleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RiskRuleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RiskRuleGroupByOutputType[P]>
            : GetScalarType<T[P], RiskRuleGroupByOutputType[P]>
        }
      >
    >


  export type RiskRuleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    nameFa?: boolean
    algorithm?: boolean
    config?: boolean
    severity?: boolean
    moduleCode?: boolean
    isActive?: boolean
    tenantRules?: boolean | RiskRule$tenantRulesArgs<ExtArgs>
    findings?: boolean | RiskRule$findingsArgs<ExtArgs>
    _count?: boolean | RiskRuleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["riskRule"]>

  export type RiskRuleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    nameFa?: boolean
    algorithm?: boolean
    config?: boolean
    severity?: boolean
    moduleCode?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["riskRule"]>

  export type RiskRuleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    nameFa?: boolean
    algorithm?: boolean
    config?: boolean
    severity?: boolean
    moduleCode?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["riskRule"]>

  export type RiskRuleSelectScalar = {
    id?: boolean
    code?: boolean
    nameFa?: boolean
    algorithm?: boolean
    config?: boolean
    severity?: boolean
    moduleCode?: boolean
    isActive?: boolean
  }

  export type RiskRuleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "nameFa" | "algorithm" | "config" | "severity" | "moduleCode" | "isActive", ExtArgs["result"]["riskRule"]>
  export type RiskRuleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenantRules?: boolean | RiskRule$tenantRulesArgs<ExtArgs>
    findings?: boolean | RiskRule$findingsArgs<ExtArgs>
    _count?: boolean | RiskRuleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RiskRuleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RiskRuleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RiskRulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RiskRule"
    objects: {
      tenantRules: Prisma.$TenantRiskRulePayload<ExtArgs>[]
      findings: Prisma.$RiskFindingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      nameFa: string
      algorithm: $Enums.RiskAlgorithm
      config: Prisma.JsonValue
      severity: $Enums.FindingSeverity
      moduleCode: string
      isActive: boolean
    }, ExtArgs["result"]["riskRule"]>
    composites: {}
  }

  type RiskRuleGetPayload<S extends boolean | null | undefined | RiskRuleDefaultArgs> = $Result.GetResult<Prisma.$RiskRulePayload, S>

  type RiskRuleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RiskRuleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RiskRuleCountAggregateInputType | true
    }

  export interface RiskRuleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RiskRule'], meta: { name: 'RiskRule' } }
    /**
     * Find zero or one RiskRule that matches the filter.
     * @param {RiskRuleFindUniqueArgs} args - Arguments to find a RiskRule
     * @example
     * // Get one RiskRule
     * const riskRule = await prisma.riskRule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RiskRuleFindUniqueArgs>(args: SelectSubset<T, RiskRuleFindUniqueArgs<ExtArgs>>): Prisma__RiskRuleClient<$Result.GetResult<Prisma.$RiskRulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RiskRule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RiskRuleFindUniqueOrThrowArgs} args - Arguments to find a RiskRule
     * @example
     * // Get one RiskRule
     * const riskRule = await prisma.riskRule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RiskRuleFindUniqueOrThrowArgs>(args: SelectSubset<T, RiskRuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RiskRuleClient<$Result.GetResult<Prisma.$RiskRulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RiskRule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskRuleFindFirstArgs} args - Arguments to find a RiskRule
     * @example
     * // Get one RiskRule
     * const riskRule = await prisma.riskRule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RiskRuleFindFirstArgs>(args?: SelectSubset<T, RiskRuleFindFirstArgs<ExtArgs>>): Prisma__RiskRuleClient<$Result.GetResult<Prisma.$RiskRulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RiskRule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskRuleFindFirstOrThrowArgs} args - Arguments to find a RiskRule
     * @example
     * // Get one RiskRule
     * const riskRule = await prisma.riskRule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RiskRuleFindFirstOrThrowArgs>(args?: SelectSubset<T, RiskRuleFindFirstOrThrowArgs<ExtArgs>>): Prisma__RiskRuleClient<$Result.GetResult<Prisma.$RiskRulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RiskRules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskRuleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RiskRules
     * const riskRules = await prisma.riskRule.findMany()
     * 
     * // Get first 10 RiskRules
     * const riskRules = await prisma.riskRule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const riskRuleWithIdOnly = await prisma.riskRule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RiskRuleFindManyArgs>(args?: SelectSubset<T, RiskRuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiskRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RiskRule.
     * @param {RiskRuleCreateArgs} args - Arguments to create a RiskRule.
     * @example
     * // Create one RiskRule
     * const RiskRule = await prisma.riskRule.create({
     *   data: {
     *     // ... data to create a RiskRule
     *   }
     * })
     * 
     */
    create<T extends RiskRuleCreateArgs>(args: SelectSubset<T, RiskRuleCreateArgs<ExtArgs>>): Prisma__RiskRuleClient<$Result.GetResult<Prisma.$RiskRulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RiskRules.
     * @param {RiskRuleCreateManyArgs} args - Arguments to create many RiskRules.
     * @example
     * // Create many RiskRules
     * const riskRule = await prisma.riskRule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RiskRuleCreateManyArgs>(args?: SelectSubset<T, RiskRuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RiskRules and returns the data saved in the database.
     * @param {RiskRuleCreateManyAndReturnArgs} args - Arguments to create many RiskRules.
     * @example
     * // Create many RiskRules
     * const riskRule = await prisma.riskRule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RiskRules and only return the `id`
     * const riskRuleWithIdOnly = await prisma.riskRule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RiskRuleCreateManyAndReturnArgs>(args?: SelectSubset<T, RiskRuleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiskRulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RiskRule.
     * @param {RiskRuleDeleteArgs} args - Arguments to delete one RiskRule.
     * @example
     * // Delete one RiskRule
     * const RiskRule = await prisma.riskRule.delete({
     *   where: {
     *     // ... filter to delete one RiskRule
     *   }
     * })
     * 
     */
    delete<T extends RiskRuleDeleteArgs>(args: SelectSubset<T, RiskRuleDeleteArgs<ExtArgs>>): Prisma__RiskRuleClient<$Result.GetResult<Prisma.$RiskRulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RiskRule.
     * @param {RiskRuleUpdateArgs} args - Arguments to update one RiskRule.
     * @example
     * // Update one RiskRule
     * const riskRule = await prisma.riskRule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RiskRuleUpdateArgs>(args: SelectSubset<T, RiskRuleUpdateArgs<ExtArgs>>): Prisma__RiskRuleClient<$Result.GetResult<Prisma.$RiskRulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RiskRules.
     * @param {RiskRuleDeleteManyArgs} args - Arguments to filter RiskRules to delete.
     * @example
     * // Delete a few RiskRules
     * const { count } = await prisma.riskRule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RiskRuleDeleteManyArgs>(args?: SelectSubset<T, RiskRuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RiskRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskRuleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RiskRules
     * const riskRule = await prisma.riskRule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RiskRuleUpdateManyArgs>(args: SelectSubset<T, RiskRuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RiskRules and returns the data updated in the database.
     * @param {RiskRuleUpdateManyAndReturnArgs} args - Arguments to update many RiskRules.
     * @example
     * // Update many RiskRules
     * const riskRule = await prisma.riskRule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RiskRules and only return the `id`
     * const riskRuleWithIdOnly = await prisma.riskRule.updateManyAndReturn({
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
    updateManyAndReturn<T extends RiskRuleUpdateManyAndReturnArgs>(args: SelectSubset<T, RiskRuleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiskRulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RiskRule.
     * @param {RiskRuleUpsertArgs} args - Arguments to update or create a RiskRule.
     * @example
     * // Update or create a RiskRule
     * const riskRule = await prisma.riskRule.upsert({
     *   create: {
     *     // ... data to create a RiskRule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RiskRule we want to update
     *   }
     * })
     */
    upsert<T extends RiskRuleUpsertArgs>(args: SelectSubset<T, RiskRuleUpsertArgs<ExtArgs>>): Prisma__RiskRuleClient<$Result.GetResult<Prisma.$RiskRulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RiskRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskRuleCountArgs} args - Arguments to filter RiskRules to count.
     * @example
     * // Count the number of RiskRules
     * const count = await prisma.riskRule.count({
     *   where: {
     *     // ... the filter for the RiskRules we want to count
     *   }
     * })
    **/
    count<T extends RiskRuleCountArgs>(
      args?: Subset<T, RiskRuleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RiskRuleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RiskRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskRuleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RiskRuleAggregateArgs>(args: Subset<T, RiskRuleAggregateArgs>): Prisma.PrismaPromise<GetRiskRuleAggregateType<T>>

    /**
     * Group by RiskRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskRuleGroupByArgs} args - Group by arguments.
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
      T extends RiskRuleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RiskRuleGroupByArgs['orderBy'] }
        : { orderBy?: RiskRuleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RiskRuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRiskRuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RiskRule model
   */
  readonly fields: RiskRuleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RiskRule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RiskRuleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenantRules<T extends RiskRule$tenantRulesArgs<ExtArgs> = {}>(args?: Subset<T, RiskRule$tenantRulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantRiskRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    findings<T extends RiskRule$findingsArgs<ExtArgs> = {}>(args?: Subset<T, RiskRule$findingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiskFindingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the RiskRule model
   */
  interface RiskRuleFieldRefs {
    readonly id: FieldRef<"RiskRule", 'String'>
    readonly code: FieldRef<"RiskRule", 'String'>
    readonly nameFa: FieldRef<"RiskRule", 'String'>
    readonly algorithm: FieldRef<"RiskRule", 'RiskAlgorithm'>
    readonly config: FieldRef<"RiskRule", 'Json'>
    readonly severity: FieldRef<"RiskRule", 'FindingSeverity'>
    readonly moduleCode: FieldRef<"RiskRule", 'String'>
    readonly isActive: FieldRef<"RiskRule", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * RiskRule findUnique
   */
  export type RiskRuleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskRule
     */
    select?: RiskRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskRule
     */
    omit?: RiskRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskRuleInclude<ExtArgs> | null
    /**
     * Filter, which RiskRule to fetch.
     */
    where: RiskRuleWhereUniqueInput
  }

  /**
   * RiskRule findUniqueOrThrow
   */
  export type RiskRuleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskRule
     */
    select?: RiskRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskRule
     */
    omit?: RiskRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskRuleInclude<ExtArgs> | null
    /**
     * Filter, which RiskRule to fetch.
     */
    where: RiskRuleWhereUniqueInput
  }

  /**
   * RiskRule findFirst
   */
  export type RiskRuleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskRule
     */
    select?: RiskRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskRule
     */
    omit?: RiskRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskRuleInclude<ExtArgs> | null
    /**
     * Filter, which RiskRule to fetch.
     */
    where?: RiskRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiskRules to fetch.
     */
    orderBy?: RiskRuleOrderByWithRelationInput | RiskRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RiskRules.
     */
    cursor?: RiskRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiskRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiskRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RiskRules.
     */
    distinct?: RiskRuleScalarFieldEnum | RiskRuleScalarFieldEnum[]
  }

  /**
   * RiskRule findFirstOrThrow
   */
  export type RiskRuleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskRule
     */
    select?: RiskRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskRule
     */
    omit?: RiskRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskRuleInclude<ExtArgs> | null
    /**
     * Filter, which RiskRule to fetch.
     */
    where?: RiskRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiskRules to fetch.
     */
    orderBy?: RiskRuleOrderByWithRelationInput | RiskRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RiskRules.
     */
    cursor?: RiskRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiskRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiskRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RiskRules.
     */
    distinct?: RiskRuleScalarFieldEnum | RiskRuleScalarFieldEnum[]
  }

  /**
   * RiskRule findMany
   */
  export type RiskRuleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskRule
     */
    select?: RiskRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskRule
     */
    omit?: RiskRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskRuleInclude<ExtArgs> | null
    /**
     * Filter, which RiskRules to fetch.
     */
    where?: RiskRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiskRules to fetch.
     */
    orderBy?: RiskRuleOrderByWithRelationInput | RiskRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RiskRules.
     */
    cursor?: RiskRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiskRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiskRules.
     */
    skip?: number
    distinct?: RiskRuleScalarFieldEnum | RiskRuleScalarFieldEnum[]
  }

  /**
   * RiskRule create
   */
  export type RiskRuleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskRule
     */
    select?: RiskRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskRule
     */
    omit?: RiskRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskRuleInclude<ExtArgs> | null
    /**
     * The data needed to create a RiskRule.
     */
    data: XOR<RiskRuleCreateInput, RiskRuleUncheckedCreateInput>
  }

  /**
   * RiskRule createMany
   */
  export type RiskRuleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RiskRules.
     */
    data: RiskRuleCreateManyInput | RiskRuleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RiskRule createManyAndReturn
   */
  export type RiskRuleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskRule
     */
    select?: RiskRuleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RiskRule
     */
    omit?: RiskRuleOmit<ExtArgs> | null
    /**
     * The data used to create many RiskRules.
     */
    data: RiskRuleCreateManyInput | RiskRuleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RiskRule update
   */
  export type RiskRuleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskRule
     */
    select?: RiskRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskRule
     */
    omit?: RiskRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskRuleInclude<ExtArgs> | null
    /**
     * The data needed to update a RiskRule.
     */
    data: XOR<RiskRuleUpdateInput, RiskRuleUncheckedUpdateInput>
    /**
     * Choose, which RiskRule to update.
     */
    where: RiskRuleWhereUniqueInput
  }

  /**
   * RiskRule updateMany
   */
  export type RiskRuleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RiskRules.
     */
    data: XOR<RiskRuleUpdateManyMutationInput, RiskRuleUncheckedUpdateManyInput>
    /**
     * Filter which RiskRules to update
     */
    where?: RiskRuleWhereInput
    /**
     * Limit how many RiskRules to update.
     */
    limit?: number
  }

  /**
   * RiskRule updateManyAndReturn
   */
  export type RiskRuleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskRule
     */
    select?: RiskRuleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RiskRule
     */
    omit?: RiskRuleOmit<ExtArgs> | null
    /**
     * The data used to update RiskRules.
     */
    data: XOR<RiskRuleUpdateManyMutationInput, RiskRuleUncheckedUpdateManyInput>
    /**
     * Filter which RiskRules to update
     */
    where?: RiskRuleWhereInput
    /**
     * Limit how many RiskRules to update.
     */
    limit?: number
  }

  /**
   * RiskRule upsert
   */
  export type RiskRuleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskRule
     */
    select?: RiskRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskRule
     */
    omit?: RiskRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskRuleInclude<ExtArgs> | null
    /**
     * The filter to search for the RiskRule to update in case it exists.
     */
    where: RiskRuleWhereUniqueInput
    /**
     * In case the RiskRule found by the `where` argument doesn't exist, create a new RiskRule with this data.
     */
    create: XOR<RiskRuleCreateInput, RiskRuleUncheckedCreateInput>
    /**
     * In case the RiskRule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RiskRuleUpdateInput, RiskRuleUncheckedUpdateInput>
  }

  /**
   * RiskRule delete
   */
  export type RiskRuleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskRule
     */
    select?: RiskRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskRule
     */
    omit?: RiskRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskRuleInclude<ExtArgs> | null
    /**
     * Filter which RiskRule to delete.
     */
    where: RiskRuleWhereUniqueInput
  }

  /**
   * RiskRule deleteMany
   */
  export type RiskRuleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RiskRules to delete
     */
    where?: RiskRuleWhereInput
    /**
     * Limit how many RiskRules to delete.
     */
    limit?: number
  }

  /**
   * RiskRule.tenantRules
   */
  export type RiskRule$tenantRulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantRiskRule
     */
    select?: TenantRiskRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantRiskRule
     */
    omit?: TenantRiskRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantRiskRuleInclude<ExtArgs> | null
    where?: TenantRiskRuleWhereInput
    orderBy?: TenantRiskRuleOrderByWithRelationInput | TenantRiskRuleOrderByWithRelationInput[]
    cursor?: TenantRiskRuleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TenantRiskRuleScalarFieldEnum | TenantRiskRuleScalarFieldEnum[]
  }

  /**
   * RiskRule.findings
   */
  export type RiskRule$findingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskFinding
     */
    select?: RiskFindingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskFinding
     */
    omit?: RiskFindingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskFindingInclude<ExtArgs> | null
    where?: RiskFindingWhereInput
    orderBy?: RiskFindingOrderByWithRelationInput | RiskFindingOrderByWithRelationInput[]
    cursor?: RiskFindingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RiskFindingScalarFieldEnum | RiskFindingScalarFieldEnum[]
  }

  /**
   * RiskRule without action
   */
  export type RiskRuleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskRule
     */
    select?: RiskRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskRule
     */
    omit?: RiskRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskRuleInclude<ExtArgs> | null
  }


  /**
   * Model TenantRiskRule
   */

  export type AggregateTenantRiskRule = {
    _count: TenantRiskRuleCountAggregateOutputType | null
    _avg: TenantRiskRuleAvgAggregateOutputType | null
    _sum: TenantRiskRuleSumAggregateOutputType | null
    _min: TenantRiskRuleMinAggregateOutputType | null
    _max: TenantRiskRuleMaxAggregateOutputType | null
  }

  export type TenantRiskRuleAvgAggregateOutputType = {
    thresholdOverride: Decimal | null
  }

  export type TenantRiskRuleSumAggregateOutputType = {
    thresholdOverride: Decimal | null
  }

  export type TenantRiskRuleMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    riskRuleId: string | null
    thresholdOverride: Decimal | null
    isActive: boolean | null
  }

  export type TenantRiskRuleMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    riskRuleId: string | null
    thresholdOverride: Decimal | null
    isActive: boolean | null
  }

  export type TenantRiskRuleCountAggregateOutputType = {
    id: number
    tenantId: number
    riskRuleId: number
    thresholdOverride: number
    isActive: number
    _all: number
  }


  export type TenantRiskRuleAvgAggregateInputType = {
    thresholdOverride?: true
  }

  export type TenantRiskRuleSumAggregateInputType = {
    thresholdOverride?: true
  }

  export type TenantRiskRuleMinAggregateInputType = {
    id?: true
    tenantId?: true
    riskRuleId?: true
    thresholdOverride?: true
    isActive?: true
  }

  export type TenantRiskRuleMaxAggregateInputType = {
    id?: true
    tenantId?: true
    riskRuleId?: true
    thresholdOverride?: true
    isActive?: true
  }

  export type TenantRiskRuleCountAggregateInputType = {
    id?: true
    tenantId?: true
    riskRuleId?: true
    thresholdOverride?: true
    isActive?: true
    _all?: true
  }

  export type TenantRiskRuleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TenantRiskRule to aggregate.
     */
    where?: TenantRiskRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantRiskRules to fetch.
     */
    orderBy?: TenantRiskRuleOrderByWithRelationInput | TenantRiskRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TenantRiskRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantRiskRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantRiskRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TenantRiskRules
    **/
    _count?: true | TenantRiskRuleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TenantRiskRuleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TenantRiskRuleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TenantRiskRuleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TenantRiskRuleMaxAggregateInputType
  }

  export type GetTenantRiskRuleAggregateType<T extends TenantRiskRuleAggregateArgs> = {
        [P in keyof T & keyof AggregateTenantRiskRule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTenantRiskRule[P]>
      : GetScalarType<T[P], AggregateTenantRiskRule[P]>
  }




  export type TenantRiskRuleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantRiskRuleWhereInput
    orderBy?: TenantRiskRuleOrderByWithAggregationInput | TenantRiskRuleOrderByWithAggregationInput[]
    by: TenantRiskRuleScalarFieldEnum[] | TenantRiskRuleScalarFieldEnum
    having?: TenantRiskRuleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TenantRiskRuleCountAggregateInputType | true
    _avg?: TenantRiskRuleAvgAggregateInputType
    _sum?: TenantRiskRuleSumAggregateInputType
    _min?: TenantRiskRuleMinAggregateInputType
    _max?: TenantRiskRuleMaxAggregateInputType
  }

  export type TenantRiskRuleGroupByOutputType = {
    id: string
    tenantId: string
    riskRuleId: string
    thresholdOverride: Decimal | null
    isActive: boolean
    _count: TenantRiskRuleCountAggregateOutputType | null
    _avg: TenantRiskRuleAvgAggregateOutputType | null
    _sum: TenantRiskRuleSumAggregateOutputType | null
    _min: TenantRiskRuleMinAggregateOutputType | null
    _max: TenantRiskRuleMaxAggregateOutputType | null
  }

  type GetTenantRiskRuleGroupByPayload<T extends TenantRiskRuleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TenantRiskRuleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TenantRiskRuleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TenantRiskRuleGroupByOutputType[P]>
            : GetScalarType<T[P], TenantRiskRuleGroupByOutputType[P]>
        }
      >
    >


  export type TenantRiskRuleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    riskRuleId?: boolean
    thresholdOverride?: boolean
    isActive?: boolean
    riskRule?: boolean | RiskRuleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenantRiskRule"]>

  export type TenantRiskRuleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    riskRuleId?: boolean
    thresholdOverride?: boolean
    isActive?: boolean
    riskRule?: boolean | RiskRuleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenantRiskRule"]>

  export type TenantRiskRuleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    riskRuleId?: boolean
    thresholdOverride?: boolean
    isActive?: boolean
    riskRule?: boolean | RiskRuleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenantRiskRule"]>

  export type TenantRiskRuleSelectScalar = {
    id?: boolean
    tenantId?: boolean
    riskRuleId?: boolean
    thresholdOverride?: boolean
    isActive?: boolean
  }

  export type TenantRiskRuleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "riskRuleId" | "thresholdOverride" | "isActive", ExtArgs["result"]["tenantRiskRule"]>
  export type TenantRiskRuleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    riskRule?: boolean | RiskRuleDefaultArgs<ExtArgs>
  }
  export type TenantRiskRuleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    riskRule?: boolean | RiskRuleDefaultArgs<ExtArgs>
  }
  export type TenantRiskRuleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    riskRule?: boolean | RiskRuleDefaultArgs<ExtArgs>
  }

  export type $TenantRiskRulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TenantRiskRule"
    objects: {
      riskRule: Prisma.$RiskRulePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      riskRuleId: string
      thresholdOverride: Prisma.Decimal | null
      isActive: boolean
    }, ExtArgs["result"]["tenantRiskRule"]>
    composites: {}
  }

  type TenantRiskRuleGetPayload<S extends boolean | null | undefined | TenantRiskRuleDefaultArgs> = $Result.GetResult<Prisma.$TenantRiskRulePayload, S>

  type TenantRiskRuleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TenantRiskRuleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TenantRiskRuleCountAggregateInputType | true
    }

  export interface TenantRiskRuleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TenantRiskRule'], meta: { name: 'TenantRiskRule' } }
    /**
     * Find zero or one TenantRiskRule that matches the filter.
     * @param {TenantRiskRuleFindUniqueArgs} args - Arguments to find a TenantRiskRule
     * @example
     * // Get one TenantRiskRule
     * const tenantRiskRule = await prisma.tenantRiskRule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TenantRiskRuleFindUniqueArgs>(args: SelectSubset<T, TenantRiskRuleFindUniqueArgs<ExtArgs>>): Prisma__TenantRiskRuleClient<$Result.GetResult<Prisma.$TenantRiskRulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TenantRiskRule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TenantRiskRuleFindUniqueOrThrowArgs} args - Arguments to find a TenantRiskRule
     * @example
     * // Get one TenantRiskRule
     * const tenantRiskRule = await prisma.tenantRiskRule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TenantRiskRuleFindUniqueOrThrowArgs>(args: SelectSubset<T, TenantRiskRuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TenantRiskRuleClient<$Result.GetResult<Prisma.$TenantRiskRulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TenantRiskRule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantRiskRuleFindFirstArgs} args - Arguments to find a TenantRiskRule
     * @example
     * // Get one TenantRiskRule
     * const tenantRiskRule = await prisma.tenantRiskRule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TenantRiskRuleFindFirstArgs>(args?: SelectSubset<T, TenantRiskRuleFindFirstArgs<ExtArgs>>): Prisma__TenantRiskRuleClient<$Result.GetResult<Prisma.$TenantRiskRulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TenantRiskRule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantRiskRuleFindFirstOrThrowArgs} args - Arguments to find a TenantRiskRule
     * @example
     * // Get one TenantRiskRule
     * const tenantRiskRule = await prisma.tenantRiskRule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TenantRiskRuleFindFirstOrThrowArgs>(args?: SelectSubset<T, TenantRiskRuleFindFirstOrThrowArgs<ExtArgs>>): Prisma__TenantRiskRuleClient<$Result.GetResult<Prisma.$TenantRiskRulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TenantRiskRules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantRiskRuleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TenantRiskRules
     * const tenantRiskRules = await prisma.tenantRiskRule.findMany()
     * 
     * // Get first 10 TenantRiskRules
     * const tenantRiskRules = await prisma.tenantRiskRule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tenantRiskRuleWithIdOnly = await prisma.tenantRiskRule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TenantRiskRuleFindManyArgs>(args?: SelectSubset<T, TenantRiskRuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantRiskRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TenantRiskRule.
     * @param {TenantRiskRuleCreateArgs} args - Arguments to create a TenantRiskRule.
     * @example
     * // Create one TenantRiskRule
     * const TenantRiskRule = await prisma.tenantRiskRule.create({
     *   data: {
     *     // ... data to create a TenantRiskRule
     *   }
     * })
     * 
     */
    create<T extends TenantRiskRuleCreateArgs>(args: SelectSubset<T, TenantRiskRuleCreateArgs<ExtArgs>>): Prisma__TenantRiskRuleClient<$Result.GetResult<Prisma.$TenantRiskRulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TenantRiskRules.
     * @param {TenantRiskRuleCreateManyArgs} args - Arguments to create many TenantRiskRules.
     * @example
     * // Create many TenantRiskRules
     * const tenantRiskRule = await prisma.tenantRiskRule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TenantRiskRuleCreateManyArgs>(args?: SelectSubset<T, TenantRiskRuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TenantRiskRules and returns the data saved in the database.
     * @param {TenantRiskRuleCreateManyAndReturnArgs} args - Arguments to create many TenantRiskRules.
     * @example
     * // Create many TenantRiskRules
     * const tenantRiskRule = await prisma.tenantRiskRule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TenantRiskRules and only return the `id`
     * const tenantRiskRuleWithIdOnly = await prisma.tenantRiskRule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TenantRiskRuleCreateManyAndReturnArgs>(args?: SelectSubset<T, TenantRiskRuleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantRiskRulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TenantRiskRule.
     * @param {TenantRiskRuleDeleteArgs} args - Arguments to delete one TenantRiskRule.
     * @example
     * // Delete one TenantRiskRule
     * const TenantRiskRule = await prisma.tenantRiskRule.delete({
     *   where: {
     *     // ... filter to delete one TenantRiskRule
     *   }
     * })
     * 
     */
    delete<T extends TenantRiskRuleDeleteArgs>(args: SelectSubset<T, TenantRiskRuleDeleteArgs<ExtArgs>>): Prisma__TenantRiskRuleClient<$Result.GetResult<Prisma.$TenantRiskRulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TenantRiskRule.
     * @param {TenantRiskRuleUpdateArgs} args - Arguments to update one TenantRiskRule.
     * @example
     * // Update one TenantRiskRule
     * const tenantRiskRule = await prisma.tenantRiskRule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TenantRiskRuleUpdateArgs>(args: SelectSubset<T, TenantRiskRuleUpdateArgs<ExtArgs>>): Prisma__TenantRiskRuleClient<$Result.GetResult<Prisma.$TenantRiskRulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TenantRiskRules.
     * @param {TenantRiskRuleDeleteManyArgs} args - Arguments to filter TenantRiskRules to delete.
     * @example
     * // Delete a few TenantRiskRules
     * const { count } = await prisma.tenantRiskRule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TenantRiskRuleDeleteManyArgs>(args?: SelectSubset<T, TenantRiskRuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TenantRiskRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantRiskRuleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TenantRiskRules
     * const tenantRiskRule = await prisma.tenantRiskRule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TenantRiskRuleUpdateManyArgs>(args: SelectSubset<T, TenantRiskRuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TenantRiskRules and returns the data updated in the database.
     * @param {TenantRiskRuleUpdateManyAndReturnArgs} args - Arguments to update many TenantRiskRules.
     * @example
     * // Update many TenantRiskRules
     * const tenantRiskRule = await prisma.tenantRiskRule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TenantRiskRules and only return the `id`
     * const tenantRiskRuleWithIdOnly = await prisma.tenantRiskRule.updateManyAndReturn({
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
    updateManyAndReturn<T extends TenantRiskRuleUpdateManyAndReturnArgs>(args: SelectSubset<T, TenantRiskRuleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantRiskRulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TenantRiskRule.
     * @param {TenantRiskRuleUpsertArgs} args - Arguments to update or create a TenantRiskRule.
     * @example
     * // Update or create a TenantRiskRule
     * const tenantRiskRule = await prisma.tenantRiskRule.upsert({
     *   create: {
     *     // ... data to create a TenantRiskRule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TenantRiskRule we want to update
     *   }
     * })
     */
    upsert<T extends TenantRiskRuleUpsertArgs>(args: SelectSubset<T, TenantRiskRuleUpsertArgs<ExtArgs>>): Prisma__TenantRiskRuleClient<$Result.GetResult<Prisma.$TenantRiskRulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TenantRiskRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantRiskRuleCountArgs} args - Arguments to filter TenantRiskRules to count.
     * @example
     * // Count the number of TenantRiskRules
     * const count = await prisma.tenantRiskRule.count({
     *   where: {
     *     // ... the filter for the TenantRiskRules we want to count
     *   }
     * })
    **/
    count<T extends TenantRiskRuleCountArgs>(
      args?: Subset<T, TenantRiskRuleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TenantRiskRuleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TenantRiskRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantRiskRuleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TenantRiskRuleAggregateArgs>(args: Subset<T, TenantRiskRuleAggregateArgs>): Prisma.PrismaPromise<GetTenantRiskRuleAggregateType<T>>

    /**
     * Group by TenantRiskRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantRiskRuleGroupByArgs} args - Group by arguments.
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
      T extends TenantRiskRuleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TenantRiskRuleGroupByArgs['orderBy'] }
        : { orderBy?: TenantRiskRuleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TenantRiskRuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTenantRiskRuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TenantRiskRule model
   */
  readonly fields: TenantRiskRuleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TenantRiskRule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TenantRiskRuleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    riskRule<T extends RiskRuleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RiskRuleDefaultArgs<ExtArgs>>): Prisma__RiskRuleClient<$Result.GetResult<Prisma.$RiskRulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the TenantRiskRule model
   */
  interface TenantRiskRuleFieldRefs {
    readonly id: FieldRef<"TenantRiskRule", 'String'>
    readonly tenantId: FieldRef<"TenantRiskRule", 'String'>
    readonly riskRuleId: FieldRef<"TenantRiskRule", 'String'>
    readonly thresholdOverride: FieldRef<"TenantRiskRule", 'Decimal'>
    readonly isActive: FieldRef<"TenantRiskRule", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * TenantRiskRule findUnique
   */
  export type TenantRiskRuleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantRiskRule
     */
    select?: TenantRiskRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantRiskRule
     */
    omit?: TenantRiskRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantRiskRuleInclude<ExtArgs> | null
    /**
     * Filter, which TenantRiskRule to fetch.
     */
    where: TenantRiskRuleWhereUniqueInput
  }

  /**
   * TenantRiskRule findUniqueOrThrow
   */
  export type TenantRiskRuleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantRiskRule
     */
    select?: TenantRiskRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantRiskRule
     */
    omit?: TenantRiskRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantRiskRuleInclude<ExtArgs> | null
    /**
     * Filter, which TenantRiskRule to fetch.
     */
    where: TenantRiskRuleWhereUniqueInput
  }

  /**
   * TenantRiskRule findFirst
   */
  export type TenantRiskRuleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantRiskRule
     */
    select?: TenantRiskRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantRiskRule
     */
    omit?: TenantRiskRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantRiskRuleInclude<ExtArgs> | null
    /**
     * Filter, which TenantRiskRule to fetch.
     */
    where?: TenantRiskRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantRiskRules to fetch.
     */
    orderBy?: TenantRiskRuleOrderByWithRelationInput | TenantRiskRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TenantRiskRules.
     */
    cursor?: TenantRiskRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantRiskRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantRiskRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TenantRiskRules.
     */
    distinct?: TenantRiskRuleScalarFieldEnum | TenantRiskRuleScalarFieldEnum[]
  }

  /**
   * TenantRiskRule findFirstOrThrow
   */
  export type TenantRiskRuleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantRiskRule
     */
    select?: TenantRiskRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantRiskRule
     */
    omit?: TenantRiskRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantRiskRuleInclude<ExtArgs> | null
    /**
     * Filter, which TenantRiskRule to fetch.
     */
    where?: TenantRiskRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantRiskRules to fetch.
     */
    orderBy?: TenantRiskRuleOrderByWithRelationInput | TenantRiskRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TenantRiskRules.
     */
    cursor?: TenantRiskRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantRiskRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantRiskRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TenantRiskRules.
     */
    distinct?: TenantRiskRuleScalarFieldEnum | TenantRiskRuleScalarFieldEnum[]
  }

  /**
   * TenantRiskRule findMany
   */
  export type TenantRiskRuleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantRiskRule
     */
    select?: TenantRiskRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantRiskRule
     */
    omit?: TenantRiskRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantRiskRuleInclude<ExtArgs> | null
    /**
     * Filter, which TenantRiskRules to fetch.
     */
    where?: TenantRiskRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantRiskRules to fetch.
     */
    orderBy?: TenantRiskRuleOrderByWithRelationInput | TenantRiskRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TenantRiskRules.
     */
    cursor?: TenantRiskRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantRiskRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantRiskRules.
     */
    skip?: number
    distinct?: TenantRiskRuleScalarFieldEnum | TenantRiskRuleScalarFieldEnum[]
  }

  /**
   * TenantRiskRule create
   */
  export type TenantRiskRuleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantRiskRule
     */
    select?: TenantRiskRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantRiskRule
     */
    omit?: TenantRiskRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantRiskRuleInclude<ExtArgs> | null
    /**
     * The data needed to create a TenantRiskRule.
     */
    data: XOR<TenantRiskRuleCreateInput, TenantRiskRuleUncheckedCreateInput>
  }

  /**
   * TenantRiskRule createMany
   */
  export type TenantRiskRuleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TenantRiskRules.
     */
    data: TenantRiskRuleCreateManyInput | TenantRiskRuleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TenantRiskRule createManyAndReturn
   */
  export type TenantRiskRuleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantRiskRule
     */
    select?: TenantRiskRuleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TenantRiskRule
     */
    omit?: TenantRiskRuleOmit<ExtArgs> | null
    /**
     * The data used to create many TenantRiskRules.
     */
    data: TenantRiskRuleCreateManyInput | TenantRiskRuleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantRiskRuleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TenantRiskRule update
   */
  export type TenantRiskRuleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantRiskRule
     */
    select?: TenantRiskRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantRiskRule
     */
    omit?: TenantRiskRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantRiskRuleInclude<ExtArgs> | null
    /**
     * The data needed to update a TenantRiskRule.
     */
    data: XOR<TenantRiskRuleUpdateInput, TenantRiskRuleUncheckedUpdateInput>
    /**
     * Choose, which TenantRiskRule to update.
     */
    where: TenantRiskRuleWhereUniqueInput
  }

  /**
   * TenantRiskRule updateMany
   */
  export type TenantRiskRuleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TenantRiskRules.
     */
    data: XOR<TenantRiskRuleUpdateManyMutationInput, TenantRiskRuleUncheckedUpdateManyInput>
    /**
     * Filter which TenantRiskRules to update
     */
    where?: TenantRiskRuleWhereInput
    /**
     * Limit how many TenantRiskRules to update.
     */
    limit?: number
  }

  /**
   * TenantRiskRule updateManyAndReturn
   */
  export type TenantRiskRuleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantRiskRule
     */
    select?: TenantRiskRuleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TenantRiskRule
     */
    omit?: TenantRiskRuleOmit<ExtArgs> | null
    /**
     * The data used to update TenantRiskRules.
     */
    data: XOR<TenantRiskRuleUpdateManyMutationInput, TenantRiskRuleUncheckedUpdateManyInput>
    /**
     * Filter which TenantRiskRules to update
     */
    where?: TenantRiskRuleWhereInput
    /**
     * Limit how many TenantRiskRules to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantRiskRuleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TenantRiskRule upsert
   */
  export type TenantRiskRuleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantRiskRule
     */
    select?: TenantRiskRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantRiskRule
     */
    omit?: TenantRiskRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantRiskRuleInclude<ExtArgs> | null
    /**
     * The filter to search for the TenantRiskRule to update in case it exists.
     */
    where: TenantRiskRuleWhereUniqueInput
    /**
     * In case the TenantRiskRule found by the `where` argument doesn't exist, create a new TenantRiskRule with this data.
     */
    create: XOR<TenantRiskRuleCreateInput, TenantRiskRuleUncheckedCreateInput>
    /**
     * In case the TenantRiskRule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TenantRiskRuleUpdateInput, TenantRiskRuleUncheckedUpdateInput>
  }

  /**
   * TenantRiskRule delete
   */
  export type TenantRiskRuleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantRiskRule
     */
    select?: TenantRiskRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantRiskRule
     */
    omit?: TenantRiskRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantRiskRuleInclude<ExtArgs> | null
    /**
     * Filter which TenantRiskRule to delete.
     */
    where: TenantRiskRuleWhereUniqueInput
  }

  /**
   * TenantRiskRule deleteMany
   */
  export type TenantRiskRuleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TenantRiskRules to delete
     */
    where?: TenantRiskRuleWhereInput
    /**
     * Limit how many TenantRiskRules to delete.
     */
    limit?: number
  }

  /**
   * TenantRiskRule without action
   */
  export type TenantRiskRuleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantRiskRule
     */
    select?: TenantRiskRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantRiskRule
     */
    omit?: TenantRiskRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantRiskRuleInclude<ExtArgs> | null
  }


  /**
   * Model RiskFinding
   */

  export type AggregateRiskFinding = {
    _count: RiskFindingCountAggregateOutputType | null
    _min: RiskFindingMinAggregateOutputType | null
    _max: RiskFindingMaxAggregateOutputType | null
  }

  export type RiskFindingMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    riskRuleId: string | null
    detectedAt: Date | null
    severity: $Enums.FindingSeverity | null
    trend: $Enums.FindingTrend | null
    sourceModule: string | null
    suggestionFa: string | null
    deduplicationKey: string | null
  }

  export type RiskFindingMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    riskRuleId: string | null
    detectedAt: Date | null
    severity: $Enums.FindingSeverity | null
    trend: $Enums.FindingTrend | null
    sourceModule: string | null
    suggestionFa: string | null
    deduplicationKey: string | null
  }

  export type RiskFindingCountAggregateOutputType = {
    id: number
    tenantId: number
    riskRuleId: number
    detectedAt: number
    severity: number
    trend: number
    sourceModule: number
    evidence: number
    suggestionFa: number
    deduplicationKey: number
    _all: number
  }


  export type RiskFindingMinAggregateInputType = {
    id?: true
    tenantId?: true
    riskRuleId?: true
    detectedAt?: true
    severity?: true
    trend?: true
    sourceModule?: true
    suggestionFa?: true
    deduplicationKey?: true
  }

  export type RiskFindingMaxAggregateInputType = {
    id?: true
    tenantId?: true
    riskRuleId?: true
    detectedAt?: true
    severity?: true
    trend?: true
    sourceModule?: true
    suggestionFa?: true
    deduplicationKey?: true
  }

  export type RiskFindingCountAggregateInputType = {
    id?: true
    tenantId?: true
    riskRuleId?: true
    detectedAt?: true
    severity?: true
    trend?: true
    sourceModule?: true
    evidence?: true
    suggestionFa?: true
    deduplicationKey?: true
    _all?: true
  }

  export type RiskFindingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RiskFinding to aggregate.
     */
    where?: RiskFindingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiskFindings to fetch.
     */
    orderBy?: RiskFindingOrderByWithRelationInput | RiskFindingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RiskFindingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiskFindings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiskFindings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RiskFindings
    **/
    _count?: true | RiskFindingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RiskFindingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RiskFindingMaxAggregateInputType
  }

  export type GetRiskFindingAggregateType<T extends RiskFindingAggregateArgs> = {
        [P in keyof T & keyof AggregateRiskFinding]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRiskFinding[P]>
      : GetScalarType<T[P], AggregateRiskFinding[P]>
  }




  export type RiskFindingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RiskFindingWhereInput
    orderBy?: RiskFindingOrderByWithAggregationInput | RiskFindingOrderByWithAggregationInput[]
    by: RiskFindingScalarFieldEnum[] | RiskFindingScalarFieldEnum
    having?: RiskFindingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RiskFindingCountAggregateInputType | true
    _min?: RiskFindingMinAggregateInputType
    _max?: RiskFindingMaxAggregateInputType
  }

  export type RiskFindingGroupByOutputType = {
    id: string
    tenantId: string
    riskRuleId: string
    detectedAt: Date
    severity: $Enums.FindingSeverity
    trend: $Enums.FindingTrend
    sourceModule: string
    evidence: JsonValue
    suggestionFa: string
    deduplicationKey: string
    _count: RiskFindingCountAggregateOutputType | null
    _min: RiskFindingMinAggregateOutputType | null
    _max: RiskFindingMaxAggregateOutputType | null
  }

  type GetRiskFindingGroupByPayload<T extends RiskFindingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RiskFindingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RiskFindingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RiskFindingGroupByOutputType[P]>
            : GetScalarType<T[P], RiskFindingGroupByOutputType[P]>
        }
      >
    >


  export type RiskFindingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    riskRuleId?: boolean
    detectedAt?: boolean
    severity?: boolean
    trend?: boolean
    sourceModule?: boolean
    evidence?: boolean
    suggestionFa?: boolean
    deduplicationKey?: boolean
    riskRule?: boolean | RiskRuleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["riskFinding"]>

  export type RiskFindingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    riskRuleId?: boolean
    detectedAt?: boolean
    severity?: boolean
    trend?: boolean
    sourceModule?: boolean
    evidence?: boolean
    suggestionFa?: boolean
    deduplicationKey?: boolean
    riskRule?: boolean | RiskRuleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["riskFinding"]>

  export type RiskFindingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    riskRuleId?: boolean
    detectedAt?: boolean
    severity?: boolean
    trend?: boolean
    sourceModule?: boolean
    evidence?: boolean
    suggestionFa?: boolean
    deduplicationKey?: boolean
    riskRule?: boolean | RiskRuleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["riskFinding"]>

  export type RiskFindingSelectScalar = {
    id?: boolean
    tenantId?: boolean
    riskRuleId?: boolean
    detectedAt?: boolean
    severity?: boolean
    trend?: boolean
    sourceModule?: boolean
    evidence?: boolean
    suggestionFa?: boolean
    deduplicationKey?: boolean
  }

  export type RiskFindingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "riskRuleId" | "detectedAt" | "severity" | "trend" | "sourceModule" | "evidence" | "suggestionFa" | "deduplicationKey", ExtArgs["result"]["riskFinding"]>
  export type RiskFindingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    riskRule?: boolean | RiskRuleDefaultArgs<ExtArgs>
  }
  export type RiskFindingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    riskRule?: boolean | RiskRuleDefaultArgs<ExtArgs>
  }
  export type RiskFindingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    riskRule?: boolean | RiskRuleDefaultArgs<ExtArgs>
  }

  export type $RiskFindingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RiskFinding"
    objects: {
      riskRule: Prisma.$RiskRulePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      riskRuleId: string
      detectedAt: Date
      severity: $Enums.FindingSeverity
      trend: $Enums.FindingTrend
      sourceModule: string
      evidence: Prisma.JsonValue
      suggestionFa: string
      deduplicationKey: string
    }, ExtArgs["result"]["riskFinding"]>
    composites: {}
  }

  type RiskFindingGetPayload<S extends boolean | null | undefined | RiskFindingDefaultArgs> = $Result.GetResult<Prisma.$RiskFindingPayload, S>

  type RiskFindingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RiskFindingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RiskFindingCountAggregateInputType | true
    }

  export interface RiskFindingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RiskFinding'], meta: { name: 'RiskFinding' } }
    /**
     * Find zero or one RiskFinding that matches the filter.
     * @param {RiskFindingFindUniqueArgs} args - Arguments to find a RiskFinding
     * @example
     * // Get one RiskFinding
     * const riskFinding = await prisma.riskFinding.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RiskFindingFindUniqueArgs>(args: SelectSubset<T, RiskFindingFindUniqueArgs<ExtArgs>>): Prisma__RiskFindingClient<$Result.GetResult<Prisma.$RiskFindingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RiskFinding that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RiskFindingFindUniqueOrThrowArgs} args - Arguments to find a RiskFinding
     * @example
     * // Get one RiskFinding
     * const riskFinding = await prisma.riskFinding.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RiskFindingFindUniqueOrThrowArgs>(args: SelectSubset<T, RiskFindingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RiskFindingClient<$Result.GetResult<Prisma.$RiskFindingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RiskFinding that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskFindingFindFirstArgs} args - Arguments to find a RiskFinding
     * @example
     * // Get one RiskFinding
     * const riskFinding = await prisma.riskFinding.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RiskFindingFindFirstArgs>(args?: SelectSubset<T, RiskFindingFindFirstArgs<ExtArgs>>): Prisma__RiskFindingClient<$Result.GetResult<Prisma.$RiskFindingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RiskFinding that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskFindingFindFirstOrThrowArgs} args - Arguments to find a RiskFinding
     * @example
     * // Get one RiskFinding
     * const riskFinding = await prisma.riskFinding.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RiskFindingFindFirstOrThrowArgs>(args?: SelectSubset<T, RiskFindingFindFirstOrThrowArgs<ExtArgs>>): Prisma__RiskFindingClient<$Result.GetResult<Prisma.$RiskFindingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RiskFindings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskFindingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RiskFindings
     * const riskFindings = await prisma.riskFinding.findMany()
     * 
     * // Get first 10 RiskFindings
     * const riskFindings = await prisma.riskFinding.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const riskFindingWithIdOnly = await prisma.riskFinding.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RiskFindingFindManyArgs>(args?: SelectSubset<T, RiskFindingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiskFindingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RiskFinding.
     * @param {RiskFindingCreateArgs} args - Arguments to create a RiskFinding.
     * @example
     * // Create one RiskFinding
     * const RiskFinding = await prisma.riskFinding.create({
     *   data: {
     *     // ... data to create a RiskFinding
     *   }
     * })
     * 
     */
    create<T extends RiskFindingCreateArgs>(args: SelectSubset<T, RiskFindingCreateArgs<ExtArgs>>): Prisma__RiskFindingClient<$Result.GetResult<Prisma.$RiskFindingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RiskFindings.
     * @param {RiskFindingCreateManyArgs} args - Arguments to create many RiskFindings.
     * @example
     * // Create many RiskFindings
     * const riskFinding = await prisma.riskFinding.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RiskFindingCreateManyArgs>(args?: SelectSubset<T, RiskFindingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RiskFindings and returns the data saved in the database.
     * @param {RiskFindingCreateManyAndReturnArgs} args - Arguments to create many RiskFindings.
     * @example
     * // Create many RiskFindings
     * const riskFinding = await prisma.riskFinding.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RiskFindings and only return the `id`
     * const riskFindingWithIdOnly = await prisma.riskFinding.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RiskFindingCreateManyAndReturnArgs>(args?: SelectSubset<T, RiskFindingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiskFindingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RiskFinding.
     * @param {RiskFindingDeleteArgs} args - Arguments to delete one RiskFinding.
     * @example
     * // Delete one RiskFinding
     * const RiskFinding = await prisma.riskFinding.delete({
     *   where: {
     *     // ... filter to delete one RiskFinding
     *   }
     * })
     * 
     */
    delete<T extends RiskFindingDeleteArgs>(args: SelectSubset<T, RiskFindingDeleteArgs<ExtArgs>>): Prisma__RiskFindingClient<$Result.GetResult<Prisma.$RiskFindingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RiskFinding.
     * @param {RiskFindingUpdateArgs} args - Arguments to update one RiskFinding.
     * @example
     * // Update one RiskFinding
     * const riskFinding = await prisma.riskFinding.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RiskFindingUpdateArgs>(args: SelectSubset<T, RiskFindingUpdateArgs<ExtArgs>>): Prisma__RiskFindingClient<$Result.GetResult<Prisma.$RiskFindingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RiskFindings.
     * @param {RiskFindingDeleteManyArgs} args - Arguments to filter RiskFindings to delete.
     * @example
     * // Delete a few RiskFindings
     * const { count } = await prisma.riskFinding.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RiskFindingDeleteManyArgs>(args?: SelectSubset<T, RiskFindingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RiskFindings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskFindingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RiskFindings
     * const riskFinding = await prisma.riskFinding.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RiskFindingUpdateManyArgs>(args: SelectSubset<T, RiskFindingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RiskFindings and returns the data updated in the database.
     * @param {RiskFindingUpdateManyAndReturnArgs} args - Arguments to update many RiskFindings.
     * @example
     * // Update many RiskFindings
     * const riskFinding = await prisma.riskFinding.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RiskFindings and only return the `id`
     * const riskFindingWithIdOnly = await prisma.riskFinding.updateManyAndReturn({
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
    updateManyAndReturn<T extends RiskFindingUpdateManyAndReturnArgs>(args: SelectSubset<T, RiskFindingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiskFindingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RiskFinding.
     * @param {RiskFindingUpsertArgs} args - Arguments to update or create a RiskFinding.
     * @example
     * // Update or create a RiskFinding
     * const riskFinding = await prisma.riskFinding.upsert({
     *   create: {
     *     // ... data to create a RiskFinding
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RiskFinding we want to update
     *   }
     * })
     */
    upsert<T extends RiskFindingUpsertArgs>(args: SelectSubset<T, RiskFindingUpsertArgs<ExtArgs>>): Prisma__RiskFindingClient<$Result.GetResult<Prisma.$RiskFindingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RiskFindings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskFindingCountArgs} args - Arguments to filter RiskFindings to count.
     * @example
     * // Count the number of RiskFindings
     * const count = await prisma.riskFinding.count({
     *   where: {
     *     // ... the filter for the RiskFindings we want to count
     *   }
     * })
    **/
    count<T extends RiskFindingCountArgs>(
      args?: Subset<T, RiskFindingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RiskFindingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RiskFinding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskFindingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RiskFindingAggregateArgs>(args: Subset<T, RiskFindingAggregateArgs>): Prisma.PrismaPromise<GetRiskFindingAggregateType<T>>

    /**
     * Group by RiskFinding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskFindingGroupByArgs} args - Group by arguments.
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
      T extends RiskFindingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RiskFindingGroupByArgs['orderBy'] }
        : { orderBy?: RiskFindingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RiskFindingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRiskFindingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RiskFinding model
   */
  readonly fields: RiskFindingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RiskFinding.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RiskFindingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    riskRule<T extends RiskRuleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RiskRuleDefaultArgs<ExtArgs>>): Prisma__RiskRuleClient<$Result.GetResult<Prisma.$RiskRulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the RiskFinding model
   */
  interface RiskFindingFieldRefs {
    readonly id: FieldRef<"RiskFinding", 'String'>
    readonly tenantId: FieldRef<"RiskFinding", 'String'>
    readonly riskRuleId: FieldRef<"RiskFinding", 'String'>
    readonly detectedAt: FieldRef<"RiskFinding", 'DateTime'>
    readonly severity: FieldRef<"RiskFinding", 'FindingSeverity'>
    readonly trend: FieldRef<"RiskFinding", 'FindingTrend'>
    readonly sourceModule: FieldRef<"RiskFinding", 'String'>
    readonly evidence: FieldRef<"RiskFinding", 'Json'>
    readonly suggestionFa: FieldRef<"RiskFinding", 'String'>
    readonly deduplicationKey: FieldRef<"RiskFinding", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RiskFinding findUnique
   */
  export type RiskFindingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskFinding
     */
    select?: RiskFindingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskFinding
     */
    omit?: RiskFindingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskFindingInclude<ExtArgs> | null
    /**
     * Filter, which RiskFinding to fetch.
     */
    where: RiskFindingWhereUniqueInput
  }

  /**
   * RiskFinding findUniqueOrThrow
   */
  export type RiskFindingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskFinding
     */
    select?: RiskFindingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskFinding
     */
    omit?: RiskFindingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskFindingInclude<ExtArgs> | null
    /**
     * Filter, which RiskFinding to fetch.
     */
    where: RiskFindingWhereUniqueInput
  }

  /**
   * RiskFinding findFirst
   */
  export type RiskFindingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskFinding
     */
    select?: RiskFindingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskFinding
     */
    omit?: RiskFindingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskFindingInclude<ExtArgs> | null
    /**
     * Filter, which RiskFinding to fetch.
     */
    where?: RiskFindingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiskFindings to fetch.
     */
    orderBy?: RiskFindingOrderByWithRelationInput | RiskFindingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RiskFindings.
     */
    cursor?: RiskFindingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiskFindings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiskFindings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RiskFindings.
     */
    distinct?: RiskFindingScalarFieldEnum | RiskFindingScalarFieldEnum[]
  }

  /**
   * RiskFinding findFirstOrThrow
   */
  export type RiskFindingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskFinding
     */
    select?: RiskFindingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskFinding
     */
    omit?: RiskFindingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskFindingInclude<ExtArgs> | null
    /**
     * Filter, which RiskFinding to fetch.
     */
    where?: RiskFindingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiskFindings to fetch.
     */
    orderBy?: RiskFindingOrderByWithRelationInput | RiskFindingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RiskFindings.
     */
    cursor?: RiskFindingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiskFindings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiskFindings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RiskFindings.
     */
    distinct?: RiskFindingScalarFieldEnum | RiskFindingScalarFieldEnum[]
  }

  /**
   * RiskFinding findMany
   */
  export type RiskFindingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskFinding
     */
    select?: RiskFindingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskFinding
     */
    omit?: RiskFindingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskFindingInclude<ExtArgs> | null
    /**
     * Filter, which RiskFindings to fetch.
     */
    where?: RiskFindingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiskFindings to fetch.
     */
    orderBy?: RiskFindingOrderByWithRelationInput | RiskFindingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RiskFindings.
     */
    cursor?: RiskFindingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiskFindings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiskFindings.
     */
    skip?: number
    distinct?: RiskFindingScalarFieldEnum | RiskFindingScalarFieldEnum[]
  }

  /**
   * RiskFinding create
   */
  export type RiskFindingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskFinding
     */
    select?: RiskFindingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskFinding
     */
    omit?: RiskFindingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskFindingInclude<ExtArgs> | null
    /**
     * The data needed to create a RiskFinding.
     */
    data: XOR<RiskFindingCreateInput, RiskFindingUncheckedCreateInput>
  }

  /**
   * RiskFinding createMany
   */
  export type RiskFindingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RiskFindings.
     */
    data: RiskFindingCreateManyInput | RiskFindingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RiskFinding createManyAndReturn
   */
  export type RiskFindingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskFinding
     */
    select?: RiskFindingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RiskFinding
     */
    omit?: RiskFindingOmit<ExtArgs> | null
    /**
     * The data used to create many RiskFindings.
     */
    data: RiskFindingCreateManyInput | RiskFindingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskFindingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RiskFinding update
   */
  export type RiskFindingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskFinding
     */
    select?: RiskFindingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskFinding
     */
    omit?: RiskFindingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskFindingInclude<ExtArgs> | null
    /**
     * The data needed to update a RiskFinding.
     */
    data: XOR<RiskFindingUpdateInput, RiskFindingUncheckedUpdateInput>
    /**
     * Choose, which RiskFinding to update.
     */
    where: RiskFindingWhereUniqueInput
  }

  /**
   * RiskFinding updateMany
   */
  export type RiskFindingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RiskFindings.
     */
    data: XOR<RiskFindingUpdateManyMutationInput, RiskFindingUncheckedUpdateManyInput>
    /**
     * Filter which RiskFindings to update
     */
    where?: RiskFindingWhereInput
    /**
     * Limit how many RiskFindings to update.
     */
    limit?: number
  }

  /**
   * RiskFinding updateManyAndReturn
   */
  export type RiskFindingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskFinding
     */
    select?: RiskFindingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RiskFinding
     */
    omit?: RiskFindingOmit<ExtArgs> | null
    /**
     * The data used to update RiskFindings.
     */
    data: XOR<RiskFindingUpdateManyMutationInput, RiskFindingUncheckedUpdateManyInput>
    /**
     * Filter which RiskFindings to update
     */
    where?: RiskFindingWhereInput
    /**
     * Limit how many RiskFindings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskFindingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RiskFinding upsert
   */
  export type RiskFindingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskFinding
     */
    select?: RiskFindingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskFinding
     */
    omit?: RiskFindingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskFindingInclude<ExtArgs> | null
    /**
     * The filter to search for the RiskFinding to update in case it exists.
     */
    where: RiskFindingWhereUniqueInput
    /**
     * In case the RiskFinding found by the `where` argument doesn't exist, create a new RiskFinding with this data.
     */
    create: XOR<RiskFindingCreateInput, RiskFindingUncheckedCreateInput>
    /**
     * In case the RiskFinding was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RiskFindingUpdateInput, RiskFindingUncheckedUpdateInput>
  }

  /**
   * RiskFinding delete
   */
  export type RiskFindingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskFinding
     */
    select?: RiskFindingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskFinding
     */
    omit?: RiskFindingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskFindingInclude<ExtArgs> | null
    /**
     * Filter which RiskFinding to delete.
     */
    where: RiskFindingWhereUniqueInput
  }

  /**
   * RiskFinding deleteMany
   */
  export type RiskFindingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RiskFindings to delete
     */
    where?: RiskFindingWhereInput
    /**
     * Limit how many RiskFindings to delete.
     */
    limit?: number
  }

  /**
   * RiskFinding without action
   */
  export type RiskFindingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskFinding
     */
    select?: RiskFindingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskFinding
     */
    omit?: RiskFindingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskFindingInclude<ExtArgs> | null
  }


  /**
   * Model TenantKpiConfig
   */

  export type AggregateTenantKpiConfig = {
    _count: TenantKpiConfigCountAggregateOutputType | null
    _min: TenantKpiConfigMinAggregateOutputType | null
    _max: TenantKpiConfigMaxAggregateOutputType | null
  }

  export type TenantKpiConfigMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    kpiCode: string | null
    isVisible: boolean | null
  }

  export type TenantKpiConfigMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    kpiCode: string | null
    isVisible: boolean | null
  }

  export type TenantKpiConfigCountAggregateOutputType = {
    id: number
    tenantId: number
    kpiCode: number
    position: number
    size: number
    isVisible: number
    _all: number
  }


  export type TenantKpiConfigMinAggregateInputType = {
    id?: true
    tenantId?: true
    kpiCode?: true
    isVisible?: true
  }

  export type TenantKpiConfigMaxAggregateInputType = {
    id?: true
    tenantId?: true
    kpiCode?: true
    isVisible?: true
  }

  export type TenantKpiConfigCountAggregateInputType = {
    id?: true
    tenantId?: true
    kpiCode?: true
    position?: true
    size?: true
    isVisible?: true
    _all?: true
  }

  export type TenantKpiConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TenantKpiConfig to aggregate.
     */
    where?: TenantKpiConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantKpiConfigs to fetch.
     */
    orderBy?: TenantKpiConfigOrderByWithRelationInput | TenantKpiConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TenantKpiConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantKpiConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantKpiConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TenantKpiConfigs
    **/
    _count?: true | TenantKpiConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TenantKpiConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TenantKpiConfigMaxAggregateInputType
  }

  export type GetTenantKpiConfigAggregateType<T extends TenantKpiConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateTenantKpiConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTenantKpiConfig[P]>
      : GetScalarType<T[P], AggregateTenantKpiConfig[P]>
  }




  export type TenantKpiConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantKpiConfigWhereInput
    orderBy?: TenantKpiConfigOrderByWithAggregationInput | TenantKpiConfigOrderByWithAggregationInput[]
    by: TenantKpiConfigScalarFieldEnum[] | TenantKpiConfigScalarFieldEnum
    having?: TenantKpiConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TenantKpiConfigCountAggregateInputType | true
    _min?: TenantKpiConfigMinAggregateInputType
    _max?: TenantKpiConfigMaxAggregateInputType
  }

  export type TenantKpiConfigGroupByOutputType = {
    id: string
    tenantId: string
    kpiCode: string
    position: JsonValue
    size: JsonValue
    isVisible: boolean
    _count: TenantKpiConfigCountAggregateOutputType | null
    _min: TenantKpiConfigMinAggregateOutputType | null
    _max: TenantKpiConfigMaxAggregateOutputType | null
  }

  type GetTenantKpiConfigGroupByPayload<T extends TenantKpiConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TenantKpiConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TenantKpiConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TenantKpiConfigGroupByOutputType[P]>
            : GetScalarType<T[P], TenantKpiConfigGroupByOutputType[P]>
        }
      >
    >


  export type TenantKpiConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    kpiCode?: boolean
    position?: boolean
    size?: boolean
    isVisible?: boolean
  }, ExtArgs["result"]["tenantKpiConfig"]>

  export type TenantKpiConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    kpiCode?: boolean
    position?: boolean
    size?: boolean
    isVisible?: boolean
  }, ExtArgs["result"]["tenantKpiConfig"]>

  export type TenantKpiConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    kpiCode?: boolean
    position?: boolean
    size?: boolean
    isVisible?: boolean
  }, ExtArgs["result"]["tenantKpiConfig"]>

  export type TenantKpiConfigSelectScalar = {
    id?: boolean
    tenantId?: boolean
    kpiCode?: boolean
    position?: boolean
    size?: boolean
    isVisible?: boolean
  }

  export type TenantKpiConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "kpiCode" | "position" | "size" | "isVisible", ExtArgs["result"]["tenantKpiConfig"]>

  export type $TenantKpiConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TenantKpiConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      kpiCode: string
      position: Prisma.JsonValue
      size: Prisma.JsonValue
      isVisible: boolean
    }, ExtArgs["result"]["tenantKpiConfig"]>
    composites: {}
  }

  type TenantKpiConfigGetPayload<S extends boolean | null | undefined | TenantKpiConfigDefaultArgs> = $Result.GetResult<Prisma.$TenantKpiConfigPayload, S>

  type TenantKpiConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TenantKpiConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TenantKpiConfigCountAggregateInputType | true
    }

  export interface TenantKpiConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TenantKpiConfig'], meta: { name: 'TenantKpiConfig' } }
    /**
     * Find zero or one TenantKpiConfig that matches the filter.
     * @param {TenantKpiConfigFindUniqueArgs} args - Arguments to find a TenantKpiConfig
     * @example
     * // Get one TenantKpiConfig
     * const tenantKpiConfig = await prisma.tenantKpiConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TenantKpiConfigFindUniqueArgs>(args: SelectSubset<T, TenantKpiConfigFindUniqueArgs<ExtArgs>>): Prisma__TenantKpiConfigClient<$Result.GetResult<Prisma.$TenantKpiConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TenantKpiConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TenantKpiConfigFindUniqueOrThrowArgs} args - Arguments to find a TenantKpiConfig
     * @example
     * // Get one TenantKpiConfig
     * const tenantKpiConfig = await prisma.tenantKpiConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TenantKpiConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, TenantKpiConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TenantKpiConfigClient<$Result.GetResult<Prisma.$TenantKpiConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TenantKpiConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantKpiConfigFindFirstArgs} args - Arguments to find a TenantKpiConfig
     * @example
     * // Get one TenantKpiConfig
     * const tenantKpiConfig = await prisma.tenantKpiConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TenantKpiConfigFindFirstArgs>(args?: SelectSubset<T, TenantKpiConfigFindFirstArgs<ExtArgs>>): Prisma__TenantKpiConfigClient<$Result.GetResult<Prisma.$TenantKpiConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TenantKpiConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantKpiConfigFindFirstOrThrowArgs} args - Arguments to find a TenantKpiConfig
     * @example
     * // Get one TenantKpiConfig
     * const tenantKpiConfig = await prisma.tenantKpiConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TenantKpiConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, TenantKpiConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__TenantKpiConfigClient<$Result.GetResult<Prisma.$TenantKpiConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TenantKpiConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantKpiConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TenantKpiConfigs
     * const tenantKpiConfigs = await prisma.tenantKpiConfig.findMany()
     * 
     * // Get first 10 TenantKpiConfigs
     * const tenantKpiConfigs = await prisma.tenantKpiConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tenantKpiConfigWithIdOnly = await prisma.tenantKpiConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TenantKpiConfigFindManyArgs>(args?: SelectSubset<T, TenantKpiConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantKpiConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TenantKpiConfig.
     * @param {TenantKpiConfigCreateArgs} args - Arguments to create a TenantKpiConfig.
     * @example
     * // Create one TenantKpiConfig
     * const TenantKpiConfig = await prisma.tenantKpiConfig.create({
     *   data: {
     *     // ... data to create a TenantKpiConfig
     *   }
     * })
     * 
     */
    create<T extends TenantKpiConfigCreateArgs>(args: SelectSubset<T, TenantKpiConfigCreateArgs<ExtArgs>>): Prisma__TenantKpiConfigClient<$Result.GetResult<Prisma.$TenantKpiConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TenantKpiConfigs.
     * @param {TenantKpiConfigCreateManyArgs} args - Arguments to create many TenantKpiConfigs.
     * @example
     * // Create many TenantKpiConfigs
     * const tenantKpiConfig = await prisma.tenantKpiConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TenantKpiConfigCreateManyArgs>(args?: SelectSubset<T, TenantKpiConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TenantKpiConfigs and returns the data saved in the database.
     * @param {TenantKpiConfigCreateManyAndReturnArgs} args - Arguments to create many TenantKpiConfigs.
     * @example
     * // Create many TenantKpiConfigs
     * const tenantKpiConfig = await prisma.tenantKpiConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TenantKpiConfigs and only return the `id`
     * const tenantKpiConfigWithIdOnly = await prisma.tenantKpiConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TenantKpiConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, TenantKpiConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantKpiConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TenantKpiConfig.
     * @param {TenantKpiConfigDeleteArgs} args - Arguments to delete one TenantKpiConfig.
     * @example
     * // Delete one TenantKpiConfig
     * const TenantKpiConfig = await prisma.tenantKpiConfig.delete({
     *   where: {
     *     // ... filter to delete one TenantKpiConfig
     *   }
     * })
     * 
     */
    delete<T extends TenantKpiConfigDeleteArgs>(args: SelectSubset<T, TenantKpiConfigDeleteArgs<ExtArgs>>): Prisma__TenantKpiConfigClient<$Result.GetResult<Prisma.$TenantKpiConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TenantKpiConfig.
     * @param {TenantKpiConfigUpdateArgs} args - Arguments to update one TenantKpiConfig.
     * @example
     * // Update one TenantKpiConfig
     * const tenantKpiConfig = await prisma.tenantKpiConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TenantKpiConfigUpdateArgs>(args: SelectSubset<T, TenantKpiConfigUpdateArgs<ExtArgs>>): Prisma__TenantKpiConfigClient<$Result.GetResult<Prisma.$TenantKpiConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TenantKpiConfigs.
     * @param {TenantKpiConfigDeleteManyArgs} args - Arguments to filter TenantKpiConfigs to delete.
     * @example
     * // Delete a few TenantKpiConfigs
     * const { count } = await prisma.tenantKpiConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TenantKpiConfigDeleteManyArgs>(args?: SelectSubset<T, TenantKpiConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TenantKpiConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantKpiConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TenantKpiConfigs
     * const tenantKpiConfig = await prisma.tenantKpiConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TenantKpiConfigUpdateManyArgs>(args: SelectSubset<T, TenantKpiConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TenantKpiConfigs and returns the data updated in the database.
     * @param {TenantKpiConfigUpdateManyAndReturnArgs} args - Arguments to update many TenantKpiConfigs.
     * @example
     * // Update many TenantKpiConfigs
     * const tenantKpiConfig = await prisma.tenantKpiConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TenantKpiConfigs and only return the `id`
     * const tenantKpiConfigWithIdOnly = await prisma.tenantKpiConfig.updateManyAndReturn({
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
    updateManyAndReturn<T extends TenantKpiConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, TenantKpiConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantKpiConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TenantKpiConfig.
     * @param {TenantKpiConfigUpsertArgs} args - Arguments to update or create a TenantKpiConfig.
     * @example
     * // Update or create a TenantKpiConfig
     * const tenantKpiConfig = await prisma.tenantKpiConfig.upsert({
     *   create: {
     *     // ... data to create a TenantKpiConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TenantKpiConfig we want to update
     *   }
     * })
     */
    upsert<T extends TenantKpiConfigUpsertArgs>(args: SelectSubset<T, TenantKpiConfigUpsertArgs<ExtArgs>>): Prisma__TenantKpiConfigClient<$Result.GetResult<Prisma.$TenantKpiConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TenantKpiConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantKpiConfigCountArgs} args - Arguments to filter TenantKpiConfigs to count.
     * @example
     * // Count the number of TenantKpiConfigs
     * const count = await prisma.tenantKpiConfig.count({
     *   where: {
     *     // ... the filter for the TenantKpiConfigs we want to count
     *   }
     * })
    **/
    count<T extends TenantKpiConfigCountArgs>(
      args?: Subset<T, TenantKpiConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TenantKpiConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TenantKpiConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantKpiConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TenantKpiConfigAggregateArgs>(args: Subset<T, TenantKpiConfigAggregateArgs>): Prisma.PrismaPromise<GetTenantKpiConfigAggregateType<T>>

    /**
     * Group by TenantKpiConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantKpiConfigGroupByArgs} args - Group by arguments.
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
      T extends TenantKpiConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TenantKpiConfigGroupByArgs['orderBy'] }
        : { orderBy?: TenantKpiConfigGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TenantKpiConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTenantKpiConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TenantKpiConfig model
   */
  readonly fields: TenantKpiConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TenantKpiConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TenantKpiConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the TenantKpiConfig model
   */
  interface TenantKpiConfigFieldRefs {
    readonly id: FieldRef<"TenantKpiConfig", 'String'>
    readonly tenantId: FieldRef<"TenantKpiConfig", 'String'>
    readonly kpiCode: FieldRef<"TenantKpiConfig", 'String'>
    readonly position: FieldRef<"TenantKpiConfig", 'Json'>
    readonly size: FieldRef<"TenantKpiConfig", 'Json'>
    readonly isVisible: FieldRef<"TenantKpiConfig", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * TenantKpiConfig findUnique
   */
  export type TenantKpiConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantKpiConfig
     */
    select?: TenantKpiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantKpiConfig
     */
    omit?: TenantKpiConfigOmit<ExtArgs> | null
    /**
     * Filter, which TenantKpiConfig to fetch.
     */
    where: TenantKpiConfigWhereUniqueInput
  }

  /**
   * TenantKpiConfig findUniqueOrThrow
   */
  export type TenantKpiConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantKpiConfig
     */
    select?: TenantKpiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantKpiConfig
     */
    omit?: TenantKpiConfigOmit<ExtArgs> | null
    /**
     * Filter, which TenantKpiConfig to fetch.
     */
    where: TenantKpiConfigWhereUniqueInput
  }

  /**
   * TenantKpiConfig findFirst
   */
  export type TenantKpiConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantKpiConfig
     */
    select?: TenantKpiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantKpiConfig
     */
    omit?: TenantKpiConfigOmit<ExtArgs> | null
    /**
     * Filter, which TenantKpiConfig to fetch.
     */
    where?: TenantKpiConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantKpiConfigs to fetch.
     */
    orderBy?: TenantKpiConfigOrderByWithRelationInput | TenantKpiConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TenantKpiConfigs.
     */
    cursor?: TenantKpiConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantKpiConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantKpiConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TenantKpiConfigs.
     */
    distinct?: TenantKpiConfigScalarFieldEnum | TenantKpiConfigScalarFieldEnum[]
  }

  /**
   * TenantKpiConfig findFirstOrThrow
   */
  export type TenantKpiConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantKpiConfig
     */
    select?: TenantKpiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantKpiConfig
     */
    omit?: TenantKpiConfigOmit<ExtArgs> | null
    /**
     * Filter, which TenantKpiConfig to fetch.
     */
    where?: TenantKpiConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantKpiConfigs to fetch.
     */
    orderBy?: TenantKpiConfigOrderByWithRelationInput | TenantKpiConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TenantKpiConfigs.
     */
    cursor?: TenantKpiConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantKpiConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantKpiConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TenantKpiConfigs.
     */
    distinct?: TenantKpiConfigScalarFieldEnum | TenantKpiConfigScalarFieldEnum[]
  }

  /**
   * TenantKpiConfig findMany
   */
  export type TenantKpiConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantKpiConfig
     */
    select?: TenantKpiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantKpiConfig
     */
    omit?: TenantKpiConfigOmit<ExtArgs> | null
    /**
     * Filter, which TenantKpiConfigs to fetch.
     */
    where?: TenantKpiConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantKpiConfigs to fetch.
     */
    orderBy?: TenantKpiConfigOrderByWithRelationInput | TenantKpiConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TenantKpiConfigs.
     */
    cursor?: TenantKpiConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantKpiConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantKpiConfigs.
     */
    skip?: number
    distinct?: TenantKpiConfigScalarFieldEnum | TenantKpiConfigScalarFieldEnum[]
  }

  /**
   * TenantKpiConfig create
   */
  export type TenantKpiConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantKpiConfig
     */
    select?: TenantKpiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantKpiConfig
     */
    omit?: TenantKpiConfigOmit<ExtArgs> | null
    /**
     * The data needed to create a TenantKpiConfig.
     */
    data: XOR<TenantKpiConfigCreateInput, TenantKpiConfigUncheckedCreateInput>
  }

  /**
   * TenantKpiConfig createMany
   */
  export type TenantKpiConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TenantKpiConfigs.
     */
    data: TenantKpiConfigCreateManyInput | TenantKpiConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TenantKpiConfig createManyAndReturn
   */
  export type TenantKpiConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantKpiConfig
     */
    select?: TenantKpiConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TenantKpiConfig
     */
    omit?: TenantKpiConfigOmit<ExtArgs> | null
    /**
     * The data used to create many TenantKpiConfigs.
     */
    data: TenantKpiConfigCreateManyInput | TenantKpiConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TenantKpiConfig update
   */
  export type TenantKpiConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantKpiConfig
     */
    select?: TenantKpiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantKpiConfig
     */
    omit?: TenantKpiConfigOmit<ExtArgs> | null
    /**
     * The data needed to update a TenantKpiConfig.
     */
    data: XOR<TenantKpiConfigUpdateInput, TenantKpiConfigUncheckedUpdateInput>
    /**
     * Choose, which TenantKpiConfig to update.
     */
    where: TenantKpiConfigWhereUniqueInput
  }

  /**
   * TenantKpiConfig updateMany
   */
  export type TenantKpiConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TenantKpiConfigs.
     */
    data: XOR<TenantKpiConfigUpdateManyMutationInput, TenantKpiConfigUncheckedUpdateManyInput>
    /**
     * Filter which TenantKpiConfigs to update
     */
    where?: TenantKpiConfigWhereInput
    /**
     * Limit how many TenantKpiConfigs to update.
     */
    limit?: number
  }

  /**
   * TenantKpiConfig updateManyAndReturn
   */
  export type TenantKpiConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantKpiConfig
     */
    select?: TenantKpiConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TenantKpiConfig
     */
    omit?: TenantKpiConfigOmit<ExtArgs> | null
    /**
     * The data used to update TenantKpiConfigs.
     */
    data: XOR<TenantKpiConfigUpdateManyMutationInput, TenantKpiConfigUncheckedUpdateManyInput>
    /**
     * Filter which TenantKpiConfigs to update
     */
    where?: TenantKpiConfigWhereInput
    /**
     * Limit how many TenantKpiConfigs to update.
     */
    limit?: number
  }

  /**
   * TenantKpiConfig upsert
   */
  export type TenantKpiConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantKpiConfig
     */
    select?: TenantKpiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantKpiConfig
     */
    omit?: TenantKpiConfigOmit<ExtArgs> | null
    /**
     * The filter to search for the TenantKpiConfig to update in case it exists.
     */
    where: TenantKpiConfigWhereUniqueInput
    /**
     * In case the TenantKpiConfig found by the `where` argument doesn't exist, create a new TenantKpiConfig with this data.
     */
    create: XOR<TenantKpiConfigCreateInput, TenantKpiConfigUncheckedCreateInput>
    /**
     * In case the TenantKpiConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TenantKpiConfigUpdateInput, TenantKpiConfigUncheckedUpdateInput>
  }

  /**
   * TenantKpiConfig delete
   */
  export type TenantKpiConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantKpiConfig
     */
    select?: TenantKpiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantKpiConfig
     */
    omit?: TenantKpiConfigOmit<ExtArgs> | null
    /**
     * Filter which TenantKpiConfig to delete.
     */
    where: TenantKpiConfigWhereUniqueInput
  }

  /**
   * TenantKpiConfig deleteMany
   */
  export type TenantKpiConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TenantKpiConfigs to delete
     */
    where?: TenantKpiConfigWhereInput
    /**
     * Limit how many TenantKpiConfigs to delete.
     */
    limit?: number
  }

  /**
   * TenantKpiConfig without action
   */
  export type TenantKpiConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantKpiConfig
     */
    select?: TenantKpiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantKpiConfig
     */
    omit?: TenantKpiConfigOmit<ExtArgs> | null
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


  export const ProjectionFinancialSummaryScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    accountId: 'accountId',
    periodStart: 'periodStart',
    periodEnd: 'periodEnd',
    totalDebit: 'totalDebit',
    totalCredit: 'totalCredit',
    balance: 'balance',
    lastProcessedEventId: 'lastProcessedEventId',
    lastProcessedVersion: 'lastProcessedVersion',
    updatedAt: 'updatedAt'
  };

  export type ProjectionFinancialSummaryScalarFieldEnum = (typeof ProjectionFinancialSummaryScalarFieldEnum)[keyof typeof ProjectionFinancialSummaryScalarFieldEnum]


  export const ProjectionSalesSummaryScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    periodDate: 'periodDate',
    totalOrders: 'totalOrders',
    totalRevenue: 'totalRevenue',
    totalRefunds: 'totalRefunds',
    lastProcessedEventId: 'lastProcessedEventId',
    lastProcessedVersion: 'lastProcessedVersion',
    updatedAt: 'updatedAt'
  };

  export type ProjectionSalesSummaryScalarFieldEnum = (typeof ProjectionSalesSummaryScalarFieldEnum)[keyof typeof ProjectionSalesSummaryScalarFieldEnum]


  export const MetricSnapshotScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    metricCode: 'metricCode',
    snapshotDate: 'snapshotDate',
    value: 'value',
    metadata: 'metadata'
  };

  export type MetricSnapshotScalarFieldEnum = (typeof MetricSnapshotScalarFieldEnum)[keyof typeof MetricSnapshotScalarFieldEnum]


  export const RiskRuleScalarFieldEnum: {
    id: 'id',
    code: 'code',
    nameFa: 'nameFa',
    algorithm: 'algorithm',
    config: 'config',
    severity: 'severity',
    moduleCode: 'moduleCode',
    isActive: 'isActive'
  };

  export type RiskRuleScalarFieldEnum = (typeof RiskRuleScalarFieldEnum)[keyof typeof RiskRuleScalarFieldEnum]


  export const TenantRiskRuleScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    riskRuleId: 'riskRuleId',
    thresholdOverride: 'thresholdOverride',
    isActive: 'isActive'
  };

  export type TenantRiskRuleScalarFieldEnum = (typeof TenantRiskRuleScalarFieldEnum)[keyof typeof TenantRiskRuleScalarFieldEnum]


  export const RiskFindingScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    riskRuleId: 'riskRuleId',
    detectedAt: 'detectedAt',
    severity: 'severity',
    trend: 'trend',
    sourceModule: 'sourceModule',
    evidence: 'evidence',
    suggestionFa: 'suggestionFa',
    deduplicationKey: 'deduplicationKey'
  };

  export type RiskFindingScalarFieldEnum = (typeof RiskFindingScalarFieldEnum)[keyof typeof RiskFindingScalarFieldEnum]


  export const TenantKpiConfigScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    kpiCode: 'kpiCode',
    position: 'position',
    size: 'size',
    isVisible: 'isVisible'
  };

  export type TenantKpiConfigScalarFieldEnum = (typeof TenantKpiConfigScalarFieldEnum)[keyof typeof TenantKpiConfigScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'RiskAlgorithm'
   */
  export type EnumRiskAlgorithmFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RiskAlgorithm'>
    


  /**
   * Reference to a field of type 'RiskAlgorithm[]'
   */
  export type ListEnumRiskAlgorithmFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RiskAlgorithm[]'>
    


  /**
   * Reference to a field of type 'FindingSeverity'
   */
  export type EnumFindingSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FindingSeverity'>
    


  /**
   * Reference to a field of type 'FindingSeverity[]'
   */
  export type ListEnumFindingSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FindingSeverity[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'FindingTrend'
   */
  export type EnumFindingTrendFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FindingTrend'>
    


  /**
   * Reference to a field of type 'FindingTrend[]'
   */
  export type ListEnumFindingTrendFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FindingTrend[]'>
    


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


  export type ProjectionFinancialSummaryWhereInput = {
    AND?: ProjectionFinancialSummaryWhereInput | ProjectionFinancialSummaryWhereInput[]
    OR?: ProjectionFinancialSummaryWhereInput[]
    NOT?: ProjectionFinancialSummaryWhereInput | ProjectionFinancialSummaryWhereInput[]
    id?: StringFilter<"ProjectionFinancialSummary"> | string
    tenantId?: StringFilter<"ProjectionFinancialSummary"> | string
    accountId?: StringFilter<"ProjectionFinancialSummary"> | string
    periodStart?: DateTimeFilter<"ProjectionFinancialSummary"> | Date | string
    periodEnd?: DateTimeFilter<"ProjectionFinancialSummary"> | Date | string
    totalDebit?: BigIntFilter<"ProjectionFinancialSummary"> | bigint | number
    totalCredit?: BigIntFilter<"ProjectionFinancialSummary"> | bigint | number
    balance?: BigIntFilter<"ProjectionFinancialSummary"> | bigint | number
    lastProcessedEventId?: StringFilter<"ProjectionFinancialSummary"> | string
    lastProcessedVersion?: IntFilter<"ProjectionFinancialSummary"> | number
    updatedAt?: DateTimeFilter<"ProjectionFinancialSummary"> | Date | string
  }

  export type ProjectionFinancialSummaryOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    accountId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    totalDebit?: SortOrder
    totalCredit?: SortOrder
    balance?: SortOrder
    lastProcessedEventId?: SortOrder
    lastProcessedVersion?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectionFinancialSummaryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_accountId_periodStart?: ProjectionFinancialSummaryTenantIdAccountIdPeriodStartCompoundUniqueInput
    AND?: ProjectionFinancialSummaryWhereInput | ProjectionFinancialSummaryWhereInput[]
    OR?: ProjectionFinancialSummaryWhereInput[]
    NOT?: ProjectionFinancialSummaryWhereInput | ProjectionFinancialSummaryWhereInput[]
    tenantId?: StringFilter<"ProjectionFinancialSummary"> | string
    accountId?: StringFilter<"ProjectionFinancialSummary"> | string
    periodStart?: DateTimeFilter<"ProjectionFinancialSummary"> | Date | string
    periodEnd?: DateTimeFilter<"ProjectionFinancialSummary"> | Date | string
    totalDebit?: BigIntFilter<"ProjectionFinancialSummary"> | bigint | number
    totalCredit?: BigIntFilter<"ProjectionFinancialSummary"> | bigint | number
    balance?: BigIntFilter<"ProjectionFinancialSummary"> | bigint | number
    lastProcessedEventId?: StringFilter<"ProjectionFinancialSummary"> | string
    lastProcessedVersion?: IntFilter<"ProjectionFinancialSummary"> | number
    updatedAt?: DateTimeFilter<"ProjectionFinancialSummary"> | Date | string
  }, "id" | "tenantId_accountId_periodStart">

  export type ProjectionFinancialSummaryOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    accountId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    totalDebit?: SortOrder
    totalCredit?: SortOrder
    balance?: SortOrder
    lastProcessedEventId?: SortOrder
    lastProcessedVersion?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectionFinancialSummaryCountOrderByAggregateInput
    _avg?: ProjectionFinancialSummaryAvgOrderByAggregateInput
    _max?: ProjectionFinancialSummaryMaxOrderByAggregateInput
    _min?: ProjectionFinancialSummaryMinOrderByAggregateInput
    _sum?: ProjectionFinancialSummarySumOrderByAggregateInput
  }

  export type ProjectionFinancialSummaryScalarWhereWithAggregatesInput = {
    AND?: ProjectionFinancialSummaryScalarWhereWithAggregatesInput | ProjectionFinancialSummaryScalarWhereWithAggregatesInput[]
    OR?: ProjectionFinancialSummaryScalarWhereWithAggregatesInput[]
    NOT?: ProjectionFinancialSummaryScalarWhereWithAggregatesInput | ProjectionFinancialSummaryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProjectionFinancialSummary"> | string
    tenantId?: StringWithAggregatesFilter<"ProjectionFinancialSummary"> | string
    accountId?: StringWithAggregatesFilter<"ProjectionFinancialSummary"> | string
    periodStart?: DateTimeWithAggregatesFilter<"ProjectionFinancialSummary"> | Date | string
    periodEnd?: DateTimeWithAggregatesFilter<"ProjectionFinancialSummary"> | Date | string
    totalDebit?: BigIntWithAggregatesFilter<"ProjectionFinancialSummary"> | bigint | number
    totalCredit?: BigIntWithAggregatesFilter<"ProjectionFinancialSummary"> | bigint | number
    balance?: BigIntWithAggregatesFilter<"ProjectionFinancialSummary"> | bigint | number
    lastProcessedEventId?: StringWithAggregatesFilter<"ProjectionFinancialSummary"> | string
    lastProcessedVersion?: IntWithAggregatesFilter<"ProjectionFinancialSummary"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"ProjectionFinancialSummary"> | Date | string
  }

  export type ProjectionSalesSummaryWhereInput = {
    AND?: ProjectionSalesSummaryWhereInput | ProjectionSalesSummaryWhereInput[]
    OR?: ProjectionSalesSummaryWhereInput[]
    NOT?: ProjectionSalesSummaryWhereInput | ProjectionSalesSummaryWhereInput[]
    id?: StringFilter<"ProjectionSalesSummary"> | string
    tenantId?: StringFilter<"ProjectionSalesSummary"> | string
    periodDate?: DateTimeFilter<"ProjectionSalesSummary"> | Date | string
    totalOrders?: IntFilter<"ProjectionSalesSummary"> | number
    totalRevenue?: DecimalFilter<"ProjectionSalesSummary"> | Decimal | DecimalJsLike | number | string
    totalRefunds?: DecimalFilter<"ProjectionSalesSummary"> | Decimal | DecimalJsLike | number | string
    lastProcessedEventId?: StringFilter<"ProjectionSalesSummary"> | string
    lastProcessedVersion?: IntFilter<"ProjectionSalesSummary"> | number
    updatedAt?: DateTimeFilter<"ProjectionSalesSummary"> | Date | string
  }

  export type ProjectionSalesSummaryOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    periodDate?: SortOrder
    totalOrders?: SortOrder
    totalRevenue?: SortOrder
    totalRefunds?: SortOrder
    lastProcessedEventId?: SortOrder
    lastProcessedVersion?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectionSalesSummaryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_periodDate?: ProjectionSalesSummaryTenantIdPeriodDateCompoundUniqueInput
    AND?: ProjectionSalesSummaryWhereInput | ProjectionSalesSummaryWhereInput[]
    OR?: ProjectionSalesSummaryWhereInput[]
    NOT?: ProjectionSalesSummaryWhereInput | ProjectionSalesSummaryWhereInput[]
    tenantId?: StringFilter<"ProjectionSalesSummary"> | string
    periodDate?: DateTimeFilter<"ProjectionSalesSummary"> | Date | string
    totalOrders?: IntFilter<"ProjectionSalesSummary"> | number
    totalRevenue?: DecimalFilter<"ProjectionSalesSummary"> | Decimal | DecimalJsLike | number | string
    totalRefunds?: DecimalFilter<"ProjectionSalesSummary"> | Decimal | DecimalJsLike | number | string
    lastProcessedEventId?: StringFilter<"ProjectionSalesSummary"> | string
    lastProcessedVersion?: IntFilter<"ProjectionSalesSummary"> | number
    updatedAt?: DateTimeFilter<"ProjectionSalesSummary"> | Date | string
  }, "id" | "tenantId_periodDate">

  export type ProjectionSalesSummaryOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    periodDate?: SortOrder
    totalOrders?: SortOrder
    totalRevenue?: SortOrder
    totalRefunds?: SortOrder
    lastProcessedEventId?: SortOrder
    lastProcessedVersion?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectionSalesSummaryCountOrderByAggregateInput
    _avg?: ProjectionSalesSummaryAvgOrderByAggregateInput
    _max?: ProjectionSalesSummaryMaxOrderByAggregateInput
    _min?: ProjectionSalesSummaryMinOrderByAggregateInput
    _sum?: ProjectionSalesSummarySumOrderByAggregateInput
  }

  export type ProjectionSalesSummaryScalarWhereWithAggregatesInput = {
    AND?: ProjectionSalesSummaryScalarWhereWithAggregatesInput | ProjectionSalesSummaryScalarWhereWithAggregatesInput[]
    OR?: ProjectionSalesSummaryScalarWhereWithAggregatesInput[]
    NOT?: ProjectionSalesSummaryScalarWhereWithAggregatesInput | ProjectionSalesSummaryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProjectionSalesSummary"> | string
    tenantId?: StringWithAggregatesFilter<"ProjectionSalesSummary"> | string
    periodDate?: DateTimeWithAggregatesFilter<"ProjectionSalesSummary"> | Date | string
    totalOrders?: IntWithAggregatesFilter<"ProjectionSalesSummary"> | number
    totalRevenue?: DecimalWithAggregatesFilter<"ProjectionSalesSummary"> | Decimal | DecimalJsLike | number | string
    totalRefunds?: DecimalWithAggregatesFilter<"ProjectionSalesSummary"> | Decimal | DecimalJsLike | number | string
    lastProcessedEventId?: StringWithAggregatesFilter<"ProjectionSalesSummary"> | string
    lastProcessedVersion?: IntWithAggregatesFilter<"ProjectionSalesSummary"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"ProjectionSalesSummary"> | Date | string
  }

  export type MetricSnapshotWhereInput = {
    AND?: MetricSnapshotWhereInput | MetricSnapshotWhereInput[]
    OR?: MetricSnapshotWhereInput[]
    NOT?: MetricSnapshotWhereInput | MetricSnapshotWhereInput[]
    id?: StringFilter<"MetricSnapshot"> | string
    tenantId?: StringFilter<"MetricSnapshot"> | string
    metricCode?: StringFilter<"MetricSnapshot"> | string
    snapshotDate?: DateTimeFilter<"MetricSnapshot"> | Date | string
    value?: DecimalFilter<"MetricSnapshot"> | Decimal | DecimalJsLike | number | string
    metadata?: JsonNullableFilter<"MetricSnapshot">
  }

  export type MetricSnapshotOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    metricCode?: SortOrder
    snapshotDate?: SortOrder
    value?: SortOrder
    metadata?: SortOrderInput | SortOrder
  }

  export type MetricSnapshotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_metricCode_snapshotDate?: MetricSnapshotTenantIdMetricCodeSnapshotDateCompoundUniqueInput
    AND?: MetricSnapshotWhereInput | MetricSnapshotWhereInput[]
    OR?: MetricSnapshotWhereInput[]
    NOT?: MetricSnapshotWhereInput | MetricSnapshotWhereInput[]
    tenantId?: StringFilter<"MetricSnapshot"> | string
    metricCode?: StringFilter<"MetricSnapshot"> | string
    snapshotDate?: DateTimeFilter<"MetricSnapshot"> | Date | string
    value?: DecimalFilter<"MetricSnapshot"> | Decimal | DecimalJsLike | number | string
    metadata?: JsonNullableFilter<"MetricSnapshot">
  }, "id" | "tenantId_metricCode_snapshotDate">

  export type MetricSnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    metricCode?: SortOrder
    snapshotDate?: SortOrder
    value?: SortOrder
    metadata?: SortOrderInput | SortOrder
    _count?: MetricSnapshotCountOrderByAggregateInput
    _avg?: MetricSnapshotAvgOrderByAggregateInput
    _max?: MetricSnapshotMaxOrderByAggregateInput
    _min?: MetricSnapshotMinOrderByAggregateInput
    _sum?: MetricSnapshotSumOrderByAggregateInput
  }

  export type MetricSnapshotScalarWhereWithAggregatesInput = {
    AND?: MetricSnapshotScalarWhereWithAggregatesInput | MetricSnapshotScalarWhereWithAggregatesInput[]
    OR?: MetricSnapshotScalarWhereWithAggregatesInput[]
    NOT?: MetricSnapshotScalarWhereWithAggregatesInput | MetricSnapshotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MetricSnapshot"> | string
    tenantId?: StringWithAggregatesFilter<"MetricSnapshot"> | string
    metricCode?: StringWithAggregatesFilter<"MetricSnapshot"> | string
    snapshotDate?: DateTimeWithAggregatesFilter<"MetricSnapshot"> | Date | string
    value?: DecimalWithAggregatesFilter<"MetricSnapshot"> | Decimal | DecimalJsLike | number | string
    metadata?: JsonNullableWithAggregatesFilter<"MetricSnapshot">
  }

  export type RiskRuleWhereInput = {
    AND?: RiskRuleWhereInput | RiskRuleWhereInput[]
    OR?: RiskRuleWhereInput[]
    NOT?: RiskRuleWhereInput | RiskRuleWhereInput[]
    id?: StringFilter<"RiskRule"> | string
    code?: StringFilter<"RiskRule"> | string
    nameFa?: StringFilter<"RiskRule"> | string
    algorithm?: EnumRiskAlgorithmFilter<"RiskRule"> | $Enums.RiskAlgorithm
    config?: JsonFilter<"RiskRule">
    severity?: EnumFindingSeverityFilter<"RiskRule"> | $Enums.FindingSeverity
    moduleCode?: StringFilter<"RiskRule"> | string
    isActive?: BoolFilter<"RiskRule"> | boolean
    tenantRules?: TenantRiskRuleListRelationFilter
    findings?: RiskFindingListRelationFilter
  }

  export type RiskRuleOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    nameFa?: SortOrder
    algorithm?: SortOrder
    config?: SortOrder
    severity?: SortOrder
    moduleCode?: SortOrder
    isActive?: SortOrder
    tenantRules?: TenantRiskRuleOrderByRelationAggregateInput
    findings?: RiskFindingOrderByRelationAggregateInput
  }

  export type RiskRuleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: RiskRuleWhereInput | RiskRuleWhereInput[]
    OR?: RiskRuleWhereInput[]
    NOT?: RiskRuleWhereInput | RiskRuleWhereInput[]
    nameFa?: StringFilter<"RiskRule"> | string
    algorithm?: EnumRiskAlgorithmFilter<"RiskRule"> | $Enums.RiskAlgorithm
    config?: JsonFilter<"RiskRule">
    severity?: EnumFindingSeverityFilter<"RiskRule"> | $Enums.FindingSeverity
    moduleCode?: StringFilter<"RiskRule"> | string
    isActive?: BoolFilter<"RiskRule"> | boolean
    tenantRules?: TenantRiskRuleListRelationFilter
    findings?: RiskFindingListRelationFilter
  }, "id" | "code">

  export type RiskRuleOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    nameFa?: SortOrder
    algorithm?: SortOrder
    config?: SortOrder
    severity?: SortOrder
    moduleCode?: SortOrder
    isActive?: SortOrder
    _count?: RiskRuleCountOrderByAggregateInput
    _max?: RiskRuleMaxOrderByAggregateInput
    _min?: RiskRuleMinOrderByAggregateInput
  }

  export type RiskRuleScalarWhereWithAggregatesInput = {
    AND?: RiskRuleScalarWhereWithAggregatesInput | RiskRuleScalarWhereWithAggregatesInput[]
    OR?: RiskRuleScalarWhereWithAggregatesInput[]
    NOT?: RiskRuleScalarWhereWithAggregatesInput | RiskRuleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RiskRule"> | string
    code?: StringWithAggregatesFilter<"RiskRule"> | string
    nameFa?: StringWithAggregatesFilter<"RiskRule"> | string
    algorithm?: EnumRiskAlgorithmWithAggregatesFilter<"RiskRule"> | $Enums.RiskAlgorithm
    config?: JsonWithAggregatesFilter<"RiskRule">
    severity?: EnumFindingSeverityWithAggregatesFilter<"RiskRule"> | $Enums.FindingSeverity
    moduleCode?: StringWithAggregatesFilter<"RiskRule"> | string
    isActive?: BoolWithAggregatesFilter<"RiskRule"> | boolean
  }

  export type TenantRiskRuleWhereInput = {
    AND?: TenantRiskRuleWhereInput | TenantRiskRuleWhereInput[]
    OR?: TenantRiskRuleWhereInput[]
    NOT?: TenantRiskRuleWhereInput | TenantRiskRuleWhereInput[]
    id?: StringFilter<"TenantRiskRule"> | string
    tenantId?: StringFilter<"TenantRiskRule"> | string
    riskRuleId?: StringFilter<"TenantRiskRule"> | string
    thresholdOverride?: DecimalNullableFilter<"TenantRiskRule"> | Decimal | DecimalJsLike | number | string | null
    isActive?: BoolFilter<"TenantRiskRule"> | boolean
    riskRule?: XOR<RiskRuleScalarRelationFilter, RiskRuleWhereInput>
  }

  export type TenantRiskRuleOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    riskRuleId?: SortOrder
    thresholdOverride?: SortOrderInput | SortOrder
    isActive?: SortOrder
    riskRule?: RiskRuleOrderByWithRelationInput
  }

  export type TenantRiskRuleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_riskRuleId?: TenantRiskRuleTenantIdRiskRuleIdCompoundUniqueInput
    AND?: TenantRiskRuleWhereInput | TenantRiskRuleWhereInput[]
    OR?: TenantRiskRuleWhereInput[]
    NOT?: TenantRiskRuleWhereInput | TenantRiskRuleWhereInput[]
    tenantId?: StringFilter<"TenantRiskRule"> | string
    riskRuleId?: StringFilter<"TenantRiskRule"> | string
    thresholdOverride?: DecimalNullableFilter<"TenantRiskRule"> | Decimal | DecimalJsLike | number | string | null
    isActive?: BoolFilter<"TenantRiskRule"> | boolean
    riskRule?: XOR<RiskRuleScalarRelationFilter, RiskRuleWhereInput>
  }, "id" | "tenantId_riskRuleId">

  export type TenantRiskRuleOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    riskRuleId?: SortOrder
    thresholdOverride?: SortOrderInput | SortOrder
    isActive?: SortOrder
    _count?: TenantRiskRuleCountOrderByAggregateInput
    _avg?: TenantRiskRuleAvgOrderByAggregateInput
    _max?: TenantRiskRuleMaxOrderByAggregateInput
    _min?: TenantRiskRuleMinOrderByAggregateInput
    _sum?: TenantRiskRuleSumOrderByAggregateInput
  }

  export type TenantRiskRuleScalarWhereWithAggregatesInput = {
    AND?: TenantRiskRuleScalarWhereWithAggregatesInput | TenantRiskRuleScalarWhereWithAggregatesInput[]
    OR?: TenantRiskRuleScalarWhereWithAggregatesInput[]
    NOT?: TenantRiskRuleScalarWhereWithAggregatesInput | TenantRiskRuleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TenantRiskRule"> | string
    tenantId?: StringWithAggregatesFilter<"TenantRiskRule"> | string
    riskRuleId?: StringWithAggregatesFilter<"TenantRiskRule"> | string
    thresholdOverride?: DecimalNullableWithAggregatesFilter<"TenantRiskRule"> | Decimal | DecimalJsLike | number | string | null
    isActive?: BoolWithAggregatesFilter<"TenantRiskRule"> | boolean
  }

  export type RiskFindingWhereInput = {
    AND?: RiskFindingWhereInput | RiskFindingWhereInput[]
    OR?: RiskFindingWhereInput[]
    NOT?: RiskFindingWhereInput | RiskFindingWhereInput[]
    id?: StringFilter<"RiskFinding"> | string
    tenantId?: StringFilter<"RiskFinding"> | string
    riskRuleId?: StringFilter<"RiskFinding"> | string
    detectedAt?: DateTimeFilter<"RiskFinding"> | Date | string
    severity?: EnumFindingSeverityFilter<"RiskFinding"> | $Enums.FindingSeverity
    trend?: EnumFindingTrendFilter<"RiskFinding"> | $Enums.FindingTrend
    sourceModule?: StringFilter<"RiskFinding"> | string
    evidence?: JsonFilter<"RiskFinding">
    suggestionFa?: StringFilter<"RiskFinding"> | string
    deduplicationKey?: StringFilter<"RiskFinding"> | string
    riskRule?: XOR<RiskRuleScalarRelationFilter, RiskRuleWhereInput>
  }

  export type RiskFindingOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    riskRuleId?: SortOrder
    detectedAt?: SortOrder
    severity?: SortOrder
    trend?: SortOrder
    sourceModule?: SortOrder
    evidence?: SortOrder
    suggestionFa?: SortOrder
    deduplicationKey?: SortOrder
    riskRule?: RiskRuleOrderByWithRelationInput
  }

  export type RiskFindingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_deduplicationKey?: RiskFindingTenantIdDeduplicationKeyCompoundUniqueInput
    AND?: RiskFindingWhereInput | RiskFindingWhereInput[]
    OR?: RiskFindingWhereInput[]
    NOT?: RiskFindingWhereInput | RiskFindingWhereInput[]
    tenantId?: StringFilter<"RiskFinding"> | string
    riskRuleId?: StringFilter<"RiskFinding"> | string
    detectedAt?: DateTimeFilter<"RiskFinding"> | Date | string
    severity?: EnumFindingSeverityFilter<"RiskFinding"> | $Enums.FindingSeverity
    trend?: EnumFindingTrendFilter<"RiskFinding"> | $Enums.FindingTrend
    sourceModule?: StringFilter<"RiskFinding"> | string
    evidence?: JsonFilter<"RiskFinding">
    suggestionFa?: StringFilter<"RiskFinding"> | string
    deduplicationKey?: StringFilter<"RiskFinding"> | string
    riskRule?: XOR<RiskRuleScalarRelationFilter, RiskRuleWhereInput>
  }, "id" | "tenantId_deduplicationKey">

  export type RiskFindingOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    riskRuleId?: SortOrder
    detectedAt?: SortOrder
    severity?: SortOrder
    trend?: SortOrder
    sourceModule?: SortOrder
    evidence?: SortOrder
    suggestionFa?: SortOrder
    deduplicationKey?: SortOrder
    _count?: RiskFindingCountOrderByAggregateInput
    _max?: RiskFindingMaxOrderByAggregateInput
    _min?: RiskFindingMinOrderByAggregateInput
  }

  export type RiskFindingScalarWhereWithAggregatesInput = {
    AND?: RiskFindingScalarWhereWithAggregatesInput | RiskFindingScalarWhereWithAggregatesInput[]
    OR?: RiskFindingScalarWhereWithAggregatesInput[]
    NOT?: RiskFindingScalarWhereWithAggregatesInput | RiskFindingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RiskFinding"> | string
    tenantId?: StringWithAggregatesFilter<"RiskFinding"> | string
    riskRuleId?: StringWithAggregatesFilter<"RiskFinding"> | string
    detectedAt?: DateTimeWithAggregatesFilter<"RiskFinding"> | Date | string
    severity?: EnumFindingSeverityWithAggregatesFilter<"RiskFinding"> | $Enums.FindingSeverity
    trend?: EnumFindingTrendWithAggregatesFilter<"RiskFinding"> | $Enums.FindingTrend
    sourceModule?: StringWithAggregatesFilter<"RiskFinding"> | string
    evidence?: JsonWithAggregatesFilter<"RiskFinding">
    suggestionFa?: StringWithAggregatesFilter<"RiskFinding"> | string
    deduplicationKey?: StringWithAggregatesFilter<"RiskFinding"> | string
  }

  export type TenantKpiConfigWhereInput = {
    AND?: TenantKpiConfigWhereInput | TenantKpiConfigWhereInput[]
    OR?: TenantKpiConfigWhereInput[]
    NOT?: TenantKpiConfigWhereInput | TenantKpiConfigWhereInput[]
    id?: StringFilter<"TenantKpiConfig"> | string
    tenantId?: StringFilter<"TenantKpiConfig"> | string
    kpiCode?: StringFilter<"TenantKpiConfig"> | string
    position?: JsonFilter<"TenantKpiConfig">
    size?: JsonFilter<"TenantKpiConfig">
    isVisible?: BoolFilter<"TenantKpiConfig"> | boolean
  }

  export type TenantKpiConfigOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    kpiCode?: SortOrder
    position?: SortOrder
    size?: SortOrder
    isVisible?: SortOrder
  }

  export type TenantKpiConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_kpiCode?: TenantKpiConfigTenantIdKpiCodeCompoundUniqueInput
    AND?: TenantKpiConfigWhereInput | TenantKpiConfigWhereInput[]
    OR?: TenantKpiConfigWhereInput[]
    NOT?: TenantKpiConfigWhereInput | TenantKpiConfigWhereInput[]
    tenantId?: StringFilter<"TenantKpiConfig"> | string
    kpiCode?: StringFilter<"TenantKpiConfig"> | string
    position?: JsonFilter<"TenantKpiConfig">
    size?: JsonFilter<"TenantKpiConfig">
    isVisible?: BoolFilter<"TenantKpiConfig"> | boolean
  }, "id" | "tenantId_kpiCode">

  export type TenantKpiConfigOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    kpiCode?: SortOrder
    position?: SortOrder
    size?: SortOrder
    isVisible?: SortOrder
    _count?: TenantKpiConfigCountOrderByAggregateInput
    _max?: TenantKpiConfigMaxOrderByAggregateInput
    _min?: TenantKpiConfigMinOrderByAggregateInput
  }

  export type TenantKpiConfigScalarWhereWithAggregatesInput = {
    AND?: TenantKpiConfigScalarWhereWithAggregatesInput | TenantKpiConfigScalarWhereWithAggregatesInput[]
    OR?: TenantKpiConfigScalarWhereWithAggregatesInput[]
    NOT?: TenantKpiConfigScalarWhereWithAggregatesInput | TenantKpiConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TenantKpiConfig"> | string
    tenantId?: StringWithAggregatesFilter<"TenantKpiConfig"> | string
    kpiCode?: StringWithAggregatesFilter<"TenantKpiConfig"> | string
    position?: JsonWithAggregatesFilter<"TenantKpiConfig">
    size?: JsonWithAggregatesFilter<"TenantKpiConfig">
    isVisible?: BoolWithAggregatesFilter<"TenantKpiConfig"> | boolean
  }

  export type ProjectionFinancialSummaryCreateInput = {
    id?: string
    tenantId: string
    accountId: string
    periodStart: Date | string
    periodEnd: Date | string
    totalDebit: bigint | number
    totalCredit: bigint | number
    balance: bigint | number
    lastProcessedEventId: string
    lastProcessedVersion: number
    updatedAt?: Date | string
  }

  export type ProjectionFinancialSummaryUncheckedCreateInput = {
    id?: string
    tenantId: string
    accountId: string
    periodStart: Date | string
    periodEnd: Date | string
    totalDebit: bigint | number
    totalCredit: bigint | number
    balance: bigint | number
    lastProcessedEventId: string
    lastProcessedVersion: number
    updatedAt?: Date | string
  }

  export type ProjectionFinancialSummaryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    totalDebit?: BigIntFieldUpdateOperationsInput | bigint | number
    totalCredit?: BigIntFieldUpdateOperationsInput | bigint | number
    balance?: BigIntFieldUpdateOperationsInput | bigint | number
    lastProcessedEventId?: StringFieldUpdateOperationsInput | string
    lastProcessedVersion?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectionFinancialSummaryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    totalDebit?: BigIntFieldUpdateOperationsInput | bigint | number
    totalCredit?: BigIntFieldUpdateOperationsInput | bigint | number
    balance?: BigIntFieldUpdateOperationsInput | bigint | number
    lastProcessedEventId?: StringFieldUpdateOperationsInput | string
    lastProcessedVersion?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectionFinancialSummaryCreateManyInput = {
    id?: string
    tenantId: string
    accountId: string
    periodStart: Date | string
    periodEnd: Date | string
    totalDebit: bigint | number
    totalCredit: bigint | number
    balance: bigint | number
    lastProcessedEventId: string
    lastProcessedVersion: number
    updatedAt?: Date | string
  }

  export type ProjectionFinancialSummaryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    totalDebit?: BigIntFieldUpdateOperationsInput | bigint | number
    totalCredit?: BigIntFieldUpdateOperationsInput | bigint | number
    balance?: BigIntFieldUpdateOperationsInput | bigint | number
    lastProcessedEventId?: StringFieldUpdateOperationsInput | string
    lastProcessedVersion?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectionFinancialSummaryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    totalDebit?: BigIntFieldUpdateOperationsInput | bigint | number
    totalCredit?: BigIntFieldUpdateOperationsInput | bigint | number
    balance?: BigIntFieldUpdateOperationsInput | bigint | number
    lastProcessedEventId?: StringFieldUpdateOperationsInput | string
    lastProcessedVersion?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectionSalesSummaryCreateInput = {
    id?: string
    tenantId: string
    periodDate: Date | string
    totalOrders: number
    totalRevenue: Decimal | DecimalJsLike | number | string
    totalRefunds: Decimal | DecimalJsLike | number | string
    lastProcessedEventId: string
    lastProcessedVersion: number
    updatedAt?: Date | string
  }

  export type ProjectionSalesSummaryUncheckedCreateInput = {
    id?: string
    tenantId: string
    periodDate: Date | string
    totalOrders: number
    totalRevenue: Decimal | DecimalJsLike | number | string
    totalRefunds: Decimal | DecimalJsLike | number | string
    lastProcessedEventId: string
    lastProcessedVersion: number
    updatedAt?: Date | string
  }

  export type ProjectionSalesSummaryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    periodDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalOrders?: IntFieldUpdateOperationsInput | number
    totalRevenue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalRefunds?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastProcessedEventId?: StringFieldUpdateOperationsInput | string
    lastProcessedVersion?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectionSalesSummaryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    periodDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalOrders?: IntFieldUpdateOperationsInput | number
    totalRevenue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalRefunds?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastProcessedEventId?: StringFieldUpdateOperationsInput | string
    lastProcessedVersion?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectionSalesSummaryCreateManyInput = {
    id?: string
    tenantId: string
    periodDate: Date | string
    totalOrders: number
    totalRevenue: Decimal | DecimalJsLike | number | string
    totalRefunds: Decimal | DecimalJsLike | number | string
    lastProcessedEventId: string
    lastProcessedVersion: number
    updatedAt?: Date | string
  }

  export type ProjectionSalesSummaryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    periodDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalOrders?: IntFieldUpdateOperationsInput | number
    totalRevenue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalRefunds?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastProcessedEventId?: StringFieldUpdateOperationsInput | string
    lastProcessedVersion?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectionSalesSummaryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    periodDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalOrders?: IntFieldUpdateOperationsInput | number
    totalRevenue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalRefunds?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastProcessedEventId?: StringFieldUpdateOperationsInput | string
    lastProcessedVersion?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MetricSnapshotCreateInput = {
    id?: string
    tenantId: string
    metricCode: string
    snapshotDate: Date | string
    value: Decimal | DecimalJsLike | number | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type MetricSnapshotUncheckedCreateInput = {
    id?: string
    tenantId: string
    metricCode: string
    snapshotDate: Date | string
    value: Decimal | DecimalJsLike | number | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type MetricSnapshotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    metricCode?: StringFieldUpdateOperationsInput | string
    snapshotDate?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type MetricSnapshotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    metricCode?: StringFieldUpdateOperationsInput | string
    snapshotDate?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type MetricSnapshotCreateManyInput = {
    id?: string
    tenantId: string
    metricCode: string
    snapshotDate: Date | string
    value: Decimal | DecimalJsLike | number | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type MetricSnapshotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    metricCode?: StringFieldUpdateOperationsInput | string
    snapshotDate?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type MetricSnapshotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    metricCode?: StringFieldUpdateOperationsInput | string
    snapshotDate?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RiskRuleCreateInput = {
    id?: string
    code: string
    nameFa: string
    algorithm: $Enums.RiskAlgorithm
    config: JsonNullValueInput | InputJsonValue
    severity: $Enums.FindingSeverity
    moduleCode: string
    isActive?: boolean
    tenantRules?: TenantRiskRuleCreateNestedManyWithoutRiskRuleInput
    findings?: RiskFindingCreateNestedManyWithoutRiskRuleInput
  }

  export type RiskRuleUncheckedCreateInput = {
    id?: string
    code: string
    nameFa: string
    algorithm: $Enums.RiskAlgorithm
    config: JsonNullValueInput | InputJsonValue
    severity: $Enums.FindingSeverity
    moduleCode: string
    isActive?: boolean
    tenantRules?: TenantRiskRuleUncheckedCreateNestedManyWithoutRiskRuleInput
    findings?: RiskFindingUncheckedCreateNestedManyWithoutRiskRuleInput
  }

  export type RiskRuleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameFa?: StringFieldUpdateOperationsInput | string
    algorithm?: EnumRiskAlgorithmFieldUpdateOperationsInput | $Enums.RiskAlgorithm
    config?: JsonNullValueInput | InputJsonValue
    severity?: EnumFindingSeverityFieldUpdateOperationsInput | $Enums.FindingSeverity
    moduleCode?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    tenantRules?: TenantRiskRuleUpdateManyWithoutRiskRuleNestedInput
    findings?: RiskFindingUpdateManyWithoutRiskRuleNestedInput
  }

  export type RiskRuleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameFa?: StringFieldUpdateOperationsInput | string
    algorithm?: EnumRiskAlgorithmFieldUpdateOperationsInput | $Enums.RiskAlgorithm
    config?: JsonNullValueInput | InputJsonValue
    severity?: EnumFindingSeverityFieldUpdateOperationsInput | $Enums.FindingSeverity
    moduleCode?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    tenantRules?: TenantRiskRuleUncheckedUpdateManyWithoutRiskRuleNestedInput
    findings?: RiskFindingUncheckedUpdateManyWithoutRiskRuleNestedInput
  }

  export type RiskRuleCreateManyInput = {
    id?: string
    code: string
    nameFa: string
    algorithm: $Enums.RiskAlgorithm
    config: JsonNullValueInput | InputJsonValue
    severity: $Enums.FindingSeverity
    moduleCode: string
    isActive?: boolean
  }

  export type RiskRuleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameFa?: StringFieldUpdateOperationsInput | string
    algorithm?: EnumRiskAlgorithmFieldUpdateOperationsInput | $Enums.RiskAlgorithm
    config?: JsonNullValueInput | InputJsonValue
    severity?: EnumFindingSeverityFieldUpdateOperationsInput | $Enums.FindingSeverity
    moduleCode?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RiskRuleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameFa?: StringFieldUpdateOperationsInput | string
    algorithm?: EnumRiskAlgorithmFieldUpdateOperationsInput | $Enums.RiskAlgorithm
    config?: JsonNullValueInput | InputJsonValue
    severity?: EnumFindingSeverityFieldUpdateOperationsInput | $Enums.FindingSeverity
    moduleCode?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TenantRiskRuleCreateInput = {
    id?: string
    tenantId: string
    thresholdOverride?: Decimal | DecimalJsLike | number | string | null
    isActive?: boolean
    riskRule: RiskRuleCreateNestedOneWithoutTenantRulesInput
  }

  export type TenantRiskRuleUncheckedCreateInput = {
    id?: string
    tenantId: string
    riskRuleId: string
    thresholdOverride?: Decimal | DecimalJsLike | number | string | null
    isActive?: boolean
  }

  export type TenantRiskRuleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    thresholdOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    riskRule?: RiskRuleUpdateOneRequiredWithoutTenantRulesNestedInput
  }

  export type TenantRiskRuleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    riskRuleId?: StringFieldUpdateOperationsInput | string
    thresholdOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TenantRiskRuleCreateManyInput = {
    id?: string
    tenantId: string
    riskRuleId: string
    thresholdOverride?: Decimal | DecimalJsLike | number | string | null
    isActive?: boolean
  }

  export type TenantRiskRuleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    thresholdOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TenantRiskRuleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    riskRuleId?: StringFieldUpdateOperationsInput | string
    thresholdOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RiskFindingCreateInput = {
    id?: string
    tenantId: string
    detectedAt?: Date | string
    severity: $Enums.FindingSeverity
    trend: $Enums.FindingTrend
    sourceModule: string
    evidence: JsonNullValueInput | InputJsonValue
    suggestionFa: string
    deduplicationKey: string
    riskRule: RiskRuleCreateNestedOneWithoutFindingsInput
  }

  export type RiskFindingUncheckedCreateInput = {
    id?: string
    tenantId: string
    riskRuleId: string
    detectedAt?: Date | string
    severity: $Enums.FindingSeverity
    trend: $Enums.FindingTrend
    sourceModule: string
    evidence: JsonNullValueInput | InputJsonValue
    suggestionFa: string
    deduplicationKey: string
  }

  export type RiskFindingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    severity?: EnumFindingSeverityFieldUpdateOperationsInput | $Enums.FindingSeverity
    trend?: EnumFindingTrendFieldUpdateOperationsInput | $Enums.FindingTrend
    sourceModule?: StringFieldUpdateOperationsInput | string
    evidence?: JsonNullValueInput | InputJsonValue
    suggestionFa?: StringFieldUpdateOperationsInput | string
    deduplicationKey?: StringFieldUpdateOperationsInput | string
    riskRule?: RiskRuleUpdateOneRequiredWithoutFindingsNestedInput
  }

  export type RiskFindingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    riskRuleId?: StringFieldUpdateOperationsInput | string
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    severity?: EnumFindingSeverityFieldUpdateOperationsInput | $Enums.FindingSeverity
    trend?: EnumFindingTrendFieldUpdateOperationsInput | $Enums.FindingTrend
    sourceModule?: StringFieldUpdateOperationsInput | string
    evidence?: JsonNullValueInput | InputJsonValue
    suggestionFa?: StringFieldUpdateOperationsInput | string
    deduplicationKey?: StringFieldUpdateOperationsInput | string
  }

  export type RiskFindingCreateManyInput = {
    id?: string
    tenantId: string
    riskRuleId: string
    detectedAt?: Date | string
    severity: $Enums.FindingSeverity
    trend: $Enums.FindingTrend
    sourceModule: string
    evidence: JsonNullValueInput | InputJsonValue
    suggestionFa: string
    deduplicationKey: string
  }

  export type RiskFindingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    severity?: EnumFindingSeverityFieldUpdateOperationsInput | $Enums.FindingSeverity
    trend?: EnumFindingTrendFieldUpdateOperationsInput | $Enums.FindingTrend
    sourceModule?: StringFieldUpdateOperationsInput | string
    evidence?: JsonNullValueInput | InputJsonValue
    suggestionFa?: StringFieldUpdateOperationsInput | string
    deduplicationKey?: StringFieldUpdateOperationsInput | string
  }

  export type RiskFindingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    riskRuleId?: StringFieldUpdateOperationsInput | string
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    severity?: EnumFindingSeverityFieldUpdateOperationsInput | $Enums.FindingSeverity
    trend?: EnumFindingTrendFieldUpdateOperationsInput | $Enums.FindingTrend
    sourceModule?: StringFieldUpdateOperationsInput | string
    evidence?: JsonNullValueInput | InputJsonValue
    suggestionFa?: StringFieldUpdateOperationsInput | string
    deduplicationKey?: StringFieldUpdateOperationsInput | string
  }

  export type TenantKpiConfigCreateInput = {
    id?: string
    tenantId: string
    kpiCode: string
    position: JsonNullValueInput | InputJsonValue
    size: JsonNullValueInput | InputJsonValue
    isVisible?: boolean
  }

  export type TenantKpiConfigUncheckedCreateInput = {
    id?: string
    tenantId: string
    kpiCode: string
    position: JsonNullValueInput | InputJsonValue
    size: JsonNullValueInput | InputJsonValue
    isVisible?: boolean
  }

  export type TenantKpiConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    kpiCode?: StringFieldUpdateOperationsInput | string
    position?: JsonNullValueInput | InputJsonValue
    size?: JsonNullValueInput | InputJsonValue
    isVisible?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TenantKpiConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    kpiCode?: StringFieldUpdateOperationsInput | string
    position?: JsonNullValueInput | InputJsonValue
    size?: JsonNullValueInput | InputJsonValue
    isVisible?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TenantKpiConfigCreateManyInput = {
    id?: string
    tenantId: string
    kpiCode: string
    position: JsonNullValueInput | InputJsonValue
    size: JsonNullValueInput | InputJsonValue
    isVisible?: boolean
  }

  export type TenantKpiConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    kpiCode?: StringFieldUpdateOperationsInput | string
    position?: JsonNullValueInput | InputJsonValue
    size?: JsonNullValueInput | InputJsonValue
    isVisible?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TenantKpiConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    kpiCode?: StringFieldUpdateOperationsInput | string
    position?: JsonNullValueInput | InputJsonValue
    size?: JsonNullValueInput | InputJsonValue
    isVisible?: BoolFieldUpdateOperationsInput | boolean
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

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
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

  export type ProjectionFinancialSummaryTenantIdAccountIdPeriodStartCompoundUniqueInput = {
    tenantId: string
    accountId: string
    periodStart: Date | string
  }

  export type ProjectionFinancialSummaryCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    accountId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    totalDebit?: SortOrder
    totalCredit?: SortOrder
    balance?: SortOrder
    lastProcessedEventId?: SortOrder
    lastProcessedVersion?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectionFinancialSummaryAvgOrderByAggregateInput = {
    totalDebit?: SortOrder
    totalCredit?: SortOrder
    balance?: SortOrder
    lastProcessedVersion?: SortOrder
  }

  export type ProjectionFinancialSummaryMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    accountId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    totalDebit?: SortOrder
    totalCredit?: SortOrder
    balance?: SortOrder
    lastProcessedEventId?: SortOrder
    lastProcessedVersion?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectionFinancialSummaryMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    accountId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    totalDebit?: SortOrder
    totalCredit?: SortOrder
    balance?: SortOrder
    lastProcessedEventId?: SortOrder
    lastProcessedVersion?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectionFinancialSummarySumOrderByAggregateInput = {
    totalDebit?: SortOrder
    totalCredit?: SortOrder
    balance?: SortOrder
    lastProcessedVersion?: SortOrder
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

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
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

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type ProjectionSalesSummaryTenantIdPeriodDateCompoundUniqueInput = {
    tenantId: string
    periodDate: Date | string
  }

  export type ProjectionSalesSummaryCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    periodDate?: SortOrder
    totalOrders?: SortOrder
    totalRevenue?: SortOrder
    totalRefunds?: SortOrder
    lastProcessedEventId?: SortOrder
    lastProcessedVersion?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectionSalesSummaryAvgOrderByAggregateInput = {
    totalOrders?: SortOrder
    totalRevenue?: SortOrder
    totalRefunds?: SortOrder
    lastProcessedVersion?: SortOrder
  }

  export type ProjectionSalesSummaryMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    periodDate?: SortOrder
    totalOrders?: SortOrder
    totalRevenue?: SortOrder
    totalRefunds?: SortOrder
    lastProcessedEventId?: SortOrder
    lastProcessedVersion?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectionSalesSummaryMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    periodDate?: SortOrder
    totalOrders?: SortOrder
    totalRevenue?: SortOrder
    totalRefunds?: SortOrder
    lastProcessedEventId?: SortOrder
    lastProcessedVersion?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectionSalesSummarySumOrderByAggregateInput = {
    totalOrders?: SortOrder
    totalRevenue?: SortOrder
    totalRefunds?: SortOrder
    lastProcessedVersion?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MetricSnapshotTenantIdMetricCodeSnapshotDateCompoundUniqueInput = {
    tenantId: string
    metricCode: string
    snapshotDate: Date | string
  }

  export type MetricSnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    metricCode?: SortOrder
    snapshotDate?: SortOrder
    value?: SortOrder
    metadata?: SortOrder
  }

  export type MetricSnapshotAvgOrderByAggregateInput = {
    value?: SortOrder
  }

  export type MetricSnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    metricCode?: SortOrder
    snapshotDate?: SortOrder
    value?: SortOrder
  }

  export type MetricSnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    metricCode?: SortOrder
    snapshotDate?: SortOrder
    value?: SortOrder
  }

  export type MetricSnapshotSumOrderByAggregateInput = {
    value?: SortOrder
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

  export type EnumRiskAlgorithmFilter<$PrismaModel = never> = {
    equals?: $Enums.RiskAlgorithm | EnumRiskAlgorithmFieldRefInput<$PrismaModel>
    in?: $Enums.RiskAlgorithm[] | ListEnumRiskAlgorithmFieldRefInput<$PrismaModel>
    notIn?: $Enums.RiskAlgorithm[] | ListEnumRiskAlgorithmFieldRefInput<$PrismaModel>
    not?: NestedEnumRiskAlgorithmFilter<$PrismaModel> | $Enums.RiskAlgorithm
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

  export type EnumFindingSeverityFilter<$PrismaModel = never> = {
    equals?: $Enums.FindingSeverity | EnumFindingSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.FindingSeverity[] | ListEnumFindingSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.FindingSeverity[] | ListEnumFindingSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumFindingSeverityFilter<$PrismaModel> | $Enums.FindingSeverity
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type TenantRiskRuleListRelationFilter = {
    every?: TenantRiskRuleWhereInput
    some?: TenantRiskRuleWhereInput
    none?: TenantRiskRuleWhereInput
  }

  export type RiskFindingListRelationFilter = {
    every?: RiskFindingWhereInput
    some?: RiskFindingWhereInput
    none?: RiskFindingWhereInput
  }

  export type TenantRiskRuleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RiskFindingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RiskRuleCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    nameFa?: SortOrder
    algorithm?: SortOrder
    config?: SortOrder
    severity?: SortOrder
    moduleCode?: SortOrder
    isActive?: SortOrder
  }

  export type RiskRuleMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    nameFa?: SortOrder
    algorithm?: SortOrder
    severity?: SortOrder
    moduleCode?: SortOrder
    isActive?: SortOrder
  }

  export type RiskRuleMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    nameFa?: SortOrder
    algorithm?: SortOrder
    severity?: SortOrder
    moduleCode?: SortOrder
    isActive?: SortOrder
  }

  export type EnumRiskAlgorithmWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RiskAlgorithm | EnumRiskAlgorithmFieldRefInput<$PrismaModel>
    in?: $Enums.RiskAlgorithm[] | ListEnumRiskAlgorithmFieldRefInput<$PrismaModel>
    notIn?: $Enums.RiskAlgorithm[] | ListEnumRiskAlgorithmFieldRefInput<$PrismaModel>
    not?: NestedEnumRiskAlgorithmWithAggregatesFilter<$PrismaModel> | $Enums.RiskAlgorithm
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRiskAlgorithmFilter<$PrismaModel>
    _max?: NestedEnumRiskAlgorithmFilter<$PrismaModel>
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

  export type EnumFindingSeverityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FindingSeverity | EnumFindingSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.FindingSeverity[] | ListEnumFindingSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.FindingSeverity[] | ListEnumFindingSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumFindingSeverityWithAggregatesFilter<$PrismaModel> | $Enums.FindingSeverity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFindingSeverityFilter<$PrismaModel>
    _max?: NestedEnumFindingSeverityFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type RiskRuleScalarRelationFilter = {
    is?: RiskRuleWhereInput
    isNot?: RiskRuleWhereInput
  }

  export type TenantRiskRuleTenantIdRiskRuleIdCompoundUniqueInput = {
    tenantId: string
    riskRuleId: string
  }

  export type TenantRiskRuleCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    riskRuleId?: SortOrder
    thresholdOverride?: SortOrder
    isActive?: SortOrder
  }

  export type TenantRiskRuleAvgOrderByAggregateInput = {
    thresholdOverride?: SortOrder
  }

  export type TenantRiskRuleMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    riskRuleId?: SortOrder
    thresholdOverride?: SortOrder
    isActive?: SortOrder
  }

  export type TenantRiskRuleMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    riskRuleId?: SortOrder
    thresholdOverride?: SortOrder
    isActive?: SortOrder
  }

  export type TenantRiskRuleSumOrderByAggregateInput = {
    thresholdOverride?: SortOrder
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type EnumFindingTrendFilter<$PrismaModel = never> = {
    equals?: $Enums.FindingTrend | EnumFindingTrendFieldRefInput<$PrismaModel>
    in?: $Enums.FindingTrend[] | ListEnumFindingTrendFieldRefInput<$PrismaModel>
    notIn?: $Enums.FindingTrend[] | ListEnumFindingTrendFieldRefInput<$PrismaModel>
    not?: NestedEnumFindingTrendFilter<$PrismaModel> | $Enums.FindingTrend
  }

  export type RiskFindingTenantIdDeduplicationKeyCompoundUniqueInput = {
    tenantId: string
    deduplicationKey: string
  }

  export type RiskFindingCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    riskRuleId?: SortOrder
    detectedAt?: SortOrder
    severity?: SortOrder
    trend?: SortOrder
    sourceModule?: SortOrder
    evidence?: SortOrder
    suggestionFa?: SortOrder
    deduplicationKey?: SortOrder
  }

  export type RiskFindingMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    riskRuleId?: SortOrder
    detectedAt?: SortOrder
    severity?: SortOrder
    trend?: SortOrder
    sourceModule?: SortOrder
    suggestionFa?: SortOrder
    deduplicationKey?: SortOrder
  }

  export type RiskFindingMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    riskRuleId?: SortOrder
    detectedAt?: SortOrder
    severity?: SortOrder
    trend?: SortOrder
    sourceModule?: SortOrder
    suggestionFa?: SortOrder
    deduplicationKey?: SortOrder
  }

  export type EnumFindingTrendWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FindingTrend | EnumFindingTrendFieldRefInput<$PrismaModel>
    in?: $Enums.FindingTrend[] | ListEnumFindingTrendFieldRefInput<$PrismaModel>
    notIn?: $Enums.FindingTrend[] | ListEnumFindingTrendFieldRefInput<$PrismaModel>
    not?: NestedEnumFindingTrendWithAggregatesFilter<$PrismaModel> | $Enums.FindingTrend
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFindingTrendFilter<$PrismaModel>
    _max?: NestedEnumFindingTrendFilter<$PrismaModel>
  }

  export type TenantKpiConfigTenantIdKpiCodeCompoundUniqueInput = {
    tenantId: string
    kpiCode: string
  }

  export type TenantKpiConfigCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    kpiCode?: SortOrder
    position?: SortOrder
    size?: SortOrder
    isVisible?: SortOrder
  }

  export type TenantKpiConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    kpiCode?: SortOrder
    isVisible?: SortOrder
  }

  export type TenantKpiConfigMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    kpiCode?: SortOrder
    isVisible?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type TenantRiskRuleCreateNestedManyWithoutRiskRuleInput = {
    create?: XOR<TenantRiskRuleCreateWithoutRiskRuleInput, TenantRiskRuleUncheckedCreateWithoutRiskRuleInput> | TenantRiskRuleCreateWithoutRiskRuleInput[] | TenantRiskRuleUncheckedCreateWithoutRiskRuleInput[]
    connectOrCreate?: TenantRiskRuleCreateOrConnectWithoutRiskRuleInput | TenantRiskRuleCreateOrConnectWithoutRiskRuleInput[]
    createMany?: TenantRiskRuleCreateManyRiskRuleInputEnvelope
    connect?: TenantRiskRuleWhereUniqueInput | TenantRiskRuleWhereUniqueInput[]
  }

  export type RiskFindingCreateNestedManyWithoutRiskRuleInput = {
    create?: XOR<RiskFindingCreateWithoutRiskRuleInput, RiskFindingUncheckedCreateWithoutRiskRuleInput> | RiskFindingCreateWithoutRiskRuleInput[] | RiskFindingUncheckedCreateWithoutRiskRuleInput[]
    connectOrCreate?: RiskFindingCreateOrConnectWithoutRiskRuleInput | RiskFindingCreateOrConnectWithoutRiskRuleInput[]
    createMany?: RiskFindingCreateManyRiskRuleInputEnvelope
    connect?: RiskFindingWhereUniqueInput | RiskFindingWhereUniqueInput[]
  }

  export type TenantRiskRuleUncheckedCreateNestedManyWithoutRiskRuleInput = {
    create?: XOR<TenantRiskRuleCreateWithoutRiskRuleInput, TenantRiskRuleUncheckedCreateWithoutRiskRuleInput> | TenantRiskRuleCreateWithoutRiskRuleInput[] | TenantRiskRuleUncheckedCreateWithoutRiskRuleInput[]
    connectOrCreate?: TenantRiskRuleCreateOrConnectWithoutRiskRuleInput | TenantRiskRuleCreateOrConnectWithoutRiskRuleInput[]
    createMany?: TenantRiskRuleCreateManyRiskRuleInputEnvelope
    connect?: TenantRiskRuleWhereUniqueInput | TenantRiskRuleWhereUniqueInput[]
  }

  export type RiskFindingUncheckedCreateNestedManyWithoutRiskRuleInput = {
    create?: XOR<RiskFindingCreateWithoutRiskRuleInput, RiskFindingUncheckedCreateWithoutRiskRuleInput> | RiskFindingCreateWithoutRiskRuleInput[] | RiskFindingUncheckedCreateWithoutRiskRuleInput[]
    connectOrCreate?: RiskFindingCreateOrConnectWithoutRiskRuleInput | RiskFindingCreateOrConnectWithoutRiskRuleInput[]
    createMany?: RiskFindingCreateManyRiskRuleInputEnvelope
    connect?: RiskFindingWhereUniqueInput | RiskFindingWhereUniqueInput[]
  }

  export type EnumRiskAlgorithmFieldUpdateOperationsInput = {
    set?: $Enums.RiskAlgorithm
  }

  export type EnumFindingSeverityFieldUpdateOperationsInput = {
    set?: $Enums.FindingSeverity
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type TenantRiskRuleUpdateManyWithoutRiskRuleNestedInput = {
    create?: XOR<TenantRiskRuleCreateWithoutRiskRuleInput, TenantRiskRuleUncheckedCreateWithoutRiskRuleInput> | TenantRiskRuleCreateWithoutRiskRuleInput[] | TenantRiskRuleUncheckedCreateWithoutRiskRuleInput[]
    connectOrCreate?: TenantRiskRuleCreateOrConnectWithoutRiskRuleInput | TenantRiskRuleCreateOrConnectWithoutRiskRuleInput[]
    upsert?: TenantRiskRuleUpsertWithWhereUniqueWithoutRiskRuleInput | TenantRiskRuleUpsertWithWhereUniqueWithoutRiskRuleInput[]
    createMany?: TenantRiskRuleCreateManyRiskRuleInputEnvelope
    set?: TenantRiskRuleWhereUniqueInput | TenantRiskRuleWhereUniqueInput[]
    disconnect?: TenantRiskRuleWhereUniqueInput | TenantRiskRuleWhereUniqueInput[]
    delete?: TenantRiskRuleWhereUniqueInput | TenantRiskRuleWhereUniqueInput[]
    connect?: TenantRiskRuleWhereUniqueInput | TenantRiskRuleWhereUniqueInput[]
    update?: TenantRiskRuleUpdateWithWhereUniqueWithoutRiskRuleInput | TenantRiskRuleUpdateWithWhereUniqueWithoutRiskRuleInput[]
    updateMany?: TenantRiskRuleUpdateManyWithWhereWithoutRiskRuleInput | TenantRiskRuleUpdateManyWithWhereWithoutRiskRuleInput[]
    deleteMany?: TenantRiskRuleScalarWhereInput | TenantRiskRuleScalarWhereInput[]
  }

  export type RiskFindingUpdateManyWithoutRiskRuleNestedInput = {
    create?: XOR<RiskFindingCreateWithoutRiskRuleInput, RiskFindingUncheckedCreateWithoutRiskRuleInput> | RiskFindingCreateWithoutRiskRuleInput[] | RiskFindingUncheckedCreateWithoutRiskRuleInput[]
    connectOrCreate?: RiskFindingCreateOrConnectWithoutRiskRuleInput | RiskFindingCreateOrConnectWithoutRiskRuleInput[]
    upsert?: RiskFindingUpsertWithWhereUniqueWithoutRiskRuleInput | RiskFindingUpsertWithWhereUniqueWithoutRiskRuleInput[]
    createMany?: RiskFindingCreateManyRiskRuleInputEnvelope
    set?: RiskFindingWhereUniqueInput | RiskFindingWhereUniqueInput[]
    disconnect?: RiskFindingWhereUniqueInput | RiskFindingWhereUniqueInput[]
    delete?: RiskFindingWhereUniqueInput | RiskFindingWhereUniqueInput[]
    connect?: RiskFindingWhereUniqueInput | RiskFindingWhereUniqueInput[]
    update?: RiskFindingUpdateWithWhereUniqueWithoutRiskRuleInput | RiskFindingUpdateWithWhereUniqueWithoutRiskRuleInput[]
    updateMany?: RiskFindingUpdateManyWithWhereWithoutRiskRuleInput | RiskFindingUpdateManyWithWhereWithoutRiskRuleInput[]
    deleteMany?: RiskFindingScalarWhereInput | RiskFindingScalarWhereInput[]
  }

  export type TenantRiskRuleUncheckedUpdateManyWithoutRiskRuleNestedInput = {
    create?: XOR<TenantRiskRuleCreateWithoutRiskRuleInput, TenantRiskRuleUncheckedCreateWithoutRiskRuleInput> | TenantRiskRuleCreateWithoutRiskRuleInput[] | TenantRiskRuleUncheckedCreateWithoutRiskRuleInput[]
    connectOrCreate?: TenantRiskRuleCreateOrConnectWithoutRiskRuleInput | TenantRiskRuleCreateOrConnectWithoutRiskRuleInput[]
    upsert?: TenantRiskRuleUpsertWithWhereUniqueWithoutRiskRuleInput | TenantRiskRuleUpsertWithWhereUniqueWithoutRiskRuleInput[]
    createMany?: TenantRiskRuleCreateManyRiskRuleInputEnvelope
    set?: TenantRiskRuleWhereUniqueInput | TenantRiskRuleWhereUniqueInput[]
    disconnect?: TenantRiskRuleWhereUniqueInput | TenantRiskRuleWhereUniqueInput[]
    delete?: TenantRiskRuleWhereUniqueInput | TenantRiskRuleWhereUniqueInput[]
    connect?: TenantRiskRuleWhereUniqueInput | TenantRiskRuleWhereUniqueInput[]
    update?: TenantRiskRuleUpdateWithWhereUniqueWithoutRiskRuleInput | TenantRiskRuleUpdateWithWhereUniqueWithoutRiskRuleInput[]
    updateMany?: TenantRiskRuleUpdateManyWithWhereWithoutRiskRuleInput | TenantRiskRuleUpdateManyWithWhereWithoutRiskRuleInput[]
    deleteMany?: TenantRiskRuleScalarWhereInput | TenantRiskRuleScalarWhereInput[]
  }

  export type RiskFindingUncheckedUpdateManyWithoutRiskRuleNestedInput = {
    create?: XOR<RiskFindingCreateWithoutRiskRuleInput, RiskFindingUncheckedCreateWithoutRiskRuleInput> | RiskFindingCreateWithoutRiskRuleInput[] | RiskFindingUncheckedCreateWithoutRiskRuleInput[]
    connectOrCreate?: RiskFindingCreateOrConnectWithoutRiskRuleInput | RiskFindingCreateOrConnectWithoutRiskRuleInput[]
    upsert?: RiskFindingUpsertWithWhereUniqueWithoutRiskRuleInput | RiskFindingUpsertWithWhereUniqueWithoutRiskRuleInput[]
    createMany?: RiskFindingCreateManyRiskRuleInputEnvelope
    set?: RiskFindingWhereUniqueInput | RiskFindingWhereUniqueInput[]
    disconnect?: RiskFindingWhereUniqueInput | RiskFindingWhereUniqueInput[]
    delete?: RiskFindingWhereUniqueInput | RiskFindingWhereUniqueInput[]
    connect?: RiskFindingWhereUniqueInput | RiskFindingWhereUniqueInput[]
    update?: RiskFindingUpdateWithWhereUniqueWithoutRiskRuleInput | RiskFindingUpdateWithWhereUniqueWithoutRiskRuleInput[]
    updateMany?: RiskFindingUpdateManyWithWhereWithoutRiskRuleInput | RiskFindingUpdateManyWithWhereWithoutRiskRuleInput[]
    deleteMany?: RiskFindingScalarWhereInput | RiskFindingScalarWhereInput[]
  }

  export type RiskRuleCreateNestedOneWithoutTenantRulesInput = {
    create?: XOR<RiskRuleCreateWithoutTenantRulesInput, RiskRuleUncheckedCreateWithoutTenantRulesInput>
    connectOrCreate?: RiskRuleCreateOrConnectWithoutTenantRulesInput
    connect?: RiskRuleWhereUniqueInput
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type RiskRuleUpdateOneRequiredWithoutTenantRulesNestedInput = {
    create?: XOR<RiskRuleCreateWithoutTenantRulesInput, RiskRuleUncheckedCreateWithoutTenantRulesInput>
    connectOrCreate?: RiskRuleCreateOrConnectWithoutTenantRulesInput
    upsert?: RiskRuleUpsertWithoutTenantRulesInput
    connect?: RiskRuleWhereUniqueInput
    update?: XOR<XOR<RiskRuleUpdateToOneWithWhereWithoutTenantRulesInput, RiskRuleUpdateWithoutTenantRulesInput>, RiskRuleUncheckedUpdateWithoutTenantRulesInput>
  }

  export type RiskRuleCreateNestedOneWithoutFindingsInput = {
    create?: XOR<RiskRuleCreateWithoutFindingsInput, RiskRuleUncheckedCreateWithoutFindingsInput>
    connectOrCreate?: RiskRuleCreateOrConnectWithoutFindingsInput
    connect?: RiskRuleWhereUniqueInput
  }

  export type EnumFindingTrendFieldUpdateOperationsInput = {
    set?: $Enums.FindingTrend
  }

  export type RiskRuleUpdateOneRequiredWithoutFindingsNestedInput = {
    create?: XOR<RiskRuleCreateWithoutFindingsInput, RiskRuleUncheckedCreateWithoutFindingsInput>
    connectOrCreate?: RiskRuleCreateOrConnectWithoutFindingsInput
    upsert?: RiskRuleUpsertWithoutFindingsInput
    connect?: RiskRuleWhereUniqueInput
    update?: XOR<XOR<RiskRuleUpdateToOneWithWhereWithoutFindingsInput, RiskRuleUpdateWithoutFindingsInput>, RiskRuleUncheckedUpdateWithoutFindingsInput>
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

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
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

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
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

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
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

  export type NestedEnumRiskAlgorithmFilter<$PrismaModel = never> = {
    equals?: $Enums.RiskAlgorithm | EnumRiskAlgorithmFieldRefInput<$PrismaModel>
    in?: $Enums.RiskAlgorithm[] | ListEnumRiskAlgorithmFieldRefInput<$PrismaModel>
    notIn?: $Enums.RiskAlgorithm[] | ListEnumRiskAlgorithmFieldRefInput<$PrismaModel>
    not?: NestedEnumRiskAlgorithmFilter<$PrismaModel> | $Enums.RiskAlgorithm
  }

  export type NestedEnumFindingSeverityFilter<$PrismaModel = never> = {
    equals?: $Enums.FindingSeverity | EnumFindingSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.FindingSeverity[] | ListEnumFindingSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.FindingSeverity[] | ListEnumFindingSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumFindingSeverityFilter<$PrismaModel> | $Enums.FindingSeverity
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumRiskAlgorithmWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RiskAlgorithm | EnumRiskAlgorithmFieldRefInput<$PrismaModel>
    in?: $Enums.RiskAlgorithm[] | ListEnumRiskAlgorithmFieldRefInput<$PrismaModel>
    notIn?: $Enums.RiskAlgorithm[] | ListEnumRiskAlgorithmFieldRefInput<$PrismaModel>
    not?: NestedEnumRiskAlgorithmWithAggregatesFilter<$PrismaModel> | $Enums.RiskAlgorithm
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRiskAlgorithmFilter<$PrismaModel>
    _max?: NestedEnumRiskAlgorithmFilter<$PrismaModel>
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

  export type NestedEnumFindingSeverityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FindingSeverity | EnumFindingSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.FindingSeverity[] | ListEnumFindingSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.FindingSeverity[] | ListEnumFindingSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumFindingSeverityWithAggregatesFilter<$PrismaModel> | $Enums.FindingSeverity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFindingSeverityFilter<$PrismaModel>
    _max?: NestedEnumFindingSeverityFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedEnumFindingTrendFilter<$PrismaModel = never> = {
    equals?: $Enums.FindingTrend | EnumFindingTrendFieldRefInput<$PrismaModel>
    in?: $Enums.FindingTrend[] | ListEnumFindingTrendFieldRefInput<$PrismaModel>
    notIn?: $Enums.FindingTrend[] | ListEnumFindingTrendFieldRefInput<$PrismaModel>
    not?: NestedEnumFindingTrendFilter<$PrismaModel> | $Enums.FindingTrend
  }

  export type NestedEnumFindingTrendWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FindingTrend | EnumFindingTrendFieldRefInput<$PrismaModel>
    in?: $Enums.FindingTrend[] | ListEnumFindingTrendFieldRefInput<$PrismaModel>
    notIn?: $Enums.FindingTrend[] | ListEnumFindingTrendFieldRefInput<$PrismaModel>
    not?: NestedEnumFindingTrendWithAggregatesFilter<$PrismaModel> | $Enums.FindingTrend
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFindingTrendFilter<$PrismaModel>
    _max?: NestedEnumFindingTrendFilter<$PrismaModel>
  }

  export type TenantRiskRuleCreateWithoutRiskRuleInput = {
    id?: string
    tenantId: string
    thresholdOverride?: Decimal | DecimalJsLike | number | string | null
    isActive?: boolean
  }

  export type TenantRiskRuleUncheckedCreateWithoutRiskRuleInput = {
    id?: string
    tenantId: string
    thresholdOverride?: Decimal | DecimalJsLike | number | string | null
    isActive?: boolean
  }

  export type TenantRiskRuleCreateOrConnectWithoutRiskRuleInput = {
    where: TenantRiskRuleWhereUniqueInput
    create: XOR<TenantRiskRuleCreateWithoutRiskRuleInput, TenantRiskRuleUncheckedCreateWithoutRiskRuleInput>
  }

  export type TenantRiskRuleCreateManyRiskRuleInputEnvelope = {
    data: TenantRiskRuleCreateManyRiskRuleInput | TenantRiskRuleCreateManyRiskRuleInput[]
    skipDuplicates?: boolean
  }

  export type RiskFindingCreateWithoutRiskRuleInput = {
    id?: string
    tenantId: string
    detectedAt?: Date | string
    severity: $Enums.FindingSeverity
    trend: $Enums.FindingTrend
    sourceModule: string
    evidence: JsonNullValueInput | InputJsonValue
    suggestionFa: string
    deduplicationKey: string
  }

  export type RiskFindingUncheckedCreateWithoutRiskRuleInput = {
    id?: string
    tenantId: string
    detectedAt?: Date | string
    severity: $Enums.FindingSeverity
    trend: $Enums.FindingTrend
    sourceModule: string
    evidence: JsonNullValueInput | InputJsonValue
    suggestionFa: string
    deduplicationKey: string
  }

  export type RiskFindingCreateOrConnectWithoutRiskRuleInput = {
    where: RiskFindingWhereUniqueInput
    create: XOR<RiskFindingCreateWithoutRiskRuleInput, RiskFindingUncheckedCreateWithoutRiskRuleInput>
  }

  export type RiskFindingCreateManyRiskRuleInputEnvelope = {
    data: RiskFindingCreateManyRiskRuleInput | RiskFindingCreateManyRiskRuleInput[]
    skipDuplicates?: boolean
  }

  export type TenantRiskRuleUpsertWithWhereUniqueWithoutRiskRuleInput = {
    where: TenantRiskRuleWhereUniqueInput
    update: XOR<TenantRiskRuleUpdateWithoutRiskRuleInput, TenantRiskRuleUncheckedUpdateWithoutRiskRuleInput>
    create: XOR<TenantRiskRuleCreateWithoutRiskRuleInput, TenantRiskRuleUncheckedCreateWithoutRiskRuleInput>
  }

  export type TenantRiskRuleUpdateWithWhereUniqueWithoutRiskRuleInput = {
    where: TenantRiskRuleWhereUniqueInput
    data: XOR<TenantRiskRuleUpdateWithoutRiskRuleInput, TenantRiskRuleUncheckedUpdateWithoutRiskRuleInput>
  }

  export type TenantRiskRuleUpdateManyWithWhereWithoutRiskRuleInput = {
    where: TenantRiskRuleScalarWhereInput
    data: XOR<TenantRiskRuleUpdateManyMutationInput, TenantRiskRuleUncheckedUpdateManyWithoutRiskRuleInput>
  }

  export type TenantRiskRuleScalarWhereInput = {
    AND?: TenantRiskRuleScalarWhereInput | TenantRiskRuleScalarWhereInput[]
    OR?: TenantRiskRuleScalarWhereInput[]
    NOT?: TenantRiskRuleScalarWhereInput | TenantRiskRuleScalarWhereInput[]
    id?: StringFilter<"TenantRiskRule"> | string
    tenantId?: StringFilter<"TenantRiskRule"> | string
    riskRuleId?: StringFilter<"TenantRiskRule"> | string
    thresholdOverride?: DecimalNullableFilter<"TenantRiskRule"> | Decimal | DecimalJsLike | number | string | null
    isActive?: BoolFilter<"TenantRiskRule"> | boolean
  }

  export type RiskFindingUpsertWithWhereUniqueWithoutRiskRuleInput = {
    where: RiskFindingWhereUniqueInput
    update: XOR<RiskFindingUpdateWithoutRiskRuleInput, RiskFindingUncheckedUpdateWithoutRiskRuleInput>
    create: XOR<RiskFindingCreateWithoutRiskRuleInput, RiskFindingUncheckedCreateWithoutRiskRuleInput>
  }

  export type RiskFindingUpdateWithWhereUniqueWithoutRiskRuleInput = {
    where: RiskFindingWhereUniqueInput
    data: XOR<RiskFindingUpdateWithoutRiskRuleInput, RiskFindingUncheckedUpdateWithoutRiskRuleInput>
  }

  export type RiskFindingUpdateManyWithWhereWithoutRiskRuleInput = {
    where: RiskFindingScalarWhereInput
    data: XOR<RiskFindingUpdateManyMutationInput, RiskFindingUncheckedUpdateManyWithoutRiskRuleInput>
  }

  export type RiskFindingScalarWhereInput = {
    AND?: RiskFindingScalarWhereInput | RiskFindingScalarWhereInput[]
    OR?: RiskFindingScalarWhereInput[]
    NOT?: RiskFindingScalarWhereInput | RiskFindingScalarWhereInput[]
    id?: StringFilter<"RiskFinding"> | string
    tenantId?: StringFilter<"RiskFinding"> | string
    riskRuleId?: StringFilter<"RiskFinding"> | string
    detectedAt?: DateTimeFilter<"RiskFinding"> | Date | string
    severity?: EnumFindingSeverityFilter<"RiskFinding"> | $Enums.FindingSeverity
    trend?: EnumFindingTrendFilter<"RiskFinding"> | $Enums.FindingTrend
    sourceModule?: StringFilter<"RiskFinding"> | string
    evidence?: JsonFilter<"RiskFinding">
    suggestionFa?: StringFilter<"RiskFinding"> | string
    deduplicationKey?: StringFilter<"RiskFinding"> | string
  }

  export type RiskRuleCreateWithoutTenantRulesInput = {
    id?: string
    code: string
    nameFa: string
    algorithm: $Enums.RiskAlgorithm
    config: JsonNullValueInput | InputJsonValue
    severity: $Enums.FindingSeverity
    moduleCode: string
    isActive?: boolean
    findings?: RiskFindingCreateNestedManyWithoutRiskRuleInput
  }

  export type RiskRuleUncheckedCreateWithoutTenantRulesInput = {
    id?: string
    code: string
    nameFa: string
    algorithm: $Enums.RiskAlgorithm
    config: JsonNullValueInput | InputJsonValue
    severity: $Enums.FindingSeverity
    moduleCode: string
    isActive?: boolean
    findings?: RiskFindingUncheckedCreateNestedManyWithoutRiskRuleInput
  }

  export type RiskRuleCreateOrConnectWithoutTenantRulesInput = {
    where: RiskRuleWhereUniqueInput
    create: XOR<RiskRuleCreateWithoutTenantRulesInput, RiskRuleUncheckedCreateWithoutTenantRulesInput>
  }

  export type RiskRuleUpsertWithoutTenantRulesInput = {
    update: XOR<RiskRuleUpdateWithoutTenantRulesInput, RiskRuleUncheckedUpdateWithoutTenantRulesInput>
    create: XOR<RiskRuleCreateWithoutTenantRulesInput, RiskRuleUncheckedCreateWithoutTenantRulesInput>
    where?: RiskRuleWhereInput
  }

  export type RiskRuleUpdateToOneWithWhereWithoutTenantRulesInput = {
    where?: RiskRuleWhereInput
    data: XOR<RiskRuleUpdateWithoutTenantRulesInput, RiskRuleUncheckedUpdateWithoutTenantRulesInput>
  }

  export type RiskRuleUpdateWithoutTenantRulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameFa?: StringFieldUpdateOperationsInput | string
    algorithm?: EnumRiskAlgorithmFieldUpdateOperationsInput | $Enums.RiskAlgorithm
    config?: JsonNullValueInput | InputJsonValue
    severity?: EnumFindingSeverityFieldUpdateOperationsInput | $Enums.FindingSeverity
    moduleCode?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    findings?: RiskFindingUpdateManyWithoutRiskRuleNestedInput
  }

  export type RiskRuleUncheckedUpdateWithoutTenantRulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameFa?: StringFieldUpdateOperationsInput | string
    algorithm?: EnumRiskAlgorithmFieldUpdateOperationsInput | $Enums.RiskAlgorithm
    config?: JsonNullValueInput | InputJsonValue
    severity?: EnumFindingSeverityFieldUpdateOperationsInput | $Enums.FindingSeverity
    moduleCode?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    findings?: RiskFindingUncheckedUpdateManyWithoutRiskRuleNestedInput
  }

  export type RiskRuleCreateWithoutFindingsInput = {
    id?: string
    code: string
    nameFa: string
    algorithm: $Enums.RiskAlgorithm
    config: JsonNullValueInput | InputJsonValue
    severity: $Enums.FindingSeverity
    moduleCode: string
    isActive?: boolean
    tenantRules?: TenantRiskRuleCreateNestedManyWithoutRiskRuleInput
  }

  export type RiskRuleUncheckedCreateWithoutFindingsInput = {
    id?: string
    code: string
    nameFa: string
    algorithm: $Enums.RiskAlgorithm
    config: JsonNullValueInput | InputJsonValue
    severity: $Enums.FindingSeverity
    moduleCode: string
    isActive?: boolean
    tenantRules?: TenantRiskRuleUncheckedCreateNestedManyWithoutRiskRuleInput
  }

  export type RiskRuleCreateOrConnectWithoutFindingsInput = {
    where: RiskRuleWhereUniqueInput
    create: XOR<RiskRuleCreateWithoutFindingsInput, RiskRuleUncheckedCreateWithoutFindingsInput>
  }

  export type RiskRuleUpsertWithoutFindingsInput = {
    update: XOR<RiskRuleUpdateWithoutFindingsInput, RiskRuleUncheckedUpdateWithoutFindingsInput>
    create: XOR<RiskRuleCreateWithoutFindingsInput, RiskRuleUncheckedCreateWithoutFindingsInput>
    where?: RiskRuleWhereInput
  }

  export type RiskRuleUpdateToOneWithWhereWithoutFindingsInput = {
    where?: RiskRuleWhereInput
    data: XOR<RiskRuleUpdateWithoutFindingsInput, RiskRuleUncheckedUpdateWithoutFindingsInput>
  }

  export type RiskRuleUpdateWithoutFindingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameFa?: StringFieldUpdateOperationsInput | string
    algorithm?: EnumRiskAlgorithmFieldUpdateOperationsInput | $Enums.RiskAlgorithm
    config?: JsonNullValueInput | InputJsonValue
    severity?: EnumFindingSeverityFieldUpdateOperationsInput | $Enums.FindingSeverity
    moduleCode?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    tenantRules?: TenantRiskRuleUpdateManyWithoutRiskRuleNestedInput
  }

  export type RiskRuleUncheckedUpdateWithoutFindingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameFa?: StringFieldUpdateOperationsInput | string
    algorithm?: EnumRiskAlgorithmFieldUpdateOperationsInput | $Enums.RiskAlgorithm
    config?: JsonNullValueInput | InputJsonValue
    severity?: EnumFindingSeverityFieldUpdateOperationsInput | $Enums.FindingSeverity
    moduleCode?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    tenantRules?: TenantRiskRuleUncheckedUpdateManyWithoutRiskRuleNestedInput
  }

  export type TenantRiskRuleCreateManyRiskRuleInput = {
    id?: string
    tenantId: string
    thresholdOverride?: Decimal | DecimalJsLike | number | string | null
    isActive?: boolean
  }

  export type RiskFindingCreateManyRiskRuleInput = {
    id?: string
    tenantId: string
    detectedAt?: Date | string
    severity: $Enums.FindingSeverity
    trend: $Enums.FindingTrend
    sourceModule: string
    evidence: JsonNullValueInput | InputJsonValue
    suggestionFa: string
    deduplicationKey: string
  }

  export type TenantRiskRuleUpdateWithoutRiskRuleInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    thresholdOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TenantRiskRuleUncheckedUpdateWithoutRiskRuleInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    thresholdOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TenantRiskRuleUncheckedUpdateManyWithoutRiskRuleInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    thresholdOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RiskFindingUpdateWithoutRiskRuleInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    severity?: EnumFindingSeverityFieldUpdateOperationsInput | $Enums.FindingSeverity
    trend?: EnumFindingTrendFieldUpdateOperationsInput | $Enums.FindingTrend
    sourceModule?: StringFieldUpdateOperationsInput | string
    evidence?: JsonNullValueInput | InputJsonValue
    suggestionFa?: StringFieldUpdateOperationsInput | string
    deduplicationKey?: StringFieldUpdateOperationsInput | string
  }

  export type RiskFindingUncheckedUpdateWithoutRiskRuleInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    severity?: EnumFindingSeverityFieldUpdateOperationsInput | $Enums.FindingSeverity
    trend?: EnumFindingTrendFieldUpdateOperationsInput | $Enums.FindingTrend
    sourceModule?: StringFieldUpdateOperationsInput | string
    evidence?: JsonNullValueInput | InputJsonValue
    suggestionFa?: StringFieldUpdateOperationsInput | string
    deduplicationKey?: StringFieldUpdateOperationsInput | string
  }

  export type RiskFindingUncheckedUpdateManyWithoutRiskRuleInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    severity?: EnumFindingSeverityFieldUpdateOperationsInput | $Enums.FindingSeverity
    trend?: EnumFindingTrendFieldUpdateOperationsInput | $Enums.FindingTrend
    sourceModule?: StringFieldUpdateOperationsInput | string
    evidence?: JsonNullValueInput | InputJsonValue
    suggestionFa?: StringFieldUpdateOperationsInput | string
    deduplicationKey?: StringFieldUpdateOperationsInput | string
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