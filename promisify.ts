type HandleErrorAndValue = (error: any, value: any) => void;
type CallbackFn = (...args: [...any[], handleErrorAndValue: HandleErrorAndValue]) => void;
function promisify(callbackFn: CallbackFn) : (args: any) => Promise<void> {
    return (...args: any[]) => {
        return new Promise<void>((resolve, reject) => {
            function handleErrorAndValue(error: any, value: any) {
                if (error) {
                    reject(error);
                } else {
                    resolve(value);
                }
            }
            callbackFn(...args, handleErrorAndValue);
        });
    }
}