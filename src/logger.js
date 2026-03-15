const isProd = import.meta.env.MODE === "production";

export function createLogger(namespace) {
  const prefix = `[${namespace}]`;

  return {
    debug: isProd ? () => {} : (...args) => console.debug(prefix, ...args),
    info: isProd ? () => {} : (...args) => console.info(prefix, ...args),
    warn: (...args) => console.warn(prefix, ...args),
    error: (...args) => console.error(prefix, ...args),
  };
}
