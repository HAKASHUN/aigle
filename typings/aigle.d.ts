export default AigleCore.Aigle;
export class Aigle<R> extends AigleCore.Aigle<R> {}
export as namespace Aigle;

declare namespace AigleCore {
  class CancellationError extends Error {}
  class TimeoutError extends Error {}
  type ReturnType<T> = T | PromiseLike<T>;
  type ResolvableProps<T> = object & { [K in keyof T]: ReturnType<T[K]> };

  type CatchFilter<E> = (new (...args: any[]) => E) | ((error: E) => boolean) | (object & E);
  type Many<T> = T | T[];
  type List<T> = ArrayLike<T>;
  type Dictionary<T> = Record<string, T>;
  type NotVoid = {} | null | undefined;

  type PromiseCallback<T> = () => ReturnType<T>;

  type ArrayIterator<T, TResult = NotVoid> = (
    value: T,
    index: number,
    collection: T[]
  ) => ReturnType<TResult>;
  type ListIterator<T, TResult = NotVoid> = (
    value: T,
    index: number,
    collection: List<T>
  ) => ReturnType<TResult>;
  type ObjectIterator<T, TResult = NotVoid> = (
    value: T[keyof T],
    key: keyof T,
    collection: T
  ) => ReturnType<TResult>;

  type MemoArrayIterator<T, TResult, IResult = any> = (
    accumulator: TResult,
    value: T,
    index: number,
    collection: T[]
  ) => ReturnType<IResult>;
  type MemoListIterator<T, TResult, IResult = any> = (
    accumulator: TResult,
    value: T,
    index: number,
    collection: List<T>
  ) => ReturnType<IResult>;
  type MemoObjectIterator<T, TResult, IResult = any> = (
    accumulator: TResult,
    value: T[keyof T],
    key: keyof T,
    collection: T
  ) => ReturnType<IResult>;

  interface ConfigOpts {
    longStackTraces?: boolean;
    cancellation?: boolean;
  }

  interface RetryOpts {
    times?: number;
    interval?: number | ((count?: number) => number);
  }

  export class Disposer<T> {}

  export class Aigle<R> implements PromiseLike<R> {
    constructor(
      executor: (
        resolve: (thenableOrResult?: R | PromiseLike<R>) => void,
        reject: (error?: any) => void,
        onCancel?: (callback: () => void) => void
      ) => void
    );

    /* then */

    then<T>(
      onFulfill?: (value: R) => ReturnType<T>,
      onReject?: (error: any) => ReturnType<T>
    ): Aigle<T>;

    then<TResult1 = R, TResult2 = never>(
      onfulfilled?: ((value: R) => ReturnType<TResult1>) | null,
      onrejected?: ((reason: any) => ReturnType<TResult2>) | null
    ): Aigle<TResult1 | TResult2>;

    /* catch */

    catch(onReject: (error: any) => ReturnType<R>): Aigle<R>;

    catch<T>(onReject: ((error: any) => ReturnType<T>) | undefined | null): Aigle<T | R>;

    catch<E1>(filter1: CatchFilter<E1>, onReject: (error: E1) => ReturnType<R>): Aigle<R>;

    catch<E1, E2>(
      filter1: CatchFilter<E1>,
      filter2: CatchFilter<E2>,
      onReject: (error: E1 | E2) => ReturnType<R>
    ): Aigle<R>;

    catch<E1, E2, E3>(
      filter1: CatchFilter<E1>,
      filter2: CatchFilter<E2>,
      filter3: CatchFilter<E3>,
      onReject: (error: E1 | E2 | E3) => ReturnType<R>
    ): Aigle<R>;

    catch<E1, E2, E3, E4>(
      filter1: CatchFilter<E1>,
      filter2: CatchFilter<E2>,
      filter3: CatchFilter<E3>,
      filter4: CatchFilter<E4>,
      onReject: (error: E1 | E2 | E3 | E4) => ReturnType<R>
    ): Aigle<R>;

    catch<E1, E2, E3, E4, E5>(
      filter1: CatchFilter<E1>,
      filter2: CatchFilter<E2>,
      filter3: CatchFilter<E3>,
      filter4: CatchFilter<E4>,
      filter5: CatchFilter<E5>,
      onReject: (error: E1 | E2 | E3 | E4 | E5) => ReturnType<R>
    ): Aigle<R>;

    catch<T, E1>(filter1: CatchFilter<E1>, onReject: (error: E1) => ReturnType<T>): Aigle<T | R>;

    catch<T, E1, E2>(
      filter1: CatchFilter<E1>,
      filter2: CatchFilter<E2>,
      onReject: (error: E1 | E2) => ReturnType<T>
    ): Aigle<T | R>;

    catch<T, E1, E2, E3>(
      filter1: CatchFilter<E1>,
      filter2: CatchFilter<E2>,
      filter3: CatchFilter<E3>,
      onReject: (error: E1 | E2 | E3) => ReturnType<T>
    ): Aigle<T | R>;

    catch<T, E1, E2, E3, E4>(
      filter1: CatchFilter<E1>,
      filter2: CatchFilter<E2>,
      filter3: CatchFilter<E3>,
      filter4: CatchFilter<E4>,
      onReject: (error: E1 | E2 | E3 | E4) => ReturnType<T>
    ): Aigle<T | R>;

    catch<T, E1, E2, E3, E4, E5>(
      filter1: CatchFilter<E1>,
      filter2: CatchFilter<E2>,
      filter3: CatchFilter<E3>,
      filter4: CatchFilter<E4>,
      filter5: CatchFilter<E5>,
      onReject: (error: E1 | E2 | E3 | E4 | E5) => ReturnType<T>
    ): Aigle<T | R>;

    /* finally */

    finally<T>(handler: () => ReturnType<T>): Aigle<R>;

    /* all */

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Aigle.
     */
    all<T1>(this: Aigle<[T1 | PromiseLike<T1>]>): Aigle<[T1]>;

    all<T1, T2>(this: Aigle<[T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]>): Aigle<[T1, T2]>;

    all<T1, T2, T3>(
      this: Aigle<[T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>]>
    ): Aigle<[T1, T2, T3]>;

    all<T1, T2, T3, T4>(
      this: Aigle<
        [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>]
      >
    ): Aigle<[T1, T2, T3, T4]>;

    all<T1, T2, T3, T4, T5>(
      this: Aigle<
        [
          T1 | PromiseLike<T1>,
          T2 | PromiseLike<T2>,
          T3 | PromiseLike<T3>,
          T4 | PromiseLike<T4>,
          T5 | PromiseLike<T5>
        ]
      >
    ): Aigle<[T1, T2, T3, T4, T5]>;

    all<T1, T2, T3, T4, T5, T6>(
      this: Aigle<
        [
          T1 | PromiseLike<T1>,
          T2 | PromiseLike<T2>,
          T3 | PromiseLike<T3>,
          T4 | PromiseLike<T4>,
          T5 | PromiseLike<T5>,
          T6 | PromiseLike<T6>
        ]
      >
    ): Aigle<[T1, T2, T3, T4, T5, T6]>;

    all<T1, T2, T3, T4, T5, T6, T7>(
      this: Aigle<
        [
          T1 | PromiseLike<T1>,
          T2 | PromiseLike<T2>,
          T3 | PromiseLike<T3>,
          T4 | PromiseLike<T4>,
          T5 | PromiseLike<T5>,
          T6 | PromiseLike<T6>,
          T7 | PromiseLike<T7>
        ]
      >
    ): Aigle<[T1, T2, T3, T4, T5, T6, T7]>;

    all<T1, T2, T3, T4, T5, T6, T7, T8>(
      this: Aigle<
        [
          T1 | PromiseLike<T1>,
          T2 | PromiseLike<T2>,
          T3 | PromiseLike<T3>,
          T4 | PromiseLike<T4>,
          T5 | PromiseLike<T5>,
          T6 | PromiseLike<T6>,
          T7 | PromiseLike<T7>,
          T8 | PromiseLike<T8>
        ]
      >
    ): Aigle<[T1, T2, T3, T4, T5, T6, T7, T8]>;

    all<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
      this: Aigle<
        [
          T1 | PromiseLike<T1>,
          T2 | PromiseLike<T2>,
          T3 | PromiseLike<T3>,
          T4 | PromiseLike<T4>,
          T5 | PromiseLike<T5>,
          T6 | PromiseLike<T6>,
          T7 | PromiseLike<T7>,
          T8 | PromiseLike<T8>,
          T9 | PromiseLike<T9>
        ]
      >
    ): Aigle<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;

