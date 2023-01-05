import _ from "lodash";
import { DependencyList, useCallback } from "react";

export function useMemoizedCallback<T extends (...args: any) => any>(
  callback: T,
  deps: DependencyList
) {
  return useCallback(_.memoize(callback), deps);
} // useMemoizedCallback
