import { useEffect, useState } from 'react';

/**
 * Representation of a Promise state machine.
 */
export type AsyncProgress<ResultType = any, ErrorType = any> =
  | { kind: 'running' }
  | { kind: 'success', result: ResultType }
  | { kind: 'failure', reason: ErrorType }
  ;

/**
 * Helper React Hook to wrap around the process of running an async function and
 * switching based on whether it's running, has succeeded, or has failed.
 *
 * @param promiseProducer - A function which can be called to kick-off the async
 *                          process and provide the resulting Promise.
 * @param deps - As for Reacts useEffect, any dependencies for which changes
 *               should cause the async to be re-executed.
 */
export function useAsyncRequest<ResultType, ErrorType>(
  promiseProducer: () => Promise<ResultType>,
  deps: React.DependencyList = [],
): [AsyncProgress<ResultType, ErrorType | Error>] {
  const [state, setState] = useState<AsyncProgress<ResultType, ErrorType | Error>>(
    { kind: 'running' },
  );

  useEffect(() => {
    try {
      promiseProducer()
        .then((result) => {
          setState({ kind: 'success', result });
        })
        .catch((reason: ErrorType) => {
          setState({ kind: 'failure', reason });
        });

      if (state.kind !== 'running') {
        setState({ kind: 'running' });
      }
    } catch (err) {
      setState({ kind: 'failure', reason: err as Error });
    }
  }, deps);

  return [state];
};