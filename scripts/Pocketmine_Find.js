const fs = require("fs");
const path = require("path");
const js_yaml = require("js-yaml");

(async function(){
// Script

const Fetch = (await import("node-fetch")).default;

let PluginsJsonPoggit = [{"id":642,"name":"XYZ","version":"1.0.4","html_url":"https://poggit.pmmp.io/p/XYZ/1.0.4","tagline":"aka 'Coords' by Unerds","artifact_url":"https://poggit.pmmp.io/r/13513","downloads":112,"score":null,"repo_id":96703537,"repo_name":"poggit-orphanage/XYZ","project_id":617,"project_name":"XYZ","build_id":29149,"build_number":7,"build_commit":"f13740e3b340abba573e811884b534e284477552","description_url":"https://poggit.pmmp.io/r/13510","icon_url":"https://raw.githubusercontent.com/poggit-orphanage/XYZ/f13740e3b340abba573e811884b534e284477552/icon.png","changelog_url":"https://poggit.pmmp.io/r/13512","license":"none","license_url":null,"is_obsolete":false,"is_pre_release":false,"is_outdated":false,"is_official":false,"submission_date":1507536299,"state":5,"last_state_change_date":1507536304,"categories":[{"major":true,"category_name":"Informational"},{"major":false,"category_name":"Admin Tools"},{"major":false,"category_name":"General"}],"keywords":["coords","coordinates"],"api":[{"from":"3.0.0-ALPHA7","to":"3.0.0-ALPHA9"}],"deps":[],"producers":{"Collaborator":["unerds","awzaw","sof3"]},"state_name":"Approved"},{"id":466,"name":"XYZ","version":"1.0.3","html_url":"https://poggit.pmmp.io/p/XYZ/1.0.3","tagline":"aka 'Coords' by Unerds","artifact_url":"https://poggit.pmmp.io/r/9413","downloads":124,"score":null,"repo_id":96703537,"repo_name":"poggit-orphanage/XYZ","project_id":617,"project_name":"XYZ","build_id":26433,"build_number":5,"build_commit":"b3a229bb91e196a87e3078148009c6ab7fcc7fac","description_url":"https://poggit.pmmp.io/r/9410","icon_url":"https://raw.githubusercontent.com/poggit-orphanage/XYZ/b3a229bb91e196a87e3078148009c6ab7fcc7fac/icon.png","changelog_url":"https://poggit.pmmp.io/r/9412","license":"none","license_url":null,"is_obsolete":false,"is_pre_release":false,"is_outdated":false,"is_official":false,"submission_date":1501605759,"state":5,"last_state_change_date":1501605797,"categories":[{"major":true,"category_name":"Informational"},{"major":false,"category_name":"Admin Tools"},{"major":false,"category_name":"General"}],"keywords":["coords","coordinates"],"api":[{"from":"3.0.0-ALPHA7","to":"3.0.0-ALPHA7"}],"deps":[],"producers":{"Collaborator":["unerds","awzaw","sof3"]},"state_name":"Approved"},{"id":429,"name":"XYZ","version":"1.0.2","html_url":"https://poggit.pmmp.io/p/XYZ/1.0.2","tagline":"aka 'Coords' by Unerds","artifact_url":"https://poggit.pmmp.io/r/8177","downloads":232,"score":null,"repo_id":96703537,"repo_name":"poggit-orphanage/XYZ","project_id":617,"project_name":"XYZ","build_id":25455,"build_number":3,"build_commit":"d1c371dac7bc0189d6cca764dd5639b7273840f5","description_url":"https://poggit.pmmp.io/r/8175","icon_url":"https://raw.githubusercontent.com/poggit-orphanage/XYZ/d1c371dac7bc0189d6cca764dd5639b7273840f5/icon.png","changelog_url":null,"license":"none","license_url":null,"is_obsolete":false,"is_pre_release":false,"is_outdated":false,"is_official":false,"submission_date":1499639006,"state":5,"last_state_change_date":1499627437,"categories":[{"major":true,"category_name":"Informational"},{"major":false,"category_name":"Admin Tools"},{"major":false,"category_name":"General"}],"keywords":["coords","coordinates"],"api":[{"from":"2.0.0","to":"3.0.0-ALPHA6"}],"deps":[],"producers":{"Collaborator":["unerds","awzaw","sof3"]},"state_name":"Approved"}];
PluginsJsonPoggit = await Fetch("https://poggit.pmmp.io/plugins.json").then(res => res.json());
const PluginsObject = {};
for (const { name, version } of PluginsJsonPoggit) {
  const Letter = name.split("").filter(le => /[a-zA-Z0-9]/gi.test(le)).join("").charAt(0).toLocaleLowerCase();
  const PluginJson = {
    revision: "v1",
    type: "plugin",
    name: name,
    versions: [
      {
        version: version,
        from: "poggit_pmmp",
      }
    ]
  };
  if (!PluginsObject[Letter]) PluginsObject[Letter] = {};
  if (!PluginsObject[Letter][name]) PluginsObject[Letter][name] = PluginJson;
  else PluginsObject[Letter][name].versions.push(PluginJson.versions[0]);
}

if (fs.existsSync(path.resolve(__dirname, "../pocketmine"))) fs.rmSync(path.resolve(__dirname, "../pocketmine"), { recursive: true });
console.log(PluginsObject);
for (let Lete of Object.keys(PluginsObject)) {
  if (!(fs.existsSync(path.resolve(__dirname, "../pocketmine", Lete)))) fs.mkdirSync(path.resolve(__dirname, "../pocketmine", Lete), { recursive: true });
  for (let PluginName of Object.keys(PluginsObject[Lete])) {
    const PluginJson = PluginsObject[Lete][PluginName];
    console.log(`PocketMine-MP Plugin: ${Lete}/${PluginName}`);
    fs.writeFileSync(path.resolve(__dirname, "../pocketmine", Lete, PluginName + ".yaml"), js_yaml.dump(PluginJson));
  }
}
// Script
})()