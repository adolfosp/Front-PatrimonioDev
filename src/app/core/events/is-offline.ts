import { defer, fromEvent, merge, of, switchMap } from "rxjs";

const initialEvent$ = of(null);
const onlineEvent$ = fromEvent(window, "online");
const offlineEvent$ = fromEvent(window, "offline");
const isOfflineDefer$ = defer(() => of(!window.navigator.onLine));

export const isOffline$ = merge(initialEvent$, onlineEvent$, offlineEvent$).pipe(switchMap(() => isOfflineDefer$));
