export function transformKeys(keys) {
  return keys.map((key) => {
    if (typeof key === 'string') return { name: key, key };
    return { ...key, name: key.name || key.key };
  });
}

export function collectEnv(env, transformedKeys) {
  const secretEnv = {};
  const publicEnv = {};
  for (let i = 0, l = transformedKeys.length; i < l; i += 1) {
    const k = transformedKeys[i];
    (k.secret ? secretEnv : publicEnv)[k.name] = env[k.key] || k.default;
  }
  return { secretEnv, publicEnv };
}
