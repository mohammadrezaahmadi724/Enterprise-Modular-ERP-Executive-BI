
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
 * Model Employee
 * 
 */
export type Employee = $Result.DefaultSelection<Prisma.$EmployeePayload>
/**
 * Model OrganizationalUnit
 * 
 */
export type OrganizationalUnit = $Result.DefaultSelection<Prisma.$OrganizationalUnitPayload>
/**
 * Model Position
 * 
 */
export type Position = $Result.DefaultSelection<Prisma.$PositionPayload>
/**
 * Model AttendanceRecord
 * 
 */
export type AttendanceRecord = $Result.DefaultSelection<Prisma.$AttendanceRecordPayload>
/**
 * Model EmployeeContract
 * 
 */
export type EmployeeContract = $Result.DefaultSelection<Prisma.$EmployeeContractPayload>
/**
 * Model LeaveRequest
 * 
 */
export type LeaveRequest = $Result.DefaultSelection<Prisma.$LeaveRequestPayload>
/**
 * Model PayrollRule
 * 
 */
export type PayrollRule = $Result.DefaultSelection<Prisma.$PayrollRulePayload>
/**
 * Model TaxBracket
 * 
 */
export type TaxBracket = $Result.DefaultSelection<Prisma.$TaxBracketPayload>
/**
 * Model InsuranceRule
 * 
 */
export type InsuranceRule = $Result.DefaultSelection<Prisma.$InsuranceRulePayload>
/**
 * Model PayslipSnapshot
 * 
 */
export type PayslipSnapshot = $Result.DefaultSelection<Prisma.$PayslipSnapshotPayload>
/**
 * Model EmployeeCommission
 * 
 */
export type EmployeeCommission = $Result.DefaultSelection<Prisma.$EmployeeCommissionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const EmployeeStatus: {
  Active: 'Active',
  OnLeave: 'OnLeave',
  Terminated: 'Terminated'
};

export type EmployeeStatus = (typeof EmployeeStatus)[keyof typeof EmployeeStatus]


export const LeaveRequestStatus: {
  Draft: 'Draft',
  PendingApproval: 'PendingApproval',
  Approved: 'Approved',
  Rejected: 'Rejected'
};

export type LeaveRequestStatus = (typeof LeaveRequestStatus)[keyof typeof LeaveRequestStatus]


export const AttendanceStatus: {
  Present: 'Present',
  Absent: 'Absent',
  Leave: 'Leave',
  Holiday: 'Holiday'
};

export type AttendanceStatus = (typeof AttendanceStatus)[keyof typeof AttendanceStatus]


export const ContractStatus: {
  Active: 'Active',
  Expired: 'Expired',
  Terminated: 'Terminated'
};

export type ContractStatus = (typeof ContractStatus)[keyof typeof ContractStatus]


export const PayslipStatus: {
  Draft: 'Draft',
  Finalized: 'Finalized'
};

export type PayslipStatus = (typeof PayslipStatus)[keyof typeof PayslipStatus]

}

export type EmployeeStatus = $Enums.EmployeeStatus

export const EmployeeStatus: typeof $Enums.EmployeeStatus

export type LeaveRequestStatus = $Enums.LeaveRequestStatus

export const LeaveRequestStatus: typeof $Enums.LeaveRequestStatus

export type AttendanceStatus = $Enums.AttendanceStatus

export const AttendanceStatus: typeof $Enums.AttendanceStatus

export type ContractStatus = $Enums.ContractStatus

export const ContractStatus: typeof $Enums.ContractStatus

export type PayslipStatus = $Enums.PayslipStatus

export const PayslipStatus: typeof $Enums.PayslipStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Employees
 * const employees = await prisma.employee.findMany()
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
   * // Fetch zero or more Employees
   * const employees = await prisma.employee.findMany()
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
   * `prisma.employee`: Exposes CRUD operations for the **Employee** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Employees
    * const employees = await prisma.employee.findMany()
    * ```
    */
  get employee(): Prisma.EmployeeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.organizationalUnit`: Exposes CRUD operations for the **OrganizationalUnit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrganizationalUnits
    * const organizationalUnits = await prisma.organizationalUnit.findMany()
    * ```
    */
  get organizationalUnit(): Prisma.OrganizationalUnitDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.position`: Exposes CRUD operations for the **Position** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Positions
    * const positions = await prisma.position.findMany()
    * ```
    */
  get position(): Prisma.PositionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.attendanceRecord`: Exposes CRUD operations for the **AttendanceRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AttendanceRecords
    * const attendanceRecords = await prisma.attendanceRecord.findMany()
    * ```
    */
  get attendanceRecord(): Prisma.AttendanceRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.employeeContract`: Exposes CRUD operations for the **EmployeeContract** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmployeeContracts
    * const employeeContracts = await prisma.employeeContract.findMany()
    * ```
    */
  get employeeContract(): Prisma.EmployeeContractDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.leaveRequest`: Exposes CRUD operations for the **LeaveRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LeaveRequests
    * const leaveRequests = await prisma.leaveRequest.findMany()
    * ```
    */
  get leaveRequest(): Prisma.LeaveRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payrollRule`: Exposes CRUD operations for the **PayrollRule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PayrollRules
    * const payrollRules = await prisma.payrollRule.findMany()
    * ```
    */
  get payrollRule(): Prisma.PayrollRuleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.taxBracket`: Exposes CRUD operations for the **TaxBracket** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TaxBrackets
    * const taxBrackets = await prisma.taxBracket.findMany()
    * ```
    */
  get taxBracket(): Prisma.TaxBracketDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.insuranceRule`: Exposes CRUD operations for the **InsuranceRule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InsuranceRules
    * const insuranceRules = await prisma.insuranceRule.findMany()
    * ```
    */
  get insuranceRule(): Prisma.InsuranceRuleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payslipSnapshot`: Exposes CRUD operations for the **PayslipSnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PayslipSnapshots
    * const payslipSnapshots = await prisma.payslipSnapshot.findMany()
    * ```
    */
  get payslipSnapshot(): Prisma.PayslipSnapshotDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.employeeCommission`: Exposes CRUD operations for the **EmployeeCommission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmployeeCommissions
    * const employeeCommissions = await prisma.employeeCommission.findMany()
    * ```
    */
  get employeeCommission(): Prisma.EmployeeCommissionDelegate<ExtArgs, ClientOptions>;
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
    Employee: 'Employee',
    OrganizationalUnit: 'OrganizationalUnit',
    Position: 'Position',
    AttendanceRecord: 'AttendanceRecord',
    EmployeeContract: 'EmployeeContract',
    LeaveRequest: 'LeaveRequest',
    PayrollRule: 'PayrollRule',
    TaxBracket: 'TaxBracket',
    InsuranceRule: 'InsuranceRule',
    PayslipSnapshot: 'PayslipSnapshot',
    EmployeeCommission: 'EmployeeCommission'
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
      modelProps: "employee" | "organizationalUnit" | "position" | "attendanceRecord" | "employeeContract" | "leaveRequest" | "payrollRule" | "taxBracket" | "insuranceRule" | "payslipSnapshot" | "employeeCommission"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Employee: {
        payload: Prisma.$EmployeePayload<ExtArgs>
        fields: Prisma.EmployeeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmployeeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmployeeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          findFirst: {
            args: Prisma.EmployeeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmployeeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          findMany: {
            args: Prisma.EmployeeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          create: {
            args: Prisma.EmployeeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          createMany: {
            args: Prisma.EmployeeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmployeeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          delete: {
            args: Prisma.EmployeeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          update: {
            args: Prisma.EmployeeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          deleteMany: {
            args: Prisma.EmployeeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmployeeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmployeeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          upsert: {
            args: Prisma.EmployeeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          aggregate: {
            args: Prisma.EmployeeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmployee>
          }
          groupBy: {
            args: Prisma.EmployeeGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmployeeGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmployeeCountArgs<ExtArgs>
            result: $Utils.Optional<EmployeeCountAggregateOutputType> | number
          }
        }
      }
      OrganizationalUnit: {
        payload: Prisma.$OrganizationalUnitPayload<ExtArgs>
        fields: Prisma.OrganizationalUnitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizationalUnitFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationalUnitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizationalUnitFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationalUnitPayload>
          }
          findFirst: {
            args: Prisma.OrganizationalUnitFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationalUnitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizationalUnitFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationalUnitPayload>
          }
          findMany: {
            args: Prisma.OrganizationalUnitFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationalUnitPayload>[]
          }
          create: {
            args: Prisma.OrganizationalUnitCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationalUnitPayload>
          }
          createMany: {
            args: Prisma.OrganizationalUnitCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrganizationalUnitCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationalUnitPayload>[]
          }
          delete: {
            args: Prisma.OrganizationalUnitDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationalUnitPayload>
          }
          update: {
            args: Prisma.OrganizationalUnitUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationalUnitPayload>
          }
          deleteMany: {
            args: Prisma.OrganizationalUnitDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizationalUnitUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrganizationalUnitUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationalUnitPayload>[]
          }
          upsert: {
            args: Prisma.OrganizationalUnitUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationalUnitPayload>
          }
          aggregate: {
            args: Prisma.OrganizationalUnitAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganizationalUnit>
          }
          groupBy: {
            args: Prisma.OrganizationalUnitGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationalUnitGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizationalUnitCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizationalUnitCountAggregateOutputType> | number
          }
        }
      }
      Position: {
        payload: Prisma.$PositionPayload<ExtArgs>
        fields: Prisma.PositionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PositionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PositionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>
          }
          findFirst: {
            args: Prisma.PositionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PositionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>
          }
          findMany: {
            args: Prisma.PositionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>[]
          }
          create: {
            args: Prisma.PositionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>
          }
          createMany: {
            args: Prisma.PositionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PositionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>[]
          }
          delete: {
            args: Prisma.PositionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>
          }
          update: {
            args: Prisma.PositionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>
          }
          deleteMany: {
            args: Prisma.PositionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PositionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PositionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>[]
          }
          upsert: {
            args: Prisma.PositionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>
          }
          aggregate: {
            args: Prisma.PositionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePosition>
          }
          groupBy: {
            args: Prisma.PositionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PositionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PositionCountArgs<ExtArgs>
            result: $Utils.Optional<PositionCountAggregateOutputType> | number
          }
        }
      }
      AttendanceRecord: {
        payload: Prisma.$AttendanceRecordPayload<ExtArgs>
        fields: Prisma.AttendanceRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AttendanceRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AttendanceRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>
          }
          findFirst: {
            args: Prisma.AttendanceRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AttendanceRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>
          }
          findMany: {
            args: Prisma.AttendanceRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>[]
          }
          create: {
            args: Prisma.AttendanceRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>
          }
          createMany: {
            args: Prisma.AttendanceRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AttendanceRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>[]
          }
          delete: {
            args: Prisma.AttendanceRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>
          }
          update: {
            args: Prisma.AttendanceRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>
          }
          deleteMany: {
            args: Prisma.AttendanceRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AttendanceRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AttendanceRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>[]
          }
          upsert: {
            args: Prisma.AttendanceRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>
          }
          aggregate: {
            args: Prisma.AttendanceRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttendanceRecord>
          }
          groupBy: {
            args: Prisma.AttendanceRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<AttendanceRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.AttendanceRecordCountArgs<ExtArgs>
            result: $Utils.Optional<AttendanceRecordCountAggregateOutputType> | number
          }
        }
      }
      EmployeeContract: {
        payload: Prisma.$EmployeeContractPayload<ExtArgs>
        fields: Prisma.EmployeeContractFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmployeeContractFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeContractPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmployeeContractFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeContractPayload>
          }
          findFirst: {
            args: Prisma.EmployeeContractFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeContractPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmployeeContractFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeContractPayload>
          }
          findMany: {
            args: Prisma.EmployeeContractFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeContractPayload>[]
          }
          create: {
            args: Prisma.EmployeeContractCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeContractPayload>
          }
          createMany: {
            args: Prisma.EmployeeContractCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmployeeContractCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeContractPayload>[]
          }
          delete: {
            args: Prisma.EmployeeContractDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeContractPayload>
          }
          update: {
            args: Prisma.EmployeeContractUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeContractPayload>
          }
          deleteMany: {
            args: Prisma.EmployeeContractDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmployeeContractUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmployeeContractUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeContractPayload>[]
          }
          upsert: {
            args: Prisma.EmployeeContractUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeContractPayload>
          }
          aggregate: {
            args: Prisma.EmployeeContractAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmployeeContract>
          }
          groupBy: {
            args: Prisma.EmployeeContractGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmployeeContractGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmployeeContractCountArgs<ExtArgs>
            result: $Utils.Optional<EmployeeContractCountAggregateOutputType> | number
          }
        }
      }
      LeaveRequest: {
        payload: Prisma.$LeaveRequestPayload<ExtArgs>
        fields: Prisma.LeaveRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeaveRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeaveRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveRequestPayload>
          }
          findFirst: {
            args: Prisma.LeaveRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeaveRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveRequestPayload>
          }
          findMany: {
            args: Prisma.LeaveRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveRequestPayload>[]
          }
          create: {
            args: Prisma.LeaveRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveRequestPayload>
          }
          createMany: {
            args: Prisma.LeaveRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LeaveRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveRequestPayload>[]
          }
          delete: {
            args: Prisma.LeaveRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveRequestPayload>
          }
          update: {
            args: Prisma.LeaveRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveRequestPayload>
          }
          deleteMany: {
            args: Prisma.LeaveRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeaveRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LeaveRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveRequestPayload>[]
          }
          upsert: {
            args: Prisma.LeaveRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveRequestPayload>
          }
          aggregate: {
            args: Prisma.LeaveRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLeaveRequest>
          }
          groupBy: {
            args: Prisma.LeaveRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeaveRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeaveRequestCountArgs<ExtArgs>
            result: $Utils.Optional<LeaveRequestCountAggregateOutputType> | number
          }
        }
      }
      PayrollRule: {
        payload: Prisma.$PayrollRulePayload<ExtArgs>
        fields: Prisma.PayrollRuleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PayrollRuleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayrollRulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PayrollRuleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayrollRulePayload>
          }
          findFirst: {
            args: Prisma.PayrollRuleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayrollRulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PayrollRuleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayrollRulePayload>
          }
          findMany: {
            args: Prisma.PayrollRuleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayrollRulePayload>[]
          }
          create: {
            args: Prisma.PayrollRuleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayrollRulePayload>
          }
          createMany: {
            args: Prisma.PayrollRuleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PayrollRuleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayrollRulePayload>[]
          }
          delete: {
            args: Prisma.PayrollRuleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayrollRulePayload>
          }
          update: {
            args: Prisma.PayrollRuleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayrollRulePayload>
          }
          deleteMany: {
            args: Prisma.PayrollRuleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PayrollRuleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PayrollRuleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayrollRulePayload>[]
          }
          upsert: {
            args: Prisma.PayrollRuleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayrollRulePayload>
          }
          aggregate: {
            args: Prisma.PayrollRuleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayrollRule>
          }
          groupBy: {
            args: Prisma.PayrollRuleGroupByArgs<ExtArgs>
            result: $Utils.Optional<PayrollRuleGroupByOutputType>[]
          }
          count: {
            args: Prisma.PayrollRuleCountArgs<ExtArgs>
            result: $Utils.Optional<PayrollRuleCountAggregateOutputType> | number
          }
        }
      }
      TaxBracket: {
        payload: Prisma.$TaxBracketPayload<ExtArgs>
        fields: Prisma.TaxBracketFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaxBracketFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaxBracketPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaxBracketFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaxBracketPayload>
          }
          findFirst: {
            args: Prisma.TaxBracketFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaxBracketPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaxBracketFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaxBracketPayload>
          }
          findMany: {
            args: Prisma.TaxBracketFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaxBracketPayload>[]
          }
          create: {
            args: Prisma.TaxBracketCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaxBracketPayload>
          }
          createMany: {
            args: Prisma.TaxBracketCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaxBracketCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaxBracketPayload>[]
          }
          delete: {
            args: Prisma.TaxBracketDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaxBracketPayload>
          }
          update: {
            args: Prisma.TaxBracketUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaxBracketPayload>
          }
          deleteMany: {
            args: Prisma.TaxBracketDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaxBracketUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaxBracketUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaxBracketPayload>[]
          }
          upsert: {
            args: Prisma.TaxBracketUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaxBracketPayload>
          }
          aggregate: {
            args: Prisma.TaxBracketAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTaxBracket>
          }
          groupBy: {
            args: Prisma.TaxBracketGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaxBracketGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaxBracketCountArgs<ExtArgs>
            result: $Utils.Optional<TaxBracketCountAggregateOutputType> | number
          }
        }
      }
      InsuranceRule: {
        payload: Prisma.$InsuranceRulePayload<ExtArgs>
        fields: Prisma.InsuranceRuleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InsuranceRuleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsuranceRulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InsuranceRuleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsuranceRulePayload>
          }
          findFirst: {
            args: Prisma.InsuranceRuleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsuranceRulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InsuranceRuleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsuranceRulePayload>
          }
          findMany: {
            args: Prisma.InsuranceRuleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsuranceRulePayload>[]
          }
          create: {
            args: Prisma.InsuranceRuleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsuranceRulePayload>
          }
          createMany: {
            args: Prisma.InsuranceRuleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InsuranceRuleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsuranceRulePayload>[]
          }
          delete: {
            args: Prisma.InsuranceRuleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsuranceRulePayload>
          }
          update: {
            args: Prisma.InsuranceRuleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsuranceRulePayload>
          }
          deleteMany: {
            args: Prisma.InsuranceRuleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InsuranceRuleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InsuranceRuleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsuranceRulePayload>[]
          }
          upsert: {
            args: Prisma.InsuranceRuleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsuranceRulePayload>
          }
          aggregate: {
            args: Prisma.InsuranceRuleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInsuranceRule>
          }
          groupBy: {
            args: Prisma.InsuranceRuleGroupByArgs<ExtArgs>
            result: $Utils.Optional<InsuranceRuleGroupByOutputType>[]
          }
          count: {
            args: Prisma.InsuranceRuleCountArgs<ExtArgs>
            result: $Utils.Optional<InsuranceRuleCountAggregateOutputType> | number
          }
        }
      }
      PayslipSnapshot: {
        payload: Prisma.$PayslipSnapshotPayload<ExtArgs>
        fields: Prisma.PayslipSnapshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PayslipSnapshotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayslipSnapshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PayslipSnapshotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayslipSnapshotPayload>
          }
          findFirst: {
            args: Prisma.PayslipSnapshotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayslipSnapshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PayslipSnapshotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayslipSnapshotPayload>
          }
          findMany: {
            args: Prisma.PayslipSnapshotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayslipSnapshotPayload>[]
          }
          create: {
            args: Prisma.PayslipSnapshotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayslipSnapshotPayload>
          }
          createMany: {
            args: Prisma.PayslipSnapshotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PayslipSnapshotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayslipSnapshotPayload>[]
          }
          delete: {
            args: Prisma.PayslipSnapshotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayslipSnapshotPayload>
          }
          update: {
            args: Prisma.PayslipSnapshotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayslipSnapshotPayload>
          }
          deleteMany: {
            args: Prisma.PayslipSnapshotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PayslipSnapshotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PayslipSnapshotUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayslipSnapshotPayload>[]
          }
          upsert: {
            args: Prisma.PayslipSnapshotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayslipSnapshotPayload>
          }
          aggregate: {
            args: Prisma.PayslipSnapshotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayslipSnapshot>
          }
          groupBy: {
            args: Prisma.PayslipSnapshotGroupByArgs<ExtArgs>
            result: $Utils.Optional<PayslipSnapshotGroupByOutputType>[]
          }
          count: {
            args: Prisma.PayslipSnapshotCountArgs<ExtArgs>
            result: $Utils.Optional<PayslipSnapshotCountAggregateOutputType> | number
          }
        }
      }
      EmployeeCommission: {
        payload: Prisma.$EmployeeCommissionPayload<ExtArgs>
        fields: Prisma.EmployeeCommissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmployeeCommissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeCommissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmployeeCommissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeCommissionPayload>
          }
          findFirst: {
            args: Prisma.EmployeeCommissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeCommissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmployeeCommissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeCommissionPayload>
          }
          findMany: {
            args: Prisma.EmployeeCommissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeCommissionPayload>[]
          }
          create: {
            args: Prisma.EmployeeCommissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeCommissionPayload>
          }
          createMany: {
            args: Prisma.EmployeeCommissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmployeeCommissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeCommissionPayload>[]
          }
          delete: {
            args: Prisma.EmployeeCommissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeCommissionPayload>
          }
          update: {
            args: Prisma.EmployeeCommissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeCommissionPayload>
          }
          deleteMany: {
            args: Prisma.EmployeeCommissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmployeeCommissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmployeeCommissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeCommissionPayload>[]
          }
          upsert: {
            args: Prisma.EmployeeCommissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeCommissionPayload>
          }
          aggregate: {
            args: Prisma.EmployeeCommissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmployeeCommission>
          }
          groupBy: {
            args: Prisma.EmployeeCommissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmployeeCommissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmployeeCommissionCountArgs<ExtArgs>
            result: $Utils.Optional<EmployeeCommissionCountAggregateOutputType> | number
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
    employee?: EmployeeOmit
    organizationalUnit?: OrganizationalUnitOmit
    position?: PositionOmit
    attendanceRecord?: AttendanceRecordOmit
    employeeContract?: EmployeeContractOmit
    leaveRequest?: LeaveRequestOmit
    payrollRule?: PayrollRuleOmit
    taxBracket?: TaxBracketOmit
    insuranceRule?: InsuranceRuleOmit
    payslipSnapshot?: PayslipSnapshotOmit
    employeeCommission?: EmployeeCommissionOmit
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
   * Count Type EmployeeCountOutputType
   */

  export type EmployeeCountOutputType = {
    leaveRequests: number
    attendanceRecords: number
    contracts: number
  }

  export type EmployeeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leaveRequests?: boolean | EmployeeCountOutputTypeCountLeaveRequestsArgs
    attendanceRecords?: boolean | EmployeeCountOutputTypeCountAttendanceRecordsArgs
    contracts?: boolean | EmployeeCountOutputTypeCountContractsArgs
  }

  // Custom InputTypes
  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeCountOutputType
     */
    select?: EmployeeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountLeaveRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeaveRequestWhereInput
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountAttendanceRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendanceRecordWhereInput
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountContractsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeContractWhereInput
  }


  /**
   * Count Type OrganizationalUnitCountOutputType
   */

  export type OrganizationalUnitCountOutputType = {
    children: number
    positions: number
  }

  export type OrganizationalUnitCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | OrganizationalUnitCountOutputTypeCountChildrenArgs
    positions?: boolean | OrganizationalUnitCountOutputTypeCountPositionsArgs
  }

  // Custom InputTypes
  /**
   * OrganizationalUnitCountOutputType without action
   */
  export type OrganizationalUnitCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationalUnitCountOutputType
     */
    select?: OrganizationalUnitCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrganizationalUnitCountOutputType without action
   */
  export type OrganizationalUnitCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationalUnitWhereInput
  }

  /**
   * OrganizationalUnitCountOutputType without action
   */
  export type OrganizationalUnitCountOutputTypeCountPositionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PositionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Employee
   */

  export type AggregateEmployee = {
    _count: EmployeeCountAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  export type EmployeeMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    employeeNumber: string | null
    fullName: string | null
    nationalId: string | null
    birthDate: Date | null
    phone: string | null
    email: string | null
    address: string | null
    hireDate: Date | null
    status: $Enums.EmployeeStatus | null
    createdAt: Date | null
  }

  export type EmployeeMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    employeeNumber: string | null
    fullName: string | null
    nationalId: string | null
    birthDate: Date | null
    phone: string | null
    email: string | null
    address: string | null
    hireDate: Date | null
    status: $Enums.EmployeeStatus | null
    createdAt: Date | null
  }

  export type EmployeeCountAggregateOutputType = {
    id: number
    tenantId: number
    employeeNumber: number
    fullName: number
    nationalId: number
    birthDate: number
    phone: number
    email: number
    address: number
    hireDate: number
    status: number
    createdAt: number
    _all: number
  }


  export type EmployeeMinAggregateInputType = {
    id?: true
    tenantId?: true
    employeeNumber?: true
    fullName?: true
    nationalId?: true
    birthDate?: true
    phone?: true
    email?: true
    address?: true
    hireDate?: true
    status?: true
    createdAt?: true
  }

  export type EmployeeMaxAggregateInputType = {
    id?: true
    tenantId?: true
    employeeNumber?: true
    fullName?: true
    nationalId?: true
    birthDate?: true
    phone?: true
    email?: true
    address?: true
    hireDate?: true
    status?: true
    createdAt?: true
  }

  export type EmployeeCountAggregateInputType = {
    id?: true
    tenantId?: true
    employeeNumber?: true
    fullName?: true
    nationalId?: true
    birthDate?: true
    phone?: true
    email?: true
    address?: true
    hireDate?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type EmployeeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employee to aggregate.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Employees
    **/
    _count?: true | EmployeeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeeMaxAggregateInputType
  }

  export type GetEmployeeAggregateType<T extends EmployeeAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployee]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployee[P]>
      : GetScalarType<T[P], AggregateEmployee[P]>
  }




  export type EmployeeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeWhereInput
    orderBy?: EmployeeOrderByWithAggregationInput | EmployeeOrderByWithAggregationInput[]
    by: EmployeeScalarFieldEnum[] | EmployeeScalarFieldEnum
    having?: EmployeeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeeCountAggregateInputType | true
    _min?: EmployeeMinAggregateInputType
    _max?: EmployeeMaxAggregateInputType
  }

  export type EmployeeGroupByOutputType = {
    id: string
    tenantId: string
    employeeNumber: string
    fullName: string
    nationalId: string
    birthDate: Date
    phone: string | null
    email: string | null
    address: string | null
    hireDate: Date
    status: $Enums.EmployeeStatus
    createdAt: Date
    _count: EmployeeCountAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  type GetEmployeeGroupByPayload<T extends EmployeeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployeeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
        }
      >
    >


  export type EmployeeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    employeeNumber?: boolean
    fullName?: boolean
    nationalId?: boolean
    birthDate?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    hireDate?: boolean
    status?: boolean
    createdAt?: boolean
    leaveRequests?: boolean | Employee$leaveRequestsArgs<ExtArgs>
    attendanceRecords?: boolean | Employee$attendanceRecordsArgs<ExtArgs>
    contracts?: boolean | Employee$contractsArgs<ExtArgs>
    _count?: boolean | EmployeeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employee"]>

  export type EmployeeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    employeeNumber?: boolean
    fullName?: boolean
    nationalId?: boolean
    birthDate?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    hireDate?: boolean
    status?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["employee"]>

  export type EmployeeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    employeeNumber?: boolean
    fullName?: boolean
    nationalId?: boolean
    birthDate?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    hireDate?: boolean
    status?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["employee"]>

  export type EmployeeSelectScalar = {
    id?: boolean
    tenantId?: boolean
    employeeNumber?: boolean
    fullName?: boolean
    nationalId?: boolean
    birthDate?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    hireDate?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type EmployeeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "employeeNumber" | "fullName" | "nationalId" | "birthDate" | "phone" | "email" | "address" | "hireDate" | "status" | "createdAt", ExtArgs["result"]["employee"]>
  export type EmployeeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leaveRequests?: boolean | Employee$leaveRequestsArgs<ExtArgs>
    attendanceRecords?: boolean | Employee$attendanceRecordsArgs<ExtArgs>
    contracts?: boolean | Employee$contractsArgs<ExtArgs>
    _count?: boolean | EmployeeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EmployeeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type EmployeeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $EmployeePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Employee"
    objects: {
      leaveRequests: Prisma.$LeaveRequestPayload<ExtArgs>[]
      attendanceRecords: Prisma.$AttendanceRecordPayload<ExtArgs>[]
      contracts: Prisma.$EmployeeContractPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      employeeNumber: string
      fullName: string
      nationalId: string
      birthDate: Date
      phone: string | null
      email: string | null
      address: string | null
      hireDate: Date
      status: $Enums.EmployeeStatus
      createdAt: Date
    }, ExtArgs["result"]["employee"]>
    composites: {}
  }

  type EmployeeGetPayload<S extends boolean | null | undefined | EmployeeDefaultArgs> = $Result.GetResult<Prisma.$EmployeePayload, S>

  type EmployeeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmployeeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmployeeCountAggregateInputType | true
    }

  export interface EmployeeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Employee'], meta: { name: 'Employee' } }
    /**
     * Find zero or one Employee that matches the filter.
     * @param {EmployeeFindUniqueArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmployeeFindUniqueArgs>(args: SelectSubset<T, EmployeeFindUniqueArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Employee that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmployeeFindUniqueOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmployeeFindUniqueOrThrowArgs>(args: SelectSubset<T, EmployeeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employee that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindFirstArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmployeeFindFirstArgs>(args?: SelectSubset<T, EmployeeFindFirstArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employee that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindFirstOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmployeeFindFirstOrThrowArgs>(args?: SelectSubset<T, EmployeeFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Employees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Employees
     * const employees = await prisma.employee.findMany()
     * 
     * // Get first 10 Employees
     * const employees = await prisma.employee.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employeeWithIdOnly = await prisma.employee.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmployeeFindManyArgs>(args?: SelectSubset<T, EmployeeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Employee.
     * @param {EmployeeCreateArgs} args - Arguments to create a Employee.
     * @example
     * // Create one Employee
     * const Employee = await prisma.employee.create({
     *   data: {
     *     // ... data to create a Employee
     *   }
     * })
     * 
     */
    create<T extends EmployeeCreateArgs>(args: SelectSubset<T, EmployeeCreateArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Employees.
     * @param {EmployeeCreateManyArgs} args - Arguments to create many Employees.
     * @example
     * // Create many Employees
     * const employee = await prisma.employee.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmployeeCreateManyArgs>(args?: SelectSubset<T, EmployeeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Employees and returns the data saved in the database.
     * @param {EmployeeCreateManyAndReturnArgs} args - Arguments to create many Employees.
     * @example
     * // Create many Employees
     * const employee = await prisma.employee.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Employees and only return the `id`
     * const employeeWithIdOnly = await prisma.employee.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmployeeCreateManyAndReturnArgs>(args?: SelectSubset<T, EmployeeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Employee.
     * @param {EmployeeDeleteArgs} args - Arguments to delete one Employee.
     * @example
     * // Delete one Employee
     * const Employee = await prisma.employee.delete({
     *   where: {
     *     // ... filter to delete one Employee
     *   }
     * })
     * 
     */
    delete<T extends EmployeeDeleteArgs>(args: SelectSubset<T, EmployeeDeleteArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Employee.
     * @param {EmployeeUpdateArgs} args - Arguments to update one Employee.
     * @example
     * // Update one Employee
     * const employee = await prisma.employee.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmployeeUpdateArgs>(args: SelectSubset<T, EmployeeUpdateArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Employees.
     * @param {EmployeeDeleteManyArgs} args - Arguments to filter Employees to delete.
     * @example
     * // Delete a few Employees
     * const { count } = await prisma.employee.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmployeeDeleteManyArgs>(args?: SelectSubset<T, EmployeeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Employees
     * const employee = await prisma.employee.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmployeeUpdateManyArgs>(args: SelectSubset<T, EmployeeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees and returns the data updated in the database.
     * @param {EmployeeUpdateManyAndReturnArgs} args - Arguments to update many Employees.
     * @example
     * // Update many Employees
     * const employee = await prisma.employee.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Employees and only return the `id`
     * const employeeWithIdOnly = await prisma.employee.updateManyAndReturn({
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
    updateManyAndReturn<T extends EmployeeUpdateManyAndReturnArgs>(args: SelectSubset<T, EmployeeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Employee.
     * @param {EmployeeUpsertArgs} args - Arguments to update or create a Employee.
     * @example
     * // Update or create a Employee
     * const employee = await prisma.employee.upsert({
     *   create: {
     *     // ... data to create a Employee
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Employee we want to update
     *   }
     * })
     */
    upsert<T extends EmployeeUpsertArgs>(args: SelectSubset<T, EmployeeUpsertArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeCountArgs} args - Arguments to filter Employees to count.
     * @example
     * // Count the number of Employees
     * const count = await prisma.employee.count({
     *   where: {
     *     // ... the filter for the Employees we want to count
     *   }
     * })
    **/
    count<T extends EmployeeCountArgs>(
      args?: Subset<T, EmployeeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EmployeeAggregateArgs>(args: Subset<T, EmployeeAggregateArgs>): Prisma.PrismaPromise<GetEmployeeAggregateType<T>>

    /**
     * Group by Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeGroupByArgs} args - Group by arguments.
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
      T extends EmployeeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployeeGroupByArgs['orderBy'] }
        : { orderBy?: EmployeeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EmployeeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Employee model
   */
  readonly fields: EmployeeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Employee.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmployeeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    leaveRequests<T extends Employee$leaveRequestsArgs<ExtArgs> = {}>(args?: Subset<T, Employee$leaveRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    attendanceRecords<T extends Employee$attendanceRecordsArgs<ExtArgs> = {}>(args?: Subset<T, Employee$attendanceRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    contracts<T extends Employee$contractsArgs<ExtArgs> = {}>(args?: Subset<T, Employee$contractsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeContractPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Employee model
   */
  interface EmployeeFieldRefs {
    readonly id: FieldRef<"Employee", 'String'>
    readonly tenantId: FieldRef<"Employee", 'String'>
    readonly employeeNumber: FieldRef<"Employee", 'String'>
    readonly fullName: FieldRef<"Employee", 'String'>
    readonly nationalId: FieldRef<"Employee", 'String'>
    readonly birthDate: FieldRef<"Employee", 'DateTime'>
    readonly phone: FieldRef<"Employee", 'String'>
    readonly email: FieldRef<"Employee", 'String'>
    readonly address: FieldRef<"Employee", 'String'>
    readonly hireDate: FieldRef<"Employee", 'DateTime'>
    readonly status: FieldRef<"Employee", 'EmployeeStatus'>
    readonly createdAt: FieldRef<"Employee", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Employee findUnique
   */
  export type EmployeeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee findUniqueOrThrow
   */
  export type EmployeeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee findFirst
   */
  export type EmployeeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee findFirstOrThrow
   */
  export type EmployeeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee findMany
   */
  export type EmployeeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employees to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee create
   */
  export type EmployeeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The data needed to create a Employee.
     */
    data: XOR<EmployeeCreateInput, EmployeeUncheckedCreateInput>
  }

  /**
   * Employee createMany
   */
  export type EmployeeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Employees.
     */
    data: EmployeeCreateManyInput | EmployeeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Employee createManyAndReturn
   */
  export type EmployeeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * The data used to create many Employees.
     */
    data: EmployeeCreateManyInput | EmployeeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Employee update
   */
  export type EmployeeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The data needed to update a Employee.
     */
    data: XOR<EmployeeUpdateInput, EmployeeUncheckedUpdateInput>
    /**
     * Choose, which Employee to update.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee updateMany
   */
  export type EmployeeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Employees.
     */
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyInput>
    /**
     * Filter which Employees to update
     */
    where?: EmployeeWhereInput
    /**
     * Limit how many Employees to update.
     */
    limit?: number
  }

  /**
   * Employee updateManyAndReturn
   */
  export type EmployeeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * The data used to update Employees.
     */
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyInput>
    /**
     * Filter which Employees to update
     */
    where?: EmployeeWhereInput
    /**
     * Limit how many Employees to update.
     */
    limit?: number
  }

  /**
   * Employee upsert
   */
  export type EmployeeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The filter to search for the Employee to update in case it exists.
     */
    where: EmployeeWhereUniqueInput
    /**
     * In case the Employee found by the `where` argument doesn't exist, create a new Employee with this data.
     */
    create: XOR<EmployeeCreateInput, EmployeeUncheckedCreateInput>
    /**
     * In case the Employee was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmployeeUpdateInput, EmployeeUncheckedUpdateInput>
  }

  /**
   * Employee delete
   */
  export type EmployeeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter which Employee to delete.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee deleteMany
   */
  export type EmployeeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employees to delete
     */
    where?: EmployeeWhereInput
    /**
     * Limit how many Employees to delete.
     */
    limit?: number
  }

  /**
   * Employee.leaveRequests
   */
  export type Employee$leaveRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestInclude<ExtArgs> | null
    where?: LeaveRequestWhereInput
    orderBy?: LeaveRequestOrderByWithRelationInput | LeaveRequestOrderByWithRelationInput[]
    cursor?: LeaveRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeaveRequestScalarFieldEnum | LeaveRequestScalarFieldEnum[]
  }

  /**
   * Employee.attendanceRecords
   */
  export type Employee$attendanceRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    where?: AttendanceRecordWhereInput
    orderBy?: AttendanceRecordOrderByWithRelationInput | AttendanceRecordOrderByWithRelationInput[]
    cursor?: AttendanceRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttendanceRecordScalarFieldEnum | AttendanceRecordScalarFieldEnum[]
  }

  /**
   * Employee.contracts
   */
  export type Employee$contractsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeContract
     */
    select?: EmployeeContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeContract
     */
    omit?: EmployeeContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeContractInclude<ExtArgs> | null
    where?: EmployeeContractWhereInput
    orderBy?: EmployeeContractOrderByWithRelationInput | EmployeeContractOrderByWithRelationInput[]
    cursor?: EmployeeContractWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmployeeContractScalarFieldEnum | EmployeeContractScalarFieldEnum[]
  }

  /**
   * Employee without action
   */
  export type EmployeeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
  }


  /**
   * Model OrganizationalUnit
   */

  export type AggregateOrganizationalUnit = {
    _count: OrganizationalUnitCountAggregateOutputType | null
    _min: OrganizationalUnitMinAggregateOutputType | null
    _max: OrganizationalUnitMaxAggregateOutputType | null
  }

  export type OrganizationalUnitMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    code: string | null
    nameFa: string | null
    parentId: string | null
  }

  export type OrganizationalUnitMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    code: string | null
    nameFa: string | null
    parentId: string | null
  }

  export type OrganizationalUnitCountAggregateOutputType = {
    id: number
    tenantId: number
    code: number
    nameFa: number
    parentId: number
    _all: number
  }


  export type OrganizationalUnitMinAggregateInputType = {
    id?: true
    tenantId?: true
    code?: true
    nameFa?: true
    parentId?: true
  }

  export type OrganizationalUnitMaxAggregateInputType = {
    id?: true
    tenantId?: true
    code?: true
    nameFa?: true
    parentId?: true
  }

  export type OrganizationalUnitCountAggregateInputType = {
    id?: true
    tenantId?: true
    code?: true
    nameFa?: true
    parentId?: true
    _all?: true
  }

  export type OrganizationalUnitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrganizationalUnit to aggregate.
     */
    where?: OrganizationalUnitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationalUnits to fetch.
     */
    orderBy?: OrganizationalUnitOrderByWithRelationInput | OrganizationalUnitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizationalUnitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationalUnits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationalUnits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrganizationalUnits
    **/
    _count?: true | OrganizationalUnitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizationalUnitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizationalUnitMaxAggregateInputType
  }

  export type GetOrganizationalUnitAggregateType<T extends OrganizationalUnitAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganizationalUnit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganizationalUnit[P]>
      : GetScalarType<T[P], AggregateOrganizationalUnit[P]>
  }




  export type OrganizationalUnitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationalUnitWhereInput
    orderBy?: OrganizationalUnitOrderByWithAggregationInput | OrganizationalUnitOrderByWithAggregationInput[]
    by: OrganizationalUnitScalarFieldEnum[] | OrganizationalUnitScalarFieldEnum
    having?: OrganizationalUnitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationalUnitCountAggregateInputType | true
    _min?: OrganizationalUnitMinAggregateInputType
    _max?: OrganizationalUnitMaxAggregateInputType
  }

  export type OrganizationalUnitGroupByOutputType = {
    id: string
    tenantId: string
    code: string
    nameFa: string
    parentId: string | null
    _count: OrganizationalUnitCountAggregateOutputType | null
    _min: OrganizationalUnitMinAggregateOutputType | null
    _max: OrganizationalUnitMaxAggregateOutputType | null
  }

  type GetOrganizationalUnitGroupByPayload<T extends OrganizationalUnitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizationalUnitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizationalUnitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizationalUnitGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizationalUnitGroupByOutputType[P]>
        }
      >
    >


  export type OrganizationalUnitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    code?: boolean
    nameFa?: boolean
    parentId?: boolean
    parent?: boolean | OrganizationalUnit$parentArgs<ExtArgs>
    children?: boolean | OrganizationalUnit$childrenArgs<ExtArgs>
    positions?: boolean | OrganizationalUnit$positionsArgs<ExtArgs>
    _count?: boolean | OrganizationalUnitCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organizationalUnit"]>

  export type OrganizationalUnitSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    code?: boolean
    nameFa?: boolean
    parentId?: boolean
    parent?: boolean | OrganizationalUnit$parentArgs<ExtArgs>
  }, ExtArgs["result"]["organizationalUnit"]>

  export type OrganizationalUnitSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    code?: boolean
    nameFa?: boolean
    parentId?: boolean
    parent?: boolean | OrganizationalUnit$parentArgs<ExtArgs>
  }, ExtArgs["result"]["organizationalUnit"]>

  export type OrganizationalUnitSelectScalar = {
    id?: boolean
    tenantId?: boolean
    code?: boolean
    nameFa?: boolean
    parentId?: boolean
  }

  export type OrganizationalUnitOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "code" | "nameFa" | "parentId", ExtArgs["result"]["organizationalUnit"]>
  export type OrganizationalUnitInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | OrganizationalUnit$parentArgs<ExtArgs>
    children?: boolean | OrganizationalUnit$childrenArgs<ExtArgs>
    positions?: boolean | OrganizationalUnit$positionsArgs<ExtArgs>
    _count?: boolean | OrganizationalUnitCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrganizationalUnitIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | OrganizationalUnit$parentArgs<ExtArgs>
  }
  export type OrganizationalUnitIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | OrganizationalUnit$parentArgs<ExtArgs>
  }

  export type $OrganizationalUnitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrganizationalUnit"
    objects: {
      parent: Prisma.$OrganizationalUnitPayload<ExtArgs> | null
      children: Prisma.$OrganizationalUnitPayload<ExtArgs>[]
      positions: Prisma.$PositionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      code: string
      nameFa: string
      parentId: string | null
    }, ExtArgs["result"]["organizationalUnit"]>
    composites: {}
  }

  type OrganizationalUnitGetPayload<S extends boolean | null | undefined | OrganizationalUnitDefaultArgs> = $Result.GetResult<Prisma.$OrganizationalUnitPayload, S>

  type OrganizationalUnitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrganizationalUnitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrganizationalUnitCountAggregateInputType | true
    }

  export interface OrganizationalUnitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrganizationalUnit'], meta: { name: 'OrganizationalUnit' } }
    /**
     * Find zero or one OrganizationalUnit that matches the filter.
     * @param {OrganizationalUnitFindUniqueArgs} args - Arguments to find a OrganizationalUnit
     * @example
     * // Get one OrganizationalUnit
     * const organizationalUnit = await prisma.organizationalUnit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizationalUnitFindUniqueArgs>(args: SelectSubset<T, OrganizationalUnitFindUniqueArgs<ExtArgs>>): Prisma__OrganizationalUnitClient<$Result.GetResult<Prisma.$OrganizationalUnitPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrganizationalUnit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrganizationalUnitFindUniqueOrThrowArgs} args - Arguments to find a OrganizationalUnit
     * @example
     * // Get one OrganizationalUnit
     * const organizationalUnit = await prisma.organizationalUnit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizationalUnitFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizationalUnitFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizationalUnitClient<$Result.GetResult<Prisma.$OrganizationalUnitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrganizationalUnit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationalUnitFindFirstArgs} args - Arguments to find a OrganizationalUnit
     * @example
     * // Get one OrganizationalUnit
     * const organizationalUnit = await prisma.organizationalUnit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizationalUnitFindFirstArgs>(args?: SelectSubset<T, OrganizationalUnitFindFirstArgs<ExtArgs>>): Prisma__OrganizationalUnitClient<$Result.GetResult<Prisma.$OrganizationalUnitPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrganizationalUnit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationalUnitFindFirstOrThrowArgs} args - Arguments to find a OrganizationalUnit
     * @example
     * // Get one OrganizationalUnit
     * const organizationalUnit = await prisma.organizationalUnit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizationalUnitFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizationalUnitFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizationalUnitClient<$Result.GetResult<Prisma.$OrganizationalUnitPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrganizationalUnits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationalUnitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrganizationalUnits
     * const organizationalUnits = await prisma.organizationalUnit.findMany()
     * 
     * // Get first 10 OrganizationalUnits
     * const organizationalUnits = await prisma.organizationalUnit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const organizationalUnitWithIdOnly = await prisma.organizationalUnit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrganizationalUnitFindManyArgs>(args?: SelectSubset<T, OrganizationalUnitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationalUnitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrganizationalUnit.
     * @param {OrganizationalUnitCreateArgs} args - Arguments to create a OrganizationalUnit.
     * @example
     * // Create one OrganizationalUnit
     * const OrganizationalUnit = await prisma.organizationalUnit.create({
     *   data: {
     *     // ... data to create a OrganizationalUnit
     *   }
     * })
     * 
     */
    create<T extends OrganizationalUnitCreateArgs>(args: SelectSubset<T, OrganizationalUnitCreateArgs<ExtArgs>>): Prisma__OrganizationalUnitClient<$Result.GetResult<Prisma.$OrganizationalUnitPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrganizationalUnits.
     * @param {OrganizationalUnitCreateManyArgs} args - Arguments to create many OrganizationalUnits.
     * @example
     * // Create many OrganizationalUnits
     * const organizationalUnit = await prisma.organizationalUnit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizationalUnitCreateManyArgs>(args?: SelectSubset<T, OrganizationalUnitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrganizationalUnits and returns the data saved in the database.
     * @param {OrganizationalUnitCreateManyAndReturnArgs} args - Arguments to create many OrganizationalUnits.
     * @example
     * // Create many OrganizationalUnits
     * const organizationalUnit = await prisma.organizationalUnit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrganizationalUnits and only return the `id`
     * const organizationalUnitWithIdOnly = await prisma.organizationalUnit.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrganizationalUnitCreateManyAndReturnArgs>(args?: SelectSubset<T, OrganizationalUnitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationalUnitPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrganizationalUnit.
     * @param {OrganizationalUnitDeleteArgs} args - Arguments to delete one OrganizationalUnit.
     * @example
     * // Delete one OrganizationalUnit
     * const OrganizationalUnit = await prisma.organizationalUnit.delete({
     *   where: {
     *     // ... filter to delete one OrganizationalUnit
     *   }
     * })
     * 
     */
    delete<T extends OrganizationalUnitDeleteArgs>(args: SelectSubset<T, OrganizationalUnitDeleteArgs<ExtArgs>>): Prisma__OrganizationalUnitClient<$Result.GetResult<Prisma.$OrganizationalUnitPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrganizationalUnit.
     * @param {OrganizationalUnitUpdateArgs} args - Arguments to update one OrganizationalUnit.
     * @example
     * // Update one OrganizationalUnit
     * const organizationalUnit = await prisma.organizationalUnit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizationalUnitUpdateArgs>(args: SelectSubset<T, OrganizationalUnitUpdateArgs<ExtArgs>>): Prisma__OrganizationalUnitClient<$Result.GetResult<Prisma.$OrganizationalUnitPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrganizationalUnits.
     * @param {OrganizationalUnitDeleteManyArgs} args - Arguments to filter OrganizationalUnits to delete.
     * @example
     * // Delete a few OrganizationalUnits
     * const { count } = await prisma.organizationalUnit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizationalUnitDeleteManyArgs>(args?: SelectSubset<T, OrganizationalUnitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrganizationalUnits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationalUnitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrganizationalUnits
     * const organizationalUnit = await prisma.organizationalUnit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizationalUnitUpdateManyArgs>(args: SelectSubset<T, OrganizationalUnitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrganizationalUnits and returns the data updated in the database.
     * @param {OrganizationalUnitUpdateManyAndReturnArgs} args - Arguments to update many OrganizationalUnits.
     * @example
     * // Update many OrganizationalUnits
     * const organizationalUnit = await prisma.organizationalUnit.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrganizationalUnits and only return the `id`
     * const organizationalUnitWithIdOnly = await prisma.organizationalUnit.updateManyAndReturn({
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
    updateManyAndReturn<T extends OrganizationalUnitUpdateManyAndReturnArgs>(args: SelectSubset<T, OrganizationalUnitUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationalUnitPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrganizationalUnit.
     * @param {OrganizationalUnitUpsertArgs} args - Arguments to update or create a OrganizationalUnit.
     * @example
     * // Update or create a OrganizationalUnit
     * const organizationalUnit = await prisma.organizationalUnit.upsert({
     *   create: {
     *     // ... data to create a OrganizationalUnit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrganizationalUnit we want to update
     *   }
     * })
     */
    upsert<T extends OrganizationalUnitUpsertArgs>(args: SelectSubset<T, OrganizationalUnitUpsertArgs<ExtArgs>>): Prisma__OrganizationalUnitClient<$Result.GetResult<Prisma.$OrganizationalUnitPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrganizationalUnits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationalUnitCountArgs} args - Arguments to filter OrganizationalUnits to count.
     * @example
     * // Count the number of OrganizationalUnits
     * const count = await prisma.organizationalUnit.count({
     *   where: {
     *     // ... the filter for the OrganizationalUnits we want to count
     *   }
     * })
    **/
    count<T extends OrganizationalUnitCountArgs>(
      args?: Subset<T, OrganizationalUnitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizationalUnitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrganizationalUnit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationalUnitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrganizationalUnitAggregateArgs>(args: Subset<T, OrganizationalUnitAggregateArgs>): Prisma.PrismaPromise<GetOrganizationalUnitAggregateType<T>>

    /**
     * Group by OrganizationalUnit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationalUnitGroupByArgs} args - Group by arguments.
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
      T extends OrganizationalUnitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizationalUnitGroupByArgs['orderBy'] }
        : { orderBy?: OrganizationalUnitGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OrganizationalUnitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationalUnitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrganizationalUnit model
   */
  readonly fields: OrganizationalUnitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrganizationalUnit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizationalUnitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parent<T extends OrganizationalUnit$parentArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationalUnit$parentArgs<ExtArgs>>): Prisma__OrganizationalUnitClient<$Result.GetResult<Prisma.$OrganizationalUnitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    children<T extends OrganizationalUnit$childrenArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationalUnit$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationalUnitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    positions<T extends OrganizationalUnit$positionsArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationalUnit$positionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the OrganizationalUnit model
   */
  interface OrganizationalUnitFieldRefs {
    readonly id: FieldRef<"OrganizationalUnit", 'String'>
    readonly tenantId: FieldRef<"OrganizationalUnit", 'String'>
    readonly code: FieldRef<"OrganizationalUnit", 'String'>
    readonly nameFa: FieldRef<"OrganizationalUnit", 'String'>
    readonly parentId: FieldRef<"OrganizationalUnit", 'String'>
  }
    

  // Custom InputTypes
  /**
   * OrganizationalUnit findUnique
   */
  export type OrganizationalUnitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationalUnit
     */
    select?: OrganizationalUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationalUnit
     */
    omit?: OrganizationalUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationalUnitInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationalUnit to fetch.
     */
    where: OrganizationalUnitWhereUniqueInput
  }

  /**
   * OrganizationalUnit findUniqueOrThrow
   */
  export type OrganizationalUnitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationalUnit
     */
    select?: OrganizationalUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationalUnit
     */
    omit?: OrganizationalUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationalUnitInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationalUnit to fetch.
     */
    where: OrganizationalUnitWhereUniqueInput
  }

  /**
   * OrganizationalUnit findFirst
   */
  export type OrganizationalUnitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationalUnit
     */
    select?: OrganizationalUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationalUnit
     */
    omit?: OrganizationalUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationalUnitInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationalUnit to fetch.
     */
    where?: OrganizationalUnitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationalUnits to fetch.
     */
    orderBy?: OrganizationalUnitOrderByWithRelationInput | OrganizationalUnitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrganizationalUnits.
     */
    cursor?: OrganizationalUnitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationalUnits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationalUnits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrganizationalUnits.
     */
    distinct?: OrganizationalUnitScalarFieldEnum | OrganizationalUnitScalarFieldEnum[]
  }

  /**
   * OrganizationalUnit findFirstOrThrow
   */
  export type OrganizationalUnitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationalUnit
     */
    select?: OrganizationalUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationalUnit
     */
    omit?: OrganizationalUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationalUnitInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationalUnit to fetch.
     */
    where?: OrganizationalUnitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationalUnits to fetch.
     */
    orderBy?: OrganizationalUnitOrderByWithRelationInput | OrganizationalUnitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrganizationalUnits.
     */
    cursor?: OrganizationalUnitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationalUnits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationalUnits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrganizationalUnits.
     */
    distinct?: OrganizationalUnitScalarFieldEnum | OrganizationalUnitScalarFieldEnum[]
  }

  /**
   * OrganizationalUnit findMany
   */
  export type OrganizationalUnitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationalUnit
     */
    select?: OrganizationalUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationalUnit
     */
    omit?: OrganizationalUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationalUnitInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationalUnits to fetch.
     */
    where?: OrganizationalUnitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationalUnits to fetch.
     */
    orderBy?: OrganizationalUnitOrderByWithRelationInput | OrganizationalUnitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrganizationalUnits.
     */
    cursor?: OrganizationalUnitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationalUnits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationalUnits.
     */
    skip?: number
    distinct?: OrganizationalUnitScalarFieldEnum | OrganizationalUnitScalarFieldEnum[]
  }

  /**
   * OrganizationalUnit create
   */
  export type OrganizationalUnitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationalUnit
     */
    select?: OrganizationalUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationalUnit
     */
    omit?: OrganizationalUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationalUnitInclude<ExtArgs> | null
    /**
     * The data needed to create a OrganizationalUnit.
     */
    data: XOR<OrganizationalUnitCreateInput, OrganizationalUnitUncheckedCreateInput>
  }

  /**
   * OrganizationalUnit createMany
   */
  export type OrganizationalUnitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrganizationalUnits.
     */
    data: OrganizationalUnitCreateManyInput | OrganizationalUnitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrganizationalUnit createManyAndReturn
   */
  export type OrganizationalUnitCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationalUnit
     */
    select?: OrganizationalUnitSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationalUnit
     */
    omit?: OrganizationalUnitOmit<ExtArgs> | null
    /**
     * The data used to create many OrganizationalUnits.
     */
    data: OrganizationalUnitCreateManyInput | OrganizationalUnitCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationalUnitIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrganizationalUnit update
   */
  export type OrganizationalUnitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationalUnit
     */
    select?: OrganizationalUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationalUnit
     */
    omit?: OrganizationalUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationalUnitInclude<ExtArgs> | null
    /**
     * The data needed to update a OrganizationalUnit.
     */
    data: XOR<OrganizationalUnitUpdateInput, OrganizationalUnitUncheckedUpdateInput>
    /**
     * Choose, which OrganizationalUnit to update.
     */
    where: OrganizationalUnitWhereUniqueInput
  }

  /**
   * OrganizationalUnit updateMany
   */
  export type OrganizationalUnitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrganizationalUnits.
     */
    data: XOR<OrganizationalUnitUpdateManyMutationInput, OrganizationalUnitUncheckedUpdateManyInput>
    /**
     * Filter which OrganizationalUnits to update
     */
    where?: OrganizationalUnitWhereInput
    /**
     * Limit how many OrganizationalUnits to update.
     */
    limit?: number
  }

  /**
   * OrganizationalUnit updateManyAndReturn
   */
  export type OrganizationalUnitUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationalUnit
     */
    select?: OrganizationalUnitSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationalUnit
     */
    omit?: OrganizationalUnitOmit<ExtArgs> | null
    /**
     * The data used to update OrganizationalUnits.
     */
    data: XOR<OrganizationalUnitUpdateManyMutationInput, OrganizationalUnitUncheckedUpdateManyInput>
    /**
     * Filter which OrganizationalUnits to update
     */
    where?: OrganizationalUnitWhereInput
    /**
     * Limit how many OrganizationalUnits to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationalUnitIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrganizationalUnit upsert
   */
  export type OrganizationalUnitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationalUnit
     */
    select?: OrganizationalUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationalUnit
     */
    omit?: OrganizationalUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationalUnitInclude<ExtArgs> | null
    /**
     * The filter to search for the OrganizationalUnit to update in case it exists.
     */
    where: OrganizationalUnitWhereUniqueInput
    /**
     * In case the OrganizationalUnit found by the `where` argument doesn't exist, create a new OrganizationalUnit with this data.
     */
    create: XOR<OrganizationalUnitCreateInput, OrganizationalUnitUncheckedCreateInput>
    /**
     * In case the OrganizationalUnit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizationalUnitUpdateInput, OrganizationalUnitUncheckedUpdateInput>
  }

  /**
   * OrganizationalUnit delete
   */
  export type OrganizationalUnitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationalUnit
     */
    select?: OrganizationalUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationalUnit
     */
    omit?: OrganizationalUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationalUnitInclude<ExtArgs> | null
    /**
     * Filter which OrganizationalUnit to delete.
     */
    where: OrganizationalUnitWhereUniqueInput
  }

  /**
   * OrganizationalUnit deleteMany
   */
  export type OrganizationalUnitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrganizationalUnits to delete
     */
    where?: OrganizationalUnitWhereInput
    /**
     * Limit how many OrganizationalUnits to delete.
     */
    limit?: number
  }

  /**
   * OrganizationalUnit.parent
   */
  export type OrganizationalUnit$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationalUnit
     */
    select?: OrganizationalUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationalUnit
     */
    omit?: OrganizationalUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationalUnitInclude<ExtArgs> | null
    where?: OrganizationalUnitWhereInput
  }

  /**
   * OrganizationalUnit.children
   */
  export type OrganizationalUnit$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationalUnit
     */
    select?: OrganizationalUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationalUnit
     */
    omit?: OrganizationalUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationalUnitInclude<ExtArgs> | null
    where?: OrganizationalUnitWhereInput
    orderBy?: OrganizationalUnitOrderByWithRelationInput | OrganizationalUnitOrderByWithRelationInput[]
    cursor?: OrganizationalUnitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrganizationalUnitScalarFieldEnum | OrganizationalUnitScalarFieldEnum[]
  }

  /**
   * OrganizationalUnit.positions
   */
  export type OrganizationalUnit$positionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    where?: PositionWhereInput
    orderBy?: PositionOrderByWithRelationInput | PositionOrderByWithRelationInput[]
    cursor?: PositionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PositionScalarFieldEnum | PositionScalarFieldEnum[]
  }

  /**
   * OrganizationalUnit without action
   */
  export type OrganizationalUnitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationalUnit
     */
    select?: OrganizationalUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationalUnit
     */
    omit?: OrganizationalUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationalUnitInclude<ExtArgs> | null
  }


  /**
   * Model Position
   */

  export type AggregatePosition = {
    _count: PositionCountAggregateOutputType | null
    _min: PositionMinAggregateOutputType | null
    _max: PositionMaxAggregateOutputType | null
  }

  export type PositionMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    code: string | null
    nameFa: string | null
    orgUnitId: string | null
  }

  export type PositionMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    code: string | null
    nameFa: string | null
    orgUnitId: string | null
  }

  export type PositionCountAggregateOutputType = {
    id: number
    tenantId: number
    code: number
    nameFa: number
    orgUnitId: number
    _all: number
  }


  export type PositionMinAggregateInputType = {
    id?: true
    tenantId?: true
    code?: true
    nameFa?: true
    orgUnitId?: true
  }

  export type PositionMaxAggregateInputType = {
    id?: true
    tenantId?: true
    code?: true
    nameFa?: true
    orgUnitId?: true
  }

  export type PositionCountAggregateInputType = {
    id?: true
    tenantId?: true
    code?: true
    nameFa?: true
    orgUnitId?: true
    _all?: true
  }

  export type PositionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Position to aggregate.
     */
    where?: PositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Positions to fetch.
     */
    orderBy?: PositionOrderByWithRelationInput | PositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Positions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Positions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Positions
    **/
    _count?: true | PositionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PositionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PositionMaxAggregateInputType
  }

  export type GetPositionAggregateType<T extends PositionAggregateArgs> = {
        [P in keyof T & keyof AggregatePosition]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePosition[P]>
      : GetScalarType<T[P], AggregatePosition[P]>
  }




  export type PositionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PositionWhereInput
    orderBy?: PositionOrderByWithAggregationInput | PositionOrderByWithAggregationInput[]
    by: PositionScalarFieldEnum[] | PositionScalarFieldEnum
    having?: PositionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PositionCountAggregateInputType | true
    _min?: PositionMinAggregateInputType
    _max?: PositionMaxAggregateInputType
  }

  export type PositionGroupByOutputType = {
    id: string
    tenantId: string
    code: string
    nameFa: string
    orgUnitId: string
    _count: PositionCountAggregateOutputType | null
    _min: PositionMinAggregateOutputType | null
    _max: PositionMaxAggregateOutputType | null
  }

  type GetPositionGroupByPayload<T extends PositionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PositionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PositionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PositionGroupByOutputType[P]>
            : GetScalarType<T[P], PositionGroupByOutputType[P]>
        }
      >
    >


  export type PositionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    code?: boolean
    nameFa?: boolean
    orgUnitId?: boolean
    orgUnit?: boolean | OrganizationalUnitDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["position"]>

  export type PositionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    code?: boolean
    nameFa?: boolean
    orgUnitId?: boolean
    orgUnit?: boolean | OrganizationalUnitDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["position"]>

  export type PositionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    code?: boolean
    nameFa?: boolean
    orgUnitId?: boolean
    orgUnit?: boolean | OrganizationalUnitDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["position"]>

  export type PositionSelectScalar = {
    id?: boolean
    tenantId?: boolean
    code?: boolean
    nameFa?: boolean
    orgUnitId?: boolean
  }

  export type PositionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "code" | "nameFa" | "orgUnitId", ExtArgs["result"]["position"]>
  export type PositionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orgUnit?: boolean | OrganizationalUnitDefaultArgs<ExtArgs>
  }
  export type PositionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orgUnit?: boolean | OrganizationalUnitDefaultArgs<ExtArgs>
  }
  export type PositionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orgUnit?: boolean | OrganizationalUnitDefaultArgs<ExtArgs>
  }

  export type $PositionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Position"
    objects: {
      orgUnit: Prisma.$OrganizationalUnitPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      code: string
      nameFa: string
      orgUnitId: string
    }, ExtArgs["result"]["position"]>
    composites: {}
  }

  type PositionGetPayload<S extends boolean | null | undefined | PositionDefaultArgs> = $Result.GetResult<Prisma.$PositionPayload, S>

  type PositionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PositionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PositionCountAggregateInputType | true
    }

  export interface PositionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Position'], meta: { name: 'Position' } }
    /**
     * Find zero or one Position that matches the filter.
     * @param {PositionFindUniqueArgs} args - Arguments to find a Position
     * @example
     * // Get one Position
     * const position = await prisma.position.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PositionFindUniqueArgs>(args: SelectSubset<T, PositionFindUniqueArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Position that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PositionFindUniqueOrThrowArgs} args - Arguments to find a Position
     * @example
     * // Get one Position
     * const position = await prisma.position.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PositionFindUniqueOrThrowArgs>(args: SelectSubset<T, PositionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Position that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionFindFirstArgs} args - Arguments to find a Position
     * @example
     * // Get one Position
     * const position = await prisma.position.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PositionFindFirstArgs>(args?: SelectSubset<T, PositionFindFirstArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Position that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionFindFirstOrThrowArgs} args - Arguments to find a Position
     * @example
     * // Get one Position
     * const position = await prisma.position.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PositionFindFirstOrThrowArgs>(args?: SelectSubset<T, PositionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Positions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Positions
     * const positions = await prisma.position.findMany()
     * 
     * // Get first 10 Positions
     * const positions = await prisma.position.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const positionWithIdOnly = await prisma.position.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PositionFindManyArgs>(args?: SelectSubset<T, PositionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Position.
     * @param {PositionCreateArgs} args - Arguments to create a Position.
     * @example
     * // Create one Position
     * const Position = await prisma.position.create({
     *   data: {
     *     // ... data to create a Position
     *   }
     * })
     * 
     */
    create<T extends PositionCreateArgs>(args: SelectSubset<T, PositionCreateArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Positions.
     * @param {PositionCreateManyArgs} args - Arguments to create many Positions.
     * @example
     * // Create many Positions
     * const position = await prisma.position.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PositionCreateManyArgs>(args?: SelectSubset<T, PositionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Positions and returns the data saved in the database.
     * @param {PositionCreateManyAndReturnArgs} args - Arguments to create many Positions.
     * @example
     * // Create many Positions
     * const position = await prisma.position.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Positions and only return the `id`
     * const positionWithIdOnly = await prisma.position.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PositionCreateManyAndReturnArgs>(args?: SelectSubset<T, PositionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Position.
     * @param {PositionDeleteArgs} args - Arguments to delete one Position.
     * @example
     * // Delete one Position
     * const Position = await prisma.position.delete({
     *   where: {
     *     // ... filter to delete one Position
     *   }
     * })
     * 
     */
    delete<T extends PositionDeleteArgs>(args: SelectSubset<T, PositionDeleteArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Position.
     * @param {PositionUpdateArgs} args - Arguments to update one Position.
     * @example
     * // Update one Position
     * const position = await prisma.position.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PositionUpdateArgs>(args: SelectSubset<T, PositionUpdateArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Positions.
     * @param {PositionDeleteManyArgs} args - Arguments to filter Positions to delete.
     * @example
     * // Delete a few Positions
     * const { count } = await prisma.position.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PositionDeleteManyArgs>(args?: SelectSubset<T, PositionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Positions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Positions
     * const position = await prisma.position.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PositionUpdateManyArgs>(args: SelectSubset<T, PositionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Positions and returns the data updated in the database.
     * @param {PositionUpdateManyAndReturnArgs} args - Arguments to update many Positions.
     * @example
     * // Update many Positions
     * const position = await prisma.position.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Positions and only return the `id`
     * const positionWithIdOnly = await prisma.position.updateManyAndReturn({
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
    updateManyAndReturn<T extends PositionUpdateManyAndReturnArgs>(args: SelectSubset<T, PositionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Position.
     * @param {PositionUpsertArgs} args - Arguments to update or create a Position.
     * @example
     * // Update or create a Position
     * const position = await prisma.position.upsert({
     *   create: {
     *     // ... data to create a Position
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Position we want to update
     *   }
     * })
     */
    upsert<T extends PositionUpsertArgs>(args: SelectSubset<T, PositionUpsertArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Positions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionCountArgs} args - Arguments to filter Positions to count.
     * @example
     * // Count the number of Positions
     * const count = await prisma.position.count({
     *   where: {
     *     // ... the filter for the Positions we want to count
     *   }
     * })
    **/
    count<T extends PositionCountArgs>(
      args?: Subset<T, PositionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PositionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Position.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PositionAggregateArgs>(args: Subset<T, PositionAggregateArgs>): Prisma.PrismaPromise<GetPositionAggregateType<T>>

    /**
     * Group by Position.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionGroupByArgs} args - Group by arguments.
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
      T extends PositionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PositionGroupByArgs['orderBy'] }
        : { orderBy?: PositionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PositionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPositionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Position model
   */
  readonly fields: PositionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Position.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PositionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    orgUnit<T extends OrganizationalUnitDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationalUnitDefaultArgs<ExtArgs>>): Prisma__OrganizationalUnitClient<$Result.GetResult<Prisma.$OrganizationalUnitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Position model
   */
  interface PositionFieldRefs {
    readonly id: FieldRef<"Position", 'String'>
    readonly tenantId: FieldRef<"Position", 'String'>
    readonly code: FieldRef<"Position", 'String'>
    readonly nameFa: FieldRef<"Position", 'String'>
    readonly orgUnitId: FieldRef<"Position", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Position findUnique
   */
  export type PositionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * Filter, which Position to fetch.
     */
    where: PositionWhereUniqueInput
  }

  /**
   * Position findUniqueOrThrow
   */
  export type PositionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * Filter, which Position to fetch.
     */
    where: PositionWhereUniqueInput
  }

  /**
   * Position findFirst
   */
  export type PositionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * Filter, which Position to fetch.
     */
    where?: PositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Positions to fetch.
     */
    orderBy?: PositionOrderByWithRelationInput | PositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Positions.
     */
    cursor?: PositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Positions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Positions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Positions.
     */
    distinct?: PositionScalarFieldEnum | PositionScalarFieldEnum[]
  }

  /**
   * Position findFirstOrThrow
   */
  export type PositionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * Filter, which Position to fetch.
     */
    where?: PositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Positions to fetch.
     */
    orderBy?: PositionOrderByWithRelationInput | PositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Positions.
     */
    cursor?: PositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Positions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Positions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Positions.
     */
    distinct?: PositionScalarFieldEnum | PositionScalarFieldEnum[]
  }

  /**
   * Position findMany
   */
  export type PositionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * Filter, which Positions to fetch.
     */
    where?: PositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Positions to fetch.
     */
    orderBy?: PositionOrderByWithRelationInput | PositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Positions.
     */
    cursor?: PositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Positions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Positions.
     */
    skip?: number
    distinct?: PositionScalarFieldEnum | PositionScalarFieldEnum[]
  }

  /**
   * Position create
   */
  export type PositionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * The data needed to create a Position.
     */
    data: XOR<PositionCreateInput, PositionUncheckedCreateInput>
  }

  /**
   * Position createMany
   */
  export type PositionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Positions.
     */
    data: PositionCreateManyInput | PositionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Position createManyAndReturn
   */
  export type PositionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * The data used to create many Positions.
     */
    data: PositionCreateManyInput | PositionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Position update
   */
  export type PositionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * The data needed to update a Position.
     */
    data: XOR<PositionUpdateInput, PositionUncheckedUpdateInput>
    /**
     * Choose, which Position to update.
     */
    where: PositionWhereUniqueInput
  }

  /**
   * Position updateMany
   */
  export type PositionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Positions.
     */
    data: XOR<PositionUpdateManyMutationInput, PositionUncheckedUpdateManyInput>
    /**
     * Filter which Positions to update
     */
    where?: PositionWhereInput
    /**
     * Limit how many Positions to update.
     */
    limit?: number
  }

  /**
   * Position updateManyAndReturn
   */
  export type PositionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * The data used to update Positions.
     */
    data: XOR<PositionUpdateManyMutationInput, PositionUncheckedUpdateManyInput>
    /**
     * Filter which Positions to update
     */
    where?: PositionWhereInput
    /**
     * Limit how many Positions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Position upsert
   */
  export type PositionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * The filter to search for the Position to update in case it exists.
     */
    where: PositionWhereUniqueInput
    /**
     * In case the Position found by the `where` argument doesn't exist, create a new Position with this data.
     */
    create: XOR<PositionCreateInput, PositionUncheckedCreateInput>
    /**
     * In case the Position was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PositionUpdateInput, PositionUncheckedUpdateInput>
  }

  /**
   * Position delete
   */
  export type PositionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * Filter which Position to delete.
     */
    where: PositionWhereUniqueInput
  }

  /**
   * Position deleteMany
   */
  export type PositionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Positions to delete
     */
    where?: PositionWhereInput
    /**
     * Limit how many Positions to delete.
     */
    limit?: number
  }

  /**
   * Position without action
   */
  export type PositionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
  }


  /**
   * Model AttendanceRecord
   */

  export type AggregateAttendanceRecord = {
    _count: AttendanceRecordCountAggregateOutputType | null
    _min: AttendanceRecordMinAggregateOutputType | null
    _max: AttendanceRecordMaxAggregateOutputType | null
  }

  export type AttendanceRecordMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    employeeId: string | null
    date: Date | null
    checkIn: Date | null
    checkOut: Date | null
    status: $Enums.AttendanceStatus | null
  }

  export type AttendanceRecordMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    employeeId: string | null
    date: Date | null
    checkIn: Date | null
    checkOut: Date | null
    status: $Enums.AttendanceStatus | null
  }

  export type AttendanceRecordCountAggregateOutputType = {
    id: number
    tenantId: number
    employeeId: number
    date: number
    checkIn: number
    checkOut: number
    status: number
    _all: number
  }


  export type AttendanceRecordMinAggregateInputType = {
    id?: true
    tenantId?: true
    employeeId?: true
    date?: true
    checkIn?: true
    checkOut?: true
    status?: true
  }

  export type AttendanceRecordMaxAggregateInputType = {
    id?: true
    tenantId?: true
    employeeId?: true
    date?: true
    checkIn?: true
    checkOut?: true
    status?: true
  }

  export type AttendanceRecordCountAggregateInputType = {
    id?: true
    tenantId?: true
    employeeId?: true
    date?: true
    checkIn?: true
    checkOut?: true
    status?: true
    _all?: true
  }

  export type AttendanceRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AttendanceRecord to aggregate.
     */
    where?: AttendanceRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttendanceRecords to fetch.
     */
    orderBy?: AttendanceRecordOrderByWithRelationInput | AttendanceRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AttendanceRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttendanceRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttendanceRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AttendanceRecords
    **/
    _count?: true | AttendanceRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttendanceRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttendanceRecordMaxAggregateInputType
  }

  export type GetAttendanceRecordAggregateType<T extends AttendanceRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateAttendanceRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttendanceRecord[P]>
      : GetScalarType<T[P], AggregateAttendanceRecord[P]>
  }




  export type AttendanceRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendanceRecordWhereInput
    orderBy?: AttendanceRecordOrderByWithAggregationInput | AttendanceRecordOrderByWithAggregationInput[]
    by: AttendanceRecordScalarFieldEnum[] | AttendanceRecordScalarFieldEnum
    having?: AttendanceRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttendanceRecordCountAggregateInputType | true
    _min?: AttendanceRecordMinAggregateInputType
    _max?: AttendanceRecordMaxAggregateInputType
  }

  export type AttendanceRecordGroupByOutputType = {
    id: string
    tenantId: string
    employeeId: string
    date: Date
    checkIn: Date | null
    checkOut: Date | null
    status: $Enums.AttendanceStatus
    _count: AttendanceRecordCountAggregateOutputType | null
    _min: AttendanceRecordMinAggregateOutputType | null
    _max: AttendanceRecordMaxAggregateOutputType | null
  }

  type GetAttendanceRecordGroupByPayload<T extends AttendanceRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AttendanceRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttendanceRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttendanceRecordGroupByOutputType[P]>
            : GetScalarType<T[P], AttendanceRecordGroupByOutputType[P]>
        }
      >
    >


  export type AttendanceRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    employeeId?: boolean
    date?: boolean
    checkIn?: boolean
    checkOut?: boolean
    status?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attendanceRecord"]>

  export type AttendanceRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    employeeId?: boolean
    date?: boolean
    checkIn?: boolean
    checkOut?: boolean
    status?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attendanceRecord"]>

  export type AttendanceRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    employeeId?: boolean
    date?: boolean
    checkIn?: boolean
    checkOut?: boolean
    status?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attendanceRecord"]>

  export type AttendanceRecordSelectScalar = {
    id?: boolean
    tenantId?: boolean
    employeeId?: boolean
    date?: boolean
    checkIn?: boolean
    checkOut?: boolean
    status?: boolean
  }

  export type AttendanceRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "employeeId" | "date" | "checkIn" | "checkOut" | "status", ExtArgs["result"]["attendanceRecord"]>
  export type AttendanceRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type AttendanceRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type AttendanceRecordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }

  export type $AttendanceRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AttendanceRecord"
    objects: {
      employee: Prisma.$EmployeePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      employeeId: string
      date: Date
      checkIn: Date | null
      checkOut: Date | null
      status: $Enums.AttendanceStatus
    }, ExtArgs["result"]["attendanceRecord"]>
    composites: {}
  }

  type AttendanceRecordGetPayload<S extends boolean | null | undefined | AttendanceRecordDefaultArgs> = $Result.GetResult<Prisma.$AttendanceRecordPayload, S>

  type AttendanceRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AttendanceRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AttendanceRecordCountAggregateInputType | true
    }

  export interface AttendanceRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AttendanceRecord'], meta: { name: 'AttendanceRecord' } }
    /**
     * Find zero or one AttendanceRecord that matches the filter.
     * @param {AttendanceRecordFindUniqueArgs} args - Arguments to find a AttendanceRecord
     * @example
     * // Get one AttendanceRecord
     * const attendanceRecord = await prisma.attendanceRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AttendanceRecordFindUniqueArgs>(args: SelectSubset<T, AttendanceRecordFindUniqueArgs<ExtArgs>>): Prisma__AttendanceRecordClient<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AttendanceRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AttendanceRecordFindUniqueOrThrowArgs} args - Arguments to find a AttendanceRecord
     * @example
     * // Get one AttendanceRecord
     * const attendanceRecord = await prisma.attendanceRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AttendanceRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, AttendanceRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AttendanceRecordClient<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AttendanceRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordFindFirstArgs} args - Arguments to find a AttendanceRecord
     * @example
     * // Get one AttendanceRecord
     * const attendanceRecord = await prisma.attendanceRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AttendanceRecordFindFirstArgs>(args?: SelectSubset<T, AttendanceRecordFindFirstArgs<ExtArgs>>): Prisma__AttendanceRecordClient<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AttendanceRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordFindFirstOrThrowArgs} args - Arguments to find a AttendanceRecord
     * @example
     * // Get one AttendanceRecord
     * const attendanceRecord = await prisma.attendanceRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AttendanceRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, AttendanceRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__AttendanceRecordClient<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AttendanceRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AttendanceRecords
     * const attendanceRecords = await prisma.attendanceRecord.findMany()
     * 
     * // Get first 10 AttendanceRecords
     * const attendanceRecords = await prisma.attendanceRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attendanceRecordWithIdOnly = await prisma.attendanceRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AttendanceRecordFindManyArgs>(args?: SelectSubset<T, AttendanceRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AttendanceRecord.
     * @param {AttendanceRecordCreateArgs} args - Arguments to create a AttendanceRecord.
     * @example
     * // Create one AttendanceRecord
     * const AttendanceRecord = await prisma.attendanceRecord.create({
     *   data: {
     *     // ... data to create a AttendanceRecord
     *   }
     * })
     * 
     */
    create<T extends AttendanceRecordCreateArgs>(args: SelectSubset<T, AttendanceRecordCreateArgs<ExtArgs>>): Prisma__AttendanceRecordClient<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AttendanceRecords.
     * @param {AttendanceRecordCreateManyArgs} args - Arguments to create many AttendanceRecords.
     * @example
     * // Create many AttendanceRecords
     * const attendanceRecord = await prisma.attendanceRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AttendanceRecordCreateManyArgs>(args?: SelectSubset<T, AttendanceRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AttendanceRecords and returns the data saved in the database.
     * @param {AttendanceRecordCreateManyAndReturnArgs} args - Arguments to create many AttendanceRecords.
     * @example
     * // Create many AttendanceRecords
     * const attendanceRecord = await prisma.attendanceRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AttendanceRecords and only return the `id`
     * const attendanceRecordWithIdOnly = await prisma.attendanceRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AttendanceRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, AttendanceRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AttendanceRecord.
     * @param {AttendanceRecordDeleteArgs} args - Arguments to delete one AttendanceRecord.
     * @example
     * // Delete one AttendanceRecord
     * const AttendanceRecord = await prisma.attendanceRecord.delete({
     *   where: {
     *     // ... filter to delete one AttendanceRecord
     *   }
     * })
     * 
     */
    delete<T extends AttendanceRecordDeleteArgs>(args: SelectSubset<T, AttendanceRecordDeleteArgs<ExtArgs>>): Prisma__AttendanceRecordClient<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AttendanceRecord.
     * @param {AttendanceRecordUpdateArgs} args - Arguments to update one AttendanceRecord.
     * @example
     * // Update one AttendanceRecord
     * const attendanceRecord = await prisma.attendanceRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AttendanceRecordUpdateArgs>(args: SelectSubset<T, AttendanceRecordUpdateArgs<ExtArgs>>): Prisma__AttendanceRecordClient<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AttendanceRecords.
     * @param {AttendanceRecordDeleteManyArgs} args - Arguments to filter AttendanceRecords to delete.
     * @example
     * // Delete a few AttendanceRecords
     * const { count } = await prisma.attendanceRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AttendanceRecordDeleteManyArgs>(args?: SelectSubset<T, AttendanceRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AttendanceRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AttendanceRecords
     * const attendanceRecord = await prisma.attendanceRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AttendanceRecordUpdateManyArgs>(args: SelectSubset<T, AttendanceRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AttendanceRecords and returns the data updated in the database.
     * @param {AttendanceRecordUpdateManyAndReturnArgs} args - Arguments to update many AttendanceRecords.
     * @example
     * // Update many AttendanceRecords
     * const attendanceRecord = await prisma.attendanceRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AttendanceRecords and only return the `id`
     * const attendanceRecordWithIdOnly = await prisma.attendanceRecord.updateManyAndReturn({
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
    updateManyAndReturn<T extends AttendanceRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, AttendanceRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AttendanceRecord.
     * @param {AttendanceRecordUpsertArgs} args - Arguments to update or create a AttendanceRecord.
     * @example
     * // Update or create a AttendanceRecord
     * const attendanceRecord = await prisma.attendanceRecord.upsert({
     *   create: {
     *     // ... data to create a AttendanceRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AttendanceRecord we want to update
     *   }
     * })
     */
    upsert<T extends AttendanceRecordUpsertArgs>(args: SelectSubset<T, AttendanceRecordUpsertArgs<ExtArgs>>): Prisma__AttendanceRecordClient<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AttendanceRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordCountArgs} args - Arguments to filter AttendanceRecords to count.
     * @example
     * // Count the number of AttendanceRecords
     * const count = await prisma.attendanceRecord.count({
     *   where: {
     *     // ... the filter for the AttendanceRecords we want to count
     *   }
     * })
    **/
    count<T extends AttendanceRecordCountArgs>(
      args?: Subset<T, AttendanceRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttendanceRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AttendanceRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AttendanceRecordAggregateArgs>(args: Subset<T, AttendanceRecordAggregateArgs>): Prisma.PrismaPromise<GetAttendanceRecordAggregateType<T>>

    /**
     * Group by AttendanceRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordGroupByArgs} args - Group by arguments.
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
      T extends AttendanceRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AttendanceRecordGroupByArgs['orderBy'] }
        : { orderBy?: AttendanceRecordGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AttendanceRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttendanceRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AttendanceRecord model
   */
  readonly fields: AttendanceRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AttendanceRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AttendanceRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employee<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the AttendanceRecord model
   */
  interface AttendanceRecordFieldRefs {
    readonly id: FieldRef<"AttendanceRecord", 'String'>
    readonly tenantId: FieldRef<"AttendanceRecord", 'String'>
    readonly employeeId: FieldRef<"AttendanceRecord", 'String'>
    readonly date: FieldRef<"AttendanceRecord", 'DateTime'>
    readonly checkIn: FieldRef<"AttendanceRecord", 'DateTime'>
    readonly checkOut: FieldRef<"AttendanceRecord", 'DateTime'>
    readonly status: FieldRef<"AttendanceRecord", 'AttendanceStatus'>
  }
    

  // Custom InputTypes
  /**
   * AttendanceRecord findUnique
   */
  export type AttendanceRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * Filter, which AttendanceRecord to fetch.
     */
    where: AttendanceRecordWhereUniqueInput
  }

  /**
   * AttendanceRecord findUniqueOrThrow
   */
  export type AttendanceRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * Filter, which AttendanceRecord to fetch.
     */
    where: AttendanceRecordWhereUniqueInput
  }

  /**
   * AttendanceRecord findFirst
   */
  export type AttendanceRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * Filter, which AttendanceRecord to fetch.
     */
    where?: AttendanceRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttendanceRecords to fetch.
     */
    orderBy?: AttendanceRecordOrderByWithRelationInput | AttendanceRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AttendanceRecords.
     */
    cursor?: AttendanceRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttendanceRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttendanceRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AttendanceRecords.
     */
    distinct?: AttendanceRecordScalarFieldEnum | AttendanceRecordScalarFieldEnum[]
  }

  /**
   * AttendanceRecord findFirstOrThrow
   */
  export type AttendanceRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * Filter, which AttendanceRecord to fetch.
     */
    where?: AttendanceRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttendanceRecords to fetch.
     */
    orderBy?: AttendanceRecordOrderByWithRelationInput | AttendanceRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AttendanceRecords.
     */
    cursor?: AttendanceRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttendanceRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttendanceRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AttendanceRecords.
     */
    distinct?: AttendanceRecordScalarFieldEnum | AttendanceRecordScalarFieldEnum[]
  }

  /**
   * AttendanceRecord findMany
   */
  export type AttendanceRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * Filter, which AttendanceRecords to fetch.
     */
    where?: AttendanceRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttendanceRecords to fetch.
     */
    orderBy?: AttendanceRecordOrderByWithRelationInput | AttendanceRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AttendanceRecords.
     */
    cursor?: AttendanceRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttendanceRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttendanceRecords.
     */
    skip?: number
    distinct?: AttendanceRecordScalarFieldEnum | AttendanceRecordScalarFieldEnum[]
  }

  /**
   * AttendanceRecord create
   */
  export type AttendanceRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a AttendanceRecord.
     */
    data: XOR<AttendanceRecordCreateInput, AttendanceRecordUncheckedCreateInput>
  }

  /**
   * AttendanceRecord createMany
   */
  export type AttendanceRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AttendanceRecords.
     */
    data: AttendanceRecordCreateManyInput | AttendanceRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AttendanceRecord createManyAndReturn
   */
  export type AttendanceRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * The data used to create many AttendanceRecords.
     */
    data: AttendanceRecordCreateManyInput | AttendanceRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AttendanceRecord update
   */
  export type AttendanceRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a AttendanceRecord.
     */
    data: XOR<AttendanceRecordUpdateInput, AttendanceRecordUncheckedUpdateInput>
    /**
     * Choose, which AttendanceRecord to update.
     */
    where: AttendanceRecordWhereUniqueInput
  }

  /**
   * AttendanceRecord updateMany
   */
  export type AttendanceRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AttendanceRecords.
     */
    data: XOR<AttendanceRecordUpdateManyMutationInput, AttendanceRecordUncheckedUpdateManyInput>
    /**
     * Filter which AttendanceRecords to update
     */
    where?: AttendanceRecordWhereInput
    /**
     * Limit how many AttendanceRecords to update.
     */
    limit?: number
  }

  /**
   * AttendanceRecord updateManyAndReturn
   */
  export type AttendanceRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * The data used to update AttendanceRecords.
     */
    data: XOR<AttendanceRecordUpdateManyMutationInput, AttendanceRecordUncheckedUpdateManyInput>
    /**
     * Filter which AttendanceRecords to update
     */
    where?: AttendanceRecordWhereInput
    /**
     * Limit how many AttendanceRecords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AttendanceRecord upsert
   */
  export type AttendanceRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the AttendanceRecord to update in case it exists.
     */
    where: AttendanceRecordWhereUniqueInput
    /**
     * In case the AttendanceRecord found by the `where` argument doesn't exist, create a new AttendanceRecord with this data.
     */
    create: XOR<AttendanceRecordCreateInput, AttendanceRecordUncheckedCreateInput>
    /**
     * In case the AttendanceRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AttendanceRecordUpdateInput, AttendanceRecordUncheckedUpdateInput>
  }

  /**
   * AttendanceRecord delete
   */
  export type AttendanceRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * Filter which AttendanceRecord to delete.
     */
    where: AttendanceRecordWhereUniqueInput
  }

  /**
   * AttendanceRecord deleteMany
   */
  export type AttendanceRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AttendanceRecords to delete
     */
    where?: AttendanceRecordWhereInput
    /**
     * Limit how many AttendanceRecords to delete.
     */
    limit?: number
  }

  /**
   * AttendanceRecord without action
   */
  export type AttendanceRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
  }


  /**
   * Model EmployeeContract
   */

  export type AggregateEmployeeContract = {
    _count: EmployeeContractCountAggregateOutputType | null
    _avg: EmployeeContractAvgAggregateOutputType | null
    _sum: EmployeeContractSumAggregateOutputType | null
    _min: EmployeeContractMinAggregateOutputType | null
    _max: EmployeeContractMaxAggregateOutputType | null
  }

  export type EmployeeContractAvgAggregateOutputType = {
    salaryBase: Decimal | null
  }

  export type EmployeeContractSumAggregateOutputType = {
    salaryBase: Decimal | null
  }

  export type EmployeeContractMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    employeeId: string | null
    startDate: Date | null
    endDate: Date | null
    salaryBase: Decimal | null
    currency: string | null
    status: $Enums.ContractStatus | null
  }

  export type EmployeeContractMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    employeeId: string | null
    startDate: Date | null
    endDate: Date | null
    salaryBase: Decimal | null
    currency: string | null
    status: $Enums.ContractStatus | null
  }

  export type EmployeeContractCountAggregateOutputType = {
    id: number
    tenantId: number
    employeeId: number
    startDate: number
    endDate: number
    salaryBase: number
    currency: number
    status: number
    _all: number
  }


  export type EmployeeContractAvgAggregateInputType = {
    salaryBase?: true
  }

  export type EmployeeContractSumAggregateInputType = {
    salaryBase?: true
  }

  export type EmployeeContractMinAggregateInputType = {
    id?: true
    tenantId?: true
    employeeId?: true
    startDate?: true
    endDate?: true
    salaryBase?: true
    currency?: true
    status?: true
  }

  export type EmployeeContractMaxAggregateInputType = {
    id?: true
    tenantId?: true
    employeeId?: true
    startDate?: true
    endDate?: true
    salaryBase?: true
    currency?: true
    status?: true
  }

  export type EmployeeContractCountAggregateInputType = {
    id?: true
    tenantId?: true
    employeeId?: true
    startDate?: true
    endDate?: true
    salaryBase?: true
    currency?: true
    status?: true
    _all?: true
  }

  export type EmployeeContractAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmployeeContract to aggregate.
     */
    where?: EmployeeContractWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeContracts to fetch.
     */
    orderBy?: EmployeeContractOrderByWithRelationInput | EmployeeContractOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmployeeContractWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeContracts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeContracts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmployeeContracts
    **/
    _count?: true | EmployeeContractCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmployeeContractAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmployeeContractSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeeContractMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeeContractMaxAggregateInputType
  }

  export type GetEmployeeContractAggregateType<T extends EmployeeContractAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployeeContract]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployeeContract[P]>
      : GetScalarType<T[P], AggregateEmployeeContract[P]>
  }




  export type EmployeeContractGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeContractWhereInput
    orderBy?: EmployeeContractOrderByWithAggregationInput | EmployeeContractOrderByWithAggregationInput[]
    by: EmployeeContractScalarFieldEnum[] | EmployeeContractScalarFieldEnum
    having?: EmployeeContractScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeeContractCountAggregateInputType | true
    _avg?: EmployeeContractAvgAggregateInputType
    _sum?: EmployeeContractSumAggregateInputType
    _min?: EmployeeContractMinAggregateInputType
    _max?: EmployeeContractMaxAggregateInputType
  }

  export type EmployeeContractGroupByOutputType = {
    id: string
    tenantId: string
    employeeId: string
    startDate: Date
    endDate: Date | null
    salaryBase: Decimal
    currency: string
    status: $Enums.ContractStatus
    _count: EmployeeContractCountAggregateOutputType | null
    _avg: EmployeeContractAvgAggregateOutputType | null
    _sum: EmployeeContractSumAggregateOutputType | null
    _min: EmployeeContractMinAggregateOutputType | null
    _max: EmployeeContractMaxAggregateOutputType | null
  }

  type GetEmployeeContractGroupByPayload<T extends EmployeeContractGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployeeContractGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeeContractGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeeContractGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeeContractGroupByOutputType[P]>
        }
      >
    >


  export type EmployeeContractSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    employeeId?: boolean
    startDate?: boolean
    endDate?: boolean
    salaryBase?: boolean
    currency?: boolean
    status?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employeeContract"]>

  export type EmployeeContractSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    employeeId?: boolean
    startDate?: boolean
    endDate?: boolean
    salaryBase?: boolean
    currency?: boolean
    status?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employeeContract"]>

  export type EmployeeContractSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    employeeId?: boolean
    startDate?: boolean
    endDate?: boolean
    salaryBase?: boolean
    currency?: boolean
    status?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employeeContract"]>

  export type EmployeeContractSelectScalar = {
    id?: boolean
    tenantId?: boolean
    employeeId?: boolean
    startDate?: boolean
    endDate?: boolean
    salaryBase?: boolean
    currency?: boolean
    status?: boolean
  }

  export type EmployeeContractOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "employeeId" | "startDate" | "endDate" | "salaryBase" | "currency" | "status", ExtArgs["result"]["employeeContract"]>
  export type EmployeeContractInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type EmployeeContractIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type EmployeeContractIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }

  export type $EmployeeContractPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmployeeContract"
    objects: {
      employee: Prisma.$EmployeePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      employeeId: string
      startDate: Date
      endDate: Date | null
      salaryBase: Prisma.Decimal
      currency: string
      status: $Enums.ContractStatus
    }, ExtArgs["result"]["employeeContract"]>
    composites: {}
  }

  type EmployeeContractGetPayload<S extends boolean | null | undefined | EmployeeContractDefaultArgs> = $Result.GetResult<Prisma.$EmployeeContractPayload, S>

  type EmployeeContractCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmployeeContractFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmployeeContractCountAggregateInputType | true
    }

  export interface EmployeeContractDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmployeeContract'], meta: { name: 'EmployeeContract' } }
    /**
     * Find zero or one EmployeeContract that matches the filter.
     * @param {EmployeeContractFindUniqueArgs} args - Arguments to find a EmployeeContract
     * @example
     * // Get one EmployeeContract
     * const employeeContract = await prisma.employeeContract.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmployeeContractFindUniqueArgs>(args: SelectSubset<T, EmployeeContractFindUniqueArgs<ExtArgs>>): Prisma__EmployeeContractClient<$Result.GetResult<Prisma.$EmployeeContractPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmployeeContract that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmployeeContractFindUniqueOrThrowArgs} args - Arguments to find a EmployeeContract
     * @example
     * // Get one EmployeeContract
     * const employeeContract = await prisma.employeeContract.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmployeeContractFindUniqueOrThrowArgs>(args: SelectSubset<T, EmployeeContractFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmployeeContractClient<$Result.GetResult<Prisma.$EmployeeContractPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmployeeContract that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeContractFindFirstArgs} args - Arguments to find a EmployeeContract
     * @example
     * // Get one EmployeeContract
     * const employeeContract = await prisma.employeeContract.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmployeeContractFindFirstArgs>(args?: SelectSubset<T, EmployeeContractFindFirstArgs<ExtArgs>>): Prisma__EmployeeContractClient<$Result.GetResult<Prisma.$EmployeeContractPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmployeeContract that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeContractFindFirstOrThrowArgs} args - Arguments to find a EmployeeContract
     * @example
     * // Get one EmployeeContract
     * const employeeContract = await prisma.employeeContract.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmployeeContractFindFirstOrThrowArgs>(args?: SelectSubset<T, EmployeeContractFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmployeeContractClient<$Result.GetResult<Prisma.$EmployeeContractPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmployeeContracts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeContractFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmployeeContracts
     * const employeeContracts = await prisma.employeeContract.findMany()
     * 
     * // Get first 10 EmployeeContracts
     * const employeeContracts = await prisma.employeeContract.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employeeContractWithIdOnly = await prisma.employeeContract.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmployeeContractFindManyArgs>(args?: SelectSubset<T, EmployeeContractFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeContractPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmployeeContract.
     * @param {EmployeeContractCreateArgs} args - Arguments to create a EmployeeContract.
     * @example
     * // Create one EmployeeContract
     * const EmployeeContract = await prisma.employeeContract.create({
     *   data: {
     *     // ... data to create a EmployeeContract
     *   }
     * })
     * 
     */
    create<T extends EmployeeContractCreateArgs>(args: SelectSubset<T, EmployeeContractCreateArgs<ExtArgs>>): Prisma__EmployeeContractClient<$Result.GetResult<Prisma.$EmployeeContractPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmployeeContracts.
     * @param {EmployeeContractCreateManyArgs} args - Arguments to create many EmployeeContracts.
     * @example
     * // Create many EmployeeContracts
     * const employeeContract = await prisma.employeeContract.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmployeeContractCreateManyArgs>(args?: SelectSubset<T, EmployeeContractCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmployeeContracts and returns the data saved in the database.
     * @param {EmployeeContractCreateManyAndReturnArgs} args - Arguments to create many EmployeeContracts.
     * @example
     * // Create many EmployeeContracts
     * const employeeContract = await prisma.employeeContract.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmployeeContracts and only return the `id`
     * const employeeContractWithIdOnly = await prisma.employeeContract.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmployeeContractCreateManyAndReturnArgs>(args?: SelectSubset<T, EmployeeContractCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeContractPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmployeeContract.
     * @param {EmployeeContractDeleteArgs} args - Arguments to delete one EmployeeContract.
     * @example
     * // Delete one EmployeeContract
     * const EmployeeContract = await prisma.employeeContract.delete({
     *   where: {
     *     // ... filter to delete one EmployeeContract
     *   }
     * })
     * 
     */
    delete<T extends EmployeeContractDeleteArgs>(args: SelectSubset<T, EmployeeContractDeleteArgs<ExtArgs>>): Prisma__EmployeeContractClient<$Result.GetResult<Prisma.$EmployeeContractPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmployeeContract.
     * @param {EmployeeContractUpdateArgs} args - Arguments to update one EmployeeContract.
     * @example
     * // Update one EmployeeContract
     * const employeeContract = await prisma.employeeContract.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmployeeContractUpdateArgs>(args: SelectSubset<T, EmployeeContractUpdateArgs<ExtArgs>>): Prisma__EmployeeContractClient<$Result.GetResult<Prisma.$EmployeeContractPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmployeeContracts.
     * @param {EmployeeContractDeleteManyArgs} args - Arguments to filter EmployeeContracts to delete.
     * @example
     * // Delete a few EmployeeContracts
     * const { count } = await prisma.employeeContract.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmployeeContractDeleteManyArgs>(args?: SelectSubset<T, EmployeeContractDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmployeeContracts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeContractUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmployeeContracts
     * const employeeContract = await prisma.employeeContract.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmployeeContractUpdateManyArgs>(args: SelectSubset<T, EmployeeContractUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmployeeContracts and returns the data updated in the database.
     * @param {EmployeeContractUpdateManyAndReturnArgs} args - Arguments to update many EmployeeContracts.
     * @example
     * // Update many EmployeeContracts
     * const employeeContract = await prisma.employeeContract.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmployeeContracts and only return the `id`
     * const employeeContractWithIdOnly = await prisma.employeeContract.updateManyAndReturn({
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
    updateManyAndReturn<T extends EmployeeContractUpdateManyAndReturnArgs>(args: SelectSubset<T, EmployeeContractUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeContractPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmployeeContract.
     * @param {EmployeeContractUpsertArgs} args - Arguments to update or create a EmployeeContract.
     * @example
     * // Update or create a EmployeeContract
     * const employeeContract = await prisma.employeeContract.upsert({
     *   create: {
     *     // ... data to create a EmployeeContract
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmployeeContract we want to update
     *   }
     * })
     */
    upsert<T extends EmployeeContractUpsertArgs>(args: SelectSubset<T, EmployeeContractUpsertArgs<ExtArgs>>): Prisma__EmployeeContractClient<$Result.GetResult<Prisma.$EmployeeContractPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmployeeContracts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeContractCountArgs} args - Arguments to filter EmployeeContracts to count.
     * @example
     * // Count the number of EmployeeContracts
     * const count = await prisma.employeeContract.count({
     *   where: {
     *     // ... the filter for the EmployeeContracts we want to count
     *   }
     * })
    **/
    count<T extends EmployeeContractCountArgs>(
      args?: Subset<T, EmployeeContractCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeContractCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmployeeContract.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeContractAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EmployeeContractAggregateArgs>(args: Subset<T, EmployeeContractAggregateArgs>): Prisma.PrismaPromise<GetEmployeeContractAggregateType<T>>

    /**
     * Group by EmployeeContract.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeContractGroupByArgs} args - Group by arguments.
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
      T extends EmployeeContractGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployeeContractGroupByArgs['orderBy'] }
        : { orderBy?: EmployeeContractGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EmployeeContractGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeContractGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmployeeContract model
   */
  readonly fields: EmployeeContractFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmployeeContract.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmployeeContractClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employee<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the EmployeeContract model
   */
  interface EmployeeContractFieldRefs {
    readonly id: FieldRef<"EmployeeContract", 'String'>
    readonly tenantId: FieldRef<"EmployeeContract", 'String'>
    readonly employeeId: FieldRef<"EmployeeContract", 'String'>
    readonly startDate: FieldRef<"EmployeeContract", 'DateTime'>
    readonly endDate: FieldRef<"EmployeeContract", 'DateTime'>
    readonly salaryBase: FieldRef<"EmployeeContract", 'Decimal'>
    readonly currency: FieldRef<"EmployeeContract", 'String'>
    readonly status: FieldRef<"EmployeeContract", 'ContractStatus'>
  }
    

  // Custom InputTypes
  /**
   * EmployeeContract findUnique
   */
  export type EmployeeContractFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeContract
     */
    select?: EmployeeContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeContract
     */
    omit?: EmployeeContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeContractInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeContract to fetch.
     */
    where: EmployeeContractWhereUniqueInput
  }

  /**
   * EmployeeContract findUniqueOrThrow
   */
  export type EmployeeContractFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeContract
     */
    select?: EmployeeContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeContract
     */
    omit?: EmployeeContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeContractInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeContract to fetch.
     */
    where: EmployeeContractWhereUniqueInput
  }

  /**
   * EmployeeContract findFirst
   */
  export type EmployeeContractFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeContract
     */
    select?: EmployeeContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeContract
     */
    omit?: EmployeeContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeContractInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeContract to fetch.
     */
    where?: EmployeeContractWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeContracts to fetch.
     */
    orderBy?: EmployeeContractOrderByWithRelationInput | EmployeeContractOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmployeeContracts.
     */
    cursor?: EmployeeContractWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeContracts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeContracts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployeeContracts.
     */
    distinct?: EmployeeContractScalarFieldEnum | EmployeeContractScalarFieldEnum[]
  }

  /**
   * EmployeeContract findFirstOrThrow
   */
  export type EmployeeContractFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeContract
     */
    select?: EmployeeContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeContract
     */
    omit?: EmployeeContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeContractInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeContract to fetch.
     */
    where?: EmployeeContractWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeContracts to fetch.
     */
    orderBy?: EmployeeContractOrderByWithRelationInput | EmployeeContractOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmployeeContracts.
     */
    cursor?: EmployeeContractWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeContracts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeContracts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployeeContracts.
     */
    distinct?: EmployeeContractScalarFieldEnum | EmployeeContractScalarFieldEnum[]
  }

  /**
   * EmployeeContract findMany
   */
  export type EmployeeContractFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeContract
     */
    select?: EmployeeContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeContract
     */
    omit?: EmployeeContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeContractInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeContracts to fetch.
     */
    where?: EmployeeContractWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeContracts to fetch.
     */
    orderBy?: EmployeeContractOrderByWithRelationInput | EmployeeContractOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmployeeContracts.
     */
    cursor?: EmployeeContractWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeContracts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeContracts.
     */
    skip?: number
    distinct?: EmployeeContractScalarFieldEnum | EmployeeContractScalarFieldEnum[]
  }

  /**
   * EmployeeContract create
   */
  export type EmployeeContractCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeContract
     */
    select?: EmployeeContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeContract
     */
    omit?: EmployeeContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeContractInclude<ExtArgs> | null
    /**
     * The data needed to create a EmployeeContract.
     */
    data: XOR<EmployeeContractCreateInput, EmployeeContractUncheckedCreateInput>
  }

  /**
   * EmployeeContract createMany
   */
  export type EmployeeContractCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmployeeContracts.
     */
    data: EmployeeContractCreateManyInput | EmployeeContractCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmployeeContract createManyAndReturn
   */
  export type EmployeeContractCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeContract
     */
    select?: EmployeeContractSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeContract
     */
    omit?: EmployeeContractOmit<ExtArgs> | null
    /**
     * The data used to create many EmployeeContracts.
     */
    data: EmployeeContractCreateManyInput | EmployeeContractCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeContractIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmployeeContract update
   */
  export type EmployeeContractUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeContract
     */
    select?: EmployeeContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeContract
     */
    omit?: EmployeeContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeContractInclude<ExtArgs> | null
    /**
     * The data needed to update a EmployeeContract.
     */
    data: XOR<EmployeeContractUpdateInput, EmployeeContractUncheckedUpdateInput>
    /**
     * Choose, which EmployeeContract to update.
     */
    where: EmployeeContractWhereUniqueInput
  }

  /**
   * EmployeeContract updateMany
   */
  export type EmployeeContractUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmployeeContracts.
     */
    data: XOR<EmployeeContractUpdateManyMutationInput, EmployeeContractUncheckedUpdateManyInput>
    /**
     * Filter which EmployeeContracts to update
     */
    where?: EmployeeContractWhereInput
    /**
     * Limit how many EmployeeContracts to update.
     */
    limit?: number
  }

  /**
   * EmployeeContract updateManyAndReturn
   */
  export type EmployeeContractUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeContract
     */
    select?: EmployeeContractSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeContract
     */
    omit?: EmployeeContractOmit<ExtArgs> | null
    /**
     * The data used to update EmployeeContracts.
     */
    data: XOR<EmployeeContractUpdateManyMutationInput, EmployeeContractUncheckedUpdateManyInput>
    /**
     * Filter which EmployeeContracts to update
     */
    where?: EmployeeContractWhereInput
    /**
     * Limit how many EmployeeContracts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeContractIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmployeeContract upsert
   */
  export type EmployeeContractUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeContract
     */
    select?: EmployeeContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeContract
     */
    omit?: EmployeeContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeContractInclude<ExtArgs> | null
    /**
     * The filter to search for the EmployeeContract to update in case it exists.
     */
    where: EmployeeContractWhereUniqueInput
    /**
     * In case the EmployeeContract found by the `where` argument doesn't exist, create a new EmployeeContract with this data.
     */
    create: XOR<EmployeeContractCreateInput, EmployeeContractUncheckedCreateInput>
    /**
     * In case the EmployeeContract was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmployeeContractUpdateInput, EmployeeContractUncheckedUpdateInput>
  }

  /**
   * EmployeeContract delete
   */
  export type EmployeeContractDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeContract
     */
    select?: EmployeeContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeContract
     */
    omit?: EmployeeContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeContractInclude<ExtArgs> | null
    /**
     * Filter which EmployeeContract to delete.
     */
    where: EmployeeContractWhereUniqueInput
  }

  /**
   * EmployeeContract deleteMany
   */
  export type EmployeeContractDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmployeeContracts to delete
     */
    where?: EmployeeContractWhereInput
    /**
     * Limit how many EmployeeContracts to delete.
     */
    limit?: number
  }

  /**
   * EmployeeContract without action
   */
  export type EmployeeContractDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeContract
     */
    select?: EmployeeContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeContract
     */
    omit?: EmployeeContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeContractInclude<ExtArgs> | null
  }


  /**
   * Model LeaveRequest
   */

  export type AggregateLeaveRequest = {
    _count: LeaveRequestCountAggregateOutputType | null
    _min: LeaveRequestMinAggregateOutputType | null
    _max: LeaveRequestMaxAggregateOutputType | null
  }

  export type LeaveRequestMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    employeeId: string | null
    type: string | null
    startDate: Date | null
    endDate: Date | null
    status: $Enums.LeaveRequestStatus | null
    correlationId: string | null
  }

  export type LeaveRequestMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    employeeId: string | null
    type: string | null
    startDate: Date | null
    endDate: Date | null
    status: $Enums.LeaveRequestStatus | null
    correlationId: string | null
  }

  export type LeaveRequestCountAggregateOutputType = {
    id: number
    tenantId: number
    employeeId: number
    type: number
    startDate: number
    endDate: number
    status: number
    correlationId: number
    _all: number
  }


  export type LeaveRequestMinAggregateInputType = {
    id?: true
    tenantId?: true
    employeeId?: true
    type?: true
    startDate?: true
    endDate?: true
    status?: true
    correlationId?: true
  }

  export type LeaveRequestMaxAggregateInputType = {
    id?: true
    tenantId?: true
    employeeId?: true
    type?: true
    startDate?: true
    endDate?: true
    status?: true
    correlationId?: true
  }

  export type LeaveRequestCountAggregateInputType = {
    id?: true
    tenantId?: true
    employeeId?: true
    type?: true
    startDate?: true
    endDate?: true
    status?: true
    correlationId?: true
    _all?: true
  }

  export type LeaveRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeaveRequest to aggregate.
     */
    where?: LeaveRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveRequests to fetch.
     */
    orderBy?: LeaveRequestOrderByWithRelationInput | LeaveRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeaveRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LeaveRequests
    **/
    _count?: true | LeaveRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeaveRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeaveRequestMaxAggregateInputType
  }

  export type GetLeaveRequestAggregateType<T extends LeaveRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateLeaveRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLeaveRequest[P]>
      : GetScalarType<T[P], AggregateLeaveRequest[P]>
  }




  export type LeaveRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeaveRequestWhereInput
    orderBy?: LeaveRequestOrderByWithAggregationInput | LeaveRequestOrderByWithAggregationInput[]
    by: LeaveRequestScalarFieldEnum[] | LeaveRequestScalarFieldEnum
    having?: LeaveRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeaveRequestCountAggregateInputType | true
    _min?: LeaveRequestMinAggregateInputType
    _max?: LeaveRequestMaxAggregateInputType
  }

  export type LeaveRequestGroupByOutputType = {
    id: string
    tenantId: string
    employeeId: string
    type: string
    startDate: Date
    endDate: Date
    status: $Enums.LeaveRequestStatus
    correlationId: string
    _count: LeaveRequestCountAggregateOutputType | null
    _min: LeaveRequestMinAggregateOutputType | null
    _max: LeaveRequestMaxAggregateOutputType | null
  }

  type GetLeaveRequestGroupByPayload<T extends LeaveRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeaveRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeaveRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeaveRequestGroupByOutputType[P]>
            : GetScalarType<T[P], LeaveRequestGroupByOutputType[P]>
        }
      >
    >


  export type LeaveRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    employeeId?: boolean
    type?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    correlationId?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leaveRequest"]>

  export type LeaveRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    employeeId?: boolean
    type?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    correlationId?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leaveRequest"]>

  export type LeaveRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    employeeId?: boolean
    type?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    correlationId?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leaveRequest"]>

  export type LeaveRequestSelectScalar = {
    id?: boolean
    tenantId?: boolean
    employeeId?: boolean
    type?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    correlationId?: boolean
  }

  export type LeaveRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "employeeId" | "type" | "startDate" | "endDate" | "status" | "correlationId", ExtArgs["result"]["leaveRequest"]>
  export type LeaveRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type LeaveRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type LeaveRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }

  export type $LeaveRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LeaveRequest"
    objects: {
      employee: Prisma.$EmployeePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      employeeId: string
      type: string
      startDate: Date
      endDate: Date
      status: $Enums.LeaveRequestStatus
      correlationId: string
    }, ExtArgs["result"]["leaveRequest"]>
    composites: {}
  }

  type LeaveRequestGetPayload<S extends boolean | null | undefined | LeaveRequestDefaultArgs> = $Result.GetResult<Prisma.$LeaveRequestPayload, S>

  type LeaveRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LeaveRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LeaveRequestCountAggregateInputType | true
    }

  export interface LeaveRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LeaveRequest'], meta: { name: 'LeaveRequest' } }
    /**
     * Find zero or one LeaveRequest that matches the filter.
     * @param {LeaveRequestFindUniqueArgs} args - Arguments to find a LeaveRequest
     * @example
     * // Get one LeaveRequest
     * const leaveRequest = await prisma.leaveRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeaveRequestFindUniqueArgs>(args: SelectSubset<T, LeaveRequestFindUniqueArgs<ExtArgs>>): Prisma__LeaveRequestClient<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LeaveRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LeaveRequestFindUniqueOrThrowArgs} args - Arguments to find a LeaveRequest
     * @example
     * // Get one LeaveRequest
     * const leaveRequest = await prisma.leaveRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeaveRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, LeaveRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeaveRequestClient<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LeaveRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveRequestFindFirstArgs} args - Arguments to find a LeaveRequest
     * @example
     * // Get one LeaveRequest
     * const leaveRequest = await prisma.leaveRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeaveRequestFindFirstArgs>(args?: SelectSubset<T, LeaveRequestFindFirstArgs<ExtArgs>>): Prisma__LeaveRequestClient<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LeaveRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveRequestFindFirstOrThrowArgs} args - Arguments to find a LeaveRequest
     * @example
     * // Get one LeaveRequest
     * const leaveRequest = await prisma.leaveRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeaveRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, LeaveRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeaveRequestClient<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LeaveRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LeaveRequests
     * const leaveRequests = await prisma.leaveRequest.findMany()
     * 
     * // Get first 10 LeaveRequests
     * const leaveRequests = await prisma.leaveRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leaveRequestWithIdOnly = await prisma.leaveRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeaveRequestFindManyArgs>(args?: SelectSubset<T, LeaveRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LeaveRequest.
     * @param {LeaveRequestCreateArgs} args - Arguments to create a LeaveRequest.
     * @example
     * // Create one LeaveRequest
     * const LeaveRequest = await prisma.leaveRequest.create({
     *   data: {
     *     // ... data to create a LeaveRequest
     *   }
     * })
     * 
     */
    create<T extends LeaveRequestCreateArgs>(args: SelectSubset<T, LeaveRequestCreateArgs<ExtArgs>>): Prisma__LeaveRequestClient<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LeaveRequests.
     * @param {LeaveRequestCreateManyArgs} args - Arguments to create many LeaveRequests.
     * @example
     * // Create many LeaveRequests
     * const leaveRequest = await prisma.leaveRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeaveRequestCreateManyArgs>(args?: SelectSubset<T, LeaveRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LeaveRequests and returns the data saved in the database.
     * @param {LeaveRequestCreateManyAndReturnArgs} args - Arguments to create many LeaveRequests.
     * @example
     * // Create many LeaveRequests
     * const leaveRequest = await prisma.leaveRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LeaveRequests and only return the `id`
     * const leaveRequestWithIdOnly = await prisma.leaveRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LeaveRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, LeaveRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LeaveRequest.
     * @param {LeaveRequestDeleteArgs} args - Arguments to delete one LeaveRequest.
     * @example
     * // Delete one LeaveRequest
     * const LeaveRequest = await prisma.leaveRequest.delete({
     *   where: {
     *     // ... filter to delete one LeaveRequest
     *   }
     * })
     * 
     */
    delete<T extends LeaveRequestDeleteArgs>(args: SelectSubset<T, LeaveRequestDeleteArgs<ExtArgs>>): Prisma__LeaveRequestClient<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LeaveRequest.
     * @param {LeaveRequestUpdateArgs} args - Arguments to update one LeaveRequest.
     * @example
     * // Update one LeaveRequest
     * const leaveRequest = await prisma.leaveRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeaveRequestUpdateArgs>(args: SelectSubset<T, LeaveRequestUpdateArgs<ExtArgs>>): Prisma__LeaveRequestClient<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LeaveRequests.
     * @param {LeaveRequestDeleteManyArgs} args - Arguments to filter LeaveRequests to delete.
     * @example
     * // Delete a few LeaveRequests
     * const { count } = await prisma.leaveRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeaveRequestDeleteManyArgs>(args?: SelectSubset<T, LeaveRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeaveRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LeaveRequests
     * const leaveRequest = await prisma.leaveRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeaveRequestUpdateManyArgs>(args: SelectSubset<T, LeaveRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeaveRequests and returns the data updated in the database.
     * @param {LeaveRequestUpdateManyAndReturnArgs} args - Arguments to update many LeaveRequests.
     * @example
     * // Update many LeaveRequests
     * const leaveRequest = await prisma.leaveRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LeaveRequests and only return the `id`
     * const leaveRequestWithIdOnly = await prisma.leaveRequest.updateManyAndReturn({
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
    updateManyAndReturn<T extends LeaveRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, LeaveRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LeaveRequest.
     * @param {LeaveRequestUpsertArgs} args - Arguments to update or create a LeaveRequest.
     * @example
     * // Update or create a LeaveRequest
     * const leaveRequest = await prisma.leaveRequest.upsert({
     *   create: {
     *     // ... data to create a LeaveRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LeaveRequest we want to update
     *   }
     * })
     */
    upsert<T extends LeaveRequestUpsertArgs>(args: SelectSubset<T, LeaveRequestUpsertArgs<ExtArgs>>): Prisma__LeaveRequestClient<$Result.GetResult<Prisma.$LeaveRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LeaveRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveRequestCountArgs} args - Arguments to filter LeaveRequests to count.
     * @example
     * // Count the number of LeaveRequests
     * const count = await prisma.leaveRequest.count({
     *   where: {
     *     // ... the filter for the LeaveRequests we want to count
     *   }
     * })
    **/
    count<T extends LeaveRequestCountArgs>(
      args?: Subset<T, LeaveRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeaveRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LeaveRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LeaveRequestAggregateArgs>(args: Subset<T, LeaveRequestAggregateArgs>): Prisma.PrismaPromise<GetLeaveRequestAggregateType<T>>

    /**
     * Group by LeaveRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveRequestGroupByArgs} args - Group by arguments.
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
      T extends LeaveRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeaveRequestGroupByArgs['orderBy'] }
        : { orderBy?: LeaveRequestGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LeaveRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeaveRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LeaveRequest model
   */
  readonly fields: LeaveRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LeaveRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeaveRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employee<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the LeaveRequest model
   */
  interface LeaveRequestFieldRefs {
    readonly id: FieldRef<"LeaveRequest", 'String'>
    readonly tenantId: FieldRef<"LeaveRequest", 'String'>
    readonly employeeId: FieldRef<"LeaveRequest", 'String'>
    readonly type: FieldRef<"LeaveRequest", 'String'>
    readonly startDate: FieldRef<"LeaveRequest", 'DateTime'>
    readonly endDate: FieldRef<"LeaveRequest", 'DateTime'>
    readonly status: FieldRef<"LeaveRequest", 'LeaveRequestStatus'>
    readonly correlationId: FieldRef<"LeaveRequest", 'String'>
  }
    

  // Custom InputTypes
  /**
   * LeaveRequest findUnique
   */
  export type LeaveRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestInclude<ExtArgs> | null
    /**
     * Filter, which LeaveRequest to fetch.
     */
    where: LeaveRequestWhereUniqueInput
  }

  /**
   * LeaveRequest findUniqueOrThrow
   */
  export type LeaveRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestInclude<ExtArgs> | null
    /**
     * Filter, which LeaveRequest to fetch.
     */
    where: LeaveRequestWhereUniqueInput
  }

  /**
   * LeaveRequest findFirst
   */
  export type LeaveRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestInclude<ExtArgs> | null
    /**
     * Filter, which LeaveRequest to fetch.
     */
    where?: LeaveRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveRequests to fetch.
     */
    orderBy?: LeaveRequestOrderByWithRelationInput | LeaveRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeaveRequests.
     */
    cursor?: LeaveRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeaveRequests.
     */
    distinct?: LeaveRequestScalarFieldEnum | LeaveRequestScalarFieldEnum[]
  }

  /**
   * LeaveRequest findFirstOrThrow
   */
  export type LeaveRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestInclude<ExtArgs> | null
    /**
     * Filter, which LeaveRequest to fetch.
     */
    where?: LeaveRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveRequests to fetch.
     */
    orderBy?: LeaveRequestOrderByWithRelationInput | LeaveRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeaveRequests.
     */
    cursor?: LeaveRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeaveRequests.
     */
    distinct?: LeaveRequestScalarFieldEnum | LeaveRequestScalarFieldEnum[]
  }

  /**
   * LeaveRequest findMany
   */
  export type LeaveRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestInclude<ExtArgs> | null
    /**
     * Filter, which LeaveRequests to fetch.
     */
    where?: LeaveRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveRequests to fetch.
     */
    orderBy?: LeaveRequestOrderByWithRelationInput | LeaveRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LeaveRequests.
     */
    cursor?: LeaveRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveRequests.
     */
    skip?: number
    distinct?: LeaveRequestScalarFieldEnum | LeaveRequestScalarFieldEnum[]
  }

  /**
   * LeaveRequest create
   */
  export type LeaveRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a LeaveRequest.
     */
    data: XOR<LeaveRequestCreateInput, LeaveRequestUncheckedCreateInput>
  }

  /**
   * LeaveRequest createMany
   */
  export type LeaveRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LeaveRequests.
     */
    data: LeaveRequestCreateManyInput | LeaveRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LeaveRequest createManyAndReturn
   */
  export type LeaveRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * The data used to create many LeaveRequests.
     */
    data: LeaveRequestCreateManyInput | LeaveRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LeaveRequest update
   */
  export type LeaveRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a LeaveRequest.
     */
    data: XOR<LeaveRequestUpdateInput, LeaveRequestUncheckedUpdateInput>
    /**
     * Choose, which LeaveRequest to update.
     */
    where: LeaveRequestWhereUniqueInput
  }

  /**
   * LeaveRequest updateMany
   */
  export type LeaveRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LeaveRequests.
     */
    data: XOR<LeaveRequestUpdateManyMutationInput, LeaveRequestUncheckedUpdateManyInput>
    /**
     * Filter which LeaveRequests to update
     */
    where?: LeaveRequestWhereInput
    /**
     * Limit how many LeaveRequests to update.
     */
    limit?: number
  }

  /**
   * LeaveRequest updateManyAndReturn
   */
  export type LeaveRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * The data used to update LeaveRequests.
     */
    data: XOR<LeaveRequestUpdateManyMutationInput, LeaveRequestUncheckedUpdateManyInput>
    /**
     * Filter which LeaveRequests to update
     */
    where?: LeaveRequestWhereInput
    /**
     * Limit how many LeaveRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LeaveRequest upsert
   */
  export type LeaveRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the LeaveRequest to update in case it exists.
     */
    where: LeaveRequestWhereUniqueInput
    /**
     * In case the LeaveRequest found by the `where` argument doesn't exist, create a new LeaveRequest with this data.
     */
    create: XOR<LeaveRequestCreateInput, LeaveRequestUncheckedCreateInput>
    /**
     * In case the LeaveRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeaveRequestUpdateInput, LeaveRequestUncheckedUpdateInput>
  }

  /**
   * LeaveRequest delete
   */
  export type LeaveRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestInclude<ExtArgs> | null
    /**
     * Filter which LeaveRequest to delete.
     */
    where: LeaveRequestWhereUniqueInput
  }

  /**
   * LeaveRequest deleteMany
   */
  export type LeaveRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeaveRequests to delete
     */
    where?: LeaveRequestWhereInput
    /**
     * Limit how many LeaveRequests to delete.
     */
    limit?: number
  }

  /**
   * LeaveRequest without action
   */
  export type LeaveRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveRequest
     */
    select?: LeaveRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveRequest
     */
    omit?: LeaveRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveRequestInclude<ExtArgs> | null
  }


  /**
   * Model PayrollRule
   */

  export type AggregatePayrollRule = {
    _count: PayrollRuleCountAggregateOutputType | null
    _min: PayrollRuleMinAggregateOutputType | null
    _max: PayrollRuleMaxAggregateOutputType | null
  }

  export type PayrollRuleMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    code: string | null
    nameFa: string | null
    effectiveFrom: Date | null
    effectiveTo: Date | null
  }

  export type PayrollRuleMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    code: string | null
    nameFa: string | null
    effectiveFrom: Date | null
    effectiveTo: Date | null
  }

  export type PayrollRuleCountAggregateOutputType = {
    id: number
    tenantId: number
    code: number
    nameFa: number
    effectiveFrom: number
    effectiveTo: number
    config: number
    _all: number
  }


  export type PayrollRuleMinAggregateInputType = {
    id?: true
    tenantId?: true
    code?: true
    nameFa?: true
    effectiveFrom?: true
    effectiveTo?: true
  }

  export type PayrollRuleMaxAggregateInputType = {
    id?: true
    tenantId?: true
    code?: true
    nameFa?: true
    effectiveFrom?: true
    effectiveTo?: true
  }

  export type PayrollRuleCountAggregateInputType = {
    id?: true
    tenantId?: true
    code?: true
    nameFa?: true
    effectiveFrom?: true
    effectiveTo?: true
    config?: true
    _all?: true
  }

  export type PayrollRuleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PayrollRule to aggregate.
     */
    where?: PayrollRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PayrollRules to fetch.
     */
    orderBy?: PayrollRuleOrderByWithRelationInput | PayrollRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PayrollRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PayrollRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PayrollRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PayrollRules
    **/
    _count?: true | PayrollRuleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PayrollRuleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PayrollRuleMaxAggregateInputType
  }

  export type GetPayrollRuleAggregateType<T extends PayrollRuleAggregateArgs> = {
        [P in keyof T & keyof AggregatePayrollRule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayrollRule[P]>
      : GetScalarType<T[P], AggregatePayrollRule[P]>
  }




  export type PayrollRuleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PayrollRuleWhereInput
    orderBy?: PayrollRuleOrderByWithAggregationInput | PayrollRuleOrderByWithAggregationInput[]
    by: PayrollRuleScalarFieldEnum[] | PayrollRuleScalarFieldEnum
    having?: PayrollRuleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PayrollRuleCountAggregateInputType | true
    _min?: PayrollRuleMinAggregateInputType
    _max?: PayrollRuleMaxAggregateInputType
  }

  export type PayrollRuleGroupByOutputType = {
    id: string
    tenantId: string
    code: string
    nameFa: string
    effectiveFrom: Date
    effectiveTo: Date | null
    config: JsonValue
    _count: PayrollRuleCountAggregateOutputType | null
    _min: PayrollRuleMinAggregateOutputType | null
    _max: PayrollRuleMaxAggregateOutputType | null
  }

  type GetPayrollRuleGroupByPayload<T extends PayrollRuleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PayrollRuleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PayrollRuleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PayrollRuleGroupByOutputType[P]>
            : GetScalarType<T[P], PayrollRuleGroupByOutputType[P]>
        }
      >
    >


  export type PayrollRuleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    code?: boolean
    nameFa?: boolean
    effectiveFrom?: boolean
    effectiveTo?: boolean
    config?: boolean
  }, ExtArgs["result"]["payrollRule"]>

  export type PayrollRuleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    code?: boolean
    nameFa?: boolean
    effectiveFrom?: boolean
    effectiveTo?: boolean
    config?: boolean
  }, ExtArgs["result"]["payrollRule"]>

  export type PayrollRuleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    code?: boolean
    nameFa?: boolean
    effectiveFrom?: boolean
    effectiveTo?: boolean
    config?: boolean
  }, ExtArgs["result"]["payrollRule"]>

  export type PayrollRuleSelectScalar = {
    id?: boolean
    tenantId?: boolean
    code?: boolean
    nameFa?: boolean
    effectiveFrom?: boolean
    effectiveTo?: boolean
    config?: boolean
  }

  export type PayrollRuleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "code" | "nameFa" | "effectiveFrom" | "effectiveTo" | "config", ExtArgs["result"]["payrollRule"]>

  export type $PayrollRulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PayrollRule"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      code: string
      nameFa: string
      effectiveFrom: Date
      effectiveTo: Date | null
      config: Prisma.JsonValue
    }, ExtArgs["result"]["payrollRule"]>
    composites: {}
  }

  type PayrollRuleGetPayload<S extends boolean | null | undefined | PayrollRuleDefaultArgs> = $Result.GetResult<Prisma.$PayrollRulePayload, S>

  type PayrollRuleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PayrollRuleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PayrollRuleCountAggregateInputType | true
    }

  export interface PayrollRuleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PayrollRule'], meta: { name: 'PayrollRule' } }
    /**
     * Find zero or one PayrollRule that matches the filter.
     * @param {PayrollRuleFindUniqueArgs} args - Arguments to find a PayrollRule
     * @example
     * // Get one PayrollRule
     * const payrollRule = await prisma.payrollRule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PayrollRuleFindUniqueArgs>(args: SelectSubset<T, PayrollRuleFindUniqueArgs<ExtArgs>>): Prisma__PayrollRuleClient<$Result.GetResult<Prisma.$PayrollRulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PayrollRule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PayrollRuleFindUniqueOrThrowArgs} args - Arguments to find a PayrollRule
     * @example
     * // Get one PayrollRule
     * const payrollRule = await prisma.payrollRule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PayrollRuleFindUniqueOrThrowArgs>(args: SelectSubset<T, PayrollRuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PayrollRuleClient<$Result.GetResult<Prisma.$PayrollRulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PayrollRule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayrollRuleFindFirstArgs} args - Arguments to find a PayrollRule
     * @example
     * // Get one PayrollRule
     * const payrollRule = await prisma.payrollRule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PayrollRuleFindFirstArgs>(args?: SelectSubset<T, PayrollRuleFindFirstArgs<ExtArgs>>): Prisma__PayrollRuleClient<$Result.GetResult<Prisma.$PayrollRulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PayrollRule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayrollRuleFindFirstOrThrowArgs} args - Arguments to find a PayrollRule
     * @example
     * // Get one PayrollRule
     * const payrollRule = await prisma.payrollRule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PayrollRuleFindFirstOrThrowArgs>(args?: SelectSubset<T, PayrollRuleFindFirstOrThrowArgs<ExtArgs>>): Prisma__PayrollRuleClient<$Result.GetResult<Prisma.$PayrollRulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PayrollRules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayrollRuleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PayrollRules
     * const payrollRules = await prisma.payrollRule.findMany()
     * 
     * // Get first 10 PayrollRules
     * const payrollRules = await prisma.payrollRule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const payrollRuleWithIdOnly = await prisma.payrollRule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PayrollRuleFindManyArgs>(args?: SelectSubset<T, PayrollRuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayrollRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PayrollRule.
     * @param {PayrollRuleCreateArgs} args - Arguments to create a PayrollRule.
     * @example
     * // Create one PayrollRule
     * const PayrollRule = await prisma.payrollRule.create({
     *   data: {
     *     // ... data to create a PayrollRule
     *   }
     * })
     * 
     */
    create<T extends PayrollRuleCreateArgs>(args: SelectSubset<T, PayrollRuleCreateArgs<ExtArgs>>): Prisma__PayrollRuleClient<$Result.GetResult<Prisma.$PayrollRulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PayrollRules.
     * @param {PayrollRuleCreateManyArgs} args - Arguments to create many PayrollRules.
     * @example
     * // Create many PayrollRules
     * const payrollRule = await prisma.payrollRule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PayrollRuleCreateManyArgs>(args?: SelectSubset<T, PayrollRuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PayrollRules and returns the data saved in the database.
     * @param {PayrollRuleCreateManyAndReturnArgs} args - Arguments to create many PayrollRules.
     * @example
     * // Create many PayrollRules
     * const payrollRule = await prisma.payrollRule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PayrollRules and only return the `id`
     * const payrollRuleWithIdOnly = await prisma.payrollRule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PayrollRuleCreateManyAndReturnArgs>(args?: SelectSubset<T, PayrollRuleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayrollRulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PayrollRule.
     * @param {PayrollRuleDeleteArgs} args - Arguments to delete one PayrollRule.
     * @example
     * // Delete one PayrollRule
     * const PayrollRule = await prisma.payrollRule.delete({
     *   where: {
     *     // ... filter to delete one PayrollRule
     *   }
     * })
     * 
     */
    delete<T extends PayrollRuleDeleteArgs>(args: SelectSubset<T, PayrollRuleDeleteArgs<ExtArgs>>): Prisma__PayrollRuleClient<$Result.GetResult<Prisma.$PayrollRulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PayrollRule.
     * @param {PayrollRuleUpdateArgs} args - Arguments to update one PayrollRule.
     * @example
     * // Update one PayrollRule
     * const payrollRule = await prisma.payrollRule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PayrollRuleUpdateArgs>(args: SelectSubset<T, PayrollRuleUpdateArgs<ExtArgs>>): Prisma__PayrollRuleClient<$Result.GetResult<Prisma.$PayrollRulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PayrollRules.
     * @param {PayrollRuleDeleteManyArgs} args - Arguments to filter PayrollRules to delete.
     * @example
     * // Delete a few PayrollRules
     * const { count } = await prisma.payrollRule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PayrollRuleDeleteManyArgs>(args?: SelectSubset<T, PayrollRuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PayrollRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayrollRuleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PayrollRules
     * const payrollRule = await prisma.payrollRule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PayrollRuleUpdateManyArgs>(args: SelectSubset<T, PayrollRuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PayrollRules and returns the data updated in the database.
     * @param {PayrollRuleUpdateManyAndReturnArgs} args - Arguments to update many PayrollRules.
     * @example
     * // Update many PayrollRules
     * const payrollRule = await prisma.payrollRule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PayrollRules and only return the `id`
     * const payrollRuleWithIdOnly = await prisma.payrollRule.updateManyAndReturn({
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
    updateManyAndReturn<T extends PayrollRuleUpdateManyAndReturnArgs>(args: SelectSubset<T, PayrollRuleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayrollRulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PayrollRule.
     * @param {PayrollRuleUpsertArgs} args - Arguments to update or create a PayrollRule.
     * @example
     * // Update or create a PayrollRule
     * const payrollRule = await prisma.payrollRule.upsert({
     *   create: {
     *     // ... data to create a PayrollRule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PayrollRule we want to update
     *   }
     * })
     */
    upsert<T extends PayrollRuleUpsertArgs>(args: SelectSubset<T, PayrollRuleUpsertArgs<ExtArgs>>): Prisma__PayrollRuleClient<$Result.GetResult<Prisma.$PayrollRulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PayrollRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayrollRuleCountArgs} args - Arguments to filter PayrollRules to count.
     * @example
     * // Count the number of PayrollRules
     * const count = await prisma.payrollRule.count({
     *   where: {
     *     // ... the filter for the PayrollRules we want to count
     *   }
     * })
    **/
    count<T extends PayrollRuleCountArgs>(
      args?: Subset<T, PayrollRuleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PayrollRuleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PayrollRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayrollRuleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PayrollRuleAggregateArgs>(args: Subset<T, PayrollRuleAggregateArgs>): Prisma.PrismaPromise<GetPayrollRuleAggregateType<T>>

    /**
     * Group by PayrollRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayrollRuleGroupByArgs} args - Group by arguments.
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
      T extends PayrollRuleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PayrollRuleGroupByArgs['orderBy'] }
        : { orderBy?: PayrollRuleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PayrollRuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPayrollRuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PayrollRule model
   */
  readonly fields: PayrollRuleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PayrollRule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PayrollRuleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the PayrollRule model
   */
  interface PayrollRuleFieldRefs {
    readonly id: FieldRef<"PayrollRule", 'String'>
    readonly tenantId: FieldRef<"PayrollRule", 'String'>
    readonly code: FieldRef<"PayrollRule", 'String'>
    readonly nameFa: FieldRef<"PayrollRule", 'String'>
    readonly effectiveFrom: FieldRef<"PayrollRule", 'DateTime'>
    readonly effectiveTo: FieldRef<"PayrollRule", 'DateTime'>
    readonly config: FieldRef<"PayrollRule", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * PayrollRule findUnique
   */
  export type PayrollRuleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollRule
     */
    select?: PayrollRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayrollRule
     */
    omit?: PayrollRuleOmit<ExtArgs> | null
    /**
     * Filter, which PayrollRule to fetch.
     */
    where: PayrollRuleWhereUniqueInput
  }

  /**
   * PayrollRule findUniqueOrThrow
   */
  export type PayrollRuleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollRule
     */
    select?: PayrollRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayrollRule
     */
    omit?: PayrollRuleOmit<ExtArgs> | null
    /**
     * Filter, which PayrollRule to fetch.
     */
    where: PayrollRuleWhereUniqueInput
  }

  /**
   * PayrollRule findFirst
   */
  export type PayrollRuleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollRule
     */
    select?: PayrollRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayrollRule
     */
    omit?: PayrollRuleOmit<ExtArgs> | null
    /**
     * Filter, which PayrollRule to fetch.
     */
    where?: PayrollRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PayrollRules to fetch.
     */
    orderBy?: PayrollRuleOrderByWithRelationInput | PayrollRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PayrollRules.
     */
    cursor?: PayrollRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PayrollRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PayrollRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PayrollRules.
     */
    distinct?: PayrollRuleScalarFieldEnum | PayrollRuleScalarFieldEnum[]
  }

  /**
   * PayrollRule findFirstOrThrow
   */
  export type PayrollRuleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollRule
     */
    select?: PayrollRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayrollRule
     */
    omit?: PayrollRuleOmit<ExtArgs> | null
    /**
     * Filter, which PayrollRule to fetch.
     */
    where?: PayrollRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PayrollRules to fetch.
     */
    orderBy?: PayrollRuleOrderByWithRelationInput | PayrollRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PayrollRules.
     */
    cursor?: PayrollRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PayrollRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PayrollRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PayrollRules.
     */
    distinct?: PayrollRuleScalarFieldEnum | PayrollRuleScalarFieldEnum[]
  }

  /**
   * PayrollRule findMany
   */
  export type PayrollRuleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollRule
     */
    select?: PayrollRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayrollRule
     */
    omit?: PayrollRuleOmit<ExtArgs> | null
    /**
     * Filter, which PayrollRules to fetch.
     */
    where?: PayrollRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PayrollRules to fetch.
     */
    orderBy?: PayrollRuleOrderByWithRelationInput | PayrollRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PayrollRules.
     */
    cursor?: PayrollRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PayrollRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PayrollRules.
     */
    skip?: number
    distinct?: PayrollRuleScalarFieldEnum | PayrollRuleScalarFieldEnum[]
  }

  /**
   * PayrollRule create
   */
  export type PayrollRuleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollRule
     */
    select?: PayrollRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayrollRule
     */
    omit?: PayrollRuleOmit<ExtArgs> | null
    /**
     * The data needed to create a PayrollRule.
     */
    data: XOR<PayrollRuleCreateInput, PayrollRuleUncheckedCreateInput>
  }

  /**
   * PayrollRule createMany
   */
  export type PayrollRuleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PayrollRules.
     */
    data: PayrollRuleCreateManyInput | PayrollRuleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PayrollRule createManyAndReturn
   */
  export type PayrollRuleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollRule
     */
    select?: PayrollRuleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PayrollRule
     */
    omit?: PayrollRuleOmit<ExtArgs> | null
    /**
     * The data used to create many PayrollRules.
     */
    data: PayrollRuleCreateManyInput | PayrollRuleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PayrollRule update
   */
  export type PayrollRuleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollRule
     */
    select?: PayrollRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayrollRule
     */
    omit?: PayrollRuleOmit<ExtArgs> | null
    /**
     * The data needed to update a PayrollRule.
     */
    data: XOR<PayrollRuleUpdateInput, PayrollRuleUncheckedUpdateInput>
    /**
     * Choose, which PayrollRule to update.
     */
    where: PayrollRuleWhereUniqueInput
  }

  /**
   * PayrollRule updateMany
   */
  export type PayrollRuleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PayrollRules.
     */
    data: XOR<PayrollRuleUpdateManyMutationInput, PayrollRuleUncheckedUpdateManyInput>
    /**
     * Filter which PayrollRules to update
     */
    where?: PayrollRuleWhereInput
    /**
     * Limit how many PayrollRules to update.
     */
    limit?: number
  }

  /**
   * PayrollRule updateManyAndReturn
   */
  export type PayrollRuleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollRule
     */
    select?: PayrollRuleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PayrollRule
     */
    omit?: PayrollRuleOmit<ExtArgs> | null
    /**
     * The data used to update PayrollRules.
     */
    data: XOR<PayrollRuleUpdateManyMutationInput, PayrollRuleUncheckedUpdateManyInput>
    /**
     * Filter which PayrollRules to update
     */
    where?: PayrollRuleWhereInput
    /**
     * Limit how many PayrollRules to update.
     */
    limit?: number
  }

  /**
   * PayrollRule upsert
   */
  export type PayrollRuleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollRule
     */
    select?: PayrollRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayrollRule
     */
    omit?: PayrollRuleOmit<ExtArgs> | null
    /**
     * The filter to search for the PayrollRule to update in case it exists.
     */
    where: PayrollRuleWhereUniqueInput
    /**
     * In case the PayrollRule found by the `where` argument doesn't exist, create a new PayrollRule with this data.
     */
    create: XOR<PayrollRuleCreateInput, PayrollRuleUncheckedCreateInput>
    /**
     * In case the PayrollRule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PayrollRuleUpdateInput, PayrollRuleUncheckedUpdateInput>
  }

  /**
   * PayrollRule delete
   */
  export type PayrollRuleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollRule
     */
    select?: PayrollRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayrollRule
     */
    omit?: PayrollRuleOmit<ExtArgs> | null
    /**
     * Filter which PayrollRule to delete.
     */
    where: PayrollRuleWhereUniqueInput
  }

  /**
   * PayrollRule deleteMany
   */
  export type PayrollRuleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PayrollRules to delete
     */
    where?: PayrollRuleWhereInput
    /**
     * Limit how many PayrollRules to delete.
     */
    limit?: number
  }

  /**
   * PayrollRule without action
   */
  export type PayrollRuleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollRule
     */
    select?: PayrollRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayrollRule
     */
    omit?: PayrollRuleOmit<ExtArgs> | null
  }


  /**
   * Model TaxBracket
   */

  export type AggregateTaxBracket = {
    _count: TaxBracketCountAggregateOutputType | null
    _avg: TaxBracketAvgAggregateOutputType | null
    _sum: TaxBracketSumAggregateOutputType | null
    _min: TaxBracketMinAggregateOutputType | null
    _max: TaxBracketMaxAggregateOutputType | null
  }

  export type TaxBracketAvgAggregateOutputType = {
    effectiveYear: number | null
    minIncome: Decimal | null
    maxIncome: Decimal | null
    rate: Decimal | null
  }

  export type TaxBracketSumAggregateOutputType = {
    effectiveYear: number | null
    minIncome: Decimal | null
    maxIncome: Decimal | null
    rate: Decimal | null
  }

  export type TaxBracketMinAggregateOutputType = {
    id: string | null
    country: string | null
    effectiveYear: number | null
    minIncome: Decimal | null
    maxIncome: Decimal | null
    rate: Decimal | null
  }

  export type TaxBracketMaxAggregateOutputType = {
    id: string | null
    country: string | null
    effectiveYear: number | null
    minIncome: Decimal | null
    maxIncome: Decimal | null
    rate: Decimal | null
  }

  export type TaxBracketCountAggregateOutputType = {
    id: number
    country: number
    effectiveYear: number
    minIncome: number
    maxIncome: number
    rate: number
    _all: number
  }


  export type TaxBracketAvgAggregateInputType = {
    effectiveYear?: true
    minIncome?: true
    maxIncome?: true
    rate?: true
  }

  export type TaxBracketSumAggregateInputType = {
    effectiveYear?: true
    minIncome?: true
    maxIncome?: true
    rate?: true
  }

  export type TaxBracketMinAggregateInputType = {
    id?: true
    country?: true
    effectiveYear?: true
    minIncome?: true
    maxIncome?: true
    rate?: true
  }

  export type TaxBracketMaxAggregateInputType = {
    id?: true
    country?: true
    effectiveYear?: true
    minIncome?: true
    maxIncome?: true
    rate?: true
  }

  export type TaxBracketCountAggregateInputType = {
    id?: true
    country?: true
    effectiveYear?: true
    minIncome?: true
    maxIncome?: true
    rate?: true
    _all?: true
  }

  export type TaxBracketAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaxBracket to aggregate.
     */
    where?: TaxBracketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaxBrackets to fetch.
     */
    orderBy?: TaxBracketOrderByWithRelationInput | TaxBracketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaxBracketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaxBrackets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaxBrackets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TaxBrackets
    **/
    _count?: true | TaxBracketCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaxBracketAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaxBracketSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaxBracketMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaxBracketMaxAggregateInputType
  }

  export type GetTaxBracketAggregateType<T extends TaxBracketAggregateArgs> = {
        [P in keyof T & keyof AggregateTaxBracket]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTaxBracket[P]>
      : GetScalarType<T[P], AggregateTaxBracket[P]>
  }




  export type TaxBracketGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaxBracketWhereInput
    orderBy?: TaxBracketOrderByWithAggregationInput | TaxBracketOrderByWithAggregationInput[]
    by: TaxBracketScalarFieldEnum[] | TaxBracketScalarFieldEnum
    having?: TaxBracketScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaxBracketCountAggregateInputType | true
    _avg?: TaxBracketAvgAggregateInputType
    _sum?: TaxBracketSumAggregateInputType
    _min?: TaxBracketMinAggregateInputType
    _max?: TaxBracketMaxAggregateInputType
  }

  export type TaxBracketGroupByOutputType = {
    id: string
    country: string
    effectiveYear: number
    minIncome: Decimal
    maxIncome: Decimal | null
    rate: Decimal
    _count: TaxBracketCountAggregateOutputType | null
    _avg: TaxBracketAvgAggregateOutputType | null
    _sum: TaxBracketSumAggregateOutputType | null
    _min: TaxBracketMinAggregateOutputType | null
    _max: TaxBracketMaxAggregateOutputType | null
  }

  type GetTaxBracketGroupByPayload<T extends TaxBracketGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaxBracketGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaxBracketGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaxBracketGroupByOutputType[P]>
            : GetScalarType<T[P], TaxBracketGroupByOutputType[P]>
        }
      >
    >


  export type TaxBracketSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    country?: boolean
    effectiveYear?: boolean
    minIncome?: boolean
    maxIncome?: boolean
    rate?: boolean
  }, ExtArgs["result"]["taxBracket"]>

  export type TaxBracketSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    country?: boolean
    effectiveYear?: boolean
    minIncome?: boolean
    maxIncome?: boolean
    rate?: boolean
  }, ExtArgs["result"]["taxBracket"]>

  export type TaxBracketSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    country?: boolean
    effectiveYear?: boolean
    minIncome?: boolean
    maxIncome?: boolean
    rate?: boolean
  }, ExtArgs["result"]["taxBracket"]>

  export type TaxBracketSelectScalar = {
    id?: boolean
    country?: boolean
    effectiveYear?: boolean
    minIncome?: boolean
    maxIncome?: boolean
    rate?: boolean
  }

  export type TaxBracketOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "country" | "effectiveYear" | "minIncome" | "maxIncome" | "rate", ExtArgs["result"]["taxBracket"]>

  export type $TaxBracketPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TaxBracket"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      country: string
      effectiveYear: number
      minIncome: Prisma.Decimal
      maxIncome: Prisma.Decimal | null
      rate: Prisma.Decimal
    }, ExtArgs["result"]["taxBracket"]>
    composites: {}
  }

  type TaxBracketGetPayload<S extends boolean | null | undefined | TaxBracketDefaultArgs> = $Result.GetResult<Prisma.$TaxBracketPayload, S>

  type TaxBracketCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaxBracketFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaxBracketCountAggregateInputType | true
    }

  export interface TaxBracketDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TaxBracket'], meta: { name: 'TaxBracket' } }
    /**
     * Find zero or one TaxBracket that matches the filter.
     * @param {TaxBracketFindUniqueArgs} args - Arguments to find a TaxBracket
     * @example
     * // Get one TaxBracket
     * const taxBracket = await prisma.taxBracket.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaxBracketFindUniqueArgs>(args: SelectSubset<T, TaxBracketFindUniqueArgs<ExtArgs>>): Prisma__TaxBracketClient<$Result.GetResult<Prisma.$TaxBracketPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TaxBracket that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaxBracketFindUniqueOrThrowArgs} args - Arguments to find a TaxBracket
     * @example
     * // Get one TaxBracket
     * const taxBracket = await prisma.taxBracket.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaxBracketFindUniqueOrThrowArgs>(args: SelectSubset<T, TaxBracketFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaxBracketClient<$Result.GetResult<Prisma.$TaxBracketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TaxBracket that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaxBracketFindFirstArgs} args - Arguments to find a TaxBracket
     * @example
     * // Get one TaxBracket
     * const taxBracket = await prisma.taxBracket.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaxBracketFindFirstArgs>(args?: SelectSubset<T, TaxBracketFindFirstArgs<ExtArgs>>): Prisma__TaxBracketClient<$Result.GetResult<Prisma.$TaxBracketPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TaxBracket that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaxBracketFindFirstOrThrowArgs} args - Arguments to find a TaxBracket
     * @example
     * // Get one TaxBracket
     * const taxBracket = await prisma.taxBracket.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaxBracketFindFirstOrThrowArgs>(args?: SelectSubset<T, TaxBracketFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaxBracketClient<$Result.GetResult<Prisma.$TaxBracketPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TaxBrackets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaxBracketFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TaxBrackets
     * const taxBrackets = await prisma.taxBracket.findMany()
     * 
     * // Get first 10 TaxBrackets
     * const taxBrackets = await prisma.taxBracket.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taxBracketWithIdOnly = await prisma.taxBracket.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaxBracketFindManyArgs>(args?: SelectSubset<T, TaxBracketFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaxBracketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TaxBracket.
     * @param {TaxBracketCreateArgs} args - Arguments to create a TaxBracket.
     * @example
     * // Create one TaxBracket
     * const TaxBracket = await prisma.taxBracket.create({
     *   data: {
     *     // ... data to create a TaxBracket
     *   }
     * })
     * 
     */
    create<T extends TaxBracketCreateArgs>(args: SelectSubset<T, TaxBracketCreateArgs<ExtArgs>>): Prisma__TaxBracketClient<$Result.GetResult<Prisma.$TaxBracketPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TaxBrackets.
     * @param {TaxBracketCreateManyArgs} args - Arguments to create many TaxBrackets.
     * @example
     * // Create many TaxBrackets
     * const taxBracket = await prisma.taxBracket.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaxBracketCreateManyArgs>(args?: SelectSubset<T, TaxBracketCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TaxBrackets and returns the data saved in the database.
     * @param {TaxBracketCreateManyAndReturnArgs} args - Arguments to create many TaxBrackets.
     * @example
     * // Create many TaxBrackets
     * const taxBracket = await prisma.taxBracket.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TaxBrackets and only return the `id`
     * const taxBracketWithIdOnly = await prisma.taxBracket.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaxBracketCreateManyAndReturnArgs>(args?: SelectSubset<T, TaxBracketCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaxBracketPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TaxBracket.
     * @param {TaxBracketDeleteArgs} args - Arguments to delete one TaxBracket.
     * @example
     * // Delete one TaxBracket
     * const TaxBracket = await prisma.taxBracket.delete({
     *   where: {
     *     // ... filter to delete one TaxBracket
     *   }
     * })
     * 
     */
    delete<T extends TaxBracketDeleteArgs>(args: SelectSubset<T, TaxBracketDeleteArgs<ExtArgs>>): Prisma__TaxBracketClient<$Result.GetResult<Prisma.$TaxBracketPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TaxBracket.
     * @param {TaxBracketUpdateArgs} args - Arguments to update one TaxBracket.
     * @example
     * // Update one TaxBracket
     * const taxBracket = await prisma.taxBracket.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaxBracketUpdateArgs>(args: SelectSubset<T, TaxBracketUpdateArgs<ExtArgs>>): Prisma__TaxBracketClient<$Result.GetResult<Prisma.$TaxBracketPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TaxBrackets.
     * @param {TaxBracketDeleteManyArgs} args - Arguments to filter TaxBrackets to delete.
     * @example
     * // Delete a few TaxBrackets
     * const { count } = await prisma.taxBracket.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaxBracketDeleteManyArgs>(args?: SelectSubset<T, TaxBracketDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaxBrackets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaxBracketUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TaxBrackets
     * const taxBracket = await prisma.taxBracket.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaxBracketUpdateManyArgs>(args: SelectSubset<T, TaxBracketUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaxBrackets and returns the data updated in the database.
     * @param {TaxBracketUpdateManyAndReturnArgs} args - Arguments to update many TaxBrackets.
     * @example
     * // Update many TaxBrackets
     * const taxBracket = await prisma.taxBracket.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TaxBrackets and only return the `id`
     * const taxBracketWithIdOnly = await prisma.taxBracket.updateManyAndReturn({
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
    updateManyAndReturn<T extends TaxBracketUpdateManyAndReturnArgs>(args: SelectSubset<T, TaxBracketUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaxBracketPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TaxBracket.
     * @param {TaxBracketUpsertArgs} args - Arguments to update or create a TaxBracket.
     * @example
     * // Update or create a TaxBracket
     * const taxBracket = await prisma.taxBracket.upsert({
     *   create: {
     *     // ... data to create a TaxBracket
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TaxBracket we want to update
     *   }
     * })
     */
    upsert<T extends TaxBracketUpsertArgs>(args: SelectSubset<T, TaxBracketUpsertArgs<ExtArgs>>): Prisma__TaxBracketClient<$Result.GetResult<Prisma.$TaxBracketPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TaxBrackets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaxBracketCountArgs} args - Arguments to filter TaxBrackets to count.
     * @example
     * // Count the number of TaxBrackets
     * const count = await prisma.taxBracket.count({
     *   where: {
     *     // ... the filter for the TaxBrackets we want to count
     *   }
     * })
    **/
    count<T extends TaxBracketCountArgs>(
      args?: Subset<T, TaxBracketCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaxBracketCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TaxBracket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaxBracketAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TaxBracketAggregateArgs>(args: Subset<T, TaxBracketAggregateArgs>): Prisma.PrismaPromise<GetTaxBracketAggregateType<T>>

    /**
     * Group by TaxBracket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaxBracketGroupByArgs} args - Group by arguments.
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
      T extends TaxBracketGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaxBracketGroupByArgs['orderBy'] }
        : { orderBy?: TaxBracketGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TaxBracketGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaxBracketGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TaxBracket model
   */
  readonly fields: TaxBracketFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TaxBracket.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaxBracketClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the TaxBracket model
   */
  interface TaxBracketFieldRefs {
    readonly id: FieldRef<"TaxBracket", 'String'>
    readonly country: FieldRef<"TaxBracket", 'String'>
    readonly effectiveYear: FieldRef<"TaxBracket", 'Int'>
    readonly minIncome: FieldRef<"TaxBracket", 'Decimal'>
    readonly maxIncome: FieldRef<"TaxBracket", 'Decimal'>
    readonly rate: FieldRef<"TaxBracket", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * TaxBracket findUnique
   */
  export type TaxBracketFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaxBracket
     */
    select?: TaxBracketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaxBracket
     */
    omit?: TaxBracketOmit<ExtArgs> | null
    /**
     * Filter, which TaxBracket to fetch.
     */
    where: TaxBracketWhereUniqueInput
  }

  /**
   * TaxBracket findUniqueOrThrow
   */
  export type TaxBracketFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaxBracket
     */
    select?: TaxBracketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaxBracket
     */
    omit?: TaxBracketOmit<ExtArgs> | null
    /**
     * Filter, which TaxBracket to fetch.
     */
    where: TaxBracketWhereUniqueInput
  }

  /**
   * TaxBracket findFirst
   */
  export type TaxBracketFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaxBracket
     */
    select?: TaxBracketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaxBracket
     */
    omit?: TaxBracketOmit<ExtArgs> | null
    /**
     * Filter, which TaxBracket to fetch.
     */
    where?: TaxBracketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaxBrackets to fetch.
     */
    orderBy?: TaxBracketOrderByWithRelationInput | TaxBracketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaxBrackets.
     */
    cursor?: TaxBracketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaxBrackets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaxBrackets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaxBrackets.
     */
    distinct?: TaxBracketScalarFieldEnum | TaxBracketScalarFieldEnum[]
  }

  /**
   * TaxBracket findFirstOrThrow
   */
  export type TaxBracketFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaxBracket
     */
    select?: TaxBracketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaxBracket
     */
    omit?: TaxBracketOmit<ExtArgs> | null
    /**
     * Filter, which TaxBracket to fetch.
     */
    where?: TaxBracketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaxBrackets to fetch.
     */
    orderBy?: TaxBracketOrderByWithRelationInput | TaxBracketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaxBrackets.
     */
    cursor?: TaxBracketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaxBrackets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaxBrackets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaxBrackets.
     */
    distinct?: TaxBracketScalarFieldEnum | TaxBracketScalarFieldEnum[]
  }

  /**
   * TaxBracket findMany
   */
  export type TaxBracketFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaxBracket
     */
    select?: TaxBracketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaxBracket
     */
    omit?: TaxBracketOmit<ExtArgs> | null
    /**
     * Filter, which TaxBrackets to fetch.
     */
    where?: TaxBracketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaxBrackets to fetch.
     */
    orderBy?: TaxBracketOrderByWithRelationInput | TaxBracketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TaxBrackets.
     */
    cursor?: TaxBracketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaxBrackets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaxBrackets.
     */
    skip?: number
    distinct?: TaxBracketScalarFieldEnum | TaxBracketScalarFieldEnum[]
  }

  /**
   * TaxBracket create
   */
  export type TaxBracketCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaxBracket
     */
    select?: TaxBracketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaxBracket
     */
    omit?: TaxBracketOmit<ExtArgs> | null
    /**
     * The data needed to create a TaxBracket.
     */
    data: XOR<TaxBracketCreateInput, TaxBracketUncheckedCreateInput>
  }

  /**
   * TaxBracket createMany
   */
  export type TaxBracketCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TaxBrackets.
     */
    data: TaxBracketCreateManyInput | TaxBracketCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TaxBracket createManyAndReturn
   */
  export type TaxBracketCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaxBracket
     */
    select?: TaxBracketSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TaxBracket
     */
    omit?: TaxBracketOmit<ExtArgs> | null
    /**
     * The data used to create many TaxBrackets.
     */
    data: TaxBracketCreateManyInput | TaxBracketCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TaxBracket update
   */
  export type TaxBracketUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaxBracket
     */
    select?: TaxBracketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaxBracket
     */
    omit?: TaxBracketOmit<ExtArgs> | null
    /**
     * The data needed to update a TaxBracket.
     */
    data: XOR<TaxBracketUpdateInput, TaxBracketUncheckedUpdateInput>
    /**
     * Choose, which TaxBracket to update.
     */
    where: TaxBracketWhereUniqueInput
  }

  /**
   * TaxBracket updateMany
   */
  export type TaxBracketUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TaxBrackets.
     */
    data: XOR<TaxBracketUpdateManyMutationInput, TaxBracketUncheckedUpdateManyInput>
    /**
     * Filter which TaxBrackets to update
     */
    where?: TaxBracketWhereInput
    /**
     * Limit how many TaxBrackets to update.
     */
    limit?: number
  }

  /**
   * TaxBracket updateManyAndReturn
   */
  export type TaxBracketUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaxBracket
     */
    select?: TaxBracketSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TaxBracket
     */
    omit?: TaxBracketOmit<ExtArgs> | null
    /**
     * The data used to update TaxBrackets.
     */
    data: XOR<TaxBracketUpdateManyMutationInput, TaxBracketUncheckedUpdateManyInput>
    /**
     * Filter which TaxBrackets to update
     */
    where?: TaxBracketWhereInput
    /**
     * Limit how many TaxBrackets to update.
     */
    limit?: number
  }

  /**
   * TaxBracket upsert
   */
  export type TaxBracketUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaxBracket
     */
    select?: TaxBracketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaxBracket
     */
    omit?: TaxBracketOmit<ExtArgs> | null
    /**
     * The filter to search for the TaxBracket to update in case it exists.
     */
    where: TaxBracketWhereUniqueInput
    /**
     * In case the TaxBracket found by the `where` argument doesn't exist, create a new TaxBracket with this data.
     */
    create: XOR<TaxBracketCreateInput, TaxBracketUncheckedCreateInput>
    /**
     * In case the TaxBracket was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaxBracketUpdateInput, TaxBracketUncheckedUpdateInput>
  }

  /**
   * TaxBracket delete
   */
  export type TaxBracketDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaxBracket
     */
    select?: TaxBracketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaxBracket
     */
    omit?: TaxBracketOmit<ExtArgs> | null
    /**
     * Filter which TaxBracket to delete.
     */
    where: TaxBracketWhereUniqueInput
  }

  /**
   * TaxBracket deleteMany
   */
  export type TaxBracketDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaxBrackets to delete
     */
    where?: TaxBracketWhereInput
    /**
     * Limit how many TaxBrackets to delete.
     */
    limit?: number
  }

  /**
   * TaxBracket without action
   */
  export type TaxBracketDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaxBracket
     */
    select?: TaxBracketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaxBracket
     */
    omit?: TaxBracketOmit<ExtArgs> | null
  }


  /**
   * Model InsuranceRule
   */

  export type AggregateInsuranceRule = {
    _count: InsuranceRuleCountAggregateOutputType | null
    _avg: InsuranceRuleAvgAggregateOutputType | null
    _sum: InsuranceRuleSumAggregateOutputType | null
    _min: InsuranceRuleMinAggregateOutputType | null
    _max: InsuranceRuleMaxAggregateOutputType | null
  }

  export type InsuranceRuleAvgAggregateOutputType = {
    employeeRate: Decimal | null
    employerRate: Decimal | null
    ceiling: Decimal | null
  }

  export type InsuranceRuleSumAggregateOutputType = {
    employeeRate: Decimal | null
    employerRate: Decimal | null
    ceiling: Decimal | null
  }

  export type InsuranceRuleMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    effectiveFrom: Date | null
    effectiveTo: Date | null
    employeeRate: Decimal | null
    employerRate: Decimal | null
    ceiling: Decimal | null
  }

  export type InsuranceRuleMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    effectiveFrom: Date | null
    effectiveTo: Date | null
    employeeRate: Decimal | null
    employerRate: Decimal | null
    ceiling: Decimal | null
  }

  export type InsuranceRuleCountAggregateOutputType = {
    id: number
    tenantId: number
    effectiveFrom: number
    effectiveTo: number
    employeeRate: number
    employerRate: number
    ceiling: number
    _all: number
  }


  export type InsuranceRuleAvgAggregateInputType = {
    employeeRate?: true
    employerRate?: true
    ceiling?: true
  }

  export type InsuranceRuleSumAggregateInputType = {
    employeeRate?: true
    employerRate?: true
    ceiling?: true
  }

  export type InsuranceRuleMinAggregateInputType = {
    id?: true
    tenantId?: true
    effectiveFrom?: true
    effectiveTo?: true
    employeeRate?: true
    employerRate?: true
    ceiling?: true
  }

  export type InsuranceRuleMaxAggregateInputType = {
    id?: true
    tenantId?: true
    effectiveFrom?: true
    effectiveTo?: true
    employeeRate?: true
    employerRate?: true
    ceiling?: true
  }

  export type InsuranceRuleCountAggregateInputType = {
    id?: true
    tenantId?: true
    effectiveFrom?: true
    effectiveTo?: true
    employeeRate?: true
    employerRate?: true
    ceiling?: true
    _all?: true
  }

  export type InsuranceRuleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InsuranceRule to aggregate.
     */
    where?: InsuranceRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InsuranceRules to fetch.
     */
    orderBy?: InsuranceRuleOrderByWithRelationInput | InsuranceRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InsuranceRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InsuranceRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InsuranceRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InsuranceRules
    **/
    _count?: true | InsuranceRuleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InsuranceRuleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InsuranceRuleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InsuranceRuleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InsuranceRuleMaxAggregateInputType
  }

  export type GetInsuranceRuleAggregateType<T extends InsuranceRuleAggregateArgs> = {
        [P in keyof T & keyof AggregateInsuranceRule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInsuranceRule[P]>
      : GetScalarType<T[P], AggregateInsuranceRule[P]>
  }




  export type InsuranceRuleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InsuranceRuleWhereInput
    orderBy?: InsuranceRuleOrderByWithAggregationInput | InsuranceRuleOrderByWithAggregationInput[]
    by: InsuranceRuleScalarFieldEnum[] | InsuranceRuleScalarFieldEnum
    having?: InsuranceRuleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InsuranceRuleCountAggregateInputType | true
    _avg?: InsuranceRuleAvgAggregateInputType
    _sum?: InsuranceRuleSumAggregateInputType
    _min?: InsuranceRuleMinAggregateInputType
    _max?: InsuranceRuleMaxAggregateInputType
  }

  export type InsuranceRuleGroupByOutputType = {
    id: string
    tenantId: string
    effectiveFrom: Date
    effectiveTo: Date | null
    employeeRate: Decimal
    employerRate: Decimal
    ceiling: Decimal
    _count: InsuranceRuleCountAggregateOutputType | null
    _avg: InsuranceRuleAvgAggregateOutputType | null
    _sum: InsuranceRuleSumAggregateOutputType | null
    _min: InsuranceRuleMinAggregateOutputType | null
    _max: InsuranceRuleMaxAggregateOutputType | null
  }

  type GetInsuranceRuleGroupByPayload<T extends InsuranceRuleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InsuranceRuleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InsuranceRuleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InsuranceRuleGroupByOutputType[P]>
            : GetScalarType<T[P], InsuranceRuleGroupByOutputType[P]>
        }
      >
    >


  export type InsuranceRuleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    effectiveFrom?: boolean
    effectiveTo?: boolean
    employeeRate?: boolean
    employerRate?: boolean
    ceiling?: boolean
  }, ExtArgs["result"]["insuranceRule"]>

  export type InsuranceRuleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    effectiveFrom?: boolean
    effectiveTo?: boolean
    employeeRate?: boolean
    employerRate?: boolean
    ceiling?: boolean
  }, ExtArgs["result"]["insuranceRule"]>

  export type InsuranceRuleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    effectiveFrom?: boolean
    effectiveTo?: boolean
    employeeRate?: boolean
    employerRate?: boolean
    ceiling?: boolean
  }, ExtArgs["result"]["insuranceRule"]>

  export type InsuranceRuleSelectScalar = {
    id?: boolean
    tenantId?: boolean
    effectiveFrom?: boolean
    effectiveTo?: boolean
    employeeRate?: boolean
    employerRate?: boolean
    ceiling?: boolean
  }

  export type InsuranceRuleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "effectiveFrom" | "effectiveTo" | "employeeRate" | "employerRate" | "ceiling", ExtArgs["result"]["insuranceRule"]>

  export type $InsuranceRulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InsuranceRule"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      effectiveFrom: Date
      effectiveTo: Date | null
      employeeRate: Prisma.Decimal
      employerRate: Prisma.Decimal
      ceiling: Prisma.Decimal
    }, ExtArgs["result"]["insuranceRule"]>
    composites: {}
  }

  type InsuranceRuleGetPayload<S extends boolean | null | undefined | InsuranceRuleDefaultArgs> = $Result.GetResult<Prisma.$InsuranceRulePayload, S>

  type InsuranceRuleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InsuranceRuleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InsuranceRuleCountAggregateInputType | true
    }

  export interface InsuranceRuleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InsuranceRule'], meta: { name: 'InsuranceRule' } }
    /**
     * Find zero or one InsuranceRule that matches the filter.
     * @param {InsuranceRuleFindUniqueArgs} args - Arguments to find a InsuranceRule
     * @example
     * // Get one InsuranceRule
     * const insuranceRule = await prisma.insuranceRule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InsuranceRuleFindUniqueArgs>(args: SelectSubset<T, InsuranceRuleFindUniqueArgs<ExtArgs>>): Prisma__InsuranceRuleClient<$Result.GetResult<Prisma.$InsuranceRulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one InsuranceRule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InsuranceRuleFindUniqueOrThrowArgs} args - Arguments to find a InsuranceRule
     * @example
     * // Get one InsuranceRule
     * const insuranceRule = await prisma.insuranceRule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InsuranceRuleFindUniqueOrThrowArgs>(args: SelectSubset<T, InsuranceRuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InsuranceRuleClient<$Result.GetResult<Prisma.$InsuranceRulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InsuranceRule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsuranceRuleFindFirstArgs} args - Arguments to find a InsuranceRule
     * @example
     * // Get one InsuranceRule
     * const insuranceRule = await prisma.insuranceRule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InsuranceRuleFindFirstArgs>(args?: SelectSubset<T, InsuranceRuleFindFirstArgs<ExtArgs>>): Prisma__InsuranceRuleClient<$Result.GetResult<Prisma.$InsuranceRulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InsuranceRule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsuranceRuleFindFirstOrThrowArgs} args - Arguments to find a InsuranceRule
     * @example
     * // Get one InsuranceRule
     * const insuranceRule = await prisma.insuranceRule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InsuranceRuleFindFirstOrThrowArgs>(args?: SelectSubset<T, InsuranceRuleFindFirstOrThrowArgs<ExtArgs>>): Prisma__InsuranceRuleClient<$Result.GetResult<Prisma.$InsuranceRulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more InsuranceRules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsuranceRuleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InsuranceRules
     * const insuranceRules = await prisma.insuranceRule.findMany()
     * 
     * // Get first 10 InsuranceRules
     * const insuranceRules = await prisma.insuranceRule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const insuranceRuleWithIdOnly = await prisma.insuranceRule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InsuranceRuleFindManyArgs>(args?: SelectSubset<T, InsuranceRuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InsuranceRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a InsuranceRule.
     * @param {InsuranceRuleCreateArgs} args - Arguments to create a InsuranceRule.
     * @example
     * // Create one InsuranceRule
     * const InsuranceRule = await prisma.insuranceRule.create({
     *   data: {
     *     // ... data to create a InsuranceRule
     *   }
     * })
     * 
     */
    create<T extends InsuranceRuleCreateArgs>(args: SelectSubset<T, InsuranceRuleCreateArgs<ExtArgs>>): Prisma__InsuranceRuleClient<$Result.GetResult<Prisma.$InsuranceRulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many InsuranceRules.
     * @param {InsuranceRuleCreateManyArgs} args - Arguments to create many InsuranceRules.
     * @example
     * // Create many InsuranceRules
     * const insuranceRule = await prisma.insuranceRule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InsuranceRuleCreateManyArgs>(args?: SelectSubset<T, InsuranceRuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InsuranceRules and returns the data saved in the database.
     * @param {InsuranceRuleCreateManyAndReturnArgs} args - Arguments to create many InsuranceRules.
     * @example
     * // Create many InsuranceRules
     * const insuranceRule = await prisma.insuranceRule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InsuranceRules and only return the `id`
     * const insuranceRuleWithIdOnly = await prisma.insuranceRule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InsuranceRuleCreateManyAndReturnArgs>(args?: SelectSubset<T, InsuranceRuleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InsuranceRulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a InsuranceRule.
     * @param {InsuranceRuleDeleteArgs} args - Arguments to delete one InsuranceRule.
     * @example
     * // Delete one InsuranceRule
     * const InsuranceRule = await prisma.insuranceRule.delete({
     *   where: {
     *     // ... filter to delete one InsuranceRule
     *   }
     * })
     * 
     */
    delete<T extends InsuranceRuleDeleteArgs>(args: SelectSubset<T, InsuranceRuleDeleteArgs<ExtArgs>>): Prisma__InsuranceRuleClient<$Result.GetResult<Prisma.$InsuranceRulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one InsuranceRule.
     * @param {InsuranceRuleUpdateArgs} args - Arguments to update one InsuranceRule.
     * @example
     * // Update one InsuranceRule
     * const insuranceRule = await prisma.insuranceRule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InsuranceRuleUpdateArgs>(args: SelectSubset<T, InsuranceRuleUpdateArgs<ExtArgs>>): Prisma__InsuranceRuleClient<$Result.GetResult<Prisma.$InsuranceRulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more InsuranceRules.
     * @param {InsuranceRuleDeleteManyArgs} args - Arguments to filter InsuranceRules to delete.
     * @example
     * // Delete a few InsuranceRules
     * const { count } = await prisma.insuranceRule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InsuranceRuleDeleteManyArgs>(args?: SelectSubset<T, InsuranceRuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InsuranceRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsuranceRuleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InsuranceRules
     * const insuranceRule = await prisma.insuranceRule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InsuranceRuleUpdateManyArgs>(args: SelectSubset<T, InsuranceRuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InsuranceRules and returns the data updated in the database.
     * @param {InsuranceRuleUpdateManyAndReturnArgs} args - Arguments to update many InsuranceRules.
     * @example
     * // Update many InsuranceRules
     * const insuranceRule = await prisma.insuranceRule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more InsuranceRules and only return the `id`
     * const insuranceRuleWithIdOnly = await prisma.insuranceRule.updateManyAndReturn({
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
    updateManyAndReturn<T extends InsuranceRuleUpdateManyAndReturnArgs>(args: SelectSubset<T, InsuranceRuleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InsuranceRulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one InsuranceRule.
     * @param {InsuranceRuleUpsertArgs} args - Arguments to update or create a InsuranceRule.
     * @example
     * // Update or create a InsuranceRule
     * const insuranceRule = await prisma.insuranceRule.upsert({
     *   create: {
     *     // ... data to create a InsuranceRule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InsuranceRule we want to update
     *   }
     * })
     */
    upsert<T extends InsuranceRuleUpsertArgs>(args: SelectSubset<T, InsuranceRuleUpsertArgs<ExtArgs>>): Prisma__InsuranceRuleClient<$Result.GetResult<Prisma.$InsuranceRulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of InsuranceRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsuranceRuleCountArgs} args - Arguments to filter InsuranceRules to count.
     * @example
     * // Count the number of InsuranceRules
     * const count = await prisma.insuranceRule.count({
     *   where: {
     *     // ... the filter for the InsuranceRules we want to count
     *   }
     * })
    **/
    count<T extends InsuranceRuleCountArgs>(
      args?: Subset<T, InsuranceRuleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InsuranceRuleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InsuranceRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsuranceRuleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends InsuranceRuleAggregateArgs>(args: Subset<T, InsuranceRuleAggregateArgs>): Prisma.PrismaPromise<GetInsuranceRuleAggregateType<T>>

    /**
     * Group by InsuranceRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsuranceRuleGroupByArgs} args - Group by arguments.
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
      T extends InsuranceRuleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InsuranceRuleGroupByArgs['orderBy'] }
        : { orderBy?: InsuranceRuleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, InsuranceRuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInsuranceRuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InsuranceRule model
   */
  readonly fields: InsuranceRuleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InsuranceRule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InsuranceRuleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the InsuranceRule model
   */
  interface InsuranceRuleFieldRefs {
    readonly id: FieldRef<"InsuranceRule", 'String'>
    readonly tenantId: FieldRef<"InsuranceRule", 'String'>
    readonly effectiveFrom: FieldRef<"InsuranceRule", 'DateTime'>
    readonly effectiveTo: FieldRef<"InsuranceRule", 'DateTime'>
    readonly employeeRate: FieldRef<"InsuranceRule", 'Decimal'>
    readonly employerRate: FieldRef<"InsuranceRule", 'Decimal'>
    readonly ceiling: FieldRef<"InsuranceRule", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * InsuranceRule findUnique
   */
  export type InsuranceRuleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsuranceRule
     */
    select?: InsuranceRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InsuranceRule
     */
    omit?: InsuranceRuleOmit<ExtArgs> | null
    /**
     * Filter, which InsuranceRule to fetch.
     */
    where: InsuranceRuleWhereUniqueInput
  }

  /**
   * InsuranceRule findUniqueOrThrow
   */
  export type InsuranceRuleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsuranceRule
     */
    select?: InsuranceRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InsuranceRule
     */
    omit?: InsuranceRuleOmit<ExtArgs> | null
    /**
     * Filter, which InsuranceRule to fetch.
     */
    where: InsuranceRuleWhereUniqueInput
  }

  /**
   * InsuranceRule findFirst
   */
  export type InsuranceRuleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsuranceRule
     */
    select?: InsuranceRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InsuranceRule
     */
    omit?: InsuranceRuleOmit<ExtArgs> | null
    /**
     * Filter, which InsuranceRule to fetch.
     */
    where?: InsuranceRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InsuranceRules to fetch.
     */
    orderBy?: InsuranceRuleOrderByWithRelationInput | InsuranceRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InsuranceRules.
     */
    cursor?: InsuranceRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InsuranceRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InsuranceRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InsuranceRules.
     */
    distinct?: InsuranceRuleScalarFieldEnum | InsuranceRuleScalarFieldEnum[]
  }

  /**
   * InsuranceRule findFirstOrThrow
   */
  export type InsuranceRuleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsuranceRule
     */
    select?: InsuranceRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InsuranceRule
     */
    omit?: InsuranceRuleOmit<ExtArgs> | null
    /**
     * Filter, which InsuranceRule to fetch.
     */
    where?: InsuranceRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InsuranceRules to fetch.
     */
    orderBy?: InsuranceRuleOrderByWithRelationInput | InsuranceRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InsuranceRules.
     */
    cursor?: InsuranceRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InsuranceRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InsuranceRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InsuranceRules.
     */
    distinct?: InsuranceRuleScalarFieldEnum | InsuranceRuleScalarFieldEnum[]
  }

  /**
   * InsuranceRule findMany
   */
  export type InsuranceRuleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsuranceRule
     */
    select?: InsuranceRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InsuranceRule
     */
    omit?: InsuranceRuleOmit<ExtArgs> | null
    /**
     * Filter, which InsuranceRules to fetch.
     */
    where?: InsuranceRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InsuranceRules to fetch.
     */
    orderBy?: InsuranceRuleOrderByWithRelationInput | InsuranceRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InsuranceRules.
     */
    cursor?: InsuranceRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InsuranceRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InsuranceRules.
     */
    skip?: number
    distinct?: InsuranceRuleScalarFieldEnum | InsuranceRuleScalarFieldEnum[]
  }

  /**
   * InsuranceRule create
   */
  export type InsuranceRuleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsuranceRule
     */
    select?: InsuranceRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InsuranceRule
     */
    omit?: InsuranceRuleOmit<ExtArgs> | null
    /**
     * The data needed to create a InsuranceRule.
     */
    data: XOR<InsuranceRuleCreateInput, InsuranceRuleUncheckedCreateInput>
  }

  /**
   * InsuranceRule createMany
   */
  export type InsuranceRuleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InsuranceRules.
     */
    data: InsuranceRuleCreateManyInput | InsuranceRuleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InsuranceRule createManyAndReturn
   */
  export type InsuranceRuleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsuranceRule
     */
    select?: InsuranceRuleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InsuranceRule
     */
    omit?: InsuranceRuleOmit<ExtArgs> | null
    /**
     * The data used to create many InsuranceRules.
     */
    data: InsuranceRuleCreateManyInput | InsuranceRuleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InsuranceRule update
   */
  export type InsuranceRuleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsuranceRule
     */
    select?: InsuranceRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InsuranceRule
     */
    omit?: InsuranceRuleOmit<ExtArgs> | null
    /**
     * The data needed to update a InsuranceRule.
     */
    data: XOR<InsuranceRuleUpdateInput, InsuranceRuleUncheckedUpdateInput>
    /**
     * Choose, which InsuranceRule to update.
     */
    where: InsuranceRuleWhereUniqueInput
  }

  /**
   * InsuranceRule updateMany
   */
  export type InsuranceRuleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InsuranceRules.
     */
    data: XOR<InsuranceRuleUpdateManyMutationInput, InsuranceRuleUncheckedUpdateManyInput>
    /**
     * Filter which InsuranceRules to update
     */
    where?: InsuranceRuleWhereInput
    /**
     * Limit how many InsuranceRules to update.
     */
    limit?: number
  }

  /**
   * InsuranceRule updateManyAndReturn
   */
  export type InsuranceRuleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsuranceRule
     */
    select?: InsuranceRuleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InsuranceRule
     */
    omit?: InsuranceRuleOmit<ExtArgs> | null
    /**
     * The data used to update InsuranceRules.
     */
    data: XOR<InsuranceRuleUpdateManyMutationInput, InsuranceRuleUncheckedUpdateManyInput>
    /**
     * Filter which InsuranceRules to update
     */
    where?: InsuranceRuleWhereInput
    /**
     * Limit how many InsuranceRules to update.
     */
    limit?: number
  }

  /**
   * InsuranceRule upsert
   */
  export type InsuranceRuleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsuranceRule
     */
    select?: InsuranceRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InsuranceRule
     */
    omit?: InsuranceRuleOmit<ExtArgs> | null
    /**
     * The filter to search for the InsuranceRule to update in case it exists.
     */
    where: InsuranceRuleWhereUniqueInput
    /**
     * In case the InsuranceRule found by the `where` argument doesn't exist, create a new InsuranceRule with this data.
     */
    create: XOR<InsuranceRuleCreateInput, InsuranceRuleUncheckedCreateInput>
    /**
     * In case the InsuranceRule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InsuranceRuleUpdateInput, InsuranceRuleUncheckedUpdateInput>
  }

  /**
   * InsuranceRule delete
   */
  export type InsuranceRuleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsuranceRule
     */
    select?: InsuranceRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InsuranceRule
     */
    omit?: InsuranceRuleOmit<ExtArgs> | null
    /**
     * Filter which InsuranceRule to delete.
     */
    where: InsuranceRuleWhereUniqueInput
  }

  /**
   * InsuranceRule deleteMany
   */
  export type InsuranceRuleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InsuranceRules to delete
     */
    where?: InsuranceRuleWhereInput
    /**
     * Limit how many InsuranceRules to delete.
     */
    limit?: number
  }

  /**
   * InsuranceRule without action
   */
  export type InsuranceRuleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsuranceRule
     */
    select?: InsuranceRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InsuranceRule
     */
    omit?: InsuranceRuleOmit<ExtArgs> | null
  }


  /**
   * Model PayslipSnapshot
   */

  export type AggregatePayslipSnapshot = {
    _count: PayslipSnapshotCountAggregateOutputType | null
    _avg: PayslipSnapshotAvgAggregateOutputType | null
    _sum: PayslipSnapshotSumAggregateOutputType | null
    _min: PayslipSnapshotMinAggregateOutputType | null
    _max: PayslipSnapshotMaxAggregateOutputType | null
  }

  export type PayslipSnapshotAvgAggregateOutputType = {
    baseSalary: Decimal | null
    overtime: Decimal | null
    nightShift: Decimal | null
    holidays: Decimal | null
    commission: Decimal | null
    insuranceEmployee: Decimal | null
    insuranceEmployer: Decimal | null
    tax: Decimal | null
    netPay: Decimal | null
  }

  export type PayslipSnapshotSumAggregateOutputType = {
    baseSalary: Decimal | null
    overtime: Decimal | null
    nightShift: Decimal | null
    holidays: Decimal | null
    commission: Decimal | null
    insuranceEmployee: Decimal | null
    insuranceEmployer: Decimal | null
    tax: Decimal | null
    netPay: Decimal | null
  }

  export type PayslipSnapshotMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    employeeId: string | null
    periodStart: Date | null
    periodEnd: Date | null
    baseSalary: Decimal | null
    overtime: Decimal | null
    nightShift: Decimal | null
    holidays: Decimal | null
    commission: Decimal | null
    insuranceEmployee: Decimal | null
    insuranceEmployer: Decimal | null
    tax: Decimal | null
    netPay: Decimal | null
    status: $Enums.PayslipStatus | null
    finalizedAt: Date | null
    adjustmentReason: string | null
    correlationId: string | null
    supersededById: string | null
  }

  export type PayslipSnapshotMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    employeeId: string | null
    periodStart: Date | null
    periodEnd: Date | null
    baseSalary: Decimal | null
    overtime: Decimal | null
    nightShift: Decimal | null
    holidays: Decimal | null
    commission: Decimal | null
    insuranceEmployee: Decimal | null
    insuranceEmployer: Decimal | null
    tax: Decimal | null
    netPay: Decimal | null
    status: $Enums.PayslipStatus | null
    finalizedAt: Date | null
    adjustmentReason: string | null
    correlationId: string | null
    supersededById: string | null
  }

  export type PayslipSnapshotCountAggregateOutputType = {
    id: number
    tenantId: number
    employeeId: number
    periodStart: number
    periodEnd: number
    baseSalary: number
    overtime: number
    nightShift: number
    holidays: number
    commission: number
    insuranceEmployee: number
    insuranceEmployer: number
    tax: number
    netPay: number
    breakdown: number
    status: number
    finalizedAt: number
    adjustmentReason: number
    correlationId: number
    supersededById: number
    _all: number
  }


  export type PayslipSnapshotAvgAggregateInputType = {
    baseSalary?: true
    overtime?: true
    nightShift?: true
    holidays?: true
    commission?: true
    insuranceEmployee?: true
    insuranceEmployer?: true
    tax?: true
    netPay?: true
  }

  export type PayslipSnapshotSumAggregateInputType = {
    baseSalary?: true
    overtime?: true
    nightShift?: true
    holidays?: true
    commission?: true
    insuranceEmployee?: true
    insuranceEmployer?: true
    tax?: true
    netPay?: true
  }

  export type PayslipSnapshotMinAggregateInputType = {
    id?: true
    tenantId?: true
    employeeId?: true
    periodStart?: true
    periodEnd?: true
    baseSalary?: true
    overtime?: true
    nightShift?: true
    holidays?: true
    commission?: true
    insuranceEmployee?: true
    insuranceEmployer?: true
    tax?: true
    netPay?: true
    status?: true
    finalizedAt?: true
    adjustmentReason?: true
    correlationId?: true
    supersededById?: true
  }

  export type PayslipSnapshotMaxAggregateInputType = {
    id?: true
    tenantId?: true
    employeeId?: true
    periodStart?: true
    periodEnd?: true
    baseSalary?: true
    overtime?: true
    nightShift?: true
    holidays?: true
    commission?: true
    insuranceEmployee?: true
    insuranceEmployer?: true
    tax?: true
    netPay?: true
    status?: true
    finalizedAt?: true
    adjustmentReason?: true
    correlationId?: true
    supersededById?: true
  }

  export type PayslipSnapshotCountAggregateInputType = {
    id?: true
    tenantId?: true
    employeeId?: true
    periodStart?: true
    periodEnd?: true
    baseSalary?: true
    overtime?: true
    nightShift?: true
    holidays?: true
    commission?: true
    insuranceEmployee?: true
    insuranceEmployer?: true
    tax?: true
    netPay?: true
    breakdown?: true
    status?: true
    finalizedAt?: true
    adjustmentReason?: true
    correlationId?: true
    supersededById?: true
    _all?: true
  }

  export type PayslipSnapshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PayslipSnapshot to aggregate.
     */
    where?: PayslipSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PayslipSnapshots to fetch.
     */
    orderBy?: PayslipSnapshotOrderByWithRelationInput | PayslipSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PayslipSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PayslipSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PayslipSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PayslipSnapshots
    **/
    _count?: true | PayslipSnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PayslipSnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PayslipSnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PayslipSnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PayslipSnapshotMaxAggregateInputType
  }

  export type GetPayslipSnapshotAggregateType<T extends PayslipSnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregatePayslipSnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayslipSnapshot[P]>
      : GetScalarType<T[P], AggregatePayslipSnapshot[P]>
  }




  export type PayslipSnapshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PayslipSnapshotWhereInput
    orderBy?: PayslipSnapshotOrderByWithAggregationInput | PayslipSnapshotOrderByWithAggregationInput[]
    by: PayslipSnapshotScalarFieldEnum[] | PayslipSnapshotScalarFieldEnum
    having?: PayslipSnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PayslipSnapshotCountAggregateInputType | true
    _avg?: PayslipSnapshotAvgAggregateInputType
    _sum?: PayslipSnapshotSumAggregateInputType
    _min?: PayslipSnapshotMinAggregateInputType
    _max?: PayslipSnapshotMaxAggregateInputType
  }

  export type PayslipSnapshotGroupByOutputType = {
    id: string
    tenantId: string
    employeeId: string
    periodStart: Date
    periodEnd: Date
    baseSalary: Decimal
    overtime: Decimal
    nightShift: Decimal
    holidays: Decimal
    commission: Decimal
    insuranceEmployee: Decimal
    insuranceEmployer: Decimal
    tax: Decimal
    netPay: Decimal
    breakdown: JsonValue
    status: $Enums.PayslipStatus
    finalizedAt: Date | null
    adjustmentReason: string | null
    correlationId: string
    supersededById: string | null
    _count: PayslipSnapshotCountAggregateOutputType | null
    _avg: PayslipSnapshotAvgAggregateOutputType | null
    _sum: PayslipSnapshotSumAggregateOutputType | null
    _min: PayslipSnapshotMinAggregateOutputType | null
    _max: PayslipSnapshotMaxAggregateOutputType | null
  }

  type GetPayslipSnapshotGroupByPayload<T extends PayslipSnapshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PayslipSnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PayslipSnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PayslipSnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], PayslipSnapshotGroupByOutputType[P]>
        }
      >
    >


  export type PayslipSnapshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    employeeId?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    baseSalary?: boolean
    overtime?: boolean
    nightShift?: boolean
    holidays?: boolean
    commission?: boolean
    insuranceEmployee?: boolean
    insuranceEmployer?: boolean
    tax?: boolean
    netPay?: boolean
    breakdown?: boolean
    status?: boolean
    finalizedAt?: boolean
    adjustmentReason?: boolean
    correlationId?: boolean
    supersededById?: boolean
  }, ExtArgs["result"]["payslipSnapshot"]>

  export type PayslipSnapshotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    employeeId?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    baseSalary?: boolean
    overtime?: boolean
    nightShift?: boolean
    holidays?: boolean
    commission?: boolean
    insuranceEmployee?: boolean
    insuranceEmployer?: boolean
    tax?: boolean
    netPay?: boolean
    breakdown?: boolean
    status?: boolean
    finalizedAt?: boolean
    adjustmentReason?: boolean
    correlationId?: boolean
    supersededById?: boolean
  }, ExtArgs["result"]["payslipSnapshot"]>

  export type PayslipSnapshotSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    employeeId?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    baseSalary?: boolean
    overtime?: boolean
    nightShift?: boolean
    holidays?: boolean
    commission?: boolean
    insuranceEmployee?: boolean
    insuranceEmployer?: boolean
    tax?: boolean
    netPay?: boolean
    breakdown?: boolean
    status?: boolean
    finalizedAt?: boolean
    adjustmentReason?: boolean
    correlationId?: boolean
    supersededById?: boolean
  }, ExtArgs["result"]["payslipSnapshot"]>

  export type PayslipSnapshotSelectScalar = {
    id?: boolean
    tenantId?: boolean
    employeeId?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    baseSalary?: boolean
    overtime?: boolean
    nightShift?: boolean
    holidays?: boolean
    commission?: boolean
    insuranceEmployee?: boolean
    insuranceEmployer?: boolean
    tax?: boolean
    netPay?: boolean
    breakdown?: boolean
    status?: boolean
    finalizedAt?: boolean
    adjustmentReason?: boolean
    correlationId?: boolean
    supersededById?: boolean
  }

  export type PayslipSnapshotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "employeeId" | "periodStart" | "periodEnd" | "baseSalary" | "overtime" | "nightShift" | "holidays" | "commission" | "insuranceEmployee" | "insuranceEmployer" | "tax" | "netPay" | "breakdown" | "status" | "finalizedAt" | "adjustmentReason" | "correlationId" | "supersededById", ExtArgs["result"]["payslipSnapshot"]>

  export type $PayslipSnapshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PayslipSnapshot"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      employeeId: string
      periodStart: Date
      periodEnd: Date
      baseSalary: Prisma.Decimal
      overtime: Prisma.Decimal
      nightShift: Prisma.Decimal
      holidays: Prisma.Decimal
      commission: Prisma.Decimal
      insuranceEmployee: Prisma.Decimal
      insuranceEmployer: Prisma.Decimal
      tax: Prisma.Decimal
      netPay: Prisma.Decimal
      breakdown: Prisma.JsonValue
      status: $Enums.PayslipStatus
      finalizedAt: Date | null
      adjustmentReason: string | null
      correlationId: string
      supersededById: string | null
    }, ExtArgs["result"]["payslipSnapshot"]>
    composites: {}
  }

  type PayslipSnapshotGetPayload<S extends boolean | null | undefined | PayslipSnapshotDefaultArgs> = $Result.GetResult<Prisma.$PayslipSnapshotPayload, S>

  type PayslipSnapshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PayslipSnapshotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PayslipSnapshotCountAggregateInputType | true
    }

  export interface PayslipSnapshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PayslipSnapshot'], meta: { name: 'PayslipSnapshot' } }
    /**
     * Find zero or one PayslipSnapshot that matches the filter.
     * @param {PayslipSnapshotFindUniqueArgs} args - Arguments to find a PayslipSnapshot
     * @example
     * // Get one PayslipSnapshot
     * const payslipSnapshot = await prisma.payslipSnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PayslipSnapshotFindUniqueArgs>(args: SelectSubset<T, PayslipSnapshotFindUniqueArgs<ExtArgs>>): Prisma__PayslipSnapshotClient<$Result.GetResult<Prisma.$PayslipSnapshotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PayslipSnapshot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PayslipSnapshotFindUniqueOrThrowArgs} args - Arguments to find a PayslipSnapshot
     * @example
     * // Get one PayslipSnapshot
     * const payslipSnapshot = await prisma.payslipSnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PayslipSnapshotFindUniqueOrThrowArgs>(args: SelectSubset<T, PayslipSnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PayslipSnapshotClient<$Result.GetResult<Prisma.$PayslipSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PayslipSnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayslipSnapshotFindFirstArgs} args - Arguments to find a PayslipSnapshot
     * @example
     * // Get one PayslipSnapshot
     * const payslipSnapshot = await prisma.payslipSnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PayslipSnapshotFindFirstArgs>(args?: SelectSubset<T, PayslipSnapshotFindFirstArgs<ExtArgs>>): Prisma__PayslipSnapshotClient<$Result.GetResult<Prisma.$PayslipSnapshotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PayslipSnapshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayslipSnapshotFindFirstOrThrowArgs} args - Arguments to find a PayslipSnapshot
     * @example
     * // Get one PayslipSnapshot
     * const payslipSnapshot = await prisma.payslipSnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PayslipSnapshotFindFirstOrThrowArgs>(args?: SelectSubset<T, PayslipSnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma__PayslipSnapshotClient<$Result.GetResult<Prisma.$PayslipSnapshotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PayslipSnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayslipSnapshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PayslipSnapshots
     * const payslipSnapshots = await prisma.payslipSnapshot.findMany()
     * 
     * // Get first 10 PayslipSnapshots
     * const payslipSnapshots = await prisma.payslipSnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const payslipSnapshotWithIdOnly = await prisma.payslipSnapshot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PayslipSnapshotFindManyArgs>(args?: SelectSubset<T, PayslipSnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayslipSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PayslipSnapshot.
     * @param {PayslipSnapshotCreateArgs} args - Arguments to create a PayslipSnapshot.
     * @example
     * // Create one PayslipSnapshot
     * const PayslipSnapshot = await prisma.payslipSnapshot.create({
     *   data: {
     *     // ... data to create a PayslipSnapshot
     *   }
     * })
     * 
     */
    create<T extends PayslipSnapshotCreateArgs>(args: SelectSubset<T, PayslipSnapshotCreateArgs<ExtArgs>>): Prisma__PayslipSnapshotClient<$Result.GetResult<Prisma.$PayslipSnapshotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PayslipSnapshots.
     * @param {PayslipSnapshotCreateManyArgs} args - Arguments to create many PayslipSnapshots.
     * @example
     * // Create many PayslipSnapshots
     * const payslipSnapshot = await prisma.payslipSnapshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PayslipSnapshotCreateManyArgs>(args?: SelectSubset<T, PayslipSnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PayslipSnapshots and returns the data saved in the database.
     * @param {PayslipSnapshotCreateManyAndReturnArgs} args - Arguments to create many PayslipSnapshots.
     * @example
     * // Create many PayslipSnapshots
     * const payslipSnapshot = await prisma.payslipSnapshot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PayslipSnapshots and only return the `id`
     * const payslipSnapshotWithIdOnly = await prisma.payslipSnapshot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PayslipSnapshotCreateManyAndReturnArgs>(args?: SelectSubset<T, PayslipSnapshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayslipSnapshotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PayslipSnapshot.
     * @param {PayslipSnapshotDeleteArgs} args - Arguments to delete one PayslipSnapshot.
     * @example
     * // Delete one PayslipSnapshot
     * const PayslipSnapshot = await prisma.payslipSnapshot.delete({
     *   where: {
     *     // ... filter to delete one PayslipSnapshot
     *   }
     * })
     * 
     */
    delete<T extends PayslipSnapshotDeleteArgs>(args: SelectSubset<T, PayslipSnapshotDeleteArgs<ExtArgs>>): Prisma__PayslipSnapshotClient<$Result.GetResult<Prisma.$PayslipSnapshotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PayslipSnapshot.
     * @param {PayslipSnapshotUpdateArgs} args - Arguments to update one PayslipSnapshot.
     * @example
     * // Update one PayslipSnapshot
     * const payslipSnapshot = await prisma.payslipSnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PayslipSnapshotUpdateArgs>(args: SelectSubset<T, PayslipSnapshotUpdateArgs<ExtArgs>>): Prisma__PayslipSnapshotClient<$Result.GetResult<Prisma.$PayslipSnapshotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PayslipSnapshots.
     * @param {PayslipSnapshotDeleteManyArgs} args - Arguments to filter PayslipSnapshots to delete.
     * @example
     * // Delete a few PayslipSnapshots
     * const { count } = await prisma.payslipSnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PayslipSnapshotDeleteManyArgs>(args?: SelectSubset<T, PayslipSnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PayslipSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayslipSnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PayslipSnapshots
     * const payslipSnapshot = await prisma.payslipSnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PayslipSnapshotUpdateManyArgs>(args: SelectSubset<T, PayslipSnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PayslipSnapshots and returns the data updated in the database.
     * @param {PayslipSnapshotUpdateManyAndReturnArgs} args - Arguments to update many PayslipSnapshots.
     * @example
     * // Update many PayslipSnapshots
     * const payslipSnapshot = await prisma.payslipSnapshot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PayslipSnapshots and only return the `id`
     * const payslipSnapshotWithIdOnly = await prisma.payslipSnapshot.updateManyAndReturn({
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
    updateManyAndReturn<T extends PayslipSnapshotUpdateManyAndReturnArgs>(args: SelectSubset<T, PayslipSnapshotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayslipSnapshotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PayslipSnapshot.
     * @param {PayslipSnapshotUpsertArgs} args - Arguments to update or create a PayslipSnapshot.
     * @example
     * // Update or create a PayslipSnapshot
     * const payslipSnapshot = await prisma.payslipSnapshot.upsert({
     *   create: {
     *     // ... data to create a PayslipSnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PayslipSnapshot we want to update
     *   }
     * })
     */
    upsert<T extends PayslipSnapshotUpsertArgs>(args: SelectSubset<T, PayslipSnapshotUpsertArgs<ExtArgs>>): Prisma__PayslipSnapshotClient<$Result.GetResult<Prisma.$PayslipSnapshotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PayslipSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayslipSnapshotCountArgs} args - Arguments to filter PayslipSnapshots to count.
     * @example
     * // Count the number of PayslipSnapshots
     * const count = await prisma.payslipSnapshot.count({
     *   where: {
     *     // ... the filter for the PayslipSnapshots we want to count
     *   }
     * })
    **/
    count<T extends PayslipSnapshotCountArgs>(
      args?: Subset<T, PayslipSnapshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PayslipSnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PayslipSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayslipSnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PayslipSnapshotAggregateArgs>(args: Subset<T, PayslipSnapshotAggregateArgs>): Prisma.PrismaPromise<GetPayslipSnapshotAggregateType<T>>

    /**
     * Group by PayslipSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayslipSnapshotGroupByArgs} args - Group by arguments.
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
      T extends PayslipSnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PayslipSnapshotGroupByArgs['orderBy'] }
        : { orderBy?: PayslipSnapshotGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PayslipSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPayslipSnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PayslipSnapshot model
   */
  readonly fields: PayslipSnapshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PayslipSnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PayslipSnapshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the PayslipSnapshot model
   */
  interface PayslipSnapshotFieldRefs {
    readonly id: FieldRef<"PayslipSnapshot", 'String'>
    readonly tenantId: FieldRef<"PayslipSnapshot", 'String'>
    readonly employeeId: FieldRef<"PayslipSnapshot", 'String'>
    readonly periodStart: FieldRef<"PayslipSnapshot", 'DateTime'>
    readonly periodEnd: FieldRef<"PayslipSnapshot", 'DateTime'>
    readonly baseSalary: FieldRef<"PayslipSnapshot", 'Decimal'>
    readonly overtime: FieldRef<"PayslipSnapshot", 'Decimal'>
    readonly nightShift: FieldRef<"PayslipSnapshot", 'Decimal'>
    readonly holidays: FieldRef<"PayslipSnapshot", 'Decimal'>
    readonly commission: FieldRef<"PayslipSnapshot", 'Decimal'>
    readonly insuranceEmployee: FieldRef<"PayslipSnapshot", 'Decimal'>
    readonly insuranceEmployer: FieldRef<"PayslipSnapshot", 'Decimal'>
    readonly tax: FieldRef<"PayslipSnapshot", 'Decimal'>
    readonly netPay: FieldRef<"PayslipSnapshot", 'Decimal'>
    readonly breakdown: FieldRef<"PayslipSnapshot", 'Json'>
    readonly status: FieldRef<"PayslipSnapshot", 'PayslipStatus'>
    readonly finalizedAt: FieldRef<"PayslipSnapshot", 'DateTime'>
    readonly adjustmentReason: FieldRef<"PayslipSnapshot", 'String'>
    readonly correlationId: FieldRef<"PayslipSnapshot", 'String'>
    readonly supersededById: FieldRef<"PayslipSnapshot", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PayslipSnapshot findUnique
   */
  export type PayslipSnapshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayslipSnapshot
     */
    select?: PayslipSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayslipSnapshot
     */
    omit?: PayslipSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which PayslipSnapshot to fetch.
     */
    where: PayslipSnapshotWhereUniqueInput
  }

  /**
   * PayslipSnapshot findUniqueOrThrow
   */
  export type PayslipSnapshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayslipSnapshot
     */
    select?: PayslipSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayslipSnapshot
     */
    omit?: PayslipSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which PayslipSnapshot to fetch.
     */
    where: PayslipSnapshotWhereUniqueInput
  }

  /**
   * PayslipSnapshot findFirst
   */
  export type PayslipSnapshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayslipSnapshot
     */
    select?: PayslipSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayslipSnapshot
     */
    omit?: PayslipSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which PayslipSnapshot to fetch.
     */
    where?: PayslipSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PayslipSnapshots to fetch.
     */
    orderBy?: PayslipSnapshotOrderByWithRelationInput | PayslipSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PayslipSnapshots.
     */
    cursor?: PayslipSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PayslipSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PayslipSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PayslipSnapshots.
     */
    distinct?: PayslipSnapshotScalarFieldEnum | PayslipSnapshotScalarFieldEnum[]
  }

  /**
   * PayslipSnapshot findFirstOrThrow
   */
  export type PayslipSnapshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayslipSnapshot
     */
    select?: PayslipSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayslipSnapshot
     */
    omit?: PayslipSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which PayslipSnapshot to fetch.
     */
    where?: PayslipSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PayslipSnapshots to fetch.
     */
    orderBy?: PayslipSnapshotOrderByWithRelationInput | PayslipSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PayslipSnapshots.
     */
    cursor?: PayslipSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PayslipSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PayslipSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PayslipSnapshots.
     */
    distinct?: PayslipSnapshotScalarFieldEnum | PayslipSnapshotScalarFieldEnum[]
  }

  /**
   * PayslipSnapshot findMany
   */
  export type PayslipSnapshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayslipSnapshot
     */
    select?: PayslipSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayslipSnapshot
     */
    omit?: PayslipSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which PayslipSnapshots to fetch.
     */
    where?: PayslipSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PayslipSnapshots to fetch.
     */
    orderBy?: PayslipSnapshotOrderByWithRelationInput | PayslipSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PayslipSnapshots.
     */
    cursor?: PayslipSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PayslipSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PayslipSnapshots.
     */
    skip?: number
    distinct?: PayslipSnapshotScalarFieldEnum | PayslipSnapshotScalarFieldEnum[]
  }

  /**
   * PayslipSnapshot create
   */
  export type PayslipSnapshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayslipSnapshot
     */
    select?: PayslipSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayslipSnapshot
     */
    omit?: PayslipSnapshotOmit<ExtArgs> | null
    /**
     * The data needed to create a PayslipSnapshot.
     */
    data: XOR<PayslipSnapshotCreateInput, PayslipSnapshotUncheckedCreateInput>
  }

  /**
   * PayslipSnapshot createMany
   */
  export type PayslipSnapshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PayslipSnapshots.
     */
    data: PayslipSnapshotCreateManyInput | PayslipSnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PayslipSnapshot createManyAndReturn
   */
  export type PayslipSnapshotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayslipSnapshot
     */
    select?: PayslipSnapshotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PayslipSnapshot
     */
    omit?: PayslipSnapshotOmit<ExtArgs> | null
    /**
     * The data used to create many PayslipSnapshots.
     */
    data: PayslipSnapshotCreateManyInput | PayslipSnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PayslipSnapshot update
   */
  export type PayslipSnapshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayslipSnapshot
     */
    select?: PayslipSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayslipSnapshot
     */
    omit?: PayslipSnapshotOmit<ExtArgs> | null
    /**
     * The data needed to update a PayslipSnapshot.
     */
    data: XOR<PayslipSnapshotUpdateInput, PayslipSnapshotUncheckedUpdateInput>
    /**
     * Choose, which PayslipSnapshot to update.
     */
    where: PayslipSnapshotWhereUniqueInput
  }

  /**
   * PayslipSnapshot updateMany
   */
  export type PayslipSnapshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PayslipSnapshots.
     */
    data: XOR<PayslipSnapshotUpdateManyMutationInput, PayslipSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which PayslipSnapshots to update
     */
    where?: PayslipSnapshotWhereInput
    /**
     * Limit how many PayslipSnapshots to update.
     */
    limit?: number
  }

  /**
   * PayslipSnapshot updateManyAndReturn
   */
  export type PayslipSnapshotUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayslipSnapshot
     */
    select?: PayslipSnapshotSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PayslipSnapshot
     */
    omit?: PayslipSnapshotOmit<ExtArgs> | null
    /**
     * The data used to update PayslipSnapshots.
     */
    data: XOR<PayslipSnapshotUpdateManyMutationInput, PayslipSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which PayslipSnapshots to update
     */
    where?: PayslipSnapshotWhereInput
    /**
     * Limit how many PayslipSnapshots to update.
     */
    limit?: number
  }

  /**
   * PayslipSnapshot upsert
   */
  export type PayslipSnapshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayslipSnapshot
     */
    select?: PayslipSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayslipSnapshot
     */
    omit?: PayslipSnapshotOmit<ExtArgs> | null
    /**
     * The filter to search for the PayslipSnapshot to update in case it exists.
     */
    where: PayslipSnapshotWhereUniqueInput
    /**
     * In case the PayslipSnapshot found by the `where` argument doesn't exist, create a new PayslipSnapshot with this data.
     */
    create: XOR<PayslipSnapshotCreateInput, PayslipSnapshotUncheckedCreateInput>
    /**
     * In case the PayslipSnapshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PayslipSnapshotUpdateInput, PayslipSnapshotUncheckedUpdateInput>
  }

  /**
   * PayslipSnapshot delete
   */
  export type PayslipSnapshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayslipSnapshot
     */
    select?: PayslipSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayslipSnapshot
     */
    omit?: PayslipSnapshotOmit<ExtArgs> | null
    /**
     * Filter which PayslipSnapshot to delete.
     */
    where: PayslipSnapshotWhereUniqueInput
  }

  /**
   * PayslipSnapshot deleteMany
   */
  export type PayslipSnapshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PayslipSnapshots to delete
     */
    where?: PayslipSnapshotWhereInput
    /**
     * Limit how many PayslipSnapshots to delete.
     */
    limit?: number
  }

  /**
   * PayslipSnapshot without action
   */
  export type PayslipSnapshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayslipSnapshot
     */
    select?: PayslipSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayslipSnapshot
     */
    omit?: PayslipSnapshotOmit<ExtArgs> | null
  }


  /**
   * Model EmployeeCommission
   */

  export type AggregateEmployeeCommission = {
    _count: EmployeeCommissionCountAggregateOutputType | null
    _avg: EmployeeCommissionAvgAggregateOutputType | null
    _sum: EmployeeCommissionSumAggregateOutputType | null
    _min: EmployeeCommissionMinAggregateOutputType | null
    _max: EmployeeCommissionMaxAggregateOutputType | null
  }

  export type EmployeeCommissionAvgAggregateOutputType = {
    amount: Decimal | null
  }

  export type EmployeeCommissionSumAggregateOutputType = {
    amount: Decimal | null
  }

  export type EmployeeCommissionMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    employeeId: string | null
    sourceType: string | null
    sourceId: string | null
    amount: Decimal | null
    accruedAt: Date | null
    paidInPayslipId: string | null
  }

  export type EmployeeCommissionMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    employeeId: string | null
    sourceType: string | null
    sourceId: string | null
    amount: Decimal | null
    accruedAt: Date | null
    paidInPayslipId: string | null
  }

  export type EmployeeCommissionCountAggregateOutputType = {
    id: number
    tenantId: number
    employeeId: number
    sourceType: number
    sourceId: number
    amount: number
    accruedAt: number
    paidInPayslipId: number
    _all: number
  }


  export type EmployeeCommissionAvgAggregateInputType = {
    amount?: true
  }

  export type EmployeeCommissionSumAggregateInputType = {
    amount?: true
  }

  export type EmployeeCommissionMinAggregateInputType = {
    id?: true
    tenantId?: true
    employeeId?: true
    sourceType?: true
    sourceId?: true
    amount?: true
    accruedAt?: true
    paidInPayslipId?: true
  }

  export type EmployeeCommissionMaxAggregateInputType = {
    id?: true
    tenantId?: true
    employeeId?: true
    sourceType?: true
    sourceId?: true
    amount?: true
    accruedAt?: true
    paidInPayslipId?: true
  }

  export type EmployeeCommissionCountAggregateInputType = {
    id?: true
    tenantId?: true
    employeeId?: true
    sourceType?: true
    sourceId?: true
    amount?: true
    accruedAt?: true
    paidInPayslipId?: true
    _all?: true
  }

  export type EmployeeCommissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmployeeCommission to aggregate.
     */
    where?: EmployeeCommissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeCommissions to fetch.
     */
    orderBy?: EmployeeCommissionOrderByWithRelationInput | EmployeeCommissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmployeeCommissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeCommissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeCommissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmployeeCommissions
    **/
    _count?: true | EmployeeCommissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmployeeCommissionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmployeeCommissionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeeCommissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeeCommissionMaxAggregateInputType
  }

  export type GetEmployeeCommissionAggregateType<T extends EmployeeCommissionAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployeeCommission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployeeCommission[P]>
      : GetScalarType<T[P], AggregateEmployeeCommission[P]>
  }




  export type EmployeeCommissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeCommissionWhereInput
    orderBy?: EmployeeCommissionOrderByWithAggregationInput | EmployeeCommissionOrderByWithAggregationInput[]
    by: EmployeeCommissionScalarFieldEnum[] | EmployeeCommissionScalarFieldEnum
    having?: EmployeeCommissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeeCommissionCountAggregateInputType | true
    _avg?: EmployeeCommissionAvgAggregateInputType
    _sum?: EmployeeCommissionSumAggregateInputType
    _min?: EmployeeCommissionMinAggregateInputType
    _max?: EmployeeCommissionMaxAggregateInputType
  }

  export type EmployeeCommissionGroupByOutputType = {
    id: string
    tenantId: string
    employeeId: string
    sourceType: string
    sourceId: string
    amount: Decimal
    accruedAt: Date
    paidInPayslipId: string | null
    _count: EmployeeCommissionCountAggregateOutputType | null
    _avg: EmployeeCommissionAvgAggregateOutputType | null
    _sum: EmployeeCommissionSumAggregateOutputType | null
    _min: EmployeeCommissionMinAggregateOutputType | null
    _max: EmployeeCommissionMaxAggregateOutputType | null
  }

  type GetEmployeeCommissionGroupByPayload<T extends EmployeeCommissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployeeCommissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeeCommissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeeCommissionGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeeCommissionGroupByOutputType[P]>
        }
      >
    >


  export type EmployeeCommissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    employeeId?: boolean
    sourceType?: boolean
    sourceId?: boolean
    amount?: boolean
    accruedAt?: boolean
    paidInPayslipId?: boolean
  }, ExtArgs["result"]["employeeCommission"]>

  export type EmployeeCommissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    employeeId?: boolean
    sourceType?: boolean
    sourceId?: boolean
    amount?: boolean
    accruedAt?: boolean
    paidInPayslipId?: boolean
  }, ExtArgs["result"]["employeeCommission"]>

  export type EmployeeCommissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    employeeId?: boolean
    sourceType?: boolean
    sourceId?: boolean
    amount?: boolean
    accruedAt?: boolean
    paidInPayslipId?: boolean
  }, ExtArgs["result"]["employeeCommission"]>

  export type EmployeeCommissionSelectScalar = {
    id?: boolean
    tenantId?: boolean
    employeeId?: boolean
    sourceType?: boolean
    sourceId?: boolean
    amount?: boolean
    accruedAt?: boolean
    paidInPayslipId?: boolean
  }

  export type EmployeeCommissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "employeeId" | "sourceType" | "sourceId" | "amount" | "accruedAt" | "paidInPayslipId", ExtArgs["result"]["employeeCommission"]>

  export type $EmployeeCommissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmployeeCommission"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      employeeId: string
      sourceType: string
      sourceId: string
      amount: Prisma.Decimal
      accruedAt: Date
      paidInPayslipId: string | null
    }, ExtArgs["result"]["employeeCommission"]>
    composites: {}
  }

  type EmployeeCommissionGetPayload<S extends boolean | null | undefined | EmployeeCommissionDefaultArgs> = $Result.GetResult<Prisma.$EmployeeCommissionPayload, S>

  type EmployeeCommissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmployeeCommissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmployeeCommissionCountAggregateInputType | true
    }

  export interface EmployeeCommissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmployeeCommission'], meta: { name: 'EmployeeCommission' } }
    /**
     * Find zero or one EmployeeCommission that matches the filter.
     * @param {EmployeeCommissionFindUniqueArgs} args - Arguments to find a EmployeeCommission
     * @example
     * // Get one EmployeeCommission
     * const employeeCommission = await prisma.employeeCommission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmployeeCommissionFindUniqueArgs>(args: SelectSubset<T, EmployeeCommissionFindUniqueArgs<ExtArgs>>): Prisma__EmployeeCommissionClient<$Result.GetResult<Prisma.$EmployeeCommissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmployeeCommission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmployeeCommissionFindUniqueOrThrowArgs} args - Arguments to find a EmployeeCommission
     * @example
     * // Get one EmployeeCommission
     * const employeeCommission = await prisma.employeeCommission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmployeeCommissionFindUniqueOrThrowArgs>(args: SelectSubset<T, EmployeeCommissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmployeeCommissionClient<$Result.GetResult<Prisma.$EmployeeCommissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmployeeCommission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeCommissionFindFirstArgs} args - Arguments to find a EmployeeCommission
     * @example
     * // Get one EmployeeCommission
     * const employeeCommission = await prisma.employeeCommission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmployeeCommissionFindFirstArgs>(args?: SelectSubset<T, EmployeeCommissionFindFirstArgs<ExtArgs>>): Prisma__EmployeeCommissionClient<$Result.GetResult<Prisma.$EmployeeCommissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmployeeCommission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeCommissionFindFirstOrThrowArgs} args - Arguments to find a EmployeeCommission
     * @example
     * // Get one EmployeeCommission
     * const employeeCommission = await prisma.employeeCommission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmployeeCommissionFindFirstOrThrowArgs>(args?: SelectSubset<T, EmployeeCommissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmployeeCommissionClient<$Result.GetResult<Prisma.$EmployeeCommissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmployeeCommissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeCommissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmployeeCommissions
     * const employeeCommissions = await prisma.employeeCommission.findMany()
     * 
     * // Get first 10 EmployeeCommissions
     * const employeeCommissions = await prisma.employeeCommission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employeeCommissionWithIdOnly = await prisma.employeeCommission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmployeeCommissionFindManyArgs>(args?: SelectSubset<T, EmployeeCommissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeCommissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmployeeCommission.
     * @param {EmployeeCommissionCreateArgs} args - Arguments to create a EmployeeCommission.
     * @example
     * // Create one EmployeeCommission
     * const EmployeeCommission = await prisma.employeeCommission.create({
     *   data: {
     *     // ... data to create a EmployeeCommission
     *   }
     * })
     * 
     */
    create<T extends EmployeeCommissionCreateArgs>(args: SelectSubset<T, EmployeeCommissionCreateArgs<ExtArgs>>): Prisma__EmployeeCommissionClient<$Result.GetResult<Prisma.$EmployeeCommissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmployeeCommissions.
     * @param {EmployeeCommissionCreateManyArgs} args - Arguments to create many EmployeeCommissions.
     * @example
     * // Create many EmployeeCommissions
     * const employeeCommission = await prisma.employeeCommission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmployeeCommissionCreateManyArgs>(args?: SelectSubset<T, EmployeeCommissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmployeeCommissions and returns the data saved in the database.
     * @param {EmployeeCommissionCreateManyAndReturnArgs} args - Arguments to create many EmployeeCommissions.
     * @example
     * // Create many EmployeeCommissions
     * const employeeCommission = await prisma.employeeCommission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmployeeCommissions and only return the `id`
     * const employeeCommissionWithIdOnly = await prisma.employeeCommission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmployeeCommissionCreateManyAndReturnArgs>(args?: SelectSubset<T, EmployeeCommissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeCommissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmployeeCommission.
     * @param {EmployeeCommissionDeleteArgs} args - Arguments to delete one EmployeeCommission.
     * @example
     * // Delete one EmployeeCommission
     * const EmployeeCommission = await prisma.employeeCommission.delete({
     *   where: {
     *     // ... filter to delete one EmployeeCommission
     *   }
     * })
     * 
     */
    delete<T extends EmployeeCommissionDeleteArgs>(args: SelectSubset<T, EmployeeCommissionDeleteArgs<ExtArgs>>): Prisma__EmployeeCommissionClient<$Result.GetResult<Prisma.$EmployeeCommissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmployeeCommission.
     * @param {EmployeeCommissionUpdateArgs} args - Arguments to update one EmployeeCommission.
     * @example
     * // Update one EmployeeCommission
     * const employeeCommission = await prisma.employeeCommission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmployeeCommissionUpdateArgs>(args: SelectSubset<T, EmployeeCommissionUpdateArgs<ExtArgs>>): Prisma__EmployeeCommissionClient<$Result.GetResult<Prisma.$EmployeeCommissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmployeeCommissions.
     * @param {EmployeeCommissionDeleteManyArgs} args - Arguments to filter EmployeeCommissions to delete.
     * @example
     * // Delete a few EmployeeCommissions
     * const { count } = await prisma.employeeCommission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmployeeCommissionDeleteManyArgs>(args?: SelectSubset<T, EmployeeCommissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmployeeCommissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeCommissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmployeeCommissions
     * const employeeCommission = await prisma.employeeCommission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmployeeCommissionUpdateManyArgs>(args: SelectSubset<T, EmployeeCommissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmployeeCommissions and returns the data updated in the database.
     * @param {EmployeeCommissionUpdateManyAndReturnArgs} args - Arguments to update many EmployeeCommissions.
     * @example
     * // Update many EmployeeCommissions
     * const employeeCommission = await prisma.employeeCommission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmployeeCommissions and only return the `id`
     * const employeeCommissionWithIdOnly = await prisma.employeeCommission.updateManyAndReturn({
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
    updateManyAndReturn<T extends EmployeeCommissionUpdateManyAndReturnArgs>(args: SelectSubset<T, EmployeeCommissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeCommissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmployeeCommission.
     * @param {EmployeeCommissionUpsertArgs} args - Arguments to update or create a EmployeeCommission.
     * @example
     * // Update or create a EmployeeCommission
     * const employeeCommission = await prisma.employeeCommission.upsert({
     *   create: {
     *     // ... data to create a EmployeeCommission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmployeeCommission we want to update
     *   }
     * })
     */
    upsert<T extends EmployeeCommissionUpsertArgs>(args: SelectSubset<T, EmployeeCommissionUpsertArgs<ExtArgs>>): Prisma__EmployeeCommissionClient<$Result.GetResult<Prisma.$EmployeeCommissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmployeeCommissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeCommissionCountArgs} args - Arguments to filter EmployeeCommissions to count.
     * @example
     * // Count the number of EmployeeCommissions
     * const count = await prisma.employeeCommission.count({
     *   where: {
     *     // ... the filter for the EmployeeCommissions we want to count
     *   }
     * })
    **/
    count<T extends EmployeeCommissionCountArgs>(
      args?: Subset<T, EmployeeCommissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeCommissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmployeeCommission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeCommissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EmployeeCommissionAggregateArgs>(args: Subset<T, EmployeeCommissionAggregateArgs>): Prisma.PrismaPromise<GetEmployeeCommissionAggregateType<T>>

    /**
     * Group by EmployeeCommission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeCommissionGroupByArgs} args - Group by arguments.
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
      T extends EmployeeCommissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployeeCommissionGroupByArgs['orderBy'] }
        : { orderBy?: EmployeeCommissionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EmployeeCommissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeCommissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmployeeCommission model
   */
  readonly fields: EmployeeCommissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmployeeCommission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmployeeCommissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the EmployeeCommission model
   */
  interface EmployeeCommissionFieldRefs {
    readonly id: FieldRef<"EmployeeCommission", 'String'>
    readonly tenantId: FieldRef<"EmployeeCommission", 'String'>
    readonly employeeId: FieldRef<"EmployeeCommission", 'String'>
    readonly sourceType: FieldRef<"EmployeeCommission", 'String'>
    readonly sourceId: FieldRef<"EmployeeCommission", 'String'>
    readonly amount: FieldRef<"EmployeeCommission", 'Decimal'>
    readonly accruedAt: FieldRef<"EmployeeCommission", 'DateTime'>
    readonly paidInPayslipId: FieldRef<"EmployeeCommission", 'String'>
  }
    

  // Custom InputTypes
  /**
   * EmployeeCommission findUnique
   */
  export type EmployeeCommissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeCommission
     */
    select?: EmployeeCommissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeCommission
     */
    omit?: EmployeeCommissionOmit<ExtArgs> | null
    /**
     * Filter, which EmployeeCommission to fetch.
     */
    where: EmployeeCommissionWhereUniqueInput
  }

  /**
   * EmployeeCommission findUniqueOrThrow
   */
  export type EmployeeCommissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeCommission
     */
    select?: EmployeeCommissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeCommission
     */
    omit?: EmployeeCommissionOmit<ExtArgs> | null
    /**
     * Filter, which EmployeeCommission to fetch.
     */
    where: EmployeeCommissionWhereUniqueInput
  }

  /**
   * EmployeeCommission findFirst
   */
  export type EmployeeCommissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeCommission
     */
    select?: EmployeeCommissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeCommission
     */
    omit?: EmployeeCommissionOmit<ExtArgs> | null
    /**
     * Filter, which EmployeeCommission to fetch.
     */
    where?: EmployeeCommissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeCommissions to fetch.
     */
    orderBy?: EmployeeCommissionOrderByWithRelationInput | EmployeeCommissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmployeeCommissions.
     */
    cursor?: EmployeeCommissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeCommissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeCommissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployeeCommissions.
     */
    distinct?: EmployeeCommissionScalarFieldEnum | EmployeeCommissionScalarFieldEnum[]
  }

  /**
   * EmployeeCommission findFirstOrThrow
   */
  export type EmployeeCommissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeCommission
     */
    select?: EmployeeCommissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeCommission
     */
    omit?: EmployeeCommissionOmit<ExtArgs> | null
    /**
     * Filter, which EmployeeCommission to fetch.
     */
    where?: EmployeeCommissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeCommissions to fetch.
     */
    orderBy?: EmployeeCommissionOrderByWithRelationInput | EmployeeCommissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmployeeCommissions.
     */
    cursor?: EmployeeCommissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeCommissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeCommissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployeeCommissions.
     */
    distinct?: EmployeeCommissionScalarFieldEnum | EmployeeCommissionScalarFieldEnum[]
  }

  /**
   * EmployeeCommission findMany
   */
  export type EmployeeCommissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeCommission
     */
    select?: EmployeeCommissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeCommission
     */
    omit?: EmployeeCommissionOmit<ExtArgs> | null
    /**
     * Filter, which EmployeeCommissions to fetch.
     */
    where?: EmployeeCommissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeCommissions to fetch.
     */
    orderBy?: EmployeeCommissionOrderByWithRelationInput | EmployeeCommissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmployeeCommissions.
     */
    cursor?: EmployeeCommissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeCommissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeCommissions.
     */
    skip?: number
    distinct?: EmployeeCommissionScalarFieldEnum | EmployeeCommissionScalarFieldEnum[]
  }

  /**
   * EmployeeCommission create
   */
  export type EmployeeCommissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeCommission
     */
    select?: EmployeeCommissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeCommission
     */
    omit?: EmployeeCommissionOmit<ExtArgs> | null
    /**
     * The data needed to create a EmployeeCommission.
     */
    data: XOR<EmployeeCommissionCreateInput, EmployeeCommissionUncheckedCreateInput>
  }

  /**
   * EmployeeCommission createMany
   */
  export type EmployeeCommissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmployeeCommissions.
     */
    data: EmployeeCommissionCreateManyInput | EmployeeCommissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmployeeCommission createManyAndReturn
   */
  export type EmployeeCommissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeCommission
     */
    select?: EmployeeCommissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeCommission
     */
    omit?: EmployeeCommissionOmit<ExtArgs> | null
    /**
     * The data used to create many EmployeeCommissions.
     */
    data: EmployeeCommissionCreateManyInput | EmployeeCommissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmployeeCommission update
   */
  export type EmployeeCommissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeCommission
     */
    select?: EmployeeCommissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeCommission
     */
    omit?: EmployeeCommissionOmit<ExtArgs> | null
    /**
     * The data needed to update a EmployeeCommission.
     */
    data: XOR<EmployeeCommissionUpdateInput, EmployeeCommissionUncheckedUpdateInput>
    /**
     * Choose, which EmployeeCommission to update.
     */
    where: EmployeeCommissionWhereUniqueInput
  }

  /**
   * EmployeeCommission updateMany
   */
  export type EmployeeCommissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmployeeCommissions.
     */
    data: XOR<EmployeeCommissionUpdateManyMutationInput, EmployeeCommissionUncheckedUpdateManyInput>
    /**
     * Filter which EmployeeCommissions to update
     */
    where?: EmployeeCommissionWhereInput
    /**
     * Limit how many EmployeeCommissions to update.
     */
    limit?: number
  }

  /**
   * EmployeeCommission updateManyAndReturn
   */
  export type EmployeeCommissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeCommission
     */
    select?: EmployeeCommissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeCommission
     */
    omit?: EmployeeCommissionOmit<ExtArgs> | null
    /**
     * The data used to update EmployeeCommissions.
     */
    data: XOR<EmployeeCommissionUpdateManyMutationInput, EmployeeCommissionUncheckedUpdateManyInput>
    /**
     * Filter which EmployeeCommissions to update
     */
    where?: EmployeeCommissionWhereInput
    /**
     * Limit how many EmployeeCommissions to update.
     */
    limit?: number
  }

  /**
   * EmployeeCommission upsert
   */
  export type EmployeeCommissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeCommission
     */
    select?: EmployeeCommissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeCommission
     */
    omit?: EmployeeCommissionOmit<ExtArgs> | null
    /**
     * The filter to search for the EmployeeCommission to update in case it exists.
     */
    where: EmployeeCommissionWhereUniqueInput
    /**
     * In case the EmployeeCommission found by the `where` argument doesn't exist, create a new EmployeeCommission with this data.
     */
    create: XOR<EmployeeCommissionCreateInput, EmployeeCommissionUncheckedCreateInput>
    /**
     * In case the EmployeeCommission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmployeeCommissionUpdateInput, EmployeeCommissionUncheckedUpdateInput>
  }

  /**
   * EmployeeCommission delete
   */
  export type EmployeeCommissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeCommission
     */
    select?: EmployeeCommissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeCommission
     */
    omit?: EmployeeCommissionOmit<ExtArgs> | null
    /**
     * Filter which EmployeeCommission to delete.
     */
    where: EmployeeCommissionWhereUniqueInput
  }

  /**
   * EmployeeCommission deleteMany
   */
  export type EmployeeCommissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmployeeCommissions to delete
     */
    where?: EmployeeCommissionWhereInput
    /**
     * Limit how many EmployeeCommissions to delete.
     */
    limit?: number
  }

  /**
   * EmployeeCommission without action
   */
  export type EmployeeCommissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeCommission
     */
    select?: EmployeeCommissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeCommission
     */
    omit?: EmployeeCommissionOmit<ExtArgs> | null
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


  export const EmployeeScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    employeeNumber: 'employeeNumber',
    fullName: 'fullName',
    nationalId: 'nationalId',
    birthDate: 'birthDate',
    phone: 'phone',
    email: 'email',
    address: 'address',
    hireDate: 'hireDate',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type EmployeeScalarFieldEnum = (typeof EmployeeScalarFieldEnum)[keyof typeof EmployeeScalarFieldEnum]


  export const OrganizationalUnitScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    nameFa: 'nameFa',
    parentId: 'parentId'
  };

  export type OrganizationalUnitScalarFieldEnum = (typeof OrganizationalUnitScalarFieldEnum)[keyof typeof OrganizationalUnitScalarFieldEnum]


  export const PositionScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    nameFa: 'nameFa',
    orgUnitId: 'orgUnitId'
  };

  export type PositionScalarFieldEnum = (typeof PositionScalarFieldEnum)[keyof typeof PositionScalarFieldEnum]


  export const AttendanceRecordScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    employeeId: 'employeeId',
    date: 'date',
    checkIn: 'checkIn',
    checkOut: 'checkOut',
    status: 'status'
  };

  export type AttendanceRecordScalarFieldEnum = (typeof AttendanceRecordScalarFieldEnum)[keyof typeof AttendanceRecordScalarFieldEnum]


  export const EmployeeContractScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    employeeId: 'employeeId',
    startDate: 'startDate',
    endDate: 'endDate',
    salaryBase: 'salaryBase',
    currency: 'currency',
    status: 'status'
  };

  export type EmployeeContractScalarFieldEnum = (typeof EmployeeContractScalarFieldEnum)[keyof typeof EmployeeContractScalarFieldEnum]


  export const LeaveRequestScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    employeeId: 'employeeId',
    type: 'type',
    startDate: 'startDate',
    endDate: 'endDate',
    status: 'status',
    correlationId: 'correlationId'
  };

  export type LeaveRequestScalarFieldEnum = (typeof LeaveRequestScalarFieldEnum)[keyof typeof LeaveRequestScalarFieldEnum]


  export const PayrollRuleScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    nameFa: 'nameFa',
    effectiveFrom: 'effectiveFrom',
    effectiveTo: 'effectiveTo',
    config: 'config'
  };

  export type PayrollRuleScalarFieldEnum = (typeof PayrollRuleScalarFieldEnum)[keyof typeof PayrollRuleScalarFieldEnum]


  export const TaxBracketScalarFieldEnum: {
    id: 'id',
    country: 'country',
    effectiveYear: 'effectiveYear',
    minIncome: 'minIncome',
    maxIncome: 'maxIncome',
    rate: 'rate'
  };

  export type TaxBracketScalarFieldEnum = (typeof TaxBracketScalarFieldEnum)[keyof typeof TaxBracketScalarFieldEnum]


  export const InsuranceRuleScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    effectiveFrom: 'effectiveFrom',
    effectiveTo: 'effectiveTo',
    employeeRate: 'employeeRate',
    employerRate: 'employerRate',
    ceiling: 'ceiling'
  };

  export type InsuranceRuleScalarFieldEnum = (typeof InsuranceRuleScalarFieldEnum)[keyof typeof InsuranceRuleScalarFieldEnum]


  export const PayslipSnapshotScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    employeeId: 'employeeId',
    periodStart: 'periodStart',
    periodEnd: 'periodEnd',
    baseSalary: 'baseSalary',
    overtime: 'overtime',
    nightShift: 'nightShift',
    holidays: 'holidays',
    commission: 'commission',
    insuranceEmployee: 'insuranceEmployee',
    insuranceEmployer: 'insuranceEmployer',
    tax: 'tax',
    netPay: 'netPay',
    breakdown: 'breakdown',
    status: 'status',
    finalizedAt: 'finalizedAt',
    adjustmentReason: 'adjustmentReason',
    correlationId: 'correlationId',
    supersededById: 'supersededById'
  };

  export type PayslipSnapshotScalarFieldEnum = (typeof PayslipSnapshotScalarFieldEnum)[keyof typeof PayslipSnapshotScalarFieldEnum]


  export const EmployeeCommissionScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    employeeId: 'employeeId',
    sourceType: 'sourceType',
    sourceId: 'sourceId',
    amount: 'amount',
    accruedAt: 'accruedAt',
    paidInPayslipId: 'paidInPayslipId'
  };

  export type EmployeeCommissionScalarFieldEnum = (typeof EmployeeCommissionScalarFieldEnum)[keyof typeof EmployeeCommissionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'EmployeeStatus'
   */
  export type EnumEmployeeStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmployeeStatus'>
    


  /**
   * Reference to a field of type 'EmployeeStatus[]'
   */
  export type ListEnumEmployeeStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmployeeStatus[]'>
    


  /**
   * Reference to a field of type 'AttendanceStatus'
   */
  export type EnumAttendanceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AttendanceStatus'>
    


  /**
   * Reference to a field of type 'AttendanceStatus[]'
   */
  export type ListEnumAttendanceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AttendanceStatus[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'ContractStatus'
   */
  export type EnumContractStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ContractStatus'>
    


  /**
   * Reference to a field of type 'ContractStatus[]'
   */
  export type ListEnumContractStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ContractStatus[]'>
    


  /**
   * Reference to a field of type 'LeaveRequestStatus'
   */
  export type EnumLeaveRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LeaveRequestStatus'>
    


  /**
   * Reference to a field of type 'LeaveRequestStatus[]'
   */
  export type ListEnumLeaveRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LeaveRequestStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'PayslipStatus'
   */
  export type EnumPayslipStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PayslipStatus'>
    


  /**
   * Reference to a field of type 'PayslipStatus[]'
   */
  export type ListEnumPayslipStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PayslipStatus[]'>
    


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


  export type EmployeeWhereInput = {
    AND?: EmployeeWhereInput | EmployeeWhereInput[]
    OR?: EmployeeWhereInput[]
    NOT?: EmployeeWhereInput | EmployeeWhereInput[]
    id?: StringFilter<"Employee"> | string
    tenantId?: StringFilter<"Employee"> | string
    employeeNumber?: StringFilter<"Employee"> | string
    fullName?: StringFilter<"Employee"> | string
    nationalId?: StringFilter<"Employee"> | string
    birthDate?: DateTimeFilter<"Employee"> | Date | string
    phone?: StringNullableFilter<"Employee"> | string | null
    email?: StringNullableFilter<"Employee"> | string | null
    address?: StringNullableFilter<"Employee"> | string | null
    hireDate?: DateTimeFilter<"Employee"> | Date | string
    status?: EnumEmployeeStatusFilter<"Employee"> | $Enums.EmployeeStatus
    createdAt?: DateTimeFilter<"Employee"> | Date | string
    leaveRequests?: LeaveRequestListRelationFilter
    attendanceRecords?: AttendanceRecordListRelationFilter
    contracts?: EmployeeContractListRelationFilter
  }

  export type EmployeeOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    employeeNumber?: SortOrder
    fullName?: SortOrder
    nationalId?: SortOrder
    birthDate?: SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    hireDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    leaveRequests?: LeaveRequestOrderByRelationAggregateInput
    attendanceRecords?: AttendanceRecordOrderByRelationAggregateInput
    contracts?: EmployeeContractOrderByRelationAggregateInput
  }

  export type EmployeeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_employeeNumber?: EmployeeTenantIdEmployeeNumberCompoundUniqueInput
    AND?: EmployeeWhereInput | EmployeeWhereInput[]
    OR?: EmployeeWhereInput[]
    NOT?: EmployeeWhereInput | EmployeeWhereInput[]
    tenantId?: StringFilter<"Employee"> | string
    employeeNumber?: StringFilter<"Employee"> | string
    fullName?: StringFilter<"Employee"> | string
    nationalId?: StringFilter<"Employee"> | string
    birthDate?: DateTimeFilter<"Employee"> | Date | string
    phone?: StringNullableFilter<"Employee"> | string | null
    email?: StringNullableFilter<"Employee"> | string | null
    address?: StringNullableFilter<"Employee"> | string | null
    hireDate?: DateTimeFilter<"Employee"> | Date | string
    status?: EnumEmployeeStatusFilter<"Employee"> | $Enums.EmployeeStatus
    createdAt?: DateTimeFilter<"Employee"> | Date | string
    leaveRequests?: LeaveRequestListRelationFilter
    attendanceRecords?: AttendanceRecordListRelationFilter
    contracts?: EmployeeContractListRelationFilter
  }, "id" | "tenantId_employeeNumber">

  export type EmployeeOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    employeeNumber?: SortOrder
    fullName?: SortOrder
    nationalId?: SortOrder
    birthDate?: SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    hireDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: EmployeeCountOrderByAggregateInput
    _max?: EmployeeMaxOrderByAggregateInput
    _min?: EmployeeMinOrderByAggregateInput
  }

  export type EmployeeScalarWhereWithAggregatesInput = {
    AND?: EmployeeScalarWhereWithAggregatesInput | EmployeeScalarWhereWithAggregatesInput[]
    OR?: EmployeeScalarWhereWithAggregatesInput[]
    NOT?: EmployeeScalarWhereWithAggregatesInput | EmployeeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Employee"> | string
    tenantId?: StringWithAggregatesFilter<"Employee"> | string
    employeeNumber?: StringWithAggregatesFilter<"Employee"> | string
    fullName?: StringWithAggregatesFilter<"Employee"> | string
    nationalId?: StringWithAggregatesFilter<"Employee"> | string
    birthDate?: DateTimeWithAggregatesFilter<"Employee"> | Date | string
    phone?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    email?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    address?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    hireDate?: DateTimeWithAggregatesFilter<"Employee"> | Date | string
    status?: EnumEmployeeStatusWithAggregatesFilter<"Employee"> | $Enums.EmployeeStatus
    createdAt?: DateTimeWithAggregatesFilter<"Employee"> | Date | string
  }

  export type OrganizationalUnitWhereInput = {
    AND?: OrganizationalUnitWhereInput | OrganizationalUnitWhereInput[]
    OR?: OrganizationalUnitWhereInput[]
    NOT?: OrganizationalUnitWhereInput | OrganizationalUnitWhereInput[]
    id?: StringFilter<"OrganizationalUnit"> | string
    tenantId?: StringFilter<"OrganizationalUnit"> | string
    code?: StringFilter<"OrganizationalUnit"> | string
    nameFa?: StringFilter<"OrganizationalUnit"> | string
    parentId?: StringNullableFilter<"OrganizationalUnit"> | string | null
    parent?: XOR<OrganizationalUnitNullableScalarRelationFilter, OrganizationalUnitWhereInput> | null
    children?: OrganizationalUnitListRelationFilter
    positions?: PositionListRelationFilter
  }

  export type OrganizationalUnitOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    code?: SortOrder
    nameFa?: SortOrder
    parentId?: SortOrderInput | SortOrder
    parent?: OrganizationalUnitOrderByWithRelationInput
    children?: OrganizationalUnitOrderByRelationAggregateInput
    positions?: PositionOrderByRelationAggregateInput
  }

  export type OrganizationalUnitWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_code?: OrganizationalUnitTenantIdCodeCompoundUniqueInput
    AND?: OrganizationalUnitWhereInput | OrganizationalUnitWhereInput[]
    OR?: OrganizationalUnitWhereInput[]
    NOT?: OrganizationalUnitWhereInput | OrganizationalUnitWhereInput[]
    tenantId?: StringFilter<"OrganizationalUnit"> | string
    code?: StringFilter<"OrganizationalUnit"> | string
    nameFa?: StringFilter<"OrganizationalUnit"> | string
    parentId?: StringNullableFilter<"OrganizationalUnit"> | string | null
    parent?: XOR<OrganizationalUnitNullableScalarRelationFilter, OrganizationalUnitWhereInput> | null
    children?: OrganizationalUnitListRelationFilter
    positions?: PositionListRelationFilter
  }, "id" | "tenantId_code">

  export type OrganizationalUnitOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    code?: SortOrder
    nameFa?: SortOrder
    parentId?: SortOrderInput | SortOrder
    _count?: OrganizationalUnitCountOrderByAggregateInput
    _max?: OrganizationalUnitMaxOrderByAggregateInput
    _min?: OrganizationalUnitMinOrderByAggregateInput
  }

  export type OrganizationalUnitScalarWhereWithAggregatesInput = {
    AND?: OrganizationalUnitScalarWhereWithAggregatesInput | OrganizationalUnitScalarWhereWithAggregatesInput[]
    OR?: OrganizationalUnitScalarWhereWithAggregatesInput[]
    NOT?: OrganizationalUnitScalarWhereWithAggregatesInput | OrganizationalUnitScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrganizationalUnit"> | string
    tenantId?: StringWithAggregatesFilter<"OrganizationalUnit"> | string
    code?: StringWithAggregatesFilter<"OrganizationalUnit"> | string
    nameFa?: StringWithAggregatesFilter<"OrganizationalUnit"> | string
    parentId?: StringNullableWithAggregatesFilter<"OrganizationalUnit"> | string | null
  }

  export type PositionWhereInput = {
    AND?: PositionWhereInput | PositionWhereInput[]
    OR?: PositionWhereInput[]
    NOT?: PositionWhereInput | PositionWhereInput[]
    id?: StringFilter<"Position"> | string
    tenantId?: StringFilter<"Position"> | string
    code?: StringFilter<"Position"> | string
    nameFa?: StringFilter<"Position"> | string
    orgUnitId?: StringFilter<"Position"> | string
    orgUnit?: XOR<OrganizationalUnitScalarRelationFilter, OrganizationalUnitWhereInput>
  }

  export type PositionOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    code?: SortOrder
    nameFa?: SortOrder
    orgUnitId?: SortOrder
    orgUnit?: OrganizationalUnitOrderByWithRelationInput
  }

  export type PositionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_code?: PositionTenantIdCodeCompoundUniqueInput
    AND?: PositionWhereInput | PositionWhereInput[]
    OR?: PositionWhereInput[]
    NOT?: PositionWhereInput | PositionWhereInput[]
    tenantId?: StringFilter<"Position"> | string
    code?: StringFilter<"Position"> | string
    nameFa?: StringFilter<"Position"> | string
    orgUnitId?: StringFilter<"Position"> | string
    orgUnit?: XOR<OrganizationalUnitScalarRelationFilter, OrganizationalUnitWhereInput>
  }, "id" | "tenantId_code">

  export type PositionOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    code?: SortOrder
    nameFa?: SortOrder
    orgUnitId?: SortOrder
    _count?: PositionCountOrderByAggregateInput
    _max?: PositionMaxOrderByAggregateInput
    _min?: PositionMinOrderByAggregateInput
  }

  export type PositionScalarWhereWithAggregatesInput = {
    AND?: PositionScalarWhereWithAggregatesInput | PositionScalarWhereWithAggregatesInput[]
    OR?: PositionScalarWhereWithAggregatesInput[]
    NOT?: PositionScalarWhereWithAggregatesInput | PositionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Position"> | string
    tenantId?: StringWithAggregatesFilter<"Position"> | string
    code?: StringWithAggregatesFilter<"Position"> | string
    nameFa?: StringWithAggregatesFilter<"Position"> | string
    orgUnitId?: StringWithAggregatesFilter<"Position"> | string
  }

  export type AttendanceRecordWhereInput = {
    AND?: AttendanceRecordWhereInput | AttendanceRecordWhereInput[]
    OR?: AttendanceRecordWhereInput[]
    NOT?: AttendanceRecordWhereInput | AttendanceRecordWhereInput[]
    id?: StringFilter<"AttendanceRecord"> | string
    tenantId?: StringFilter<"AttendanceRecord"> | string
    employeeId?: StringFilter<"AttendanceRecord"> | string
    date?: DateTimeFilter<"AttendanceRecord"> | Date | string
    checkIn?: DateTimeNullableFilter<"AttendanceRecord"> | Date | string | null
    checkOut?: DateTimeNullableFilter<"AttendanceRecord"> | Date | string | null
    status?: EnumAttendanceStatusFilter<"AttendanceRecord"> | $Enums.AttendanceStatus
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }

  export type AttendanceRecordOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    employeeId?: SortOrder
    date?: SortOrder
    checkIn?: SortOrderInput | SortOrder
    checkOut?: SortOrderInput | SortOrder
    status?: SortOrder
    employee?: EmployeeOrderByWithRelationInput
  }

  export type AttendanceRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_employeeId_date?: AttendanceRecordTenantIdEmployeeIdDateCompoundUniqueInput
    AND?: AttendanceRecordWhereInput | AttendanceRecordWhereInput[]
    OR?: AttendanceRecordWhereInput[]
    NOT?: AttendanceRecordWhereInput | AttendanceRecordWhereInput[]
    tenantId?: StringFilter<"AttendanceRecord"> | string
    employeeId?: StringFilter<"AttendanceRecord"> | string
    date?: DateTimeFilter<"AttendanceRecord"> | Date | string
    checkIn?: DateTimeNullableFilter<"AttendanceRecord"> | Date | string | null
    checkOut?: DateTimeNullableFilter<"AttendanceRecord"> | Date | string | null
    status?: EnumAttendanceStatusFilter<"AttendanceRecord"> | $Enums.AttendanceStatus
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }, "id" | "tenantId_employeeId_date">

  export type AttendanceRecordOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    employeeId?: SortOrder
    date?: SortOrder
    checkIn?: SortOrderInput | SortOrder
    checkOut?: SortOrderInput | SortOrder
    status?: SortOrder
    _count?: AttendanceRecordCountOrderByAggregateInput
    _max?: AttendanceRecordMaxOrderByAggregateInput
    _min?: AttendanceRecordMinOrderByAggregateInput
  }

  export type AttendanceRecordScalarWhereWithAggregatesInput = {
    AND?: AttendanceRecordScalarWhereWithAggregatesInput | AttendanceRecordScalarWhereWithAggregatesInput[]
    OR?: AttendanceRecordScalarWhereWithAggregatesInput[]
    NOT?: AttendanceRecordScalarWhereWithAggregatesInput | AttendanceRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AttendanceRecord"> | string
    tenantId?: StringWithAggregatesFilter<"AttendanceRecord"> | string
    employeeId?: StringWithAggregatesFilter<"AttendanceRecord"> | string
    date?: DateTimeWithAggregatesFilter<"AttendanceRecord"> | Date | string
    checkIn?: DateTimeNullableWithAggregatesFilter<"AttendanceRecord"> | Date | string | null
    checkOut?: DateTimeNullableWithAggregatesFilter<"AttendanceRecord"> | Date | string | null
    status?: EnumAttendanceStatusWithAggregatesFilter<"AttendanceRecord"> | $Enums.AttendanceStatus
  }

  export type EmployeeContractWhereInput = {
    AND?: EmployeeContractWhereInput | EmployeeContractWhereInput[]
    OR?: EmployeeContractWhereInput[]
    NOT?: EmployeeContractWhereInput | EmployeeContractWhereInput[]
    id?: StringFilter<"EmployeeContract"> | string
    tenantId?: StringFilter<"EmployeeContract"> | string
    employeeId?: StringFilter<"EmployeeContract"> | string
    startDate?: DateTimeFilter<"EmployeeContract"> | Date | string
    endDate?: DateTimeNullableFilter<"EmployeeContract"> | Date | string | null
    salaryBase?: DecimalFilter<"EmployeeContract"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"EmployeeContract"> | string
    status?: EnumContractStatusFilter<"EmployeeContract"> | $Enums.ContractStatus
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }

  export type EmployeeContractOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    employeeId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    salaryBase?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    employee?: EmployeeOrderByWithRelationInput
  }

  export type EmployeeContractWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EmployeeContractWhereInput | EmployeeContractWhereInput[]
    OR?: EmployeeContractWhereInput[]
    NOT?: EmployeeContractWhereInput | EmployeeContractWhereInput[]
    tenantId?: StringFilter<"EmployeeContract"> | string
    employeeId?: StringFilter<"EmployeeContract"> | string
    startDate?: DateTimeFilter<"EmployeeContract"> | Date | string
    endDate?: DateTimeNullableFilter<"EmployeeContract"> | Date | string | null
    salaryBase?: DecimalFilter<"EmployeeContract"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"EmployeeContract"> | string
    status?: EnumContractStatusFilter<"EmployeeContract"> | $Enums.ContractStatus
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }, "id">

  export type EmployeeContractOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    employeeId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    salaryBase?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    _count?: EmployeeContractCountOrderByAggregateInput
    _avg?: EmployeeContractAvgOrderByAggregateInput
    _max?: EmployeeContractMaxOrderByAggregateInput
    _min?: EmployeeContractMinOrderByAggregateInput
    _sum?: EmployeeContractSumOrderByAggregateInput
  }

  export type EmployeeContractScalarWhereWithAggregatesInput = {
    AND?: EmployeeContractScalarWhereWithAggregatesInput | EmployeeContractScalarWhereWithAggregatesInput[]
    OR?: EmployeeContractScalarWhereWithAggregatesInput[]
    NOT?: EmployeeContractScalarWhereWithAggregatesInput | EmployeeContractScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmployeeContract"> | string
    tenantId?: StringWithAggregatesFilter<"EmployeeContract"> | string
    employeeId?: StringWithAggregatesFilter<"EmployeeContract"> | string
    startDate?: DateTimeWithAggregatesFilter<"EmployeeContract"> | Date | string
    endDate?: DateTimeNullableWithAggregatesFilter<"EmployeeContract"> | Date | string | null
    salaryBase?: DecimalWithAggregatesFilter<"EmployeeContract"> | Decimal | DecimalJsLike | number | string
    currency?: StringWithAggregatesFilter<"EmployeeContract"> | string
    status?: EnumContractStatusWithAggregatesFilter<"EmployeeContract"> | $Enums.ContractStatus
  }

  export type LeaveRequestWhereInput = {
    AND?: LeaveRequestWhereInput | LeaveRequestWhereInput[]
    OR?: LeaveRequestWhereInput[]
    NOT?: LeaveRequestWhereInput | LeaveRequestWhereInput[]
    id?: StringFilter<"LeaveRequest"> | string
    tenantId?: StringFilter<"LeaveRequest"> | string
    employeeId?: StringFilter<"LeaveRequest"> | string
    type?: StringFilter<"LeaveRequest"> | string
    startDate?: DateTimeFilter<"LeaveRequest"> | Date | string
    endDate?: DateTimeFilter<"LeaveRequest"> | Date | string
    status?: EnumLeaveRequestStatusFilter<"LeaveRequest"> | $Enums.LeaveRequestStatus
    correlationId?: StringFilter<"LeaveRequest"> | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }

  export type LeaveRequestOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    employeeId?: SortOrder
    type?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    correlationId?: SortOrder
    employee?: EmployeeOrderByWithRelationInput
  }

  export type LeaveRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LeaveRequestWhereInput | LeaveRequestWhereInput[]
    OR?: LeaveRequestWhereInput[]
    NOT?: LeaveRequestWhereInput | LeaveRequestWhereInput[]
    tenantId?: StringFilter<"LeaveRequest"> | string
    employeeId?: StringFilter<"LeaveRequest"> | string
    type?: StringFilter<"LeaveRequest"> | string
    startDate?: DateTimeFilter<"LeaveRequest"> | Date | string
    endDate?: DateTimeFilter<"LeaveRequest"> | Date | string
    status?: EnumLeaveRequestStatusFilter<"LeaveRequest"> | $Enums.LeaveRequestStatus
    correlationId?: StringFilter<"LeaveRequest"> | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }, "id">

  export type LeaveRequestOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    employeeId?: SortOrder
    type?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    correlationId?: SortOrder
    _count?: LeaveRequestCountOrderByAggregateInput
    _max?: LeaveRequestMaxOrderByAggregateInput
    _min?: LeaveRequestMinOrderByAggregateInput
  }

  export type LeaveRequestScalarWhereWithAggregatesInput = {
    AND?: LeaveRequestScalarWhereWithAggregatesInput | LeaveRequestScalarWhereWithAggregatesInput[]
    OR?: LeaveRequestScalarWhereWithAggregatesInput[]
    NOT?: LeaveRequestScalarWhereWithAggregatesInput | LeaveRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LeaveRequest"> | string
    tenantId?: StringWithAggregatesFilter<"LeaveRequest"> | string
    employeeId?: StringWithAggregatesFilter<"LeaveRequest"> | string
    type?: StringWithAggregatesFilter<"LeaveRequest"> | string
    startDate?: DateTimeWithAggregatesFilter<"LeaveRequest"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"LeaveRequest"> | Date | string
    status?: EnumLeaveRequestStatusWithAggregatesFilter<"LeaveRequest"> | $Enums.LeaveRequestStatus
    correlationId?: StringWithAggregatesFilter<"LeaveRequest"> | string
  }

  export type PayrollRuleWhereInput = {
    AND?: PayrollRuleWhereInput | PayrollRuleWhereInput[]
    OR?: PayrollRuleWhereInput[]
    NOT?: PayrollRuleWhereInput | PayrollRuleWhereInput[]
    id?: StringFilter<"PayrollRule"> | string
    tenantId?: StringFilter<"PayrollRule"> | string
    code?: StringFilter<"PayrollRule"> | string
    nameFa?: StringFilter<"PayrollRule"> | string
    effectiveFrom?: DateTimeFilter<"PayrollRule"> | Date | string
    effectiveTo?: DateTimeNullableFilter<"PayrollRule"> | Date | string | null
    config?: JsonFilter<"PayrollRule">
  }

  export type PayrollRuleOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    code?: SortOrder
    nameFa?: SortOrder
    effectiveFrom?: SortOrder
    effectiveTo?: SortOrderInput | SortOrder
    config?: SortOrder
  }

  export type PayrollRuleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_code_effectiveFrom?: PayrollRuleTenantIdCodeEffectiveFromCompoundUniqueInput
    AND?: PayrollRuleWhereInput | PayrollRuleWhereInput[]
    OR?: PayrollRuleWhereInput[]
    NOT?: PayrollRuleWhereInput | PayrollRuleWhereInput[]
    tenantId?: StringFilter<"PayrollRule"> | string
    code?: StringFilter<"PayrollRule"> | string
    nameFa?: StringFilter<"PayrollRule"> | string
    effectiveFrom?: DateTimeFilter<"PayrollRule"> | Date | string
    effectiveTo?: DateTimeNullableFilter<"PayrollRule"> | Date | string | null
    config?: JsonFilter<"PayrollRule">
  }, "id" | "tenantId_code_effectiveFrom">

  export type PayrollRuleOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    code?: SortOrder
    nameFa?: SortOrder
    effectiveFrom?: SortOrder
    effectiveTo?: SortOrderInput | SortOrder
    config?: SortOrder
    _count?: PayrollRuleCountOrderByAggregateInput
    _max?: PayrollRuleMaxOrderByAggregateInput
    _min?: PayrollRuleMinOrderByAggregateInput
  }

  export type PayrollRuleScalarWhereWithAggregatesInput = {
    AND?: PayrollRuleScalarWhereWithAggregatesInput | PayrollRuleScalarWhereWithAggregatesInput[]
    OR?: PayrollRuleScalarWhereWithAggregatesInput[]
    NOT?: PayrollRuleScalarWhereWithAggregatesInput | PayrollRuleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PayrollRule"> | string
    tenantId?: StringWithAggregatesFilter<"PayrollRule"> | string
    code?: StringWithAggregatesFilter<"PayrollRule"> | string
    nameFa?: StringWithAggregatesFilter<"PayrollRule"> | string
    effectiveFrom?: DateTimeWithAggregatesFilter<"PayrollRule"> | Date | string
    effectiveTo?: DateTimeNullableWithAggregatesFilter<"PayrollRule"> | Date | string | null
    config?: JsonWithAggregatesFilter<"PayrollRule">
  }

  export type TaxBracketWhereInput = {
    AND?: TaxBracketWhereInput | TaxBracketWhereInput[]
    OR?: TaxBracketWhereInput[]
    NOT?: TaxBracketWhereInput | TaxBracketWhereInput[]
    id?: StringFilter<"TaxBracket"> | string
    country?: StringFilter<"TaxBracket"> | string
    effectiveYear?: IntFilter<"TaxBracket"> | number
    minIncome?: DecimalFilter<"TaxBracket"> | Decimal | DecimalJsLike | number | string
    maxIncome?: DecimalNullableFilter<"TaxBracket"> | Decimal | DecimalJsLike | number | string | null
    rate?: DecimalFilter<"TaxBracket"> | Decimal | DecimalJsLike | number | string
  }

  export type TaxBracketOrderByWithRelationInput = {
    id?: SortOrder
    country?: SortOrder
    effectiveYear?: SortOrder
    minIncome?: SortOrder
    maxIncome?: SortOrderInput | SortOrder
    rate?: SortOrder
  }

  export type TaxBracketWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TaxBracketWhereInput | TaxBracketWhereInput[]
    OR?: TaxBracketWhereInput[]
    NOT?: TaxBracketWhereInput | TaxBracketWhereInput[]
    country?: StringFilter<"TaxBracket"> | string
    effectiveYear?: IntFilter<"TaxBracket"> | number
    minIncome?: DecimalFilter<"TaxBracket"> | Decimal | DecimalJsLike | number | string
    maxIncome?: DecimalNullableFilter<"TaxBracket"> | Decimal | DecimalJsLike | number | string | null
    rate?: DecimalFilter<"TaxBracket"> | Decimal | DecimalJsLike | number | string
  }, "id">

  export type TaxBracketOrderByWithAggregationInput = {
    id?: SortOrder
    country?: SortOrder
    effectiveYear?: SortOrder
    minIncome?: SortOrder
    maxIncome?: SortOrderInput | SortOrder
    rate?: SortOrder
    _count?: TaxBracketCountOrderByAggregateInput
    _avg?: TaxBracketAvgOrderByAggregateInput
    _max?: TaxBracketMaxOrderByAggregateInput
    _min?: TaxBracketMinOrderByAggregateInput
    _sum?: TaxBracketSumOrderByAggregateInput
  }

  export type TaxBracketScalarWhereWithAggregatesInput = {
    AND?: TaxBracketScalarWhereWithAggregatesInput | TaxBracketScalarWhereWithAggregatesInput[]
    OR?: TaxBracketScalarWhereWithAggregatesInput[]
    NOT?: TaxBracketScalarWhereWithAggregatesInput | TaxBracketScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TaxBracket"> | string
    country?: StringWithAggregatesFilter<"TaxBracket"> | string
    effectiveYear?: IntWithAggregatesFilter<"TaxBracket"> | number
    minIncome?: DecimalWithAggregatesFilter<"TaxBracket"> | Decimal | DecimalJsLike | number | string
    maxIncome?: DecimalNullableWithAggregatesFilter<"TaxBracket"> | Decimal | DecimalJsLike | number | string | null
    rate?: DecimalWithAggregatesFilter<"TaxBracket"> | Decimal | DecimalJsLike | number | string
  }

  export type InsuranceRuleWhereInput = {
    AND?: InsuranceRuleWhereInput | InsuranceRuleWhereInput[]
    OR?: InsuranceRuleWhereInput[]
    NOT?: InsuranceRuleWhereInput | InsuranceRuleWhereInput[]
    id?: StringFilter<"InsuranceRule"> | string
    tenantId?: StringFilter<"InsuranceRule"> | string
    effectiveFrom?: DateTimeFilter<"InsuranceRule"> | Date | string
    effectiveTo?: DateTimeNullableFilter<"InsuranceRule"> | Date | string | null
    employeeRate?: DecimalFilter<"InsuranceRule"> | Decimal | DecimalJsLike | number | string
    employerRate?: DecimalFilter<"InsuranceRule"> | Decimal | DecimalJsLike | number | string
    ceiling?: DecimalFilter<"InsuranceRule"> | Decimal | DecimalJsLike | number | string
  }

  export type InsuranceRuleOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    effectiveFrom?: SortOrder
    effectiveTo?: SortOrderInput | SortOrder
    employeeRate?: SortOrder
    employerRate?: SortOrder
    ceiling?: SortOrder
  }

  export type InsuranceRuleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InsuranceRuleWhereInput | InsuranceRuleWhereInput[]
    OR?: InsuranceRuleWhereInput[]
    NOT?: InsuranceRuleWhereInput | InsuranceRuleWhereInput[]
    tenantId?: StringFilter<"InsuranceRule"> | string
    effectiveFrom?: DateTimeFilter<"InsuranceRule"> | Date | string
    effectiveTo?: DateTimeNullableFilter<"InsuranceRule"> | Date | string | null
    employeeRate?: DecimalFilter<"InsuranceRule"> | Decimal | DecimalJsLike | number | string
    employerRate?: DecimalFilter<"InsuranceRule"> | Decimal | DecimalJsLike | number | string
    ceiling?: DecimalFilter<"InsuranceRule"> | Decimal | DecimalJsLike | number | string
  }, "id">

  export type InsuranceRuleOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    effectiveFrom?: SortOrder
    effectiveTo?: SortOrderInput | SortOrder
    employeeRate?: SortOrder
    employerRate?: SortOrder
    ceiling?: SortOrder
    _count?: InsuranceRuleCountOrderByAggregateInput
    _avg?: InsuranceRuleAvgOrderByAggregateInput
    _max?: InsuranceRuleMaxOrderByAggregateInput
    _min?: InsuranceRuleMinOrderByAggregateInput
    _sum?: InsuranceRuleSumOrderByAggregateInput
  }

  export type InsuranceRuleScalarWhereWithAggregatesInput = {
    AND?: InsuranceRuleScalarWhereWithAggregatesInput | InsuranceRuleScalarWhereWithAggregatesInput[]
    OR?: InsuranceRuleScalarWhereWithAggregatesInput[]
    NOT?: InsuranceRuleScalarWhereWithAggregatesInput | InsuranceRuleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"InsuranceRule"> | string
    tenantId?: StringWithAggregatesFilter<"InsuranceRule"> | string
    effectiveFrom?: DateTimeWithAggregatesFilter<"InsuranceRule"> | Date | string
    effectiveTo?: DateTimeNullableWithAggregatesFilter<"InsuranceRule"> | Date | string | null
    employeeRate?: DecimalWithAggregatesFilter<"InsuranceRule"> | Decimal | DecimalJsLike | number | string
    employerRate?: DecimalWithAggregatesFilter<"InsuranceRule"> | Decimal | DecimalJsLike | number | string
    ceiling?: DecimalWithAggregatesFilter<"InsuranceRule"> | Decimal | DecimalJsLike | number | string
  }

  export type PayslipSnapshotWhereInput = {
    AND?: PayslipSnapshotWhereInput | PayslipSnapshotWhereInput[]
    OR?: PayslipSnapshotWhereInput[]
    NOT?: PayslipSnapshotWhereInput | PayslipSnapshotWhereInput[]
    id?: StringFilter<"PayslipSnapshot"> | string
    tenantId?: StringFilter<"PayslipSnapshot"> | string
    employeeId?: StringFilter<"PayslipSnapshot"> | string
    periodStart?: DateTimeFilter<"PayslipSnapshot"> | Date | string
    periodEnd?: DateTimeFilter<"PayslipSnapshot"> | Date | string
    baseSalary?: DecimalFilter<"PayslipSnapshot"> | Decimal | DecimalJsLike | number | string
    overtime?: DecimalFilter<"PayslipSnapshot"> | Decimal | DecimalJsLike | number | string
    nightShift?: DecimalFilter<"PayslipSnapshot"> | Decimal | DecimalJsLike | number | string
    holidays?: DecimalFilter<"PayslipSnapshot"> | Decimal | DecimalJsLike | number | string
    commission?: DecimalFilter<"PayslipSnapshot"> | Decimal | DecimalJsLike | number | string
    insuranceEmployee?: DecimalFilter<"PayslipSnapshot"> | Decimal | DecimalJsLike | number | string
    insuranceEmployer?: DecimalFilter<"PayslipSnapshot"> | Decimal | DecimalJsLike | number | string
    tax?: DecimalFilter<"PayslipSnapshot"> | Decimal | DecimalJsLike | number | string
    netPay?: DecimalFilter<"PayslipSnapshot"> | Decimal | DecimalJsLike | number | string
    breakdown?: JsonFilter<"PayslipSnapshot">
    status?: EnumPayslipStatusFilter<"PayslipSnapshot"> | $Enums.PayslipStatus
    finalizedAt?: DateTimeNullableFilter<"PayslipSnapshot"> | Date | string | null
    adjustmentReason?: StringNullableFilter<"PayslipSnapshot"> | string | null
    correlationId?: StringFilter<"PayslipSnapshot"> | string
    supersededById?: StringNullableFilter<"PayslipSnapshot"> | string | null
  }

  export type PayslipSnapshotOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    employeeId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    baseSalary?: SortOrder
    overtime?: SortOrder
    nightShift?: SortOrder
    holidays?: SortOrder
    commission?: SortOrder
    insuranceEmployee?: SortOrder
    insuranceEmployer?: SortOrder
    tax?: SortOrder
    netPay?: SortOrder
    breakdown?: SortOrder
    status?: SortOrder
    finalizedAt?: SortOrderInput | SortOrder
    adjustmentReason?: SortOrderInput | SortOrder
    correlationId?: SortOrder
    supersededById?: SortOrderInput | SortOrder
  }

  export type PayslipSnapshotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PayslipSnapshotWhereInput | PayslipSnapshotWhereInput[]
    OR?: PayslipSnapshotWhereInput[]
    NOT?: PayslipSnapshotWhereInput | PayslipSnapshotWhereInput[]
    tenantId?: StringFilter<"PayslipSnapshot"> | string
    employeeId?: StringFilter<"PayslipSnapshot"> | string
    periodStart?: DateTimeFilter<"PayslipSnapshot"> | Date | string
    periodEnd?: DateTimeFilter<"PayslipSnapshot"> | Date | string
    baseSalary?: DecimalFilter<"PayslipSnapshot"> | Decimal | DecimalJsLike | number | string
    overtime?: DecimalFilter<"PayslipSnapshot"> | Decimal | DecimalJsLike | number | string
    nightShift?: DecimalFilter<"PayslipSnapshot"> | Decimal | DecimalJsLike | number | string
    holidays?: DecimalFilter<"PayslipSnapshot"> | Decimal | DecimalJsLike | number | string
    commission?: DecimalFilter<"PayslipSnapshot"> | Decimal | DecimalJsLike | number | string
    insuranceEmployee?: DecimalFilter<"PayslipSnapshot"> | Decimal | DecimalJsLike | number | string
    insuranceEmployer?: DecimalFilter<"PayslipSnapshot"> | Decimal | DecimalJsLike | number | string
    tax?: DecimalFilter<"PayslipSnapshot"> | Decimal | DecimalJsLike | number | string
    netPay?: DecimalFilter<"PayslipSnapshot"> | Decimal | DecimalJsLike | number | string
    breakdown?: JsonFilter<"PayslipSnapshot">
    status?: EnumPayslipStatusFilter<"PayslipSnapshot"> | $Enums.PayslipStatus
    finalizedAt?: DateTimeNullableFilter<"PayslipSnapshot"> | Date | string | null
    adjustmentReason?: StringNullableFilter<"PayslipSnapshot"> | string | null
    correlationId?: StringFilter<"PayslipSnapshot"> | string
    supersededById?: StringNullableFilter<"PayslipSnapshot"> | string | null
  }, "id">

  export type PayslipSnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    employeeId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    baseSalary?: SortOrder
    overtime?: SortOrder
    nightShift?: SortOrder
    holidays?: SortOrder
    commission?: SortOrder
    insuranceEmployee?: SortOrder
    insuranceEmployer?: SortOrder
    tax?: SortOrder
    netPay?: SortOrder
    breakdown?: SortOrder
    status?: SortOrder
    finalizedAt?: SortOrderInput | SortOrder
    adjustmentReason?: SortOrderInput | SortOrder
    correlationId?: SortOrder
    supersededById?: SortOrderInput | SortOrder
    _count?: PayslipSnapshotCountOrderByAggregateInput
    _avg?: PayslipSnapshotAvgOrderByAggregateInput
    _max?: PayslipSnapshotMaxOrderByAggregateInput
    _min?: PayslipSnapshotMinOrderByAggregateInput
    _sum?: PayslipSnapshotSumOrderByAggregateInput
  }

  export type PayslipSnapshotScalarWhereWithAggregatesInput = {
    AND?: PayslipSnapshotScalarWhereWithAggregatesInput | PayslipSnapshotScalarWhereWithAggregatesInput[]
    OR?: PayslipSnapshotScalarWhereWithAggregatesInput[]
    NOT?: PayslipSnapshotScalarWhereWithAggregatesInput | PayslipSnapshotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PayslipSnapshot"> | string
    tenantId?: StringWithAggregatesFilter<"PayslipSnapshot"> | string
    employeeId?: StringWithAggregatesFilter<"PayslipSnapshot"> | string
    periodStart?: DateTimeWithAggregatesFilter<"PayslipSnapshot"> | Date | string
    periodEnd?: DateTimeWithAggregatesFilter<"PayslipSnapshot"> | Date | string
    baseSalary?: DecimalWithAggregatesFilter<"PayslipSnapshot"> | Decimal | DecimalJsLike | number | string
    overtime?: DecimalWithAggregatesFilter<"PayslipSnapshot"> | Decimal | DecimalJsLike | number | string
    nightShift?: DecimalWithAggregatesFilter<"PayslipSnapshot"> | Decimal | DecimalJsLike | number | string
    holidays?: DecimalWithAggregatesFilter<"PayslipSnapshot"> | Decimal | DecimalJsLike | number | string
    commission?: DecimalWithAggregatesFilter<"PayslipSnapshot"> | Decimal | DecimalJsLike | number | string
    insuranceEmployee?: DecimalWithAggregatesFilter<"PayslipSnapshot"> | Decimal | DecimalJsLike | number | string
    insuranceEmployer?: DecimalWithAggregatesFilter<"PayslipSnapshot"> | Decimal | DecimalJsLike | number | string
    tax?: DecimalWithAggregatesFilter<"PayslipSnapshot"> | Decimal | DecimalJsLike | number | string
    netPay?: DecimalWithAggregatesFilter<"PayslipSnapshot"> | Decimal | DecimalJsLike | number | string
    breakdown?: JsonWithAggregatesFilter<"PayslipSnapshot">
    status?: EnumPayslipStatusWithAggregatesFilter<"PayslipSnapshot"> | $Enums.PayslipStatus
    finalizedAt?: DateTimeNullableWithAggregatesFilter<"PayslipSnapshot"> | Date | string | null
    adjustmentReason?: StringNullableWithAggregatesFilter<"PayslipSnapshot"> | string | null
    correlationId?: StringWithAggregatesFilter<"PayslipSnapshot"> | string
    supersededById?: StringNullableWithAggregatesFilter<"PayslipSnapshot"> | string | null
  }

  export type EmployeeCommissionWhereInput = {
    AND?: EmployeeCommissionWhereInput | EmployeeCommissionWhereInput[]
    OR?: EmployeeCommissionWhereInput[]
    NOT?: EmployeeCommissionWhereInput | EmployeeCommissionWhereInput[]
    id?: StringFilter<"EmployeeCommission"> | string
    tenantId?: StringFilter<"EmployeeCommission"> | string
    employeeId?: StringFilter<"EmployeeCommission"> | string
    sourceType?: StringFilter<"EmployeeCommission"> | string
    sourceId?: StringFilter<"EmployeeCommission"> | string
    amount?: DecimalFilter<"EmployeeCommission"> | Decimal | DecimalJsLike | number | string
    accruedAt?: DateTimeFilter<"EmployeeCommission"> | Date | string
    paidInPayslipId?: StringNullableFilter<"EmployeeCommission"> | string | null
  }

  export type EmployeeCommissionOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    employeeId?: SortOrder
    sourceType?: SortOrder
    sourceId?: SortOrder
    amount?: SortOrder
    accruedAt?: SortOrder
    paidInPayslipId?: SortOrderInput | SortOrder
  }

  export type EmployeeCommissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EmployeeCommissionWhereInput | EmployeeCommissionWhereInput[]
    OR?: EmployeeCommissionWhereInput[]
    NOT?: EmployeeCommissionWhereInput | EmployeeCommissionWhereInput[]
    tenantId?: StringFilter<"EmployeeCommission"> | string
    employeeId?: StringFilter<"EmployeeCommission"> | string
    sourceType?: StringFilter<"EmployeeCommission"> | string
    sourceId?: StringFilter<"EmployeeCommission"> | string
    amount?: DecimalFilter<"EmployeeCommission"> | Decimal | DecimalJsLike | number | string
    accruedAt?: DateTimeFilter<"EmployeeCommission"> | Date | string
    paidInPayslipId?: StringNullableFilter<"EmployeeCommission"> | string | null
  }, "id">

  export type EmployeeCommissionOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    employeeId?: SortOrder
    sourceType?: SortOrder
    sourceId?: SortOrder
    amount?: SortOrder
    accruedAt?: SortOrder
    paidInPayslipId?: SortOrderInput | SortOrder
    _count?: EmployeeCommissionCountOrderByAggregateInput
    _avg?: EmployeeCommissionAvgOrderByAggregateInput
    _max?: EmployeeCommissionMaxOrderByAggregateInput
    _min?: EmployeeCommissionMinOrderByAggregateInput
    _sum?: EmployeeCommissionSumOrderByAggregateInput
  }

  export type EmployeeCommissionScalarWhereWithAggregatesInput = {
    AND?: EmployeeCommissionScalarWhereWithAggregatesInput | EmployeeCommissionScalarWhereWithAggregatesInput[]
    OR?: EmployeeCommissionScalarWhereWithAggregatesInput[]
    NOT?: EmployeeCommissionScalarWhereWithAggregatesInput | EmployeeCommissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmployeeCommission"> | string
    tenantId?: StringWithAggregatesFilter<"EmployeeCommission"> | string
    employeeId?: StringWithAggregatesFilter<"EmployeeCommission"> | string
    sourceType?: StringWithAggregatesFilter<"EmployeeCommission"> | string
    sourceId?: StringWithAggregatesFilter<"EmployeeCommission"> | string
    amount?: DecimalWithAggregatesFilter<"EmployeeCommission"> | Decimal | DecimalJsLike | number | string
    accruedAt?: DateTimeWithAggregatesFilter<"EmployeeCommission"> | Date | string
    paidInPayslipId?: StringNullableWithAggregatesFilter<"EmployeeCommission"> | string | null
  }

  export type EmployeeCreateInput = {
    id?: string
    tenantId: string
    employeeNumber: string
    fullName: string
    nationalId: string
    birthDate: Date | string
    phone?: string | null
    email?: string | null
    address?: string | null
    hireDate: Date | string
    status?: $Enums.EmployeeStatus
    createdAt?: Date | string
    leaveRequests?: LeaveRequestCreateNestedManyWithoutEmployeeInput
    attendanceRecords?: AttendanceRecordCreateNestedManyWithoutEmployeeInput
    contracts?: EmployeeContractCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateInput = {
    id?: string
    tenantId: string
    employeeNumber: string
    fullName: string
    nationalId: string
    birthDate: Date | string
    phone?: string | null
    email?: string | null
    address?: string | null
    hireDate: Date | string
    status?: $Enums.EmployeeStatus
    createdAt?: Date | string
    leaveRequests?: LeaveRequestUncheckedCreateNestedManyWithoutEmployeeInput
    attendanceRecords?: AttendanceRecordUncheckedCreateNestedManyWithoutEmployeeInput
    contracts?: EmployeeContractUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    employeeNumber?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    nationalId?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    hireDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leaveRequests?: LeaveRequestUpdateManyWithoutEmployeeNestedInput
    attendanceRecords?: AttendanceRecordUpdateManyWithoutEmployeeNestedInput
    contracts?: EmployeeContractUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    employeeNumber?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    nationalId?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    hireDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leaveRequests?: LeaveRequestUncheckedUpdateManyWithoutEmployeeNestedInput
    attendanceRecords?: AttendanceRecordUncheckedUpdateManyWithoutEmployeeNestedInput
    contracts?: EmployeeContractUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeCreateManyInput = {
    id?: string
    tenantId: string
    employeeNumber: string
    fullName: string
    nationalId: string
    birthDate: Date | string
    phone?: string | null
    email?: string | null
    address?: string | null
    hireDate: Date | string
    status?: $Enums.EmployeeStatus
    createdAt?: Date | string
  }

  export type EmployeeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    employeeNumber?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    nationalId?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    hireDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    employeeNumber?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    nationalId?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    hireDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationalUnitCreateInput = {
    id?: string
    tenantId: string
    code: string
    nameFa: string
    parent?: OrganizationalUnitCreateNestedOneWithoutChildrenInput
    children?: OrganizationalUnitCreateNestedManyWithoutParentInput
    positions?: PositionCreateNestedManyWithoutOrgUnitInput
  }

  export type OrganizationalUnitUncheckedCreateInput = {
    id?: string
    tenantId: string
    code: string
    nameFa: string
    parentId?: string | null
    children?: OrganizationalUnitUncheckedCreateNestedManyWithoutParentInput
    positions?: PositionUncheckedCreateNestedManyWithoutOrgUnitInput
  }

  export type OrganizationalUnitUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameFa?: StringFieldUpdateOperationsInput | string
    parent?: OrganizationalUnitUpdateOneWithoutChildrenNestedInput
    children?: OrganizationalUnitUpdateManyWithoutParentNestedInput
    positions?: PositionUpdateManyWithoutOrgUnitNestedInput
  }

  export type OrganizationalUnitUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameFa?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    children?: OrganizationalUnitUncheckedUpdateManyWithoutParentNestedInput
    positions?: PositionUncheckedUpdateManyWithoutOrgUnitNestedInput
  }

  export type OrganizationalUnitCreateManyInput = {
    id?: string
    tenantId: string
    code: string
    nameFa: string
    parentId?: string | null
  }

  export type OrganizationalUnitUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameFa?: StringFieldUpdateOperationsInput | string
  }

  export type OrganizationalUnitUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameFa?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PositionCreateInput = {
    id?: string
    tenantId: string
    code: string
    nameFa: string
    orgUnit: OrganizationalUnitCreateNestedOneWithoutPositionsInput
  }

  export type PositionUncheckedCreateInput = {
    id?: string
    tenantId: string
    code: string
    nameFa: string
    orgUnitId: string
  }

  export type PositionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameFa?: StringFieldUpdateOperationsInput | string
    orgUnit?: OrganizationalUnitUpdateOneRequiredWithoutPositionsNestedInput
  }

  export type PositionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameFa?: StringFieldUpdateOperationsInput | string
    orgUnitId?: StringFieldUpdateOperationsInput | string
  }

  export type PositionCreateManyInput = {
    id?: string
    tenantId: string
    code: string
    nameFa: string
    orgUnitId: string
  }

  export type PositionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameFa?: StringFieldUpdateOperationsInput | string
  }

  export type PositionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameFa?: StringFieldUpdateOperationsInput | string
    orgUnitId?: StringFieldUpdateOperationsInput | string
  }

  export type AttendanceRecordCreateInput = {
    id?: string
    tenantId: string
    date: Date | string
    checkIn?: Date | string | null
    checkOut?: Date | string | null
    status?: $Enums.AttendanceStatus
    employee: EmployeeCreateNestedOneWithoutAttendanceRecordsInput
  }

  export type AttendanceRecordUncheckedCreateInput = {
    id?: string
    tenantId: string
    employeeId: string
    date: Date | string
    checkIn?: Date | string | null
    checkOut?: Date | string | null
    status?: $Enums.AttendanceStatus
  }

  export type AttendanceRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    checkIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus
    employee?: EmployeeUpdateOneRequiredWithoutAttendanceRecordsNestedInput
  }

  export type AttendanceRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    checkIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus
  }

  export type AttendanceRecordCreateManyInput = {
    id?: string
    tenantId: string
    employeeId: string
    date: Date | string
    checkIn?: Date | string | null
    checkOut?: Date | string | null
    status?: $Enums.AttendanceStatus
  }

  export type AttendanceRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    checkIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus
  }

  export type AttendanceRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    checkIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus
  }

  export type EmployeeContractCreateInput = {
    id?: string
    tenantId: string
    startDate: Date | string
    endDate?: Date | string | null
    salaryBase: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: $Enums.ContractStatus
    employee: EmployeeCreateNestedOneWithoutContractsInput
  }

  export type EmployeeContractUncheckedCreateInput = {
    id?: string
    tenantId: string
    employeeId: string
    startDate: Date | string
    endDate?: Date | string | null
    salaryBase: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: $Enums.ContractStatus
  }

  export type EmployeeContractUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    salaryBase?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumContractStatusFieldUpdateOperationsInput | $Enums.ContractStatus
    employee?: EmployeeUpdateOneRequiredWithoutContractsNestedInput
  }

  export type EmployeeContractUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    salaryBase?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumContractStatusFieldUpdateOperationsInput | $Enums.ContractStatus
  }

  export type EmployeeContractCreateManyInput = {
    id?: string
    tenantId: string
    employeeId: string
    startDate: Date | string
    endDate?: Date | string | null
    salaryBase: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: $Enums.ContractStatus
  }

  export type EmployeeContractUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    salaryBase?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumContractStatusFieldUpdateOperationsInput | $Enums.ContractStatus
  }

  export type EmployeeContractUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    salaryBase?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumContractStatusFieldUpdateOperationsInput | $Enums.ContractStatus
  }

  export type LeaveRequestCreateInput = {
    id?: string
    tenantId: string
    type: string
    startDate: Date | string
    endDate: Date | string
    status?: $Enums.LeaveRequestStatus
    correlationId: string
    employee: EmployeeCreateNestedOneWithoutLeaveRequestsInput
  }

  export type LeaveRequestUncheckedCreateInput = {
    id?: string
    tenantId: string
    employeeId: string
    type: string
    startDate: Date | string
    endDate: Date | string
    status?: $Enums.LeaveRequestStatus
    correlationId: string
  }

  export type LeaveRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLeaveRequestStatusFieldUpdateOperationsInput | $Enums.LeaveRequestStatus
    correlationId?: StringFieldUpdateOperationsInput | string
    employee?: EmployeeUpdateOneRequiredWithoutLeaveRequestsNestedInput
  }

  export type LeaveRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLeaveRequestStatusFieldUpdateOperationsInput | $Enums.LeaveRequestStatus
    correlationId?: StringFieldUpdateOperationsInput | string
  }

  export type LeaveRequestCreateManyInput = {
    id?: string
    tenantId: string
    employeeId: string
    type: string
    startDate: Date | string
    endDate: Date | string
    status?: $Enums.LeaveRequestStatus
    correlationId: string
  }

  export type LeaveRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLeaveRequestStatusFieldUpdateOperationsInput | $Enums.LeaveRequestStatus
    correlationId?: StringFieldUpdateOperationsInput | string
  }

  export type LeaveRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLeaveRequestStatusFieldUpdateOperationsInput | $Enums.LeaveRequestStatus
    correlationId?: StringFieldUpdateOperationsInput | string
  }

  export type PayrollRuleCreateInput = {
    id?: string
    tenantId: string
    code: string
    nameFa: string
    effectiveFrom: Date | string
    effectiveTo?: Date | string | null
    config: JsonNullValueInput | InputJsonValue
  }

  export type PayrollRuleUncheckedCreateInput = {
    id?: string
    tenantId: string
    code: string
    nameFa: string
    effectiveFrom: Date | string
    effectiveTo?: Date | string | null
    config: JsonNullValueInput | InputJsonValue
  }

  export type PayrollRuleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameFa?: StringFieldUpdateOperationsInput | string
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    config?: JsonNullValueInput | InputJsonValue
  }

  export type PayrollRuleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameFa?: StringFieldUpdateOperationsInput | string
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    config?: JsonNullValueInput | InputJsonValue
  }

  export type PayrollRuleCreateManyInput = {
    id?: string
    tenantId: string
    code: string
    nameFa: string
    effectiveFrom: Date | string
    effectiveTo?: Date | string | null
    config: JsonNullValueInput | InputJsonValue
  }

  export type PayrollRuleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameFa?: StringFieldUpdateOperationsInput | string
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    config?: JsonNullValueInput | InputJsonValue
  }

  export type PayrollRuleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameFa?: StringFieldUpdateOperationsInput | string
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    config?: JsonNullValueInput | InputJsonValue
  }

  export type TaxBracketCreateInput = {
    id?: string
    country?: string
    effectiveYear: number
    minIncome: Decimal | DecimalJsLike | number | string
    maxIncome?: Decimal | DecimalJsLike | number | string | null
    rate: Decimal | DecimalJsLike | number | string
  }

  export type TaxBracketUncheckedCreateInput = {
    id?: string
    country?: string
    effectiveYear: number
    minIncome: Decimal | DecimalJsLike | number | string
    maxIncome?: Decimal | DecimalJsLike | number | string | null
    rate: Decimal | DecimalJsLike | number | string
  }

  export type TaxBracketUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    effectiveYear?: IntFieldUpdateOperationsInput | number
    minIncome?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxIncome?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type TaxBracketUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    effectiveYear?: IntFieldUpdateOperationsInput | number
    minIncome?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxIncome?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type TaxBracketCreateManyInput = {
    id?: string
    country?: string
    effectiveYear: number
    minIncome: Decimal | DecimalJsLike | number | string
    maxIncome?: Decimal | DecimalJsLike | number | string | null
    rate: Decimal | DecimalJsLike | number | string
  }

  export type TaxBracketUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    effectiveYear?: IntFieldUpdateOperationsInput | number
    minIncome?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxIncome?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type TaxBracketUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    effectiveYear?: IntFieldUpdateOperationsInput | number
    minIncome?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxIncome?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type InsuranceRuleCreateInput = {
    id?: string
    tenantId: string
    effectiveFrom: Date | string
    effectiveTo?: Date | string | null
    employeeRate: Decimal | DecimalJsLike | number | string
    employerRate: Decimal | DecimalJsLike | number | string
    ceiling: Decimal | DecimalJsLike | number | string
  }

  export type InsuranceRuleUncheckedCreateInput = {
    id?: string
    tenantId: string
    effectiveFrom: Date | string
    effectiveTo?: Date | string | null
    employeeRate: Decimal | DecimalJsLike | number | string
    employerRate: Decimal | DecimalJsLike | number | string
    ceiling: Decimal | DecimalJsLike | number | string
  }

  export type InsuranceRuleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    employerRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ceiling?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type InsuranceRuleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    employerRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ceiling?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type InsuranceRuleCreateManyInput = {
    id?: string
    tenantId: string
    effectiveFrom: Date | string
    effectiveTo?: Date | string | null
    employeeRate: Decimal | DecimalJsLike | number | string
    employerRate: Decimal | DecimalJsLike | number | string
    ceiling: Decimal | DecimalJsLike | number | string
  }

  export type InsuranceRuleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    employerRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ceiling?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type InsuranceRuleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    employerRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ceiling?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type PayslipSnapshotCreateInput = {
    id?: string
    tenantId: string
    employeeId: string
    periodStart: Date | string
    periodEnd: Date | string
    baseSalary: Decimal | DecimalJsLike | number | string
    overtime?: Decimal | DecimalJsLike | number | string
    nightShift?: Decimal | DecimalJsLike | number | string
    holidays?: Decimal | DecimalJsLike | number | string
    commission?: Decimal | DecimalJsLike | number | string
    insuranceEmployee: Decimal | DecimalJsLike | number | string
    insuranceEmployer: Decimal | DecimalJsLike | number | string
    tax: Decimal | DecimalJsLike | number | string
    netPay: Decimal | DecimalJsLike | number | string
    breakdown: JsonNullValueInput | InputJsonValue
    status?: $Enums.PayslipStatus
    finalizedAt?: Date | string | null
    adjustmentReason?: string | null
    correlationId: string
    supersededById?: string | null
  }

  export type PayslipSnapshotUncheckedCreateInput = {
    id?: string
    tenantId: string
    employeeId: string
    periodStart: Date | string
    periodEnd: Date | string
    baseSalary: Decimal | DecimalJsLike | number | string
    overtime?: Decimal | DecimalJsLike | number | string
    nightShift?: Decimal | DecimalJsLike | number | string
    holidays?: Decimal | DecimalJsLike | number | string
    commission?: Decimal | DecimalJsLike | number | string
    insuranceEmployee: Decimal | DecimalJsLike | number | string
    insuranceEmployer: Decimal | DecimalJsLike | number | string
    tax: Decimal | DecimalJsLike | number | string
    netPay: Decimal | DecimalJsLike | number | string
    breakdown: JsonNullValueInput | InputJsonValue
    status?: $Enums.PayslipStatus
    finalizedAt?: Date | string | null
    adjustmentReason?: string | null
    correlationId: string
    supersededById?: string | null
  }

  export type PayslipSnapshotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    baseSalary?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    overtime?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    nightShift?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    holidays?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    commission?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    insuranceEmployee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    insuranceEmployer?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tax?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    breakdown?: JsonNullValueInput | InputJsonValue
    status?: EnumPayslipStatusFieldUpdateOperationsInput | $Enums.PayslipStatus
    finalizedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    adjustmentReason?: NullableStringFieldUpdateOperationsInput | string | null
    correlationId?: StringFieldUpdateOperationsInput | string
    supersededById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PayslipSnapshotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    baseSalary?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    overtime?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    nightShift?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    holidays?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    commission?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    insuranceEmployee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    insuranceEmployer?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tax?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    breakdown?: JsonNullValueInput | InputJsonValue
    status?: EnumPayslipStatusFieldUpdateOperationsInput | $Enums.PayslipStatus
    finalizedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    adjustmentReason?: NullableStringFieldUpdateOperationsInput | string | null
    correlationId?: StringFieldUpdateOperationsInput | string
    supersededById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PayslipSnapshotCreateManyInput = {
    id?: string
    tenantId: string
    employeeId: string
    periodStart: Date | string
    periodEnd: Date | string
    baseSalary: Decimal | DecimalJsLike | number | string
    overtime?: Decimal | DecimalJsLike | number | string
    nightShift?: Decimal | DecimalJsLike | number | string
    holidays?: Decimal | DecimalJsLike | number | string
    commission?: Decimal | DecimalJsLike | number | string
    insuranceEmployee: Decimal | DecimalJsLike | number | string
    insuranceEmployer: Decimal | DecimalJsLike | number | string
    tax: Decimal | DecimalJsLike | number | string
    netPay: Decimal | DecimalJsLike | number | string
    breakdown: JsonNullValueInput | InputJsonValue
    status?: $Enums.PayslipStatus
    finalizedAt?: Date | string | null
    adjustmentReason?: string | null
    correlationId: string
    supersededById?: string | null
  }

  export type PayslipSnapshotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    baseSalary?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    overtime?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    nightShift?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    holidays?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    commission?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    insuranceEmployee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    insuranceEmployer?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tax?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    breakdown?: JsonNullValueInput | InputJsonValue
    status?: EnumPayslipStatusFieldUpdateOperationsInput | $Enums.PayslipStatus
    finalizedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    adjustmentReason?: NullableStringFieldUpdateOperationsInput | string | null
    correlationId?: StringFieldUpdateOperationsInput | string
    supersededById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PayslipSnapshotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    baseSalary?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    overtime?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    nightShift?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    holidays?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    commission?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    insuranceEmployee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    insuranceEmployer?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tax?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    netPay?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    breakdown?: JsonNullValueInput | InputJsonValue
    status?: EnumPayslipStatusFieldUpdateOperationsInput | $Enums.PayslipStatus
    finalizedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    adjustmentReason?: NullableStringFieldUpdateOperationsInput | string | null
    correlationId?: StringFieldUpdateOperationsInput | string
    supersededById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EmployeeCommissionCreateInput = {
    id?: string
    tenantId: string
    employeeId: string
    sourceType: string
    sourceId: string
    amount: Decimal | DecimalJsLike | number | string
    accruedAt: Date | string
    paidInPayslipId?: string | null
  }

  export type EmployeeCommissionUncheckedCreateInput = {
    id?: string
    tenantId: string
    employeeId: string
    sourceType: string
    sourceId: string
    amount: Decimal | DecimalJsLike | number | string
    accruedAt: Date | string
    paidInPayslipId?: string | null
  }

  export type EmployeeCommissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    sourceType?: StringFieldUpdateOperationsInput | string
    sourceId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    accruedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidInPayslipId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EmployeeCommissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    sourceType?: StringFieldUpdateOperationsInput | string
    sourceId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    accruedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidInPayslipId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EmployeeCommissionCreateManyInput = {
    id?: string
    tenantId: string
    employeeId: string
    sourceType: string
    sourceId: string
    amount: Decimal | DecimalJsLike | number | string
    accruedAt: Date | string
    paidInPayslipId?: string | null
  }

  export type EmployeeCommissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    sourceType?: StringFieldUpdateOperationsInput | string
    sourceId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    accruedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidInPayslipId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EmployeeCommissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    sourceType?: StringFieldUpdateOperationsInput | string
    sourceId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    accruedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidInPayslipId?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type EnumEmployeeStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EmployeeStatus | EnumEmployeeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EmployeeStatus[] | ListEnumEmployeeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmployeeStatus[] | ListEnumEmployeeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEmployeeStatusFilter<$PrismaModel> | $Enums.EmployeeStatus
  }

  export type LeaveRequestListRelationFilter = {
    every?: LeaveRequestWhereInput
    some?: LeaveRequestWhereInput
    none?: LeaveRequestWhereInput
  }

  export type AttendanceRecordListRelationFilter = {
    every?: AttendanceRecordWhereInput
    some?: AttendanceRecordWhereInput
    none?: AttendanceRecordWhereInput
  }

  export type EmployeeContractListRelationFilter = {
    every?: EmployeeContractWhereInput
    some?: EmployeeContractWhereInput
    none?: EmployeeContractWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type LeaveRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AttendanceRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmployeeContractOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmployeeTenantIdEmployeeNumberCompoundUniqueInput = {
    tenantId: string
    employeeNumber: string
  }

  export type EmployeeCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    employeeNumber?: SortOrder
    fullName?: SortOrder
    nationalId?: SortOrder
    birthDate?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    hireDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type EmployeeMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    employeeNumber?: SortOrder
    fullName?: SortOrder
    nationalId?: SortOrder
    birthDate?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    hireDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type EmployeeMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    employeeNumber?: SortOrder
    fullName?: SortOrder
    nationalId?: SortOrder
    birthDate?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    hireDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
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

  export type EnumEmployeeStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EmployeeStatus | EnumEmployeeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EmployeeStatus[] | ListEnumEmployeeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmployeeStatus[] | ListEnumEmployeeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEmployeeStatusWithAggregatesFilter<$PrismaModel> | $Enums.EmployeeStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEmployeeStatusFilter<$PrismaModel>
    _max?: NestedEnumEmployeeStatusFilter<$PrismaModel>
  }

  export type OrganizationalUnitNullableScalarRelationFilter = {
    is?: OrganizationalUnitWhereInput | null
    isNot?: OrganizationalUnitWhereInput | null
  }

  export type OrganizationalUnitListRelationFilter = {
    every?: OrganizationalUnitWhereInput
    some?: OrganizationalUnitWhereInput
    none?: OrganizationalUnitWhereInput
  }

  export type PositionListRelationFilter = {
    every?: PositionWhereInput
    some?: PositionWhereInput
    none?: PositionWhereInput
  }

  export type OrganizationalUnitOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PositionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrganizationalUnitTenantIdCodeCompoundUniqueInput = {
    tenantId: string
    code: string
  }

  export type OrganizationalUnitCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    code?: SortOrder
    nameFa?: SortOrder
    parentId?: SortOrder
  }

  export type OrganizationalUnitMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    code?: SortOrder
    nameFa?: SortOrder
    parentId?: SortOrder
  }

  export type OrganizationalUnitMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    code?: SortOrder
    nameFa?: SortOrder
    parentId?: SortOrder
  }

  export type OrganizationalUnitScalarRelationFilter = {
    is?: OrganizationalUnitWhereInput
    isNot?: OrganizationalUnitWhereInput
  }

  export type PositionTenantIdCodeCompoundUniqueInput = {
    tenantId: string
    code: string
  }

  export type PositionCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    code?: SortOrder
    nameFa?: SortOrder
    orgUnitId?: SortOrder
  }

  export type PositionMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    code?: SortOrder
    nameFa?: SortOrder
    orgUnitId?: SortOrder
  }

  export type PositionMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    code?: SortOrder
    nameFa?: SortOrder
    orgUnitId?: SortOrder
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

  export type EnumAttendanceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AttendanceStatus | EnumAttendanceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AttendanceStatus[] | ListEnumAttendanceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AttendanceStatus[] | ListEnumAttendanceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAttendanceStatusFilter<$PrismaModel> | $Enums.AttendanceStatus
  }

  export type EmployeeScalarRelationFilter = {
    is?: EmployeeWhereInput
    isNot?: EmployeeWhereInput
  }

  export type AttendanceRecordTenantIdEmployeeIdDateCompoundUniqueInput = {
    tenantId: string
    employeeId: string
    date: Date | string
  }

  export type AttendanceRecordCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    employeeId?: SortOrder
    date?: SortOrder
    checkIn?: SortOrder
    checkOut?: SortOrder
    status?: SortOrder
  }

  export type AttendanceRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    employeeId?: SortOrder
    date?: SortOrder
    checkIn?: SortOrder
    checkOut?: SortOrder
    status?: SortOrder
  }

  export type AttendanceRecordMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    employeeId?: SortOrder
    date?: SortOrder
    checkIn?: SortOrder
    checkOut?: SortOrder
    status?: SortOrder
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

  export type EnumAttendanceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AttendanceStatus | EnumAttendanceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AttendanceStatus[] | ListEnumAttendanceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AttendanceStatus[] | ListEnumAttendanceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAttendanceStatusWithAggregatesFilter<$PrismaModel> | $Enums.AttendanceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAttendanceStatusFilter<$PrismaModel>
    _max?: NestedEnumAttendanceStatusFilter<$PrismaModel>
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

  export type EnumContractStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ContractStatus | EnumContractStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ContractStatus[] | ListEnumContractStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ContractStatus[] | ListEnumContractStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumContractStatusFilter<$PrismaModel> | $Enums.ContractStatus
  }

  export type EmployeeContractCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    employeeId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    salaryBase?: SortOrder
    currency?: SortOrder
    status?: SortOrder
  }

  export type EmployeeContractAvgOrderByAggregateInput = {
    salaryBase?: SortOrder
  }

  export type EmployeeContractMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    employeeId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    salaryBase?: SortOrder
    currency?: SortOrder
    status?: SortOrder
  }

  export type EmployeeContractMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    employeeId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    salaryBase?: SortOrder
    currency?: SortOrder
    status?: SortOrder
  }

  export type EmployeeContractSumOrderByAggregateInput = {
    salaryBase?: SortOrder
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

  export type EnumContractStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ContractStatus | EnumContractStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ContractStatus[] | ListEnumContractStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ContractStatus[] | ListEnumContractStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumContractStatusWithAggregatesFilter<$PrismaModel> | $Enums.ContractStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumContractStatusFilter<$PrismaModel>
    _max?: NestedEnumContractStatusFilter<$PrismaModel>
  }

  export type EnumLeaveRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LeaveRequestStatus | EnumLeaveRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LeaveRequestStatus[] | ListEnumLeaveRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeaveRequestStatus[] | ListEnumLeaveRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLeaveRequestStatusFilter<$PrismaModel> | $Enums.LeaveRequestStatus
  }

  export type LeaveRequestCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    employeeId?: SortOrder
    type?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    correlationId?: SortOrder
  }

  export type LeaveRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    employeeId?: SortOrder
    type?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    correlationId?: SortOrder
  }

  export type LeaveRequestMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    employeeId?: SortOrder
    type?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    correlationId?: SortOrder
  }

  export type EnumLeaveRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeaveRequestStatus | EnumLeaveRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LeaveRequestStatus[] | ListEnumLeaveRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeaveRequestStatus[] | ListEnumLeaveRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLeaveRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.LeaveRequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLeaveRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumLeaveRequestStatusFilter<$PrismaModel>
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

  export type PayrollRuleTenantIdCodeEffectiveFromCompoundUniqueInput = {
    tenantId: string
    code: string
    effectiveFrom: Date | string
  }

  export type PayrollRuleCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    code?: SortOrder
    nameFa?: SortOrder
    effectiveFrom?: SortOrder
    effectiveTo?: SortOrder
    config?: SortOrder
  }

  export type PayrollRuleMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    code?: SortOrder
    nameFa?: SortOrder
    effectiveFrom?: SortOrder
    effectiveTo?: SortOrder
  }

  export type PayrollRuleMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    code?: SortOrder
    nameFa?: SortOrder
    effectiveFrom?: SortOrder
    effectiveTo?: SortOrder
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

  export type TaxBracketCountOrderByAggregateInput = {
    id?: SortOrder
    country?: SortOrder
    effectiveYear?: SortOrder
    minIncome?: SortOrder
    maxIncome?: SortOrder
    rate?: SortOrder
  }

  export type TaxBracketAvgOrderByAggregateInput = {
    effectiveYear?: SortOrder
    minIncome?: SortOrder
    maxIncome?: SortOrder
    rate?: SortOrder
  }

  export type TaxBracketMaxOrderByAggregateInput = {
    id?: SortOrder
    country?: SortOrder
    effectiveYear?: SortOrder
    minIncome?: SortOrder
    maxIncome?: SortOrder
    rate?: SortOrder
  }

  export type TaxBracketMinOrderByAggregateInput = {
    id?: SortOrder
    country?: SortOrder
    effectiveYear?: SortOrder
    minIncome?: SortOrder
    maxIncome?: SortOrder
    rate?: SortOrder
  }

  export type TaxBracketSumOrderByAggregateInput = {
    effectiveYear?: SortOrder
    minIncome?: SortOrder
    maxIncome?: SortOrder
    rate?: SortOrder
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

  export type InsuranceRuleCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    effectiveFrom?: SortOrder
    effectiveTo?: SortOrder
    employeeRate?: SortOrder
    employerRate?: SortOrder
    ceiling?: SortOrder
  }

  export type InsuranceRuleAvgOrderByAggregateInput = {
    employeeRate?: SortOrder
    employerRate?: SortOrder
    ceiling?: SortOrder
  }

  export type InsuranceRuleMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    effectiveFrom?: SortOrder
    effectiveTo?: SortOrder
    employeeRate?: SortOrder
    employerRate?: SortOrder
    ceiling?: SortOrder
  }

  export type InsuranceRuleMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    effectiveFrom?: SortOrder
    effectiveTo?: SortOrder
    employeeRate?: SortOrder
    employerRate?: SortOrder
    ceiling?: SortOrder
  }

  export type InsuranceRuleSumOrderByAggregateInput = {
    employeeRate?: SortOrder
    employerRate?: SortOrder
    ceiling?: SortOrder
  }

  export type EnumPayslipStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PayslipStatus | EnumPayslipStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PayslipStatus[] | ListEnumPayslipStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PayslipStatus[] | ListEnumPayslipStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPayslipStatusFilter<$PrismaModel> | $Enums.PayslipStatus
  }

  export type PayslipSnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    employeeId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    baseSalary?: SortOrder
    overtime?: SortOrder
    nightShift?: SortOrder
    holidays?: SortOrder
    commission?: SortOrder
    insuranceEmployee?: SortOrder
    insuranceEmployer?: SortOrder
    tax?: SortOrder
    netPay?: SortOrder
    breakdown?: SortOrder
    status?: SortOrder
    finalizedAt?: SortOrder
    adjustmentReason?: SortOrder
    correlationId?: SortOrder
    supersededById?: SortOrder
  }

  export type PayslipSnapshotAvgOrderByAggregateInput = {
    baseSalary?: SortOrder
    overtime?: SortOrder
    nightShift?: SortOrder
    holidays?: SortOrder
    commission?: SortOrder
    insuranceEmployee?: SortOrder
    insuranceEmployer?: SortOrder
    tax?: SortOrder
    netPay?: SortOrder
  }

  export type PayslipSnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    employeeId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    baseSalary?: SortOrder
    overtime?: SortOrder
    nightShift?: SortOrder
    holidays?: SortOrder
    commission?: SortOrder
    insuranceEmployee?: SortOrder
    insuranceEmployer?: SortOrder
    tax?: SortOrder
    netPay?: SortOrder
    status?: SortOrder
    finalizedAt?: SortOrder
    adjustmentReason?: SortOrder
    correlationId?: SortOrder
    supersededById?: SortOrder
  }

  export type PayslipSnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    employeeId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    baseSalary?: SortOrder
    overtime?: SortOrder
    nightShift?: SortOrder
    holidays?: SortOrder
    commission?: SortOrder
    insuranceEmployee?: SortOrder
    insuranceEmployer?: SortOrder
    tax?: SortOrder
    netPay?: SortOrder
    status?: SortOrder
    finalizedAt?: SortOrder
    adjustmentReason?: SortOrder
    correlationId?: SortOrder
    supersededById?: SortOrder
  }

  export type PayslipSnapshotSumOrderByAggregateInput = {
    baseSalary?: SortOrder
    overtime?: SortOrder
    nightShift?: SortOrder
    holidays?: SortOrder
    commission?: SortOrder
    insuranceEmployee?: SortOrder
    insuranceEmployer?: SortOrder
    tax?: SortOrder
    netPay?: SortOrder
  }

  export type EnumPayslipStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PayslipStatus | EnumPayslipStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PayslipStatus[] | ListEnumPayslipStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PayslipStatus[] | ListEnumPayslipStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPayslipStatusWithAggregatesFilter<$PrismaModel> | $Enums.PayslipStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPayslipStatusFilter<$PrismaModel>
    _max?: NestedEnumPayslipStatusFilter<$PrismaModel>
  }

  export type EmployeeCommissionCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    employeeId?: SortOrder
    sourceType?: SortOrder
    sourceId?: SortOrder
    amount?: SortOrder
    accruedAt?: SortOrder
    paidInPayslipId?: SortOrder
  }

  export type EmployeeCommissionAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EmployeeCommissionMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    employeeId?: SortOrder
    sourceType?: SortOrder
    sourceId?: SortOrder
    amount?: SortOrder
    accruedAt?: SortOrder
    paidInPayslipId?: SortOrder
  }

  export type EmployeeCommissionMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    employeeId?: SortOrder
    sourceType?: SortOrder
    sourceId?: SortOrder
    amount?: SortOrder
    accruedAt?: SortOrder
    paidInPayslipId?: SortOrder
  }

  export type EmployeeCommissionSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type LeaveRequestCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<LeaveRequestCreateWithoutEmployeeInput, LeaveRequestUncheckedCreateWithoutEmployeeInput> | LeaveRequestCreateWithoutEmployeeInput[] | LeaveRequestUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: LeaveRequestCreateOrConnectWithoutEmployeeInput | LeaveRequestCreateOrConnectWithoutEmployeeInput[]
    createMany?: LeaveRequestCreateManyEmployeeInputEnvelope
    connect?: LeaveRequestWhereUniqueInput | LeaveRequestWhereUniqueInput[]
  }

  export type AttendanceRecordCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<AttendanceRecordCreateWithoutEmployeeInput, AttendanceRecordUncheckedCreateWithoutEmployeeInput> | AttendanceRecordCreateWithoutEmployeeInput[] | AttendanceRecordUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: AttendanceRecordCreateOrConnectWithoutEmployeeInput | AttendanceRecordCreateOrConnectWithoutEmployeeInput[]
    createMany?: AttendanceRecordCreateManyEmployeeInputEnvelope
    connect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
  }

  export type EmployeeContractCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<EmployeeContractCreateWithoutEmployeeInput, EmployeeContractUncheckedCreateWithoutEmployeeInput> | EmployeeContractCreateWithoutEmployeeInput[] | EmployeeContractUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: EmployeeContractCreateOrConnectWithoutEmployeeInput | EmployeeContractCreateOrConnectWithoutEmployeeInput[]
    createMany?: EmployeeContractCreateManyEmployeeInputEnvelope
    connect?: EmployeeContractWhereUniqueInput | EmployeeContractWhereUniqueInput[]
  }

  export type LeaveRequestUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<LeaveRequestCreateWithoutEmployeeInput, LeaveRequestUncheckedCreateWithoutEmployeeInput> | LeaveRequestCreateWithoutEmployeeInput[] | LeaveRequestUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: LeaveRequestCreateOrConnectWithoutEmployeeInput | LeaveRequestCreateOrConnectWithoutEmployeeInput[]
    createMany?: LeaveRequestCreateManyEmployeeInputEnvelope
    connect?: LeaveRequestWhereUniqueInput | LeaveRequestWhereUniqueInput[]
  }

  export type AttendanceRecordUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<AttendanceRecordCreateWithoutEmployeeInput, AttendanceRecordUncheckedCreateWithoutEmployeeInput> | AttendanceRecordCreateWithoutEmployeeInput[] | AttendanceRecordUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: AttendanceRecordCreateOrConnectWithoutEmployeeInput | AttendanceRecordCreateOrConnectWithoutEmployeeInput[]
    createMany?: AttendanceRecordCreateManyEmployeeInputEnvelope
    connect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
  }

  export type EmployeeContractUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<EmployeeContractCreateWithoutEmployeeInput, EmployeeContractUncheckedCreateWithoutEmployeeInput> | EmployeeContractCreateWithoutEmployeeInput[] | EmployeeContractUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: EmployeeContractCreateOrConnectWithoutEmployeeInput | EmployeeContractCreateOrConnectWithoutEmployeeInput[]
    createMany?: EmployeeContractCreateManyEmployeeInputEnvelope
    connect?: EmployeeContractWhereUniqueInput | EmployeeContractWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumEmployeeStatusFieldUpdateOperationsInput = {
    set?: $Enums.EmployeeStatus
  }

  export type LeaveRequestUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<LeaveRequestCreateWithoutEmployeeInput, LeaveRequestUncheckedCreateWithoutEmployeeInput> | LeaveRequestCreateWithoutEmployeeInput[] | LeaveRequestUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: LeaveRequestCreateOrConnectWithoutEmployeeInput | LeaveRequestCreateOrConnectWithoutEmployeeInput[]
    upsert?: LeaveRequestUpsertWithWhereUniqueWithoutEmployeeInput | LeaveRequestUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: LeaveRequestCreateManyEmployeeInputEnvelope
    set?: LeaveRequestWhereUniqueInput | LeaveRequestWhereUniqueInput[]
    disconnect?: LeaveRequestWhereUniqueInput | LeaveRequestWhereUniqueInput[]
    delete?: LeaveRequestWhereUniqueInput | LeaveRequestWhereUniqueInput[]
    connect?: LeaveRequestWhereUniqueInput | LeaveRequestWhereUniqueInput[]
    update?: LeaveRequestUpdateWithWhereUniqueWithoutEmployeeInput | LeaveRequestUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: LeaveRequestUpdateManyWithWhereWithoutEmployeeInput | LeaveRequestUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: LeaveRequestScalarWhereInput | LeaveRequestScalarWhereInput[]
  }

  export type AttendanceRecordUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<AttendanceRecordCreateWithoutEmployeeInput, AttendanceRecordUncheckedCreateWithoutEmployeeInput> | AttendanceRecordCreateWithoutEmployeeInput[] | AttendanceRecordUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: AttendanceRecordCreateOrConnectWithoutEmployeeInput | AttendanceRecordCreateOrConnectWithoutEmployeeInput[]
    upsert?: AttendanceRecordUpsertWithWhereUniqueWithoutEmployeeInput | AttendanceRecordUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: AttendanceRecordCreateManyEmployeeInputEnvelope
    set?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    disconnect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    delete?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    connect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    update?: AttendanceRecordUpdateWithWhereUniqueWithoutEmployeeInput | AttendanceRecordUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: AttendanceRecordUpdateManyWithWhereWithoutEmployeeInput | AttendanceRecordUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: AttendanceRecordScalarWhereInput | AttendanceRecordScalarWhereInput[]
  }

  export type EmployeeContractUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<EmployeeContractCreateWithoutEmployeeInput, EmployeeContractUncheckedCreateWithoutEmployeeInput> | EmployeeContractCreateWithoutEmployeeInput[] | EmployeeContractUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: EmployeeContractCreateOrConnectWithoutEmployeeInput | EmployeeContractCreateOrConnectWithoutEmployeeInput[]
    upsert?: EmployeeContractUpsertWithWhereUniqueWithoutEmployeeInput | EmployeeContractUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: EmployeeContractCreateManyEmployeeInputEnvelope
    set?: EmployeeContractWhereUniqueInput | EmployeeContractWhereUniqueInput[]
    disconnect?: EmployeeContractWhereUniqueInput | EmployeeContractWhereUniqueInput[]
    delete?: EmployeeContractWhereUniqueInput | EmployeeContractWhereUniqueInput[]
    connect?: EmployeeContractWhereUniqueInput | EmployeeContractWhereUniqueInput[]
    update?: EmployeeContractUpdateWithWhereUniqueWithoutEmployeeInput | EmployeeContractUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: EmployeeContractUpdateManyWithWhereWithoutEmployeeInput | EmployeeContractUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: EmployeeContractScalarWhereInput | EmployeeContractScalarWhereInput[]
  }

  export type LeaveRequestUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<LeaveRequestCreateWithoutEmployeeInput, LeaveRequestUncheckedCreateWithoutEmployeeInput> | LeaveRequestCreateWithoutEmployeeInput[] | LeaveRequestUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: LeaveRequestCreateOrConnectWithoutEmployeeInput | LeaveRequestCreateOrConnectWithoutEmployeeInput[]
    upsert?: LeaveRequestUpsertWithWhereUniqueWithoutEmployeeInput | LeaveRequestUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: LeaveRequestCreateManyEmployeeInputEnvelope
    set?: LeaveRequestWhereUniqueInput | LeaveRequestWhereUniqueInput[]
    disconnect?: LeaveRequestWhereUniqueInput | LeaveRequestWhereUniqueInput[]
    delete?: LeaveRequestWhereUniqueInput | LeaveRequestWhereUniqueInput[]
    connect?: LeaveRequestWhereUniqueInput | LeaveRequestWhereUniqueInput[]
    update?: LeaveRequestUpdateWithWhereUniqueWithoutEmployeeInput | LeaveRequestUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: LeaveRequestUpdateManyWithWhereWithoutEmployeeInput | LeaveRequestUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: LeaveRequestScalarWhereInput | LeaveRequestScalarWhereInput[]
  }

  export type AttendanceRecordUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<AttendanceRecordCreateWithoutEmployeeInput, AttendanceRecordUncheckedCreateWithoutEmployeeInput> | AttendanceRecordCreateWithoutEmployeeInput[] | AttendanceRecordUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: AttendanceRecordCreateOrConnectWithoutEmployeeInput | AttendanceRecordCreateOrConnectWithoutEmployeeInput[]
    upsert?: AttendanceRecordUpsertWithWhereUniqueWithoutEmployeeInput | AttendanceRecordUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: AttendanceRecordCreateManyEmployeeInputEnvelope
    set?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    disconnect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    delete?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    connect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    update?: AttendanceRecordUpdateWithWhereUniqueWithoutEmployeeInput | AttendanceRecordUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: AttendanceRecordUpdateManyWithWhereWithoutEmployeeInput | AttendanceRecordUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: AttendanceRecordScalarWhereInput | AttendanceRecordScalarWhereInput[]
  }

  export type EmployeeContractUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<EmployeeContractCreateWithoutEmployeeInput, EmployeeContractUncheckedCreateWithoutEmployeeInput> | EmployeeContractCreateWithoutEmployeeInput[] | EmployeeContractUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: EmployeeContractCreateOrConnectWithoutEmployeeInput | EmployeeContractCreateOrConnectWithoutEmployeeInput[]
    upsert?: EmployeeContractUpsertWithWhereUniqueWithoutEmployeeInput | EmployeeContractUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: EmployeeContractCreateManyEmployeeInputEnvelope
    set?: EmployeeContractWhereUniqueInput | EmployeeContractWhereUniqueInput[]
    disconnect?: EmployeeContractWhereUniqueInput | EmployeeContractWhereUniqueInput[]
    delete?: EmployeeContractWhereUniqueInput | EmployeeContractWhereUniqueInput[]
    connect?: EmployeeContractWhereUniqueInput | EmployeeContractWhereUniqueInput[]
    update?: EmployeeContractUpdateWithWhereUniqueWithoutEmployeeInput | EmployeeContractUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: EmployeeContractUpdateManyWithWhereWithoutEmployeeInput | EmployeeContractUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: EmployeeContractScalarWhereInput | EmployeeContractScalarWhereInput[]
  }

  export type OrganizationalUnitCreateNestedOneWithoutChildrenInput = {
    create?: XOR<OrganizationalUnitCreateWithoutChildrenInput, OrganizationalUnitUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: OrganizationalUnitCreateOrConnectWithoutChildrenInput
    connect?: OrganizationalUnitWhereUniqueInput
  }

  export type OrganizationalUnitCreateNestedManyWithoutParentInput = {
    create?: XOR<OrganizationalUnitCreateWithoutParentInput, OrganizationalUnitUncheckedCreateWithoutParentInput> | OrganizationalUnitCreateWithoutParentInput[] | OrganizationalUnitUncheckedCreateWithoutParentInput[]
    connectOrCreate?: OrganizationalUnitCreateOrConnectWithoutParentInput | OrganizationalUnitCreateOrConnectWithoutParentInput[]
    createMany?: OrganizationalUnitCreateManyParentInputEnvelope
    connect?: OrganizationalUnitWhereUniqueInput | OrganizationalUnitWhereUniqueInput[]
  }

  export type PositionCreateNestedManyWithoutOrgUnitInput = {
    create?: XOR<PositionCreateWithoutOrgUnitInput, PositionUncheckedCreateWithoutOrgUnitInput> | PositionCreateWithoutOrgUnitInput[] | PositionUncheckedCreateWithoutOrgUnitInput[]
    connectOrCreate?: PositionCreateOrConnectWithoutOrgUnitInput | PositionCreateOrConnectWithoutOrgUnitInput[]
    createMany?: PositionCreateManyOrgUnitInputEnvelope
    connect?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
  }

  export type OrganizationalUnitUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<OrganizationalUnitCreateWithoutParentInput, OrganizationalUnitUncheckedCreateWithoutParentInput> | OrganizationalUnitCreateWithoutParentInput[] | OrganizationalUnitUncheckedCreateWithoutParentInput[]
    connectOrCreate?: OrganizationalUnitCreateOrConnectWithoutParentInput | OrganizationalUnitCreateOrConnectWithoutParentInput[]
    createMany?: OrganizationalUnitCreateManyParentInputEnvelope
    connect?: OrganizationalUnitWhereUniqueInput | OrganizationalUnitWhereUniqueInput[]
  }

  export type PositionUncheckedCreateNestedManyWithoutOrgUnitInput = {
    create?: XOR<PositionCreateWithoutOrgUnitInput, PositionUncheckedCreateWithoutOrgUnitInput> | PositionCreateWithoutOrgUnitInput[] | PositionUncheckedCreateWithoutOrgUnitInput[]
    connectOrCreate?: PositionCreateOrConnectWithoutOrgUnitInput | PositionCreateOrConnectWithoutOrgUnitInput[]
    createMany?: PositionCreateManyOrgUnitInputEnvelope
    connect?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
  }

  export type OrganizationalUnitUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<OrganizationalUnitCreateWithoutChildrenInput, OrganizationalUnitUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: OrganizationalUnitCreateOrConnectWithoutChildrenInput
    upsert?: OrganizationalUnitUpsertWithoutChildrenInput
    disconnect?: OrganizationalUnitWhereInput | boolean
    delete?: OrganizationalUnitWhereInput | boolean
    connect?: OrganizationalUnitWhereUniqueInput
    update?: XOR<XOR<OrganizationalUnitUpdateToOneWithWhereWithoutChildrenInput, OrganizationalUnitUpdateWithoutChildrenInput>, OrganizationalUnitUncheckedUpdateWithoutChildrenInput>
  }

  export type OrganizationalUnitUpdateManyWithoutParentNestedInput = {
    create?: XOR<OrganizationalUnitCreateWithoutParentInput, OrganizationalUnitUncheckedCreateWithoutParentInput> | OrganizationalUnitCreateWithoutParentInput[] | OrganizationalUnitUncheckedCreateWithoutParentInput[]
    connectOrCreate?: OrganizationalUnitCreateOrConnectWithoutParentInput | OrganizationalUnitCreateOrConnectWithoutParentInput[]
    upsert?: OrganizationalUnitUpsertWithWhereUniqueWithoutParentInput | OrganizationalUnitUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: OrganizationalUnitCreateManyParentInputEnvelope
    set?: OrganizationalUnitWhereUniqueInput | OrganizationalUnitWhereUniqueInput[]
    disconnect?: OrganizationalUnitWhereUniqueInput | OrganizationalUnitWhereUniqueInput[]
    delete?: OrganizationalUnitWhereUniqueInput | OrganizationalUnitWhereUniqueInput[]
    connect?: OrganizationalUnitWhereUniqueInput | OrganizationalUnitWhereUniqueInput[]
    update?: OrganizationalUnitUpdateWithWhereUniqueWithoutParentInput | OrganizationalUnitUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: OrganizationalUnitUpdateManyWithWhereWithoutParentInput | OrganizationalUnitUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: OrganizationalUnitScalarWhereInput | OrganizationalUnitScalarWhereInput[]
  }

  export type PositionUpdateManyWithoutOrgUnitNestedInput = {
    create?: XOR<PositionCreateWithoutOrgUnitInput, PositionUncheckedCreateWithoutOrgUnitInput> | PositionCreateWithoutOrgUnitInput[] | PositionUncheckedCreateWithoutOrgUnitInput[]
    connectOrCreate?: PositionCreateOrConnectWithoutOrgUnitInput | PositionCreateOrConnectWithoutOrgUnitInput[]
    upsert?: PositionUpsertWithWhereUniqueWithoutOrgUnitInput | PositionUpsertWithWhereUniqueWithoutOrgUnitInput[]
    createMany?: PositionCreateManyOrgUnitInputEnvelope
    set?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    disconnect?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    delete?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    connect?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    update?: PositionUpdateWithWhereUniqueWithoutOrgUnitInput | PositionUpdateWithWhereUniqueWithoutOrgUnitInput[]
    updateMany?: PositionUpdateManyWithWhereWithoutOrgUnitInput | PositionUpdateManyWithWhereWithoutOrgUnitInput[]
    deleteMany?: PositionScalarWhereInput | PositionScalarWhereInput[]
  }

  export type OrganizationalUnitUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<OrganizationalUnitCreateWithoutParentInput, OrganizationalUnitUncheckedCreateWithoutParentInput> | OrganizationalUnitCreateWithoutParentInput[] | OrganizationalUnitUncheckedCreateWithoutParentInput[]
    connectOrCreate?: OrganizationalUnitCreateOrConnectWithoutParentInput | OrganizationalUnitCreateOrConnectWithoutParentInput[]
    upsert?: OrganizationalUnitUpsertWithWhereUniqueWithoutParentInput | OrganizationalUnitUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: OrganizationalUnitCreateManyParentInputEnvelope
    set?: OrganizationalUnitWhereUniqueInput | OrganizationalUnitWhereUniqueInput[]
    disconnect?: OrganizationalUnitWhereUniqueInput | OrganizationalUnitWhereUniqueInput[]
    delete?: OrganizationalUnitWhereUniqueInput | OrganizationalUnitWhereUniqueInput[]
    connect?: OrganizationalUnitWhereUniqueInput | OrganizationalUnitWhereUniqueInput[]
    update?: OrganizationalUnitUpdateWithWhereUniqueWithoutParentInput | OrganizationalUnitUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: OrganizationalUnitUpdateManyWithWhereWithoutParentInput | OrganizationalUnitUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: OrganizationalUnitScalarWhereInput | OrganizationalUnitScalarWhereInput[]
  }

  export type PositionUncheckedUpdateManyWithoutOrgUnitNestedInput = {
    create?: XOR<PositionCreateWithoutOrgUnitInput, PositionUncheckedCreateWithoutOrgUnitInput> | PositionCreateWithoutOrgUnitInput[] | PositionUncheckedCreateWithoutOrgUnitInput[]
    connectOrCreate?: PositionCreateOrConnectWithoutOrgUnitInput | PositionCreateOrConnectWithoutOrgUnitInput[]
    upsert?: PositionUpsertWithWhereUniqueWithoutOrgUnitInput | PositionUpsertWithWhereUniqueWithoutOrgUnitInput[]
    createMany?: PositionCreateManyOrgUnitInputEnvelope
    set?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    disconnect?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    delete?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    connect?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    update?: PositionUpdateWithWhereUniqueWithoutOrgUnitInput | PositionUpdateWithWhereUniqueWithoutOrgUnitInput[]
    updateMany?: PositionUpdateManyWithWhereWithoutOrgUnitInput | PositionUpdateManyWithWhereWithoutOrgUnitInput[]
    deleteMany?: PositionScalarWhereInput | PositionScalarWhereInput[]
  }

  export type OrganizationalUnitCreateNestedOneWithoutPositionsInput = {
    create?: XOR<OrganizationalUnitCreateWithoutPositionsInput, OrganizationalUnitUncheckedCreateWithoutPositionsInput>
    connectOrCreate?: OrganizationalUnitCreateOrConnectWithoutPositionsInput
    connect?: OrganizationalUnitWhereUniqueInput
  }

  export type OrganizationalUnitUpdateOneRequiredWithoutPositionsNestedInput = {
    create?: XOR<OrganizationalUnitCreateWithoutPositionsInput, OrganizationalUnitUncheckedCreateWithoutPositionsInput>
    connectOrCreate?: OrganizationalUnitCreateOrConnectWithoutPositionsInput
    upsert?: OrganizationalUnitUpsertWithoutPositionsInput
    connect?: OrganizationalUnitWhereUniqueInput
    update?: XOR<XOR<OrganizationalUnitUpdateToOneWithWhereWithoutPositionsInput, OrganizationalUnitUpdateWithoutPositionsInput>, OrganizationalUnitUncheckedUpdateWithoutPositionsInput>
  }

  export type EmployeeCreateNestedOneWithoutAttendanceRecordsInput = {
    create?: XOR<EmployeeCreateWithoutAttendanceRecordsInput, EmployeeUncheckedCreateWithoutAttendanceRecordsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutAttendanceRecordsInput
    connect?: EmployeeWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumAttendanceStatusFieldUpdateOperationsInput = {
    set?: $Enums.AttendanceStatus
  }

  export type EmployeeUpdateOneRequiredWithoutAttendanceRecordsNestedInput = {
    create?: XOR<EmployeeCreateWithoutAttendanceRecordsInput, EmployeeUncheckedCreateWithoutAttendanceRecordsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutAttendanceRecordsInput
    upsert?: EmployeeUpsertWithoutAttendanceRecordsInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutAttendanceRecordsInput, EmployeeUpdateWithoutAttendanceRecordsInput>, EmployeeUncheckedUpdateWithoutAttendanceRecordsInput>
  }

  export type EmployeeCreateNestedOneWithoutContractsInput = {
    create?: XOR<EmployeeCreateWithoutContractsInput, EmployeeUncheckedCreateWithoutContractsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutContractsInput
    connect?: EmployeeWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EnumContractStatusFieldUpdateOperationsInput = {
    set?: $Enums.ContractStatus
  }

  export type EmployeeUpdateOneRequiredWithoutContractsNestedInput = {
    create?: XOR<EmployeeCreateWithoutContractsInput, EmployeeUncheckedCreateWithoutContractsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutContractsInput
    upsert?: EmployeeUpsertWithoutContractsInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutContractsInput, EmployeeUpdateWithoutContractsInput>, EmployeeUncheckedUpdateWithoutContractsInput>
  }

  export type EmployeeCreateNestedOneWithoutLeaveRequestsInput = {
    create?: XOR<EmployeeCreateWithoutLeaveRequestsInput, EmployeeUncheckedCreateWithoutLeaveRequestsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutLeaveRequestsInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EnumLeaveRequestStatusFieldUpdateOperationsInput = {
    set?: $Enums.LeaveRequestStatus
  }

  export type EmployeeUpdateOneRequiredWithoutLeaveRequestsNestedInput = {
    create?: XOR<EmployeeCreateWithoutLeaveRequestsInput, EmployeeUncheckedCreateWithoutLeaveRequestsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutLeaveRequestsInput
    upsert?: EmployeeUpsertWithoutLeaveRequestsInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutLeaveRequestsInput, EmployeeUpdateWithoutLeaveRequestsInput>, EmployeeUncheckedUpdateWithoutLeaveRequestsInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EnumPayslipStatusFieldUpdateOperationsInput = {
    set?: $Enums.PayslipStatus
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

  export type NestedEnumEmployeeStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EmployeeStatus | EnumEmployeeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EmployeeStatus[] | ListEnumEmployeeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmployeeStatus[] | ListEnumEmployeeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEmployeeStatusFilter<$PrismaModel> | $Enums.EmployeeStatus
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

  export type NestedEnumEmployeeStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EmployeeStatus | EnumEmployeeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EmployeeStatus[] | ListEnumEmployeeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmployeeStatus[] | ListEnumEmployeeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEmployeeStatusWithAggregatesFilter<$PrismaModel> | $Enums.EmployeeStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEmployeeStatusFilter<$PrismaModel>
    _max?: NestedEnumEmployeeStatusFilter<$PrismaModel>
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

  export type NestedEnumAttendanceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AttendanceStatus | EnumAttendanceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AttendanceStatus[] | ListEnumAttendanceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AttendanceStatus[] | ListEnumAttendanceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAttendanceStatusFilter<$PrismaModel> | $Enums.AttendanceStatus
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

  export type NestedEnumAttendanceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AttendanceStatus | EnumAttendanceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AttendanceStatus[] | ListEnumAttendanceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AttendanceStatus[] | ListEnumAttendanceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAttendanceStatusWithAggregatesFilter<$PrismaModel> | $Enums.AttendanceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAttendanceStatusFilter<$PrismaModel>
    _max?: NestedEnumAttendanceStatusFilter<$PrismaModel>
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

  export type NestedEnumContractStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ContractStatus | EnumContractStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ContractStatus[] | ListEnumContractStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ContractStatus[] | ListEnumContractStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumContractStatusFilter<$PrismaModel> | $Enums.ContractStatus
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

  export type NestedEnumContractStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ContractStatus | EnumContractStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ContractStatus[] | ListEnumContractStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ContractStatus[] | ListEnumContractStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumContractStatusWithAggregatesFilter<$PrismaModel> | $Enums.ContractStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumContractStatusFilter<$PrismaModel>
    _max?: NestedEnumContractStatusFilter<$PrismaModel>
  }

  export type NestedEnumLeaveRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LeaveRequestStatus | EnumLeaveRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LeaveRequestStatus[] | ListEnumLeaveRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeaveRequestStatus[] | ListEnumLeaveRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLeaveRequestStatusFilter<$PrismaModel> | $Enums.LeaveRequestStatus
  }

  export type NestedEnumLeaveRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeaveRequestStatus | EnumLeaveRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LeaveRequestStatus[] | ListEnumLeaveRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeaveRequestStatus[] | ListEnumLeaveRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLeaveRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.LeaveRequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLeaveRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumLeaveRequestStatusFilter<$PrismaModel>
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

  export type NestedEnumPayslipStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PayslipStatus | EnumPayslipStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PayslipStatus[] | ListEnumPayslipStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PayslipStatus[] | ListEnumPayslipStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPayslipStatusFilter<$PrismaModel> | $Enums.PayslipStatus
  }

  export type NestedEnumPayslipStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PayslipStatus | EnumPayslipStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PayslipStatus[] | ListEnumPayslipStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PayslipStatus[] | ListEnumPayslipStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPayslipStatusWithAggregatesFilter<$PrismaModel> | $Enums.PayslipStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPayslipStatusFilter<$PrismaModel>
    _max?: NestedEnumPayslipStatusFilter<$PrismaModel>
  }

  export type LeaveRequestCreateWithoutEmployeeInput = {
    id?: string
    tenantId: string
    type: string
    startDate: Date | string
    endDate: Date | string
    status?: $Enums.LeaveRequestStatus
    correlationId: string
  }

  export type LeaveRequestUncheckedCreateWithoutEmployeeInput = {
    id?: string
    tenantId: string
    type: string
    startDate: Date | string
    endDate: Date | string
    status?: $Enums.LeaveRequestStatus
    correlationId: string
  }

  export type LeaveRequestCreateOrConnectWithoutEmployeeInput = {
    where: LeaveRequestWhereUniqueInput
    create: XOR<LeaveRequestCreateWithoutEmployeeInput, LeaveRequestUncheckedCreateWithoutEmployeeInput>
  }

  export type LeaveRequestCreateManyEmployeeInputEnvelope = {
    data: LeaveRequestCreateManyEmployeeInput | LeaveRequestCreateManyEmployeeInput[]
    skipDuplicates?: boolean
  }

  export type AttendanceRecordCreateWithoutEmployeeInput = {
    id?: string
    tenantId: string
    date: Date | string
    checkIn?: Date | string | null
    checkOut?: Date | string | null
    status?: $Enums.AttendanceStatus
  }

  export type AttendanceRecordUncheckedCreateWithoutEmployeeInput = {
    id?: string
    tenantId: string
    date: Date | string
    checkIn?: Date | string | null
    checkOut?: Date | string | null
    status?: $Enums.AttendanceStatus
  }

  export type AttendanceRecordCreateOrConnectWithoutEmployeeInput = {
    where: AttendanceRecordWhereUniqueInput
    create: XOR<AttendanceRecordCreateWithoutEmployeeInput, AttendanceRecordUncheckedCreateWithoutEmployeeInput>
  }

  export type AttendanceRecordCreateManyEmployeeInputEnvelope = {
    data: AttendanceRecordCreateManyEmployeeInput | AttendanceRecordCreateManyEmployeeInput[]
    skipDuplicates?: boolean
  }

  export type EmployeeContractCreateWithoutEmployeeInput = {
    id?: string
    tenantId: string
    startDate: Date | string
    endDate?: Date | string | null
    salaryBase: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: $Enums.ContractStatus
  }

  export type EmployeeContractUncheckedCreateWithoutEmployeeInput = {
    id?: string
    tenantId: string
    startDate: Date | string
    endDate?: Date | string | null
    salaryBase: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: $Enums.ContractStatus
  }

  export type EmployeeContractCreateOrConnectWithoutEmployeeInput = {
    where: EmployeeContractWhereUniqueInput
    create: XOR<EmployeeContractCreateWithoutEmployeeInput, EmployeeContractUncheckedCreateWithoutEmployeeInput>
  }

  export type EmployeeContractCreateManyEmployeeInputEnvelope = {
    data: EmployeeContractCreateManyEmployeeInput | EmployeeContractCreateManyEmployeeInput[]
    skipDuplicates?: boolean
  }

  export type LeaveRequestUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: LeaveRequestWhereUniqueInput
    update: XOR<LeaveRequestUpdateWithoutEmployeeInput, LeaveRequestUncheckedUpdateWithoutEmployeeInput>
    create: XOR<LeaveRequestCreateWithoutEmployeeInput, LeaveRequestUncheckedCreateWithoutEmployeeInput>
  }

  export type LeaveRequestUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: LeaveRequestWhereUniqueInput
    data: XOR<LeaveRequestUpdateWithoutEmployeeInput, LeaveRequestUncheckedUpdateWithoutEmployeeInput>
  }

  export type LeaveRequestUpdateManyWithWhereWithoutEmployeeInput = {
    where: LeaveRequestScalarWhereInput
    data: XOR<LeaveRequestUpdateManyMutationInput, LeaveRequestUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type LeaveRequestScalarWhereInput = {
    AND?: LeaveRequestScalarWhereInput | LeaveRequestScalarWhereInput[]
    OR?: LeaveRequestScalarWhereInput[]
    NOT?: LeaveRequestScalarWhereInput | LeaveRequestScalarWhereInput[]
    id?: StringFilter<"LeaveRequest"> | string
    tenantId?: StringFilter<"LeaveRequest"> | string
    employeeId?: StringFilter<"LeaveRequest"> | string
    type?: StringFilter<"LeaveRequest"> | string
    startDate?: DateTimeFilter<"LeaveRequest"> | Date | string
    endDate?: DateTimeFilter<"LeaveRequest"> | Date | string
    status?: EnumLeaveRequestStatusFilter<"LeaveRequest"> | $Enums.LeaveRequestStatus
    correlationId?: StringFilter<"LeaveRequest"> | string
  }

  export type AttendanceRecordUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: AttendanceRecordWhereUniqueInput
    update: XOR<AttendanceRecordUpdateWithoutEmployeeInput, AttendanceRecordUncheckedUpdateWithoutEmployeeInput>
    create: XOR<AttendanceRecordCreateWithoutEmployeeInput, AttendanceRecordUncheckedCreateWithoutEmployeeInput>
  }

  export type AttendanceRecordUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: AttendanceRecordWhereUniqueInput
    data: XOR<AttendanceRecordUpdateWithoutEmployeeInput, AttendanceRecordUncheckedUpdateWithoutEmployeeInput>
  }

  export type AttendanceRecordUpdateManyWithWhereWithoutEmployeeInput = {
    where: AttendanceRecordScalarWhereInput
    data: XOR<AttendanceRecordUpdateManyMutationInput, AttendanceRecordUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type AttendanceRecordScalarWhereInput = {
    AND?: AttendanceRecordScalarWhereInput | AttendanceRecordScalarWhereInput[]
    OR?: AttendanceRecordScalarWhereInput[]
    NOT?: AttendanceRecordScalarWhereInput | AttendanceRecordScalarWhereInput[]
    id?: StringFilter<"AttendanceRecord"> | string
    tenantId?: StringFilter<"AttendanceRecord"> | string
    employeeId?: StringFilter<"AttendanceRecord"> | string
    date?: DateTimeFilter<"AttendanceRecord"> | Date | string
    checkIn?: DateTimeNullableFilter<"AttendanceRecord"> | Date | string | null
    checkOut?: DateTimeNullableFilter<"AttendanceRecord"> | Date | string | null
    status?: EnumAttendanceStatusFilter<"AttendanceRecord"> | $Enums.AttendanceStatus
  }

  export type EmployeeContractUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: EmployeeContractWhereUniqueInput
    update: XOR<EmployeeContractUpdateWithoutEmployeeInput, EmployeeContractUncheckedUpdateWithoutEmployeeInput>
    create: XOR<EmployeeContractCreateWithoutEmployeeInput, EmployeeContractUncheckedCreateWithoutEmployeeInput>
  }

  export type EmployeeContractUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: EmployeeContractWhereUniqueInput
    data: XOR<EmployeeContractUpdateWithoutEmployeeInput, EmployeeContractUncheckedUpdateWithoutEmployeeInput>
  }

  export type EmployeeContractUpdateManyWithWhereWithoutEmployeeInput = {
    where: EmployeeContractScalarWhereInput
    data: XOR<EmployeeContractUpdateManyMutationInput, EmployeeContractUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type EmployeeContractScalarWhereInput = {
    AND?: EmployeeContractScalarWhereInput | EmployeeContractScalarWhereInput[]
    OR?: EmployeeContractScalarWhereInput[]
    NOT?: EmployeeContractScalarWhereInput | EmployeeContractScalarWhereInput[]
    id?: StringFilter<"EmployeeContract"> | string
    tenantId?: StringFilter<"EmployeeContract"> | string
    employeeId?: StringFilter<"EmployeeContract"> | string
    startDate?: DateTimeFilter<"EmployeeContract"> | Date | string
    endDate?: DateTimeNullableFilter<"EmployeeContract"> | Date | string | null
    salaryBase?: DecimalFilter<"EmployeeContract"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"EmployeeContract"> | string
    status?: EnumContractStatusFilter<"EmployeeContract"> | $Enums.ContractStatus
  }

  export type OrganizationalUnitCreateWithoutChildrenInput = {
    id?: string
    tenantId: string
    code: string
    nameFa: string
    parent?: OrganizationalUnitCreateNestedOneWithoutChildrenInput
    positions?: PositionCreateNestedManyWithoutOrgUnitInput
  }

  export type OrganizationalUnitUncheckedCreateWithoutChildrenInput = {
    id?: string
    tenantId: string
    code: string
    nameFa: string
    parentId?: string | null
    positions?: PositionUncheckedCreateNestedManyWithoutOrgUnitInput
  }

  export type OrganizationalUnitCreateOrConnectWithoutChildrenInput = {
    where: OrganizationalUnitWhereUniqueInput
    create: XOR<OrganizationalUnitCreateWithoutChildrenInput, OrganizationalUnitUncheckedCreateWithoutChildrenInput>
  }

  export type OrganizationalUnitCreateWithoutParentInput = {
    id?: string
    tenantId: string
    code: string
    nameFa: string
    children?: OrganizationalUnitCreateNestedManyWithoutParentInput
    positions?: PositionCreateNestedManyWithoutOrgUnitInput
  }

  export type OrganizationalUnitUncheckedCreateWithoutParentInput = {
    id?: string
    tenantId: string
    code: string
    nameFa: string
    children?: OrganizationalUnitUncheckedCreateNestedManyWithoutParentInput
    positions?: PositionUncheckedCreateNestedManyWithoutOrgUnitInput
  }

  export type OrganizationalUnitCreateOrConnectWithoutParentInput = {
    where: OrganizationalUnitWhereUniqueInput
    create: XOR<OrganizationalUnitCreateWithoutParentInput, OrganizationalUnitUncheckedCreateWithoutParentInput>
  }

  export type OrganizationalUnitCreateManyParentInputEnvelope = {
    data: OrganizationalUnitCreateManyParentInput | OrganizationalUnitCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type PositionCreateWithoutOrgUnitInput = {
    id?: string
    tenantId: string
    code: string
    nameFa: string
  }

  export type PositionUncheckedCreateWithoutOrgUnitInput = {
    id?: string
    tenantId: string
    code: string
    nameFa: string
  }

  export type PositionCreateOrConnectWithoutOrgUnitInput = {
    where: PositionWhereUniqueInput
    create: XOR<PositionCreateWithoutOrgUnitInput, PositionUncheckedCreateWithoutOrgUnitInput>
  }

  export type PositionCreateManyOrgUnitInputEnvelope = {
    data: PositionCreateManyOrgUnitInput | PositionCreateManyOrgUnitInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationalUnitUpsertWithoutChildrenInput = {
    update: XOR<OrganizationalUnitUpdateWithoutChildrenInput, OrganizationalUnitUncheckedUpdateWithoutChildrenInput>
    create: XOR<OrganizationalUnitCreateWithoutChildrenInput, OrganizationalUnitUncheckedCreateWithoutChildrenInput>
    where?: OrganizationalUnitWhereInput
  }

  export type OrganizationalUnitUpdateToOneWithWhereWithoutChildrenInput = {
    where?: OrganizationalUnitWhereInput
    data: XOR<OrganizationalUnitUpdateWithoutChildrenInput, OrganizationalUnitUncheckedUpdateWithoutChildrenInput>
  }

  export type OrganizationalUnitUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameFa?: StringFieldUpdateOperationsInput | string
    parent?: OrganizationalUnitUpdateOneWithoutChildrenNestedInput
    positions?: PositionUpdateManyWithoutOrgUnitNestedInput
  }

  export type OrganizationalUnitUncheckedUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameFa?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    positions?: PositionUncheckedUpdateManyWithoutOrgUnitNestedInput
  }

  export type OrganizationalUnitUpsertWithWhereUniqueWithoutParentInput = {
    where: OrganizationalUnitWhereUniqueInput
    update: XOR<OrganizationalUnitUpdateWithoutParentInput, OrganizationalUnitUncheckedUpdateWithoutParentInput>
    create: XOR<OrganizationalUnitCreateWithoutParentInput, OrganizationalUnitUncheckedCreateWithoutParentInput>
  }

  export type OrganizationalUnitUpdateWithWhereUniqueWithoutParentInput = {
    where: OrganizationalUnitWhereUniqueInput
    data: XOR<OrganizationalUnitUpdateWithoutParentInput, OrganizationalUnitUncheckedUpdateWithoutParentInput>
  }

  export type OrganizationalUnitUpdateManyWithWhereWithoutParentInput = {
    where: OrganizationalUnitScalarWhereInput
    data: XOR<OrganizationalUnitUpdateManyMutationInput, OrganizationalUnitUncheckedUpdateManyWithoutParentInput>
  }

  export type OrganizationalUnitScalarWhereInput = {
    AND?: OrganizationalUnitScalarWhereInput | OrganizationalUnitScalarWhereInput[]
    OR?: OrganizationalUnitScalarWhereInput[]
    NOT?: OrganizationalUnitScalarWhereInput | OrganizationalUnitScalarWhereInput[]
    id?: StringFilter<"OrganizationalUnit"> | string
    tenantId?: StringFilter<"OrganizationalUnit"> | string
    code?: StringFilter<"OrganizationalUnit"> | string
    nameFa?: StringFilter<"OrganizationalUnit"> | string
    parentId?: StringNullableFilter<"OrganizationalUnit"> | string | null
  }

  export type PositionUpsertWithWhereUniqueWithoutOrgUnitInput = {
    where: PositionWhereUniqueInput
    update: XOR<PositionUpdateWithoutOrgUnitInput, PositionUncheckedUpdateWithoutOrgUnitInput>
    create: XOR<PositionCreateWithoutOrgUnitInput, PositionUncheckedCreateWithoutOrgUnitInput>
  }

  export type PositionUpdateWithWhereUniqueWithoutOrgUnitInput = {
    where: PositionWhereUniqueInput
    data: XOR<PositionUpdateWithoutOrgUnitInput, PositionUncheckedUpdateWithoutOrgUnitInput>
  }

  export type PositionUpdateManyWithWhereWithoutOrgUnitInput = {
    where: PositionScalarWhereInput
    data: XOR<PositionUpdateManyMutationInput, PositionUncheckedUpdateManyWithoutOrgUnitInput>
  }

  export type PositionScalarWhereInput = {
    AND?: PositionScalarWhereInput | PositionScalarWhereInput[]
    OR?: PositionScalarWhereInput[]
    NOT?: PositionScalarWhereInput | PositionScalarWhereInput[]
    id?: StringFilter<"Position"> | string
    tenantId?: StringFilter<"Position"> | string
    code?: StringFilter<"Position"> | string
    nameFa?: StringFilter<"Position"> | string
    orgUnitId?: StringFilter<"Position"> | string
  }

  export type OrganizationalUnitCreateWithoutPositionsInput = {
    id?: string
    tenantId: string
    code: string
    nameFa: string
    parent?: OrganizationalUnitCreateNestedOneWithoutChildrenInput
    children?: OrganizationalUnitCreateNestedManyWithoutParentInput
  }

  export type OrganizationalUnitUncheckedCreateWithoutPositionsInput = {
    id?: string
    tenantId: string
    code: string
    nameFa: string
    parentId?: string | null
    children?: OrganizationalUnitUncheckedCreateNestedManyWithoutParentInput
  }

  export type OrganizationalUnitCreateOrConnectWithoutPositionsInput = {
    where: OrganizationalUnitWhereUniqueInput
    create: XOR<OrganizationalUnitCreateWithoutPositionsInput, OrganizationalUnitUncheckedCreateWithoutPositionsInput>
  }

  export type OrganizationalUnitUpsertWithoutPositionsInput = {
    update: XOR<OrganizationalUnitUpdateWithoutPositionsInput, OrganizationalUnitUncheckedUpdateWithoutPositionsInput>
    create: XOR<OrganizationalUnitCreateWithoutPositionsInput, OrganizationalUnitUncheckedCreateWithoutPositionsInput>
    where?: OrganizationalUnitWhereInput
  }

  export type OrganizationalUnitUpdateToOneWithWhereWithoutPositionsInput = {
    where?: OrganizationalUnitWhereInput
    data: XOR<OrganizationalUnitUpdateWithoutPositionsInput, OrganizationalUnitUncheckedUpdateWithoutPositionsInput>
  }

  export type OrganizationalUnitUpdateWithoutPositionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameFa?: StringFieldUpdateOperationsInput | string
    parent?: OrganizationalUnitUpdateOneWithoutChildrenNestedInput
    children?: OrganizationalUnitUpdateManyWithoutParentNestedInput
  }

  export type OrganizationalUnitUncheckedUpdateWithoutPositionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameFa?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    children?: OrganizationalUnitUncheckedUpdateManyWithoutParentNestedInput
  }

  export type EmployeeCreateWithoutAttendanceRecordsInput = {
    id?: string
    tenantId: string
    employeeNumber: string
    fullName: string
    nationalId: string
    birthDate: Date | string
    phone?: string | null
    email?: string | null
    address?: string | null
    hireDate: Date | string
    status?: $Enums.EmployeeStatus
    createdAt?: Date | string
    leaveRequests?: LeaveRequestCreateNestedManyWithoutEmployeeInput
    contracts?: EmployeeContractCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutAttendanceRecordsInput = {
    id?: string
    tenantId: string
    employeeNumber: string
    fullName: string
    nationalId: string
    birthDate: Date | string
    phone?: string | null
    email?: string | null
    address?: string | null
    hireDate: Date | string
    status?: $Enums.EmployeeStatus
    createdAt?: Date | string
    leaveRequests?: LeaveRequestUncheckedCreateNestedManyWithoutEmployeeInput
    contracts?: EmployeeContractUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutAttendanceRecordsInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutAttendanceRecordsInput, EmployeeUncheckedCreateWithoutAttendanceRecordsInput>
  }

  export type EmployeeUpsertWithoutAttendanceRecordsInput = {
    update: XOR<EmployeeUpdateWithoutAttendanceRecordsInput, EmployeeUncheckedUpdateWithoutAttendanceRecordsInput>
    create: XOR<EmployeeCreateWithoutAttendanceRecordsInput, EmployeeUncheckedCreateWithoutAttendanceRecordsInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutAttendanceRecordsInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutAttendanceRecordsInput, EmployeeUncheckedUpdateWithoutAttendanceRecordsInput>
  }

  export type EmployeeUpdateWithoutAttendanceRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    employeeNumber?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    nationalId?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    hireDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leaveRequests?: LeaveRequestUpdateManyWithoutEmployeeNestedInput
    contracts?: EmployeeContractUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutAttendanceRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    employeeNumber?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    nationalId?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    hireDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leaveRequests?: LeaveRequestUncheckedUpdateManyWithoutEmployeeNestedInput
    contracts?: EmployeeContractUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeCreateWithoutContractsInput = {
    id?: string
    tenantId: string
    employeeNumber: string
    fullName: string
    nationalId: string
    birthDate: Date | string
    phone?: string | null
    email?: string | null
    address?: string | null
    hireDate: Date | string
    status?: $Enums.EmployeeStatus
    createdAt?: Date | string
    leaveRequests?: LeaveRequestCreateNestedManyWithoutEmployeeInput
    attendanceRecords?: AttendanceRecordCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutContractsInput = {
    id?: string
    tenantId: string
    employeeNumber: string
    fullName: string
    nationalId: string
    birthDate: Date | string
    phone?: string | null
    email?: string | null
    address?: string | null
    hireDate: Date | string
    status?: $Enums.EmployeeStatus
    createdAt?: Date | string
    leaveRequests?: LeaveRequestUncheckedCreateNestedManyWithoutEmployeeInput
    attendanceRecords?: AttendanceRecordUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutContractsInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutContractsInput, EmployeeUncheckedCreateWithoutContractsInput>
  }

  export type EmployeeUpsertWithoutContractsInput = {
    update: XOR<EmployeeUpdateWithoutContractsInput, EmployeeUncheckedUpdateWithoutContractsInput>
    create: XOR<EmployeeCreateWithoutContractsInput, EmployeeUncheckedCreateWithoutContractsInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutContractsInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutContractsInput, EmployeeUncheckedUpdateWithoutContractsInput>
  }

  export type EmployeeUpdateWithoutContractsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    employeeNumber?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    nationalId?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    hireDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leaveRequests?: LeaveRequestUpdateManyWithoutEmployeeNestedInput
    attendanceRecords?: AttendanceRecordUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutContractsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    employeeNumber?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    nationalId?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    hireDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leaveRequests?: LeaveRequestUncheckedUpdateManyWithoutEmployeeNestedInput
    attendanceRecords?: AttendanceRecordUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeCreateWithoutLeaveRequestsInput = {
    id?: string
    tenantId: string
    employeeNumber: string
    fullName: string
    nationalId: string
    birthDate: Date | string
    phone?: string | null
    email?: string | null
    address?: string | null
    hireDate: Date | string
    status?: $Enums.EmployeeStatus
    createdAt?: Date | string
    attendanceRecords?: AttendanceRecordCreateNestedManyWithoutEmployeeInput
    contracts?: EmployeeContractCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutLeaveRequestsInput = {
    id?: string
    tenantId: string
    employeeNumber: string
    fullName: string
    nationalId: string
    birthDate: Date | string
    phone?: string | null
    email?: string | null
    address?: string | null
    hireDate: Date | string
    status?: $Enums.EmployeeStatus
    createdAt?: Date | string
    attendanceRecords?: AttendanceRecordUncheckedCreateNestedManyWithoutEmployeeInput
    contracts?: EmployeeContractUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutLeaveRequestsInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutLeaveRequestsInput, EmployeeUncheckedCreateWithoutLeaveRequestsInput>
  }

  export type EmployeeUpsertWithoutLeaveRequestsInput = {
    update: XOR<EmployeeUpdateWithoutLeaveRequestsInput, EmployeeUncheckedUpdateWithoutLeaveRequestsInput>
    create: XOR<EmployeeCreateWithoutLeaveRequestsInput, EmployeeUncheckedCreateWithoutLeaveRequestsInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutLeaveRequestsInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutLeaveRequestsInput, EmployeeUncheckedUpdateWithoutLeaveRequestsInput>
  }

  export type EmployeeUpdateWithoutLeaveRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    employeeNumber?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    nationalId?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    hireDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendanceRecords?: AttendanceRecordUpdateManyWithoutEmployeeNestedInput
    contracts?: EmployeeContractUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutLeaveRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    employeeNumber?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    nationalId?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    hireDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendanceRecords?: AttendanceRecordUncheckedUpdateManyWithoutEmployeeNestedInput
    contracts?: EmployeeContractUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type LeaveRequestCreateManyEmployeeInput = {
    id?: string
    tenantId: string
    type: string
    startDate: Date | string
    endDate: Date | string
    status?: $Enums.LeaveRequestStatus
    correlationId: string
  }

  export type AttendanceRecordCreateManyEmployeeInput = {
    id?: string
    tenantId: string
    date: Date | string
    checkIn?: Date | string | null
    checkOut?: Date | string | null
    status?: $Enums.AttendanceStatus
  }

  export type EmployeeContractCreateManyEmployeeInput = {
    id?: string
    tenantId: string
    startDate: Date | string
    endDate?: Date | string | null
    salaryBase: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: $Enums.ContractStatus
  }

  export type LeaveRequestUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLeaveRequestStatusFieldUpdateOperationsInput | $Enums.LeaveRequestStatus
    correlationId?: StringFieldUpdateOperationsInput | string
  }

  export type LeaveRequestUncheckedUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLeaveRequestStatusFieldUpdateOperationsInput | $Enums.LeaveRequestStatus
    correlationId?: StringFieldUpdateOperationsInput | string
  }

  export type LeaveRequestUncheckedUpdateManyWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLeaveRequestStatusFieldUpdateOperationsInput | $Enums.LeaveRequestStatus
    correlationId?: StringFieldUpdateOperationsInput | string
  }

  export type AttendanceRecordUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    checkIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus
  }

  export type AttendanceRecordUncheckedUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    checkIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus
  }

  export type AttendanceRecordUncheckedUpdateManyWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    checkIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus
  }

  export type EmployeeContractUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    salaryBase?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumContractStatusFieldUpdateOperationsInput | $Enums.ContractStatus
  }

  export type EmployeeContractUncheckedUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    salaryBase?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumContractStatusFieldUpdateOperationsInput | $Enums.ContractStatus
  }

  export type EmployeeContractUncheckedUpdateManyWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    salaryBase?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumContractStatusFieldUpdateOperationsInput | $Enums.ContractStatus
  }

  export type OrganizationalUnitCreateManyParentInput = {
    id?: string
    tenantId: string
    code: string
    nameFa: string
  }

  export type PositionCreateManyOrgUnitInput = {
    id?: string
    tenantId: string
    code: string
    nameFa: string
  }

  export type OrganizationalUnitUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameFa?: StringFieldUpdateOperationsInput | string
    children?: OrganizationalUnitUpdateManyWithoutParentNestedInput
    positions?: PositionUpdateManyWithoutOrgUnitNestedInput
  }

  export type OrganizationalUnitUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameFa?: StringFieldUpdateOperationsInput | string
    children?: OrganizationalUnitUncheckedUpdateManyWithoutParentNestedInput
    positions?: PositionUncheckedUpdateManyWithoutOrgUnitNestedInput
  }

  export type OrganizationalUnitUncheckedUpdateManyWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameFa?: StringFieldUpdateOperationsInput | string
  }

  export type PositionUpdateWithoutOrgUnitInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameFa?: StringFieldUpdateOperationsInput | string
  }

  export type PositionUncheckedUpdateWithoutOrgUnitInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameFa?: StringFieldUpdateOperationsInput | string
  }

  export type PositionUncheckedUpdateManyWithoutOrgUnitInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nameFa?: StringFieldUpdateOperationsInput | string
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