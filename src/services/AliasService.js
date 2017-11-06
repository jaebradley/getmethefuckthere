import FileExists from 'file-exists-promise';
import { readJSONFile, writeJSONFile } from 'jsonfile-promised';

const ALIAS_FILE_PATH = '~/.gmtft-aliases';

const getAliases = () => (
    FileExists(ALIAS_FILE_PATH)
      .then(fileExists => (fileExists ? readJSONFile(ALIAS_FILE_PATH) : {}),
  )
);

const addAlias = (alias, value) => (
  getAliases()
    .then((aliases) => {
      const updatedAliases = aliases;

      updatedAliases[alias] = value;

      return updatedAliases;
    }).then(updatedAliases => (writeJSONFile(ALIAS_FILE_PATH, updatedAliases)),
  )
);

const removeAlias = alias => (
  getAliases()
    .then((aliases) => {
      const updatedAliases = aliases;
      delete updatedAliases[alias];
      return updatedAliases;
    }).then(updatedAliases => (writeJSONFile(ALIAS_FILE_PATH, updatedAliases)),
  )
);

module.exports = {
  getAliases,
  addAlias,
  removeAlias,
};
