/**
 * Client
 **/

import * as runtime from "@prisma/client/runtime/library.js";

import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model Property
 *
 */
export type Property = $Result.DefaultSelection<Prisma.$PropertyPayload>;
/**
 * Model Manager
 *
 */
export type Manager = $Result.DefaultSelection<Prisma.$ManagerPayload>;
/**
 * Model Investor
 *
 */
export type Investor = $Result.DefaultSelection<Prisma.$InvestorPayload>;
/**
 * Model Location
 *
 */
export type Location = $Result.DefaultSelection<Prisma.$LocationPayload>;
/**
 * Model Application
 *
 */
export type Application = $Result.DefaultSelection<Prisma.$ApplicationPayload>;
/**
 * Model Lease
 *
 */
export type Lease = $Result.DefaultSelection<Prisma.$LeasePayload>;
/**
 * Model Payment
 *
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>;

/**
 * Enums
 */
export namespace $Enums {
  export const PropertyType: {
    Rooms: "Rooms";
    Tinyhouse: "Tinyhouse";
    Apartment: "Apartment";
    Villa: "Villa";
    Townhouse: "Townhouse";
    Cottage: "Cottage";
  };

  export type PropertyType = (typeof PropertyType)[keyof typeof PropertyType];

  export const ApplicationStatus: {
    Pending: "Pending";
    Denied: "Denied";
    Approved: "Approved";
  };

  export type ApplicationStatus = (typeof ApplicationStatus)[keyof typeof ApplicationStatus];

  export const PaymentStatus: {
    Pending: "Pending";
    Paid: "Paid";
    PartiallyPaid: "PartiallyPaid";
    Overdue: "Overdue";
  };

  export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
}

export type PropertyType = $Enums.PropertyType;

export const PropertyType: typeof $Enums.PropertyType;

export type ApplicationStatus = $Enums.ApplicationStatus;

export const ApplicationStatus: typeof $Enums.ApplicationStatus;

export type PaymentStatus = $Enums.PaymentStatus;

