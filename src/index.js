const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const os = require("os");
const js_yaml = require("js-yaml");
const request = require("./lib/http");

const RepositoryRoot = path.resolve(__dirname, "../repository");
async function ListFiles(Folder = "./") {
  const Result = [];
  const Files = fs.readdirSync(Folder);
  for (const File of Files) {
    const FilePath = path.resolve(Folder, File);
    const Stats = fs.statSync(FilePath);
    if (Stats.isDirectory()) {
      Result.push(...await ListFiles(FilePath));
    } else {
      Result.push(FilePath);
    }
  }
  return Result.map(File => String(File)).filter(File => /\.y[a]ml$/g.test(File));
}
async function GetRepository(repositoryName = "pocketmine") {
  const repositoryPath = path.resolve(RepositoryRoot, repositoryName);
  if (!fs.existsSync(repositoryPath)) {
    throw new Error(`Repository ${repositoryName} does not exist`);
  }
  const repository = {
    repositorys: [],
    textures: {},
    mods: {},
  }
  for (const ConfigFile of await ListFiles()) {
    const Config = js_yaml.load(fs.readFileSync(ConfigFile, "utf8"));
    const FileParser = path.parse(ConfigFile);
    const ModName = path.basename(FileParser.dir);
    if (!(Config.type === "texture" || Config.type === "mod")) {
      console.log("Droped", ModName);
    } else {
      const List = [];
      // Versions Array
      if (typeof Config.versions === "object" && typeof Config.versions.map === "function") {
        for (let Version of Config.versions) {
          if (typeof Version.url === "string") {
            let ShaOK = null;
            try {
              const FilePath = path.resolve(os.tmpdir(), ModName+"_"+Config.version+".tmp");
              fs.writeFileSync(FilePath, await request.GetBuffer(Version.url));
              const Sha = crypto.createHash("sha1");
              Sha.update(fs.readFileSync(FilePath));
              if (Sha.digest("hex") === Version.checksum.replace("sha256:", "")) {
                ShaOK = true;
              } else {
                ShaOK = false;
              }
              fs.unlinkSync(FilePath);
            } catch (err) {
              console.log("Can't download", ModName, Version.url);
            }
            List.push({
              url: Version.url,
              version: Version.version,
              sha_ok: ShaOK,
            });
          }
        }
      }
      if (Config.type === "texture") {
        if (!repository.textures[ModName]) {
          repository.textures[ModName] = List;
        } else console.log("Duplicate texture", ModName);
      } else {
        if (!repository.mods[ModName]) {
          repository.mods[ModName] = List;
        } else console.log("Duplicate mod", ModName);
      }
      repository.repositorys.push(ModName);
    }
  }
  return repository;
}

module.exports = {
  RootDir: RepositoryRoot,
  maneger: GetRepository
};