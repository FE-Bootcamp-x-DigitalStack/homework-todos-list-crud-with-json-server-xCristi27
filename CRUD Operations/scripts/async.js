(function init() {
    setTimeout(() => console.log('from setTimeout'), 0); // 3 - macrotask

    const promise = new Promise((resolve, reject) => {
        // all logic code inside Promise
        // ...
        // setTimeout(() => {
        //     resolve({ success: true });
        //     // reject({ success: false });
        // }, 3000);
        resolve({ success: true });
    });

    promise
        .then((res) => console.log('from promise: ', res)) // 2 - microtask
        .catch((err) => console.log('from catch: ', err));
    // .finally(() => console.log('from finally'));

    console.log('from console.log'); // 1
})();
