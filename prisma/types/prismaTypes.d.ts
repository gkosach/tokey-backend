
/**
 * Client
**/

import * as runtime from '@prisma/client/runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Wallet
 * 
 */
export type Wallet = $Result.DefaultSelection<Prisma.$WalletPayload>
/**
 * Model Property
 * 
 */
export type Property = $Result.DefaultSelection<Prisma.$PropertyPayload>
/**
 * Model PaymentTransaction
 * 
 */
export type PaymentTransaction = $Result.DefaultSelection<Prisma.$PaymentTransactionPayload>
/**
 * Model StakingRecord
 * 
 */
export type StakingRecord = $Result.DefaultSelection<Prisma.$StakingRecordPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const KycStatus: {
  NOT_STARTED: 'NOT_STARTED',
  PENDING: 'PENDING',
  VERIFIED: 'VERIFIED',
  FAILED: 'FAILED'
};

export type KycStatus = (typeof KycStatus)[keyof typeof KycStatus]


export const ModerationStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type ModerationStatus = (typeof ModerationStatus)[keyof typeof ModerationStatus]

}

export type KycStatus = $Enums.KycStatus

export const KycStatus: typeof $Enums.KycStatus

export type ModerationStatus = $Enums.ModerationStatus

export const ModerationStatus: typeof $Enums.ModerationStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
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
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wallet`: Exposes CRUD operations for the **Wallet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Wallets
    * const wallets = await prisma.wallet.findMany()
    * ```
    */
  get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.property`: Exposes CRUD operations for the **Property** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Properties
    * const properties = await prisma.property.findMany()
    * ```
    */
  get property(): Prisma.PropertyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.paymentTransaction`: Exposes CRUD operations for the **PaymentTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PaymentTransactions
    * const paymentTransactions = await prisma.paymentTransaction.findMany()
    * ```
    */
  get paymentTransaction(): Prisma.PaymentTransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.stakingRecord`: Exposes CRUD operations for the **StakingRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StakingRecords
    * const stakingRecords = await prisma.stakingRecord.findMany()
    * ```
    */
  get stakingRecord(): Prisma.StakingRecordDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


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
    User: 'User',
    Wallet: 'Wallet',
    Property: 'Property',
    PaymentTransaction: 'PaymentTransaction',
    StakingRecord: 'StakingRecord'
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
      modelProps: "user" | "wallet" | "property" | "paymentTransaction" | "stakingRecord"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Wallet: {
        payload: Prisma.$WalletPayload<ExtArgs>
        fields: Prisma.WalletFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WalletFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WalletFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          findFirst: {
            args: Prisma.WalletFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WalletFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          findMany: {
            args: Prisma.WalletFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          create: {
            args: Prisma.WalletCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          createMany: {
            args: Prisma.WalletCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WalletCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          delete: {
            args: Prisma.WalletDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          update: {
            args: Prisma.WalletUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          deleteMany: {
            args: Prisma.WalletDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WalletUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WalletUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          upsert: {
            args: Prisma.WalletUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          aggregate: {
            args: Prisma.WalletAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWallet>
          }
          groupBy: {
            args: Prisma.WalletGroupByArgs<ExtArgs>
            result: $Utils.Optional<WalletGroupByOutputType>[]
          }
          count: {
            args: Prisma.WalletCountArgs<ExtArgs>
            result: $Utils.Optional<WalletCountAggregateOutputType> | number
          }
        }
      }
      Property: {
        payload: Prisma.$PropertyPayload<ExtArgs>
        fields: Prisma.PropertyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PropertyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PropertyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          findFirst: {
            args: Prisma.PropertyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PropertyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          findMany: {
            args: Prisma.PropertyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>[]
          }
          create: {
            args: Prisma.PropertyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          createMany: {
            args: Prisma.PropertyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PropertyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>[]
          }
          delete: {
            args: Prisma.PropertyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          update: {
            args: Prisma.PropertyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          deleteMany: {
            args: Prisma.PropertyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PropertyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PropertyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>[]
          }
          upsert: {
            args: Prisma.PropertyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          aggregate: {
            args: Prisma.PropertyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProperty>
          }
          groupBy: {
            args: Prisma.PropertyGroupByArgs<ExtArgs>
            result: $Utils.Optional<PropertyGroupByOutputType>[]
          }
          count: {
            args: Prisma.PropertyCountArgs<ExtArgs>
            result: $Utils.Optional<PropertyCountAggregateOutputType> | number
          }
        }
      }
      PaymentTransaction: {
        payload: Prisma.$PaymentTransactionPayload<ExtArgs>
        fields: Prisma.PaymentTransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentTransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentTransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentTransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>
          }
          findFirst: {
            args: Prisma.PaymentTransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentTransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentTransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>
          }
          findMany: {
            args: Prisma.PaymentTransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>[]
          }
          create: {
            args: Prisma.PaymentTransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>
          }
          createMany: {
            args: Prisma.PaymentTransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentTransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>[]
          }
          delete: {
            args: Prisma.PaymentTransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>
          }
          update: {
            args: Prisma.PaymentTransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>
          }
          deleteMany: {
            args: Prisma.PaymentTransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentTransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentTransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>[]
          }
          upsert: {
            args: Prisma.PaymentTransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>
          }
          aggregate: {
            args: Prisma.PaymentTransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePaymentTransaction>
          }
          groupBy: {
            args: Prisma.PaymentTransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentTransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentTransactionCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentTransactionCountAggregateOutputType> | number
          }
        }
      }
      StakingRecord: {
        payload: Prisma.$StakingRecordPayload<ExtArgs>
        fields: Prisma.StakingRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StakingRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StakingRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StakingRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StakingRecordPayload>
          }
          findFirst: {
            args: Prisma.StakingRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StakingRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StakingRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StakingRecordPayload>
          }
          findMany: {
            args: Prisma.StakingRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StakingRecordPayload>[]
          }
          create: {
            args: Prisma.StakingRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StakingRecordPayload>
          }
          createMany: {
            args: Prisma.StakingRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StakingRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StakingRecordPayload>[]
          }
          delete: {
            args: Prisma.StakingRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StakingRecordPayload>
          }
          update: {
            args: Prisma.StakingRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StakingRecordPayload>
          }
          deleteMany: {
            args: Prisma.StakingRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StakingRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StakingRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StakingRecordPayload>[]
          }
          upsert: {
            args: Prisma.StakingRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StakingRecordPayload>
          }
          aggregate: {
            args: Prisma.StakingRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStakingRecord>
          }
          groupBy: {
            args: Prisma.StakingRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<StakingRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.StakingRecordCountArgs<ExtArgs>
            result: $Utils.Optional<StakingRecordCountAggregateOutputType> | number
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
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
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
    user?: UserOmit
    wallet?: WalletOmit
    property?: PropertyOmit
    paymentTransaction?: PaymentTransactionOmit
    stakingRecord?: StakingRecordOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    wallets: number
    properties: number
    transactions: number
    stakingRecords: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallets?: boolean | UserCountOutputTypeCountWalletsArgs
    properties?: boolean | UserCountOutputTypeCountPropertiesArgs
    transactions?: boolean | UserCountOutputTypeCountTransactionsArgs
    stakingRecords?: boolean | UserCountOutputTypeCountStakingRecordsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWalletsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WalletWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPropertiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentTransactionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountStakingRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StakingRecordWhereInput
  }


  /**
   * Count Type WalletCountOutputType
   */

  export type WalletCountOutputType = {
    transactions: number
  }

  export type WalletCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | WalletCountOutputTypeCountTransactionsArgs
  }

  // Custom InputTypes
  /**
   * WalletCountOutputType without action
   */
  export type WalletCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletCountOutputType
     */
    select?: WalletCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WalletCountOutputType without action
   */
  export type WalletCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentTransactionWhereInput
  }


  /**
   * Count Type PropertyCountOutputType
   */

  export type PropertyCountOutputType = {
    stakingRecords: number
  }

  export type PropertyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stakingRecords?: boolean | PropertyCountOutputTypeCountStakingRecordsArgs
  }

  // Custom InputTypes
  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyCountOutputType
     */
    select?: PropertyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountStakingRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StakingRecordWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    cognitoId: string | null
    name: string | null
    email: string | null
    phoneNumber: string | null
    kycStatus: $Enums.KycStatus | null
    kycVerificationId: string | null
    kycVerifiedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    cognitoId: string | null
    name: string | null
    email: string | null
    phoneNumber: string | null
    kycStatus: $Enums.KycStatus | null
    kycVerificationId: string | null
    kycVerifiedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    cognitoId: number
    name: number
    email: number
    phoneNumber: number
    kycStatus: number
    kycVerificationId: number
    kycVerifiedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    cognitoId?: true
    name?: true
    email?: true
    phoneNumber?: true
    kycStatus?: true
    kycVerificationId?: true
    kycVerifiedAt?: true
  }

  export type UserMaxAggregateInputType = {
    cognitoId?: true
    name?: true
    email?: true
    phoneNumber?: true
    kycStatus?: true
    kycVerificationId?: true
    kycVerifiedAt?: true
  }

  export type UserCountAggregateInputType = {
    cognitoId?: true
    name?: true
    email?: true
    phoneNumber?: true
    kycStatus?: true
    kycVerificationId?: true
    kycVerifiedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    kycStatus: $Enums.KycStatus
    kycVerificationId: string | null
    kycVerifiedAt: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    cognitoId?: boolean
    name?: boolean
    email?: boolean
    phoneNumber?: boolean
    kycStatus?: boolean
    kycVerificationId?: boolean
    kycVerifiedAt?: boolean
    wallets?: boolean | User$walletsArgs<ExtArgs>
    properties?: boolean | User$propertiesArgs<ExtArgs>
    transactions?: boolean | User$transactionsArgs<ExtArgs>
    stakingRecords?: boolean | User$stakingRecordsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    cognitoId?: boolean
    name?: boolean
    email?: boolean
    phoneNumber?: boolean
    kycStatus?: boolean
    kycVerificationId?: boolean
    kycVerifiedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    cognitoId?: boolean
    name?: boolean
    email?: boolean
    phoneNumber?: boolean
    kycStatus?: boolean
    kycVerificationId?: boolean
    kycVerifiedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    cognitoId?: boolean
    name?: boolean
    email?: boolean
    phoneNumber?: boolean
    kycStatus?: boolean
    kycVerificationId?: boolean
    kycVerifiedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"cognitoId" | "name" | "email" | "phoneNumber" | "kycStatus" | "kycVerificationId" | "kycVerifiedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallets?: boolean | User$walletsArgs<ExtArgs>
    properties?: boolean | User$propertiesArgs<ExtArgs>
    transactions?: boolean | User$transactionsArgs<ExtArgs>
    stakingRecords?: boolean | User$stakingRecordsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      wallets: Prisma.$WalletPayload<ExtArgs>[]
      properties: Prisma.$PropertyPayload<ExtArgs>[]
      transactions: Prisma.$PaymentTransactionPayload<ExtArgs>[]
      stakingRecords: Prisma.$StakingRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      cognitoId: string
      name: string
      email: string
      phoneNumber: string
      kycStatus: $Enums.KycStatus
      kycVerificationId: string | null
      kycVerifiedAt: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `cognitoId`
     * const userWithCognitoIdOnly = await prisma.user.findMany({ select: { cognitoId: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `cognitoId`
     * const userWithCognitoIdOnly = await prisma.user.createManyAndReturn({
     *   select: { cognitoId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `cognitoId`
     * const userWithCognitoIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { cognitoId: true },
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    wallets<T extends User$walletsArgs<ExtArgs> = {}>(args?: Subset<T, User$walletsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    properties<T extends User$propertiesArgs<ExtArgs> = {}>(args?: Subset<T, User$propertiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transactions<T extends User$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, User$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    stakingRecords<T extends User$stakingRecordsArgs<ExtArgs> = {}>(args?: Subset<T, User$stakingRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StakingRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly cognitoId: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly phoneNumber: FieldRef<"User", 'String'>
    readonly kycStatus: FieldRef<"User", 'KycStatus'>
    readonly kycVerificationId: FieldRef<"User", 'String'>
    readonly kycVerifiedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.wallets
   */
  export type User$walletsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    where?: WalletWhereInput
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    cursor?: WalletWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * User.properties
   */
  export type User$propertiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    where?: PropertyWhereInput
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    cursor?: PropertyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[]
  }

  /**
   * User.transactions
   */
  export type User$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionInclude<ExtArgs> | null
    where?: PaymentTransactionWhereInput
    orderBy?: PaymentTransactionOrderByWithRelationInput | PaymentTransactionOrderByWithRelationInput[]
    cursor?: PaymentTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentTransactionScalarFieldEnum | PaymentTransactionScalarFieldEnum[]
  }

  /**
   * User.stakingRecords
   */
  export type User$stakingRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StakingRecord
     */
    select?: StakingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StakingRecord
     */
    omit?: StakingRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StakingRecordInclude<ExtArgs> | null
    where?: StakingRecordWhereInput
    orderBy?: StakingRecordOrderByWithRelationInput | StakingRecordOrderByWithRelationInput[]
    cursor?: StakingRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StakingRecordScalarFieldEnum | StakingRecordScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Wallet
   */

  export type AggregateWallet = {
    _count: WalletCountAggregateOutputType | null
    _min: WalletMinAggregateOutputType | null
    _max: WalletMaxAggregateOutputType | null
  }

  export type WalletMinAggregateOutputType = {
    id: string | null
    address: string | null
    whitelisted: boolean | null
    userId: string | null
  }

  export type WalletMaxAggregateOutputType = {
    id: string | null
    address: string | null
    whitelisted: boolean | null
    userId: string | null
  }

  export type WalletCountAggregateOutputType = {
    id: number
    address: number
    whitelisted: number
    userId: number
    _all: number
  }


  export type WalletMinAggregateInputType = {
    id?: true
    address?: true
    whitelisted?: true
    userId?: true
  }

  export type WalletMaxAggregateInputType = {
    id?: true
    address?: true
    whitelisted?: true
    userId?: true
  }

  export type WalletCountAggregateInputType = {
    id?: true
    address?: true
    whitelisted?: true
    userId?: true
    _all?: true
  }

  export type WalletAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wallet to aggregate.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Wallets
    **/
    _count?: true | WalletCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WalletMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WalletMaxAggregateInputType
  }

  export type GetWalletAggregateType<T extends WalletAggregateArgs> = {
        [P in keyof T & keyof AggregateWallet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWallet[P]>
      : GetScalarType<T[P], AggregateWallet[P]>
  }




  export type WalletGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WalletWhereInput
    orderBy?: WalletOrderByWithAggregationInput | WalletOrderByWithAggregationInput[]
    by: WalletScalarFieldEnum[] | WalletScalarFieldEnum
    having?: WalletScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WalletCountAggregateInputType | true
    _min?: WalletMinAggregateInputType
    _max?: WalletMaxAggregateInputType
  }

  export type WalletGroupByOutputType = {
    id: string
    address: string
    whitelisted: boolean
    userId: string
    _count: WalletCountAggregateOutputType | null
    _min: WalletMinAggregateOutputType | null
    _max: WalletMaxAggregateOutputType | null
  }

  type GetWalletGroupByPayload<T extends WalletGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WalletGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WalletGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WalletGroupByOutputType[P]>
            : GetScalarType<T[P], WalletGroupByOutputType[P]>
        }
      >
    >


  export type WalletSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    whitelisted?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    transactions?: boolean | Wallet$transactionsArgs<ExtArgs>
    _count?: boolean | WalletCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    whitelisted?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    whitelisted?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectScalar = {
    id?: boolean
    address?: boolean
    whitelisted?: boolean
    userId?: boolean
  }

  export type WalletOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "address" | "whitelisted" | "userId", ExtArgs["result"]["wallet"]>
  export type WalletInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    transactions?: boolean | Wallet$transactionsArgs<ExtArgs>
    _count?: boolean | WalletCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WalletIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WalletIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WalletPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Wallet"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      transactions: Prisma.$PaymentTransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      address: string
      whitelisted: boolean
      userId: string
    }, ExtArgs["result"]["wallet"]>
    composites: {}
  }

  type WalletGetPayload<S extends boolean | null | undefined | WalletDefaultArgs> = $Result.GetResult<Prisma.$WalletPayload, S>

  type WalletCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WalletFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WalletCountAggregateInputType | true
    }

  export interface WalletDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Wallet'], meta: { name: 'Wallet' } }
    /**
     * Find zero or one Wallet that matches the filter.
     * @param {WalletFindUniqueArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WalletFindUniqueArgs>(args: SelectSubset<T, WalletFindUniqueArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Wallet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WalletFindUniqueOrThrowArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WalletFindUniqueOrThrowArgs>(args: SelectSubset<T, WalletFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wallet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindFirstArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WalletFindFirstArgs>(args?: SelectSubset<T, WalletFindFirstArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wallet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindFirstOrThrowArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WalletFindFirstOrThrowArgs>(args?: SelectSubset<T, WalletFindFirstOrThrowArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Wallets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Wallets
     * const wallets = await prisma.wallet.findMany()
     * 
     * // Get first 10 Wallets
     * const wallets = await prisma.wallet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const walletWithIdOnly = await prisma.wallet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WalletFindManyArgs>(args?: SelectSubset<T, WalletFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Wallet.
     * @param {WalletCreateArgs} args - Arguments to create a Wallet.
     * @example
     * // Create one Wallet
     * const Wallet = await prisma.wallet.create({
     *   data: {
     *     // ... data to create a Wallet
     *   }
     * })
     * 
     */
    create<T extends WalletCreateArgs>(args: SelectSubset<T, WalletCreateArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Wallets.
     * @param {WalletCreateManyArgs} args - Arguments to create many Wallets.
     * @example
     * // Create many Wallets
     * const wallet = await prisma.wallet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WalletCreateManyArgs>(args?: SelectSubset<T, WalletCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Wallets and returns the data saved in the database.
     * @param {WalletCreateManyAndReturnArgs} args - Arguments to create many Wallets.
     * @example
     * // Create many Wallets
     * const wallet = await prisma.wallet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Wallets and only return the `id`
     * const walletWithIdOnly = await prisma.wallet.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WalletCreateManyAndReturnArgs>(args?: SelectSubset<T, WalletCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Wallet.
     * @param {WalletDeleteArgs} args - Arguments to delete one Wallet.
     * @example
     * // Delete one Wallet
     * const Wallet = await prisma.wallet.delete({
     *   where: {
     *     // ... filter to delete one Wallet
     *   }
     * })
     * 
     */
    delete<T extends WalletDeleteArgs>(args: SelectSubset<T, WalletDeleteArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Wallet.
     * @param {WalletUpdateArgs} args - Arguments to update one Wallet.
     * @example
     * // Update one Wallet
     * const wallet = await prisma.wallet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WalletUpdateArgs>(args: SelectSubset<T, WalletUpdateArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Wallets.
     * @param {WalletDeleteManyArgs} args - Arguments to filter Wallets to delete.
     * @example
     * // Delete a few Wallets
     * const { count } = await prisma.wallet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WalletDeleteManyArgs>(args?: SelectSubset<T, WalletDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Wallets
     * const wallet = await prisma.wallet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WalletUpdateManyArgs>(args: SelectSubset<T, WalletUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wallets and returns the data updated in the database.
     * @param {WalletUpdateManyAndReturnArgs} args - Arguments to update many Wallets.
     * @example
     * // Update many Wallets
     * const wallet = await prisma.wallet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Wallets and only return the `id`
     * const walletWithIdOnly = await prisma.wallet.updateManyAndReturn({
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
    updateManyAndReturn<T extends WalletUpdateManyAndReturnArgs>(args: SelectSubset<T, WalletUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Wallet.
     * @param {WalletUpsertArgs} args - Arguments to update or create a Wallet.
     * @example
     * // Update or create a Wallet
     * const wallet = await prisma.wallet.upsert({
     *   create: {
     *     // ... data to create a Wallet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Wallet we want to update
     *   }
     * })
     */
    upsert<T extends WalletUpsertArgs>(args: SelectSubset<T, WalletUpsertArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Wallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletCountArgs} args - Arguments to filter Wallets to count.
     * @example
     * // Count the number of Wallets
     * const count = await prisma.wallet.count({
     *   where: {
     *     // ... the filter for the Wallets we want to count
     *   }
     * })
    **/
    count<T extends WalletCountArgs>(
      args?: Subset<T, WalletCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WalletCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Wallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WalletAggregateArgs>(args: Subset<T, WalletAggregateArgs>): Prisma.PrismaPromise<GetWalletAggregateType<T>>

    /**
     * Group by Wallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletGroupByArgs} args - Group by arguments.
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
      T extends WalletGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WalletGroupByArgs['orderBy'] }
        : { orderBy?: WalletGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WalletGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWalletGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Wallet model
   */
  readonly fields: WalletFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Wallet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WalletClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    transactions<T extends Wallet$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, Wallet$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Wallet model
   */
  interface WalletFieldRefs {
    readonly id: FieldRef<"Wallet", 'String'>
    readonly address: FieldRef<"Wallet", 'String'>
    readonly whitelisted: FieldRef<"Wallet", 'Boolean'>
    readonly userId: FieldRef<"Wallet", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Wallet findUnique
   */
  export type WalletFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet findUniqueOrThrow
   */
  export type WalletFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet findFirst
   */
  export type WalletFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wallets.
     */
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet findFirstOrThrow
   */
  export type WalletFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wallets.
     */
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet findMany
   */
  export type WalletFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallets to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet create
   */
  export type WalletCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The data needed to create a Wallet.
     */
    data: XOR<WalletCreateInput, WalletUncheckedCreateInput>
  }

  /**
   * Wallet createMany
   */
  export type WalletCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Wallets.
     */
    data: WalletCreateManyInput | WalletCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Wallet createManyAndReturn
   */
  export type WalletCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * The data used to create many Wallets.
     */
    data: WalletCreateManyInput | WalletCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Wallet update
   */
  export type WalletUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The data needed to update a Wallet.
     */
    data: XOR<WalletUpdateInput, WalletUncheckedUpdateInput>
    /**
     * Choose, which Wallet to update.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet updateMany
   */
  export type WalletUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Wallets.
     */
    data: XOR<WalletUpdateManyMutationInput, WalletUncheckedUpdateManyInput>
    /**
     * Filter which Wallets to update
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to update.
     */
    limit?: number
  }

  /**
   * Wallet updateManyAndReturn
   */
  export type WalletUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * The data used to update Wallets.
     */
    data: XOR<WalletUpdateManyMutationInput, WalletUncheckedUpdateManyInput>
    /**
     * Filter which Wallets to update
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Wallet upsert
   */
  export type WalletUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The filter to search for the Wallet to update in case it exists.
     */
    where: WalletWhereUniqueInput
    /**
     * In case the Wallet found by the `where` argument doesn't exist, create a new Wallet with this data.
     */
    create: XOR<WalletCreateInput, WalletUncheckedCreateInput>
    /**
     * In case the Wallet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WalletUpdateInput, WalletUncheckedUpdateInput>
  }

  /**
   * Wallet delete
   */
  export type WalletDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter which Wallet to delete.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet deleteMany
   */
  export type WalletDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wallets to delete
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to delete.
     */
    limit?: number
  }

  /**
   * Wallet.transactions
   */
  export type Wallet$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionInclude<ExtArgs> | null
    where?: PaymentTransactionWhereInput
    orderBy?: PaymentTransactionOrderByWithRelationInput | PaymentTransactionOrderByWithRelationInput[]
    cursor?: PaymentTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentTransactionScalarFieldEnum | PaymentTransactionScalarFieldEnum[]
  }

  /**
   * Wallet without action
   */
  export type WalletDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
  }


  /**
   * Model Property
   */

  export type AggregateProperty = {
    _count: PropertyCountAggregateOutputType | null
    _min: PropertyMinAggregateOutputType | null
    _max: PropertyMaxAggregateOutputType | null
  }

  export type PropertyMinAggregateOutputType = {
    id: string | null
    title: string | null
    solanaMint: string | null
    ownerId: string | null
    moderationStatus: $Enums.ModerationStatus | null
    moderationComment: string | null
    tokenizationDate: Date | null
  }

  export type PropertyMaxAggregateOutputType = {
    id: string | null
    title: string | null
    solanaMint: string | null
    ownerId: string | null
    moderationStatus: $Enums.ModerationStatus | null
    moderationComment: string | null
    tokenizationDate: Date | null
  }

  export type PropertyCountAggregateOutputType = {
    id: number
    title: number
    solanaMint: number
    ownerId: number
    metadata: number
    moderationStatus: number
    moderationComment: number
    tokenizationDate: number
    _all: number
  }


  export type PropertyMinAggregateInputType = {
    id?: true
    title?: true
    solanaMint?: true
    ownerId?: true
    moderationStatus?: true
    moderationComment?: true
    tokenizationDate?: true
  }

  export type PropertyMaxAggregateInputType = {
    id?: true
    title?: true
    solanaMint?: true
    ownerId?: true
    moderationStatus?: true
    moderationComment?: true
    tokenizationDate?: true
  }

  export type PropertyCountAggregateInputType = {
    id?: true
    title?: true
    solanaMint?: true
    ownerId?: true
    metadata?: true
    moderationStatus?: true
    moderationComment?: true
    tokenizationDate?: true
    _all?: true
  }

  export type PropertyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Property to aggregate.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Properties
    **/
    _count?: true | PropertyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PropertyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PropertyMaxAggregateInputType
  }

  export type GetPropertyAggregateType<T extends PropertyAggregateArgs> = {
        [P in keyof T & keyof AggregateProperty]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProperty[P]>
      : GetScalarType<T[P], AggregateProperty[P]>
  }




  export type PropertyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyWhereInput
    orderBy?: PropertyOrderByWithAggregationInput | PropertyOrderByWithAggregationInput[]
    by: PropertyScalarFieldEnum[] | PropertyScalarFieldEnum
    having?: PropertyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PropertyCountAggregateInputType | true
    _min?: PropertyMinAggregateInputType
    _max?: PropertyMaxAggregateInputType
  }

  export type PropertyGroupByOutputType = {
    id: string
    title: string
    solanaMint: string
    ownerId: string
    metadata: JsonValue
    moderationStatus: $Enums.ModerationStatus
    moderationComment: string | null
    tokenizationDate: Date | null
    _count: PropertyCountAggregateOutputType | null
    _min: PropertyMinAggregateOutputType | null
    _max: PropertyMaxAggregateOutputType | null
  }

  type GetPropertyGroupByPayload<T extends PropertyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PropertyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PropertyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PropertyGroupByOutputType[P]>
            : GetScalarType<T[P], PropertyGroupByOutputType[P]>
        }
      >
    >


  export type PropertySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    solanaMint?: boolean
    ownerId?: boolean
    metadata?: boolean
    moderationStatus?: boolean
    moderationComment?: boolean
    tokenizationDate?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
    stakingRecords?: boolean | Property$stakingRecordsArgs<ExtArgs>
    _count?: boolean | PropertyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["property"]>

  export type PropertySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    solanaMint?: boolean
    ownerId?: boolean
    metadata?: boolean
    moderationStatus?: boolean
    moderationComment?: boolean
    tokenizationDate?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["property"]>

  export type PropertySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    solanaMint?: boolean
    ownerId?: boolean
    metadata?: boolean
    moderationStatus?: boolean
    moderationComment?: boolean
    tokenizationDate?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["property"]>

  export type PropertySelectScalar = {
    id?: boolean
    title?: boolean
    solanaMint?: boolean
    ownerId?: boolean
    metadata?: boolean
    moderationStatus?: boolean
    moderationComment?: boolean
    tokenizationDate?: boolean
  }

  export type PropertyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "solanaMint" | "ownerId" | "metadata" | "moderationStatus" | "moderationComment" | "tokenizationDate", ExtArgs["result"]["property"]>
  export type PropertyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
    stakingRecords?: boolean | Property$stakingRecordsArgs<ExtArgs>
    _count?: boolean | PropertyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PropertyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PropertyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PropertyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Property"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs>
      stakingRecords: Prisma.$StakingRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      solanaMint: string
      ownerId: string
      metadata: Prisma.JsonValue
      moderationStatus: $Enums.ModerationStatus
      moderationComment: string | null
      tokenizationDate: Date | null
    }, ExtArgs["result"]["property"]>
    composites: {}
  }

  type PropertyGetPayload<S extends boolean | null | undefined | PropertyDefaultArgs> = $Result.GetResult<Prisma.$PropertyPayload, S>

  type PropertyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PropertyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PropertyCountAggregateInputType | true
    }

  export interface PropertyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Property'], meta: { name: 'Property' } }
    /**
     * Find zero or one Property that matches the filter.
     * @param {PropertyFindUniqueArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PropertyFindUniqueArgs>(args: SelectSubset<T, PropertyFindUniqueArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Property that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PropertyFindUniqueOrThrowArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PropertyFindUniqueOrThrowArgs>(args: SelectSubset<T, PropertyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Property that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyFindFirstArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PropertyFindFirstArgs>(args?: SelectSubset<T, PropertyFindFirstArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Property that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyFindFirstOrThrowArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PropertyFindFirstOrThrowArgs>(args?: SelectSubset<T, PropertyFindFirstOrThrowArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Properties that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Properties
     * const properties = await prisma.property.findMany()
     * 
     * // Get first 10 Properties
     * const properties = await prisma.property.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const propertyWithIdOnly = await prisma.property.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PropertyFindManyArgs>(args?: SelectSubset<T, PropertyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Property.
     * @param {PropertyCreateArgs} args - Arguments to create a Property.
     * @example
     * // Create one Property
     * const Property = await prisma.property.create({
     *   data: {
     *     // ... data to create a Property
     *   }
     * })
     * 
     */
    create<T extends PropertyCreateArgs>(args: SelectSubset<T, PropertyCreateArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Properties.
     * @param {PropertyCreateManyArgs} args - Arguments to create many Properties.
     * @example
     * // Create many Properties
     * const property = await prisma.property.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PropertyCreateManyArgs>(args?: SelectSubset<T, PropertyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Properties and returns the data saved in the database.
     * @param {PropertyCreateManyAndReturnArgs} args - Arguments to create many Properties.
     * @example
     * // Create many Properties
     * const property = await prisma.property.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Properties and only return the `id`
     * const propertyWithIdOnly = await prisma.property.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PropertyCreateManyAndReturnArgs>(args?: SelectSubset<T, PropertyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Property.
     * @param {PropertyDeleteArgs} args - Arguments to delete one Property.
     * @example
     * // Delete one Property
     * const Property = await prisma.property.delete({
     *   where: {
     *     // ... filter to delete one Property
     *   }
     * })
     * 
     */
    delete<T extends PropertyDeleteArgs>(args: SelectSubset<T, PropertyDeleteArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Property.
     * @param {PropertyUpdateArgs} args - Arguments to update one Property.
     * @example
     * // Update one Property
     * const property = await prisma.property.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PropertyUpdateArgs>(args: SelectSubset<T, PropertyUpdateArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Properties.
     * @param {PropertyDeleteManyArgs} args - Arguments to filter Properties to delete.
     * @example
     * // Delete a few Properties
     * const { count } = await prisma.property.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PropertyDeleteManyArgs>(args?: SelectSubset<T, PropertyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Properties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Properties
     * const property = await prisma.property.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PropertyUpdateManyArgs>(args: SelectSubset<T, PropertyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Properties and returns the data updated in the database.
     * @param {PropertyUpdateManyAndReturnArgs} args - Arguments to update many Properties.
     * @example
     * // Update many Properties
     * const property = await prisma.property.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Properties and only return the `id`
     * const propertyWithIdOnly = await prisma.property.updateManyAndReturn({
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
    updateManyAndReturn<T extends PropertyUpdateManyAndReturnArgs>(args: SelectSubset<T, PropertyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Property.
     * @param {PropertyUpsertArgs} args - Arguments to update or create a Property.
     * @example
     * // Update or create a Property
     * const property = await prisma.property.upsert({
     *   create: {
     *     // ... data to create a Property
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Property we want to update
     *   }
     * })
     */
    upsert<T extends PropertyUpsertArgs>(args: SelectSubset<T, PropertyUpsertArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Properties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyCountArgs} args - Arguments to filter Properties to count.
     * @example
     * // Count the number of Properties
     * const count = await prisma.property.count({
     *   where: {
     *     // ... the filter for the Properties we want to count
     *   }
     * })
    **/
    count<T extends PropertyCountArgs>(
      args?: Subset<T, PropertyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PropertyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Property.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PropertyAggregateArgs>(args: Subset<T, PropertyAggregateArgs>): Prisma.PrismaPromise<GetPropertyAggregateType<T>>

    /**
     * Group by Property.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyGroupByArgs} args - Group by arguments.
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
      T extends PropertyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PropertyGroupByArgs['orderBy'] }
        : { orderBy?: PropertyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PropertyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPropertyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Property model
   */
  readonly fields: PropertyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Property.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PropertyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    stakingRecords<T extends Property$stakingRecordsArgs<ExtArgs> = {}>(args?: Subset<T, Property$stakingRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StakingRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Property model
   */
  interface PropertyFieldRefs {
    readonly id: FieldRef<"Property", 'String'>
    readonly title: FieldRef<"Property", 'String'>
    readonly solanaMint: FieldRef<"Property", 'String'>
    readonly ownerId: FieldRef<"Property", 'String'>
    readonly metadata: FieldRef<"Property", 'Json'>
    readonly moderationStatus: FieldRef<"Property", 'ModerationStatus'>
    readonly moderationComment: FieldRef<"Property", 'String'>
    readonly tokenizationDate: FieldRef<"Property", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Property findUnique
   */
  export type PropertyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property findUniqueOrThrow
   */
  export type PropertyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property findFirst
   */
  export type PropertyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Properties.
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Properties.
     */
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[]
  }

  /**
   * Property findFirstOrThrow
   */
  export type PropertyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Properties.
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Properties.
     */
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[]
  }

  /**
   * Property findMany
   */
  export type PropertyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Properties to fetch.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Properties.
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[]
  }

  /**
   * Property create
   */
  export type PropertyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * The data needed to create a Property.
     */
    data: XOR<PropertyCreateInput, PropertyUncheckedCreateInput>
  }

  /**
   * Property createMany
   */
  export type PropertyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Properties.
     */
    data: PropertyCreateManyInput | PropertyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Property createManyAndReturn
   */
  export type PropertyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * The data used to create many Properties.
     */
    data: PropertyCreateManyInput | PropertyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Property update
   */
  export type PropertyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * The data needed to update a Property.
     */
    data: XOR<PropertyUpdateInput, PropertyUncheckedUpdateInput>
    /**
     * Choose, which Property to update.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property updateMany
   */
  export type PropertyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Properties.
     */
    data: XOR<PropertyUpdateManyMutationInput, PropertyUncheckedUpdateManyInput>
    /**
     * Filter which Properties to update
     */
    where?: PropertyWhereInput
    /**
     * Limit how many Properties to update.
     */
    limit?: number
  }

  /**
   * Property updateManyAndReturn
   */
  export type PropertyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * The data used to update Properties.
     */
    data: XOR<PropertyUpdateManyMutationInput, PropertyUncheckedUpdateManyInput>
    /**
     * Filter which Properties to update
     */
    where?: PropertyWhereInput
    /**
     * Limit how many Properties to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Property upsert
   */
  export type PropertyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * The filter to search for the Property to update in case it exists.
     */
    where: PropertyWhereUniqueInput
    /**
     * In case the Property found by the `where` argument doesn't exist, create a new Property with this data.
     */
    create: XOR<PropertyCreateInput, PropertyUncheckedCreateInput>
    /**
     * In case the Property was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PropertyUpdateInput, PropertyUncheckedUpdateInput>
  }

  /**
   * Property delete
   */
  export type PropertyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter which Property to delete.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property deleteMany
   */
  export type PropertyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Properties to delete
     */
    where?: PropertyWhereInput
    /**
     * Limit how many Properties to delete.
     */
    limit?: number
  }

  /**
   * Property.stakingRecords
   */
  export type Property$stakingRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StakingRecord
     */
    select?: StakingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StakingRecord
     */
    omit?: StakingRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StakingRecordInclude<ExtArgs> | null
    where?: StakingRecordWhereInput
    orderBy?: StakingRecordOrderByWithRelationInput | StakingRecordOrderByWithRelationInput[]
    cursor?: StakingRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StakingRecordScalarFieldEnum | StakingRecordScalarFieldEnum[]
  }

  /**
   * Property without action
   */
  export type PropertyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
  }


  /**
   * Model PaymentTransaction
   */

  export type AggregatePaymentTransaction = {
    _count: PaymentTransactionCountAggregateOutputType | null
    _min: PaymentTransactionMinAggregateOutputType | null
    _max: PaymentTransactionMaxAggregateOutputType | null
  }

  export type PaymentTransactionMinAggregateOutputType = {
    id: string | null
    txHash: string | null
    amount: string | null
    fromWallet: string | null
    toWallet: string | null
    propertyId: string | null
    userId: string | null
    walletId: string | null
  }

  export type PaymentTransactionMaxAggregateOutputType = {
    id: string | null
    txHash: string | null
    amount: string | null
    fromWallet: string | null
    toWallet: string | null
    propertyId: string | null
    userId: string | null
    walletId: string | null
  }

  export type PaymentTransactionCountAggregateOutputType = {
    id: number
    txHash: number
    amount: number
    fromWallet: number
    toWallet: number
    propertyId: number
    userId: number
    walletId: number
    _all: number
  }


  export type PaymentTransactionMinAggregateInputType = {
    id?: true
    txHash?: true
    amount?: true
    fromWallet?: true
    toWallet?: true
    propertyId?: true
    userId?: true
    walletId?: true
  }

  export type PaymentTransactionMaxAggregateInputType = {
    id?: true
    txHash?: true
    amount?: true
    fromWallet?: true
    toWallet?: true
    propertyId?: true
    userId?: true
    walletId?: true
  }

  export type PaymentTransactionCountAggregateInputType = {
    id?: true
    txHash?: true
    amount?: true
    fromWallet?: true
    toWallet?: true
    propertyId?: true
    userId?: true
    walletId?: true
    _all?: true
  }

  export type PaymentTransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentTransaction to aggregate.
     */
    where?: PaymentTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentTransactions to fetch.
     */
    orderBy?: PaymentTransactionOrderByWithRelationInput | PaymentTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PaymentTransactions
    **/
    _count?: true | PaymentTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentTransactionMaxAggregateInputType
  }

  export type GetPaymentTransactionAggregateType<T extends PaymentTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregatePaymentTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePaymentTransaction[P]>
      : GetScalarType<T[P], AggregatePaymentTransaction[P]>
  }




  export type PaymentTransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentTransactionWhereInput
    orderBy?: PaymentTransactionOrderByWithAggregationInput | PaymentTransactionOrderByWithAggregationInput[]
    by: PaymentTransactionScalarFieldEnum[] | PaymentTransactionScalarFieldEnum
    having?: PaymentTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentTransactionCountAggregateInputType | true
    _min?: PaymentTransactionMinAggregateInputType
    _max?: PaymentTransactionMaxAggregateInputType
  }

  export type PaymentTransactionGroupByOutputType = {
    id: string
    txHash: string | null
    amount: string
    fromWallet: string
    toWallet: string
    propertyId: string
    userId: string
    walletId: string | null
    _count: PaymentTransactionCountAggregateOutputType | null
    _min: PaymentTransactionMinAggregateOutputType | null
    _max: PaymentTransactionMaxAggregateOutputType | null
  }

  type GetPaymentTransactionGroupByPayload<T extends PaymentTransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentTransactionGroupByOutputType[P]>
        }
      >
    >


  export type PaymentTransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    txHash?: boolean
    amount?: boolean
    fromWallet?: boolean
    toWallet?: boolean
    propertyId?: boolean
    userId?: boolean
    walletId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    Wallet?: boolean | PaymentTransaction$WalletArgs<ExtArgs>
  }, ExtArgs["result"]["paymentTransaction"]>

  export type PaymentTransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    txHash?: boolean
    amount?: boolean
    fromWallet?: boolean
    toWallet?: boolean
    propertyId?: boolean
    userId?: boolean
    walletId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    Wallet?: boolean | PaymentTransaction$WalletArgs<ExtArgs>
  }, ExtArgs["result"]["paymentTransaction"]>

  export type PaymentTransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    txHash?: boolean
    amount?: boolean
    fromWallet?: boolean
    toWallet?: boolean
    propertyId?: boolean
    userId?: boolean
    walletId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    Wallet?: boolean | PaymentTransaction$WalletArgs<ExtArgs>
  }, ExtArgs["result"]["paymentTransaction"]>

  export type PaymentTransactionSelectScalar = {
    id?: boolean
    txHash?: boolean
    amount?: boolean
    fromWallet?: boolean
    toWallet?: boolean
    propertyId?: boolean
    userId?: boolean
    walletId?: boolean
  }

  export type PaymentTransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "txHash" | "amount" | "fromWallet" | "toWallet" | "propertyId" | "userId" | "walletId", ExtArgs["result"]["paymentTransaction"]>
  export type PaymentTransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    Wallet?: boolean | PaymentTransaction$WalletArgs<ExtArgs>
  }
  export type PaymentTransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    Wallet?: boolean | PaymentTransaction$WalletArgs<ExtArgs>
  }
  export type PaymentTransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    Wallet?: boolean | PaymentTransaction$WalletArgs<ExtArgs>
  }

  export type $PaymentTransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PaymentTransaction"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      Wallet: Prisma.$WalletPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      txHash: string | null
      amount: string
      fromWallet: string
      toWallet: string
      propertyId: string
      userId: string
      walletId: string | null
    }, ExtArgs["result"]["paymentTransaction"]>
    composites: {}
  }

  type PaymentTransactionGetPayload<S extends boolean | null | undefined | PaymentTransactionDefaultArgs> = $Result.GetResult<Prisma.$PaymentTransactionPayload, S>

  type PaymentTransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentTransactionCountAggregateInputType | true
    }

  export interface PaymentTransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PaymentTransaction'], meta: { name: 'PaymentTransaction' } }
    /**
     * Find zero or one PaymentTransaction that matches the filter.
     * @param {PaymentTransactionFindUniqueArgs} args - Arguments to find a PaymentTransaction
     * @example
     * // Get one PaymentTransaction
     * const paymentTransaction = await prisma.paymentTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentTransactionFindUniqueArgs>(args: SelectSubset<T, PaymentTransactionFindUniqueArgs<ExtArgs>>): Prisma__PaymentTransactionClient<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PaymentTransaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentTransactionFindUniqueOrThrowArgs} args - Arguments to find a PaymentTransaction
     * @example
     * // Get one PaymentTransaction
     * const paymentTransaction = await prisma.paymentTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentTransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentTransactionClient<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PaymentTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentTransactionFindFirstArgs} args - Arguments to find a PaymentTransaction
     * @example
     * // Get one PaymentTransaction
     * const paymentTransaction = await prisma.paymentTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentTransactionFindFirstArgs>(args?: SelectSubset<T, PaymentTransactionFindFirstArgs<ExtArgs>>): Prisma__PaymentTransactionClient<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PaymentTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentTransactionFindFirstOrThrowArgs} args - Arguments to find a PaymentTransaction
     * @example
     * // Get one PaymentTransaction
     * const paymentTransaction = await prisma.paymentTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentTransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentTransactionClient<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PaymentTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PaymentTransactions
     * const paymentTransactions = await prisma.paymentTransaction.findMany()
     * 
     * // Get first 10 PaymentTransactions
     * const paymentTransactions = await prisma.paymentTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentTransactionWithIdOnly = await prisma.paymentTransaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentTransactionFindManyArgs>(args?: SelectSubset<T, PaymentTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PaymentTransaction.
     * @param {PaymentTransactionCreateArgs} args - Arguments to create a PaymentTransaction.
     * @example
     * // Create one PaymentTransaction
     * const PaymentTransaction = await prisma.paymentTransaction.create({
     *   data: {
     *     // ... data to create a PaymentTransaction
     *   }
     * })
     * 
     */
    create<T extends PaymentTransactionCreateArgs>(args: SelectSubset<T, PaymentTransactionCreateArgs<ExtArgs>>): Prisma__PaymentTransactionClient<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PaymentTransactions.
     * @param {PaymentTransactionCreateManyArgs} args - Arguments to create many PaymentTransactions.
     * @example
     * // Create many PaymentTransactions
     * const paymentTransaction = await prisma.paymentTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentTransactionCreateManyArgs>(args?: SelectSubset<T, PaymentTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PaymentTransactions and returns the data saved in the database.
     * @param {PaymentTransactionCreateManyAndReturnArgs} args - Arguments to create many PaymentTransactions.
     * @example
     * // Create many PaymentTransactions
     * const paymentTransaction = await prisma.paymentTransaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PaymentTransactions and only return the `id`
     * const paymentTransactionWithIdOnly = await prisma.paymentTransaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentTransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PaymentTransaction.
     * @param {PaymentTransactionDeleteArgs} args - Arguments to delete one PaymentTransaction.
     * @example
     * // Delete one PaymentTransaction
     * const PaymentTransaction = await prisma.paymentTransaction.delete({
     *   where: {
     *     // ... filter to delete one PaymentTransaction
     *   }
     * })
     * 
     */
    delete<T extends PaymentTransactionDeleteArgs>(args: SelectSubset<T, PaymentTransactionDeleteArgs<ExtArgs>>): Prisma__PaymentTransactionClient<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PaymentTransaction.
     * @param {PaymentTransactionUpdateArgs} args - Arguments to update one PaymentTransaction.
     * @example
     * // Update one PaymentTransaction
     * const paymentTransaction = await prisma.paymentTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentTransactionUpdateArgs>(args: SelectSubset<T, PaymentTransactionUpdateArgs<ExtArgs>>): Prisma__PaymentTransactionClient<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PaymentTransactions.
     * @param {PaymentTransactionDeleteManyArgs} args - Arguments to filter PaymentTransactions to delete.
     * @example
     * // Delete a few PaymentTransactions
     * const { count } = await prisma.paymentTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentTransactionDeleteManyArgs>(args?: SelectSubset<T, PaymentTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaymentTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PaymentTransactions
     * const paymentTransaction = await prisma.paymentTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentTransactionUpdateManyArgs>(args: SelectSubset<T, PaymentTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaymentTransactions and returns the data updated in the database.
     * @param {PaymentTransactionUpdateManyAndReturnArgs} args - Arguments to update many PaymentTransactions.
     * @example
     * // Update many PaymentTransactions
     * const paymentTransaction = await prisma.paymentTransaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PaymentTransactions and only return the `id`
     * const paymentTransactionWithIdOnly = await prisma.paymentTransaction.updateManyAndReturn({
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
    updateManyAndReturn<T extends PaymentTransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentTransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PaymentTransaction.
     * @param {PaymentTransactionUpsertArgs} args - Arguments to update or create a PaymentTransaction.
     * @example
     * // Update or create a PaymentTransaction
     * const paymentTransaction = await prisma.paymentTransaction.upsert({
     *   create: {
     *     // ... data to create a PaymentTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PaymentTransaction we want to update
     *   }
     * })
     */
    upsert<T extends PaymentTransactionUpsertArgs>(args: SelectSubset<T, PaymentTransactionUpsertArgs<ExtArgs>>): Prisma__PaymentTransactionClient<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PaymentTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentTransactionCountArgs} args - Arguments to filter PaymentTransactions to count.
     * @example
     * // Count the number of PaymentTransactions
     * const count = await prisma.paymentTransaction.count({
     *   where: {
     *     // ... the filter for the PaymentTransactions we want to count
     *   }
     * })
    **/
    count<T extends PaymentTransactionCountArgs>(
      args?: Subset<T, PaymentTransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PaymentTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PaymentTransactionAggregateArgs>(args: Subset<T, PaymentTransactionAggregateArgs>): Prisma.PrismaPromise<GetPaymentTransactionAggregateType<T>>

    /**
     * Group by PaymentTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentTransactionGroupByArgs} args - Group by arguments.
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
      T extends PaymentTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentTransactionGroupByArgs['orderBy'] }
        : { orderBy?: PaymentTransactionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PaymentTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PaymentTransaction model
   */
  readonly fields: PaymentTransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PaymentTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentTransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    Wallet<T extends PaymentTransaction$WalletArgs<ExtArgs> = {}>(args?: Subset<T, PaymentTransaction$WalletArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PaymentTransaction model
   */
  interface PaymentTransactionFieldRefs {
    readonly id: FieldRef<"PaymentTransaction", 'String'>
    readonly txHash: FieldRef<"PaymentTransaction", 'String'>
    readonly amount: FieldRef<"PaymentTransaction", 'String'>
    readonly fromWallet: FieldRef<"PaymentTransaction", 'String'>
    readonly toWallet: FieldRef<"PaymentTransaction", 'String'>
    readonly propertyId: FieldRef<"PaymentTransaction", 'String'>
    readonly userId: FieldRef<"PaymentTransaction", 'String'>
    readonly walletId: FieldRef<"PaymentTransaction", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PaymentTransaction findUnique
   */
  export type PaymentTransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionInclude<ExtArgs> | null
    /**
     * Filter, which PaymentTransaction to fetch.
     */
    where: PaymentTransactionWhereUniqueInput
  }

  /**
   * PaymentTransaction findUniqueOrThrow
   */
  export type PaymentTransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionInclude<ExtArgs> | null
    /**
     * Filter, which PaymentTransaction to fetch.
     */
    where: PaymentTransactionWhereUniqueInput
  }

  /**
   * PaymentTransaction findFirst
   */
  export type PaymentTransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionInclude<ExtArgs> | null
    /**
     * Filter, which PaymentTransaction to fetch.
     */
    where?: PaymentTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentTransactions to fetch.
     */
    orderBy?: PaymentTransactionOrderByWithRelationInput | PaymentTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentTransactions.
     */
    cursor?: PaymentTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentTransactions.
     */
    distinct?: PaymentTransactionScalarFieldEnum | PaymentTransactionScalarFieldEnum[]
  }

  /**
   * PaymentTransaction findFirstOrThrow
   */
  export type PaymentTransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionInclude<ExtArgs> | null
    /**
     * Filter, which PaymentTransaction to fetch.
     */
    where?: PaymentTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentTransactions to fetch.
     */
    orderBy?: PaymentTransactionOrderByWithRelationInput | PaymentTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentTransactions.
     */
    cursor?: PaymentTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentTransactions.
     */
    distinct?: PaymentTransactionScalarFieldEnum | PaymentTransactionScalarFieldEnum[]
  }

  /**
   * PaymentTransaction findMany
   */
  export type PaymentTransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionInclude<ExtArgs> | null
    /**
     * Filter, which PaymentTransactions to fetch.
     */
    where?: PaymentTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentTransactions to fetch.
     */
    orderBy?: PaymentTransactionOrderByWithRelationInput | PaymentTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PaymentTransactions.
     */
    cursor?: PaymentTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentTransactions.
     */
    skip?: number
    distinct?: PaymentTransactionScalarFieldEnum | PaymentTransactionScalarFieldEnum[]
  }

  /**
   * PaymentTransaction create
   */
  export type PaymentTransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a PaymentTransaction.
     */
    data: XOR<PaymentTransactionCreateInput, PaymentTransactionUncheckedCreateInput>
  }

  /**
   * PaymentTransaction createMany
   */
  export type PaymentTransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PaymentTransactions.
     */
    data: PaymentTransactionCreateManyInput | PaymentTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PaymentTransaction createManyAndReturn
   */
  export type PaymentTransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * The data used to create many PaymentTransactions.
     */
    data: PaymentTransactionCreateManyInput | PaymentTransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PaymentTransaction update
   */
  export type PaymentTransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a PaymentTransaction.
     */
    data: XOR<PaymentTransactionUpdateInput, PaymentTransactionUncheckedUpdateInput>
    /**
     * Choose, which PaymentTransaction to update.
     */
    where: PaymentTransactionWhereUniqueInput
  }

  /**
   * PaymentTransaction updateMany
   */
  export type PaymentTransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PaymentTransactions.
     */
    data: XOR<PaymentTransactionUpdateManyMutationInput, PaymentTransactionUncheckedUpdateManyInput>
    /**
     * Filter which PaymentTransactions to update
     */
    where?: PaymentTransactionWhereInput
    /**
     * Limit how many PaymentTransactions to update.
     */
    limit?: number
  }

  /**
   * PaymentTransaction updateManyAndReturn
   */
  export type PaymentTransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * The data used to update PaymentTransactions.
     */
    data: XOR<PaymentTransactionUpdateManyMutationInput, PaymentTransactionUncheckedUpdateManyInput>
    /**
     * Filter which PaymentTransactions to update
     */
    where?: PaymentTransactionWhereInput
    /**
     * Limit how many PaymentTransactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PaymentTransaction upsert
   */
  export type PaymentTransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the PaymentTransaction to update in case it exists.
     */
    where: PaymentTransactionWhereUniqueInput
    /**
     * In case the PaymentTransaction found by the `where` argument doesn't exist, create a new PaymentTransaction with this data.
     */
    create: XOR<PaymentTransactionCreateInput, PaymentTransactionUncheckedCreateInput>
    /**
     * In case the PaymentTransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentTransactionUpdateInput, PaymentTransactionUncheckedUpdateInput>
  }

  /**
   * PaymentTransaction delete
   */
  export type PaymentTransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionInclude<ExtArgs> | null
    /**
     * Filter which PaymentTransaction to delete.
     */
    where: PaymentTransactionWhereUniqueInput
  }

  /**
   * PaymentTransaction deleteMany
   */
  export type PaymentTransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentTransactions to delete
     */
    where?: PaymentTransactionWhereInput
    /**
     * Limit how many PaymentTransactions to delete.
     */
    limit?: number
  }

  /**
   * PaymentTransaction.Wallet
   */
  export type PaymentTransaction$WalletArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    where?: WalletWhereInput
  }

  /**
   * PaymentTransaction without action
   */
  export type PaymentTransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionInclude<ExtArgs> | null
  }


  /**
   * Model StakingRecord
   */

  export type AggregateStakingRecord = {
    _count: StakingRecordCountAggregateOutputType | null
    _min: StakingRecordMinAggregateOutputType | null
    _max: StakingRecordMaxAggregateOutputType | null
  }

  export type StakingRecordMinAggregateOutputType = {
    id: string | null
    amount: string | null
    lastClaim: Date | null
    userId: string | null
    propertyId: string | null
  }

  export type StakingRecordMaxAggregateOutputType = {
    id: string | null
    amount: string | null
    lastClaim: Date | null
    userId: string | null
    propertyId: string | null
  }

  export type StakingRecordCountAggregateOutputType = {
    id: number
    amount: number
    lastClaim: number
    userId: number
    propertyId: number
    _all: number
  }


  export type StakingRecordMinAggregateInputType = {
    id?: true
    amount?: true
    lastClaim?: true
    userId?: true
    propertyId?: true
  }

  export type StakingRecordMaxAggregateInputType = {
    id?: true
    amount?: true
    lastClaim?: true
    userId?: true
    propertyId?: true
  }

  export type StakingRecordCountAggregateInputType = {
    id?: true
    amount?: true
    lastClaim?: true
    userId?: true
    propertyId?: true
    _all?: true
  }

  export type StakingRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StakingRecord to aggregate.
     */
    where?: StakingRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StakingRecords to fetch.
     */
    orderBy?: StakingRecordOrderByWithRelationInput | StakingRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StakingRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StakingRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StakingRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StakingRecords
    **/
    _count?: true | StakingRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StakingRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StakingRecordMaxAggregateInputType
  }

  export type GetStakingRecordAggregateType<T extends StakingRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateStakingRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStakingRecord[P]>
      : GetScalarType<T[P], AggregateStakingRecord[P]>
  }




  export type StakingRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StakingRecordWhereInput
    orderBy?: StakingRecordOrderByWithAggregationInput | StakingRecordOrderByWithAggregationInput[]
    by: StakingRecordScalarFieldEnum[] | StakingRecordScalarFieldEnum
    having?: StakingRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StakingRecordCountAggregateInputType | true
    _min?: StakingRecordMinAggregateInputType
    _max?: StakingRecordMaxAggregateInputType
  }

  export type StakingRecordGroupByOutputType = {
    id: string
    amount: string
    lastClaim: Date | null
    userId: string
    propertyId: string
    _count: StakingRecordCountAggregateOutputType | null
    _min: StakingRecordMinAggregateOutputType | null
    _max: StakingRecordMaxAggregateOutputType | null
  }

  type GetStakingRecordGroupByPayload<T extends StakingRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StakingRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StakingRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StakingRecordGroupByOutputType[P]>
            : GetScalarType<T[P], StakingRecordGroupByOutputType[P]>
        }
      >
    >


  export type StakingRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    lastClaim?: boolean
    userId?: boolean
    propertyId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stakingRecord"]>

  export type StakingRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    lastClaim?: boolean
    userId?: boolean
    propertyId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stakingRecord"]>

  export type StakingRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    lastClaim?: boolean
    userId?: boolean
    propertyId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stakingRecord"]>

  export type StakingRecordSelectScalar = {
    id?: boolean
    amount?: boolean
    lastClaim?: boolean
    userId?: boolean
    propertyId?: boolean
  }

  export type StakingRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "amount" | "lastClaim" | "userId" | "propertyId", ExtArgs["result"]["stakingRecord"]>
  export type StakingRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }
  export type StakingRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }
  export type StakingRecordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }

  export type $StakingRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StakingRecord"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      property: Prisma.$PropertyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      amount: string
      lastClaim: Date | null
      userId: string
      propertyId: string
    }, ExtArgs["result"]["stakingRecord"]>
    composites: {}
  }

  type StakingRecordGetPayload<S extends boolean | null | undefined | StakingRecordDefaultArgs> = $Result.GetResult<Prisma.$StakingRecordPayload, S>

  type StakingRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StakingRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StakingRecordCountAggregateInputType | true
    }

  export interface StakingRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StakingRecord'], meta: { name: 'StakingRecord' } }
    /**
     * Find zero or one StakingRecord that matches the filter.
     * @param {StakingRecordFindUniqueArgs} args - Arguments to find a StakingRecord
     * @example
     * // Get one StakingRecord
     * const stakingRecord = await prisma.stakingRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StakingRecordFindUniqueArgs>(args: SelectSubset<T, StakingRecordFindUniqueArgs<ExtArgs>>): Prisma__StakingRecordClient<$Result.GetResult<Prisma.$StakingRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StakingRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StakingRecordFindUniqueOrThrowArgs} args - Arguments to find a StakingRecord
     * @example
     * // Get one StakingRecord
     * const stakingRecord = await prisma.stakingRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StakingRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, StakingRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StakingRecordClient<$Result.GetResult<Prisma.$StakingRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StakingRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StakingRecordFindFirstArgs} args - Arguments to find a StakingRecord
     * @example
     * // Get one StakingRecord
     * const stakingRecord = await prisma.stakingRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StakingRecordFindFirstArgs>(args?: SelectSubset<T, StakingRecordFindFirstArgs<ExtArgs>>): Prisma__StakingRecordClient<$Result.GetResult<Prisma.$StakingRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StakingRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StakingRecordFindFirstOrThrowArgs} args - Arguments to find a StakingRecord
     * @example
     * // Get one StakingRecord
     * const stakingRecord = await prisma.stakingRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StakingRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, StakingRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__StakingRecordClient<$Result.GetResult<Prisma.$StakingRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StakingRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StakingRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StakingRecords
     * const stakingRecords = await prisma.stakingRecord.findMany()
     * 
     * // Get first 10 StakingRecords
     * const stakingRecords = await prisma.stakingRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const stakingRecordWithIdOnly = await prisma.stakingRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StakingRecordFindManyArgs>(args?: SelectSubset<T, StakingRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StakingRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StakingRecord.
     * @param {StakingRecordCreateArgs} args - Arguments to create a StakingRecord.
     * @example
     * // Create one StakingRecord
     * const StakingRecord = await prisma.stakingRecord.create({
     *   data: {
     *     // ... data to create a StakingRecord
     *   }
     * })
     * 
     */
    create<T extends StakingRecordCreateArgs>(args: SelectSubset<T, StakingRecordCreateArgs<ExtArgs>>): Prisma__StakingRecordClient<$Result.GetResult<Prisma.$StakingRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StakingRecords.
     * @param {StakingRecordCreateManyArgs} args - Arguments to create many StakingRecords.
     * @example
     * // Create many StakingRecords
     * const stakingRecord = await prisma.stakingRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StakingRecordCreateManyArgs>(args?: SelectSubset<T, StakingRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StakingRecords and returns the data saved in the database.
     * @param {StakingRecordCreateManyAndReturnArgs} args - Arguments to create many StakingRecords.
     * @example
     * // Create many StakingRecords
     * const stakingRecord = await prisma.stakingRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StakingRecords and only return the `id`
     * const stakingRecordWithIdOnly = await prisma.stakingRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StakingRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, StakingRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StakingRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StakingRecord.
     * @param {StakingRecordDeleteArgs} args - Arguments to delete one StakingRecord.
     * @example
     * // Delete one StakingRecord
     * const StakingRecord = await prisma.stakingRecord.delete({
     *   where: {
     *     // ... filter to delete one StakingRecord
     *   }
     * })
     * 
     */
    delete<T extends StakingRecordDeleteArgs>(args: SelectSubset<T, StakingRecordDeleteArgs<ExtArgs>>): Prisma__StakingRecordClient<$Result.GetResult<Prisma.$StakingRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StakingRecord.
     * @param {StakingRecordUpdateArgs} args - Arguments to update one StakingRecord.
     * @example
     * // Update one StakingRecord
     * const stakingRecord = await prisma.stakingRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StakingRecordUpdateArgs>(args: SelectSubset<T, StakingRecordUpdateArgs<ExtArgs>>): Prisma__StakingRecordClient<$Result.GetResult<Prisma.$StakingRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StakingRecords.
     * @param {StakingRecordDeleteManyArgs} args - Arguments to filter StakingRecords to delete.
     * @example
     * // Delete a few StakingRecords
     * const { count } = await prisma.stakingRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StakingRecordDeleteManyArgs>(args?: SelectSubset<T, StakingRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StakingRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StakingRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StakingRecords
     * const stakingRecord = await prisma.stakingRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StakingRecordUpdateManyArgs>(args: SelectSubset<T, StakingRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StakingRecords and returns the data updated in the database.
     * @param {StakingRecordUpdateManyAndReturnArgs} args - Arguments to update many StakingRecords.
     * @example
     * // Update many StakingRecords
     * const stakingRecord = await prisma.stakingRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StakingRecords and only return the `id`
     * const stakingRecordWithIdOnly = await prisma.stakingRecord.updateManyAndReturn({
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
    updateManyAndReturn<T extends StakingRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, StakingRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StakingRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StakingRecord.
     * @param {StakingRecordUpsertArgs} args - Arguments to update or create a StakingRecord.
     * @example
     * // Update or create a StakingRecord
     * const stakingRecord = await prisma.stakingRecord.upsert({
     *   create: {
     *     // ... data to create a StakingRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StakingRecord we want to update
     *   }
     * })
     */
    upsert<T extends StakingRecordUpsertArgs>(args: SelectSubset<T, StakingRecordUpsertArgs<ExtArgs>>): Prisma__StakingRecordClient<$Result.GetResult<Prisma.$StakingRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StakingRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StakingRecordCountArgs} args - Arguments to filter StakingRecords to count.
     * @example
     * // Count the number of StakingRecords
     * const count = await prisma.stakingRecord.count({
     *   where: {
     *     // ... the filter for the StakingRecords we want to count
     *   }
     * })
    **/
    count<T extends StakingRecordCountArgs>(
      args?: Subset<T, StakingRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StakingRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StakingRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StakingRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StakingRecordAggregateArgs>(args: Subset<T, StakingRecordAggregateArgs>): Prisma.PrismaPromise<GetStakingRecordAggregateType<T>>

    /**
     * Group by StakingRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StakingRecordGroupByArgs} args - Group by arguments.
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
      T extends StakingRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StakingRecordGroupByArgs['orderBy'] }
        : { orderBy?: StakingRecordGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StakingRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStakingRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StakingRecord model
   */
  readonly fields: StakingRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StakingRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StakingRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the StakingRecord model
   */
  interface StakingRecordFieldRefs {
    readonly id: FieldRef<"StakingRecord", 'String'>
    readonly amount: FieldRef<"StakingRecord", 'String'>
    readonly lastClaim: FieldRef<"StakingRecord", 'DateTime'>
    readonly userId: FieldRef<"StakingRecord", 'String'>
    readonly propertyId: FieldRef<"StakingRecord", 'String'>
  }
    

  // Custom InputTypes
  /**
   * StakingRecord findUnique
   */
  export type StakingRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StakingRecord
     */
    select?: StakingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StakingRecord
     */
    omit?: StakingRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StakingRecordInclude<ExtArgs> | null
    /**
     * Filter, which StakingRecord to fetch.
     */
    where: StakingRecordWhereUniqueInput
  }

  /**
   * StakingRecord findUniqueOrThrow
   */
  export type StakingRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StakingRecord
     */
    select?: StakingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StakingRecord
     */
    omit?: StakingRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StakingRecordInclude<ExtArgs> | null
    /**
     * Filter, which StakingRecord to fetch.
     */
    where: StakingRecordWhereUniqueInput
  }

  /**
   * StakingRecord findFirst
   */
  export type StakingRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StakingRecord
     */
    select?: StakingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StakingRecord
     */
    omit?: StakingRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StakingRecordInclude<ExtArgs> | null
    /**
     * Filter, which StakingRecord to fetch.
     */
    where?: StakingRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StakingRecords to fetch.
     */
    orderBy?: StakingRecordOrderByWithRelationInput | StakingRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StakingRecords.
     */
    cursor?: StakingRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StakingRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StakingRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StakingRecords.
     */
    distinct?: StakingRecordScalarFieldEnum | StakingRecordScalarFieldEnum[]
  }

  /**
   * StakingRecord findFirstOrThrow
   */
  export type StakingRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StakingRecord
     */
    select?: StakingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StakingRecord
     */
    omit?: StakingRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StakingRecordInclude<ExtArgs> | null
    /**
     * Filter, which StakingRecord to fetch.
     */
    where?: StakingRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StakingRecords to fetch.
     */
    orderBy?: StakingRecordOrderByWithRelationInput | StakingRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StakingRecords.
     */
    cursor?: StakingRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StakingRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StakingRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StakingRecords.
     */
    distinct?: StakingRecordScalarFieldEnum | StakingRecordScalarFieldEnum[]
  }

  /**
   * StakingRecord findMany
   */
  export type StakingRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StakingRecord
     */
    select?: StakingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StakingRecord
     */
    omit?: StakingRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StakingRecordInclude<ExtArgs> | null
    /**
     * Filter, which StakingRecords to fetch.
     */
    where?: StakingRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StakingRecords to fetch.
     */
    orderBy?: StakingRecordOrderByWithRelationInput | StakingRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StakingRecords.
     */
    cursor?: StakingRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StakingRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StakingRecords.
     */
    skip?: number
    distinct?: StakingRecordScalarFieldEnum | StakingRecordScalarFieldEnum[]
  }

  /**
   * StakingRecord create
   */
  export type StakingRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StakingRecord
     */
    select?: StakingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StakingRecord
     */
    omit?: StakingRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StakingRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a StakingRecord.
     */
    data: XOR<StakingRecordCreateInput, StakingRecordUncheckedCreateInput>
  }

  /**
   * StakingRecord createMany
   */
  export type StakingRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StakingRecords.
     */
    data: StakingRecordCreateManyInput | StakingRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StakingRecord createManyAndReturn
   */
  export type StakingRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StakingRecord
     */
    select?: StakingRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StakingRecord
     */
    omit?: StakingRecordOmit<ExtArgs> | null
    /**
     * The data used to create many StakingRecords.
     */
    data: StakingRecordCreateManyInput | StakingRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StakingRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StakingRecord update
   */
  export type StakingRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StakingRecord
     */
    select?: StakingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StakingRecord
     */
    omit?: StakingRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StakingRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a StakingRecord.
     */
    data: XOR<StakingRecordUpdateInput, StakingRecordUncheckedUpdateInput>
    /**
     * Choose, which StakingRecord to update.
     */
    where: StakingRecordWhereUniqueInput
  }

  /**
   * StakingRecord updateMany
   */
  export type StakingRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StakingRecords.
     */
    data: XOR<StakingRecordUpdateManyMutationInput, StakingRecordUncheckedUpdateManyInput>
    /**
     * Filter which StakingRecords to update
     */
    where?: StakingRecordWhereInput
    /**
     * Limit how many StakingRecords to update.
     */
    limit?: number
  }

  /**
   * StakingRecord updateManyAndReturn
   */
  export type StakingRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StakingRecord
     */
    select?: StakingRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StakingRecord
     */
    omit?: StakingRecordOmit<ExtArgs> | null
    /**
     * The data used to update StakingRecords.
     */
    data: XOR<StakingRecordUpdateManyMutationInput, StakingRecordUncheckedUpdateManyInput>
    /**
     * Filter which StakingRecords to update
     */
    where?: StakingRecordWhereInput
    /**
     * Limit how many StakingRecords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StakingRecordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StakingRecord upsert
   */
  export type StakingRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StakingRecord
     */
    select?: StakingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StakingRecord
     */
    omit?: StakingRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StakingRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the StakingRecord to update in case it exists.
     */
    where: StakingRecordWhereUniqueInput
    /**
     * In case the StakingRecord found by the `where` argument doesn't exist, create a new StakingRecord with this data.
     */
    create: XOR<StakingRecordCreateInput, StakingRecordUncheckedCreateInput>
    /**
     * In case the StakingRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StakingRecordUpdateInput, StakingRecordUncheckedUpdateInput>
  }

  /**
   * StakingRecord delete
   */
  export type StakingRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StakingRecord
     */
    select?: StakingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StakingRecord
     */
    omit?: StakingRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StakingRecordInclude<ExtArgs> | null
    /**
     * Filter which StakingRecord to delete.
     */
    where: StakingRecordWhereUniqueInput
  }

  /**
   * StakingRecord deleteMany
   */
  export type StakingRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StakingRecords to delete
     */
    where?: StakingRecordWhereInput
    /**
     * Limit how many StakingRecords to delete.
     */
    limit?: number
  }

  /**
   * StakingRecord without action
   */
  export type StakingRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StakingRecord
     */
    select?: StakingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StakingRecord
     */
    omit?: StakingRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StakingRecordInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    cognitoId: 'cognitoId',
    name: 'name',
    email: 'email',
    phoneNumber: 'phoneNumber',
    kycStatus: 'kycStatus',
    kycVerificationId: 'kycVerificationId',
    kycVerifiedAt: 'kycVerifiedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const WalletScalarFieldEnum: {
    id: 'id',
    address: 'address',
    whitelisted: 'whitelisted',
    userId: 'userId'
  };

  export type WalletScalarFieldEnum = (typeof WalletScalarFieldEnum)[keyof typeof WalletScalarFieldEnum]


  export const PropertyScalarFieldEnum: {
    id: 'id',
    title: 'title',
    solanaMint: 'solanaMint',
    ownerId: 'ownerId',
    metadata: 'metadata',
    moderationStatus: 'moderationStatus',
    moderationComment: 'moderationComment',
    tokenizationDate: 'tokenizationDate'
  };

  export type PropertyScalarFieldEnum = (typeof PropertyScalarFieldEnum)[keyof typeof PropertyScalarFieldEnum]


  export const PaymentTransactionScalarFieldEnum: {
    id: 'id',
    txHash: 'txHash',
    amount: 'amount',
    fromWallet: 'fromWallet',
    toWallet: 'toWallet',
    propertyId: 'propertyId',
    userId: 'userId',
    walletId: 'walletId'
  };

  export type PaymentTransactionScalarFieldEnum = (typeof PaymentTransactionScalarFieldEnum)[keyof typeof PaymentTransactionScalarFieldEnum]


  export const StakingRecordScalarFieldEnum: {
    id: 'id',
    amount: 'amount',
    lastClaim: 'lastClaim',
    userId: 'userId',
    propertyId: 'propertyId'
  };

  export type StakingRecordScalarFieldEnum = (typeof StakingRecordScalarFieldEnum)[keyof typeof StakingRecordScalarFieldEnum]


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
   * Reference to a field of type 'KycStatus'
   */
  export type EnumKycStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'KycStatus'>
    


  /**
   * Reference to a field of type 'KycStatus[]'
   */
  export type ListEnumKycStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'KycStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'ModerationStatus'
   */
  export type EnumModerationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ModerationStatus'>
    


  /**
   * Reference to a field of type 'ModerationStatus[]'
   */
  export type ListEnumModerationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ModerationStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    cognitoId?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    phoneNumber?: StringFilter<"User"> | string
    kycStatus?: EnumKycStatusFilter<"User"> | $Enums.KycStatus
    kycVerificationId?: StringNullableFilter<"User"> | string | null
    kycVerifiedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    wallets?: WalletListRelationFilter
    properties?: PropertyListRelationFilter
    transactions?: PaymentTransactionListRelationFilter
    stakingRecords?: StakingRecordListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    cognitoId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    kycStatus?: SortOrder
    kycVerificationId?: SortOrderInput | SortOrder
    kycVerifiedAt?: SortOrderInput | SortOrder
    wallets?: WalletOrderByRelationAggregateInput
    properties?: PropertyOrderByRelationAggregateInput
    transactions?: PaymentTransactionOrderByRelationAggregateInput
    stakingRecords?: StakingRecordOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    cognitoId?: string
    email?: string
    phoneNumber?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    kycStatus?: EnumKycStatusFilter<"User"> | $Enums.KycStatus
    kycVerificationId?: StringNullableFilter<"User"> | string | null
    kycVerifiedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    wallets?: WalletListRelationFilter
    properties?: PropertyListRelationFilter
    transactions?: PaymentTransactionListRelationFilter
    stakingRecords?: StakingRecordListRelationFilter
  }, "cognitoId" | "email" | "phoneNumber">

  export type UserOrderByWithAggregationInput = {
    cognitoId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    kycStatus?: SortOrder
    kycVerificationId?: SortOrderInput | SortOrder
    kycVerifiedAt?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    cognitoId?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    phoneNumber?: StringWithAggregatesFilter<"User"> | string
    kycStatus?: EnumKycStatusWithAggregatesFilter<"User"> | $Enums.KycStatus
    kycVerificationId?: StringNullableWithAggregatesFilter<"User"> | string | null
    kycVerifiedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type WalletWhereInput = {
    AND?: WalletWhereInput | WalletWhereInput[]
    OR?: WalletWhereInput[]
    NOT?: WalletWhereInput | WalletWhereInput[]
    id?: UuidFilter<"Wallet"> | string
    address?: StringFilter<"Wallet"> | string
    whitelisted?: BoolFilter<"Wallet"> | boolean
    userId?: StringFilter<"Wallet"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    transactions?: PaymentTransactionListRelationFilter
  }

  export type WalletOrderByWithRelationInput = {
    id?: SortOrder
    address?: SortOrder
    whitelisted?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    transactions?: PaymentTransactionOrderByRelationAggregateInput
  }

  export type WalletWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    address?: string
    AND?: WalletWhereInput | WalletWhereInput[]
    OR?: WalletWhereInput[]
    NOT?: WalletWhereInput | WalletWhereInput[]
    whitelisted?: BoolFilter<"Wallet"> | boolean
    userId?: StringFilter<"Wallet"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    transactions?: PaymentTransactionListRelationFilter
  }, "id" | "address">

  export type WalletOrderByWithAggregationInput = {
    id?: SortOrder
    address?: SortOrder
    whitelisted?: SortOrder
    userId?: SortOrder
    _count?: WalletCountOrderByAggregateInput
    _max?: WalletMaxOrderByAggregateInput
    _min?: WalletMinOrderByAggregateInput
  }

  export type WalletScalarWhereWithAggregatesInput = {
    AND?: WalletScalarWhereWithAggregatesInput | WalletScalarWhereWithAggregatesInput[]
    OR?: WalletScalarWhereWithAggregatesInput[]
    NOT?: WalletScalarWhereWithAggregatesInput | WalletScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Wallet"> | string
    address?: StringWithAggregatesFilter<"Wallet"> | string
    whitelisted?: BoolWithAggregatesFilter<"Wallet"> | boolean
    userId?: StringWithAggregatesFilter<"Wallet"> | string
  }

  export type PropertyWhereInput = {
    AND?: PropertyWhereInput | PropertyWhereInput[]
    OR?: PropertyWhereInput[]
    NOT?: PropertyWhereInput | PropertyWhereInput[]
    id?: UuidFilter<"Property"> | string
    title?: StringFilter<"Property"> | string
    solanaMint?: StringFilter<"Property"> | string
    ownerId?: StringFilter<"Property"> | string
    metadata?: JsonFilter<"Property">
    moderationStatus?: EnumModerationStatusFilter<"Property"> | $Enums.ModerationStatus
    moderationComment?: StringNullableFilter<"Property"> | string | null
    tokenizationDate?: DateTimeNullableFilter<"Property"> | Date | string | null
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    stakingRecords?: StakingRecordListRelationFilter
  }

  export type PropertyOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    solanaMint?: SortOrder
    ownerId?: SortOrder
    metadata?: SortOrder
    moderationStatus?: SortOrder
    moderationComment?: SortOrderInput | SortOrder
    tokenizationDate?: SortOrderInput | SortOrder
    owner?: UserOrderByWithRelationInput
    stakingRecords?: StakingRecordOrderByRelationAggregateInput
  }

  export type PropertyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    solanaMint?: string
    AND?: PropertyWhereInput | PropertyWhereInput[]
    OR?: PropertyWhereInput[]
    NOT?: PropertyWhereInput | PropertyWhereInput[]
    title?: StringFilter<"Property"> | string
    ownerId?: StringFilter<"Property"> | string
    metadata?: JsonFilter<"Property">
    moderationStatus?: EnumModerationStatusFilter<"Property"> | $Enums.ModerationStatus
    moderationComment?: StringNullableFilter<"Property"> | string | null
    tokenizationDate?: DateTimeNullableFilter<"Property"> | Date | string | null
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    stakingRecords?: StakingRecordListRelationFilter
  }, "id" | "solanaMint">

  export type PropertyOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    solanaMint?: SortOrder
    ownerId?: SortOrder
    metadata?: SortOrder
    moderationStatus?: SortOrder
    moderationComment?: SortOrderInput | SortOrder
    tokenizationDate?: SortOrderInput | SortOrder
    _count?: PropertyCountOrderByAggregateInput
    _max?: PropertyMaxOrderByAggregateInput
    _min?: PropertyMinOrderByAggregateInput
  }

  export type PropertyScalarWhereWithAggregatesInput = {
    AND?: PropertyScalarWhereWithAggregatesInput | PropertyScalarWhereWithAggregatesInput[]
    OR?: PropertyScalarWhereWithAggregatesInput[]
    NOT?: PropertyScalarWhereWithAggregatesInput | PropertyScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Property"> | string
    title?: StringWithAggregatesFilter<"Property"> | string
    solanaMint?: StringWithAggregatesFilter<"Property"> | string
    ownerId?: StringWithAggregatesFilter<"Property"> | string
    metadata?: JsonWithAggregatesFilter<"Property">
    moderationStatus?: EnumModerationStatusWithAggregatesFilter<"Property"> | $Enums.ModerationStatus
    moderationComment?: StringNullableWithAggregatesFilter<"Property"> | string | null
    tokenizationDate?: DateTimeNullableWithAggregatesFilter<"Property"> | Date | string | null
  }

  export type PaymentTransactionWhereInput = {
    AND?: PaymentTransactionWhereInput | PaymentTransactionWhereInput[]
    OR?: PaymentTransactionWhereInput[]
    NOT?: PaymentTransactionWhereInput | PaymentTransactionWhereInput[]
    id?: UuidFilter<"PaymentTransaction"> | string
    txHash?: StringNullableFilter<"PaymentTransaction"> | string | null
    amount?: StringFilter<"PaymentTransaction"> | string
    fromWallet?: StringFilter<"PaymentTransaction"> | string
    toWallet?: StringFilter<"PaymentTransaction"> | string
    propertyId?: UuidFilter<"PaymentTransaction"> | string
    userId?: StringFilter<"PaymentTransaction"> | string
    walletId?: UuidNullableFilter<"PaymentTransaction"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    Wallet?: XOR<WalletNullableScalarRelationFilter, WalletWhereInput> | null
  }

  export type PaymentTransactionOrderByWithRelationInput = {
    id?: SortOrder
    txHash?: SortOrderInput | SortOrder
    amount?: SortOrder
    fromWallet?: SortOrder
    toWallet?: SortOrder
    propertyId?: SortOrder
    userId?: SortOrder
    walletId?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    Wallet?: WalletOrderByWithRelationInput
  }

  export type PaymentTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    txHash?: string
    AND?: PaymentTransactionWhereInput | PaymentTransactionWhereInput[]
    OR?: PaymentTransactionWhereInput[]
    NOT?: PaymentTransactionWhereInput | PaymentTransactionWhereInput[]
    amount?: StringFilter<"PaymentTransaction"> | string
    fromWallet?: StringFilter<"PaymentTransaction"> | string
    toWallet?: StringFilter<"PaymentTransaction"> | string
    propertyId?: UuidFilter<"PaymentTransaction"> | string
    userId?: StringFilter<"PaymentTransaction"> | string
    walletId?: UuidNullableFilter<"PaymentTransaction"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    Wallet?: XOR<WalletNullableScalarRelationFilter, WalletWhereInput> | null
  }, "id" | "txHash">

  export type PaymentTransactionOrderByWithAggregationInput = {
    id?: SortOrder
    txHash?: SortOrderInput | SortOrder
    amount?: SortOrder
    fromWallet?: SortOrder
    toWallet?: SortOrder
    propertyId?: SortOrder
    userId?: SortOrder
    walletId?: SortOrderInput | SortOrder
    _count?: PaymentTransactionCountOrderByAggregateInput
    _max?: PaymentTransactionMaxOrderByAggregateInput
    _min?: PaymentTransactionMinOrderByAggregateInput
  }

  export type PaymentTransactionScalarWhereWithAggregatesInput = {
    AND?: PaymentTransactionScalarWhereWithAggregatesInput | PaymentTransactionScalarWhereWithAggregatesInput[]
    OR?: PaymentTransactionScalarWhereWithAggregatesInput[]
    NOT?: PaymentTransactionScalarWhereWithAggregatesInput | PaymentTransactionScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"PaymentTransaction"> | string
    txHash?: StringNullableWithAggregatesFilter<"PaymentTransaction"> | string | null
    amount?: StringWithAggregatesFilter<"PaymentTransaction"> | string
    fromWallet?: StringWithAggregatesFilter<"PaymentTransaction"> | string
    toWallet?: StringWithAggregatesFilter<"PaymentTransaction"> | string
    propertyId?: UuidWithAggregatesFilter<"PaymentTransaction"> | string
    userId?: StringWithAggregatesFilter<"PaymentTransaction"> | string
    walletId?: UuidNullableWithAggregatesFilter<"PaymentTransaction"> | string | null
  }

  export type StakingRecordWhereInput = {
    AND?: StakingRecordWhereInput | StakingRecordWhereInput[]
    OR?: StakingRecordWhereInput[]
    NOT?: StakingRecordWhereInput | StakingRecordWhereInput[]
    id?: UuidFilter<"StakingRecord"> | string
    amount?: StringFilter<"StakingRecord"> | string
    lastClaim?: DateTimeNullableFilter<"StakingRecord"> | Date | string | null
    userId?: StringFilter<"StakingRecord"> | string
    propertyId?: UuidFilter<"StakingRecord"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
  }

  export type StakingRecordOrderByWithRelationInput = {
    id?: SortOrder
    amount?: SortOrder
    lastClaim?: SortOrderInput | SortOrder
    userId?: SortOrder
    propertyId?: SortOrder
    user?: UserOrderByWithRelationInput
    property?: PropertyOrderByWithRelationInput
  }

  export type StakingRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_propertyId?: StakingRecordUserIdPropertyIdCompoundUniqueInput
    AND?: StakingRecordWhereInput | StakingRecordWhereInput[]
    OR?: StakingRecordWhereInput[]
    NOT?: StakingRecordWhereInput | StakingRecordWhereInput[]
    amount?: StringFilter<"StakingRecord"> | string
    lastClaim?: DateTimeNullableFilter<"StakingRecord"> | Date | string | null
    userId?: StringFilter<"StakingRecord"> | string
    propertyId?: UuidFilter<"StakingRecord"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
  }, "id" | "userId_propertyId">

  export type StakingRecordOrderByWithAggregationInput = {
    id?: SortOrder
    amount?: SortOrder
    lastClaim?: SortOrderInput | SortOrder
    userId?: SortOrder
    propertyId?: SortOrder
    _count?: StakingRecordCountOrderByAggregateInput
    _max?: StakingRecordMaxOrderByAggregateInput
    _min?: StakingRecordMinOrderByAggregateInput
  }

  export type StakingRecordScalarWhereWithAggregatesInput = {
    AND?: StakingRecordScalarWhereWithAggregatesInput | StakingRecordScalarWhereWithAggregatesInput[]
    OR?: StakingRecordScalarWhereWithAggregatesInput[]
    NOT?: StakingRecordScalarWhereWithAggregatesInput | StakingRecordScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"StakingRecord"> | string
    amount?: StringWithAggregatesFilter<"StakingRecord"> | string
    lastClaim?: DateTimeNullableWithAggregatesFilter<"StakingRecord"> | Date | string | null
    userId?: StringWithAggregatesFilter<"StakingRecord"> | string
    propertyId?: UuidWithAggregatesFilter<"StakingRecord"> | string
  }

  export type UserCreateInput = {
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    kycStatus?: $Enums.KycStatus
    kycVerificationId?: string | null
    kycVerifiedAt?: Date | string | null
    wallets?: WalletCreateNestedManyWithoutUserInput
    properties?: PropertyCreateNestedManyWithoutOwnerInput
    transactions?: PaymentTransactionCreateNestedManyWithoutUserInput
    stakingRecords?: StakingRecordCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    kycStatus?: $Enums.KycStatus
    kycVerificationId?: string | null
    kycVerifiedAt?: Date | string | null
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
    properties?: PropertyUncheckedCreateNestedManyWithoutOwnerInput
    transactions?: PaymentTransactionUncheckedCreateNestedManyWithoutUserInput
    stakingRecords?: StakingRecordUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus
    kycVerificationId?: NullableStringFieldUpdateOperationsInput | string | null
    kycVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wallets?: WalletUpdateManyWithoutUserNestedInput
    properties?: PropertyUpdateManyWithoutOwnerNestedInput
    transactions?: PaymentTransactionUpdateManyWithoutUserNestedInput
    stakingRecords?: StakingRecordUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus
    kycVerificationId?: NullableStringFieldUpdateOperationsInput | string | null
    kycVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
    properties?: PropertyUncheckedUpdateManyWithoutOwnerNestedInput
    transactions?: PaymentTransactionUncheckedUpdateManyWithoutUserNestedInput
    stakingRecords?: StakingRecordUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    kycStatus?: $Enums.KycStatus
    kycVerificationId?: string | null
    kycVerifiedAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus
    kycVerificationId?: NullableStringFieldUpdateOperationsInput | string | null
    kycVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus
    kycVerificationId?: NullableStringFieldUpdateOperationsInput | string | null
    kycVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WalletCreateInput = {
    id?: string
    address: string
    whitelisted?: boolean
    user: UserCreateNestedOneWithoutWalletsInput
    transactions?: PaymentTransactionCreateNestedManyWithoutWalletInput
  }

  export type WalletUncheckedCreateInput = {
    id?: string
    address: string
    whitelisted?: boolean
    userId: string
    transactions?: PaymentTransactionUncheckedCreateNestedManyWithoutWalletInput
  }

  export type WalletUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    whitelisted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutWalletsNestedInput
    transactions?: PaymentTransactionUpdateManyWithoutWalletNestedInput
  }

  export type WalletUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    whitelisted?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    transactions?: PaymentTransactionUncheckedUpdateManyWithoutWalletNestedInput
  }

  export type WalletCreateManyInput = {
    id?: string
    address: string
    whitelisted?: boolean
    userId: string
  }

  export type WalletUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    whitelisted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type WalletUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    whitelisted?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type PropertyCreateInput = {
    id?: string
    title: string
    solanaMint: string
    metadata: JsonNullValueInput | InputJsonValue
    moderationStatus?: $Enums.ModerationStatus
    moderationComment?: string | null
    tokenizationDate?: Date | string | null
    owner: UserCreateNestedOneWithoutPropertiesInput
    stakingRecords?: StakingRecordCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateInput = {
    id?: string
    title: string
    solanaMint: string
    ownerId: string
    metadata: JsonNullValueInput | InputJsonValue
    moderationStatus?: $Enums.ModerationStatus
    moderationComment?: string | null
    tokenizationDate?: Date | string | null
    stakingRecords?: StakingRecordUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    solanaMint?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    moderationStatus?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    moderationComment?: NullableStringFieldUpdateOperationsInput | string | null
    tokenizationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: UserUpdateOneRequiredWithoutPropertiesNestedInput
    stakingRecords?: StakingRecordUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    solanaMint?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    moderationStatus?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    moderationComment?: NullableStringFieldUpdateOperationsInput | string | null
    tokenizationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    stakingRecords?: StakingRecordUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyCreateManyInput = {
    id?: string
    title: string
    solanaMint: string
    ownerId: string
    metadata: JsonNullValueInput | InputJsonValue
    moderationStatus?: $Enums.ModerationStatus
    moderationComment?: string | null
    tokenizationDate?: Date | string | null
  }

  export type PropertyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    solanaMint?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    moderationStatus?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    moderationComment?: NullableStringFieldUpdateOperationsInput | string | null
    tokenizationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PropertyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    solanaMint?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    moderationStatus?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    moderationComment?: NullableStringFieldUpdateOperationsInput | string | null
    tokenizationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PaymentTransactionCreateInput = {
    id?: string
    txHash?: string | null
    amount: string
    fromWallet: string
    toWallet: string
    propertyId: string
    user: UserCreateNestedOneWithoutTransactionsInput
    Wallet?: WalletCreateNestedOneWithoutTransactionsInput
  }

  export type PaymentTransactionUncheckedCreateInput = {
    id?: string
    txHash?: string | null
    amount: string
    fromWallet: string
    toWallet: string
    propertyId: string
    userId: string
    walletId?: string | null
  }

  export type PaymentTransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: StringFieldUpdateOperationsInput | string
    fromWallet?: StringFieldUpdateOperationsInput | string
    toWallet?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutTransactionsNestedInput
    Wallet?: WalletUpdateOneWithoutTransactionsNestedInput
  }

  export type PaymentTransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: StringFieldUpdateOperationsInput | string
    fromWallet?: StringFieldUpdateOperationsInput | string
    toWallet?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    walletId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PaymentTransactionCreateManyInput = {
    id?: string
    txHash?: string | null
    amount: string
    fromWallet: string
    toWallet: string
    propertyId: string
    userId: string
    walletId?: string | null
  }

  export type PaymentTransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: StringFieldUpdateOperationsInput | string
    fromWallet?: StringFieldUpdateOperationsInput | string
    toWallet?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
  }

  export type PaymentTransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: StringFieldUpdateOperationsInput | string
    fromWallet?: StringFieldUpdateOperationsInput | string
    toWallet?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    walletId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StakingRecordCreateInput = {
    id?: string
    amount: string
    lastClaim?: Date | string | null
    user: UserCreateNestedOneWithoutStakingRecordsInput
    property: PropertyCreateNestedOneWithoutStakingRecordsInput
  }

  export type StakingRecordUncheckedCreateInput = {
    id?: string
    amount: string
    lastClaim?: Date | string | null
    userId: string
    propertyId: string
  }

  export type StakingRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    lastClaim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutStakingRecordsNestedInput
    property?: PropertyUpdateOneRequiredWithoutStakingRecordsNestedInput
  }

  export type StakingRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    lastClaim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
  }

  export type StakingRecordCreateManyInput = {
    id?: string
    amount: string
    lastClaim?: Date | string | null
    userId: string
    propertyId: string
  }

  export type StakingRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    lastClaim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StakingRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    lastClaim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
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

  export type EnumKycStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.KycStatus | EnumKycStatusFieldRefInput<$PrismaModel>
    in?: $Enums.KycStatus[] | ListEnumKycStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.KycStatus[] | ListEnumKycStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumKycStatusFilter<$PrismaModel> | $Enums.KycStatus
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

  export type WalletListRelationFilter = {
    every?: WalletWhereInput
    some?: WalletWhereInput
    none?: WalletWhereInput
  }

  export type PropertyListRelationFilter = {
    every?: PropertyWhereInput
    some?: PropertyWhereInput
    none?: PropertyWhereInput
  }

  export type PaymentTransactionListRelationFilter = {
    every?: PaymentTransactionWhereInput
    some?: PaymentTransactionWhereInput
    none?: PaymentTransactionWhereInput
  }

  export type StakingRecordListRelationFilter = {
    every?: StakingRecordWhereInput
    some?: StakingRecordWhereInput
    none?: StakingRecordWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type WalletOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PropertyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentTransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StakingRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    cognitoId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    kycStatus?: SortOrder
    kycVerificationId?: SortOrder
    kycVerifiedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    cognitoId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    kycStatus?: SortOrder
    kycVerificationId?: SortOrder
    kycVerifiedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    cognitoId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    kycStatus?: SortOrder
    kycVerificationId?: SortOrder
    kycVerifiedAt?: SortOrder
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

  export type EnumKycStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.KycStatus | EnumKycStatusFieldRefInput<$PrismaModel>
    in?: $Enums.KycStatus[] | ListEnumKycStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.KycStatus[] | ListEnumKycStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumKycStatusWithAggregatesFilter<$PrismaModel> | $Enums.KycStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumKycStatusFilter<$PrismaModel>
    _max?: NestedEnumKycStatusFilter<$PrismaModel>
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

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type WalletCountOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    whitelisted?: SortOrder
    userId?: SortOrder
  }

  export type WalletMaxOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    whitelisted?: SortOrder
    userId?: SortOrder
  }

  export type WalletMinOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    whitelisted?: SortOrder
    userId?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type EnumModerationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ModerationStatus | EnumModerationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ModerationStatus[] | ListEnumModerationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ModerationStatus[] | ListEnumModerationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumModerationStatusFilter<$PrismaModel> | $Enums.ModerationStatus
  }

  export type PropertyCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    solanaMint?: SortOrder
    ownerId?: SortOrder
    metadata?: SortOrder
    moderationStatus?: SortOrder
    moderationComment?: SortOrder
    tokenizationDate?: SortOrder
  }

  export type PropertyMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    solanaMint?: SortOrder
    ownerId?: SortOrder
    moderationStatus?: SortOrder
    moderationComment?: SortOrder
    tokenizationDate?: SortOrder
  }

  export type PropertyMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    solanaMint?: SortOrder
    ownerId?: SortOrder
    moderationStatus?: SortOrder
    moderationComment?: SortOrder
    tokenizationDate?: SortOrder
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

  export type EnumModerationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ModerationStatus | EnumModerationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ModerationStatus[] | ListEnumModerationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ModerationStatus[] | ListEnumModerationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumModerationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ModerationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumModerationStatusFilter<$PrismaModel>
    _max?: NestedEnumModerationStatusFilter<$PrismaModel>
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type WalletNullableScalarRelationFilter = {
    is?: WalletWhereInput | null
    isNot?: WalletWhereInput | null
  }

  export type PaymentTransactionCountOrderByAggregateInput = {
    id?: SortOrder
    txHash?: SortOrder
    amount?: SortOrder
    fromWallet?: SortOrder
    toWallet?: SortOrder
    propertyId?: SortOrder
    userId?: SortOrder
    walletId?: SortOrder
  }

  export type PaymentTransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    txHash?: SortOrder
    amount?: SortOrder
    fromWallet?: SortOrder
    toWallet?: SortOrder
    propertyId?: SortOrder
    userId?: SortOrder
    walletId?: SortOrder
  }

  export type PaymentTransactionMinOrderByAggregateInput = {
    id?: SortOrder
    txHash?: SortOrder
    amount?: SortOrder
    fromWallet?: SortOrder
    toWallet?: SortOrder
    propertyId?: SortOrder
    userId?: SortOrder
    walletId?: SortOrder
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type PropertyScalarRelationFilter = {
    is?: PropertyWhereInput
    isNot?: PropertyWhereInput
  }

  export type StakingRecordUserIdPropertyIdCompoundUniqueInput = {
    userId: string
    propertyId: string
  }

  export type StakingRecordCountOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    lastClaim?: SortOrder
    userId?: SortOrder
    propertyId?: SortOrder
  }

  export type StakingRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    lastClaim?: SortOrder
    userId?: SortOrder
    propertyId?: SortOrder
  }

  export type StakingRecordMinOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    lastClaim?: SortOrder
    userId?: SortOrder
    propertyId?: SortOrder
  }

  export type WalletCreateNestedManyWithoutUserInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput> | WalletCreateWithoutUserInput[] | WalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput | WalletCreateOrConnectWithoutUserInput[]
    createMany?: WalletCreateManyUserInputEnvelope
    connect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
  }

  export type PropertyCreateNestedManyWithoutOwnerInput = {
    create?: XOR<PropertyCreateWithoutOwnerInput, PropertyUncheckedCreateWithoutOwnerInput> | PropertyCreateWithoutOwnerInput[] | PropertyUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: PropertyCreateOrConnectWithoutOwnerInput | PropertyCreateOrConnectWithoutOwnerInput[]
    createMany?: PropertyCreateManyOwnerInputEnvelope
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
  }

  export type PaymentTransactionCreateNestedManyWithoutUserInput = {
    create?: XOR<PaymentTransactionCreateWithoutUserInput, PaymentTransactionUncheckedCreateWithoutUserInput> | PaymentTransactionCreateWithoutUserInput[] | PaymentTransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentTransactionCreateOrConnectWithoutUserInput | PaymentTransactionCreateOrConnectWithoutUserInput[]
    createMany?: PaymentTransactionCreateManyUserInputEnvelope
    connect?: PaymentTransactionWhereUniqueInput | PaymentTransactionWhereUniqueInput[]
  }

  export type StakingRecordCreateNestedManyWithoutUserInput = {
    create?: XOR<StakingRecordCreateWithoutUserInput, StakingRecordUncheckedCreateWithoutUserInput> | StakingRecordCreateWithoutUserInput[] | StakingRecordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StakingRecordCreateOrConnectWithoutUserInput | StakingRecordCreateOrConnectWithoutUserInput[]
    createMany?: StakingRecordCreateManyUserInputEnvelope
    connect?: StakingRecordWhereUniqueInput | StakingRecordWhereUniqueInput[]
  }

  export type WalletUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput> | WalletCreateWithoutUserInput[] | WalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput | WalletCreateOrConnectWithoutUserInput[]
    createMany?: WalletCreateManyUserInputEnvelope
    connect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
  }

  export type PropertyUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<PropertyCreateWithoutOwnerInput, PropertyUncheckedCreateWithoutOwnerInput> | PropertyCreateWithoutOwnerInput[] | PropertyUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: PropertyCreateOrConnectWithoutOwnerInput | PropertyCreateOrConnectWithoutOwnerInput[]
    createMany?: PropertyCreateManyOwnerInputEnvelope
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
  }

  export type PaymentTransactionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PaymentTransactionCreateWithoutUserInput, PaymentTransactionUncheckedCreateWithoutUserInput> | PaymentTransactionCreateWithoutUserInput[] | PaymentTransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentTransactionCreateOrConnectWithoutUserInput | PaymentTransactionCreateOrConnectWithoutUserInput[]
    createMany?: PaymentTransactionCreateManyUserInputEnvelope
    connect?: PaymentTransactionWhereUniqueInput | PaymentTransactionWhereUniqueInput[]
  }

  export type StakingRecordUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<StakingRecordCreateWithoutUserInput, StakingRecordUncheckedCreateWithoutUserInput> | StakingRecordCreateWithoutUserInput[] | StakingRecordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StakingRecordCreateOrConnectWithoutUserInput | StakingRecordCreateOrConnectWithoutUserInput[]
    createMany?: StakingRecordCreateManyUserInputEnvelope
    connect?: StakingRecordWhereUniqueInput | StakingRecordWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumKycStatusFieldUpdateOperationsInput = {
    set?: $Enums.KycStatus
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type WalletUpdateManyWithoutUserNestedInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput> | WalletCreateWithoutUserInput[] | WalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput | WalletCreateOrConnectWithoutUserInput[]
    upsert?: WalletUpsertWithWhereUniqueWithoutUserInput | WalletUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WalletCreateManyUserInputEnvelope
    set?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    disconnect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    delete?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    connect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    update?: WalletUpdateWithWhereUniqueWithoutUserInput | WalletUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WalletUpdateManyWithWhereWithoutUserInput | WalletUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WalletScalarWhereInput | WalletScalarWhereInput[]
  }

  export type PropertyUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<PropertyCreateWithoutOwnerInput, PropertyUncheckedCreateWithoutOwnerInput> | PropertyCreateWithoutOwnerInput[] | PropertyUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: PropertyCreateOrConnectWithoutOwnerInput | PropertyCreateOrConnectWithoutOwnerInput[]
    upsert?: PropertyUpsertWithWhereUniqueWithoutOwnerInput | PropertyUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: PropertyCreateManyOwnerInputEnvelope
    set?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    disconnect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    delete?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    update?: PropertyUpdateWithWhereUniqueWithoutOwnerInput | PropertyUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: PropertyUpdateManyWithWhereWithoutOwnerInput | PropertyUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: PropertyScalarWhereInput | PropertyScalarWhereInput[]
  }

  export type PaymentTransactionUpdateManyWithoutUserNestedInput = {
    create?: XOR<PaymentTransactionCreateWithoutUserInput, PaymentTransactionUncheckedCreateWithoutUserInput> | PaymentTransactionCreateWithoutUserInput[] | PaymentTransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentTransactionCreateOrConnectWithoutUserInput | PaymentTransactionCreateOrConnectWithoutUserInput[]
    upsert?: PaymentTransactionUpsertWithWhereUniqueWithoutUserInput | PaymentTransactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PaymentTransactionCreateManyUserInputEnvelope
    set?: PaymentTransactionWhereUniqueInput | PaymentTransactionWhereUniqueInput[]
    disconnect?: PaymentTransactionWhereUniqueInput | PaymentTransactionWhereUniqueInput[]
    delete?: PaymentTransactionWhereUniqueInput | PaymentTransactionWhereUniqueInput[]
    connect?: PaymentTransactionWhereUniqueInput | PaymentTransactionWhereUniqueInput[]
    update?: PaymentTransactionUpdateWithWhereUniqueWithoutUserInput | PaymentTransactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PaymentTransactionUpdateManyWithWhereWithoutUserInput | PaymentTransactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PaymentTransactionScalarWhereInput | PaymentTransactionScalarWhereInput[]
  }

  export type StakingRecordUpdateManyWithoutUserNestedInput = {
    create?: XOR<StakingRecordCreateWithoutUserInput, StakingRecordUncheckedCreateWithoutUserInput> | StakingRecordCreateWithoutUserInput[] | StakingRecordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StakingRecordCreateOrConnectWithoutUserInput | StakingRecordCreateOrConnectWithoutUserInput[]
    upsert?: StakingRecordUpsertWithWhereUniqueWithoutUserInput | StakingRecordUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: StakingRecordCreateManyUserInputEnvelope
    set?: StakingRecordWhereUniqueInput | StakingRecordWhereUniqueInput[]
    disconnect?: StakingRecordWhereUniqueInput | StakingRecordWhereUniqueInput[]
    delete?: StakingRecordWhereUniqueInput | StakingRecordWhereUniqueInput[]
    connect?: StakingRecordWhereUniqueInput | StakingRecordWhereUniqueInput[]
    update?: StakingRecordUpdateWithWhereUniqueWithoutUserInput | StakingRecordUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: StakingRecordUpdateManyWithWhereWithoutUserInput | StakingRecordUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: StakingRecordScalarWhereInput | StakingRecordScalarWhereInput[]
  }

  export type WalletUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput> | WalletCreateWithoutUserInput[] | WalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput | WalletCreateOrConnectWithoutUserInput[]
    upsert?: WalletUpsertWithWhereUniqueWithoutUserInput | WalletUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WalletCreateManyUserInputEnvelope
    set?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    disconnect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    delete?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    connect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    update?: WalletUpdateWithWhereUniqueWithoutUserInput | WalletUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WalletUpdateManyWithWhereWithoutUserInput | WalletUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WalletScalarWhereInput | WalletScalarWhereInput[]
  }

  export type PropertyUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<PropertyCreateWithoutOwnerInput, PropertyUncheckedCreateWithoutOwnerInput> | PropertyCreateWithoutOwnerInput[] | PropertyUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: PropertyCreateOrConnectWithoutOwnerInput | PropertyCreateOrConnectWithoutOwnerInput[]
    upsert?: PropertyUpsertWithWhereUniqueWithoutOwnerInput | PropertyUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: PropertyCreateManyOwnerInputEnvelope
    set?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    disconnect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    delete?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    update?: PropertyUpdateWithWhereUniqueWithoutOwnerInput | PropertyUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: PropertyUpdateManyWithWhereWithoutOwnerInput | PropertyUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: PropertyScalarWhereInput | PropertyScalarWhereInput[]
  }

  export type PaymentTransactionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PaymentTransactionCreateWithoutUserInput, PaymentTransactionUncheckedCreateWithoutUserInput> | PaymentTransactionCreateWithoutUserInput[] | PaymentTransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentTransactionCreateOrConnectWithoutUserInput | PaymentTransactionCreateOrConnectWithoutUserInput[]
    upsert?: PaymentTransactionUpsertWithWhereUniqueWithoutUserInput | PaymentTransactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PaymentTransactionCreateManyUserInputEnvelope
    set?: PaymentTransactionWhereUniqueInput | PaymentTransactionWhereUniqueInput[]
    disconnect?: PaymentTransactionWhereUniqueInput | PaymentTransactionWhereUniqueInput[]
    delete?: PaymentTransactionWhereUniqueInput | PaymentTransactionWhereUniqueInput[]
    connect?: PaymentTransactionWhereUniqueInput | PaymentTransactionWhereUniqueInput[]
    update?: PaymentTransactionUpdateWithWhereUniqueWithoutUserInput | PaymentTransactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PaymentTransactionUpdateManyWithWhereWithoutUserInput | PaymentTransactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PaymentTransactionScalarWhereInput | PaymentTransactionScalarWhereInput[]
  }

  export type StakingRecordUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<StakingRecordCreateWithoutUserInput, StakingRecordUncheckedCreateWithoutUserInput> | StakingRecordCreateWithoutUserInput[] | StakingRecordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StakingRecordCreateOrConnectWithoutUserInput | StakingRecordCreateOrConnectWithoutUserInput[]
    upsert?: StakingRecordUpsertWithWhereUniqueWithoutUserInput | StakingRecordUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: StakingRecordCreateManyUserInputEnvelope
    set?: StakingRecordWhereUniqueInput | StakingRecordWhereUniqueInput[]
    disconnect?: StakingRecordWhereUniqueInput | StakingRecordWhereUniqueInput[]
    delete?: StakingRecordWhereUniqueInput | StakingRecordWhereUniqueInput[]
    connect?: StakingRecordWhereUniqueInput | StakingRecordWhereUniqueInput[]
    update?: StakingRecordUpdateWithWhereUniqueWithoutUserInput | StakingRecordUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: StakingRecordUpdateManyWithWhereWithoutUserInput | StakingRecordUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: StakingRecordScalarWhereInput | StakingRecordScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutWalletsInput = {
    create?: XOR<UserCreateWithoutWalletsInput, UserUncheckedCreateWithoutWalletsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWalletsInput
    connect?: UserWhereUniqueInput
  }

  export type PaymentTransactionCreateNestedManyWithoutWalletInput = {
    create?: XOR<PaymentTransactionCreateWithoutWalletInput, PaymentTransactionUncheckedCreateWithoutWalletInput> | PaymentTransactionCreateWithoutWalletInput[] | PaymentTransactionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: PaymentTransactionCreateOrConnectWithoutWalletInput | PaymentTransactionCreateOrConnectWithoutWalletInput[]
    createMany?: PaymentTransactionCreateManyWalletInputEnvelope
    connect?: PaymentTransactionWhereUniqueInput | PaymentTransactionWhereUniqueInput[]
  }

  export type PaymentTransactionUncheckedCreateNestedManyWithoutWalletInput = {
    create?: XOR<PaymentTransactionCreateWithoutWalletInput, PaymentTransactionUncheckedCreateWithoutWalletInput> | PaymentTransactionCreateWithoutWalletInput[] | PaymentTransactionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: PaymentTransactionCreateOrConnectWithoutWalletInput | PaymentTransactionCreateOrConnectWithoutWalletInput[]
    createMany?: PaymentTransactionCreateManyWalletInputEnvelope
    connect?: PaymentTransactionWhereUniqueInput | PaymentTransactionWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutWalletsNestedInput = {
    create?: XOR<UserCreateWithoutWalletsInput, UserUncheckedCreateWithoutWalletsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWalletsInput
    upsert?: UserUpsertWithoutWalletsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWalletsInput, UserUpdateWithoutWalletsInput>, UserUncheckedUpdateWithoutWalletsInput>
  }

  export type PaymentTransactionUpdateManyWithoutWalletNestedInput = {
    create?: XOR<PaymentTransactionCreateWithoutWalletInput, PaymentTransactionUncheckedCreateWithoutWalletInput> | PaymentTransactionCreateWithoutWalletInput[] | PaymentTransactionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: PaymentTransactionCreateOrConnectWithoutWalletInput | PaymentTransactionCreateOrConnectWithoutWalletInput[]
    upsert?: PaymentTransactionUpsertWithWhereUniqueWithoutWalletInput | PaymentTransactionUpsertWithWhereUniqueWithoutWalletInput[]
    createMany?: PaymentTransactionCreateManyWalletInputEnvelope
    set?: PaymentTransactionWhereUniqueInput | PaymentTransactionWhereUniqueInput[]
    disconnect?: PaymentTransactionWhereUniqueInput | PaymentTransactionWhereUniqueInput[]
    delete?: PaymentTransactionWhereUniqueInput | PaymentTransactionWhereUniqueInput[]
    connect?: PaymentTransactionWhereUniqueInput | PaymentTransactionWhereUniqueInput[]
    update?: PaymentTransactionUpdateWithWhereUniqueWithoutWalletInput | PaymentTransactionUpdateWithWhereUniqueWithoutWalletInput[]
    updateMany?: PaymentTransactionUpdateManyWithWhereWithoutWalletInput | PaymentTransactionUpdateManyWithWhereWithoutWalletInput[]
    deleteMany?: PaymentTransactionScalarWhereInput | PaymentTransactionScalarWhereInput[]
  }

  export type PaymentTransactionUncheckedUpdateManyWithoutWalletNestedInput = {
    create?: XOR<PaymentTransactionCreateWithoutWalletInput, PaymentTransactionUncheckedCreateWithoutWalletInput> | PaymentTransactionCreateWithoutWalletInput[] | PaymentTransactionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: PaymentTransactionCreateOrConnectWithoutWalletInput | PaymentTransactionCreateOrConnectWithoutWalletInput[]
    upsert?: PaymentTransactionUpsertWithWhereUniqueWithoutWalletInput | PaymentTransactionUpsertWithWhereUniqueWithoutWalletInput[]
    createMany?: PaymentTransactionCreateManyWalletInputEnvelope
    set?: PaymentTransactionWhereUniqueInput | PaymentTransactionWhereUniqueInput[]
    disconnect?: PaymentTransactionWhereUniqueInput | PaymentTransactionWhereUniqueInput[]
    delete?: PaymentTransactionWhereUniqueInput | PaymentTransactionWhereUniqueInput[]
    connect?: PaymentTransactionWhereUniqueInput | PaymentTransactionWhereUniqueInput[]
    update?: PaymentTransactionUpdateWithWhereUniqueWithoutWalletInput | PaymentTransactionUpdateWithWhereUniqueWithoutWalletInput[]
    updateMany?: PaymentTransactionUpdateManyWithWhereWithoutWalletInput | PaymentTransactionUpdateManyWithWhereWithoutWalletInput[]
    deleteMany?: PaymentTransactionScalarWhereInput | PaymentTransactionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPropertiesInput = {
    create?: XOR<UserCreateWithoutPropertiesInput, UserUncheckedCreateWithoutPropertiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutPropertiesInput
    connect?: UserWhereUniqueInput
  }

  export type StakingRecordCreateNestedManyWithoutPropertyInput = {
    create?: XOR<StakingRecordCreateWithoutPropertyInput, StakingRecordUncheckedCreateWithoutPropertyInput> | StakingRecordCreateWithoutPropertyInput[] | StakingRecordUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: StakingRecordCreateOrConnectWithoutPropertyInput | StakingRecordCreateOrConnectWithoutPropertyInput[]
    createMany?: StakingRecordCreateManyPropertyInputEnvelope
    connect?: StakingRecordWhereUniqueInput | StakingRecordWhereUniqueInput[]
  }

  export type StakingRecordUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<StakingRecordCreateWithoutPropertyInput, StakingRecordUncheckedCreateWithoutPropertyInput> | StakingRecordCreateWithoutPropertyInput[] | StakingRecordUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: StakingRecordCreateOrConnectWithoutPropertyInput | StakingRecordCreateOrConnectWithoutPropertyInput[]
    createMany?: StakingRecordCreateManyPropertyInputEnvelope
    connect?: StakingRecordWhereUniqueInput | StakingRecordWhereUniqueInput[]
  }

  export type EnumModerationStatusFieldUpdateOperationsInput = {
    set?: $Enums.ModerationStatus
  }

  export type UserUpdateOneRequiredWithoutPropertiesNestedInput = {
    create?: XOR<UserCreateWithoutPropertiesInput, UserUncheckedCreateWithoutPropertiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutPropertiesInput
    upsert?: UserUpsertWithoutPropertiesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPropertiesInput, UserUpdateWithoutPropertiesInput>, UserUncheckedUpdateWithoutPropertiesInput>
  }

  export type StakingRecordUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<StakingRecordCreateWithoutPropertyInput, StakingRecordUncheckedCreateWithoutPropertyInput> | StakingRecordCreateWithoutPropertyInput[] | StakingRecordUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: StakingRecordCreateOrConnectWithoutPropertyInput | StakingRecordCreateOrConnectWithoutPropertyInput[]
    upsert?: StakingRecordUpsertWithWhereUniqueWithoutPropertyInput | StakingRecordUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: StakingRecordCreateManyPropertyInputEnvelope
    set?: StakingRecordWhereUniqueInput | StakingRecordWhereUniqueInput[]
    disconnect?: StakingRecordWhereUniqueInput | StakingRecordWhereUniqueInput[]
    delete?: StakingRecordWhereUniqueInput | StakingRecordWhereUniqueInput[]
    connect?: StakingRecordWhereUniqueInput | StakingRecordWhereUniqueInput[]
    update?: StakingRecordUpdateWithWhereUniqueWithoutPropertyInput | StakingRecordUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: StakingRecordUpdateManyWithWhereWithoutPropertyInput | StakingRecordUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: StakingRecordScalarWhereInput | StakingRecordScalarWhereInput[]
  }

  export type StakingRecordUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<StakingRecordCreateWithoutPropertyInput, StakingRecordUncheckedCreateWithoutPropertyInput> | StakingRecordCreateWithoutPropertyInput[] | StakingRecordUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: StakingRecordCreateOrConnectWithoutPropertyInput | StakingRecordCreateOrConnectWithoutPropertyInput[]
    upsert?: StakingRecordUpsertWithWhereUniqueWithoutPropertyInput | StakingRecordUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: StakingRecordCreateManyPropertyInputEnvelope
    set?: StakingRecordWhereUniqueInput | StakingRecordWhereUniqueInput[]
    disconnect?: StakingRecordWhereUniqueInput | StakingRecordWhereUniqueInput[]
    delete?: StakingRecordWhereUniqueInput | StakingRecordWhereUniqueInput[]
    connect?: StakingRecordWhereUniqueInput | StakingRecordWhereUniqueInput[]
    update?: StakingRecordUpdateWithWhereUniqueWithoutPropertyInput | StakingRecordUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: StakingRecordUpdateManyWithWhereWithoutPropertyInput | StakingRecordUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: StakingRecordScalarWhereInput | StakingRecordScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactionsInput
    connect?: UserWhereUniqueInput
  }

  export type WalletCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<WalletCreateWithoutTransactionsInput, WalletUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: WalletCreateOrConnectWithoutTransactionsInput
    connect?: WalletWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactionsInput
    upsert?: UserUpsertWithoutTransactionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTransactionsInput, UserUpdateWithoutTransactionsInput>, UserUncheckedUpdateWithoutTransactionsInput>
  }

  export type WalletUpdateOneWithoutTransactionsNestedInput = {
    create?: XOR<WalletCreateWithoutTransactionsInput, WalletUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: WalletCreateOrConnectWithoutTransactionsInput
    upsert?: WalletUpsertWithoutTransactionsInput
    disconnect?: WalletWhereInput | boolean
    delete?: WalletWhereInput | boolean
    connect?: WalletWhereUniqueInput
    update?: XOR<XOR<WalletUpdateToOneWithWhereWithoutTransactionsInput, WalletUpdateWithoutTransactionsInput>, WalletUncheckedUpdateWithoutTransactionsInput>
  }

  export type UserCreateNestedOneWithoutStakingRecordsInput = {
    create?: XOR<UserCreateWithoutStakingRecordsInput, UserUncheckedCreateWithoutStakingRecordsInput>
    connectOrCreate?: UserCreateOrConnectWithoutStakingRecordsInput
    connect?: UserWhereUniqueInput
  }

  export type PropertyCreateNestedOneWithoutStakingRecordsInput = {
    create?: XOR<PropertyCreateWithoutStakingRecordsInput, PropertyUncheckedCreateWithoutStakingRecordsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutStakingRecordsInput
    connect?: PropertyWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutStakingRecordsNestedInput = {
    create?: XOR<UserCreateWithoutStakingRecordsInput, UserUncheckedCreateWithoutStakingRecordsInput>
    connectOrCreate?: UserCreateOrConnectWithoutStakingRecordsInput
    upsert?: UserUpsertWithoutStakingRecordsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStakingRecordsInput, UserUpdateWithoutStakingRecordsInput>, UserUncheckedUpdateWithoutStakingRecordsInput>
  }

  export type PropertyUpdateOneRequiredWithoutStakingRecordsNestedInput = {
    create?: XOR<PropertyCreateWithoutStakingRecordsInput, PropertyUncheckedCreateWithoutStakingRecordsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutStakingRecordsInput
    upsert?: PropertyUpsertWithoutStakingRecordsInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutStakingRecordsInput, PropertyUpdateWithoutStakingRecordsInput>, PropertyUncheckedUpdateWithoutStakingRecordsInput>
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

  export type NestedEnumKycStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.KycStatus | EnumKycStatusFieldRefInput<$PrismaModel>
    in?: $Enums.KycStatus[] | ListEnumKycStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.KycStatus[] | ListEnumKycStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumKycStatusFilter<$PrismaModel> | $Enums.KycStatus
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

  export type NestedEnumKycStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.KycStatus | EnumKycStatusFieldRefInput<$PrismaModel>
    in?: $Enums.KycStatus[] | ListEnumKycStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.KycStatus[] | ListEnumKycStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumKycStatusWithAggregatesFilter<$PrismaModel> | $Enums.KycStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumKycStatusFilter<$PrismaModel>
    _max?: NestedEnumKycStatusFilter<$PrismaModel>
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

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumModerationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ModerationStatus | EnumModerationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ModerationStatus[] | ListEnumModerationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ModerationStatus[] | ListEnumModerationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumModerationStatusFilter<$PrismaModel> | $Enums.ModerationStatus
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

  export type NestedEnumModerationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ModerationStatus | EnumModerationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ModerationStatus[] | ListEnumModerationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ModerationStatus[] | ListEnumModerationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumModerationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ModerationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumModerationStatusFilter<$PrismaModel>
    _max?: NestedEnumModerationStatusFilter<$PrismaModel>
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type WalletCreateWithoutUserInput = {
    id?: string
    address: string
    whitelisted?: boolean
    transactions?: PaymentTransactionCreateNestedManyWithoutWalletInput
  }

  export type WalletUncheckedCreateWithoutUserInput = {
    id?: string
    address: string
    whitelisted?: boolean
    transactions?: PaymentTransactionUncheckedCreateNestedManyWithoutWalletInput
  }

  export type WalletCreateOrConnectWithoutUserInput = {
    where: WalletWhereUniqueInput
    create: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
  }

  export type WalletCreateManyUserInputEnvelope = {
    data: WalletCreateManyUserInput | WalletCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PropertyCreateWithoutOwnerInput = {
    id?: string
    title: string
    solanaMint: string
    metadata: JsonNullValueInput | InputJsonValue
    moderationStatus?: $Enums.ModerationStatus
    moderationComment?: string | null
    tokenizationDate?: Date | string | null
    stakingRecords?: StakingRecordCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutOwnerInput = {
    id?: string
    title: string
    solanaMint: string
    metadata: JsonNullValueInput | InputJsonValue
    moderationStatus?: $Enums.ModerationStatus
    moderationComment?: string | null
    tokenizationDate?: Date | string | null
    stakingRecords?: StakingRecordUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutOwnerInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutOwnerInput, PropertyUncheckedCreateWithoutOwnerInput>
  }

  export type PropertyCreateManyOwnerInputEnvelope = {
    data: PropertyCreateManyOwnerInput | PropertyCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type PaymentTransactionCreateWithoutUserInput = {
    id?: string
    txHash?: string | null
    amount: string
    fromWallet: string
    toWallet: string
    propertyId: string
    Wallet?: WalletCreateNestedOneWithoutTransactionsInput
  }

  export type PaymentTransactionUncheckedCreateWithoutUserInput = {
    id?: string
    txHash?: string | null
    amount: string
    fromWallet: string
    toWallet: string
    propertyId: string
    walletId?: string | null
  }

  export type PaymentTransactionCreateOrConnectWithoutUserInput = {
    where: PaymentTransactionWhereUniqueInput
    create: XOR<PaymentTransactionCreateWithoutUserInput, PaymentTransactionUncheckedCreateWithoutUserInput>
  }

  export type PaymentTransactionCreateManyUserInputEnvelope = {
    data: PaymentTransactionCreateManyUserInput | PaymentTransactionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type StakingRecordCreateWithoutUserInput = {
    id?: string
    amount: string
    lastClaim?: Date | string | null
    property: PropertyCreateNestedOneWithoutStakingRecordsInput
  }

  export type StakingRecordUncheckedCreateWithoutUserInput = {
    id?: string
    amount: string
    lastClaim?: Date | string | null
    propertyId: string
  }

  export type StakingRecordCreateOrConnectWithoutUserInput = {
    where: StakingRecordWhereUniqueInput
    create: XOR<StakingRecordCreateWithoutUserInput, StakingRecordUncheckedCreateWithoutUserInput>
  }

  export type StakingRecordCreateManyUserInputEnvelope = {
    data: StakingRecordCreateManyUserInput | StakingRecordCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WalletUpsertWithWhereUniqueWithoutUserInput = {
    where: WalletWhereUniqueInput
    update: XOR<WalletUpdateWithoutUserInput, WalletUncheckedUpdateWithoutUserInput>
    create: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
  }

  export type WalletUpdateWithWhereUniqueWithoutUserInput = {
    where: WalletWhereUniqueInput
    data: XOR<WalletUpdateWithoutUserInput, WalletUncheckedUpdateWithoutUserInput>
  }

  export type WalletUpdateManyWithWhereWithoutUserInput = {
    where: WalletScalarWhereInput
    data: XOR<WalletUpdateManyMutationInput, WalletUncheckedUpdateManyWithoutUserInput>
  }

  export type WalletScalarWhereInput = {
    AND?: WalletScalarWhereInput | WalletScalarWhereInput[]
    OR?: WalletScalarWhereInput[]
    NOT?: WalletScalarWhereInput | WalletScalarWhereInput[]
    id?: UuidFilter<"Wallet"> | string
    address?: StringFilter<"Wallet"> | string
    whitelisted?: BoolFilter<"Wallet"> | boolean
    userId?: StringFilter<"Wallet"> | string
  }

  export type PropertyUpsertWithWhereUniqueWithoutOwnerInput = {
    where: PropertyWhereUniqueInput
    update: XOR<PropertyUpdateWithoutOwnerInput, PropertyUncheckedUpdateWithoutOwnerInput>
    create: XOR<PropertyCreateWithoutOwnerInput, PropertyUncheckedCreateWithoutOwnerInput>
  }

  export type PropertyUpdateWithWhereUniqueWithoutOwnerInput = {
    where: PropertyWhereUniqueInput
    data: XOR<PropertyUpdateWithoutOwnerInput, PropertyUncheckedUpdateWithoutOwnerInput>
  }

  export type PropertyUpdateManyWithWhereWithoutOwnerInput = {
    where: PropertyScalarWhereInput
    data: XOR<PropertyUpdateManyMutationInput, PropertyUncheckedUpdateManyWithoutOwnerInput>
  }

  export type PropertyScalarWhereInput = {
    AND?: PropertyScalarWhereInput | PropertyScalarWhereInput[]
    OR?: PropertyScalarWhereInput[]
    NOT?: PropertyScalarWhereInput | PropertyScalarWhereInput[]
    id?: UuidFilter<"Property"> | string
    title?: StringFilter<"Property"> | string
    solanaMint?: StringFilter<"Property"> | string
    ownerId?: StringFilter<"Property"> | string
    metadata?: JsonFilter<"Property">
    moderationStatus?: EnumModerationStatusFilter<"Property"> | $Enums.ModerationStatus
    moderationComment?: StringNullableFilter<"Property"> | string | null
    tokenizationDate?: DateTimeNullableFilter<"Property"> | Date | string | null
  }

  export type PaymentTransactionUpsertWithWhereUniqueWithoutUserInput = {
    where: PaymentTransactionWhereUniqueInput
    update: XOR<PaymentTransactionUpdateWithoutUserInput, PaymentTransactionUncheckedUpdateWithoutUserInput>
    create: XOR<PaymentTransactionCreateWithoutUserInput, PaymentTransactionUncheckedCreateWithoutUserInput>
  }

  export type PaymentTransactionUpdateWithWhereUniqueWithoutUserInput = {
    where: PaymentTransactionWhereUniqueInput
    data: XOR<PaymentTransactionUpdateWithoutUserInput, PaymentTransactionUncheckedUpdateWithoutUserInput>
  }

  export type PaymentTransactionUpdateManyWithWhereWithoutUserInput = {
    where: PaymentTransactionScalarWhereInput
    data: XOR<PaymentTransactionUpdateManyMutationInput, PaymentTransactionUncheckedUpdateManyWithoutUserInput>
  }

  export type PaymentTransactionScalarWhereInput = {
    AND?: PaymentTransactionScalarWhereInput | PaymentTransactionScalarWhereInput[]
    OR?: PaymentTransactionScalarWhereInput[]
    NOT?: PaymentTransactionScalarWhereInput | PaymentTransactionScalarWhereInput[]
    id?: UuidFilter<"PaymentTransaction"> | string
    txHash?: StringNullableFilter<"PaymentTransaction"> | string | null
    amount?: StringFilter<"PaymentTransaction"> | string
    fromWallet?: StringFilter<"PaymentTransaction"> | string
    toWallet?: StringFilter<"PaymentTransaction"> | string
    propertyId?: UuidFilter<"PaymentTransaction"> | string
    userId?: StringFilter<"PaymentTransaction"> | string
    walletId?: UuidNullableFilter<"PaymentTransaction"> | string | null
  }

  export type StakingRecordUpsertWithWhereUniqueWithoutUserInput = {
    where: StakingRecordWhereUniqueInput
    update: XOR<StakingRecordUpdateWithoutUserInput, StakingRecordUncheckedUpdateWithoutUserInput>
    create: XOR<StakingRecordCreateWithoutUserInput, StakingRecordUncheckedCreateWithoutUserInput>
  }

  export type StakingRecordUpdateWithWhereUniqueWithoutUserInput = {
    where: StakingRecordWhereUniqueInput
    data: XOR<StakingRecordUpdateWithoutUserInput, StakingRecordUncheckedUpdateWithoutUserInput>
  }

  export type StakingRecordUpdateManyWithWhereWithoutUserInput = {
    where: StakingRecordScalarWhereInput
    data: XOR<StakingRecordUpdateManyMutationInput, StakingRecordUncheckedUpdateManyWithoutUserInput>
  }

  export type StakingRecordScalarWhereInput = {
    AND?: StakingRecordScalarWhereInput | StakingRecordScalarWhereInput[]
    OR?: StakingRecordScalarWhereInput[]
    NOT?: StakingRecordScalarWhereInput | StakingRecordScalarWhereInput[]
    id?: UuidFilter<"StakingRecord"> | string
    amount?: StringFilter<"StakingRecord"> | string
    lastClaim?: DateTimeNullableFilter<"StakingRecord"> | Date | string | null
    userId?: StringFilter<"StakingRecord"> | string
    propertyId?: UuidFilter<"StakingRecord"> | string
  }

  export type UserCreateWithoutWalletsInput = {
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    kycStatus?: $Enums.KycStatus
    kycVerificationId?: string | null
    kycVerifiedAt?: Date | string | null
    properties?: PropertyCreateNestedManyWithoutOwnerInput
    transactions?: PaymentTransactionCreateNestedManyWithoutUserInput
    stakingRecords?: StakingRecordCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWalletsInput = {
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    kycStatus?: $Enums.KycStatus
    kycVerificationId?: string | null
    kycVerifiedAt?: Date | string | null
    properties?: PropertyUncheckedCreateNestedManyWithoutOwnerInput
    transactions?: PaymentTransactionUncheckedCreateNestedManyWithoutUserInput
    stakingRecords?: StakingRecordUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWalletsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWalletsInput, UserUncheckedCreateWithoutWalletsInput>
  }

  export type PaymentTransactionCreateWithoutWalletInput = {
    id?: string
    txHash?: string | null
    amount: string
    fromWallet: string
    toWallet: string
    propertyId: string
    user: UserCreateNestedOneWithoutTransactionsInput
  }

  export type PaymentTransactionUncheckedCreateWithoutWalletInput = {
    id?: string
    txHash?: string | null
    amount: string
    fromWallet: string
    toWallet: string
    propertyId: string
    userId: string
  }

  export type PaymentTransactionCreateOrConnectWithoutWalletInput = {
    where: PaymentTransactionWhereUniqueInput
    create: XOR<PaymentTransactionCreateWithoutWalletInput, PaymentTransactionUncheckedCreateWithoutWalletInput>
  }

  export type PaymentTransactionCreateManyWalletInputEnvelope = {
    data: PaymentTransactionCreateManyWalletInput | PaymentTransactionCreateManyWalletInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutWalletsInput = {
    update: XOR<UserUpdateWithoutWalletsInput, UserUncheckedUpdateWithoutWalletsInput>
    create: XOR<UserCreateWithoutWalletsInput, UserUncheckedCreateWithoutWalletsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWalletsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWalletsInput, UserUncheckedUpdateWithoutWalletsInput>
  }

  export type UserUpdateWithoutWalletsInput = {
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus
    kycVerificationId?: NullableStringFieldUpdateOperationsInput | string | null
    kycVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    properties?: PropertyUpdateManyWithoutOwnerNestedInput
    transactions?: PaymentTransactionUpdateManyWithoutUserNestedInput
    stakingRecords?: StakingRecordUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWalletsInput = {
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus
    kycVerificationId?: NullableStringFieldUpdateOperationsInput | string | null
    kycVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    properties?: PropertyUncheckedUpdateManyWithoutOwnerNestedInput
    transactions?: PaymentTransactionUncheckedUpdateManyWithoutUserNestedInput
    stakingRecords?: StakingRecordUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PaymentTransactionUpsertWithWhereUniqueWithoutWalletInput = {
    where: PaymentTransactionWhereUniqueInput
    update: XOR<PaymentTransactionUpdateWithoutWalletInput, PaymentTransactionUncheckedUpdateWithoutWalletInput>
    create: XOR<PaymentTransactionCreateWithoutWalletInput, PaymentTransactionUncheckedCreateWithoutWalletInput>
  }

  export type PaymentTransactionUpdateWithWhereUniqueWithoutWalletInput = {
    where: PaymentTransactionWhereUniqueInput
    data: XOR<PaymentTransactionUpdateWithoutWalletInput, PaymentTransactionUncheckedUpdateWithoutWalletInput>
  }

  export type PaymentTransactionUpdateManyWithWhereWithoutWalletInput = {
    where: PaymentTransactionScalarWhereInput
    data: XOR<PaymentTransactionUpdateManyMutationInput, PaymentTransactionUncheckedUpdateManyWithoutWalletInput>
  }

  export type UserCreateWithoutPropertiesInput = {
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    kycStatus?: $Enums.KycStatus
    kycVerificationId?: string | null
    kycVerifiedAt?: Date | string | null
    wallets?: WalletCreateNestedManyWithoutUserInput
    transactions?: PaymentTransactionCreateNestedManyWithoutUserInput
    stakingRecords?: StakingRecordCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPropertiesInput = {
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    kycStatus?: $Enums.KycStatus
    kycVerificationId?: string | null
    kycVerifiedAt?: Date | string | null
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
    transactions?: PaymentTransactionUncheckedCreateNestedManyWithoutUserInput
    stakingRecords?: StakingRecordUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPropertiesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPropertiesInput, UserUncheckedCreateWithoutPropertiesInput>
  }

  export type StakingRecordCreateWithoutPropertyInput = {
    id?: string
    amount: string
    lastClaim?: Date | string | null
    user: UserCreateNestedOneWithoutStakingRecordsInput
  }

  export type StakingRecordUncheckedCreateWithoutPropertyInput = {
    id?: string
    amount: string
    lastClaim?: Date | string | null
    userId: string
  }

  export type StakingRecordCreateOrConnectWithoutPropertyInput = {
    where: StakingRecordWhereUniqueInput
    create: XOR<StakingRecordCreateWithoutPropertyInput, StakingRecordUncheckedCreateWithoutPropertyInput>
  }

  export type StakingRecordCreateManyPropertyInputEnvelope = {
    data: StakingRecordCreateManyPropertyInput | StakingRecordCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPropertiesInput = {
    update: XOR<UserUpdateWithoutPropertiesInput, UserUncheckedUpdateWithoutPropertiesInput>
    create: XOR<UserCreateWithoutPropertiesInput, UserUncheckedCreateWithoutPropertiesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPropertiesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPropertiesInput, UserUncheckedUpdateWithoutPropertiesInput>
  }

  export type UserUpdateWithoutPropertiesInput = {
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus
    kycVerificationId?: NullableStringFieldUpdateOperationsInput | string | null
    kycVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wallets?: WalletUpdateManyWithoutUserNestedInput
    transactions?: PaymentTransactionUpdateManyWithoutUserNestedInput
    stakingRecords?: StakingRecordUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPropertiesInput = {
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus
    kycVerificationId?: NullableStringFieldUpdateOperationsInput | string | null
    kycVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
    transactions?: PaymentTransactionUncheckedUpdateManyWithoutUserNestedInput
    stakingRecords?: StakingRecordUncheckedUpdateManyWithoutUserNestedInput
  }

  export type StakingRecordUpsertWithWhereUniqueWithoutPropertyInput = {
    where: StakingRecordWhereUniqueInput
    update: XOR<StakingRecordUpdateWithoutPropertyInput, StakingRecordUncheckedUpdateWithoutPropertyInput>
    create: XOR<StakingRecordCreateWithoutPropertyInput, StakingRecordUncheckedCreateWithoutPropertyInput>
  }

  export type StakingRecordUpdateWithWhereUniqueWithoutPropertyInput = {
    where: StakingRecordWhereUniqueInput
    data: XOR<StakingRecordUpdateWithoutPropertyInput, StakingRecordUncheckedUpdateWithoutPropertyInput>
  }

  export type StakingRecordUpdateManyWithWhereWithoutPropertyInput = {
    where: StakingRecordScalarWhereInput
    data: XOR<StakingRecordUpdateManyMutationInput, StakingRecordUncheckedUpdateManyWithoutPropertyInput>
  }

  export type UserCreateWithoutTransactionsInput = {
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    kycStatus?: $Enums.KycStatus
    kycVerificationId?: string | null
    kycVerifiedAt?: Date | string | null
    wallets?: WalletCreateNestedManyWithoutUserInput
    properties?: PropertyCreateNestedManyWithoutOwnerInput
    stakingRecords?: StakingRecordCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTransactionsInput = {
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    kycStatus?: $Enums.KycStatus
    kycVerificationId?: string | null
    kycVerifiedAt?: Date | string | null
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
    properties?: PropertyUncheckedCreateNestedManyWithoutOwnerInput
    stakingRecords?: StakingRecordUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTransactionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
  }

  export type WalletCreateWithoutTransactionsInput = {
    id?: string
    address: string
    whitelisted?: boolean
    user: UserCreateNestedOneWithoutWalletsInput
  }

  export type WalletUncheckedCreateWithoutTransactionsInput = {
    id?: string
    address: string
    whitelisted?: boolean
    userId: string
  }

  export type WalletCreateOrConnectWithoutTransactionsInput = {
    where: WalletWhereUniqueInput
    create: XOR<WalletCreateWithoutTransactionsInput, WalletUncheckedCreateWithoutTransactionsInput>
  }

  export type UserUpsertWithoutTransactionsInput = {
    update: XOR<UserUpdateWithoutTransactionsInput, UserUncheckedUpdateWithoutTransactionsInput>
    create: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTransactionsInput, UserUncheckedUpdateWithoutTransactionsInput>
  }

  export type UserUpdateWithoutTransactionsInput = {
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus
    kycVerificationId?: NullableStringFieldUpdateOperationsInput | string | null
    kycVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wallets?: WalletUpdateManyWithoutUserNestedInput
    properties?: PropertyUpdateManyWithoutOwnerNestedInput
    stakingRecords?: StakingRecordUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTransactionsInput = {
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus
    kycVerificationId?: NullableStringFieldUpdateOperationsInput | string | null
    kycVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
    properties?: PropertyUncheckedUpdateManyWithoutOwnerNestedInput
    stakingRecords?: StakingRecordUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WalletUpsertWithoutTransactionsInput = {
    update: XOR<WalletUpdateWithoutTransactionsInput, WalletUncheckedUpdateWithoutTransactionsInput>
    create: XOR<WalletCreateWithoutTransactionsInput, WalletUncheckedCreateWithoutTransactionsInput>
    where?: WalletWhereInput
  }

  export type WalletUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: WalletWhereInput
    data: XOR<WalletUpdateWithoutTransactionsInput, WalletUncheckedUpdateWithoutTransactionsInput>
  }

  export type WalletUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    whitelisted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutWalletsNestedInput
  }

  export type WalletUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    whitelisted?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateWithoutStakingRecordsInput = {
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    kycStatus?: $Enums.KycStatus
    kycVerificationId?: string | null
    kycVerifiedAt?: Date | string | null
    wallets?: WalletCreateNestedManyWithoutUserInput
    properties?: PropertyCreateNestedManyWithoutOwnerInput
    transactions?: PaymentTransactionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutStakingRecordsInput = {
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    kycStatus?: $Enums.KycStatus
    kycVerificationId?: string | null
    kycVerifiedAt?: Date | string | null
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
    properties?: PropertyUncheckedCreateNestedManyWithoutOwnerInput
    transactions?: PaymentTransactionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutStakingRecordsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStakingRecordsInput, UserUncheckedCreateWithoutStakingRecordsInput>
  }

  export type PropertyCreateWithoutStakingRecordsInput = {
    id?: string
    title: string
    solanaMint: string
    metadata: JsonNullValueInput | InputJsonValue
    moderationStatus?: $Enums.ModerationStatus
    moderationComment?: string | null
    tokenizationDate?: Date | string | null
    owner: UserCreateNestedOneWithoutPropertiesInput
  }

  export type PropertyUncheckedCreateWithoutStakingRecordsInput = {
    id?: string
    title: string
    solanaMint: string
    ownerId: string
    metadata: JsonNullValueInput | InputJsonValue
    moderationStatus?: $Enums.ModerationStatus
    moderationComment?: string | null
    tokenizationDate?: Date | string | null
  }

  export type PropertyCreateOrConnectWithoutStakingRecordsInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutStakingRecordsInput, PropertyUncheckedCreateWithoutStakingRecordsInput>
  }

  export type UserUpsertWithoutStakingRecordsInput = {
    update: XOR<UserUpdateWithoutStakingRecordsInput, UserUncheckedUpdateWithoutStakingRecordsInput>
    create: XOR<UserCreateWithoutStakingRecordsInput, UserUncheckedCreateWithoutStakingRecordsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStakingRecordsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStakingRecordsInput, UserUncheckedUpdateWithoutStakingRecordsInput>
  }

  export type UserUpdateWithoutStakingRecordsInput = {
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus
    kycVerificationId?: NullableStringFieldUpdateOperationsInput | string | null
    kycVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wallets?: WalletUpdateManyWithoutUserNestedInput
    properties?: PropertyUpdateManyWithoutOwnerNestedInput
    transactions?: PaymentTransactionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutStakingRecordsInput = {
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus
    kycVerificationId?: NullableStringFieldUpdateOperationsInput | string | null
    kycVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
    properties?: PropertyUncheckedUpdateManyWithoutOwnerNestedInput
    transactions?: PaymentTransactionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PropertyUpsertWithoutStakingRecordsInput = {
    update: XOR<PropertyUpdateWithoutStakingRecordsInput, PropertyUncheckedUpdateWithoutStakingRecordsInput>
    create: XOR<PropertyCreateWithoutStakingRecordsInput, PropertyUncheckedCreateWithoutStakingRecordsInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutStakingRecordsInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutStakingRecordsInput, PropertyUncheckedUpdateWithoutStakingRecordsInput>
  }

  export type PropertyUpdateWithoutStakingRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    solanaMint?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    moderationStatus?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    moderationComment?: NullableStringFieldUpdateOperationsInput | string | null
    tokenizationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: UserUpdateOneRequiredWithoutPropertiesNestedInput
  }

  export type PropertyUncheckedUpdateWithoutStakingRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    solanaMint?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    moderationStatus?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    moderationComment?: NullableStringFieldUpdateOperationsInput | string | null
    tokenizationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WalletCreateManyUserInput = {
    id?: string
    address: string
    whitelisted?: boolean
  }

  export type PropertyCreateManyOwnerInput = {
    id?: string
    title: string
    solanaMint: string
    metadata: JsonNullValueInput | InputJsonValue
    moderationStatus?: $Enums.ModerationStatus
    moderationComment?: string | null
    tokenizationDate?: Date | string | null
  }

  export type PaymentTransactionCreateManyUserInput = {
    id?: string
    txHash?: string | null
    amount: string
    fromWallet: string
    toWallet: string
    propertyId: string
    walletId?: string | null
  }

  export type StakingRecordCreateManyUserInput = {
    id?: string
    amount: string
    lastClaim?: Date | string | null
    propertyId: string
  }

  export type WalletUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    whitelisted?: BoolFieldUpdateOperationsInput | boolean
    transactions?: PaymentTransactionUpdateManyWithoutWalletNestedInput
  }

  export type WalletUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    whitelisted?: BoolFieldUpdateOperationsInput | boolean
    transactions?: PaymentTransactionUncheckedUpdateManyWithoutWalletNestedInput
  }

  export type WalletUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    whitelisted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PropertyUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    solanaMint?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    moderationStatus?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    moderationComment?: NullableStringFieldUpdateOperationsInput | string | null
    tokenizationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    stakingRecords?: StakingRecordUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    solanaMint?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    moderationStatus?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    moderationComment?: NullableStringFieldUpdateOperationsInput | string | null
    tokenizationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    stakingRecords?: StakingRecordUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    solanaMint?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    moderationStatus?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    moderationComment?: NullableStringFieldUpdateOperationsInput | string | null
    tokenizationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PaymentTransactionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: StringFieldUpdateOperationsInput | string
    fromWallet?: StringFieldUpdateOperationsInput | string
    toWallet?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    Wallet?: WalletUpdateOneWithoutTransactionsNestedInput
  }

  export type PaymentTransactionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: StringFieldUpdateOperationsInput | string
    fromWallet?: StringFieldUpdateOperationsInput | string
    toWallet?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    walletId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PaymentTransactionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: StringFieldUpdateOperationsInput | string
    fromWallet?: StringFieldUpdateOperationsInput | string
    toWallet?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    walletId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StakingRecordUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    lastClaim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    property?: PropertyUpdateOneRequiredWithoutStakingRecordsNestedInput
  }

  export type StakingRecordUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    lastClaim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    propertyId?: StringFieldUpdateOperationsInput | string
  }

  export type StakingRecordUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    lastClaim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    propertyId?: StringFieldUpdateOperationsInput | string
  }

  export type PaymentTransactionCreateManyWalletInput = {
    id?: string
    txHash?: string | null
    amount: string
    fromWallet: string
    toWallet: string
    propertyId: string
    userId: string
  }

  export type PaymentTransactionUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: StringFieldUpdateOperationsInput | string
    fromWallet?: StringFieldUpdateOperationsInput | string
    toWallet?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type PaymentTransactionUncheckedUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: StringFieldUpdateOperationsInput | string
    fromWallet?: StringFieldUpdateOperationsInput | string
    toWallet?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type PaymentTransactionUncheckedUpdateManyWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: StringFieldUpdateOperationsInput | string
    fromWallet?: StringFieldUpdateOperationsInput | string
    toWallet?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type StakingRecordCreateManyPropertyInput = {
    id?: string
    amount: string
    lastClaim?: Date | string | null
    userId: string
  }

  export type StakingRecordUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    lastClaim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutStakingRecordsNestedInput
  }

  export type StakingRecordUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    lastClaim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type StakingRecordUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    lastClaim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
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