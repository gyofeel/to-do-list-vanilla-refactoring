const cloneDeep = data => {
    return JSON.parse(JSON.stringify(data));
};

const freeze = state => Object.freeze(cloneDeep(state));

export default (model) => {
    if (typeof model !== 'function') {
        throw new Error('model must be a function');
    }

    let listeners = [];
    let state = model();

    const subscribe = listener => {
        listeners.push(listener);

        return () => {
            listeners = listeners.filer(l => l !== listener);
        }
    };

    const invokeSubscriber = () => {
        const data = freeze(state);

        listeners.forEach(l => l(data));
    };

    const dispatch = event => {
        const newState = model(state, event);

        if (!newState) { 
            throw new Error('model should always return a value');
        }

        if (newState === state) {
            return;
        }

        state = newState;
        
        invokeSubscriber();
    };

    return {
        subscribe,
        dispatch,
        getState: () => freeze(state)
    };
};