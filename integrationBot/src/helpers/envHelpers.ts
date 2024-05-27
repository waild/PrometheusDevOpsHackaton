function getEnv(name: string): string {
  const val = process.env[name];
  if (val === undefined || val === null) {
    throw 'missing env var for ' + name;
  }
  return val;
}

export { getEnv };
