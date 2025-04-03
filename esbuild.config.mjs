import esbuild from "esbuild";
import tscAlias from "tsc-alias";

const build = async () => {
  await esbuild.build({
    entryPoints: ["src/index.ts"],
    outfile: "dist/index.js",
    bundle: true,
    platform: "node",
    target: "node18",
    sourcemap: true,
    tsconfig: "tsconfig.json",
  });

  // Постобработка для замены алиасов
  tscAlias.replaceTscAliasPaths({
    configFile: "tsconfig.json",
    outDir: "dist",
  });
};

build().catch(() => process.exit(1));
