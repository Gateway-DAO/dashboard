const fs = require("fs-extra");
const path = require("path");
const { exit } = require("process");

const prismaOutput = path.resolve(`${__dirname}/../../prisma/schema.prisma`);

if(!fs.existsSync(prismaOutput)) {
  fs.copySync(path.resolve(`${__dirname}/../../prisma/schema-base.prisma`), path.resolve(`${__dirname}/../../prisma/schema.prisma`));
}

exit(0)
