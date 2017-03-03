export type Observer<T> = (evt: T) => void;

export type ObserverHandle = number;

export class Subject<T> {

    private observers: Observer<T>[];
    
    constructor () {
        this.observers = [];
    }
    
    next (evt: T) {
        this.observers.forEach(observer => observer(evt));
    }

    subscribe (observer: Observer<T>): ObserverHandle {
        this.observers.push(observer);
        return this.observers.length - 1;
    }

    unsubscribe (observerHandle: ObserverHandle) {
        this.observers.splice(observerHandle, 1);
    }
}
