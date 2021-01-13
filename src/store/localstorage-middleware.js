const configurePersist = ({ namespace = '__store_state__' } = {}) => ({
  save: (store) => (next) => (action) => {
    const result = next(action);
    if (typeof localStorage === 'undefined') return result;
    localStorage.setItem(namespace, JSON.stringify(store.getState()));
    return result;
  },
  load: (initialState) => ({
    ...initialState,
    ...(typeof localStorage !== 'undefined' &&
      JSON.parse(localStorage.getItem(namespace))),
  }),
});

export { configurePersist };
