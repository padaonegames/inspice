import { useEffect, useState } from 'react';

/**
 * Representation of a Promise state machine.
 */
export type AsyncProgress<ResultType = any, ErrorType = any> =
  | { kind: 'running' }
  | { kind: 'success', result: ResultType }
  | { kind: 'failure', reason: ErrorType }
  | { kind: 'idle' }
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
  triggerOnStart: boolean = true,
): [AsyncProgress<ResultType, ErrorType | Error>, () => void] {
  const [state, setState] = useState<AsyncProgress<ResultType, ErrorType | Error>>(
    { kind: 'idle' },
  );
  const [triggerRequest, setTriggerRequest] = useState<boolean>(triggerOnStart);

  useEffect(() => {
    // request hasn't started yet.
    if (state.kind === 'idle') {
      if (triggerRequest) {
        // trigger request by changing state to running
        setState({ kind: 'running' });
        setTriggerRequest(false);
      }
      // request is not to be triggered just yet
      return;
    }

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
  }, [...deps, triggerRequest]);

  return [state, () => setTriggerRequest(true)];
};