import generateAliasesResolver from "esm-module-alias";

const aliases = {
    "@config": "./src/config",
    "@controllers": "./src/controllers",
    "@models": "./src/models",
    "@routes": "./src/routes",
    "@services": "./src/services",
    "@utils": "./src/utils"
};

export const resolve = generateAliasesResolver(aliases);
