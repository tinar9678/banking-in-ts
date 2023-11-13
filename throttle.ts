type CallbackFunction = (args: any) => void;

function throttle(callback: CallbackFunction, delay: number) : CallbackFunction & {cancel: () => void} {
    let lastCalled = 0;
    let timerId: any;

    function throttledFunction(args: any) : void {
        const currentTime = Date.now();
        const timeSinceLastCall = currentTime-lastCalled;
        const delayRemaining = delay-timeSinceLastCall;

        if (delayRemaining <= 0) {
            lastCalled = currentTime;
            callback(args);
        } else {
            clearTimeout(timerId);
            timerId = setTimeout(() => {
                lastCalled = Date.now();
                callback(args);
            }, delayRemaining);
        }
    }

    throttledFunction.cancel = () => {
        clearTimeout(timerId);
    }

    return throttledFunction;
}

// Example usage:
const myCallback: CallbackFunction = (args) => {
    console.log("Callback called with args:", args);
};

const throttledCallback = throttle(myCallback, 1000);

// Call the throttled function
throttledCallback("example args");
throttledCallback("example args");
throttledCallback("example args");

// To cancel the throttled invocation
throttledCallback.cancel();