export const PaymentStatus: typeof $Enums.PaymentStatus;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Properties
 * const properties = await prisma.property.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = "log" extends keyof ClientOptions
    ? ClientOptions["log"] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<ClientOptions["log"]>
      : never
    : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["other"] };

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Properties
   * const properties = await prisma.property.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(
    eventType: V,
    callback: (event: V extends "query" ? Prisma.QueryEvent : Prisma.LogEvent) => void,
  ): PrismaClient;

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
  $use(cb: Prisma.Middleware): void;

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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: { isolationLevel?: Prisma.TransactionIsolationLevel },
  ): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    },
  ): $Utils.JsPromise<R>;

  $extends: $Extensions.ExtendsHook<
    "extends",
    Prisma.TypeMapCb<ClientOptions>,
    ExtArgs,
    $Utils.Call<
      Prisma.TypeMapCb<ClientOptions>,
      {
        extArgs: ExtArgs;
      }
    >
  >;

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
   * `prisma.manager`: Exposes CRUD operations for the **Manager** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Managers
   * const managers = await prisma.manager.findMany()
   * ```
   */
  get manager(): Prisma.ManagerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.investor`: Exposes CRUD operations for the **Investor** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Investors
   * const investors = await prisma.investor.findMany()
   * ```
   */
  get investor(): Prisma.InvestorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.location`: Exposes CRUD operations for the **Location** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Locations
   * const locations = await prisma.location.findMany()
   * ```
   */
  get location(): Prisma.LocationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.application`: Exposes CRUD operations for the **Application** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Applications
   * const applications = await prisma.application.findMany()
   * ```
   */
  get application(): Prisma.ApplicationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lease`: Exposes CRUD operations for the **Lease** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Leases
   * const leases = await prisma.lease.findMany()
   * ```
   */
  get lease(): Prisma.LeaseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Payments
   * const payments = await prisma.payment.findMany()
   * ```
   */
  get payment(): Prisma.PaymentDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  export type PrismaPromise<T> = $Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export import validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics;
  export type Metric<T> = runtime.Metric<T>;
  export type MetricHistogram = runtime.MetricHistogram;
  export type MetricHistogramBucket = runtime.MetricHistogramBucket;

  /**
   * Extensions
   */
  export import Extension = $Extensions.UserArgs;
  export import getExtensionContext = runtime.Extensions.getExtensionContext;
  export import Args = $Public.Args;
  export import Payload = $Public.Payload;
  export import Result = $Public.Result;
  export import Exact = $Public.Exact;

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  export import JsonObject = runtime.JsonObject;
  export import JsonArray = runtime.JsonArray;
  export import JsonValue = runtime.JsonValue;
  export import InputJsonObject = runtime.InputJsonObject;
  export import InputJsonArray = runtime.InputJsonArray;
  export import InputJsonValue = runtime.InputJsonValue;

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
      private DbNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never;
      private constructor();
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull;

  type SelectAndInclude = {
    select: any;
    include: any;
  };

  type SelectAndOmit = {
    select: any;
    omit: any;
  };

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
  };

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

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
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? "Please either choose `select` or `include`."
    : T extends SelectAndOmit
      ? "Please either choose `select` or `omit`."
      : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object ? (U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U) : T;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> =
    T extends Array<any>
      ? False
      : T extends Date
        ? False
        : T extends Uint8Array
          ? False
          : T extends bigint
            ? False
            : T extends object
              ? True
              : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown
    ? _Either<O, K, strict>
    : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
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
      ? (K extends keyof O ? { [P in K]: O[P] } & O : O) | ({ [P in keyof O as P extends K ? P : never]-?: O[P] } & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0;

  export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<T, U = Omit<T, "_avg" | "_sum" | "_count" | "_min" | "_max">> = IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<"OR", K>, Extends<"AND", K>>, Extends<"NOT", K>> extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
        ? never
        : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;

  export const ModelName: {
    Property: "Property";
    Manager: "Manager";
    Investor: "Investor";
    Location: "Location";
    Application: "Application";
    Lease: "Lease";
    Payment: "Payment";
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  export type Datasources = {
    db?: Datasource;
  };

  interface TypeMapCb<ClientOptions = {}>
    extends $Utils.Fn<{ extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<
      this["params"]["extArgs"],
      ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}
    >;
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions;
    };
    meta: {
      modelProps: "property" | "manager" | "investor" | "location" | "application" | "lease" | "payment";
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      Property: {
        payload: Prisma.$PropertyPayload<ExtArgs>;
        fields: Prisma.PropertyFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.PropertyFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.PropertyFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>;
          };
          findFirst: {
            args: Prisma.PropertyFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.PropertyFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>;
          };
          findMany: {
            args: Prisma.PropertyFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>[];
          };
          create: {
            args: Prisma.PropertyCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>;
          };
          createMany: {
            args: Prisma.PropertyCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.PropertyCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>[];
          };
          delete: {
            args: Prisma.PropertyDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>;
          };
          update: {
            args: Prisma.PropertyUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>;
          };
          deleteMany: {
            args: Prisma.PropertyDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.PropertyUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.PropertyUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>[];
          };
          upsert: {
            args: Prisma.PropertyUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>;
          };
          aggregate: {
            args: Prisma.PropertyAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateProperty>;
          };
          groupBy: {
            args: Prisma.PropertyGroupByArgs<ExtArgs>;
            result: $Utils.Optional<PropertyGroupByOutputType>[];
          };
          count: {
            args: Prisma.PropertyCountArgs<ExtArgs>;
            result: $Utils.Optional<PropertyCountAggregateOutputType> | number;
          };
        };
      };
      Manager: {
        payload: Prisma.$ManagerPayload<ExtArgs>;
        fields: Prisma.ManagerFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ManagerFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ManagerFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>;
          };
          findFirst: {
            args: Prisma.ManagerFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ManagerFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>;
          };
          findMany: {
            args: Prisma.ManagerFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>[];
          };
          create: {
            args: Prisma.ManagerCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>;
          };
          createMany: {
            args: Prisma.ManagerCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ManagerCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>[];
          };
          delete: {
            args: Prisma.ManagerDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>;
          };
          update: {
            args: Prisma.ManagerUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>;
          };
          deleteMany: {
            args: Prisma.ManagerDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ManagerUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.ManagerUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>[];
          };
          upsert: {
            args: Prisma.ManagerUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>;
          };
          aggregate: {
            args: Prisma.ManagerAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateManager>;
          };
          groupBy: {
            args: Prisma.ManagerGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ManagerGroupByOutputType>[];
          };
          count: {
            args: Prisma.ManagerCountArgs<ExtArgs>;
            result: $Utils.Optional<ManagerCountAggregateOutputType> | number;
          };
        };
      };
      Investor: {
        payload: Prisma.$InvestorPayload<ExtArgs>;
        fields: Prisma.InvestorFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.InvestorFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InvestorPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.InvestorFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InvestorPayload>;
          };
          findFirst: {
            args: Prisma.InvestorFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InvestorPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.InvestorFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InvestorPayload>;
          };
          findMany: {
            args: Prisma.InvestorFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InvestorPayload>[];
          };
          create: {
            args: Prisma.InvestorCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InvestorPayload>;
          };
          createMany: {
            args: Prisma.InvestorCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.InvestorCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InvestorPayload>[];
          };
          delete: {
            args: Prisma.InvestorDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InvestorPayload>;
          };
          update: {
            args: Prisma.InvestorUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InvestorPayload>;
          };
          deleteMany: {
            args: Prisma.InvestorDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.InvestorUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.InvestorUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InvestorPayload>[];
          };
          upsert: {
            args: Prisma.InvestorUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InvestorPayload>;
          };
          aggregate: {
            args: Prisma.InvestorAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateInvestor>;
          };
          groupBy: {
            args: Prisma.InvestorGroupByArgs<ExtArgs>;
            result: $Utils.Optional<InvestorGroupByOutputType>[];
          };
          count: {
            args: Prisma.InvestorCountArgs<ExtArgs>;
            result: $Utils.Optional<InvestorCountAggregateOutputType> | number;
          };
        };
      };
      Location: {
        payload: Prisma.$LocationPayload<ExtArgs>;
        fields: Prisma.LocationFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.LocationFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$LocationPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.LocationFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>;
          };
          findFirst: {
            args: Prisma.LocationFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$LocationPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.LocationFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>;
          };
          findMany: {
            args: Prisma.LocationFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[];
          };
          create: {
            args: Prisma.LocationCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>;
          };
          createMany: {
            args: Prisma.LocationCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.LocationCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[];
          };
          delete: {
            args: Prisma.LocationDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>;
          };
          update: {
            args: Prisma.LocationUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>;
          };
          deleteMany: {
            args: Prisma.LocationDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.LocationUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.LocationUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[];
          };
          upsert: {
            args: Prisma.LocationUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>;
          };
          aggregate: {
            args: Prisma.LocationAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateLocation>;
          };
          groupBy: {
            args: Prisma.LocationGroupByArgs<ExtArgs>;
            result: $Utils.Optional<LocationGroupByOutputType>[];
          };
          count: {
            args: Prisma.LocationCountArgs<ExtArgs>;
            result: $Utils.Optional<LocationCountAggregateOutputType> | number;
          };
        };
      };
      Application: {
        payload: Prisma.$ApplicationPayload<ExtArgs>;
        fields: Prisma.ApplicationFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ApplicationFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ApplicationFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>;
          };
          findFirst: {
            args: Prisma.ApplicationFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ApplicationFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>;
          };
          findMany: {
            args: Prisma.ApplicationFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>[];
          };
          create: {
            args: Prisma.ApplicationCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>;
          };
          createMany: {
            args: Prisma.ApplicationCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ApplicationCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>[];
          };
          delete: {
            args: Prisma.ApplicationDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>;
          };
          update: {
            args: Prisma.ApplicationUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>;
          };
          deleteMany: {
            args: Prisma.ApplicationDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ApplicationUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.ApplicationUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>[];
          };
          upsert: {
            args: Prisma.ApplicationUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>;
          };
          aggregate: {
            args: Prisma.ApplicationAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateApplication>;
          };
          groupBy: {
            args: Prisma.ApplicationGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ApplicationGroupByOutputType>[];
          };
          count: {
            args: Prisma.ApplicationCountArgs<ExtArgs>;
            result: $Utils.Optional<ApplicationCountAggregateOutputType> | number;
          };
        };
      };
      Lease: {
        payload: Prisma.$LeasePayload<ExtArgs>;
        fields: Prisma.LeaseFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.LeaseFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$LeasePayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.LeaseFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$LeasePayload>;
          };
          findFirst: {
            args: Prisma.LeaseFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$LeasePayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.LeaseFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$LeasePayload>;
          };
          findMany: {
            args: Prisma.LeaseFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$LeasePayload>[];
          };
          create: {
            args: Prisma.LeaseCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$LeasePayload>;
          };
          createMany: {
            args: Prisma.LeaseCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.LeaseCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$LeasePayload>[];
          };
          delete: {
            args: Prisma.LeaseDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$LeasePayload>;
          };
          update: {
            args: Prisma.LeaseUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$LeasePayload>;
          };
          deleteMany: {
            args: Prisma.LeaseDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.LeaseUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.LeaseUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$LeasePayload>[];
          };
          upsert: {
            args: Prisma.LeaseUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$LeasePayload>;
          };
          aggregate: {
            args: Prisma.LeaseAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateLease>;
          };
          groupBy: {
            args: Prisma.LeaseGroupByArgs<ExtArgs>;
            result: $Utils.Optional<LeaseGroupByOutputType>[];
          };
          count: {
            args: Prisma.LeaseCountArgs<ExtArgs>;
            result: $Utils.Optional<LeaseCountAggregateOutputType> | number;
          };
        };
      };
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>;
        fields: Prisma.PaymentFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>;
          };
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>;
          };
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[];
          };
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>;
          };
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[];
          };
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>;
          };
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>;
          };
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[];
          };
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>;
          };
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregatePayment>;
          };
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>;
            result: $Utils.Optional<PaymentGroupByOutputType>[];
          };
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>;
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
      };
    };
  };
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = "pretty" | "colorless" | "minimal";
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources;
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string;
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
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
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    };
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
    omit?: Prisma.GlobalOmitConfig;
  }
  export type GlobalOmitConfig = {
    property?: PropertyOmit;
    manager?: ManagerOmit;
    investor?: InvestorOmit;
    location?: LocationOmit;
    application?: ApplicationOmit;
    lease?: LeaseOmit;
    payment?: PaymentOmit;
  };

  /* Types for Logging */
  export type LogLevel = "info" | "query" | "warn" | "error";
  export type LogDefinition = {
    level: LogLevel;
    emit: "stdout" | "event";
  };

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition
    ? T["emit"] extends "event"
      ? T["level"]
      : never
    : never;
  export type GetEvents<T extends any> =
    T extends Array<LogLevel | LogDefinition>
      ? GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
      : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | "findUnique"
    | "findUniqueOrThrow"
    | "findMany"
    | "findFirst"
    | "findFirstOrThrow"
    | "create"
    | "createMany"
    | "createManyAndReturn"
    | "update"
    | "updateMany"
    | "updateManyAndReturn"
    | "upsert"
    | "delete"
    | "deleteMany"
    | "executeRaw"
    | "queryRaw"
    | "aggregate"
    | "count"
    | "runCommandRaw"
    | "findRaw"
    | "groupBy";

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName;
    action: PrismaAction;
    args: any;
    dataPath: string[];
    runInTransaction: boolean;
  };

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>;

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type PropertyCountOutputType
   */

  export type PropertyCountOutputType = {
    leases: number;
    applications: number;
    favoritedBy: number;
    investors: number;
  };

  export type PropertyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leases?: boolean | PropertyCountOutputTypeCountLeasesArgs;
    applications?: boolean | PropertyCountOutputTypeCountApplicationsArgs;
    favoritedBy?: boolean | PropertyCountOutputTypeCountFavoritedByArgs;
    investors?: boolean | PropertyCountOutputTypeCountInvestorsArgs;
  };

  // Custom InputTypes
  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyCountOutputType
     */
    select?: PropertyCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountLeasesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: LeaseWhereInput;
  };

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountApplicationsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ApplicationWhereInput;
  };

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountFavoritedByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: InvestorWhereInput;
  };

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountInvestorsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: InvestorWhereInput;
  };

  /**
   * Count Type ManagerCountOutputType
   */

  export type ManagerCountOutputType = {
    managedProperties: number;
  };

  export type ManagerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    managedProperties?: boolean | ManagerCountOutputTypeCountManagedPropertiesArgs;
  };

  // Custom InputTypes
  /**
   * ManagerCountOutputType without action
   */
  export type ManagerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ManagerCountOutputType
     */
    select?: ManagerCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * ManagerCountOutputType without action
   */
  export type ManagerCountOutputTypeCountManagedPropertiesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: PropertyWhereInput;
  };

  /**
   * Count Type InvestorCountOutputType
   */

  export type InvestorCountOutputType = {
    properties: number;
    favorites: number;
    applications: number;
    leases: number;
  };

  export type InvestorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    properties?: boolean | InvestorCountOutputTypeCountPropertiesArgs;
    favorites?: boolean | InvestorCountOutputTypeCountFavoritesArgs;
    applications?: boolean | InvestorCountOutputTypeCountApplicationsArgs;
    leases?: boolean | InvestorCountOutputTypeCountLeasesArgs;
  };

  // Custom InputTypes
  /**
   * InvestorCountOutputType without action
   */
  export type InvestorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvestorCountOutputType
     */
    select?: InvestorCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * InvestorCountOutputType without action
   */
  export type InvestorCountOutputTypeCountPropertiesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: PropertyWhereInput;
  };

  /**
   * InvestorCountOutputType without action
   */
  export type InvestorCountOutputTypeCountFavoritesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: PropertyWhereInput;
  };

  /**
   * InvestorCountOutputType without action
   */
  export type InvestorCountOutputTypeCountApplicationsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ApplicationWhereInput;
  };

  /**
   * InvestorCountOutputType without action
   */
  export type InvestorCountOutputTypeCountLeasesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: LeaseWhereInput;
  };

  /**
   * Count Type LocationCountOutputType
   */

  export type LocationCountOutputType = {
    properties: number;
  };

  export type LocationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    properties?: boolean | LocationCountOutputTypeCountPropertiesArgs;
  };

  // Custom InputTypes
  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationCountOutputType
     */
    select?: LocationCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeCountPropertiesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: PropertyWhereInput;
  };

  /**
   * Count Type LeaseCountOutputType
   */

  export type LeaseCountOutputType = {
    payments: number;
  };

  export type LeaseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payments?: boolean | LeaseCountOutputTypeCountPaymentsArgs;
  };

  // Custom InputTypes
  /**
   * LeaseCountOutputType without action
   */
  export type LeaseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaseCountOutputType
     */
    select?: LeaseCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * LeaseCountOutputType without action
   */
  export type LeaseCountOutputTypeCountPaymentsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: PaymentWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model Property
   */

  export type AggregateProperty = {
    _count: PropertyCountAggregateOutputType | null;
    _avg: PropertyAvgAggregateOutputType | null;
    _sum: PropertySumAggregateOutputType | null;
    _min: PropertyMinAggregateOutputType | null;
    _max: PropertyMaxAggregateOutputType | null;
  };

  export type PropertyAvgAggregateOutputType = {
    id: number | null;
    pricePerMonth: number | null;
    securityDeposit: number | null;
    applicationFee: number | null;
    beds: number | null;
    baths: number | null;
    squareFeet: number | null;
    averageRating: number | null;
    numberOfReviews: number | null;
    locationId: number | null;
  };

  export type PropertySumAggregateOutputType = {
    id: number | null;
    pricePerMonth: number | null;
    securityDeposit: number | null;
    applicationFee: number | null;
    beds: number | null;
    baths: number | null;
    squareFeet: number | null;
    averageRating: number | null;
    numberOfReviews: number | null;
    locationId: number | null;
  };

  export type PropertyMinAggregateOutputType = {
    id: number | null;
    name: string | null;
    description: string | null;
    pricePerMonth: number | null;
    securityDeposit: number | null;
    applicationFee: number | null;
    isPetsAllowed: boolean | null;
    isParkingIncluded: boolean | null;
    beds: number | null;
    baths: number | null;
    squareFeet: number | null;
    propertyType: $Enums.PropertyType | null;
    postedDate: Date | null;
    averageRating: number | null;
    numberOfReviews: number | null;
    locationId: number | null;
    managerCognitoId: string | null;
  };

  export type PropertyMaxAggregateOutputType = {
    id: number | null;
    name: string | null;
    description: string | null;
    pricePerMonth: number | null;
    securityDeposit: number | null;
    applicationFee: number | null;
    isPetsAllowed: boolean | null;
    isParkingIncluded: boolean | null;
    beds: number | null;
    baths: number | null;
    squareFeet: number | null;
    propertyType: $Enums.PropertyType | null;
    postedDate: Date | null;
    averageRating: number | null;
    numberOfReviews: number | null;
    locationId: number | null;
    managerCognitoId: string | null;
  };

  export type PropertyCountAggregateOutputType = {
    id: number;
    name: number;
    description: number;
    pricePerMonth: number;
    securityDeposit: number;
    applicationFee: number;
    photoUrls: number;
    isPetsAllowed: number;
    isParkingIncluded: number;
    beds: number;
    baths: number;
    squareFeet: number;
    propertyType: number;
    postedDate: number;
    averageRating: number;
    numberOfReviews: number;
    locationId: number;
    managerCognitoId: number;
    _all: number;
  };

  export type PropertyAvgAggregateInputType = {
    id?: true;
    pricePerMonth?: true;
    securityDeposit?: true;
    applicationFee?: true;
    beds?: true;
    baths?: true;
    squareFeet?: true;
    averageRating?: true;
    numberOfReviews?: true;
    locationId?: true;
  };

  export type PropertySumAggregateInputType = {
    id?: true;
    pricePerMonth?: true;
    securityDeposit?: true;
    applicationFee?: true;
    beds?: true;
    baths?: true;
    squareFeet?: true;
    averageRating?: true;
    numberOfReviews?: true;
    locationId?: true;
  };

  export type PropertyMinAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    pricePerMonth?: true;
    securityDeposit?: true;
    applicationFee?: true;
    isPetsAllowed?: true;
    isParkingIncluded?: true;
    beds?: true;
    baths?: true;
    squareFeet?: true;
    propertyType?: true;
    postedDate?: true;
    averageRating?: true;
    numberOfReviews?: true;
    locationId?: true;
    managerCognitoId?: true;
  };

  export type PropertyMaxAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    pricePerMonth?: true;
    securityDeposit?: true;
    applicationFee?: true;
    isPetsAllowed?: true;
    isParkingIncluded?: true;
    beds?: true;
    baths?: true;
    squareFeet?: true;
    propertyType?: true;
    postedDate?: true;
    averageRating?: true;
    numberOfReviews?: true;
    locationId?: true;
    managerCognitoId?: true;
  };

  export type PropertyCountAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    pricePerMonth?: true;
    securityDeposit?: true;
    applicationFee?: true;
    photoUrls?: true;
    isPetsAllowed?: true;
    isParkingIncluded?: true;
    beds?: true;
    baths?: true;
    squareFeet?: true;
    propertyType?: true;
    postedDate?: true;
    averageRating?: true;
    numberOfReviews?: true;
    locationId?: true;
    managerCognitoId?: true;
    _all?: true;
  };

  export type PropertyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Property to aggregate.
     */
    where?: PropertyWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: PropertyWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Properties.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Properties
     **/
    _count?: true | PropertyCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: PropertyAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: PropertySumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: PropertyMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: PropertyMaxAggregateInputType;
  };

  export type GetPropertyAggregateType<T extends PropertyAggregateArgs> = {
    [P in keyof T & keyof AggregateProperty]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProperty[P]>
      : GetScalarType<T[P], AggregateProperty[P]>;
  };

  export type PropertyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyWhereInput;
    orderBy?: PropertyOrderByWithAggregationInput | PropertyOrderByWithAggregationInput[];
    by: PropertyScalarFieldEnum[] | PropertyScalarFieldEnum;
    having?: PropertyScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PropertyCountAggregateInputType | true;
    _avg?: PropertyAvgAggregateInputType;
    _sum?: PropertySumAggregateInputType;
    _min?: PropertyMinAggregateInputType;
    _max?: PropertyMaxAggregateInputType;
  };

  export type PropertyGroupByOutputType = {
    id: number;
    name: string;
    description: string;
    pricePerMonth: number;
    securityDeposit: number;
    applicationFee: number;
    photoUrls: string[];
    isPetsAllowed: boolean;
    isParkingIncluded: boolean;
    beds: number;
    baths: number;
    squareFeet: number;
    propertyType: $Enums.PropertyType;
    postedDate: Date;
    averageRating: number | null;
    numberOfReviews: number | null;
    locationId: number;
    managerCognitoId: string;
    _count: PropertyCountAggregateOutputType | null;
    _avg: PropertyAvgAggregateOutputType | null;
    _sum: PropertySumAggregateOutputType | null;
    _min: PropertyMinAggregateOutputType | null;
    _max: PropertyMaxAggregateOutputType | null;
  };

  type GetPropertyGroupByPayload<T extends PropertyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PropertyGroupByOutputType, T["by"]> & {
        [P in keyof T & keyof PropertyGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], PropertyGroupByOutputType[P]>
          : GetScalarType<T[P], PropertyGroupByOutputType[P]>;
      }
    >
  >;

  export type PropertySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        name?: boolean;
        description?: boolean;
        pricePerMonth?: boolean;
        securityDeposit?: boolean;
        applicationFee?: boolean;
        photoUrls?: boolean;
        isPetsAllowed?: boolean;
        isParkingIncluded?: boolean;
        beds?: boolean;
        baths?: boolean;
        squareFeet?: boolean;
        propertyType?: boolean;
        postedDate?: boolean;
        averageRating?: boolean;
        numberOfReviews?: boolean;
        locationId?: boolean;
        managerCognitoId?: boolean;
        location?: boolean | LocationDefaultArgs<ExtArgs>;
        manager?: boolean | ManagerDefaultArgs<ExtArgs>;
        leases?: boolean | Property$leasesArgs<ExtArgs>;
        applications?: boolean | Property$applicationsArgs<ExtArgs>;
        favoritedBy?: boolean | Property$favoritedByArgs<ExtArgs>;
        investors?: boolean | Property$investorsArgs<ExtArgs>;
        _count?: boolean | PropertyCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs["result"]["property"]
    >;

  export type PropertySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        name?: boolean;
        description?: boolean;
        pricePerMonth?: boolean;
        securityDeposit?: boolean;
        applicationFee?: boolean;
        photoUrls?: boolean;
        isPetsAllowed?: boolean;
        isParkingIncluded?: boolean;
        beds?: boolean;
        baths?: boolean;
        squareFeet?: boolean;
        propertyType?: boolean;
        postedDate?: boolean;
        averageRating?: boolean;
        numberOfReviews?: boolean;
        locationId?: boolean;
        managerCognitoId?: boolean;
        location?: boolean | LocationDefaultArgs<ExtArgs>;
        manager?: boolean | ManagerDefaultArgs<ExtArgs>;
      },
      ExtArgs["result"]["property"]
    >;

  export type PropertySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        name?: boolean;
        description?: boolean;
        pricePerMonth?: boolean;
        securityDeposit?: boolean;
        applicationFee?: boolean;
        photoUrls?: boolean;
        isPetsAllowed?: boolean;
        isParkingIncluded?: boolean;
        beds?: boolean;
        baths?: boolean;
        squareFeet?: boolean;
        propertyType?: boolean;
        postedDate?: boolean;
        averageRating?: boolean;
        numberOfReviews?: boolean;
        locationId?: boolean;
        managerCognitoId?: boolean;
        location?: boolean | LocationDefaultArgs<ExtArgs>;
        manager?: boolean | ManagerDefaultArgs<ExtArgs>;
      },
      ExtArgs["result"]["property"]
    >;

  export type PropertySelectScalar = {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    pricePerMonth?: boolean;
    securityDeposit?: boolean;
    applicationFee?: boolean;
    photoUrls?: boolean;
    isPetsAllowed?: boolean;
    isParkingIncluded?: boolean;
    beds?: boolean;
    baths?: boolean;
    squareFeet?: boolean;
    propertyType?: boolean;
    postedDate?: boolean;
    averageRating?: boolean;
    numberOfReviews?: boolean;
    locationId?: boolean;
    managerCognitoId?: boolean;
  };

  export type PropertyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<
    | "id"
    | "name"
    | "description"
    | "pricePerMonth"
    | "securityDeposit"
    | "applicationFee"
    | "photoUrls"
    | "isPetsAllowed"
    | "isParkingIncluded"
    | "beds"
    | "baths"
    | "squareFeet"
    | "propertyType"
    | "postedDate"
    | "averageRating"
    | "numberOfReviews"
    | "locationId"
    | "managerCognitoId",
    ExtArgs["result"]["property"]
  >;
  export type PropertyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | LocationDefaultArgs<ExtArgs>;
    manager?: boolean | ManagerDefaultArgs<ExtArgs>;
    leases?: boolean | Property$leasesArgs<ExtArgs>;
    applications?: boolean | Property$applicationsArgs<ExtArgs>;
    favoritedBy?: boolean | Property$favoritedByArgs<ExtArgs>;
    investors?: boolean | Property$investorsArgs<ExtArgs>;
    _count?: boolean | PropertyCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type PropertyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | LocationDefaultArgs<ExtArgs>;
    manager?: boolean | ManagerDefaultArgs<ExtArgs>;
  };
  export type PropertyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | LocationDefaultArgs<ExtArgs>;
    manager?: boolean | ManagerDefaultArgs<ExtArgs>;
  };

  export type $PropertyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Property";
    objects: {
      location: Prisma.$LocationPayload<ExtArgs>;
      manager: Prisma.$ManagerPayload<ExtArgs>;
      leases: Prisma.$LeasePayload<ExtArgs>[];
      applications: Prisma.$ApplicationPayload<ExtArgs>[];
      favoritedBy: Prisma.$InvestorPayload<ExtArgs>[];
      investors: Prisma.$InvestorPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        name: string;
        description: string;
        pricePerMonth: number;
        securityDeposit: number;
        applicationFee: number;
        photoUrls: string[];
        isPetsAllowed: boolean;
        isParkingIncluded: boolean;
        beds: number;
        baths: number;
        squareFeet: number;
        propertyType: $Enums.PropertyType;
        postedDate: Date;
        averageRating: number | null;
        numberOfReviews: number | null;
        locationId: number;
        managerCognitoId: string;
      },
      ExtArgs["result"]["property"]
    >;
    composites: {};
  };

  type PropertyGetPayload<S extends boolean | null | undefined | PropertyDefaultArgs> = $Result.GetResult<
    Prisma.$PropertyPayload,
    S
  >;

  type PropertyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    PropertyFindManyArgs,
    "select" | "include" | "distinct" | "omit"
  > & {
    select?: PropertyCountAggregateInputType | true;
  };

  export interface PropertyDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Property"];
      meta: { name: "Property" };
    };
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
    findUnique<T extends PropertyFindUniqueArgs>(
      args: SelectSubset<T, PropertyFindUniqueArgs<ExtArgs>>,
    ): Prisma__PropertyClient<
      $Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

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
    findUniqueOrThrow<T extends PropertyFindUniqueOrThrowArgs>(
      args: SelectSubset<T, PropertyFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__PropertyClient<
      $Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

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
    findFirst<T extends PropertyFindFirstArgs>(
      args?: SelectSubset<T, PropertyFindFirstArgs<ExtArgs>>,
    ): Prisma__PropertyClient<
      $Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

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
    findFirstOrThrow<T extends PropertyFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PropertyFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__PropertyClient<
      $Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

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
    findMany<T extends PropertyFindManyArgs>(
      args?: SelectSubset<T, PropertyFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;

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
    create<T extends PropertyCreateArgs>(
      args: SelectSubset<T, PropertyCreateArgs<ExtArgs>>,
    ): Prisma__PropertyClient<
      $Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "create", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

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
    createMany<T extends PropertyCreateManyArgs>(
      args?: SelectSubset<T, PropertyCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

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
    createManyAndReturn<T extends PropertyCreateManyAndReturnArgs>(
      args?: SelectSubset<T, PropertyCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>
    >;

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
    delete<T extends PropertyDeleteArgs>(
      args: SelectSubset<T, PropertyDeleteArgs<ExtArgs>>,
    ): Prisma__PropertyClient<
      $Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

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
    update<T extends PropertyUpdateArgs>(
      args: SelectSubset<T, PropertyUpdateArgs<ExtArgs>>,
    ): Prisma__PropertyClient<
      $Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "update", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

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
    deleteMany<T extends PropertyDeleteManyArgs>(
      args?: SelectSubset<T, PropertyDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

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
    updateMany<T extends PropertyUpdateManyArgs>(
      args: SelectSubset<T, PropertyUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

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
    updateManyAndReturn<T extends PropertyUpdateManyAndReturnArgs>(
      args: SelectSubset<T, PropertyUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>
    >;

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
    upsert<T extends PropertyUpsertArgs>(
      args: SelectSubset<T, PropertyUpsertArgs<ExtArgs>>,
    ): Prisma__PropertyClient<
      $Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

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
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], PropertyCountAggregateOutputType>
        : number
    >;

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
    aggregate<T extends PropertyAggregateArgs>(
      args: Subset<T, PropertyAggregateArgs>,
    ): Prisma.PrismaPromise<GetPropertyAggregateType<T>>;

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
      HasSelectOrTake extends Or<Extends<"skip", Keys<T>>, Extends<"take", Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PropertyGroupByArgs["orderBy"] }
        : { orderBy?: PropertyGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T["orderBy"]>>>,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? 'Error: "by" must not be empty.'
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, "Field ", P, " in \"having\" needs to be provided in \"by\""];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, PropertyGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetPropertyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
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
  export interface Prisma__PropertyClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    location<T extends LocationDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, LocationDefaultArgs<ExtArgs>>,
    ): Prisma__LocationClient<
      $Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    manager<T extends ManagerDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ManagerDefaultArgs<ExtArgs>>,
    ): Prisma__ManagerClient<
      $Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    leases<T extends Property$leasesArgs<ExtArgs> = {}>(
      args?: Subset<T, Property$leasesArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    applications<T extends Property$applicationsArgs<ExtArgs> = {}>(
      args?: Subset<T, Property$applicationsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null
    >;
    favoritedBy<T extends Property$favoritedByArgs<ExtArgs> = {}>(
      args?: Subset<T, Property$favoritedByArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$InvestorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null
    >;
    investors<T extends Property$investorsArgs<ExtArgs> = {}>(
      args?: Subset<T, Property$investorsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$InvestorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Property model
   */
  interface PropertyFieldRefs {
    readonly id: FieldRef<"Property", "Int">;
    readonly name: FieldRef<"Property", "String">;
    readonly description: FieldRef<"Property", "String">;
    readonly pricePerMonth: FieldRef<"Property", "Float">;
    readonly securityDeposit: FieldRef<"Property", "Float">;
    readonly applicationFee: FieldRef<"Property", "Float">;
    readonly photoUrls: FieldRef<"Property", "String[]">;
    readonly isPetsAllowed: FieldRef<"Property", "Boolean">;
    readonly isParkingIncluded: FieldRef<"Property", "Boolean">;
    readonly beds: FieldRef<"Property", "Int">;
    readonly baths: FieldRef<"Property", "Float">;
    readonly squareFeet: FieldRef<"Property", "Int">;
    readonly propertyType: FieldRef<"Property", "PropertyType">;
    readonly postedDate: FieldRef<"Property", "DateTime">;
    readonly averageRating: FieldRef<"Property", "Float">;
    readonly numberOfReviews: FieldRef<"Property", "Int">;
    readonly locationId: FieldRef<"Property", "Int">;
    readonly managerCognitoId: FieldRef<"Property", "String">;
  }

  // Custom InputTypes
  /**
   * Property findUnique
   */
  export type PropertyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null;
    /**
     * Filter, which Property to fetch.
     */
    where: PropertyWhereUniqueInput;
  };

  /**
   * Property findUniqueOrThrow
   */
  export type PropertyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null;
    /**
     * Filter, which Property to fetch.
     */
    where: PropertyWhereUniqueInput;
  };

  /**
   * Property findFirst
   */
  export type PropertyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null;
    /**
     * Filter, which Property to fetch.
     */
    where?: PropertyWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Properties.
     */
    cursor?: PropertyWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Properties.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Properties.
     */
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[];
  };

  /**
   * Property findFirstOrThrow
   */
  export type PropertyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null;
    /**
     * Filter, which Property to fetch.
     */
    where?: PropertyWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Properties.
     */
    cursor?: PropertyWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Properties.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Properties.
     */
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[];
  };

  /**
   * Property findMany
   */
  export type PropertyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null;
    /**
     * Filter, which Properties to fetch.
     */
    where?: PropertyWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Properties.
     */
    cursor?: PropertyWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Properties.
     */
    skip?: number;
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[];
  };

  /**
   * Property create
   */
  export type PropertyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null;
    /**
     * The data needed to create a Property.
     */
    data: XOR<PropertyCreateInput, PropertyUncheckedCreateInput>;
  };

  /**
   * Property createMany
   */
  export type PropertyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Properties.
     */
    data: PropertyCreateManyInput | PropertyCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Property createManyAndReturn
   */
  export type PropertyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null;
    /**
     * The data used to create many Properties.
     */
    data: PropertyCreateManyInput | PropertyCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Property update
   */
  export type PropertyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null;
    /**
     * The data needed to update a Property.
     */
    data: XOR<PropertyUpdateInput, PropertyUncheckedUpdateInput>;
    /**
     * Choose, which Property to update.
     */
    where: PropertyWhereUniqueInput;
  };

  /**
   * Property updateMany
   */
  export type PropertyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Properties.
     */
    data: XOR<PropertyUpdateManyMutationInput, PropertyUncheckedUpdateManyInput>;
    /**
     * Filter which Properties to update
     */
    where?: PropertyWhereInput;
    /**
     * Limit how many Properties to update.
     */
    limit?: number;
  };

  /**
   * Property updateManyAndReturn
   */
  export type PropertyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null;
    /**
     * The data used to update Properties.
     */
    data: XOR<PropertyUpdateManyMutationInput, PropertyUncheckedUpdateManyInput>;
    /**
     * Filter which Properties to update
     */
    where?: PropertyWhereInput;
    /**
     * Limit how many Properties to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Property upsert
   */
  export type PropertyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null;
    /**
     * The filter to search for the Property to update in case it exists.
     */
    where: PropertyWhereUniqueInput;
    /**
     * In case the Property found by the `where` argument doesn't exist, create a new Property with this data.
     */
    create: XOR<PropertyCreateInput, PropertyUncheckedCreateInput>;
    /**
     * In case the Property was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PropertyUpdateInput, PropertyUncheckedUpdateInput>;
  };

  /**
   * Property delete
   */
  export type PropertyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null;
    /**
     * Filter which Property to delete.
     */
    where: PropertyWhereUniqueInput;
  };

  /**
   * Property deleteMany
   */
  export type PropertyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Properties to delete
     */
    where?: PropertyWhereInput;
    /**
     * Limit how many Properties to delete.
     */
    limit?: number;
  };

  /**
   * Property.leases
   */
  export type Property$leasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lease
     */
    select?: LeaseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lease
     */
    omit?: LeaseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaseInclude<ExtArgs> | null;
    where?: LeaseWhereInput;
    orderBy?: LeaseOrderByWithRelationInput | LeaseOrderByWithRelationInput[];
    cursor?: LeaseWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: LeaseScalarFieldEnum | LeaseScalarFieldEnum[];
  };

  /**
   * Property.applications
   */
  export type Property$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null;
    where?: ApplicationWhereInput;
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[];
    cursor?: ApplicationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[];
  };

  /**
   * Property.favoritedBy
   */
  export type Property$favoritedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investor
     */
    select?: InvestorSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Investor
     */
    omit?: InvestorOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestorInclude<ExtArgs> | null;
    where?: InvestorWhereInput;
    orderBy?: InvestorOrderByWithRelationInput | InvestorOrderByWithRelationInput[];
    cursor?: InvestorWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: InvestorScalarFieldEnum | InvestorScalarFieldEnum[];
  };

  /**
   * Property.investors
   */
  export type Property$investorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investor
     */
    select?: InvestorSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Investor
     */
    omit?: InvestorOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestorInclude<ExtArgs> | null;
    where?: InvestorWhereInput;
    orderBy?: InvestorOrderByWithRelationInput | InvestorOrderByWithRelationInput[];
    cursor?: InvestorWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: InvestorScalarFieldEnum | InvestorScalarFieldEnum[];
  };

  /**
   * Property without action
   */
  export type PropertyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null;
  };

  /**
   * Model Manager
   */

  export type AggregateManager = {
    _count: ManagerCountAggregateOutputType | null;
    _avg: ManagerAvgAggregateOutputType | null;
    _sum: ManagerSumAggregateOutputType | null;
    _min: ManagerMinAggregateOutputType | null;
    _max: ManagerMaxAggregateOutputType | null;
  };

  export type ManagerAvgAggregateOutputType = {
    id: number | null;
  };

  export type ManagerSumAggregateOutputType = {
    id: number | null;
  };

  export type ManagerMinAggregateOutputType = {
    id: number | null;
    cognitoId: string | null;
    name: string | null;
    email: string | null;
    phoneNumber: string | null;
  };

  export type ManagerMaxAggregateOutputType = {
    id: number | null;
    cognitoId: string | null;
    name: string | null;
    email: string | null;
    phoneNumber: string | null;
  };

  export type ManagerCountAggregateOutputType = {
    id: number;
    cognitoId: number;
    name: number;
    email: number;
    phoneNumber: number;
    _all: number;
  };

  export type ManagerAvgAggregateInputType = {
    id?: true;
  };

  export type ManagerSumAggregateInputType = {
    id?: true;
  };

  export type ManagerMinAggregateInputType = {
    id?: true;
    cognitoId?: true;
    name?: true;
    email?: true;
    phoneNumber?: true;
  };

  export type ManagerMaxAggregateInputType = {
    id?: true;
    cognitoId?: true;
    name?: true;
    email?: true;
    phoneNumber?: true;
  };

  export type ManagerCountAggregateInputType = {
    id?: true;
    cognitoId?: true;
    name?: true;
    email?: true;
    phoneNumber?: true;
    _all?: true;
  };

  export type ManagerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Manager to aggregate.
     */
    where?: ManagerWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Managers to fetch.
     */
    orderBy?: ManagerOrderByWithRelationInput | ManagerOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ManagerWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Managers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Managers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Managers
     **/
    _count?: true | ManagerCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: ManagerAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: ManagerSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ManagerMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ManagerMaxAggregateInputType;
  };

  export type GetManagerAggregateType<T extends ManagerAggregateArgs> = {
    [P in keyof T & keyof AggregateManager]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateManager[P]>
      : GetScalarType<T[P], AggregateManager[P]>;
  };

  export type ManagerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ManagerWhereInput;
    orderBy?: ManagerOrderByWithAggregationInput | ManagerOrderByWithAggregationInput[];
    by: ManagerScalarFieldEnum[] | ManagerScalarFieldEnum;
    having?: ManagerScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ManagerCountAggregateInputType | true;
    _avg?: ManagerAvgAggregateInputType;
    _sum?: ManagerSumAggregateInputType;
    _min?: ManagerMinAggregateInputType;
    _max?: ManagerMaxAggregateInputType;
  };

  export type ManagerGroupByOutputType = {
    id: number;
    cognitoId: string;
    name: string;
    email: string;
    phoneNumber: string;
    _count: ManagerCountAggregateOutputType | null;
    _avg: ManagerAvgAggregateOutputType | null;
    _sum: ManagerSumAggregateOutputType | null;
    _min: ManagerMinAggregateOutputType | null;
    _max: ManagerMaxAggregateOutputType | null;
  };

  type GetManagerGroupByPayload<T extends ManagerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ManagerGroupByOutputType, T["by"]> & {
        [P in keyof T & keyof ManagerGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], ManagerGroupByOutputType[P]>
          : GetScalarType<T[P], ManagerGroupByOutputType[P]>;
      }
    >
  >;

  export type ManagerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<
    {
      id?: boolean;
      cognitoId?: boolean;
      name?: boolean;
      email?: boolean;
      phoneNumber?: boolean;
      managedProperties?: boolean | Manager$managedPropertiesArgs<ExtArgs>;
      _count?: boolean | ManagerCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["manager"]
  >;

  export type ManagerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        cognitoId?: boolean;
        name?: boolean;
        email?: boolean;
        phoneNumber?: boolean;
      },
      ExtArgs["result"]["manager"]
    >;

  export type ManagerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        cognitoId?: boolean;
        name?: boolean;
        email?: boolean;
        phoneNumber?: boolean;
      },
      ExtArgs["result"]["manager"]
    >;

  export type ManagerSelectScalar = {
    id?: boolean;
    cognitoId?: boolean;
    name?: boolean;
    email?: boolean;
    phoneNumber?: boolean;
  };

  export type ManagerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<
    "id" | "cognitoId" | "name" | "email" | "phoneNumber",
    ExtArgs["result"]["manager"]
  >;
  export type ManagerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    managedProperties?: boolean | Manager$managedPropertiesArgs<ExtArgs>;
    _count?: boolean | ManagerCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type ManagerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {};
  export type ManagerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {};

  export type $ManagerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Manager";
    objects: {
      managedProperties: Prisma.$PropertyPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        cognitoId: string;
        name: string;
        email: string;
        phoneNumber: string;
      },
      ExtArgs["result"]["manager"]
    >;
    composites: {};
  };

  type ManagerGetPayload<S extends boolean | null | undefined | ManagerDefaultArgs> = $Result.GetResult<
    Prisma.$ManagerPayload,
    S
  >;

  type ManagerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    ManagerFindManyArgs,
    "select" | "include" | "distinct" | "omit"
  > & {
    select?: ManagerCountAggregateInputType | true;
  };

  export interface ManagerDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Manager"];
      meta: { name: "Manager" };
    };
    /**
     * Find zero or one Manager that matches the filter.
     * @param {ManagerFindUniqueArgs} args - Arguments to find a Manager
     * @example
     * // Get one Manager
     * const manager = await prisma.manager.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ManagerFindUniqueArgs>(
      args: SelectSubset<T, ManagerFindUniqueArgs<ExtArgs>>,
    ): Prisma__ManagerClient<
      $Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Manager that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ManagerFindUniqueOrThrowArgs} args - Arguments to find a Manager
     * @example
     * // Get one Manager
     * const manager = await prisma.manager.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ManagerFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ManagerFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__ManagerClient<
      $Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Manager that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerFindFirstArgs} args - Arguments to find a Manager
     * @example
     * // Get one Manager
     * const manager = await prisma.manager.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ManagerFindFirstArgs>(
      args?: SelectSubset<T, ManagerFindFirstArgs<ExtArgs>>,
    ): Prisma__ManagerClient<
      $Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Manager that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerFindFirstOrThrowArgs} args - Arguments to find a Manager
     * @example
     * // Get one Manager
     * const manager = await prisma.manager.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ManagerFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ManagerFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__ManagerClient<
      $Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Managers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Managers
     * const managers = await prisma.manager.findMany()
     *
     * // Get first 10 Managers
     * const managers = await prisma.manager.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const managerWithIdOnly = await prisma.manager.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ManagerFindManyArgs>(
      args?: SelectSubset<T, ManagerFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;

    /**
     * Create a Manager.
     * @param {ManagerCreateArgs} args - Arguments to create a Manager.
     * @example
     * // Create one Manager
     * const Manager = await prisma.manager.create({
     *   data: {
     *     // ... data to create a Manager
     *   }
     * })
     *
     */
    create<T extends ManagerCreateArgs>(
      args: SelectSubset<T, ManagerCreateArgs<ExtArgs>>,
    ): Prisma__ManagerClient<
      $Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "create", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Managers.
     * @param {ManagerCreateManyArgs} args - Arguments to create many Managers.
     * @example
     * // Create many Managers
     * const manager = await prisma.manager.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ManagerCreateManyArgs>(
      args?: SelectSubset<T, ManagerCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Managers and returns the data saved in the database.
     * @param {ManagerCreateManyAndReturnArgs} args - Arguments to create many Managers.
     * @example
     * // Create many Managers
     * const manager = await prisma.manager.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Managers and only return the `id`
     * const managerWithIdOnly = await prisma.manager.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ManagerCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ManagerCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>
    >;

    /**
     * Delete a Manager.
     * @param {ManagerDeleteArgs} args - Arguments to delete one Manager.
     * @example
     * // Delete one Manager
     * const Manager = await prisma.manager.delete({
     *   where: {
     *     // ... filter to delete one Manager
     *   }
     * })
     *
     */
    delete<T extends ManagerDeleteArgs>(
      args: SelectSubset<T, ManagerDeleteArgs<ExtArgs>>,
    ): Prisma__ManagerClient<
      $Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Manager.
     * @param {ManagerUpdateArgs} args - Arguments to update one Manager.
     * @example
     * // Update one Manager
     * const manager = await prisma.manager.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ManagerUpdateArgs>(
      args: SelectSubset<T, ManagerUpdateArgs<ExtArgs>>,
    ): Prisma__ManagerClient<
      $Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "update", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Managers.
     * @param {ManagerDeleteManyArgs} args - Arguments to filter Managers to delete.
     * @example
     * // Delete a few Managers
     * const { count } = await prisma.manager.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ManagerDeleteManyArgs>(
      args?: SelectSubset<T, ManagerDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Managers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Managers
     * const manager = await prisma.manager.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ManagerUpdateManyArgs>(
      args: SelectSubset<T, ManagerUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Managers and returns the data updated in the database.
     * @param {ManagerUpdateManyAndReturnArgs} args - Arguments to update many Managers.
     * @example
     * // Update many Managers
     * const manager = await prisma.manager.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Managers and only return the `id`
     * const managerWithIdOnly = await prisma.manager.updateManyAndReturn({
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
    updateManyAndReturn<T extends ManagerUpdateManyAndReturnArgs>(
      args: SelectSubset<T, ManagerUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>
    >;

    /**
     * Create or update one Manager.
     * @param {ManagerUpsertArgs} args - Arguments to update or create a Manager.
     * @example
     * // Update or create a Manager
     * const manager = await prisma.manager.upsert({
     *   create: {
     *     // ... data to create a Manager
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Manager we want to update
     *   }
     * })
     */
    upsert<T extends ManagerUpsertArgs>(
      args: SelectSubset<T, ManagerUpsertArgs<ExtArgs>>,
    ): Prisma__ManagerClient<
      $Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Managers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerCountArgs} args - Arguments to filter Managers to count.
     * @example
     * // Count the number of Managers
     * const count = await prisma.manager.count({
     *   where: {
     *     // ... the filter for the Managers we want to count
     *   }
     * })
     **/
    count<T extends ManagerCountArgs>(
      args?: Subset<T, ManagerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], ManagerCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Manager.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ManagerAggregateArgs>(
      args: Subset<T, ManagerAggregateArgs>,
    ): Prisma.PrismaPromise<GetManagerAggregateType<T>>;

    /**
     * Group by Manager.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerGroupByArgs} args - Group by arguments.
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
      T extends ManagerGroupByArgs,
      HasSelectOrTake extends Or<Extends<"skip", Keys<T>>, Extends<"take", Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ManagerGroupByArgs["orderBy"] }
        : { orderBy?: ManagerGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T["orderBy"]>>>,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? 'Error: "by" must not be empty.'
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, "Field ", P, " in \"having\" needs to be provided in \"by\""];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ManagerGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetManagerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Manager model
     */
    readonly fields: ManagerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Manager.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ManagerClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    managedProperties<T extends Manager$managedPropertiesArgs<ExtArgs> = {}>(
      args?: Subset<T, Manager$managedPropertiesArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Manager model
   */
  interface ManagerFieldRefs {
    readonly id: FieldRef<"Manager", "Int">;
    readonly cognitoId: FieldRef<"Manager", "String">;
    readonly name: FieldRef<"Manager", "String">;
    readonly email: FieldRef<"Manager", "String">;
    readonly phoneNumber: FieldRef<"Manager", "String">;
  }

  // Custom InputTypes
  /**
   * Manager findUnique
   */
  export type ManagerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null;
    /**
     * Filter, which Manager to fetch.
     */
    where: ManagerWhereUniqueInput;
  };

  /**
   * Manager findUniqueOrThrow
   */
  export type ManagerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null;
    /**
     * Filter, which Manager to fetch.
     */
    where: ManagerWhereUniqueInput;
  };

  /**
   * Manager findFirst
   */
  export type ManagerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null;
    /**
     * Filter, which Manager to fetch.
     */
    where?: ManagerWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Managers to fetch.
     */
    orderBy?: ManagerOrderByWithRelationInput | ManagerOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Managers.
     */
    cursor?: ManagerWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Managers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Managers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Managers.
     */
    distinct?: ManagerScalarFieldEnum | ManagerScalarFieldEnum[];
  };

  /**
   * Manager findFirstOrThrow
   */
  export type ManagerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null;
    /**
     * Filter, which Manager to fetch.
     */
    where?: ManagerWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Managers to fetch.
     */
    orderBy?: ManagerOrderByWithRelationInput | ManagerOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Managers.
     */
    cursor?: ManagerWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Managers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Managers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Managers.
     */
    distinct?: ManagerScalarFieldEnum | ManagerScalarFieldEnum[];
  };

  /**
   * Manager findMany
   */
  export type ManagerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null;
    /**
     * Filter, which Managers to fetch.
     */
    where?: ManagerWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Managers to fetch.
     */
    orderBy?: ManagerOrderByWithRelationInput | ManagerOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Managers.
     */
    cursor?: ManagerWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Managers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Managers.
     */
    skip?: number;
    distinct?: ManagerScalarFieldEnum | ManagerScalarFieldEnum[];
  };

  /**
   * Manager create
   */
  export type ManagerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null;
    /**
     * The data needed to create a Manager.
     */
    data: XOR<ManagerCreateInput, ManagerUncheckedCreateInput>;
  };

  /**
   * Manager createMany
   */
  export type ManagerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Managers.
     */
    data: ManagerCreateManyInput | ManagerCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Manager createManyAndReturn
   */
  export type ManagerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null;
    /**
     * The data used to create many Managers.
     */
    data: ManagerCreateManyInput | ManagerCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Manager update
   */
  export type ManagerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null;
    /**
     * The data needed to update a Manager.
     */
    data: XOR<ManagerUpdateInput, ManagerUncheckedUpdateInput>;
    /**
     * Choose, which Manager to update.
     */
    where: ManagerWhereUniqueInput;
  };

  /**
   * Manager updateMany
   */
  export type ManagerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Managers.
     */
    data: XOR<ManagerUpdateManyMutationInput, ManagerUncheckedUpdateManyInput>;
    /**
     * Filter which Managers to update
     */
    where?: ManagerWhereInput;
    /**
     * Limit how many Managers to update.
     */
    limit?: number;
  };

  /**
   * Manager updateManyAndReturn
   */
  export type ManagerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null;
    /**
     * The data used to update Managers.
     */
    data: XOR<ManagerUpdateManyMutationInput, ManagerUncheckedUpdateManyInput>;
    /**
     * Filter which Managers to update
     */
    where?: ManagerWhereInput;
    /**
     * Limit how many Managers to update.
     */
    limit?: number;
  };

  /**
   * Manager upsert
   */
  export type ManagerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null;
    /**
     * The filter to search for the Manager to update in case it exists.
     */
    where: ManagerWhereUniqueInput;
    /**
     * In case the Manager found by the `where` argument doesn't exist, create a new Manager with this data.
     */
    create: XOR<ManagerCreateInput, ManagerUncheckedCreateInput>;
    /**
     * In case the Manager was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ManagerUpdateInput, ManagerUncheckedUpdateInput>;
  };

  /**
   * Manager delete
   */
  export type ManagerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null;
    /**
     * Filter which Manager to delete.
     */
    where: ManagerWhereUniqueInput;
  };

  /**
   * Manager deleteMany
   */
  export type ManagerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Managers to delete
     */
    where?: ManagerWhereInput;
    /**
     * Limit how many Managers to delete.
     */
    limit?: number;
  };

  /**
   * Manager.managedProperties
   */
  export type Manager$managedPropertiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null;
    where?: PropertyWhereInput;
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[];
    cursor?: PropertyWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[];
  };

  /**
   * Manager without action
   */
  export type ManagerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null;
  };

  /**
   * Model Investor
   */

  export type AggregateInvestor = {
    _count: InvestorCountAggregateOutputType | null;
    _avg: InvestorAvgAggregateOutputType | null;
    _sum: InvestorSumAggregateOutputType | null;
    _min: InvestorMinAggregateOutputType | null;
    _max: InvestorMaxAggregateOutputType | null;
  };

  export type InvestorAvgAggregateOutputType = {
    id: number | null;
  };

  export type InvestorSumAggregateOutputType = {
    id: number | null;
  };

  export type InvestorMinAggregateOutputType = {
    id: number | null;
    cognitoId: string | null;
    name: string | null;
    email: string | null;
    phoneNumber: string | null;
  };

  export type InvestorMaxAggregateOutputType = {
    id: number | null;
    cognitoId: string | null;
    name: string | null;
    email: string | null;
    phoneNumber: string | null;
  };

  export type InvestorCountAggregateOutputType = {
    id: number;
    cognitoId: number;
    name: number;
    email: number;
    phoneNumber: number;
    _all: number;
  };

  export type InvestorAvgAggregateInputType = {
    id?: true;
  };

  export type InvestorSumAggregateInputType = {
    id?: true;
  };

  export type InvestorMinAggregateInputType = {
    id?: true;
    cognitoId?: true;
    name?: true;
    email?: true;
    phoneNumber?: true;
  };

  export type InvestorMaxAggregateInputType = {
    id?: true;
    cognitoId?: true;
    name?: true;
    email?: true;
    phoneNumber?: true;
  };

  export type InvestorCountAggregateInputType = {
    id?: true;
    cognitoId?: true;
    name?: true;
    email?: true;
    phoneNumber?: true;
    _all?: true;
  };

  export type InvestorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Investor to aggregate.
     */
    where?: InvestorWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Investors to fetch.
     */
    orderBy?: InvestorOrderByWithRelationInput | InvestorOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: InvestorWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Investors from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Investors.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Investors
     **/
    _count?: true | InvestorCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: InvestorAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: InvestorSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: InvestorMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: InvestorMaxAggregateInputType;
  };

  export type GetInvestorAggregateType<T extends InvestorAggregateArgs> = {
    [P in keyof T & keyof AggregateInvestor]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvestor[P]>
      : GetScalarType<T[P], AggregateInvestor[P]>;
  };

  export type InvestorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvestorWhereInput;
    orderBy?: InvestorOrderByWithAggregationInput | InvestorOrderByWithAggregationInput[];
    by: InvestorScalarFieldEnum[] | InvestorScalarFieldEnum;
    having?: InvestorScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: InvestorCountAggregateInputType | true;
    _avg?: InvestorAvgAggregateInputType;
    _sum?: InvestorSumAggregateInputType;
    _min?: InvestorMinAggregateInputType;
    _max?: InvestorMaxAggregateInputType;
  };

  export type InvestorGroupByOutputType = {
    id: number;
    cognitoId: string;
    name: string;
    email: string;
    phoneNumber: string;
    _count: InvestorCountAggregateOutputType | null;
    _avg: InvestorAvgAggregateOutputType | null;
    _sum: InvestorSumAggregateOutputType | null;
    _min: InvestorMinAggregateOutputType | null;
    _max: InvestorMaxAggregateOutputType | null;
  };

  type GetInvestorGroupByPayload<T extends InvestorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvestorGroupByOutputType, T["by"]> & {
        [P in keyof T & keyof InvestorGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], InvestorGroupByOutputType[P]>
          : GetScalarType<T[P], InvestorGroupByOutputType[P]>;
      }
    >
  >;

  export type InvestorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        cognitoId?: boolean;
        name?: boolean;
        email?: boolean;
        phoneNumber?: boolean;
        properties?: boolean | Investor$propertiesArgs<ExtArgs>;
        favorites?: boolean | Investor$favoritesArgs<ExtArgs>;
        applications?: boolean | Investor$applicationsArgs<ExtArgs>;
        leases?: boolean | Investor$leasesArgs<ExtArgs>;
        _count?: boolean | InvestorCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs["result"]["investor"]
    >;

  export type InvestorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        cognitoId?: boolean;
        name?: boolean;
        email?: boolean;
        phoneNumber?: boolean;
      },
      ExtArgs["result"]["investor"]
    >;

  export type InvestorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        cognitoId?: boolean;
        name?: boolean;
        email?: boolean;
        phoneNumber?: boolean;
      },
      ExtArgs["result"]["investor"]
    >;

  export type InvestorSelectScalar = {
    id?: boolean;
    cognitoId?: boolean;
    name?: boolean;
    email?: boolean;
    phoneNumber?: boolean;
  };

  export type InvestorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<
    "id" | "cognitoId" | "name" | "email" | "phoneNumber",
    ExtArgs["result"]["investor"]
  >;
  export type InvestorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    properties?: boolean | Investor$propertiesArgs<ExtArgs>;
    favorites?: boolean | Investor$favoritesArgs<ExtArgs>;
    applications?: boolean | Investor$applicationsArgs<ExtArgs>;
    leases?: boolean | Investor$leasesArgs<ExtArgs>;
    _count?: boolean | InvestorCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type InvestorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {};
  export type InvestorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {};

  export type $InvestorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Investor";
    objects: {
      properties: Prisma.$PropertyPayload<ExtArgs>[];
      favorites: Prisma.$PropertyPayload<ExtArgs>[];
      applications: Prisma.$ApplicationPayload<ExtArgs>[];
      leases: Prisma.$LeasePayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        cognitoId: string;
        name: string;
        email: string;
        phoneNumber: string;
      },
      ExtArgs["result"]["investor"]
    >;
    composites: {};
  };

  type InvestorGetPayload<S extends boolean | null | undefined | InvestorDefaultArgs> = $Result.GetResult<
    Prisma.$InvestorPayload,
    S
  >;

  type InvestorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    InvestorFindManyArgs,
    "select" | "include" | "distinct" | "omit"
  > & {
    select?: InvestorCountAggregateInputType | true;
  };

  export interface InvestorDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Investor"];
      meta: { name: "Investor" };
    };
    /**
     * Find zero or one Investor that matches the filter.
     * @param {InvestorFindUniqueArgs} args - Arguments to find a Investor
     * @example
     * // Get one Investor
     * const investor = await prisma.investor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvestorFindUniqueArgs>(
      args: SelectSubset<T, InvestorFindUniqueArgs<ExtArgs>>,
    ): Prisma__InvestorClient<
      $Result.GetResult<Prisma.$InvestorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Investor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InvestorFindUniqueOrThrowArgs} args - Arguments to find a Investor
     * @example
     * // Get one Investor
     * const investor = await prisma.investor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvestorFindUniqueOrThrowArgs>(
      args: SelectSubset<T, InvestorFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__InvestorClient<
      $Result.GetResult<Prisma.$InvestorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Investor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestorFindFirstArgs} args - Arguments to find a Investor
     * @example
     * // Get one Investor
     * const investor = await prisma.investor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvestorFindFirstArgs>(
      args?: SelectSubset<T, InvestorFindFirstArgs<ExtArgs>>,
    ): Prisma__InvestorClient<
      $Result.GetResult<Prisma.$InvestorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Investor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestorFindFirstOrThrowArgs} args - Arguments to find a Investor
     * @example
     * // Get one Investor
     * const investor = await prisma.investor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvestorFindFirstOrThrowArgs>(
      args?: SelectSubset<T, InvestorFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__InvestorClient<
      $Result.GetResult<Prisma.$InvestorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Investors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Investors
     * const investors = await prisma.investor.findMany()
     *
     * // Get first 10 Investors
     * const investors = await prisma.investor.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const investorWithIdOnly = await prisma.investor.findMany({ select: { id: true } })
     *
     */
    findMany<T extends InvestorFindManyArgs>(
      args?: SelectSubset<T, InvestorFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvestorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;

    /**
     * Create a Investor.
     * @param {InvestorCreateArgs} args - Arguments to create a Investor.
     * @example
     * // Create one Investor
     * const Investor = await prisma.investor.create({
     *   data: {
     *     // ... data to create a Investor
     *   }
     * })
     *
     */
    create<T extends InvestorCreateArgs>(
      args: SelectSubset<T, InvestorCreateArgs<ExtArgs>>,
    ): Prisma__InvestorClient<
      $Result.GetResult<Prisma.$InvestorPayload<ExtArgs>, T, "create", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Investors.
     * @param {InvestorCreateManyArgs} args - Arguments to create many Investors.
     * @example
     * // Create many Investors
     * const investor = await prisma.investor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends InvestorCreateManyArgs>(
      args?: SelectSubset<T, InvestorCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Investors and returns the data saved in the database.
     * @param {InvestorCreateManyAndReturnArgs} args - Arguments to create many Investors.
     * @example
     * // Create many Investors
     * const investor = await prisma.investor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Investors and only return the `id`
     * const investorWithIdOnly = await prisma.investor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends InvestorCreateManyAndReturnArgs>(
      args?: SelectSubset<T, InvestorCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$InvestorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>
    >;

    /**
     * Delete a Investor.
     * @param {InvestorDeleteArgs} args - Arguments to delete one Investor.
     * @example
     * // Delete one Investor
     * const Investor = await prisma.investor.delete({
     *   where: {
     *     // ... filter to delete one Investor
     *   }
     * })
     *
     */
    delete<T extends InvestorDeleteArgs>(
      args: SelectSubset<T, InvestorDeleteArgs<ExtArgs>>,
    ): Prisma__InvestorClient<
      $Result.GetResult<Prisma.$InvestorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Investor.
     * @param {InvestorUpdateArgs} args - Arguments to update one Investor.
     * @example
     * // Update one Investor
     * const investor = await prisma.investor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends InvestorUpdateArgs>(
      args: SelectSubset<T, InvestorUpdateArgs<ExtArgs>>,
    ): Prisma__InvestorClient<
      $Result.GetResult<Prisma.$InvestorPayload<ExtArgs>, T, "update", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Investors.
     * @param {InvestorDeleteManyArgs} args - Arguments to filter Investors to delete.
     * @example
     * // Delete a few Investors
     * const { count } = await prisma.investor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends InvestorDeleteManyArgs>(
      args?: SelectSubset<T, InvestorDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Investors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Investors
     * const investor = await prisma.investor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends InvestorUpdateManyArgs>(
      args: SelectSubset<T, InvestorUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Investors and returns the data updated in the database.
     * @param {InvestorUpdateManyAndReturnArgs} args - Arguments to update many Investors.
     * @example
     * // Update many Investors
     * const investor = await prisma.investor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Investors and only return the `id`
     * const investorWithIdOnly = await prisma.investor.updateManyAndReturn({
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
    updateManyAndReturn<T extends InvestorUpdateManyAndReturnArgs>(
      args: SelectSubset<T, InvestorUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$InvestorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>
    >;

    /**
     * Create or update one Investor.
     * @param {InvestorUpsertArgs} args - Arguments to update or create a Investor.
     * @example
     * // Update or create a Investor
     * const investor = await prisma.investor.upsert({
     *   create: {
     *     // ... data to create a Investor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Investor we want to update
     *   }
     * })
     */
    upsert<T extends InvestorUpsertArgs>(
      args: SelectSubset<T, InvestorUpsertArgs<ExtArgs>>,
    ): Prisma__InvestorClient<
      $Result.GetResult<Prisma.$InvestorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Investors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestorCountArgs} args - Arguments to filter Investors to count.
     * @example
     * // Count the number of Investors
     * const count = await prisma.investor.count({
     *   where: {
     *     // ... the filter for the Investors we want to count
     *   }
     * })
     **/
    count<T extends InvestorCountArgs>(
      args?: Subset<T, InvestorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], InvestorCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Investor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends InvestorAggregateArgs>(
      args: Subset<T, InvestorAggregateArgs>,
    ): Prisma.PrismaPromise<GetInvestorAggregateType<T>>;

    /**
     * Group by Investor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestorGroupByArgs} args - Group by arguments.
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
      T extends InvestorGroupByArgs,
      HasSelectOrTake extends Or<Extends<"skip", Keys<T>>, Extends<"take", Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvestorGroupByArgs["orderBy"] }
        : { orderBy?: InvestorGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T["orderBy"]>>>,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? 'Error: "by" must not be empty.'
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, "Field ", P, " in \"having\" needs to be provided in \"by\""];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, InvestorGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetInvestorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Investor model
     */
    readonly fields: InvestorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Investor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvestorClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    properties<T extends Investor$propertiesArgs<ExtArgs> = {}>(
      args?: Subset<T, Investor$propertiesArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null
    >;
    favorites<T extends Investor$favoritesArgs<ExtArgs> = {}>(
      args?: Subset<T, Investor$favoritesArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null
    >;
    applications<T extends Investor$applicationsArgs<ExtArgs> = {}>(
      args?: Subset<T, Investor$applicationsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null
    >;
    leases<T extends Investor$leasesArgs<ExtArgs> = {}>(
      args?: Subset<T, Investor$leasesArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Investor model
   */
  interface InvestorFieldRefs {
    readonly id: FieldRef<"Investor", "Int">;
    readonly cognitoId: FieldRef<"Investor", "String">;
    readonly name: FieldRef<"Investor", "String">;
    readonly email: FieldRef<"Investor", "String">;
    readonly phoneNumber: FieldRef<"Investor", "String">;
  }

  // Custom InputTypes
  /**
   * Investor findUnique
   */
  export type InvestorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investor
     */
    select?: InvestorSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Investor
     */
    omit?: InvestorOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestorInclude<ExtArgs> | null;
    /**
     * Filter, which Investor to fetch.
     */
    where: InvestorWhereUniqueInput;
  };

  /**
   * Investor findUniqueOrThrow
   */
  export type InvestorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investor
     */
    select?: InvestorSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Investor
     */
    omit?: InvestorOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestorInclude<ExtArgs> | null;
    /**
     * Filter, which Investor to fetch.
     */
    where: InvestorWhereUniqueInput;
  };

  /**
   * Investor findFirst
   */
  export type InvestorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investor
     */
    select?: InvestorSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Investor
     */
    omit?: InvestorOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestorInclude<ExtArgs> | null;
    /**
     * Filter, which Investor to fetch.
     */
    where?: InvestorWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Investors to fetch.
     */
    orderBy?: InvestorOrderByWithRelationInput | InvestorOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Investors.
     */
    cursor?: InvestorWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Investors from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Investors.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Investors.
     */
    distinct?: InvestorScalarFieldEnum | InvestorScalarFieldEnum[];
  };

  /**
   * Investor findFirstOrThrow
   */
  export type InvestorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investor
     */
    select?: InvestorSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Investor
     */
    omit?: InvestorOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestorInclude<ExtArgs> | null;
    /**
     * Filter, which Investor to fetch.
     */
    where?: InvestorWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Investors to fetch.
     */
    orderBy?: InvestorOrderByWithRelationInput | InvestorOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Investors.
     */
    cursor?: InvestorWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Investors from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Investors.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Investors.
     */
    distinct?: InvestorScalarFieldEnum | InvestorScalarFieldEnum[];
  };

  /**
   * Investor findMany
   */
  export type InvestorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investor
     */
    select?: InvestorSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Investor
     */
    omit?: InvestorOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestorInclude<ExtArgs> | null;
    /**
     * Filter, which Investors to fetch.
     */
    where?: InvestorWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Investors to fetch.
     */
    orderBy?: InvestorOrderByWithRelationInput | InvestorOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Investors.
     */
    cursor?: InvestorWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Investors from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Investors.
     */
    skip?: number;
    distinct?: InvestorScalarFieldEnum | InvestorScalarFieldEnum[];
  };

  /**
   * Investor create
   */
  export type InvestorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investor
     */
    select?: InvestorSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Investor
     */
    omit?: InvestorOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestorInclude<ExtArgs> | null;
    /**
     * The data needed to create a Investor.
     */
    data: XOR<InvestorCreateInput, InvestorUncheckedCreateInput>;
  };

  /**
   * Investor createMany
   */
  export type InvestorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Investors.
     */
    data: InvestorCreateManyInput | InvestorCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Investor createManyAndReturn
   */
  export type InvestorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investor
     */
    select?: InvestorSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Investor
     */
    omit?: InvestorOmit<ExtArgs> | null;
    /**
     * The data used to create many Investors.
     */
    data: InvestorCreateManyInput | InvestorCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Investor update
   */
  export type InvestorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investor
     */
    select?: InvestorSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Investor
     */
    omit?: InvestorOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestorInclude<ExtArgs> | null;
    /**
     * The data needed to update a Investor.
     */
    data: XOR<InvestorUpdateInput, InvestorUncheckedUpdateInput>;
    /**
     * Choose, which Investor to update.
     */
    where: InvestorWhereUniqueInput;
  };

  /**
   * Investor updateMany
   */
  export type InvestorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Investors.
     */
    data: XOR<InvestorUpdateManyMutationInput, InvestorUncheckedUpdateManyInput>;
    /**
     * Filter which Investors to update
     */
    where?: InvestorWhereInput;
    /**
     * Limit how many Investors to update.
     */
    limit?: number;
  };

  /**
   * Investor updateManyAndReturn
   */
  export type InvestorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investor
     */
    select?: InvestorSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Investor
     */
    omit?: InvestorOmit<ExtArgs> | null;
    /**
     * The data used to update Investors.
     */
    data: XOR<InvestorUpdateManyMutationInput, InvestorUncheckedUpdateManyInput>;
    /**
     * Filter which Investors to update
     */
    where?: InvestorWhereInput;
    /**
     * Limit how many Investors to update.
     */
    limit?: number;
  };

  /**
   * Investor upsert
   */
  export type InvestorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investor
     */
    select?: InvestorSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Investor
     */
    omit?: InvestorOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestorInclude<ExtArgs> | null;
    /**
     * The filter to search for the Investor to update in case it exists.
     */
    where: InvestorWhereUniqueInput;
    /**
     * In case the Investor found by the `where` argument doesn't exist, create a new Investor with this data.
     */
    create: XOR<InvestorCreateInput, InvestorUncheckedCreateInput>;
    /**
     * In case the Investor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvestorUpdateInput, InvestorUncheckedUpdateInput>;
  };

  /**
   * Investor delete
   */
  export type InvestorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investor
     */
    select?: InvestorSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Investor
     */
    omit?: InvestorOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestorInclude<ExtArgs> | null;
    /**
     * Filter which Investor to delete.
     */
    where: InvestorWhereUniqueInput;
  };

  /**
   * Investor deleteMany
   */
  export type InvestorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Investors to delete
     */
    where?: InvestorWhereInput;
    /**
     * Limit how many Investors to delete.
     */
    limit?: number;
  };

  /**
   * Investor.properties
   */
  export type Investor$propertiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null;
    where?: PropertyWhereInput;
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[];
    cursor?: PropertyWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[];
  };

  /**
   * Investor.favorites
   */
  export type Investor$favoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null;
    where?: PropertyWhereInput;
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[];
    cursor?: PropertyWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[];
  };

  /**
   * Investor.applications
   */
  export type Investor$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null;
    where?: ApplicationWhereInput;
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[];
    cursor?: ApplicationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[];
  };

  /**
   * Investor.leases
   */
  export type Investor$leasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lease
     */
    select?: LeaseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lease
     */
    omit?: LeaseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaseInclude<ExtArgs> | null;
    where?: LeaseWhereInput;
    orderBy?: LeaseOrderByWithRelationInput | LeaseOrderByWithRelationInput[];
    cursor?: LeaseWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: LeaseScalarFieldEnum | LeaseScalarFieldEnum[];
  };

  /**
   * Investor without action
   */
  export type InvestorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investor
     */
    select?: InvestorSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Investor
     */
    omit?: InvestorOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestorInclude<ExtArgs> | null;
  };

  /**
   * Model Location
   */

  export type AggregateLocation = {
    _count: LocationCountAggregateOutputType | null;
    _avg: LocationAvgAggregateOutputType | null;
    _sum: LocationSumAggregateOutputType | null;
    _min: LocationMinAggregateOutputType | null;
    _max: LocationMaxAggregateOutputType | null;
  };

  export type LocationAvgAggregateOutputType = {
    id: number | null;
    latitude: number | null;
    longitude: number | null;
  };

  export type LocationSumAggregateOutputType = {
    id: number | null;
    latitude: number | null;
    longitude: number | null;
  };

  export type LocationMinAggregateOutputType = {
    id: number | null;
    address: string | null;
    postalCode: string | null;
    latitude: number | null;
    longitude: number | null;
  };

  export type LocationMaxAggregateOutputType = {
    id: number | null;
    address: string | null;
    postalCode: string | null;
    latitude: number | null;
    longitude: number | null;
  };

  export type LocationCountAggregateOutputType = {
    id: number;
    address: number;
    postalCode: number;
    latitude: number;
    longitude: number;
    _all: number;
  };

  export type LocationAvgAggregateInputType = {
    id?: true;
    latitude?: true;
    longitude?: true;
  };

  export type LocationSumAggregateInputType = {
    id?: true;
    latitude?: true;
    longitude?: true;
  };

  export type LocationMinAggregateInputType = {
    id?: true;
    address?: true;
    postalCode?: true;
    latitude?: true;
    longitude?: true;
  };

  export type LocationMaxAggregateInputType = {
    id?: true;
    address?: true;
    postalCode?: true;
    latitude?: true;
    longitude?: true;
  };

  export type LocationCountAggregateInputType = {
    id?: true;
    address?: true;
    postalCode?: true;
    latitude?: true;
    longitude?: true;
    _all?: true;
  };

  export type LocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Location to aggregate.
     */
    where?: LocationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: LocationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Locations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Locations
     **/
    _count?: true | LocationCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: LocationAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: LocationSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: LocationMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: LocationMaxAggregateInputType;
  };

  export type GetLocationAggregateType<T extends LocationAggregateArgs> = {
    [P in keyof T & keyof AggregateLocation]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLocation[P]>
      : GetScalarType<T[P], AggregateLocation[P]>;
  };

  export type LocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocationWhereInput;
    orderBy?: LocationOrderByWithAggregationInput | LocationOrderByWithAggregationInput[];
    by: LocationScalarFieldEnum[] | LocationScalarFieldEnum;
    having?: LocationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: LocationCountAggregateInputType | true;
    _avg?: LocationAvgAggregateInputType;
    _sum?: LocationSumAggregateInputType;
    _min?: LocationMinAggregateInputType;
    _max?: LocationMaxAggregateInputType;
  };

  export type LocationGroupByOutputType = {
    id: number;
    address: string;
    postalCode: string;
    latitude: number;
    longitude: number;
    _count: LocationCountAggregateOutputType | null;
    _avg: LocationAvgAggregateOutputType | null;
    _sum: LocationSumAggregateOutputType | null;
    _min: LocationMinAggregateOutputType | null;
    _max: LocationMaxAggregateOutputType | null;
  };

  type GetLocationGroupByPayload<T extends LocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LocationGroupByOutputType, T["by"]> & {
        [P in keyof T & keyof LocationGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], LocationGroupByOutputType[P]>
          : GetScalarType<T[P], LocationGroupByOutputType[P]>;
      }
    >
  >;

  export type LocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        address?: boolean;
        postalCode?: boolean;
        latitude?: boolean;
        longitude?: boolean;
        properties?: boolean | Location$propertiesArgs<ExtArgs>;
        _count?: boolean | LocationCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs["result"]["location"]
    >;

  export type LocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        address?: boolean;
        postalCode?: boolean;
        latitude?: boolean;
        longitude?: boolean;
      },
      ExtArgs["result"]["location"]
    >;

  export type LocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        address?: boolean;
        postalCode?: boolean;
        latitude?: boolean;
        longitude?: boolean;
      },
      ExtArgs["result"]["location"]
    >;

  export type LocationSelectScalar = {
    id?: boolean;
    address?: boolean;
    postalCode?: boolean;
    latitude?: boolean;
    longitude?: boolean;
  };

  export type LocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<
    "id" | "address" | "postalCode" | "latitude" | "longitude",
    ExtArgs["result"]["location"]
  >;
  export type LocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    properties?: boolean | Location$propertiesArgs<ExtArgs>;
    _count?: boolean | LocationCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type LocationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {};
  export type LocationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {};

  export type $LocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Location";
    objects: {
      properties: Prisma.$PropertyPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        address: string;
        postalCode: string;
        latitude: number;
        longitude: number;
      },
      ExtArgs["result"]["location"]
    >;
    composites: {};
  };

  type LocationGetPayload<S extends boolean | null | undefined | LocationDefaultArgs> = $Result.GetResult<
    Prisma.$LocationPayload,
    S
  >;

  type LocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    LocationFindManyArgs,
    "select" | "include" | "distinct" | "omit"
  > & {
    select?: LocationCountAggregateInputType | true;
  };

  export interface LocationDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Location"];
      meta: { name: "Location" };
    };
    /**
     * Find zero or one Location that matches the filter.
     * @param {LocationFindUniqueArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LocationFindUniqueArgs>(
      args: SelectSubset<T, LocationFindUniqueArgs<ExtArgs>>,
    ): Prisma__LocationClient<
      $Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Location that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LocationFindUniqueOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LocationFindUniqueOrThrowArgs>(
      args: SelectSubset<T, LocationFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__LocationClient<
      $Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Location that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LocationFindFirstArgs>(
      args?: SelectSubset<T, LocationFindFirstArgs<ExtArgs>>,
    ): Prisma__LocationClient<
      $Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Location that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LocationFindFirstOrThrowArgs>(
      args?: SelectSubset<T, LocationFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__LocationClient<
      $Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Locations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Locations
     * const locations = await prisma.location.findMany()
     *
     * // Get first 10 Locations
     * const locations = await prisma.location.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const locationWithIdOnly = await prisma.location.findMany({ select: { id: true } })
     *
     */
    findMany<T extends LocationFindManyArgs>(
      args?: SelectSubset<T, LocationFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;

    /**
     * Create a Location.
     * @param {LocationCreateArgs} args - Arguments to create a Location.
     * @example
     * // Create one Location
     * const Location = await prisma.location.create({
     *   data: {
     *     // ... data to create a Location
     *   }
     * })
     *
     */
    create<T extends LocationCreateArgs>(
      args: SelectSubset<T, LocationCreateArgs<ExtArgs>>,
    ): Prisma__LocationClient<
      $Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Locations.
     * @param {LocationCreateManyArgs} args - Arguments to create many Locations.
     * @example
     * // Create many Locations
     * const location = await prisma.location.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends LocationCreateManyArgs>(
      args?: SelectSubset<T, LocationCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Locations and returns the data saved in the database.
     * @param {LocationCreateManyAndReturnArgs} args - Arguments to create many Locations.
     * @example
     * // Create many Locations
     * const location = await prisma.location.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Locations and only return the `id`
     * const locationWithIdOnly = await prisma.location.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends LocationCreateManyAndReturnArgs>(
      args?: SelectSubset<T, LocationCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>
    >;

    /**
     * Delete a Location.
     * @param {LocationDeleteArgs} args - Arguments to delete one Location.
     * @example
     * // Delete one Location
     * const Location = await prisma.location.delete({
     *   where: {
     *     // ... filter to delete one Location
     *   }
     * })
     *
     */
    delete<T extends LocationDeleteArgs>(
      args: SelectSubset<T, LocationDeleteArgs<ExtArgs>>,
    ): Prisma__LocationClient<
      $Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Location.
     * @param {LocationUpdateArgs} args - Arguments to update one Location.
     * @example
     * // Update one Location
     * const location = await prisma.location.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends LocationUpdateArgs>(
      args: SelectSubset<T, LocationUpdateArgs<ExtArgs>>,
    ): Prisma__LocationClient<
      $Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Locations.
     * @param {LocationDeleteManyArgs} args - Arguments to filter Locations to delete.
     * @example
     * // Delete a few Locations
     * const { count } = await prisma.location.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends LocationDeleteManyArgs>(
      args?: SelectSubset<T, LocationDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Locations
     * const location = await prisma.location.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends LocationUpdateManyArgs>(
      args: SelectSubset<T, LocationUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Locations and returns the data updated in the database.
     * @param {LocationUpdateManyAndReturnArgs} args - Arguments to update many Locations.
     * @example
     * // Update many Locations
     * const location = await prisma.location.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Locations and only return the `id`
     * const locationWithIdOnly = await prisma.location.updateManyAndReturn({
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
    updateManyAndReturn<T extends LocationUpdateManyAndReturnArgs>(
      args: SelectSubset<T, LocationUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>
    >;

    /**
     * Create or update one Location.
     * @param {LocationUpsertArgs} args - Arguments to update or create a Location.
     * @example
     * // Update or create a Location
     * const location = await prisma.location.upsert({
     *   create: {
     *     // ... data to create a Location
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Location we want to update
     *   }
     * })
     */
    upsert<T extends LocationUpsertArgs>(
      args: SelectSubset<T, LocationUpsertArgs<ExtArgs>>,
    ): Prisma__LocationClient<
      $Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationCountArgs} args - Arguments to filter Locations to count.
     * @example
     * // Count the number of Locations
     * const count = await prisma.location.count({
     *   where: {
     *     // ... the filter for the Locations we want to count
     *   }
     * })
     **/
    count<T extends LocationCountArgs>(
      args?: Subset<T, LocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], LocationCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LocationAggregateArgs>(
      args: Subset<T, LocationAggregateArgs>,
    ): Prisma.PrismaPromise<GetLocationAggregateType<T>>;

    /**
     * Group by Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationGroupByArgs} args - Group by arguments.
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
      T extends LocationGroupByArgs,
      HasSelectOrTake extends Or<Extends<"skip", Keys<T>>, Extends<"take", Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LocationGroupByArgs["orderBy"] }
        : { orderBy?: LocationGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T["orderBy"]>>>,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? 'Error: "by" must not be empty.'
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, "Field ", P, " in \"having\" needs to be provided in \"by\""];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, LocationGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Location model
     */
    readonly fields: LocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Location.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LocationClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    properties<T extends Location$propertiesArgs<ExtArgs> = {}>(
      args?: Subset<T, Location$propertiesArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Location model
   */
  interface LocationFieldRefs {
    readonly id: FieldRef<"Location", "Int">;
    readonly address: FieldRef<"Location", "String">;
    readonly postalCode: FieldRef<"Location", "String">;
    readonly latitude: FieldRef<"Location", "Float">;
    readonly longitude: FieldRef<"Location", "Float">;
  }

  // Custom InputTypes
  /**
   * Location findUnique
   */
  export type LocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null;
    /**
     * Filter, which Location to fetch.
     */
    where: LocationWhereUniqueInput;
  };

  /**
   * Location findUniqueOrThrow
   */
  export type LocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null;
    /**
     * Filter, which Location to fetch.
     */
    where: LocationWhereUniqueInput;
  };

  /**
   * Location findFirst
   */
  export type LocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null;
    /**
     * Filter, which Location to fetch.
     */
    where?: LocationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Locations.
     */
    cursor?: LocationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Locations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[];
  };

  /**
   * Location findFirstOrThrow
   */
  export type LocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null;
    /**
     * Filter, which Location to fetch.
     */
    where?: LocationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Locations.
     */
    cursor?: LocationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Locations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[];
  };

  /**
   * Location findMany
   */
  export type LocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null;
    /**
     * Filter, which Locations to fetch.
     */
    where?: LocationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Locations.
     */
    cursor?: LocationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Locations.
     */
    skip?: number;
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[];
  };

  /**
   * Location create
   */
  export type LocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null;
    /**
     * The data needed to create a Location.
     */
    data: XOR<LocationCreateInput, LocationUncheckedCreateInput>;
  };

  /**
   * Location createMany
   */
  export type LocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Locations.
     */
    data: LocationCreateManyInput | LocationCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Location createManyAndReturn
   */
  export type LocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null;
    /**
     * The data used to create many Locations.
     */
    data: LocationCreateManyInput | LocationCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Location update
   */
  export type LocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null;
    /**
     * The data needed to update a Location.
     */
    data: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>;
    /**
     * Choose, which Location to update.
     */
    where: LocationWhereUniqueInput;
  };

  /**
   * Location updateMany
   */
  export type LocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Locations.
     */
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyInput>;
    /**
     * Filter which Locations to update
     */
    where?: LocationWhereInput;
    /**
     * Limit how many Locations to update.
     */
    limit?: number;
  };

  /**
   * Location updateManyAndReturn
   */
  export type LocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null;
    /**
     * The data used to update Locations.
     */
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyInput>;
    /**
     * Filter which Locations to update
     */
    where?: LocationWhereInput;
    /**
     * Limit how many Locations to update.
     */
    limit?: number;
  };

  /**
   * Location upsert
   */
  export type LocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null;
    /**
     * The filter to search for the Location to update in case it exists.
     */
    where: LocationWhereUniqueInput;
    /**
     * In case the Location found by the `where` argument doesn't exist, create a new Location with this data.
     */
    create: XOR<LocationCreateInput, LocationUncheckedCreateInput>;
    /**
     * In case the Location was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>;
  };

  /**
   * Location delete
   */
  export type LocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null;
    /**
     * Filter which Location to delete.
     */
    where: LocationWhereUniqueInput;
  };

  /**
   * Location deleteMany
   */
  export type LocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Locations to delete
     */
    where?: LocationWhereInput;
    /**
     * Limit how many Locations to delete.
     */
    limit?: number;
  };

  /**
   * Location.properties
   */
  export type Location$propertiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null;
    where?: PropertyWhereInput;
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[];
    cursor?: PropertyWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[];
  };

  /**
   * Location without action
   */
  export type LocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null;
  };

  /**
   * Model Application
   */

  export type AggregateApplication = {
    _count: ApplicationCountAggregateOutputType | null;
    _avg: ApplicationAvgAggregateOutputType | null;
    _sum: ApplicationSumAggregateOutputType | null;
    _min: ApplicationMinAggregateOutputType | null;
    _max: ApplicationMaxAggregateOutputType | null;
  };

  export type ApplicationAvgAggregateOutputType = {
    id: number | null;
    propertyId: number | null;
    leaseId: number | null;
  };

  export type ApplicationSumAggregateOutputType = {
    id: number | null;
    propertyId: number | null;
    leaseId: number | null;
  };

  export type ApplicationMinAggregateOutputType = {
    id: number | null;
    applicationDate: Date | null;
    status: $Enums.ApplicationStatus | null;
    propertyId: number | null;
    investorCognitoId: string | null;
    name: string | null;
    email: string | null;
    phoneNumber: string | null;
    message: string | null;
    leaseId: number | null;
  };

  export type ApplicationMaxAggregateOutputType = {
    id: number | null;
    applicationDate: Date | null;
    status: $Enums.ApplicationStatus | null;
    propertyId: number | null;
    investorCognitoId: string | null;
    name: string | null;
    email: string | null;
    phoneNumber: string | null;
    message: string | null;
    leaseId: number | null;
  };

  export type ApplicationCountAggregateOutputType = {
    id: number;
    applicationDate: number;
    status: number;
    propertyId: number;
    investorCognitoId: number;
    name: number;
    email: number;
    phoneNumber: number;
    message: number;
    leaseId: number;
    _all: number;
  };

  export type ApplicationAvgAggregateInputType = {
    id?: true;
    propertyId?: true;
    leaseId?: true;
  };

  export type ApplicationSumAggregateInputType = {
    id?: true;
    propertyId?: true;
    leaseId?: true;
  };

  export type ApplicationMinAggregateInputType = {
    id?: true;
    applicationDate?: true;
    status?: true;
    propertyId?: true;
    investorCognitoId?: true;
    name?: true;
    email?: true;
    phoneNumber?: true;
    message?: true;
    leaseId?: true;
  };

  export type ApplicationMaxAggregateInputType = {
    id?: true;
    applicationDate?: true;
    status?: true;
    propertyId?: true;
    investorCognitoId?: true;
    name?: true;
    email?: true;
    phoneNumber?: true;
    message?: true;
    leaseId?: true;
  };

  export type ApplicationCountAggregateInputType = {
    id?: true;
    applicationDate?: true;
    status?: true;
    propertyId?: true;
    investorCognitoId?: true;
    name?: true;
    email?: true;
    phoneNumber?: true;
    message?: true;
    leaseId?: true;
    _all?: true;
  };

  export type ApplicationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Application to aggregate.
     */
    where?: ApplicationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ApplicationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Applications.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Applications
     **/
    _count?: true | ApplicationCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: ApplicationAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: ApplicationSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ApplicationMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ApplicationMaxAggregateInputType;
  };

  export type GetApplicationAggregateType<T extends ApplicationAggregateArgs> = {
    [P in keyof T & keyof AggregateApplication]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApplication[P]>
      : GetScalarType<T[P], AggregateApplication[P]>;
  };

  export type ApplicationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicationWhereInput;
    orderBy?: ApplicationOrderByWithAggregationInput | ApplicationOrderByWithAggregationInput[];
    by: ApplicationScalarFieldEnum[] | ApplicationScalarFieldEnum;
    having?: ApplicationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ApplicationCountAggregateInputType | true;
    _avg?: ApplicationAvgAggregateInputType;
    _sum?: ApplicationSumAggregateInputType;
    _min?: ApplicationMinAggregateInputType;
    _max?: ApplicationMaxAggregateInputType;
  };

  export type ApplicationGroupByOutputType = {
    id: number;
    applicationDate: Date;
    status: $Enums.ApplicationStatus;
    propertyId: number;
    investorCognitoId: string;
    name: string;
    email: string;
    phoneNumber: string;
    message: string | null;
    leaseId: number | null;
    _count: ApplicationCountAggregateOutputType | null;
    _avg: ApplicationAvgAggregateOutputType | null;
    _sum: ApplicationSumAggregateOutputType | null;
    _min: ApplicationMinAggregateOutputType | null;
    _max: ApplicationMaxAggregateOutputType | null;
  };

  type GetApplicationGroupByPayload<T extends ApplicationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApplicationGroupByOutputType, T["by"]> & {
        [P in keyof T & keyof ApplicationGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], ApplicationGroupByOutputType[P]>
          : GetScalarType<T[P], ApplicationGroupByOutputType[P]>;
      }
    >
  >;

  export type ApplicationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        applicationDate?: boolean;
        status?: boolean;
        propertyId?: boolean;
        investorCognitoId?: boolean;
        name?: boolean;
        email?: boolean;
        phoneNumber?: boolean;
        message?: boolean;
        leaseId?: boolean;
        property?: boolean | PropertyDefaultArgs<ExtArgs>;
        investor?: boolean | InvestorDefaultArgs<ExtArgs>;
        lease?: boolean | Application$leaseArgs<ExtArgs>;
      },
      ExtArgs["result"]["application"]
    >;

  export type ApplicationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        applicationDate?: boolean;
        status?: boolean;
        propertyId?: boolean;
        investorCognitoId?: boolean;
        name?: boolean;
        email?: boolean;
        phoneNumber?: boolean;
        message?: boolean;
        leaseId?: boolean;
        property?: boolean | PropertyDefaultArgs<ExtArgs>;
        investor?: boolean | InvestorDefaultArgs<ExtArgs>;
        lease?: boolean | Application$leaseArgs<ExtArgs>;
      },
      ExtArgs["result"]["application"]
    >;

  export type ApplicationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        applicationDate?: boolean;
        status?: boolean;
        propertyId?: boolean;
        investorCognitoId?: boolean;
        name?: boolean;
        email?: boolean;
        phoneNumber?: boolean;
        message?: boolean;
        leaseId?: boolean;
        property?: boolean | PropertyDefaultArgs<ExtArgs>;
        investor?: boolean | InvestorDefaultArgs<ExtArgs>;
        lease?: boolean | Application$leaseArgs<ExtArgs>;
      },
      ExtArgs["result"]["application"]
    >;

  export type ApplicationSelectScalar = {
    id?: boolean;
    applicationDate?: boolean;
    status?: boolean;
    propertyId?: boolean;
    investorCognitoId?: boolean;
    name?: boolean;
    email?: boolean;
    phoneNumber?: boolean;
    message?: boolean;
    leaseId?: boolean;
  };

  export type ApplicationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<
    | "id"
    | "applicationDate"
    | "status"
    | "propertyId"
    | "investorCognitoId"
    | "name"
    | "email"
    | "phoneNumber"
    | "message"
    | "leaseId",
    ExtArgs["result"]["application"]
  >;
  export type ApplicationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>;
    investor?: boolean | InvestorDefaultArgs<ExtArgs>;
    lease?: boolean | Application$leaseArgs<ExtArgs>;
  };
  export type ApplicationIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>;
    investor?: boolean | InvestorDefaultArgs<ExtArgs>;
    lease?: boolean | Application$leaseArgs<ExtArgs>;
  };
  export type ApplicationIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>;
    investor?: boolean | InvestorDefaultArgs<ExtArgs>;
    lease?: boolean | Application$leaseArgs<ExtArgs>;
  };

  export type $ApplicationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Application";
    objects: {
      property: Prisma.$PropertyPayload<ExtArgs>;
      investor: Prisma.$InvestorPayload<ExtArgs>;
      lease: Prisma.$LeasePayload<ExtArgs> | null;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        applicationDate: Date;
        status: $Enums.ApplicationStatus;
        propertyId: number;
        investorCognitoId: string;
        name: string;
        email: string;
        phoneNumber: string;
        message: string | null;
        leaseId: number | null;
      },
      ExtArgs["result"]["application"]
    >;
    composites: {};
  };

  type ApplicationGetPayload<S extends boolean | null | undefined | ApplicationDefaultArgs> = $Result.GetResult<
    Prisma.$ApplicationPayload,
    S
  >;

  type ApplicationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    ApplicationFindManyArgs,
    "select" | "include" | "distinct" | "omit"
  > & {
    select?: ApplicationCountAggregateInputType | true;
  };

  export interface ApplicationDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Application"];
      meta: { name: "Application" };
    };
    /**
     * Find zero or one Application that matches the filter.
     * @param {ApplicationFindUniqueArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApplicationFindUniqueArgs>(
      args: SelectSubset<T, ApplicationFindUniqueArgs<ExtArgs>>,
    ): Prisma__ApplicationClient<
      $Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Application that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApplicationFindUniqueOrThrowArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApplicationFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ApplicationFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__ApplicationClient<
      $Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Application that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationFindFirstArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApplicationFindFirstArgs>(
      args?: SelectSubset<T, ApplicationFindFirstArgs<ExtArgs>>,
    ): Prisma__ApplicationClient<
      $Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Application that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationFindFirstOrThrowArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApplicationFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ApplicationFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__ApplicationClient<
      $Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Applications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Applications
     * const applications = await prisma.application.findMany()
     *
     * // Get first 10 Applications
     * const applications = await prisma.application.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const applicationWithIdOnly = await prisma.application.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ApplicationFindManyArgs>(
      args?: SelectSubset<T, ApplicationFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;

    /**
     * Create a Application.
     * @param {ApplicationCreateArgs} args - Arguments to create a Application.
     * @example
     * // Create one Application
     * const Application = await prisma.application.create({
     *   data: {
     *     // ... data to create a Application
     *   }
     * })
     *
     */
    create<T extends ApplicationCreateArgs>(
      args: SelectSubset<T, ApplicationCreateArgs<ExtArgs>>,
    ): Prisma__ApplicationClient<
      $Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "create", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Applications.
     * @param {ApplicationCreateManyArgs} args - Arguments to create many Applications.
     * @example
     * // Create many Applications
     * const application = await prisma.application.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ApplicationCreateManyArgs>(
      args?: SelectSubset<T, ApplicationCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Applications and returns the data saved in the database.
     * @param {ApplicationCreateManyAndReturnArgs} args - Arguments to create many Applications.
     * @example
     * // Create many Applications
     * const application = await prisma.application.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Applications and only return the `id`
     * const applicationWithIdOnly = await prisma.application.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ApplicationCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ApplicationCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>
    >;

    /**
     * Delete a Application.
     * @param {ApplicationDeleteArgs} args - Arguments to delete one Application.
     * @example
     * // Delete one Application
     * const Application = await prisma.application.delete({
     *   where: {
     *     // ... filter to delete one Application
     *   }
     * })
     *
     */
    delete<T extends ApplicationDeleteArgs>(
      args: SelectSubset<T, ApplicationDeleteArgs<ExtArgs>>,
    ): Prisma__ApplicationClient<
      $Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Application.
     * @param {ApplicationUpdateArgs} args - Arguments to update one Application.
     * @example
     * // Update one Application
     * const application = await prisma.application.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ApplicationUpdateArgs>(
      args: SelectSubset<T, ApplicationUpdateArgs<ExtArgs>>,
    ): Prisma__ApplicationClient<
      $Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "update", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Applications.
     * @param {ApplicationDeleteManyArgs} args - Arguments to filter Applications to delete.
     * @example
     * // Delete a few Applications
     * const { count } = await prisma.application.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ApplicationDeleteManyArgs>(
      args?: SelectSubset<T, ApplicationDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Applications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Applications
     * const application = await prisma.application.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ApplicationUpdateManyArgs>(
      args: SelectSubset<T, ApplicationUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Applications and returns the data updated in the database.
     * @param {ApplicationUpdateManyAndReturnArgs} args - Arguments to update many Applications.
     * @example
     * // Update many Applications
     * const application = await prisma.application.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Applications and only return the `id`
     * const applicationWithIdOnly = await prisma.application.updateManyAndReturn({
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
    updateManyAndReturn<T extends ApplicationUpdateManyAndReturnArgs>(
      args: SelectSubset<T, ApplicationUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>
    >;

    /**
     * Create or update one Application.
     * @param {ApplicationUpsertArgs} args - Arguments to update or create a Application.
     * @example
     * // Update or create a Application
     * const application = await prisma.application.upsert({
     *   create: {
     *     // ... data to create a Application
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Application we want to update
     *   }
     * })
     */
    upsert<T extends ApplicationUpsertArgs>(
      args: SelectSubset<T, ApplicationUpsertArgs<ExtArgs>>,
    ): Prisma__ApplicationClient<
      $Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Applications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationCountArgs} args - Arguments to filter Applications to count.
     * @example
     * // Count the number of Applications
     * const count = await prisma.application.count({
     *   where: {
     *     // ... the filter for the Applications we want to count
     *   }
     * })
     **/
    count<T extends ApplicationCountArgs>(
      args?: Subset<T, ApplicationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], ApplicationCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Application.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ApplicationAggregateArgs>(
      args: Subset<T, ApplicationAggregateArgs>,
    ): Prisma.PrismaPromise<GetApplicationAggregateType<T>>;

    /**
     * Group by Application.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationGroupByArgs} args - Group by arguments.
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
      T extends ApplicationGroupByArgs,
      HasSelectOrTake extends Or<Extends<"skip", Keys<T>>, Extends<"take", Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApplicationGroupByArgs["orderBy"] }
        : { orderBy?: ApplicationGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T["orderBy"]>>>,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? 'Error: "by" must not be empty.'
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, "Field ", P, " in \"having\" needs to be provided in \"by\""];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ApplicationGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetApplicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Application model
     */
    readonly fields: ApplicationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Application.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApplicationClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, PropertyDefaultArgs<ExtArgs>>,
    ): Prisma__PropertyClient<
      $Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    investor<T extends InvestorDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, InvestorDefaultArgs<ExtArgs>>,
    ): Prisma__InvestorClient<
      $Result.GetResult<Prisma.$InvestorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    lease<T extends Application$leaseArgs<ExtArgs> = {}>(
      args?: Subset<T, Application$leaseArgs<ExtArgs>>,
    ): Prisma__LeaseClient<
      $Result.GetResult<Prisma.$LeasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Application model
   */
  interface ApplicationFieldRefs {
    readonly id: FieldRef<"Application", "Int">;
    readonly applicationDate: FieldRef<"Application", "DateTime">;
    readonly status: FieldRef<"Application", "ApplicationStatus">;
    readonly propertyId: FieldRef<"Application", "Int">;
    readonly investorCognitoId: FieldRef<"Application", "String">;
    readonly name: FieldRef<"Application", "String">;
    readonly email: FieldRef<"Application", "String">;
    readonly phoneNumber: FieldRef<"Application", "String">;
    readonly message: FieldRef<"Application", "String">;
    readonly leaseId: FieldRef<"Application", "Int">;
  }

  // Custom InputTypes
  /**
   * Application findUnique
   */
  export type ApplicationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null;
    /**
     * Filter, which Application to fetch.
     */
    where: ApplicationWhereUniqueInput;
  };

  /**
   * Application findUniqueOrThrow
   */
  export type ApplicationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null;
    /**
     * Filter, which Application to fetch.
     */
    where: ApplicationWhereUniqueInput;
  };

  /**
   * Application findFirst
   */
  export type ApplicationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null;
    /**
     * Filter, which Application to fetch.
     */
    where?: ApplicationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Applications.
     */
    cursor?: ApplicationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Applications.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Applications.
     */
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[];
  };

  /**
   * Application findFirstOrThrow
   */
  export type ApplicationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null;
    /**
     * Filter, which Application to fetch.
     */
    where?: ApplicationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Applications.
     */
    cursor?: ApplicationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Applications.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Applications.
     */
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[];
  };

  /**
   * Application findMany
   */
  export type ApplicationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null;
    /**
     * Filter, which Applications to fetch.
     */
    where?: ApplicationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Applications.
     */
    cursor?: ApplicationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Applications.
     */
    skip?: number;
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[];
  };

  /**
   * Application create
   */
  export type ApplicationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null;
    /**
     * The data needed to create a Application.
     */
    data: XOR<ApplicationCreateInput, ApplicationUncheckedCreateInput>;
  };

  /**
   * Application createMany
   */
  export type ApplicationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Applications.
     */
    data: ApplicationCreateManyInput | ApplicationCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Application createManyAndReturn
   */
  export type ApplicationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null;
    /**
     * The data used to create many Applications.
     */
    data: ApplicationCreateManyInput | ApplicationCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Application update
   */
  export type ApplicationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null;
    /**
     * The data needed to update a Application.
     */
    data: XOR<ApplicationUpdateInput, ApplicationUncheckedUpdateInput>;
    /**
     * Choose, which Application to update.
     */
    where: ApplicationWhereUniqueInput;
  };

  /**
   * Application updateMany
   */
  export type ApplicationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Applications.
     */
    data: XOR<ApplicationUpdateManyMutationInput, ApplicationUncheckedUpdateManyInput>;
    /**
     * Filter which Applications to update
     */
    where?: ApplicationWhereInput;
    /**
     * Limit how many Applications to update.
     */
    limit?: number;
  };

  /**
   * Application updateManyAndReturn
   */
  export type ApplicationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null;
    /**
     * The data used to update Applications.
     */
    data: XOR<ApplicationUpdateManyMutationInput, ApplicationUncheckedUpdateManyInput>;
    /**
     * Filter which Applications to update
     */
    where?: ApplicationWhereInput;
    /**
     * Limit how many Applications to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Application upsert
   */
  export type ApplicationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null;
    /**
     * The filter to search for the Application to update in case it exists.
     */
    where: ApplicationWhereUniqueInput;
    /**
     * In case the Application found by the `where` argument doesn't exist, create a new Application with this data.
     */
    create: XOR<ApplicationCreateInput, ApplicationUncheckedCreateInput>;
    /**
     * In case the Application was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApplicationUpdateInput, ApplicationUncheckedUpdateInput>;
  };

  /**
   * Application delete
   */
  export type ApplicationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null;
    /**
     * Filter which Application to delete.
     */
    where: ApplicationWhereUniqueInput;
  };

  /**
   * Application deleteMany
   */
  export type ApplicationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Applications to delete
     */
    where?: ApplicationWhereInput;
    /**
     * Limit how many Applications to delete.
     */
    limit?: number;
  };

  /**
   * Application.lease
   */
  export type Application$leaseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lease
     */
    select?: LeaseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lease
     */
    omit?: LeaseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaseInclude<ExtArgs> | null;
    where?: LeaseWhereInput;
  };

  /**
   * Application without action
   */
  export type ApplicationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null;
  };

  /**
   * Model Lease
   */

  export type AggregateLease = {
    _count: LeaseCountAggregateOutputType | null;
    _avg: LeaseAvgAggregateOutputType | null;
    _sum: LeaseSumAggregateOutputType | null;
    _min: LeaseMinAggregateOutputType | null;
    _max: LeaseMaxAggregateOutputType | null;
  };

  export type LeaseAvgAggregateOutputType = {
    id: number | null;
    rent: number | null;
    deposit: number | null;
    propertyId: number | null;
  };

  export type LeaseSumAggregateOutputType = {
    id: number | null;
    rent: number | null;
    deposit: number | null;
    propertyId: number | null;
  };

  export type LeaseMinAggregateOutputType = {
    id: number | null;
    startDate: Date | null;
    endDate: Date | null;
    rent: number | null;
    deposit: number | null;
    propertyId: number | null;
    investorCognitoId: string | null;
  };

  export type LeaseMaxAggregateOutputType = {
    id: number | null;
    startDate: Date | null;
    endDate: Date | null;
    rent: number | null;
    deposit: number | null;
    propertyId: number | null;
    investorCognitoId: string | null;
  };

  export type LeaseCountAggregateOutputType = {
    id: number;
    startDate: number;
    endDate: number;
    rent: number;
    deposit: number;
    propertyId: number;
    investorCognitoId: number;
    _all: number;
  };

  export type LeaseAvgAggregateInputType = {
    id?: true;
    rent?: true;
    deposit?: true;
    propertyId?: true;
  };

  export type LeaseSumAggregateInputType = {
    id?: true;
    rent?: true;
    deposit?: true;
    propertyId?: true;
  };

  export type LeaseMinAggregateInputType = {
    id?: true;
    startDate?: true;
    endDate?: true;
    rent?: true;
    deposit?: true;
    propertyId?: true;
    investorCognitoId?: true;
  };

  export type LeaseMaxAggregateInputType = {
    id?: true;
    startDate?: true;
    endDate?: true;
    rent?: true;
    deposit?: true;
    propertyId?: true;
    investorCognitoId?: true;
  };

  export type LeaseCountAggregateInputType = {
    id?: true;
    startDate?: true;
    endDate?: true;
    rent?: true;
    deposit?: true;
    propertyId?: true;
    investorCognitoId?: true;
    _all?: true;
  };

  export type LeaseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lease to aggregate.
     */
    where?: LeaseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Leases to fetch.
     */
    orderBy?: LeaseOrderByWithRelationInput | LeaseOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: LeaseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Leases from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Leases.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Leases
     **/
    _count?: true | LeaseCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: LeaseAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: LeaseSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: LeaseMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: LeaseMaxAggregateInputType;
  };

  export type GetLeaseAggregateType<T extends LeaseAggregateArgs> = {
    [P in keyof T & keyof AggregateLease]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLease[P]>
      : GetScalarType<T[P], AggregateLease[P]>;
  };

  export type LeaseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeaseWhereInput;
    orderBy?: LeaseOrderByWithAggregationInput | LeaseOrderByWithAggregationInput[];
    by: LeaseScalarFieldEnum[] | LeaseScalarFieldEnum;
    having?: LeaseScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: LeaseCountAggregateInputType | true;
    _avg?: LeaseAvgAggregateInputType;
    _sum?: LeaseSumAggregateInputType;
    _min?: LeaseMinAggregateInputType;
    _max?: LeaseMaxAggregateInputType;
  };

  export type LeaseGroupByOutputType = {
    id: number;
    startDate: Date;
    endDate: Date;
    rent: number;
    deposit: number;
    propertyId: number;
    investorCognitoId: string;
    _count: LeaseCountAggregateOutputType | null;
    _avg: LeaseAvgAggregateOutputType | null;
    _sum: LeaseSumAggregateOutputType | null;
    _min: LeaseMinAggregateOutputType | null;
    _max: LeaseMaxAggregateOutputType | null;
  };

  type GetLeaseGroupByPayload<T extends LeaseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeaseGroupByOutputType, T["by"]> & {
        [P in keyof T & keyof LeaseGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], LeaseGroupByOutputType[P]>
          : GetScalarType<T[P], LeaseGroupByOutputType[P]>;
      }
    >
  >;

  export type LeaseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<
    {
      id?: boolean;
      startDate?: boolean;
      endDate?: boolean;
      rent?: boolean;
      deposit?: boolean;
      propertyId?: boolean;
      investorCognitoId?: boolean;
      property?: boolean | PropertyDefaultArgs<ExtArgs>;
      investor?: boolean | InvestorDefaultArgs<ExtArgs>;
      application?: boolean | Lease$applicationArgs<ExtArgs>;
      payments?: boolean | Lease$paymentsArgs<ExtArgs>;
      _count?: boolean | LeaseCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["lease"]
  >;

  export type LeaseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        startDate?: boolean;
        endDate?: boolean;
        rent?: boolean;
        deposit?: boolean;
        propertyId?: boolean;
        investorCognitoId?: boolean;
        property?: boolean | PropertyDefaultArgs<ExtArgs>;
        investor?: boolean | InvestorDefaultArgs<ExtArgs>;
      },
      ExtArgs["result"]["lease"]
    >;

  export type LeaseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        startDate?: boolean;
        endDate?: boolean;
        rent?: boolean;
        deposit?: boolean;
        propertyId?: boolean;
        investorCognitoId?: boolean;
        property?: boolean | PropertyDefaultArgs<ExtArgs>;
        investor?: boolean | InvestorDefaultArgs<ExtArgs>;
      },
      ExtArgs["result"]["lease"]
    >;

  export type LeaseSelectScalar = {
    id?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    rent?: boolean;
    deposit?: boolean;
    propertyId?: boolean;
    investorCognitoId?: boolean;
  };

  export type LeaseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<
    "id" | "startDate" | "endDate" | "rent" | "deposit" | "propertyId" | "investorCognitoId",
    ExtArgs["result"]["lease"]
  >;
  export type LeaseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>;
    investor?: boolean | InvestorDefaultArgs<ExtArgs>;
    application?: boolean | Lease$applicationArgs<ExtArgs>;
    payments?: boolean | Lease$paymentsArgs<ExtArgs>;
    _count?: boolean | LeaseCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type LeaseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>;
    investor?: boolean | InvestorDefaultArgs<ExtArgs>;
  };
  export type LeaseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>;
    investor?: boolean | InvestorDefaultArgs<ExtArgs>;
  };

  export type $LeasePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Lease";
    objects: {
      property: Prisma.$PropertyPayload<ExtArgs>;
      investor: Prisma.$InvestorPayload<ExtArgs>;
      application: Prisma.$ApplicationPayload<ExtArgs> | null;
      payments: Prisma.$PaymentPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        startDate: Date;
        endDate: Date;
        rent: number;
        deposit: number;
        propertyId: number;
        investorCognitoId: string;
      },
      ExtArgs["result"]["lease"]
    >;
    composites: {};
  };

  type LeaseGetPayload<S extends boolean | null | undefined | LeaseDefaultArgs> = $Result.GetResult<
    Prisma.$LeasePayload,
    S
  >;

  type LeaseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    LeaseFindManyArgs,
    "select" | "include" | "distinct" | "omit"
  > & {
    select?: LeaseCountAggregateInputType | true;
  };

  export interface LeaseDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Lease"];
      meta: { name: "Lease" };
    };
    /**
     * Find zero or one Lease that matches the filter.
     * @param {LeaseFindUniqueArgs} args - Arguments to find a Lease
     * @example
     * // Get one Lease
     * const lease = await prisma.lease.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeaseFindUniqueArgs>(
      args: SelectSubset<T, LeaseFindUniqueArgs<ExtArgs>>,
    ): Prisma__LeaseClient<
      $Result.GetResult<Prisma.$LeasePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Lease that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LeaseFindUniqueOrThrowArgs} args - Arguments to find a Lease
     * @example
     * // Get one Lease
     * const lease = await prisma.lease.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeaseFindUniqueOrThrowArgs>(
      args: SelectSubset<T, LeaseFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__LeaseClient<
      $Result.GetResult<Prisma.$LeasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Lease that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaseFindFirstArgs} args - Arguments to find a Lease
     * @example
     * // Get one Lease
     * const lease = await prisma.lease.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeaseFindFirstArgs>(
      args?: SelectSubset<T, LeaseFindFirstArgs<ExtArgs>>,
    ): Prisma__LeaseClient<
      $Result.GetResult<Prisma.$LeasePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Lease that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaseFindFirstOrThrowArgs} args - Arguments to find a Lease
     * @example
     * // Get one Lease
     * const lease = await prisma.lease.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeaseFindFirstOrThrowArgs>(
      args?: SelectSubset<T, LeaseFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__LeaseClient<
      $Result.GetResult<Prisma.$LeasePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Leases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Leases
     * const leases = await prisma.lease.findMany()
     *
     * // Get first 10 Leases
     * const leases = await prisma.lease.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const leaseWithIdOnly = await prisma.lease.findMany({ select: { id: true } })
     *
     */
    findMany<T extends LeaseFindManyArgs>(
      args?: SelectSubset<T, LeaseFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;

    /**
     * Create a Lease.
     * @param {LeaseCreateArgs} args - Arguments to create a Lease.
     * @example
     * // Create one Lease
     * const Lease = await prisma.lease.create({
     *   data: {
     *     // ... data to create a Lease
     *   }
     * })
     *
     */
    create<T extends LeaseCreateArgs>(
      args: SelectSubset<T, LeaseCreateArgs<ExtArgs>>,
    ): Prisma__LeaseClient<
      $Result.GetResult<Prisma.$LeasePayload<ExtArgs>, T, "create", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Leases.
     * @param {LeaseCreateManyArgs} args - Arguments to create many Leases.
     * @example
     * // Create many Leases
     * const lease = await prisma.lease.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends LeaseCreateManyArgs>(
      args?: SelectSubset<T, LeaseCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Leases and returns the data saved in the database.
     * @param {LeaseCreateManyAndReturnArgs} args - Arguments to create many Leases.
     * @example
     * // Create many Leases
     * const lease = await prisma.lease.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Leases and only return the `id`
     * const leaseWithIdOnly = await prisma.lease.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends LeaseCreateManyAndReturnArgs>(
      args?: SelectSubset<T, LeaseCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$LeasePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>
    >;

    /**
     * Delete a Lease.
     * @param {LeaseDeleteArgs} args - Arguments to delete one Lease.
     * @example
     * // Delete one Lease
     * const Lease = await prisma.lease.delete({
     *   where: {
     *     // ... filter to delete one Lease
     *   }
     * })
     *
     */
    delete<T extends LeaseDeleteArgs>(
      args: SelectSubset<T, LeaseDeleteArgs<ExtArgs>>,
    ): Prisma__LeaseClient<
      $Result.GetResult<Prisma.$LeasePayload<ExtArgs>, T, "delete", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Lease.
     * @param {LeaseUpdateArgs} args - Arguments to update one Lease.
     * @example
     * // Update one Lease
     * const lease = await prisma.lease.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends LeaseUpdateArgs>(
      args: SelectSubset<T, LeaseUpdateArgs<ExtArgs>>,
    ): Prisma__LeaseClient<
      $Result.GetResult<Prisma.$LeasePayload<ExtArgs>, T, "update", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Leases.
     * @param {LeaseDeleteManyArgs} args - Arguments to filter Leases to delete.
     * @example
     * // Delete a few Leases
     * const { count } = await prisma.lease.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends LeaseDeleteManyArgs>(
      args?: SelectSubset<T, LeaseDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Leases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Leases
     * const lease = await prisma.lease.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends LeaseUpdateManyArgs>(
      args: SelectSubset<T, LeaseUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Leases and returns the data updated in the database.
     * @param {LeaseUpdateManyAndReturnArgs} args - Arguments to update many Leases.
     * @example
     * // Update many Leases
     * const lease = await prisma.lease.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Leases and only return the `id`
     * const leaseWithIdOnly = await prisma.lease.updateManyAndReturn({
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
    updateManyAndReturn<T extends LeaseUpdateManyAndReturnArgs>(
      args: SelectSubset<T, LeaseUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$LeasePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>
    >;

    /**
     * Create or update one Lease.
     * @param {LeaseUpsertArgs} args - Arguments to update or create a Lease.
     * @example
     * // Update or create a Lease
     * const lease = await prisma.lease.upsert({
     *   create: {
     *     // ... data to create a Lease
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lease we want to update
     *   }
     * })
     */
    upsert<T extends LeaseUpsertArgs>(
      args: SelectSubset<T, LeaseUpsertArgs<ExtArgs>>,
    ): Prisma__LeaseClient<
      $Result.GetResult<Prisma.$LeasePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Leases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaseCountArgs} args - Arguments to filter Leases to count.
     * @example
     * // Count the number of Leases
     * const count = await prisma.lease.count({
     *   where: {
     *     // ... the filter for the Leases we want to count
     *   }
     * })
     **/
    count<T extends LeaseCountArgs>(
      args?: Subset<T, LeaseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], LeaseCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Lease.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LeaseAggregateArgs>(
      args: Subset<T, LeaseAggregateArgs>,
    ): Prisma.PrismaPromise<GetLeaseAggregateType<T>>;

    /**
     * Group by Lease.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaseGroupByArgs} args - Group by arguments.
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
      T extends LeaseGroupByArgs,
      HasSelectOrTake extends Or<Extends<"skip", Keys<T>>, Extends<"take", Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeaseGroupByArgs["orderBy"] }
        : { orderBy?: LeaseGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T["orderBy"]>>>,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? 'Error: "by" must not be empty.'
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, "Field ", P, " in \"having\" needs to be provided in \"by\""];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, LeaseGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetLeaseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Lease model
     */
    readonly fields: LeaseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Lease.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeaseClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, PropertyDefaultArgs<ExtArgs>>,
    ): Prisma__PropertyClient<
      $Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    investor<T extends InvestorDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, InvestorDefaultArgs<ExtArgs>>,
    ): Prisma__InvestorClient<
      $Result.GetResult<Prisma.$InvestorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    application<T extends Lease$applicationArgs<ExtArgs> = {}>(
      args?: Subset<T, Lease$applicationArgs<ExtArgs>>,
    ): Prisma__ApplicationClient<
      $Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;
    payments<T extends Lease$paymentsArgs<ExtArgs> = {}>(
      args?: Subset<T, Lease$paymentsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Lease model
   */
  interface LeaseFieldRefs {
    readonly id: FieldRef<"Lease", "Int">;
    readonly startDate: FieldRef<"Lease", "DateTime">;
    readonly endDate: FieldRef<"Lease", "DateTime">;
    readonly rent: FieldRef<"Lease", "Float">;
    readonly deposit: FieldRef<"Lease", "Float">;
    readonly propertyId: FieldRef<"Lease", "Int">;
    readonly investorCognitoId: FieldRef<"Lease", "String">;
  }

  // Custom InputTypes
  /**
   * Lease findUnique
   */
  export type LeaseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lease
     */
    select?: LeaseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lease
     */
    omit?: LeaseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaseInclude<ExtArgs> | null;
    /**
     * Filter, which Lease to fetch.
     */
    where: LeaseWhereUniqueInput;
  };

  /**
   * Lease findUniqueOrThrow
   */
  export type LeaseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lease
     */
    select?: LeaseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lease
     */
    omit?: LeaseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaseInclude<ExtArgs> | null;
    /**
     * Filter, which Lease to fetch.
     */
    where: LeaseWhereUniqueInput;
  };

  /**
   * Lease findFirst
   */
  export type LeaseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lease
     */
    select?: LeaseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lease
     */
    omit?: LeaseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaseInclude<ExtArgs> | null;
    /**
     * Filter, which Lease to fetch.
     */
    where?: LeaseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Leases to fetch.
     */
    orderBy?: LeaseOrderByWithRelationInput | LeaseOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Leases.
     */
    cursor?: LeaseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Leases from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Leases.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Leases.
     */
    distinct?: LeaseScalarFieldEnum | LeaseScalarFieldEnum[];
  };

  /**
   * Lease findFirstOrThrow
   */
  export type LeaseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lease
     */
    select?: LeaseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lease
     */
    omit?: LeaseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaseInclude<ExtArgs> | null;
    /**
     * Filter, which Lease to fetch.
     */
    where?: LeaseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Leases to fetch.
     */
    orderBy?: LeaseOrderByWithRelationInput | LeaseOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Leases.
     */
    cursor?: LeaseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Leases from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Leases.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Leases.
     */
    distinct?: LeaseScalarFieldEnum | LeaseScalarFieldEnum[];
  };

  /**
   * Lease findMany
   */
  export type LeaseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lease
     */
    select?: LeaseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lease
     */
    omit?: LeaseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaseInclude<ExtArgs> | null;
    /**
     * Filter, which Leases to fetch.
     */
    where?: LeaseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Leases to fetch.
     */
    orderBy?: LeaseOrderByWithRelationInput | LeaseOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Leases.
     */
    cursor?: LeaseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Leases from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Leases.
     */
    skip?: number;
    distinct?: LeaseScalarFieldEnum | LeaseScalarFieldEnum[];
  };

  /**
   * Lease create
   */
  export type LeaseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lease
     */
    select?: LeaseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lease
     */
    omit?: LeaseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaseInclude<ExtArgs> | null;
    /**
     * The data needed to create a Lease.
     */
    data: XOR<LeaseCreateInput, LeaseUncheckedCreateInput>;
  };

  /**
   * Lease createMany
   */
  export type LeaseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Leases.
     */
    data: LeaseCreateManyInput | LeaseCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Lease createManyAndReturn
   */
  export type LeaseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lease
     */
    select?: LeaseSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Lease
     */
    omit?: LeaseOmit<ExtArgs> | null;
    /**
     * The data used to create many Leases.
     */
    data: LeaseCreateManyInput | LeaseCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaseIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Lease update
   */
  export type LeaseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lease
     */
    select?: LeaseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lease
     */
    omit?: LeaseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaseInclude<ExtArgs> | null;
    /**
     * The data needed to update a Lease.
     */
    data: XOR<LeaseUpdateInput, LeaseUncheckedUpdateInput>;
    /**
     * Choose, which Lease to update.
     */
    where: LeaseWhereUniqueInput;
  };

  /**
   * Lease updateMany
   */
  export type LeaseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Leases.
     */
    data: XOR<LeaseUpdateManyMutationInput, LeaseUncheckedUpdateManyInput>;
    /**
     * Filter which Leases to update
     */
    where?: LeaseWhereInput;
    /**
     * Limit how many Leases to update.
     */
    limit?: number;
  };

  /**
   * Lease updateManyAndReturn
   */
  export type LeaseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lease
     */
    select?: LeaseSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Lease
     */
    omit?: LeaseOmit<ExtArgs> | null;
    /**
     * The data used to update Leases.
     */
    data: XOR<LeaseUpdateManyMutationInput, LeaseUncheckedUpdateManyInput>;
    /**
     * Filter which Leases to update
     */
    where?: LeaseWhereInput;
    /**
     * Limit how many Leases to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaseIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Lease upsert
   */
  export type LeaseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lease
     */
    select?: LeaseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lease
     */
    omit?: LeaseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaseInclude<ExtArgs> | null;
    /**
     * The filter to search for the Lease to update in case it exists.
     */
    where: LeaseWhereUniqueInput;
    /**
     * In case the Lease found by the `where` argument doesn't exist, create a new Lease with this data.
     */
    create: XOR<LeaseCreateInput, LeaseUncheckedCreateInput>;
    /**
     * In case the Lease was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeaseUpdateInput, LeaseUncheckedUpdateInput>;
  };

  /**
   * Lease delete
   */
  export type LeaseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lease
     */
    select?: LeaseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lease
     */
    omit?: LeaseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaseInclude<ExtArgs> | null;
    /**
     * Filter which Lease to delete.
     */
    where: LeaseWhereUniqueInput;
  };

  /**
   * Lease deleteMany
   */
  export type LeaseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Leases to delete
     */
    where?: LeaseWhereInput;
    /**
     * Limit how many Leases to delete.
     */
    limit?: number;
  };

  /**
   * Lease.application
   */
  export type Lease$applicationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null;
    where?: ApplicationWhereInput;
  };

  /**
   * Lease.payments
   */
  export type Lease$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null;
    where?: PaymentWhereInput;
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[];
    cursor?: PaymentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[];
  };

  /**
   * Lease without action
   */
  export type LeaseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lease
     */
    select?: LeaseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lease
     */
    omit?: LeaseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaseInclude<ExtArgs> | null;
  };

  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null;
    _avg: PaymentAvgAggregateOutputType | null;
    _sum: PaymentSumAggregateOutputType | null;
    _min: PaymentMinAggregateOutputType | null;
    _max: PaymentMaxAggregateOutputType | null;
  };

  export type PaymentAvgAggregateOutputType = {
    id: number | null;
    amountDue: number | null;
    amountPaid: number | null;
    leaseId: number | null;
  };

  export type PaymentSumAggregateOutputType = {
    id: number | null;
    amountDue: number | null;
    amountPaid: number | null;
    leaseId: number | null;
  };

  export type PaymentMinAggregateOutputType = {
    id: number | null;
    amountDue: number | null;
    amountPaid: number | null;
    dueDate: Date | null;
    paymentDate: Date | null;
    paymentStatus: $Enums.PaymentStatus | null;
    leaseId: number | null;
  };

  export type PaymentMaxAggregateOutputType = {
    id: number | null;
    amountDue: number | null;
    amountPaid: number | null;
    dueDate: Date | null;
    paymentDate: Date | null;
    paymentStatus: $Enums.PaymentStatus | null;
    leaseId: number | null;
  };

  export type PaymentCountAggregateOutputType = {
    id: number;
    amountDue: number;
    amountPaid: number;
    dueDate: number;
    paymentDate: number;
    paymentStatus: number;
    leaseId: number;
    _all: number;
  };

  export type PaymentAvgAggregateInputType = {
    id?: true;
    amountDue?: true;
    amountPaid?: true;
    leaseId?: true;
  };

  export type PaymentSumAggregateInputType = {
    id?: true;
    amountDue?: true;
    amountPaid?: true;
    leaseId?: true;
  };

  export type PaymentMinAggregateInputType = {
    id?: true;
    amountDue?: true;
    amountPaid?: true;
    dueDate?: true;
    paymentDate?: true;
    paymentStatus?: true;
    leaseId?: true;
  };

  export type PaymentMaxAggregateInputType = {
    id?: true;
    amountDue?: true;
    amountPaid?: true;
    dueDate?: true;
    paymentDate?: true;
    paymentStatus?: true;
    leaseId?: true;
  };

  export type PaymentCountAggregateInputType = {
    id?: true;
    amountDue?: true;
    amountPaid?: true;
    dueDate?: true;
    paymentDate?: true;
    paymentStatus?: true;
    leaseId?: true;
    _all?: true;
  };

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Payments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Payments
     **/
    _count?: true | PaymentCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: PaymentAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: PaymentSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: PaymentMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: PaymentMaxAggregateInputType;
  };

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
    [P in keyof T & keyof AggregatePayment]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>;
  };

  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput;
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[];
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum;
    having?: PaymentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PaymentCountAggregateInputType | true;
    _avg?: PaymentAvgAggregateInputType;
    _sum?: PaymentSumAggregateInputType;
    _min?: PaymentMinAggregateInputType;
    _max?: PaymentMaxAggregateInputType;
  };

  export type PaymentGroupByOutputType = {
    id: number;
    amountDue: number;
    amountPaid: number;
    dueDate: Date;
    paymentDate: Date;
    paymentStatus: $Enums.PaymentStatus;
    leaseId: number;
    _count: PaymentCountAggregateOutputType | null;
    _avg: PaymentAvgAggregateOutputType | null;
    _sum: PaymentSumAggregateOutputType | null;
    _min: PaymentMinAggregateOutputType | null;
    _max: PaymentMaxAggregateOutputType | null;
  };

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T["by"]> & {
        [P in keyof T & keyof PaymentGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
          : GetScalarType<T[P], PaymentGroupByOutputType[P]>;
      }
    >
  >;

  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<
    {
      id?: boolean;
      amountDue?: boolean;
      amountPaid?: boolean;
      dueDate?: boolean;
      paymentDate?: boolean;
      paymentStatus?: boolean;
      leaseId?: boolean;
      lease?: boolean | LeaseDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["payment"]
  >;

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        amountDue?: boolean;
        amountPaid?: boolean;
        dueDate?: boolean;
        paymentDate?: boolean;
        paymentStatus?: boolean;
        leaseId?: boolean;
        lease?: boolean | LeaseDefaultArgs<ExtArgs>;
      },
      ExtArgs["result"]["payment"]
    >;

  export type PaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        amountDue?: boolean;
        amountPaid?: boolean;
        dueDate?: boolean;
        paymentDate?: boolean;
        paymentStatus?: boolean;
        leaseId?: boolean;
        lease?: boolean | LeaseDefaultArgs<ExtArgs>;
      },
      ExtArgs["result"]["payment"]
    >;

  export type PaymentSelectScalar = {
    id?: boolean;
    amountDue?: boolean;
    amountPaid?: boolean;
    dueDate?: boolean;
    paymentDate?: boolean;
    paymentStatus?: boolean;
    leaseId?: boolean;
  };

  export type PaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<
    "id" | "amountDue" | "amountPaid" | "dueDate" | "paymentDate" | "paymentStatus" | "leaseId",
    ExtArgs["result"]["payment"]
  >;
  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lease?: boolean | LeaseDefaultArgs<ExtArgs>;
  };
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lease?: boolean | LeaseDefaultArgs<ExtArgs>;
  };
  export type PaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lease?: boolean | LeaseDefaultArgs<ExtArgs>;
  };

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment";
    objects: {
      lease: Prisma.$LeasePayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        amountDue: number;
        amountPaid: number;
        dueDate: Date;
        paymentDate: Date;
        paymentStatus: $Enums.PaymentStatus;
        leaseId: number;
      },
      ExtArgs["result"]["payment"]
    >;
    composites: {};
  };

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<
    Prisma.$PaymentPayload,
    S
  >;

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    PaymentFindManyArgs,
    "select" | "include" | "distinct" | "omit"
  > & {
    select?: PaymentCountAggregateInputType | true;
  };

  export interface PaymentDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Payment"];
      meta: { name: "Payment" };
    };
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(
      args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>,
    ): Prisma__PaymentClient<
      $Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(
      args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__PaymentClient<
      $Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(
      args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>,
    ): Prisma__PaymentClient<
      $Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__PaymentClient<
      $Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     *
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     *
     */
    findMany<T extends PaymentFindManyArgs>(
      args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     *
     */
    create<T extends PaymentCreateArgs>(
      args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>,
    ): Prisma__PaymentClient<
      $Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PaymentCreateManyArgs>(
      args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(
      args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>
    >;

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     *
     */
    delete<T extends PaymentDeleteArgs>(
      args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>,
    ): Prisma__PaymentClient<
      $Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PaymentUpdateArgs>(
      args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>,
    ): Prisma__PaymentClient<
      $Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PaymentDeleteManyArgs>(
      args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PaymentUpdateManyArgs>(
      args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Payments and returns the data updated in the database.
     * @param {PaymentUpdateManyAndReturnArgs} args - Arguments to update many Payments.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.updateManyAndReturn({
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
    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(
      args: SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>
    >;

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(
      args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>,
    ): Prisma__PaymentClient<
      $Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
     **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], PaymentCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PaymentAggregateArgs>(
      args: Subset<T, PaymentAggregateArgs>,
    ): Prisma.PrismaPromise<GetPaymentAggregateType<T>>;

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
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
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<Extends<"skip", Keys<T>>, Extends<"take", Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs["orderBy"] }
        : { orderBy?: PaymentGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T["orderBy"]>>>,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? 'Error: "by" must not be empty.'
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, "Field ", P, " in \"having\" needs to be provided in \"by\""];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Payment model
     */
    readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    lease<T extends LeaseDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, LeaseDefaultArgs<ExtArgs>>,
    ): Prisma__LeaseClient<
      $Result.GetResult<Prisma.$LeasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Payment model
   */
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", "Int">;
    readonly amountDue: FieldRef<"Payment", "Float">;
    readonly amountPaid: FieldRef<"Payment", "Float">;
    readonly dueDate: FieldRef<"Payment", "DateTime">;
    readonly paymentDate: FieldRef<"Payment", "DateTime">;
    readonly paymentStatus: FieldRef<"Payment", "PaymentStatus">;
    readonly leaseId: FieldRef<"Payment", "Int">;
  }

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null;
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput;
  };

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null;
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput;
  };

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null;
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Payments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[];
  };

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null;
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Payments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[];
  };

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null;
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Payments.
     */
    skip?: number;
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[];
  };

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null;
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>;
  };

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null;
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null;
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>;
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput;
  };

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>;
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput;
    /**
     * Limit how many Payments to update.
     */
    limit?: number;
  };

  /**
   * Payment updateManyAndReturn
   */
  export type PaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null;
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>;
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput;
    /**
     * Limit how many Payments to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null;
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput;
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>;
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>;
  };

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null;
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput;
  };

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput;
    /**
     * Limit how many Payments to delete.
     */
    limit?: number;
  };

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null;
  };

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: "ReadUncommitted";
    ReadCommitted: "ReadCommitted";
    RepeatableRead: "RepeatableRead";
    Serializable: "Serializable";
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const PropertyScalarFieldEnum: {
    id: "id";
    name: "name";
    description: "description";
    pricePerMonth: "pricePerMonth";
    securityDeposit: "securityDeposit";
    applicationFee: "applicationFee";
    photoUrls: "photoUrls";
    isPetsAllowed: "isPetsAllowed";
    isParkingIncluded: "isParkingIncluded";
    beds: "beds";
    baths: "baths";
    squareFeet: "squareFeet";
    propertyType: "propertyType";
    postedDate: "postedDate";
    averageRating: "averageRating";
    numberOfReviews: "numberOfReviews";
    locationId: "locationId";
    managerCognitoId: "managerCognitoId";
  };

  export type PropertyScalarFieldEnum = (typeof PropertyScalarFieldEnum)[keyof typeof PropertyScalarFieldEnum];

  export const ManagerScalarFieldEnum: {
    id: "id";
    cognitoId: "cognitoId";
    name: "name";
    email: "email";
    phoneNumber: "phoneNumber";
  };

  export type ManagerScalarFieldEnum = (typeof ManagerScalarFieldEnum)[keyof typeof ManagerScalarFieldEnum];

  export const InvestorScalarFieldEnum: {
    id: "id";
    cognitoId: "cognitoId";
    name: "name";
    email: "email";
    phoneNumber: "phoneNumber";
  };

  export type InvestorScalarFieldEnum = (typeof InvestorScalarFieldEnum)[keyof typeof InvestorScalarFieldEnum];

  export const LocationScalarFieldEnum: {
    id: "id";
    address: "address";
    postalCode: "postalCode";
    latitude: "latitude";
    longitude: "longitude";
  };

  export type LocationScalarFieldEnum = (typeof LocationScalarFieldEnum)[keyof typeof LocationScalarFieldEnum];

  export const ApplicationScalarFieldEnum: {
    id: "id";
    applicationDate: "applicationDate";
    status: "status";
    propertyId: "propertyId";
    investorCognitoId: "investorCognitoId";
    name: "name";
    email: "email";
    phoneNumber: "phoneNumber";
    message: "message";
    leaseId: "leaseId";
  };

  export type ApplicationScalarFieldEnum = (typeof ApplicationScalarFieldEnum)[keyof typeof ApplicationScalarFieldEnum];

  export const LeaseScalarFieldEnum: {
    id: "id";
    startDate: "startDate";
    endDate: "endDate";
    rent: "rent";
    deposit: "deposit";
    propertyId: "propertyId";
    investorCognitoId: "investorCognitoId";
  };

  export type LeaseScalarFieldEnum = (typeof LeaseScalarFieldEnum)[keyof typeof LeaseScalarFieldEnum];

  export const PaymentScalarFieldEnum: {
    id: "id";
    amountDue: "amountDue";
    amountPaid: "amountPaid";
    dueDate: "dueDate";
    paymentDate: "paymentDate";
    paymentStatus: "paymentStatus";
    leaseId: "leaseId";
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum];

  export const SortOrder: {
    asc: "asc";
    desc: "desc";
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const QueryMode: {
    default: "default";
    insensitive: "insensitive";
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  export const NullsOrder: {
    first: "first";
    last: "last";
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "Int">;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "Int[]">;

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "String">;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "String[]">;

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "Float">;

  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "Float[]">;

  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "Boolean">;

  /**
   * Reference to a field of type 'PropertyType'
   */
  export type EnumPropertyTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "PropertyType">;

  /**
   * Reference to a field of type 'PropertyType[]'
   */
  export type ListEnumPropertyTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "PropertyType[]">;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "DateTime">;

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "DateTime[]">;

  /**
   * Reference to a field of type 'ApplicationStatus'
   */
  export type EnumApplicationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "ApplicationStatus">;

  /**
   * Reference to a field of type 'ApplicationStatus[]'
   */
  export type ListEnumApplicationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "ApplicationStatus[]"
  >;

  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "PaymentStatus">;

  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "PaymentStatus[]">;

  /**
   * Deep Input Types
   */

  export type PropertyWhereInput = {
    AND?: PropertyWhereInput | PropertyWhereInput[];
    OR?: PropertyWhereInput[];
    NOT?: PropertyWhereInput | PropertyWhereInput[];
    id?: IntFilter<"Property"> | number;
    name?: StringFilter<"Property"> | string;
    description?: StringFilter<"Property"> | string;
    pricePerMonth?: FloatFilter<"Property"> | number;
    securityDeposit?: FloatFilter<"Property"> | number;
    applicationFee?: FloatFilter<"Property"> | number;
    photoUrls?: StringNullableListFilter<"Property">;
    isPetsAllowed?: BoolFilter<"Property"> | boolean;
    isParkingIncluded?: BoolFilter<"Property"> | boolean;
    beds?: IntFilter<"Property"> | number;
    baths?: FloatFilter<"Property"> | number;
    squareFeet?: IntFilter<"Property"> | number;
    propertyType?: EnumPropertyTypeFilter<"Property"> | $Enums.PropertyType;
    postedDate?: DateTimeFilter<"Property"> | Date | string;
    averageRating?: FloatNullableFilter<"Property"> | number | null;
    numberOfReviews?: IntNullableFilter<"Property"> | number | null;
    locationId?: IntFilter<"Property"> | number;
    managerCognitoId?: StringFilter<"Property"> | string;
    location?: XOR<LocationScalarRelationFilter, LocationWhereInput>;
    manager?: XOR<ManagerScalarRelationFilter, ManagerWhereInput>;
    leases?: LeaseListRelationFilter;
    applications?: ApplicationListRelationFilter;
    favoritedBy?: InvestorListRelationFilter;
    investors?: InvestorListRelationFilter;
  };

  export type PropertyOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    pricePerMonth?: SortOrder;
    securityDeposit?: SortOrder;
    applicationFee?: SortOrder;
    photoUrls?: SortOrder;
    isPetsAllowed?: SortOrder;
    isParkingIncluded?: SortOrder;
    beds?: SortOrder;
    baths?: SortOrder;
    squareFeet?: SortOrder;
    propertyType?: SortOrder;
    postedDate?: SortOrder;
    averageRating?: SortOrderInput | SortOrder;
    numberOfReviews?: SortOrderInput | SortOrder;
    locationId?: SortOrder;
    managerCognitoId?: SortOrder;
    location?: LocationOrderByWithRelationInput;
    manager?: ManagerOrderByWithRelationInput;
    leases?: LeaseOrderByRelationAggregateInput;
    applications?: ApplicationOrderByRelationAggregateInput;
    favoritedBy?: InvestorOrderByRelationAggregateInput;
    investors?: InvestorOrderByRelationAggregateInput;
  };

  export type PropertyWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      AND?: PropertyWhereInput | PropertyWhereInput[];
      OR?: PropertyWhereInput[];
      NOT?: PropertyWhereInput | PropertyWhereInput[];
      name?: StringFilter<"Property"> | string;
      description?: StringFilter<"Property"> | string;
      pricePerMonth?: FloatFilter<"Property"> | number;
      securityDeposit?: FloatFilter<"Property"> | number;
      applicationFee?: FloatFilter<"Property"> | number;
      photoUrls?: StringNullableListFilter<"Property">;
      isPetsAllowed?: BoolFilter<"Property"> | boolean;
      isParkingIncluded?: BoolFilter<"Property"> | boolean;
      beds?: IntFilter<"Property"> | number;
      baths?: FloatFilter<"Property"> | number;
      squareFeet?: IntFilter<"Property"> | number;
      propertyType?: EnumPropertyTypeFilter<"Property"> | $Enums.PropertyType;
      postedDate?: DateTimeFilter<"Property"> | Date | string;
      averageRating?: FloatNullableFilter<"Property"> | number | null;
      numberOfReviews?: IntNullableFilter<"Property"> | number | null;
      locationId?: IntFilter<"Property"> | number;
      managerCognitoId?: StringFilter<"Property"> | string;
      location?: XOR<LocationScalarRelationFilter, LocationWhereInput>;
      manager?: XOR<ManagerScalarRelationFilter, ManagerWhereInput>;
      leases?: LeaseListRelationFilter;
      applications?: ApplicationListRelationFilter;
      favoritedBy?: InvestorListRelationFilter;
      investors?: InvestorListRelationFilter;
    },
    "id"
  >;

  export type PropertyOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    pricePerMonth?: SortOrder;
    securityDeposit?: SortOrder;
    applicationFee?: SortOrder;
    photoUrls?: SortOrder;
    isPetsAllowed?: SortOrder;
    isParkingIncluded?: SortOrder;
    beds?: SortOrder;
    baths?: SortOrder;
    squareFeet?: SortOrder;
    propertyType?: SortOrder;
    postedDate?: SortOrder;
    averageRating?: SortOrderInput | SortOrder;
    numberOfReviews?: SortOrderInput | SortOrder;
    locationId?: SortOrder;
    managerCognitoId?: SortOrder;
    _count?: PropertyCountOrderByAggregateInput;
    _avg?: PropertyAvgOrderByAggregateInput;
    _max?: PropertyMaxOrderByAggregateInput;
    _min?: PropertyMinOrderByAggregateInput;
    _sum?: PropertySumOrderByAggregateInput;
  };

  export type PropertyScalarWhereWithAggregatesInput = {
    AND?: PropertyScalarWhereWithAggregatesInput | PropertyScalarWhereWithAggregatesInput[];
    OR?: PropertyScalarWhereWithAggregatesInput[];
    NOT?: PropertyScalarWhereWithAggregatesInput | PropertyScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<"Property"> | number;
    name?: StringWithAggregatesFilter<"Property"> | string;
    description?: StringWithAggregatesFilter<"Property"> | string;
    pricePerMonth?: FloatWithAggregatesFilter<"Property"> | number;
    securityDeposit?: FloatWithAggregatesFilter<"Property"> | number;
    applicationFee?: FloatWithAggregatesFilter<"Property"> | number;
    photoUrls?: StringNullableListFilter<"Property">;
    isPetsAllowed?: BoolWithAggregatesFilter<"Property"> | boolean;
    isParkingIncluded?: BoolWithAggregatesFilter<"Property"> | boolean;
    beds?: IntWithAggregatesFilter<"Property"> | number;
    baths?: FloatWithAggregatesFilter<"Property"> | number;
    squareFeet?: IntWithAggregatesFilter<"Property"> | number;
    propertyType?: EnumPropertyTypeWithAggregatesFilter<"Property"> | $Enums.PropertyType;
    postedDate?: DateTimeWithAggregatesFilter<"Property"> | Date | string;
    averageRating?: FloatNullableWithAggregatesFilter<"Property"> | number | null;
    numberOfReviews?: IntNullableWithAggregatesFilter<"Property"> | number | null;
    locationId?: IntWithAggregatesFilter<"Property"> | number;
    managerCognitoId?: StringWithAggregatesFilter<"Property"> | string;
  };

  export type ManagerWhereInput = {
    AND?: ManagerWhereInput | ManagerWhereInput[];
    OR?: ManagerWhereInput[];
    NOT?: ManagerWhereInput | ManagerWhereInput[];
    id?: IntFilter<"Manager"> | number;
    cognitoId?: StringFilter<"Manager"> | string;
    name?: StringFilter<"Manager"> | string;
    email?: StringFilter<"Manager"> | string;
    phoneNumber?: StringFilter<"Manager"> | string;
    managedProperties?: PropertyListRelationFilter;
  };

  export type ManagerOrderByWithRelationInput = {
    id?: SortOrder;
    cognitoId?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    phoneNumber?: SortOrder;
    managedProperties?: PropertyOrderByRelationAggregateInput;
  };

  export type ManagerWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      cognitoId?: string;
      AND?: ManagerWhereInput | ManagerWhereInput[];
      OR?: ManagerWhereInput[];
      NOT?: ManagerWhereInput | ManagerWhereInput[];
      name?: StringFilter<"Manager"> | string;
      email?: StringFilter<"Manager"> | string;
      phoneNumber?: StringFilter<"Manager"> | string;
      managedProperties?: PropertyListRelationFilter;
    },
    "id" | "cognitoId"
  >;

  export type ManagerOrderByWithAggregationInput = {
    id?: SortOrder;
    cognitoId?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    phoneNumber?: SortOrder;
    _count?: ManagerCountOrderByAggregateInput;
    _avg?: ManagerAvgOrderByAggregateInput;
    _max?: ManagerMaxOrderByAggregateInput;
    _min?: ManagerMinOrderByAggregateInput;
    _sum?: ManagerSumOrderByAggregateInput;
  };

  export type ManagerScalarWhereWithAggregatesInput = {
    AND?: ManagerScalarWhereWithAggregatesInput | ManagerScalarWhereWithAggregatesInput[];
    OR?: ManagerScalarWhereWithAggregatesInput[];
    NOT?: ManagerScalarWhereWithAggregatesInput | ManagerScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<"Manager"> | number;
    cognitoId?: StringWithAggregatesFilter<"Manager"> | string;
    name?: StringWithAggregatesFilter<"Manager"> | string;
    email?: StringWithAggregatesFilter<"Manager"> | string;
    phoneNumber?: StringWithAggregatesFilter<"Manager"> | string;
  };

  export type InvestorWhereInput = {
    AND?: InvestorWhereInput | InvestorWhereInput[];
    OR?: InvestorWhereInput[];
    NOT?: InvestorWhereInput | InvestorWhereInput[];
    id?: IntFilter<"Investor"> | number;
    cognitoId?: StringFilter<"Investor"> | string;
    name?: StringFilter<"Investor"> | string;
    email?: StringFilter<"Investor"> | string;
    phoneNumber?: StringFilter<"Investor"> | string;
    properties?: PropertyListRelationFilter;
    favorites?: PropertyListRelationFilter;
    applications?: ApplicationListRelationFilter;
    leases?: LeaseListRelationFilter;
  };

  export type InvestorOrderByWithRelationInput = {
    id?: SortOrder;
    cognitoId?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    phoneNumber?: SortOrder;
    properties?: PropertyOrderByRelationAggregateInput;
    favorites?: PropertyOrderByRelationAggregateInput;
    applications?: ApplicationOrderByRelationAggregateInput;
    leases?: LeaseOrderByRelationAggregateInput;
  };

  export type InvestorWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      cognitoId?: string;
      AND?: InvestorWhereInput | InvestorWhereInput[];
      OR?: InvestorWhereInput[];
      NOT?: InvestorWhereInput | InvestorWhereInput[];
      name?: StringFilter<"Investor"> | string;
      email?: StringFilter<"Investor"> | string;
      phoneNumber?: StringFilter<"Investor"> | string;
      properties?: PropertyListRelationFilter;
      favorites?: PropertyListRelationFilter;
      applications?: ApplicationListRelationFilter;
      leases?: LeaseListRelationFilter;
    },
    "id" | "cognitoId"
  >;

  export type InvestorOrderByWithAggregationInput = {
    id?: SortOrder;
    cognitoId?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    phoneNumber?: SortOrder;
    _count?: InvestorCountOrderByAggregateInput;
    _avg?: InvestorAvgOrderByAggregateInput;
    _max?: InvestorMaxOrderByAggregateInput;
    _min?: InvestorMinOrderByAggregateInput;
    _sum?: InvestorSumOrderByAggregateInput;
  };

  export type InvestorScalarWhereWithAggregatesInput = {
    AND?: InvestorScalarWhereWithAggregatesInput | InvestorScalarWhereWithAggregatesInput[];
    OR?: InvestorScalarWhereWithAggregatesInput[];
    NOT?: InvestorScalarWhereWithAggregatesInput | InvestorScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<"Investor"> | number;
    cognitoId?: StringWithAggregatesFilter<"Investor"> | string;
    name?: StringWithAggregatesFilter<"Investor"> | string;
    email?: StringWithAggregatesFilter<"Investor"> | string;
    phoneNumber?: StringWithAggregatesFilter<"Investor"> | string;
  };

  export type LocationWhereInput = {
    AND?: LocationWhereInput | LocationWhereInput[];
    OR?: LocationWhereInput[];
    NOT?: LocationWhereInput | LocationWhereInput[];
    id?: IntFilter<"Location"> | number;
    address?: StringFilter<"Location"> | string;
    postalCode?: StringFilter<"Location"> | string;
    latitude?: FloatFilter<"Location"> | number;
    longitude?: FloatFilter<"Location"> | number;
    properties?: PropertyListRelationFilter;
  };

  export type LocationOrderByWithRelationInput = {
    id?: SortOrder;
    address?: SortOrder;
    postalCode?: SortOrder;
    latitude?: SortOrder;
    longitude?: SortOrder;
    properties?: PropertyOrderByRelationAggregateInput;
  };

  export type LocationWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      AND?: LocationWhereInput | LocationWhereInput[];
      OR?: LocationWhereInput[];
      NOT?: LocationWhereInput | LocationWhereInput[];
      address?: StringFilter<"Location"> | string;
      postalCode?: StringFilter<"Location"> | string;
      latitude?: FloatFilter<"Location"> | number;
      longitude?: FloatFilter<"Location"> | number;
      properties?: PropertyListRelationFilter;
    },
    "id"
  >;

  export type LocationOrderByWithAggregationInput = {
    id?: SortOrder;
    address?: SortOrder;
    postalCode?: SortOrder;
    latitude?: SortOrder;
    longitude?: SortOrder;
    _count?: LocationCountOrderByAggregateInput;
    _avg?: LocationAvgOrderByAggregateInput;
    _max?: LocationMaxOrderByAggregateInput;
    _min?: LocationMinOrderByAggregateInput;
    _sum?: LocationSumOrderByAggregateInput;
  };

  export type LocationScalarWhereWithAggregatesInput = {
    AND?: LocationScalarWhereWithAggregatesInput | LocationScalarWhereWithAggregatesInput[];
    OR?: LocationScalarWhereWithAggregatesInput[];
    NOT?: LocationScalarWhereWithAggregatesInput | LocationScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<"Location"> | number;
    address?: StringWithAggregatesFilter<"Location"> | string;
    postalCode?: StringWithAggregatesFilter<"Location"> | string;
    latitude?: FloatWithAggregatesFilter<"Location"> | number;
    longitude?: FloatWithAggregatesFilter<"Location"> | number;
  };

  export type ApplicationWhereInput = {
    AND?: ApplicationWhereInput | ApplicationWhereInput[];
    OR?: ApplicationWhereInput[];
    NOT?: ApplicationWhereInput | ApplicationWhereInput[];
    id?: IntFilter<"Application"> | number;
    applicationDate?: DateTimeFilter<"Application"> | Date | string;
    status?: EnumApplicationStatusFilter<"Application"> | $Enums.ApplicationStatus;
    propertyId?: IntFilter<"Application"> | number;
    investorCognitoId?: StringFilter<"Application"> | string;
    name?: StringFilter<"Application"> | string;
    email?: StringFilter<"Application"> | string;
    phoneNumber?: StringFilter<"Application"> | string;
    message?: StringNullableFilter<"Application"> | string | null;
    leaseId?: IntNullableFilter<"Application"> | number | null;
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>;
    investor?: XOR<InvestorScalarRelationFilter, InvestorWhereInput>;
    lease?: XOR<LeaseNullableScalarRelationFilter, LeaseWhereInput> | null;
  };

  export type ApplicationOrderByWithRelationInput = {
    id?: SortOrder;
    applicationDate?: SortOrder;
    status?: SortOrder;
    propertyId?: SortOrder;
    investorCognitoId?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    phoneNumber?: SortOrder;
    message?: SortOrderInput | SortOrder;
    leaseId?: SortOrderInput | SortOrder;
    property?: PropertyOrderByWithRelationInput;
    investor?: InvestorOrderByWithRelationInput;
    lease?: LeaseOrderByWithRelationInput;
  };

  export type ApplicationWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      leaseId?: number;
      AND?: ApplicationWhereInput | ApplicationWhereInput[];
      OR?: ApplicationWhereInput[];
      NOT?: ApplicationWhereInput | ApplicationWhereInput[];
      applicationDate?: DateTimeFilter<"Application"> | Date | string;
      status?: EnumApplicationStatusFilter<"Application"> | $Enums.ApplicationStatus;
      propertyId?: IntFilter<"Application"> | number;
      investorCognitoId?: StringFilter<"Application"> | string;
      name?: StringFilter<"Application"> | string;
      email?: StringFilter<"Application"> | string;
      phoneNumber?: StringFilter<"Application"> | string;
      message?: StringNullableFilter<"Application"> | string | null;
      property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>;
      investor?: XOR<InvestorScalarRelationFilter, InvestorWhereInput>;
      lease?: XOR<LeaseNullableScalarRelationFilter, LeaseWhereInput> | null;
    },
    "id" | "leaseId"
  >;

  export type ApplicationOrderByWithAggregationInput = {
    id?: SortOrder;
    applicationDate?: SortOrder;
    status?: SortOrder;
    propertyId?: SortOrder;
    investorCognitoId?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    phoneNumber?: SortOrder;
    message?: SortOrderInput | SortOrder;
    leaseId?: SortOrderInput | SortOrder;
    _count?: ApplicationCountOrderByAggregateInput;
    _avg?: ApplicationAvgOrderByAggregateInput;
    _max?: ApplicationMaxOrderByAggregateInput;
    _min?: ApplicationMinOrderByAggregateInput;
    _sum?: ApplicationSumOrderByAggregateInput;
  };

  export type ApplicationScalarWhereWithAggregatesInput = {
    AND?: ApplicationScalarWhereWithAggregatesInput | ApplicationScalarWhereWithAggregatesInput[];
    OR?: ApplicationScalarWhereWithAggregatesInput[];
    NOT?: ApplicationScalarWhereWithAggregatesInput | ApplicationScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<"Application"> | number;
    applicationDate?: DateTimeWithAggregatesFilter<"Application"> | Date | string;
    status?: EnumApplicationStatusWithAggregatesFilter<"Application"> | $Enums.ApplicationStatus;
    propertyId?: IntWithAggregatesFilter<"Application"> | number;
    investorCognitoId?: StringWithAggregatesFilter<"Application"> | string;
    name?: StringWithAggregatesFilter<"Application"> | string;
    email?: StringWithAggregatesFilter<"Application"> | string;
    phoneNumber?: StringWithAggregatesFilter<"Application"> | string;
    message?: StringNullableWithAggregatesFilter<"Application"> | string | null;
    leaseId?: IntNullableWithAggregatesFilter<"Application"> | number | null;
  };

  export type LeaseWhereInput = {
    AND?: LeaseWhereInput | LeaseWhereInput[];
    OR?: LeaseWhereInput[];
    NOT?: LeaseWhereInput | LeaseWhereInput[];
    id?: IntFilter<"Lease"> | number;
    startDate?: DateTimeFilter<"Lease"> | Date | string;
    endDate?: DateTimeFilter<"Lease"> | Date | string;
    rent?: FloatFilter<"Lease"> | number;
    deposit?: FloatFilter<"Lease"> | number;
    propertyId?: IntFilter<"Lease"> | number;
    investorCognitoId?: StringFilter<"Lease"> | string;
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>;
    investor?: XOR<InvestorScalarRelationFilter, InvestorWhereInput>;
    application?: XOR<ApplicationNullableScalarRelationFilter, ApplicationWhereInput> | null;
    payments?: PaymentListRelationFilter;
  };

  export type LeaseOrderByWithRelationInput = {
    id?: SortOrder;
    startDate?: SortOrder;
    endDate?: SortOrder;
    rent?: SortOrder;
    deposit?: SortOrder;
    propertyId?: SortOrder;
    investorCognitoId?: SortOrder;
    property?: PropertyOrderByWithRelationInput;
    investor?: InvestorOrderByWithRelationInput;
    application?: ApplicationOrderByWithRelationInput;
    payments?: PaymentOrderByRelationAggregateInput;
  };

  export type LeaseWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      AND?: LeaseWhereInput | LeaseWhereInput[];
      OR?: LeaseWhereInput[];
      NOT?: LeaseWhereInput | LeaseWhereInput[];
      startDate?: DateTimeFilter<"Lease"> | Date | string;
      endDate?: DateTimeFilter<"Lease"> | Date | string;
      rent?: FloatFilter<"Lease"> | number;
      deposit?: FloatFilter<"Lease"> | number;
      propertyId?: IntFilter<"Lease"> | number;
      investorCognitoId?: StringFilter<"Lease"> | string;
      property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>;
      investor?: XOR<InvestorScalarRelationFilter, InvestorWhereInput>;
      application?: XOR<ApplicationNullableScalarRelationFilter, ApplicationWhereInput> | null;
      payments?: PaymentListRelationFilter;
    },
    "id"
  >;

  export type LeaseOrderByWithAggregationInput = {
    id?: SortOrder;
    startDate?: SortOrder;
    endDate?: SortOrder;
    rent?: SortOrder;
    deposit?: SortOrder;
    propertyId?: SortOrder;
    investorCognitoId?: SortOrder;
    _count?: LeaseCountOrderByAggregateInput;
    _avg?: LeaseAvgOrderByAggregateInput;
    _max?: LeaseMaxOrderByAggregateInput;
    _min?: LeaseMinOrderByAggregateInput;
    _sum?: LeaseSumOrderByAggregateInput;
  };

  export type LeaseScalarWhereWithAggregatesInput = {
    AND?: LeaseScalarWhereWithAggregatesInput | LeaseScalarWhereWithAggregatesInput[];
    OR?: LeaseScalarWhereWithAggregatesInput[];
    NOT?: LeaseScalarWhereWithAggregatesInput | LeaseScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<"Lease"> | number;
    startDate?: DateTimeWithAggregatesFilter<"Lease"> | Date | string;
    endDate?: DateTimeWithAggregatesFilter<"Lease"> | Date | string;
    rent?: FloatWithAggregatesFilter<"Lease"> | number;
    deposit?: FloatWithAggregatesFilter<"Lease"> | number;
    propertyId?: IntWithAggregatesFilter<"Lease"> | number;
    investorCognitoId?: StringWithAggregatesFilter<"Lease"> | string;
  };

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[];
    OR?: PaymentWhereInput[];
    NOT?: PaymentWhereInput | PaymentWhereInput[];
    id?: IntFilter<"Payment"> | number;
    amountDue?: FloatFilter<"Payment"> | number;
    amountPaid?: FloatFilter<"Payment"> | number;
    dueDate?: DateTimeFilter<"Payment"> | Date | string;
    paymentDate?: DateTimeFilter<"Payment"> | Date | string;
    paymentStatus?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus;
    leaseId?: IntFilter<"Payment"> | number;
    lease?: XOR<LeaseScalarRelationFilter, LeaseWhereInput>;
  };

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder;
    amountDue?: SortOrder;
    amountPaid?: SortOrder;
    dueDate?: SortOrder;
    paymentDate?: SortOrder;
    paymentStatus?: SortOrder;
    leaseId?: SortOrder;
    lease?: LeaseOrderByWithRelationInput;
  };

  export type PaymentWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      AND?: PaymentWhereInput | PaymentWhereInput[];
      OR?: PaymentWhereInput[];
      NOT?: PaymentWhereInput | PaymentWhereInput[];
      amountDue?: FloatFilter<"Payment"> | number;
      amountPaid?: FloatFilter<"Payment"> | number;
      dueDate?: DateTimeFilter<"Payment"> | Date | string;
      paymentDate?: DateTimeFilter<"Payment"> | Date | string;
      paymentStatus?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus;
      leaseId?: IntFilter<"Payment"> | number;
      lease?: XOR<LeaseScalarRelationFilter, LeaseWhereInput>;
    },
    "id"
  >;

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder;
    amountDue?: SortOrder;
    amountPaid?: SortOrder;
    dueDate?: SortOrder;
    paymentDate?: SortOrder;
    paymentStatus?: SortOrder;
    leaseId?: SortOrder;
    _count?: PaymentCountOrderByAggregateInput;
    _avg?: PaymentAvgOrderByAggregateInput;
    _max?: PaymentMaxOrderByAggregateInput;
    _min?: PaymentMinOrderByAggregateInput;
    _sum?: PaymentSumOrderByAggregateInput;
  };

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[];
    OR?: PaymentScalarWhereWithAggregatesInput[];
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<"Payment"> | number;
    amountDue?: FloatWithAggregatesFilter<"Payment"> | number;
    amountPaid?: FloatWithAggregatesFilter<"Payment"> | number;
    dueDate?: DateTimeWithAggregatesFilter<"Payment"> | Date | string;
    paymentDate?: DateTimeWithAggregatesFilter<"Payment"> | Date | string;
    paymentStatus?: EnumPaymentStatusWithAggregatesFilter<"Payment"> | $Enums.PaymentStatus;
    leaseId?: IntWithAggregatesFilter<"Payment"> | number;
  };

  export type PropertyCreateInput = {
    name: string;
    description: string;
    pricePerMonth: number;
    securityDeposit: number;
    applicationFee: number;
    photoUrls?: PropertyCreatephotoUrlsInput | string[];
    isPetsAllowed?: boolean;
    isParkingIncluded?: boolean;
    beds: number;
    baths: number;
    squareFeet: number;
    propertyType: $Enums.PropertyType;
    postedDate?: Date | string;
    averageRating?: number | null;
    numberOfReviews?: number | null;
    location: LocationCreateNestedOneWithoutPropertiesInput;
    manager: ManagerCreateNestedOneWithoutManagedPropertiesInput;
    leases?: LeaseCreateNestedManyWithoutPropertyInput;
    applications?: ApplicationCreateNestedManyWithoutPropertyInput;
    favoritedBy?: InvestorCreateNestedManyWithoutFavoritesInput;
    investors?: InvestorCreateNestedManyWithoutPropertiesInput;
  };

  export type PropertyUncheckedCreateInput = {
    id?: number;
    name: string;
    description: string;
    pricePerMonth: number;
    securityDeposit: number;
    applicationFee: number;
    photoUrls?: PropertyCreatephotoUrlsInput | string[];
    isPetsAllowed?: boolean;
    isParkingIncluded?: boolean;
    beds: number;
    baths: number;
    squareFeet: number;
    propertyType: $Enums.PropertyType;
    postedDate?: Date | string;
    averageRating?: number | null;
    numberOfReviews?: number | null;
    locationId: number;
    managerCognitoId: string;
    leases?: LeaseUncheckedCreateNestedManyWithoutPropertyInput;
    applications?: ApplicationUncheckedCreateNestedManyWithoutPropertyInput;
    favoritedBy?: InvestorUncheckedCreateNestedManyWithoutFavoritesInput;
    investors?: InvestorUncheckedCreateNestedManyWithoutPropertiesInput;
  };

  export type PropertyUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    pricePerMonth?: FloatFieldUpdateOperationsInput | number;
    securityDeposit?: FloatFieldUpdateOperationsInput | number;
    applicationFee?: FloatFieldUpdateOperationsInput | number;
    photoUrls?: PropertyUpdatephotoUrlsInput | string[];
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean;
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean;
    beds?: IntFieldUpdateOperationsInput | number;
    baths?: FloatFieldUpdateOperationsInput | number;
    squareFeet?: IntFieldUpdateOperationsInput | number;
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType;
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null;
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null;
    location?: LocationUpdateOneRequiredWithoutPropertiesNestedInput;
    manager?: ManagerUpdateOneRequiredWithoutManagedPropertiesNestedInput;
    leases?: LeaseUpdateManyWithoutPropertyNestedInput;
    applications?: ApplicationUpdateManyWithoutPropertyNestedInput;
    favoritedBy?: InvestorUpdateManyWithoutFavoritesNestedInput;
    investors?: InvestorUpdateManyWithoutPropertiesNestedInput;
  };

  export type PropertyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    pricePerMonth?: FloatFieldUpdateOperationsInput | number;
    securityDeposit?: FloatFieldUpdateOperationsInput | number;
    applicationFee?: FloatFieldUpdateOperationsInput | number;
    photoUrls?: PropertyUpdatephotoUrlsInput | string[];
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean;
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean;
    beds?: IntFieldUpdateOperationsInput | number;
    baths?: FloatFieldUpdateOperationsInput | number;
    squareFeet?: IntFieldUpdateOperationsInput | number;
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType;
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null;
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null;
    locationId?: IntFieldUpdateOperationsInput | number;
    managerCognitoId?: StringFieldUpdateOperationsInput | string;
    leases?: LeaseUncheckedUpdateManyWithoutPropertyNestedInput;
    applications?: ApplicationUncheckedUpdateManyWithoutPropertyNestedInput;
    favoritedBy?: InvestorUncheckedUpdateManyWithoutFavoritesNestedInput;
    investors?: InvestorUncheckedUpdateManyWithoutPropertiesNestedInput;
  };

  export type PropertyCreateManyInput = {
    id?: number;
    name: string;
    description: string;
    pricePerMonth: number;
    securityDeposit: number;
    applicationFee: number;
    photoUrls?: PropertyCreatephotoUrlsInput | string[];
    isPetsAllowed?: boolean;
    isParkingIncluded?: boolean;
    beds: number;
    baths: number;
    squareFeet: number;
    propertyType: $Enums.PropertyType;
    postedDate?: Date | string;
    averageRating?: number | null;
    numberOfReviews?: number | null;
    locationId: number;
    managerCognitoId: string;
  };

  export type PropertyUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    pricePerMonth?: FloatFieldUpdateOperationsInput | number;
    securityDeposit?: FloatFieldUpdateOperationsInput | number;
    applicationFee?: FloatFieldUpdateOperationsInput | number;
    photoUrls?: PropertyUpdatephotoUrlsInput | string[];
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean;
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean;
    beds?: IntFieldUpdateOperationsInput | number;
    baths?: FloatFieldUpdateOperationsInput | number;
    squareFeet?: IntFieldUpdateOperationsInput | number;
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType;
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null;
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null;
  };

  export type PropertyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    pricePerMonth?: FloatFieldUpdateOperationsInput | number;
    securityDeposit?: FloatFieldUpdateOperationsInput | number;
    applicationFee?: FloatFieldUpdateOperationsInput | number;
    photoUrls?: PropertyUpdatephotoUrlsInput | string[];
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean;
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean;
    beds?: IntFieldUpdateOperationsInput | number;
    baths?: FloatFieldUpdateOperationsInput | number;
    squareFeet?: IntFieldUpdateOperationsInput | number;
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType;
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null;
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null;
    locationId?: IntFieldUpdateOperationsInput | number;
    managerCognitoId?: StringFieldUpdateOperationsInput | string;
  };

  export type ManagerCreateInput = {
    cognitoId: string;
    name: string;
    email: string;
    phoneNumber: string;
    managedProperties?: PropertyCreateNestedManyWithoutManagerInput;
  };

  export type ManagerUncheckedCreateInput = {
    id?: number;
    cognitoId: string;
    name: string;
    email: string;
    phoneNumber: string;
    managedProperties?: PropertyUncheckedCreateNestedManyWithoutManagerInput;
  };

  export type ManagerUpdateInput = {
    cognitoId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
    managedProperties?: PropertyUpdateManyWithoutManagerNestedInput;
  };

  export type ManagerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    cognitoId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
    managedProperties?: PropertyUncheckedUpdateManyWithoutManagerNestedInput;
  };

  export type ManagerCreateManyInput = {
    id?: number;
    cognitoId: string;
    name: string;
    email: string;
    phoneNumber: string;
  };

  export type ManagerUpdateManyMutationInput = {
    cognitoId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
  };

  export type ManagerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    cognitoId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
  };

  export type InvestorCreateInput = {
    cognitoId: string;
    name: string;
    email: string;
    phoneNumber: string;
    properties?: PropertyCreateNestedManyWithoutInvestorsInput;
    favorites?: PropertyCreateNestedManyWithoutFavoritedByInput;
    applications?: ApplicationCreateNestedManyWithoutInvestorInput;
    leases?: LeaseCreateNestedManyWithoutInvestorInput;
  };

  export type InvestorUncheckedCreateInput = {
    id?: number;
    cognitoId: string;
    name: string;
    email: string;
    phoneNumber: string;
    properties?: PropertyUncheckedCreateNestedManyWithoutInvestorsInput;
    favorites?: PropertyUncheckedCreateNestedManyWithoutFavoritedByInput;
    applications?: ApplicationUncheckedCreateNestedManyWithoutInvestorInput;
    leases?: LeaseUncheckedCreateNestedManyWithoutInvestorInput;
  };

  export type InvestorUpdateInput = {
    cognitoId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
    properties?: PropertyUpdateManyWithoutInvestorsNestedInput;
    favorites?: PropertyUpdateManyWithoutFavoritedByNestedInput;
    applications?: ApplicationUpdateManyWithoutInvestorNestedInput;
    leases?: LeaseUpdateManyWithoutInvestorNestedInput;
  };

  export type InvestorUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    cognitoId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
    properties?: PropertyUncheckedUpdateManyWithoutInvestorsNestedInput;
    favorites?: PropertyUncheckedUpdateManyWithoutFavoritedByNestedInput;
    applications?: ApplicationUncheckedUpdateManyWithoutInvestorNestedInput;
    leases?: LeaseUncheckedUpdateManyWithoutInvestorNestedInput;
  };

  export type InvestorCreateManyInput = {
    id?: number;
    cognitoId: string;
    name: string;
    email: string;
    phoneNumber: string;
  };

  export type InvestorUpdateManyMutationInput = {
    cognitoId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
  };

  export type InvestorUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    cognitoId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
  };

  export type LocationCreateInput = {
    address: string;
    postalCode: string;
    latitude: number;
    longitude: number;
    properties?: PropertyCreateNestedManyWithoutLocationInput;
  };

  export type LocationUncheckedCreateInput = {
    id?: number;
    address: string;
    postalCode: string;
    latitude: number;
    longitude: number;
    properties?: PropertyUncheckedCreateNestedManyWithoutLocationInput;
  };

  export type LocationUpdateInput = {
    address?: StringFieldUpdateOperationsInput | string;
    postalCode?: StringFieldUpdateOperationsInput | string;
    latitude?: FloatFieldUpdateOperationsInput | number;
    longitude?: FloatFieldUpdateOperationsInput | number;
    properties?: PropertyUpdateManyWithoutLocationNestedInput;
  };

  export type LocationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    address?: StringFieldUpdateOperationsInput | string;
    postalCode?: StringFieldUpdateOperationsInput | string;
    latitude?: FloatFieldUpdateOperationsInput | number;
    longitude?: FloatFieldUpdateOperationsInput | number;
    properties?: PropertyUncheckedUpdateManyWithoutLocationNestedInput;
  };

  export type LocationCreateManyInput = {
    id?: number;
    address: string;
    postalCode: string;
    latitude: number;
    longitude: number;
  };

  export type LocationUpdateManyMutationInput = {
    address?: StringFieldUpdateOperationsInput | string;
    postalCode?: StringFieldUpdateOperationsInput | string;
    latitude?: FloatFieldUpdateOperationsInput | number;
    longitude?: FloatFieldUpdateOperationsInput | number;
  };

  export type LocationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    address?: StringFieldUpdateOperationsInput | string;
    postalCode?: StringFieldUpdateOperationsInput | string;
    latitude?: FloatFieldUpdateOperationsInput | number;
    longitude?: FloatFieldUpdateOperationsInput | number;
  };

  export type ApplicationCreateInput = {
    applicationDate: Date | string;
    status: $Enums.ApplicationStatus;
    name: string;
    email: string;
    phoneNumber: string;
    message?: string | null;
    property: PropertyCreateNestedOneWithoutApplicationsInput;
    investor: InvestorCreateNestedOneWithoutApplicationsInput;
    lease?: LeaseCreateNestedOneWithoutApplicationInput;
  };

  export type ApplicationUncheckedCreateInput = {
    id?: number;
    applicationDate: Date | string;
    status: $Enums.ApplicationStatus;
    propertyId: number;
    investorCognitoId: string;
    name: string;
    email: string;
    phoneNumber: string;
    message?: string | null;
    leaseId?: number | null;
  };

  export type ApplicationUpdateInput = {
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    property?: PropertyUpdateOneRequiredWithoutApplicationsNestedInput;
    investor?: InvestorUpdateOneRequiredWithoutApplicationsNestedInput;
    lease?: LeaseUpdateOneWithoutApplicationNestedInput;
  };

  export type ApplicationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus;
    propertyId?: IntFieldUpdateOperationsInput | number;
    investorCognitoId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    leaseId?: NullableIntFieldUpdateOperationsInput | number | null;
  };

  export type ApplicationCreateManyInput = {
    id?: number;
    applicationDate: Date | string;
    status: $Enums.ApplicationStatus;
    propertyId: number;
    investorCognitoId: string;
    name: string;
    email: string;
    phoneNumber: string;
    message?: string | null;
    leaseId?: number | null;
  };

  export type ApplicationUpdateManyMutationInput = {
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type ApplicationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus;
    propertyId?: IntFieldUpdateOperationsInput | number;
    investorCognitoId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    leaseId?: NullableIntFieldUpdateOperationsInput | number | null;
  };

  export type LeaseCreateInput = {
    startDate: Date | string;
    endDate: Date | string;
    rent: number;
    deposit: number;
    property: PropertyCreateNestedOneWithoutLeasesInput;
    investor: InvestorCreateNestedOneWithoutLeasesInput;
    application?: ApplicationCreateNestedOneWithoutLeaseInput;
    payments?: PaymentCreateNestedManyWithoutLeaseInput;
  };

  export type LeaseUncheckedCreateInput = {
    id?: number;
    startDate: Date | string;
    endDate: Date | string;
    rent: number;
    deposit: number;
    propertyId: number;
    investorCognitoId: string;
    application?: ApplicationUncheckedCreateNestedOneWithoutLeaseInput;
    payments?: PaymentUncheckedCreateNestedManyWithoutLeaseInput;
  };

  export type LeaseUpdateInput = {
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    rent?: FloatFieldUpdateOperationsInput | number;
    deposit?: FloatFieldUpdateOperationsInput | number;
    property?: PropertyUpdateOneRequiredWithoutLeasesNestedInput;
    investor?: InvestorUpdateOneRequiredWithoutLeasesNestedInput;
    application?: ApplicationUpdateOneWithoutLeaseNestedInput;
    payments?: PaymentUpdateManyWithoutLeaseNestedInput;
  };

  export type LeaseUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    rent?: FloatFieldUpdateOperationsInput | number;
    deposit?: FloatFieldUpdateOperationsInput | number;
    propertyId?: IntFieldUpdateOperationsInput | number;
    investorCognitoId?: StringFieldUpdateOperationsInput | string;
    application?: ApplicationUncheckedUpdateOneWithoutLeaseNestedInput;
    payments?: PaymentUncheckedUpdateManyWithoutLeaseNestedInput;
  };

  export type LeaseCreateManyInput = {
    id?: number;
    startDate: Date | string;
    endDate: Date | string;
    rent: number;
    deposit: number;
    propertyId: number;
    investorCognitoId: string;
  };

  export type LeaseUpdateManyMutationInput = {
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    rent?: FloatFieldUpdateOperationsInput | number;
    deposit?: FloatFieldUpdateOperationsInput | number;
  };

  export type LeaseUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    rent?: FloatFieldUpdateOperationsInput | number;
    deposit?: FloatFieldUpdateOperationsInput | number;
    propertyId?: IntFieldUpdateOperationsInput | number;
    investorCognitoId?: StringFieldUpdateOperationsInput | string;
  };

  export type PaymentCreateInput = {
    amountDue: number;
    amountPaid: number;
    dueDate: Date | string;
    paymentDate: Date | string;
    paymentStatus: $Enums.PaymentStatus;
    lease: LeaseCreateNestedOneWithoutPaymentsInput;
  };

  export type PaymentUncheckedCreateInput = {
    id?: number;
    amountDue: number;
    amountPaid: number;
    dueDate: Date | string;
    paymentDate: Date | string;
    paymentStatus: $Enums.PaymentStatus;
    leaseId: number;
  };

  export type PaymentUpdateInput = {
    amountDue?: FloatFieldUpdateOperationsInput | number;
    amountPaid?: FloatFieldUpdateOperationsInput | number;
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    lease?: LeaseUpdateOneRequiredWithoutPaymentsNestedInput;
  };

  export type PaymentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    amountDue?: FloatFieldUpdateOperationsInput | number;
    amountPaid?: FloatFieldUpdateOperationsInput | number;
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    leaseId?: IntFieldUpdateOperationsInput | number;
  };

  export type PaymentCreateManyInput = {
    id?: number;
    amountDue: number;
    amountPaid: number;
    dueDate: Date | string;
    paymentDate: Date | string;
    paymentStatus: $Enums.PaymentStatus;
    leaseId: number;
  };

  export type PaymentUpdateManyMutationInput = {
    amountDue?: FloatFieldUpdateOperationsInput | number;
    amountPaid?: FloatFieldUpdateOperationsInput | number;
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
  };

  export type PaymentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    amountDue?: FloatFieldUpdateOperationsInput | number;
    amountPaid?: FloatFieldUpdateOperationsInput | number;
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    leaseId?: IntFieldUpdateOperationsInput | number;
  };

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    has?: string | StringFieldRefInput<$PrismaModel> | null;
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>;
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
  };

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type EnumPropertyTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PropertyType | EnumPropertyTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumPropertyTypeFilter<$PrismaModel> | $Enums.PropertyType;
  };

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null;
  };

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type LocationScalarRelationFilter = {
    is?: LocationWhereInput;
    isNot?: LocationWhereInput;
  };

  export type ManagerScalarRelationFilter = {
    is?: ManagerWhereInput;
    isNot?: ManagerWhereInput;
  };

  export type LeaseListRelationFilter = {
    every?: LeaseWhereInput;
    some?: LeaseWhereInput;
    none?: LeaseWhereInput;
  };

  export type ApplicationListRelationFilter = {
    every?: ApplicationWhereInput;
    some?: ApplicationWhereInput;
    none?: ApplicationWhereInput;
  };

  export type InvestorListRelationFilter = {
    every?: InvestorWhereInput;
    some?: InvestorWhereInput;
    none?: InvestorWhereInput;
  };

  export type SortOrderInput = {
    sort: SortOrder;
    nulls?: NullsOrder;
  };

  export type LeaseOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type ApplicationOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type InvestorOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type PropertyCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    pricePerMonth?: SortOrder;
    securityDeposit?: SortOrder;
    applicationFee?: SortOrder;
    photoUrls?: SortOrder;
    isPetsAllowed?: SortOrder;
    isParkingIncluded?: SortOrder;
    beds?: SortOrder;
    baths?: SortOrder;
    squareFeet?: SortOrder;
    propertyType?: SortOrder;
    postedDate?: SortOrder;
    averageRating?: SortOrder;
    numberOfReviews?: SortOrder;
    locationId?: SortOrder;
    managerCognitoId?: SortOrder;
  };

  export type PropertyAvgOrderByAggregateInput = {
    id?: SortOrder;
    pricePerMonth?: SortOrder;
    securityDeposit?: SortOrder;
    applicationFee?: SortOrder;
    beds?: SortOrder;
    baths?: SortOrder;
    squareFeet?: SortOrder;
    averageRating?: SortOrder;
    numberOfReviews?: SortOrder;
    locationId?: SortOrder;
  };

  export type PropertyMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    pricePerMonth?: SortOrder;
    securityDeposit?: SortOrder;
    applicationFee?: SortOrder;
    isPetsAllowed?: SortOrder;
    isParkingIncluded?: SortOrder;
    beds?: SortOrder;
    baths?: SortOrder;
    squareFeet?: SortOrder;
    propertyType?: SortOrder;
    postedDate?: SortOrder;
    averageRating?: SortOrder;
    numberOfReviews?: SortOrder;
    locationId?: SortOrder;
    managerCognitoId?: SortOrder;
  };

  export type PropertyMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    pricePerMonth?: SortOrder;
    securityDeposit?: SortOrder;
    applicationFee?: SortOrder;
    isPetsAllowed?: SortOrder;
    isParkingIncluded?: SortOrder;
    beds?: SortOrder;
    baths?: SortOrder;
    squareFeet?: SortOrder;
    propertyType?: SortOrder;
    postedDate?: SortOrder;
    averageRating?: SortOrder;
    numberOfReviews?: SortOrder;
    locationId?: SortOrder;
    managerCognitoId?: SortOrder;
  };

  export type PropertySumOrderByAggregateInput = {
    id?: SortOrder;
    pricePerMonth?: SortOrder;
    securityDeposit?: SortOrder;
    applicationFee?: SortOrder;
    beds?: SortOrder;
    baths?: SortOrder;
    squareFeet?: SortOrder;
    averageRating?: SortOrder;
    numberOfReviews?: SortOrder;
    locationId?: SortOrder;
  };

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedFloatFilter<$PrismaModel>;
    _min?: NestedFloatFilter<$PrismaModel>;
    _max?: NestedFloatFilter<$PrismaModel>;
  };

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type EnumPropertyTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PropertyType | EnumPropertyTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumPropertyTypeWithAggregatesFilter<$PrismaModel> | $Enums.PropertyType;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumPropertyTypeFilter<$PrismaModel>;
    _max?: NestedEnumPropertyTypeFilter<$PrismaModel>;
  };

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedFloatNullableFilter<$PrismaModel>;
    _min?: NestedFloatNullableFilter<$PrismaModel>;
    _max?: NestedFloatNullableFilter<$PrismaModel>;
  };

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedIntNullableFilter<$PrismaModel>;
    _max?: NestedIntNullableFilter<$PrismaModel>;
  };

  export type PropertyListRelationFilter = {
    every?: PropertyWhereInput;
    some?: PropertyWhereInput;
    none?: PropertyWhereInput;
  };

  export type PropertyOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type ManagerCountOrderByAggregateInput = {
    id?: SortOrder;
    cognitoId?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    phoneNumber?: SortOrder;
  };

  export type ManagerAvgOrderByAggregateInput = {
    id?: SortOrder;
  };

  export type ManagerMaxOrderByAggregateInput = {
    id?: SortOrder;
    cognitoId?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    phoneNumber?: SortOrder;
  };

  export type ManagerMinOrderByAggregateInput = {
    id?: SortOrder;
    cognitoId?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    phoneNumber?: SortOrder;
  };

  export type ManagerSumOrderByAggregateInput = {
    id?: SortOrder;
  };

  export type InvestorCountOrderByAggregateInput = {
    id?: SortOrder;
    cognitoId?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    phoneNumber?: SortOrder;
  };

  export type InvestorAvgOrderByAggregateInput = {
    id?: SortOrder;
  };

  export type InvestorMaxOrderByAggregateInput = {
    id?: SortOrder;
    cognitoId?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    phoneNumber?: SortOrder;
  };

  export type InvestorMinOrderByAggregateInput = {
    id?: SortOrder;
    cognitoId?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    phoneNumber?: SortOrder;
  };

  export type InvestorSumOrderByAggregateInput = {
    id?: SortOrder;
  };

  export type LocationCountOrderByAggregateInput = {
    id?: SortOrder;
    address?: SortOrder;
    postalCode?: SortOrder;
    latitude?: SortOrder;
    longitude?: SortOrder;
  };

  export type LocationAvgOrderByAggregateInput = {
    id?: SortOrder;
    latitude?: SortOrder;
    longitude?: SortOrder;
  };

  export type LocationMaxOrderByAggregateInput = {
    id?: SortOrder;
    address?: SortOrder;
    postalCode?: SortOrder;
    latitude?: SortOrder;
    longitude?: SortOrder;
  };

  export type LocationMinOrderByAggregateInput = {
    id?: SortOrder;
    address?: SortOrder;
    postalCode?: SortOrder;
    latitude?: SortOrder;
    longitude?: SortOrder;
  };

  export type LocationSumOrderByAggregateInput = {
    id?: SortOrder;
    latitude?: SortOrder;
    longitude?: SortOrder;
  };

  export type EnumApplicationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumApplicationStatusFilter<$PrismaModel> | $Enums.ApplicationStatus;
  };

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type PropertyScalarRelationFilter = {
    is?: PropertyWhereInput;
    isNot?: PropertyWhereInput;
  };

  export type InvestorScalarRelationFilter = {
    is?: InvestorWhereInput;
    isNot?: InvestorWhereInput;
  };

  export type LeaseNullableScalarRelationFilter = {
    is?: LeaseWhereInput | null;
    isNot?: LeaseWhereInput | null;
  };

  export type ApplicationCountOrderByAggregateInput = {
    id?: SortOrder;
    applicationDate?: SortOrder;
    status?: SortOrder;
    propertyId?: SortOrder;
    investorCognitoId?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    phoneNumber?: SortOrder;
    message?: SortOrder;
    leaseId?: SortOrder;
  };

  export type ApplicationAvgOrderByAggregateInput = {
    id?: SortOrder;
    propertyId?: SortOrder;
    leaseId?: SortOrder;
  };

  export type ApplicationMaxOrderByAggregateInput = {
    id?: SortOrder;
    applicationDate?: SortOrder;
    status?: SortOrder;
    propertyId?: SortOrder;
    investorCognitoId?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    phoneNumber?: SortOrder;
    message?: SortOrder;
    leaseId?: SortOrder;
  };

  export type ApplicationMinOrderByAggregateInput = {
    id?: SortOrder;
    applicationDate?: SortOrder;
    status?: SortOrder;
    propertyId?: SortOrder;
    investorCognitoId?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    phoneNumber?: SortOrder;
    message?: SortOrder;
    leaseId?: SortOrder;
  };

  export type ApplicationSumOrderByAggregateInput = {
    id?: SortOrder;
    propertyId?: SortOrder;
    leaseId?: SortOrder;
  };

  export type EnumApplicationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumApplicationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ApplicationStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumApplicationStatusFilter<$PrismaModel>;
    _max?: NestedEnumApplicationStatusFilter<$PrismaModel>;
  };

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type ApplicationNullableScalarRelationFilter = {
    is?: ApplicationWhereInput | null;
    isNot?: ApplicationWhereInput | null;
  };

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput;
    some?: PaymentWhereInput;
    none?: PaymentWhereInput;
  };

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type LeaseCountOrderByAggregateInput = {
    id?: SortOrder;
    startDate?: SortOrder;
    endDate?: SortOrder;
    rent?: SortOrder;
    deposit?: SortOrder;
    propertyId?: SortOrder;
    investorCognitoId?: SortOrder;
  };

  export type LeaseAvgOrderByAggregateInput = {
    id?: SortOrder;
    rent?: SortOrder;
    deposit?: SortOrder;
    propertyId?: SortOrder;
  };

  export type LeaseMaxOrderByAggregateInput = {
    id?: SortOrder;
    startDate?: SortOrder;
    endDate?: SortOrder;
    rent?: SortOrder;
    deposit?: SortOrder;
    propertyId?: SortOrder;
    investorCognitoId?: SortOrder;
  };

  export type LeaseMinOrderByAggregateInput = {
    id?: SortOrder;
    startDate?: SortOrder;
    endDate?: SortOrder;
    rent?: SortOrder;
    deposit?: SortOrder;
    propertyId?: SortOrder;
    investorCognitoId?: SortOrder;
  };

  export type LeaseSumOrderByAggregateInput = {
    id?: SortOrder;
    rent?: SortOrder;
    deposit?: SortOrder;
    propertyId?: SortOrder;
  };

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus;
  };

  export type LeaseScalarRelationFilter = {
    is?: LeaseWhereInput;
    isNot?: LeaseWhereInput;
  };

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder;
    amountDue?: SortOrder;
    amountPaid?: SortOrder;
    dueDate?: SortOrder;
    paymentDate?: SortOrder;
    paymentStatus?: SortOrder;
    leaseId?: SortOrder;
  };

  export type PaymentAvgOrderByAggregateInput = {
    id?: SortOrder;
    amountDue?: SortOrder;
    amountPaid?: SortOrder;
    leaseId?: SortOrder;
  };

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder;
    amountDue?: SortOrder;
    amountPaid?: SortOrder;
    dueDate?: SortOrder;
    paymentDate?: SortOrder;
    paymentStatus?: SortOrder;
    leaseId?: SortOrder;
  };

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder;
    amountDue?: SortOrder;
    amountPaid?: SortOrder;
    dueDate?: SortOrder;
    paymentDate?: SortOrder;
    paymentStatus?: SortOrder;
    leaseId?: SortOrder;
  };

  export type PaymentSumOrderByAggregateInput = {
    id?: SortOrder;
    amountDue?: SortOrder;
    amountPaid?: SortOrder;
    leaseId?: SortOrder;
  };

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>;
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>;
  };

  export type PropertyCreatephotoUrlsInput = {
    set: string[];
  };

  export type LocationCreateNestedOneWithoutPropertiesInput = {
    create?: XOR<LocationCreateWithoutPropertiesInput, LocationUncheckedCreateWithoutPropertiesInput>;
    connectOrCreate?: LocationCreateOrConnectWithoutPropertiesInput;
    connect?: LocationWhereUniqueInput;
  };

  export type ManagerCreateNestedOneWithoutManagedPropertiesInput = {
    create?: XOR<ManagerCreateWithoutManagedPropertiesInput, ManagerUncheckedCreateWithoutManagedPropertiesInput>;
    connectOrCreate?: ManagerCreateOrConnectWithoutManagedPropertiesInput;
    connect?: ManagerWhereUniqueInput;
  };

  export type LeaseCreateNestedManyWithoutPropertyInput = {
    create?:
      | XOR<LeaseCreateWithoutPropertyInput, LeaseUncheckedCreateWithoutPropertyInput>
      | LeaseCreateWithoutPropertyInput[]
      | LeaseUncheckedCreateWithoutPropertyInput[];
    connectOrCreate?: LeaseCreateOrConnectWithoutPropertyInput | LeaseCreateOrConnectWithoutPropertyInput[];
    createMany?: LeaseCreateManyPropertyInputEnvelope;
    connect?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[];
  };

  export type ApplicationCreateNestedManyWithoutPropertyInput = {
    create?:
      | XOR<ApplicationCreateWithoutPropertyInput, ApplicationUncheckedCreateWithoutPropertyInput>
      | ApplicationCreateWithoutPropertyInput[]
      | ApplicationUncheckedCreateWithoutPropertyInput[];
    connectOrCreate?: ApplicationCreateOrConnectWithoutPropertyInput | ApplicationCreateOrConnectWithoutPropertyInput[];
    createMany?: ApplicationCreateManyPropertyInputEnvelope;
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[];
  };

  export type InvestorCreateNestedManyWithoutFavoritesInput = {
    create?:
      | XOR<InvestorCreateWithoutFavoritesInput, InvestorUncheckedCreateWithoutFavoritesInput>
      | InvestorCreateWithoutFavoritesInput[]
      | InvestorUncheckedCreateWithoutFavoritesInput[];
    connectOrCreate?: InvestorCreateOrConnectWithoutFavoritesInput | InvestorCreateOrConnectWithoutFavoritesInput[];
    connect?: InvestorWhereUniqueInput | InvestorWhereUniqueInput[];
  };

  export type InvestorCreateNestedManyWithoutPropertiesInput = {
    create?:
      | XOR<InvestorCreateWithoutPropertiesInput, InvestorUncheckedCreateWithoutPropertiesInput>
      | InvestorCreateWithoutPropertiesInput[]
      | InvestorUncheckedCreateWithoutPropertiesInput[];
    connectOrCreate?: InvestorCreateOrConnectWithoutPropertiesInput | InvestorCreateOrConnectWithoutPropertiesInput[];
    connect?: InvestorWhereUniqueInput | InvestorWhereUniqueInput[];
  };

  export type LeaseUncheckedCreateNestedManyWithoutPropertyInput = {
    create?:
      | XOR<LeaseCreateWithoutPropertyInput, LeaseUncheckedCreateWithoutPropertyInput>
      | LeaseCreateWithoutPropertyInput[]
      | LeaseUncheckedCreateWithoutPropertyInput[];
    connectOrCreate?: LeaseCreateOrConnectWithoutPropertyInput | LeaseCreateOrConnectWithoutPropertyInput[];
    createMany?: LeaseCreateManyPropertyInputEnvelope;
    connect?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[];
  };

  export type ApplicationUncheckedCreateNestedManyWithoutPropertyInput = {
    create?:
      | XOR<ApplicationCreateWithoutPropertyInput, ApplicationUncheckedCreateWithoutPropertyInput>
      | ApplicationCreateWithoutPropertyInput[]
      | ApplicationUncheckedCreateWithoutPropertyInput[];
    connectOrCreate?: ApplicationCreateOrConnectWithoutPropertyInput | ApplicationCreateOrConnectWithoutPropertyInput[];
    createMany?: ApplicationCreateManyPropertyInputEnvelope;
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[];
  };

  export type InvestorUncheckedCreateNestedManyWithoutFavoritesInput = {
    create?:
      | XOR<InvestorCreateWithoutFavoritesInput, InvestorUncheckedCreateWithoutFavoritesInput>
      | InvestorCreateWithoutFavoritesInput[]
      | InvestorUncheckedCreateWithoutFavoritesInput[];
    connectOrCreate?: InvestorCreateOrConnectWithoutFavoritesInput | InvestorCreateOrConnectWithoutFavoritesInput[];
    connect?: InvestorWhereUniqueInput | InvestorWhereUniqueInput[];
  };

  export type InvestorUncheckedCreateNestedManyWithoutPropertiesInput = {
    create?:
      | XOR<InvestorCreateWithoutPropertiesInput, InvestorUncheckedCreateWithoutPropertiesInput>
      | InvestorCreateWithoutPropertiesInput[]
      | InvestorUncheckedCreateWithoutPropertiesInput[];
    connectOrCreate?: InvestorCreateOrConnectWithoutPropertiesInput | InvestorCreateOrConnectWithoutPropertiesInput[];
    connect?: InvestorWhereUniqueInput | InvestorWhereUniqueInput[];
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type FloatFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type PropertyUpdatephotoUrlsInput = {
    set?: string[];
    push?: string | string[];
  };

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
  };

  export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type EnumPropertyTypeFieldUpdateOperationsInput = {
    set?: $Enums.PropertyType;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type LocationUpdateOneRequiredWithoutPropertiesNestedInput = {
    create?: XOR<LocationCreateWithoutPropertiesInput, LocationUncheckedCreateWithoutPropertiesInput>;
    connectOrCreate?: LocationCreateOrConnectWithoutPropertiesInput;
    upsert?: LocationUpsertWithoutPropertiesInput;
    connect?: LocationWhereUniqueInput;
    update?: XOR<
      XOR<LocationUpdateToOneWithWhereWithoutPropertiesInput, LocationUpdateWithoutPropertiesInput>,
      LocationUncheckedUpdateWithoutPropertiesInput
    >;
  };

  export type ManagerUpdateOneRequiredWithoutManagedPropertiesNestedInput = {
    create?: XOR<ManagerCreateWithoutManagedPropertiesInput, ManagerUncheckedCreateWithoutManagedPropertiesInput>;
    connectOrCreate?: ManagerCreateOrConnectWithoutManagedPropertiesInput;
    upsert?: ManagerUpsertWithoutManagedPropertiesInput;
    connect?: ManagerWhereUniqueInput;
    update?: XOR<
      XOR<ManagerUpdateToOneWithWhereWithoutManagedPropertiesInput, ManagerUpdateWithoutManagedPropertiesInput>,
      ManagerUncheckedUpdateWithoutManagedPropertiesInput
    >;
  };

  export type LeaseUpdateManyWithoutPropertyNestedInput = {
    create?:
      | XOR<LeaseCreateWithoutPropertyInput, LeaseUncheckedCreateWithoutPropertyInput>
      | LeaseCreateWithoutPropertyInput[]
      | LeaseUncheckedCreateWithoutPropertyInput[];
    connectOrCreate?: LeaseCreateOrConnectWithoutPropertyInput | LeaseCreateOrConnectWithoutPropertyInput[];
    upsert?: LeaseUpsertWithWhereUniqueWithoutPropertyInput | LeaseUpsertWithWhereUniqueWithoutPropertyInput[];
    createMany?: LeaseCreateManyPropertyInputEnvelope;
    set?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[];
    disconnect?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[];
    delete?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[];
    connect?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[];
    update?: LeaseUpdateWithWhereUniqueWithoutPropertyInput | LeaseUpdateWithWhereUniqueWithoutPropertyInput[];
    updateMany?: LeaseUpdateManyWithWhereWithoutPropertyInput | LeaseUpdateManyWithWhereWithoutPropertyInput[];
    deleteMany?: LeaseScalarWhereInput | LeaseScalarWhereInput[];
  };

  export type ApplicationUpdateManyWithoutPropertyNestedInput = {
    create?:
      | XOR<ApplicationCreateWithoutPropertyInput, ApplicationUncheckedCreateWithoutPropertyInput>
      | ApplicationCreateWithoutPropertyInput[]
      | ApplicationUncheckedCreateWithoutPropertyInput[];
    connectOrCreate?: ApplicationCreateOrConnectWithoutPropertyInput | ApplicationCreateOrConnectWithoutPropertyInput[];
    upsert?:
      | ApplicationUpsertWithWhereUniqueWithoutPropertyInput
      | ApplicationUpsertWithWhereUniqueWithoutPropertyInput[];
    createMany?: ApplicationCreateManyPropertyInputEnvelope;
    set?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[];
    disconnect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[];
    delete?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[];
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[];
    update?:
      | ApplicationUpdateWithWhereUniqueWithoutPropertyInput
      | ApplicationUpdateWithWhereUniqueWithoutPropertyInput[];
    updateMany?:
      | ApplicationUpdateManyWithWhereWithoutPropertyInput
      | ApplicationUpdateManyWithWhereWithoutPropertyInput[];
    deleteMany?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[];
  };

  export type InvestorUpdateManyWithoutFavoritesNestedInput = {
    create?:
      | XOR<InvestorCreateWithoutFavoritesInput, InvestorUncheckedCreateWithoutFavoritesInput>
      | InvestorCreateWithoutFavoritesInput[]
      | InvestorUncheckedCreateWithoutFavoritesInput[];
    connectOrCreate?: InvestorCreateOrConnectWithoutFavoritesInput | InvestorCreateOrConnectWithoutFavoritesInput[];
    upsert?: InvestorUpsertWithWhereUniqueWithoutFavoritesInput | InvestorUpsertWithWhereUniqueWithoutFavoritesInput[];
    set?: InvestorWhereUniqueInput | InvestorWhereUniqueInput[];
    disconnect?: InvestorWhereUniqueInput | InvestorWhereUniqueInput[];
    delete?: InvestorWhereUniqueInput | InvestorWhereUniqueInput[];
    connect?: InvestorWhereUniqueInput | InvestorWhereUniqueInput[];
    update?: InvestorUpdateWithWhereUniqueWithoutFavoritesInput | InvestorUpdateWithWhereUniqueWithoutFavoritesInput[];
    updateMany?: InvestorUpdateManyWithWhereWithoutFavoritesInput | InvestorUpdateManyWithWhereWithoutFavoritesInput[];
    deleteMany?: InvestorScalarWhereInput | InvestorScalarWhereInput[];
  };

  export type InvestorUpdateManyWithoutPropertiesNestedInput = {
    create?:
      | XOR<InvestorCreateWithoutPropertiesInput, InvestorUncheckedCreateWithoutPropertiesInput>
      | InvestorCreateWithoutPropertiesInput[]
      | InvestorUncheckedCreateWithoutPropertiesInput[];
    connectOrCreate?: InvestorCreateOrConnectWithoutPropertiesInput | InvestorCreateOrConnectWithoutPropertiesInput[];
    upsert?:
      | InvestorUpsertWithWhereUniqueWithoutPropertiesInput
      | InvestorUpsertWithWhereUniqueWithoutPropertiesInput[];
    set?: InvestorWhereUniqueInput | InvestorWhereUniqueInput[];
    disconnect?: InvestorWhereUniqueInput | InvestorWhereUniqueInput[];
    delete?: InvestorWhereUniqueInput | InvestorWhereUniqueInput[];
    connect?: InvestorWhereUniqueInput | InvestorWhereUniqueInput[];
    update?:
      | InvestorUpdateWithWhereUniqueWithoutPropertiesInput
      | InvestorUpdateWithWhereUniqueWithoutPropertiesInput[];
    updateMany?:
      | InvestorUpdateManyWithWhereWithoutPropertiesInput
      | InvestorUpdateManyWithWhereWithoutPropertiesInput[];
    deleteMany?: InvestorScalarWhereInput | InvestorScalarWhereInput[];
  };

  export type LeaseUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?:
      | XOR<LeaseCreateWithoutPropertyInput, LeaseUncheckedCreateWithoutPropertyInput>
      | LeaseCreateWithoutPropertyInput[]
      | LeaseUncheckedCreateWithoutPropertyInput[];
    connectOrCreate?: LeaseCreateOrConnectWithoutPropertyInput | LeaseCreateOrConnectWithoutPropertyInput[];
    upsert?: LeaseUpsertWithWhereUniqueWithoutPropertyInput | LeaseUpsertWithWhereUniqueWithoutPropertyInput[];
    createMany?: LeaseCreateManyPropertyInputEnvelope;
    set?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[];
    disconnect?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[];
    delete?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[];
    connect?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[];
    update?: LeaseUpdateWithWhereUniqueWithoutPropertyInput | LeaseUpdateWithWhereUniqueWithoutPropertyInput[];
    updateMany?: LeaseUpdateManyWithWhereWithoutPropertyInput | LeaseUpdateManyWithWhereWithoutPropertyInput[];
    deleteMany?: LeaseScalarWhereInput | LeaseScalarWhereInput[];
  };

  export type ApplicationUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?:
      | XOR<ApplicationCreateWithoutPropertyInput, ApplicationUncheckedCreateWithoutPropertyInput>
      | ApplicationCreateWithoutPropertyInput[]
      | ApplicationUncheckedCreateWithoutPropertyInput[];
    connectOrCreate?: ApplicationCreateOrConnectWithoutPropertyInput | ApplicationCreateOrConnectWithoutPropertyInput[];
    upsert?:
      | ApplicationUpsertWithWhereUniqueWithoutPropertyInput
      | ApplicationUpsertWithWhereUniqueWithoutPropertyInput[];
    createMany?: ApplicationCreateManyPropertyInputEnvelope;
    set?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[];
    disconnect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[];
    delete?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[];
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[];
    update?:
      | ApplicationUpdateWithWhereUniqueWithoutPropertyInput
      | ApplicationUpdateWithWhereUniqueWithoutPropertyInput[];
    updateMany?:
      | ApplicationUpdateManyWithWhereWithoutPropertyInput
      | ApplicationUpdateManyWithWhereWithoutPropertyInput[];
    deleteMany?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[];
  };

  export type InvestorUncheckedUpdateManyWithoutFavoritesNestedInput = {
    create?:
      | XOR<InvestorCreateWithoutFavoritesInput, InvestorUncheckedCreateWithoutFavoritesInput>
      | InvestorCreateWithoutFavoritesInput[]
      | InvestorUncheckedCreateWithoutFavoritesInput[];
    connectOrCreate?: InvestorCreateOrConnectWithoutFavoritesInput | InvestorCreateOrConnectWithoutFavoritesInput[];
    upsert?: InvestorUpsertWithWhereUniqueWithoutFavoritesInput | InvestorUpsertWithWhereUniqueWithoutFavoritesInput[];
    set?: InvestorWhereUniqueInput | InvestorWhereUniqueInput[];
    disconnect?: InvestorWhereUniqueInput | InvestorWhereUniqueInput[];
    delete?: InvestorWhereUniqueInput | InvestorWhereUniqueInput[];
    connect?: InvestorWhereUniqueInput | InvestorWhereUniqueInput[];
    update?: InvestorUpdateWithWhereUniqueWithoutFavoritesInput | InvestorUpdateWithWhereUniqueWithoutFavoritesInput[];
    updateMany?: InvestorUpdateManyWithWhereWithoutFavoritesInput | InvestorUpdateManyWithWhereWithoutFavoritesInput[];
    deleteMany?: InvestorScalarWhereInput | InvestorScalarWhereInput[];
  };

  export type InvestorUncheckedUpdateManyWithoutPropertiesNestedInput = {
    create?:
      | XOR<InvestorCreateWithoutPropertiesInput, InvestorUncheckedCreateWithoutPropertiesInput>
      | InvestorCreateWithoutPropertiesInput[]
      | InvestorUncheckedCreateWithoutPropertiesInput[];
    connectOrCreate?: InvestorCreateOrConnectWithoutPropertiesInput | InvestorCreateOrConnectWithoutPropertiesInput[];
    upsert?:
      | InvestorUpsertWithWhereUniqueWithoutPropertiesInput
      | InvestorUpsertWithWhereUniqueWithoutPropertiesInput[];
    set?: InvestorWhereUniqueInput | InvestorWhereUniqueInput[];
    disconnect?: InvestorWhereUniqueInput | InvestorWhereUniqueInput[];
    delete?: InvestorWhereUniqueInput | InvestorWhereUniqueInput[];
    connect?: InvestorWhereUniqueInput | InvestorWhereUniqueInput[];
    update?:
      | InvestorUpdateWithWhereUniqueWithoutPropertiesInput
      | InvestorUpdateWithWhereUniqueWithoutPropertiesInput[];
    updateMany?:
      | InvestorUpdateManyWithWhereWithoutPropertiesInput
      | InvestorUpdateManyWithWhereWithoutPropertiesInput[];
    deleteMany?: InvestorScalarWhereInput | InvestorScalarWhereInput[];
  };

  export type PropertyCreateNestedManyWithoutManagerInput = {
    create?:
      | XOR<PropertyCreateWithoutManagerInput, PropertyUncheckedCreateWithoutManagerInput>
      | PropertyCreateWithoutManagerInput[]
      | PropertyUncheckedCreateWithoutManagerInput[];
    connectOrCreate?: PropertyCreateOrConnectWithoutManagerInput | PropertyCreateOrConnectWithoutManagerInput[];
    createMany?: PropertyCreateManyManagerInputEnvelope;
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
  };

  export type PropertyUncheckedCreateNestedManyWithoutManagerInput = {
    create?:
      | XOR<PropertyCreateWithoutManagerInput, PropertyUncheckedCreateWithoutManagerInput>
      | PropertyCreateWithoutManagerInput[]
      | PropertyUncheckedCreateWithoutManagerInput[];
    connectOrCreate?: PropertyCreateOrConnectWithoutManagerInput | PropertyCreateOrConnectWithoutManagerInput[];
    createMany?: PropertyCreateManyManagerInputEnvelope;
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
  };

  export type PropertyUpdateManyWithoutManagerNestedInput = {
    create?:
      | XOR<PropertyCreateWithoutManagerInput, PropertyUncheckedCreateWithoutManagerInput>
      | PropertyCreateWithoutManagerInput[]
      | PropertyUncheckedCreateWithoutManagerInput[];
    connectOrCreate?: PropertyCreateOrConnectWithoutManagerInput | PropertyCreateOrConnectWithoutManagerInput[];
    upsert?: PropertyUpsertWithWhereUniqueWithoutManagerInput | PropertyUpsertWithWhereUniqueWithoutManagerInput[];
    createMany?: PropertyCreateManyManagerInputEnvelope;
    set?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
    disconnect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
    delete?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
    update?: PropertyUpdateWithWhereUniqueWithoutManagerInput | PropertyUpdateWithWhereUniqueWithoutManagerInput[];
    updateMany?: PropertyUpdateManyWithWhereWithoutManagerInput | PropertyUpdateManyWithWhereWithoutManagerInput[];
    deleteMany?: PropertyScalarWhereInput | PropertyScalarWhereInput[];
  };

  export type PropertyUncheckedUpdateManyWithoutManagerNestedInput = {
    create?:
      | XOR<PropertyCreateWithoutManagerInput, PropertyUncheckedCreateWithoutManagerInput>
      | PropertyCreateWithoutManagerInput[]
      | PropertyUncheckedCreateWithoutManagerInput[];
    connectOrCreate?: PropertyCreateOrConnectWithoutManagerInput | PropertyCreateOrConnectWithoutManagerInput[];
    upsert?: PropertyUpsertWithWhereUniqueWithoutManagerInput | PropertyUpsertWithWhereUniqueWithoutManagerInput[];
    createMany?: PropertyCreateManyManagerInputEnvelope;
    set?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
    disconnect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
    delete?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
    update?: PropertyUpdateWithWhereUniqueWithoutManagerInput | PropertyUpdateWithWhereUniqueWithoutManagerInput[];
    updateMany?: PropertyUpdateManyWithWhereWithoutManagerInput | PropertyUpdateManyWithWhereWithoutManagerInput[];
    deleteMany?: PropertyScalarWhereInput | PropertyScalarWhereInput[];
  };

  export type PropertyCreateNestedManyWithoutInvestorsInput = {
    create?:
      | XOR<PropertyCreateWithoutInvestorsInput, PropertyUncheckedCreateWithoutInvestorsInput>
      | PropertyCreateWithoutInvestorsInput[]
      | PropertyUncheckedCreateWithoutInvestorsInput[];
    connectOrCreate?: PropertyCreateOrConnectWithoutInvestorsInput | PropertyCreateOrConnectWithoutInvestorsInput[];
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
  };

  export type PropertyCreateNestedManyWithoutFavoritedByInput = {
    create?:
      | XOR<PropertyCreateWithoutFavoritedByInput, PropertyUncheckedCreateWithoutFavoritedByInput>
      | PropertyCreateWithoutFavoritedByInput[]
      | PropertyUncheckedCreateWithoutFavoritedByInput[];
    connectOrCreate?: PropertyCreateOrConnectWithoutFavoritedByInput | PropertyCreateOrConnectWithoutFavoritedByInput[];
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
  };

  export type ApplicationCreateNestedManyWithoutInvestorInput = {
    create?:
      | XOR<ApplicationCreateWithoutInvestorInput, ApplicationUncheckedCreateWithoutInvestorInput>
      | ApplicationCreateWithoutInvestorInput[]
      | ApplicationUncheckedCreateWithoutInvestorInput[];
    connectOrCreate?: ApplicationCreateOrConnectWithoutInvestorInput | ApplicationCreateOrConnectWithoutInvestorInput[];
    createMany?: ApplicationCreateManyInvestorInputEnvelope;
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[];
  };

  export type LeaseCreateNestedManyWithoutInvestorInput = {
    create?:
      | XOR<LeaseCreateWithoutInvestorInput, LeaseUncheckedCreateWithoutInvestorInput>
      | LeaseCreateWithoutInvestorInput[]
      | LeaseUncheckedCreateWithoutInvestorInput[];
    connectOrCreate?: LeaseCreateOrConnectWithoutInvestorInput | LeaseCreateOrConnectWithoutInvestorInput[];
    createMany?: LeaseCreateManyInvestorInputEnvelope;
    connect?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[];
  };

  export type PropertyUncheckedCreateNestedManyWithoutInvestorsInput = {
    create?:
      | XOR<PropertyCreateWithoutInvestorsInput, PropertyUncheckedCreateWithoutInvestorsInput>
      | PropertyCreateWithoutInvestorsInput[]
      | PropertyUncheckedCreateWithoutInvestorsInput[];
    connectOrCreate?: PropertyCreateOrConnectWithoutInvestorsInput | PropertyCreateOrConnectWithoutInvestorsInput[];
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
  };

  export type PropertyUncheckedCreateNestedManyWithoutFavoritedByInput = {
    create?:
      | XOR<PropertyCreateWithoutFavoritedByInput, PropertyUncheckedCreateWithoutFavoritedByInput>
      | PropertyCreateWithoutFavoritedByInput[]
      | PropertyUncheckedCreateWithoutFavoritedByInput[];
    connectOrCreate?: PropertyCreateOrConnectWithoutFavoritedByInput | PropertyCreateOrConnectWithoutFavoritedByInput[];
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
  };

  export type ApplicationUncheckedCreateNestedManyWithoutInvestorInput = {
    create?:
      | XOR<ApplicationCreateWithoutInvestorInput, ApplicationUncheckedCreateWithoutInvestorInput>
      | ApplicationCreateWithoutInvestorInput[]
      | ApplicationUncheckedCreateWithoutInvestorInput[];
    connectOrCreate?: ApplicationCreateOrConnectWithoutInvestorInput | ApplicationCreateOrConnectWithoutInvestorInput[];
    createMany?: ApplicationCreateManyInvestorInputEnvelope;
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[];
  };

  export type LeaseUncheckedCreateNestedManyWithoutInvestorInput = {
    create?:
      | XOR<LeaseCreateWithoutInvestorInput, LeaseUncheckedCreateWithoutInvestorInput>
      | LeaseCreateWithoutInvestorInput[]
      | LeaseUncheckedCreateWithoutInvestorInput[];
    connectOrCreate?: LeaseCreateOrConnectWithoutInvestorInput | LeaseCreateOrConnectWithoutInvestorInput[];
    createMany?: LeaseCreateManyInvestorInputEnvelope;
    connect?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[];
  };

  export type PropertyUpdateManyWithoutInvestorsNestedInput = {
    create?:
      | XOR<PropertyCreateWithoutInvestorsInput, PropertyUncheckedCreateWithoutInvestorsInput>
      | PropertyCreateWithoutInvestorsInput[]
      | PropertyUncheckedCreateWithoutInvestorsInput[];
    connectOrCreate?: PropertyCreateOrConnectWithoutInvestorsInput | PropertyCreateOrConnectWithoutInvestorsInput[];
    upsert?: PropertyUpsertWithWhereUniqueWithoutInvestorsInput | PropertyUpsertWithWhereUniqueWithoutInvestorsInput[];
    set?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
    disconnect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
    delete?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
    update?: PropertyUpdateWithWhereUniqueWithoutInvestorsInput | PropertyUpdateWithWhereUniqueWithoutInvestorsInput[];
    updateMany?: PropertyUpdateManyWithWhereWithoutInvestorsInput | PropertyUpdateManyWithWhereWithoutInvestorsInput[];
    deleteMany?: PropertyScalarWhereInput | PropertyScalarWhereInput[];
  };

  export type PropertyUpdateManyWithoutFavoritedByNestedInput = {
    create?:
      | XOR<PropertyCreateWithoutFavoritedByInput, PropertyUncheckedCreateWithoutFavoritedByInput>
      | PropertyCreateWithoutFavoritedByInput[]
      | PropertyUncheckedCreateWithoutFavoritedByInput[];
    connectOrCreate?: PropertyCreateOrConnectWithoutFavoritedByInput | PropertyCreateOrConnectWithoutFavoritedByInput[];
    upsert?:
      | PropertyUpsertWithWhereUniqueWithoutFavoritedByInput
      | PropertyUpsertWithWhereUniqueWithoutFavoritedByInput[];
    set?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
    disconnect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
    delete?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
    update?:
      | PropertyUpdateWithWhereUniqueWithoutFavoritedByInput
      | PropertyUpdateWithWhereUniqueWithoutFavoritedByInput[];
    updateMany?:
      | PropertyUpdateManyWithWhereWithoutFavoritedByInput
      | PropertyUpdateManyWithWhereWithoutFavoritedByInput[];
    deleteMany?: PropertyScalarWhereInput | PropertyScalarWhereInput[];
  };

  export type ApplicationUpdateManyWithoutInvestorNestedInput = {
    create?:
      | XOR<ApplicationCreateWithoutInvestorInput, ApplicationUncheckedCreateWithoutInvestorInput>
      | ApplicationCreateWithoutInvestorInput[]
      | ApplicationUncheckedCreateWithoutInvestorInput[];
    connectOrCreate?: ApplicationCreateOrConnectWithoutInvestorInput | ApplicationCreateOrConnectWithoutInvestorInput[];
    upsert?:
      | ApplicationUpsertWithWhereUniqueWithoutInvestorInput
      | ApplicationUpsertWithWhereUniqueWithoutInvestorInput[];
    createMany?: ApplicationCreateManyInvestorInputEnvelope;
    set?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[];
    disconnect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[];
    delete?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[];
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[];
    update?:
      | ApplicationUpdateWithWhereUniqueWithoutInvestorInput
      | ApplicationUpdateWithWhereUniqueWithoutInvestorInput[];
    updateMany?:
      | ApplicationUpdateManyWithWhereWithoutInvestorInput
      | ApplicationUpdateManyWithWhereWithoutInvestorInput[];
    deleteMany?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[];
  };

  export type LeaseUpdateManyWithoutInvestorNestedInput = {
    create?:
      | XOR<LeaseCreateWithoutInvestorInput, LeaseUncheckedCreateWithoutInvestorInput>
      | LeaseCreateWithoutInvestorInput[]
      | LeaseUncheckedCreateWithoutInvestorInput[];
    connectOrCreate?: LeaseCreateOrConnectWithoutInvestorInput | LeaseCreateOrConnectWithoutInvestorInput[];
    upsert?: LeaseUpsertWithWhereUniqueWithoutInvestorInput | LeaseUpsertWithWhereUniqueWithoutInvestorInput[];
    createMany?: LeaseCreateManyInvestorInputEnvelope;
    set?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[];
    disconnect?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[];
    delete?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[];
    connect?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[];
    update?: LeaseUpdateWithWhereUniqueWithoutInvestorInput | LeaseUpdateWithWhereUniqueWithoutInvestorInput[];
    updateMany?: LeaseUpdateManyWithWhereWithoutInvestorInput | LeaseUpdateManyWithWhereWithoutInvestorInput[];
    deleteMany?: LeaseScalarWhereInput | LeaseScalarWhereInput[];
  };

  export type PropertyUncheckedUpdateManyWithoutInvestorsNestedInput = {
    create?:
      | XOR<PropertyCreateWithoutInvestorsInput, PropertyUncheckedCreateWithoutInvestorsInput>
      | PropertyCreateWithoutInvestorsInput[]
      | PropertyUncheckedCreateWithoutInvestorsInput[];
    connectOrCreate?: PropertyCreateOrConnectWithoutInvestorsInput | PropertyCreateOrConnectWithoutInvestorsInput[];
    upsert?: PropertyUpsertWithWhereUniqueWithoutInvestorsInput | PropertyUpsertWithWhereUniqueWithoutInvestorsInput[];
    set?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
    disconnect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
    delete?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
    update?: PropertyUpdateWithWhereUniqueWithoutInvestorsInput | PropertyUpdateWithWhereUniqueWithoutInvestorsInput[];
    updateMany?: PropertyUpdateManyWithWhereWithoutInvestorsInput | PropertyUpdateManyWithWhereWithoutInvestorsInput[];
    deleteMany?: PropertyScalarWhereInput | PropertyScalarWhereInput[];
  };

  export type PropertyUncheckedUpdateManyWithoutFavoritedByNestedInput = {
    create?:
      | XOR<PropertyCreateWithoutFavoritedByInput, PropertyUncheckedCreateWithoutFavoritedByInput>
      | PropertyCreateWithoutFavoritedByInput[]
      | PropertyUncheckedCreateWithoutFavoritedByInput[];
    connectOrCreate?: PropertyCreateOrConnectWithoutFavoritedByInput | PropertyCreateOrConnectWithoutFavoritedByInput[];
    upsert?:
      | PropertyUpsertWithWhereUniqueWithoutFavoritedByInput
      | PropertyUpsertWithWhereUniqueWithoutFavoritedByInput[];
    set?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
    disconnect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
    delete?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
    update?:
      | PropertyUpdateWithWhereUniqueWithoutFavoritedByInput
      | PropertyUpdateWithWhereUniqueWithoutFavoritedByInput[];
    updateMany?:
      | PropertyUpdateManyWithWhereWithoutFavoritedByInput
      | PropertyUpdateManyWithWhereWithoutFavoritedByInput[];
    deleteMany?: PropertyScalarWhereInput | PropertyScalarWhereInput[];
  };

  export type ApplicationUncheckedUpdateManyWithoutInvestorNestedInput = {
    create?:
      | XOR<ApplicationCreateWithoutInvestorInput, ApplicationUncheckedCreateWithoutInvestorInput>
      | ApplicationCreateWithoutInvestorInput[]
      | ApplicationUncheckedCreateWithoutInvestorInput[];
    connectOrCreate?: ApplicationCreateOrConnectWithoutInvestorInput | ApplicationCreateOrConnectWithoutInvestorInput[];
    upsert?:
      | ApplicationUpsertWithWhereUniqueWithoutInvestorInput
      | ApplicationUpsertWithWhereUniqueWithoutInvestorInput[];
    createMany?: ApplicationCreateManyInvestorInputEnvelope;
    set?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[];
    disconnect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[];
    delete?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[];
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[];
    update?:
      | ApplicationUpdateWithWhereUniqueWithoutInvestorInput
      | ApplicationUpdateWithWhereUniqueWithoutInvestorInput[];
    updateMany?:
      | ApplicationUpdateManyWithWhereWithoutInvestorInput
      | ApplicationUpdateManyWithWhereWithoutInvestorInput[];
    deleteMany?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[];
  };

  export type LeaseUncheckedUpdateManyWithoutInvestorNestedInput = {
    create?:
      | XOR<LeaseCreateWithoutInvestorInput, LeaseUncheckedCreateWithoutInvestorInput>
      | LeaseCreateWithoutInvestorInput[]
      | LeaseUncheckedCreateWithoutInvestorInput[];
    connectOrCreate?: LeaseCreateOrConnectWithoutInvestorInput | LeaseCreateOrConnectWithoutInvestorInput[];
    upsert?: LeaseUpsertWithWhereUniqueWithoutInvestorInput | LeaseUpsertWithWhereUniqueWithoutInvestorInput[];
    createMany?: LeaseCreateManyInvestorInputEnvelope;
    set?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[];
    disconnect?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[];
    delete?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[];
    connect?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[];
    update?: LeaseUpdateWithWhereUniqueWithoutInvestorInput | LeaseUpdateWithWhereUniqueWithoutInvestorInput[];
    updateMany?: LeaseUpdateManyWithWhereWithoutInvestorInput | LeaseUpdateManyWithWhereWithoutInvestorInput[];
    deleteMany?: LeaseScalarWhereInput | LeaseScalarWhereInput[];
  };

  export type PropertyCreateNestedManyWithoutLocationInput = {
    create?:
      | XOR<PropertyCreateWithoutLocationInput, PropertyUncheckedCreateWithoutLocationInput>
      | PropertyCreateWithoutLocationInput[]
      | PropertyUncheckedCreateWithoutLocationInput[];
    connectOrCreate?: PropertyCreateOrConnectWithoutLocationInput | PropertyCreateOrConnectWithoutLocationInput[];
    createMany?: PropertyCreateManyLocationInputEnvelope;
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
  };

  export type PropertyUncheckedCreateNestedManyWithoutLocationInput = {
    create?:
      | XOR<PropertyCreateWithoutLocationInput, PropertyUncheckedCreateWithoutLocationInput>
      | PropertyCreateWithoutLocationInput[]
      | PropertyUncheckedCreateWithoutLocationInput[];
    connectOrCreate?: PropertyCreateOrConnectWithoutLocationInput | PropertyCreateOrConnectWithoutLocationInput[];
    createMany?: PropertyCreateManyLocationInputEnvelope;
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
  };

  export type PropertyUpdateManyWithoutLocationNestedInput = {
    create?:
      | XOR<PropertyCreateWithoutLocationInput, PropertyUncheckedCreateWithoutLocationInput>
      | PropertyCreateWithoutLocationInput[]
      | PropertyUncheckedCreateWithoutLocationInput[];
    connectOrCreate?: PropertyCreateOrConnectWithoutLocationInput | PropertyCreateOrConnectWithoutLocationInput[];
    upsert?: PropertyUpsertWithWhereUniqueWithoutLocationInput | PropertyUpsertWithWhereUniqueWithoutLocationInput[];
    createMany?: PropertyCreateManyLocationInputEnvelope;
    set?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
    disconnect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
    delete?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
    update?: PropertyUpdateWithWhereUniqueWithoutLocationInput | PropertyUpdateWithWhereUniqueWithoutLocationInput[];
    updateMany?: PropertyUpdateManyWithWhereWithoutLocationInput | PropertyUpdateManyWithWhereWithoutLocationInput[];
    deleteMany?: PropertyScalarWhereInput | PropertyScalarWhereInput[];
  };

  export type PropertyUncheckedUpdateManyWithoutLocationNestedInput = {
    create?:
      | XOR<PropertyCreateWithoutLocationInput, PropertyUncheckedCreateWithoutLocationInput>
      | PropertyCreateWithoutLocationInput[]
      | PropertyUncheckedCreateWithoutLocationInput[];
    connectOrCreate?: PropertyCreateOrConnectWithoutLocationInput | PropertyCreateOrConnectWithoutLocationInput[];
    upsert?: PropertyUpsertWithWhereUniqueWithoutLocationInput | PropertyUpsertWithWhereUniqueWithoutLocationInput[];
    createMany?: PropertyCreateManyLocationInputEnvelope;
    set?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
    disconnect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
    delete?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[];
    update?: PropertyUpdateWithWhereUniqueWithoutLocationInput | PropertyUpdateWithWhereUniqueWithoutLocationInput[];
    updateMany?: PropertyUpdateManyWithWhereWithoutLocationInput | PropertyUpdateManyWithWhereWithoutLocationInput[];
    deleteMany?: PropertyScalarWhereInput | PropertyScalarWhereInput[];
  };

  export type PropertyCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<PropertyCreateWithoutApplicationsInput, PropertyUncheckedCreateWithoutApplicationsInput>;
    connectOrCreate?: PropertyCreateOrConnectWithoutApplicationsInput;
    connect?: PropertyWhereUniqueInput;
  };

  export type InvestorCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<InvestorCreateWithoutApplicationsInput, InvestorUncheckedCreateWithoutApplicationsInput>;
    connectOrCreate?: InvestorCreateOrConnectWithoutApplicationsInput;
    connect?: InvestorWhereUniqueInput;
  };

  export type LeaseCreateNestedOneWithoutApplicationInput = {
    create?: XOR<LeaseCreateWithoutApplicationInput, LeaseUncheckedCreateWithoutApplicationInput>;
    connectOrCreate?: LeaseCreateOrConnectWithoutApplicationInput;
    connect?: LeaseWhereUniqueInput;
  };

  export type EnumApplicationStatusFieldUpdateOperationsInput = {
    set?: $Enums.ApplicationStatus;
  };

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
  };

  export type PropertyUpdateOneRequiredWithoutApplicationsNestedInput = {
    create?: XOR<PropertyCreateWithoutApplicationsInput, PropertyUncheckedCreateWithoutApplicationsInput>;
    connectOrCreate?: PropertyCreateOrConnectWithoutApplicationsInput;
    upsert?: PropertyUpsertWithoutApplicationsInput;
    connect?: PropertyWhereUniqueInput;
    update?: XOR<
      XOR<PropertyUpdateToOneWithWhereWithoutApplicationsInput, PropertyUpdateWithoutApplicationsInput>,
      PropertyUncheckedUpdateWithoutApplicationsInput
    >;
  };

  export type InvestorUpdateOneRequiredWithoutApplicationsNestedInput = {
    create?: XOR<InvestorCreateWithoutApplicationsInput, InvestorUncheckedCreateWithoutApplicationsInput>;
    connectOrCreate?: InvestorCreateOrConnectWithoutApplicationsInput;
    upsert?: InvestorUpsertWithoutApplicationsInput;
    connect?: InvestorWhereUniqueInput;
    update?: XOR<
      XOR<InvestorUpdateToOneWithWhereWithoutApplicationsInput, InvestorUpdateWithoutApplicationsInput>,
      InvestorUncheckedUpdateWithoutApplicationsInput
    >;
  };

  export type LeaseUpdateOneWithoutApplicationNestedInput = {
    create?: XOR<LeaseCreateWithoutApplicationInput, LeaseUncheckedCreateWithoutApplicationInput>;
    connectOrCreate?: LeaseCreateOrConnectWithoutApplicationInput;
    upsert?: LeaseUpsertWithoutApplicationInput;
    disconnect?: LeaseWhereInput | boolean;
    delete?: LeaseWhereInput | boolean;
    connect?: LeaseWhereUniqueInput;
    update?: XOR<
      XOR<LeaseUpdateToOneWithWhereWithoutApplicationInput, LeaseUpdateWithoutApplicationInput>,
      LeaseUncheckedUpdateWithoutApplicationInput
    >;
  };

  export type PropertyCreateNestedOneWithoutLeasesInput = {
    create?: XOR<PropertyCreateWithoutLeasesInput, PropertyUncheckedCreateWithoutLeasesInput>;
    connectOrCreate?: PropertyCreateOrConnectWithoutLeasesInput;
    connect?: PropertyWhereUniqueInput;
  };

  export type InvestorCreateNestedOneWithoutLeasesInput = {
    create?: XOR<InvestorCreateWithoutLeasesInput, InvestorUncheckedCreateWithoutLeasesInput>;
    connectOrCreate?: InvestorCreateOrConnectWithoutLeasesInput;
    connect?: InvestorWhereUniqueInput;
  };

  export type ApplicationCreateNestedOneWithoutLeaseInput = {
    create?: XOR<ApplicationCreateWithoutLeaseInput, ApplicationUncheckedCreateWithoutLeaseInput>;
    connectOrCreate?: ApplicationCreateOrConnectWithoutLeaseInput;
    connect?: ApplicationWhereUniqueInput;
  };

  export type PaymentCreateNestedManyWithoutLeaseInput = {
    create?:
      | XOR<PaymentCreateWithoutLeaseInput, PaymentUncheckedCreateWithoutLeaseInput>
      | PaymentCreateWithoutLeaseInput[]
      | PaymentUncheckedCreateWithoutLeaseInput[];
    connectOrCreate?: PaymentCreateOrConnectWithoutLeaseInput | PaymentCreateOrConnectWithoutLeaseInput[];
    createMany?: PaymentCreateManyLeaseInputEnvelope;
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[];
  };

  export type ApplicationUncheckedCreateNestedOneWithoutLeaseInput = {
    create?: XOR<ApplicationCreateWithoutLeaseInput, ApplicationUncheckedCreateWithoutLeaseInput>;
    connectOrCreate?: ApplicationCreateOrConnectWithoutLeaseInput;
    connect?: ApplicationWhereUniqueInput;
  };

  export type PaymentUncheckedCreateNestedManyWithoutLeaseInput = {
    create?:
      | XOR<PaymentCreateWithoutLeaseInput, PaymentUncheckedCreateWithoutLeaseInput>
      | PaymentCreateWithoutLeaseInput[]
      | PaymentUncheckedCreateWithoutLeaseInput[];
    connectOrCreate?: PaymentCreateOrConnectWithoutLeaseInput | PaymentCreateOrConnectWithoutLeaseInput[];
    createMany?: PaymentCreateManyLeaseInputEnvelope;
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[];
  };

  export type PropertyUpdateOneRequiredWithoutLeasesNestedInput = {
    create?: XOR<PropertyCreateWithoutLeasesInput, PropertyUncheckedCreateWithoutLeasesInput>;
    connectOrCreate?: PropertyCreateOrConnectWithoutLeasesInput;
    upsert?: PropertyUpsertWithoutLeasesInput;
    connect?: PropertyWhereUniqueInput;
    update?: XOR<
      XOR<PropertyUpdateToOneWithWhereWithoutLeasesInput, PropertyUpdateWithoutLeasesInput>,
      PropertyUncheckedUpdateWithoutLeasesInput
    >;
  };

  export type InvestorUpdateOneRequiredWithoutLeasesNestedInput = {
    create?: XOR<InvestorCreateWithoutLeasesInput, InvestorUncheckedCreateWithoutLeasesInput>;
    connectOrCreate?: InvestorCreateOrConnectWithoutLeasesInput;
    upsert?: InvestorUpsertWithoutLeasesInput;
    connect?: InvestorWhereUniqueInput;
    update?: XOR<
      XOR<InvestorUpdateToOneWithWhereWithoutLeasesInput, InvestorUpdateWithoutLeasesInput>,
      InvestorUncheckedUpdateWithoutLeasesInput
    >;
  };

  export type ApplicationUpdateOneWithoutLeaseNestedInput = {
    create?: XOR<ApplicationCreateWithoutLeaseInput, ApplicationUncheckedCreateWithoutLeaseInput>;
    connectOrCreate?: ApplicationCreateOrConnectWithoutLeaseInput;
    upsert?: ApplicationUpsertWithoutLeaseInput;
    disconnect?: ApplicationWhereInput | boolean;
    delete?: ApplicationWhereInput | boolean;
    connect?: ApplicationWhereUniqueInput;
    update?: XOR<
      XOR<ApplicationUpdateToOneWithWhereWithoutLeaseInput, ApplicationUpdateWithoutLeaseInput>,
      ApplicationUncheckedUpdateWithoutLeaseInput
    >;
  };

  export type PaymentUpdateManyWithoutLeaseNestedInput = {
    create?:
      | XOR<PaymentCreateWithoutLeaseInput, PaymentUncheckedCreateWithoutLeaseInput>
      | PaymentCreateWithoutLeaseInput[]
      | PaymentUncheckedCreateWithoutLeaseInput[];
    connectOrCreate?: PaymentCreateOrConnectWithoutLeaseInput | PaymentCreateOrConnectWithoutLeaseInput[];
    upsert?: PaymentUpsertWithWhereUniqueWithoutLeaseInput | PaymentUpsertWithWhereUniqueWithoutLeaseInput[];
    createMany?: PaymentCreateManyLeaseInputEnvelope;
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[];
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[];
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[];
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[];
    update?: PaymentUpdateWithWhereUniqueWithoutLeaseInput | PaymentUpdateWithWhereUniqueWithoutLeaseInput[];
    updateMany?: PaymentUpdateManyWithWhereWithoutLeaseInput | PaymentUpdateManyWithWhereWithoutLeaseInput[];
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[];
  };

  export type ApplicationUncheckedUpdateOneWithoutLeaseNestedInput = {
    create?: XOR<ApplicationCreateWithoutLeaseInput, ApplicationUncheckedCreateWithoutLeaseInput>;
    connectOrCreate?: ApplicationCreateOrConnectWithoutLeaseInput;
    upsert?: ApplicationUpsertWithoutLeaseInput;
    disconnect?: ApplicationWhereInput | boolean;
    delete?: ApplicationWhereInput | boolean;
    connect?: ApplicationWhereUniqueInput;
    update?: XOR<
      XOR<ApplicationUpdateToOneWithWhereWithoutLeaseInput, ApplicationUpdateWithoutLeaseInput>,
      ApplicationUncheckedUpdateWithoutLeaseInput
    >;
  };

  export type PaymentUncheckedUpdateManyWithoutLeaseNestedInput = {
    create?:
      | XOR<PaymentCreateWithoutLeaseInput, PaymentUncheckedCreateWithoutLeaseInput>
      | PaymentCreateWithoutLeaseInput[]
      | PaymentUncheckedCreateWithoutLeaseInput[];
    connectOrCreate?: PaymentCreateOrConnectWithoutLeaseInput | PaymentCreateOrConnectWithoutLeaseInput[];
    upsert?: PaymentUpsertWithWhereUniqueWithoutLeaseInput | PaymentUpsertWithWhereUniqueWithoutLeaseInput[];
    createMany?: PaymentCreateManyLeaseInputEnvelope;
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[];
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[];
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[];
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[];
    update?: PaymentUpdateWithWhereUniqueWithoutLeaseInput | PaymentUpdateWithWhereUniqueWithoutLeaseInput[];
    updateMany?: PaymentUpdateManyWithWhereWithoutLeaseInput | PaymentUpdateManyWithWhereWithoutLeaseInput[];
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[];
  };

  export type LeaseCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<LeaseCreateWithoutPaymentsInput, LeaseUncheckedCreateWithoutPaymentsInput>;
    connectOrCreate?: LeaseCreateOrConnectWithoutPaymentsInput;
    connect?: LeaseWhereUniqueInput;
  };

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus;
  };

  export type LeaseUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<LeaseCreateWithoutPaymentsInput, LeaseUncheckedCreateWithoutPaymentsInput>;
    connectOrCreate?: LeaseCreateOrConnectWithoutPaymentsInput;
    upsert?: LeaseUpsertWithoutPaymentsInput;
    connect?: LeaseWhereUniqueInput;
    update?: XOR<
      XOR<LeaseUpdateToOneWithWhereWithoutPaymentsInput, LeaseUpdateWithoutPaymentsInput>,
      LeaseUncheckedUpdateWithoutPaymentsInput
    >;
  };

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type NestedEnumPropertyTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PropertyType | EnumPropertyTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumPropertyTypeFilter<$PrismaModel> | $Enums.PropertyType;
  };

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedFloatFilter<$PrismaModel>;
    _min?: NestedFloatFilter<$PrismaModel>;
    _max?: NestedFloatFilter<$PrismaModel>;
  };

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type NestedEnumPropertyTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PropertyType | EnumPropertyTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumPropertyTypeWithAggregatesFilter<$PrismaModel> | $Enums.PropertyType;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumPropertyTypeFilter<$PrismaModel>;
    _max?: NestedEnumPropertyTypeFilter<$PrismaModel>;
  };

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedFloatNullableFilter<$PrismaModel>;
    _min?: NestedFloatNullableFilter<$PrismaModel>;
    _max?: NestedFloatNullableFilter<$PrismaModel>;
  };

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedIntNullableFilter<$PrismaModel>;
    _max?: NestedIntNullableFilter<$PrismaModel>;
  };

  export type NestedEnumApplicationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumApplicationStatusFilter<$PrismaModel> | $Enums.ApplicationStatus;
  };

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type NestedEnumApplicationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumApplicationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ApplicationStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumApplicationStatusFilter<$PrismaModel>;
    _max?: NestedEnumApplicationStatusFilter<$PrismaModel>;
  };

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus;
  };

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>;
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>;
  };

  export type LocationCreateWithoutPropertiesInput = {
    address: string;
    postalCode: string;
    latitude: number;
    longitude: number;
  };

  export type LocationUncheckedCreateWithoutPropertiesInput = {
    id?: number;
    address: string;
    postalCode: string;
    latitude: number;
    longitude: number;
  };

  export type LocationCreateOrConnectWithoutPropertiesInput = {
    where: LocationWhereUniqueInput;
    create: XOR<LocationCreateWithoutPropertiesInput, LocationUncheckedCreateWithoutPropertiesInput>;
  };

  export type ManagerCreateWithoutManagedPropertiesInput = {
    cognitoId: string;
    name: string;
    email: string;
    phoneNumber: string;
  };

  export type ManagerUncheckedCreateWithoutManagedPropertiesInput = {
    id?: number;
    cognitoId: string;
    name: string;
    email: string;
    phoneNumber: string;
  };

  export type ManagerCreateOrConnectWithoutManagedPropertiesInput = {
    where: ManagerWhereUniqueInput;
    create: XOR<ManagerCreateWithoutManagedPropertiesInput, ManagerUncheckedCreateWithoutManagedPropertiesInput>;
  };

  export type LeaseCreateWithoutPropertyInput = {
    startDate: Date | string;
    endDate: Date | string;
    rent: number;
    deposit: number;
    investor: InvestorCreateNestedOneWithoutLeasesInput;
    application?: ApplicationCreateNestedOneWithoutLeaseInput;
    payments?: PaymentCreateNestedManyWithoutLeaseInput;
  };

  export type LeaseUncheckedCreateWithoutPropertyInput = {
    id?: number;
    startDate: Date | string;
    endDate: Date | string;
    rent: number;
    deposit: number;
    investorCognitoId: string;
    application?: ApplicationUncheckedCreateNestedOneWithoutLeaseInput;
    payments?: PaymentUncheckedCreateNestedManyWithoutLeaseInput;
  };

  export type LeaseCreateOrConnectWithoutPropertyInput = {
    where: LeaseWhereUniqueInput;
    create: XOR<LeaseCreateWithoutPropertyInput, LeaseUncheckedCreateWithoutPropertyInput>;
  };

  export type LeaseCreateManyPropertyInputEnvelope = {
    data: LeaseCreateManyPropertyInput | LeaseCreateManyPropertyInput[];
    skipDuplicates?: boolean;
  };

  export type ApplicationCreateWithoutPropertyInput = {
    applicationDate: Date | string;
    status: $Enums.ApplicationStatus;
    name: string;
    email: string;
    phoneNumber: string;
    message?: string | null;
    investor: InvestorCreateNestedOneWithoutApplicationsInput;
    lease?: LeaseCreateNestedOneWithoutApplicationInput;
  };

  export type ApplicationUncheckedCreateWithoutPropertyInput = {
    id?: number;
    applicationDate: Date | string;
    status: $Enums.ApplicationStatus;
    investorCognitoId: string;
    name: string;
    email: string;
    phoneNumber: string;
    message?: string | null;
    leaseId?: number | null;
  };

  export type ApplicationCreateOrConnectWithoutPropertyInput = {
    where: ApplicationWhereUniqueInput;
    create: XOR<ApplicationCreateWithoutPropertyInput, ApplicationUncheckedCreateWithoutPropertyInput>;
  };

  export type ApplicationCreateManyPropertyInputEnvelope = {
    data: ApplicationCreateManyPropertyInput | ApplicationCreateManyPropertyInput[];
    skipDuplicates?: boolean;
  };

  export type InvestorCreateWithoutFavoritesInput = {
    cognitoId: string;
    name: string;
    email: string;
    phoneNumber: string;
    properties?: PropertyCreateNestedManyWithoutInvestorsInput;
    applications?: ApplicationCreateNestedManyWithoutInvestorInput;
    leases?: LeaseCreateNestedManyWithoutInvestorInput;
  };

  export type InvestorUncheckedCreateWithoutFavoritesInput = {
    id?: number;
    cognitoId: string;
    name: string;
    email: string;
    phoneNumber: string;
    properties?: PropertyUncheckedCreateNestedManyWithoutInvestorsInput;
    applications?: ApplicationUncheckedCreateNestedManyWithoutInvestorInput;
    leases?: LeaseUncheckedCreateNestedManyWithoutInvestorInput;
  };

  export type InvestorCreateOrConnectWithoutFavoritesInput = {
    where: InvestorWhereUniqueInput;
    create: XOR<InvestorCreateWithoutFavoritesInput, InvestorUncheckedCreateWithoutFavoritesInput>;
  };

  export type InvestorCreateWithoutPropertiesInput = {
    cognitoId: string;
    name: string;
    email: string;
    phoneNumber: string;
    favorites?: PropertyCreateNestedManyWithoutFavoritedByInput;
    applications?: ApplicationCreateNestedManyWithoutInvestorInput;
    leases?: LeaseCreateNestedManyWithoutInvestorInput;
  };

  export type InvestorUncheckedCreateWithoutPropertiesInput = {
    id?: number;
    cognitoId: string;
    name: string;
    email: string;
    phoneNumber: string;
    favorites?: PropertyUncheckedCreateNestedManyWithoutFavoritedByInput;
    applications?: ApplicationUncheckedCreateNestedManyWithoutInvestorInput;
    leases?: LeaseUncheckedCreateNestedManyWithoutInvestorInput;
  };

  export type InvestorCreateOrConnectWithoutPropertiesInput = {
    where: InvestorWhereUniqueInput;
    create: XOR<InvestorCreateWithoutPropertiesInput, InvestorUncheckedCreateWithoutPropertiesInput>;
  };

  export type LocationUpsertWithoutPropertiesInput = {
    update: XOR<LocationUpdateWithoutPropertiesInput, LocationUncheckedUpdateWithoutPropertiesInput>;
    create: XOR<LocationCreateWithoutPropertiesInput, LocationUncheckedCreateWithoutPropertiesInput>;
    where?: LocationWhereInput;
  };

  export type LocationUpdateToOneWithWhereWithoutPropertiesInput = {
    where?: LocationWhereInput;
    data: XOR<LocationUpdateWithoutPropertiesInput, LocationUncheckedUpdateWithoutPropertiesInput>;
  };

  export type LocationUpdateWithoutPropertiesInput = {
    address?: StringFieldUpdateOperationsInput | string;
    postalCode?: StringFieldUpdateOperationsInput | string;
    latitude?: FloatFieldUpdateOperationsInput | number;
    longitude?: FloatFieldUpdateOperationsInput | number;
  };

  export type LocationUncheckedUpdateWithoutPropertiesInput = {
    id?: IntFieldUpdateOperationsInput | number;
    address?: StringFieldUpdateOperationsInput | string;
    postalCode?: StringFieldUpdateOperationsInput | string;
    latitude?: FloatFieldUpdateOperationsInput | number;
    longitude?: FloatFieldUpdateOperationsInput | number;
  };

  export type ManagerUpsertWithoutManagedPropertiesInput = {
    update: XOR<ManagerUpdateWithoutManagedPropertiesInput, ManagerUncheckedUpdateWithoutManagedPropertiesInput>;
    create: XOR<ManagerCreateWithoutManagedPropertiesInput, ManagerUncheckedCreateWithoutManagedPropertiesInput>;
    where?: ManagerWhereInput;
  };

  export type ManagerUpdateToOneWithWhereWithoutManagedPropertiesInput = {
    where?: ManagerWhereInput;
    data: XOR<ManagerUpdateWithoutManagedPropertiesInput, ManagerUncheckedUpdateWithoutManagedPropertiesInput>;
  };

  export type ManagerUpdateWithoutManagedPropertiesInput = {
    cognitoId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
  };

  export type ManagerUncheckedUpdateWithoutManagedPropertiesInput = {
    id?: IntFieldUpdateOperationsInput | number;
    cognitoId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
  };

  export type LeaseUpsertWithWhereUniqueWithoutPropertyInput = {
    where: LeaseWhereUniqueInput;
    update: XOR<LeaseUpdateWithoutPropertyInput, LeaseUncheckedUpdateWithoutPropertyInput>;
    create: XOR<LeaseCreateWithoutPropertyInput, LeaseUncheckedCreateWithoutPropertyInput>;
  };

  export type LeaseUpdateWithWhereUniqueWithoutPropertyInput = {
    where: LeaseWhereUniqueInput;
    data: XOR<LeaseUpdateWithoutPropertyInput, LeaseUncheckedUpdateWithoutPropertyInput>;
  };

  export type LeaseUpdateManyWithWhereWithoutPropertyInput = {
    where: LeaseScalarWhereInput;
    data: XOR<LeaseUpdateManyMutationInput, LeaseUncheckedUpdateManyWithoutPropertyInput>;
  };

  export type LeaseScalarWhereInput = {
    AND?: LeaseScalarWhereInput | LeaseScalarWhereInput[];
    OR?: LeaseScalarWhereInput[];
    NOT?: LeaseScalarWhereInput | LeaseScalarWhereInput[];
    id?: IntFilter<"Lease"> | number;
    startDate?: DateTimeFilter<"Lease"> | Date | string;
    endDate?: DateTimeFilter<"Lease"> | Date | string;
    rent?: FloatFilter<"Lease"> | number;
    deposit?: FloatFilter<"Lease"> | number;
    propertyId?: IntFilter<"Lease"> | number;
    investorCognitoId?: StringFilter<"Lease"> | string;
  };

  export type ApplicationUpsertWithWhereUniqueWithoutPropertyInput = {
    where: ApplicationWhereUniqueInput;
    update: XOR<ApplicationUpdateWithoutPropertyInput, ApplicationUncheckedUpdateWithoutPropertyInput>;
    create: XOR<ApplicationCreateWithoutPropertyInput, ApplicationUncheckedCreateWithoutPropertyInput>;
  };

  export type ApplicationUpdateWithWhereUniqueWithoutPropertyInput = {
    where: ApplicationWhereUniqueInput;
    data: XOR<ApplicationUpdateWithoutPropertyInput, ApplicationUncheckedUpdateWithoutPropertyInput>;
  };

  export type ApplicationUpdateManyWithWhereWithoutPropertyInput = {
    where: ApplicationScalarWhereInput;
    data: XOR<ApplicationUpdateManyMutationInput, ApplicationUncheckedUpdateManyWithoutPropertyInput>;
  };

  export type ApplicationScalarWhereInput = {
    AND?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[];
    OR?: ApplicationScalarWhereInput[];
    NOT?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[];
    id?: IntFilter<"Application"> | number;
    applicationDate?: DateTimeFilter<"Application"> | Date | string;
    status?: EnumApplicationStatusFilter<"Application"> | $Enums.ApplicationStatus;
    propertyId?: IntFilter<"Application"> | number;
    investorCognitoId?: StringFilter<"Application"> | string;
    name?: StringFilter<"Application"> | string;
    email?: StringFilter<"Application"> | string;
    phoneNumber?: StringFilter<"Application"> | string;
    message?: StringNullableFilter<"Application"> | string | null;
    leaseId?: IntNullableFilter<"Application"> | number | null;
  };

  export type InvestorUpsertWithWhereUniqueWithoutFavoritesInput = {
    where: InvestorWhereUniqueInput;
    update: XOR<InvestorUpdateWithoutFavoritesInput, InvestorUncheckedUpdateWithoutFavoritesInput>;
    create: XOR<InvestorCreateWithoutFavoritesInput, InvestorUncheckedCreateWithoutFavoritesInput>;
  };

  export type InvestorUpdateWithWhereUniqueWithoutFavoritesInput = {
    where: InvestorWhereUniqueInput;
    data: XOR<InvestorUpdateWithoutFavoritesInput, InvestorUncheckedUpdateWithoutFavoritesInput>;
  };

  export type InvestorUpdateManyWithWhereWithoutFavoritesInput = {
    where: InvestorScalarWhereInput;
    data: XOR<InvestorUpdateManyMutationInput, InvestorUncheckedUpdateManyWithoutFavoritesInput>;
  };

  export type InvestorScalarWhereInput = {
    AND?: InvestorScalarWhereInput | InvestorScalarWhereInput[];
    OR?: InvestorScalarWhereInput[];
    NOT?: InvestorScalarWhereInput | InvestorScalarWhereInput[];
    id?: IntFilter<"Investor"> | number;
    cognitoId?: StringFilter<"Investor"> | string;
    name?: StringFilter<"Investor"> | string;
    email?: StringFilter<"Investor"> | string;
    phoneNumber?: StringFilter<"Investor"> | string;
  };

  export type InvestorUpsertWithWhereUniqueWithoutPropertiesInput = {
    where: InvestorWhereUniqueInput;
    update: XOR<InvestorUpdateWithoutPropertiesInput, InvestorUncheckedUpdateWithoutPropertiesInput>;
    create: XOR<InvestorCreateWithoutPropertiesInput, InvestorUncheckedCreateWithoutPropertiesInput>;
  };

  export type InvestorUpdateWithWhereUniqueWithoutPropertiesInput = {
    where: InvestorWhereUniqueInput;
    data: XOR<InvestorUpdateWithoutPropertiesInput, InvestorUncheckedUpdateWithoutPropertiesInput>;
  };

  export type InvestorUpdateManyWithWhereWithoutPropertiesInput = {
    where: InvestorScalarWhereInput;
    data: XOR<InvestorUpdateManyMutationInput, InvestorUncheckedUpdateManyWithoutPropertiesInput>;
  };

  export type PropertyCreateWithoutManagerInput = {
    name: string;
    description: string;
    pricePerMonth: number;
    securityDeposit: number;
    applicationFee: number;
    photoUrls?: PropertyCreatephotoUrlsInput | string[];
    isPetsAllowed?: boolean;
    isParkingIncluded?: boolean;
    beds: number;
    baths: number;
    squareFeet: number;
    propertyType: $Enums.PropertyType;
    postedDate?: Date | string;
    averageRating?: number | null;
    numberOfReviews?: number | null;
    location: LocationCreateNestedOneWithoutPropertiesInput;
    leases?: LeaseCreateNestedManyWithoutPropertyInput;
    applications?: ApplicationCreateNestedManyWithoutPropertyInput;
    favoritedBy?: InvestorCreateNestedManyWithoutFavoritesInput;
    investors?: InvestorCreateNestedManyWithoutPropertiesInput;
  };

  export type PropertyUncheckedCreateWithoutManagerInput = {
    id?: number;
    name: string;
    description: string;
    pricePerMonth: number;
    securityDeposit: number;
    applicationFee: number;
    photoUrls?: PropertyCreatephotoUrlsInput | string[];
    isPetsAllowed?: boolean;
    isParkingIncluded?: boolean;
    beds: number;
    baths: number;
    squareFeet: number;
    propertyType: $Enums.PropertyType;
    postedDate?: Date | string;
    averageRating?: number | null;
    numberOfReviews?: number | null;
    locationId: number;
    leases?: LeaseUncheckedCreateNestedManyWithoutPropertyInput;
    applications?: ApplicationUncheckedCreateNestedManyWithoutPropertyInput;
    favoritedBy?: InvestorUncheckedCreateNestedManyWithoutFavoritesInput;
    investors?: InvestorUncheckedCreateNestedManyWithoutPropertiesInput;
  };

  export type PropertyCreateOrConnectWithoutManagerInput = {
    where: PropertyWhereUniqueInput;
    create: XOR<PropertyCreateWithoutManagerInput, PropertyUncheckedCreateWithoutManagerInput>;
  };

  export type PropertyCreateManyManagerInputEnvelope = {
    data: PropertyCreateManyManagerInput | PropertyCreateManyManagerInput[];
    skipDuplicates?: boolean;
  };

  export type PropertyUpsertWithWhereUniqueWithoutManagerInput = {
    where: PropertyWhereUniqueInput;
    update: XOR<PropertyUpdateWithoutManagerInput, PropertyUncheckedUpdateWithoutManagerInput>;
    create: XOR<PropertyCreateWithoutManagerInput, PropertyUncheckedCreateWithoutManagerInput>;
  };

  export type PropertyUpdateWithWhereUniqueWithoutManagerInput = {
    where: PropertyWhereUniqueInput;
    data: XOR<PropertyUpdateWithoutManagerInput, PropertyUncheckedUpdateWithoutManagerInput>;
  };

  export type PropertyUpdateManyWithWhereWithoutManagerInput = {
    where: PropertyScalarWhereInput;
    data: XOR<PropertyUpdateManyMutationInput, PropertyUncheckedUpdateManyWithoutManagerInput>;
  };

  export type PropertyScalarWhereInput = {
    AND?: PropertyScalarWhereInput | PropertyScalarWhereInput[];
    OR?: PropertyScalarWhereInput[];
    NOT?: PropertyScalarWhereInput | PropertyScalarWhereInput[];
    id?: IntFilter<"Property"> | number;
    name?: StringFilter<"Property"> | string;
    description?: StringFilter<"Property"> | string;
    pricePerMonth?: FloatFilter<"Property"> | number;
    securityDeposit?: FloatFilter<"Property"> | number;
    applicationFee?: FloatFilter<"Property"> | number;
    photoUrls?: StringNullableListFilter<"Property">;
    isPetsAllowed?: BoolFilter<"Property"> | boolean;
    isParkingIncluded?: BoolFilter<"Property"> | boolean;
    beds?: IntFilter<"Property"> | number;
    baths?: FloatFilter<"Property"> | number;
    squareFeet?: IntFilter<"Property"> | number;
    propertyType?: EnumPropertyTypeFilter<"Property"> | $Enums.PropertyType;
    postedDate?: DateTimeFilter<"Property"> | Date | string;
    averageRating?: FloatNullableFilter<"Property"> | number | null;
    numberOfReviews?: IntNullableFilter<"Property"> | number | null;
    locationId?: IntFilter<"Property"> | number;
    managerCognitoId?: StringFilter<"Property"> | string;
  };

  export type PropertyCreateWithoutInvestorsInput = {
    name: string;
    description: string;
    pricePerMonth: number;
    securityDeposit: number;
    applicationFee: number;
    photoUrls?: PropertyCreatephotoUrlsInput | string[];
    isPetsAllowed?: boolean;
    isParkingIncluded?: boolean;
    beds: number;
    baths: number;
    squareFeet: number;
    propertyType: $Enums.PropertyType;
    postedDate?: Date | string;
    averageRating?: number | null;
    numberOfReviews?: number | null;
    location: LocationCreateNestedOneWithoutPropertiesInput;
    manager: ManagerCreateNestedOneWithoutManagedPropertiesInput;
    leases?: LeaseCreateNestedManyWithoutPropertyInput;
    applications?: ApplicationCreateNestedManyWithoutPropertyInput;
    favoritedBy?: InvestorCreateNestedManyWithoutFavoritesInput;
  };

  export type PropertyUncheckedCreateWithoutInvestorsInput = {
    id?: number;
    name: string;
    description: string;
    pricePerMonth: number;
    securityDeposit: number;
    applicationFee: number;
    photoUrls?: PropertyCreatephotoUrlsInput | string[];
    isPetsAllowed?: boolean;
    isParkingIncluded?: boolean;
    beds: number;
    baths: number;
    squareFeet: number;
    propertyType: $Enums.PropertyType;
    postedDate?: Date | string;
    averageRating?: number | null;
    numberOfReviews?: number | null;
    locationId: number;
    managerCognitoId: string;
    leases?: LeaseUncheckedCreateNestedManyWithoutPropertyInput;
    applications?: ApplicationUncheckedCreateNestedManyWithoutPropertyInput;
    favoritedBy?: InvestorUncheckedCreateNestedManyWithoutFavoritesInput;
  };

  export type PropertyCreateOrConnectWithoutInvestorsInput = {
    where: PropertyWhereUniqueInput;
    create: XOR<PropertyCreateWithoutInvestorsInput, PropertyUncheckedCreateWithoutInvestorsInput>;
  };

  export type PropertyCreateWithoutFavoritedByInput = {
    name: string;
    description: string;
    pricePerMonth: number;
    securityDeposit: number;
    applicationFee: number;
    photoUrls?: PropertyCreatephotoUrlsInput | string[];
    isPetsAllowed?: boolean;
    isParkingIncluded?: boolean;
    beds: number;
    baths: number;
    squareFeet: number;
    propertyType: $Enums.PropertyType;
    postedDate?: Date | string;
    averageRating?: number | null;
    numberOfReviews?: number | null;
    location: LocationCreateNestedOneWithoutPropertiesInput;
    manager: ManagerCreateNestedOneWithoutManagedPropertiesInput;
    leases?: LeaseCreateNestedManyWithoutPropertyInput;
    applications?: ApplicationCreateNestedManyWithoutPropertyInput;
    investors?: InvestorCreateNestedManyWithoutPropertiesInput;
  };

  export type PropertyUncheckedCreateWithoutFavoritedByInput = {
    id?: number;
    name: string;
    description: string;
    pricePerMonth: number;
    securityDeposit: number;
    applicationFee: number;
    photoUrls?: PropertyCreatephotoUrlsInput | string[];
    isPetsAllowed?: boolean;
    isParkingIncluded?: boolean;
    beds: number;
    baths: number;
    squareFeet: number;
    propertyType: $Enums.PropertyType;
    postedDate?: Date | string;
    averageRating?: number | null;
    numberOfReviews?: number | null;
    locationId: number;
    managerCognitoId: string;
    leases?: LeaseUncheckedCreateNestedManyWithoutPropertyInput;
    applications?: ApplicationUncheckedCreateNestedManyWithoutPropertyInput;
    investors?: InvestorUncheckedCreateNestedManyWithoutPropertiesInput;
  };

  export type PropertyCreateOrConnectWithoutFavoritedByInput = {
    where: PropertyWhereUniqueInput;
    create: XOR<PropertyCreateWithoutFavoritedByInput, PropertyUncheckedCreateWithoutFavoritedByInput>;
  };

  export type ApplicationCreateWithoutInvestorInput = {
    applicationDate: Date | string;
    status: $Enums.ApplicationStatus;
    name: string;
    email: string;
    phoneNumber: string;
    message?: string | null;
    property: PropertyCreateNestedOneWithoutApplicationsInput;
    lease?: LeaseCreateNestedOneWithoutApplicationInput;
  };

  export type ApplicationUncheckedCreateWithoutInvestorInput = {
    id?: number;
    applicationDate: Date | string;
    status: $Enums.ApplicationStatus;
    propertyId: number;
    name: string;
    email: string;
    phoneNumber: string;
    message?: string | null;
    leaseId?: number | null;
  };

  export type ApplicationCreateOrConnectWithoutInvestorInput = {
    where: ApplicationWhereUniqueInput;
    create: XOR<ApplicationCreateWithoutInvestorInput, ApplicationUncheckedCreateWithoutInvestorInput>;
  };

  export type ApplicationCreateManyInvestorInputEnvelope = {
    data: ApplicationCreateManyInvestorInput | ApplicationCreateManyInvestorInput[];
    skipDuplicates?: boolean;
  };

  export type LeaseCreateWithoutInvestorInput = {
    startDate: Date | string;
    endDate: Date | string;
    rent: number;
    deposit: number;
    property: PropertyCreateNestedOneWithoutLeasesInput;
    application?: ApplicationCreateNestedOneWithoutLeaseInput;
    payments?: PaymentCreateNestedManyWithoutLeaseInput;
  };

  export type LeaseUncheckedCreateWithoutInvestorInput = {
    id?: number;
    startDate: Date | string;
    endDate: Date | string;
    rent: number;
    deposit: number;
    propertyId: number;
    application?: ApplicationUncheckedCreateNestedOneWithoutLeaseInput;
    payments?: PaymentUncheckedCreateNestedManyWithoutLeaseInput;
  };

  export type LeaseCreateOrConnectWithoutInvestorInput = {
    where: LeaseWhereUniqueInput;
    create: XOR<LeaseCreateWithoutInvestorInput, LeaseUncheckedCreateWithoutInvestorInput>;
  };

  export type LeaseCreateManyInvestorInputEnvelope = {
    data: LeaseCreateManyInvestorInput | LeaseCreateManyInvestorInput[];
    skipDuplicates?: boolean;
  };

  export type PropertyUpsertWithWhereUniqueWithoutInvestorsInput = {
    where: PropertyWhereUniqueInput;
    update: XOR<PropertyUpdateWithoutInvestorsInput, PropertyUncheckedUpdateWithoutInvestorsInput>;
    create: XOR<PropertyCreateWithoutInvestorsInput, PropertyUncheckedCreateWithoutInvestorsInput>;
  };

  export type PropertyUpdateWithWhereUniqueWithoutInvestorsInput = {
    where: PropertyWhereUniqueInput;
    data: XOR<PropertyUpdateWithoutInvestorsInput, PropertyUncheckedUpdateWithoutInvestorsInput>;
  };

  export type PropertyUpdateManyWithWhereWithoutInvestorsInput = {
    where: PropertyScalarWhereInput;
    data: XOR<PropertyUpdateManyMutationInput, PropertyUncheckedUpdateManyWithoutInvestorsInput>;
  };

  export type PropertyUpsertWithWhereUniqueWithoutFavoritedByInput = {
    where: PropertyWhereUniqueInput;
    update: XOR<PropertyUpdateWithoutFavoritedByInput, PropertyUncheckedUpdateWithoutFavoritedByInput>;
    create: XOR<PropertyCreateWithoutFavoritedByInput, PropertyUncheckedCreateWithoutFavoritedByInput>;
  };

  export type PropertyUpdateWithWhereUniqueWithoutFavoritedByInput = {
    where: PropertyWhereUniqueInput;
    data: XOR<PropertyUpdateWithoutFavoritedByInput, PropertyUncheckedUpdateWithoutFavoritedByInput>;
  };

  export type PropertyUpdateManyWithWhereWithoutFavoritedByInput = {
    where: PropertyScalarWhereInput;
    data: XOR<PropertyUpdateManyMutationInput, PropertyUncheckedUpdateManyWithoutFavoritedByInput>;
  };

  export type ApplicationUpsertWithWhereUniqueWithoutInvestorInput = {
    where: ApplicationWhereUniqueInput;
    update: XOR<ApplicationUpdateWithoutInvestorInput, ApplicationUncheckedUpdateWithoutInvestorInput>;
    create: XOR<ApplicationCreateWithoutInvestorInput, ApplicationUncheckedCreateWithoutInvestorInput>;
  };

  export type ApplicationUpdateWithWhereUniqueWithoutInvestorInput = {
    where: ApplicationWhereUniqueInput;
    data: XOR<ApplicationUpdateWithoutInvestorInput, ApplicationUncheckedUpdateWithoutInvestorInput>;
  };

  export type ApplicationUpdateManyWithWhereWithoutInvestorInput = {
    where: ApplicationScalarWhereInput;
    data: XOR<ApplicationUpdateManyMutationInput, ApplicationUncheckedUpdateManyWithoutInvestorInput>;
  };

  export type LeaseUpsertWithWhereUniqueWithoutInvestorInput = {
    where: LeaseWhereUniqueInput;
    update: XOR<LeaseUpdateWithoutInvestorInput, LeaseUncheckedUpdateWithoutInvestorInput>;
    create: XOR<LeaseCreateWithoutInvestorInput, LeaseUncheckedCreateWithoutInvestorInput>;
  };

  export type LeaseUpdateWithWhereUniqueWithoutInvestorInput = {
    where: LeaseWhereUniqueInput;
    data: XOR<LeaseUpdateWithoutInvestorInput, LeaseUncheckedUpdateWithoutInvestorInput>;
  };

  export type LeaseUpdateManyWithWhereWithoutInvestorInput = {
    where: LeaseScalarWhereInput;
    data: XOR<LeaseUpdateManyMutationInput, LeaseUncheckedUpdateManyWithoutInvestorInput>;
  };

  export type PropertyCreateWithoutLocationInput = {
    name: string;
    description: string;
    pricePerMonth: number;
    securityDeposit: number;
    applicationFee: number;
    photoUrls?: PropertyCreatephotoUrlsInput | string[];
    isPetsAllowed?: boolean;
    isParkingIncluded?: boolean;
    beds: number;
    baths: number;
    squareFeet: number;
    propertyType: $Enums.PropertyType;
    postedDate?: Date | string;
    averageRating?: number | null;
    numberOfReviews?: number | null;
    manager: ManagerCreateNestedOneWithoutManagedPropertiesInput;
    leases?: LeaseCreateNestedManyWithoutPropertyInput;
    applications?: ApplicationCreateNestedManyWithoutPropertyInput;
    favoritedBy?: InvestorCreateNestedManyWithoutFavoritesInput;
    investors?: InvestorCreateNestedManyWithoutPropertiesInput;
  };

  export type PropertyUncheckedCreateWithoutLocationInput = {
    id?: number;
    name: string;
    description: string;
    pricePerMonth: number;
    securityDeposit: number;
    applicationFee: number;
    photoUrls?: PropertyCreatephotoUrlsInput | string[];
    isPetsAllowed?: boolean;
    isParkingIncluded?: boolean;
    beds: number;
    baths: number;
    squareFeet: number;
    propertyType: $Enums.PropertyType;
    postedDate?: Date | string;
    averageRating?: number | null;
    numberOfReviews?: number | null;
    managerCognitoId: string;
    leases?: LeaseUncheckedCreateNestedManyWithoutPropertyInput;
    applications?: ApplicationUncheckedCreateNestedManyWithoutPropertyInput;
    favoritedBy?: InvestorUncheckedCreateNestedManyWithoutFavoritesInput;
    investors?: InvestorUncheckedCreateNestedManyWithoutPropertiesInput;
  };

  export type PropertyCreateOrConnectWithoutLocationInput = {
    where: PropertyWhereUniqueInput;
    create: XOR<PropertyCreateWithoutLocationInput, PropertyUncheckedCreateWithoutLocationInput>;
  };

  export type PropertyCreateManyLocationInputEnvelope = {
    data: PropertyCreateManyLocationInput | PropertyCreateManyLocationInput[];
    skipDuplicates?: boolean;
  };

  export type PropertyUpsertWithWhereUniqueWithoutLocationInput = {
    where: PropertyWhereUniqueInput;
    update: XOR<PropertyUpdateWithoutLocationInput, PropertyUncheckedUpdateWithoutLocationInput>;
    create: XOR<PropertyCreateWithoutLocationInput, PropertyUncheckedCreateWithoutLocationInput>;
  };

  export type PropertyUpdateWithWhereUniqueWithoutLocationInput = {
    where: PropertyWhereUniqueInput;
    data: XOR<PropertyUpdateWithoutLocationInput, PropertyUncheckedUpdateWithoutLocationInput>;
  };

  export type PropertyUpdateManyWithWhereWithoutLocationInput = {
    where: PropertyScalarWhereInput;
    data: XOR<PropertyUpdateManyMutationInput, PropertyUncheckedUpdateManyWithoutLocationInput>;
  };

  export type PropertyCreateWithoutApplicationsInput = {
    name: string;
    description: string;
    pricePerMonth: number;
    securityDeposit: number;
    applicationFee: number;
    photoUrls?: PropertyCreatephotoUrlsInput | string[];
    isPetsAllowed?: boolean;
    isParkingIncluded?: boolean;
    beds: number;
    baths: number;
    squareFeet: number;
    propertyType: $Enums.PropertyType;
    postedDate?: Date | string;
    averageRating?: number | null;
    numberOfReviews?: number | null;
    location: LocationCreateNestedOneWithoutPropertiesInput;
    manager: ManagerCreateNestedOneWithoutManagedPropertiesInput;
    leases?: LeaseCreateNestedManyWithoutPropertyInput;
    favoritedBy?: InvestorCreateNestedManyWithoutFavoritesInput;
    investors?: InvestorCreateNestedManyWithoutPropertiesInput;
  };

  export type PropertyUncheckedCreateWithoutApplicationsInput = {
    id?: number;
    name: string;
    description: string;
    pricePerMonth: number;
    securityDeposit: number;
    applicationFee: number;
    photoUrls?: PropertyCreatephotoUrlsInput | string[];
    isPetsAllowed?: boolean;
    isParkingIncluded?: boolean;
    beds: number;
    baths: number;
    squareFeet: number;
    propertyType: $Enums.PropertyType;
    postedDate?: Date | string;
    averageRating?: number | null;
    numberOfReviews?: number | null;
    locationId: number;
    managerCognitoId: string;
    leases?: LeaseUncheckedCreateNestedManyWithoutPropertyInput;
    favoritedBy?: InvestorUncheckedCreateNestedManyWithoutFavoritesInput;
    investors?: InvestorUncheckedCreateNestedManyWithoutPropertiesInput;
  };

  export type PropertyCreateOrConnectWithoutApplicationsInput = {
    where: PropertyWhereUniqueInput;
    create: XOR<PropertyCreateWithoutApplicationsInput, PropertyUncheckedCreateWithoutApplicationsInput>;
  };

  export type InvestorCreateWithoutApplicationsInput = {
    cognitoId: string;
    name: string;
    email: string;
    phoneNumber: string;
    properties?: PropertyCreateNestedManyWithoutInvestorsInput;
    favorites?: PropertyCreateNestedManyWithoutFavoritedByInput;
    leases?: LeaseCreateNestedManyWithoutInvestorInput;
  };

  export type InvestorUncheckedCreateWithoutApplicationsInput = {
    id?: number;
    cognitoId: string;
    name: string;
    email: string;
    phoneNumber: string;
    properties?: PropertyUncheckedCreateNestedManyWithoutInvestorsInput;
    favorites?: PropertyUncheckedCreateNestedManyWithoutFavoritedByInput;
    leases?: LeaseUncheckedCreateNestedManyWithoutInvestorInput;
  };

  export type InvestorCreateOrConnectWithoutApplicationsInput = {
    where: InvestorWhereUniqueInput;
    create: XOR<InvestorCreateWithoutApplicationsInput, InvestorUncheckedCreateWithoutApplicationsInput>;
  };

  export type LeaseCreateWithoutApplicationInput = {
    startDate: Date | string;
    endDate: Date | string;
    rent: number;
    deposit: number;
    property: PropertyCreateNestedOneWithoutLeasesInput;
    investor: InvestorCreateNestedOneWithoutLeasesInput;
    payments?: PaymentCreateNestedManyWithoutLeaseInput;
  };

  export type LeaseUncheckedCreateWithoutApplicationInput = {
    id?: number;
    startDate: Date | string;
    endDate: Date | string;
    rent: number;
    deposit: number;
    propertyId: number;
    investorCognitoId: string;
    payments?: PaymentUncheckedCreateNestedManyWithoutLeaseInput;
  };

  export type LeaseCreateOrConnectWithoutApplicationInput = {
    where: LeaseWhereUniqueInput;
    create: XOR<LeaseCreateWithoutApplicationInput, LeaseUncheckedCreateWithoutApplicationInput>;
  };

  export type PropertyUpsertWithoutApplicationsInput = {
    update: XOR<PropertyUpdateWithoutApplicationsInput, PropertyUncheckedUpdateWithoutApplicationsInput>;
    create: XOR<PropertyCreateWithoutApplicationsInput, PropertyUncheckedCreateWithoutApplicationsInput>;
    where?: PropertyWhereInput;
  };

  export type PropertyUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: PropertyWhereInput;
    data: XOR<PropertyUpdateWithoutApplicationsInput, PropertyUncheckedUpdateWithoutApplicationsInput>;
  };

  export type PropertyUpdateWithoutApplicationsInput = {
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    pricePerMonth?: FloatFieldUpdateOperationsInput | number;
    securityDeposit?: FloatFieldUpdateOperationsInput | number;
    applicationFee?: FloatFieldUpdateOperationsInput | number;
    photoUrls?: PropertyUpdatephotoUrlsInput | string[];
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean;
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean;
    beds?: IntFieldUpdateOperationsInput | number;
    baths?: FloatFieldUpdateOperationsInput | number;
    squareFeet?: IntFieldUpdateOperationsInput | number;
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType;
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null;
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null;
    location?: LocationUpdateOneRequiredWithoutPropertiesNestedInput;
    manager?: ManagerUpdateOneRequiredWithoutManagedPropertiesNestedInput;
    leases?: LeaseUpdateManyWithoutPropertyNestedInput;
    favoritedBy?: InvestorUpdateManyWithoutFavoritesNestedInput;
    investors?: InvestorUpdateManyWithoutPropertiesNestedInput;
  };

  export type PropertyUncheckedUpdateWithoutApplicationsInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    pricePerMonth?: FloatFieldUpdateOperationsInput | number;
    securityDeposit?: FloatFieldUpdateOperationsInput | number;
    applicationFee?: FloatFieldUpdateOperationsInput | number;
    photoUrls?: PropertyUpdatephotoUrlsInput | string[];
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean;
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean;
    beds?: IntFieldUpdateOperationsInput | number;
    baths?: FloatFieldUpdateOperationsInput | number;
    squareFeet?: IntFieldUpdateOperationsInput | number;
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType;
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null;
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null;
    locationId?: IntFieldUpdateOperationsInput | number;
    managerCognitoId?: StringFieldUpdateOperationsInput | string;
    leases?: LeaseUncheckedUpdateManyWithoutPropertyNestedInput;
    favoritedBy?: InvestorUncheckedUpdateManyWithoutFavoritesNestedInput;
    investors?: InvestorUncheckedUpdateManyWithoutPropertiesNestedInput;
  };

  export type InvestorUpsertWithoutApplicationsInput = {
    update: XOR<InvestorUpdateWithoutApplicationsInput, InvestorUncheckedUpdateWithoutApplicationsInput>;
    create: XOR<InvestorCreateWithoutApplicationsInput, InvestorUncheckedCreateWithoutApplicationsInput>;
    where?: InvestorWhereInput;
  };

  export type InvestorUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: InvestorWhereInput;
    data: XOR<InvestorUpdateWithoutApplicationsInput, InvestorUncheckedUpdateWithoutApplicationsInput>;
  };

  export type InvestorUpdateWithoutApplicationsInput = {
    cognitoId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
    properties?: PropertyUpdateManyWithoutInvestorsNestedInput;
    favorites?: PropertyUpdateManyWithoutFavoritedByNestedInput;
    leases?: LeaseUpdateManyWithoutInvestorNestedInput;
  };

  export type InvestorUncheckedUpdateWithoutApplicationsInput = {
    id?: IntFieldUpdateOperationsInput | number;
    cognitoId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
    properties?: PropertyUncheckedUpdateManyWithoutInvestorsNestedInput;
    favorites?: PropertyUncheckedUpdateManyWithoutFavoritedByNestedInput;
    leases?: LeaseUncheckedUpdateManyWithoutInvestorNestedInput;
  };

  export type LeaseUpsertWithoutApplicationInput = {
    update: XOR<LeaseUpdateWithoutApplicationInput, LeaseUncheckedUpdateWithoutApplicationInput>;
    create: XOR<LeaseCreateWithoutApplicationInput, LeaseUncheckedCreateWithoutApplicationInput>;
    where?: LeaseWhereInput;
  };

  export type LeaseUpdateToOneWithWhereWithoutApplicationInput = {
    where?: LeaseWhereInput;
    data: XOR<LeaseUpdateWithoutApplicationInput, LeaseUncheckedUpdateWithoutApplicationInput>;
  };

  export type LeaseUpdateWithoutApplicationInput = {
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    rent?: FloatFieldUpdateOperationsInput | number;
    deposit?: FloatFieldUpdateOperationsInput | number;
    property?: PropertyUpdateOneRequiredWithoutLeasesNestedInput;
    investor?: InvestorUpdateOneRequiredWithoutLeasesNestedInput;
    payments?: PaymentUpdateManyWithoutLeaseNestedInput;
  };

  export type LeaseUncheckedUpdateWithoutApplicationInput = {
    id?: IntFieldUpdateOperationsInput | number;
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    rent?: FloatFieldUpdateOperationsInput | number;
    deposit?: FloatFieldUpdateOperationsInput | number;
    propertyId?: IntFieldUpdateOperationsInput | number;
    investorCognitoId?: StringFieldUpdateOperationsInput | string;
    payments?: PaymentUncheckedUpdateManyWithoutLeaseNestedInput;
  };

  export type PropertyCreateWithoutLeasesInput = {
    name: string;
    description: string;
    pricePerMonth: number;
    securityDeposit: number;
    applicationFee: number;
    photoUrls?: PropertyCreatephotoUrlsInput | string[];
    isPetsAllowed?: boolean;
    isParkingIncluded?: boolean;
    beds: number;
    baths: number;
    squareFeet: number;
    propertyType: $Enums.PropertyType;
    postedDate?: Date | string;
    averageRating?: number | null;
    numberOfReviews?: number | null;
    location: LocationCreateNestedOneWithoutPropertiesInput;
    manager: ManagerCreateNestedOneWithoutManagedPropertiesInput;
    applications?: ApplicationCreateNestedManyWithoutPropertyInput;
    favoritedBy?: InvestorCreateNestedManyWithoutFavoritesInput;
    investors?: InvestorCreateNestedManyWithoutPropertiesInput;
  };

  export type PropertyUncheckedCreateWithoutLeasesInput = {
    id?: number;
    name: string;
    description: string;
    pricePerMonth: number;
    securityDeposit: number;
    applicationFee: number;
    photoUrls?: PropertyCreatephotoUrlsInput | string[];
    isPetsAllowed?: boolean;
    isParkingIncluded?: boolean;
    beds: number;
    baths: number;
    squareFeet: number;
    propertyType: $Enums.PropertyType;
    postedDate?: Date | string;
    averageRating?: number | null;
    numberOfReviews?: number | null;
    locationId: number;
    managerCognitoId: string;
    applications?: ApplicationUncheckedCreateNestedManyWithoutPropertyInput;
    favoritedBy?: InvestorUncheckedCreateNestedManyWithoutFavoritesInput;
    investors?: InvestorUncheckedCreateNestedManyWithoutPropertiesInput;
  };

  export type PropertyCreateOrConnectWithoutLeasesInput = {
    where: PropertyWhereUniqueInput;
    create: XOR<PropertyCreateWithoutLeasesInput, PropertyUncheckedCreateWithoutLeasesInput>;
  };

  export type InvestorCreateWithoutLeasesInput = {
    cognitoId: string;
    name: string;
    email: string;
    phoneNumber: string;
    properties?: PropertyCreateNestedManyWithoutInvestorsInput;
    favorites?: PropertyCreateNestedManyWithoutFavoritedByInput;
    applications?: ApplicationCreateNestedManyWithoutInvestorInput;
  };

  export type InvestorUncheckedCreateWithoutLeasesInput = {
    id?: number;
    cognitoId: string;
    name: string;
    email: string;
    phoneNumber: string;
    properties?: PropertyUncheckedCreateNestedManyWithoutInvestorsInput;
    favorites?: PropertyUncheckedCreateNestedManyWithoutFavoritedByInput;
    applications?: ApplicationUncheckedCreateNestedManyWithoutInvestorInput;
  };

  export type InvestorCreateOrConnectWithoutLeasesInput = {
    where: InvestorWhereUniqueInput;
    create: XOR<InvestorCreateWithoutLeasesInput, InvestorUncheckedCreateWithoutLeasesInput>;
  };

  export type ApplicationCreateWithoutLeaseInput = {
    applicationDate: Date | string;
    status: $Enums.ApplicationStatus;
    name: string;
    email: string;
    phoneNumber: string;
    message?: string | null;
    property: PropertyCreateNestedOneWithoutApplicationsInput;
    investor: InvestorCreateNestedOneWithoutApplicationsInput;
  };

  export type ApplicationUncheckedCreateWithoutLeaseInput = {
    id?: number;
    applicationDate: Date | string;
    status: $Enums.ApplicationStatus;
    propertyId: number;
    investorCognitoId: string;
    name: string;
    email: string;
    phoneNumber: string;
    message?: string | null;
  };

  export type ApplicationCreateOrConnectWithoutLeaseInput = {
    where: ApplicationWhereUniqueInput;
    create: XOR<ApplicationCreateWithoutLeaseInput, ApplicationUncheckedCreateWithoutLeaseInput>;
  };

  export type PaymentCreateWithoutLeaseInput = {
    amountDue: number;
    amountPaid: number;
    dueDate: Date | string;
    paymentDate: Date | string;
    paymentStatus: $Enums.PaymentStatus;
  };

  export type PaymentUncheckedCreateWithoutLeaseInput = {
    id?: number;
    amountDue: number;
    amountPaid: number;
    dueDate: Date | string;
    paymentDate: Date | string;
    paymentStatus: $Enums.PaymentStatus;
  };

  export type PaymentCreateOrConnectWithoutLeaseInput = {
    where: PaymentWhereUniqueInput;
    create: XOR<PaymentCreateWithoutLeaseInput, PaymentUncheckedCreateWithoutLeaseInput>;
  };

  export type PaymentCreateManyLeaseInputEnvelope = {
    data: PaymentCreateManyLeaseInput | PaymentCreateManyLeaseInput[];
    skipDuplicates?: boolean;
  };

  export type PropertyUpsertWithoutLeasesInput = {
    update: XOR<PropertyUpdateWithoutLeasesInput, PropertyUncheckedUpdateWithoutLeasesInput>;
    create: XOR<PropertyCreateWithoutLeasesInput, PropertyUncheckedCreateWithoutLeasesInput>;
    where?: PropertyWhereInput;
  };

  export type PropertyUpdateToOneWithWhereWithoutLeasesInput = {
    where?: PropertyWhereInput;
    data: XOR<PropertyUpdateWithoutLeasesInput, PropertyUncheckedUpdateWithoutLeasesInput>;
  };

  export type PropertyUpdateWithoutLeasesInput = {
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    pricePerMonth?: FloatFieldUpdateOperationsInput | number;
    securityDeposit?: FloatFieldUpdateOperationsInput | number;
    applicationFee?: FloatFieldUpdateOperationsInput | number;
    photoUrls?: PropertyUpdatephotoUrlsInput | string[];
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean;
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean;
    beds?: IntFieldUpdateOperationsInput | number;
    baths?: FloatFieldUpdateOperationsInput | number;
    squareFeet?: IntFieldUpdateOperationsInput | number;
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType;
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null;
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null;
    location?: LocationUpdateOneRequiredWithoutPropertiesNestedInput;
    manager?: ManagerUpdateOneRequiredWithoutManagedPropertiesNestedInput;
    applications?: ApplicationUpdateManyWithoutPropertyNestedInput;
    favoritedBy?: InvestorUpdateManyWithoutFavoritesNestedInput;
    investors?: InvestorUpdateManyWithoutPropertiesNestedInput;
  };

  export type PropertyUncheckedUpdateWithoutLeasesInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    pricePerMonth?: FloatFieldUpdateOperationsInput | number;
    securityDeposit?: FloatFieldUpdateOperationsInput | number;
    applicationFee?: FloatFieldUpdateOperationsInput | number;
    photoUrls?: PropertyUpdatephotoUrlsInput | string[];
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean;
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean;
    beds?: IntFieldUpdateOperationsInput | number;
    baths?: FloatFieldUpdateOperationsInput | number;
    squareFeet?: IntFieldUpdateOperationsInput | number;
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType;
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null;
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null;
    locationId?: IntFieldUpdateOperationsInput | number;
    managerCognitoId?: StringFieldUpdateOperationsInput | string;
    applications?: ApplicationUncheckedUpdateManyWithoutPropertyNestedInput;
    favoritedBy?: InvestorUncheckedUpdateManyWithoutFavoritesNestedInput;
    investors?: InvestorUncheckedUpdateManyWithoutPropertiesNestedInput;
  };

  export type InvestorUpsertWithoutLeasesInput = {
    update: XOR<InvestorUpdateWithoutLeasesInput, InvestorUncheckedUpdateWithoutLeasesInput>;
    create: XOR<InvestorCreateWithoutLeasesInput, InvestorUncheckedCreateWithoutLeasesInput>;
    where?: InvestorWhereInput;
  };

  export type InvestorUpdateToOneWithWhereWithoutLeasesInput = {
    where?: InvestorWhereInput;
    data: XOR<InvestorUpdateWithoutLeasesInput, InvestorUncheckedUpdateWithoutLeasesInput>;
  };

  export type InvestorUpdateWithoutLeasesInput = {
    cognitoId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
    properties?: PropertyUpdateManyWithoutInvestorsNestedInput;
    favorites?: PropertyUpdateManyWithoutFavoritedByNestedInput;
    applications?: ApplicationUpdateManyWithoutInvestorNestedInput;
  };

  export type InvestorUncheckedUpdateWithoutLeasesInput = {
    id?: IntFieldUpdateOperationsInput | number;
    cognitoId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
    properties?: PropertyUncheckedUpdateManyWithoutInvestorsNestedInput;
    favorites?: PropertyUncheckedUpdateManyWithoutFavoritedByNestedInput;
    applications?: ApplicationUncheckedUpdateManyWithoutInvestorNestedInput;
  };

  export type ApplicationUpsertWithoutLeaseInput = {
    update: XOR<ApplicationUpdateWithoutLeaseInput, ApplicationUncheckedUpdateWithoutLeaseInput>;
    create: XOR<ApplicationCreateWithoutLeaseInput, ApplicationUncheckedCreateWithoutLeaseInput>;
    where?: ApplicationWhereInput;
  };

  export type ApplicationUpdateToOneWithWhereWithoutLeaseInput = {
    where?: ApplicationWhereInput;
    data: XOR<ApplicationUpdateWithoutLeaseInput, ApplicationUncheckedUpdateWithoutLeaseInput>;
  };

  export type ApplicationUpdateWithoutLeaseInput = {
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    property?: PropertyUpdateOneRequiredWithoutApplicationsNestedInput;
    investor?: InvestorUpdateOneRequiredWithoutApplicationsNestedInput;
  };

  export type ApplicationUncheckedUpdateWithoutLeaseInput = {
    id?: IntFieldUpdateOperationsInput | number;
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus;
    propertyId?: IntFieldUpdateOperationsInput | number;
    investorCognitoId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type PaymentUpsertWithWhereUniqueWithoutLeaseInput = {
    where: PaymentWhereUniqueInput;
    update: XOR<PaymentUpdateWithoutLeaseInput, PaymentUncheckedUpdateWithoutLeaseInput>;
    create: XOR<PaymentCreateWithoutLeaseInput, PaymentUncheckedCreateWithoutLeaseInput>;
  };

  export type PaymentUpdateWithWhereUniqueWithoutLeaseInput = {
    where: PaymentWhereUniqueInput;
    data: XOR<PaymentUpdateWithoutLeaseInput, PaymentUncheckedUpdateWithoutLeaseInput>;
  };

  export type PaymentUpdateManyWithWhereWithoutLeaseInput = {
    where: PaymentScalarWhereInput;
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutLeaseInput>;
  };

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[];
    OR?: PaymentScalarWhereInput[];
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[];
    id?: IntFilter<"Payment"> | number;
    amountDue?: FloatFilter<"Payment"> | number;
    amountPaid?: FloatFilter<"Payment"> | number;
    dueDate?: DateTimeFilter<"Payment"> | Date | string;
    paymentDate?: DateTimeFilter<"Payment"> | Date | string;
    paymentStatus?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus;
    leaseId?: IntFilter<"Payment"> | number;
  };

  export type LeaseCreateWithoutPaymentsInput = {
    startDate: Date | string;
    endDate: Date | string;
    rent: number;
    deposit: number;
    property: PropertyCreateNestedOneWithoutLeasesInput;
    investor: InvestorCreateNestedOneWithoutLeasesInput;
    application?: ApplicationCreateNestedOneWithoutLeaseInput;
  };

  export type LeaseUncheckedCreateWithoutPaymentsInput = {
    id?: number;
    startDate: Date | string;
    endDate: Date | string;
    rent: number;
    deposit: number;
    propertyId: number;
    investorCognitoId: string;
    application?: ApplicationUncheckedCreateNestedOneWithoutLeaseInput;
  };

  export type LeaseCreateOrConnectWithoutPaymentsInput = {
    where: LeaseWhereUniqueInput;
    create: XOR<LeaseCreateWithoutPaymentsInput, LeaseUncheckedCreateWithoutPaymentsInput>;
  };

  export type LeaseUpsertWithoutPaymentsInput = {
    update: XOR<LeaseUpdateWithoutPaymentsInput, LeaseUncheckedUpdateWithoutPaymentsInput>;
    create: XOR<LeaseCreateWithoutPaymentsInput, LeaseUncheckedCreateWithoutPaymentsInput>;
    where?: LeaseWhereInput;
  };

  export type LeaseUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: LeaseWhereInput;
    data: XOR<LeaseUpdateWithoutPaymentsInput, LeaseUncheckedUpdateWithoutPaymentsInput>;
  };

  export type LeaseUpdateWithoutPaymentsInput = {
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    rent?: FloatFieldUpdateOperationsInput | number;
    deposit?: FloatFieldUpdateOperationsInput | number;
    property?: PropertyUpdateOneRequiredWithoutLeasesNestedInput;
    investor?: InvestorUpdateOneRequiredWithoutLeasesNestedInput;
    application?: ApplicationUpdateOneWithoutLeaseNestedInput;
  };

  export type LeaseUncheckedUpdateWithoutPaymentsInput = {
    id?: IntFieldUpdateOperationsInput | number;
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    rent?: FloatFieldUpdateOperationsInput | number;
    deposit?: FloatFieldUpdateOperationsInput | number;
    propertyId?: IntFieldUpdateOperationsInput | number;
    investorCognitoId?: StringFieldUpdateOperationsInput | string;
    application?: ApplicationUncheckedUpdateOneWithoutLeaseNestedInput;
  };

  export type LeaseCreateManyPropertyInput = {
    id?: number;
    startDate: Date | string;
    endDate: Date | string;
    rent: number;
    deposit: number;
    investorCognitoId: string;
  };

  export type ApplicationCreateManyPropertyInput = {
    id?: number;
    applicationDate: Date | string;
    status: $Enums.ApplicationStatus;
    investorCognitoId: string;
    name: string;
    email: string;
    phoneNumber: string;
    message?: string | null;
    leaseId?: number | null;
  };

  export type LeaseUpdateWithoutPropertyInput = {
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    rent?: FloatFieldUpdateOperationsInput | number;
    deposit?: FloatFieldUpdateOperationsInput | number;
    investor?: InvestorUpdateOneRequiredWithoutLeasesNestedInput;
    application?: ApplicationUpdateOneWithoutLeaseNestedInput;
    payments?: PaymentUpdateManyWithoutLeaseNestedInput;
  };

  export type LeaseUncheckedUpdateWithoutPropertyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    rent?: FloatFieldUpdateOperationsInput | number;
    deposit?: FloatFieldUpdateOperationsInput | number;
    investorCognitoId?: StringFieldUpdateOperationsInput | string;
    application?: ApplicationUncheckedUpdateOneWithoutLeaseNestedInput;
    payments?: PaymentUncheckedUpdateManyWithoutLeaseNestedInput;
  };

  export type LeaseUncheckedUpdateManyWithoutPropertyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    rent?: FloatFieldUpdateOperationsInput | number;
    deposit?: FloatFieldUpdateOperationsInput | number;
    investorCognitoId?: StringFieldUpdateOperationsInput | string;
  };

  export type ApplicationUpdateWithoutPropertyInput = {
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    investor?: InvestorUpdateOneRequiredWithoutApplicationsNestedInput;
    lease?: LeaseUpdateOneWithoutApplicationNestedInput;
  };

  export type ApplicationUncheckedUpdateWithoutPropertyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus;
    investorCognitoId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    leaseId?: NullableIntFieldUpdateOperationsInput | number | null;
  };

  export type ApplicationUncheckedUpdateManyWithoutPropertyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus;
    investorCognitoId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    leaseId?: NullableIntFieldUpdateOperationsInput | number | null;
  };

  export type InvestorUpdateWithoutFavoritesInput = {
    cognitoId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
    properties?: PropertyUpdateManyWithoutInvestorsNestedInput;
    applications?: ApplicationUpdateManyWithoutInvestorNestedInput;
    leases?: LeaseUpdateManyWithoutInvestorNestedInput;
  };

  export type InvestorUncheckedUpdateWithoutFavoritesInput = {
    id?: IntFieldUpdateOperationsInput | number;
    cognitoId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
    properties?: PropertyUncheckedUpdateManyWithoutInvestorsNestedInput;
    applications?: ApplicationUncheckedUpdateManyWithoutInvestorNestedInput;
    leases?: LeaseUncheckedUpdateManyWithoutInvestorNestedInput;
  };

  export type InvestorUncheckedUpdateManyWithoutFavoritesInput = {
    id?: IntFieldUpdateOperationsInput | number;
    cognitoId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
  };

  export type InvestorUpdateWithoutPropertiesInput = {
    cognitoId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
    favorites?: PropertyUpdateManyWithoutFavoritedByNestedInput;
    applications?: ApplicationUpdateManyWithoutInvestorNestedInput;
    leases?: LeaseUpdateManyWithoutInvestorNestedInput;
  };

  export type InvestorUncheckedUpdateWithoutPropertiesInput = {
    id?: IntFieldUpdateOperationsInput | number;
    cognitoId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
    favorites?: PropertyUncheckedUpdateManyWithoutFavoritedByNestedInput;
    applications?: ApplicationUncheckedUpdateManyWithoutInvestorNestedInput;
    leases?: LeaseUncheckedUpdateManyWithoutInvestorNestedInput;
  };

  export type InvestorUncheckedUpdateManyWithoutPropertiesInput = {
    id?: IntFieldUpdateOperationsInput | number;
    cognitoId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
  };

  export type PropertyCreateManyManagerInput = {
    id?: number;
    name: string;
    description: string;
    pricePerMonth: number;
    securityDeposit: number;
    applicationFee: number;
    photoUrls?: PropertyCreatephotoUrlsInput | string[];
    isPetsAllowed?: boolean;
    isParkingIncluded?: boolean;
    beds: number;
    baths: number;
    squareFeet: number;
    propertyType: $Enums.PropertyType;
    postedDate?: Date | string;
    averageRating?: number | null;
    numberOfReviews?: number | null;
    locationId: number;
  };

  export type PropertyUpdateWithoutManagerInput = {
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    pricePerMonth?: FloatFieldUpdateOperationsInput | number;
    securityDeposit?: FloatFieldUpdateOperationsInput | number;
    applicationFee?: FloatFieldUpdateOperationsInput | number;
    photoUrls?: PropertyUpdatephotoUrlsInput | string[];
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean;
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean;
    beds?: IntFieldUpdateOperationsInput | number;
    baths?: FloatFieldUpdateOperationsInput | number;
    squareFeet?: IntFieldUpdateOperationsInput | number;
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType;
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null;
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null;
    location?: LocationUpdateOneRequiredWithoutPropertiesNestedInput;
    leases?: LeaseUpdateManyWithoutPropertyNestedInput;
    applications?: ApplicationUpdateManyWithoutPropertyNestedInput;
    favoritedBy?: InvestorUpdateManyWithoutFavoritesNestedInput;
    investors?: InvestorUpdateManyWithoutPropertiesNestedInput;
  };

  export type PropertyUncheckedUpdateWithoutManagerInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    pricePerMonth?: FloatFieldUpdateOperationsInput | number;
    securityDeposit?: FloatFieldUpdateOperationsInput | number;
    applicationFee?: FloatFieldUpdateOperationsInput | number;
    photoUrls?: PropertyUpdatephotoUrlsInput | string[];
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean;
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean;
    beds?: IntFieldUpdateOperationsInput | number;
    baths?: FloatFieldUpdateOperationsInput | number;
    squareFeet?: IntFieldUpdateOperationsInput | number;
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType;
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null;
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null;
    locationId?: IntFieldUpdateOperationsInput | number;
    leases?: LeaseUncheckedUpdateManyWithoutPropertyNestedInput;
    applications?: ApplicationUncheckedUpdateManyWithoutPropertyNestedInput;
    favoritedBy?: InvestorUncheckedUpdateManyWithoutFavoritesNestedInput;
    investors?: InvestorUncheckedUpdateManyWithoutPropertiesNestedInput;
  };

  export type PropertyUncheckedUpdateManyWithoutManagerInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    pricePerMonth?: FloatFieldUpdateOperationsInput | number;
    securityDeposit?: FloatFieldUpdateOperationsInput | number;
    applicationFee?: FloatFieldUpdateOperationsInput | number;
    photoUrls?: PropertyUpdatephotoUrlsInput | string[];
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean;
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean;
    beds?: IntFieldUpdateOperationsInput | number;
    baths?: FloatFieldUpdateOperationsInput | number;
    squareFeet?: IntFieldUpdateOperationsInput | number;
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType;
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null;
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null;
    locationId?: IntFieldUpdateOperationsInput | number;
  };

  export type ApplicationCreateManyInvestorInput = {
    id?: number;
    applicationDate: Date | string;
    status: $Enums.ApplicationStatus;
    propertyId: number;
    name: string;
    email: string;
    phoneNumber: string;
    message?: string | null;
    leaseId?: number | null;
  };

  export type LeaseCreateManyInvestorInput = {
    id?: number;
    startDate: Date | string;
    endDate: Date | string;
    rent: number;
    deposit: number;
    propertyId: number;
  };

  export type PropertyUpdateWithoutInvestorsInput = {
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    pricePerMonth?: FloatFieldUpdateOperationsInput | number;
    securityDeposit?: FloatFieldUpdateOperationsInput | number;
    applicationFee?: FloatFieldUpdateOperationsInput | number;
    photoUrls?: PropertyUpdatephotoUrlsInput | string[];
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean;
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean;
    beds?: IntFieldUpdateOperationsInput | number;
    baths?: FloatFieldUpdateOperationsInput | number;
    squareFeet?: IntFieldUpdateOperationsInput | number;
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType;
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null;
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null;
    location?: LocationUpdateOneRequiredWithoutPropertiesNestedInput;
    manager?: ManagerUpdateOneRequiredWithoutManagedPropertiesNestedInput;
    leases?: LeaseUpdateManyWithoutPropertyNestedInput;
    applications?: ApplicationUpdateManyWithoutPropertyNestedInput;
    favoritedBy?: InvestorUpdateManyWithoutFavoritesNestedInput;
  };

  export type PropertyUncheckedUpdateWithoutInvestorsInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    pricePerMonth?: FloatFieldUpdateOperationsInput | number;
    securityDeposit?: FloatFieldUpdateOperationsInput | number;
    applicationFee?: FloatFieldUpdateOperationsInput | number;
    photoUrls?: PropertyUpdatephotoUrlsInput | string[];
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean;
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean;
    beds?: IntFieldUpdateOperationsInput | number;
    baths?: FloatFieldUpdateOperationsInput | number;
    squareFeet?: IntFieldUpdateOperationsInput | number;
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType;
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null;
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null;
    locationId?: IntFieldUpdateOperationsInput | number;
    managerCognitoId?: StringFieldUpdateOperationsInput | string;
    leases?: LeaseUncheckedUpdateManyWithoutPropertyNestedInput;
    applications?: ApplicationUncheckedUpdateManyWithoutPropertyNestedInput;
    favoritedBy?: InvestorUncheckedUpdateManyWithoutFavoritesNestedInput;
  };

  export type PropertyUncheckedUpdateManyWithoutInvestorsInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    pricePerMonth?: FloatFieldUpdateOperationsInput | number;
    securityDeposit?: FloatFieldUpdateOperationsInput | number;
    applicationFee?: FloatFieldUpdateOperationsInput | number;
    photoUrls?: PropertyUpdatephotoUrlsInput | string[];
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean;
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean;
    beds?: IntFieldUpdateOperationsInput | number;
    baths?: FloatFieldUpdateOperationsInput | number;
    squareFeet?: IntFieldUpdateOperationsInput | number;
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType;
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null;
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null;
    locationId?: IntFieldUpdateOperationsInput | number;
    managerCognitoId?: StringFieldUpdateOperationsInput | string;
  };

  export type PropertyUpdateWithoutFavoritedByInput = {
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    pricePerMonth?: FloatFieldUpdateOperationsInput | number;
    securityDeposit?: FloatFieldUpdateOperationsInput | number;
    applicationFee?: FloatFieldUpdateOperationsInput | number;
    photoUrls?: PropertyUpdatephotoUrlsInput | string[];
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean;
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean;
    beds?: IntFieldUpdateOperationsInput | number;
    baths?: FloatFieldUpdateOperationsInput | number;
    squareFeet?: IntFieldUpdateOperationsInput | number;
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType;
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null;
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null;
    location?: LocationUpdateOneRequiredWithoutPropertiesNestedInput;
    manager?: ManagerUpdateOneRequiredWithoutManagedPropertiesNestedInput;
    leases?: LeaseUpdateManyWithoutPropertyNestedInput;
    applications?: ApplicationUpdateManyWithoutPropertyNestedInput;
    investors?: InvestorUpdateManyWithoutPropertiesNestedInput;
  };

  export type PropertyUncheckedUpdateWithoutFavoritedByInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    pricePerMonth?: FloatFieldUpdateOperationsInput | number;
    securityDeposit?: FloatFieldUpdateOperationsInput | number;
    applicationFee?: FloatFieldUpdateOperationsInput | number;
    photoUrls?: PropertyUpdatephotoUrlsInput | string[];
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean;
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean;
    beds?: IntFieldUpdateOperationsInput | number;
    baths?: FloatFieldUpdateOperationsInput | number;
    squareFeet?: IntFieldUpdateOperationsInput | number;
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType;
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null;
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null;
    locationId?: IntFieldUpdateOperationsInput | number;
    managerCognitoId?: StringFieldUpdateOperationsInput | string;
    leases?: LeaseUncheckedUpdateManyWithoutPropertyNestedInput;
    applications?: ApplicationUncheckedUpdateManyWithoutPropertyNestedInput;
    investors?: InvestorUncheckedUpdateManyWithoutPropertiesNestedInput;
  };

  export type PropertyUncheckedUpdateManyWithoutFavoritedByInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    pricePerMonth?: FloatFieldUpdateOperationsInput | number;
    securityDeposit?: FloatFieldUpdateOperationsInput | number;
    applicationFee?: FloatFieldUpdateOperationsInput | number;
    photoUrls?: PropertyUpdatephotoUrlsInput | string[];
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean;
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean;
    beds?: IntFieldUpdateOperationsInput | number;
    baths?: FloatFieldUpdateOperationsInput | number;
    squareFeet?: IntFieldUpdateOperationsInput | number;
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType;
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null;
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null;
    locationId?: IntFieldUpdateOperationsInput | number;
    managerCognitoId?: StringFieldUpdateOperationsInput | string;
  };

  export type ApplicationUpdateWithoutInvestorInput = {
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    property?: PropertyUpdateOneRequiredWithoutApplicationsNestedInput;
    lease?: LeaseUpdateOneWithoutApplicationNestedInput;
  };

  export type ApplicationUncheckedUpdateWithoutInvestorInput = {
    id?: IntFieldUpdateOperationsInput | number;
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus;
    propertyId?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    leaseId?: NullableIntFieldUpdateOperationsInput | number | null;
  };

  export type ApplicationUncheckedUpdateManyWithoutInvestorInput = {
    id?: IntFieldUpdateOperationsInput | number;
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus;
    propertyId?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phoneNumber?: StringFieldUpdateOperationsInput | string;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    leaseId?: NullableIntFieldUpdateOperationsInput | number | null;
  };

  export type LeaseUpdateWithoutInvestorInput = {
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    rent?: FloatFieldUpdateOperationsInput | number;
    deposit?: FloatFieldUpdateOperationsInput | number;
    property?: PropertyUpdateOneRequiredWithoutLeasesNestedInput;
    application?: ApplicationUpdateOneWithoutLeaseNestedInput;
    payments?: PaymentUpdateManyWithoutLeaseNestedInput;
  };

  export type LeaseUncheckedUpdateWithoutInvestorInput = {
    id?: IntFieldUpdateOperationsInput | number;
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    rent?: FloatFieldUpdateOperationsInput | number;
    deposit?: FloatFieldUpdateOperationsInput | number;
    propertyId?: IntFieldUpdateOperationsInput | number;
    application?: ApplicationUncheckedUpdateOneWithoutLeaseNestedInput;
    payments?: PaymentUncheckedUpdateManyWithoutLeaseNestedInput;
  };

  export type LeaseUncheckedUpdateManyWithoutInvestorInput = {
    id?: IntFieldUpdateOperationsInput | number;
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    rent?: FloatFieldUpdateOperationsInput | number;
    deposit?: FloatFieldUpdateOperationsInput | number;
    propertyId?: IntFieldUpdateOperationsInput | number;
  };

  export type PropertyCreateManyLocationInput = {
    id?: number;
    name: string;
    description: string;
    pricePerMonth: number;
    securityDeposit: number;
    applicationFee: number;
    photoUrls?: PropertyCreatephotoUrlsInput | string[];
    isPetsAllowed?: boolean;
    isParkingIncluded?: boolean;
    beds: number;
    baths: number;
    squareFeet: number;
    propertyType: $Enums.PropertyType;
    postedDate?: Date | string;
    averageRating?: number | null;
    numberOfReviews?: number | null;
    managerCognitoId: string;
  };

  export type PropertyUpdateWithoutLocationInput = {
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    pricePerMonth?: FloatFieldUpdateOperationsInput | number;
    securityDeposit?: FloatFieldUpdateOperationsInput | number;
    applicationFee?: FloatFieldUpdateOperationsInput | number;
    photoUrls?: PropertyUpdatephotoUrlsInput | string[];
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean;
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean;
    beds?: IntFieldUpdateOperationsInput | number;
    baths?: FloatFieldUpdateOperationsInput | number;
    squareFeet?: IntFieldUpdateOperationsInput | number;
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType;
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null;
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null;
    manager?: ManagerUpdateOneRequiredWithoutManagedPropertiesNestedInput;
    leases?: LeaseUpdateManyWithoutPropertyNestedInput;
    applications?: ApplicationUpdateManyWithoutPropertyNestedInput;
    favoritedBy?: InvestorUpdateManyWithoutFavoritesNestedInput;
    investors?: InvestorUpdateManyWithoutPropertiesNestedInput;
  };

  export type PropertyUncheckedUpdateWithoutLocationInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    pricePerMonth?: FloatFieldUpdateOperationsInput | number;
    securityDeposit?: FloatFieldUpdateOperationsInput | number;
    applicationFee?: FloatFieldUpdateOperationsInput | number;
    photoUrls?: PropertyUpdatephotoUrlsInput | string[];
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean;
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean;
    beds?: IntFieldUpdateOperationsInput | number;
    baths?: FloatFieldUpdateOperationsInput | number;
    squareFeet?: IntFieldUpdateOperationsInput | number;
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType;
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null;
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null;
    managerCognitoId?: StringFieldUpdateOperationsInput | string;
    leases?: LeaseUncheckedUpdateManyWithoutPropertyNestedInput;
    applications?: ApplicationUncheckedUpdateManyWithoutPropertyNestedInput;
    favoritedBy?: InvestorUncheckedUpdateManyWithoutFavoritesNestedInput;
    investors?: InvestorUncheckedUpdateManyWithoutPropertiesNestedInput;
  };

  export type PropertyUncheckedUpdateManyWithoutLocationInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    pricePerMonth?: FloatFieldUpdateOperationsInput | number;
    securityDeposit?: FloatFieldUpdateOperationsInput | number;
    applicationFee?: FloatFieldUpdateOperationsInput | number;
    photoUrls?: PropertyUpdatephotoUrlsInput | string[];
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean;
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean;
    beds?: IntFieldUpdateOperationsInput | number;
    baths?: FloatFieldUpdateOperationsInput | number;
    squareFeet?: IntFieldUpdateOperationsInput | number;
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType;
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null;
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null;
    managerCognitoId?: StringFieldUpdateOperationsInput | string;
  };

  export type PaymentCreateManyLeaseInput = {
    id?: number;
    amountDue: number;
    amountPaid: number;
    dueDate: Date | string;
    paymentDate: Date | string;
    paymentStatus: $Enums.PaymentStatus;
  };

  export type PaymentUpdateWithoutLeaseInput = {
    amountDue?: FloatFieldUpdateOperationsInput | number;
    amountPaid?: FloatFieldUpdateOperationsInput | number;
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
  };

  export type PaymentUncheckedUpdateWithoutLeaseInput = {
    id?: IntFieldUpdateOperationsInput | number;
    amountDue?: FloatFieldUpdateOperationsInput | number;
    amountPaid?: FloatFieldUpdateOperationsInput | number;
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
  };

  export type PaymentUncheckedUpdateManyWithoutLeaseInput = {
    id?: IntFieldUpdateOperationsInput | number;
    amountDue?: FloatFieldUpdateOperationsInput | number;
    amountPaid?: FloatFieldUpdateOperationsInput | number;
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
  };

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF;
}
