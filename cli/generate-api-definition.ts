import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface APIData {
  type: string;
  name: string;
  relationships: {
    [key: string]: APIData & {
      included?: boolean;
      cardinality?: 'one' | 'many';
    };
  };
}

interface API {
  description: string;
  request?: {
    parameters?: Record<string, any>;
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
  const regex = /attributes: (\w+);/g;
  const matches = new Set(
    [...definition.matchAll(regex)].map(match => match[1])
  );

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
          attributes: ${nestedData.relationships[key].type};
          ${
            nestedData.relationships[key].relationships
              ? `relationships: {${Object.keys(
                  nestedData.relationships[key].relationships
                )
                  .map(
                    nestedKey => `${nestedKey}: {
                                      type: '${nestedData.relationships[key].relationships[nestedKey].name}';
                                      id: string;
                                    }[]`
                  )
                  .join(',\n')}}`
              : ''
          }
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
  const apiRelationship = Object.keys(api.relationships ?? {});

  const relationshipType = apiRelationship.map(key => {
    return `${key}: {
      data: {
        type: '${api.relationships[key].name}';
        id: string;
      }${api.relationships[key].cardinality === 'one' ? '' : '[]'}
    }`;
  });

  // @ts-ignore
  const includedRelationshipType = generateIncludedRelationship(api);

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
      included: [${includedRelationshipType}]
    }
`;

  return responseType;
}

function generateAdditionalType(api: API['response']['data']) {
  const includedRelationshipType = generateIncludedRelationship(api);

  return `
    ${
      includedRelationshipType ? `type Included = Response['included'][0];` : ''
    }
    type Relationships = Response['data'][0]['relationships'];
    type Data = Response['data'][0];
  `;
}

function generateTsDefinitionForAPI(api: API): string {
  const parameters = Object.entries(api.request?.parameters ?? {}).map(
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
  ${responseType}
  ${generateAdditionalType(api.response.data)}
  ${generateResponseClass(api.response.data)}
  `;
}

function generateResponseClass(api: API['response']['data']) {
  const includedRelationshipType = generateIncludedRelationship(api);

  const content = `
    export class APIResponse {
      constructor(private response: Response) {}

      get data(): Data[] {
        return this.response.data;
      }

      get relationships(): Relationships {
        return this.response.data[0].relationships;
      }

      get attributes(): Data['attributes'] {
        return this.response.data[0].attributes;
      }
      ${
        includedRelationshipType
          ? `
      get included(): Included[] {
        return this.response.included;
      }

      includedByType<T extends Included['type']>(
        type: T
      ): Extract<Included, { type: T }>[] {
        return this.included.filter(item => item.type === type) as any;
      }

      firstIncludedByType<T extends Included['type']>(
        type: T
      ): Extract<Included, { type: T }> | undefined {
        return this.includedByType(type)[0];
      }

      getIncludedByTypeAndId<T extends Included['type']>(
        type: T,
        id: string
      ): Extract<Included, { type: T; id: string }> | undefined {
        return this.included.find(item => item.type === type && item.id === id) as any;
      }
      `
          : ''
      }
    }
  `;

  return content;
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
