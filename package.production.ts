import packageJson from './package.json';

type PackageJsonType = Record<keyof typeof packageJson, unknown>;

const deleteDist = (path: string) =>
  path.includes('./dist') ? path.replace('./dist', '.') : path;

export const packageProduction: PackageJsonType = {
  name: packageJson.name,
  version: packageJson.version,
  scripts: packageJson.scripts,
  main: deleteDist(packageJson.main),
  types: deleteDist(packageJson.types),
  style: deleteDist(packageJson.style),
  files: packageJson.files,
  license: packageJson.license,
  peerDependencies: packageJson.peerDependencies,
  devDependencies: {},
};