    all<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
      this: Aigle<
        [
          T1 | PromiseLike<T1>,
          T2 | PromiseLike<T2>,
          T3 | PromiseLike<T3>,
          T4 | PromiseLike<T4>,
          T5 | PromiseLike<T5>,
          T6 | PromiseLike<T6>,
          T7 | PromiseLike<T7>,
          T8 | PromiseLike<T8>,
          T9 | PromiseLike<T9>,
          T10 | PromiseLike<T10>
        ]
      >
    ): Aigle<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;

    all<T>(this: Aigle<(T | PromiseLike<T>)[]>): Aigle<T[]>;

    /* race */

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Aigle.
     */
    race<T1>(this: Aigle<[T1 | PromiseLike<T1>]>): Aigle<T1>;

    race<T1, T2>(this: Aigle<[T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]>): Aigle<T1 | T2>;

    race<T1, T2, T3>(
      this: Aigle<[T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>]>
    ): Aigle<T1 | T2 | T3>;

    race<T1, T2, T3, T4>(
      this: Aigle<
        [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>]
      >
    ): Aigle<T1 | T2 | T3 | T4>;

    race<T1, T2, T3, T4, T5>(
      this: Aigle<
        [
          T1 | PromiseLike<T1>,
          T2 | PromiseLike<T2>,
          T3 | PromiseLike<T3>,
          T4 | PromiseLike<T4>,
          T5 | PromiseLike<T5>
        ]
      >
    ): Aigle<T1 | T2 | T3 | T4 | T5>;

    race<T1, T2, T3, T4, T5, T6>(
      this: Aigle<
        [
          T1 | PromiseLike<T1>,
          T2 | PromiseLike<T2>,
          T3 | PromiseLike<T3>,
          T4 | PromiseLike<T4>,
          T5 | PromiseLike<T5>,
          T6 | PromiseLike<T6>
        ]
      >
    ): Aigle<T1 | T2 | T3 | T4 | T5 | T6>;

    race<T1, T2, T3, T4, T5, T6, T7>(
      this: Aigle<
        [
          T1 | PromiseLike<T1>,
          T2 | PromiseLike<T2>,
          T3 | PromiseLike<T3>,
          T4 | PromiseLike<T4>,
          T5 | PromiseLike<T5>,
          T6 | PromiseLike<T6>,
          T7 | PromiseLike<T7>
        ]
      >
    ): Aigle<T1 | T2 | T3 | T4 | T5 | T6 | T7>;

    race<T1, T2, T3, T4, T5, T6, T7, T8>(
      this: Aigle<
        [
          T1 | PromiseLike<T1>,
          T2 | PromiseLike<T2>,
          T3 | PromiseLike<T3>,
          T4 | PromiseLike<T4>,
          T5 | PromiseLike<T5>,
          T6 | PromiseLike<T6>,
          T7 | PromiseLike<T7>,
          T8 | PromiseLike<T8>
        ]
      >
    ): Aigle<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>;

    race<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
      this: Aigle<
        [
          T1 | PromiseLike<T1>,
          T2 | PromiseLike<T2>,
          T3 | PromiseLike<T3>,
          T4 | PromiseLike<T4>,
          T5 | PromiseLike<T5>,
          T6 | PromiseLike<T6>,
          T7 | PromiseLike<T7>,
          T8 | PromiseLike<T8>,
          T9 | PromiseLike<T9>
        ]
      >
    ): Aigle<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>;

    race<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
      this: Aigle<
        [
          T1 | PromiseLike<T1>,
          T2 | PromiseLike<T2>,
          T3 | PromiseLike<T3>,
          T4 | PromiseLike<T4>,
          T5 | PromiseLike<T5>,
          T6 | PromiseLike<T6>,
          T7 | PromiseLike<T7>,
          T8 | PromiseLike<T8>,
          T9 | PromiseLike<T9>,
          T10 | PromiseLike<T10>
        ]
      >
    ): Aigle<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10>;

    race<T>(this: Aigle<(T | PromiseLike<T>)[]>): Aigle<T>;

    /* prpps */

    props<K, V>(this: Aigle<Map<K, PromiseLike<V> | V>>): Aigle<Map<K, V>>;

    props<T>(this: Aigle<ResolvableProps<T>>): Aigle<T>;

    /* series */

    series<T1>(this: Aigle<[T1 | PromiseLike<T1> | PromiseCallback<T1>]>): Aigle<[T1]>;

    series<T1, T2>(
      this: Aigle<
        [T1 | PromiseLike<T1> | PromiseCallback<T1>, T2 | PromiseLike<T2> | PromiseCallback<T2>]
      >
    ): Aigle<[T1, T2]>;

    series<T1, T2, T3>(
      this: Aigle<
        [
          T1 | PromiseLike<T1> | PromiseCallback<T1>,
          T2 | PromiseLike<T2> | PromiseCallback<T2>,
          T3 | PromiseLike<T3> | PromiseCallback<T3>
        ]
      >
    ): Aigle<[T1, T2, T3]>;

    series<T1, T2, T3, T4>(
      this: Aigle<
        [
          T1 | PromiseLike<T1> | PromiseCallback<T1>,
          T2 | PromiseLike<T2> | PromiseCallback<T2>,
          T3 | PromiseLike<T3> | PromiseCallback<T3>,
          T4 | PromiseLike<T4> | PromiseCallback<T4>
        ]
      >
    ): Aigle<[T1, T2, T3, T4]>;

    series<T1, T2, T3, T4, T5>(
      this: Aigle<
        [
          T1 | PromiseLike<T1> | PromiseCallback<T1>,
          T2 | PromiseLike<T2> | PromiseCallback<T2>,
          T3 | PromiseLike<T3> | PromiseCallback<T3>,
          T4 | PromiseLike<T4> | PromiseCallback<T4>,
          T5 | PromiseLike<T5> | PromiseCallback<T5>
        ]
      >
    ): Aigle<[T1, T2, T3, T4, T5]>;

    series<T1, T2, T3, T4, T5, T6>(
      this: Aigle<
        [
          T1 | PromiseLike<T1> | PromiseCallback<T1>,
          T2 | PromiseLike<T2> | PromiseCallback<T2>,
          T3 | PromiseLike<T3> | PromiseCallback<T3>,
          T4 | PromiseLike<T4> | PromiseCallback<T4>,
          T5 | PromiseLike<T5> | PromiseCallback<T5>,
          T6 | PromiseLike<T6> | PromiseCallback<T6>
        ]
      >
    ): Aigle<[T1, T2, T3, T4, T5, T6]>;

    series<T1, T2, T3, T4, T5, T6, T7>(
      this: Aigle<
        [
          T1 | PromiseLike<T1> | PromiseCallback<T1>,
          T2 | PromiseLike<T2> | PromiseCallback<T2>,
          T3 | PromiseLike<T3> | PromiseCallback<T3>,
          T4 | PromiseLike<T4> | PromiseCallback<T4>,
          T5 | PromiseLike<T5> | PromiseCallback<T5>,
          T6 | PromiseLike<T6> | PromiseCallback<T6>,
          T7 | PromiseLike<T7> | PromiseCallback<T7>
        ]
      >
    ): Aigle<[T1, T2, T3, T4, T5, T6, T7]>;

    series<T1, T2, T3, T4, T5, T6, T7, T8>(
      this: Aigle<
        [
          T1 | PromiseLike<T1> | PromiseCallback<T1>,
          T2 | PromiseLike<T2> | PromiseCallback<T2>,
          T3 | PromiseLike<T3> | PromiseCallback<T3>,
          T4 | PromiseLike<T4> | PromiseCallback<T4>,
          T5 | PromiseLike<T5> | PromiseCallback<T5>,
          T6 | PromiseLike<T6> | PromiseCallback<T6>,
          T7 | PromiseLike<T7> | PromiseCallback<T7>,
          T8 | PromiseLike<T8> | PromiseCallback<T8>
        ]
      >
    ): Aigle<[T1, T2, T3, T4, T5, T6, T7, T8]>;

    series<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
      this: Aigle<
        [
          T1 | PromiseLike<T1> | PromiseCallback<T1>,
          T2 | PromiseLike<T2> | PromiseCallback<T2>,
          T3 | PromiseLike<T3> | PromiseCallback<T3>,
          T4 | PromiseLike<T4> | PromiseCallback<T4>,
          T5 | PromiseLike<T5> | PromiseCallback<T5>,
          T6 | PromiseLike<T6> | PromiseCallback<T6>,
          T7 | PromiseLike<T7> | PromiseCallback<T7>,
          T8 | PromiseLike<T8> | PromiseCallback<T8>,
          T9 | PromiseLike<T9> | PromiseCallback<T9>
        ]
      >
    ): Aigle<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;

    series<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
      this: Aigle<
        [
          T1 | PromiseLike<T1> | PromiseCallback<T1>,
          T2 | PromiseLike<T2> | PromiseCallback<T2>,
          T3 | PromiseLike<T3> | PromiseCallback<T3>,
          T4 | PromiseLike<T4> | PromiseCallback<T4>,
          T5 | PromiseLike<T5> | PromiseCallback<T5>,
          T6 | PromiseLike<T6> | PromiseCallback<T6>,
          T7 | PromiseLike<T7> | PromiseCallback<T7>,
          T8 | PromiseLike<T8> | PromiseCallback<T8>,
          T9 | PromiseLike<T9> | PromiseCallback<T9>,
          T10 | PromiseLike<T10> | PromiseCallback<T10>
        ]
      >
    ): Aigle<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;

    series<T>(this: Aigle<(T | PromiseLike<T> | PromiseCallback<T>)[]>): Aigle<T[]>;

    /* parallel */

    parallel<T1>(this: Aigle<[T1 | PromiseLike<T1> | PromiseCallback<T1>]>): Aigle<[T1]>;

    parallel<T1, T2>(
      this: Aigle<
        [T1 | PromiseLike<T1> | PromiseCallback<T1>, T2 | PromiseLike<T2> | PromiseCallback<T2>]
      >
    ): Aigle<[T1, T2]>;

    parallel<T1, T2, T3>(
      this: Aigle<
        [
          T1 | PromiseLike<T1> | PromiseCallback<T1>,
          T2 | PromiseLike<T2> | PromiseCallback<T2>,
          T3 | PromiseLike<T3> | PromiseCallback<T3>
        ]
      >
    ): Aigle<[T1, T2, T3]>;

    parallel<T1, T2, T3, T4>(
      this: Aigle<
        [
          T1 | PromiseLike<T1> | PromiseCallback<T1>,
          T2 | PromiseLike<T2> | PromiseCallback<T2>,
          T3 | PromiseLike<T3> | PromiseCallback<T3>,
          T4 | PromiseLike<T4> | PromiseCallback<T4>
        ]
      >
    ): Aigle<[T1, T2, T3, T4]>;

    parallel<T1, T2, T3, T4, T5>(
      this: Aigle<
        [
          T1 | PromiseLike<T1> | PromiseCallback<T1>,
          T2 | PromiseLike<T2> | PromiseCallback<T2>,
          T3 | PromiseLike<T3> | PromiseCallback<T3>,
          T4 | PromiseLike<T4> | PromiseCallback<T4>,
          T5 | PromiseLike<T5> | PromiseCallback<T5>
        ]
      >
    ): Aigle<[T1, T2, T3, T4, T5]>;

    parallel<T1, T2, T3, T4, T5, T6>(
      this: Aigle<
        [
          T1 | PromiseLike<T1> | PromiseCallback<T1>,
          T2 | PromiseLike<T2> | PromiseCallback<T2>,
          T3 | PromiseLike<T3> | PromiseCallback<T3>,
          T4 | PromiseLike<T4> | PromiseCallback<T4>,
          T5 | PromiseLike<T5> | PromiseCallback<T5>,
          T6 | PromiseLike<T6> | PromiseCallback<T6>
        ]
      >
    ): Aigle<[T1, T2, T3, T4, T5, T6]>;

    parallel<T1, T2, T3, T4, T5, T6, T7>(
      this: Aigle<
        [
          T1 | PromiseLike<T1> | PromiseCallback<T1>,
          T2 | PromiseLike<T2> | PromiseCallback<T2>,
          T3 | PromiseLike<T3> | PromiseCallback<T3>,
          T4 | PromiseLike<T4> | PromiseCallback<T4>,
          T5 | PromiseLike<T5> | PromiseCallback<T5>,
          T6 | PromiseLike<T6> | PromiseCallback<T6>,
          T7 | PromiseLike<T7> | PromiseCallback<T7>
        ]
      >
    ): Aigle<[T1, T2, T3, T4, T5, T6, T7]>;

    parallel<T1, T2, T3, T4, T5, T6, T7, T8>(
      this: Aigle<
        [
          T1 | PromiseLike<T1> | PromiseCallback<T1>,
          T2 | PromiseLike<T2> | PromiseCallback<T2>,
          T3 | PromiseLike<T3> | PromiseCallback<T3>,
          T4 | PromiseLike<T4> | PromiseCallback<T4>,
          T5 | PromiseLike<T5> | PromiseCallback<T5>,
          T6 | PromiseLike<T6> | PromiseCallback<T6>,
          T7 | PromiseLike<T7> | PromiseCallback<T7>,
          T8 | PromiseLike<T8> | PromiseCallback<T8>
        ]
      >
    ): Aigle<[T1, T2, T3, T4, T5, T6, T7, T8]>;

    parallel<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
      this: Aigle<
        [
          T1 | PromiseLike<T1> | PromiseCallback<T1>,
          T2 | PromiseLike<T2> | PromiseCallback<T2>,
          T3 | PromiseLike<T3> | PromiseCallback<T3>,
          T4 | PromiseLike<T4> | PromiseCallback<T4>,
          T5 | PromiseLike<T5> | PromiseCallback<T5>,
          T6 | PromiseLike<T6> | PromiseCallback<T6>,
          T7 | PromiseLike<T7> | PromiseCallback<T7>,
          T8 | PromiseLike<T8> | PromiseCallback<T8>,
          T9 | PromiseLike<T9> | PromiseCallback<T9>
        ]
      >
    ): Aigle<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;

    parallel<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
      this: Aigle<
        [
          T1 | PromiseLike<T1> | PromiseCallback<T1>,
          T2 | PromiseLike<T2> | PromiseCallback<T2>,
          T3 | PromiseLike<T3> | PromiseCallback<T3>,
          T4 | PromiseLike<T4> | PromiseCallback<T4>,
          T5 | PromiseLike<T5> | PromiseCallback<T5>,
          T6 | PromiseLike<T6> | PromiseCallback<T6>,
          T7 | PromiseLike<T7> | PromiseCallback<T7>,
          T8 | PromiseLike<T8> | PromiseCallback<T8>,
          T9 | PromiseLike<T9> | PromiseCallback<T9>,
          T10 | PromiseLike<T10> | PromiseCallback<T10>
        ]
      >
    ): Aigle<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;

    parallel<T>(this: Aigle<(T | PromiseLike<T> | PromiseCallback<T>)[]>): Aigle<T[]>;

    /* parallelLimit */

    parallelLimit<T1>(
      this: Aigle<[T1 | PromiseLike<T1> | PromiseCallback<T1>]>,
      limit?: number
    ): Aigle<[T1]>;

    parallelLimit<T1, T2>(
      this: Aigle<
        [T1 | PromiseLike<T1> | PromiseCallback<T1>, T2 | PromiseLike<T2> | PromiseCallback<T2>]
      >,
      limit?: number
    ): Aigle<[T1, T2]>;

    parallelLimit<T1, T2, T3>(
      this: Aigle<
        [
          T1 | PromiseLike<T1> | PromiseCallback<T1>,
          T2 | PromiseLike<T2> | PromiseCallback<T2>,
          T3 | PromiseLike<T3> | PromiseCallback<T3>
        ]
      >,
      limit?: number
    ): Aigle<[T1, T2, T3]>;

    parallelLimit<T1, T2, T3, T4>(
      this: Aigle<
        [
          T1 | PromiseLike<T1> | PromiseCallback<T1>,
          T2 | PromiseLike<T2> | PromiseCallback<T2>,
          T3 | PromiseLike<T3> | PromiseCallback<T3>,
          T4 | PromiseLike<T4> | PromiseCallback<T4>
        ]
      >,
      limit?: number
    ): Aigle<[T1, T2, T3, T4]>;

    parallelLimit<T1, T2, T3, T4, T5>(
      this: Aigle<
        [
          T1 | PromiseLike<T1> | PromiseCallback<T1>,
          T2 | PromiseLike<T2> | PromiseCallback<T2>,
          T3 | PromiseLike<T3> | PromiseCallback<T3>,
          T4 | PromiseLike<T4> | PromiseCallback<T4>,
          T5 | PromiseLike<T5> | PromiseCallback<T5>
        ]
      >,
      limit?: number
    ): Aigle<[T1, T2, T3, T4, T5]>;

    parallelLimit<T1, T2, T3, T4, T5, T6>(
      this: Aigle<
        [
          T1 | PromiseLike<T1> | PromiseCallback<T1>,
          T2 | PromiseLike<T2> | PromiseCallback<T2>,
          T3 | PromiseLike<T3> | PromiseCallback<T3>,
          T4 | PromiseLike<T4> | PromiseCallback<T4>,
          T5 | PromiseLike<T5> | PromiseCallback<T5>,
          T6 | PromiseLike<T6> | PromiseCallback<T6>
        ]
      >,
      limit?: number
    ): Aigle<[T1, T2, T3, T4, T5, T6]>;

    parallelLimit<T1, T2, T3, T4, T5, T6, T7>(
      this: Aigle<
        [
          T1 | PromiseLike<T1> | PromiseCallback<T1>,
          T2 | PromiseLike<T2> | PromiseCallback<T2>,
          T3 | PromiseLike<T3> | PromiseCallback<T3>,
          T4 | PromiseLike<T4> | PromiseCallback<T4>,
          T5 | PromiseLike<T5> | PromiseCallback<T5>,
          T6 | PromiseLike<T6> | PromiseCallback<T6>,
          T7 | PromiseLike<T7> | PromiseCallback<T7>
        ]
      >,
      limit?: number
    ): Aigle<[T1, T2, T3, T4, T5, T6, T7]>;

    parallelLimit<T1, T2, T3, T4, T5, T6, T7, T8>(
      this: Aigle<
        [
          T1 | PromiseLike<T1> | PromiseCallback<T1>,
          T2 | PromiseLike<T2> | PromiseCallback<T2>,
          T3 | PromiseLike<T3> | PromiseCallback<T3>,
          T4 | PromiseLike<T4> | PromiseCallback<T4>,
          T5 | PromiseLike<T5> | PromiseCallback<T5>,
          T6 | PromiseLike<T6> | PromiseCallback<T6>,
          T7 | PromiseLike<T7> | PromiseCallback<T7>,
          T8 | PromiseLike<T8> | PromiseCallback<T8>
        ]
      >,
      limit?: number
    ): Aigle<[T1, T2, T3, T4, T5, T6, T7, T8]>;

    parallelLimit<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
      this: Aigle<
        [
          T1 | PromiseLike<T1> | PromiseCallback<T1>,
          T2 | PromiseLike<T2> | PromiseCallback<T2>,
          T3 | PromiseLike<T3> | PromiseCallback<T3>,
          T4 | PromiseLike<T4> | PromiseCallback<T4>,
          T5 | PromiseLike<T5> | PromiseCallback<T5>,
          T6 | PromiseLike<T6> | PromiseCallback<T6>,
          T7 | PromiseLike<T7> | PromiseCallback<T7>,
          T8 | PromiseLike<T8> | PromiseCallback<T8>,
          T9 | PromiseLike<T9> | PromiseCallback<T9>
        ]
      >,
      limit?: number
    ): Aigle<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;

    parallelLimit<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
      this: Aigle<
        [
          T1 | PromiseLike<T1> | PromiseCallback<T1>,
          T2 | PromiseLike<T2> | PromiseCallback<T2>,
          T3 | PromiseLike<T3> | PromiseCallback<T3>,
          T4 | PromiseLike<T4> | PromiseCallback<T4>,
          T5 | PromiseLike<T5> | PromiseCallback<T5>,
          T6 | PromiseLike<T6> | PromiseCallback<T6>,
          T7 | PromiseLike<T7> | PromiseCallback<T7>,
          T8 | PromiseLike<T8> | PromiseCallback<T8>,
          T9 | PromiseLike<T9> | PromiseCallback<T9>,
          T10 | PromiseLike<T10> | PromiseCallback<T10>
        ]
      >,
      limit?: number
    ): Aigle<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;

    parallelLimit<T>(
      this: Aigle<(T | PromiseLike<T> | PromiseCallback<T>)[]>,
      limit?: number
    ): Aigle<T[]>;

    /* each/forEach */

    each<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T, any>): Aigle<T[]>;

    each<T>(this: Aigle<List<T>>, iterator?: ListIterator<T, any>): Aigle<List<T>>;

    each<T extends object>(this: Aigle<T>, iterator?: ObjectIterator<T, any>): Aigle<T>;

    forEach<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T, any>): Aigle<T[]>;

    forEach<T>(this: Aigle<List<T>>, iterator?: ListIterator<T, any>): Aigle<List<T>>;

    forEach<T extends object>(this: Aigle<T>, iterator?: ObjectIterator<T, any>): Aigle<T>;

    /* eachSeries/forEachSeries */

    eachSeries<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T, any>): Aigle<T[]>;

    eachSeries<T>(this: Aigle<List<T>>, iterator?: ListIterator<T, any>): Aigle<List<T>>;

    eachSeries<T extends object>(this: Aigle<T>, iterator?: ObjectIterator<T, any>): Aigle<T>;

    forEachSeries<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T, any>): Aigle<T[]>;

    forEachSeries<T>(this: Aigle<List<T>>, iterator?: ListIterator<T, any>): Aigle<List<T>>;

    forEachSeries<T extends object>(this: Aigle<T>, iterator?: ObjectIterator<T, any>): Aigle<T>;

    /* eachLimit/forEachLimit */

    eachLimit<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T, any>): Aigle<T[]>;

    eachLimit<T>(this: Aigle<T[]>, limit: number, iterator: ArrayIterator<T, any>): Aigle<T[]>;

    eachLimit<T>(this: Aigle<List<T>>, iterator?: ListIterator<T, any>): Aigle<List<T>>;

    eachLimit<T>(
      this: Aigle<List<T>>,
      limit: number,
      iterator: ListIterator<T, any>
    ): Aigle<List<T>>;

    eachLimit<T extends object>(this: Aigle<T>, iterator?: ObjectIterator<T, any>): Aigle<T>;

    eachLimit<T extends object>(
      this: Aigle<T>,
      limit: number,
      iterator: ObjectIterator<T, any>
    ): Aigle<T>;

    forEachLimit<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T, any>): Aigle<T[]>;

    forEachLimit<T>(this: Aigle<T[]>, limit: number, iterator: ArrayIterator<T, any>): Aigle<T[]>;

    forEachLimit<T>(this: Aigle<List<T>>, iterator?: ListIterator<T, any>): Aigle<List<T>>;

    forEachLimit<T>(
      this: Aigle<List<T>>,
      limit: number,
      iterator: ListIterator<T, any>
    ): Aigle<List<T>>;

    forEachLimit<T extends object>(this: Aigle<T>, iterator?: ObjectIterator<T, any>): Aigle<T>;

    forEachLimit<T extends object>(
      this: Aigle<T>,
      limit: number,
      iterator: ObjectIterator<T, any>
    ): Aigle<T>;

    /* map */

    map<T, R>(this: Aigle<T[]>, iterator: ArrayIterator<T, R>): Aigle<R[]>;

    map<T, R>(this: Aigle<List<T>>, iterator: ListIterator<T, R>): Aigle<R[]>;

    map<T extends object, R>(this: Aigle<T>, iterator: ObjectIterator<T, R>): Aigle<R[]>;

    /* mapSeries */

    mapSeries<T, R>(this: Aigle<T[]>, iterator: ArrayIterator<T, R>): Aigle<R[]>;

    mapSeries<T, R>(this: Aigle<List<T>>, iterator: ListIterator<T, R>): Aigle<R[]>;

    mapSeries<T extends object, R>(this: Aigle<T>, iterator: ObjectIterator<T, R>): Aigle<R[]>;

    /* mapLimit */

    mapLimit<T, R>(this: Aigle<T[]>, iterator: ArrayIterator<T, R>): Aigle<R[]>;

    mapLimit<T, R>(this: Aigle<T[]>, limit: number, iterator: ArrayIterator<T, R>): Aigle<R[]>;

    mapLimit<T, R>(this: Aigle<List<T>>, iterator: ListIterator<T, R>): Aigle<R[]>;

    mapLimit<T, R>(this: Aigle<List<T>>, limit: number, iterator: ListIterator<T, R>): Aigle<R[]>;

    mapLimit<T extends object, R>(this: Aigle<T>, iterator: ObjectIterator<T, R>): Aigle<R[]>;

    mapLimit<T extends object, R>(
      this: Aigle<T>,
      limit: number,
      iterator: ObjectIterator<T, R>
    ): Aigle<R[]>;

    /* mapValues */

    mapValues<T, R>(this: Aigle<T[]>, iterator?: ArrayIterator<T, R>): Aigle<Dictionary<R>>;

    mapValues<T, R>(this: Aigle<List<T>>, iterator?: ListIterator<T, R>): Aigle<Dictionary<R>>;

    mapValues<T extends object, R>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T, R>
    ): Aigle<Record<keyof T, R>>;

    /* mapValuesSeries */

    mapValuesSeries<T, R>(this: Aigle<T[]>, iterator?: ArrayIterator<T, R>): Aigle<Dictionary<R>>;

    mapValuesSeries<T, R>(
      this: Aigle<List<T>>,
      iterator?: ListIterator<T, R>
    ): Aigle<Dictionary<R>>;

    mapValuesSeries<T extends object, R>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T, R>
    ): Aigle<Record<keyof T, R>>;

    /* mapValuesLimit */

    mapValuesLimit<T, R>(this: Aigle<T[]>, iterator?: ArrayIterator<T, R>): Aigle<Dictionary<R>>;

    mapValuesLimit<T, R>(
      this: Aigle<T[]>,
      limit: number,
      iterator: ArrayIterator<T, R>
    ): Aigle<Dictionary<R>>;

    mapValuesLimit<T, R>(this: Aigle<List<T>>, iterator?: ListIterator<T, R>): Aigle<Dictionary<R>>;
    mapValuesLimit<T, R>(
      this: Aigle<List<T>>,
      limit: number,
      iterator: ListIterator<T, R>
    ): Aigle<Dictionary<R>>;

    mapValuesLimit<T extends object, R>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T, R>
    ): Aigle<Record<keyof T, R>>;

    mapValuesLimit<T extends object, R>(
      this: Aigle<T>,
      limit: number,
      iterator: ObjectIterator<T, R>
    ): Aigle<Record<keyof T, R>>;

    /* concat */

    concat<T, R>(this: Aigle<T[]>, iterator?: ArrayIterator<T, R | R[]>): Aigle<R[]>;

    concat<T, R>(this: Aigle<List<T>>, iterator?: ListIterator<T, R | R[]>): Aigle<R[]>;

    concat<T extends object, R>(this: Aigle<T>, iterator?: ObjectIterator<T, R | R[]>): Aigle<R[]>;

    /* concatSeries */

    concatSeries<T, R>(this: Aigle<T[]>, iterator?: ArrayIterator<T, R | R[]>): Aigle<R[]>;

    concatSeries<T, R>(this: Aigle<List<T>>, iterator?: ListIterator<T, R | R[]>): Aigle<R[]>;

    concatSeries<T extends object, R>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T, R | R[]>
    ): Aigle<R[]>;

    /* concatLimit */

    concatLimit<T, R>(this: Aigle<T[]>, iterator?: ArrayIterator<T, R | R[]>): Aigle<R[]>;

    concatLimit<T, R>(
      this: Aigle<T[]>,
      limit: number,
      iterator: ArrayIterator<T, R | R[]>
    ): Aigle<R[]>;

    concatLimit<T, R>(this: Aigle<List<T>>, iterator?: ListIterator<T, R | R[]>): Aigle<R[]>;

    concatLimit<T, R>(
      this: Aigle<List<T>>,
      limit: number,
      iterator: ListIterator<T, R | R[]>
    ): Aigle<R[]>;

    concatLimit<T extends object, R>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T, R | R[]>
    ): Aigle<R[]>;

    concatLimit<T extends object, R>(
      this: Aigle<T>,
      limit: number,
      iterator: ObjectIterator<T, R | R[]>
    ): Aigle<R[]>;

    /* every */

    every<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T, boolean>): Aigle<boolean>;

    every<T>(this: Aigle<List<T>>, iterator?: ListIterator<T, boolean>): Aigle<boolean>;

    every<T extends object>(this: Aigle<T>, iterator?: ObjectIterator<T, boolean>): Aigle<boolean>;

    /* everySeries */

    everySeries<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T, boolean>): Aigle<boolean>;

    everySeries<T>(this: Aigle<List<T>>, iterator?: ListIterator<T, boolean>): Aigle<boolean>;

    everySeries<T extends object>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<boolean>;

    /* everyLimit */

    everyLimit<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T, boolean>): Aigle<boolean>;

    everyLimit<T>(
      this: Aigle<T[]>,
      limit: number,
      iterator: ArrayIterator<T, boolean>
    ): Aigle<boolean>;

    everyLimit<T>(this: Aigle<List<T>>, iterator?: ListIterator<T, boolean>): Aigle<boolean>;

    everyLimit<T>(
      this: Aigle<List<T>>,
      limit: number,
      iterator: ListIterator<T, boolean>
    ): Aigle<boolean>;

    everyLimit<T extends object>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<boolean>;

    everyLimit<T extends object>(
      this: Aigle<T>,
      limit: number,
      iterator: ObjectIterator<T, boolean>
    ): Aigle<boolean>;

    /* some */

    some<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T, boolean>): Aigle<boolean>;

    some<T>(this: Aigle<List<T>>, iterator?: ListIterator<T, boolean>): Aigle<boolean>;

    some<T extends object>(this: Aigle<T>, iterator?: ObjectIterator<T, boolean>): Aigle<boolean>;

    /* someSeries */

    someSeries<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T, boolean>): Aigle<boolean>;

    someSeries<T>(this: Aigle<List<T>>, iterator?: ListIterator<T, boolean>): Aigle<boolean>;

    someSeries<T extends object>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<boolean>;

    /* someLimit */

    someLimit<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T, boolean>): Aigle<boolean>;

    someLimit<T>(
      this: Aigle<T[]>,
      limit: number,
      iterator: ArrayIterator<T, boolean>
    ): Aigle<boolean>;

    someLimit<T>(this: Aigle<List<T>>, iterator?: ListIterator<T, boolean>): Aigle<boolean>;

    someLimit<T>(
      this: Aigle<List<T>>,
      limit: number,
      iterator: ListIterator<T, boolean>
    ): Aigle<boolean>;

    someLimit<T extends object>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<boolean>;

    someLimit<T extends object>(
      this: Aigle<T>,
      limit: number,
      iterator: ObjectIterator<T, boolean>
    ): Aigle<boolean>;

    /* filter */

    filter<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T, boolean>): Aigle<T[]>;

    filter<T>(this: Aigle<List<T>>, iterator?: ListIterator<T, boolean>): Aigle<T[]>;

    filter<T extends object>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<Array<T[keyof T]>>;

    /* filterSeries */

    filterSeries<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T, boolean>): Aigle<T[]>;

    filterSeries<T>(this: Aigle<List<T>>, iterator?: ListIterator<T, boolean>): Aigle<T[]>;

    filterSeries<T extends object>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<Array<T[keyof T]>>;

    /* filterLimit */

    filterLimit<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T, boolean>): Aigle<T[]>;

    filterLimit<T>(
      this: Aigle<T[]>,
      limit: number,
      iterator: ArrayIterator<T, boolean>
    ): Aigle<T[]>;

    filterLimit<T>(this: Aigle<List<T>>, iterator?: ListIterator<T, boolean>): Aigle<T[]>;

    filterLimit<T>(
      this: Aigle<List<T>>,
      limit: number,
      iterator: ListIterator<T, boolean>
    ): Aigle<T[]>;

    filterLimit<T extends object>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<Array<T[keyof T]>>;

    filterLimit<T extends object>(
      this: Aigle<T>,
      limit: number,
      iterator: ObjectIterator<T, boolean>
    ): Aigle<Array<T[keyof T]>>;

    /* reject */

    reject<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T, boolean>): Aigle<T[]>;

    reject<T>(this: Aigle<List<T>>, iterator?: ListIterator<T, boolean>): Aigle<T[]>;

    reject<T extends object>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<Array<T[keyof T]>>;

    /* rejectSeries */

    rejectSeries<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T, boolean>): Aigle<T[]>;

    rejectSeries<T>(this: Aigle<List<T>>, iterator?: ListIterator<T, boolean>): Aigle<T[]>;

    rejectSeries<T extends object>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<Array<T[keyof T]>>;

    /* rejectLimit */

    rejectLimit<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T, boolean>): Aigle<T[]>;

    rejectLimit<T>(
      this: Aigle<T[]>,
      limit: number,
      iterator: ArrayIterator<T, boolean>
    ): Aigle<T[]>;

    rejectLimit<T>(this: Aigle<List<T>>, iterator?: ListIterator<T, boolean>): Aigle<T[]>;

    rejectLimit<T>(
      this: Aigle<List<T>>,
      limit: number,
      iterator: ListIterator<T, boolean>
    ): Aigle<T[]>;

    rejectLimit<T extends object>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<Array<T[keyof T]>>;

    rejectLimit<T extends object>(
      this: Aigle<T>,
      limit: number,
      iterator: ObjectIterator<T, boolean>
    ): Aigle<Array<T[keyof T]>>;

    /* sortBy */

    sortBy<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T>): Aigle<T[]>;

    sortBy<T>(this: Aigle<List<T>>, iterator?: ListIterator<T>): Aigle<T[]>;

    sortBy<T extends object>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T>
    ): Aigle<Array<T[keyof T]>>;

    /* sortBySeries */

    sortBySeries<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T>): Aigle<T[]>;

    sortBySeries<T>(this: Aigle<List<T>>, iterator?: ListIterator<T>): Aigle<T[]>;

    sortBySeries<T extends object>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T>
    ): Aigle<Array<T[keyof T]>>;

    /* sortByLimit */

    sortByLimit<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T>): Aigle<T[]>;

    sortByLimit<T>(this: Aigle<T[]>, limit: number, iterator: ArrayIterator<T>): Aigle<T[]>;

    sortByLimit<T>(this: Aigle<List<T>>, iterator?: ListIterator<T>): Aigle<T[]>;

    sortByLimit<T>(this: Aigle<List<T>>, limit: number, iterator: ListIterator<T>): Aigle<T[]>;

    sortByLimit<T extends object>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T>
    ): Aigle<Array<T[keyof T]>>;

    sortByLimit<T extends object>(
      this: Aigle<T>,
      limit: number,
      iterator: ObjectIterator<T>
    ): Aigle<Array<T[keyof T]>>;

    /* find / detect */

    find<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T, boolean>): Aigle<T>;

    find<T>(this: Aigle<List<T>>, iterator?: ListIterator<T, boolean>): Aigle<T>;

    find<T extends object>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<T[keyof T]>;

    detect<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T, boolean>): Aigle<T>;

    detect<T>(this: Aigle<List<T>>, iterator?: ListIterator<T, boolean>): Aigle<T>;

    detect<T extends object>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<T[keyof T]>;

    /* findSeries / detectSeries */

    findSeries<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T, boolean>): Aigle<T>;

    findSeries<T>(this: Aigle<List<T>>, iterator?: ListIterator<T, boolean>): Aigle<T>;

    findSeries<T extends object>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<T[keyof T]>;

    detectSeries<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T, boolean>): Aigle<T>;

    detectSeries<T>(this: Aigle<List<T>>, iterator?: ListIterator<T, boolean>): Aigle<T>;

    detectSeries<T extends object>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<T[keyof T]>;

    /* findLimit / detectLimit */

    findLimit<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T, boolean>): Aigle<T>;

    findLimit<T>(this: Aigle<T[]>, limit: number, iterator: ArrayIterator<T, boolean>): Aigle<T>;

    findLimit<T>(this: Aigle<List<T>>, iterator?: ListIterator<T, boolean>): Aigle<T>;

    findLimit<T>(this: Aigle<List<T>>, limit: number, iterator: ListIterator<T, boolean>): Aigle<T>;

    findLimit<T extends object>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<T[keyof T]>;

    findLimit<T extends object>(
      this: Aigle<T>,
      limit: number,
      iterator: ObjectIterator<T, boolean>
    ): Aigle<T[keyof T]>;

    detectLimit<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T, boolean>): Aigle<T>;

    detectLimit<T>(this: Aigle<T[]>, limit: number, iterator: ArrayIterator<T, boolean>): Aigle<T>;

    detectLimit<T>(this: Aigle<List<T>>, iterator?: ListIterator<T, boolean>): Aigle<T>;

    detectLimit<T>(
      this: Aigle<List<T>>,
      limit: number,
      iterator: ListIterator<T, boolean>
    ): Aigle<T>;

    detectLimit<T extends object>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<T[keyof T]>;

    detectLimit<T extends object>(
      this: Aigle<T>,
      limit: number,
      iterator: ObjectIterator<T, boolean>
    ): Aigle<T[keyof T]>;

    /* findIndex */

    findIndex<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T, boolean>): Aigle<number>;

    findIndex<T>(this: Aigle<List<T>>, iterator?: ListIterator<T, boolean>): Aigle<number>;

    findIndex<T extends object>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<number>;

    /* findIndexSeries */

    findIndexSeries<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T, boolean>): Aigle<number>;

    findIndexSeries<T>(this: Aigle<List<T>>, iterator?: ListIterator<T, boolean>): Aigle<number>;

    findIndexSeries<T extends object>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<number>;

    /* findIndexLimit */

    findIndexLimit<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T, boolean>): Aigle<number>;

    findIndexLimit<T>(
      this: Aigle<T[]>,
      limit: number,
      iterator: ArrayIterator<T, boolean>
    ): Aigle<number>;

    findIndexLimit<T>(this: Aigle<List<T>>, iterator?: ListIterator<T, boolean>): Aigle<number>;

    findIndexLimit<T>(
      this: Aigle<List<T>>,
      limit: number,
      iterator: ListIterator<T, boolean>
    ): Aigle<number>;

    findIndexLimit<T extends object>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<number>;

    findIndexLimit<T extends object>(
      this: Aigle<T>,
      limit: number,
      iterator: ObjectIterator<T, boolean>
    ): Aigle<number>;

    /* findKey */

    findKey<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T, boolean>): Aigle<string | undefined>;

    findKey<T>(
      this: Aigle<List<T>>,
      iterator?: ListIterator<T, boolean>
    ): Aigle<string | undefined>;

    findKey<T extends object>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<string | undefined>;

    /* findKeySeries */

    findKeySeries<T>(
      this: Aigle<T[]>,
      iterator?: ArrayIterator<T, boolean>
    ): Aigle<string | undefined>;

    findKeySeries<T>(
      this: Aigle<List<T>>,
      iterator?: ListIterator<T, boolean>
    ): Aigle<string | undefined>;

    findKeySeries<T extends object>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<string | undefined>;

    /* findKeyLimit */

    findKeyLimit<T>(
      this: Aigle<T[]>,
      iterator?: ArrayIterator<T, boolean>
    ): Aigle<string | undefined>;

    findKeyLimit<T>(
      this: Aigle<T[]>,
      limit: number,
      iterator: ArrayIterator<T, boolean>
    ): Aigle<string | undefined>;

    findKeyLimit<T>(
      this: Aigle<List<T>>,
      iterator?: ListIterator<T, boolean>
    ): Aigle<string | undefined>;

    findKeyLimit<T>(
      this: Aigle<List<T>>,
      limit: number,
      iterator: ListIterator<T, boolean>
    ): Aigle<string | undefined>;

    findKeyLimit<T extends object>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<string | undefined>;

    findKeyLimit<T extends object>(
      this: Aigle<T>,
      limit: number,
      iterator: ObjectIterator<T, boolean>
    ): Aigle<string | undefined>;

    /* groupBy */

    groupBy<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T>): Aigle<Dictionary<T[]>>;

    groupBy<T>(this: Aigle<List<T>>, iterator?: ListIterator<T>): Aigle<Dictionary<T[]>>;

    groupBy<T extends object>(this: Aigle<T>, iterator?: ObjectIterator<T>): Aigle<Dictionary<T[]>>;

    /* groupBySeries */

    groupBySeries<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T>): Aigle<Dictionary<T[]>>;

    groupBySeries<T>(this: Aigle<List<T>>, iterator?: ListIterator<T>): Aigle<Dictionary<T[]>>;

    groupBySeries<T extends object>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T>
    ): Aigle<Dictionary<T[]>>;

    /* groupByLimit */

    groupByLimit<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T>): Aigle<Dictionary<T[]>>;

    groupByLimit<T>(
      this: Aigle<T[]>,
      limit: number,
      iterator: ArrayIterator<T>
    ): Aigle<Dictionary<T[]>>;

    groupByLimit<T>(this: Aigle<List<T>>, iterator?: ListIterator<T>): Aigle<Dictionary<T[]>>;

    groupByLimit<T>(
      this: Aigle<List<T>>,
      limit: number,
      iterator: ListIterator<T>
    ): Aigle<Dictionary<T[]>>;

    groupByLimit<T extends object>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T>
    ): Aigle<Dictionary<T[]>>;

    groupByLimit<T extends object>(
      this: Aigle<T>,
      limit: number,
      iterator: ObjectIterator<T>
    ): Aigle<Dictionary<T[]>>;

    /* omit */

    omit<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T>): Aigle<Dictionary<T>>;

    omit<T>(this: Aigle<List<T>>, iterator?: ListIterator<T>): Aigle<Dictionary<T>>;

    omit<T extends object>(this: Aigle<T>, iterator?: ObjectIterator<T>): Aigle<Dictionary<T>>;

    /* omitBy */

    omitBy<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T>): Aigle<Dictionary<T>>;

    omitBy<T>(this: Aigle<List<T>>, iterator?: ListIterator<T>): Aigle<Dictionary<T>>;

    omitBy<T extends object>(this: Aigle<T>, iterator?: ObjectIterator<T>): Aigle<Dictionary<T>>;

    /* omitSeries / omitBySeries */

    omitSeries<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T>): Aigle<Dictionary<T>>;

    omitSeries<T>(this: Aigle<List<T>>, iterator?: ListIterator<T>): Aigle<Dictionary<T>>;

    omitSeries<T extends object>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T>
    ): Aigle<Dictionary<T>>;

    omitBySeries<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T>): Aigle<Dictionary<T>>;

    omitBySeries<T>(this: Aigle<List<T>>, iterator?: ListIterator<T>): Aigle<Dictionary<T>>;

    omitBySeries<T extends object>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T>
    ): Aigle<Dictionary<T>>;

    /* omitLimit / omitByLimit */

    omitLimit<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T>): Aigle<Dictionary<T>>;

    omitLimit<T>(this: Aigle<T[]>, limit: number, iterator: ArrayIterator<T>): Aigle<Dictionary<T>>;

    omitLimit<T>(this: Aigle<List<T>>, iterator?: ListIterator<T>): Aigle<Dictionary<T>>;

    omitLimit<T>(
      this: Aigle<List<T>>,
      limit: number,
      iterator: ListIterator<T>
    ): Aigle<Dictionary<T>>;

    omitLimit<T extends object>(this: Aigle<T>, iterator?: ObjectIterator<T>): Aigle<Dictionary<T>>;
    omitLimit<T extends object>(
      this: Aigle<T>,
      limit: number,
      iterator: ObjectIterator<T>
    ): Aigle<Dictionary<T>>;

    omitByLimit<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T>): Aigle<Dictionary<T>>;

    omitByLimit<T>(
      this: Aigle<T[]>,
      limit: number,
      iterator: ArrayIterator<T>
    ): Aigle<Dictionary<T>>;

    omitByLimit<T>(this: Aigle<List<T>>, iterator?: ListIterator<T>): Aigle<Dictionary<T>>;

    omitByLimit<T>(
      this: Aigle<List<T>>,
      limit: number,
      iterator: ListIterator<T>
    ): Aigle<Dictionary<T>>;

    omitByLimit<T extends object>(
      this: Aigle<T>,
      iterator?: ObjectIterator<T>
    ): Aigle<Dictionary<T>>;

    omitByLimit<T extends object>(
      this: Aigle<T>,
      limit: number,
      iterator: ObjectIterator<T>
    ): Aigle<Dictionary<T>>;

    /* pick */

    pick<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T>): Aigle<Dictionary<T>>;

    pick<T>(this: Aigle<List<T>>, iterator?: ListIterator<T>): Aigle<Dictionary<T>>;

    pick<T extends object>(this: Aigle<T>, iterator?: ObjectIterator<T>): Aigle<Partial<T>>;

    /* pickBy */

    pickBy<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T>): Aigle<Dictionary<T>>;

    pickBy<T>(this: Aigle<List<T>>, iterator?: ListIterator<T>): Aigle<Dictionary<T>>;

    pickBy<T extends object>(this: Aigle<T>, iterator?: ObjectIterator<T>): Aigle<Partial<T>>;

    /* pickSeries / pickBySeries */

    pickSeries<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T>): Aigle<Dictionary<T>>;

    pickSeries<T>(this: Aigle<List<T>>, iterator?: ListIterator<T>): Aigle<Dictionary<T>>;

    pickSeries<T extends object>(this: Aigle<T>, iterator?: ObjectIterator<T>): Aigle<Partial<T>>;

    pickBySeries<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T>): Aigle<Dictionary<T>>;

    pickBySeries<T>(this: Aigle<List<T>>, iterator?: ListIterator<T>): Aigle<Dictionary<T>>;

    pickBySeries<T extends object>(this: Aigle<T>, iterator?: ObjectIterator<T>): Aigle<Partial<T>>;

    /* pickLimit / pickByLimit */

    pickLimit<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T>): Aigle<Dictionary<T>>;

    pickLimit<T>(this: Aigle<T[]>, limit: number, iterator: ArrayIterator<T>): Aigle<Dictionary<T>>;

    pickLimit<T>(this: Aigle<List<T>>, iterator?: ListIterator<T>): Aigle<Dictionary<T>>;

    pickLimit<T>(
      this: Aigle<List<T>>,
      limit: number,
      iterator: ListIterator<T>
    ): Aigle<Dictionary<T>>;

    pickLimit<T extends object>(this: Aigle<T>, iterator?: ObjectIterator<T>): Aigle<Partial<T>>;

    pickLimit<T extends object>(
      this: Aigle<T>,
      limit: number,
      iterator: ObjectIterator<T>
    ): Aigle<Partial<T>>;

    pickByLimit<T>(this: Aigle<T[]>, iterator?: ArrayIterator<T>): Aigle<Dictionary<T>>;

    pickByLimit<T>(
      this: Aigle<T[]>,
      limit: number,
      iterator: ArrayIterator<T>
    ): Aigle<Dictionary<T>>;

    pickByLimit<T>(this: Aigle<List<T>>, iterator?: ListIterator<T>): Aigle<Dictionary<T>>;

    pickByLimit<T>(
      this: Aigle<List<T>>,
      limit: number,
      iterator: ListIterator<T>
    ): Aigle<Dictionary<T>>;

    pickByLimit<T extends object>(this: Aigle<T>, iterator?: ObjectIterator<T>): Aigle<Partial<T>>;
    pickByLimit<T extends object>(
      this: Aigle<T>,
      limit: number,
      iterator: ObjectIterator<T>
    ): Aigle<Partial<T>>;

    /* transform */

    transform<T, R>(
      this: Aigle<T[]>,
      iterator: MemoArrayIterator<T, R[]>,
      accumulator?: R[]
    ): Aigle<R[]>;

    transform<T, R>(
      this: Aigle<T[]>,
      iterator: MemoArrayIterator<T, Dictionary<R>>,
      accumulator: Dictionary<R>
    ): Aigle<Dictionary<R>>;

    transform<T, R>(
      this: Aigle<List<T>>,
      iterator: MemoListIterator<T, R[]>,
      accumulator?: R[]
    ): Aigle<R[]>;

    transform<T, R>(
      this: Aigle<List<T>>,
      iterator: MemoListIterator<T, Dictionary<R>>,
      accumulator?: Dictionary<R>
    ): Aigle<Dictionary<R>>;

    transform<T extends object, R>(
      this: Aigle<T>,
      iterator: MemoObjectIterator<T, Dictionary<R>>,
      accumulator?: Dictionary<R>
    ): Aigle<Dictionary<R>>;

    transform<T extends object, R>(
      this: Aigle<T>,
      iterator: MemoObjectIterator<T, R[]>,
      accumulator: R[]
    ): Aigle<R[]>;

    /* transformSeries */

    transformSeries<T, R>(
      this: Aigle<T[]>,
      iterator: MemoArrayIterator<T, R[]>,
      accumulator?: R[]
    ): Aigle<R[]>;

    transformSeries<T, R>(
      this: Aigle<T[]>,
      iterator: MemoArrayIterator<T, Dictionary<R>>,
      accumulator: Dictionary<R>
    ): Aigle<Dictionary<R>>;

    transformSeries<T, R>(
      this: Aigle<List<T>>,
      iterator: MemoListIterator<T, R[]>,
      accumulator?: R[]
    ): Aigle<R[]>;

    transformSeries<T, R>(
      this: Aigle<List<T>>,
      iterator: MemoListIterator<T, Dictionary<R>>,
      accumulator?: Dictionary<R>
    ): Aigle<Dictionary<R>>;

    transformSeries<T extends object, R>(
      this: Aigle<T>,
      iterator: MemoObjectIterator<T, Dictionary<R>>,
      accumulator?: Dictionary<R>
    ): Aigle<Dictionary<R>>;

    transformSeries<T extends object, R>(
      this: Aigle<T>,
      iterator: MemoObjectIterator<T, R[]>,
      accumulator: R[]
    ): Aigle<R[]>;

    /* transformLimit */

    transformLimit<T, R>(
      this: Aigle<T[]>,
      iterator: MemoArrayIterator<T, R[]>,
      accumulator?: R[]
    ): Aigle<R[]>;

    transformLimit<T, R>(
      this: Aigle<T[]>,
      limit: number,
      iterator: MemoArrayIterator<T, R[]>,
      accumulator?: R[]
    ): Aigle<R[]>;

    transformLimit<T, R>(
      this: Aigle<T[]>,
      iterator: MemoArrayIterator<T, Dictionary<R>>,
      accumulator: Dictionary<R>
    ): Aigle<Dictionary<R>>;

    transformLimit<T, R>(
      this: Aigle<T[]>,
      limit: number,
      iterator: MemoArrayIterator<T, Dictionary<R>>,
      accumulator: Dictionary<R>
    ): Aigle<Dictionary<R>>;

    transformLimit<T, R>(
      this: Aigle<List<T>>,
      iterator: MemoListIterator<T, R[]>,
      accumulator?: R[]
    ): Aigle<R[]>;

    transformLimit<T, R>(
      this: Aigle<List<T>>,
      limit: number,
      iterator: MemoListIterator<T, R[]>,
      accumulator?: R[]
    ): Aigle<R[]>;

    transformLimit<T, R>(
      this: Aigle<List<T>>,
      iterator: MemoListIterator<T, Dictionary<R>>,
      accumulator?: Dictionary<R>
    ): Aigle<Dictionary<R>>;

    transformLimit<T, R>(
      this: Aigle<List<T>>,
      limit: number,
      iterator: MemoListIterator<T, Dictionary<R>>,
      accumulator?: Dictionary<R>
    ): Aigle<Dictionary<R>>;

    transformLimit<T extends object, R>(
      this: Aigle<T>,
      iterator: MemoObjectIterator<T, Dictionary<R>>,
      accumulator?: Dictionary<R>
    ): Aigle<Dictionary<R>>;

    transformLimit<T extends object, R>(
      this: Aigle<T>,
      limit: number,
      iterator: MemoObjectIterator<T, Dictionary<R>>,
      accumulator?: Dictionary<R>
    ): Aigle<Dictionary<R>>;

    transformLimit<T extends object, R>(
      this: Aigle<T>,
      iterator: MemoObjectIterator<T, R[]>,
      accumulator: R[]
    ): Aigle<R[]>;

    transformLimit<T extends object, R>(
      this: Aigle<T>,
      limit: number,
      iterator: MemoObjectIterator<T, R[]>,
      accumulator: R[]
    ): Aigle<R[]>;

    /* reduce */

    reduce<T, R>(this: Aigle<T[]>, iterator: MemoArrayIterator<T, R, R>, accumulator?: R): Aigle<R>;

    reduce<T, R>(
      this: Aigle<List<T>>,
      iterator: MemoListIterator<T, R, R>,
      accumulator?: R
    ): Aigle<R>;

    reduce<T extends object, R>(
      this: Aigle<T>,
      iterator: MemoObjectIterator<T, R, R>,
      accumulator?: R
    ): Aigle<R>;

    /* delay */

    delay(ms: number): Aigle<R>;

    /* tap */

    tap(intercepter: (value: R) => ReturnType<any>): Aigle<R>;

    /* thru */

    thru<T>(intercepter: (value: R) => ReturnType<T>): Aigle<T>;

    /* times */

    times<T>(this: Aigle<number>, iterator?: (num: number) => ReturnType<T>): Aigle<T[]>;

    /* timesSeries */

    timesSeries<T>(this: Aigle<number>, iterator?: (num: number) => ReturnType<T>): Aigle<T[]>;

    /* timesLimit */

    timesLimit<T>(this: Aigle<number>, iterator?: (num: number) => ReturnType<T>): Aigle<T[]>;

    timesLimit<T>(
      this: Aigle<number>,
      limit: number,
      iterator: (num: number) => ReturnType<T>
    ): Aigle<T[]>;

    /* doUntil */

    doUntil<T>(
      this: Aigle<T>,
      iterator: (value: T) => ReturnType<T>,
      tester: (value: T) => ReturnType<boolean>
    ): Aigle<T>;

    /* doWhilst */

    doWhilst<T>(
      this: Aigle<T>,
      iterator: (value: T) => ReturnType<T>,
      tester: (value: T) => ReturnType<boolean>
    ): Aigle<T>;

    /* until */

    until<T>(
      this: Aigle<T>,
      tester: (value: T) => ReturnType<boolean>,
      iterator: (value: T) => ReturnType<T>
    ): Aigle<T>;

    /* whilst */

    whilst<T>(
      this: Aigle<T>,
      tester: (value: T) => ReturnType<boolean>,
      iterator: (value: T) => ReturnType<T>
    ): Aigle<T>;

    /* isCancelled */

    isCancelled(): boolean;

    /* isFulfilled */

    isFulfilled(): boolean;

    /* isPending */

    isPending(): boolean;

    /* isRejected */

    isRejected(): boolean;

    /* value */

    value(): any;

    /* reason */

    reason(): any;

    /* cancel */

    cancel(): void;

    /* disposer */

    disposer(fn: (value: R) => any): Disposer<R>;

    /* suppressUnhandledRejections */

    suppressUnhandledRejections(): void;

    /* timeout */

    timeout(ms: number, message?: string | Error): Aigle<R>;

    /* toString */

    toString(): string;

    /** static **/

    /* core functions */

    static resolve(): Aigle<void>;

    static resolve<T>(value: ReturnType<T>): Aigle<T>;

    static reject(reason: any): Aigle<never>;

    static join<T>(...values: T[]): Aigle<T[]>;

    static join<T>(...values: PromiseLike<T>[]): Aigle<T[]>;

    /* all */

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Aigle.
     */
    static all<T1>(values: [ReturnType<T1>]): Aigle<[T1]>;

    static all<T1, T2>(values: [ReturnType<T1>, ReturnType<T2>]): Aigle<[T1, T2]>;

    static all<T1, T2, T3>(
      values: [ReturnType<T1>, ReturnType<T2>, ReturnType<T3>]
    ): Aigle<[T1, T2, T3]>;

    static all<T1, T2, T3, T4>(
      values: [ReturnType<T1>, ReturnType<T2>, ReturnType<T3>, ReturnType<T4>]
    ): Aigle<[T1, T2, T3, T4]>;

    static all<T1, T2, T3, T4, T5>(
      values: [ReturnType<T1>, ReturnType<T2>, ReturnType<T3>, ReturnType<T4>, ReturnType<T5>]
    ): Aigle<[T1, T2, T3, T4, T5]>;

    static all<T1, T2, T3, T4, T5, T6>(
      values: [
        ReturnType<T1>,
        ReturnType<T2>,
        ReturnType<T3>,
        ReturnType<T4>,
        ReturnType<T5>,
        ReturnType<T6>
      ]
    ): Aigle<[T1, T2, T3, T4, T5, T6]>;

    static all<T1, T2, T3, T4, T5, T6, T7>(
      values: [
        ReturnType<T1>,
        ReturnType<T2>,
        ReturnType<T3>,
        ReturnType<T4>,
        ReturnType<T5>,
        ReturnType<T6>,
        ReturnType<T7>
      ]
    ): Aigle<[T1, T2, T3, T4, T5, T6, T7]>;

    static all<T1, T2, T3, T4, T5, T6, T7, T8>(
      values: [
        ReturnType<T1>,
        ReturnType<T2>,
        ReturnType<T3>,
        ReturnType<T4>,
        ReturnType<T5>,
        ReturnType<T6>,
        ReturnType<T7>,
        ReturnType<T8>
      ]
    ): Aigle<[T1, T2, T3, T4, T5, T6, T7, T8]>;

    static all<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
      values: [
        ReturnType<T1>,
        ReturnType<T2>,
        ReturnType<T3>,
        ReturnType<T4>,
        ReturnType<T5>,
        ReturnType<T6>,
        ReturnType<T7>,
        ReturnType<T8>,
        ReturnType<T9>
      ]
    ): Aigle<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;

    static all<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
      values: [
        ReturnType<T1>,
        ReturnType<T2>,
        ReturnType<T3>,
        ReturnType<T4>,
        ReturnType<T5>,
        ReturnType<T6>,
        ReturnType<T7>,
        ReturnType<T8>,
        ReturnType<T9>,
        ReturnType<T10>
      ]
    ): Aigle<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;

    static all<T>(values: (ReturnType<T>)[]): Aigle<T[]>;

    /* rase */

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Aigle.
     */
    static race<T1>(values: [ReturnType<T1>]): Aigle<T1>;

    static race<T1, T2>(values: [ReturnType<T1>, ReturnType<T2>]): Aigle<T1 | T2>;

    static race<T1, T2, T3>(
      values: [ReturnType<T1>, ReturnType<T2>, ReturnType<T3>]
    ): Aigle<T1 | T2 | T3>;

    static race<T1, T2, T3, T4>(
      values: [ReturnType<T1>, ReturnType<T2>, ReturnType<T3>, ReturnType<T4>]
    ): Aigle<T1 | T2 | T3 | T4>;

    static race<T1, T2, T3, T4, T5>(
      values: [ReturnType<T1>, ReturnType<T2>, ReturnType<T3>, ReturnType<T4>, ReturnType<T5>]
    ): Aigle<T1 | T2 | T3 | T4 | T5>;

    static race<T1, T2, T3, T4, T5, T6>(
      values: [
        ReturnType<T1>,
        ReturnType<T2>,
        ReturnType<T3>,
        ReturnType<T4>,
        ReturnType<T5>,
        ReturnType<T6>
      ]
    ): Aigle<T1 | T2 | T3 | T4 | T5 | T6>;

    static race<T1, T2, T3, T4, T5, T6, T7>(
      values: [
        ReturnType<T1>,
        ReturnType<T2>,
        ReturnType<T3>,
        ReturnType<T4>,
        ReturnType<T5>,
        ReturnType<T6>,
        ReturnType<T7>
      ]
    ): Aigle<T1 | T2 | T3 | T4 | T5 | T6 | T7>;

    static race<T1, T2, T3, T4, T5, T6, T7, T8>(
      values: [
        ReturnType<T1>,
        ReturnType<T2>,
        ReturnType<T3>,
        ReturnType<T4>,
        ReturnType<T5>,
        ReturnType<T6>,
        ReturnType<T7>,
        ReturnType<T8>
      ]
    ): Aigle<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>;

    static race<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
      values: [
        ReturnType<T1>,
        ReturnType<T2>,
        ReturnType<T3>,
        ReturnType<T4>,
        ReturnType<T5>,
        ReturnType<T6>,
        ReturnType<T7>,
        ReturnType<T8>,
        ReturnType<T9>
      ]
    ): Aigle<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>;

    static race<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
      values: [
        ReturnType<T1>,
        ReturnType<T2>,
        ReturnType<T3>,
        ReturnType<T4>,
        ReturnType<T5>,
        ReturnType<T6>,
        ReturnType<T7>,
        ReturnType<T8>,
        ReturnType<T9>,
        ReturnType<T10>
      ]
    ): Aigle<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10>;

    static race<T>(values: (ReturnType<T>)[]): Aigle<T>;

    /* props */

    static props<K, V>(
      map: PromiseLike<Map<K, PromiseLike<V> | V>> | Map<K, PromiseLike<V> | V>
    ): Aigle<Map<K, V>>;

    static props<T>(object: ResolvableProps<T> | PromiseLike<ResolvableProps<T>>): Aigle<T>;

    /* series */

    static series<T1>(values: [T1 | PromiseLike<T1> | PromiseCallback<T1>]): Aigle<[T1]>;

    static series<T1, T2>(
      values: [
        T1 | PromiseLike<T1> | PromiseCallback<T1>,
        T2 | PromiseLike<T2> | PromiseCallback<T2>
      ]
    ): Aigle<[T1, T2]>;

    static series<T1, T2, T3>(
      values: [
        T1 | PromiseLike<T1> | PromiseCallback<T1>,
        T2 | PromiseLike<T2> | PromiseCallback<T2>,
        T3 | PromiseLike<T3> | PromiseCallback<T3>
      ]
    ): Aigle<[T1, T2, T3]>;

    static series<T1, T2, T3, T4>(
      values: [
        T1 | PromiseLike<T1> | PromiseCallback<T1>,
        T2 | PromiseLike<T2> | PromiseCallback<T2>,
        T3 | PromiseLike<T3> | PromiseCallback<T3>,
        T4 | PromiseLike<T4> | PromiseCallback<T4>
      ]
    ): Aigle<[T1, T2, T3, T4]>;

    static series<T1, T2, T3, T4, T5>(
      values: [
        T1 | PromiseLike<T1> | PromiseCallback<T1>,
        T2 | PromiseLike<T2> | PromiseCallback<T2>,
        T3 | PromiseLike<T3> | PromiseCallback<T3>,
        T4 | PromiseLike<T4> | PromiseCallback<T4>,
        T5 | PromiseLike<T5> | PromiseCallback<T5>
      ]
    ): Aigle<[T1, T2, T3, T4, T5]>;

    static series<T1, T2, T3, T4, T5, T6>(
      values: [
        T1 | PromiseLike<T1> | PromiseCallback<T1>,
        T2 | PromiseLike<T2> | PromiseCallback<T2>,
        T3 | PromiseLike<T3> | PromiseCallback<T3>,
        T4 | PromiseLike<T4> | PromiseCallback<T4>,
        T5 | PromiseLike<T5> | PromiseCallback<T5>,
        T6 | PromiseLike<T6> | PromiseCallback<T6>
      ]
    ): Aigle<[T1, T2, T3, T4, T5, T6]>;

    static series<T1, T2, T3, T4, T5, T6, T7>(
      values: [
        T1 | PromiseLike<T1> | PromiseCallback<T1>,
        T2 | PromiseLike<T2> | PromiseCallback<T2>,
        T3 | PromiseLike<T3> | PromiseCallback<T3>,
        T4 | PromiseLike<T4> | PromiseCallback<T4>,
        T5 | PromiseLike<T5> | PromiseCallback<T5>,
        T6 | PromiseLike<T6> | PromiseCallback<T6>,
        T7 | PromiseLike<T7> | PromiseCallback<T7>
      ]
    ): Aigle<[T1, T2, T3, T4, T5, T6, T7]>;

    static series<T1, T2, T3, T4, T5, T6, T7, T8>(
      values: [
        T1 | PromiseLike<T1> | PromiseCallback<T1>,
        T2 | PromiseLike<T2> | PromiseCallback<T2>,
        T3 | PromiseLike<T3> | PromiseCallback<T3>,
        T4 | PromiseLike<T4> | PromiseCallback<T4>,
        T5 | PromiseLike<T5> | PromiseCallback<T5>,
        T6 | PromiseLike<T6> | PromiseCallback<T6>,
        T7 | PromiseLike<T7> | PromiseCallback<T7>,
        T8 | PromiseLike<T8> | PromiseCallback<T8>
      ]
    ): Aigle<[T1, T2, T3, T4, T5, T6, T7, T8]>;

    static series<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
      values: [
        T1 | PromiseLike<T1> | PromiseCallback<T1>,
        T2 | PromiseLike<T2> | PromiseCallback<T2>,
        T3 | PromiseLike<T3> | PromiseCallback<T3>,
        T4 | PromiseLike<T4> | PromiseCallback<T4>,
        T5 | PromiseLike<T5> | PromiseCallback<T5>,
        T6 | PromiseLike<T6> | PromiseCallback<T6>,
        T7 | PromiseLike<T7> | PromiseCallback<T7>,
        T8 | PromiseLike<T8> | PromiseCallback<T8>,
        T9 | PromiseLike<T9> | PromiseCallback<T9>
      ]
    ): Aigle<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;

    static series<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
      values: [
        T1 | PromiseLike<T1> | PromiseCallback<T1>,
        T2 | PromiseLike<T2> | PromiseCallback<T2>,
        T3 | PromiseLike<T3> | PromiseCallback<T3>,
        T4 | PromiseLike<T4> | PromiseCallback<T4>,
        T5 | PromiseLike<T5> | PromiseCallback<T5>,
        T6 | PromiseLike<T6> | PromiseCallback<T6>,
        T7 | PromiseLike<T7> | PromiseCallback<T7>,
        T8 | PromiseLike<T8> | PromiseCallback<T8>,
        T9 | PromiseLike<T9> | PromiseCallback<T9>,
        T10 | PromiseLike<T10> | PromiseCallback<T10>
      ]
    ): Aigle<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;

    static series<T>(values: (T | PromiseLike<T> | PromiseCallback<T>)[]): Aigle<T[]>;

    /* parallel */

    static parallel<T1>(values: [T1 | PromiseLike<T1> | PromiseCallback<T1>]): Aigle<[T1]>;

    static parallel<T1, T2>(
      values: [
        T1 | PromiseLike<T1> | PromiseCallback<T1>,
        T2 | PromiseLike<T2> | PromiseCallback<T2>
      ]
    ): Aigle<[T1, T2]>;

    static parallel<T1, T2, T3>(
      values: [
        T1 | PromiseLike<T1> | PromiseCallback<T1>,
        T2 | PromiseLike<T2> | PromiseCallback<T2>,
        T3 | PromiseLike<T3> | PromiseCallback<T3>
      ]
    ): Aigle<[T1, T2, T3]>;

    static parallel<T1, T2, T3, T4>(
      values: [
        T1 | PromiseLike<T1> | PromiseCallback<T1>,
        T2 | PromiseLike<T2> | PromiseCallback<T2>,
        T3 | PromiseLike<T3> | PromiseCallback<T3>,
        T4 | PromiseLike<T4> | PromiseCallback<T4>
      ]
    ): Aigle<[T1, T2, T3, T4]>;

    static parallel<T1, T2, T3, T4, T5>(
      values: [
        T1 | PromiseLike<T1> | PromiseCallback<T1>,
        T2 | PromiseLike<T2> | PromiseCallback<T2>,
        T3 | PromiseLike<T3> | PromiseCallback<T3>,
        T4 | PromiseLike<T4> | PromiseCallback<T4>,
        T5 | PromiseLike<T5> | PromiseCallback<T5>
      ]
    ): Aigle<[T1, T2, T3, T4, T5]>;

    static parallel<T1, T2, T3, T4, T5, T6>(
      values: [
        T1 | PromiseLike<T1> | PromiseCallback<T1>,
        T2 | PromiseLike<T2> | PromiseCallback<T2>,
        T3 | PromiseLike<T3> | PromiseCallback<T3>,
        T4 | PromiseLike<T4> | PromiseCallback<T4>,
        T5 | PromiseLike<T5> | PromiseCallback<T5>,
        T6 | PromiseLike<T6> | PromiseCallback<T6>
      ]
    ): Aigle<[T1, T2, T3, T4, T5, T6]>;

    static parallel<T1, T2, T3, T4, T5, T6, T7>(
      values: [
        T1 | PromiseLike<T1> | PromiseCallback<T1>,
        T2 | PromiseLike<T2> | PromiseCallback<T2>,
        T3 | PromiseLike<T3> | PromiseCallback<T3>,
        T4 | PromiseLike<T4> | PromiseCallback<T4>,
        T5 | PromiseLike<T5> | PromiseCallback<T5>,
        T6 | PromiseLike<T6> | PromiseCallback<T6>,
        T7 | PromiseLike<T7> | PromiseCallback<T7>
      ]
    ): Aigle<[T1, T2, T3, T4, T5, T6, T7]>;

    static parallel<T1, T2, T3, T4, T5, T6, T7, T8>(
      values: [
        T1 | PromiseLike<T1> | PromiseCallback<T1>,
        T2 | PromiseLike<T2> | PromiseCallback<T2>,
        T3 | PromiseLike<T3> | PromiseCallback<T3>,
        T4 | PromiseLike<T4> | PromiseCallback<T4>,
        T5 | PromiseLike<T5> | PromiseCallback<T5>,
        T6 | PromiseLike<T6> | PromiseCallback<T6>,
        T7 | PromiseLike<T7> | PromiseCallback<T7>,
        T8 | PromiseLike<T8> | PromiseCallback<T8>
      ]
    ): Aigle<[T1, T2, T3, T4, T5, T6, T7, T8]>;

    static parallel<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
      values: [
        T1 | PromiseLike<T1> | PromiseCallback<T1>,
        T2 | PromiseLike<T2> | PromiseCallback<T2>,
        T3 | PromiseLike<T3> | PromiseCallback<T3>,
        T4 | PromiseLike<T4> | PromiseCallback<T4>,
        T5 | PromiseLike<T5> | PromiseCallback<T5>,
        T6 | PromiseLike<T6> | PromiseCallback<T6>,
        T7 | PromiseLike<T7> | PromiseCallback<T7>,
        T8 | PromiseLike<T8> | PromiseCallback<T8>,
        T9 | PromiseLike<T9> | PromiseCallback<T9>
      ]
    ): Aigle<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;

    static parallel<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
      values: [
        T1 | PromiseLike<T1> | PromiseCallback<T1>,
        T2 | PromiseLike<T2> | PromiseCallback<T2>,
        T3 | PromiseLike<T3> | PromiseCallback<T3>,
        T4 | PromiseLike<T4> | PromiseCallback<T4>,
        T5 | PromiseLike<T5> | PromiseCallback<T5>,
        T6 | PromiseLike<T6> | PromiseCallback<T6>,
        T7 | PromiseLike<T7> | PromiseCallback<T7>,
        T8 | PromiseLike<T8> | PromiseCallback<T8>,
        T9 | PromiseLike<T9> | PromiseCallback<T9>,
        T10 | PromiseLike<T10> | PromiseCallback<T10>
      ]
    ): Aigle<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;

    static parallel<T>(values: (T | PromiseLike<T> | PromiseCallback<T>)[]): Aigle<T[]>;

    /* parallelLimit */

    static parallelLimit<T1>(
      values: [T1 | PromiseLike<T1> | PromiseCallback<T1>],
      limit?: number
    ): Aigle<[T1]>;

    static parallelLimit<T1, T2>(
      values: [
        T1 | PromiseLike<T1> | PromiseCallback<T1>,
        T2 | PromiseLike<T2> | PromiseCallback<T2>
      ],
      limit?: number
    ): Aigle<[T1, T2]>;

    static parallelLimit<T1, T2, T3>(
      values: [
        T1 | PromiseLike<T1> | PromiseCallback<T1>,
        T2 | PromiseLike<T2> | PromiseCallback<T2>,
        T3 | PromiseLike<T3> | PromiseCallback<T3>
      ],
      limit?: number
    ): Aigle<[T1, T2, T3]>;

    static parallelLimit<T1, T2, T3, T4>(
      values: [
        T1 | PromiseLike<T1> | PromiseCallback<T1>,
        T2 | PromiseLike<T2> | PromiseCallback<T2>,
        T3 | PromiseLike<T3> | PromiseCallback<T3>,
        T4 | PromiseLike<T4> | PromiseCallback<T4>
      ],
      limit?: number
    ): Aigle<[T1, T2, T3, T4]>;

    static parallelLimit<T1, T2, T3, T4, T5>(
      values: [
        T1 | PromiseLike<T1> | PromiseCallback<T1>,
        T2 | PromiseLike<T2> | PromiseCallback<T2>,
        T3 | PromiseLike<T3> | PromiseCallback<T3>,
        T4 | PromiseLike<T4> | PromiseCallback<T4>,
        T5 | PromiseLike<T5> | PromiseCallback<T5>
      ],
      limit?: number
    ): Aigle<[T1, T2, T3, T4, T5]>;

    static parallelLimit<T1, T2, T3, T4, T5, T6>(
      values: [
        T1 | PromiseLike<T1> | PromiseCallback<T1>,
        T2 | PromiseLike<T2> | PromiseCallback<T2>,
        T3 | PromiseLike<T3> | PromiseCallback<T3>,
        T4 | PromiseLike<T4> | PromiseCallback<T4>,
        T5 | PromiseLike<T5> | PromiseCallback<T5>,
        T6 | PromiseLike<T6> | PromiseCallback<T6>
      ],
      limit?: number
    ): Aigle<[T1, T2, T3, T4, T5, T6]>;

    static parallelLimit<T1, T2, T3, T4, T5, T6, T7>(
      values: [
        T1 | PromiseLike<T1> | PromiseCallback<T1>,
        T2 | PromiseLike<T2> | PromiseCallback<T2>,
        T3 | PromiseLike<T3> | PromiseCallback<T3>,
        T4 | PromiseLike<T4> | PromiseCallback<T4>,
        T5 | PromiseLike<T5> | PromiseCallback<T5>,
        T6 | PromiseLike<T6> | PromiseCallback<T6>,
        T7 | PromiseLike<T7> | PromiseCallback<T7>
      ],
      limit?: number
    ): Aigle<[T1, T2, T3, T4, T5, T6, T7]>;

    static parallelLimit<T1, T2, T3, T4, T5, T6, T7, T8>(
      values: [
        T1 | PromiseLike<T1> | PromiseCallback<T1>,
        T2 | PromiseLike<T2> | PromiseCallback<T2>,
        T3 | PromiseLike<T3> | PromiseCallback<T3>,
        T4 | PromiseLike<T4> | PromiseCallback<T4>,
        T5 | PromiseLike<T5> | PromiseCallback<T5>,
        T6 | PromiseLike<T6> | PromiseCallback<T6>,
        T7 | PromiseLike<T7> | PromiseCallback<T7>,
        T8 | PromiseLike<T8> | PromiseCallback<T8>
      ],
      limit?: number
    ): Aigle<[T1, T2, T3, T4, T5, T6, T7, T8]>;

    static parallelLimit<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
      values: [
        T1 | PromiseLike<T1> | PromiseCallback<T1>,
        T2 | PromiseLike<T2> | PromiseCallback<T2>,
        T3 | PromiseLike<T3> | PromiseCallback<T3>,
        T4 | PromiseLike<T4> | PromiseCallback<T4>,
        T5 | PromiseLike<T5> | PromiseCallback<T5>,
        T6 | PromiseLike<T6> | PromiseCallback<T6>,
        T7 | PromiseLike<T7> | PromiseCallback<T7>,
        T8 | PromiseLike<T8> | PromiseCallback<T8>,
        T9 | PromiseLike<T9> | PromiseCallback<T9>
      ],
      limit?: number
    ): Aigle<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;

    static parallelLimit<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
      values: [
        T1 | PromiseLike<T1> | PromiseCallback<T1>,
        T2 | PromiseLike<T2> | PromiseCallback<T2>,
        T3 | PromiseLike<T3> | PromiseCallback<T3>,
        T4 | PromiseLike<T4> | PromiseCallback<T4>,
        T5 | PromiseLike<T5> | PromiseCallback<T5>,
        T6 | PromiseLike<T6> | PromiseCallback<T6>,
        T7 | PromiseLike<T7> | PromiseCallback<T7>,
        T8 | PromiseLike<T8> | PromiseCallback<T8>,
        T9 | PromiseLike<T9> | PromiseCallback<T9>,
        T10 | PromiseLike<T10> | PromiseCallback<T10>
      ],
      limit?: number
    ): Aigle<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;

    static parallelLimit<T>(
      values: (T | PromiseLike<T> | PromiseCallback<T>)[],
      limit?: number
    ): Aigle<T[]>;

    /* each/forEach */

    static each<T>(collection: T[], iterator?: ArrayIterator<T, any>): Aigle<T[]>;

    static each<T>(collection: List<T>, iterator?: ListIterator<T, any>): Aigle<List<T>>;

    static each<T extends object>(collection: T, iterator?: ObjectIterator<T, any>): Aigle<T>;

    static forEach<T>(collection: T[], iterator?: ArrayIterator<T, any>): Aigle<T[]>;

    static forEach<T>(collection: List<T>, iterator?: ListIterator<T, any>): Aigle<List<T>>;

    static forEach<T extends object>(collection: T, iterator?: ObjectIterator<T, any>): Aigle<T>;

    /* eachSeries/forEachSeries */

    static eachSeries<T>(collection: T[], iterator?: ArrayIterator<T, any>): Aigle<T[]>;

    static eachSeries<T>(collection: List<T>, iterator?: ListIterator<T, any>): Aigle<List<T>>;

    static eachSeries<T extends object>(collection: T, iterator?: ObjectIterator<T, any>): Aigle<T>;

    static forEachSeries<T>(collection: T[], iterator?: ArrayIterator<T, any>): Aigle<T[]>;

    static forEachSeries<T>(collection: List<T>, iterator?: ListIterator<T, any>): Aigle<List<T>>;

    static forEachSeries<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, any>
    ): Aigle<T>;

    /* eachLimit/forEachLimit */

    static eachLimit<T>(collection: T[], iterator?: ArrayIterator<T, any>): Aigle<T[]>;
    static eachLimit<T>(
      collection: T[],
      limit: number,
      iterator: ArrayIterator<T, any>
    ): Aigle<T[]>;

    static eachLimit<T>(collection: List<T>, iterator?: ListIterator<T, any>): Aigle<List<T>>;
    static eachLimit<T>(
      collection: List<T>,
      limit: number,
      iterator: ListIterator<T, any>
    ): Aigle<List<T>>;

    static eachLimit<T extends object>(collection: T, iterator?: ObjectIterator<T, any>): Aigle<T>;
    static eachLimit<T extends object>(
      collection: T,
      limit: number,
      iterator: ObjectIterator<T, any>
    ): Aigle<T>;

    static forEachLimit<T>(collection: T[], iterator?: ArrayIterator<T, any>): Aigle<T[]>;
    static forEachLimit<T>(
      collection: T[],
      limit: number,
      iterator: ArrayIterator<T, any>
    ): Aigle<T[]>;

    static forEachLimit<T>(collection: List<T>, iterator?: ListIterator<T, any>): Aigle<List<T>>;
    static forEachLimit<T>(
      collection: List<T>,
      limit: number,
      iterator: ListIterator<T, any>
    ): Aigle<List<T>>;

    static forEachLimit<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, any>
    ): Aigle<T>;
    static forEachLimit<T extends object>(
      collection: T,
      limit: number,
      iterator: ObjectIterator<T, any>
    ): Aigle<T>;

    /* map */

    static map<T, R>(collection: T[], iterator: ArrayIterator<T, R>): Aigle<R[]>;

    static map<T, R>(collection: List<T>, iterator: ListIterator<T, R>): Aigle<R[]>;

    static map<T extends object, R>(collection: T, iterator: ObjectIterator<T, R>): Aigle<R[]>;

    /* mapSeries */

    static mapSeries<T, R>(collection: T[], iterator: ArrayIterator<T, R>): Aigle<R[]>;

    static mapSeries<T, R>(collection: List<T>, iterator: ListIterator<T, R>): Aigle<R[]>;

    static mapSeries<T extends object, R>(
      collection: T,
      iterator: ObjectIterator<T, R>
    ): Aigle<R[]>;

    /* mapLimit */

    static mapLimit<T, R>(collection: T[], iterator: ArrayIterator<T, R>): Aigle<R[]>;
    static mapLimit<T, R>(
      collection: T[],
      limit: number,
      iterator: ArrayIterator<T, R>
    ): Aigle<R[]>;

    static mapLimit<T, R>(collection: List<T>, iterator: ListIterator<T, R>): Aigle<R[]>;
    static mapLimit<T, R>(
      collection: List<T>,
      limit: number,
      iterator: ListIterator<T, R>
    ): Aigle<R[]>;

    static mapLimit<T extends object, R>(collection: T, iterator: ObjectIterator<T, R>): Aigle<R[]>;
    static mapLimit<T extends object, R>(
      collection: T,
      limit: number,
      iterator: ObjectIterator<T, R>
    ): Aigle<R[]>;

    /* mapValues */

    static mapValues<T, R>(collection: T[], iterator?: ArrayIterator<T, R>): Aigle<Dictionary<R>>;

    static mapValues<T, R>(
      collection: List<T>,
      iterator?: ListIterator<T, R>
    ): Aigle<Dictionary<R>>;

    static mapValues<T extends object, R>(
      collection: T,
      iterator?: ObjectIterator<T, R>
    ): Aigle<Record<keyof T, R>>;

    /* mapValuesSeries */

    static mapValuesSeries<T, R>(
      collection: T[],
      iterator?: ArrayIterator<T, R>
    ): Aigle<Dictionary<R>>;

    static mapValuesSeries<T, R>(
      collection: List<T>,
      iterator?: ListIterator<T, R>
    ): Aigle<Dictionary<R>>;

    static mapValuesSeries<T extends object, R>(
      collection: T,
      iterator?: ObjectIterator<T, R>
    ): Aigle<Record<keyof T, R>>;

    /* mapValuesLimit */

    static mapValuesLimit<T, R>(
      collection: T[],
      iterator?: ArrayIterator<T, R>
    ): Aigle<Dictionary<R>>;
    static mapValuesLimit<T, R>(
      collection: T[],
      limit: number,
      iterator: ArrayIterator<T, R>
    ): Aigle<Dictionary<R>>;

    static mapValuesLimit<T, R>(
      collection: List<T>,
      iterator?: ListIterator<T, R>
    ): Aigle<Dictionary<R>>;
    static mapValuesLimit<T, R>(
      collection: List<T>,
      limit: number,
      iterator: ListIterator<T, R>
    ): Aigle<Dictionary<R>>;

    static mapValuesLimit<T extends object, R>(
      collection: T,
      iterator?: ObjectIterator<T, R>
    ): Aigle<Record<keyof T, R>>;
    static mapValuesLimit<T extends object, R>(
      collection: T,
      limit: number,
      iterator: ObjectIterator<T, R>
    ): Aigle<Record<keyof T, R>>;

    /* concat */

    static concat<T, R>(collection: T[], iterator?: ArrayIterator<T, R | R[]>): Aigle<R[]>;

    static concat<T, R>(collection: List<T>, iterator?: ListIterator<T, R | R[]>): Aigle<R[]>;

    static concat<T extends object, R>(
      collection: T,
      iterator?: ObjectIterator<T, R | R[]>
    ): Aigle<R[]>;

    /* concatSeries */

    static concatSeries<T, R>(collection: T[], iterator?: ArrayIterator<T, R | R[]>): Aigle<R[]>;

    static concatSeries<T, R>(collection: List<T>, iterator?: ListIterator<T, R | R[]>): Aigle<R[]>;

    static concatSeries<T extends object, R>(
      collection: T,
      iterator?: ObjectIterator<T, R | R[]>
    ): Aigle<R[]>;

    /* concatLimit */

    static concatLimit<T, R>(collection: T[], iterator?: ArrayIterator<T, R | R[]>): Aigle<R[]>;
    static concatLimit<T, R>(
      collection: T[],
      limit: number,
      iterator: ArrayIterator<T, R | R[]>
    ): Aigle<R[]>;

    static concatLimit<T, R>(collection: List<T>, iterator?: ListIterator<T, R | R[]>): Aigle<R[]>;
    static concatLimit<T, R>(
      collection: List<T>,
      limit: number,
      iterator: ListIterator<T, R | R[]>
    ): Aigle<R[]>;

    static concatLimit<T extends object, R>(
      collection: T,
      iterator?: ObjectIterator<T, R | R[]>
    ): Aigle<R[]>;
    static concatLimit<T extends object, R>(
      collection: T,
      limit: number,
      iterator: ObjectIterator<T, R | R[]>
    ): Aigle<R[]>;

    /* every */

    static every<T>(collection: T[], iterator?: ArrayIterator<T, boolean>): Aigle<boolean>;

    static every<T>(collection: List<T>, iterator?: ListIterator<T, boolean>): Aigle<boolean>;

    static every<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<boolean>;

    /* everySeries */

    static everySeries<T>(collection: T[], iterator?: ArrayIterator<T, boolean>): Aigle<boolean>;

    static everySeries<T>(collection: List<T>, iterator?: ListIterator<T, boolean>): Aigle<boolean>;

    static everySeries<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<boolean>;

    /* everyLimit */

    static everyLimit<T>(collection: T[], iterator?: ArrayIterator<T, boolean>): Aigle<boolean>;
    static everyLimit<T>(
      collection: T[],
      limit: number,
      iterator: ArrayIterator<T, boolean>
    ): Aigle<boolean>;

    static everyLimit<T>(collection: List<T>, iterator?: ListIterator<T, boolean>): Aigle<boolean>;
    static everyLimit<T>(
      collection: List<T>,
      limit: number,
      iterator: ListIterator<T, boolean>
    ): Aigle<boolean>;

    static everyLimit<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<boolean>;
    static everyLimit<T extends object>(
      collection: T,
      limit: number,
      iterator: ObjectIterator<T, boolean>
    ): Aigle<boolean>;

    /* some */

    static some<T>(collection: T[], iterator?: ArrayIterator<T, boolean>): Aigle<boolean>;

    static some<T>(collection: List<T>, iterator?: ListIterator<T, boolean>): Aigle<boolean>;

    static some<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<boolean>;

    /* someSeries */

    static someSeries<T>(collection: T[], iterator?: ArrayIterator<T, boolean>): Aigle<boolean>;

    static someSeries<T>(collection: List<T>, iterator?: ListIterator<T, boolean>): Aigle<boolean>;

    static someSeries<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<boolean>;

    /* someLimit */

    static someLimit<T>(collection: T[], iterator?: ArrayIterator<T, boolean>): Aigle<boolean>;
    static someLimit<T>(
      collection: T[],
      limit: number,
      iterator: ArrayIterator<T, boolean>
    ): Aigle<boolean>;

    static someLimit<T>(collection: List<T>, iterator?: ListIterator<T, boolean>): Aigle<boolean>;
    static someLimit<T>(
      collection: List<T>,
      limit: number,
      iterator: ListIterator<T, boolean>
    ): Aigle<boolean>;

    static someLimit<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<boolean>;
    static someLimit<T extends object>(
      collection: T,
      limit: number,
      iterator: ObjectIterator<T, boolean>
    ): Aigle<boolean>;

    /* filter */

    static filter<T>(collection: T[], iterator?: ArrayIterator<T, boolean>): Aigle<T[]>;

    static filter<T>(collection: List<T>, iterator?: ListIterator<T, boolean>): Aigle<T[]>;

    static filter<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<Array<T[keyof T]>>;

    /* filterSeries */

    static filterSeries<T>(collection: T[], iterator?: ArrayIterator<T, boolean>): Aigle<T[]>;

    static filterSeries<T>(collection: List<T>, iterator?: ListIterator<T, boolean>): Aigle<T[]>;

    static filterSeries<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<Array<T[keyof T]>>;

    /* filterLimit */

    static filterLimit<T>(collection: T[], iterator?: ArrayIterator<T, boolean>): Aigle<T[]>;
    static filterLimit<T>(
      collection: T[],
      limit: number,
      iterator: ArrayIterator<T, boolean>
    ): Aigle<T[]>;

    static filterLimit<T>(collection: List<T>, iterator?: ListIterator<T, boolean>): Aigle<T[]>;
    static filterLimit<T>(
      collection: List<T>,
      limit: number,
      iterator: ListIterator<T, boolean>
    ): Aigle<T[]>;

    static filterLimit<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<Array<T[keyof T]>>;
    static filterLimit<T extends object>(
      collection: T,
      limit: number,
      iterator: ObjectIterator<T, boolean>
    ): Aigle<Array<T[keyof T]>>;

    /* reject */

    static reject<T>(collection: T[], iterator?: ArrayIterator<T, boolean>): Aigle<T[]>; // tslint:disable-line:adjacent-overload-signatures

    static reject<T>(collection: List<T>, iterator?: ListIterator<T, boolean>): Aigle<T[]>;

    static reject<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<Array<T[keyof T]>>;

    /* rejectSeries */

    static rejectSeries<T>(collection: T[], iterator?: ArrayIterator<T, boolean>): Aigle<T[]>;

    static rejectSeries<T>(collection: List<T>, iterator?: ListIterator<T, boolean>): Aigle<T[]>;

    static rejectSeries<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<Array<T[keyof T]>>;

    /* rejectLimit */

    static rejectLimit<T>(collection: T[], iterator?: ArrayIterator<T, boolean>): Aigle<T[]>;
    static rejectLimit<T>(
      collection: T[],
      limit: number,
      iterator: ArrayIterator<T, boolean>
    ): Aigle<T[]>;

    static rejectLimit<T>(collection: List<T>, iterator?: ListIterator<T, boolean>): Aigle<T[]>;
    static rejectLimit<T>(
      collection: List<T>,
      limit: number,
      iterator: ListIterator<T, boolean>
    ): Aigle<T[]>;

    static rejectLimit<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<Array<T[keyof T]>>;
    static rejectLimit<T extends object>(
      collection: T,
      limit: number,
      iterator: ObjectIterator<T, boolean>
    ): Aigle<Array<T[keyof T]>>;

    /* sortBy */

    static sortBy<T>(collection: T[], iterator?: ArrayIterator<T>): Aigle<T[]>;

    static sortBy<T>(collection: List<T>, iterator?: ListIterator<T>): Aigle<T[]>;

    static sortBy<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T>
    ): Aigle<Array<T[keyof T]>>;

    /* sortBySeries */

    static sortBySeries<T>(collection: T[], iterator?: ArrayIterator<T>): Aigle<T[]>;

    static sortBySeries<T>(collection: List<T>, iterator?: ListIterator<T>): Aigle<T[]>;

    static sortBySeries<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T>
    ): Aigle<Array<T[keyof T]>>;

    /* sortByLimit */

    static sortByLimit<T>(collection: T[], iterator?: ArrayIterator<T>): Aigle<T[]>;
    static sortByLimit<T>(collection: T[], limit: number, iterator: ArrayIterator<T>): Aigle<T[]>;

    static sortByLimit<T>(collection: List<T>, iterator?: ListIterator<T>): Aigle<T[]>;
    static sortByLimit<T>(
      collection: List<T>,
      limit: number,
      iterator: ListIterator<T>
    ): Aigle<T[]>;

    static sortByLimit<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T>
    ): Aigle<Array<T[keyof T]>>;
    static sortByLimit<T extends object>(
      collection: T,
      limit: number,
      iterator: ObjectIterator<T>
    ): Aigle<Array<T[keyof T]>>;

    /* find / detect */

    static find<T>(collection: T[], iterator?: ArrayIterator<T, boolean>): Aigle<T>;

    static find<T>(collection: List<T>, iterator?: ListIterator<T, boolean>): Aigle<T>;

    static find<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<T[keyof T]>;

    static detect<T>(collection: T[], iterator?: ArrayIterator<T, boolean>): Aigle<T>;

    static detect<T>(collection: List<T>, iterator?: ListIterator<T, boolean>): Aigle<T>;

    static detect<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<T[keyof T]>;

    /* findSeries / detectSeries */

    static findSeries<T>(collection: T[], iterator?: ArrayIterator<T, boolean>): Aigle<T>;

    static findSeries<T>(collection: List<T>, iterator?: ListIterator<T, boolean>): Aigle<T>;

    static findSeries<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<T[keyof T]>;

    static detectSeries<T>(collection: T[], iterator?: ArrayIterator<T, boolean>): Aigle<T>;

    static detectSeries<T>(collection: List<T>, iterator?: ListIterator<T, boolean>): Aigle<T>;

    static detectSeries<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<T[keyof T]>;

    /* findLimit / detectLimit */

    static findLimit<T>(collection: T[], iterator?: ArrayIterator<T, boolean>): Aigle<T>;
    static findLimit<T>(
      collection: T[],
      limit: number,
      iterator: ArrayIterator<T, boolean>
    ): Aigle<T>;

    static findLimit<T>(collection: List<T>, iterator?: ListIterator<T, boolean>): Aigle<T>;
    static findLimit<T>(
      collection: List<T>,
      limit: number,
      iterator: ListIterator<T, boolean>
    ): Aigle<T>;

    static findLimit<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<T[keyof T]>;
    static findLimit<T extends object>(
      collection: T,
      limit: number,
      iterator: ObjectIterator<T, boolean>
    ): Aigle<T[keyof T]>;

    static detectLimit<T>(collection: T[], iterator?: ArrayIterator<T, boolean>): Aigle<T>;
    static detectLimit<T>(
      collection: T[],
      limit: number,
      iterator: ArrayIterator<T, boolean>
    ): Aigle<T>;

    static detectLimit<T>(collection: List<T>, iterator?: ListIterator<T, boolean>): Aigle<T>;
    static detectLimit<T>(
      collection: List<T>,
      limit: number,
      iterator: ListIterator<T, boolean>
    ): Aigle<T>;

    static detectLimit<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<T[keyof T]>;
    static detectLimit<T extends object>(
      collection: T,
      limit: number,
      iterator: ObjectIterator<T, boolean>
    ): Aigle<T[keyof T]>;

    /* findIndex */

    static findIndex<T>(collection: T[], iterator?: ArrayIterator<T, boolean>): Aigle<number>;

    static findIndex<T>(collection: List<T>, iterator?: ListIterator<T, boolean>): Aigle<number>;

    static findIndex<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<number>;

    /* findIndexSeries */

    static findIndexSeries<T>(collection: T[], iterator?: ArrayIterator<T, boolean>): Aigle<number>;

    static findIndexSeries<T>(
      collection: List<T>,
      iterator?: ListIterator<T, boolean>
    ): Aigle<number>;

    static findIndexSeries<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<number>;

    /* findIndexLimit */

    static findIndexLimit<T>(collection: T[], iterator?: ArrayIterator<T, boolean>): Aigle<number>;
    static findIndexLimit<T>(
      collection: T[],
      limit: number,
      iterator: ArrayIterator<T, boolean>
    ): Aigle<number>;

    static findIndexLimit<T>(
      collection: List<T>,
      iterator?: ListIterator<T, boolean>
    ): Aigle<number>;
    static findIndexLimit<T>(
      collection: List<T>,
      limit: number,
      iterator: ListIterator<T, boolean>
    ): Aigle<number>;

    static findIndexLimit<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<number>;
    static findIndexLimit<T extends object>(
      collection: T,
      limit: number,
      iterator: ObjectIterator<T, boolean>
    ): Aigle<number>;

    /* findKey */

    static findKey<T>(
      collection: T[],
      iterator?: ArrayIterator<T, boolean>
    ): Aigle<string | undefined>;

    static findKey<T>(
      collection: List<T>,
      iterator?: ListIterator<T, boolean>
    ): Aigle<string | undefined>;

    static findKey<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<string | undefined>;

    /* findKeySeries */

    static findKeySeries<T>(
      collection: T[],
      iterator?: ArrayIterator<T, boolean>
    ): Aigle<string | undefined>;

    static findKeySeries<T>(
      collection: List<T>,
      iterator?: ListIterator<T, boolean>
    ): Aigle<string | undefined>;

    static findKeySeries<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<string | undefined>;

    /* findKeyLimit */

    static findKeyLimit<T>(
      collection: T[],
      iterator?: ArrayIterator<T, boolean>
    ): Aigle<string | undefined>;
    static findKeyLimit<T>(
      collection: T[],
      limit: number,
      iterator: ArrayIterator<T, boolean>
    ): Aigle<string | undefined>;

    static findKeyLimit<T>(
      collection: List<T>,
      iterator?: ListIterator<T, boolean>
    ): Aigle<string | undefined>;
    static findKeyLimit<T>(
      collection: List<T>,
      limit: number,
      iterator: ListIterator<T, boolean>
    ): Aigle<string | undefined>;

    static findKeyLimit<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<string | undefined>;
    static findKeyLimit<T extends object>(
      collection: T,
      limit: number,
      iterator: ObjectIterator<T, boolean>
    ): Aigle<string | undefined>;

    /* groupBy */

    static groupBy<T>(collection: T[], iterator?: ArrayIterator<T>): Aigle<Dictionary<T[]>>;

    static groupBy<T>(collection: List<T>, iterator?: ListIterator<T>): Aigle<Dictionary<T[]>>;

    static groupBy<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T>
    ): Aigle<Dictionary<T[]>>;

    /* groupBySeries */

    static groupBySeries<T>(collection: T[], iterator?: ArrayIterator<T>): Aigle<Dictionary<T[]>>;

    static groupBySeries<T>(
      collection: List<T>,
      iterator?: ListIterator<T>
    ): Aigle<Dictionary<T[]>>;

    static groupBySeries<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T>
    ): Aigle<Dictionary<T[]>>;

    /* groupByLimit */

    static groupByLimit<T>(collection: T[], iterator?: ArrayIterator<T>): Aigle<Dictionary<T[]>>;
    static groupByLimit<T>(
      collection: T[],
      limit: number,
      iterator: ArrayIterator<T>
    ): Aigle<Dictionary<T[]>>;

    static groupByLimit<T>(collection: List<T>, iterator?: ListIterator<T>): Aigle<Dictionary<T[]>>;
    static groupByLimit<T>(
      collection: List<T>,
      limit: number,
      iterator: ListIterator<T>
    ): Aigle<Dictionary<T[]>>;

    static groupByLimit<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T>
    ): Aigle<Dictionary<T[]>>;
    static groupByLimit<T extends object>(
      collection: T,
      limit: number,
      iterator: ObjectIterator<T>
    ): Aigle<Dictionary<T[]>>;

    /* omit */

    static omit<T>(collection: T[], iterator?: ArrayIterator<T, boolean>): Aigle<Dictionary<T>>;

    static omit<T>(collection: List<T>, iterator?: ListIterator<T, boolean>): Aigle<Dictionary<T>>;

    static omit<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<Partial<T>>;

    /* omitBy */

    static omitBy<T>(collection: T[], iterator?: ArrayIterator<T, boolean>): Aigle<Dictionary<T>>;

    static omitBy<T>(
      collection: List<T>,
      iterator?: ListIterator<T, boolean>
    ): Aigle<Dictionary<T>>;

    static omitBy<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<Partial<T>>;

    /* omitSeries / omitBySeries */

    static omitSeries<T>(
      collection: T[],
      iterator?: ArrayIterator<T, boolean>
    ): Aigle<Dictionary<T>>;

    static omitSeries<T>(
      collection: List<T>,
      iterator?: ListIterator<T, boolean>
    ): Aigle<Dictionary<T>>;

    static omitSeries<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<Partial<T>>;

    static omitBySeries<T>(
      collection: T[],
      iterator?: ArrayIterator<T, boolean>
    ): Aigle<Dictionary<T>>;

    static omitBySeries<T>(
      collection: List<T>,
      iterator?: ListIterator<T, boolean>
    ): Aigle<Dictionary<T>>;

    static omitBySeries<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<Partial<T>>;

    /* omitLimit / omitByLimit */

    static omitLimit<T>(
      collection: T[],
      iterator?: ArrayIterator<T, boolean>
    ): Aigle<Dictionary<T>>;
    static omitLimit<T>(
      collection: T[],
      limit: number,
      iterator: ArrayIterator<T, boolean>
    ): Aigle<Dictionary<T>>;

    static omitLimit<T>(
      collection: List<T>,
      iterator?: ListIterator<T, boolean>
    ): Aigle<Dictionary<T>>;
    static omitLimit<T>(
      collection: List<T>,
      limit: number,
      iterator: ListIterator<T, boolean>
    ): Aigle<Dictionary<T>>;

    static omitLimit<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<Partial<T>>;
    static omitLimit<T extends object>(
      collection: T,
      limit: number,
      iterator: ObjectIterator<T, boolean>
    ): Aigle<Partial<T>>;

    static omitByLimit<T>(
      collection: T[],
      iterator?: ArrayIterator<T, boolean>
    ): Aigle<Dictionary<T>>;
    static omitByLimit<T>(
      collection: T[],
      limit: number,
      iterator: ArrayIterator<T, boolean>
    ): Aigle<Dictionary<T>>;

    static omitByLimit<T>(
      collection: List<T>,
      iterator?: ListIterator<T, boolean>
    ): Aigle<Dictionary<T>>;
    static omitByLimit<T>(
      collection: List<T>,
      limit: number,
      iterator: ListIterator<T, boolean>
    ): Aigle<Dictionary<T>>;

    static omitByLimit<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<Partial<T>>;
    static omitByLimit<T extends object>(
      collection: T,
      limit: number,
      iterator: ObjectIterator<T, boolean>
    ): Aigle<Partial<T>>;

    /* pick */

    static pick<T>(collection: T[], iterator?: ArrayIterator<T, boolean>): Aigle<Dictionary<T>>;

    static pick<T>(collection: List<T>, iterator?: ListIterator<T, boolean>): Aigle<Dictionary<T>>;

    static pick<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<Dictionary<T>>;

    /* pickBy */

    static pickBy<T>(collection: T[], iterator?: ArrayIterator<T, boolean>): Aigle<Dictionary<T>>;

    static pickBy<T>(
      collection: List<T>,
      iterator?: ListIterator<T, boolean>
    ): Aigle<Dictionary<T>>;

    static pickBy<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<Dictionary<T>>;

    /* pickSeries / pickBySeries */

    static pickSeries<T>(
      collection: T[],
      iterator?: ArrayIterator<T, boolean>
    ): Aigle<Dictionary<T>>;

    static pickSeries<T>(
      collection: List<T>,
      iterator?: ListIterator<T, boolean>
    ): Aigle<Dictionary<T>>;

    static pickSeries<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<Dictionary<T>>;

    static pickBySeries<T>(
      collection: T[],
      iterator?: ArrayIterator<T, boolean>
    ): Aigle<Dictionary<T>>;

    static pickBySeries<T>(
      collection: List<T>,
      iterator?: ListIterator<T, boolean>
    ): Aigle<Dictionary<T>>;

    static pickBySeries<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<Dictionary<T>>;

    /* pickLimit / pickByLimit */

    static pickLimit<T>(
      collection: T[],
      iterator?: ArrayIterator<T, boolean>
    ): Aigle<Dictionary<T>>;
    static pickLimit<T>(
      collection: T[],
      limit: number,
      iterator: ArrayIterator<T, boolean>
    ): Aigle<Dictionary<T>>;

    static pickLimit<T>(
      collection: List<T>,
      iterator?: ListIterator<T, boolean>
    ): Aigle<Dictionary<T>>;
    static pickLimit<T>(
      collection: List<T>,
      limit: number,
      iterator: ListIterator<T, boolean>
    ): Aigle<Dictionary<T>>;

    static pickLimit<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<Dictionary<T>>;
    static pickLimit<T extends object>(
      collection: T,
      limit: number,
      iterator: ObjectIterator<T, boolean>
    ): Aigle<Dictionary<T[]>>;

    static pickByLimit<T>(
      collection: T[],
      iterator?: ArrayIterator<T, boolean>
    ): Aigle<Dictionary<T>>;
    static pickByLimit<T>(
      collection: T[],
      limit: number,
      iterator: ArrayIterator<T, boolean>
    ): Aigle<Dictionary<T>>;

    static pickByLimit<T>(
      collection: List<T>,
      iterator?: ListIterator<T, boolean>
    ): Aigle<Dictionary<T>>;
    static pickByLimit<T>(
      collection: List<T>,
      limit: number,
      iterator: ListIterator<T, boolean>
    ): Aigle<Dictionary<T>>;

    static pickByLimit<T extends object>(
      collection: T,
      iterator?: ObjectIterator<T, boolean>
    ): Aigle<Dictionary<T>>;
    static pickByLimit<T extends object>(
      collection: T,
      limit: number,
      iterator: ObjectIterator<T, boolean>
    ): Aigle<Dictionary<T[]>>;

    /* transform */

    static transform<T, R>(
      collection: T[],
      iterator: MemoArrayIterator<T, R[]>,
      accumulator?: R[]
    ): Aigle<R[]>;
    static transform<T, R>(
      collection: T[],
      iterator: MemoArrayIterator<T, Dictionary<R>>,
      accumulator: Dictionary<R>
    ): Aigle<Dictionary<R>>;

    static transform<T, R>(
      collection: List<T>,
      iterator: MemoListIterator<T, R[]>,
      accumulator?: R[]
    ): Aigle<R[]>;
    static transform<T, R>(
      collection: List<T>,
      iterator: MemoListIterator<T, Dictionary<R>>,
      accumulator?: Dictionary<R>
    ): Aigle<Dictionary<R>>;

    static transform<T extends object, R>(
      collection: T,
      iterator: MemoObjectIterator<T, Dictionary<R>>,
      accumulator?: Dictionary<R>
    ): Aigle<Dictionary<R>>;
    static transform<T extends object, R>(
      collection: T,
      iterator: MemoObjectIterator<T, R[]>,
      accumulator: R[]
    ): Aigle<R[]>;

    /* transformSeries */

    static transformSeries<T, R>(
      collection: T[],
      iterator: MemoArrayIterator<T, R[]>,
      accumulator?: R[]
    ): Aigle<R[]>;
    static transformSeries<T, R>(
      collection: T[],
      iterator: MemoArrayIterator<T, Dictionary<R>>,
      accumulator: Dictionary<R>
    ): Aigle<Dictionary<R>>;

    static transformSeries<T, R>(
      collection: List<T>,
      iterator: MemoListIterator<T, R[]>,
      accumulator?: R[]
    ): Aigle<R[]>;
    static transformSeries<T, R>(
      collection: List<T>,
      iterator: MemoListIterator<T, Dictionary<R>>,
      accumulator?: Dictionary<R>
    ): Aigle<Dictionary<R>>;

    static transformSeries<T extends object, R>(
      collection: T,
      iterator: MemoObjectIterator<T, Dictionary<R>>,
      accumulator?: Dictionary<R>
    ): Aigle<Dictionary<R>>;
    static transformSeries<T extends object, R>(
      collection: T,
      iterator: MemoObjectIterator<T, R[]>,
      accumulator: R[]
    ): Aigle<R[]>;

    /* transformLimit */

    static transformLimit<T, R>(
      collection: T[],
      iterator: MemoArrayIterator<T, R[]>,
      accumulator?: R[]
    ): Aigle<R[]>;
    static transformLimit<T, R>(
      collection: T[],
      limit: number,
      iterator: MemoArrayIterator<T, R[]>,
      accumulator?: R[]
    ): Aigle<R[]>;
    static transformLimit<T, R>(
      collection: T[],
      iterator: MemoArrayIterator<T, Dictionary<R>>,
      accumulator: Dictionary<R>
    ): Aigle<Dictionary<R>>;
    static transformLimit<T, R>(
      collection: T[],
      limit: number,
      iterator: MemoArrayIterator<T, Dictionary<R>>,
      accumulator: Dictionary<R>
    ): Aigle<Dictionary<R>>;

    static transformLimit<T, R>(
      collection: List<T>,
      iterator: MemoListIterator<T, R[]>,
      accumulator?: R[]
    ): Aigle<R[]>;
    static transformLimit<T, R>(
      collection: List<T>,
      limit: number,
      iterator: MemoListIterator<T, R[]>,
      accumulator?: R[]
    ): Aigle<R[]>;
    static transformLimit<T, R>(
      collection: List<T>,
      iterator: MemoListIterator<T, Dictionary<R>>,
      accumulator?: Dictionary<R>
    ): Aigle<Dictionary<R>>;
    static transformLimit<T, R>(
      collection: List<T>,
      limit: number,
      iterator: MemoListIterator<T, Dictionary<R>>,
      accumulator?: Dictionary<R>
    ): Aigle<Dictionary<R>>;

    static transformLimit<T extends object, R>(
      collection: T,
      iterator: MemoObjectIterator<T, Dictionary<R>>,
      accumulator?: Dictionary<R>
    ): Aigle<Dictionary<R>>;
    static transformLimit<T extends object, R>(
      collection: T,
      limit: number,
      iterator: MemoObjectIterator<T, Dictionary<R>>,
      accumulator?: Dictionary<R>
    ): Aigle<Dictionary<R>>;
    static transformLimit<T extends object, R>(
      collection: T,
      iterator: MemoObjectIterator<T, R[]>,
      accumulator: R[]
    ): Aigle<R[]>;
    static transformLimit<T extends object, R>(
      collection: T,
      limit: number,
      iterator: MemoObjectIterator<T, R[]>,
      accumulator: R[]
    ): Aigle<R[]>;

    /* reduce */

    static reduce<T, R>(
      collection: T[],
      iterator: MemoArrayIterator<T, R, R>,
      accumulator?: R
    ): Aigle<R>;

    static reduce<T, R>(
      collection: List<T>,
      iterator: MemoListIterator<T, R, R>,
      accumulator?: R
    ): Aigle<R>;

    static reduce<T extends object, R>(
      collection: T,
      iterator: MemoObjectIterator<T, R, R>,
      accumulator?: R
    ): Aigle<R>;

    /* delay */

    static delay<T>(ms: number, value?: T): Aigle<T>;

    /* tap */

    static tap<T>(value: T, intercepter: (value: T) => ReturnType<any>): Aigle<T>;

    /* thru */

    static thru<T, R>(value: T, intercepter: (value: T) => ReturnType<R>): Aigle<R>;

    /**
     * flow
     * @see https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/lodash/common/util.d.ts#L198
     */
    static flow<R1, R2>(f1: () => ReturnType<R1>, f2: (a: R1) => ReturnType<R2>): () => Aigle<R2>;
    static flow<R1, R2, R3>(
      f1: () => ReturnType<R1>,
      f2: (a: R1) => ReturnType<R2>,
      f3: (a: R2) => ReturnType<R3>
    ): () => Aigle<R3>;
    static flow<R1, R2, R3, R4>(
      f1: () => ReturnType<R1>,
      f2: (a: R1) => ReturnType<R2>,
      f3: (a: R2) => ReturnType<R3>,
      f4: (a: R3) => ReturnType<R4>
    ): () => Aigle<R4>;
    static flow<R1, R2, R3, R4, R5>(
      f1: () => ReturnType<R1>,
      f2: (a: R1) => ReturnType<R2>,
      f3: (a: R2) => ReturnType<R3>,
      f4: (a: R3) => ReturnType<R4>,
      f5: (a: R4) => ReturnType<R5>
    ): () => Aigle<R5>;
    static flow<R1, R2, R3, R4, R5, R6>(
      f1: () => ReturnType<R1>,
      f2: (a: R1) => ReturnType<R2>,
      f3: (a: R2) => ReturnType<R3>,
      f4: (a: R3) => ReturnType<R4>,
      f5: (a: R4) => ReturnType<R5>,
      f6: (a: R5) => ReturnType<R6>
    ): () => Aigle<R6>;
    static flow<R1, R2, R3, R4, R5, R6, R7>(
      f1: () => ReturnType<R1>,
      f2: (a: R1) => ReturnType<R2>,
      f3: (a: R2) => ReturnType<R3>,
      f4: (a: R3) => ReturnType<R4>,
      f5: (a: R4) => ReturnType<R5>,
      f6: (a: R5) => ReturnType<R6>,
      f7: (a: R6) => ReturnType<R7>,
      ...funcs: Array<Many<(a: any) => any>>
    ): () => Aigle<any>;

    // 1-argument first function
    static flow<A1, R1, R2>(
      f1: (a1: A1) => ReturnType<R1>,
      f2: (a: R1) => ReturnType<R2>
    ): (a1: A1) => Aigle<R2>;
    static flow<A1, R1, R2, R3>(
      f1: (a1: A1) => ReturnType<R1>,
      f2: (a: R1) => ReturnType<R2>,
      f3: (a: R2) => ReturnType<R3>
    ): (a1: A1) => Aigle<R3>;
    static flow<A1, R1, R2, R3, R4>(
      f1: (a1: A1) => ReturnType<R1>,
      f2: (a: R1) => ReturnType<R2>,
      f3: (a: R2) => ReturnType<R3>,
      f4: (a: R3) => ReturnType<R4>
    ): (a1: A1) => Aigle<R4>;
    static flow<A1, R1, R2, R3, R4, R5>(
      f1: (a1: A1) => ReturnType<R1>,
      f2: (a: R1) => ReturnType<R2>,
      f3: (a: R2) => ReturnType<R3>,
      f4: (a: R3) => ReturnType<R4>,
      f5: (a: R4) => ReturnType<R5>
    ): (a1: A1) => Aigle<R5>;
    static flow<A1, R1, R2, R3, R4, R5, R6>(
      f1: (a1: A1) => ReturnType<R1>,
      f2: (a: R1) => ReturnType<R2>,
      f3: (a: R2) => ReturnType<R3>,
      f4: (a: R3) => ReturnType<R4>,
      f5: (a: R4) => ReturnType<R5>,
      f6: (a: R5) => ReturnType<R6>
    ): (a1: A1) => Aigle<R6>;
    static flow<A1, R1, R2, R3, R4, R5, R6, R7>(
      f1: (a1: A1) => ReturnType<R1>,
      f2: (a: R1) => ReturnType<R2>,
      f3: (a: R2) => ReturnType<R3>,
      f4: (a: R3) => ReturnType<R4>,
      f5: (a: R4) => ReturnType<R5>,
      f6: (a: R5) => ReturnType<R6>,
      f7: (a: R6) => ReturnType<R7>,
      ...funcs: Array<Many<(a: any) => any>>
    ): (a1: A1) => Aigle<any>;

    // 2-argument first function
    static flow<A1, A2, R1, R2>(
      f1: (a1: A1, a2: A2) => ReturnType<R1>,
      f2: (a: R1) => ReturnType<R2>
    ): (a1: A1, a2: A2) => Aigle<R2>;
    static flow<A1, A2, R1, R2, R3>(
      f1: (a1: A1, a2: A2) => ReturnType<R1>,
      f2: (a: R1) => ReturnType<R2>,
      f3: (a: R2) => ReturnType<R3>
    ): (a1: A1, a2: A2) => Aigle<R3>;
    static flow<A1, A2, R1, R2, R3, R4>(
      f1: (a1: A1, a2: A2) => ReturnType<R1>,
      f2: (a: R1) => ReturnType<R2>,
      f3: (a: R2) => ReturnType<R3>,
      f4: (a: R3) => ReturnType<R4>
    ): (a1: A1, a2: A2) => Aigle<R4>;
    static flow<A1, A2, R1, R2, R3, R4, R5>(
      f1: (a1: A1, a2: A2) => ReturnType<R1>,
      f2: (a: R1) => ReturnType<R2>,
      f3: (a: R2) => ReturnType<R3>,
      f4: (a: R3) => ReturnType<R4>,
      f5: (a: R4) => ReturnType<R5>
    ): (a1: A1, a2: A2) => Aigle<R5>;
    static flow<A1, A2, R1, R2, R3, R4, R5, R6>(
      f1: (a1: A1, a2: A2) => ReturnType<R1>,
      f2: (a: R1) => ReturnType<R2>,
      f3: (a: R2) => ReturnType<R3>,
      f4: (a: R3) => ReturnType<R4>,
      f5: (a: R4) => ReturnType<R5>,
      f6: (a: R5) => ReturnType<R6>
    ): (a1: A1, a2: A2) => Aigle<R6>;
    static flow<A1, A2, R1, R2, R3, R4, R5, R6, R7>(
      f1: (a1: A1, a2: A2) => ReturnType<R1>,
      f2: (a: R1) => ReturnType<R2>,
      f3: (a: R2) => ReturnType<R3>,
      f4: (a: R3) => ReturnType<R4>,
      f5: (a: R4) => ReturnType<R5>,
      f6: (a: R5) => ReturnType<R6>,
      f7: (a: R6) => ReturnType<R7>,
      ...funcs: Array<Many<(a: any) => any>>
    ): (a1: A1, a2: A2) => Aigle<any>;

    // any-argument first function
    static flow<A1, A2, A3, R1, R2>(
      f1: (a1: A1, a2: A2, a3: A3, ...args: any[]) => ReturnType<R1>,
      f2: (a: R1) => ReturnType<R2>
    ): (a1: A1, a2: A2, a3: A3, ...args: any[]) => Aigle<R2>;
    static flow<A1, A2, A3, R1, R2, R3>(
      f1: (a1: A1, a2: A2, a3: A3, ...args: any[]) => ReturnType<R1>,
      f2: (a: R1) => ReturnType<R2>,
      f3: (a: R2) => ReturnType<R3>
    ): (a1: A1, a2: A2, a3: A3, ...args: any[]) => Aigle<R3>;
    static flow<A1, A2, A3, R1, R2, R3, R4>(
      f1: (a1: A1, a2: A2, a3: A3, ...args: any[]) => ReturnType<R1>,
      f2: (a: R1) => ReturnType<R2>,
      f3: (a: R2) => ReturnType<R3>,
      f4: (a: R3) => ReturnType<R4>
    ): (a1: A1, a2: A2, a3: A3, ...args: any[]) => Aigle<R4>;
    static flow<A1, A2, A3, R1, R2, R3, R4, R5>(
      f1: (a1: A1, a2: A2, a3: A3, ...args: any[]) => ReturnType<R1>,
      f2: (a: R1) => ReturnType<R2>,
      f3: (a: R2) => ReturnType<R3>,
      f4: (a: R3) => ReturnType<R4>,
      f5: (a: R4) => ReturnType<R5>
    ): (a1: A1, a2: A2, a3: A3, ...args: any[]) => Aigle<R5>;
    static flow<A1, A2, A3, R1, R2, R3, R4, R5, R6>(
      f1: (a1: A1, a2: A2, a3: A3, ...args: any[]) => ReturnType<R1>,
      f2: (a: R1) => ReturnType<R2>,
      f3: (a: R2) => ReturnType<R3>,
      f4: (a: R3) => ReturnType<R4>,
      f5: (a: R4) => ReturnType<R5>,
      f6: (a: R5) => ReturnType<R6>
    ): (a1: A1, a2: A2, a3: A3, ...args: any[]) => Aigle<R6>;
    static flow<A1, A2, A3, R1, R2, R3, R4, R5, R6, R7>(
      f1: (a1: A1, a2: A2, a3: A3, ...args: any[]) => ReturnType<R1>,
      f2: (a: R1) => ReturnType<R2>,
      f3: (a: R2) => ReturnType<R3>,
      f4: (a: R3) => ReturnType<R4>,
      f5: (a: R4) => ReturnType<R5>,
      f6: (a: R5) => ReturnType<R6>,
      f7: (a: R6) => ReturnType<R7>,
      ...funcs: Array<Many<(a: any) => any>>
    ): (a1: A1, a2: A2, a3: A3, ...args: any[]) => Aigle<any>;

    /* times */

    static times<T>(n: number, iterator?: (num: number) => ReturnType<T>): Aigle<T[]>;

    /* timesSeries */

    static timesSeries<T>(n: number, iterator?: (num: number) => ReturnType<T>): Aigle<T[]>;

    /* timesLimit */

    static timesLimit<T>(n: number, iterator?: (num: number) => ReturnType<T>): Aigle<T[]>;
    static timesLimit<T>(
      n: number,
      limit: number,
      iterator: (num: number) => ReturnType<T>
    ): Aigle<T[]>;

    /* doUntil */

    static doUntil<T>(
      iterator: (value: T) => ReturnType<T>,
      tester: (value: T) => ReturnType<boolean>
    ): Aigle<T>;
    static doUntil<T>(
      value: T,
      iterator: (value: T) => ReturnType<T>,
      tester: (value: T) => ReturnType<boolean>
    ): Aigle<T>;

    /* doWhilst */

    static doWhilst<T>(
      iterator: (value: T) => ReturnType<T>,
      tester: (value: T) => ReturnType<boolean>
    ): Aigle<T>;
    static doWhilst<T>(
      value: T,
      iterator: (value: T) => ReturnType<T>,
      tester: (value: T) => ReturnType<boolean>
    ): Aigle<T>;

    /* until */

    static until<T>(
      tester: (value: T) => ReturnType<boolean>,
      iterator: (value: T) => ReturnType<T>
    ): Aigle<T>;
    static until<T>(
      value: T,
      tester: (value: T) => ReturnType<boolean>,
      iterator: (value: T) => ReturnType<T>
    ): Aigle<T>;

    /* whilst */

    static whilst<T>(
      tester: (value: T) => ReturnType<boolean>,
      iterator: (value: T) => ReturnType<T>
    ): Aigle<T>;
    static whilst<T>(
      value: T,
      tester: (value: T) => ReturnType<boolean>,
      iterator: (value: T) => ReturnType<T>
    ): Aigle<T>;

    /* retry */

    static retry<T>(handler: PromiseCallback<T>): Aigle<T>;
    static retry<T>(opts: number | RetryOpts, handler: PromiseCallback<T>): Aigle<T>;

    /* attempt */

    static attempt<T>(handler: PromiseCallback<T>): Aigle<T>;

    /* prommisify */

    static promisify(fn: any, opts?: any): any;

    /* prommisifyAll */

    static promisifyAll(target: any, options?: any): any;

    /* using */

    static using<R1, T>(
      arg1: Disposer<R1>,
      executor: (transaction1: R1) => ReturnType<T>
    ): Aigle<T>;
    static using<R1, R2, T>(
      arg1: Disposer<R1>,
      arg2: Disposer<R2>,
      executor: (transaction1: R1, transaction2: R2) => ReturnType<T>
    ): Aigle<T>;
    static using<R1, R2, R3, T>(
      arg1: Disposer<R1>,
      arg2: Disposer<R2>,
      arg3: Disposer<R3>,
      executor: (transaction1: R1, transaction2: R2, transaction3: R3) => ReturnType<T>
    ): Aigle<T>;

    /* mixin */

    static mixin(sources: any, opts: any): any;

    /* config */

    static config(opts: ConfigOpts): void;

    static longStackTraces(): void;
  }
}
