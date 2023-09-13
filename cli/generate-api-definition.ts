import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface APIData {
  type: string;
  name: string;
  relationships: {
    [key: string]: APIData & { included?: boolean };
  };
}

interface API {
  description: string;
  request: {
    parameters: Record<string, any>;
  };
  response: {
    data: APIData;
  };
}

const API_DEFINITION_FOLDER_PATH = path.join(__dirname, '../src/api/json');
const TARGET_API_DEFINITION_FOLDER_PATH = path.join(
  __dirname,
  '../src/api/api-definition'
);

const apiDefinitionFiles = fs.readdirSync(API_DEFINITION_FOLDER_PATH);

function generateImportType(definition: string) {
  // regex match value of type in definition file
  const regex = /attributes: (\w+);/g;
  const matches = new Set(
    [...definition.matchAll(regex)].map(match => match[1])
  );
  console.log('matches', matches);
  const importType = [...matches]
    .map(match => {
      return `import { ${match} } from '@/api/model/${match}';`;
    })
    .join('\n');

  return importType;
}

function generateIncludedRelationship(data: APIData): string {
  let includedRelationshipType: string[] = [];

  function recursiveCalculateIncludedRelationship(nestedData: APIData) {
    if (!nestedData.relationships) {
      return;
    }

    const relationshipKeys = Object.keys(nestedData.relationships);
    relationshipKeys.forEach(key => {
      if (nestedData.relationships[key].included) {
        // @ts-ignore
        includedRelationshipType.push(`{
          type: '${nestedData.relationships[key].name}';
          id: string;
          attributes: ${nestedData.type};
          relationships: {${Object.keys(
            nestedData.relationships[key].relationships ?? {}
          )
            .map(nestedKey => {
              return `${nestedKey}: {
                type: '${nestedData.relationships[key].relationships[nestedKey].name}';
                id: string;
              }[]`;
            })
            .join(',\n')}},
        }`);

        if (nestedData.relationships[key].relationships) {
          recursiveCalculateIncludedRelationship(nestedData.relationships[key]);
        }
      }
    });
  }

  recursiveCalculateIncludedRelationship(data);

  return includedRelationshipType.join('|\n');
}

function generateResponseInterface(api: API['response']['data']) {
  // Relationship Type
  const apiRelationship = Object.keys(api.relationships);

  const relationshipType = apiRelationship.map(key => {
    return `${key}: {
        type: '${api.relationships[key].name}';
        id: string;
    }[]`;
  });

  // @ts-ignore
  const includedRelationshipType = generateIncludedRelationship(api);

  // Generate Response Type
  const responseType = `
    export interface Response {
      data: {
        type: '${api.name}';
        id: string;
        attributes: ${api.type};
        relationships: {
          ${relationshipType.join(',\n')}
        };
      }[],
      included: Array<
        ${includedRelationshipType}
      >
    }
`;

  return responseType;
}

function generateTsDefinitionForAPI(api: API): string {
  // Generate Request Type
  const parameters = Object.entries(api.request.parameters).map(
    ([key, value]) => {
      return `${key}: ${value}`;
    }
  );

  const requestType = `
  export interface Params {
    ${parameters.join('\n')}
  }
  `;

  const responseType = generateResponseInterface(api.response.data);

  const importType = generateImportType(responseType);

  return `
  ${importType}
  ${requestType}
  ${responseType}`;
}

function createDefinitionFile(
  folderPath: string,
  fileName: string,
  fileContent: string
) {
  const filePath = path.join(folderPath, fileName);
  fs.writeFileSync(filePath, fileContent);
}

function deleteDefinitionFolder(folderPath: string) {
  fs.readdirSync(folderPath).forEach(fileName => {
    fs.unlinkSync(path.join(folderPath, fileName));
  });
}

function start() {
  deleteDefinitionFolder(TARGET_API_DEFINITION_FOLDER_PATH);

  apiDefinitionFiles.forEach(fileName => {
    const filePath = path.join(API_DEFINITION_FOLDER_PATH, fileName);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const api: API = JSON.parse(fileContent);
    const tsDefinition = generateTsDefinitionForAPI(api);
    createDefinitionFile(
      TARGET_API_DEFINITION_FOLDER_PATH,
      fileName.replace('.json', '.ts'),
      tsDefinition
    );
  });
}

start();
