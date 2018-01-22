const configureDryboard = (cacheValues = {}, waitingList = {}) => ({
  get: (key, defaultValue) =>
    key
      ? new Promise((resolve, reject) => {
          cacheValues[key]
            ? resolve(cacheValues[key])
            : (waitingList = {
                ...waitingList,
                [key]: [...(waitingList[key] || []), [resolve, reject]]
              });
        })
      : defaultValue,
  set: async (key, value) => {
    cacheValues = { ...cacheValues, [key]: value };
    const observerNotifications = waitingList[key];

    waitingList = { ...waitingList, [key]: undefined };
    observerNotifications &&
      observerNotifications.map(([notify, reject]) => notify(value));
  }
});

module.exports.configureDryboard = configureDryboard;
