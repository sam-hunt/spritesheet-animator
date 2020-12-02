import * as React from 'react';

export type UsePromiseState<T> = { value: T | null, error: unknown | null, isPending: boolean };

export function usePromise<T>(promiseOrFunction: Promise<T> | Function, defaultValue: T): UsePromiseState<T> {
    const [state, setState] = React.useState<UsePromiseState<T>>({ value: defaultValue, error: null, isPending: true })

    React.useEffect(() => {
        const promise = (typeof promiseOrFunction === 'function')
            ? promiseOrFunction()
            : promiseOrFunction

        let isSubscribed = true
        promise
            .then((value: T) => isSubscribed ? setState({ value, error: null, isPending: false }) : null)
            .catch((error: unknown) => isSubscribed ? setState({ value: defaultValue, error, isPending: false }) : null)

        return () => { isSubscribed = false; };
    }, [promiseOrFunction, defaultValue]);

    const { value, error, isPending } = state;
    return { value, error, isPending };
}
